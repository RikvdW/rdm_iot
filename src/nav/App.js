import React, { Component,PropTypes } from 'react';
import {BrowserRouter as Router, Link, Route,withRouter } from 'react-router-dom'
import { browserHistory } from 'react-router'
import Svg from 'svg-react'

import './nav.css';

import play from './img/play.png'
import pause from './img/pause.png'
import plan from './img/plattegrond.png'
import label  from './img/label.png'
import label_u  from './img/label_u.png'
import label_b from './img/label_b.png'

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

var int_ch=0;

class Nav extends Component {



 constructor(props) {
  super();
  this.change = this.change.bind(this);
  this.change_B = this.change_B.bind(this);
  this.state = {
    change : 0,
    chage_img:pause,
    Active: 0,
    B_L: [label,
          label,
          label,
          label_u,
          label,
          label]
  }

 }

 componentWillMount(){
  int_ch=setInterval(this.change,20000);
  this.setState({change:1});
 }



setCounter= item =>{
  counter=item;
  this.state.B_L[counter]=label_b;
  this.state.B_L[this.state.Active]=label;
  this.setState({B_L:this.state.B_L});
  this.setState({Active:item});
}

 change=(e)=> {
  //e.preventDefault();
  if(counter==page.length-1){
   counter=0;
  }else{
   counter++;
  }
  this.props.history.push(page[counter]);
  this.state.B_L[counter]=label_b;
  this.state.B_L[this.state.Active]=label;
  this.setState({B_L:this.state.B_L})
  this.setState({Active:counter})

 }

change_B= item => {
  if(this.state.Active!=item){
    if(this.state.B_L[item]==label){
      this.state.B_L[item]=label_b;
      this.setState({B_L:this.state.B_L})
    } else{
      this.state.B_L[item]=label;
      this.setState({B_L:this.state.B_L})
    }
  }
  console.log(counter)
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
      <svg id="svg_container" xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid meet">
            <image id="svgPic" xlinkHref={plan} x={0} y={0}/>
            <Link to='/c/Buoy' onClick={() => this.setCounter(1)}><image onMouseLeave={() => this.change_B(1)} onMouseEnter={() => this.change_B(1)} className="label" id="label_1" xlinkHref={this.state.B_L[1]} /></Link>
            <Link to='/c/Tunnel' onClick={() => this.setCounter(2)}><image onMouseLeave={() => this.change_B(2)} onMouseEnter={() => this.change_B(2)} className="label" id="label_2" xlinkHref={this.state.B_L[2]}/></Link>
            <Link to='/c/Water' onClick={() => this.setCounter(3)}><image onMouseLeave={() => this.change_B(3)} onMouseEnter={() => this.change_B(3)} className="label" id="label_3" xlinkHref={this.state.B_L[3]}/></Link>
      </svg>
     </header>
     <plan/>
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
