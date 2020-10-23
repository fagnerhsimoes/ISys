import React from 'react';
import { Alert} from  '../../Components/Alert/Alert';
 
export default props => (
    <section className='content'>
        < Alert />
        {props.children}
    </section>
)