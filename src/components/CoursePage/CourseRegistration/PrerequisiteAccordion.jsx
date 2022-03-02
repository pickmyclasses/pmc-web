import { Check, Close, ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  colors,
  Stack,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { formatPrerequisites, capitalizeFirst } from 'utils';
import { getEligibility } from '../../CourseCardGrid/CourseCard/CourseEligibilityIndicator';
import { SchedulerContext } from '../../Scheduler/ContainerWithScheduler';
import LabelWithIcon from '../LabelWithIcon';

export default function PrerequisiteAccordion({ course }) {
  const { classesInShoppingCart } = useContext(SchedulerContext);

  const [isEligible, setIsEligible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const isEligible =
      getEligibility(course, classesInShoppingCart) !== 'incomplete-prerequisites';
    setIsEligible(isEligible);
    setIsExpanded(!isEligible);
  }, [course, classesInShoppingCart]);

  // TODO Q: This is only a placeholder.
  const iconType = isEligible ? Check : Close;

  const renderPrerequisiteItem = (item, key) =>
    typeof item === 'string' ? (
      <LabelWithIcon
        key={key}
        align='flex-start'
        height='2em'
        iconType={iconType}
        label={item}
      />
    ) : (
      <Stack key={key}>
        <LabelWithIcon
          align='flex-start'
          height='1.75em'
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

  console.log('** got', course.prerequisites, formatPrerequisites(course.prerequisites));
  return (
    <Accordion disableGutters expanded={isExpanded} onChange={() => setIsExpanded(!isExpanded)}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{ backgroundColor: colors[isEligible ? 'green' : 'red'][50] }}
      >
        <Stack padding='8px'>
          <Typography variant='subtitle2' gutterBottom>
            Course Prerequisites
          </Typography>
          <LabelWithIcon
            iconType={iconType}
            label={
              isEligible
                ? 'You fulfill all prerequisites for this course.'
                : 'You have unfulfilled prerequisites.'
            }
          />
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ borderTop: '1px lightgray solid' }}>
        <Stack padding='8px' spacing='12px' whiteSpace='pre-wrap'>
          {renderPrerequisiteItem(formatPrerequisites(course.prerequisites))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
