import React, { useRef } from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

export default function CourseCard({ imageURL, detailPageURL, name, title, description }) {
  const styles = useStyles();

  const flippyRef = useRef();

  return (
    <Box sx={{ '.flippy-front, .flippy-back': { padding: '0' } }}>
      <Flippy ref={flippyRef} flipOnClick={false} flipDirection='horizontal'>
        <FrontSide>
          <Card className={styles.card}>
            <CardMedia className={styles.media} image={imageURL} />
            <CardContent style={{ marginLeft: '8px' }}>
              <Typography variant='h6' gutterBottom>
                {name}
              </Typography>
              <Typography gutterBottom sx={{ height: '2.5em' }}>
                {title}
              </Typography>
            </CardContent>
            <CardActions className={styles.cardActions}>
              <Button
                variant='outlined'
                color='primary'
                onClick={() => {
                  flippyRef.current.toggle();
                }}
              >
                Flip
              </Button>
            </CardActions>
          </Card>
        </FrontSide>

        <BackSide>
          <Card className={styles.card} sx={{ padding: '0 8px' }}>
            <CardMedia
              className={styles.cardMedia}
              image='https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
              title='Image title'
            />
            <CardContent>
              <Typography variant='h6'>{name}</Typography>
              <Typography
                gutterBottom
                style={{ fontStyle: 'italic', opacity: 0.75, marginBottom: '16px' }}
              >
                {title}
              </Typography>
              <Typography
                gutterBottom
                sx={{
                  '-webkit-line-clamp': '6',
                  display: '-webkit-box',
                  ' -webkit-box-orient': 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {description}...
              </Typography>
            </CardContent>

            <CardActions className={styles.cardActions}>
              <Button
                style={{ marginRight: '10px' }}
                variant='outlined'
                color='primary'
                onClick={() => flippyRef.current.toggle()}
              >
                Flip
              </Button>
              <Button
                component={Link}
                to={detailPageURL}
                variant='outlined'
                color='success'
                className={styles.button}
              >
                Details
              </Button>
            </CardActions>
          </Card>
        </BackSide>
      </Flippy>
    </Box>
  );
}
