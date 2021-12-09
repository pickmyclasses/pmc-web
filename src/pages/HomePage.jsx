import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

// Custom components
import Scheduler from '../components/Scheduler';
import CourseCardGrid from '../components/CourseCardGrid/CourseCardGrid';

// the actions
import { getCourses } from '../actions/courses';

// This allows dispatching an action
import { useDispatch } from 'react-redux';

const HomePage = () => 
{
    const [currentId, setCurrentId] = useState(null);

    const [shouldShowScheduler, setShouldShowScheduler] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getCourses());
      console.log('dispatch(getCourses)) was called at HomePage');  
    }, [dispatch]);
  
    return(
        <>
        <Button onClick={() => setShouldShowScheduler(!shouldShowScheduler)}>
            {shouldShowScheduler ? 'Hide' : 'Show'} scheduler
        </Button>

        <Grow in>
            <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Grid item xs={12} sm={7}>
                        <CourseCardGrid setCurrentId={setCurrentId}/>
                    </Grid>
                </Grid>
            </Container>
        </Grow>

        {shouldShowScheduler && (
        <Grid item xs={3} sx={{ margin: '24px' }}>
            <Scheduler />
        </Grid>)}
        </>

    );
}

export default HomePage;