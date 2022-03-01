import React, { createContext, useContext, useState, useEffect } from 'react';
import ReviewPieChart from '../CourseVisuals/ReviewPieChart';
import { Grid, Box, Typography, Card } from '@mui/material';
import { CourseContext } from '../../pages/CoursePage';
import ReviewDotLineChart from '../CourseVisuals/ReviewDotLineChart';
import ReviewDotLineFilter from '../CourseVisuals/ReviewDotLineFilter';

export default function CourseStats() {
  const { reviews } = useContext(CourseContext);
  const [filterMethod, setFilterMethod] = useState('This week');
  const [sortedReviews, setSortedReviews] = useState(reviews);
  useEffect(() => {
    const dateFilter = {
      'Today': (review) => {
        const reviewDate = new Date(review.createdAt);
        const currDate = new Date();
        return currDate.getTime() - 1 * 86400000 < reviewDate.getTime();
      },
      'This week': (review) => {
        const reviewDate = new Date(review.createdAt);
        const currDate = new Date();
        return currDate.getTime() - 7 * 86400000 < reviewDate.getTime();
      },
      'This month': (review) => {
        const reviewDate = new Date(review.createdAt);
        const currDate = new Date();
        return currDate.getTime() - 30 * 86400000 < reviewDate.getTime();
      },
      'This year': (review) => {
        const reviewDate = new Date(review.createdAt);
        const currDate = new Date();
        return currDate.getTime() - 365 * 86400000 < reviewDate.getTime();
      },
    };
    setSortedReviews(reviews.concat().filter(dateFilter[filterMethod]));
  }, [filterMethod, reviews]);

  return (
    <>
      <Box>
        <Grid container spacing='32px' marginBottom='16px'>
          <Grid item xs={4}>
            <Card sx={{ width: '100%', height: '100%' }}>
              <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
                <Typography variant='subtitle2'>Ratings Distribution</Typography>
                <ReviewPieChart reviews={sortedReviews} />
                <FilterContext.Provider value={{ filterMethod, setFilterMethod }}>
                  <ReviewDotLineFilter />
                </FilterContext.Provider>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card sx={{ width: '100%', height: '100%' }}>
              <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
                <Typography variant='subtitle2'>Ratings Over Time</Typography>
                <ReviewDotLineChart reviews={sortedReviews} />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

/**
 * @type {React.Context<{
 *   filterMethod: String,
 *   setFilterMethod: function(String): void,
 * }>}
 */
export const FilterContext = createContext();
