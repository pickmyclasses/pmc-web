import React from 'react';
import { AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import { SchoolRounded } from '@material-ui/icons';
import useStyles from '../styles';

export default function NavigationBar() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar>
          <SchoolRounded className={classes.icon} />
          <Typography variant='h6'> Pick My Classes</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
