import { React, useState, useEffect, useContext } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { userSelectionContext } from './FilterVerticalContainer';

library.add(fas);

export default function TypeButton({ setOptionSelected }) {
  const [onlineChecked, setOnlineChecked] = useState(true);
  const [offlineChecked, setOfflineChecked] = useState(true);
  const [hybridChecked, setHybridChecked] = useState(true);

  const { setSelection } = useContext(userSelectionContext);

  useEffect(() => {
    setSelection(onlineChecked);
    !onlineChecked || !offlineChecked || !hybridChecked
      ? setOptionSelected(true)
      : setOptionSelected(false);
  }, [onlineChecked, offlineChecked, hybridChecked, setOptionSelected, setSelection]);

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
