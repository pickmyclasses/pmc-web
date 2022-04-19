import { Stack, Typography, Avatar } from '@mui/material';
import { formatInstructorName, getColorByString, getInitials } from 'utils';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

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

// Visualize the professor overall performance based on the student's reviews
export default function StatsProfessorSum({ professorRanking }) {
  let instructorInfo = getTopRatedInstructors(professorRanking, 3);
  let topInstructors = instructorInfo[0];
  let topInstructorRatings = instructorInfo[1];
  return (
    <Stack paddingY='12px' spacing='16px'>
      {topInstructors.map((instructor, i) => (
        <Stack
          key={instructor}
          direction='row'
          justifyContent='space-between'
          width='100%'
          alignItems='center'
        >
          <Stack direction='row' alignItems='center' spacing='8px'>
            <Avatar sx={{ backgroundColor: getColorByString(instructor), fontSize: '1rem' }}>
              {getInitials(instructor)}
            </Avatar>
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
