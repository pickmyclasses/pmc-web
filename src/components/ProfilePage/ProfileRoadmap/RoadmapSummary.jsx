import { Apps, List, PieChart, ViewList, Widgets } from '@mui/icons-material';
import { Card, Skeleton, Stack } from '@mui/material';
import LabelWithIcon from 'components/CoursePage/LabelWithIcon';
import React from 'react';

export default function RoadmapSummary() {
  return (
    <Card sx={{ height: 'min(720px, 100vh - 72px - 64px)' }}>
      <Stack padding='24px' spacing='12px' height='calc(100% - 48px)'>
        <LabelWithIcon color='action' iconType={List} label='Requirements' variant='overline' />
        <Stack flex={1}>
          <Skeleton variant='rectangular' height='100%' />
        </Stack>
      </Stack>
    </Card>
  );
}
