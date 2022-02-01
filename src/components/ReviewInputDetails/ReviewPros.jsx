import React from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { ArrowCircleUp } from '@mui/icons-material';
import { gridSpacing } from '../../constants/constants';
import SubCard from '../Skeleton/SubCard';

export default function ReviewPros({ value, onChange }) {
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
          <Typography variant='h6' gutterBottom>
            What do you like best?
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <ArrowCircleUp sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          </Box>

          <TextField
            id='outlined-multiline-flexible'
            variant='standard'
            fullWidth
            multiline
            rows={4}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
          />
        </Grid>
      </Grid>
    </SubCard>
  );
}
