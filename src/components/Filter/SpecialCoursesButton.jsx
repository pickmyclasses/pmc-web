import { React, useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function SpecialCoursesButton({ optionSelected, setOptionSelected }) {
  const [checked, setChecked] = useState([]);

  const checkOptions = [
    { id: 1, name: 'graduate level courses' },
    { id: 2, name: 'undergraduate level courses' },
  ];

  useEffect(() => {
    setChecked(optionSelected);
  }, [optionSelected]);

  const handleToggle = (id) => {
    const curIdx = checked.indexOf(id);
    const newChecked = [...checked];
    curIdx === -1 ? newChecked.push(id) : newChecked.splice(curIdx, 1);
    setChecked(newChecked);
    setOptionSelected(newChecked);
  };

  return (
    <>
      {checkOptions.map((check) => {
        return (
          <MenuItem key={check.id}>
            <FormControlLabel
              control={
                <Checkbox
                  size='small'
                  checked={checked.indexOf(check.id) === -1 ? false : true}
                />
              }
              label={check.name}
              onChange={() => handleToggle(check.id)}
            />
          </MenuItem>
        );
      })}
    </>
  );
}
