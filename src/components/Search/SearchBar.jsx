import React, { useState } from 'react';
import { Divider, FilledInput, IconButton, colors, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Clear, Search } from '@material-ui/icons';

/**
 * The search-bar that sits in the middle of the navigation bar. Fires events when the user
 * searches via calling `onSearchClick`.
 *
 * @param {{onSearchClick: (searchText: string) => void}} props
 */
// export default function SearchBar({ onSearchClick }) {
export default function SearchBar({
  textColor,
  backgroundColor,
  onSearch,
  maxWidth,
  focusHoverColor,
  placeholderText,
  borderRadiusRatio,
}) {
  const theme = useTheme();

  const [searchText, setSearchText] = useState('');

  return (
    <FilledInput
      fullWidth
      placeholder={placeholderText}
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onSearch(searchText)}
      inputProps={{ style: { padding: '10px 20px' } }}
      sx={{
        maxWidth: maxWidth,
        borderRadius: borderRadiusRatio,
        color: textColor,
        backgroundColor: backgroundColor,
        '&:hover, &.Mui-focused': { backgroundColor: focusHoverColor },
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
          <IconButton
            sx={{ color: colors.blue[300] }}
            onClick={function () {
              onSearch(searchText);
            }}
          >
            <Search />
          </IconButton>
        </>
      }
    />
  );
}
