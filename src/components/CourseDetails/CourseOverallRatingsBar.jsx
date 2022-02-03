import * as React from 'react';
import { Grid } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@material-ui/core';
const useStyles = makeStyles({
  orange: {
    '& .MuiLinearProgress-barColorPrimary': {
      backgroundColor: '#F3D265',
    },
  },
});

function NumberLinearProgress(props) {
  const classes = useStyles();

  return (
    <Box display='flex' alignItems='center'>
      <Box width='3%' mr={1}>
        <Typography variant='body2' color='textSecondary'>{`${props.stars}`}</Typography>
      </Box>

      <Box width='100%' mr={1}>
        <LinearProgress
          sx={{
            height: 20,
            borderRadius: 5,
            bgcolor: '#e0e0e0',
          }}
          variant='determinate'
          className={classes.orange}
          value={props.value}
        />
      </Box>
      <Typography variant='body2' color='textSecondary'>{`${props.value}%`}</Typography>
    </Box>
  );
}

function getRatingDistribution({ reviews }) {
  var dict = {
    oneStar: 0,
    twoStar: 0,
    threeStar: 0,
    fourStar: 0,
    fiveStar: 0,
  };
  if (!reviews) {
    return dict;
  }
  for (let i = 0; i < reviews.length; i++) {
    switch (reviews[i].Rating) {
      case 1:
        dict['oneStar'] += 1;
        break;
      case 2:
        dict['twoStar'] += 1;
        break;
      case 3:
        dict['threeStar'] += 1;
        break;
      case 4:
        dict['fourStar'] += 1;
        break;
      case 5:
        dict['fiveStar'] += 1;

        break;
    }
  }
  return dict;
}

export default function CustomizedProgressBars({ reviews }) {
  let denom = 0;
  if (reviews) {
    denom = reviews.length;
  }

  var dict = getRatingDistribution({ reviews });
  return (
    <Grid container direction='column' spacing={1} xs={6}>
      <Grid item>
        <NumberLinearProgress stars={5} value={Math.round((100 * dict['fiveStar']) / denom)} />
      </Grid>
      <Grid item>
        <NumberLinearProgress stars={4} value={Math.round((100 * dict['fourStar']) / denom)} />
      </Grid>
      <Grid item>
        <NumberLinearProgress stars={3} value={Math.round((100 * dict['threeStar']) / denom)} />
      </Grid>
      <Grid item>
        <NumberLinearProgress stars={2} value={Math.round((100 * dict['twoStar']) / denom)} />
      </Grid>
      <Grid item>
        <NumberLinearProgress stars={1} value={Math.round((100 * dict['oneStar']) / denom)} />
      </Grid>
    </Grid>
  );
}
