import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function CheckBox({ id ,isSelected, onCheckboxChange, label }) {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            name={id}
            checked={isSelected}
            onChange={onCheckboxChange}
            color="primary"
          />
        }
        label={label}
      />
      </FormGroup>
  );
}