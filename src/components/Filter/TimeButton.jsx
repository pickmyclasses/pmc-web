import { React, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function TimeButton() {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleClear = () => {
    setStartTime('');
    setEndTime('');
  };

  return (
    <>
      <MenuItem>
        <TextField
          label='start time'
          type='time'
          value={startTime}
          onChange={(event) => setStartTime(event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300,
          }}
          sx={{ width: 200 }}
        />
      </MenuItem>
      <MenuItem>
        <TextField
          label='end time'
          type='time'
          value={endTime}
          onChange={(event) => setEndTime(event.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300,
          }}
          sx={{ width: 200 }}
        />
      </MenuItem>
      <MenuItem>
        <Button variant='contained' sx={{ width: '100%' }} onClick={handleClear}>
          Clear
        </Button>
      </MenuItem>
    </>
  );
}
