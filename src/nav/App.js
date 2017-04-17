import React, { Component,PropTypes } from 'react';
import {BrowserRouter as Router, Link, Route,withRouter } from 'react-router-dom'
import { browserHistory } from 'react-router'
import './nav.css';

import play from './img/play.png'
import pause from './img/pause.png'

import buoy from './img/buoy.png'
import level from './img/level.png'
import tunnel from './img/tunnel.png'

import sun from '../weather/sun.png'

import Home from '../home/home'
import Tunnel from '../rws/Tunnel/App'
import Buoy from '../rws/Buoy/App'
import Water from '../rws/Waterlevel/App'
import LittleBit from '../LittleBit/lb'
import Weather from '../weather/weather'




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
    change : 0,
    chage_img:pause
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
  if(this.state.change===0){
   int_ch=setInterval(this.change,20000);
   this.setState({change:1});
   this.setState({chage_img:pause});
  }else{
   clearInterval(int_ch);
   this.setState({change:0});
   console.log("hello")
   this.setState({chage_img:play});
  }
 }

 render() {
  return (
   <div>


     <div className="nav">
     <header>
      <h1>IoT <span id="orange">Academy</span> Rotterdam</h1>
      <h3> powered by IBM Watson IoT</h3>
      <button onClick={this.setChange}><img src={this.state.chage_img}/></button>
     </header>
       <svg version="1.1" id="nav"  x="0px" y="0px" width="198.425px" height="427.578px" viewBox="0 0 198.425 427.578" enable-background="new 0 0 198.425 427.578">
          <pattern id="buoy" patternUnits="userSpaceOnUse" height="190" width="210">
            <image x="100 " y="-60" height="220" width="140" href={buoy}></image>
          </pattern>
          <pattern id="level" patternUnits="userSpaceOnUse" height="190" width="210">
            <image x="70" y="45" height="200" width="200" href={level}></image>
          </pattern>
          <pattern id="tunnel" patternUnits="userSpaceOnUse" height="150" width="210">
            <image x="70" y="40" height="100" width="200" href={tunnel}></image>
          </pattern>
          <pattern id="weather" patternUnits="userSpaceOnUse" height="150" width="210">
            <image x="-5" y="70" height="70" width="100" href={sun}></image>
          </pattern>
          <Link to='/c/Weather'><polygon id="D7" fill="url(#weather)" points="88.28,311.498 0,311.498 0,195.417 87.956,195.417 "/></Link>
          <Link to='/c/Little'><rect id="D8" y="311.498" z width="88.28" height="116.08"/></Link>
          <Link to='/c/Tunnel'><rect id="D11" fill="url(#tunnel)" x="138.19" y="349.866"  width="60.234" height="77.712"/></Link>
          <Link to='/c/Water'><rect id="D10" fill="url(#level)" x="138.19" y="272.804"  width="60.234" height="77.062"/></Link>
          <Link to='/c/Buoy'> <rect id="D9" fill="url(#buoy)" x="138.19" y="195.58"  width="60.234" height="77.224"/></Link>
          <Link to='/home'><polygon id="C7" points="198.425,0 198.425,183.386 0,183.386 0,38.368 128.111,39.668 128.111,0 "/></Link>
       </svg>
     </div>
     <div>
      <Route path='/home'    component={Home}/>
      <Route path='/c/Buoy'   component={Buoy}/>
      <Route path='/c/Water'  component={Water}/>
      <Route path='/c/Tunnel'  component={Tunnel}/>
      <Route path='/c/Little'  component={LittleBit}/>
      <Route path='/c/Weather' component={Weather}/>
     </div>

   </div>


  );
 }
}
console.log(Nav.PropTypes);
Nav.props = {
 router: PropTypes.object
};

export default Nav;
