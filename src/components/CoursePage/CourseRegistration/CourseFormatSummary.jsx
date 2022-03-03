import { Card, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { pluralize } from 'utils';
import CourseComponentsSummary, { getAllComponents } from '../CourseComponentsSummary';

export default function CourseFormatSummary({ course }) {
  const [numComponents, setNumComponents] = useState();

  useEffect(() => setNumComponents(getAllComponents(course).length), [course]);

  return (
    <Card>
      <Stack padding='24px' spacing='12px'>
        <Typography variant='subtitle2'>Course Format</Typography>
        <Typography variant='body2'>
          This course has {pluralize(numComponents, 'component')} you need to register and
          attend:
        </Typography>
        <CourseComponentsSummary course={course} />
      </Stack>
    </Card>
  );
}
