import React from 'react';
import { Card, CardContent, Chip, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CourseOverallRatingsBar from '../CourseDetails/CourseOverallRatingsBar';
import { Stack } from 'react-bootstrap';

export const CourseReviewOverviewCard = ({
  reviews,
  overallRating,
  difficulty,
  professors,
  reviewTags,
}) => {
  return (
    <Box>
      <Card sx={{ marginTop: '1em', overflow: 'visible' }}>
        <Typography
          variant='subtitle1'
          gutterBottom
          component='div'
          sx={{ paddingTop: '3%', paddingLeft: '3%' }}
        >
          PROFESSORS
        </Typography>
        <hr />
        <CardContent>
          <Box sx={{ display: 'inline' }}>
            {professors.map((professor, i) => (
              <Typography key={i} variant='subtitle1' pb={'1em'}>
                {professor.professorName}{' '}
                <i>
                  - (
                  {reviews.filter((r) => r.classProfessor === professor.professorName).length}{' '}
                  reviews)
                </i>
              </Typography>
            ))}
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ marginTop: '1em', overflow: 'visible' }}>
        <Typography
          variant='subtitle1'
          gutterBottom
          component='div'
          sx={{ paddingTop: '3%', paddingLeft: '3%' }}
        >
          RATING DISTRIBUTION
        </Typography>
        <hr />
        <CardContent>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='body1' color={'#626569'}>
              <i>Based on {reviews.length} reviews</i>
            </Typography>
            <Box
              sx={{
                bgcolor: overallRating > 3 ? '#1e847f' : '#b20238',
                marginTop: '4%',
                marginBottom: '1em',
                color: 'white',
                fontSize: '12px',
                width: '30%',
                height: '5em',
                paddingTop: '1em',
                borderRadius: '5px',
                display: 'inline-block',
              }}
            >
              Average Rating
              <Typography variant='h4' component='div' gutterBottom>
                {overallRating}
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: difficulty < 3.5 ? '#1e847f' : '#b20238',
                marginTop: '4%',
                marginLeft: '6%',
                marginBottom: '1em',
                color: 'white',
                fontSize: '12px',
                width: '30%',
                height: '5em',
                paddingTop: '1em',
                borderRadius: '5px',
                display: 'inline-block',
              }}
            >
              Difficulty
              <Typography variant='h4' component='div' gutterBottom>
                {difficulty}
              </Typography>
            </Box>
            <CourseOverallRatingsBar reviews={reviews} />
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ marginTop: '1em', overflow: 'visible' }}>
        <Typography
          variant='subtitle1'
          gutterBottom
          component='div'
          sx={{ paddingTop: '3%', paddingLeft: '3%' }}
        >
          TOP TAGS
        </Typography>
        <hr />
        <CardContent>
          <Box>
            <Stack direction='column'>
              {reviewTags
                .sort((a, b) => {
                  if (a.voteCount > b.voteCount) return -1;
                  if (a.voteCount < b.voteCount) return 1;
                  return 0;
                })
                .map((tag, i) =>
                  tag.type === 1 ? (
                    <Chip
                      key={i}
                      label={tag?.name}
                      variant='outlined'
                      color='success'
                      sx={{ margin: '0.5em' }}
                    />
                  ) : (
                    <Chip
                      key={i}
                      label={tag?.name}
                      variant='outlined'
                      color='error'
                      sx={{ margin: '0.5em' }}
                    />
                  )
                )}
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
