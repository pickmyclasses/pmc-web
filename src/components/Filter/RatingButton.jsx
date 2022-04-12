import { React, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

export default function RatingButton() {
  const [rating, setRating] = useState(0);
  const ratingOptions = [
    { val: 1, label: '1' },
    { val: 2, label: '2' },
    { val: 3, label: '3' },
    { val: 4, label: '4' },
    { val: 5, label: '5' },
  ];
  return (
    <MenuItem>
      <FormControl>
        <RadioGroup
          name='rating-buttons-group'
          value={rating}
          onChange={(event) => setRating(event.target.value)}
          row
        >
          {ratingOptions.map((rating, i) => {
            return (
              <FormControlLabel
                key={i}
                value={rating.val}
                control={<Radio />}
                label={rating.label}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
    </MenuItem>
  );
}
