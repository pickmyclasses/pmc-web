import React from 'react';

import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import useStyles from '../styles';

export default function CourseCard() {
  const styles = useStyles();
  return (
    <Card className={styles.card}>
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
        <Button variant='outlined' color='primary' className={styles.button}>
          Required
        </Button>
        <Button variant='outlined' color='primary' className={styles.button}>
          Hardware
        </Button>
      </CardActions>
    </Card>
  );
}
