import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function CourseComments({ title, comments }) {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <Typography variant='body1' gutterBottom>
        {comments}
      </Typography>
    </Box>
  );
}
