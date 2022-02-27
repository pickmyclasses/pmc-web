import { React, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { isNumeric } from '../../utils';

library.add(fas);

export default function CreditButton() {
  const [maxCredit, setMaxCredit] = useState('');
  const [minCredit, setMinCredit] = useState('');

  const handleMaxCredit = (event) => {
    const newVal = event.target.value;
    isNumeric(event.target.value) ? setMaxCredit(newVal) : setMaxCredit('');
  };

  const handleMinCredit = (event) => {
    const newVal = event.target.value;
    isNumeric(event.target.value) ? setMinCredit(newVal) : setMinCredit('');
  };

  return (
    <>
      <MenuItem sx={{ maxWidth: 100 }}>
        <FormControl sx={{ width: '100%' }}>
          <OutlinedInput placeholder='min ' value={minCredit} onChange={handleMinCredit} />
        </FormControl>
      </MenuItem>
      <MenuItem sx={{ maxWidth: 100 }}>
        <FormControl sx={{ width: '100%' }}>
          <OutlinedInput placeholder='max' value={maxCredit} onChange={handleMaxCredit} />
        </FormControl>
      </MenuItem>
    </>
  );
}
