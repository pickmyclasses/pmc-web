import { School } from '@mui/icons-material';
import { Link, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ProfilePageTabHeadingCard from './ProfilePageTabHeadingCard';
import RoadmapSummaryCard from './ProfileRoadmap/RoadmapSummaryCard';
import { SchedulerContext } from 'components/Scheduler/ContainerWithScheduler';
import CourseCardGrid from 'components/CourseCardGrid/CourseCardGrid';
import { UserContext } from 'App';
import { fetchCourseByID, fetchCoursesByIDs } from 'api';
import ContainerWithLoadingIndication from 'components/Page/ContainerWithLoadingIndication';
import { SectionOverline } from 'pages/HomePage';
import { pluralize } from 'utils';
import PreventableLink from 'components/PreventableNavigation/PreventableLink';

/** The roadmap tab of the user profile page. */
export default function ProfileRoadmap() {
  const { requirements, historyCourses } = useContext(SchedulerContext);

  const [expandedRequirements, setExpandedRequirements] = useState([]);
  // const [courseLists, setCourseLists] = useState(null); // TODO Q: Not where we want to be.
  const [requirementProgressByID, setRequirementProgressByID] = useState({});

  useEffect(() => {
    let requirementProgressByID = {};
    const getRequirementProgress = (requirement) => {
      let completed = requirement.courseList?.reduce(
        (acc, courseID) => acc + !!historyCourses.find((x) => x.id === courseID),
        0
      );
      if (requirement.subSets)
        for (let subset of requirement.subSets)
          completed += getRequirementProgress(subset).completed;

      return (requirementProgressByID[requirement.id] = {
        completed,
        total: requirement.courseNeeded,
      });
    };
    for (let requirement of requirements) getRequirementProgress(requirement);

    setRequirementProgressByID(requirementProgressByID);
  }, [requirements, historyCourses]);

  const handleSummaryRequirementClick = (requirementID) => alert('*= click ' + requirementID);

  return (
    <Stack spacing='24px' paddingBottom='32px'>
      <ProfilePageTabHeadingCard
        iconType={School}
        title='Your Graduation Roadmap'
        description='View your graduation requirements and plan your future courses'
      />
      <Stack
        position='sticky'
        top='32px'
        width={`calc(${summaryCardWidth} - 12px)`}
        height={`calc(${summaryCardHeight} - 1px)`}
      >
        <RoadmapSummaryCard
          requirements={requirements}
          requirementProgressByID={requirementProgressByID}
          onRequirementClick={handleSummaryRequirementClick}
        />
      </Stack>
      <Stack
        marginTop={`calc(-1 * ${summaryCardHeight}) !important`}
        paddingLeft={`calc(${summaryCardWidth} + 12px)`}
      >
        {'blah '.repeat(3434)}
      </Stack>
    </Stack>
  );
}

const summaryCardHeight = '(100vh - 72px - 2 * 32px)';

const summaryCardWidth = '37.5%';
