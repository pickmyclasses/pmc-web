import React, { useEffect, useState } from 'react';
import { Divider, FilledInput, IconButton, colors } from '@mui/material';
import { Clear, Search } from '@material-ui/icons';
import { useDebounce } from 'utils';

/**
 * The search-bar that sits in the middle of the navigation bar. Fires events when the user
 * searches via calling `onSearch`.
 */
export default function SearchBar({
  defaultSearchText,
  textColor,
  backgroundColor,
  autoSearchOnChange = false,
  autoSearchDelay = 500,
  onSearch = () => {},
  maxWidth,
  focusHoverColor,
  placeholderText,
  borderRadiusRatio = '4px',
  fontSize,
  clearIconColor,
  searchIconColor,
  hideSearchIcon = false,
}) {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, autoSearchDelay);

  useEffect(() => defaultSearchText && setSearchText(defaultSearchText), [defaultSearchText]);

  useEffect(() => {
    if (autoSearchOnChange && debouncedSearchText.trim()) onSearch?.(debouncedSearchText, true);
  }, [debouncedSearchText]);

  return (
    <FilledInput
      fullWidth
      placeholder={placeholderText}
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onSearch?.(searchText, false)}
      inputProps={{ style: { padding: '10px 20px' } }}
      sx={{
        maxWidth: maxWidth,
        borderRadius: borderRadiusRatio,
        color: textColor,
        fontSize: fontSize,
        backgroundColor: backgroundColor,
        '&:hover, &.Mui-focused': { backgroundColor: focusHoverColor },
        '::before, ::after': { display: 'none' },
      }}
      endAdornment={
        <>
          {!!searchText && (
            <>
              <IconButton
                sx={{ color: clearIconColor || 'text.disabled' }}
                onClick={() => setSearchText('')}
              >
                <Clear />
              </IconButton>
              <Divider
                orientation='vertical'
                variant='middle'
                sx={{
                  borderColor: clearIconColor || 'text.disabled',
                  opacity: 0.5,
                  marginLeft: '4px',
                  marginRight: '8px',
                  display: hideSearchIcon && 'none',
                }}
                flexItem
              />
            </>
          )}
          <IconButton
            sx={{
              color: searchIconColor || 'text.disabled',
              display: hideSearchIcon && 'none',
            }}
            onClick={() => onSearch?.(searchText, false)}
          >
            <Search />
          </IconButton>
        </>
      }
    />
  );
}
