import React, { useRef } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

export default function CourseCard({ course }) {
  const ref = useRef();
  const styles = useStyles();
  const config = '/courseDetails/' + course.id;
  return (
    <Flippy
      flipOnHover={false} // default false
      flipOnClick={false} // default false
      flipDirection='horizontal'
      ref={ref}
    >
      <FrontSide className={styles.card}>
        <Card>
          <CardMedia
            className={styles.media}
            image='https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            title='Image title'
          />
          <CardContent style={{ marginLeft: '12px' }}>
            <Typography variant='h6' gutterBottom>
              {course.department} {course.number}
            </Typography>
            <Typography gutterBottom>{course.name}</Typography>
          </CardContent>

          <CardActions>
            <Button
              variant='outlined'
              color='primary'
              onClick={() => {
                ref.current.toggle();
              }}
            >
              {' '}
              Flip{' '}
            </Button>
          </CardActions>
        </Card>
      </FrontSide>

      <BackSide>
        <Card className={styles.card}>
          <CardMedia
            className={styles.cardMedia}
            image='https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
            title='Image title'
          />
          <CardContent>
            <Typography variant='h6'>
              {course.department} {course.number}
            </Typography>
            <Typography
              gutterBottom
              style={{ fontStyle: 'italic', opacity: 0.75, marginBottom: '16px' }}
            >
              {course.name}
            </Typography>
            <Typography gutterBottom>{course.description}</Typography>
          </CardContent>

          <CardActions className={styles.cardActions}>
            <Button
              style={{ marginRight: '10px' }}
              variant='outlined'
              color='primary'
              onClick={() => {
                ref.current.toggle();
              }}
            >
              {' '}
              Flip{' '}
            </Button>
            <Button
              component={Link}
              to={config}
              variant='outlined'
              color='success'
              className={styles.button}
            >
              {' '}
              Details{' '}
            </Button>
          </CardActions>
        </Card>
      </BackSide>
    </Flippy>
  );
}
