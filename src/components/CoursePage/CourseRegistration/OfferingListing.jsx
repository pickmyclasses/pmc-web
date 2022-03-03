import { ChevronRight } from '@mui/icons-material';
import { Box, Button, Card, Grid, List, Portal, Snackbar, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { addClassIDToShoppingCart, removeClassIDFromShoppingCart } from 'api';
import { UserContext } from 'App';
import { SchedulerContext } from 'components/Scheduler/ContainerWithScheduler';
import { getComponent, getInstructor } from 'components/Scheduler/ShoppingCart';
import { motion } from 'framer-motion';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCourseName, groupBy, parseTime } from 'utils';
import { getAllComponents } from '../CourseComponentsSummary';
import OfferingListingGroup from './OfferingListingGroup';
import SchedulePreview from './SchedulePreview';

export default function OfferingListing({ course, schedulePreviewContainer }) {
  const { user } = useContext(UserContext);
  const { classesInShoppingCart, refreshSchedulerData } = useContext(SchedulerContext);

  const [classesOfCourseInShoppingCart, setClassesOfCourseInShoppingCart] = useState([]);
  const [classGroups, setClassGroups] = useState([]);
  const [components, setComponents] = useState([]);
  const [selectedClassesByComponent, setSelectedClassesByComponent] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [highlightedClasses, setHighlightedClasses] = useState([]);
  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [savePromptMessage, setSavePromptMessage] = useState(null);
  const [isSavingLoading, setIsSavingLoading] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  const resetSelections = (resetTo) => {
    setSelectedClassesByComponent(Object.fromEntries(resetTo.map((x) => [getComponent(x), x])));
    setIsDirty(false);
  };

  useEffect(() => {
    const components = getAllComponents(course);
    setComponents(components);

    const fromShoppingCart = classesInShoppingCart
      .filter(({ classData }) => course.classes.find((x) => +x.id === +classData.id))
      .map(({ classData }) => classData);
    setClassesOfCourseInShoppingCart(fromShoppingCart);
    setClassGroups(enumerateClassGroups(course.classes, components));
    resetSelections(fromShoppingCart);
  }, [course, classesInShoppingCart]);

  useEffect(() => {
    if (!selectedGroup) {
      setIsValid(true);
      setSavePromptMessage(
        `Click "Save" to withdraw from ${formatCourseName(course.catalogCourseName)}`
      );
      setSnackbarMessage(
        `${formatCourseName(course.catalogCourseName)} has been removed from your schedule.`
      );
    } else {
      let requiredComponents = new Set(selectedGroup.flat().map((x) => x.component));
      if (requiredComponents.size === selectedClasses.length) {
        setIsValid(true);
        if (classesOfCourseInShoppingCart.length) {
          setSavePromptMessage('Click "Save" to save your changes');
          setSnackbarMessage(`Your schedule has been saved.`);
        } else {
          setSavePromptMessage(
            `Click "Save" to register for ${formatCourseName(course.catalogCourseName)}`
          );
          setSnackbarMessage(
            `${formatCourseName(course.catalogCourseName)} has been added to your schedule.`
          );
        }
      } else {
        setIsValid(false);
        for (let { component } of selectedClasses) requiredComponents.delete(component);
        setSavePromptMessage(`Select a ${[...requiredComponents][0]} component.`);
      }
    }

    if (selectedClasses.length === 0) {
      setHighlightedClasses(
        classGroups.map(([primaryClass]) => ({
          classData: { ...primaryClass },
          course,
          highlight: 'outlined',
          selectionID: primaryClass.id,
        }))
      );
    } else if (selectedClasses.length === 1) {
      const [primaryClass, otherClasses] = selectedGroup;
      const toHighlight = [
        {
          classData: { ...primaryClass },
          course,
          highlight: 'contained',
          selectionID: primaryClass.id,
        },
        ...otherClasses.map((x) => ({
          classData: { ...x },
          course,
          highlight: 'outlined',
          selectionID: x.id,
        })),
      ];
      setHighlightedClasses(toHighlight);
    } else {
      setHighlightedClasses(
        selectedClasses.map((x) => ({
          classData: { ...x },
          course,
          highlight: 'contained',
          selectionID: x.id,
        }))
      );
    }
  }, [
    classGroups,
    classesOfCourseInShoppingCart.length,
    course,
    course.catalogCourseName,
    selectedClasses,
    selectedGroup,
  ]);

  useEffect(() => {
    setSelectedClasses(Object.values(selectedClassesByComponent));

    if (selectedClassesByComponent[components[0]]) {
      setSelectedGroup(
        classGroups.find(
          ([primaryClass]) => +selectedClassesByComponent[components[0]].id === +primaryClass.id
        )
      );
    } else {
      setSelectedGroup(null);
      setIsDirty(classesOfCourseInShoppingCart.length !== 0);
    }
  }, [
    classGroups,
    classesOfCourseInShoppingCart.length,
    components,
    selectedClassesByComponent,
  ]);

  const handleNewSelection = useCallback(
    (classData) => {
      let newValue = { ...selectedClassesByComponent };
      if (+selectedClassesByComponent[classData.component]?.id === classData.id) {
        delete newValue[classData.component];
      } else {
        newValue[classData.component] = classData;
      }

      if (classData.component === components[0]) {
        for (let component in newValue) {
          if (component !== components[0]) delete newValue[component];
        }
      }

      setSelectedClassesByComponent(newValue);
      setIsDirty(true);
    },
    [components, selectedClassesByComponent]
  );

  const handleSaveButtonClick = () => {
    setIsSavingLoading(true);

    Promise.all(
      classesOfCourseInShoppingCart.map((x) =>
        removeClassIDFromShoppingCart({
          userID: user.userID,
          classID: +x.id,
          semesterID: 1,
        })
      )
    )
      .then(() =>
        Promise.all(
          selectedClasses.map((x) =>
            addClassIDToShoppingCart({
              userID: user.userID,
              classID: +x.id,
              semesterID: 1,
            })
          )
        )
      )
      .then(() =>
        refreshSchedulerData(() => {
          setIsSavingLoading(false);
          setIsSnackbarOpen(true);
        })
      );
  };

  return (
    <>
      <Portal container={schedulePreviewContainer}>
        <SchedulePreview
          classesToHighlight={highlightedClasses}
          onSelect={(classID) => {
            for (let group of classGroups) {
              const targetClass = group.flat().find((x) => +x.id === +classID);
              if (targetClass) return void handleNewSelection(targetClass);
            }
          }}
        />
      </Portal>
      <List sx={{ marginBottom: '92px' }}>
        {classGroups.map(([primaryClass, otherClasses]) => (
          <OfferingListingGroup
            key={primaryClass.id}
            primaryClass={primaryClass}
            otherClasses={otherClasses}
            toggleSelection={handleNewSelection}
            selectedClasses={selectedClasses}
          />
        ))}
      </List>
      <MotionBox
        position='fixed'
        bottom='24px'
        width='100vw'
        zIndex={999}
        variants={savePromptVariants}
        initial='initial'
        animate={isDirty ? 'visible' : 'initial'}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <Grid maxWidth='xl'>
          <Grid item xs={7.5}>
            <Card sx={{ width: 'calc(100% - 46px)', boxShadow: 3 }}>
              <Stack padding='12px 20px' direction='row' justifyContent='space-between'>
                <Stack direction='row' alignItems='center' spacing='4px'>
                  {user ? savePromptMessage : 'Login to save your schedule'}
                  {(isValid || !user) && <ChevronRight />}
                </Stack>
                <Stack direction='row' spacing='16px'>
                  {user ? (
                    <>
                      <LoadingButton
                        variant='contained'
                        disabled={!isValid}
                        loading={isSavingLoading}
                        onClick={handleSaveButtonClick}
                      >
                        Save
                      </LoadingButton>
                      <Button
                        color='inherit'
                        variant='text'
                        onClick={() => resetSelections(classesOfCourseInShoppingCart)}
                      >
                        Reset
                      </Button>
                    </>
                  ) : (
                    <Button variant='contained' component={Link} to='/auth'>
                      Login
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </MotionBox>
      <Snackbar
        open={!!isSnackbarOpen}
        autoHideDuration={4000}
        onClose={() => setIsSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
}

const MotionBox = motion(Box);

const savePromptVariants = {
  initial: { marginBottom: '-64px', opacity: 0 },
  visible: { marginBottom: 0, opacity: 1 },
};

const enumerateClassGroups = (classes, components) => {
  const classesByInstructor = groupBy(
    classes.map((x) => ({
      ...x,
      component: getComponent(x),
      instructor: getInstructor(x),
    })),
    'instructor'
  );
  let res = [];
  for (let classes of Object.values(classesByInstructor)) {
    const primaryClasses = classes.filter((x) => x.component === components[0]);
    const otherClasses = classes.filter((x) => x.component !== components[0]);
    for (let primaryClass of primaryClasses) {
      res.push([
        primaryClass,
        otherClasses.concat().sort((x, y) => parseTime(x.startTime) - parseTime(y.startTime)),
      ]);
    }
  }
  return res;
};
