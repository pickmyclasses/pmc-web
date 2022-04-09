import { School } from '@mui/icons-material';
import { Stack } from '@mui/material';
import React from 'react';
import ProfilePageTabHeadingCard from './ProfilePageTabHeadingCard';

/** The roadmap tab of the user profile page. */
export default function ProfileRoadmap() {
  return (
    <Stack spacing='24px'>
      <ProfilePageTabHeadingCard
        iconType={School}
        title='Your Graduation Roadmap'
        description='View your graduation requirements and plan your future courses'
      />
    </Stack>
  );
}
