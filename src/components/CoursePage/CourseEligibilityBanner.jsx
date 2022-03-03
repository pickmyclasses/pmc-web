import { CheckCircleOutline, DoDisturb, ShoppingCartOutlined } from '@mui/icons-material';
import { Alert, Box, Typography } from '@mui/material';
import React, { createElement, useContext } from 'react';
import { CenterAligningFlexBox } from '../CourseCardGrid/CourseCard/CourseCard';
import { getEligibility } from '../CourseCardGrid/CourseCard/CourseEligibilityIndicator';
import { SchedulerContext } from '../Scheduler/ContainerWithScheduler';

export default function CourseEligibilityBanner({ course }) {
  const { classesInShoppingCart } = useContext(SchedulerContext);

  const eligibility = getEligibility(course, classesInShoppingCart);
  const [color, iconType, title, description] = contentByEligibility[eligibility];

  return (
    <Alert
      color={color}
      icon={false}
      sx={{
        paddingY: '16px',
        paddingX: '24px',
        borderBottom: '1px lightgray solid',
        filter: color === 'warning' && 'grayscale(1) brightness(0.958)',
      }}
    >
      <CenterAligningFlexBox>
        {createElement(iconType, { color, fontSize: 'large' })}
        <Box marginLeft='16px'>
          <Typography variant='body1' lineHeight={2}>
            <b>{title}</b>
          </Typography>
          <Typography variant='body2'>{description}</Typography>
        </Box>
      </CenterAligningFlexBox>
    </Alert>
  );
}

const contentByEligibility = {
  'eligible': [
    'success',
    CheckCircleOutline,
    'Eligible',
    'You fulfill all prerequisites. You may register for this course!',
  ],
  'in-shopping-cart': [
    'info',
    ShoppingCartOutlined,
    'Registered',
    'You have registered for this course. It is now in your schedule.',
  ],
  'not-offered': [
    'warning',
    DoDisturb,
    'Not offered',
    'This course is not offered next semester. Check back later!',
  ],
  'incomplete-prerequisites': [
    'warning',
    DoDisturb,
    'Ineligible',
    'You do not fulfill all prerequisites. Click to view prerequisites.',
  ],
};
