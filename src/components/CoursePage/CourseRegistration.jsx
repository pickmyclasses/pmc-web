import { Box, Grid, Stack, styled, Divider } from '@mui/material';
import React, { useContext, useRef } from 'react';
import { CourseContext } from '../../pages/CoursePage';
import PrerequisiteAccordion from './CourseRegistration/PrerequisiteAccordion';
import CourseFormatSummary from './CourseRegistration/CourseFormatSummary';
import OfferingListing from './CourseRegistration/OfferingListing';
import { SectionOverline } from 'pages/HomePage';

export default function CourseRegistration() {
  const { course } = useContext(CourseContext);

  const schedulePreviewContainerRef = useRef();

  return (
    <>
      <Stack spacing='32px'>
        <Grid container spacing='32px'>
          <Grid item xs={6}>
            <PrerequisiteAccordion course={course} />
          </Grid>
          <Grid item xs={6}>
            <CourseFormatSummary course={course} />
          </Grid>
        </Grid>
      </Stack>
      <Divider sx={{ marginY: '32px' }} />
      <Box
        ref={schedulePreviewContainerRef}
        height={schedulerHeight}
        position='sticky'
        top='192px'
        left='calc(50% + 16px)'
        width='calc(50% - 16px)'
        zIndex={998}
      />
      {/* <SchedulePreview classesToHighlight={classesToHighlight} /> */}
      <LeftHalfContainer marginTop={`calc(0px - (${schedulerHeight}))`}>
        <Stack width='100%'>
          <SectionOverline marginTop='-20px' marginBottom='-8px'>
            Offering Selection
          </SectionOverline>
          <OfferingListing
            course={course}
            schedulePreviewContainer={schedulePreviewContainerRef?.current}
          />
        </Stack>
      </LeftHalfContainer>
    </>
  );
}

const LeftHalfContainer = styled(Box)({ width: 'calc(50% - 16px)' });

const schedulerHeight = 'calc(100vh - 72px - 160px - 32px)';
