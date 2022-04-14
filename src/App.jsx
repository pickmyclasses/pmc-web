import React, { createContext, useCallback, useState } from 'react';
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
import ContainerWithNavigationBar from './components/NavigationBar/ContainerWithNavigationBar';
import ContainerWithPreventableNavigation from 'components/PreventableNavigation/ContainerWithPreventableNavigation';
import FileUpload from './pages/Admin/FileUpload';
import ProfilePage from 'pages/ProfilePage';
import MajorDeclarationPage from 'pages/MajorDeclarationPage';
import { useMount } from 'utils';

/**
 * Application entry point. Contains logic for storing and remembering the logged in user as
 * well as definitions of the website's routing structure.
 */
export default function App() {
  /** The currently logged-in user, or `null` if not logged in. */
  const [user, setUser] = useState();

  /**
   * @type {(newUser: Object, shouldRemember: Boolean = true) => void} Expected to be called
   * after each login, sets the currently logged-in user to be visible to the rest of the
   * application. Optionally remembers the user's logged-in state.
   */
  const setUserAndRemember = useCallback((newUser, shouldRemember = true) => {
    setUser(newUser);
    if (shouldRemember) localStorage.setItem('user', JSON.stringify(newUser));
  });

  // Loads the remembered user upon first render, if one exists.
  useMount(() => setUser(JSON.parse(localStorage.getItem('user'))));

  if (user === undefined) return <></>;

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser: setUserAndRemember }}>
        <ContainerWithPreventableNavigation>
          <ContainerWithNavigationBar>
            <Routes>
              <Route exact path='/' element={user ? <HomePage /> : <WelcomePage />} />
              <Route exact path='/auth' element={<AuthForm />} />
              <Route exact path='/register' element={<RegisterForm />} />
              <Route exact path='/profile' element={<ProfilePage />} />
              <Route exact path='/profile/:tab' element={<ProfilePage />} />
              <Route exact path='/profile/roadmap/declare' element={<MajorDeclarationPage />} />
              <Route exact path='/search/:query' element={<SearchPage />} />
              <Route exact path='/course/:id' element={<CoursePage />} />
              <Route exact path='/course/:id/:tab' element={<CoursePage />} />
              <Route exact path='/course/:id/reviews/compose' element={<ReviewPage />} />
              <Route exact path='/admin' element={<AdminPage />} />
              <Route exact path='/admin-update' element={<UpdateData />} />
              <Route exact path='/file-upload' element={<FileUpload />} />
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
 *   setUser: (newUser: Object, shouldRemember: Boolean = true) => void,
 * }>}
 */
export const UserContext = createContext();
