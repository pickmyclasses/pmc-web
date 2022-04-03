import { History } from '@mui/icons-material';
import { Divider, Grid, Stack } from '@mui/material';
import ContainerWithLoadingIndication from 'components/Page/ContainerWithLoadingIndication';
import React from 'react';
import AddToHistorySearchList from './ProfileHistory/AddToHistorySearchList';
import ProfilePageTabHeadingCard from './ProfilePageTabHeadingCard';

export default function ProfileHistory() {
  return (
    <ContainerWithLoadingIndication isLoading={false}>
      <Stack spacing='32px' height='100%'>
        <ProfilePageTabHeadingCard
          iconType={History}
          title='Your History of Courses'
          description='Tell us what courses you have taken for more personalized content and recommendation'
        />
        <Grid container flex={1}>
          <Grid item xs={6} paddingRight='24px'>
            <AddToHistorySearchList />
          </Grid>
          <Divider orientation='vertical' sx={{ marginRight: '-1px' }} />
          <Grid item xs={6} paddingLeft='24px'>
            blah blah blah
          </Grid>
        </Grid>
      </Stack>
    </ContainerWithLoadingIndication>
  );
}
