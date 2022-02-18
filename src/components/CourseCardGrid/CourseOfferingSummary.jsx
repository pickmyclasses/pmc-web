import { Box, Typography, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { SchedulerDisplayContentContext } from '../../pages/PageWithScheduler';
import { cartesian, groupBy, parseDayList, pluralize } from '../../utils';
import { getComponent, getInstructor } from '../Scheduler/ShoppingCart';
import DaysIndicator from './CourseCard/DaysIndicator';

export default function CourseOfferingSummary({
  classes,
  course,
  width,
  rowHeight = 1.75,
  maxRows = 999,
  textAlign = 'right',
  enableHighlight = false,
  isMouseEntered = false,
}) {
  const theme = useTheme();

  const { isSchedulerShowing, setClassesToHighlight } = useContext(
    SchedulerDisplayContentContext
  );

  const [mouseEnteredIndex, setMouseEnteredIndex] = useState(-1);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  // Construct a list of n representative offering days from the list of classes offered. Favor
  // offerings that occupy fewer days.
  const offeringDays = getOfferingDays(classes).sort((x, y) => x.days.length - y.days.length);
  const numHidden = offeringDays.length <= maxRows ? 0 : offeringDays.length - maxRows + 1;
  let representativeOfferingDays = offeringDays.slice(0, offeringDays.length - numHidden);

  const hasOnlineOffering = representativeOfferingDays[0]?.days[0] === -1;
  if (hasOnlineOffering) representativeOfferingDays.shift();

  useEffect(() => {
    if (
      representativeOfferingDays.length === 0 ||
      !isSchedulerShowing ||
      !enableHighlight ||
      !isMouseEntered
    ) {
      if (highlightedIndex >= 0) {
        setClassesToHighlight((highlightedClasses) =>
          highlightedClasses.filter(
            ({ classData }) =>
              !representativeOfferingDays[highlightedIndex].combos.find(
                (x) => x.ID === classData.ID
              )
          )
        );
        setHighlightedIndex(-1);
      }
      return;
    }

    const indexToHighlight = Math.max(mouseEnteredIndex, 0);
    setHighlightedIndex(indexToHighlight);
    setClassesToHighlight(
      representativeOfferingDays[indexToHighlight].combos.map((classData) => ({
        classData,
        course,
        highlight: true,
      }))
    );
  }, [
    course,
    enableHighlight,
    isMouseEntered,
    mouseEnteredIndex,
    highlightedIndex,
    isSchedulerShowing,
    setClassesToHighlight,
    representativeOfferingDays,
  ]);

  if (!classes || classes.length === 0) {
    return (
      <Typography
        variant='body2'
        align={textAlign}
        color={theme.palette.text.secondary}
        sx={{ width }}
      >
        No offerings
      </Typography>
    );
  }

  return (
    <>
      <Box sx={{ width, '> *:not(:last-child)': { paddingBottom: '8px' } }}>
        {representativeOfferingDays.map(({ days }, i) => (
          <DaysIndicator
            key={i}
            width='100%'
            height={rowHeight}
            days={days}
            onMouseEnter={() => setMouseEnteredIndex(i)}
            onMouseLeave={() => setMouseEnteredIndex(-1)}
            isMouseEntered={i === highlightedIndex}
          />
        ))}
        {numHidden > 0 ? (
          <>
            <Typography variant='body2' align={textAlign}>
              {numHidden === offeringDays.length ? '' : '+'}
              {pluralize(numHidden, 'offering')}
            </Typography>
            {hasOnlineOffering && (
              <Typography variant='body2' align={textAlign} sx={{ marginTop: '-8px' }}>
                (1 online)
              </Typography>
            )}
          </>
        ) : (
          hasOnlineOffering &&
          (representativeOfferingDays.length === 0 ? (
            <Typography variant='body2' align={textAlign}>
              Offered online
            </Typography>
          ) : (
            <Typography variant='body2' align={textAlign} sx={{ fontSize: 'x-small' }}>
              +1 online offering
            </Typography>
          ))
        )}
      </Box>
    </>
  );
}

/**
 * Returns all possible combinations of weekdays across all components of the course. For
 * example, if an instructor offers lectures on (M, W) and labs on {(H,), (F,)}, this function
 * returns [(M, W, H), (M, W, F)].
 */
const getOfferingDays = (classes) => {
  if (!classes) return [];

  const classesByInstructor = groupBy(
    classes.map((x) => ({ instructor: getInstructor(x), ...x })),
    'instructor'
  );
  let res = [];
  for (let instructorClasses of Object.values(classesByInstructor)) {
    const classesByComponent = groupBy(
      instructorClasses.map((x) => ({ component: getComponent(x), ...x })),
      'component'
    );
    const componentCombos = cartesian(...Object.values(classesByComponent));
    for (let componentCombo of componentCombos) {
      componentCombo = [].concat(componentCombo);
      const dayString = componentCombo.map((x) => x.OfferDate).join('');
      const sortedDayString = parseDayList(dayString).sort().join(' ');

      const target = res.find((x) => x.dayString === sortedDayString);
      if (target) {
        target.combos.add(...componentCombo);
      } else {
        res.push({ dayString: sortedDayString, combos: new Set(componentCombo) });
      }
    }
  }
  return res
    .sort((x, y) => x.dayString.localeCompare(y.dayString))
    .map(({ dayString, combos }) => ({
      days: dayString.split(' ').map((day) => +day),
      combos: [...combos],
    }));
};
