import { Check, DoDisturb, ShoppingCart } from '@mui/icons-material';
import { Stack, Tooltip, useTheme } from '@mui/material';
import React, { createElement, useContext } from 'react';
import { SchedulerContext } from '../../Scheduler/ContainerWithScheduler';

/**
 * Wraps the children with an icon adornment that indicates whether the user is eligible to take
 * a course.
 *
 * @param {Object} props
 * @param {Object} props.course If given, automatically determines eligibility, taking into
 *     account what the user has in their shopping cart and their course history.
 * @param {String} props.eligibility If given, forces the indicator to show the status and
 *     message according to this string. Takes one of the values from the dictionary in
 *     `getDisplayContent`.
 * @param {String} props.size The size of the icon adornment (`small`, `medium`, or `large`).
 * @param {String} props.placement Whether the icon adornment should be placed at the `start`
 *     or `end` of the children.
 * @param {String} props.tooltipPlacement Whether the on-hover tooltip should be placed on the
 *     `top` or `bottom` of this element.
 */
export default function CourseEligibilityIndicator({
  children,
  course = undefined,
  eligibility = undefined,
  size = 'small',
  placement = 'end',
  tooltipPlacement = 'top',
}) {
  const theme = useTheme();

  const { classesInShoppingCart } = useContext(SchedulerContext);

  if (eligibility == null) {
    eligibility = course ? getEligibility(course, classesInShoppingCart) : '';
  }
  const [iconType, colorName, colorValue, tooltipTitle] = getDisplayContent(eligibility, theme);

  return (
    <Tooltip
      title={tooltipTitle}
      disableInteractive
      placement={`${tooltipPlacement}-${placement}`}
    >
      <Stack
        direction={placement === 'start' ? 'row-reverse' : 'row'}
        justifyContent={placement === 'start' && 'flex-end'}
        alignItems='center'
        spacing='8px'
        minWidth={0}
      >
        <Stack
          direction='row'
          alignItems='center'
          minWidth={0}
          sx={{ 'h5, h6': { color: colorValue } }}
        >
          {children}
        </Stack>
        {iconType && createElement(iconType, { fontSize: size, color: colorName })}
      </Stack>
    </Tooltip>
  );
}

export const getEligibility = (course, classesInShoppingCart) => {
  if (!course.classes?.length) return 'not-offered';
  if (classesInShoppingCart.some((x) => x.course.id === course.id)) return 'in-shopping-cart';
  if (!course.prerequisiteList.isCompleted) return 'incomplete-prerequisites';
  return 'eligible';
};

const getDisplayContent = (eligibility, theme) =>
  ({
    '': [null, 'primary', theme.palette.text.primary, ''],
    'eligible': [null, 'primary', theme.palette.text.primary, ''],
    'eligible-check': [Check, 'action', theme.palette.text.primary, 'Eligible for this course'],
    'in-shopping-cart': [
      ShoppingCart,
      'action',
      theme.palette.text.primary,
      'In your schedule',
    ],
    'taken': [DoDisturb, 'disabled', theme.palette.grey[600], 'Taken in the past'],
    'taken-check': [Check, 'disabled', theme.palette.grey[500], 'In your history'],
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
