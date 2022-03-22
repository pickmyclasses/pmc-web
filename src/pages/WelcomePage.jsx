import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { grey } from '@mui/material/colors';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useMount } from '../utils';
import { Link } from 'react-router-dom';
import SearchBar from '../components/Search/SearchBar';

const useStyle = makeStyles({
  main: {
    height: '100%',
    backgroundColor: '#182b3a',
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
  },
  registerForm: {
    width: '100%',
  },
  headings: {
    color: 'white',
    marginTop: '5%',
    fontWeight: 'bold',
    fontSize: '2.6em',
  },
  inlineText: {
    color: '#8b959c',
    paddingBottom: '2rem',
    paddingTop: '1.5rem',
    fontSize: '1.25rem',
    fontWeight: '300',
    width: '30%',
  },
  linkBnt: {
    backgroundColor: '#dd1843',
    border: '0',
    borderRadius: '5em',
    lineHeight: '1',
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
    fontSize: '1em',
    color: '#cccfcc',
    paddingLeft: '0.8rem',
    display: 'block',
    marginTop: '1em',
  },
  searchFormHeading: {
    fontSize: '1.5em',
    color: 'white',
    marginTop: '7%',
  },
  searchFormTopText: {
    marginTop: '2%',
    fontSize: '1em',
    color: '#8b959c',
  },
  searchBarContainer: {
    marginTop: '3%',
  },
});

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleSearch = (searchText) => searchText.trim() && navigate(`/search/${searchText}`);

  const classes = useStyle();
  return (
    <div className={classes.main}>
      <Container className={classes.registerForm}>
        <div className={classes.headings}>
          Data-driven course catalogs <br />
          Easier searching <br />
          Easier college <br />
          <div className={classes.inlineText}>Start picking your classes with PMC</div>
        </div>
        <Button variant='contained' disableElevation className={classes.linkBnt}>
          <Link to='/register' className={classes.link}>
            register now!
          </Link>
        </Button>
        <Link to='/auth' className={classes.loginLink}>
          Already a user? log in now!
        </Link>
        <div className={classes.searchFormHeading}>
          Or, check out the stats and reviews <br />
          of the courses you are looking for.
        </div>

        <div className={classes.searchBarContainer}>
          <SearchBar
            textColor={grey[900]}
            backgroundColor={grey[50]}
            onSearch={handleSearch}
            maxWidth={'30%'}
            focusHoverColor={grey[300]}
            placeholderText={'Enter a course or major'}
            borderRadiusRatio={'43px'}
          />
        </div>
      </Container>
    </div>
  );
};

export default WelcomePage;
