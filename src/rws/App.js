
import React, { Component } from 'react';
import './App.css';
import Gauge from 'react-svg-gauge';
import Chart from "chart.js";
import rcl from "react-chart-line";
var ProgressBar = require('virtual-progress-bar');

var woble=true;


var font_del ={
  fontSize: 0
}

var Font_style ={
  fontSize: 30
}

var ws;
var wsUri = "wss://rws-ui.eu-gb.mybluemix.net/ws/sendData";

var R_data={
    light_val:0,
    gas_val:0,
    level:0,
    Bouy_data: [
    [2,0,2,0,2,2,0,2,2,2],
    ["11:00","11:01","11:02","11:03","11:04","11:05","11:06","11:07","11:08","11:09"]
  ]
}



var chart = { msg: "Bouy", osX: [], osY: [] };

class App extends Component {
  constructor(props) {
    super();
    this.state = {
       percent: 20,
       light_val:0,
       gas_val:0,
       Bouy_data: [
       [2,0,2,0,2,2,0,2,2,2],
       ["11:00","11:01","11:02","11:03","11:04","11:05","11:06","11:07","11:08","11:09"]
     ],
     level:20
    }
    setInterval(this.water,350);
    setInterval(this.Bouy_data,1000);
    setInterval(this.Update,1000);
    this.wsConnect();
 }

 wsConnect=(e)=>{
        console.log("connect",wsUri);
        ws = new WebSocket(wsUri);
        //var line = "";    // either uncomment this for a building list of messages
        ws.onmessage = function(msg) {

            // parse the incoming message as a JSON object
            var data=  JSON.parse(msg.data);
            console.log(data);
            if(data.light_val)R_data.light_val=data.light_val;
            if(data.gas_val)R_data.gas_val=data.gas_val;
            if(data.level)R_data.level=data.level;
            if(data[0].Bouy_data)R_data.Bouy_data=data[0].Bouy_data;

        }
        ws.onopen = function() {
            ws.send("Open for data");
            console.log("connected");
        }
        ws.onclose = function() {
            // update the status div with the connection status
            // in case of lost connection tries to reconnect every 3 secs
            setTimeout(this.wsConnect,3000);
        }

    }


  getHexColor(value) {
 	var string = value.toString(16);
 	return (string.length === 1) ? '0' + string : string;
 }

 Bouy_data=(e)=>{

    for (var i=0,x=-10; i<10; i++,x++) {
      chart.osX[i] = this.state.Bouy_data[1][i];
      chart.osY[i] = this.state.Bouy_data[0][i];
    }

 }


  water=(e) => {
    if(woble===true){
        this.setState({percent:(this.state.level/40*100)-0.4});
        woble=false;
    }
    else{
      this.setState({percent:(this.state.level/40*100)+0.4});
      woble=true;
    }
  }

  Update=(e)=>{
    this.setState({light_val:R_data.light_val});
    this.setState({gas_val:R_data.gas_val});
    this.setState({Bouy_data:R_data.Bouy_data});
    this.setState({level:R_data.level});
  }

  render() {
    var L_r = Math.floor(this.state.light_val * 2.55);
		var L_g = Math.floor(255 - (this.state.light_val * 2.55));
		var L_b = 0;
		var L_colorHex = '#' + this.getHexColor(L_r)  + this.getHexColor(L_g)  + this.getHexColor(L_b) ;

    var G_r = Math.floor(this.state.gas_val * 2.55);
		var G_g = Math.floor(255 - (this.state.gas_val * 2.55));
		var G_b = 0;
		var G_colorHex = '#' + this.getHexColor(G_r)  + this.getHexColor(G_g)  + this.getHexColor(G_b) ;


    var progressBar = ProgressBar.render(React.createElement, {
      containerColor: 'rgba(150,150,150,0.3)',
      direction: 'column',
      meterColor: 'rgb(102, 158, 249)',
      percent: this.state.percent
    })
    return (
      <div className="App">
        <p> hello world</p>
        <div className="Bouy"><h1>Bouy</h1>
          <rcl.ChartLine data={chart}/>
        </div>
        <div className="tunnel"><h1>Tunnel</h1>
          <Gauge minMaxLabelStyle ={font_del} valueLabelStyle={Font_style} value={this.state.light_val} topLabelStyle={Font_style} value={this.state.light_val} width={200} height={180} label="light (%)" color={L_colorHex} />
          <Gauge minMaxLabelStyle ={font_del} valueLabelStyle={Font_style} value={this.state.gas_val} topLabelStyle={Font_style} width={200} height={180} label="gas (%)" color={G_colorHex} />
        </div>
        <div className="water"><h1>Water level</h1>
          <div>
            <h2> cm: </h2>
            <h1> {this.state.level} </h1>
          </div>
          <div style={{height: '15em'}}>
            {progressBar}
          </div>
        </div>
      </div>
    );
  }
}


export default App;
