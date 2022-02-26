import { React, useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export default function RatingButton({ setOptionSelected }) {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setOptionSelected(true);
  }, [rating, setOptionSelected]);

  return (
    <MenuItem>
      <FormControl>
        <RadioGroup
          name='rating-buttons-group'
          value={rating}
          onChange={(event) => setRating(event.target.value)}
          row
        >
          <FormControlLabel value={1} control={<Radio />} label={'1'} />
          <FormControlLabel value={2} control={<Radio />} label={'2'} />
          <FormControlLabel value={3} control={<Radio />} label={'3'} />
          <FormControlLabel value={4} control={<Radio />} label={'4'} />
          <FormControlLabel value={5} control={<Radio />} label={'5'} />
        </RadioGroup>
      </FormControl>
    </MenuItem>
  );
}
