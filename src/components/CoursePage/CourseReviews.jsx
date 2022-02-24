import { fetchReviewsByCourseID } from '../../api/index';
import CourseReviewCard from '../../../src/components/CourseDetails/CourseReviewCard';
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import CourseOverallRatings from '../CourseDetails/CourseOverallRatings';

export default function CourseReviews({ course }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchReviewsByCourseID(course.ID).then((data) => setReviews(data.data.data));
  }, [course]);

  const renderReviewSkeletons = () => (
    <Typography>No reviews for this course written yet.</Typography>
  );
  const renderReviewCards = () =>
    reviews.map((review) => <CourseReviewCard review={review} key={review.id} />);

  return (
    <Box>
      <CourseOverallRatings courseID={course.ID}></CourseOverallRatings>
      {reviews ? renderReviewCards() : renderReviewSkeletons()}
    </Box>
  );
}
