import { React, useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function TypeButton({ optionSelected, setOptionSelected }) {
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    setChecked(optionSelected);
  }, [optionSelected]);

  const checkOptions = [
    { id: 1, name: 'Online offerings' },
    { id: 2, name: 'In person offerings' },
    { id: 3, name: 'Hybrid offerings' },
  ];

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
                  onChange={() => handleToggle(check.id)}
                />
              }
              label={check.name}
            />
          </MenuItem>
        );
      })}
    </>
  );
}
