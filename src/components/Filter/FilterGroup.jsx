import { React, useContext, useState } from 'react';
import { Box, Grid, Button } from '@mui/material';
import { grey, cyan } from '@mui/material/colors';
import ProfessorButton from './ProfessorButton';
import TagButton from './TagButton';
import TimeButton from './TimeButton';
import DateButton from './DateButton';
import CreditButton from './CreditButton';
import RatingButton from './RatingButton';
import TypeButton from './TypeButton';
import DropdownButton from './DropdownButton';
import SpecialCoursesButton from './SpecialCoursesButton';
import { FilterContext } from 'pages/SearchPage';

export default function FilterGroup() {
  const [hideClicked, setHideClicked] = useState(false);

  const { noOffering, setNoOffering } = useContext(FilterContext);

  const buttonStyleBeforeClick = {
    color: grey[900],
    backgroundColor: grey[100],
    '&:hover': {
      color: grey[50],
      backgroundColor: cyan[800],
    },
  };

  const buttonStyleAfterClick = {
    color: grey[50],
    backgroundColor: cyan[800],
    '&:hover': {
      color: grey[50],
      backgroundColor: cyan[800],
    },
  };

  const handleNoOfferingClick = () => {
    setHideClicked(!hideClicked);
    setNoOffering(!noOffering);
  };

  const buttonGroup = [
    { name: 'type', component: <TypeButton /> },
    { name: 'course level', component: <SpecialCoursesButton /> },
    { name: 'rating', component: <RatingButton /> },
    { name: 'credit hour', component: <CreditButton /> },
    { name: 'date', component: <DateButton /> },
    { name: 'time', component: <TimeButton /> },
    { name: 'include tag', component: <TagButton /> },
    { name: 'professor', component: <ProfessorButton /> },
  ];
  return (
    <Box
      sx={{
        p: 2,
        border: '1px solid grey',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Box sx={{ display: 'inline-block', marginRight: '6em' }}>
        <Button
          variant='contained'
          sx={hideClicked ? buttonStyleAfterClick : buttonStyleBeforeClick}
          onClick={handleNoOfferingClick}
          mr='2em'
        >
          <div style={{ textTransform: 'lowercase' }}>hide no offerings</div>
        </Button>
      </Box>

      {buttonGroup.map((button, i) => {
        return (
          <Box sx={{ display: 'inline-block', marginRight: '3em' }}>
            <DropdownButton name={button.name}>{button.component}</DropdownButton>
          </Box>
        );
      })}
    </Box>
  );
}
