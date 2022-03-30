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
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import UnloadConfirmation from 'components/CoursePage/CourseRegistration/UnloadConfirmation';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import { parseTime, pluralize, secondsToTimeString, useDebounce } from 'utils';

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
  const [parsedStartInput, setParsedStartInput] = useState(NaN);
  const [parsedEndInput, setParsedEndInput] = useState(NaN);
  const [pendingChanges, setPendingChanges] = useState(data);
  const debouncedPendingChanges = useDebounce(pendingChanges, 250);
  const [isDirty, setIsDirty] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);
  const [isSavingLoading, setIsSavingLoading] = useState(false);

  useEffect(
    () => onEditingEventChange(pendingChanges),
    // eslint-disable-next-line
    [debouncedPendingChanges]
  );

  useEffect(() => setParsedStartInput(parseTime(startInput)), [startInput]);
  useEffect(() => setParsedEndInput(parseTime(endInput)), [endInput]);
  useEffect(() => {
    const isValid =
      !isNaN(parsedStartInput) && !isNaN(parsedEndInput) && parsedStartInput < parsedEndInput;
    setIsValid(isValid);
    if (isValid) {
      handleDataValueChange(['start', parsedStartInput], ['end', parsedEndInput]);
      setTimeout(scrollCardIntoView, 750);
    }
    // eslint-disable-next-line
  }, [parsedStartInput, parsedEndInput]);

  const handleDataValueChange = (...args) => {
    setPendingChanges(Object.assign({ ...data }, Object.fromEntries(args)));
    setIsDirty(true);
  };

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
          onChange={(e) => handleDataValueChange(['title', e.target.value])}
          variant='standard'
          autoFocus
          fullWidth
          multiline
          inputProps={{ style: { fontWeight: 500, fontSize: '1.13em' } }}
        />
        <Stack direction='row' spacing='12px'>
          <Select
            value={pendingChanges.type}
            onChange={(e) => handleDataValueChange(['type', e.target.value])}
            variant='standard'
            sx={{ width: '9em', textAlign: 'center' }}
          >
            <MenuItem value='Event'>Event</MenuItem>
            <MenuItem value='Task'>Task</MenuItem>
            <MenuItem value='Meeting'>Meeting</MenuItem>
            <MenuItem value='Break'>Break</MenuItem>
          </Select>
          <CirclePicker
            colors={colorOptions}
            color={pendingChanges.color}
            onChange={(newColor) => handleDataValueChange(['color', newColor.hex])}
          />
        </Stack>
        <TextField
          label='Description'
          value={pendingChanges.subtitle}
          onChange={(e) => handleDataValueChange(['subtitle', e.target.value])}
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
            newDays.length > 0 && handleDataValueChange(['days', newDays.sort()])
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
            onChange={(e) => setStartInput(e.target.value)}
            variant='standard'
            sx={{ width: '4.5em' }}
            inputProps={{ style: { textAlign: 'center' } }}
          />
          <Typography>–</Typography>
          <TextField
            placeholder='End'
            value={endInput}
            onChange={(e) => setEndInput(e.target.value)}
            variant='standard'
            sx={{ width: '4.5em' }}
            inputProps={{ style: { textAlign: 'center' } }}
          />
          {isValid && (
            <Typography variant='caption' color='text.secondary'>
              ({formatDuration({ startTime: start, endTime: end })})
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
        <Button color='error' size='small' onClick={() => setIsDeleteConfirmationOpen(true)}>
          Delete
        </Button>
        <Stack direction='row' spacing='12px'>
          <Tooltip title={isValid && hasConflicts ? 'Save with conflicts' : ''}>
            <Box component='span'>
              <LoadingButton
                variant='contained'
                color={hasConflicts ? 'warning' : 'primary'}
                disabled={!isValid}
                size='small'
                loading={isSavingLoading}
                onClick={() => {
                  setIsSavingLoading(true);
                  onEditingEventSave(() => onIsEditableChange(false));
                }}
              >
                Save
              </LoadingButton>
            </Box>
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
      <Dialog
        open={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Delete event {pendingChanges.title}?</DialogTitle>
        <DialogActions sx={{ padding: '16px' }}>
          <Button color='inherit' onClick={() => setIsDeleteConfirmationOpen(false)}>
            Cancel
          </Button>
          <LoadingButton
            variant='contained'
            color='error'
            loading={isDeletingLoading}
            onClick={() => {
              setIsDeletingLoading(true);
              onEditingEventDelete(() => onIsEditableChange(false));
            }}
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}

const colorOptions = ['#2d4e86', '#662d86', '#86512d', '#2d8665'];

const MotionCardActions = motion(CardActions);

const cardActionsVariants = {
  initial: { backgroundColor: '#fff' },
  flashing: { backgroundColor: colors.red[500] },
};

const formatDuration = ({ startTime, endTime }) => {
  const hours = Math.floor((endTime - startTime) / 3600);
  const minutes = Math.floor(((endTime - startTime) % 3600) / 60);
  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
  if (hours > 0) return pluralize(hours, 'hour');
  return pluralize(minutes, 'minute');
};
