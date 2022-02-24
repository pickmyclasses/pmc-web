import React from 'react';
import { Container, Grid } from '@mui/material';
import MainCard from '../components/Skeleton/MainCard';
import { gridSpacing } from '../constants/constants';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
export default function ReviewPage() {
  return (
    <Container maxWidth='xl' sx={{ flex: 1, minHeight: 0 }}>
      <MainCard>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={12}>
            <FormControl>
              <FormLabel id='demo-row-radio-buttons-group-label'>
                The course objectives were clear
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
              >
                <FormControlLabel value='-2' control={<Radio />} label='Strongly Disagree' />
                <FormControlLabel value='-1' control={<Radio />} label='Disagree' />
                <FormControlLabel value='0' control={<Radio />} label='Neutral' />
                <FormControlLabel value='1' control={<Radio />} label='Agree' />
                <FormControlLabel value='2' control={<Radio />} label='Strongly Agree' />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </MainCard>
    </Container>
  );
}
