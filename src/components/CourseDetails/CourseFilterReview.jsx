import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FilterContext } from '../CoursePage/CourseReviews';

export default function CourseFilterReview() {
  const { filterMethod, setFilterMethod } = useContext(FilterContext);
  const handleChange = (event) => {
    setFilterMethod(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Sort</InputLabel>
        <Select
          labelId='simple-select-label'
          id='simple-select'
          value={filterMethod}
          label='Filter'
          onChange={handleChange}
        >
          <MenuItem value='MostRecent'>Most Recent</MenuItem>
          <MenuItem value='LeastRecent'>Least Recent</MenuItem>
          <MenuItem value='MostHelpful'>Most Helpful</MenuItem>
          <MenuItem value='LeastHelpful'>Least Helpful</MenuItem>
          <MenuItem value='HighestRated'>Highest Rated</MenuItem>
          <MenuItem value='LowestRated'>Lowest Rated</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
