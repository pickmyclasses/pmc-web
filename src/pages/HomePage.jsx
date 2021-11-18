import React, { useState } from 'react';
import {
  Button,
  Grid,
  AppBar,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  CssBaseline,
  Toolbar,
  Container,
  Typography,
} from '@mui/material';
import Scheduler from '../components/Scheduler';
import ClassResultItem from '../components/ClassResultItem';
import useStyles from '../styles';

export default function HomePage() {
  const [shouldShowScheduler, setShouldShowScheduler] = useState(true);
  const classes = useStyles();
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs sx={{ marginTop: '24px', overflow: 'auto' }}>
          {/* The following is for place-holding only; we should create a component for result/
           * recommendation lists */}
          <Button onClick={() => setShouldShowScheduler(!shouldShowScheduler)}>
            {shouldShowScheduler ? 'Hide' : 'Show'} scheduler
          </Button>
          {/* {[...new Array(5)].map((_, i) => (
            <ClassResultItem key={i} />
          ))} */}

          <Container className={classes.cardGrid} maxWidth='md'>
            <Grid container spacing={4}>
              {cards.map(() => (
                <Grid item xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image='http://source.unsplash.com/random'
                      title='Image title'
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography variant='h2' align='center' color='textPrimary' gutterBottom>
                        CS 1400
                      </Typography>
                      <Typography variant='h7' align='center' color='textSeconday' gutterBottom>
                        This is an introduction to the science problem-solving, programming,
                        program development, algorithm analysis, and data structures. Students
                        learn to develop correct software in a current programming language
                        environment.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button variant='outlined' color='primary' className={classes.button}>
                        Required
                      </Button>
                      <Button variant='outlined' color='primary' className={classes.button}>
                        Hardware
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Grid>
        {shouldShowScheduler && (
          <Grid item xs={3} sx={{ margin: '24px' }}>
            <Scheduler />
          </Grid>
        )}
      </Grid>
      <footer className={classes.footer}>
        <Typography variant='h6' align='center' gutterBottom>
          CS 4000 Capstone Project
        </Typography>
        <Typography variant='subtitle1' align='center' gutterBottom color='textSecondary'>
          Kaijie Fu, Kevin Song, Leon Tran, and Qianlang Chen
        </Typography>
      </footer>
    </>
  );
}
