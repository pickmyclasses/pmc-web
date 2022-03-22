import React, { useContext } from 'react';
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
import { PreventableNavigationContext } from '../PreventableNavigation/ContainerWithPreventableNavigation';

export default function NavigationBar() {
  const { navigateIfAllowed } = useContext(PreventableNavigationContext);
  const theme = useTheme();

  const handleSearchClick = (searchText) => {
    if (searchText.trim()) {
      navigateIfAllowed(`/search/${searchText}`);
    } else {
      navigateIfAllowed('/home');
    }
  };

  return (
    <ThemeProvider theme={navigationBarTheme}>
      <AppBar position='static' sx={{ zIndex: 9999 }}>
        <Toolbar sx={{ height: '72px' }}>
          <Container maxWidth='xl'>
            <Grid container spacing='24px' sx={{ alignItems: 'center' }}>
              <Grid item xs='auto'>
                <Logo />
              </Grid>
              <Grid item xs display='flex' flexDirection='column' alignItems='center'>
                <SearchBar
                  textColor={theme.palette.primary.contrastText}
                  backgroundColor={alpha(theme.palette.common.black, 0.167)}
                  onSearch={handleSearchClick}
                  maxWidth={'576px'}
                  focusHoverColor={alpha(theme.palette.common.black, 0.333)}
                  placeholderText={'Search for a course'}
                  borderRadiusRatio={'4px'}
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
