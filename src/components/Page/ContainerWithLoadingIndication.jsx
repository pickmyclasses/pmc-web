import React from 'react';
import { Box, CircularProgress } from '@mui/material';

/**
 * A container that can optionally display a spinning circle loading indication in its middle. */
export default function ContainerWithLoadingIndication({
  children,
  isLoading = false,
  color = 'primary',
  size = 'large',
}) {
  if (!isLoading) return <>{children}</>;

  const absoluteSize = { small: '32px', medium: '48px', large: '64px' }[size];

  return (
    <Box display='flex' width='100%' height='100%'>
      <CircularProgress color={color} size={absoluteSize} sx={{ margin: 'auto' }} />
    </Box>
  );
}
