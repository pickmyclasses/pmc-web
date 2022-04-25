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
      <Typography
        variant='body2'
        color='textSecondary'
        style={{ minWidth: '32px' }}
      >{`${props.value}%`}</Typography>
    </Box>
  );
}

/**
 * Compute the rating distribution based on reviews
 *
 * @param reviews - the reviews for the given course
 */
function getRatingDistribution(reviews) {
  let distribution = Array(5).fill(0);
  if (reviews) {
    for (let review of reviews) distribution[review.rating - 1]++;
  }
  return distribution;
}

export default function CustomizedProgressBars({ reviews }) {
  let numReviews = reviews?.length || 1;
  let ratingDistribution = getRatingDistribution(reviews);

  return (
    <Grid container direction='column' spacing={1} width='50%'>
      {ratingDistribution.reverse().map((count, i) => (
        <Grid key={5 - i} item>
          <NumberLinearProgress stars={5 - i} value={Math.round((100 * count) / numReviews)} />
        </Grid>
      ))}
    </Grid>
  );
}
