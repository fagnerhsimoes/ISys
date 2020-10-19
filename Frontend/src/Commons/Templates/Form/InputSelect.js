import React from 'react';

export const InputIcon = ({ input, placeholder, icon, type, meta: { touched, error, warning } }) => (
        <div >
        <input {...input} 
            placeholder={placeholder} 
            type={type}/>
            <span className={`glyphicon glyphicon-${icon}
                form-control-feedback`}>
            </span>

            {touched && ((error && 
            <div style={{color: 'red'}}>
                {error}
            </div>) || (warning && 
            <div style={{color: 'red'}}>
                {warning}
            </div>))}
      </div>
  )