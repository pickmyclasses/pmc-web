import { Card, Stack, Typography } from '@mui/material';
import PreventableLink from 'components/PreventableNavigation/PreventableLink';
import React from 'react';

export default function DeclareMajorPrompt() {
  return (
    <Card
      sx={{ '&:hover': { boxShadow: 3 }, cursor: 'pointer', textDecoration: 'none' }}
      component={PreventableLink}
      to='/profile/roadmap/declare'
      state={{ linkTo: '/profile/roadmap' }}
    >
      <Stack padding='24px' spacing='12px'>
        <Typography variant='subtitle2'>Declare Your Major</Typography>
        <Typography variant='body2'>
          Click here to declare your major and view the major-specific graduation requirements.
        </Typography>
      </Stack>
    </Card>
  );
}
