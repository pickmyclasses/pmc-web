import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Card,
  Grid,
  Stack,
  styled,
  Typography,
  colors,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import CourseEnrollmentSubCard from '../CourseDetails/CourseEnrollmentSubCard';
import EnhancedTable from '../CourseDetails/CourseDetails';
import ContainerWithStaticScheduler from '../Scheduler/ContainerWithStaticScheduler';
import { CourseContext } from '../../pages/CoursePage';
import Scheduler from '../Scheduler/Scheduler';
import { SchedulerContext } from '../Scheduler/ContainerWithScheduler';
import ShoppingCart from '../Scheduler/ShoppingCart';
import SchedulePreview from './CourseRegistration/SchedulePreview';
import CourseEligibilityBanner from './CourseEligibilityBanner';
import { getEligibility } from '../CourseCardGrid/CourseCard/CourseEligibilityIndicator';
import { CenterAligningFlexBox } from '../CourseCardGrid/CourseCard/CourseCard';
import { Check, Close, DoDisturb, Expand, ExpandMore } from '@mui/icons-material';
import { capitalizeFirst, formatPrerequisites } from '../../utils';
import LabelWithIcon from './LabelWithIcon';
import PrerequisiteAccordion from './CourseRegistration/PrerequisiteAccordion';

export default function CourseRegistration() {
  const { course } = useContext(CourseContext);

  return (
    <>
      <SchedulePreview />
      <LeftHalfContainer marginTop='calc(72px + 160px + 64px - 100vh)'>
        <Stack spacing='32px'>
          <PrerequisiteAccordion course={course} />
          <PrerequisiteAccordion course={course} />
          <PrerequisiteAccordion course={course} />
          <PrerequisiteAccordion course={course} />
          <PrerequisiteAccordion course={course} />
          <PrerequisiteAccordion course={course} />
          <PrerequisiteAccordion course={course} />
          <PrerequisiteAccordion course={course} />
          <PrerequisiteAccordion course={course} />
          <PrerequisiteAccordion course={course} />
          <PrerequisiteAccordion course={course} />
          <PrerequisiteAccordion course={course} />
        </Stack>
      </LeftHalfContainer>
    </>
  );
}

const LeftHalfContainer = styled(Box)({ width: 'calc(50% - 16px)' });
