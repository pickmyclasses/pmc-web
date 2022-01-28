import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import React from 'react';

import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import SubCard from '../Skeleton/SubCard';
import StarIcon from '@mui/icons-material/Star';
import { gridSpacing } from '../../constants/constants';

const labels = {
  1: 'Useless',
  2: 'Useless+',
  3: 'Poor',
  4: 'Poor+',
  5: 'Ok',
  6: 'Ok+',
  7: 'Good',
  8: 'Good+',
  9: 'Excellent',
  10: 'Excellent+',
};

export default function ReviewRatings({ course }) {
  const [value, setValue] = React.useState(2);
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
            How likely is it that you would recommend{' '}
            {course.department + ' ' + course.number + ' ' + course.name} to a friend or
            colleague?
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
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            defaultValue={5}
            max={10}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
          />{' '}
          {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
        </Grid>
      </Grid>
    </SubCard>
  );
}
