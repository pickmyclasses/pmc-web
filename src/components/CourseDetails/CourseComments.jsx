import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function CourseComments({ title, comment, isPositive }) {
  return (
    <Typography variant='body1' gutterBottom color='seconday'>
      <Box sx={{ fontWeight: 'bold' }}>{title}</Box>
      <Box>{comment}</Box>
    </Typography>
  );
}
