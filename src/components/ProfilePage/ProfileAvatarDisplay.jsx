import React, { useContext } from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import { UserContext } from '../../App';

/** Displays avatar and user's name on the top left of the user profile page. */
export default function ProfileAvatarDisplay() {
  const { user } = useContext(UserContext);

  return (
    <Stack alignItems='center' width='100%'>
      <Avatar sx={{ width: '120px', height: '120px', marginBottom: '16px', fontSize: '48px' }}>
        {[user.firstName, user.lastName].map((x) => x.charAt(0).toUpperCase()).join('')}
      </Avatar>
      <Typography variant='h6' fontWeight='normal'>
        {user.name}
      </Typography>
      <Typography variant='caption' sx={{ opacity: 0.75 }} align='center'>
        {user.major}
      </Typography>
    </Stack>
  );
}
