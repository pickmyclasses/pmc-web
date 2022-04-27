import { BookmarkAdded, BookmarkBorder, Close, Facebook, Share } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  styled,
  Tab,
  Tabs,
  Typography,
  useTheme,
  IconButton,
  Divider,
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
import { FacebookShareButton } from 'react-share';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useSnackbar } from 'notistack';

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
export default function CoursePageTop({
  course,
  tabs,
  activeTabName,
  isBookmarked,
  onIsBookmarkedChange,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

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

  const handleShareDialogClose = () => setIsShareDialogOpen(false);

  const renderShareDialog = () => (
    <Dialog open={isShareDialogOpen} onClose={handleShareDialogClose}>
      <Stack padding='24px' spacing='12px'>
        <Stack direction='row' justifyContent='space-between' paddingBottom='12px'>
          <Typography variant='h6'>
            Share {formatCourseName(course.catalogCourseName)}
          </Typography>
          <IconButton onClick={handleShareDialogClose} sx={{ padding: 0 }}>
            <Close />
          </IconButton>
        </Stack>
        <Stack
          padding='8px'
          direction='row'
          alignItems='center'
          backgroundColor='action.selected'
          borderRadius='4px'
        >
          <Typography variant='body1' paddingLeft='8px' paddingRight='20px'>
            {window.location.href}
          </Typography>
          <CopyToClipboard text={window.location.href}>
            <Button onClick={() => enqueueSnackbar('Link copied')}>Copy</Button>
          </CopyToClipboard>
        </Stack>
        <Typography paddingTop='12px' variant='caption' color='text.secondary'>
          On social media
        </Typography>
        <Divider sx={{ marginTop: '4px !important' }} />
        <Stack direction='row' spacing='12px'>
          {/*For your informaiton of editing the Sharing button https://github.com/nygardk/react-share#readme or https://www.npmjs.com/package/react-share */}
          <FacebookShareButton
            url={
              window.location.href.includes('localhost:')
                ? `https://pickmyclass.com/course/${course.id}`
                : window.location.href
            }
            hashtag={'#PickMyClasses'}
            quote={`Check out ${formatCourseName(course.catalogCourseName)} — ${course.title}`}
          >
            <IconButton>
              <Facebook fontSize='large' sx={{ color: '#4267B2' }} />
            </IconButton>
          </FacebookShareButton>
        </Stack>
      </Stack>
    </Dialog>
  );

  const renderActionItems = () => (
    <>
      <Box maxHeight='72px' overflow='hidden'>
        <ActionItem
          label={isBookmarked ? 'Bookmarked' : 'Bookmark'}
          icon={isBookmarked ? BookmarkAdded : BookmarkBorder}
          onClick={() => onIsBookmarkedChange?.(!isBookmarked)}
        />
        <ActionItem label='Share' icon={Share} onClick={() => setIsShareDialogOpen(true)} />
      </Box>
      {renderShareDialog()}
    </>
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
  <Tab icon={createElement(icon)} sx={{ fontSize: 'x-small', width: '96px' }} {...props} />
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
