import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link} from 'react-router-dom'

import App from './rws/App';
import Nav from './nav/App'
import Tunnel from './rws/Tunnel/App'
import Buoy from './rws/Buoy/App'
import Water from './rws/Waterlevel/App'
import './index.css';

'use strict';

ReactDOM.render(
<Water/>

,

document.getElementById('root')
);