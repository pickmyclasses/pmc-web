import React from 'react';
import { Box, Container } from '@mui/material';
import HomePage from '../pages/HomePage';
import ClassPage from '../pages/ClassPage';
import NavigationBar from './NavigationBar';
import Footer from './Footer';

export default function App() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavigationBar />
      <Container maxWidth='xl' sx={{ flex: 1, minHeight: 0 }}>
        {/* The following should depend on route */}
        {/* <HomePage /> */}
        <ClassPage />
      </Container>
      {/* <Footer /> */}
    </Box>
  );
}
