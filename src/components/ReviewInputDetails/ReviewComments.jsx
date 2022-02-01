import React from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { ArrowCircleDown } from '@mui/icons-material';
import { gridSpacing } from '../../constants/constants';
import SubCard from '../Skeleton/SubCard';

export default function ReviewComments({ value, onChange }) {
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
            Here's your chance to be more specific
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <ArrowCircleDown sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          </Box>

          <TextField
            id='outlined-multiline-flexible'
            fullWidth
            multiline
            rows={4}
            value={value}
            color='secondary'
            onChange={(event) => {
              onChange(event.target.value);
            }}
          />
        </Grid>
      </Grid>
    </SubCard>
  );
}
