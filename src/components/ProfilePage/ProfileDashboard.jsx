import { Button, Card, Grid, List, Stack, Typography } from '@mui/material';
import { UserContext } from 'App';
import React, { useContext, useEffect, useState } from 'react';
import { formatInstructorName, getColorByString, getInitials, useMount } from 'utils';
import Divider from '@mui/material/Divider';
import { Edit } from '@mui/icons-material';
import ContainerWithLoadingIndication from 'components/Page/ContainerWithLoadingIndication';
import PreventableLink from 'components/PreventableNavigation/PreventableLink';
import { PreventableNavigationContext } from 'components/PreventableNavigation/ContainerWithPreventableNavigation';
import { fetchBookmarkedCourses } from 'api';
import { SectionOverline } from 'pages/HomePage';
import SmallCourseListItem from './SmallCourseListItem';

/** The dashboard (default) tab of the profile page. */
export default function ProfileDashboard() {
  const { user } = useContext(UserContext);
  const { navigateIfAllowed } = useContext(PreventableNavigationContext);

  const [bookmarkedCourses, setBookmarkedCourses] = useState(null);

  useEffect(
    () => user && fetchBookmarkedCourses(user.userID).then(setBookmarkedCourses),
    [user]
  );

  const handleBookmarkedCourseActionItemClick = (course, action) => {
    window.open(
      `/course/${course.id}${
        action === 'register' ? '/registration' : action === 'review' ? '/reviews' : ''
      }`,
      '_blank'
    );
  };

  return (
    <ContainerWithLoadingIndication isLoading={!user || !bookmarkedCourses}>
      <Grid container spacing='24px'>
        <Grid item xs={7} paddingRight='24px'>
          <Card>
            <Stack padding='20px' spacing='12px'>
              <Typography variant='h6'>Basic Information</Typography>
              <BasicInfoItem label='Name' value={user?.name} />
              {user?.email && <BasicInfoItem label='Email' value={user?.email} />}
              <BasicInfoItem
                label='University'
                value={user?.collegeName || 'University of Utah'}
              />
              <BasicInfoItem
                noDivider
                label='Major'
                value={
                  user?.major + (user?.emphasis ? `(with ${user?.emphasis} emphasis)` : '')
                }
                onEditButtonClick={() =>
                  navigateIfAllowed('/profile/roadmap/declare', null, {
                    state: { linkTo: '/profile' },
                  })
                }
              />
            </Stack>
          </Card>
        </Grid>
        {bookmarkedCourses?.length && (
          <>
            <Divider orientation='vertical' flexItem sx={{ marginX: '-1px' }} />
            <Grid item xs={5}>
              <SectionOverline>Bookmarked Courses</SectionOverline>
              <List disablePadding>
                {bookmarkedCourses.map((course) => (
                  <SmallCourseListItem
                    key={course.id}
                    course={course}
                    indicator={
                      course.isTaken
                        ? 'taken'
                        : !course.prerequisiteList.isCompleted
                        ? 'incomplete-prerequisite'
                        : undefined
                    }
                    actionItems={['info', course.isTaken ? 'review' : 'register']}
                    defaultActionItem='info'
                    autoHideActionItems
                    onActionItemClick={handleBookmarkedCourseActionItemClick}
                  />
                ))}
              </List>
            </Grid>
          </>
        )}
      </Grid>
    </ContainerWithLoadingIndication>
  );
}

const BasicInfoItem = ({ label, value, onEditButtonClick = null, noDivider = false }) => (
  <>
    <Stack width='100%' direction='row' alignItems='flex-end' justifyContent='space-between'>
      <Stack>
        <Typography variant='body2' color='text.secondary'>
          {label}
        </Typography>
        <Typography variant='body1'>{value}</Typography>
      </Stack>
      {onEditButtonClick && (
        <Button
          startIcon={<Edit />}
          onClick={onEditButtonClick}
          sx={{ paddingY: 0, color: 'text.secondary' }}
        >
          Edit
        </Button>
      )}
    </Stack>
    {!noDivider && <Divider />}
  </>
);

// const renderMajorEmphasis = (emphasis) => (emphasis ? ' with a emphasis of ' + emphasis : '');
// const outputSchoolYears = (year) => {
//   let yearText = '';
//   switch (year) {
//     case '1':
//       yearText = 'Freshman / 1st year';
//       break;
//     case '2':
//       yearText = 'Sophomore / 2nd year';
//       break;
//     case '3':
//       yearText = 'Junior / 3rd year';
//       break;
//     case '4':
//       yearText = 'Senior / 4th year';
//       break;
//     default:
//       yearText = 'N/A';
//       break;
//   }
//   return yearText;
// };

// const renderUserInfo = (user) => (
//   <Card sx={{ width: '90%', height: 'auto' }}>
//     <Stack padding='24px' spacing='24px'>
//       <Typography variant='h6'>Basic info</Typography>

//       <Stack justifyContent='space-between' direction='row' alignItems='center'>
//         <Stack>
//           <Typography variant='body1'>NAME</Typography>
//           <Typography variant='caption' sx={{ opacity: 0.75 }}>
//             Student
//           </Typography>
//         </Stack>
//         <Stack alignItems='left'>
//           <Typography variant='body1'>{user?.name}</Typography>
//         </Stack>
//       </Stack>
//     </Stack>
//     <Divider variant='middle' />
//     <Stack padding='24px' spacing='24px'>
//       <Stack justifyContent='space-between' direction='row' alignItems='center'>
//         <Stack>
//           <Typography variant='body1'>MAJOR</Typography>

//           <Typography variant='caption' sx={{ opacity: 0.75 }}>
//             Declared
//           </Typography>
//         </Stack>
//         <Stack alignItems='left'>
//           <Typography variant='body1'>
//             {user?.major + renderMajorEmphasis(user?.emphasis)}
//           </Typography>
//         </Stack>
//       </Stack>
//     </Stack>

//     <Divider variant='middle' />
//     <Stack padding='24px' spacing='24px'>
//       <Stack justifyContent='space-between' direction='row' alignItems='center'>
//         <Stack>
//           <Typography variant='body1'>SCHOOL YEAR</Typography>

//           <Typography variant='caption' sx={{ opacity: 0.75 }}>
//             Current
//           </Typography>
//         </Stack>
//         <Typography variant='body1'>{outputSchoolYears(user?.schoolYear)}</Typography>
//       </Stack>
//     </Stack>
//   </Card>
// );

// /** The dashboard (default) tab of the profile page. */
// export default function ProfileDashboard() {
//   const { user } = useContext(UserContext);

//   return <>{renderUserInfo(user)}</>;
// }
