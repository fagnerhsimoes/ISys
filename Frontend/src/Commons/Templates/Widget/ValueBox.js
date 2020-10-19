import React from 'react'
import Grid from '../Form/Grid'

export default props => (
    <Grid cols={props.cols}> 
        <div className={`small-box bg-${props.color}`}> 
            <div className='inner'> 
                <p>{props.title}</p>
                <h2>{props.value}</h2>
                <p>{props.subtitle}</p>
            </div> 
            <div className='icon'> 
                <i className={`fa fa-${props.icon}`}></i>
            </div> 
        </div> 
    </Grid> 
) 