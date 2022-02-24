import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import DropdownButton from './DropdownButton';

library.add(fas);

export default function RatingButton({ beforeClick, afterClick }) {
  const ratings = [
    { name: '1', id: 1 },
    { name: '2', id: 2 },
    { name: '3', id: 3 },
    { name: '4', id: 4 },
    { name: '5', id: 5 },
  ];
  return (
    <DropdownButton name={'min rating'} beforeClick={beforeClick} afterClick={afterClick}>
      {ratings.map((rating) => (
        <MenuItem key={rating.id}>
          <FormControlLabel control={<Checkbox size='medium' />} label={rating.name} />
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
