import { AccordionDetails } from '@material-ui/core';
import {
  Check,
  CheckCircle,
  ExpandMore,
  HourglassBottom,
  RadioButtonUnchecked,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionSummary,
  createTheme,
  Rating,
  Stack,
  ThemeProvider,
  Typography,
} from '@mui/material';
import LabelWithIcon from 'components/CoursePage/LabelWithIcon';
import React, { forwardRef, useContext, useEffect, useState } from 'react';
import { pluralize } from 'utils';

const RequirementHeading = forwardRef(
  ({ hasSubsets, title, completed, total, sx, ...accordionProps }, ref) => {
    const [theme, setTheme] = useState(createTheme());

    useEffect(
      () => setTheme(createTheme(sx.backgroundColor ? { palette: { mode: 'dark' } } : {})),
      [sx?.backgroundColor]
    );

    return (
      <Stack position='sticky' marginTop='-32px' sx={{ ...sx }}>
        <Stack backgroundColor='#f1f1f1' height='32px' width='100%' />
        <ThemeProvider theme={theme}>
          <Accordion
            ref={ref}
            disableGutters
            sx={{
              borderRadius: '4px',
              '&:before': { display: 'none' },
              backgroundColor: sx.backgroundColor,
            }}
            {...accordionProps}
          >
            <AccordionSummary expandIcon={<ExpandMore />} sx={{ flexFlow: 'row-reverse' }}>
              <Stack
                paddingLeft='8px'
                width='calc(100% - 12px)'
                direction='row'
                spacing='12px'
                justifyContent='space-between'
                alignItems='center'
              >
                <Typography variant='subtitle1'>{title}</Typography>
                <Typography variant='body2' color='text.secondary'>
                  {Math.min(completed, total)}/{pluralize(total, 'course')}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails style={{ padding: '0 16px 8px' }}>
              <Stack
                paddingLeft='32px'
                width='calc(100% - 24px)'
                direction='row'
                spacing='12px'
                justifyContent='space-between'
                alignItems='center'
              >
                <LabelWithIcon
                  size='small'
                  variant='caption'
                  color={
                    sx.backgroundColor ? undefined : completed >= total ? 'success' : 'action'
                  }
                  iconType={completed >= total ? Check : HourglassBottom}
                  label={
                    completed >= total
                      ? 'You have completed this requirement'
                      : hasSubsets
                      ? 'Complete all of the following:'
                      : `Select ${pluralize(
                          total - completed,
                          (completed ? 'more ' : '') + 'course'
                        )} from the following:`
                  }
                  noWrap
                />
                <Typography variant='body2'>
                  <Rating
                    icon={<CheckCircle fontSize='small' sx={{ color: 'text.secondary' }} />}
                    emptyIcon={<RadioButtonUnchecked fontSize='small' />}
                    readOnly
                    max={total || 0}
                    value={completed || 0}
                  />
                </Typography>
              </Stack>
            </AccordionDetails>
          </Accordion>
        </ThemeProvider>
      </Stack>
    );
  }
);

export default RequirementHeading;
