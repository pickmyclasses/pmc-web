import { React, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function TypeButton({ setOptionSelected }) {
  const [checked, setChecked] = useState([]);

  const checkOptions = [
    { id: 1, name: 'Online offerings' },
    { id: 2, name: 'In person offerings' },
    { id: 3, name: 'Hybrid offerings' },
  ];

  const handleToggle = () => {

  }

  return (
    <>
      {checkOptions.map((check) => {
        return (
          <MenuItem key={check.id}>
            <FormControlLabel
              control={
                <Checkbox size='small' checked onChange={handleToggle} />
              }
              label={check.name}
            />
          </MenuItem>
        );
      })}
    </>
  );
}
