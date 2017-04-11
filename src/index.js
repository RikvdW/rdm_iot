import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Link, Route, browserHistory,withRouter } from 'react-router-dom'


import Nav from './nav/App'
import './index.css';

'use strict';

ReactDOM.render(
  <div>
    <Router history={browserHistory}>
    <Route path=''       component={Nav}/>
    </Router>
  </div>
,
document.getElementById('root')
);
