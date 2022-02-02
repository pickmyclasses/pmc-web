import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 20,
  borderRadius: 20,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 20,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

export default function CustomizedProgressBars() {
  return (
    <Grid container direction='column' spacing={1} xs={6}>
      <Grid item>
        <BorderLinearProgress variant='determinate' value={100} />
      </Grid>
      <Grid item>
        <BorderLinearProgress variant='determinate' value={40} />
      </Grid>
      <Grid item>
        <BorderLinearProgress variant='determinate' value={10} />
      </Grid>
      <Grid item>
        <BorderLinearProgress variant='determinate' value={10} />
      </Grid>
      <Grid item>
        <BorderLinearProgress variant='determinate' value={10} />
      </Grid>
    </Grid>
  );
}
