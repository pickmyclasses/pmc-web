import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddCommentIcon from '@mui/icons-material/AddComment';
import { CourseContext } from '../../pages/CoursePage';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

export default function CourseAddReview() {
  const course = useContext(CourseContext);
  const { user } = useContext(UserContext);
  return (
    <Grid item>
      <MuiTypography variant='h5' gutterBottom>
        Review this course
      </MuiTypography>
      <MuiTypography variant='subtitle1' gutterBottom>
        Share your thoughts with other students
      </MuiTypography>
      <Stack spacing={2} direction='row'>
        <Link
          to={user == null ? '#' : `/course/${course.ID}/review`}
          style={{ textDecoration: 'none' }}
        >
          <Button variant='contained' disabled={user == null} startIcon={<AddCommentIcon />}>
            Write a Review
          </Button>
        </Link>
      </Stack>
    </Grid>
  );
}
