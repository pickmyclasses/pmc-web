import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyle = makeStyles({
  background: {
    backgroundColor: '#182b3a',
    height: '70%',
    width: '100%',
  },
  heading: {
    color: 'white',
    marginTop: '8%',
    marginLeft: '11.5%',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
    fontWeight: 'bold',
    fontSize: '2.5em',
  },
});

const WelcomePage = () => {
  const classes = useStyle();
  return (
    <div className={classes.background}>
      <div className={classes.heading}>
        <p>Data-driven</p>
        <p>Pick Classes made</p>
        <p>easy</p>
        <Button variant='contained' disableElevation>
          GET START NOW
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;
