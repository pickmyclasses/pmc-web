import React, { useState, useEffect, createContext, useContext } from 'react';
import { Box, Grid, Container, Typography, CardContent, Card } from '@mui/material';
import Scrollbars from 'react-custom-scrollbars-2';
import { CourseContext } from '../../pages/CoursePage';
import { CourseReviewCard } from '../CourseReviews/CourseReviewCard';
import { CourseReviewOverviewCard } from 'components/CourseReviews/CourseReviewOverviewCard';
import { ProposalCard, ComposerCard } from 'components/CourseReviews/CourseReviewComposerCard';
import { fetchUserReviewInfo } from 'api';
import { UserContext } from 'App';
import Lottie from 'react-lottie-player';
import emptyResult from '../../assets/cat-in-box.json';

export default function CourseReviews() {
  const { reviews, course, difficulty, professors, reviewTags } = useContext(CourseContext);
  const { user } = useContext(UserContext);
  const [sortedReviews, setSortedReviews] = useState(reviews);
  const [filterMethod, setFilterMethod] = useState('most-recent');
  const [userReviewInfo, setUserReviewInfo] = useState(null);
  const [openComposer, setOpenComposer] = useState(false);

  useEffect(() => {
    fetchUserReviewInfo(user.userID, course.id).then((data) => {
      setUserReviewInfo(data);
    });
    setOpenComposer(false);
    const comparatorByFilterMethod = {
      'most-recent': (x, y) =>
        new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime(),
      'highest-rated': (x, y) => y.rating - x.rating,
      'lowest-rated': (x, y) => x.rating - y.rating,
    };
    setSortedReviews(reviews.concat().sort(comparatorByFilterMethod[filterMethod]));
  }, [filterMethod, reviews]);

  const ReviewContainer = () => {
    return (
      <Container maxWidth='xl' sx={{ fontFamily: 'Roboto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProposalCard
              hasTaken={userReviewInfo?.hasTaken}
              currentlyTaking={userReviewInfo?.currentlyTaking}
              hasWrittenReviews={userReviewInfo?.hasReviewed}
              setOpenComposer={setOpenComposer}
            />
          </Grid>
          <Grid item xs={4}>
            <CourseReviewOverviewCard
              reviews={sortedReviews}
              overallRating={course.overallRating}
              difficulty={difficulty}
              professors={professors}
              reviewTags={reviewTags}
            />
          </Grid>
          <Grid item xs={8} sx={{ height: '100vh', overflow: 'auto' }}>
            <Scrollbars autoHide>
              {sortedReviews.length !== 0 ? (
                sortedReviews.map((review, i) => (
                  <Box key={i}>
                    <CourseReviewCard review={review} />
                  </Box>
                ))
              ) : (
                <EmptyContainer />
              )}
            </Scrollbars>
          </Grid>
        </Grid>
      </Container>
    );
  };

  return openComposer ? (
    <ComposerCard
      extraInfoNeeded={!userReviewInfo?.hasReviewed}
      setOpenComposer={setOpenComposer}
      hasWrittenReview={userReviewInfo?.hasReviewed}
      reviewContent={userReviewInfo.reviewContent}
    />
  ) : (
    <ReviewContainer />
  );
}

const EmptyContainer = () => {
  return (
    <Card sx={{ width: '100%', height: '49em', marginTop: '1em', textAlign: 'center' }}>
      <CardContent>
        <Typography variant='h6' paddingTop={'10%'}>
          Welcome, no one has written a review for this course yet, but you can be the first
          one! 🥳
        </Typography>
        <Lottie
          loop
          animationData={emptyResult}
          play
          style={{
            width: '50%',
            height: '50%',
            marginLeft: '15em',
            marginTop: '5em',
          }}
        />
      </CardContent>
    </Card>
  );
};

/**
 * @type {React.Context<{
 *   filterMethod: String,
 *   setFilterMethod: function(String): void,
 * }>}
 */
export const FilterContext = createContext();
