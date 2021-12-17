import React from 'react';
import { Box, Container } from '@mui/material';
import HomePage from './pages/HomePage';
import Auth from './pages/Auth/Auth';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CoursePage from './pages/CoursePage';
import NavigationBar from './common/NavigationBar';
//import Footer from './common/Footer';
// Fetch the data from the global Redux Store
import { useSelector } from 'react-redux';

export default function App() {
  // the state.courses is from combineReducers({ courses: courses })
  const courses = useSelector((state) => state.courses);
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <BrowserRouter>
        <NavigationBar />
        <Container maxWidth='xl' sx={{ flex: 1, minHeight: 0 }}>
          {/* Use Link to dynamically generate a list of routes */}
          {courses.map((course, i) => (
            <Link key={i} to={'courseDetails/' + course.id} />
          ))}

          <Routes>
            <Route path='/' exact element={<HomePage />} />
            <Route path='/search' exact element={<HomePage />} />
            <Route path='/auth' exact element={<Auth />} />
            <Route path='/courseDetails/:id' exact element={<CoursePage />} />
          </Routes>
        </Container>
        {/*<Footer />*/}
      </BrowserRouter>
    </Box>
  );
}
