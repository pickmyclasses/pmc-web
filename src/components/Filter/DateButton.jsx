import { React, useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function DateButton({ optionSelected, setOptionSelected }) {
  const [check, setCheck] = useState([]);

  useEffect(() => {
    setCheck(optionSelected);
  }, [optionSelected]);

  const dateOptions = [
    { id: 1, name: 'Mon' },
    { id: 2, name: 'Tue' },
    { id: 3, name: 'Wed' },
    { id: 4, name: 'Thu' },
    { id: 5, name: 'Fri' },
  ];

  const handleToggle = (id) => {
    const curIdx = check.indexOf(id);
    const newChecked = [...check];
    curIdx === -1 ? newChecked.push(id) : newChecked.splice(curIdx, 1);
    setCheck(newChecked);
    setOptionSelected(newChecked);
  };

  return (
    <>
      {dateOptions.map((date) => {
        return (
          <MenuItem key={date.id}>
            <FormControlLabel
              control={
                <Checkbox
                  size='small'
                  checked={check.indexOf(date.id) === -1 ? false : true}
                  onChange={() => handleToggle(date.id)}
                />
              }
              label={date.name}
            />
          </MenuItem>
        );
      })}
    </>
  );
}
