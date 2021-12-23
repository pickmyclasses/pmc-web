import React, { useState, useEffect } from 'react';
import { AppBar, Container, Grid, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Logo from '../Logo/Logo';
import SearchBar from '../Search/SearchBar';
import NavigationBarButtonGroup from './NavigationBarButtonGroup';

export default function NavigationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
    // const token = user?.token;
    // JWT login

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]); // When the location changes, simply set the user.

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  const appBarTheme = createTheme({
    palette: {
      primary: {
        main: '#182b3a',
      },
    },
  });

  return (
    <ThemeProvider theme={appBarTheme}>
      <AppBar position='sticky'>
        <Toolbar>
          <Container maxWidth='xl'>
            <Grid container spacing='24px' sx={{ alignItems: 'center' }}>
              <Grid item xs='auto'>
                <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                  <Logo />
                </Link>
              </Grid>

              <Grid item xs display='flex' flexDirection='column' alignItems='center'>
                <SearchBar />
              </Grid>
              <Grid item xs='auto'>
                <NavigationBarButtonGroup userData={user?.result} logout={logout} />
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
