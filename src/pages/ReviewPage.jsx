import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, CircularProgress } from '@mui/material';
import { fetchCourseByID } from '../api';
import ReviewRatings from '../components/ReviewInputDetails/ReviewRatings';
import ReviewComments from '../components/ReviewInputDetails/ReviewComments';
import { useMount } from '../utils';
import { postReview, postTagsByCourseID } from '../../src/api/index';
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
import { CourseContext } from './CoursePage';
import ReviewTags from 'components/ReviewInputDetails/ReviewTags';

export default function ReviewPage() {
  const [course, setCourse] = useState(null);
  const [ratingValue, setRatingValue] = useState(3);
  const [commentValue, setCommentValue] = useState('');
  const [anonymity, setAnonymity] = useState(false);
  const [recommendation, setRecommendation] = useState(false);
  const [HourSpent, setHourSpent] = useState(1);
  const [GradeReceived, setGradeReceived] = useState('');
  const [IsExamHeavy, setExamHeavy] = useState(false);
  const [IsHomeworkHeavy, setHomeworkHeavy] = useState(false);
  const [ExtraCreditOffered, setExtraCreditOffered] = useState(false);
  const { reviewTags: tagSuggestion } = useContext(CourseContext);
  const [positiveTags, setPositiveTags] = useState([]);
  const [negativeTags, setNegativeTags] = useState([]);

  const urlParams = useParams();
  const { user } = useContext(UserContext);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep === 1) {
      if (positiveTags.length === 0) {
        swal('Oops!', 'Please fill in the postive side of the course', 'error');
        return;
      }
      if (negativeTags.length === 0) {
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
  const tagsPosLabel = 'Positive Side';
  const tagsNegLabel = 'Negative Side';
  //getTagsByCourseID(course.ID).then(setTags);

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
      label:
        'Comments on the postive & negative sides of the course by selecting or adding your own tags',
      description: (
        <Box>
          <ReviewTags
            tags={positiveTags}
            tagsLabel={tagsPosLabel}
            tagSuggestion={positiveTags.concat(
              tagSuggestion.filter(
                (x) => !positiveTags.find((y) => x.name.trim() === y.name.trim())
              )
            )}
            onChange={(positiveTags) => {
              setPositiveTags(positiveTags);
            }}
          />
          <ReviewTags
            tags={negativeTags}
            tagsLabel={tagsNegLabel}
            tagSuggestion={negativeTags.concat(
              tagSuggestion.filter(
                (x) => !negativeTags.find((y) => x.name.trim() === y.name.trim())
              )
            )}
            onChange={(negativeTags) => {
              setNegativeTags(negativeTags);
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
            radioLabel={'Did you spend more or less time than expected?'}
            options={[
              { optionValue: 0, optionLabel: 'less' },
              { optionValue: 1, optionLabel: 'as expected' },
              { optionValue: 2, optionLabel: 'more' },
            ]}
            radioValue={HourSpent}
            onChange={(HourSpent) => {
              setHourSpent(HourSpent);
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
                for (let i = 0; i < positiveTags.length; i++) {
                  postTagsByCourseID(course.id, {
                    content: positiveTags[i].name.trim(),
                    type: 1,
                  }).catch((error) => swal(error));
                }
                for (let i = 0; i < negativeTags.length; i++) {
                  postTagsByCourseID(course.id, {
                    content: negativeTags[i].name.trim(),
                    type: 0,
                  }).catch((error) => swal(error));
                }
                postReview(course.id, {
                  rating: ratingValue,
                  anonymous: anonymity,
                  recommended: recommendation,
                  comment: commentValue,
                  courseID: course.id,
                  userID: user.userID,
                  username: user.name,
                  //createdAt: createDateLocal,
                  likedCount: 0,
                  dislikedCount: 0,
                  hourSpent: HourSpent,
                  gradeReceived: GradeReceived,
                  isExamHeavy: IsExamHeavy,
                  isHomeworkHeavy: IsHomeworkHeavy,
                  extraCreditOffered: ExtraCreditOffered,
                }).catch((error) => swal(error));

                swal('Good job!', 'You submitted the review!', 'success');
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
// TODO: when you send it to the backend, do trim() for the tags e.g: tags.map(x=>x.trim())
