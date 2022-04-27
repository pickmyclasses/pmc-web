import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Rating,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  MenuItem,
  Select,
  Button,
  Link,
} from '@mui/material';
import { UserContext } from 'App';
import { CourseContext } from '../../pages/CoursePage';
import ReviewTags from '../ReviewInputDetails/ReviewTags';
import ReviewDropdownSemester from '../ReviewInputDetails/ReviewDropdownSemester';
import ReviewDropdownProfessor from '../ReviewInputDetails/ReviewDropdownProfessor';
import { ReactComponent as Heart } from '../../assets/care.svg';
import { fetchTagList, postReview } from 'api';
import { useSnackbar } from 'notistack';
import PreventableLink from 'components/PreventableNavigation/PreventableLink';

export const ProposalCard = ({
  hasTaken = false,
  currentlyTaking = false,
  hasWrittenReviews = false,
  setOpenComposer,
}) => {
  const handleClick = () => {
    setOpenComposer(true);
  };

  let message = "Oops, seems like you haven't taken the course yet, ";
  if (currentlyTaking) {
    message =
      'Seems like you are currently taking the course, we are sorry but you will need to finish the course before you can review the course';
  }
  if (hasTaken) {
    message = 'Welcome! Want to share your thoughts on the course with other students?';
  }
  if (hasWrittenReviews) {
    message =
      'Welcome back! Hope you are having a good day! Do you want to edit your review for the course?';
  }

  return (
    <Card sx={{ width: '100%', bgcolor: '#fffffe', textAlign: 'center', color: '#172c66' }}>
      <CardContent>
        <Typography variant='body1' component={'legend'}>
          {message}{' '}
          {!currentlyTaking && !hasTaken && !hasWrittenReviews && (
            <Link sx={{ color: '#172c66' }} component={PreventableLink} to='/profile/history'>
              {' '}
              go add this course to yours schedule now?
            </Link>
          )}
        </Typography>
        <Button
          variant='contained'
          size='small'
          onClick={handleClick}
          sx={{ marginTop: '1%' }}
          disabled={!hasTaken && !hasWrittenReviews}
        >
          {hasWrittenReviews ? 'Go edit your review' : 'Go write a review!'}
        </Button>
      </CardContent>
    </Card>
  );
};

