import { School } from '@mui/icons-material';
import { Card, Link, Stack, Typography } from '@mui/material';
import React, { useCallback, useContext, useEffect, useState } from 'react';
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
import RequirementDetailList from './ProfileRoadmap/RequirementDetailList';
import DeclareMajorPrompt from './ProfileRoadmap/DeclareMajorPrompt';

/** The roadmap tab of the user profile page. */
export default function ProfileRoadmap() {
  const { user } = useContext(UserContext);
  const { requirements, historyCourses } = useContext(SchedulerContext);

  const [requirementProgressByID, setRequirementProgressByID] = useState({});
  const [expandedRequirementIDs, setExpandedRequirementIDs] = useState([]);

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

  const handleSummaryRequirementClick = useCallback((targetPath) => {
    if (!expandedRequirementIDs.includes(targetPath[targetPath.length - 1]))
      setExpandedRequirementIDs(targetPath);
  }, []);

  const handleDetailRequirementClick = (targetPath) => {
    const shouldCollapse = expandedRequirementIDs.includes(targetPath[targetPath.length - 1]);
    if (shouldCollapse) setExpandedRequirementIDs(targetPath.slice(0, -1));
    else setExpandedRequirementIDs(targetPath);
  };

  return (
    <ContainerWithLoadingIndication
      isLoading={!(user && (!user.major || (requirements?.length && historyCourses)))}
    >
      <Stack spacing='24px' paddingBottom='32px'>
        <ProfilePageTabHeadingCard
          iconType={School}
          title='Your Graduation Roadmap'
          description='View your graduation requirements and plan your future courses'
          sx={{ zIndex: 1000 }}
        />
        {!user.major ? (
          <DeclareMajorPrompt />
        ) : (
          <>
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
                sx={{ zIndex: 1001 }}
              />
            </Stack>
            <Stack
              marginTop={`calc(-1 * ${summaryCardHeight}) !important`}
              paddingLeft={`calc(${summaryCardWidth} + 12px)`}
              minHeight={`calc(${summaryCardHeight} - 1px)`}
            >
              <RequirementDetailList
                requirement={{ subSets: requirements }}
                requirementIDPath={[]}
                requirementProgressByID={requirementProgressByID}
                expandedRequirementIDs={expandedRequirementIDs}
                onRequirementIDPathIsExpandedChange={handleDetailRequirementClick}
                sx={{ zIndex: 999 }}
                hideHeading
              />
            </Stack>
          </>
        )}
      </Stack>
    </ContainerWithLoadingIndication>
  );
}

const summaryCardHeight = '(100vh - 72px - 2 * 32px)';

const summaryCardWidth = '37.5%';
