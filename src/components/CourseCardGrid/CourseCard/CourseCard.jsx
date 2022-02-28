import React, { useContext, useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  Rating,
  Skeleton,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatCourseName, pluralize } from '../../../utils';
import ClickableIndicator from './ClickableIndicator';
import CourseEligibilityIndicator from './CourseEligibilityIndicator';
import TagList from './TagList';
import CourseOfferingSummary from '../CourseOfferingSummary';
import LabeledRatingDisplay from './LabeledRatingDisplay';
import { NavigationBarContext } from '../../NavigationBar/ContainerWithNavigationBar';

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const { shouldShowStaticScheduler } = useContext(NavigationBarContext);

  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const [isCourseTitleExpanded, setIsCourseTitleExpanded] = useState(false);
  const [isExtraInfoExpanded, setIsExtraInfoExpanded] = useState(false);

  const renderContent = () => (
    <>
      <CardMedia component='img' image={course.ImageURL} sx={{ flex: 1, minHeight: 0 }} />
      <motion.div
        variants={textRegionAnimationVariants}
        transition={{ type: 'just' }}
        style={{ padding: '16px 16px 4px' }}
      >
        <ClickableIndicator propagate>
          <CourseEligibilityIndicator course={course}>
            <Typography variant='h6' fontSize='1.125rem' lineHeight={1.38}>
              {formatCourseName(course.CatalogCourseName)}
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
          {course.Title}
        </MotionTypography>
        <CenterAligningFlexBox>
          <Typography
            variant='body2'
            color={theme.palette.text.secondary}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {course.MinCredit === course.MaxCredit ? '' : course.MinCredit + '–'}
            {pluralize(course.MaxCredit, 'credit')}&nbsp;&nbsp;•&nbsp;&nbsp;
          </Typography>
          <TagList noWrap size='small' tags={['Backend', 'Coding']} />
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
              isMouseEntered={isMouseEntered && isExtraInfoExpanded}
            />
          </CenterAligningFlexBox>
        </motion.div>
      </motion.div>
    </>
  );

  const renderSkeleton = () => (
    <>
      <Skeleton
        variant='rectangular'
        width='100%'
        height='calc(100% - 144px)'
        sx={{ marginBottom: '20px' }}
      />
      <Skeleton width='50%' height='60px' sx={{ marginLeft: '20px' }} />
      <Skeleton width='75%' height='36px' sx={{ marginLeft: '20px' }} />
    </>
  );

  return (
    <MotionCard
      onMouseEnter={() => setIsMouseEntered(true)}
      onMouseLeave={() => setIsMouseEntered(false)}
      onClick={() => course && navigate(`/course/${course.ID}`)}
      initial='initial'
      whileHover='mouseEntered'
      sx={{
        boxShadow: isMouseEntered ? 9 : 3,
        width: '100%',
        height: '256px',
        display: 'flex',
        flexFlow: 'column',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {course ? renderContent() : renderSkeleton()}
    </MotionCard>
  );
}

export const CenterAligningFlexBox = styled(Box)({ display: 'flex', alignItems: 'center' });

const MotionCard = motion(Card);

const MotionTypography = motion(Typography);

const textRegionAnimationVariants = {
  initial: { boxShadow: `0 -1px 24px rgba(0, 0, 0, 0)` },
  mouseEntered: { boxShadow: `0 -1px 24px rgba(0, 0, 0, 0.5)` },
};

const courseTitleAnimationVariants = {
  initial: { height: '1.5em' },
  mouseEntered: { height: 'auto' },
};

const extraInfoAnimationVariants = {
  initial: { marginTop: '8px', marginBottom: 0, height: 0, opacity: 0 },
  mouseEntered: { marginTop: '12px', marginBottom: '8px', height: '', opacity: 1 },
};
