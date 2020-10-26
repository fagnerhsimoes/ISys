import React from 'react';
import { Dialog } from  '../../Components/Dialog/Dialog';
import { Alert } from  '../../Components/Alert/Alert';
 
export default props => (
    <section className='content'>
        < Dialog />
        < Alert />
        {props.children}
    </section>
)