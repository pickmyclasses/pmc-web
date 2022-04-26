import React, { useContext, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useMount } from '../../utils';
import { fetchProfessorList } from 'api';
import { FilterContext } from 'pages/SearchPage';

export default function ProfessorButton({ optionSelected, setOptionSelected }) {
  const [professors, setProfessors] = useState([]);
  const { setIncludedProfessors } = useContext(FilterContext);

  useMount(() => {
    fetchProfessorList().then(setProfessors);
  });

  const handleSelect = (event, value) => {
    setOptionSelected(value);
    setIncludedProfessors(value);
  };

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
            onChange={handleSelect}
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
