import {
  Button,
  CardActions,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
  colors,
} from '@mui/material';
import UnloadConfirmation from 'components/CoursePage/CourseRegistration/UnloadConfirmation';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import { parseTime, secondsToTimeString, useDebounce, useMount } from 'utils';

export default function EditableTimeDataCardContent({
  data,
  hasConflicts = false,
  scrollCardIntoView = () => {},
  onIsEditableChange = () => {},
  onEditingEventChange = () => {},
  onEditingEventDelete = () => {},
  onEditingEventSave = () => {},
  onEditingEventCancel = () => {},
}) {
  const { start, end } = data;

  const [startInput, setStartInput] = useState(secondsToTimeString(start));
  const [endInput, setEndInput] = useState(secondsToTimeString(end));
  const [pendingChanges, setPendingChanges] = useState(data);
  const debouncedPendingChanges = useDebounce(pendingChanges, 250);
  const [isDirty, setIsDirty] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => onEditingEventChange(pendingChanges), [debouncedPendingChanges]);

  const handleDataValueChange = (key) => (value) => {
    setPendingChanges(Object.assign({ ...data }, Object.fromEntries([[key, value]])));
    setIsDirty(true);
  };

  const isValid = !isNaN(start) && !isNaN(end) && start < end;

  return (
    <>
      <UnloadConfirmation
        when={isDirty}
        navigationPreventionKey='time-data-card-editing'
        onNavigationPrevented={() => {
          scrollCardIntoView();
          setIsFlashing(true);
        }}
      />
      <Stack padding='20px' spacing='20px' width='288px'>
        <TextField
          placeholder='Title'
          value={pendingChanges.title}
          onChange={(e) => handleDataValueChange('title')(e.target.value)}
          variant='standard'
          autoFocus
          fullWidth
          multiline
          inputProps={{ style: { fontWeight: 500, fontSize: '1.13em' } }}
        />
        <Stack direction='row' spacing='12px'>
          <Select
            value={pendingChanges.type}
            onChange={(e) => handleDataValueChange('type')(e.target.value)}
            variant='standard'
            sx={{ width: '9em' }}
          >
            <MenuItem value='Event'>Event</MenuItem>
            <MenuItem value='Task'>Task</MenuItem>
            <MenuItem value='Meeting'>Meeting</MenuItem>
            <MenuItem value='Break'>Break</MenuItem>
          </Select>
          <CirclePicker
            colors={colorOptions}
            color={pendingChanges.color}
            onChange={(newColor) => handleDataValueChange('color')(newColor.hex)}
          />
        </Stack>
        <TextField
          label='Description'
          value={pendingChanges.subtitle}
          onChange={(e) => handleDataValueChange('subtitle')(e.target.value)}
          variant='standard'
          fullWidth
          multiline
          minRows={2}
          maxRows={4}
          size='small'
        />
        <ToggleButtonGroup
          value={pendingChanges.days}
          onChange={(_, newDays) =>
            newDays.length > 0 && handleDataValueChange('days')(newDays)
          }
          size='small'
          sx={{ width: '100%', '> *': { width: '20%' } }}
        >
          <ToggleButton value={1}>Mon</ToggleButton>
          <ToggleButton value={2}>Tue</ToggleButton>
          <ToggleButton value={3}>Wed</ToggleButton>
          <ToggleButton value={4}>Thu</ToggleButton>
          <ToggleButton value={5}>Fri</ToggleButton>
        </ToggleButtonGroup>
        <Stack direction='row' alignItems='center' spacing='8px'>
          <TextField
            placeholder='Start'
            value={startInput}
            onChange={(e) => {
              setStartInput(e.target.value);
              const parsed = parseTime(e.target.value);
              if (!isNaN(parsed) && parsed < end) handleDataValueChange('start')(parsed);
            }}
            variant='standard'
            sx={{ width: '4.5em' }}
            inputProps={{ style: { textAlign: 'center' } }}
          />
          <Typography>–</Typography>
          <TextField
            placeholder='End'
            value={endInput}
            onChange={(e) => {
              setEndInput(e.target.value);
              const parsed = parseTime(e.target.value);
              if (!isNaN(parsed) && parsed > start) handleDataValueChange('end')(parsed);
            }}
            variant='standard'
            sx={{ width: '4.5em' }}
            inputProps={{ style: { textAlign: 'center' } }}
          />
          {isValid && (
            <Typography variant='caption' color='text.secondary'>
              ({Math.floor((end - start) / 3600)}h {Math.floor(((end - start) % 3600) / 60)}m)
            </Typography>
          )}
        </Stack>
      </Stack>
      <MotionCardActions
        sx={{ marginTop: '-12px', padding: '12px', justifyContent: 'space-between' }}
        variants={cardActionsVariants}
        initial='initial'
        animate={isFlashing ? 'flashing' : 'initial'}
        transition={{ type: 'just', delay: isFlashing ? 0 : 0.25 }}
        onAnimationComplete={() => setIsFlashing(false)}
      >
        <Button
          color='error'
          size='small'
          onClick={() => onEditingEventDelete(() => onIsEditableChange(false))}
        >
          Delete
        </Button>
        <Stack direction='row' spacing='12px'>
          <Tooltip title='Conflicts detected' hidden={!hasConflicts}>
            <Button
              variant='contained'
              color={hasConflicts ? 'warning' : 'primary'}
              disabled={!isValid}
              size='small'
              onClick={() => onEditingEventSave(() => onIsEditableChange(false))}
            >
              Save
            </Button>
          </Tooltip>
          <Button
            color='inherit'
            size='small'
            onClick={() => {
              onEditingEventCancel?.();
              onIsEditableChange(false);
            }}
          >
            Cancel
          </Button>
        </Stack>
      </MotionCardActions>
    </>
  );
}

const colorOptions = ['#e91e63', '#673ab7', '#3f51b5', '#009688'];

const MotionCardActions = motion(CardActions);

const cardActionsVariants = {
  initial: { backgroundColor: '#fff' },
  flashing: { backgroundColor: colors.red[500] },
};
