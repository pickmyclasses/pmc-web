import * as React from 'react';
import Stack from '@mui/material/Stack';
import MoodIcon from '@mui/icons-material/Mood';
import { red, green } from '@mui/material/colors';

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
const emoji = (isRecommended) => {
  if (isRecommended) {
    return <MoodIcon fontSize='large' style={{ color: green[200] }} />;
  } else {
    return <SentimentVeryDissatisfiedIcon fontSize='large' style={{ color: red[200] }} />;
  }
};

function RenderStatus(isRecommended) {
  return <Stack spacing={1}>{emoji(isRecommended)}</Stack>;
}

export default function CourseReviewStatus(props) {
  return RenderStatus(props.isRecommended);
}
