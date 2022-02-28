import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleOutline, MenuBook, People, School, WatchLater } from '@mui/icons-material';
import {
  Alert,
  Box,
  Card,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
  Rating,
  Stack,
} from '@mui/material';
import TagList from '../CourseCardGrid/CourseCard/TagList';
import { formatCreditRange } from './CoursePageTop';
import CourseCardGrid from '../CourseCardGrid/CourseCardGrid';
import { CourseContext } from '../../pages/CoursePage';
import LabeledRatingDisplay from '../CourseCardGrid/CourseCard/LabeledRatingDisplay';
import { pluralize } from '../../utils';
import CourseEligibilityBanner from './CourseEligibilityBanner';
import LabelWithIcon from './LabelWithIcon';
import ClickableIndicator from '../CourseCardGrid/CourseCard/ClickableIndicator';

export default function CourseOverview() {
  const navigate = useNavigate();
  const { course, reviews } = useContext(CourseContext);

  const coursePageURL = '/course/' + course.id;

  const renderInfoSummary = () => (
    <Card sx={{ width: '100%', height: '100%' }}>
      <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
        <Typography variant='subtitle2'>Top Tags</Typography>
        <TagList tags={fakeTags} />
        <Typography variant='subtitle2'>Full Description</Typography>
        <Typography variant='body1'>{course.description}</Typography>
        <Typography variant='subtitle2'>Reward</Typography>
        <Stack direction='row' spacing='24px'>
          <LabelWithIcon color='primary' iconType={School} label='CS major requirement' />
          <LabelWithIcon color='info' iconType={WatchLater} label={formatCreditRange(course)} />
        </Stack>
      </Box>
    </Card>
  );

  const renderReviewSummary = () => (
    <Card
      onClick={() => navigate(`${coursePageURL}/reviews`)}
      sx={{ width: '100%', height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
    >
      <Box sx={{ padding: '24px', '> *': { marginY: '12px' } }}>
        <Box width='fit-content' marginX='auto' marginBottom='8px'>
          <LabeledRatingDisplay hideLabel value={course.overallRating} size='large' />
        </Box>
        <Typography variant='body2' align='center' fontStyle='italic' sx={{ opacity: 0.75 }}>
          {reviews.length ? `Based on ${pluralize(reviews.length, 'review')}` : 'No reviews'}
        </Typography>
        <Divider sx={{ marginTop: '12px' }} />
        <Typography variant='subtitle2'>Top Pros</Typography>
        <TagList
          tags={['Fun projects', 'Hands on', 'No exams']}
          variant='outlined'
          color='success'
        />
        <Typography variant='subtitle2'>Top Cons</Typography>
        <TagList
          tags={['Useless lectures', 'Assignment-heavy', 'Less practical']}
          variant='outlined'
          color='error'
        />
        <Link>
          <ClickableIndicator>
            <Typography variant='subtitle2'>See all reviews</Typography>
          </ClickableIndicator>
        </Link>
      </Box>
    </Card>
  );

  const renderRegistrationSummary = () => (
    <Card
      onClick={() => navigate(`${coursePageURL}/registration`)}
      sx={{ width: '100%', height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 6 } }}
    >
      <CourseEligibilityBanner course={course} />
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
        <Link>
          <ClickableIndicator>
            <Typography variant='subtitle2'>Go to register</Typography>
          </ClickableIndicator>
        </Link>
      </Box>
    </Card>
  );

  return (
    <Box>
      <Grid container spacing='32px' marginBottom='16px'>
        <Grid item xs={6}>
          {renderInfoSummary()}
        </Grid>
        <Grid item xs={3}>
          {renderReviewSummary()}
        </Grid>
        <Grid item xs={3}>
          {renderRegistrationSummary()}
        </Grid>
      </Grid>
      <Typography variant='overline' fontSize='medium' sx={{ opacity: 0.75 }}>
        You may also like
      </Typography>
      <Box width='100%'>
        <CourseCardGrid numColumns={5} courses={new Array(5).fill(course)} />
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
