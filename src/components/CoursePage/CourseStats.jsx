import React, { createContext, useContext, useState, useEffect, Avatar } from 'react';

import StatsStackedBar from '../CourseVisuals/StatsStackedBar';
import StatsProfessorSum from '../CourseVisuals/StatsProfessorSum';
import StatsInfoDump from '../CourseVisuals/StatsInfoDump';
import StatsLoading from 'components/CourseVisuals/StatsLoading';
import StatsClassSize from 'components/CourseVisuals/StatsClassSize';
import StatsPopularity from 'components/CourseVisuals/StatsPopularity';
import StatsDetailedCard from '../CourseVisuals/StatsDetailedCard';
import StatsDetailedProfessor from 'components/CourseVisuals/StatsDetailedProfessor';
import StatsDetailedAverage from 'components/CourseVisuals/StatsDetailedAverage';
import StatsWorkLoad from 'components/CourseVisuals/StatsWorkLoad';
import Button from '@mui/material/Button';

import { Grid, Typography, Card, Stack, Link, Box } from '@mui/material';
import { CourseContext } from '../../pages/CoursePage';
import { motion } from 'framer-motion';
import ClickableIndicator from '../CourseCardGrid/CourseCard/ClickableIndicator';

export default function CourseStats() {
  const { course, reviews, professorRanking, courseLoad, courseTrend } =
    useContext(CourseContext);
  const [condition, setCondition] = useState('default');

  const renderWorkLoadSummry = () => (
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
      <Stack padding='24px' height='calc(100% - 48px)'>
        <Box flex={1}>
          <StatsWorkLoad reviews={reviews} />
        </Box>
        <Link>
          <ClickableIndicator propagate>
            <Typography variant='subtitle2'>See Details</Typography>
          </ClickableIndicator>
        </Link>
      </Stack>
    </MotionCard>
  );
  const renderProfessorSummery = () => (
    <MotionCard
      initial='initial'
      onClick={() => setCondition('detailedProfessor')}
      whileHover='mouseEntered'
      sx={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <Stack padding='24px' height='calc(100% - 48px)'>
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
  // const renderTagsSummary = () => (
  //   <MotionCard
  //     initial='initial'
  //     whileHover='mouseEntered'
  //     sx={{
  //       width: '100%',
  //       height: '100%',
  //       cursor: 'pointer',
  //       '&:hover': { boxShadow: 6 },
  //     }}
  //   >
  //     <Stack padding='24px' height='calc(100% - 48px)'>
  //       <Box flex={1}>
  //         <Typography variant='subtitle2'>Course Work Load</Typography>
  //         <StatsTags tags={course.tags} />
  //       </Box>
  //       <Link>
  //         <ClickableIndicator propagate>
  //           <Typography variant='subtitle2'>See Details</Typography>
  //         </ClickableIndicator>
  //       </Link>
  //     </Stack>
  //   </MotionCard>
  // );

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
      <Stack padding='24px' height='calc(100% - 48px)'>
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
      onClick={() => setCondition('detailedAverage')}
      whileHover='mouseEntered'
      sx={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <Stack padding='24px' height='calc(100% - 48px)'>
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
      <Stack padding='24px' height='calc(100% - 48px)'>
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
      <Stack padding='24px' height='calc(100% - 48px)'>
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
      <Stack padding='24px' height='calc(100% - 48px)'>
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
      <Stack height='calc(100% - 48px)' padding='24px'>
        <Box flex={1}>
          <Button variant='text' onClick={() => setCondition('default')}>
            Return
          </Button>

          <StatsDetailedCard courseTrend={courseTrend} />
        </Box>
      </Stack>
    </MotionCard>
  );

  const renderDetailedProfessor = () => (
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
      <Stack height='calc(100% - 48px)' padding='24px'>
        <Box flex={1}>
          <Button variant='text' onClick={() => setCondition('default')}>
            Return
          </Button>

          <StatsDetailedProfessor reviews={reviews} professorRanking={professorRanking} />
        </Box>
      </Stack>
    </MotionCard>
  );

  const renderDetailedAverage = () => (
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
      <Stack height='calc(100% - 48px)' padding='24px'>
        <Box flex={1}>
          <Button variant='text' onClick={() => setCondition('default')}>
            Return
          </Button>

          <StatsDetailedAverage
            reviews={reviews}
            professorRanking={professorRanking}
            courseLoad={courseLoad}
          />
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
                {renderWorkLoadSummry()}
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
      case 'detailedProfessor':
        return (
          <Grid item xs={12}>
            {renderDetailedProfessor()}
          </Grid>
        );
      case 'detailedAverage':
        return (
          <Grid item xs={12}>
            {renderDetailedAverage()}
          </Grid>
        );
      default:
        break;
    }
  }
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
