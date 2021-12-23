import React from 'react';
import { Box } from '@mui/material';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CoursePage from './pages/CoursePage';
import NavigationBar from './components/NavigationBar/NavigationBar';
import WelcomePage from './pages/WelcomePage';

export default function App() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path='/' exact element={<HomePage />} />
          <Route path='/search' exact element={<HomePage />} />
          <Route path='/auth' exact element={<AuthPage />} />
          <Route path='/courseDetails/:id' exact element={<CoursePage />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}
