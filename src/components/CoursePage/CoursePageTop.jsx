import { Bookmark, BookmarkBorder, Share } from '@mui/icons-material';
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
import { addBookmarkedCourseID, removeBookmarkedCourseID } from 'api';
import { UserContext } from 'App';
import { PreventableNavigationContext } from 'components/PreventableNavigation/ContainerWithPreventableNavigation';
import PreventableLink from 'components/PreventableNavigation/PreventableLink';
import { SchedulerContext } from 'components/Scheduler/ContainerWithScheduler';
import React, { createElement, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { formatCourseName, formatCreditRange, capitalizeFirst } from '../../utils';
import { CenterAligningFlexBox } from '../CourseCardGrid/CourseCard/CourseCard';
import CourseEligibilityIndicator from '../CourseCardGrid/CourseCard/CourseEligibilityIndicator';
import CousreShare from '../CoursePage/CourseShare';

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
  const { user } = useContext(UserContext);
  const { bookmarkedCourses } = useContext(SchedulerContext);
  const { navigateIfAllowed } = useContext(PreventableNavigationContext);

  const theme = useTheme();
  const location = useLocation();

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(
    () => setIsBookmarked(bookmarkedCourses?.some((x) => x.id === course.id)),
    [course.id, bookmarkedCourses]
  );

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

  const handleBookmarkClick = () => {
    if (!user)
      return void navigateIfAllowed('/auth', null, {
        state: { linkTo: location.pathname },
      });

    if (isBookmarked) removeBookmarkedCourseID(user.userID, course.id);
    else addBookmarkedCourseID(user.userID, course.id);
    setIsBookmarked(!isBookmarked);
  };

  const renderActionItems = () => (
    <Box maxHeight='72px' overflow='hidden'>
      <ActionItem
        label={isBookmarked ? 'Bookmarked' : 'Bookmark'}
        icon={isBookmarked ? Bookmark : BookmarkBorder}
        onClick={handleBookmarkClick}
      />
      {/* <ActionItem label='Share' icon={Share} onClick={() => CousreShare()} />
      <CousreShare /> */}
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
  <Tab icon={createElement(icon)} sx={{ fontSize: 'x-small', width: '112px' }} {...props} />
);

export const TabsWithoutBottomGap = styled(Tabs)({
  position: 'relative',
  '> *:first-of-type': { position: 'absolute', bottom: 0, width: '100%' },
  button: { width: '25%', minHeight: 0 },
});

export const formatCourseRequirementReward = (degreeCatalogs) =>
  degreeCatalogs[degreeCatalogs.length - 1][0]
    .replace(/(course)?s$/i, '')
    .split(/\s+/)
    .map((x) => (x.length > 2 ? capitalizeFirst(x) : x))
    .join(' ');
