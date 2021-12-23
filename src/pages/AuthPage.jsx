import React, { useState } from 'react';
import { Avatar, Button, Grid, Typography, Container } from '@material-ui/core';
import { Paper } from '@mui/material';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './AuthPage.styles';
import Input from '../components/TextInput/Input';
import Icon from '../components/Icon/Icon';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

// Initial state as a placeholder for the form data
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const AuthPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      //dispatch(signup(formData, history));
    } else {
    }
  };

  const handleChange = (e) => {
    // Spread the data form and match the name with the value
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    handleShowPassword(false);
  };

  // The response will include access token
  const googleSuccess = async (res) => {
    // res?. will not get us an error if res is null
    const result = await res?.profileObj;

    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });

      navigate('/');
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  const googleFailure = (err) => {
    console.log(err);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component='h1' variant='h5'>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp ? (
              <>
                <Input
                  name='firstName'
                  label='First Name'
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input name='lastName' label='Last Name' handleChange={handleChange} half />
              </>
            ) : null}
            <Input name='email' label='Email' handleChange={handleChange} type='email' />

            {/* 2 types: password (the black dots) and text. */}
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />

            {isSignUp ? (
              <Input
                name='confirmPassword'
                label='Confirm Password'
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
              />
            ) : null}
          </Grid>

          {/* A button of type 'submit' will strigger the method onSubmit of a form */}
          <Button type='submit' fullWidth variant='contained' className={classes.submit}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>

          {/* Google Log In Button */}
          <GoogleLogin
            clientId='1011146353904-97e105u86dp4v9v9etgobto7gol9c0qg.apps.googleusercontent.com'
            //buttonText="Sign In With Google"
            render={(renderProps) => (
              <>
                <Button
                  className={classes.googleButton}
                  fullWidth
                  onClick={renderProps.onClick}
                  startIcon={<Icon />}
                  variant='contained'
                >
                  Sign In With Google
                </Button>
              </>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          />

          {/* Switch the views between Sign In and Sign Up */}
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AuthPage;
