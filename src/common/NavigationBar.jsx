import React from 'react';
import { AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';
import { SchoolRounded } from '@material-ui/icons';
import useStyles from '../styles';

export default function NavigationBar() {
  const styles = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar position='sticky'>
        <Toolbar>
          <SchoolRounded className={styles.icon} />
          <Typography variant='h6'> Pick My Classes</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
