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
import PreventableLink from 'components/PreventableNavigation/PreventableLink';
import React, { createElement, useContext } from 'react';
import { formatCourseName, formatCreditRange, pluralize } from '../../utils';
import { CenterAligningFlexBox } from '../CourseCardGrid/CourseCard/CourseCard';
import CourseEligibilityIndicator from '../CourseCardGrid/CourseCard/CourseEligibilityIndicator';

export default function CoursePageTop({ course, tabs, activeTabName }) {
  const theme = useTheme();

  const coursePageURL = '/course/' + course.id;

  const renderCourseInfo = () => (
    <Box>
      <CenterAligningFlexBox>
        <CourseEligibilityIndicator course={course} size='medium' placement='bottom'>
          <Typography variant='h5' fontWeight='normal' lineHeight={2} noWrap>
            <b>{formatCourseName(course.catalogCourseName)}</b> — {course.title}
          </Typography>
        </CourseEligibilityIndicator>
      </CenterAligningFlexBox>
      <Typography variant='body1' color={theme.palette.text.secondary}>
        CS major requirement &nbsp;•&nbsp;&nbsp;
        {formatCreditRange(course)}
      </Typography>
    </Box>
  );

  const renderActionItems = () => (
    <Box maxHeight='72px' overflow='hidden'>
      <ActionItem label='Bookmark' icon={BookmarkBorder} onClick={() => alert('** bookmark')} />
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
      component={PreventableLink}
      to={`${coursePageURL}/${name}`}
      sx={{ textDecoration: 'none', minHeight: 0 }}
    />
  );

  return (
    <>
      <CardMedia component='img' image={course.ImageURL} height={imageHeight} />
      <Card sx={{ position: 'sticky', top: 0, zIndex: 1001, boxShadow: 2 }}>
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
    </>
  );
}

/** Used by `CoursePage` to help adjust the scrollbar position for going back to top. */
export const imageHeight = 240;

export const ActionItem = ({ icon, ...props }) => (
  <Tab icon={createElement(icon)} sx={{ fontSize: 'x-small' }} {...props} />
);

export const TabsWithoutBottomGap = styled(Tabs)({
  position: 'relative',
  '> *:first-of-type': { position: 'absolute', bottom: 0, width: '100%' },
  button: { width: '25%', minHeight: 0 },
});
