import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import { Avatar } from 'react-lorem-ipsum';
import Rating from '@mui/material/Rating';
import CourseComments from './CourseComments';
import SubCard from '../Skeleton/SubCard';
import { gridSpacing } from '../../constants/constants';
import EditIcon from '@mui/icons-material/Edit';
import CourseReviewRecommendation from '../CourseDetails/CourseReviewRecommendation';

const titlePos = 'What do you like most about this course?';
const titleNeg = 'What do you hate most about this course?';
const titleAdd = 'What additional feedbacks you have for this course?';

export default function CourseReviewCard({ review }) {
  let createDate = review.created_at.slice(0, 10);
  return (
    <SubCard spacing={gridSpacing}>
      <Grid container>
        <MuiTypography variant='' gutterBottom>
          <div className='user'>
            <Avatar className='avatar' width='100' height='100' alt='Avatar' />
            <div className='username'>{review.anonymous ? 'anonymous ' : review.user_name}</div>
            <div className='username'>
              <EditIcon />
              {`${createDate}`}
            </div>
          </div>
          <Grid item>
            <Rating
              name='read-only'
              precision={0.1}
              value={review.rating}
              readOnly
              size='large'
            />
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
        </MuiTypography>
      </Grid>
    </SubCard>
  );
}
