import CourseReviewCard from '../../../src/components/CourseDetails/CourseReviewCard';
import React, { useState, useEffect, createContext } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import CourseOverallRatings from '../CourseDetails/CourseOverallRatings';

// Default filtering method is Most Recent
export const FilterContext = createContext();

export default function CourseReviews({ reviews }) {
  const [sortedReviews, setSortedReviews] = useState(reviews);
  const [filterMethod, setFilterMethod] = useState('MostRecent');
  useEffect(() => {
    const comparatorByFilterMethod = {
      'MostRecent': (x, y) =>
        new Date(y.created_at).getTime() - new Date(x.created_at).getTime(),
      'LeastRecent': (x, y) =>
        new Date(x.created_at).getTime() - new Date(y.created_at).getTime(),
      //'MostHelpful': TODO
      //'LeastHelpful':TODO
      'HighestRated': (x, y) => y.rating - x.rating,
      'LowestRated': (x, y) => x.rating - y.rating,
    };
    setSortedReviews(reviews.concat().sort(comparatorByFilterMethod[filterMethod]));
  }, [filterMethod, reviews]);

  const renderReviewSkeletons = () => (
    <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
      <Typography>No reviews for this course written yet.</Typography>
    </Box>
  );
  const renderReviewCards = () =>
    sortedReviews.map((review, i) => (
      <Grid item xs={9} key={i}>
        <CourseReviewCard review={review} key={review.id} />{' '}
      </Grid>
    ));
  return (
    <Box>
      <Grid container spacing='32px' marginBottom='16px'>
        <Grid item xs={9}>
          <FilterContext.Provider value={{ filterMethod, setFilterMethod }}>
            <CourseOverallRatings reviews={reviews}></CourseOverallRatings>
          </FilterContext.Provider>
        </Grid>
        {sortedReviews ? renderReviewCards() : renderReviewSkeletons()}
      </Grid>
    </Box>
  );
}
