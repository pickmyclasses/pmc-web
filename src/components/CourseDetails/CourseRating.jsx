import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

export default function TextRating({ value }) {
  return (
    <Box>
      <Rating
        name='text-feedback'
        value={value}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.75 }} fontSize='inherit' />}
      />
      {/* TODO:better alignment with the rating */}
      <Box component='span'>{value}</Box>
    </Box>
  );
}
