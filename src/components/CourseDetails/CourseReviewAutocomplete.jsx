import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function CourseReviewAutocomplete({ autocompleteType }) {
  return (
    <Autocomplete
      multiple
      limitTags={4}
      id='multiple-limit-tags'
      options={topCourseTags}
      getOptionLabel={(option) => option.title}
      defaultValue={[topCourseTags[1], topCourseTags[2], topCourseTags[3]]}
      renderInput={(params) => (
        <TextField {...params} label={autocompleteType} placeholder='Input' />
      )}
      sx={{ width: '500px' }}
    />
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
