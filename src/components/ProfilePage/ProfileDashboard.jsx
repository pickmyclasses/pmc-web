import { Card, Stack, Typography } from '@mui/material';
import { UserContext } from 'App';
import React, { useContext } from 'react';

/** The dashboard (default) tab of the profile page. */
export default function ProfileDashboard() {
  const { user } = useContext(UserContext);

  return (
    <Card>
      <Stack padding='24px' spacing='24px'>
        <Typography variant='h6'>{user?.name}</Typography>
      </Stack>
    </Card>
  );
}
