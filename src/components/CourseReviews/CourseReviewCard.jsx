import * as React from 'react';
import Box from '@mui/material/Box';
import { Stack, Typography, Grid } from '@mui/material';

export const CourseReviewCard = ({ review }) => {
  return (
    <>
      <Stack direction='row' spacing={2}>
        <CourseReviewContent
          rating={review.rating}
          username={review.username}
          anonymous={review.anonymous}
          professor={review.classProfessor}
          date={review.createdAt}
          semester={`${review.classSemester.season} ${review.classSemester.year}`}
          comment={review.comment}
        />
        <CourseReviewContent rating={review.rating} />
      </Stack>
    </>
  );
};

const CourseReviewContent = ({
  rating,
  username,
  anonymous,
  semester,
  professor,
  date,
  comment,
}) => {
  return (
    <Box sx={{ width: '100%', height: '26em', bgcolor: '#e5e5dc', flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <CourseReviewNumberCard number={rating} color={'#26495c'} text={'Rating'} />
          <CourseReviewNumberCard number={4} color={'#c66b3d'} text={'Difficulty'} />
          <CourseReviewNumberCard number={5} color={'#ff9a8d'} text={'Recommended'} />
        </Grid>
        <Grid item xs={9}>
          <UserInfo
            username={username}
            anonymous={anonymous}
            professor={professor}
            semester={semester}
            date={date}
          />
          <Comment comment={comment} />
        </Grid>
      </Grid>
    </Box>
  );
};

const CourseReviewNumberCard = ({ number, color, text }) => {
  return (
    <>
      <Box
        sx={{
          width: '80%',
          height: '20%',
          textAlign: 'center',
          marginTop: '20%',
          marginLeft: '10%',
        }}
      >
        <Box sx={{ marginBottom: '3%', fontWeight: 'bold' }}>{text}</Box>
        <Box
          sx={{
            fontSize: '3em',
            bgcolor: color,
            color: 'white',
            verticalAlign: 'middle',
          }}
        >
          {number}
          <Typography variant={'body2'} component={'span'}>
            &nbsp; / 5.0
          </Typography>
        </Box>
      </Box>
    </>
  );
};

const UserInfo = ({ anonymous, username, date, professor, semester }) => {
  return (
    <Box width={'80%'} height={'40%'}>
      <Box> {anonymous ? 'Anonymous Student' : username} </Box>
      <Box> {semester} </Box>
      <Box> {professor} </Box>
      <Box> {date} </Box>
    </Box>
  );
};

const Comment = ({ comment }) => {
  return <Box> {comment} </Box>;
};
