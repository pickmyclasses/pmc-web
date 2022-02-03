import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import { Avatar, fullname, username } from 'react-lorem-ipsum';
import Rating from '@mui/material/Rating';
import CourseComments from './CourseComments';
import React from 'react';
import SubCard from '../Skeleton/SubCard';
import { gridSpacing } from '../../constants/constants';
import EditIcon from '@mui/icons-material/Edit';
import { Divider } from '@mui/material';

const titlePos = 'What do you like most about this course?';
const titleNeg = 'What do you hate most about this course?';
const titleAdd = 'What additional feedbacks you have for this course?';

export default function CourseReviewCard({ courseID, review }) {
  let createDate = review.CreatedAt.slice(0, 10);
  //CreatedAt
  return (
    <SubCard spacing={gridSpacing}>
      <Grid container>
        <MuiTypography variant='' gutterBottom>
          <div className='user'>
            <Avatar className='avatar' width='100' height='100' alt='Avatar' />
            <div className='fullname'>{fullname('male')}</div>
            <div className='username'>{`@${username()}`}</div>
            <div className='username'>
              <EditIcon />
              {`${createDate}`}
            </div>
          </div>
          <Grid item>
            <Rating
              name='read-only'
              precision={0.1}
              value={review.Rating}
              readOnly
              size='large'
            />
          </Grid>
          <Grid item>
            <CourseComments title={titlePos} comment={review.Pros} />
          </Grid>
          <Grid item>
            <CourseComments title={titleNeg} comment={review.Cons} />
          </Grid>
          <Grid item>
            <CourseComments title={titleAdd} comment={review.Comment} />
          </Grid>
        </MuiTypography>
      </Grid>
    </SubCard>
  );
}
