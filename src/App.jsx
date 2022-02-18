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

export default function App() {
  const [user, setUser] = useState();
  const [shouldShowScheduler, setShouldShowScheduler] = useState(false);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <NavigationBar
            onUserChange={setUser}
            isSchedulerShowing={shouldShowScheduler}
            toggleScheduler={() => setShouldShowScheduler(!shouldShowScheduler)}
          />
          <Routes>
            <Route path='/backoffice' exact element={<AdminPage />} />
            <Route path='/FeedbackEditor' exact element={<FeedbackEditor />} />

            <Route path='/' exact element={<WelcomePage />} />
            <Route path='/backoffice' exact element={<AdminPage />} />
            <Route
              path='/home'
              exact
              element={<HomePage shouldShowScheduler={shouldShowScheduler} />}
            />
            <Route
              path='/search/:query'
              exact
              element={<SearchPage shouldShowScheduler={shouldShowScheduler} />}
            />
            <Route path='/auth' exact element={<AuthForm />} />
            <Route path='/register' exact element={<RegisterForm />} />
            <Route
              path='/course/:id'
              exact
              element={<CoursePage shouldShowScheduler={shouldShowScheduler} />}
            />
            <Route
              path='/course/:id/review'
              exact
              element={<ReviewPage shouldShowScheduler={!shouldShowScheduler} />}
            />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </Box>
  );
}
