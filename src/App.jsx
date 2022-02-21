import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CoursePage from './pages/CoursePage';
import NavigationBar from './components/NavigationBar/NavigationBar';
import WelcomePage from './pages/WelcomePage';
import ReviewPage from './pages/ReviewPage';
import AdminPage from './pages/Admin/AdminPage';
import AuthForm from './components/AuthForm/AuthForm';
import RegisterForm from './components/AuthForm/RegisterForm';
import FeedbackEditor from './pages/FeedbackEditorPage';

export const UserContext = createContext();

/** @type {React.Context<{shouldShowScheduler: Boolean}>} */
export const AppContext = createContext();

export default function App() {
  const [user, setUser] = useState();
  const [shouldShowScheduler, setShouldShowScheduler] = useState(false);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <UserContext.Provider value={{ user, setUser }}>
        <AppContext.Provider value={{ shouldShowScheduler }}>
          <BrowserRouter>
            <NavigationBar
              onUserChange={setUser}
              isSchedulerShowing={shouldShowScheduler}
              toggleScheduler={() => setShouldShowScheduler(!shouldShowScheduler)}
            />
            <Routes>
              <Route exact path='/' element={<WelcomePage />} />
              <Route exact path='/home' element={<HomePage />} />
              <Route exact path='/auth' element={<AuthForm />} />
              <Route exact path='/register' element={<RegisterForm />} />
              <Route exact path='/search/:query' element={<SearchPage />} />
              <Route exact path='/course/:id' element={<CoursePage />} />
              <Route exact path='/course/:id/:tab' element={<CoursePage />} />
              <Route exact path='/course/:id/reviews/compose' element={<ReviewPage />} />
              <Route exact path='/backoffice' element={<AdminPage />} />
              {/* TODO Q: The following routes are for backward-compatibility only. Please
               *  migrate all URLs to use the above with normalized formats. */}
              <Route path='/FeedbackEditor' element={<FeedbackEditor />} />
            </Routes>
          </BrowserRouter>
        </AppContext.Provider>
      </UserContext.Provider>
    </Box>
  );
}
