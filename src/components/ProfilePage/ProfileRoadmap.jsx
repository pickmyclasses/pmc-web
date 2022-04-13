import { School } from '@mui/icons-material';
import { Stack } from '@mui/material';
import React from 'react';
import ProfilePageTabHeadingCard from './ProfilePageTabHeadingCard';
import RoadmapSummaryCard from './ProfileRoadmap/RoadmapSummaryCard';

/** The roadmap tab of the user profile page. */
export default function ProfileRoadmap() {
  return (
    <Stack spacing='24px' paddingBottom='32px'>
      <ProfilePageTabHeadingCard
        iconType={School}
        title='Your Graduation Roadmap'
        description='View your graduation requirements and plan your future courses'
      />
      <Stack
        position='sticky'
        top='32px'
        width={`calc(${summaryCardWidth} - 12px)`}
        height={`calc(${summaryCardHeight} - 1px)`}
      >
        <RoadmapSummaryCard />
      </Stack>
      <Stack
        marginTop={`calc(-1 * ${summaryCardHeight}) !important`}
        paddingLeft={`calc(${summaryCardWidth} + 12px)`}
      >
        {'blah '.repeat(3434)}
      </Stack>
    </Stack>
  );
}

const summaryCardHeight = '(100vh - 72px - 2 * 32px)';

const summaryCardWidth = '50%';
