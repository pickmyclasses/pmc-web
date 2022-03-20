import { MenuBook, Mic, People, Science } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { getComponent } from 'components/Scheduler/ShoppingCart';
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

/**
 * Returns the list of components a course offers. If `course.classes` is given, figures out the
 * component list with what is offered; otherwise, uses the `course.component` as found in part
 * of the course's description, which may be unreliable.
 */
export const getAllComponents = (course) => {
  let components;
  if (course.classes?.length) {
    components = Array.from(new Set(course.classes.map((x) => getComponent(x)))).sort();
  }
  if (!components || !components.filter(Boolean).length) {
    components = course.component.trim().split(/\s+/);
  }
  // Put lecture first, if lecture is one of the components.
  return components.sort((x, y) => +(x !== 'Lecture') - +(y !== 'Lecture'));
};

export const iconTypeByComponent = {
  'Lecture': MenuBook,
  'Laboratory': Science,
  'Discussion': People,
  'Studio': Mic,
};
