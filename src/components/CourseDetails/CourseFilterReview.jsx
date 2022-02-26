import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CourseContext } from '../../pages/CoursePage';
import { useNavigate } from 'react-router-dom';
import filterContext from '../CoursePage/CourseReviews';

export default function CourseFilterReview() {
  const course = useContext(CourseContext);
  const [sort, setSort] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    filterContext.filterMethod = event.target.value;
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Sort</InputLabel>
        <Select
          labelId='simple-select-label'
          id='simple-select'
          value={filterContext.filterMethod}
          label='Filter'
          onChange={handleChange}
        >
          <MenuItem value='MRE'>Most Recent</MenuItem>
          <MenuItem value='LRE'>Least Recent</MenuItem>
          <MenuItem value='MHE'>Most Helpful</MenuItem>
          <MenuItem value='LHE'>Least Helpful</MenuItem>
          <MenuItem value='HRA'>Highest Rated</MenuItem>
          <MenuItem value='LRA'>Lowest Rated</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
