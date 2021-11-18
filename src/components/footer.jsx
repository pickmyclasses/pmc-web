import React from 'react';

import { Typography } from '@mui/material';
import useStyles from '../styles';

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Typography variant='h6' align='center' gutterBottom>
        CS 4000 Capstone Project
      </Typography>
      <Typography variant='subtitle1' align='center' gutterBottom color='textSecondary'>
        Kaijie Fu, Kevin Song, Leon Tran, and Qianlang Chen
      </Typography>
    </footer>
  );
}
