import { Box, Card, CardMedia, Divider, Skeleton, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatCourseName, pluralize } from '../../utils';
import CourseEligibilityIndicator from './CourseCard/CourseEligibilityIndicator';
import TagList from './CourseCard/TagList';
import ClickableIndicator from './CourseCard/ClickableIndicator';
import CourseOfferingSummary from './CourseOfferingSummary';
import LabeledRatingDisplay from './CourseCard/LabeledRatingDisplay';

/** A course search result item. */
export default function CourseResultItem({ course }) {
  const theme = useTheme();

  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [mouseEnterEventTimeoutHandle, setMouseEnterEventTimeoutHandle] = useState(0);

  const renderContent = () => (
    <>
      <CardMedia component='img' image={course.ImageURL} sx={{ width: '12px' }} />
      <Box sx={{ padding: '16px', flex: 1, minWidth: 0 }}>
        <ClickableIndicator propagate>
          <Box
            display='flex'
            alignItems='center'
            whiteSpace='nowrap'
            minWidth={0}
            sx={{ '> *': { minWidth: 0 } }}
          >
            <CourseEligibilityIndicator course={course}>
              <Typography variant='h6'>{formatCourseName(course.catalogCourseName)}</Typography>
              <Typography
                variant='h6'
                fontWeight='normal'
                sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
              >
                &nbsp;— {course.title}
              </Typography>
            </CourseEligibilityIndicator>
          </Box>
        </ClickableIndicator>
        <Box
          display='flex'
          alignItems='center'
          margin='4px 0 8px'
          whiteSpace='nowrap'
          sx={{ '*': { minWidth: 0, textOverflow: 'ellipsis', overflow: 'hidden' } }}
        >
          <Typography variant='body2' color={theme.palette.text.secondary}>
            CS major requirement &nbsp;&nbsp;•&nbsp;&nbsp;
            {course.minCredit === course.maxCredit ? '' : course.minCredit + '–'}
            {pluralize(+course.maxCredit, 'credit')}&nbsp;&nbsp;•&nbsp;&nbsp;
          </Typography>
          <LabeledRatingDisplay value={course.overallRating} />
          <Typography variant='body2' color={theme.palette.text.secondary}>
            &nbsp;&nbsp;•
          </Typography>
          <TagList gutterLeft noWrap tags={['Backend', 'Coding']} size='small' />
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
          {course.description}
        </Typography>
      </Box>
      <Divider orientation='vertical' sx={{ height: 'calc(100% - 16px)', marginTop: '8px' }} />
      <Box sx={{ padding: '12px 16px', width: '108px', height: 'fit-content', margin: 'auto' }}>
        <CourseOfferingSummary
          course={course}
          maxRows={4}
          textAlign='center'
          enableHighlight
          forceHighlight={isMouseEntered}
        />
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
      onMouseEnter={() => {
        setMouseEnterEventTimeoutHandle(setTimeout(() => setIsMouseEntered(true), 500));
      }}
      onMouseLeave={() => {
        setIsMouseEntered(false);
        clearTimeout(mouseEnterEventTimeoutHandle);
      }}
      component={Link}
      to={`/course/${course.id}`}
      initial='initial'
      whileHover='mouseEntered'
      sx={{
        width: '100%',
        height: '144px',
        display: 'flex',
        cursor: 'pointer',
        userSelect: 'none',
        textDecoration: 'none',
        '&:hover': { boxShadow: 3 },
      }}
    >
      {course ? renderContent() : renderSkeleton()}
    </MotionCard>
  );
}

const MotionCard = motion(Card);
