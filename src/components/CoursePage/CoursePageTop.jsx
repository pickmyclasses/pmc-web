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
import React, { createElement } from 'react';
import { formatCourseName, formatCreditRange, capitalizeFirst } from '../../utils';
import { CenterAligningFlexBox } from '../CourseCardGrid/CourseCard/CourseCard';
import CourseEligibilityIndicator from '../CourseCardGrid/CourseCard/CourseEligibilityIndicator';

/**
 * The top portion of the course page that displays an image banner (like the channel art from
 * YouTube) and the basic info of a course.
 *
 * @param {Object} props
 * @param {Object} props.course The course whose info will be displayed.
 * @param {Array<[name: String, {title: String, icon}]>} props.tabs The tabs to show in the tab
 *     list.
 * @param {String} props.activeTabName The `name` of the tab to highlight as selected.
 */
export default function CoursePageTop({ course, tabs, activeTabName }) {
  const theme = useTheme();

  const coursePageURL = '/course/' + course.id;

  const renderCourseInfo = () => (
    <Box>
      <CenterAligningFlexBox>
        <CourseEligibilityIndicator course={course} size='medium' tooltipPlacement='bottom'>
          <Typography variant='h5' fontWeight='normal' lineHeight={2} noWrap>
            <b>{formatCourseName(course.catalogCourseName)}</b> — {course.title}
          </Typography>
        </CourseEligibilityIndicator>
      </CenterAligningFlexBox>
      <Typography variant='body1' color={theme.palette.text.secondary}>
        {course.degreeCatalogs?.length > 0 && (
          <>{formatCourseRequirementReward(course.degreeCatalogs)}&nbsp;&nbsp;•&nbsp;&nbsp;</>
        )}
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

/**
 * Used by `CoursePage` to help adjust the scrollbar position for going back to top.
 *
 * UPDATE 03/23/22: Temporarily removed the image since we don't have the image pool ready yet.
 */
export const imageHeight = 0;

export const ActionItem = ({ icon, ...props }) => (
  <Tab icon={createElement(icon)} sx={{ fontSize: 'x-small' }} {...props} />
);

export const TabsWithoutBottomGap = styled(Tabs)({
  position: 'relative',
  '> *:first-of-type': { position: 'absolute', bottom: 0, width: '100%' },
  button: { width: '25%', minHeight: 0 },
});

export const formatCourseRequirementReward = (degreeCatalogs) =>
  degreeCatalogs[0][0]
    .replace(/(course)?s$/i, '')
    .split(/\s+/)
    .map(capitalizeFirst)
    .join(' ');
