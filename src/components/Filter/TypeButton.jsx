import { React, useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export default function TypeButton({ setOptionSelected }) {
  const [onlineChecked, setOnlineChecked] = useState(true);
  const [offlineChecked, setOfflineChecked] = useState(true);
  const [hybridChecked, setHybridChecked] = useState(true);

  useEffect(() => {
    !onlineChecked || !offlineChecked || !hybridChecked
      ? setOptionSelected(true)
      : setOptionSelected(false);
  }, [onlineChecked, offlineChecked, hybridChecked, setOptionSelected]);

  return (
    <>
      <MenuItem>
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={onlineChecked}
              onChange={() => setOnlineChecked(!onlineChecked)}
            />
          }
          label={'Online offerings'}
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={offlineChecked}
              onChange={() => setOfflineChecked(!offlineChecked)}
            />
          }
          label={'In-person offerings'}
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          control={
            <Checkbox
              size='small'
              checked={hybridChecked}
              onChange={() => setHybridChecked(!hybridChecked)}
            />
          }
          label={'Hybrid offerings'}
        />
      </MenuItem>
    </>
  );
}
