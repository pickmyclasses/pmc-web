import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import CommentIcon from '@mui/icons-material/Comment';
export default function BasicTooltip({ message }) {
  return (
    <Tooltip title={message}>
      <IconButton>
        <CommentIcon />
      </IconButton>
    </Tooltip>
  );
}
