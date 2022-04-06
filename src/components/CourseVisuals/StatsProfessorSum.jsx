import { Stack, Typography, Box } from '@mui/material';
import { formatInstructorName } from 'utils';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

function sortBy(field) {
  return function (a, b) {
    return (a[field] < b[field]) - (a[field] > b[field]);
  };
}

function getTopRatedInstructors(reviews, num) {
  let instructors = [];
  let instructorRatings = [];
  let instructorInfo = [];
  reviews.sort(sortBy('rating'));
  for (let i = 0; i < reviews.length; i++) {
    instructors.push(reviews[i].classProfessor);
    instructorRatings.push(reviews[i].rating);
  }
  instructorInfo.push(instructors.slice(0, num));
  instructorInfo.push(instructorRatings.slice(0, num));
  return instructorInfo;
}

export default function StatsProfessorSum({ reviews }) {
  let instructorInfo = getTopRatedInstructors(reviews, 3);
  let topInstructors = instructorInfo[0];
  let topInstructorRatings = instructorInfo[1];
  console.log(instructorInfo);
  return (
    <Box padding='8px 8px 4px'>
      {topInstructors.map((instructor, i) => (
        <Stack>
          <Typography variant='subtitle1'>{formatInstructorName(instructor)}</Typography>

          <Stack direction='row' spacing={1}>
            <Typography variant='caption' marginTop='-4px' sx={{ opacity: 0.75 }}>
              Associate Professor
            </Typography>
            <Rating
              name='text-feedback'
              value={topInstructorRatings[i]}
              readOnly
              size='small'
              precision={0.1}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
            />
          </Stack>
        </Stack>
      ))}
    </Box>
  );
}
