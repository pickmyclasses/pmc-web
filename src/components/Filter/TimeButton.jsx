import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import DropdownButton from './DropdownButton';

library.add(fas);

export default function TimeButton({ beforeClick, afterClick }) {
  return (
    <DropdownButton name={'time'} beforeClick={beforeClick} afterClick={afterClick}>
      <MenuItem>
        <TextField
          label='start time'
          type='time'
          defaultValue='07:30'
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
          defaultValue='07:30'
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
