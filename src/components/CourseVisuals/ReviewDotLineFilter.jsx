import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FilterContext } from '../CoursePage/CourseStats';

export default function ReviewDotLineFilter() {
  const { filterMethod, setFilterMethod } = useContext(FilterContext);

  const handleChange = (e) => setFilterMethod(e.target.value);

  return (
    <Box width='192px'>
      <FormControl fullWidth>
        <InputLabel>Filters</InputLabel>
        <Select value={filterMethod} label='Sort reviews by' onChange={handleChange}>
          <MenuItem value='Today'>Today</MenuItem>
          <MenuItem value='This week'>This week</MenuItem>
          <MenuItem value='This month'>This month</MenuItem>
          <MenuItem value='This year'>This year</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
