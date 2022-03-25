import React, { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import CoursePage from './pages/CoursePage';
import WelcomePage from './pages/WelcomePage';
import ReviewPage from './pages/ReviewPage';
import AdminPage from './pages/Admin/AdminPage';
import UpdateData from './pages/Admin/UpdateData';
import AuthForm from './components/AuthForm/AuthForm';
import RegisterForm from './components/AuthForm/RegisterForm';
import FeedbackEditor from './pages/FeedbackEditorPage';
import ContainerWithNavigationBar from './components/NavigationBar/ContainerWithNavigationBar';
import ContainerWithPreventableNavigation from 'components/PreventableNavigation/ContainerWithPreventableNavigation';
import ProfilePage from 'pages/ProfilePage';

export default function App() {
  const [user, setUser] = useState();

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <ContainerWithPreventableNavigation>
          <ContainerWithNavigationBar>
            <Routes>
              <Route
                exact
                path='/'
                element={user === undefined ? <></> : user ? <HomePage /> : <WelcomePage />}
              />
              <Route exact path='/auth' element={<AuthForm />} />
              <Route exact path='/register' element={<RegisterForm />} />
              <Route exact path='/profile' element={<ProfilePage />} />
              <Route exact path='/profile/:tab' element={<ProfilePage />} />
              <Route exact path='/search/:query' element={<SearchPage />} />
              <Route exact path='/course/:id' element={<CoursePage />} />
              <Route exact path='/course/:id/:tab' element={<CoursePage />} />
              <Route exact path='/course/:id/reviews/compose' element={<ReviewPage />} />
              <Route exact path='/course/:id/edit-feedback' element={<FeedbackEditor />} />
              <Route exact path='/admin' element={<AdminPage />} />
              <Route exact path='/admin-update' element={<UpdateData />} />
            </Routes>
          </ContainerWithNavigationBar>
        </ContainerWithPreventableNavigation>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

/**
 * @type {React.Context<{
 *   user: Object,
 *   setUser: function(Object): void,
 * }>}
 */
export const UserContext = createContext();
