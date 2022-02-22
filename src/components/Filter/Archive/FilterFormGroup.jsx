import { React, useState } from 'react';
import { Box, Switch } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

export default function FilterFormGroup() {
  const [showWeekday, setShowWeekday] = useState(false);
  const [showMinRating, setShowMinRating] = useState(false);
  const [showMinHour, setShowMinHour] = useState(false);
  const [showMaxHour, setShowMaxHour] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleWeekdayCheck = (event) => {
    setShowWeekday(event.target.checked);
  };

  const handleMinRating = (event) => {
    setShowMinRating(event.target.checked);
  };

  const handleMinHour = (event) => {
    setShowMinHour(event.target.checked);
  };

  const handleMaxHour = (event) => {
    setShowMaxHour(event.target.checked);
  };

  const handleShowTimePicker = (event) => {
    setShowTimePicker(event.target.checked);
  };

  return (
    <div>
      <FormGroup>
        <FormControlLabel
          control={<SwitchButton />}
          label='Hide no offering'
          style={{ marginTop: 10 }}
        />
        <Divider
          sx={{
            borderBottomWidth: 1,
            marginTop: 2,
            marginBottom: 1,
            marginRight: 7,
            marginLeft: 1,
          }}
        />
        <div style={{ marginLeft: 13, fontWeight: 'bold' }}>Offerings</div>
        <FormControlLabel
          control={<Checkbox />}
          label='Online offerings'
          style={{ marginLeft: 1 }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label='In-person offerings'
          style={{ marginLeft: 1 }}
        />
        <Divider
          sx={{
            borderBottomWidth: 1,
            marginTop: 1,
            marginBottom: 1,
            marginRight: 7,
            marginLeft: 1,
            fontSize: 10,
          }}
        />
        <div style={{ marginLeft: 13, fontWeight: 'bold' }}>Special Courses</div>
        <FormControlLabel
          control={<Checkbox />}
          label='Honor courses'
          style={{ marginLeft: 1 }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label='Special Topics'
          style={{ marginLeft: 1 }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label='Independent Study'
          style={{ marginLeft: 1 }}
        />
        <FormControlLabel control={<Checkbox />} label='Thesis' style={{ marginLeft: 1 }} />
        <Divider
          sx={{
            borderBottomWidth: 1,
            marginTop: 1,
            marginBottom: 1,
            marginRight: 7,
            marginLeft: 1,
          }}
        />
        <div style={{ marginLeft: 13, fontWeight: 'bold' }}>Specifications</div>
        <FormControlLabel
          control={<Checkbox onClick={handleMinRating} />}
          label='Minimum rating'
          style={{ marginLeft: 1 }}
        />
        {showMinRating && <MinRatingDropDown />}
        <FormControlLabel
          control={<Checkbox onClick={handleMinHour} />}
          label='Minimum credit hour'
          style={{ marginLeft: 1 }}
        />
        {showMinHour && (
          <TextField
            label='min hour'
            variant='standard'
            maxRows={1}
            sx={{ maxWidth: 95, marginLeft: 5 }}
          />
        )}
        <FormControlLabel
          control={<Checkbox onClick={handleMaxHour} />}
          label='Maximum credit hour'
          style={{ marginLeft: 1 }}
        />
        {showMaxHour && (
          <TextField
            label='max hour'
            variant='standard'
            maxRows={1}
            sx={{ maxWidth: 95, marginLeft: 5 }}
          />
        )}
        <Divider
          sx={{
            borderBottomWidth: 1,
            marginTop: 1,
            marginBottom: 1,
            marginRight: 7,
            marginLeft: 1,
          }}
        />
        <div style={{ marginLeft: 13, fontWeight: 'bold' }}>Time/Date</div>
        <FormControlLabel
          control={<Checkbox onClick={handleWeekdayCheck} />}
          label='Select days offering'
          style={{ marginLeft: 1 }}
        />
        {showWeekday && <WeekdayDropDown />}
        <FormControlLabel
          control={<Checkbox onClick={handleShowTimePicker} />}
          label='Select a time range'
          style={{ marginLeft: 1 }}
        />
        {showTimePicker && <TimeRangePicker />}
        <Divider
          sx={{
            borderBottomWidth: 1,
            marginTop: 1,
            marginBottom: 1,
            marginRight: 7,
            marginLeft: 1,
          }}
        />
        <div style={{ marginLeft: 13, fontWeight: 'bold' }}>Exclusions</div>
        <FormControlLabel
          control={<Checkbox onClick={handleShowTimePicker} />}
          label='Exclude tags'
          style={{ marginLeft: 1 }}
        />
        <FormControlLabel
          control={<Checkbox onClick={handleShowTimePicker} />}
          label='Exclude professors'
          style={{ marginLeft: 1 }}
        />
      </FormGroup>
    </div>
  );
}

const WeekdayDropDown = () => {
  const weekdays = [
    { date: 'Monday', num: 1 },
    { date: 'Tuesday', num: 2 },
    { date: 'Wednesday', num: 3 },
    { date: 'Thursday', unm: 4 },
    { date: 'Friday', num: 5 },
  ];
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4 }}>
      {weekdays.map((day) => (
        <div key={day.num}>
          <FormControlLabel control={<Checkbox size='small' />} label={day.date} />
        </div>
      ))}
    </Box>
  );
};

const MinRatingDropDown = () => {
  return (
    <FormControl variant='standard' sx={{ m: 1, maxWidth: 90 }}>
      <InputLabel sx={{ marginLeft: 4 }}>Minimum rating</InputLabel>
      <Select value='1' sx={{ marginLeft: 4 }}>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
      </Select>
    </FormControl>
  );
};

const TimeRangePicker = () => {
  return (
    <Stack component='form' noValidate spacing={3}>
      <TextField
        label='start time'
        type='time'
        defaultValue='07:30'
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 600,
        }}
        sx={{ width: 140 }}
        style={{ marginLeft: 13 }}
      />
      <TextField
        label='end time'
        type='time'
        defaultValue='07:30'
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 600,
        }}
        sx={{ width: 140 }}
        style={{ marginLeft: 13 }}
      />
    </Stack>
  );
};

const SwitchButton = styled(Switch)(({ theme }) => ({
  padding: 8,
  marginLeft: 13,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));
