import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import DropdownButton from './DropdownButton';

library.add(fas);

export default function TypeButton({ beforeClick, afterClick }) {
  const offerings = [
    { name: 'Online offerings', id: 1 },
    { name: 'In-person offerings', id: 2 },
  ];

  return (
    <DropdownButton name={'type'} beforeClick={beforeClick} afterClick={afterClick}>
      {offerings.map((offering) => (
        <MenuItem key={offering.id}>
          <FormControlLabel control={<Checkbox size='small' />} label={offering.name} />
        </MenuItem>
      ))}
      <MenuItem>
        <Button variant='contained' sx={{ width: '100%' }}>
          Include
        </Button>
      </MenuItem>
      <MenuItem>
        <Button variant='contained' sx={{ width: '100%' }}>
          Exclude
        </Button>
      </MenuItem>
    </DropdownButton>
  );
}
