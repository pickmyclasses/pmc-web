import React from 'react';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { CustomSelect, StyledOption } from '../UnstyledBasics/CustomSelect';
import { CustomInput } from '../UnstyledBasics/CustomInput';

export const TypeDropdown = ({ setOptionSelect }) => {
  const types = [
    { name: 'Online offerings', id: 1 },
    { name: 'In person offerings', id: 2 },
  ];

  return (
    <Box sx={{ height: '7%', border: '1px solid grey', backgroundColor: 'white' }}>
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

export const SpecialCourseDropdown = ({ setOptionSelect }) => {
  const specialCourses = [
    { name: 'Honor courses', id: 1 },
    { name: 'Special topics', id: 2 },
    { name: 'Independent study', id: 3 },
    { name: 'Thesis', id: 4 },
  ];

  return (
    <Box sx={{ height: '7%', border: '1px solid grey', backgroundColor: 'white' }}>
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
              onClick={(event) => setOptionSelect(event.target.checked)}
              style={{ marginLeft: 1 }}
            />
          ))}
        </div>
      </FormGroup>
    </Box>
  );
};

export const SpecialDropdown = ({ setOptionSelect }) => {
  return (
    <Box sx={{ height: '9%', border: '1px solid grey', backgroundColor: 'white' }}>
      <FormGroup row>
        <div style={{ marginLeft: '10%' }}>
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography variant='body2' color='black'>
                Minimum rating
              </Typography>
            }
            style={{ marginLeft: 1 }}
          />
          <RatingDropdown />
          <FormControlLabel
            control={<Checkbox />}
            label={
              <Typography variant='body2' color='black'>
                Minimum credit hours
              </Typography>
            }
            style={{ marginLeft: 20 }}
          />
          <CustomInput label={'min hour'} placeholder={'min hour'} />
        </div>
      </FormGroup>
    </Box>
  );
};

const RatingDropdown = () => {
  return (
    <CustomSelect defaultValue={1}>
      <StyledOption value={1}>1</StyledOption>
      <StyledOption value={2}>2</StyledOption>
      <StyledOption value={3}>3</StyledOption>
      <StyledOption value={4}>4</StyledOption>
      <StyledOption value={5}>5</StyledOption>
    </CustomSelect>
  );
};
