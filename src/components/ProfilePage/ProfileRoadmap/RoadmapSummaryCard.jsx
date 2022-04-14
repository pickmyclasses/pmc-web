import { Apps, List, PieChart, ViewList, Widgets } from '@mui/icons-material';
import { Card, Skeleton, Stack } from '@mui/material';
import LabelWithIcon from 'components/CoursePage/LabelWithIcon';
import React from 'react';
import RoadmapSummaryChart from './RoadmapSummaryChart';

export default function RoadmapSummaryCard({ ...chartProps }) {
  return (
    <Card sx={{ height: '100%', overflow: 'visible' }}>
      <Stack padding='24px' spacing='12px' height='calc(100% - 48px)'>
        <LabelWithIcon color='action' iconType={List} label='Requirements' variant='overline' />
        <Stack flex={1}>
          <RoadmapSummaryChart {...chartProps} />
        </Stack>
      </Stack>
    </Card>
  );
}
