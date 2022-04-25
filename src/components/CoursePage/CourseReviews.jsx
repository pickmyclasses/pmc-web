import React, { useState, useEffect, createContext, useContext } from 'react';
import { Box, Grid, Container } from '@mui/material';
import Scrollbars from 'react-custom-scrollbars-2';
import { CourseContext } from '../../pages/CoursePage';
import { CourseReviewCard } from '../CourseReviews/CourseReviewCard';
import { CourseReviewOverviewCard } from 'components/CourseReviews/CourseReviewOverviewCard';
import { CourseReviewComposerCard } from 'components/CourseReviews/CourseReviewComposerCard';

export default function CourseReviews() {
  const { reviews } = useContext(CourseContext);
  const [sortedReviews, setSortedReviews] = useState(reviews);
  const [filterMethod, setFilterMethod] = useState('most-recent');

  useEffect(() => {
    const comparatorByFilterMethod = {
      'most-recent': (x, y) =>
        new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime(),
      'highest-rated': (x, y) => y.rating - x.rating,
      'lowest-rated': (x, y) => x.rating - y.rating,
    };
    setSortedReviews(reviews.concat().sort(comparatorByFilterMethod[filterMethod]));
  }, [filterMethod, reviews]);

  return (
    <Container maxWidth='xl' sx={{ flex: 1, minHeight: 0, fontFamily: 'Roboto' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CourseReviewComposerCard />
        </Grid>
        <Grid item xs={4}>
          <CourseReviewOverviewCard reviews={sortedReviews} />
        </Grid>
        <Grid item xs={8} sx={{ height: '100vh', overflow: 'auto' }}>
          <Scrollbars autoHide>
            {sortedReviews &&
              sortedReviews.map((review, i) => (
                <Box key={i}>
                  <CourseReviewCard review={review} />
                </Box>
              ))}
          </Scrollbars>
        </Grid>
      </Grid>
    </Container>
  );
}

/**
 * @type {React.Context<{
 *   filterMethod: String,
 *   setFilterMethod: function(String): void,
 * }>}
 */
export const FilterContext = createContext();
