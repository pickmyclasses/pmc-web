import React, { useEffect, useState } from 'react';
import { Box, Chip, Divider, Grid, Skeleton, Typography } from '@mui/material';
import { fetchCourseByID } from '../../api';
import CourseCard from './CourseCard/CourseCard';
import { formatCourseName } from '../../utils';

export default function CourseCardGrid({ numColumns = 3, title, courseIDs }) {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    if (courseIDs) {
      Promise.all(courseIDs.map((courseID) => fetchCourseByID(courseID))).then((data) =>
        setCourses(data.map((x) => x['data']['data']['course']))
      );
    }
  }, [courseIDs]);

  const renderCourseCards = () =>
    courses.map((course, i) => (
      <Grid key={i} item xs={60} sm={60 / numColumns}>
        <CourseCard
          name={formatCourseName(course['CatalogCourseName'])}
          title={course['Title']}
          description={course['Description']}
          imageURL={getFakeCourseImageURL(course['ID'])}
          detailPageURL={`/course/${course['ID']}`}
        />
      </Grid>
    ));

  const renderCardSkeletons = () =>
    courseIDs.map((_, i) => (
      <Grid key={i} item xs={60} sm={60 / numColumns}>
        {/* TODO (QC): Ideally we should embed the skeleton inside the CourseCard instead of
         *  guessing-and-hard-coding the heights here. */}
        <Skeleton width='100%' height='180px' />
        <div style={{ height: '180px' }} />
      </Grid>
    ));

  return (
    <Box sx={{ padding: '16px 32px 32px 4px' }}>
      {title && (
        <Divider sx={{ margin: '32px 0' }}>
          <Chip label={<Typography variant='overline'>{title}</Typography>} />
        </Divider>
      )}
      <Grid container justifyContent='space-between' alignItems='stretch'>
        <Grid item xs={12}>
          <Grid container alignItems='stretch' spacing='32px' columns={60}>
            {courses ? renderCourseCards() : renderCardSkeletons()}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

// TODO (QC): This is only a placeholder image. Backend should in the future have the actual
// image associated with each course.
const getFakeCourseImageURL = (courseID) =>
  // 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png';
  `https://source.unsplash.com/random/${courseID}`;
  // 'https://www.keatext.ai/wp-content/uploads/2018/10/word-clouds-hero.jpg';
