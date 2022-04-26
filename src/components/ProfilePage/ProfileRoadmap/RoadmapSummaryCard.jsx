import { PieChart } from '@mui/icons-material';
import { Card, Divider, Grid, Link, Stack, Typography } from '@mui/material';
import LabelWithIcon from 'components/CoursePage/LabelWithIcon';
import PreventableLink from 'components/PreventableNavigation/PreventableLink';
import { SchedulerContext } from 'components/Scheduler/ContainerWithScheduler';
import React, { memo, useContext, useEffect, useState } from 'react';
import HistoryBreakdownChart from '../ProfileHistory/HistoryBreakdownChart';
import RoadmapSummaryChart from './RoadmapSummaryChart';

export default function RoadmapSummaryCard({ ...chartProps }) {
  const { requirements, historyCourses } = useContext(SchedulerContext);

  const [numCoursesToGo, setNumCoursesToGo] = useState();
  const [numCreditsToGo, setNumCreditsToGo] = useState();
  const [percentageTowardGraduation, setPercentageTowardGraduation] = useState();

  useEffect(() => {
    let numCoursesToGo = 0;
    for (let requirement of requirements)
      numCoursesToGo += Math.max(
        requirement.courseNeeded -
          requirement.inProgressCourses.length -
          requirement.completedCourses.length,
        0
      );
    setNumCoursesToGo(numCoursesToGo);

    let totalCredits = 122; // TODO Q: Remove this hard code once backend has its data.
    let numCreditsCompleted = historyCourses.reduce((acc, course) => acc + course.maxCredit, 0);
    setNumCreditsToGo(totalCredits - numCreditsCompleted);
    setPercentageTowardGraduation(
      ((numCreditsCompleted / totalCredits) * 100).toFixed(0) + '%'
    );
  }, [requirements, historyCourses]);

  return (
    <Card sx={{ height: 'calc(100%)', overflow: 'visible' }}>
      <Stack padding='24px' spacing='16px' height='calc(100% - 48px)'>
        <LabelWithIcon color='action' iconType={PieChart} label='Summary' variant='overline' />
        <HistoryBreakdownChart
          historyBreakdown={requirements}
          style={{ height: 32 * requirements.length + 'px' }}
        />
        <Typography variant='subtitle2' align='center' sx={{ paddingTop: '20px' }}>
          Requirement Breakdown
        </Typography>
        <Stack flex={1}>
          <RoadmapSummaryChart {...chartProps} />
        </Stack>
        <Link
          component={PreventableLink}
          to='/profile/history'
          underline='hover'
          color='text.secondary'
          variant='caption'
          align='center'
        >
          Edit what courses you've taken
        </Link>
        <Divider />
        <Grid container direction='row'>
          <Grid item xs={4}>
            <ValueWithLabel value={numCoursesToGo} label='courses to go' />
          </Grid>
          <Divider orientation='vertical' sx={{ marginX: '-1px' }} />
          <Grid item xs={4}>
            <ValueWithLabel value={numCreditsToGo} label='credits to go' />
          </Grid>
          <Divider orientation='vertical' sx={{ marginX: '-1px' }} />
          <Grid item xs={4}>
            <ValueWithLabel value={percentageTowardGraduation} label='toward graduation' />
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
}

const ValueWithLabel = ({ value, label }) => (
  <Stack paddingTop='12px' paddingX='8px' spacing='12px' alignItems='center' textAlign='center'>
    <Typography variant='h5'>{value}</Typography>
    <Typography variant='caption' minHeight='2.5em'>
      {label}
    </Typography>
  </Stack>
);
