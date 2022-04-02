import { Card, Stack, Typography } from '@mui/material';
import SearchBar from 'components/Search/SearchBar';
import React from 'react';

export default function AddToHistorySearchList() {
  return (
    <Stack spacing='12px'>
      <Card>
        <Stack padding='24px' spacing='12px'>
          <Typography variant='h6'>Add a past course</Typography>
          <SearchBar
            placeholderText='What did you take last semester?'
            searchIconColor='text.disabled'
          />
        </Stack>
      </Card>
    </Stack>
  );
}
