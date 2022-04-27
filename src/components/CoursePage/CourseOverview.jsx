import React, { useContext, useEffect, useState } from 'react';
import { School, WatchLater } from '@mui/icons-material';
import { Box, Card, Divider, Grid, Link, Typography, Stack } from '@mui/material';
import TagList from '../CourseCardGrid/CourseCard/TagList';
import CourseCardGrid from '../CourseCardGrid/CourseCardGrid';
import { CourseContext } from '../../pages/CoursePage';
import LabeledRatingDisplay from '../CourseCardGrid/CourseCard/LabeledRatingDisplay';
import { formatCreditRange, pluralize } from '../../utils';
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
import { fetchCoursesBySearch } from 'api';
import { SectionOverline } from 'pages/HomePage';
import { PreventableNavigationContext } from '../PreventableNavigation/ContainerWithPreventableNavigation';
import PreventableLink from 'components/PreventableNavigation/PreventableLink';
import { UserContext } from 'App';

export default function CourseOverview() {
  const { user } = useContext(UserContext);
  const { navigateIfAllowed } = useContext(PreventableNavigationContext);
  const { course, reviews } = useContext(CourseContext);
  const { classesInShoppingCart } = useContext(SchedulerContext);

  const [eligibility, setEligibility] = useState('none');
  // The classes the user has registered for this course, if any.
  const [classesOfCourseInShoppingCart, setClassesOfCourseInShoppingCart] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState(
    Array(numRecommendedCourses).fill(null)
  );

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

  // Generate the recommended course list.
  useEffect(() => {
    fetchCoursesBySearch(course.title.split(/\s+/)[0], user).then(({ data }) =>
      // The current course itself might show up in the search results. Remove it.
      setRecommendedCourses(
        data.filter((x) => +x.id !== +course.id).slice(0, numRecommendedCourses)
      )
    );
  }, [user, course]);

  const coursePageURL = '/course/' + course.id;
  const renderInfoSummary = () => (
    <Card sx={{ width: '100%', height: '100%' }}>
      <Stack padding='24px' spacing='12px' height='calc(100% - 48px)'>
        <Stack spacing='12px' flex={1}>
          {course.keywords?.length > 0 && (
            <>
              <Typography variant='subtitle2'>Keywords</Typography>
              <TagList tags={course.keywords.map((x) => x.name)} />
            </>
          )}
          <Typography variant='subtitle2'>Full Description</Typography>
          <Typography variant='body1'>{course.description}</Typography>
          <Typography variant='subtitle2'>Reward</Typography>
          <Stack direction='row' spacing='24px' flexWrap='wrap'>
            <LabelWithIcon
              color='info'
              iconType={WatchLater}
              label={formatCreditRange(course)}
            />
            {course.degreeCatalogs?.length > 0 && (
              <LabelWithIcon
                color='primary'
                iconType={School}
                label={course.degreeCatalogs.map((x) => x.join(' — ')).join(', ')}
                align='flex-start'
                height='fit-content'
              />
            )}
          </Stack>
        </Stack>
        <Link component={PreventableLink} to={coursePageURL + '/stats'}>
          <ClickableIndicator>
            <Typography variant='subtitle2'>See detailed statistics</Typography>
          </ClickableIndicator>
        </Link>
      </Stack>
    </Card>
  );

  const renderReviewSummary = () => (
    <MotionCard
      initial='initial'
      whileHover='mouseEntered'
      onClick={() => navigateIfAllowed(coursePageURL + '/reviews')}
      sx={{ width: '100%', height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
    >
      <Stack padding='24px' spacing='12px' height='calc(100% - 48px)'>
        <Box>
          <Box width='fit-content' marginX='auto' marginBottom='8px'>
            <LabeledRatingDisplay value={course.overallRating} size='large' />
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
              tags={course.tags
                .filter((x) => x.type === 1)
                .slice(0, 3)
                .map((x) => x.name)}
              variant='outlined'
              color='success'
              disableInteractive
            />
          </Box>
          <Divider orientation='vertical' />
          <Box width='50%' paddingLeft='12px'>
            <Typography variant='subtitle2' sx={{ marginBottom: '12px' }}>
              Top Cons
            </Typography>
            <TagList
              tags={course.tags
                .filter((x) => x.type === 0)
                .slice(0, 3)
                .map((x) => x.name)}
              variant='outlined'
              color='error'
              disableInteractive
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
      onClick={() => navigateIfAllowed(coursePageURL + '/registration')}
      sx={{ width: '100%', height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
    >
      <Stack height='100%'>
        <CourseEligibilityBanner course={course} />
        <Stack padding='16px 24px 24px' spacing='12px' flex={1}>
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
          {(eligibility === 'eligible' || eligibility === 'in-shopping-cart') && (
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

  const renderRecommendedCourses = () => (
    <>
      <SectionOverline>You may also like</SectionOverline>
      <Box width='100%' paddingBottom='32px'>
        <CourseCardGrid numColumns={5} courses={recommendedCourses} />
      </Box>
    </>
  );

  return (
    <>
      <Grid container spacing='32px' marginBottom={recommendedCourses.length ? '8px' : '32px'}>
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
      {recommendedCourses.length > 0 && renderRecommendedCourses()}
    </>
  );
}

const numRecommendedCourses = 5;

const MotionCard = motion(Card);
