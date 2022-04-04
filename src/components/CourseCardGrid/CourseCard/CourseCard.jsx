import React, { useContext, useState } from 'react';
import { Box, Card, CardMedia, Skeleton, styled, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatCourseName, formatCreditRange } from '../../../utils';
import ClickableIndicator from './ClickableIndicator';
import CourseEligibilityIndicator from './CourseEligibilityIndicator';
import TagList from './TagList';
import CourseOfferingSummary from '../CourseOfferingSummary';
import LabeledRatingDisplay from './LabeledRatingDisplay';
import { NavigationBarContext } from '../../NavigationBar/ContainerWithNavigationBar';

export default function CourseCard({ course }) {
  const theme = useTheme();

  const { shouldShowStaticScheduler } = useContext(NavigationBarContext);

  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [isCourseTitleExpanded, setIsCourseTitleExpanded] = useState(false);
  const [isExtraInfoExpanded, setIsExtraInfoExpanded] = useState(false);

  const renderContent = () => (
    <>
      <CardMedia component='img' image={course.ImageURL} sx={{ flex: 1, minHeight: 0 }} />
      <Box padding='16px 16px 4px'>
        <ClickableIndicator propagate>
          <CourseEligibilityIndicator course={course}>
            <Typography variant='h6' fontSize='1.125rem' lineHeight={1.38}>
              {formatCourseName(course.catalogCourseName)}
            </Typography>
          </CourseEligibilityIndicator>
        </ClickableIndicator>
        <MotionTypography
          variants={courseTitleAnimationVariants}
          initial='initial'
          animate={isExtraInfoExpanded && isMouseEntered ? 'mouseEntered' : 'initial'}
          transition={{ duration: 0.375, type: 'just' }}
          onAnimationComplete={() => !isExtraInfoExpanded && setIsCourseTitleExpanded(false)}
          lineHeight={1.5}
          sx={{
            whiteSpace: isCourseTitleExpanded ? '' : 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
          gutterBottom
        >
          {course.title}
        </MotionTypography>
        <CenterAligningFlexBox>
          <Typography
            variant='body2'
            color={theme.palette.text.secondary}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {formatCreditRange(course)}
            {course.tags.length > 0 && <>&nbsp;&nbsp;•&nbsp;&nbsp;</>}
          </Typography>
          <TagList noWrap size='small' tags={course.tags.map((x) => x.name)} />
        </CenterAligningFlexBox>
        <motion.div
          variants={extraInfoAnimationVariants}
          transition={{ type: 'just', delay: isCourseTitleExpanded ? 0 : 0.5 }}
          onUpdate={({ height }) => {
            if (height > 0 && !isExtraInfoExpanded) {
              setIsCourseTitleExpanded(true);
              setIsExtraInfoExpanded(true);
            }
          }}
          onAnimationComplete={() => !isMouseEntered && setIsExtraInfoExpanded(false)}
        >
          <CenterAligningFlexBox justifyContent='space-between'>
            <LabeledRatingDisplay
              compressed={shouldShowStaticScheduler}
              noLabel={!shouldShowStaticScheduler}
              value={course.overallRating}
            />
            <CourseOfferingSummary
              course={course}
              maxRows={1}
              rowHeight={1.5}
              width={`min(120px, calc(100% - ${shouldShowStaticScheduler ? '84px' : '120px'}))`}
              enableHighlight={isMouseEntered && isExtraInfoExpanded}
              forceHighlight={isMouseEntered && isExtraInfoExpanded}
            />
          </CenterAligningFlexBox>
        </motion.div>
      </Box>
    </>
  );

  const renderSkeleton = () => (
    <>
      <Skeleton
        variant='rectangular'
        width='100%'
        height='calc(100% - 112px)'
        sx={{ marginBottom: '12px' }}
      />
      <Skeleton width='50%' height='48px' sx={{ marginLeft: '20px' }} />
      <Skeleton width='75%' height='32px' sx={{ marginLeft: '20px' }} />
    </>
  );

  return (
    <MotionCard
      onMouseEnter={() => setIsMouseEntered(true)}
      onMouseLeave={() => setIsMouseEntered(false)}
      component={Link}
      to={`/course/${course?.id}`}
      initial='initial'
      whileHover='mouseEntered'
      sx={{
        boxShadow: 3,
        width: '100%',
        height: '208px',
        display: 'flex',
        flexFlow: 'column',
        cursor: 'pointer',
        userSelect: 'none',
        textDecoration: 'none',
        pointerEvents: course ? '' : 'none',
        '&:hover': { boxShadow: 9 },
      }}
    >
      {course ? renderContent() : renderSkeleton()}
    </MotionCard>
  );
}

export const CenterAligningFlexBox = styled(Box)({ display: 'flex', alignItems: 'center' });

const MotionCard = motion(Card);

const MotionTypography = motion(Typography);

const courseTitleAnimationVariants = {
  initial: { height: '1.5em' },
  mouseEntered: { height: '4.75em' },
};

const extraInfoAnimationVariants = {
  initial: { marginTop: '8px', marginBottom: 0, height: 0, opacity: 0 },
  mouseEntered: { marginTop: '12px', marginBottom: '8px', height: '', opacity: 1 },
};
