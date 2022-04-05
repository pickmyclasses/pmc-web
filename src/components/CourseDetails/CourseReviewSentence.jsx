import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const lowerCaseAllWordsExceptFirstLetters = (string) =>
  string.replaceAll(/\S*/g, (word) => `${word.slice(0, 1)}${word.slice(1).toLowerCase()}`);

export default function CourseReviewSentence({ review }) {
  let hourSpent;
  if (review.hourSpent === 0) {
    hourSpent = 'Less than expected';
  } else if (review.hourSpent === 1) {
    hourSpent = 'About the same';
  } else {
    hourSpent = 'More than expected';
  }

  return (
    <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
      <Typography variant='body2'>Expected Study time - {hourSpent}</Typography>
      <Typography variant='body2'>
        Grade Received - {review.gradeReceived ? review.gradeReceived : 'N/A'}
      </Typography>
      <Typography variant='body2'>
        Is Exam Heavy - {review.isExamHeavy ? 'Yes' : 'No'}
      </Typography>
      <Typography variant='body2'>
        Is Homework Heavy - {review.isHomeworkHeavy ? 'Yes' : 'No'}
      </Typography>
      <Typography variant='body2'>
        Any extra credited - {review.extraCreditOffered ? 'Yes' : 'No'}
      </Typography>
      <Typography variant='body2'>
        Professor -{' '}
        {review.classProfessor
          ? lowerCaseAllWordsExceptFirstLetters(review.classProfessor)
          : 'No information available'}
      </Typography>
      <Typography variant='body2'>
        Semester -{' '}
        {review.classSemester
          ? review.classSemester.year + ' - ' + review.classSemester.season
          : 'No information available'}
      </Typography>
    </Box>
  );
}
