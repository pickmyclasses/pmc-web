import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleOutline, MenuBook, People, School, WatchLater } from '@mui/icons-material';
import { Alert, Box, Card, Chip, Divider, Grid, Link, Typography, Rating } from '@mui/material';
import TagList from '../CourseCardGrid/CourseCard/TagList';
import { formatCreditRange } from './CoursePageTop';
import CourseCardGrid from '../CourseCardGrid/CourseCardGrid';
import { fetchReviewsByCourseID } from '../../api/index';
import { calculateAverageScore } from '../../utils/index';

export default function CourseOverview({ course, classes }) {
  const navigate = useNavigate();
  const coursePageURL = '/course/' + course.ID;
  let courseID = course.ID;
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    fetchReviewsByCourseID(courseID).then((data) => setReviews(data['data']['data']));
  }, [courseID]);
  let avgScore = calculateAverageScore({ reviews });
  return (
    <Box>
      <Grid container spacing='32px' marginBottom='16px'>
        <Grid item xs={6}>
          <Card sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
              <Typography variant='subtitle2'>Top Tags</Typography>
              <TagList tags={fakeTags} />
              <Typography variant='subtitle2'>Full Description</Typography>
              <Typography variant='body1'>{course.Description}</Typography>
              <Typography variant='subtitle2'>Reward</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <School fontSize='small' color='primary' sx={{ marginRight: '8px' }} />
                <Typography variant='body1' color='darkslateblue'>
                  {course.DesignationCatalog}
                </Typography>
                <WatchLater
                  fontSize='small'
                  color='info'
                  sx={{ marginLeft: '32px', marginRight: '8px' }}
                />
                <Typography variant='body1' color='steelblue'>
                  {formatCreditRange(course)}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
        {/* TODO Q: everything below this point is placeholder. Fix this. */}
        <Grid item xs={3}>
          <Card
            onClick={() => navigate(`${coursePageURL}/reviews`)}
            sx={{ width: '100%', height: '100%', cursor: 'pointer' }}
          >
            <Box sx={{ padding: '24px', '> *': { marginY: '12px' } }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: 'fit-content',
                  marginX: 'auto',
                  marginBottom: '8px',
                }}
              >
                <Rating
                  name='read-only'
                  precision={0.1}
                  value={avgScore}
                  readOnly
                  size='large'
                />
                <Box
                  sx={{
                    marginLeft: '16px',
                    display: 'flex',
                    flexFlow: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant='h5'>{avgScore.toFixed(1)}</Typography>
                  <Typography variant='body2'>out of 5</Typography>
                </Box>
              </Box>
              <Typography variant='body2' align='center' sx={{ opacity: 0.75 }}>
                <i>Based on {reviews != null ? reviews.length : 0} reviews</i>
              </Typography>
              <Divider sx={{ marginTop: '12px' }} />
              <Typography variant='subtitle2'>Top Pros</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  '> *': { margin: '0 8px 8px 0' },
                  marginBottom: '-4px',
                }}
              >
                <Chip variant='outlined' color='success' label='No pros which saves space' />
              </Box>
              <Typography variant='subtitle2'>Top Cons</Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  '> *': { margin: '0 8px 8px 0' },
                  marginBottom: '-4px',
                }}
              >
                <Chip variant='outlined' color='error' label='Useless lectures' />
                <Chip variant='outlined' color='error' label='Exam-heavy' />
                <Chip variant='outlined' color='error' label='Less practical' />
              </Box>
              <Link>
                <Typography variant='body2' align='right'>
                  See all reviews
                </Typography>
              </Link>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card
            onClick={() => navigate(`${coursePageURL}/registration`)}
            sx={{ width: '100%', height: '100%', cursor: 'pointer' }}
          >
            <Alert
              icon={false}
              sx={{
                paddingY: '16px',
                paddingLeft: '20px',
                borderBottom: '1px lightgray solid',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CheckCircleOutline fontSize='large' color='success' />
                <Box sx={{ marginLeft: '16px' }}>
                  <Typography variant='body1' lineHeight={2}>
                    <b>Eligible</b>
                  </Typography>
                  <Typography variant='body2'>
                    You fulfill all prerequisites. You may register for this course!
                  </Typography>
                </Box>
              </Box>
            </Alert>
            <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px' } }}>
              <Typography variant='subtitle2'>Components</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <MenuBook fontSize='small' color='action' sx={{ marginRight: '8px' }} />
                <Typography variant='body1'>Lecture</Typography>
                <People
                  fontSize='small'
                  color='action'
                  sx={{ marginLeft: '32px', marginRight: '8px' }}
                />
                <Typography variant='body1'>Discussion</Typography>
              </Box>
              <Typography variant='subtitle2'>Offerings</Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='body1'>Peter A. Jensen</Typography>
                <Box sx={{ display: 'flex', width: '144px' }}>
                  <Typography
                    variant='caption'
                    align='center'
                    sx={{ boxShadow: '0 0 0 1px lightgray inset', width: '20%' }}
                  ></Typography>
                  <Typography
                    variant='caption'
                    align='center'
                    sx={{
                      boxShadow: '0 0 0 1px gray inset',
                      width: '20%',
                      backgroundColor: 'gainsboro',
                    }}
                  >
                    T
                  </Typography>
                  <Typography
                    variant='caption'
                    align='center'
                    sx={{ boxShadow: '0 0 0 1px lightgray inset', width: '20%' }}
                  ></Typography>
                  <Typography
                    variant='caption'
                    align='center'
                    sx={{
                      boxShadow: '0 0 0 1px gray inset',
                      width: '20%',
                      backgroundColor: 'gainsboro',
                    }}
                  >
                    H
                  </Typography>
                  <Typography
                    variant='caption'
                    align='center'
                    sx={{ boxShadow: '0 0 0 1px lightgray inset', width: '20%' }}
                  ></Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant='body1'>Lorem B. Ipsum</Typography>
                <Box sx={{ display: 'flex', width: '144px' }}>
                  <Typography
                    variant='caption'
                    align='center'
                    sx={{ boxShadow: '0 0 0 1px lightgray inset', width: '20%' }}
                  ></Typography>
                  <Typography
                    variant='caption'
                    align='center'
                    sx={{
                      boxShadow: '0 0 0 1px gray inset',
                      width: '20%',
                      backgroundColor: 'gainsboro',
                    }}
                  >
                    T
                  </Typography>
                  <Typography
                    variant='caption'
                    align='center'
                    sx={{ boxShadow: '0 0 0 1px lightgray inset', width: '20%' }}
                  ></Typography>
                  <Typography
                    variant='caption'
                    align='center'
                    sx={{
                      boxShadow: '0 0 0 1px gray inset',
                      width: '20%',
                      backgroundColor: 'gainsboro',
                    }}
                  >
                    H
                  </Typography>
                  <Typography
                    variant='caption'
                    align='center'
                    sx={{ boxShadow: '0 0 0 1px lightgray inset', width: '20%' }}
                  ></Typography>
                </Box>
              </Box>
              <Typography variant='body2'>+2 more offerings</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Typography variant='overline' fontSize='medium' sx={{ opacity: 0.75 }}>
        You may also like
      </Typography>
      <Box width='100%'>
        <CourseCardGrid numColumns={4} courses={new Array(4).fill({ course, classes })} />
      </Box>
    </Box>
  );
}

export const fakeTags = [
  'Consectetur',
  'Adipiscing',
  'Eiusmod',
  'Tempor',
  'Incididunt',
  'Labore',
  'Dolore',
  'Aliqua',
  'Veniam',
  'Nostrud',
  'Exercitation',
  'Ullamco',
];
