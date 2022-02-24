import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import DropdownButton from './DropdownButton';

library.add(fas);

export default function DateButton({ beforeClick, afterClick }) {
  const weekdays = [
    { name: 'Monday', id: 1 },
    { name: 'Tuesday', id: 2 },
    { name: 'Wednesday', id: 3 },
    { name: 'Thursday', id: 4 },
    { name: 'Friday', id: 5 },
    { name: 'Saturday', id: 6 },
    { name: 'Sunday', id: 7 },
  ];

  return (
    <DropdownButton name={'date'} beforeClick={beforeClick} afterClick={afterClick}>
      {weekdays.map((day) => (
        <MenuItem key={day.id}>
          <FormControlLabel control={<Checkbox size='small' />} label={day.name} />
        </MenuItem>
      ))}
      <MenuItem>
        <Button variant='contained' sx={{ width: '100%' }}>
          Save
        </Button>
      </MenuItem>
      <MenuItem>
        <Button variant='contained' sx={{ width: '100%' }}>
          Clear
        </Button>
      </MenuItem>
    </DropdownButton>
  );
}
