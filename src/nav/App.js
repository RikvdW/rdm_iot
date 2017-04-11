import React, { Component,PropTypes } from 'react';
import {BrowserRouter as Router, Link, Route,withRouter } from 'react-router-dom'
import { browserHistory } from 'react-router'
import './nav.css';

import Home from '../home/home'
import Tunnel from '../rws/Tunnel/App'
import Buoy from '../rws/Buoy/App'
import Water from '../rws/Waterlevel/App'
import LittleBit from '../LittleBit/lb'
import Weather from '../weather/weather'


var Change_text="pause";

var counter = 0;

var page=[
  '/home',
  '/c/Buoy',
  '/c/Water',
  '/c/Tunnel',
  '/c/Little',
  '/c/Weather'
]

var int_ch=0;

class Nav extends Component {



  constructor(props) {
    super();
    this.change = this.change.bind(this);
    this.state = {
       change : 0
    }

  }

  componentWillMount(){
    int_ch=setInterval(this.change,20000);
    this.setState({change:1});
  }




  change=(e)=> {
    //e.preventDefault();
    console.log("test")
    this.props.history.push(page[counter]);
    if(counter==page.length-1){
      counter=0;
    }else{
      counter++;
    }
  }

  setChange=(e)=>{
    if(this.state.change==0){
      int_ch=setInterval(this.change,20000);
      this.setState({change:1});
      Change_text="pause"
    }else{
      clearInterval(int_ch);
      this.setState({change:0});
      Change_text="play"
    }
  }

  render() {
    return (
      <div>
        <div>
          <div className="nav">

            <ul id="navBar">
              <Link to='/home'><li>Home</li></Link>
              <Link to='/c/Buoy'><li>Buoy</li></Link>
              <Link to='/c/Water'><li>Water level</li></Link>
              <Link to='/c/Tunnel'><li>Tunnel</li></Link>
              <Link to='/c/Little'><li>Little bit</li></Link>
              <Link to='/c/Weather'><li>Weather</li></Link>
            </ul>
          </div>
          <div>
            <Route path='/home'       component={Home}/>
            <Route path='/c/Buoy'     component={Buoy}/>
            <Route path='/c/Water'    component={Water}/>
            <Route path='/c/Tunnel'   component={Tunnel}/>
            <Route path='/c/Little'   component={LittleBit}/>
            <Route path='/c/Weather'  component={Weather}/>
          </div>

        </div>
        <input type="button" onClick={this.setChange} value={Change_text} />
      </div>


    );
  }
}
console.log(Nav.PropTypes);
Nav.props = {
  router: PropTypes.object
};

export default Nav;
