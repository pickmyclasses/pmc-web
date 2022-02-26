import { fetchReviewsByCourseID } from '../../api/index';
import CourseReviewCard from '../../../src/components/CourseDetails/CourseReviewCard';
import React, { useState, useEffect, createContext } from 'react';
import { Grid, Box, Typography, Card } from '@mui/material';
import CourseOverallRatings from '../CourseDetails/CourseOverallRatings';

// Default filtering method is Most Recent
export const FilterContext = createContext({
  filterMethod: 'MRE',
});

export default function CourseReviews({ course }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchReviewsByCourseID(course.ID).then((data) => setReviews(data.data.data));
  }, [course]);

  const renderReviewSkeletons = () => (
    <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
      <Typography>No reviews for this course written yet.</Typography>
    </Box>
  );
  const renderReviewCards = () =>
    reviews.map((review) => (
      <Grid item xs={9}>
        <CourseReviewCard review={review} key={review.id} />{' '}
      </Grid>
    ));
  return (
    <Box>
      <Grid container spacing='32px' marginBottom='16px'>
        <Grid item xs={9}>
          <CourseOverallRatings courseID={course.ID}></CourseOverallRatings>
        </Grid>
        {reviews ? renderReviewCards() : renderReviewSkeletons()}
      </Grid>
    </Box>
  );
}
