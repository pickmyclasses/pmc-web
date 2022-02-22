import { React } from 'react';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

export const TypeDropDown = () => {
  const types = [
    { name: 'Online offerings', id: 1 },
    { name: 'In person offerings', id: 2 },
  ];

  return (
    <Box sx={{ height: '5%', border: '1px solid grey', backgroundColor: 'white' }}>
      <FormGroup row>
        <div style={{ marginLeft: '10%' }}>
          {types.map((course) => (
            <FormControlLabel
              key={course.id}
              control={<Checkbox />}
              label={
                <Typography variant='body2' color='black'>
                  {course.name}
                </Typography>
              }
              style={{ marginLeft: 1 }}
            />
          ))}
        </div>
      </FormGroup>
    </Box>
  );
};

export const SpecialCourseDropDown = () => {
  const specialCourses = [
    { name: 'Honor courses', id: 1 },
    { name: 'Special topics', id: 2 },
    { name: 'Independent study', id: 3 },
    { name: 'Thesis', id: 4 },
  ];

  return (
    <Box sx={{ height: '5%', border: '1px solid grey', backgroundColor: 'white' }}>
      <FormGroup row>
        <div style={{ marginLeft: '10%' }}>
          {specialCourses.map((course) => (
            <FormControlLabel
              key={course.id}
              control={<Checkbox />}
              label={
                <Typography variant='body2' color='black'>
                  {course.name}
                </Typography>
              }
              style={{ marginLeft: 1 }}
            />
          ))}
        </div>
      </FormGroup>
    </Box>
  );
};
