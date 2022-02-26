import { Box, Typography, useTheme } from '@mui/material';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { SetClassesToHighlightContext } from '../Scheduler/ContainerWithStaticScheduler';
import { cartesian, groupBy, parseDayList, pluralize } from '../../utils';
import { SchedulerContext } from '../Scheduler/ContainerWithScheduler';
import { getComponent, getInstructor } from '../Scheduler/ShoppingCart';
import { getTransitionForStyles } from '../Scheduler/Timeline';
import DaysIndicator from './CourseCard/DaysIndicator';
import { NavigationBarContext } from '../NavigationBar/ContainerWithNavigationBar';

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

  const { shouldShowStaticScheduler } = useContext(NavigationBarContext);
  const { classesInShoppingCart } = useContext(SchedulerContext);
  const setClassesToHighlight = useContext(SetClassesToHighlightContext);

  const [onlineOffering, setOnlineOffering] = useState(null);
  const [numHiddenOfferings, setNumHiddenOfferings] = useState(0);
  const [comboInShoppingCart, setComboInShoppingCart] = useState(null);
  const [representativeOfferings, setRepresentativeOfferings] = useState([]);
  const [mouseEnteredIndex, setMouseEnteredIndex] = useState(-1);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [highlightedClassIDs, setHighlightedClassIDs] = useState(null);

  // Construct a list of n representative offering days from the list of classes offered. Favor
  // offerings that occupy fewer days.
  useEffect(() => {
    const [offerings, comboInShoppingCart] = enumerateOfferings(
      classes,
      course,
      classesInShoppingCart
    );
    setComboInShoppingCart(comboInShoppingCart);

    const numHiddenOfferings = offerings.length <= maxRows ? 0 : offerings.length - maxRows + 1;
    let representativeOfferings = offerings.slice(0, offerings.length - numHiddenOfferings);

    const hasOnlineOffering = representativeOfferings[0]?.days[0] === -1;
    setOnlineOffering(hasOnlineOffering ? representativeOfferings[0] : null);
    if (hasOnlineOffering) representativeOfferings.shift();

    setNumHiddenOfferings(numHiddenOfferings);
    setRepresentativeOfferings(representativeOfferings);
  }, [classes, course, classesInShoppingCart, maxRows]);

  // Handle highlight and un-highlight logics.
  useEffect(() => {
    if (
      (representativeOfferings.length || onlineOffering || comboInShoppingCart) &&
      shouldShowStaticScheduler &&
      enableHighlight &&
      (mouseEnteredIndex >= 0 || isMouseEntered)
    ) {
      // Highlight
      const indexToHighlight = Math.max(mouseEnteredIndex, 0);
      const comboToHighlight =
        indexToHighlight === representativeOfferings.length
          ? onlineOffering?.combo || comboInShoppingCart
          : representativeOfferings[indexToHighlight].combo;
      setHighlightedIndex(indexToHighlight);
      setClassesToHighlight(
        comboToHighlight.map((classData) => ({
          classData,
          course,
          highlight: true,
        }))
      );
      setHighlightedClassIDs(comboToHighlight.map((x) => x.ID));
    } else if (highlightedIndex >= 0) {
      // Un-highlight
      setClassesToHighlight((highlightedClasses) =>
        highlightedClasses.filter(
          ({ classData }) => !highlightedClassIDs.includes(classData.ID)
        )
      );
      setHighlightedIndex(-1);
      setHighlightedClassIDs(null);
      if (!isMouseEntered) setMouseEnteredIndex(-1);
    }
    // eslint-disable-next-line
  }, [
    representativeOfferings,
    enableHighlight,
    isMouseEntered,
    shouldShowStaticScheduler,
    setClassesToHighlight,
    mouseEnteredIndex,
    course,
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
        {representativeOfferings.map(({ days }, i) => (
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
        <Box
          onMouseEnter={
            onlineOffering
              ? () => setMouseEnteredIndex(representativeOfferings.length)
              : comboInShoppingCart && (() => setMouseEnteredIndex(0))
          }
          onMouseLeave={() => setMouseEnteredIndex(-1)}
          sx={{
            '*': {
              color:
                onlineOffering && highlightedIndex === representativeOfferings.length
                  ? theme.palette.success.main
                  : '',
              transition: getTransitionForStyles('color'),
            },
          }}
        >
          {numHiddenOfferings > 0 ? (
            <>
              <Typography variant='body2' align={textAlign}>
                {representativeOfferings.length === 0 ? '' : '+'}
                {pluralize(numHiddenOfferings, 'offering')}
              </Typography>
              {onlineOffering && (
                <Typography variant='body2' align={textAlign} sx={{ marginTop: '-8px' }}>
                  (1 online)
                </Typography>
              )}
            </>
          ) : (
            onlineOffering &&
            (representativeOfferings.length === 0 ? (
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
      </Box>
    </>
  );
}

/**
 * Returns all possible combinations of weekdays across all components of the course. For
 * example, if an instructor offers lectures on (M, W) and labs on {(H,), (F,)}, this function
 * returns [(M, W, H), (M, W, F)].
 */
const enumerateOfferings = (classes, course, classesInShoppingCart) => {
  if (!classes) return [];

  let daysAndCombos = [];

  // If the course is in the shopping cart, prioritize that offering and move it to the top of
  // offering list.
  const comboInShoppingCart = classesInShoppingCart
    .filter((x) => x.course.ID === course.ID)
    .map((x) => x.classData);
  if (comboInShoppingCart?.length) {
    daysAndCombos.push({
      dayString: getSortedOfferedDayString(comboInShoppingCart),
      combo: comboInShoppingCart,
      isInShoppingCart: true,
    });
  }

  // Enumerate all possible offered day combinations and pick one session (lecture, lab, etc.)
  // as an example in that day-combo.
  // The following assumes that if a student registers for a lecture from professor P, they can
  // register for any labs from that professor (same goes for any other sessions than labs).
  const classesByInstructor = groupBy(
    classes.map((x) => ({ ...x, instructor: getInstructor(x) })),
    'instructor'
  );
  for (let instructorClasses of Object.values(classesByInstructor)) {
    const classesByComponent = groupBy(
      instructorClasses.map((x) => ({ ...x, component: getComponent(x) })),
      'component'
    );
    // Reverse to favor sessions that are later in the day (closer to the night). No particular
    // reason to do this though... I (Q) do this because in the project demo we are likely to
    // have afternoon classes in the shopping cart, and showing later classes looks nicer.
    const componentCombos = cartesian(...Object.values(classesByComponent)).reverse();
    for (let combo of componentCombos) {
      combo = [].concat(combo);
      const dayString = getSortedOfferedDayString(combo);

      if (!daysAndCombos.find((x) => x.dayString === dayString)) {
        daysAndCombos.push({ dayString, combo, isInShoppingCart: false });
      }
    }
  }

  return [
    daysAndCombos
      .sort((x, y) => x.dayString.localeCompare(y.dayString))
      .map(({ dayString, ...x }) => ({ ...x, days: dayStringToDayList(dayString) }))
      .sort((x, y) => x.days.length - y.days.length) // top-list classes occupying fewer days
      .sort((x, y) => y.isInShoppingCart - x.isInShoppingCart) // top-list combo in cart
      .sort((x, y) => (y.days[0] === -1) - (x.days[0] === -1)), // top-list online classes
    comboInShoppingCart.length ? comboInShoppingCart : null,
  ];
};

const getSortedOfferedDayString = (combo) =>
  parseDayList(combo.map((x) => x.OfferDate).join(''))
    .sort()
    .join(' ');

const dayStringToDayList = (dayString) => dayString.split(' ').map((day) => +day);
