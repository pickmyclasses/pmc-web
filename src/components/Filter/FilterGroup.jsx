import { React, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey, cyan } from '@mui/material/colors';
import ProfessorButton from './ProfessorButton';
import TagButton from './TagButton';
import TimeButton from './TimeButton';
import DateButton from './DateButton';
import CreditButton from './CreditButton';
import RatingButton from './RatingButton';
import TypeButton from './TypeButton';
import SpecialCoursesButton from './SpecialCoursesButton';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export default function FilterGroup() {
  const [hideClicked, setHideClicked] = useState(false);

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

  return (
    <>
      <Box sx={{ p: 2, border: '1px solid grey', backgroundColor: 'white' }}>
        <Button
          variant='contained'
          sx={hideClicked ? buttonStyleAfterClick : buttonStyleBeforeClick}
          style={{ marginLeft: '10%', marginRight: '2%' }}
          onClick={() => setHideClicked(!hideClicked)}
        >
          <div style={{ textTransform: 'lowercase' }}>hide no offerings</div>
        </Button>
        <TypeButton beforeClick={buttonStyleBeforeClick} afterClick={buttonStyleAfterClick} />
        <SpecialCoursesButton
          beforeClick={buttonStyleBeforeClick}
          afterClick={buttonStyleAfterClick}
        />
        <RatingButton beforeClick={buttonStyleBeforeClick} afterClick={buttonStyleAfterClick} />
        <CreditButton beforeClick={buttonStyleBeforeClick} afterClick={buttonStyleAfterClick} />
        <DateButton beforeClick={buttonStyleBeforeClick} afterClick={buttonStyleAfterClick} />
        <TimeButton beforeClick={buttonStyleBeforeClick} afterClick={buttonStyleAfterClick} />
        <TagButton beforeClick={buttonStyleBeforeClick} afterClick={buttonStyleAfterClick} />
        <ProfessorButton
          beforeClick={buttonStyleBeforeClick}
          afterClick={buttonStyleAfterClick}
        />
        <Button variant='text' sx={{ mt: '0.4%' }}>
          S<div style={{ textTransform: 'lowercase' }}>ave</div>
        </Button>
        <Button variant='text' sx={{ mt: '0.4%' }}>
          R<div style={{ textTransform: 'lowercase' }}>eset</div>
        </Button>
      </Box>
    </>
  );
}
