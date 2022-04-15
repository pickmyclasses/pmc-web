import { React, useEffect, useState, useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FilterContext } from 'pages/SearchPage';

export default function TypeButton({ optionSelected, setOptionSelected }) {
  const [checked, setChecked] = useState([]);
  const { onlineOffering, setOnlineOffering } = useContext(FilterContext);

  useEffect(() => {
    setChecked(optionSelected);
  }, [optionSelected]);

  const checkOptions = [{ id: 1, name: 'Online offerings' }];

  const handleToggle = (id) => {
    const curIdx = checked.indexOf(id);
    const newChecked = [...checked];
    curIdx === -1 ? newChecked.push(id) : newChecked.splice(curIdx, 1);
    setChecked(newChecked);
    setOptionSelected(newChecked);
    setOnlineOffering(!onlineOffering);
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
