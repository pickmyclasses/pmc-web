import React, { createContext, useContext, useState, useEffect } from 'react';
import ReviewPieChart from '../CourseVisuals/ReviewPieChart';
import { Grid, Box, Typography, Card } from '@mui/material';
import { CourseContext } from '../../pages/CoursePage';
import ReviewDotLineChart from '../CourseVisuals/ReviewDotLineChart';
import ReviewDotLineFilter from '../CourseVisuals/ReviewDotLineFilter';
import TagList from '../CourseCardGrid/CourseCard/TagList';

function generateStarValues(reviews, data) {
  for (let i = 0; i < reviews.length; i++) {
    data[reviews[i].rating - 1].value += 1;
  }
}

export default function CourseStats() {
  const { reviews } = useContext(CourseContext);
  const [filterMethod, setFilterMethod] = useState('This week');
  const [filteredReviews, setFilteredReviews] = useState(reviews);

  const data = [
    { name: 'Useless (1)', value: 0 },
    { name: 'Poor (2)', value: 0 },
    { name: 'Ok (3)', value: 0 },
    { name: 'Good (4)', value: 0 },
    { name: 'Excellent (5)', value: 0 },
  ];
  generateStarValues(filteredReviews, data);
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
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '12px 24px',
                  '> *': { marginY: '12px !important' },
                }}
              >
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
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '12px 24px',
                  '> *': { marginY: '12px !important' },
                }}
              >
                <Typography variant='subtitle2'>Ratings Over Time</Typography>
                <ReviewDotLineChart reviews={filteredReviews} />

                <TagList
                  tags={data.map((item) => item.name + ' : ' + item.value)}
                  variant='outlined'
                  color='success'
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
        {/* <Grid container spacing='32px' marginBottom='32px'>
          <Grid item xs={4}>
            <Card sx={{ width: '100%', height: '300px' }}>
              <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}> </Box>
            </Card>
          </Grid>

          <Grid item xs={8}>
            <Card sx={{ width: '100%', height: '300px' }}>
              <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}></Box>
            </Card>
          </Grid>
        </Grid> */}
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
