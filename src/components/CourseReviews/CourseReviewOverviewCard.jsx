import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CourseOverallRatingsBar from '../CourseDetails/CourseOverallRatingsBar';

export const CourseReviewOverviewCard = ({ reviews }) => {
  return (
    <Box>
      <Card sx={{ marginTop: '1em', overflow: 'visible' }}>
        <Typography
          variant='subtitle1'
          gutterBottom
          component='div'
          sx={{ paddingTop: '3%', paddingLeft: '3%' }}
        >
          ABOUT
        </Typography>
        <hr />
        <CardContent>
          <Box sx={{ display: 'inline' }}>
            Three lectures and two discussions weekly. The fundamentals of chemistry are
            covered, emphasizing descriptive, modern and applied chemistry for science and
            engineering majors. Problem-solving strategies within an applications-oriented
            framework employ mathematics and conceptual reasoning. Topics include atomic theory,
            bonding, nomenclature, periodicity, stoichiometry, gas laws, thermochemistry,
            intermolecular forces (esp. liquids and solids), as well as an introduction to the
            chemistry of aqueous solutions.
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
          RATINGS
        </Typography>
        <hr />
        <CardContent>
          <Box sx={{ display: 'inline' }}>
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
            <CourseOverallRatingsBar reviews={reviews} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