export const ComposerCard = ({
  extraInfoNeeded = true,
  setOpenComposer,
  hasWrittenReview = false,
  reviewContent = null,
}) => {
  const { user } = useContext(UserContext);
  const { course, professors, semesters, refreshCourseData } = useContext(CourseContext);

  const [tagList, setTagList] = useState([]);
  const [rating, setRating] = useState(3);
  const [examHeavy, setExamHeavy] = useState(false);
  const [homeworkHeavy, setHomeworkHeavy] = useState(false);
  const [spentHour, setSpentHour] = useState(0);
  const [grade, setGrade] = useState('A');
  const [comment, setComment] = useState('');

  const [tags, setTags] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedProfessor, setSelectedProfessor] = useState('');
  const [recommended, setRecommended] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (hasWrittenReview) {
      setRating(reviewContent.rating);
      setExamHeavy(reviewContent.isExamHeavy);
      setHomeworkHeavy(reviewContent.isHomeworkHeavy);
      setSpentHour(reviewContent.hourSpent);
      setGrade(reviewContent.gradeReceived);
      setComment(reviewContent.comment);
      setSelectedProfessor(reviewContent.classProfessor);
      setSelectedSemester(reviewContent.classSemester);
    }

    fetchTagList().then((data) => setTagList(data));
  }, []);

  const postNonAnonymousReview = () => {
    postCourseReview(false);
  };

  const postAnonymousReview = () => {
    postCourseReview(true);
  };

  const handleGoBack = () => {
    setOpenComposer(false);
  };

  const postCourseReview = (anonymous = true) => {
    let tagContents = [];
    for (let tag of tags) tagContents.push(tag.name);
    const body = {
      rating: rating,
      anonymous: anonymous,
      recommended: recommended === 'true',
      tags: tagContents,
      comment: comment,
      courseID: course.id,
      userID: user.userID,
      username: user.name,
      hourSpent: parseInt(spentHour),
      gradeReceived: grade,
      isExamHeavy: examHeavy === 'true',
      isHomeworkHeavy: homeworkHeavy === 'true',
      //TODO: maybe fix this
      extraCreditOffered: false,
      classSemester: {
        collegeName: selectedSemester.collegeName,
        year: selectedSemester.year,
        season: selectedSemester.season,
      },
      classProfessor: selectedProfessor.professorName,
    };

    postReview(course.id, body)
      .then(() => {
        refreshCourseData(course.id);
        enqueueSnackbar(snackBarMessage.reviewSuccess.message, {
          variant: snackBarMessage.reviewSuccess.variant,
        });
        setOpenComposer(false);
      })
      .catch((error) => {
        if (error.response) {
          enqueueSnackbar(snackBarMessage.lackAnswers.message, {
            variant: snackBarMessage.lackAnswers.variant,
          });
        } else {
          enqueueSnackbar(snackBarMessage.error.message + error, {
            variant: snackBarMessage.error.variant,
          });
        }
      });
  };
  const homeworkOptions = [
    {
      value: true,
      label: 'Yes',
    },
    {
      value: false,
      label: 'No',
    },
  ];

  const examOptions = [
    {
      value: true,
      label: 'Yes',
    },
    {
      value: false,
      label: 'No',
    },
  ];

  const spentHoursOptions = [
    {
      value: 0,
      label: 'less',
    },
    {
      value: 1,
      label: 'as expected',
    },
    {
      value: 2,
      label: 'more',
    },
  ];

  const gradeReceivedOptions = [
    {
      value: 'A',
      label: 'A',
    },
    {
      value: 'A-',
      label: 'A-',
    },
    {
      value: 'B+',
      label: 'B+',
    },
    {
      value: 'B',
      label: 'B',
    },
    {
      value: 'B-',
      label: 'B-',
    },
    {
      value: 'C+',
      label: 'C+',
    },
    {
      value: 'C',
      label: 'C',
    },
    {
      value: 'C-',
      label: 'C-',
    },
    {
      value: 'D+',
      label: 'D+',
    },
    {
      value: 'D',
      label: 'D',
    },
    {
      value: 'D-',
      label: 'D-',
    },
    {
      value: 'E',
      label: 'E',
    },
    {
      value: 'F',
      label: 'F',
    },
  ];

  const recommendationOptions = [
    {
      value: true,
      label: 'Yes! ',
    },
    {
      value: false,
      label: 'No! ',
    },
  ];

  return (
    <Card sx={{ height: '100%', width: '100%', bgcolor: '#fffffe' }}>
      <CardContent>
        <Box sx={{ textAlign: 'center', fontSize: '1.7em', color: '#001858', marginTop: '3%' }}>
          <b>Share your thoughts on {course.title} with other students!</b>{' '}
          <Heart style={{ height: '1em' }} />
        </Box>
        <Box sx={{ marginTop: '2em', textAlign: 'center', color: '#172c66' }}>
          <Typography component={'legend'} variant={'h6'} style={{ marginTop: '1%' }}>
            * Does the course have too much homework?
          </Typography>
          <RadioButtonGroup
            radioOptions={homeworkOptions}
            value={homeworkHeavy}
            setValue={setHomeworkHeavy}
          />
          <Typography component={'legend'} variant={'h6'} style={{ marginTop: '1%' }}>
            * Does the course have too many exams?
          </Typography>
          <RadioButtonGroup radioOptions={examOptions} setValue={setExamHeavy} />
          <Typography component={'legend'} variant={'h6'} style={{ marginTop: '1%' }}>
            * This {course.maxCredit} credit course requires about {course.maxCredit * 3} hours
            of work per week, is it true?
          </Typography>
          <RadioButtonGroup radioOptions={spentHoursOptions} setValue={setSpentHour} />
          <Typography component={'legend'} variant={'h6'} style={{ marginTop: '1%' }}>
            What grade did you get from the course?
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              onChange={(event) => {
                setGrade(event.target.value);
              }}
              value={grade}
            >
              {gradeReceivedOptions.map((grade) => (
                <MenuItem key={grade.value} value={grade.value}>
                  {grade.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography
            component={'legend'}
            variant={'h6'}
            style={{ marginTop: '3%', marginBottom: '1%' }}
          >
            How would you describe this course?
          </Typography>
          <ReviewTags
            tagSuggestion={tagList}
            onChange={(tags) => {
              setTags(tags);
            }}
            showArrow={false}
            label={'tags'}
            width={'20vw'}
          />
          <Typography
            component={'legend'}
            variant={'h6'}
            style={{ marginTop: '3%', marginBottom: '1%' }}
          >
            Is there anything else you want to share about the course or the professor?
          </Typography>
          <TextField
            multiline
            rows={5}
            sx={{ width: '60%' }}
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />

          {extraInfoNeeded && (
            <>
              <Typography
                component={'legend'}
                variant={'h6'}
                sx={{ marginTop: '3em', marginBottom: '1em' }}
              >
                * When did you take the course and with which professor?
              </Typography>
              <Box sx={{ display: 'inline-block' }}>
                <ReviewDropdownSemester
                  options={semesters}
                  value={selectedSemester}
                  onChange={(semester) => {
                    setSelectedSemester(semester);
                  }}
                />
                {/* this is the stupidest thing ever */}
                &nbsp; &nbsp;&nbsp; &nbsp;
                <ReviewDropdownProfessor
                  options={professors}
                  value={selectedProfessor}
                  onChange={(professor) => {
                    setSelectedProfessor(professor);
                  }}
                />
              </Box>
            </>
          )}
          <Box sx={{ marginTop: '2em' }}>
            <Typography variant='h6' style={{ marginTop: '1%', marginBottom: '2%' }}>
              * How do you like this course overall?
            </Typography>
            <CourseRating rating={rating} setRating={setRating} />
          </Box>

          <Box sx={{ marginTop: '2em' }}>
            <Typography variant='h6' style={{ marginTop: '1%', marginBottom: '2%' }}>
              * Would you recommend this course to other students?
            </Typography>
            <RadioButtonGroup radioOptions={recommendationOptions} setValue={setRecommended} />
          </Box>

          <Box sx={{ marginTop: '3em' }}>
            <Button
              variant='contained'
              size='large'
              sx={{ marginRight: '5%' }}
              onClick={postNonAnonymousReview}
            >
              post as {user.name}
            </Button>
            <Button variant='contained' size='large' onClick={postAnonymousReview}>
              post anonymously
            </Button>
          </Box>

          <Link
            component='button'
            variant='body1'
            sx={{ marginTop: '3em' }}
            onClick={handleGoBack}
          >
            I will come back and review later
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

const CourseRating = ({ rating, setRating }) => {
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating
        value={rating}
        onChange={(event, newValue) => {
          if (newValue) setRating(newValue);
        }}
        precision={1}
        size={'large'}
      />
    </Box>
  );
};

const RadioButtonGroup = ({ radioOptions, setValue }) => {
  return (
    <FormControl>
      <RadioGroup row>
        {radioOptions.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
            onChange={(event) => {
              if (event.target?.value) setValue(event.target?.value);
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

const snackBarMessage = {
  error: { message: 'Error : ', variant: 'error' },

  lackAnswers: {
    message: 'You have questions unanswered',
    variant: 'warning',
  },
  reviewSuccess: {
    message: 'Thank you for doing this! You review will help the future student! Bravo!',
    variant: 'success',
  },
};
