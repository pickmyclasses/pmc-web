import { Box, Grid, Stack, styled, Divider, Tab, Typography } from '@mui/material';
import { BookmarkAdded, BookmarkBorder } from '@mui/icons-material';
import React, { useContext, useRef } from 'react';
import { CourseContext } from '../../pages/CoursePage';
import PrerequisiteAccordion from './CourseRegistration/PrerequisiteAccordion';
import CourseFormatSummary from './CourseRegistration/CourseFormatSummary';
import OfferingListing from './CourseRegistration/OfferingListing';
import { SectionOverline } from 'pages/HomePage';

export default function CourseRegistration() {
  const { course, isBookmarked, setIsBookmarked } = useContext(CourseContext);

  const schedulePreviewContainerRef = useRef();

  return (
    <>
      <Stack spacing='32px'>
        <Grid container spacing='32px'>
          <Grid item xs={7.47}>
            <PrerequisiteAccordion course={course} />
          </Grid>
          <Grid item xs={4.53}>
            <CourseFormatSummary course={course} />
          </Grid>
        </Grid>
      </Stack>
      <Divider sx={{ marginTop: '32px', marginBottom: '8px' }} />
      {course.classes?.length ? (
        <>
          <SectionOverline marginTop='-20px' marginBottom='-8px'>
            Offering Selection
          </SectionOverline>
          <Box
            ref={schedulePreviewContainerRef}
            height={schedulerHeight}
            position='sticky'
            top='184px'
            left='calc(62.5% + 16px)'
            width='calc(37.5% - 16px)'
            zIndex={1000}
          />
          <LeftHalfContainer marginTop={`calc(0px - (${schedulerHeight}))`}>
            <OfferingListing
              course={course}
              schedulePreviewContainer={schedulePreviewContainerRef?.current}
            />
          </LeftHalfContainer>
        </>
      ) : (
        <>
          <Stack paddingTop='24px' spacing='12px' alignItems='center' textAlign='center'>
            <Typography variant='body1' color='text.secondary' lineHeight='2em'>
              This course is not offered next semester.
              <br />
              Bookmark this course to be notified when it becomes available!
            </Typography>
            <Tab
              disabled={isBookmarked}
              icon={
                isBookmarked ? (
                  <BookmarkAdded fontSize='large' />
                ) : (
                  <BookmarkBorder fontSize='large' />
                )
              }
              label={isBookmarked ? 'Bookmarked' : 'Bookmark'}
              onClick={() => setIsBookmarked(!isBookmarked)}
            />
          </Stack>
        </>
      )}
    </>
  );
}

const LeftHalfContainer = styled(Box)({ width: 'calc(62.5% - 16px)' });

const schedulerHeight = 'calc(100vh - 72px - 161px - 32px)';
