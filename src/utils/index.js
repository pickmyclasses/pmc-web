import { useEffect, useState } from 'react';
import Color from 'color';
import md5 from 'md5';

/**
 * CleanObject removes the empty parts of the request
 * eg. localhost:3000/class?name=&id=12
 * name= is empty here but will be passed to the backend
 * this function removes name=
 */
export const cleanObject = (object) => {
  const result = { ...object };
  object.keys(object).forEach((key) => {
    const value = object[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

/**
 * IsFalsy checks if the value is 0 or false
 */
export const isFalsy = (value) => (value === 0 ? false : !!value);

/**
 * Registers function calls for when a component is mounted (first rendered) and for when the
 * component is unmounted.
 * @param {function(): any} onMounted
 * @example
 * useMount(() => {
 *   console.log('Component mounted');
 *   return () => console.log('Component unmounted');
 * }
 */
export const useMount = (onMounted) => {
  // eslint-disable-next-line
  useEffect(onMounted, []);
};

/**
 * UseDebounce prevents the behavior that whenever the input is typed, a request is sent
 * eg. when user enter words in input box (search box), requests will be sent whenever a letter is typed
 * this prevents the requests being sent before user finish typing
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

/**
 * Returns the time of day in `h:mmt` from number of seconds since midnight.
 * @example secondsToTimeString(43260) // '12:01pm'
 */
export const secondsToTimeString = (seconds) =>
  `${Math.floor(seconds / 3600) % 12 || 12}:${Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, '0')}${seconds < 43200 ? 'am' : 'pm'}`;

/**
 * Returns the number of seconds past midnight a string of time represents.
 * @example parseTime('12:01 AM') // 60
 */
export const parseTime = (s) => {
  s = s.trim().toLowerCase();
  let offset = 0;
  if (s.includes('a') || s.includes('p')) {
    if (s.includes('p')) offset = 43200;
    s = s.replace(/^12/, '0').replace(/[^\d.:]+/g, '');
  }
  return Date.parse(`1970-1-1 ${s}:00Z`) / 1000 + offset;
};

/**
 * Returns the numerical representation of a weekday given its name or abbreviation.
 * @example parseDay('Weds') // 3
 */
export const parseDay = (s) =>
  ['su', 'm', 'tu', 'w', 'th', 'f', 'sa'].findIndex((day) => s.toLowerCase().startsWith(day));

/**
 * Returns the list of weekdays a string represents, assuming each new day starts with an
 * uppercase letter.
 * @example parseDayList('TuTh') // [2, 4]
 * @example parseDayList('Mo-Fr') // [1, 2, 3, 4, 5]
 */
export const parseDayList = (s) => {
  if (s.includes('-')) {
    // D1-D2
    return Array(7)
      .fill(null)
      .map((_, i) => i)
      .slice(...s.split('-').map((day, i) => parseDay(day) + i));
  }

  // D1D2D3...
  return Array.from(
    new Set(
      s
        .split(/(?=[A-Z])/)
        .map((day) => parseDay(day))
        .sort()
    )
  );
};

/**
 * Formats a `CatalogCourseName` so that there is a space separating the department code and
 * course number.
 * @example formatCourseName('CS1410') // 'CS 1410'
 */
export const formatCourseName = (catalogCourseName) =>
  catalogCourseName.split(/(?<!\d)(?=\d)/).join(' ');

/**
 * Formats an instructor's name from the database version to be more human-readable.
 * @example formatInstructorName('SMITH, JOHN W') // 'John W. Smith'
 */
export const formatInstructorName = (s) => {
  if (!s) return 'TBD';
  let tokens = s
    .split(/[^A-Za-z]+/)
    .map((x) => x.charAt(0) + (x.slice(1).toLowerCase() || '.'));
  tokens.push(tokens.shift());
  return tokens.join(' ');
};

/** @example capitalizeFirst('john') // 'John' */
export const capitalizeFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

/** Returns "x-y credits" for the number of credits a course rewards. */
export const formatCreditRange = (course) => {
  const min = Math.min(course.minCredit, course.maxCredit);
  const max = Math.max(course.minCredit, course.maxCredit);
  return (min === max ? '' : min + '–') + pluralize(max, 'credit');
};

/**
 * Converts a prerequisites into a list. Co-requisites are ignored.
 * @example
 * formatPrerequisites('A AND (B OR C)')
 * // Returns:
 * {
 *   policy: 'every',
 *   items: [
 *     'A',
 *     {
 *       policy: 'some',
 *       items: ['B', 'C'],
 *     },
 *   ],
 * }
 */
export const formatPrerequisites = (s) => {
  const rawString = s
    .replace(/co-?requisites:[\s^\s]*/gi, '')
    .replace(/pre-?requisites:/gi, '')
    .replace(/[\r\n]+/g, '');

  try {
    // eslint-disable-next-line
    const rawList = eval(
      `['${rawString}']`
        .replace(/\(/g, "',['")
        .replace(/\)/g, "'],'")
        .replace(/OR/g, "','OR','")
        .replace(/AND/g, "','AND','")
    );
    return prunePrerequisiteList(rawList);
  } catch (error) {
    return prunePrerequisiteList([]);
  }
};

const prunePrerequisiteList = (p) => {
  const res = {
    operator: p.includes('AND') ? 'every' : 'some',
    items: p
      .map((x) => (typeof x === 'object' ? prunePrerequisiteList(x)[0] : x.trim()))
      .filter(
        (x) =>
          typeof x === 'object' ||
          (x.replace(/[^A-Za-z]+/g, '').length && x !== 'AND' && x !== 'OR')
      ),
  };
  const count = (x) => (typeof x === 'object' ? x.items.reduce((n, y) => n + count(y), 0) : 1);
  return [res, count(res)];
};

/**
 * Singularize or pluralize a word based on its count.
 * @example
 * pluralize(2, 'dog') // '2 dogs'
 * pluralize(2, 'goose', 'geese') // '2 geese'
 */
export const pluralize = (count, singular, plural = '-s') =>
  `${count} ${count === 1 ? singular : plural.replace('-', singular)}`;

/**
 * Returns the cartesian product across multiple arrays.
 * @see https://stackoverflow.com/a/43053803
 * @example cartesian([1, 2], [3, 4]) // [[1, 3], [1, 4], [2, 3], [2, 4]]
 */
export const cartesian = (...args) =>
  args.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

/**
 * @see https://stackoverflow.com/a/34890276
 * @example groupBy(['one', 'two', 'three'], 'length') // {3: ['one', 'two'], 5: ['three']}
 */
export const groupBy = (values, key) =>
  values.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});

/*
 *Calculate average score of course reviews
 */
export function calculateAverageScore({ reviews }) {
  let sum = 0;
  if (reviews == null || reviews.length === 0) {
    return 0;
  }
  for (let step = 0; step < reviews.length; step++) {
    sum += reviews[step].rating;
  }
  return sum / reviews.length;
}

/**
 * Check if the input string is a number
 */
export const isNumeric = (str) => {
  if (typeof str != 'string') return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
};

export const getInitials = (name) => {
  const tokens = name.split(/\s+/);
  const firstAndLast = name.includes(',')
    ? [tokens[1], tokens[0]]
    : [tokens[0], tokens[tokens.length - 1]];
  return firstAndLast.map((x) => x.charAt(0).toUpperCase()).join('');
};

export const getColorByString = (s, fixSaturationAndLightness = true) => {
  const color = Color(
    '#' +
      md5(s.split('').reduce((acc, x) => ((acc << 5) - acc + x.charCodeAt(0)) | 0, 0)).slice(-6)
  );
  if (!fixSaturationAndLightness) return color.hex();
  return color.saturationl(25).lightness(50).hex();
};
