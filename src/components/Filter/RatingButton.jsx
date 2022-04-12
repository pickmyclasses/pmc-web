import { React, useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

export default function RatingButton({ optionSelected, setOptionSelected }) {
  const [rating, setRating] = useState([0]);

  useEffect(() => {
    setRating(optionSelected);
  }, [optionSelected]);

  const ratingOptions = [
    { id: 1, val: 1, label: '1' },
    { id: 2, val: 2, label: '2' },
    { id: 3, val: 3, label: '3' },
    { id: 4, val: 4, label: '4' },
    { id: 5, val: 5, label: '5' },
  ];

  const handleToggle = (event) => {
    let newVal = Array.from(event.target.value);
    setRating(newVal);
    setOptionSelected(newVal);
  };

  return (
    <MenuItem>
      <FormControl>
        <RadioGroup
          name='rating-buttons-group'
          value={rating}
          onChange={(event) => handleToggle(event)}
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
