import { School } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ProfilePageTabHeadingCard from './ProfilePageTabHeadingCard';
import RoadmapSummaryCard from './ProfileRoadmap/RoadmapSummaryCard';
import { SchedulerContext } from 'components/Scheduler/ContainerWithScheduler';
import CourseCardGrid from 'components/CourseCardGrid/CourseCardGrid';
import { UserContext } from 'App';
import { fetchCourseByID } from 'api';
import ContainerWithLoadingIndication from 'components/Page/ContainerWithLoadingIndication';
import { SectionOverline } from 'pages/HomePage';
import { pluralize } from 'utils';

/** The roadmap tab of the user profile page. */
export default function ProfileRoadmap() {
  const { user } = useContext(UserContext);
  const { requirements } = useContext(SchedulerContext);

  const [expandedRequirements, setExpandedRequirements] = useState([]);
  const [courseLists, setCourseLists] = useState(null); // TODO Q: Not where we want to be.

  useEffect(() => {
    let courseLists = [];
    const getCourseLists = (requirement) => {
      if (requirement.courseList?.length)
        courseLists.push({
          title: requirement.setName,
          numCoursesRequired: requirement.courseNeeded,
          courseIDs: requirement.courseList,
        });
      if (requirement.subSets?.length)
        for (let subset of requirement.subSets) getCourseLists(subset);
    };
    getCourseLists({ subSets: requirements });

    Promise.all(
      courseLists.map(({ title, numCoursesRequired, courseIDs }) =>
        Promise.all(courseIDs.slice(0, 15).map((x) => fetchCourseByID(x, user.userID))).then(
          (courses) => ({
            title,
            numCoursesRequired,
            courses,
          })
        )
      )
    ).then(setCourseLists);
  }, [requirements]);

  if ('4') {
    return (
      <ContainerWithLoadingIndication isLoading={!courseLists}>
        <Stack spacing='48px'>
          {courseLists &&
            courseLists.map(({ title, numCoursesRequired, courses }) => (
              <Stack key={title}>
                <SectionOverline>{title}</SectionOverline>
                <Typography variant='body2' color='text.secondary' marginBottom='16px'>
                  {pluralize(numCoursesRequired, 'course')} required
                </Typography>
                <CourseCardGrid courses={courses} numColumns={5} />
              </Stack>
            ))}
        </Stack>
      </ContainerWithLoadingIndication>
    );
  }

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
          expandedRequirements={expandedRequirements}
          onExpandedRequirementsChange={setExpandedRequirements}
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

const summaryCardWidth = '50%';
