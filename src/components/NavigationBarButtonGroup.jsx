import React from 'react';
import { Grid, IconButton, useTheme } from '@mui/material';
import { AccountCircle, Notifications } from '@material-ui/icons';

/**
 * The group of buttons like notification and user profile that sits on the right side of the
 * navigation bar.
 */
export default function NavigationBarButtonGroup() {
  const theme = useTheme();

  return (
    <Grid container spacing='16px' sx={{ '*': { color: theme.palette.primary.contrastText } }}>
      {/* Place-holding only; not yet functional */}
      <Grid item>
        <IconButton>
          <Notifications />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton>
          <AccountCircle />
        </IconButton>
      </Grid>
    </Grid>
  );
}
