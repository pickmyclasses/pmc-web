import { fetchReviewsByCourseID } from '../../api/index';
import CourseReviewCard from '../../../src/components/CourseDetails/CourseReviewCard';
import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';

export default function CourseReviews({ courseID }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchReviewsByCourseID(courseID).then((data) => setReviews(data.data.data));
  }, [courseID]);

  const renderReviewSkeletons = () => (
    <Grid item>
      <Typography>No reviews for this course written yet.</Typography>
    </Grid>
  );
  const renderReviewCards = () =>
    reviews.map((review) => <CourseReviewCard review={review} key={review.id} />);

  return (
    <Grid item xs={12}>
      {reviews ? renderReviewCards() : renderReviewSkeletons()}
    </Grid>
  );
}
