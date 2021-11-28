import React from 'react';
import { Grid, IconButton, useTheme } from '@mui/material';
import { AccountCircle, Notifications } from '@material-ui/icons';

export default function NavigationBarButtonGroup() {
  const theme = useTheme();

  return (
    <Grid container spacing='8px' sx={{ '*': { color: theme.palette.primary.contrastText } }}>
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
