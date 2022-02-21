import { BookmarkBorder, Share } from '@mui/icons-material';
import {
  Box,
  Card,
  CardMedia,
  Container,
  styled,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import React, { createElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCourseName, pluralize } from '../../utils';
import { CenterAligningFlexBox } from '../CourseCardGrid/CourseCard/CourseCard';

export default function CoursePageTop({ course, tabs, activeTabName }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const coursePageURL = '/course/' + course.ID;

  const renderCourseInfo = () => (
    <Box>
      <CenterAligningFlexBox>
        <Typography variant='h5' lineHeight={2} fontWeight='bold'>
          {formatCourseName(course.CatalogCourseName)}
        </Typography>
        <Typography
          variant='h5'
          fontWeight='normal'
          lineHeight={2}
          sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
        >
          &nbsp;— {course.Title}
        </Typography>
      </CenterAligningFlexBox>
      <Typography variant='body1' color={theme.palette.text.secondary}>
        CS major requirement &nbsp;&nbsp;•&nbsp;&nbsp;
        {formatCreditRange(course)}
      </Typography>
    </Box>
  );

  const renderActionItems = () => (
    <Box>
      <ActionItem label='Bookmark' icon={BookmarkBorder} onClick={() => alert('** mark')} />
      <ActionItem label='Share' icon={Share} onClick={() => alert('** share')} />
    </Box>
  );

  const renderTab = (name, title, icon) => (
    <Tab
      key={name}
      value={name}
      iconPosition='start'
      icon={createElement(icon)}
      label={title}
      onClick={() => navigate(`${coursePageURL}/${name}`)}
    />
  );

  return (
    <Box>
      <Card>
        <CardMedia component='img' image={course.ImageURL} height='360px' />
        <Container maxWidth='xl'>
          <Box padding='16px 0' display='flex' justifyContent='space-between'>
            {renderCourseInfo()}
            {renderActionItems()}
          </Box>
          <TabsWithoutBottomGap value={activeTabName} variant='fullWidth'>
            {Object.entries(tabs).map(([name, { title, icon }]) =>
              renderTab(name, title, icon)
            )}
          </TabsWithoutBottomGap>
        </Container>
      </Card>
    </Box>
  );
}

export const ActionItem = ({ icon, ...props }) => (
  <Tab icon={createElement(icon)} sx={{ fontSize: 'x-small' }} {...props} />
);

export const TabsWithoutBottomGap = styled(Tabs)({
  position: 'relative',
  '> *': { position: 'absolute', bottom: 0, width: '100%' },
  button: { width: '25%', minHeight: 0 },
});

export const formatCreditRange = (course) =>
  `${course.MinCredit === course.MaxCredit ? '' : course.MinCredit + '–'}${pluralize(
    +course.MaxCredit,
    'credit'
  )}`;
