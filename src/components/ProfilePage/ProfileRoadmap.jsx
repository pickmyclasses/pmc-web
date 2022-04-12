import { School } from '@mui/icons-material';
import { Stack } from '@mui/material';
import React from 'react';
import ProfilePageTabHeadingCard from './ProfilePageTabHeadingCard';
import RoadmapSummary from './ProfileRoadmap/RoadmapSummary';

/** The roadmap tab of the user profile page. */
export default function ProfileRoadmap() {
  return (
    <Stack spacing='24px' paddingBottom='32px'>
      <ProfilePageTabHeadingCard
        iconType={School}
        title='Your Graduation Roadmap'
        description='View your graduation requirements and plan your future courses'
      />
      <RoadmapSummary />
      <Stack>{'haha '.repeat(333)}</Stack>
    </Stack>
  );
}
