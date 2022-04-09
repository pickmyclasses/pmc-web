import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Autocomplete from '@mui/material/Autocomplete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { register, login, fetchCollegeList } from '../../api';
import { PreventableNavigationContext } from 'components/PreventableNavigation/ContainerWithPreventableNavigation';
import PreventableLink from 'components/PreventableNavigation/PreventableLink';
import { useSnackbar } from 'notistack';
import logo from '../../assets/icon.png';
import { useMount } from 'utils';
import { UserContext } from '../../App';
import Scrollbars from 'react-custom-scrollbars-2';
import { LoadingButton } from '@mui/lab';

const theme = createTheme();

export default function RegisterForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { user, setUser } = useContext(UserContext);
  const { navigateIfAllowed } = useContext(PreventableNavigationContext);

  const [collegeList, setCollegeList] = useState([]);
  const [college, setCollege] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);

  useMount(() => {
    if (user) {
      navigate('/', { replace: true });
    }
    fetchCollegeList().then(setCollegeList);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const rePassword = data.get('rePassword');

    if (rePassword !== password) {
      enqueueSnackbar('Your passwords did not match.', { variant: 'error' });
    } else if (!email || !password || !firstName || !lastName || !rePassword || !college) {
      enqueueSnackbar('Please fill out all fields', { variant: 'error' });
    } else {
      setIsRegisterLoading(true);
      register({ email, firstName, lastName, college, password, rePassword })
        .then(() => login({ email, password }))
        .then((data) => {
          const userInfo = {
            name: `${data.data.firstName} ${data.data.lastName}`,
            token: data.data.token,
            role: data.data.role,
            userID: data.data.id,
            collegeID: data.data.collegeID,
          };
          setUser(userInfo);
          localStorage.setItem('user', JSON.stringify(userInfo));

          requestAnimationFrame(() =>
            navigateIfAllowed('/profile/roadmap/declare', null, {
              replace: true,
              state: { linkTo: '/', isNewUser: true },
            })
          );
        })
        .catch((err) => {
          setIsRegisterLoading(false);
          enqueueSnackbar('Sorry, something went wrong. Please try again later.', {
            variant: 'error',
          });
          console.error('Registration failed:', JSON.stringify(err));
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Scrollbars autoHide>
        <Container component='main' maxWidth='xs' sx={{ paddingBottom: '32px' }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img src={logo} alt={'logo'} style={{ height: '5em' }} />
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
                  <Autocomplete
                    id='college'
                    required
                    onChange={(event, value) => setCollege(value.id)}
                    options={collegeList}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label='College' />}
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
                <LoadingButton
                  loading={isRegisterLoading}
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </LoadingButton>
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
      </Scrollbars>
    </ThemeProvider>
  );
}
