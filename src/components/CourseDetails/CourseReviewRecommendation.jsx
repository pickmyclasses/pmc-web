import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function RenderStatus(isRecommended) {
  let statusTitle;
  let statusColor;
  if (!isRecommended) {
    statusTitle = `Don't pick this course!`;
    statusColor = 'error';
  } else {
    statusTitle = 'Pick this course!';
    statusColor = 'success';
  }
  return (
    <Stack sx={{ width: '50%' }} spacing={1}>
      <Alert severity={statusColor}>
        <AlertTitle>{statusTitle}</AlertTitle>
      </Alert>
    </Stack>
  );
}

export default function CourseReviewStatus(props) {
  return RenderStatus(props.isRecommended);
}
