import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { CourseContext } from '../../pages/CoursePage';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

// TODO: Learn to make jsdoc comments
function checkUserWroteReview(user, reviews) {
  if (user == null) {
    return false;
  }
  let userID = user.userID;
  for (let i = 0; i < reviews.length; i++) {
    if (reviews[i].userID == userID) {
      return true;
    }
  }
  return false;
}

function userReviewNotification(userWroteReview, user) {
  if (userWroteReview) {
    return 'You already wrote review for this course!';
  } else {
    if (user == null) {
      return 'Login or register to write a review';
    } else {
      return 'Share your thoughts with other students';
    }
  }
}

export default function CourseAddReview() {
  const { course } = useContext(CourseContext);
  const { user } = useContext(UserContext);
  const { reviews } = useContext(CourseContext);
  let userWroteReview = checkUserWroteReview(user, reviews);
  return (
    <Grid item>
      <MuiTypography variant='h5' gutterBottom>
        Review this course
      </MuiTypography>
      <MuiTypography variant='subtitle1' gutterBottom>
        {userReviewNotification(userWroteReview, user)}
      </MuiTypography>
      <Stack spacing={2} direction='row'>
        <Button
          variant='contained'
          disabled={user == null || userWroteReview}
          startIcon={<AddCommentIcon />}
          component={Link}
          to={`/course/${course.id}/reviews/compose`}
        >
          Write a Review
        </Button>
      </Stack>
    </Grid>
  );
}
