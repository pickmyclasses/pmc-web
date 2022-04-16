import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

/**
 * Clickable Chips
 */
export default function ClickableChips({ value }) {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Stack direction='row' spacing={1}>
      <Chip label={value} variant='outlined' onClick={handleClick} />
    </Stack>
  );
}
