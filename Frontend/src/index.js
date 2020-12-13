import './Commons/Dependencies/Dependencies';
import './index.css';

import React    from 'react'    ;
import ReactDOM from 'react-dom';
import App    from './app';

import * as registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker.unregister();