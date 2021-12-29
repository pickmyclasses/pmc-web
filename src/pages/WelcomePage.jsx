import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyle = makeStyles({
  background: {
    backgroundColor: '#182b3a',
    height: '80%',
    width: '100%',
  },
  heading: {
    color: 'white',
    marginTop: '8%',
    marginLeft: '11.5%',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
    fontWeight: 'bold',
    fontSize: '2.6em',
  },
  linkBnt: {
    backgroundColor: '#dd1843',
    border: '0',
    borderRadius: '5rem',
    lineHeight: '1',
  },
  link: {
    color: '#ffffff',
    padding: '1em 2.5em',
    display: 'inline-block',
    transition: 'all .25s ease-in-out',
    textTransform: 'uppercase',
    textDecoration: 'none',
  },
  inlineText: {
    color: '#8b959c',
    paddingBottom: '2rem',
    paddingTop: '1.5rem',
    fontSize: '1.25rem',
    fontWeight: '300',
    width: '30%',
  },
  loginLink: {
    fontSize: '0.8rem',
    color: '#cccfcc',
    paddingLeft: '0.8rem',
  },
});

const WelcomePage = () => {
  const classes = useStyle();
  return (
    <div className={classes.background}>
      <div className={classes.heading}>
        Data-driven course catalogs <br />
        Easier searching <br />
        Easier college <br />
        <div className={classes.inlineText}>
          Start picking your classes with PMC, pick the classes that actually fit your lifestyle
        </div>
        <Button variant='contained' disableElevation className={classes.linkBnt}>
          <Link to='/search' className={classes.link}>
            start now!
          </Link>
        </Button>
        <div>
          <Link to='/auth' className={classes.loginLink}>
            Already an user? log in now!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
