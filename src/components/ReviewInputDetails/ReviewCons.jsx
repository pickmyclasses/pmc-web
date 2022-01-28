import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import SubCard from '../Skeleton/SubCard';
import { gridSpacing } from '../../constants/constants';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import TextField from '@mui/material/TextField';

export default function ReviewCons({ course }) {
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
            What do you dislike?
          </MuiTypography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <ArrowCircleDownIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          </Box>

          <TextField
            id='outlined-multiline-flexible'
            label='Downsides'
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
