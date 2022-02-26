import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import CourseComments from './CourseComments';
import SubCard from '../Skeleton/SubCard';
import { gridSpacing } from '../../constants/constants';
import CourseReviewRecommendation from '../CourseDetails/CourseReviewRecommendation';
import Stack from '@mui/material/Stack';
import { Box } from '@material-ui/core';

const titlePos = 'What do you like most?';
const titleNeg = 'What do you hate most?';
const titleAdd = 'Additional feedbacks?';

export default function CourseReviewCard({ review }) {
  let createDate = review.created_at.slice(0, 10);
  let userName = review.anonymous ? 'anonymous ' : review.user_name;

  return (
    <SubCard spacing={gridSpacing}>
      <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
        <Typography variant='subtitle1' gutterBottom component='div'>
          {userName}
        </Typography>
        <Grid item>
          <Stack direction='row' spacing={1}>
            <Rating
              name='read-only'
              precision={0.1}
              value={review.rating}
              readOnly
              size='large'
            />
            <Typography variant='subtitle1' gutterBottom component='div' sx={{ opacity: 0.75 }}>
              {createDate}
            </Typography>
          </Stack>
        </Grid>
        <Grid item>
          <CourseComments title={titlePos} comment={review.pros} isPositive={true} />
        </Grid>
        <Grid item>
          <CourseComments title={titleNeg} comment={review.cons} isPositive={false} />
        </Grid>
        <Grid item>
          <CourseComments title={titleAdd} comment={review.comment} />
        </Grid>
        <Grid item>
          <CourseReviewRecommendation isRecommended={review.recommended} />
        </Grid>
      </Box>
    </SubCard>
  );
}
