import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppBar, Container, Grid, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from '../../App';
import Logo from '../Logo/Logo';
import SearchBar from '../Search/SearchBar';
import NavigationBarButtonGroup from './NavigationBarButtonGroup';

export default function NavigationBar({ toggleScheduler }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  // TODO Q: Nice looking theme for the app bar! Hope we can soon use the same theme in the
  // entire app.
  const appBarTheme = createTheme({
    palette: {
      primary: {
        main: '#182b3a',
      },
    },
  });

  console.log(user);

  // TODO Q: Can we get rid of using Redux here since we moved away from Redux pretty much
  // elsewhere?
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <ThemeProvider theme={appBarTheme}>
      <AppBar position='sticky'>
        <Toolbar>
          <Container maxWidth='xl'>
            <Grid container spacing='24px' sx={{ alignItems: 'center' }}>
              <Grid item xs='auto'>
                <Link to='/home' style={{ textDecoration: 'none', color: 'white' }}>
                  <Logo />
                </Link>
              </Grid>
              <Grid item xs display='flex' flexDirection='column' alignItems='center'>
                <SearchBar />
              </Grid>
              <Grid item xs='auto'>
                <NavigationBarButtonGroup
                  userData={user}
                  logout={logout}
                  toggleScheduler={toggleScheduler}
                />
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
