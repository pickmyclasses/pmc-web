import React from 'react';
import { Container, Grid } from '@mui/material';
import useStyles from '../styles';
import CourseCard from './CourseCard';

/**
 * TODO: The structure and organization of this component and CourseGrid are for demo purposes
 * only. The actual structure depends on more design decisions.
 */
export default function CourseCardGrid({ courses }) {
  const styles = useStyles();

  return (
    <Container className={styles.cardGrid} maxWidth='md'>
      <Grid container spacing={4}>
        {courses.map(() => (
          <Grid item xs={12} sm={6} md={4}>
            <CourseCard />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
