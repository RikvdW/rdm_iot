import React, { Component } from 'react';
import Link from 'react-router-dom'
import './nav.css';

var font ={
}

class Nav extends Component {
  render() {
    return (
      <div className="nav">
        <ul id="navBar">
          <li id="rws">rws</li>
          <li>Little bit</li>
        </ul>
      </div>
    );
  }
}

export default Nav;
