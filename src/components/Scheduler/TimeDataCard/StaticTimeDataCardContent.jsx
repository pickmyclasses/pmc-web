import { Edit, Info } from '@mui/icons-material';
import { Alert, CardActions, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PreventableLink from 'components/PreventableNavigation/PreventableLink';
import React from 'react';
import { formatDayList, formatTimeRange } from '../CourseScheduleSummary';

export default function StaticTimeDataCardContent({
  data: {
    title,
    subtitle,
    type,
    description,
    editURL = undefined,
    infoURL = undefined,
    isEditable = false,
    days = undefined,
    start = undefined,
    end = undefined,
  },
  hasConflicts = false,
  onEditButtonClick = () => {},
  onLinkClick = () => {},
}) {
  return (
    <Box padding='12px 20px 16px'>
      <Typography variant='h6' fontSize='1.125rem'>
        {title}
      </Typography>
      {type && (
        <Typography variant='body2' color='text.secondary' gutterBottom>
          {type}
        </Typography>
      )}
      <Typography variant='body2'>{subtitle}</Typography>
      <Divider sx={{ margin: '12px 0px' }} />
      {description && <Box>{description}</Box>}
      {[
        days && formatDayList(days),
        start && formatTimeRange({ startTime: start, endTime: end }),
      ]
        .filter(Boolean)
        .join(' @ ')}
      {hasConflicts && (
        <Alert
          severity='warning'
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '24px',
            margin: '8px 0',
            whiteSpace: 'nowrap',
          }}
        >
          Conflicts with another event
        </Alert>
      )}
      <CardActions sx={{ padding: '12px 0 0', margin: '-8px' }}>
        {editURL ? (
          <Tooltip title='Edit' disableInteractive>
            <IconButton component={PreventableLink} to={editURL} onClick={onLinkClick}>
              <Edit />
            </IconButton>
          </Tooltip>
        ) : (
          isEditable && (
            <Tooltip title='Edit' disableInteractive>
              <IconButton onClick={onEditButtonClick}>
                <Edit />
              </IconButton>
            </Tooltip>
          )
        )}
        {infoURL && (
          <Tooltip title='Details' disableInteractive>
            <IconButton component={PreventableLink} to={infoURL} onClick={onLinkClick}>
              <Info />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Box>
  );
}
