import React, { useState, useEffect } from 'react';
import { AppBar, Container, Grid, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';
import NavigationBarButtonGroup from '../components/NavigationBarButtonGroup';

export default function NavigationBar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  console.log(user);

  useEffect(() => {
    // const token = user?.token;

    // JWT login

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]); // When the location changes, simply set the user.

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    navigate('/');
  };

  return (
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
              {user?.result ? (
                <div>
                  <Typography variant='h6'>Hello, {user?.result.name}</Typography>
                  <Button variant='contained' onClick={logout}>
                    Logout
                  </Button>
                  <NavigationBarButtonGroup />
                </div>
              ) : (
                <Button component={Link} to='/auth' variant='contained'>
                  Sign In
                </Button>
              )}
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
