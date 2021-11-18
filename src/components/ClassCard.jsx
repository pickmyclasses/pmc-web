import React from 'react';

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
  Container,
  Typography,
} from '@mui/material';
import useStyles from '../styles';

export default function ClassCard() {
  const classes = useStyles();
  return (
    <Container className={classes.cardGrid} maxWidth='md'>
      <Grid container spacing={2}>
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
                This is an introduction to the science problem-solving, programming, program
                development, algorithm analysis, and data structures. Students learn to develop
                correct software in a current programming language environment.
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
      </Grid>
    </Container>
  );
}
