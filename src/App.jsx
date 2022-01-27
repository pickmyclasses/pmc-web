import React, { useState } from 'react';
import { Box } from '@mui/material';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CoursePage from './pages/CoursePage';
import NavigationBar from './components/NavigationBar/NavigationBar';
import WelcomePage from './pages/WelcomePage';
import ReviewPage from './pages/ReviewPage';

export default function App() {
  const [shouldShowScheduler, setShouldShowScheduler] = useState(true);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BrowserRouter>
        <NavigationBar
          isSchedulerShowing={shouldShowScheduler}
          toggleScheduler={() => setShouldShowScheduler(!shouldShowScheduler)}
        />
        <Routes>
          <Route path='/' exact element={<WelcomePage />} />
          <Route
            path='/search'
            exact
            element={<HomePage shouldShowScheduler={shouldShowScheduler} />}
          />
          <Route path='/auth' exact element={<AuthPage />} />
          <Route
            path='/courseDetails/:id'
            exact
            element={<CoursePage shouldShowScheduler={shouldShowScheduler} />}
          />
          <Route
            path='/courseDetails/:id/review'
            exact
            element={<ReviewPage shouldShowScheduler={!shouldShowScheduler} />}
          />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}
