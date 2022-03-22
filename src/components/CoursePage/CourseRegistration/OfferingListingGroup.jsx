import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import { CenterAligningFlexBox } from 'components/CourseCardGrid/CourseCard/CourseCard';
import { getComponent } from 'components/Scheduler/ShoppingCart';
import React from 'react';
import { formatInstructorName } from 'utils';
import OfferingListingItem from './OfferingListingItem';

export default function OfferingListingGroup({
  primaryClass,
  otherClasses,
  toggleSelection,
  selectedClasses,
  ...props
}) {
  const expanded = !!selectedClasses.find((x) => +x.id === +primaryClass.id);

  return (
    <ListItem sx={{ paddingX: '0 !important' }}>
      <Accordion
        sx={{ width: '100%', '> *': { paddingX: '0 !important' } }}
        expanded={otherClasses.length > 0 && expanded}
      >
        <AccordionSummary sx={{ '> *': { marginY: '0 !important' } }}>
          <OfferingListingItem
            component={primaryClass.component}
            classData={primaryClass}
            selected={expanded}
            onSelect={() => toggleSelection(primaryClass)}
            {...props}
          >
            <Box padding='8px 8px 4px'>
              <CenterAligningFlexBox>
                <Avatar src='https://my.eng.utah.edu/~pajensen/Images/Peter.jpg' />
                <Stack marginLeft='12px'>
                  <Typography variant='subtitle1'>
                    {formatInstructorName(primaryClass.instructor)}
                  </Typography>
                  {primaryClass.instructor && (
                    <Typography variant='caption' marginTop='-4px' sx={{ opacity: 0.75 }}>
                      Associate Professor
                    </Typography>
                  )}
                </Stack>
              </CenterAligningFlexBox>
            </Box>
          </OfferingListingItem>
        </AccordionSummary>
        <AccordionDetails sx={{ borderTop: '1px lightgray solid', padding: '0 !important' }}>
          <List disablePadding>
            {otherClasses.map((x) => (
              <ListItem key={x.id} disablePadding disableGutters dense>
                <OfferingListingItem
                  selected={!!selectedClasses.find((y) => +y.id === +x.id)}
                  component={getComponent(x)}
                  classData={x}
                  onSelect={() => toggleSelection(x)}
                  {...props}
                />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </ListItem>
  );
}
