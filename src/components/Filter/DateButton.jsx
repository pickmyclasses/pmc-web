import { React, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function DateButton() {
  const [monSelected, setMonSelected] = useState(true);
  const [tueSelected, setTueSelected] = useState(true);
  const [wedSelected, setWedSelected] = useState(true);
  const [thurSelected, setThurSelected] = useState(true);
  const [friSelected, setFriSelected] = useState(true);

  return (
    <>
      <MenuItem>
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={monSelected}
              onChange={(event) => setMonSelected(event.target.checked)}
            />
          }
          label={'Mon'}
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={tueSelected}
              onChange={(event) => setTueSelected(event.target.checked)}
            />
          }
          label={'Tue'}
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={wedSelected}
              onChange={(event) => setWedSelected(event.target.checked)}
            />
          }
          label={'Wed'}
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={thurSelected}
              onChange={(event) => setThurSelected(event.target.checked)}
            />
          }
          label={'Thur'}
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={friSelected}
              onChange={(event) => setFriSelected(event.target.checked)}
            />
          }
          label={'Fri'}
        />
      </MenuItem>
    </>
  );
}
