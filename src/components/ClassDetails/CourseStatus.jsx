import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function RenderStatus(canRegister) {
  let statusTitle;
  let statusColor;
  let statusInstruction;
  if (canRegister === 0) {
    statusTitle = 'Cannot Register';
    statusColor = 'error';
    statusInstruction = 'You have not fullfilled the requirements. Please check it again!';
  } else {
    statusTitle = 'Can Register';
    statusColor = 'success';
    statusInstruction = 'All requirements met. You may register for this class! ';
  }
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={statusColor}>
        <AlertTitle>{statusTitle}</AlertTitle>
        <strong>{statusInstruction}</strong>
      </Alert>
    </Stack>
  );
}

export default function CourseStatus(props) {
  return RenderStatus(props.canRegister);
}
