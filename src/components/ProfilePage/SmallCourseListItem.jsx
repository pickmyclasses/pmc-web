import { AddBox, Delete, Edit, Info, RateReview } from '@mui/icons-material';
import { Card, ListItem, Stack, Tab, Tooltip, Typography } from '@mui/material';
import CourseEligibilityIndicator from 'components/CourseCardGrid/CourseCard/CourseEligibilityIndicator';
import React, { createElement, useRef, useState } from 'react';
import { formatCourseName, formatCreditRange } from 'utils';
import { getColorByCourse } from 'api';

/**
 * A list item like element that shows some basic info of a course, while optionally providing
 * some action items to display on the right.
 *
 * @param {Object} props
 * @param {Object} props.course The course to show info for.
 * @param {String} props.indicator If given, sets the status and message to show in the icon
 *     adornment.
 * @param {Array<String>} props.actionItems The buttons to show on the right. Accepted values
 *     are defined in the keys of `actionItemComponents`.
 * @param {Boolean} props.autoHideActionItems Whether to hide the action items when the mouse
 *     leaves the list item.
 * @param {(course: Object, action: String)} props.onActionItemClick The callback for when the
 *     user clicks on one of the action items, with `action` being the clicked action.
 */
export default function SmallCourseListItem({
  course,
  indicator = undefined,
  actionItems = [],
  defaultActionItem = undefined,
  autoHideActionItems = false,
  onActionItemClick = null,
}) {
  const actionItemsContainer = useRef();
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const shouldShowActionItems = !autoHideActionItems || isMouseEntered;

  return (
    <ListItem disableGutters sx={{ width: '100%' }}>
      <Card
        onMouseEnter={() => setIsMouseEntered(true)}
        onMouseLeave={() => setIsMouseEntered(false)}
        onClick={(e) => {
          if (!actionItemsContainer?.current?.contains(e.target) && defaultActionItem)
            onActionItemClick?.(course, defaultActionItem);
        }}
        sx={{
          width: '100%',
          borderLeft: '8px solid ' + getColorByCourse(course),
          ...(!!defaultActionItem && {
            cursor: 'pointer',
            userSelect: 'none',
            '&:hover': { boxShadow: 3 },
          }),
        }}
      >
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Stack padding='8px' paddingLeft='16px' minWidth={0}>
            <CourseEligibilityIndicator placement='start' eligibility={indicator}>
              <Typography variant='h6' fontWeight={500} fontSize='1rem' whiteSpace='nowrap'>
                {formatCourseName(course.catalogCourseName)}
              </Typography>
              <Typography minWidth={0} noWrap>
                &nbsp;—&nbsp;{course.title}
              </Typography>
            </CourseEligibilityIndicator>
            <Typography variant='caption' color='text.secondary' noWrap>
              CS Major Requirement&nbsp;&nbsp;•&nbsp;&nbsp;
              {formatCreditRange(course)}
            </Typography>
          </Stack>
          {shouldShowActionItems && (
            <Stack ref={actionItemsContainer} direction='row' paddingRight='12px' spacing='8px'>
              {actionItems.map((key) =>
                createElement(ActionItem, {
                  key,
                  onClick: () => onActionItemClick?.(course, key),
                  ...actionItemComponents[key],
                })
              )}
            </Stack>
          )}
        </Stack>
      </Card>
    </ListItem>
  );
}

const actionItemComponents = {
  'info': {
    iconType: Info,
    label: 'Info',
    description: 'View course details',
    color: 'text.secondary',
  },
  'add': {
    iconType: AddBox,
    label: 'Add',
    description: 'I have taken this course',
    color: 'primary.main',
  },
  'edit': {
    iconType: Edit,
    label: 'Edit',
    description: 'Edit semester and instructor',
    color: 'text.secondary',
  },
  'review': {
    iconType: RateReview,
    label: 'Review',
    description: 'Review this course',
    color: 'text.secondary',
  },
  'remove': {
    iconType: Delete,
    label: 'Remove',
    description: 'I have not taken this course',
    color: 'text.secondary',
  },
};

const ActionItem = ({ iconType, label, description, color, ...props }) => (
  <Tooltip title={description} hidden={!description} disableInteractive>
    <Tab
      icon={createElement(iconType, { fontSize: 'small' })}
      label={label}
      sx={{
        minWidth: 0,
        width: '48px',
        minHeight: 0,
        padding: '8px',
        opacity: 1,
        fontSize: 'xx-small',
        color,
      }}
      {...props}
    />
  </Tooltip>
);
