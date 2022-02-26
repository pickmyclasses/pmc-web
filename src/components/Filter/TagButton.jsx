import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import SearchList from './SearchList';

library.add(fas);

export default function TagButton() {
  return (
    <>
      <MenuItem>
        <SearchList />
      </MenuItem>
      <MenuItem>
        <Button variant='contained' sx={{ width: '100%' }}>
          Clear
        </Button>
      </MenuItem>
    </>
  );
}
