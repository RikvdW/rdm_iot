import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

import Nav from './nav/App'
import Tunnel from './rws/Tunnel/App'
import Buoy from './rws/Buoy/App'
import Water from './rws/Waterlevel/App'
import './index.css';

'use strict';

ReactDOM.render(
  <div>
    <Nav/>
  </div>
,
document.getElementById('root')
);
