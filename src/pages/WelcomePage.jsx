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
import Scrollbars from 'react-custom-scrollbars-2';

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
    marginTop: '5.5em',
    paddingLeft: '6%',
  },
  headings: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '2.6em',
    textAlign: 'center',
  },
  headingTwo: {
    color: 'white',
    textAlign: 'center',
    marginTop: '3%',
    fontSize: '2em',
    fontWeight: 'bold',
  },
  searchBarText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: '3%',
    fontSize: '1.4em',
  },
  linkBnt: {
    backgroundColor: '#dd1843',
    border: '0',
    borderRadius: '5em',
    lineHeight: '1.2',
    marginTop: '5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 'auto',
    marginLeft: '9em',
    marginRight: '9em',
  },
  link: {
    color: 'white',
    padding: '1em 2.5em',
    transition: 'all .25s ease-in-out',
    textTransform: 'uppercase',
    textDecoration: 'none',
    textAlign: 'center',
  },
  loginLink: {
    fontSize: '1.2em',
    color: '#cccfcc',
    paddingLeft: '0.8rem',
    display: 'block',
    marginTop: '1em',
    textAlign: 'center',
  },
  searchBarContainer: {
    marginTop: '2%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    marginTop: '9%',
    textAlign: 'center',
    fontSize: '1.4em',
    color: 'white',
  },
});

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (searchText) => searchText.trim() && navigate(`/search/${searchText}`);
  const classes = useStyle();

  return (
    <Scrollbars>
      <div className={classes.main}>
        <Box className={classes.mainForm}>
          <div className={classes.headings}>Data-driven course catalogs, Easier searching</div>
          <div className={classes.headingTwo}>
            Make your college life a journey!
            <Lottie
              loop
              animationData={graduation}
              play
              style={{ width: '14%', marginLeft: 'auto', marginRight: 'auto' }}
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
          <div className={classes.linkBnt}>
            <Button>
              <Link to='/register' className={classes.link}>
                register now!
              </Link>
            </Button>
          </div>
          <Link to='/auth' className={classes.loginLink}>
            Already a user? log in now!
          </Link>
        </Box>
        <Box sx={{ paddingRight: '4%' }}>
          <Lottie loop animationData={poster} play style={{ width: '100%', height: '100%' }} />
        </Box>
      </div>
    </Scrollbars>
  );
};

export default WelcomePage;
