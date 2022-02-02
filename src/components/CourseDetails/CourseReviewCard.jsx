import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import { LoremIpsum, Avatar, fullname, username } from 'react-lorem-ipsum';
import Rating from '@mui/material/Rating';
import CourseComments from './CourseComments';
import React from 'react';
import SubCard from '../Skeleton/SubCard';
import { gridSpacing } from '../../constants/constants';

const titlePos = 'What do you like most about this course?';
const titleNeg = 'What do you hate most about this course?';
const titleAdd = 'What additional feedbacks you have for this course?';

export default function CourseReviewCard({ review }) {
  return (
    <SubCard
      title={LoremIpsum({ p: 1, avgWordsPerSentence: 5, avgSentencesPerParagraph: 1 })}
      spacing={gridSpacing}
    >
      <Grid container>
        <MuiTypography variant='' gutterBottom>
          <div className='user'>
            <Avatar gender='all' width='150' height='150' alt='Avatar'></Avatar>
            <div className='fullname'>{fullname('male')}</div>
            <div className='username'>{`@${username()}`}</div>
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
            <CourseComments title={titlePos} comments={review.Pros} />
          </Grid>
          <Grid item>
            <CourseComments title={titleNeg} comments={review.Cons} />
          </Grid>
          <Grid item>
            <CourseComments title={titleAdd} comments={review.comment} />
          </Grid>
        </MuiTypography>
      </Grid>
    </SubCard>
  );
}
