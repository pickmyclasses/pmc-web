import React, { createContext, useContext, useState, useEffect } from 'react';
import ReviewPieChart from '../CourseVisuals/ReviewPieChart';
import { Grid, Box, Typography, Card } from '@mui/material';
import { CourseContext } from '../../pages/CoursePage';
import ReviewDotLineChart from '../CourseVisuals/ReviewDotLineChart';
import ReviewDotLineFilter from '../CourseVisuals/ReviewDotLineFilter';

export default function CourseStats() {
  const { reviews } = useContext(CourseContext);
  const [filterMethod, setFilterMethod] = useState('This week');
  const [filteredReviews, setFilteredReviews] = useState(reviews);

  useEffect(() => {
    const predicateByFilterMethod = (filterMethod) => {
      const days = daysByFilterMethod[filterMethod];
      return (review) => {
        const reviewDate = new Date(review.createdAt);
        const currDate = new Date();
        return currDate.getTime() - days * 86400000 < reviewDate.getTime();
      };
    };

    const predicate = predicateByFilterMethod(filterMethod);
    setFilteredReviews(reviews.concat().filter(predicate));
  }, [filterMethod, reviews]);

  return (
    <>
      <Box>
        <Grid container spacing='32px' marginBottom='32px'>
          <Grid item xs={4}>
            <Card sx={{ width: '100%', height: '100%' }}>
              <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
                <Typography variant='subtitle2'>Ratings Distribution</Typography>
                <ReviewPieChart reviews={filteredReviews} />
                <FilterContext.Provider
                  value={{
                    filterMethods: Object.keys(daysByFilterMethod),
                    filterMethod,
                    setFilterMethod,
                  }}
                >
                  <ReviewDotLineFilter />
                </FilterContext.Provider>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card sx={{ width: '100%', height: '100%' }}>
              <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
                <Typography variant='subtitle2'>Ratings Over Time</Typography>
                <ReviewDotLineChart reviews={filteredReviews} />
              </Box>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing='32px' marginBottom='32px'>
          <Grid item xs={5}>
            <Card sx={{ width: '100%', height: '400px' }}></Card>
          </Grid>
          <Grid item xs={3}>
            <Card sx={{ width: '100%', height: '100%' }}></Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ width: '100%', height: '100%' }}></Card>
          </Grid>
        </Grid>
        <Grid container spacing='32px' marginBottom='16px'>
          <Grid item xs={2}>
            <Card sx={{ width: '100%', height: '400px' }}></Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ width: '100%', height: '100%' }}></Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ width: '100%', height: '100%' }}></Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

/**
 * @type {React.Context<{
 *   filterMethods: Array<String>,
 *   filterMethod: String,
 *   setFilterMethod: function(String): void,
 * }>}
 */
export const FilterContext = createContext();

const daysByFilterMethod = {
  'Today': 1,
  'This week': 7,
  'This month': 30,
  'This year': 365,
};
