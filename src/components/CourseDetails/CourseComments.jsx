import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const renderComments = (title, comment, isPositive) => {
  if (isPositive) {
    return (
      <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
        <Typography variant='subtitle2'>{title}</Typography>
        <Typography variant='body2'>{comment}</Typography>
      </Box>
    );
  } else {
    return <></>;
  }
};

/**
 * Notification for the user writing a review
 *
 * @param title - the title for the commment
 * @param comment the content of the comment
 * @param isPositive whether the comment is positive or not
 */

export default function CourseComments({ title, comment }) {
  return <>{renderComments(title, comment, comment.length !== 0)}</>;
}
