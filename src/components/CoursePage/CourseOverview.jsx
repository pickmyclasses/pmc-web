import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleOutline, MenuBook, People, School, WatchLater } from '@mui/icons-material';
import {
  Alert,
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
  Rating,
  Stack,
} from '@mui/material';
import TagList from '../CourseCardGrid/CourseCard/TagList';
import { formatCreditRange } from './CoursePageTop';
import CourseCardGrid from '../CourseCardGrid/CourseCardGrid';
import { CourseContext } from '../../pages/CoursePage';
import LabeledRatingDisplay from '../CourseCardGrid/CourseCard/LabeledRatingDisplay';
import { pluralize } from '../../utils';
import CourseEligibilityBanner from './CourseEligibilityBanner';
import LabelWithIcon from './LabelWithIcon';
import ClickableIndicator from '../CourseCardGrid/CourseCard/ClickableIndicator';
import { motion } from 'framer-motion';
import CourseComponentsSummary from './CourseComponentsSummary';
import CourseOfferingSummary, {
  enumerateOfferings,
} from '../CourseCardGrid/CourseOfferingSummary';
import { SchedulerContext } from '../Scheduler/ContainerWithScheduler';
import { getEligibility } from '../CourseCardGrid/CourseCard/CourseEligibilityIndicator';
import CourseScheduleSummary from '../Scheduler/CourseScheduleSummary';

export default function CourseOverview() {
  const navigate = useNavigate();
  const { course, reviews } = useContext(CourseContext);
  const { classesInShoppingCart } = useContext(SchedulerContext);

  const [eligibility, setEligibility] = useState('none');
  // The classes the user has registered for this course, if any.
  const [classesOfCourseInShoppingCart, setClassesOfCourseInShoppingCart] = useState([]);

  // Controls what to display in the registration summary sub-card. If the course is in the
  // user's schedule already, display the summary of their registration.
  useEffect(() => {
    setEligibility(getEligibility(course, classesInShoppingCart));
    const [, comboInShoppingCart] = enumerateOfferings(
      course.classes,
      course,
      classesInShoppingCart
    );
    setClassesOfCourseInShoppingCart(comboInShoppingCart);
  }, [course, classesInShoppingCart]);

  const coursePageURL = '/course/' + course.id;

  const renderInfoSummary = () => (
    <Card sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
        <Typography variant='subtitle2'>Top Tags</Typography>
        <TagList tags={fakeTags} />
        <Typography variant='subtitle2'>Full Description</Typography>
        <Typography variant='body1'>{course.description}</Typography>
        <Typography variant='subtitle2'>Reward</Typography>
        <Stack direction='row' spacing='24px'>
          <LabelWithIcon color='primary' iconType={School} label='CS major requirement' />
          <LabelWithIcon color='info' iconType={WatchLater} label={formatCreditRange(course)} />
        </Stack>
      </Box>
    </Card>
  );

  const renderReviewSummary = () => (
    <MotionCard
      initial='initial'
      whileHover='mouseEntered'
      onClick={() => navigate(`${coursePageURL}/reviews`)}
      sx={{ width: '100%', height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
    >
      <Stack padding='24px' spacing='12px' height='calc(100% - 48px)'>
        <Box>
          <Box width='fit-content' marginX='auto' marginBottom='8px'>
            <LabeledRatingDisplay hideLabel value={course.overallRating} size='large' />
          </Box>
          <Typography variant='body2' align='center' fontStyle='italic' sx={{ opacity: 0.75 }}>
            {reviews.length ? `Based on ${pluralize(reviews.length, 'review')}` : 'No reviews'}
          </Typography>
        </Box>
        <Stack direction='row' flex={1}>
          <Box width='50%'>
            <Typography variant='subtitle2' sx={{ marginBottom: '12px' }}>
              Top Pros
            </Typography>
            <TagList
              tags={['Fun projects', 'Hands on', 'No exams']}
              variant='outlined'
              color='success'
            />
          </Box>
          <Divider orientation='vertical' />
          <Box width='50%' paddingLeft='12px'>
            <Typography variant='subtitle2' sx={{ marginBottom: '12px' }}>
              Top Cons
            </Typography>
            <TagList
              tags={['Useless lectures', 'Assignment-heavy', 'Less practical']}
              variant='outlined'
              color='error'
            />
          </Box>
        </Stack>
        <Link>
          <ClickableIndicator propagate>
            <Typography variant='subtitle2'>See all reviews</Typography>
          </ClickableIndicator>
        </Link>
      </Stack>
    </MotionCard>
  );

  const renderRegistrationSummary = () => (
    <MotionCard
      initial='initial'
      whileHover='mouseEntered'
      onClick={() => navigate(`${coursePageURL}/registration`)}
      sx={{ width: '100%', height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
    >
      <Stack height='100%'>
        <CourseEligibilityBanner course={course} />
        <Stack padding='24px' spacing='12px' flex={1}>
          <Stack spacing='12px' flex={1}>
            {eligibility === 'in-shopping-cart' ? (
              <>
                <Typography variant='subtitle2'>In Your Schedule</Typography>
                <CourseScheduleSummary plainText classes={classesOfCourseInShoppingCart} />
              </>
            ) : (
              <>
                <Typography variant='subtitle2'>Components</Typography>
                <CourseComponentsSummary course={course} />
                <Typography variant='subtitle2'>Offerings</Typography>
                <CourseOfferingSummary
                  showInstructors
                  course={course}
                  maxRows={5}
                  textAlign='left'
                />
              </>
            )}
          </Stack>
          {eligibility !== 'not-offered' && (
            <Link>
              <ClickableIndicator propagate>
                <Typography variant='subtitle2'>
                  {eligibility === 'in-shopping-cart' ? 'Edit registration' : 'Go register'}
                </Typography>
              </ClickableIndicator>
            </Link>
          )}
        </Stack>
      </Stack>
    </MotionCard>
  );

  return (
    <Box>
      <Grid container spacing='32px' marginBottom='16px'>
        <Grid item xs={6}>
          {renderInfoSummary()}
        </Grid>
        <Grid item xs={3}>
          {renderReviewSummary()}
        </Grid>
        <Grid item xs={3}>
          {renderRegistrationSummary()}
        </Grid>
      </Grid>
      <Typography variant='overline' fontSize='medium' sx={{ opacity: 0.75 }}>
        You may also like
      </Typography>
      <Box width='100%'>
        <CourseCardGrid numColumns={5} courses={new Array(5).fill(course)} />
      </Box>
    </Box>
  );
}

export const fakeTags = [
  'Consectetur',
  'Adipiscing',
  'Eiusmod',
  'Tempor',
  'Incididunt',
  'Labore',
  'Dolore',
  'Aliqua',
  'Veniam',
  'Nostrud',
  'Exercitation',
  'Ullamco',
];

const MotionCard = motion(Card);
