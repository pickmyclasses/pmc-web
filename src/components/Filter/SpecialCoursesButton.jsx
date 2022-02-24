import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import DropdownButton from './DropdownButton';

library.add(fas);

export default function SpecialCoursesButton({ beforeClick, afterClick }) {
  const courses = [
    { name: 'Honors', id: 1 },
    { name: 'Special Topics', id: 2 },
    { name: 'Independent Study', id: 3 },
    { name: 'Thesis', id: 4 },
  ];

  return (
    <DropdownButton name={'special courses'} beforeClick={beforeClick} afterClick={afterClick}>
      {courses.map((course) => (
        <MenuItem key={course.id}>
          <FormControlLabel control={<Checkbox size='small' />} label={course.name} />
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
