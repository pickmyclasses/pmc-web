import React, { useState } from 'react';
import { Grid, Avatar, Box, Card, CardContent, Typography, Button, Paper } from '@mui/material';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import { ThumbDown, ThumbUp } from '@mui/icons-material';
import { formatInstructorName, getInitials } from 'utils';

export const CourseReviewCard = ({ review }) => {
  return (
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
      extraCreditOffered={review.extraCreditOffered}
      hourSpent={review.hourSpent}
      dislikes={review.dislikedCount}
      likes={review.likedCount}
      recommended={review.recommended}
    />
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
  extraCreditOffered,
  hourSpent,
  dislikes,
  likes,
  recommended,
}) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    setLiked(false);
  };

  let date = new Date(createdAt);
  let createDateLocal = date.toLocaleDateString();

  let hours = '';
  if (hourSpent === 0) hours = 'Less than expected';
  else if (hourSpent === 1) hours = 'As expected';
  else hours = 'More than expected than';

  return (
    <>
      <Card sx={{ width: '100%', height: '24em', marginTop: '1em' }}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  marginTop: '25%',
                  marginLeft: '15%',
                }}
              >
                {getInitials(username)}
              </Avatar>
            </Grid>
            <Grid item xs={8} sx={{ position: 'relative', height: '23em' }}>
              <Box sx={{ marginTop: '3%', marginLeft: '3%' }}>
                <Typography variant='h6' gutterBottom component='div' color={'#077b8a'}>
                  {anonymous ? 'Anonymous Student' : username}{' '}
                </Typography>

                <Typography variant='body2' gutterBottom component='div' color={'#646C79'}>
                  Took the course with professor
                  <span style={{ color: '#3d78b3' }}>
                    <i> {formatInstructorName(professor)}</i>
                  </span>{' '}
                  in {semester}
                </Typography>
              </Box>
              <Box
                sx={{
                  marginLeft: '3%',
                  marginTop: '2%',
                  fontSize: '0.95em',
                  maxWidth: '90%',
                  Height: '65%',
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
            <Grid item xs={3} sx={{ position: 'relative', textAlign: 'center' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper
                    sx={{
                      bgcolor: rating > 3 ? '#1e847f' : '#b20238',
                      marginTop: '30%',
                      marginLeft: '20%',
                      color: 'white',
                      fontSize: '12px',
                      width: '76%',
                      paddingTop: '6%',
                    }}
                  >
                    Rating
                    <Typography variant='h6' component='div' gutterBottom>
                      {rating}.0
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper
                    sx={{
                      bgcolor: '#077b8a',
                      marginTop: '30%',
                      marginLeft: '8%',
                      color: 'white',
                      fontSize: '12px',
                      width: '76%',
                      paddingTop: '6%',
                    }}
                  >
                    Grade
                    <Typography variant='h6' component='div' gutterBottom>
                      {grade}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <Paper
                    sx={{
                      bgcolor: isExamHeavy ? '#b20238' : '#1e847f',
                      marginTop: '10%',
                      marginLeft: '20%',
                      color: 'white',
                      fontSize: '12px',
                      width: '70%',
                      paddingTop: '6%',
                    }}
                  >
                    Exams
                    <Typography variant='h6' component='div' gutterBottom>
                      {isExamHeavy ? 'Heavy' : 'Light'}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper
                    sx={{
                      bgcolor: isHomeworkHeavy ? '#b20238' : '#1e847f',
                      marginTop: '10%',
                      marginLeft: '16%',
                      color: 'white',
                      fontSize: '12px',
                      width: '70%',
                      paddingTop: '6%',
                    }}
                  >
                    Homeworks
                    <Typography variant='h6' component='div' gutterBottom>
                      {isHomeworkHeavy ? 'Heavy' : 'Light'}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      bgcolor: '#077b8a',
                      marginTop: '10%',
                      marginLeft: '10%',
                      color: 'white',
                      fontSize: '12px',
                      width: '84%',
                      paddingTop: '6%',
                    }}
                  >
                    Hour spent on the course
                    <Typography variant='subtitle1' component='div' gutterBottom>
                      {hours}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Paper
                    sx={{
                      bgcolor: recommended ? '#1e847f' : '#b20238',
                      color: 'white',
                      width: '84%',
                      paddingTop: '4%',
                      paddingBottom: '4%',
                      marginLeft: '10%',
                      marginTop: '10%',
                    }}
                  >
                    {recommended ? 'Go Take it! 🥳' : "Don't take it! 😢"}
                  </Paper>
                </Grid>
              </Grid>
              <Box>
                <Box sx={{ position: 'absolute', bottom: '0', right: '0' }}>
                  <Button onClick={handleLike}>
                    {liked ? <ThumbUp /> : <ThumbUpOffAltOutlinedIcon />} &nbsp;{' '}
                    {liked ? likes + 1 : likes}
                  </Button>
                  <Button onClick={handleDislike}>
                    {disliked ? <ThumbDown /> : <ThumbDownOutlinedIcon />} &nbsp;{' '}
                    {disliked ? dislikes + 1 : dislikes}
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
