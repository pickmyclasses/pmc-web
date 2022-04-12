import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { fetchTagList } from '../../api';
import { useMount } from '../../utils';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function TagButton() {
  const [tags, setTags] = useState([]);

  useMount(() => {
    fetchTagList().then(setTags);
  });

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
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </MenuItem>
      <MenuItem>
        <Button variant='contained' sx={{ width: '100%' }}>
          Clear
        </Button>
      </MenuItem>
    </>
  );
}
