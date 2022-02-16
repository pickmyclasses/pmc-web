import { Check, DoDisturb, ShoppingCart } from '@mui/icons-material';
import { Box, Tooltip, useTheme } from '@mui/material';
import React, { createElement } from 'react';

export default function CourseEligibilityIndicator({ children, eligibility = 'none' }) {
  const theme = useTheme();

  const [iconType, colorName, colorValue, tooltipTitle] = {
    none: [null, 'primary', theme.palette.text.primary, ''],
    eligible: [Check, 'success', theme.palette.success.dark, 'Eligible for this course'],
    inShoppingCart: [ShoppingCart, 'disabled', theme.palette.grey[600], 'In shopping cart'],
    taken: [DoDisturb, 'disabled', theme.palette.grey[600], 'Taken in the past'],
    notOffered: [DoDisturb, 'disabled', theme.palette.grey[600], 'Not offered next semester'],
  }[eligibility];

  return (
    <Tooltip title={tooltipTitle} placement='top' disableInteractive>
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
