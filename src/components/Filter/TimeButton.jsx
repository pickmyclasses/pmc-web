import { React, useState, useEffect, useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FilterContext } from 'pages/SearchPage';

export default function TimeButton({ optionSelected, setOptionSelected }) {
  const [value, setValue] = useState(['', '']);
  const { setStartTimeClock, setEndTimeClock } = useContext(FilterContext);

  useEffect(() => {
    if (optionSelected.length) setValue(optionSelected);
  }, [optionSelected]);

  const handleClear = () => {
    const newVal = ['', ''];
    setValue(newVal);
    setOptionSelected(newVal);
  };

  const setStartTime = (event) => {
    let newVal = [event.target.value, value[1]];
    setValue(newVal);
    setOptionSelected(newVal);
    setStartTimeClock(newVal);
  };

  const setEndTime = (event) => {
    let newVal = [value[0], event.target.value];
    setValue(newVal);
    setOptionSelected(newVal);
    setEndTimeClock(newVal);
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
