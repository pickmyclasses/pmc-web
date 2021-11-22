import React, { useState } from 'react';

import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import useStyles from '../styles';

export default function CourseCard() {
  const [flip, setFlip] = useState(false);
  const styles = useStyles();
  return (
    <div
      // Line 8 means that every card element will have a class name
      // 'card' and will also have the class name 'flip' if flip is true
      className={`card ${flip ? 'flip' : ''}`}
    >
      <div className='front'>
        <Card className={`${styles.card} cardEl`}>
          <CardMedia
            className={styles.cardMedia}
            image='http://source.unsplash.com/random'
            title='Image title'
          />
          <CardContent className={styles.cardContent}>
            <Typography variant='h6' align='center' color='textPrimary' gutterBottom>
              CS 1400
            </Typography>
            <Typography variant='h7' align='center' color='textSeconday' gutterBottom>
              This is an introduction to the science problem-solving, programming, program
              development, algorithm analysis, and data structures. Students learn to develop
              correct software in a current programming language environment.
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant='outlined' color='primary' onClick={() => setFlip(!flip)}>
              Flip
            </Button>
          </CardActions>
        </Card>
      </div>
      <div className='back'>
        <Card className={`${styles.card} cardEl`}>
          <CardMedia
            className={styles.cardMedia}
            image='http://source.unsplash.com/random'
            title='Image title'
          />
          <CardContent className={styles.cardContent}>
            <Typography variant='h6' align='center' color='textPrimary' gutterBottom>
              CS 1400
            </Typography>
            <Typography variant='h7' align='center' color='textSeconday' gutterBottom>
              This is an introduction to the science problem-solving, programming, program
              development, algorithm analysis, and data structures. Students learn to develop
              correct software in a current programming language environment.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant='outlined'
              color='primary'
              className={styles.button}
              onClick={() => setFlip(!flip)}
            >
              Flip
            </Button>
            <Button variant='outlined' color='success' className={styles.button}>
              Details
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
