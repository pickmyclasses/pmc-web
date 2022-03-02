import React from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Box,
  Card,
  CardActions,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Edit, Info } from '@material-ui/icons';

export default function TimeDataCard({
  data: { title, subtitle, description, coursePageURL, topBorderColor = 'gray' },
  hasConflicts = false,
  onLinkClick = () => {},
}) {
  return (
    <Card
      sx={{
        position: 'relative',
        minWidth: '288px',
        padding: '12px 16px 16px',
        borderTop: '8px solid ' + topBorderColor,
        boxShadow: 3,
      }}
    >
      <Typography variant='h6' fontSize='1.125rem'>
        {title}
      </Typography>
      <Typography variant='body2'>{subtitle}</Typography>
      <Divider sx={{ margin: '12px 0px' }} />
      <Box>{description}</Box>
      {hasConflicts && (
        <Alert
          severity='warning'
          sx={{ display: 'flex', alignItems: 'center', height: '24px', margin: '8px 0' }}
        >
          Conflicts with another event.
        </Alert>
      )}
      <CardActions sx={{ padding: '12px 0 0', margin: '-8px' }}>
        <Tooltip title='Edit' disableInteractive>
          {/* TODO Q: The edit link should link to course page with scroll bar location
           *  pointed at the offering listing table. */}
          <IconButton
            component={Link}
            to={coursePageURL + '/registration'}
            onClick={onLinkClick}
          >
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title='Course Details' disableInteractive>
          <IconButton component={Link} to={coursePageURL} onClick={onLinkClick}>
            <Info />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
