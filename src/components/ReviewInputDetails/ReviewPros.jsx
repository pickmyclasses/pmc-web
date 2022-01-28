import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

import { Grid, Container } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import SubCard from '../Skeleton/SubCard';
import { gridSpacing } from '../../constants/constants';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import TextField from '@mui/material/TextField';

export default function ReviewPros({ course }) {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <SubCard>
      <Grid container spacing={gridSpacing}>
        <Grid
          item
          xs={12}
          sm={12}
          container
          direction='column'
          alignItems='center'
          justifyContent='center'
        >
          <MuiTypography variant='h6' gutterBottom>
            What do you like best?
          </MuiTypography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <ArrowCircleUpIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          </Box>

          <TextField
            id='outlined-multiline-flexible'
            label='Upsides'
            fullWidth
            multiline
            maxRows={4}
            value={value}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </SubCard>
  );
}
