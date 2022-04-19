import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import GradingIcon from '@mui/icons-material/Grading';
import QuizIcon from '@mui/icons-material/Quiz';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import DateRangeIcon from '@mui/icons-material/DateRange';

const lowerCaseAllWordsExceptFirstLetters = (string) =>
  string.replaceAll(/\S*/g, (word) => `${word.slice(0, 1)}${word.slice(1).toLowerCase()}`);
const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
};
export default function CourseReviewSentence({ review }) {
  let hourSpent;
  if (review.hourSpent === 0) {
    hourSpent = 'Less than expected';
  } else if (review.hourSpent === 1) {
    hourSpent = 'As Expected';
  } else {
    hourSpent = 'More than expected';
  }

  return (
    <Box sx={{ padding: '12px 24px', '> *': { marginY: '12px !important' } }}>
      <List style={flexContainer} sx={{ bgcolor: 'background.paper' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <SupervisedUserCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            secondary='Professor'
            primary={
              review.classProfessor
                ? lowerCaseAllWordsExceptFirstLetters(review.classProfessor)
                : 'No information available'
            }
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <DateRangeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            secondary='Semester'
            primary={
              review.classSemester
                ? review.classSemester.year + ' - ' + review.classSemester.season
                : 'No information available'
            }
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AccessTimeFilledIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText secondary='Expected Study time ' primary={hourSpent} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <GradingIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            secondary='Grade Received'
            primary={review.gradeReceived ? review.gradeReceived : 'N/A'}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <QuizIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText secondary='Exam Heavy' primary={review.isExamHeavy ? 'Yes' : 'No'} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <HomeWorkIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            secondary='Homework Heavy'
            primary={review.isHomeworkHeavy ? 'Yes' : 'No'}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PlusOneIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            secondary='Extra Credit'
            primary={review.extraCreditOffered ? 'Yes' : 'No'}
          />
        </ListItem>
      </List>
    </Box>
  );
}
