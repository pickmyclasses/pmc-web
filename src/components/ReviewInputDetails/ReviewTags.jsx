import React from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { ArrowCircleUp } from '@mui/icons-material';
import { gridSpacing } from '../../constants/constants';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
const filter = createFilterOptions();

export default function ReviewTags({ tags, tagsLabel, tagSuggestion, onChange }) {
  // TODO: remove this when I can read from the back-end
  return (
    <Grid container spacing={gridSpacing}>
      <Grid
        item
        xs={12}
        sm={12}
        container
        direction='column'
        alignItems='center'
        justifyContent='center'
      >
        <Typography variant='h6' gutterBottom>
          {tagsLabel}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <ArrowCircleUp sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Autocomplete
            multiple
            selectOnFocus
            limitTags={8}
            id='multiple-limit-tags'
            options={tagSuggestion}
            getOptionLabel={(option) => {
              // Select from the dropdown options
              if (option.inputValue) {
                return option.inputValue;
              }
              // Select from the newly created name
              return option.name;
            }}
            onChange={(e, value) => {
              onChange(value);
            }}
            renderInput={(params) => (
              <TextField {...params} label={'words'} placeholder='Input' />
            )}
            sx={{ width: '700px' }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some((option) => inputValue === option.name);
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  name: params.inputValue,
                });
              }
              return filtered;
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
