import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, hashHistory} from 'react-router-dom'
import './nav.css';

import Tunnel from '../rws/Tunnel/App'
import Buoy from '../rws/Buoy/App'
import Water from '../rws/Waterlevel/App'
import LittleBit from '../LittleBit/lb'
import Weather from '../weather/weather'

var font ={
}

var i =0;
class Nav extends Component {
  render() {
    return (
      <div>
      <Router history={hashHistory}>
        <div>
          <div className="nav">
            <ul id="navBar">
              <Link to='/c/Buoy'><li>Buoy</li></Link>
              <Link to='/c/Water'><li>Water level</li></Link>
              <Link to='/c/Tunnel'><li>Tunnel</li></Link>
              <Link to='/c/Little'><li>Little bit</li></Link>
              <Link to='/c/Weather'><li>Weather</li></Link>
            </ul>
          </div>
          <div>
            <Route path='/c/Buoy'   component={Buoy}/>
            <Route path='/c/Water'  component={Water}/>
            <Route path='/c/Tunnel' component={Tunnel}/>
            <Route path='/c/Little' component={LittleBit}/>
            <Route path='/c/Weather' component={Weather}/>
          </div>
        </div>
      </Router>
      </div>


    );
  }
}

export default Nav;
