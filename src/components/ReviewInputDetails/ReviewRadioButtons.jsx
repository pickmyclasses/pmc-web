import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Grid } from '@mui/material';
import { gridSpacing } from '../../constants/constants';

// Framework for the radio buttons group functionality when writing a review
export default function RowRadioButtonsGroup({ radioLabel, options, radioValue, onChange }) {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid
        item
        xs={12}
        sm={12}
        container
        direction='column'
        alignItems='Left'
        justifyContent='Left'
      >
        <FormControl>
          <FormLabel id='demo-row-radio-buttons-group-label'>{radioLabel}</FormLabel>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='row-radio-buttons-group'
          >
            {options.map((option, i) => (
              <FormControlLabel
                key={i}
                value={option['optionValue']}
                onChange={(event, value) => {
                  onChange(option['optionValue']);
                }}
                control={<Radio />}
                label={option['optionLabel']}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
}
