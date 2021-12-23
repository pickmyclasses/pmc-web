import React from 'react';
import { Grid, Typography } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import { LoremIpsum, Avatar, fullname, username } from 'react-lorem-ipsum';
import Rating from '@mui/material/Rating';

//Project Imports
import SubCard from '../Skeleton/SubCard';
const gridSpacing = 3;
var RandomNumber = Math.floor(Math.random() * 5) + 1;
export default function CourseDescriptionSubCard({ course }) {
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
              value={RandomNumber}
              readOnly
              size='large'
            />
            <Typography variant='subtitle1' color='#212121'>
              Year: {course.year}
            </Typography>
          </Grid>
          <Grid item>
            <LoremIpsum p={3} />
          </Grid>
        </MuiTypography>
      </Grid>
    </SubCard>
  );
}
