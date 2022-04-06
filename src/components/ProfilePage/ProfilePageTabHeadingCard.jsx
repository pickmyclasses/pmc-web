import { Card, Stack, Typography } from '@mui/material';
import React, { createElement } from 'react';

/**
 * A card that shows up on the top of a profile page's tab that displays the title and summary
 * of what the tab does.
 *
 * @param {Object} props
 * @param {Class} props.iconType The react component type of the icon.
 * @param {String} props.title The title of the tab.
 * @param {String} props.description A summary of what the tab does.
 */
export default function ProfilePageTabHeadingCard({ iconType, title, description }) {
  return (
    <Card>
      <Stack padding='16px 20px' spacing='16px' direction='row' alignItems='center'>
        {createElement(iconType, { fontSize: 'large', color: 'action' })}
        <Stack spacing='4px'>
          <Typography variant='h6'>{title}</Typography>
          <Typography fontStyle='italic'>{description}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
