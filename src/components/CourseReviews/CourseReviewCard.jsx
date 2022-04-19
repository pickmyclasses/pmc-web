import React, { useState } from 'react';
import { Grid, Avatar, Box, Card, CardContent, Typography, Button } from '@mui/material';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { getInitials } from 'utils';
import { ThumbDown, ThumbUp } from '@mui/icons-material';

export const CourseReviewCard = ({ review }) => {
  return (
    <>
      <Grid container spacing={2} sx={{ fontFamily: 'Roboto' }}>
        <Grid item xs={8}>
          <CourseReviewContent
            rating={review.rating}
            username={review.username}
            anonymous={review.anonymous}
            professor={review.classProfessor}
            semester={`${review.classSemester.season} ${review.classSemester.year}`}
            comment={review.comment}
            createdAt={review.createdAt}
            grade={review.gradeReceived}
            isExamHeavy={review.isExamHeavy}
            isHomeworkHeavy={review.isHomeworkHeavy}
            dislikes={review.dislikedCount}
            likes={review.likedCount}
          />
        </Grid>
      </Grid>
    </>
  );
};

const CourseReviewContent = ({
  rating,
  username,
  anonymous,
  professor,
  semester,
  comment,
  createdAt,
  grade,
  isExamHeavy,
  isHomeworkHeavy,
  dislikes,
  likes,
}) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
  };

  let date = new Date(createdAt);
  let createDateLocal = date.toLocaleDateString();

  return (
    <>
      <Card sx={{ width: '100%', height: '24em' }}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Avatar
                sx={{
                  width: 74,
                  height: 74,
                  marginTop: '12%',
                  marginLeft: '5%',
                }}
              >
                {getInitials(username)}
              </Avatar>
            </Grid>
            <Grid item xs={8} sx={{ position: 'relative', height: '23em' }}>
              <Box sx={{ marginTop: '3%', marginLeft: '3%' }}>
                <Typography variant='h6' gutterBottom component='div' color={'#5EBEC4'}>
                  {anonymous ? 'Anonymous Student' : username}
                </Typography>
                <Typography variant='body2' gutterBottom component='div' color={'#646C79'}>
                  Took the course with professor
                  <span style={{ color: '#3d78b3' }}>
                    <i> {professor}</i>
                  </span>{' '}
                  in semester {semester}
                </Typography>
              </Box>
              <Box
                sx={{
                  marginLeft: '3%',
                  marginTop: '5%',
                  fontSize: '1em',
                  maxWidth: '100%',
                  Height: '70%',
                  lineHeight: '2em',
                  color: '#171824',
                }}
              >
                {comment !== '' ? comment : 'This user did not leave a comment!'}
              </Box>
              <Box sx={{ position: 'absolute', bottom: '0', marginLeft: '3%' }}>
                <Typography variant='body2' gutterBottom component='div' color='#646C79'>
                  reviewed at <i>{createDateLocal}</i>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3} sx={{ position: 'relative' }}>
              <Box
                sx={{
                  bgcolor: rating > 3 ? '#50ad69' : '#d93030',
                  marginTop: '5%',
                  width: '30%',
                  height: '17%',
                  color: 'white',
                  marginLeft: '50%',
                  textAlign: 'center',
                }}
              >
                <Typography variant='h3' component='div' gutterBottom>
                  {rating}
                </Typography>
              </Box>
              <Box>
                <Button
                  variant='text'
                  sx={{ marginLeft: '2%', marginBottom: '5%', display: 'block' }}
                >
                  {semester}
                </Button>
                <Button
                  variant='text'
                  sx={{ marginLeft: '2%', marginBottom: '5%', display: 'block' }}
                >
                  {grade}
                </Button>
                <Button
                  variant='text'
                  sx={{ marginLeft: '2%', marginBottom: '5%', display: 'block' }}
                >
                  {isExamHeavy ? 'YES' : 'NO'}
                </Button>
                <Button
                  variant='text'
                  sx={{ marginLeft: '2%', marginBottom: '5%', display: 'block' }}
                >
                  Homework- {isHomeworkHeavy ? 'Yes' : 'No'}
                </Button>
                <Box sx={{ position: 'absolute', bottom: '0', right: '0' }}>
                  <Button onClick={handleLike}>
                    {liked ? <ThumbUp /> : <ThumbUpOffAltOutlinedIcon />}
                  </Button>
                  <Button onClick={handleDislike}>
                    {disliked ? <ThumbDown /> : <ThumbDownOutlinedIcon />}
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};
