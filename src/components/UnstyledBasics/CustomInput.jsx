import { React, forwardRef } from 'react';
import InputUnstyled from '@mui/base/InputUnstyled';
import { styled } from '@mui/system';
import { grey, blue } from '@mui/material/colors';

const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 5em;
  font-size: 0.875rem;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.1em;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }
`
);

const RawInput = forwardRef(function RawInput(props, ref) {
  return <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />;
});

export const CustomInput = ({ label, placeholder }) => {
  return <RawInput aria-label={label} placeholder={placeholder} />;
};
