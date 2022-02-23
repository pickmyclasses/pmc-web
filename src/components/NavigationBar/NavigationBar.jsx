import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Container, Grid, Toolbar, useTheme } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { UserContext } from '../../App';
import Logo from '../Logo/Logo';
import SearchBar from '../Search/SearchBar';
import NavigationBarButtonGroup from './NavigationBarButtonGroup';

export default function NavigationBar({ toggleScheduler }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const { setUser } = useContext(UserContext);

  const appBarTheme = createTheme({
    palette: {
      primary: {
        main: '#182b3a',
      },
    },
  });

  const logout = () => {
    setUser(null);
    navigate('/home');
  };

  const handleSearchClick = (searchText) => {
    if (searchText.trim()) {
      navigate(`/search/${searchText}`);
    } else {
      navigate('/home');
    }
  };

  return (
    <ThemeProvider theme={appBarTheme}>
      <AppBar position='static' sx={{ zIndex: 999 }}>
        <Toolbar>
          <Container maxWidth='xl'>
            <Grid container spacing='24px' sx={{ alignItems: 'center' }}>
              <Grid item xs='auto'>
                <Link to='/home' style={{ textDecoration: 'none', color: 'white' }}>
                  <Logo />
                </Link>
              </Grid>
              <Grid item xs display='flex' flexDirection='column' alignItems='center'>
                <SearchBar
                  textColor={theme.palette.primary.contrastText}
                  backgroundColor={alpha(theme.palette.common.black, 0.167)}
                  onSearch={handleSearchClick}
                />
              </Grid>
              <Grid item xs='auto'>
                <NavigationBarButtonGroup logout={logout} toggleScheduler={toggleScheduler} />
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
