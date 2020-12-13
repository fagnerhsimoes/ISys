import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';

export default props => (
    <div>
        <input {...props.input}
            className='form-control'
            placeholder={props.placeholder}
            readOnly={props.readOnly}
            type={props.type} />

        {props.meta.error && props.meta.touched &&
            <div style={{color: 'red'}}>
                {props.meta.error}
            </div>
        }
    </div>
)


export const InputCuston = ({ input, label, placeholder, readOnly, type, meta: { touched, error, warning } }) => (
    <div>
      <InputLabel>{label}</InputLabel>
      <div>
        <input {...input} 
            placeholder={placeholder} 
            readOnly={readOnly} 
            type={type}/>

        {touched && ((error && 
            <div style={{color: 'red'}}>
                {error}
            </div>) || (warning && 
            <div style={{color: 'red'}}>
                {warning}
            </div>))}
      </div>
    </div>
  )