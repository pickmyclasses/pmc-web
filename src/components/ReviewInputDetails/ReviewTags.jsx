import React from 'react';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { ArrowCircleUp } from '@mui/icons-material';
import { gridSpacing } from '../../constants/constants';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

export default function ReviewTags({ tags, onChange }) {
  // TODO: remove this when I can read from the back-end
  tags = [topCourseTags[1], topCourseTags[2], topCourseTags[3]];

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
          Key words that summarize this course:
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <ArrowCircleUp sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <Autocomplete
            multiple
            limitTags={4}
            id='multiple-limit-tags'
            options={topCourseTags}
            getOptionLabel={(option) => option.title}
            onChange={(event, values) => {
              tags = values;
              onChange(tags);
            }}
            defaultValue={[topCourseTags[1], topCourseTags[2], topCourseTags[3]]}
            renderInput={(params) => (
              <TextField {...params} label={'words'} placeholder='Input' />
            )}
            sx={{ width: '500px' }}
          />
        </Box>
        {/* <TextField
            id='outlined-multiline-flexible'
            fullWidth
            multiline
            rows={4}
            value={value}
            color='success'
            onChange={(event) => {
              onChange(event.target.value);
            }}
          /> */}
      </Grid>
    </Grid>
  );
}
const topCourseTags = [
  { title: 'Too many homeworks', count: 12 },
  { title: 'Hard', count: 4 },
  { title: 'Easy', count: 5 },
  { title: 'Useful', count: 2 },
  { title: 'Good organization', count: 14 },
  { title: 'Helpful TA', count: 2 },
  { title: 'Interesting lectures', count: 4 },
  { title: 'Useful lectures', count: 4 },
  { title: 'Good Organizations', count: 4 },
  { title: 'Friendly Lectures', count: 4 },
  { title: 'Interesting lab work', count: 4 },
];
