import React from 'react';
import { Box, Container } from '@mui/material';
import HomePage from '../pages/HomePage';
import CoursePage from '../pages/CoursePage';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import './App.css';

export default function App() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavigationBar />
      <Container maxWidth='xl' sx={{ flex: 1, minHeight: 0 }}>
        {/* The following should depend on route */}
        <CoursePage />
        {/* <HomePage />  */}
      </Container>
      {/* <Footer /> */}
    </Box>
  );
}
