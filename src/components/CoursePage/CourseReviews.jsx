import React, { useState, useEffect, createContext, useContext } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import CourseOverallRatings from '../CourseDetails/CourseOverallRatings';
import { CourseContext } from '../../pages/CoursePage';
import { CourseReviewCard } from '../CourseReviews/CourseReviewCard';

export default function CourseReviews() {
  const { reviews } = useContext(CourseContext);
  const [sortedReviews, setSortedReviews] = useState(reviews);
  const [filterMethod, setFilterMethod] = useState('most-recent');
  useEffect(() => {
    const comparatorByFilterMethod = {
      'most-recent': (x, y) =>
        new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime(),
      'highest-rated': (x, y) => y.rating - x.rating,
      'lowest-rated': (x, y) => x.rating - y.rating,
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
      <Grid item xs={12} key={i}>
        <CourseReviewCard review={review} />
      </Grid>
    ));

  return (
    <Box>
      <Grid container spacing='32px' marginBottom='16px'>
        <Grid item xs={12}>
          <FilterContext.Provider value={{ filterMethod, setFilterMethod }}>
            <CourseOverallRatings reviews={reviews} />
          </FilterContext.Provider>
        </Grid>
        {sortedReviews ? renderReviewCards() : renderReviewSkeletons()}
      </Grid>
    </Box>
  );
}

/**
 * @type {React.Context<{
 *   filterMethod: String,
 *   setFilterMethod: function(String): void,
 * }>}
 */
export const FilterContext = createContext();
