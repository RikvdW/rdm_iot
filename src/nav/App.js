import React, { Component,PropTypes } from 'react';
import {BrowserRouter as Router, Link, Route,withRouter } from 'react-router-dom'
import { browserHistory } from 'react-router'
import Svg from 'svg-react'

import './nav.css';

import play from './img/play.png'
import pause from './img/pause.png'

import buoy_ic from './img/ic/buoy.png'
import level_ic from './img/ic/water.png'
import tunnel_ic from './img/ic/tunnel.png'
import weather_ic from './img/ic/weather.png'
import home_ic from './img/ic/home.png'
import cut_ic from './img/ic/bestek.png'


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
 '/c/Tunnel',
  '/c/Water',
 '/c/Little',
 '/c/Weather'
]

var cover_img=[
  null,
  buoy,
  tunnel,
  level,
  null,
  null
]

var int_ch=0;

class Nav extends Component {



 constructor(props) {
  super();
  this.change = this.change.bind(this);
  this.state = {
    change : 0,
    chage_img:pause,
    cover: null
  }


 }

 componentWillMount(){
  int_ch=setInterval(this.change,20000);
  this.setState({change:1});
 }


 change=(e)=> {
  //e.preventDefault();
  if(counter==page.length-1){
   counter=0;
  }else{
   counter++;
  }
  this.props.history.push(page[counter]);
  this.setState({cover:cover_img[counter]});
 }

 setCounter=(item)=>{
   counter=item;
   this.setState({cover:cover_img[counter]});
 }


 setChange=(e)=>{
    if(this.state.change===0){
     int_ch=setInterval(this.change,20000);
     this.setState({change:1});
     this.setState({chage_img:pause});
    }else{
     clearInterval(int_ch);
     this.setState({change:0});
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
       <div id="container">
         <div id="menu">
           <ul>
             <Link to="/home" onClick={()=>this.setCounter(0)}><li><img src={home_ic}/></li></Link>
             <Link to="/c/Buoy" onClick={()=>this.setCounter(1)}><li><img src={buoy_ic}/></li></Link>
             <Link to="/c/Tunnel" onClick={()=>this.setCounter(2)}><li><img src={tunnel_ic}/></li></Link>
              <Link to="/c/Water" onClick={()=>this.setCounter(3)}><li><img src={level_ic}/></li></Link>
              <Link to="/c/Little" onClick={()=>this.setCounter(4)}><li><img src={cut_ic}/></li></Link>
             <Link to="/c/Weather" onClick={()=>this.setCounter(5)}> <li><img src={weather_ic}/></li></Link>
           </ul>
         </div>
         <div id="pic">
          <img id="pic_img" src={this.state.cover}/>
         </div>
         <div id="text">
         <p>“Hope” is the thing with feathers -<br/>
        That perches in the soul -<br/>
        And sings the tune without the words -<br/>
        And never stops - at all -<br/>
<br/>
        And sweetest - in the Gale - is heard -<br/>
        And sore must be the storm -<br/>
        That could abash the little Bird<br/>
        That kept so many warm -<br/>
<br/>
        I’ve heard it in the chillest land -<br/>
        And on the strangest Sea -<br/>
        Yet - never - in Extremity,<br/>
        It asked a crumb - of me.</p>
         </div>
       </div>
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
