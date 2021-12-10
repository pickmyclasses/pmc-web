import React from 'react';

import { Grid, CircularProgress } from '@material-ui/core';

// Fetch the data from the global Redux Store
import { useSelector } from 'react-redux';

import CourseCard from './CourseCard/CourseCard';

import useStyles from './styles';

const CourseCardGrid = ({ setCurrentId }) => {

    // the state.courses is from combineReducers({ courses: courses }) 
    const courses = useSelector((state) => state.courses);

    // Call useStyles will return an object where each element is a className
    const classes = useStyles();

    console.log("Fetched courses from CourseCardGrid: " + courses);
    
    return(

        !courses.length ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {
                    courses.map((course) => (
                        <Grid key ={course._id} item xs={12} sm={6}>
                            <CourseCard course={course} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
}

export default CourseCardGrid;