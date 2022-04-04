import React, { createContext, useContext, useState, useEffect } from 'react';
import StatsPieChart from '../CourseVisuals/StatsPieChart';
import StatsStackedBar from '../CourseVisuals/StatsStackedBar';
import { Grid, Box, Typography, Card, Stack } from '@mui/material';
import { CourseContext } from '../../pages/CoursePage';
import ReviewDotLineChart from '../CourseVisuals/ReviewDotLineChart';
import ReviewDotLineFilter from '../CourseVisuals/ReviewDotLineFilter';
import TagList from '../CourseCardGrid/CourseCard/TagList';
import { motion } from 'framer-motion';

export default function CourseStats() {
  const { course, reviews } = useContext(CourseContext);
  const coursePageURL = '/course/' + course.id;

  const renderProfessorSummery = () => (
    <MotionCard
      initial='initial'
      whileHover='mouseEntered'
      //onClick={() => navigateIfAllowed(coursePageURL + '/registration')}
      sx={{ width: '100%', height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
    >
      <Stack padding='24px' spacing='12px' height='calc(100% )'>
        <Stack spacing='12px' flex={1}></Stack>
      </Stack>
    </MotionCard>
  );

  const renderRatingSummery = () => (
    <MotionCard
      initial='initial'
      whileHover='mouseEntered'
      //onClick={() => navigateIfAllowed(coursePageURL + '/registration')}
      sx={{ width: '100%', height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
    >
      <Stack padding='24px' spacing='12px' height='calc(100% - 48px)'>
        <Stack spacing='12px' flex={1}>
          <StatsStackedBar reviews={reviews} />
        </Stack>
      </Stack>
    </MotionCard>
  );

  // const { reviews } = useContext(CourseContext);
  // const [filterMethod, setFilterMethod] = useState('This week');
  // const [filteredReviews, setFilteredReviews] = useState(reviews);

  // const data = [
  //   { name: 'Useless (1)', value: 0 },
  //   { name: 'Poor (2)', value: 0 },
  //   { name: 'Ok (3)', value: 0 },
  //   { name: 'Good (4)', value: 0 },
  //   { name: 'Excellent (5)', value: 0 },
  // ];
  // generateStarValues(filteredReviews, data);
  // useEffect(() => {
  //   const predicateByFilterMethod = (filterMethod) => {
  //     const days = daysByFilterMethod[filterMethod];
  //     return (review) => {
  //       const reviewDate = new Date(review.createdAt);
  //       const currDate = new Date();
  //       return currDate.getTime() - days * 86400000 < reviewDate.getTime();
  //     };
  //   };

  //   const predicate = predicateByFilterMethod(filterMethod);
  //   setFilteredReviews(
  //     reviews
  //       .concat()
  //       .filter(predicate)
  //       .sort((x, y) => new Date(x.createdAt).getTime() - new Date(y.createdAt).getTime())
  //   );
  // }, [filterMethod, reviews]);

  return (
    <>
      <Grid container spacing='32px' marginBottom='16px'>
        <Grid item xs={6}>
          {renderRatingSummery()}
        </Grid>
        <Grid item xs={3}>
          {renderProfessorSummery()}
        </Grid>
        <Grid item xs={3}>
          {renderProfessorSummery()}
        </Grid>
      </Grid>
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

const MotionCard = motion(Card);
