import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { cartesian, groupBy, parseDayList, pluralize } from '../../utils';
import { getComponent, getInstructor } from '../Scheduler/ShoppingCart';
import DaysIndicator from './CourseCard/DaysIndicator';

export default function CourseOfferingSummary({
  classes,
  width,
  rowHeight = 1.75,
  maxRows = 999,
  textAlign = 'right',
  enableMouseEnteredState = false,
  isMouseEntered = false,
}) {
  const theme = useTheme();

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

  // Construct a list of n representative offering days from the list of classes offered. Favor
  // offerings that occupy fewer days.
  const offeringDays = getOfferingDays(classes)
    .sort()
    .sort((x, y) => x.length - y.length);
  const numHidden = offeringDays.length <= maxRows ? 0 : offeringDays.length - maxRows + 1;
  let representativeOfferingDays = offeringDays.slice(0, offeringDays.length - numHidden);

  const hasOnlineOffering = representativeOfferingDays[0]?.[0] === -1;
  if (hasOnlineOffering) representativeOfferingDays.shift();

  return (
    <>
      <Box sx={{ width, '> *:not(:last-child)': { marginBottom: '8px' } }}>
        {representativeOfferingDays.map((days, i) => (
          <DaysIndicator key={i} width='100%' height={rowHeight} days={days} onMouseEnter={()=>enableMouseEnteredState} />
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
              Meets online
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
      const dayString =
        componentCombo instanceof Array
          ? componentCombo.map((x) => x.OfferDate).join('')
          : componentCombo.OfferDate;
      const sortedDayString = parseDayList(dayString).sort().join(' ');
      if (res.includes(sortedDayString)) continue;
      res.push(sortedDayString);
    }
  }
  return res.map((dayString) => dayString.split(' ').map((day) => +day));
};
