import React, { useContext, useState } from 'react';
import { fetchCourseByID, fetchHomePageCourses, fetchReviewsByCourseID } from '../api';
import PageWithScheduler from './PageWithScheduler';
import { useMount } from '../utils';
import CourseCardGrid from '../components/CourseCardGrid/CourseCardGrid';
import ClickableIndicator from '../components/CourseCardGrid/CourseCard/ClickableIndicator';
import { Box, Divider, Typography } from '@mui/material';
import { AppContext } from '../App';

export default function HomePage() {
  const { shouldShowScheduler } = useContext(AppContext);
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
    <PageWithScheduler>
      <Box sx={{ padding: '32px 32px' }}>
        {courseCategories &&
          courseCategories.map(({ category, courses }, i) => (
            <Box key={i}>
              {i > 0 && <Divider sx={{ marginY: '16px' }} />}
              <ClickableIndicator>
                <Typography variant='overline' fontSize='medium' sx={{ opacity: 0.75 }}>
                  {category}
                </Typography>
              </ClickableIndicator>
              <Box sx={{ padding: '16px 0 24px 0' }}>
                <CourseCardGrid
                  key={i}
                  title={category}
                  courses={courses}
                  numColumns={shouldShowScheduler ? 3 : 4}
                />
              </Box>
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
