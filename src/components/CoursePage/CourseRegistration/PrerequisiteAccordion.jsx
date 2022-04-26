import { Check, Close, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import ClickableIndicator from 'components/CourseCardGrid/CourseCard/ClickableIndicator';
import PreventableLink from 'components/PreventableNavigation/PreventableLink';
import React, { useEffect, useState } from 'react';
import { pluralize } from 'utils';
import LabelWithIcon from '../LabelWithIcon';

export default function PrerequisiteAccordion({ course }) {
  const [isEligible, setIsEligible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const isEligible = course.prerequisiteList.isCompleted;
    setIsEligible(isEligible);
    setIsExpanded(!isEligible);
  }, [course]);

  const iconTypes = [Close, Check];

  const renderPrerequisiteItem = (item, key) =>
    item.type === 'list' ? (
      <Stack key={key}>
        <LabelWithIcon
          align='flex-start'
          height='1.75em'
          size='small'
          iconType={iconTypes[+item.isCompleted]}
          label={(item.policy === 'some' ? 'One' : 'All') + ' of the following:'}
        />
        <Box paddingLeft='28px'>{item.items.map((x, i) => renderPrerequisiteItem(x, i))}</Box>
      </Stack>
    ) : (
      item.type !== 'text' && (
        <LabelWithIcon
          key={key}
          align='flex-start'
          size='small'
          height='2em'
          iconType={iconTypes[+item.isCompleted]}
          label={
            <Link
              component={PreventableLink}
              to={'/course/' + item.id}
              target='_blank'
              color='text.primary'
            >
              {item.name}
            </Link>
          }
        />
      )
    );

  return (
    <Accordion
      disableGutters
      expanded={isExpanded}
      onChange={() => course.prerequisiteList.numItems && setIsExpanded(!isExpanded)}
    >
      <AccordionSummary expandIcon={course.prerequisiteList.numItems > 0 && <ExpandMore />}>
        <Stack padding='12px 8px' spacing='12px'>
          <Typography variant='subtitle2'>Enrollment Requirements</Typography>
          <Typography variant='body2'>
            {pluralize(course.prerequisiteList.numItems || 'No', 'prerequisite')}
          </Typography>
          <LabelWithIcon
            color={isEligible ? 'success' : 'error'}
            iconType={iconTypes[+isEligible]}
            label={
              isEligible
                ? course.prerequisiteList.numItems
                  ? 'You fulfill all prerequisites for this course'
                  : 'This course is open to everyone'
                : 'You have unfulfilled prerequisites'
            }
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ borderTop: '1px lightgray solid' }}>
        <Stack padding='8px 8px 8px' spacing='12px' whiteSpace='pre-wrap'>
          {course.prerequisiteList.hasOwnProperty('items') && (
            <>
              <Typography variant='subtitle2'>Course Prerequisites</Typography>
              {renderPrerequisiteItem(course.prerequisiteList)}
              <ClickableIndicator>
                <Link
                  component={PreventableLink}
                  to='/profile/history'
                  variant='subtitle2'
                  color='text.secondary'
                >
                  Tell us what courses you have taken
                </Link>
              </ClickableIndicator>
            </>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
