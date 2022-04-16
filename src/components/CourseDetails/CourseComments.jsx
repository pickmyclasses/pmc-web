import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
/**
 * Notification for the user writing a review
 *
 * @param title - the title for the commment
 * @param comment the content of the comment
 * @param isPositive whether the comment is positive or not
 */
export default function CourseComments({ title, comment, isPositive }) {
  return (
    <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
      <Typography variant='subtitle2'>{title}</Typography>
      <Typography variant='body2'>{comment}</Typography>
    </Box>
  );
}
