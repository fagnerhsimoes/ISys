import React from 'react';
import Select from '@material-ui/core/Select';
import { makeStyles, responsiveFontSizes } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import  MenuItem  from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1, 1 ,1, 0),
    minWidth: 420,
  },
  menu: {
    fontSize: 16
  }
}));

export default function Selector({input , label, placeholder, data, meta: { touched, error, warning }}) {
  const classes = useStyles();

  return (
    <div>
      <InputLabel>{label}</InputLabel>
      <div>
        <FormControl className={classes.formControl}>
          <Select className={classes.menu} {...input} >
            <MenuItem value="" disabled>{placeholder}</MenuItem>
            {data.map((r) => (
                <MenuItem className={classes.menu} value={r.id}
                            key={r.id}>
                             {r.title}
                </MenuItem>
              ))}
          </Select>

          {touched && ((error && 
            <div style={{color: 'red'}}>
                {error}
            </div>) || (warning && 
            <div style={{color: 'red'}}>
                {warning}
            </div>))}
        </FormControl>
      </div>
    </div>
  );
}