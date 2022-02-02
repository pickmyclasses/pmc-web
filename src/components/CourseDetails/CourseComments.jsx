import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fetchReviewsByID } from '../../../src/api/index';
import React, { useState, useEffect } from 'react';

export default function CourseComments({ courseID }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => fetchReviewsByID(courseID), []);
  console.log(reviews);
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='body1' gutterBottom>
        GG
      </Typography>
    </Box>
  );
}
