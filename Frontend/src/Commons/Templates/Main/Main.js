import './Main.css';
import React  from 'react';

export default props =>
    <React.Fragment>
        <main>
            <div>
                {props.children}
            </div>
        </main>
    </React.Fragment>