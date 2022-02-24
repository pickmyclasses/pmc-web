import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../Search/SearchBar';
import DropdownButton from './DropdownButton';

library.add(fas);

export default function TagButton({ beforeClick, afterClick }) {
  const handleSearch = () => {
    console.log('clicked');
  };

  return (
    <DropdownButton name={'tag'} beforeClick={beforeClick} afterClick={afterClick}>
      <MenuItem>
        <SearchBar
          textColor={grey[900]}
          backgroundColor={grey[200]}
          onSearchClick={handleSearch}
          maxWidth={'100%'}
          focusHoverColor={grey[300]}
        />
      </MenuItem>
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
