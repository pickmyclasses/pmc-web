import React, { useContext, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from '../../api';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { LoadingButton } from '@mui/lab';
import PreventableLink from 'components/PreventableNavigation/PreventableLink';
import { useSnackbar } from 'notistack';

export default function AuthForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useContext(UserContext);

  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoginLoading(true);

    const data = new FormData(event.currentTarget);

    const email = data.get('email');
    const password = data.get('password');

    login({ email, password })
      .then((data) => {
        setErrorMessage('');
        const userInfo = {
          name: `${data.data.firstName} ${data.data.lastName}`,
          token: data.data.token,
          role: data.data.role,
          userID: data.data.id,
        };
        setUser(userInfo);

        localStorage.setItem('user', JSON.stringify(userInfo));

        if (location?.state?.linkTo) {
          navigate(location.state.linkTo, { replace: true });
          let variant = 'success';
          enqueueSnackbar('Login successfully', { variant });
        } else navigate('/', { replace: true });
      })
      .catch((err) => {
        setIsLoginLoading(false);
        let variant = 'error';
        if (err.response) {
          enqueueSnackbar('Wrong username or password', { variant });
        } else if (err.request) {
          enqueueSnackbar('Sorry, something went wrong on the server, try again later', {
            variant,
          });
        } else {
          enqueueSnackbar(
            'Sorry, something went wrong, please refresh the page and try again',
            { variant }
          );
        }
      });
  };

  const theme = createTheme();
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
            Login
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
            />
            {errorMessage !== '' && <ErrorMessage message={errorMessage} />}
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <LoadingButton
              loading={isLoginLoading}
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  variant='body2'
                  component={PreventableLink}
                  to='/register'
                  state={location.state}
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

const ErrorMessage = ({ message }) => {
  return <FormHelperText sx={{ color: 'red', fontSize: 17 }}>{message}</FormHelperText>;
};
