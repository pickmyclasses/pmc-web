import React, { useState } from 'react';
import {
  fetchClassesByCourseID,
  fetchCourseByID,
  fetchHomePageCourses,
  fetchReviewsByCourseID,
} from '../api';
import PageWithScheduler from './PageWithScheduler';
import { useMount } from '../utils';
import CourseCardGrid from '../components/CourseCardGrid/CourseCardGrid';
import ClickableIndicator from '../components/CourseCardGrid/CourseCard/ClickableIndicator';
import { Box, Divider, Typography } from '@mui/material';

export default function HomePage({ shouldShowScheduler }) {
  const [courseCategories, setCourseCategories] = useState([]);

  useMount(() =>
    fetchHomePageCourses().then((categories) => {
      setCourseCategories(
        categories.map(({ category, courseIDs }) => ({
          category,
          courses: Array(courseIDs.length).fill({}),
        }))
      );
      fetchCategories(categories, setCourseCategories);
    })
  );

  return (
    <PageWithScheduler shouldShowScheduler={shouldShowScheduler}>
      <Box sx={{ paddingTop: '32px' }}>
        {courseCategories &&
          courseCategories.map(({ category, courses }, i) => (
            <Box key={i}>
              {i > 0 && <Divider sx={{ marginY: '16px' }} />}
              <ClickableIndicator>
                <Typography variant='overline' fontSize='medium' sx={{ opacity: 0.75 }}>
                  {category}
                </Typography>
              </ClickableIndicator>
              <CourseCardGrid
                key={i}
                title={category}
                courses={courses}
                numColumns={shouldShowScheduler ? 3 : 4}
              />
            </Box>
          ))}
      </Box>
    </PageWithScheduler>
  );
}

const fetchCategories = (categories, onFetched) => {
  Promise.all(
    categories.map(
      ({ category, courseIDs }) =>
        new Promise((onFetchedCourses) =>
          fetchCoursesByCourseIDs(courseIDs, (courses) =>
            onFetchedCourses({ category, courses })
          )
        )
    )
  ).then((x) => onFetched(x));
};

export const fetchCoursesByCourseIDs = (courseIDs, onFetched) => {
  Promise.all(
    courseIDs.map((courseID) =>
      Promise.all([fetchCourseByID(courseID), fetchReviewsByCourseID(courseID)])
    )
  ).then((courses) =>
    onFetched(
      courses.map(([course, reviews]) => ({
        course: course.data.data.course,
        classes: course.data.data.classes,
        reviews: reviews.data.data,
      }))
    )
  );
};
