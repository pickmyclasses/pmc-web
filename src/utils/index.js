import { useEffect, useState } from 'react';

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
 * UseMount mounts data (render) once only when the page loaded
 * use this whenever the data only loads once per load
 */
export const useMount = (callback) => {
  // eslint-disable-next-line
  useEffect(callback, []);
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
 * Returns the number of seconds past midnight a string of time represents.
 * @example parseTime('12:01 AM') // 60
 */
export const parseTime = (s) =>
  new Date(`1970-01-01 ${s.split(/(?<=\d)(?=[A-Za-z])/).join(' ')} Z`).getTime() / 1000;

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
 */
export const parseDayList = (s) => [
  ...new Set(
    s
      .split(/(?=[A-Z])/)
      .map((day) => parseDay(day))
      .sort()
  ),
];

/**
 * Formats a `CatalogCourseName` so that there is a space separating the department code and
 * course number.
 * @example formatCourseName('CS1410') // 'CS 1410'
 */
export const formatCourseName = (catalogCourseName) =>
  catalogCourseName.split(/(?<!\d)(?=\d)/).join(' ');

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
