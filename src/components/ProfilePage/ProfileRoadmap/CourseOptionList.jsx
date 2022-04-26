import { List, Stack } from '@mui/material';
import { fetchCoursesByIDs } from 'api';
import ContainerWithLoadingIndication from 'components/Page/ContainerWithLoadingIndication';
import React, { useEffect, useState } from 'react';
import SmallCourseListItem from '../SmallCourseListItem';

export default function CourseOptionList({ courseIDs }) {
  const [courses, setCourses] = useState();

  useEffect(() => {
    setCourses(null);
    fetchCoursesByIDs(courseIDs).then((courses) =>
      setCourses(courses.sort((x, y) => x.isTaken - y.isTaken))
    );
  }, [courseIDs]);

  return (
    <Stack paddingBottom='16px'>
      <ContainerWithLoadingIndication isLoading={!courses}>
        <List
          disablePadding
          sx={{
            '> *:first-of-type': { paddingTop: 0 },
            '> *:last-child': { paddingBottom: 0 },
          }}
        >
          {courses &&
            courses.map((course) => (
              <SmallCourseListItem
                key={course.id}
                course={course}
                indicator={course.isTaken ? 'taken-check' : undefined}
                autoHideActionItems
                actionItems={['info', 'register']}
                defaultActionItem={'info'}
                onActionItemClick={(_, action) =>
                  window.open(
                    `/course/${course.id}${action === 'register' ? '/registration' : ''}`,
                    '_blank'
                  )
                }
              />
            ))}
        </List>
      </ContainerWithLoadingIndication>
    </Stack>
  );
}
