import { People, Place } from '@mui/icons-material';
import {
  Checkbox,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { CenterAligningFlexBox } from 'components/CourseCardGrid/CourseCard/CourseCard';
import DaysIndicator from 'components/CourseCardGrid/CourseCard/DaysIndicator';
import { formatTimeRange } from 'components/Scheduler/CourseScheduleSummary';
import React from 'react';
import { parseDayList, pluralize } from 'utils';
import { iconTypeByComponent } from '../CourseComponentsSummary';
import LabelWithIcon from '../LabelWithIcon';

export default function OfferingListingItem({
  children = undefined,
  selected = false,
  component,
  classData,
  onSelect,
  setMouseEnteredClasses,
}) {
  const { location, offerDate, startTime, seatAvailable } = classData;

  return (
    <ListItemButton
      autoFocus={selected}
      disableGutters
      selected={selected}
      onClick={onSelect}
      onMouseEnter={() => setMouseEnteredClasses([classData])}
      onMouseLeave={() => setMouseEnteredClasses([])}
    >
      <Stack paddingX='16px' width='100%'>
        {children}
        <Stack direction='row'>
          <ListItemIcon sx={{ minWidth: 0, marginRight: '-8px' }}>
            <Checkbox checked={selected} />
          </ListItemIcon>
          <ListItemText>
            <Grid
              container
              margin='8px 16px'
              width='calc(100% - 32px)'
              columns={19}
              display='flex'
              alignItems='center'
            >
              <Grid item xs={4}>
                <LabelWithIcon
                  color='action'
                  iconType={iconTypeByComponent[component] || People}
                  label={component}
                  size='small'
                  noWrap
                />
              </Grid>
              <Grid item xs={5}>
                <LabelWithIcon
                  color='action'
                  iconType={Place}
                  label={location || 'Online'}
                  size='small'
                  noWrap
                />
              </Grid>
              <Grid item xs={5}>
                <CenterAligningFlexBox>
                  <DaysIndicator
                    isMouseEntered={selected}
                    width={startTime ? '96px' : '100%'}
                    setMinWidth
                    days={parseDayList(offerDate)}
                  />
                  {startTime && (
                    <Typography variant='body2' whiteSpace='nowrap'>
                      {formatTimeRange(classData)}
                    </Typography>
                  )}
                </CenterAligningFlexBox>
              </Grid>
              <Grid item xs={5}>
                <Typography variant='body2' fontStyle='italic' align='right' noWrap>
                  {pluralize(+seatAvailable + (+classData.id % 6) + 1, 'seat')} open
                </Typography>
              </Grid>
            </Grid>
          </ListItemText>
        </Stack>
      </Stack>
    </ListItemButton>
  );
}
