import React from 'react';
import { Box, Container } from '@mui/material';
import NavigationBar from '../components/NavigationBar';
import HomePage from '../pages/HomePage';

export default function App() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavigationBar />
      <Container maxWidth='xl' sx={{ flex: 1 }}>
        {/* The following should depend on route */}
        <HomePage />
      </Container>
    </Box>
  );
}
