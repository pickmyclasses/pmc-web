import { breadcrumbsClasses, Card, Stack, Typography } from '@mui/material';
import { UserContext } from 'App';
import React, { useContext } from 'react';
import { formatInstructorName, getColorByString, getInitials } from 'utils';
import Divider from '@mui/material/Divider';

const renderMajorEmphasis = (emphasis) => (emphasis ? ' with a emphasis of ' + emphasis : '');
const outputSchoolYears = (year) => {
  let yearText = '';
  switch (year) {
    case '1':
      yearText = 'Freshman / 1st year';
      break;
    case '2':
      yearText = 'Sophomore / 2nd year';
      break;
    case '3':
      yearText = 'Junior / 3rd year';
      break;
    case '4':
      yearText = 'Senior / 4th year';
      break;
    default:
      yearText = 'N/A';
      break;
  }
  return yearText;
};

const renderUserInfo = (user) => (
  <Card sx={{ width: '90%', height: '40%' }}>
    <Stack padding='24px' spacing='24px'>
      <Typography variant='h6'>Basic info</Typography>

      <Stack justifyContent='space-between' direction='row' alignItems='center'>
        <Stack>
          <Typography variant='body1'>NAME</Typography>
          <Typography variant='caption' sx={{ opacity: 0.75 }}>
            Student
          </Typography>
        </Stack>
        <Stack alignItems='left'>
          <Typography variant='body1'>{user?.name}</Typography>
        </Stack>
      </Stack>
    </Stack>
    <Divider variant='middle' />
    <Stack padding='24px' spacing='24px'>
      <Stack justifyContent='space-between' direction='row' alignItems='center'>
        <Stack>
          <Typography variant='body1'>MAJOR</Typography>

          <Typography variant='caption' sx={{ opacity: 0.75 }}>
            Declared
          </Typography>
        </Stack>
        <Stack alignItems='left'>
          <Typography variant='body1'>
            {user?.major + renderMajorEmphasis(user?.emphasis)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>

    <Divider variant='middle' />
    <Stack padding='24px' spacing='24px'>
      <Stack justifyContent='space-between' direction='row' alignItems='center'>
        <Stack>
          <Typography variant='body1'>SCHOOL YEAR</Typography>

          <Typography variant='caption' sx={{ opacity: 0.75 }}>
            Current
          </Typography>
        </Stack>
        <Typography variant='body1'>{outputSchoolYears(user?.schoolYear)}</Typography>
      </Stack>
    </Stack>
  </Card>
);

/** The dashboard (default) tab of the profile page. */
export default function ProfileDashboard() {
  const { user } = useContext(UserContext);
  return <>{renderUserInfo(user)}</>;
}
