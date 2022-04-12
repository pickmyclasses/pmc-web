import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import SearchBar from '../Search/SearchBar';

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
          fontSize={'10px'}
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
