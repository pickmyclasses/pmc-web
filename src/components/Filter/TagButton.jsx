import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { fetchTagList } from '../../api';
import { useMount } from '../../utils';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function TagButton({ optionSelected, setOptionSelected }) {
  const [tags, setTags] = useState([]);

  useMount(() => {
    fetchTagList().then(setTags);
  });

  const handleClear = () => {
    setOptionSelected([]);
  };

  return (
    <>
      <MenuItem>
        <Stack spacing={3} sx={{ width: 300 }}>
          <Autocomplete
            multiple
            options={tags}
            getOptionLabel={(option) => {
              return option?.name;
            }}
            value={optionSelected}
            onChange={(event, value) => setOptionSelected(value)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </MenuItem>
      <MenuItem>
        <Button variant='contained' sx={{ width: '100%' }} onClick={handleClear}>
          Clear
        </Button>
      </MenuItem>
    </>
  );
}
