import { React, useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function TimeButton({ optionSelected, setOptionSelected }) {
  const [value, setValue] = useState(['', '']);

  useEffect(() => {
    if (optionSelected.length) setValue(optionSelected);
  }, [optionSelected]);

  const handleClear = () => {
    const newVal = ['', ''];
    setValue(newVal);
    setOptionSelected(newVal);
  };

  const setStartTime = (event) => {
    let newVal = [];
    newVal[0] = event.target.value;
    newVal[1] = value[1];
    setValue(newVal);
    setOptionSelected(newVal);
  };

  const setEndTime = (event) => {
    let newVal = [];
    newVal[0] = value[0];
    newVal[1] = event.target.value;
    setValue(newVal);
    setOptionSelected(newVal);
  };

  return (
    <>
      <MenuItem>
        <TextField
          label='start time'
          type='time'
          value={value[0]}
          onChange={(event) => setStartTime(event)}
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
          value={value[1]}
          onChange={(event) => setEndTime(event)}
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
