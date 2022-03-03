import { MenuBook, People, Science } from '@mui/icons-material';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LabelWithIcon from './LabelWithIcon';

export default function CourseComponentsSummary({ course }) {
  const [components, setComponents] = useState([]);

  useEffect(
    () =>
      setComponents(
        getAllComponents(course).map((label) => ({
          iconType: iconTypeByComponent[label] || People,
          label,
        }))
      ),
    [course]
  );

  return (
    <Stack direction='row' spacing='24px' flexWrap='wrap'>
      {components.map(({ iconType, label }, i) => (
        <LabelWithIcon key={i} color='action' iconType={iconType} label={label} />
      ))}
    </Stack>
  );
}

export const getAllComponents = (course) =>
  course.component
    .trim()
    .split(/\s+/)
    .sort((x, y) => +(x !== 'Lecture') - +(y !== 'Lecture'));

export const iconTypeByComponent = {
  'Lecture': MenuBook,
  'Laboratory': Science,
  'Discussion': People,
};
