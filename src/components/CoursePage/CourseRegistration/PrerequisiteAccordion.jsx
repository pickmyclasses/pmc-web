import { Check, Close, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { formatPrerequisites, capitalizeFirst, pluralize } from 'utils';
import { getEligibility } from '../../CourseCardGrid/CourseCard/CourseEligibilityIndicator';
import { SchedulerContext } from '../../Scheduler/ContainerWithScheduler';
import LabelWithIcon from '../LabelWithIcon';

export default function PrerequisiteAccordion({ course }) {
  const { classesInShoppingCart } = useContext(SchedulerContext);

  const [isEligible, setIsEligible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [prerequisiteList, setPrerequisiteList] = useState({});
  const [numPrerequisites, setNumPrerequisites] = useState(null);

  useEffect(() => {
    const isEligible =
      getEligibility(course, classesInShoppingCart) !== 'incomplete-prerequisites';
    setIsEligible(isEligible);
    setIsExpanded(!isEligible);

    const [prerequisiteList, count] = formatPrerequisites(course.prerequisites);
    setPrerequisiteList(prerequisiteList);
    setNumPrerequisites(count);
  }, [course, classesInShoppingCart]);

  // TODO Q: This is only a placeholder.
  const iconType = isEligible ? Check : Close;

  const renderPrerequisiteItem = (item, key) =>
    typeof item === 'string' ? (
      <LabelWithIcon
        key={key}
        align='flex-start'
        size='small'
        height='2em'
        iconType={iconType}
        label={item}
      />
    ) : (
      <Stack key={key}>
        <LabelWithIcon
          align='flex-start'
          height='1.75em'
          size='small'
          iconType={iconType}
          label={capitalizeFirst(
            [item.condition, item.operator === 'some' ? 'one' : 'all', 'of the following:']
              .filter(Boolean)
              .join(' ')
          )}
        />
        <Box paddingLeft='28px'>{item.items.map((x, i) => renderPrerequisiteItem(x, i))}</Box>
      </Stack>
    );

  return (
    <Accordion
      disableGutters
      expanded={isExpanded}
      onChange={() => numPrerequisites && setIsExpanded(!isExpanded)}
    >
      <AccordionSummary expandIcon={numPrerequisites > 0 && <ExpandMore />}>
        <Stack padding='12px 8px' spacing='12px'>
          <Typography variant='subtitle2'>Enrollment Requirements</Typography>
          <Typography variant='body2'>
            {pluralize(numPrerequisites || 'No', 'prerequisite')}
          </Typography>
          <LabelWithIcon
            color={isEligible ? 'success' : 'error'}
            iconType={iconType}
            label={
              isEligible
                ? numPrerequisites
                  ? 'You fulfill all prerequisites for this course'
                  : 'This course is open to everyone'
                : 'You have unfulfilled prerequisites'
            }
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ borderTop: '1px lightgray solid' }}>
        <Stack padding='8px 8px 0px' spacing='12px' whiteSpace='pre-wrap'>
          {prerequisiteList.hasOwnProperty('items') && (
            <>
              <Typography variant='subtitle2'>Course Prerequisites</Typography>
              {renderPrerequisiteItem(prerequisiteList)}
            </>
          )}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
