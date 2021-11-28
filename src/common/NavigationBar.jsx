import React from 'react';
import { AppBar, Container, Grid, Toolbar } from '@mui/material';
import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';
import NavigationBarButtonGroup from '../components/NavigationBarButtonGroup';

export default function NavigationBar() {
  return (
    <>
      <AppBar position='sticky'>
        <Toolbar>
          <Container maxWidth='xl'>
            <Grid container spacing='24px' sx={{ alignItems: 'center' }}>
              <Grid item xs='auto'>
                <Logo />
              </Grid>
              <Grid item xs display='flex' flexDirection='column' alignItems='center'>
                <SearchBar />
              </Grid>
              <Grid item xs='auto'>
                <NavigationBarButtonGroup />
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
