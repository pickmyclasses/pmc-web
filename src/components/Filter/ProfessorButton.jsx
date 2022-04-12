import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useMount } from '../../utils';
import { fetchProfessorList } from 'api';

export default function ProfessorButton({ optionSelected, setOptionSelected }) {
  const [professors, setProfessors] = useState([]);

  useMount(() => {
    fetchProfessorList().then(setProfessors);
  });

  return (
    <>
      <MenuItem>
        <Stack spacing={3} sx={{ width: 300 }}>
          <Autocomplete
            multiple
            options={professors}
            getOptionLabel={(option) => {
              return option?.professorName;
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
        <Button variant='contained' sx={{ width: '100%' }}>
          Include
        </Button>
      </MenuItem>
    </>
  );
}
