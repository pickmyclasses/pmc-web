import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
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
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { UserContext } from 'App';
import { CourseContext } from '../../pages/CoursePage';

export const CourseReviewComposerCard = () => {
  const { user } = useContext(UserContext);
  const { reviewTags, refreshCourseData, course } = useContext(CourseContext);
  const [rating, setRating] = useState(0);

  const homeworkOptions = [
    {
      value: 1,
      label: 'heavy',
    },
    {
      value: 0,
      label: 'not heavy',
    },
  ];

  const examOptions = [
    {
      value: 1,
      label: 'heavy',
    },
    {
      value: 0,
      label: 'not heavy',
    },
  ];

  const extraCreditOptions = [
    {
      value: true,
      label: 'yes',
    },
    {
      value: false,
      label: 'no',
    },
  ];

  const spentHoursOptions = [
    {
      value: 0,
      label: 'less than expected',
    },
    {
      value: 1,
      label: 'as expected',
    },
    {
      value: 2,
      label: 'more than expected',
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

  return (
    <Card sx={{ height: '100vh', width: '100%' }}>
      <CardContent>
        <Box sx={{ textAlign: 'center' }}>
          We just have a few questions for you, and this will help the future students! Let's do
          it!
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='h6'>Rate this course</Typography>
          <RatingHearts />
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography component={'legend'}>Does the course have a lot homeworks?</Typography>
          <RadioButtonGroup radioOptions={homeworkOptions} />
          <Typography component={'legend'}>Does the course have a lot exams?</Typography>
          <RadioButtonGroup radioOptions={examOptions} />
          <Typography component={'legend'}>Does the course offer extra credits?</Typography>
          <RadioButtonGroup radioOptions={extraCreditOptions} />
          <Typography component={'legend'}>
            In average, a 4 credit class requires about 20 hours/week, Do you think you have
            spent more time than that?
          </Typography>
          <RadioButtonGroup radioOptions={spentHoursOptions} />
          <Typography component={'legend'}>What grade did you get from the course?</Typography>
          <RadioButtonGroup radioOptions={gradeReceivedOptions} />
          <Typography component={'legend'}>
            Is there a good thing you want to tell us about the course? (you can pick from the
            previous tags or create you own)
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const RatingHearts = () => {
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <StyledRating
        defaultValue={3}
        getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
        precision={1}
        icon={<FavoriteIcon fontSize='large' />}
        emptyIcon={<FavoriteBorderIcon fontSize='large' />}
      />
    </Box>
  );
};

const RadioButtonGroup = ({ radioOptions }) => {
  return (
    <FormControl>
      <RadioGroup row>
        {radioOptions.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
