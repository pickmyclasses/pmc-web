import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function CourseComments({ title, comment }) {
  return (
    <Box>
      <Typography variant='body1' gutterBottom color='secoonday'>
        {title}
      </Typography>
      <Typography variant='body1' gutterBottom>
        '{comment}'
      </Typography>
    </Box>
  );
}
