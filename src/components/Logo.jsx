import React from 'react';
import { Box, Typography } from '@mui/material';
import { School } from '@material-ui/icons';

export default function Logo({ onClick }) {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', userSelect: 'none', cursor: 'pointer' }}
      onClick={onClick}
    >
      <School style={{ marginRight: '12px' }} />
      <Typography variant='h6' fontWeight='500'>
        PickMyClasses
      </Typography>
    </Box>
  );
}
