import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { putReview } from '../../../src/api/index';

function postReviewLikedDislikedCount({ review }, likedVal, dislikedVal) {
  putReview(review.courseID, {
    likedCount: likedVal,
    dislikedCount: dislikedVal,
  })
    .catch((error) => {
      console.log(error);
    })
    .then();
}

export default function CourseReviewVoting(review) {
  const [thumpUpclicked, setThumpUpclicked] = useState(false);
  const [thumpDownclicked, setThumpDownclicked] = useState(false);
  const [likedCount, setLikeCount] = useState(
    review.likedCount == null ? 0 : review.likedCount
  );
  const [dislikedCount, setDislikeCount] = useState(
    review.dislikedCount == null ? 0 : review.dislikedCount
  );

  const handleThumpUpclicked = (e) => {
    if (thumpDownclicked) {
      setThumpDownclicked(!thumpDownclicked);
      setDislikeCount(dislikedCount - 1);
    } else if (!thumpUpclicked) {
      setThumpUpclicked(!thumpUpclicked);
      setLikeCount(likedCount + 1);
    }
  };
  const handleThumpDownclicked = (e) => {
    if (thumpUpclicked) {
      setThumpUpclicked(!thumpUpclicked);
      setLikeCount(likedCount - 1);
    } else if (!thumpDownclicked) {
      setThumpDownclicked(!thumpDownclicked);
      setDislikeCount(dislikedCount + 1);
    }
  };

  const thumpUp = () => (
    <IconButton
      onClick={(event) => handleThumpUpclicked(event)}
      color={thumpUpclicked ? 'primary' : 'default'}
    >
      <ThumbUpIcon />
      <Typography
        style={{
          marginLeft: 5,
        }}
        variant='body2'
      >
        {likedCount}
      </Typography>{' '}
    </IconButton>
  );
  const thumpDown = () => (
    <IconButton onClick={handleThumpDownclicked} color={thumpDownclicked ? 'error' : 'default'}>
      <ThumbDownIcon />{' '}
      <Typography
        style={{
          marginLeft: 5,
        }}
        variant='body2'
      >
        {dislikedCount}
      </Typography>
    </IconButton>
  );

  useEffect(() => {
    postReviewLikedDislikedCount(review, likedCount, dislikedCount);
  }, [thumpUpclicked]);
  useEffect(() => {
    postReviewLikedDislikedCount(review, likedCount, dislikedCount);
  }, [thumpDownclicked]);

  return (
    <Stack direction='row' spacing={1}>
      {thumpUp()}
      {thumpDown()}
    </Stack>
  );
}
