import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function CourseComments({ title, comment, isPositive }) {
  return (
    <Box
      sx={{
        fontFamily: 'Segoe UI Emoji',
      }}
    >
      <Typography variant='body1' gutterBottom color='seconday'>
        {title}
      </Typography>
      <Typography variant='body1' gutterBottom>
        {comment}
      </Typography>
    </Box>
  );
}
