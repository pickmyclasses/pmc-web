import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { grey, cyan } from '@mui/material/colors';

export default function DropdownButton({ name, children }) {
  const [clicked, setClicked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [optionSelected, setOptionSelected] = useState([]);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setClicked(!clicked);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttonStyleBeforeClick = {
    color: grey[900],
    backgroundColor: grey[100],
    '&:hover': {
      color: grey[50],
      backgroundColor: cyan[800],
    },
  };

  const buttonStyleAfterClick = {
    color: grey[50],
    backgroundColor: cyan[800],
    '&:hover': {
      color: grey[50],
      backgroundColor: cyan[800],
    },
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { optionSelected, setOptionSelected });
    }
    return child;
  });

  return (
    <>
      <Button
        variant='contained'
        sx={optionSelected.length === 0 ? buttonStyleBeforeClick : buttonStyleAfterClick}
        style={{ marginRight: '1%' }}
        onClick={handleClick}
      >
        <div style={{ textTransform: 'lowercase' }}> {name}</div>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={() => setClicked(!clicked)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {childrenWithProps}
      </Menu>
    </>
  );
}
