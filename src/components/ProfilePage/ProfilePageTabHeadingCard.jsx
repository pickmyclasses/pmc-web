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
      <Stack padding='24px' spacing='24px' direction='row' alignItems='center'>
        {createElement(iconType, { fontSize: 'large', color: 'action' })}
        <Stack>
          <Typography variant='h6' gutterBottom>
            {title}
          </Typography>
          <Typography fontStyle='italic'>{description}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
