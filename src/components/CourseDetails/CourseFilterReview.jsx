import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FilterContext } from '../CoursePage/CourseReviews';

export default function CourseFilterReview() {
  const { filterMethod, setFilterMethod } = useContext(FilterContext);

  const handleChange = (e) => setFilterMethod(e.target.value);

  return (
    <Box width='192px'>
      <FormControl fullWidth>
        <InputLabel>Sort reviews by</InputLabel>
        <Select value={filterMethod} label='Sort reviews by' onChange={handleChange}>
          <MenuItem value='most-recent'>Most Recent</MenuItem>
          <MenuItem value='least-recent'>Least Recent</MenuItem>
          <MenuItem value='most-helpful'>Most Helpful</MenuItem>
          <MenuItem value='least-helpful'>Least Helpful</MenuItem>
          <MenuItem value='highest-rated'>Highest Rated</MenuItem>
          <MenuItem value='lowest-rated'>Lowest Rated</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
