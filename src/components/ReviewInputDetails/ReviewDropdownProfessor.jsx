import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Option for the user to select the professor when writing a review
export default function ReviewDropdownProfessor({ options, value, onChange }) {
  return (
    <>
      <FormControl sx={{ width: '192px' }}>
        <InputLabel>Professors</InputLabel>
        <Select
          value={value}
          label='ProfessorsOptions'
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option.professorName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
