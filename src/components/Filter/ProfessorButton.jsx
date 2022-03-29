import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../Search/SearchBar';

library.add(fas);

export default function ProfessorButton() {
  const handleSearch = () => {
    alert('** button with search drop down');
  };

  return (
    <>
      <MenuItem>
        <SearchBar
          textColor={grey[900]}
          backgroundColor={grey[200]}
          onSearchClick={handleSearch}
          maxWidth={'100%'}
          focusHoverColor={grey[300]}
          placeholderText={'Search for a professor'}
          borderRadius={'4px'}
          fontSize={'1.3em'}
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
    </>
  );
}
