import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function RenderStatus(isRecommended) {
  let statusTitle;
  let statusColor;
  let statusInstruction;
  if (!isRecommended) {
    statusTitle = `Don't pick this course!`;
    statusColor = 'error';
    statusInstruction = 'The user did not recommend this course.';
  } else {
    statusTitle = 'Pick this course!';
    statusColor = 'success';
    statusInstruction = 'The user recommended this course.';
  }
  return (
    <Stack sx={{ width: '25%' }} spacing={1}>
      <Alert variant='outlined' severity={statusColor}>
        <AlertTitle>{statusTitle}</AlertTitle>
        <strong>{statusInstruction}</strong>
      </Alert>
    </Stack>
  );
}

export default function CourseReviewStatus(props) {
  return RenderStatus(props.isRecommended);
}
