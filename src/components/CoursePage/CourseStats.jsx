import React, { createContext, useContext, useState, useEffect, Avatar } from 'react';

import StatsPieChart from '../CourseVisuals/StatsPieChart';
import StatsStackedBar from '../CourseVisuals/StatsStackedBar';
import StatsProfessorSum from '../CourseVisuals/StatsProfessorSum';
import StatsInfoDump from '../CourseVisuals/StatsInfoDump';
import StatsLoading from 'components/CourseVisuals/StatsLoading';
import StatsTags from 'components/CourseVisuals/StatsTags';
import StatsClassSize from 'components/CourseVisuals/StatsClassSize';
import StatsPopularity from 'components/CourseVisuals/StatsPopularity';
import StatsDetailedCard from '../CourseVisuals/StatsDetailedCard';
import Button from '@mui/material/Button';

import { Grid, Typography, Card, Stack, Link, Box, breadcrumbsClasses } from '@mui/material';
import { CourseContext } from '../../pages/CoursePage';
import { motion } from 'framer-motion';
import ClickableIndicator from '../CourseCardGrid/CourseCard/ClickableIndicator';

export default function CourseStats() {
  const { ratingDistribution, setRatingDistribution } = useState(true);
  const { course, reviews, professorRanking, courseLoad } = useContext(CourseContext);
  const [condition, setCondition] = useState('default');
  const coursePageURL = '/course/' + course.id;
  const renderProfessorSummery = () => (
    <MotionCard
      initial='initial'
      onClick={() => setRatingDistribution(!ratingDistribution)}
      whileHover='mouseEntered'
      sx={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <Stack height='200px' padding='24px'>
        <Box flex={1}>
          <Typography variant='subtitle2'>Top Professors </Typography>

          <StatsProfessorSum professorRanking={professorRanking} />
        </Box>
        <Link>
          <ClickableIndicator propagate>
            <Typography variant='subtitle2'>See Details</Typography>
          </ClickableIndicator>
        </Link>
      </Stack>
    </MotionCard>
  );
  const renderTagsSummary = () => (
    <MotionCard
      initial='initial'
      //onClick={() => navigateIfAllowed(coursePageURL + '/registration')}
      whileHover='mouseEntered'
      sx={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <Stack height='200px' padding='24px'>
        <Box flex={1}>
          <Typography variant='subtitle2'>Course Top Tags</Typography>
          <StatsTags reviews={reviews} />
        </Box>
        <Link>
          <ClickableIndicator propagate>
            <Typography variant='subtitle2'>See Details</Typography>
          </ClickableIndicator>
        </Link>
      </Stack>
    </MotionCard>
  );

  const renderClassSizeSummary = () => (
    <MotionCard
      initial='initial'
      //onClick={() => navigateIfAllowed(coursePageURL + '/registration')}
      whileHover='mouseEntered'
      sx={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <Stack height='200px' padding='24px'>
        <Box flex={1}>
          <Typography variant='subtitle2'>Class Size</Typography>
          <StatsClassSize reviews={reviews} />
        </Box>
        <Link>
          <ClickableIndicator propagate>
            <Typography variant='subtitle2'>See Details</Typography>
          </ClickableIndicator>
        </Link>
      </Stack>
    </MotionCard>
  );

  const renderInfoSummery = () => (
    <MotionCard
      initial='initial'
      //onClick={() => navigateIfAllowed(coursePageURL + '/registration')}
      whileHover='mouseEntered'
      sx={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <Stack height='200px' padding='24px'>
        <Box flex={1}>
          <Typography variant='subtitle2'>Average Grades </Typography>
          <StatsInfoDump courseLoad={courseLoad} />
        </Box>
        <Link>
          <ClickableIndicator propagate>
            <Typography variant='subtitle2'>See Details</Typography>
          </ClickableIndicator>
        </Link>
      </Stack>
    </MotionCard>
  );

  const renderPopularitySummary = () => (
    <MotionCard
      initial='initial'
      //onClick={() => navigateIfAllowed(coursePageURL + '/registration')}
      whileHover='mouseEntered'
      sx={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <Stack height='200px' padding='24px'>
        <Box flex={1}>
          <Typography variant='subtitle2'>Course Popularity </Typography>
          <StatsPopularity reviews={reviews} />
        </Box>
        <Link>
          <ClickableIndicator propagate>
            <Typography variant='subtitle2'>See Details</Typography>
          </ClickableIndicator>
        </Link>
      </Stack>
    </MotionCard>
  );

  const renderPlaceHolder = () => (
    <MotionCard
      initial='initial'
      //onClick={() => navigateIfAllowed(coursePageURL + '/registration')}
      whileHover='mouseEntered'
      sx={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <Stack height='200px' padding='24px'>
        <Box flex={1}>
          <StatsLoading />
        </Box>
        <Link>
          <ClickableIndicator propagate>
            <Typography style={{ color: '#a3a3a3' }} variant='subtitle2'>
              Unavailable
            </Typography>
          </ClickableIndicator>
        </Link>
      </Stack>
    </MotionCard>
  );

  const renderRatingSummery = () => (
    <MotionCard
      initial='initial'
      onClick={() => setCondition('stackBarDetailed')}
      whileHover='mouseEntered'
      sx={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        '&:hover': { boxShadow: 6 },
        overflow: 'visible',
      }}
    >
      <Stack height='200px' padding='24px'>
        <Box flex={1}>
          <StatsStackedBar reviews={reviews} />
        </Box>
        <Link>
          <ClickableIndicator propagate>
            <Typography variant='subtitle2'>See Details</Typography>
          </ClickableIndicator>
        </Link>
      </Stack>
    </MotionCard>
  );

  const renderDetailedCard = () => (
    <MotionCard
      initial='initial'
      //onClick={() => navigateIfAllowed(coursePageURL + '/registration')}
      whileHover='mouseEntered'
      sx={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <Stack height='200px' padding='24px'>
        <Box flex={1}>
          {/* <Link to={coursePageURL + '/stats'}></Link> */}
          <Button variant='text' onClick={() => setCondition('default')}>
            Return
          </Button>

          <StatsDetailedCard reviews={reviews} />
        </Box>
      </Stack>
    </MotionCard>
  );

  function conditionalRendering(condition) {
    switch (condition) {
      case 'default':
        return (
          <div>
            {' '}
            <Grid container spacing='32px' marginBottom='16px'>
              <Grid item xs={6}>
                {reviews.length === 0 ? renderPlaceHolder() : renderRatingSummery()}
              </Grid>
              <Grid item xs={3}>
                {reviews.length === 0 ? renderPlaceHolder() : renderProfessorSummery()}
              </Grid>
              <Grid item xs={3}>
                {reviews.length === 0 ? renderPlaceHolder() : renderInfoSummery()}
              </Grid>
            </Grid>
            <Grid container spacing='32px' marginBottom='16px'>
              <Grid item xs={6}>
                {renderTagsSummary()}
              </Grid>
              <Grid item xs={3}>
                {renderClassSizeSummary()}
              </Grid>
              <Grid item xs={3}>
                {renderPopularitySummary()}
              </Grid>
            </Grid>
          </div>
        );
      case 'stackBarDetailed':
        return (
          <div>
            <Grid item xs={12}>
              {renderDetailedCard()}
            </Grid>
          </div>
        );
      default:
        break;
    }
  }

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

  return <>{conditionalRendering(condition)}</>;
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
