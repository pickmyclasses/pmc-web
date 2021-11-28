import React, { useState } from 'react';
import { Divider, FilledInput, IconButton, colors, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Clear, Search } from '@material-ui/icons';

/**
 * The search-bar that sits in the middle of the navigation bar. Fires events when the user
 * searches via calling `onSearchClick`.
 */
export default function SearchBar({ onSearchClick }) {
  const theme = useTheme();

  const [searchText, setSearchText] = useState('');

  const handleSearchClick = () => searchText && onSearchClick?.(searchText);

  return (
    <FilledInput
      fullWidth
      placeholder='Search'
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      onKeyDown={(e) => e.key == 'Enter' && handleSearchClick()}
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
