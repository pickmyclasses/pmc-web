import React from 'react';
import { Box, Container } from '@mui/material';
import HomePage from './pages/HomePage';
import Auth from './pages/Auth/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CoursePage from './pages/CoursePage';
import NavigationBar from './common/NavigationBar';
//import Footer from './common/Footer';


export default function App() {

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            
      <BrowserRouter>
        <NavigationBar />
        <Container maxWidth='xl' sx={{ flex: 1, minHeight: 0 }}>
          <Routes>
            <Route path="/" exact element={<HomePage/>} />
            <Route path="/search" exact element={<HomePage/>} />
            <Route path="/auth" exact element={<Auth/>}/>
            <Route path="/courseDetails" exact element={<CoursePage/>}/>
          </Routes>
        </Container>
        {/*<Footer />*/}
      </BrowserRouter>

      
    </Box>
  );
}
