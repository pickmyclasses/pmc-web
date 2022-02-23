import { React, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey, cyan } from '@mui/material/colors';
import { SpecialCourseDropdown, SpecialDropdown } from './DropDowns';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);

export default function FilterGroup() {
  const [hideClicked, setHideClicked] = useState(false);
  const [typeClicked, setTypeClicked] = useState(false);
  const [specialCoursesClicked, setSpecialCourseClicked] = useState(false);
  const [specialsClicked, setSpecialClicked] = useState(false);
  const [ratingClicked, setRatingClicked] = useState(false);
  const [creditClicked, setCreditClicked] = useState(false);
  const [datesClicked, setDatesClicked] = useState(false);
  const [timeClicked, setTimeClicked] = useState(false);
  const [excludeTagClicked, setExcludeTagClicked] = useState(false);
  const [excludeProfessorClicked, setExcludeProfessorClicked] = useState(false);

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

        <Button
          variant='contained'
          sx={typeClicked ? buttonStyleAfterClick : buttonStyleBeforeClick}
          style={{ marginRight: '1%' }}
          onClick={() => setTypeClicked(!typeClicked)}
        >
          <div style={{ textTransform: 'lowercase' }}> type</div>
          {typeClicked ? (
            <FontAwesomeIcon icon={['fas', 'caret-down']} style={{ marginLeft: '5px' }} />
          ) : (
            <FontAwesomeIcon icon={['fas', 'caret-right']} style={{ marginLeft: '5px' }} />
          )}
        </Button>

        <Button
          variant='contained'
          sx={specialCoursesClicked ? buttonStyleAfterClick : buttonStyleBeforeClick}
          style={{ marginRight: '1%' }}
          onClick={() => setSpecialCourseClicked(!specialCoursesClicked)}
        >
          <div style={{ textTransform: 'lowercase' }}> Special courses</div>
          {specialCoursesClicked ? (
            <FontAwesomeIcon icon={['fas', 'caret-down']} style={{ marginLeft: '5px' }} />
          ) : (
            <FontAwesomeIcon icon={['fas', 'caret-right']} style={{ marginLeft: '5px' }} />
          )}
        </Button>

        <Button
          variant='contained'
          sx={specialsClicked ? buttonStyleAfterClick : buttonStyleBeforeClick}
          style={{ marginRight: '1%' }}
          onClick={() => setSpecialClicked(!specialsClicked)}
        >
          <div style={{ textTransform: 'lowercase' }}> Specials</div>
          {specialsClicked ? (
            <FontAwesomeIcon icon={['fas', 'caret-down']} style={{ marginLeft: '5px' }} />
          ) : (
            <FontAwesomeIcon icon={['fas', 'caret-right']} style={{ marginLeft: '5px' }} />
          )}
        </Button>

        <Button
          variant='contained'
          sx={ratingClicked ? buttonStyleAfterClick : buttonStyleBeforeClick}
          style={{ marginRight: '1%' }}
          onClick={() => setRatingClicked(!ratingClicked)}
        >
          <div style={{ textTransform: 'lowercase' }}> rating</div>
          {ratingClicked ? (
            <FontAwesomeIcon icon={['fas', 'caret-down']} style={{ marginLeft: '5px' }} />
          ) : (
            <FontAwesomeIcon icon={['fas', 'caret-right']} style={{ marginLeft: '5px' }} />
          )}
        </Button>

        <Button
          variant='contained'
          sx={creditClicked ? buttonStyleAfterClick : buttonStyleBeforeClick}
          style={{ marginRight: '1%' }}
          onClick={() => setCreditClicked(!creditClicked)}
        >
          <div style={{ textTransform: 'lowercase' }}> credit hour</div>
          {creditClicked ? (
            <FontAwesomeIcon icon={['fas', 'caret-down']} style={{ marginLeft: '5px' }} />
          ) : (
            <FontAwesomeIcon icon={['fas', 'caret-right']} style={{ marginLeft: '5px' }} />
          )}
        </Button>

        <Button
          variant='contained'
          sx={datesClicked ? buttonStyleAfterClick : buttonStyleBeforeClick}
          style={{ marginRight: '1%' }}
          onClick={() => setDatesClicked(!datesClicked)}
        >
          <div style={{ textTransform: 'lowercase' }}> dates</div>
          {datesClicked ? (
            <FontAwesomeIcon icon={['fas', 'caret-down']} style={{ marginLeft: '5px' }} />
          ) : (
            <FontAwesomeIcon icon={['fas', 'caret-right']} style={{ marginLeft: '5px' }} />
          )}
        </Button>

        <Button
          variant='contained'
          sx={timeClicked ? buttonStyleAfterClick : buttonStyleBeforeClick}
          style={{ marginRight: '1%' }}
          onClick={() => setTimeClicked(!timeClicked)}
        >
          <div style={{ textTransform: 'lowercase' }}> time range</div>
          {timeClicked ? (
            <FontAwesomeIcon icon={['fas', 'caret-down']} style={{ marginLeft: '5px' }} />
          ) : (
            <FontAwesomeIcon icon={['fas', 'caret-right']} style={{ marginLeft: '5px' }} />
          )}
        </Button>

        <Button
          variant='contained'
          sx={excludeTagClicked ? buttonStyleAfterClick : buttonStyleBeforeClick}
          style={{ marginRight: '1%' }}
          onClick={() => setExcludeTagClicked(!excludeTagClicked)}
        >
          <div style={{ textTransform: 'lowercase' }}> exclude tags</div>
          {excludeTagClicked ? (
            <FontAwesomeIcon icon={['fas', 'caret-down']} style={{ marginLeft: '5px' }} />
          ) : (
            <FontAwesomeIcon icon={['fas', 'caret-right']} style={{ marginLeft: '5px' }} />
          )}
        </Button>

        <Button
          variant='contained'
          sx={excludeProfessorClicked ? buttonStyleAfterClick : buttonStyleBeforeClick}
          style={{ marginRight: '1%' }}
          onClick={() => setExcludeProfessorClicked(!excludeProfessorClicked)}
        >
          <div style={{ textTransform: 'lowercase' }}> exclude professors</div>
          {excludeProfessorClicked ? (
            <FontAwesomeIcon icon={['fas', 'caret-down']} style={{ marginLeft: '5px' }} />
          ) : (
            <FontAwesomeIcon icon={['fas', 'caret-right']} style={{ marginLeft: '5px' }} />
          )}
        </Button>

        <Button variant='text' sx={{ mt: '0.4%' }}>
          S<div style={{ textTransform: 'lowercase' }}>ave</div>
        </Button>
        <Button variant='text' sx={{ mt: '0.4%' }}>
          R<div style={{ textTransform: 'lowercase' }}>eset</div>
        </Button>
      </Box>
      {specialCoursesClicked && <SpecialDropdown />}
    </>
  );
}
