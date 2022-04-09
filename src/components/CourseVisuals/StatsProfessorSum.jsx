import { Stack, Typography, Box, Avatar, Grid } from '@mui/material';
import { formatInstructorName } from 'utils';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 28,
      height: 28,
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}
function getTopRatedInstructors(professorRanking, num) {
  let instructors = [];
  let instructorRatings = [];
  let instructorInfo = [];
  for (let i = 0; i < professorRanking.length; i++) {
    instructors.push(professorRanking[i].name);
    instructorRatings.push(professorRanking[i].rating);
  }
  instructorInfo.push(instructors.slice(0, num));
  instructorInfo.push(instructorRatings.slice(0, num));
  return instructorInfo;
}

export default function StatsProfessorSum({ professorRanking }) {
  let instructorInfo = getTopRatedInstructors(professorRanking, 3);
  let topInstructors = instructorInfo[0];
  let topInstructorRatings = instructorInfo[1];
  return (
    <Stack padding='10px 10px' spacing='16px'>
      {topInstructors.map((instructor, i) => (
        <Stack direction='row' justifyContent='space-between' width='100%' alignItems='center'>
          <Stack direction='row' alignItems='center' spacing='4px'>
            <Avatar {...stringAvatar(formatInstructorName(instructor))} />
            <Stack>
              <Typography variant='body2'>{formatInstructorName(instructor)}</Typography>
              <Typography variant='caption' sx={{ opacity: 0.75 }}>
                Associate Professor
              </Typography>
            </Stack>
          </Stack>
          <Rating
            name='text-feedback'
            value={topInstructorRatings[i]}
            readOnly
            size='small'
            precision={0.1}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize='inherit' />}
          />
        </Stack>
      ))}
    </Stack>
  );
}
