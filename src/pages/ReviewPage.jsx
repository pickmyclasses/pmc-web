import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, CircularProgress, Container, Grid } from '@mui/material';
// Project Imports
import { fetchCourseByID } from '../api';
import ReviewDescription from '../components/ReviewInputDetails/ReviewDescription';
import ReviewRatings from '../components/ReviewInputDetails/ReviewRatings';
import ReviewPros from '../components/ReviewInputDetails/ReviewPros';
import ReviewCons from '../components/ReviewInputDetails/ReviewCons';
import ReviewComments from '../components/ReviewInputDetails/ReviewComments';
import MainCard from '../components/Skeleton/MainCard';
import { gridSpacing } from '../constants/constants';
import { useMount } from '../utils';

export default function ReviewPage({ shouldShowScheduler }) {
  const [course, setCourse] = useState(null);
  const [ratingValue, setRatingValue] = useState(3);
  const [proValue, setProValue] = useState('');
  const [conValue, setConValue] = useState('');
  const [commentValue, setCommentValue] = useState('');

  const urlParams = useParams();

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
            {proValue}
          </Grid>
          <Grid
            item
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
          >
            <Button variant='contained'>Submit</Button>{' '}
          </Grid>
        </Grid>
      </MainCard>
    </Container>
  );
}
