import React, { useState } from 'react';
import { Divider, FilledInput, IconButton, colors, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Clear, Search } from '@material-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCoursesBySearch } from '../actions/courses';

/**
 * The search-bar that sits in the middle of the navigation bar. Fires events when the user
 * searches via calling `onSearchClick`.
 *
 * @param {{onSearchClick: (searchText: string) => void}} props
 */

function useQuery()
{
  return new URLSearchParams(useLocation().search);
}

export default function SearchBar({ onSearchClick }) {
  const dispatch = useDispatch();

  const query = useQuery();

  const navigate = useNavigate();

  const page = query.get('page') || 1;

  const searchQuery = query.get('searchQuery');

  const theme = useTheme();

  const [searchText, setSearchText] = useState('');

  // equivalent to searchCourse
  const handleSearchClick = () => {
    
    // if the user doesn't type anything, return nothing
    if(searchText.trim())
    {
      // dispatch -> fetch search course
      dispatch(getCoursesBySearch({ searchText }));
      let array = searchText.split(" ");
      navigate(`/search?department=${array[0]}&number=${array[1]}`);

    }
    // else, navigate back to home page
    else{
      navigate('/');
    }
  }


  return (
    <FilledInput
      fullWidth
      placeholder='Search'
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
      inputProps={{ style: { padding: '10px 20px' } }}
      sx={{
        maxWidth: '576px',
        borderRadius: '4px',
        color: theme.palette.primary.contrastText,
        backgroundColor: alpha(theme.palette.common.black, 0.167),
        '&:hover, &.Mui-focused': { backgroundColor: alpha(theme.palette.common.black, 0.333) },
        '::before, ::after': { display: 'none' },
      }}
      endAdornment={
        <>
          {!!searchText && (
            <>
              <IconButton
                sx={{
                  color: alpha(
                    theme.palette.primary.contrastText,
                    theme.palette.action.disabledOpacity
                  ),
                }}
                onClick={() => setSearchText('')}
              >
                <Clear />
              </IconButton>
              <Divider
                orientation='vertical'
                variant='middle'
                color={theme.palette.primary.contrastText}
                sx={{
                  opacity: 0.25,
                  marginLeft: '4px',
                  marginRight: '8px',
                }}
                flexItem
              />
            </>
          )}
          <IconButton sx={{ color: colors.blue[300] }} onClick={handleSearchClick}>
            <Search />
          </IconButton>
        </>
      }
    />
  );
}
