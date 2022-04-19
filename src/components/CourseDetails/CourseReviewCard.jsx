import { Divider, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import CourseComments from './CourseComments';
import SubCard from '../Skeleton/SubCard';
import { gridSpacing } from '../../constants/constants';
import CourseReviewRecommendation from '../CourseDetails/CourseReviewRecommendation';
import Stack from '@mui/material/Stack';
import { Box } from '@material-ui/core';
import CourseReviewSentence from 'components/CourseDetails/CourseReviewSentence';
import CourseReviewVoting from './CourseReviewVoting';
import CoureReviewTooltip from 'components/CourseDetails/CoureReviewTooltip';
const titleAdd = 'Additional feedbacks?';

export default function CourseReviewCard({ review }) {
  let date = new Date(review.createdAt);
  let createDateLocal = date.toLocaleDateString();
  let userName = review.username;
  return (
    <SubCard spacing={gridSpacing}>
      <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
        <Typography variant='subtitle1' gutterBottom component='div' sx={{ opacity: 0.75 }}>
          {userName} - {createDateLocal}
        </Typography>
        <Grid item>
          <Stack direction='row' spacing={1} sx={{ padding: '12px 12px' }}>
            <Rating
              name='read-only'
              precision={0.1}
              value={review.rating}
              readOnly
              size='large'
            />
          </Stack>
        </Grid>

        <Divider />

        <Grid item>
          <CourseReviewSentence review={review} />
        </Grid>
        <Grid item>
          <CourseComments title={titleAdd} comment={review.comment} />
        </Grid>

        <Divider />
        <Stack direction='row' spacing={1} sx={{ padding: '12px 12px' }}>
          <CourseReviewRecommendation isRecommended={review.recommended} />
          {/* {review.comment.length === 0 ? (
            <></>
          ) : (
            // <CoureReviewTooltip message={review.comment} />
            
          )} */}
          <CourseReviewVoting review={review} />
        </Stack>
      </Box>
    </SubCard>
  );
}
