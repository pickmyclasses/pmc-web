import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import React from 'react';

import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import SubCard from '../Skeleton/SubCard';
import StarIcon from '@mui/icons-material/Star';
import { gridSpacing } from '../../constants/constants';
import { formatCourseName } from '../../utils';

const labels = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};

export default function ReviewRatings({ course, value, onChange }) {
  const [hover, setHover] = React.useState(-1);
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
            How likely would you recommend {formatCourseName(course['catalogCourseName'])} (
            {course['title']}) to a friend or colleague?
          </MuiTypography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          container
          direction='column'
          alignItems='center'
          justifyContent='center'
        >
          <Rating
            name='hover-feedback'
            value={value}
            precision={1}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            defaultValue={5}
            max={5}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
          />{' '}
          {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
        </Grid>
      </Grid>
    </SubCard>
  );
}
