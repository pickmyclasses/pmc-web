import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/Search/SearchBar';
import Lottie from 'react-lottie-player';
import poster from '../assets/poster.json';
import graduation from '../assets/education-reward.json';

const useStyle = makeStyles({
  main: {
    height: '100%',
    background: 'linear-gradient( #182b3a, #2e5f82);',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
    display: 'flex',
  },
  mainForm: {
    width: '70%',
    marginTop: '6%',
    paddingLeft: '6%',
  },
  headings: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '2.6em',
  },
  headingTwo: {
    color: 'white',
    marginLeft: '18%',
    marginTop: '3%',
    fontSize: '2em',
    fontWeight: 'bold',
  },
  searchBarText: {
    color: 'white',
    paddingLeft: '26%',
    paddingTop: '3%',
    fontSize: '1.4em',
  },
  linkBnt: {
    backgroundColor: '#dd1843',
    border: '0',
    borderRadius: '5em',
    lineHeight: '1.2',
    paddingLeft: '18%',
    paddingRight: '20%',
    marginLeft: '15%',
    marginTop: '5%',
  },
  link: {
    color: 'white',
    padding: '1em 2.5em',
    display: 'inline-block',
    transition: 'all .25s ease-in-out',
    textTransform: 'uppercase',
    textDecoration: 'none',
  },
  loginLink: {
    fontSize: '1.2em',
    color: '#cccfcc',
    paddingLeft: '0.8rem',
    display: 'block',
    marginTop: '1em',
    marginLeft: '30%',
  },
  searchFormTopText: {
    marginTop: '2%',
    fontSize: '1em',
    color: '#8b959c',
  },
  searchBarContainer: {
    marginTop: '2%',
    paddingLeft: '15%',
  },
  registerText: {
    marginTop: '9%',
    marginLeft: '12%',
    fontSize: '1.4em',
    color: 'white',
  },
});

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (searchText) => searchText.trim() && navigate(`/search/${searchText}`);
  const classes = useStyle();

  return (
    <div className={classes.main}>
      <Box className={classes.mainForm}>
        <div className={classes.headings}>Data-driven course catalogs, Easier searching</div>
        <div className={classes.headingTwo}>
          Make your college life a journey!
          <Lottie
            loop
            animationData={graduation}
            play
            style={{ width: '14%', paddingLeft: '22%' }}
          />
        </div>
        <div className={classes.searchBarContainer}>
          <SearchBar
            textColor={grey[900]}
            backgroundColor={grey[50]}
            onSearch={handleSearch}
            maxWidth={'70%'}
            focusHoverColor={grey[300]}
            placeholderText={''}
            borderRadiusRatio={'43px'}
            fontSize={'1.7em'}
          />
        </div>
        <div className={classes.searchBarText}>Searching for your classes now!</div>
        <div className={classes.registerText}>
          Or, register for your customized scheduler and recommendations!
        </div>
        <Button variant='contained' disableElevation className={classes.linkBnt}>
          <Link to='/register' className={classes.link}>
            register now!
          </Link>
        </Button>
        <Link to='/auth' className={classes.loginLink}>
          Already a user? log in now!
        </Link>
      </Box>
      <Box sx={{ paddingRight: '4%' }}>
        <Lottie loop animationData={poster} play style={{ width: '100%', height: '100%' }} />
      </Box>
    </div>
  );
};

export default WelcomePage;
