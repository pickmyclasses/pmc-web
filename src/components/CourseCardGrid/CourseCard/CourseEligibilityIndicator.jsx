import { Check, DoDisturb, ShoppingCart } from '@mui/icons-material';
import { Box, Tooltip, useTheme } from '@mui/material';
import React, { createElement } from 'react';

export default function CourseEligibilityIndicator({ children, eligibility = 'none' }) {
  const theme = useTheme();

  const [iconType, colorName, colorValue, tooltipTitle] = {
    'none': [null, 'primary', theme.palette.text.primary, ''],
    'eligible': [Check, 'action', theme.palette.text.primary, 'Eligible for this course'],
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
  }[eligibility];

  return (
    <Tooltip title={tooltipTitle} disableInteractive placement='top-end'>
      <Box sx={{ display: 'flex', alignItems: 'center', 'h5, h6': { color: colorValue } }}>
        {children}
        {iconType &&
          createElement(iconType, {
            fontSize: 'small',
            color: colorName,
            sx: { marginLeft: '8px' },
          })}
      </Box>
    </Tooltip>
  );
}
