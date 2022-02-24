import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Container, Grid } from '@mui/material';
import { fetchCourseByID } from '../api';
import ReviewDescription from '../components/ReviewInputDetails/ReviewDescription';
import ReviewRatings from '../components/ReviewInputDetails/ReviewRatings';
import ReviewPros from '../components/ReviewInputDetails/ReviewPros';
import ReviewCons from '../components/ReviewInputDetails/ReviewCons';
import ReviewComments from '../components/ReviewInputDetails/ReviewComments';
import MainCard from '../components/Skeleton/MainCard';
import { gridSpacing } from '../constants/constants';
import { useMount } from '../utils';
import { postReviewByID } from '../../src/api/index';
import swal from 'sweetalert';
import { UserContext } from '../App';
import ReviewAnonymous from '../components/ReviewInputDetails/ReviewAnonymous';
import ReviewRecommend from '../components/ReviewInputDetails/ReviewRecommend';

export default function ReviewPage({ shouldShowScheduler }) {
  const [course, setCourse] = useState(null);
  const [ratingValue, setRatingValue] = useState(3);
  const [proValue, setProValue] = useState('');
  const [conValue, setConValue] = useState('');
  const [commentValue, setCommentValue] = useState('');
  const [anonymity, setAnonymity] = useState(false);
  const [recommendation, setRecommendation] = useState(false);

  const urlParams = useParams();
  const { user } = useContext(UserContext);

  useMount(() => {
    fetchCourseByID(urlParams['id']).then((data) => setCourse(data['data']['data']['course']));
  });

  if (!course) {
    return (
      <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
        <CircularProgress sx={{ margin: 'auto' }} />
      </Box>
    );
  }
  return (
    <Container maxWidth='xl' sx={{ flex: 1, minHeight: 0 }}>
      <MainCard>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} sm={12}>
            <ReviewDescription course={course} />
          </Grid>

          <Grid item xs={12} sm={12}>
            <ReviewRatings
              course={course}
              value={ratingValue}
              onChange={(ratingValue) => {
                setRatingValue(ratingValue);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <ReviewPros
              value={proValue}
              onChange={(proValue) => {
                setProValue(proValue);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <ReviewCons
              value={conValue}
              onChange={(conValue) => {
                setConValue(conValue);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <ReviewComments
              value={commentValue}
              onChange={(commentValue) => {
                setCommentValue(commentValue);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <ReviewAnonymous
              userName={user.name}
              value={anonymity}
              onChange={(anonymity) => {
                setAnonymity(anonymity);
              }}
            />
            <ReviewRecommend
              value={recommendation}
              onChange={(recommendation) => {
                setRecommendation(recommendation);
              }}
            />
          </Grid>

          <Grid
            item
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
          >
            <Button
              variant='contained'
              onClick={() => {
                if (proValue.length === 0) {
                  swal('Oops!', 'Please fill in what do you like about this course.', 'error');
                  return;
                }
                if (conValue.length === 0) {
                  swal(
                    'Oops!',
                    "Please fill in what you don't like about this course.",
                    'error'
                  );

                  return;
                }
                swal('Good job!', 'You submitted the review!', 'success');

                postReviewByID({
                  anonymous: anonymity,
                  comment: commentValue,
                  cons: conValue,
                  course_id: course.ID,
                  pros: proValue,
                  rating: ratingValue,
                  recommended: recommendation,
                  user_id: user.userID,
                });
              }}
            >
              Submit
            </Button>{' '}
          </Grid>
        </Grid>
      </MainCard>
    </Container>
  );
}
