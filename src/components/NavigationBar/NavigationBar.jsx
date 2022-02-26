import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Container,
  Grid,
  Toolbar,
  useTheme,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import Logo from '../Logo/Logo';
import SearchBar from '../Search/SearchBar';
import NavigationBarButtonGroup from './NavigationBarButtonGroup';

export default function NavigationBar() {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSearchClick = (searchText) => {
    if (searchText.trim()) {
      navigate(`/search/${searchText}`);
    } else {
      navigate('/home');
    }
  };

  return (
    <ThemeProvider theme={navigationBarTheme}>
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
                  maxWidth={'576px'}
                  focusHoverColor={alpha(theme.palette.common.black, 0.333)}
                />
              </Grid>
              <Grid item xs='auto'>
                <NavigationBarButtonGroup />
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export const navigationBarTheme = createTheme({
  palette: {
    primary: { main: '#182b3a' },
    text: { main: '#d4d6d9' },
  },
});
