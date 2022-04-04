import React, { useContext, useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { EventNote } from '@mui/icons-material';
import { SchedulerContext } from '../Scheduler/ContainerWithScheduler';
import ContainerWithLoadingIndication from 'components/Page/ContainerWithLoadingIndication';
import AsyncClassesCard from './ProfileSchedule/AsyncClassesCard';
import LiveClassesCard from './ProfileSchedule/LiveClassesCard';
import ProfilePageTabHeadingCard from './ProfilePageTabHeadingCard';

/** The schedule tab of the user profile page. */
export default function ProfileSchedule() {
  const { classesInShoppingCart, customEvents } = useContext(SchedulerContext);

  /** The list of `{classData, course}` of online classes the user has. */
  const [asyncClasses, setAsyncClasses] = useState(null);

  // Extract classes that are online from the user's schedule. A class is online (asynchronous)
  // if it does not have an `offerDate` (weekdays where the class meets).
  useEffect(
    () => setAsyncClasses(classesInShoppingCart.filter((x) => !x.classData.offerDate)),
    [classesInShoppingCart]
  );

  return (
    <ContainerWithLoadingIndication
      isLoading={!classesInShoppingCart || !customEvents || !asyncClasses}
    >
      <Stack spacing='32px'>
        <ProfilePageTabHeadingCard
          iconType={EventNote}
          title='Your Schedule'
          description='View and manage your courses and other weekly events'
        />
        <AsyncClassesCard classesAndCourses={asyncClasses} />
        <LiveClassesCard
          classesInShoppingCart={classesInShoppingCart}
          customEvents={customEvents}
        />
      </Stack>
    </ContainerWithLoadingIndication>
  );
}
