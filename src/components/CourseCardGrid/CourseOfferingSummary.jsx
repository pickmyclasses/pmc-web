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

  const { isSchedulerShowing, classesInShoppingCart, setClassesToHighlight } = useContext(
    SchedulerDisplayContentContext
  );

  const [hasOnlineOffering, setHasOnlineOffering] = useState(false);
  const [numHiddenOfferings, setNumHiddenOfferings] = useState(0);
  const [representativeOfferings, setRepresentativeOfferings] = useState([]);
  const [mouseEnteredIndex, setMouseEnteredIndex] = useState(-1);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [highlightedClassIDs, setHighlightedClassIDs] = useState(null);

  // Construct a list of n representative offering days from the list of classes offered. Favor
  // offerings that occupy fewer days.
  useEffect(() => {
    const offerings = enumerateOfferings(classes, course, classesInShoppingCart);
    const numHiddenOfferings = offerings.length <= maxRows ? 0 : offerings.length - maxRows + 1;
    let representativeOfferings = offerings.slice(0, offerings.length - numHiddenOfferings);

    const hasOnlineOffering = representativeOfferings[0]?.days[0] === -1;
    if (hasOnlineOffering) representativeOfferings.shift();

    setHasOnlineOffering(hasOnlineOffering);
    setNumHiddenOfferings(numHiddenOfferings);
    setRepresentativeOfferings(representativeOfferings);
  }, [classes, course, classesInShoppingCart, maxRows]);

  // Handle highlight and un-highlight logics.

  useEffect(() => {
    if (
      representativeOfferings.length &&
      isSchedulerShowing &&
      enableHighlight &&
      isMouseEntered
    ) {
      // Highlight
      const indexToHighlight = Math.max(mouseEnteredIndex, 0); // default h'lighting first item
      const combosToHighlight = representativeOfferings[indexToHighlight].combo;
      setHighlightedIndex(indexToHighlight);
      setClassesToHighlight(
        combosToHighlight.map((classData) => ({
          classData,
          course,
          highlight: true,
        }))
      );
      setHighlightedClassIDs(combosToHighlight.map((x) => x.ID));
    } else if (highlightedIndex >= 0) {
      // Un-highlight
      setClassesToHighlight((highlightedClasses) =>
        highlightedClasses.filter(
          ({ classData }) => !highlightedClassIDs.includes(classData.ID)
        )
      );
      setHighlightedIndex(-1);
      setHighlightedClassIDs(null);
    }
    // eslint-disable-next-line
  }, [
    representativeOfferings,
    enableHighlight,
    isMouseEntered,
    isSchedulerShowing,
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
            onMouseLeave={() => !isMouseEntered && setMouseEnteredIndex(-1)}
            isMouseEntered={i === highlightedIndex}
          />
        ))}
        {numHiddenOfferings > 0 ? (
          <>
            <Typography variant='body2' align={textAlign}>
              {representativeOfferings.length === 0 ? '' : '+'}
              {pluralize(numHiddenOfferings, 'offering')}
            </Typography>
            {hasOnlineOffering && (
              <Typography variant='body2' align={textAlign} sx={{ marginTop: '-8px' }}>
                (1 online)
              </Typography>
            )}
          </>
        ) : (
          hasOnlineOffering &&
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
  if (comboInShoppingCart.length > 0) {
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

  return daysAndCombos
    .sort((x, y) => x.dayString.localeCompare(y.dayString))
    .map(({ dayString, ...x }) => ({ ...x, days: dayStringToDayList(dayString) }))
    .sort((x, y) => x.days.length - y.days.length) // top-list classes occupying fewer days
    .sort((x, y) => y.isInShoppingCart - x.isInShoppingCart) // top-list combo in cart
    .sort((x, y) => (y.days[0] === -1) - (x.days[0] === -1)); // top-list online classes
};

const getSortedOfferedDayString = (combo) =>
  parseDayList(combo.map((x) => x.OfferDate).join(''))
    .sort()
    .join(' ');

const dayStringToDayList = (dayString) => dayString.split(' ').map((day) => +day);
