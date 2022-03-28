import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import swal from 'sweetalert';
import { register } from '../../api';
import { useLocation } from 'react-router-dom';
import { PreventableNavigationContext } from 'components/PreventableNavigation/ContainerWithPreventableNavigation';
import PreventableLink from 'components/PreventableNavigation/PreventableLink';
import Slide from '@mui/material/Slide';
import { useSnackbar } from 'notistack';

const theme = createTheme();

export default function RegisterForm() {
  const { navigateIfAllowed } = useContext(PreventableNavigationContext);
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const college = data.get('college');
    const rePassword = data.get('rePassword');
    let notifyMsg = '';
    let variant = '';
    if (rePassword !== password) {
      notifyMsg = 'Password Mismatch! Please make sure your password is correct.';
      variant = 'error';
      enqueueSnackbar(notifyMsg, { variant });
    } else if (!email || !password || !firstName || !lastName || !rePassword || !college) {
      notifyMsg = 'Info Not Complete. Please make sure you have filled out all the fields.';
      variant = 'error';
      enqueueSnackbar(notifyMsg, { variant });
    } else {
      register({ email, firstName, lastName, college, password, rePassword })
        .then(() => {
          notifyMsg = 'Welcome To PMC!';
          variant = 'success';
          enqueueSnackbar(notifyMsg, { variant });
          notifyMsg = 'Registration succeeded, please login!';
          enqueueSnackbar(notifyMsg, { variant });
          setTimeout(() => navigateIfAllowed('/auth', null, { state: location.state }), 1000);
        })
        .catch((err) => {
          if (err.response) {
            notifyMsg = 'Oop... Something went wrong';
            variant = 'error';
            enqueueSnackbar(notifyMsg, { variant });
          } else if (err.request) {
            notifyMsg = 'Oop... Something went wrong. Internal error, please try again later';
            variant = 'error';
            enqueueSnackbar(notifyMsg, { variant });
          } else {
            notifyMsg = 'Oop... Something went wrong. Internal error, please try again later';
            variant = 'error';
            enqueueSnackbar(notifyMsg, { variant });
          }
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='family-name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='college'
                  label='College'
                  id='college'
                  autoComplete='college'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='rePassword'
                  label='Confirm Password'
                  type='password'
                  id='rePassword'
                  autoComplete='new-password'
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value='allowExtraEmails' color='primary' />}
                  label='By check this, I agree to authorize PickMyClasses to utilize my personal data from Canvas.'
                />
              </Grid>
            </Grid>
            <React.Fragment>
              <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
            </React.Fragment>

            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link
                  component={PreventableLink}
                  to='/auth'
                  state={location.state}
                  variant='body2'
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
