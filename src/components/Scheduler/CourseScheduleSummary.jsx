import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { parseDayList } from '../../utils';
import DaysIndicator from '../CourseCardGrid/CourseCard/DaysIndicator';
import { getComponent, getInstructor } from './ShoppingCart';

export default function CourseScheduleSummary({ classes, plainText = false }) {
  const [sortedClasses, setSortedClasses] = useState([]);

  useEffect(
    () =>
      setSortedClasses(
        classes
          .map((x) => ({ component: getComponent(x), classData: x }))
          .sort((x, y) => +(x.component !== 'Lecture') - +(y.component !== 'Lecture'))
      ),
    [classes]
  );

  return (
    <Stack spacing='4px'>
      <Typography variant='body2' noWrap>
        Instructor: {getInstructor(classes[0])}
      </Typography>
      {sortedClasses.map(({ component, classData }) => (
        <Stack key={component} direction='row'>
          <Typography variant='body2' noWrap>
            {component}:
          </Typography>
          {plainText ? (
            <Typography variant='subtitle2' noWrap>
              &nbsp;
              {parseDayList(classData.offerDate)
                .map((x) => dayNames[x])
                .join(', ')}{' '}
              @&nbsp;
            </Typography>
          ) : (
            <Stack direction='row' alignItems='center' marginLeft='12px' marginRight='-2px'>
              <DaysIndicator
                days={parseDayList(classData.offerDate)}
                width='88px'
                height={1.25}
              />
            </Stack>
          )}
          <Typography variant='subtitle2' noWrap>
            {formatTimeRange(classData)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

const dayNames = 'Sun Mon Tue Wed Thu Fri Sat'.split(' ');

/** `09:40am–10:30am` becomes `9:40–10:30am`. */
export const formatTimeRange = ({ startTime, endTime }) => {
  if (startTime.slice(-2) === endTime.slice(-2)) startTime = startTime.slice(0, -2);
  return `${startTime.replace(/^0+/, '')}–${endTime.replace(/^0+/, '')}`;
};
