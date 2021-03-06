import { DoDisturb, ShoppingCart } from '@mui/icons-material';
import { Box, Tooltip, useTheme } from '@mui/material';
import React, { createElement, useContext } from 'react';
import { SchedulerContext } from '../../Scheduler/ContainerWithScheduler';

export default function CourseEligibilityIndicator({
  children,
  course,
  size = 'small',
  placement = 'top',
}) {
  const theme = useTheme();

  const { classesInShoppingCart } = useContext(SchedulerContext);

  const eligibility = getEligibility(course, classesInShoppingCart);
  const [iconType, colorName, colorValue, tooltipTitle] = getDisplayContent(eligibility, theme);

  return (
    <Tooltip title={tooltipTitle} disableInteractive placement={placement + '-end'}>
      <Box sx={{ display: 'flex', alignItems: 'center', 'h5, h6': { color: colorValue } }}>
        {children}
        {iconType &&
          createElement(iconType, {
            fontSize: size,
            color: colorName,
            sx: { marginLeft: '8px' },
          })}
      </Box>
    </Tooltip>
  );
}

export const getEligibility = (course, classesInShoppingCart) => {
  if (!course.classes?.length) return 'not-offered';
  if (classesInShoppingCart.some((x) => x.course.id === course.id)) return 'in-shopping-cart';
  // TODO Q: For demonstration purposes, CS 4000 is listed as ineligible for any user.
  if (+course.id === 22958) return 'incomplete-prerequisites';
  return 'eligible';
};

const getDisplayContent = (eligibility, theme) =>
  ({
    'eligible': [null, 'primary', theme.palette.text.primary, ''],
    // 'eligible': [Check, 'action', theme.palette.text.primary, 'Eligible for this course'],
    'in-shopping-cart': [
      ShoppingCart,
      'action',
      theme.palette.text.primary,
      'In shopping cart',
    ],
    'taken': [DoDisturb, 'disabled', theme.palette.grey[600], 'Taken in the past'],
    'not-offered': [
      DoDisturb,
      'disabled',
      theme.palette.grey[600],
      'Not offered next semester',
    ],
    'incomplete-prerequisites': [
      DoDisturb,
      'disabled',
      theme.palette.grey[600],
      'Prerequisites unsatisfied',
    ],
  }[eligibility]);
