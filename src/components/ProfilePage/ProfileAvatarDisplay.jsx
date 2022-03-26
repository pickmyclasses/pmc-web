import React, { useContext } from 'react';
import { Person } from '@mui/icons-material';
import { Avatar, Stack, Typography } from '@mui/material';
import { UserContext } from '../../App';

/** Displays avatar and user's name on the top left of the user profile page. */
export default function ProfileAvatarDisplay() {
  const { user } = useContext(UserContext);

  return (
    <Stack alignItems='center' width='100%'>
      <Avatar
        sx={{ width: '120px', height: '120px', marginBottom: '16px' }}
        src='https://i.insider.com/60817ec5354dde0018c06960?width=700'
      >
        {/* The following is the default gray avatar that would become visible without the
         *  the `src` prop in the Avatar above. */}
        <Person sx={{ transform: 'scale(3.5)' }} />
      </Avatar>
      <Typography variant='h6' fontWeight='normal'>
        {user.name}
      </Typography>
      <Typography variant='caption' sx={{ opacity: 0.75 }}>
        Profile
      </Typography>
    </Stack>
  );
}
