import React from 'react';
import { AppBar, Container, Toolbar } from '@mui/material';
// import { Box } from '@mui/system';

import HomePage from '../pages/HomePage';

export default function App() {
  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar></Toolbar>
      </AppBar>
      <Toolbar></Toolbar>
      <Container maxWidth='xl'>
        <HomePage></HomePage>
      </Container>
    </div>
  );
}
