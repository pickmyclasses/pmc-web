import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import DropdownButton from './DropdownButton';

library.add(fas);

export default function CreditButton({ beforeClick, afterClick }) {
  return (
    <DropdownButton name={'credit hour'} beforeClick={beforeClick} afterClick={afterClick}>
      <MenuItem>
        <FormControl sx={{ width: '100%' }}>
          <OutlinedInput placeholder='Maximum credit hour' />
        </FormControl>
      </MenuItem>
      <MenuItem>
        <FormControl sx={{ width: '100%' }}>
          <OutlinedInput placeholder='Minimum credit hour' />
        </FormControl>
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
