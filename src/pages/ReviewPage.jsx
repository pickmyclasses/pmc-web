import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, CircularProgress } from '@mui/material';
import { fetchCourseByID } from '../api';
import ReviewRatings from '../components/ReviewInputDetails/ReviewRatings';
import ReviewPros from '../components/ReviewInputDetails/ReviewPros';
import ReviewCons from '../components/ReviewInputDetails/ReviewCons';
import ReviewComments from '../components/ReviewInputDetails/ReviewComments';
import { useMount } from '../utils';
import { postReview } from '../../src/api/index';
import swal from 'sweetalert';
import ReviewAnonymous from '../components/ReviewInputDetails/ReviewAnonymous';
import ReviewRecommend from '../components/ReviewInputDetails/ReviewRecommend';
import ReviewRadioButtons from '../components/ReviewInputDetails/ReviewRadioButtons';

import { UserContext } from '../App';
import { Link } from 'react-router-dom';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function ReviewPage() {
  const [course, setCourse] = useState(null);
  const [ratingValue, setRatingValue] = useState(3);
  const [proValue, setProValue] = useState([]);
  const [conValue, setConValue] = useState([]);
  const [commentValue, setCommentValue] = useState('');
  const [anonymity, setAnonymity] = useState(false);
  const [recommendation, setRecommendation] = useState(false);
  const [HoursSpentMore, setHoursSpentMore] = useState(false);
  const [HoursSpentLess, setHoursSpentLess] = useState(false);
  const [GradeReceived, setGradeReceived] = useState('');
  const [IsExamHeavy, setExamHeavy] = useState(false);
  const [IsHomeworkHeavy, setHomeworkHeavy] = useState(false);
  const [ExtraCreditOffered, setExtraCreditOffered] = useState(false);
  let date = new Date();
  let createDateLocal = date.toLocaleDateString();
  const urlParams = useParams();
  const { user } = useContext(UserContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    if (activeStep === 3) {
      if (proValue.length === 0) {
        swal('Oops!', 'Please fill in the postive side of the course', 'error');
        return;
      }
      if (conValue.length === 0) {
        swal('Oops!', 'Please fill in the negative side of the course', 'error');
        return;
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useMount(() => fetchCourseByID(urlParams.id).then(setCourse));

  if (!course) {
    return (
      <Box sx={{ width: '100%', height: '100%', display: 'flex' }}>
        <CircularProgress sx={{ margin: 'auto' }} />
      </Box>
    );
  }
  const steps = [
    {
      label: 'Select Course Ratings',
      description: (
        <ReviewRatings
          course={course}
          value={ratingValue}
          onChange={(ratingValue) => {
            setRatingValue(ratingValue);
          }}
        />
      ),
    },
    {
      label: 'Comments on the postive and negative side of the course',
      description: (
        <Box>
          <ReviewPros
            value={proValue}
            onChange={(proValue) => {
              setProValue(proValue);
            }}
          />
          <ReviewCons
            value={conValue}
            onChange={(conValue) => {
              setConValue(conValue);
            }}
          />
        </Box>
      ),
    },
    {
      label: 'Tells us more about your experience',
      description: (
        <Box>
          <ReviewRadioButtons
            radioLabel={'Did you spend more time than expected?'}
            options={[
              { optionValue: false, optionLabel: 'No' },
              { optionValue: true, optionLabel: 'Yes' },
            ]}
            radioValue={HoursSpentMore}
            onChange={(HoursSpentMore) => {
              setHoursSpentMore(HoursSpentMore);
            }}
          />
          <ReviewRadioButtons
            radioLabel={'Did you spend less time than expected?'}
            options={[
              { optionValue: false, optionLabel: 'No' },
              { optionValue: true, optionLabel: 'Yes' },
            ]}
            radioValue={HoursSpentLess}
            onChange={(HoursSpentLess) => {
              setHoursSpentLess(HoursSpentLess);
            }}
          />
          <ReviewRadioButtons
            radioLabel={'Was there a lot of Homework?'}
            options={[
              { optionValue: false, optionLabel: 'No' },
              { optionValue: true, optionLabel: 'Yes' },
            ]}
            radioValue={IsHomeworkHeavy}
            onChange={(IsHomeworkHeavy) => {
              setHomeworkHeavy(IsHomeworkHeavy);
            }}
          />
          <ReviewRadioButtons
            radioLabel={'Were there a lot of Exams?'}
            options={[
              { optionValue: false, optionLabel: 'No' },
              { optionValue: true, optionLabel: 'Yes' },
            ]}
            radioValue={IsExamHeavy}
            onChange={(IsExamHeavy) => {
              setExamHeavy(IsExamHeavy);
            }}
          />
          <ReviewRadioButtons
            radioLabel={'Extra credited?'}
            options={[
              { optionValue: false, optionLabel: 'No' },
              { optionValue: true, optionLabel: 'Yes' },
            ]}
            radioValue={ExtraCreditOffered}
            onChange={(ExtraCreditOffered) => {
              setExtraCreditOffered(ExtraCreditOffered);
            }}
          />
          <ReviewRadioButtons
            radioLabel={'Grade Received'}
            options={[
              { optionValue: 'A', optionLabel: 'A' },
              { optionValue: 'B', optionLabel: 'B' },
              { optionValue: 'C', optionLabel: 'C' },
              { optionValue: 'D', optionLabel: 'D' },
              { optionValue: 'F', optionLabel: 'F' },
            ]}
            radioValue={GradeReceived}
            onChange={(GradeReceived) => {
              setGradeReceived(GradeReceived);
            }}
          />
        </Box>
      ),
    },
    {
      label: 'Additional Comments on the course',
      description: (
        <ReviewComments
          value={commentValue}
          onChange={(commentValue) => {
            setCommentValue(commentValue);
          }}
        />
      ),
    },
  ];
  return (
    <Box sx={{ maxWidth: 1400 }}>
      <ReviewAnonymous
        userName={user.name}
        value={anonymity}
        onChange={(anonymity) => {
          setAnonymity(anonymity);
        }}
      />
      <ReviewRecommend
        value={recommendation}
        onChange={(recommendation) => {
          setRecommendation(recommendation);
        }}
      />{' '}
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 3 ? <Typography variant='caption'>Last step</Typography> : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 9 }}>
                <div>
                  <Button variant='contained' onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Link to={`/course/${course.id}/`} style={{ textDecoration: 'none' }}>
            <Button
              variant='contained'
              onClick={() => {
                swal('Good job!', 'You submitted the review!', 'success');

                postReview(course.id, {
                  rating: ratingValue,
                  anonymous: anonymity,
                  recommended: recommendation,
                  pros: proValue,
                  cons: conValue,
                  comment: commentValue,
                  courseID: course.id,
                  userID: user.userID,
                  username: user.name,
                  //createdAt: createDateLocal,
                  likedCount: 0,
                  dislikedCount: 0,
                  hourSpentMoreThanCredit: HoursSpentMore,
                  hourSpentLessThanCredit: HoursSpentLess,
                  gradeReceived: GradeReceived,
                  isExamHeavy: IsExamHeavy,
                  isHomeworkHeavy: IsHomeworkHeavy,
                  extraCreditOffered: ExtraCreditOffered,
                });
              }}
            >
              Submit
            </Button>
          </Link>
        </Paper>
      )}
    </Box>
  );
}
