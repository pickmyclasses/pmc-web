import { Star, StarOutline, WatchLater, WatchLaterOutlined } from '@mui/icons-material';
import {
  Box,
  Card,
  CardMedia,
  Chip,
  Divider,
  Rating,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatCourseName, pluralize } from '../../utils';
import CourseEligibilityIndicator from './CourseCard/CourseEligibilityIndicator';
import DaysIndicator from './CourseCard/DaysIndicator';
import TagList from './CourseCard/TagList';
import ClickableIndicator from './CourseCard/ClickableIndicator';
import CourseOfferingSummary from './CourseOfferingSummary';
import { CenterAligningFlexBox, getMeanReviewRating } from './CourseCard/CourseCard';

/** A course search result item. */
export default function CourseResultItem({ data: { course, classes, reviews } }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const rating = getMeanReviewRating(reviews);

  const renderContent = () => (
    <>
      <CardMedia
        component='img'
        image={`https://source.unsplash.com/random/${course.ID}`}
        sx={{ width: '216px' }}
      />
      <Box sx={{ padding: '16px', flex: 1, minWidth: 0 }}>
        <ClickableIndicator propagate>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'nowrap',
              minWidth: 0,
              '> *': { minWidth: 0 },
            }}
          >
            <CourseEligibilityIndicator eligibility='none'>
              <Typography variant='h6'>{formatCourseName(course.CatalogCourseName)}</Typography>
              <Typography
                variant='h6'
                fontWeight='normal'
                sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
              >
                &nbsp;— {course.Title}
              </Typography>
            </CourseEligibilityIndicator>
          </Box>
        </ClickableIndicator>
        <Box sx={{ display: 'flex', alignItems: 'center', margin: '4px 0 8px' }}>
          <Typography variant='body2' color={theme.palette.text.secondary}>
            {course.MinCredit === course.MaxCredit ? '' : course.MinCredit + '–'}
            {pluralize(+course.MaxCredit, 'credit')}
            &nbsp;&nbsp;•&nbsp;&nbsp;CS major requirement&nbsp;&nbsp;
          </Typography>
          {rating > 0 && <Rating readOnly value={rating} precision={0.5} size='small' />}
          <TagList gutterLeft noWrap tags={['Theory', 'Writing']} size='small' />
        </Box>
        <Typography
          variant='body2'
          sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
          }}
        >
          {course.Description}
        </Typography>
      </Box>
      <Divider orientation='vertical' sx={{ height: 'calc(100% - 16px)', marginTop: '8px' }} />
      <Box sx={{ padding: '12px 16px', width: '108px', height: 'fit-content', margin: 'auto' }}>
        <CourseOfferingSummary classes={classes} maxRows={4} textAlign='center' />
      </Box>
    </>
  );

  const renderSkeleton = () => (
    <>
      <Skeleton variant='rectangular' width='216px' height='100%' />
      <Box sx={{ padding: '16px' }}>
        <Skeleton variant='text' width='216px' height='3em' />
        <Skeleton variant='text' width='324px' />
        <Skeleton variant='text' width='288px' />
      </Box>
    </>
  );

  return (
    <MotionCard
      onClick={() => course && navigate(`/course/${course.ID}`)}
      initial='initial'
      whileHover='mouseEntered'
      sx={{
        width: '100%',
        height: '144px',
        display: 'flex',
        cursor: 'pointer',
        userSelect: 'none',
        '&:hover': { boxShadow: 3 },
      }}
    >
      {course ? renderContent() : renderSkeleton()}
    </MotionCard>
  );
}

const MotionCard = motion(Card);
