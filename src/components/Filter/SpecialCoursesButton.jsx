import { React, useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

export default function SpecialCoursesButton({ setOptionSelected }) {
  const [honorClicked, setHonorClicked] = useState(true);
  const [specialClicked, setSpecialClicked] = useState(true);
  const [independentClicked, setIndependentClicked] = useState(true);
  const [thesisClicked, setThesisClicked] = useState(true);

  useEffect(() => {
    !honorClicked || !specialClicked || !independentClicked || !thesisClicked
      ? setOptionSelected(true)
      : setOptionSelected(false);
  }, [honorClicked, specialClicked, independentClicked, thesisClicked, setOptionSelected]);

  return (
    <>
      <MenuItem>
        <FormControlLabel
          control={<Checkbox size='small' checked={honorClicked} />}
          label={'Honor Courses'}
          onChange={() => setHonorClicked(!honorClicked)}
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          control={<Checkbox size='small' checked={specialClicked} />}
          label={'Special Topics'}
          onChange={() => setSpecialClicked(!specialClicked)}
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          control={<Checkbox size='small' checked={independentClicked} />}
          label={'Independent Study'}
          onChange={() => setIndependentClicked(!independentClicked)}
        />
      </MenuItem>
      <MenuItem>
        <FormControlLabel
          control={<Checkbox size='small' checked={thesisClicked} />}
          label={'Thesis'}
          onChange={() => setThesisClicked(!thesisClicked)}
        />
      </MenuItem>
    </>
  );
}
