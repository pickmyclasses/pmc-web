import { fetchCourseIDsByCourseNames } from 'api';
import { formatPrerequisites } from 'utils';

/**
 * Provides functions to fetch prerequisite course IDs. TODO Q: Remove this once the backend
 * has the direct support for this.
 */
export default class PrerequisitesManager {
  /**
   * The course IDs the user has in their history.
   * @type {Set<Number>}
   */
  static historyCourseIDs = new Set();

  /**
   * @type {Set<String>}
   * @private
   */
  static _courseNamesToFetch = new Set();

  /**
   * @type {Map<String, Number>}
   * @private
   */
  static _fetchedCourseIDByName = new Map();

  /** @private */
  static _courseNamePattern = /[A-Z]{2,5} \d{3,4}/;

  /** @private */
  static _formatCourseName(s) {
    return s.replace(' ', '').toUpperCase();
  }

  /** @private */
  static _recordCourseIDsFromPrerequisiteList(prerequisiteList) {
    for (let item of prerequisiteList.items) {
      if (typeof item === 'string') {
        const extractedCourseNames = item.match(PrerequisitesManager._courseNamePattern);
        if (
          extractedCourseNames?.length === 1 &&
          !PrerequisitesManager._fetchedCourseIDByName.has(extractedCourseNames[0])
        )
          PrerequisitesManager._courseNamesToFetch.add(
            PrerequisitesManager._formatCourseName(extractedCourseNames[0])
          );
      } else {
        PrerequisitesManager._recordCourseIDsFromPrerequisiteList(item);
      }
    }
  }

  /**
   * Records the names of prerequisite courses of a list of courses. Call this method before
   * fetching and assigning the prerequisite course IDs for a list of courses.
   */
  static prepare(courses) {
    for (let course of courses) {
      course.prerequisiteList = formatPrerequisites(course.prerequisites)[0];
      PrerequisitesManager._recordCourseIDsFromPrerequisiteList(course.prerequisiteList);
    }
  }

  /** @private */
  static _parsePrerequisiteItem(item) {
    if (typeof item === 'string') {
      const extractedCourseNames = item.match(PrerequisitesManager._courseNamePattern);
      if (extractedCourseNames?.length === 1) {
        const courseName = PrerequisitesManager._formatCourseName(extractedCourseNames[0]);
        if (PrerequisitesManager._fetchedCourseIDByName.has(courseName)) {
          const id = PrerequisitesManager._fetchedCourseIDByName.get(courseName);
          return {
            type: 'course',
            name: item,
            id,
            isCompleted: PrerequisitesManager.historyCourseIDs.has(id),
          };
        }
      }
      // The following line is commented to ignore all textual prerequisites (that could
      // not be parsed into course IDs).
      // return { type: 'text', text: item, isCompleted: true };
      return null;
    }
    return { ...PrerequisitesManager._assignPrerequisiteList(item) };
  }

  /** @private */
  static _assignPrerequisiteList(prerequisiteList) {
    let processedList = {
      type: 'list',
      policy: prerequisiteList.policy,
      items: prerequisiteList.items
        .map(PrerequisitesManager._parsePrerequisiteItem)
        .filter((x) => x && (x.type !== 'list' || x.numItems)),
    };
    processedList.numItems = processedList.items
      .map((x) => (x.type === 'list' ? x.numItems : +(x.type === 'course')))
      .reduce((acc, x) => acc + x, 0);
    processedList.isCompleted =
      !processedList.numItems ||
      processedList.items[processedList.policy]((x) => x.isCompleted);

    return processedList;
  }

  /**
   * Fetches, formats, assigns the IDs of the prerequisite courses of a list of courses. Call
   * this method if `PrerequisitesManager.prepare` was called before this.
   */
  static async assign(courses) {
    for (let { name, id } of await fetchCourseIDsByCourseNames([
      ...PrerequisitesManager._courseNamesToFetch,
    ]))
      PrerequisitesManager._fetchedCourseIDByName.set(name, id);
    PrerequisitesManager._courseNamesToFetch.clear();

    for (let course of courses) {
      course.prerequisiteList = PrerequisitesManager._assignPrerequisiteList(
        course.prerequisiteList
      );
      course.isTaken = PrerequisitesManager.historyCourseIDs.has(course.id);
    }
  }

  /** Fetches, formats, assigns the IDs of the prerequisite courses of a list of courses. */
  static async prepareAndAssign(courses) {
    PrerequisitesManager.prepare(courses);
    await PrerequisitesManager.assign(courses);
  }
}
