import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SearchList from './SearchList';

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
