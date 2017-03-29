
import React, { Component } from 'react';
import './App.css';
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
    level:0
}



var chart = { msg: "Bouy", osX: [], osY: [] };

class Water extends Component {
  constructor(props) {
    super();
    this.state = {
      percent: 20,
     level:20
    }
    setInterval(this.water,350);
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
    this.setState({level:R_data.level});
  }

  render() {
    var progressBar = ProgressBar.render(React.createElement, {
      containerColor: 'rgba(150,150,150,0.3)',
      direction: 'column',
      meterColor: 'rgb(102, 158, 249)',
      percent: this.state.percent
    })
    return (
      <div className="App">
        <div className="water"><h1>Water level</h1>
          <div >
              <h2 style ={{fontSize:'2vw'}}> cm: </h2>
              <h1 style ={{fontSize:'3vw'}}> {this.state.level} </h1>
            </div>
            <div style={{height: '20vh', width:'10vw', float:'rigth'}}>
              {progressBar}
            </div>
        </div>
      </div>
    );
  }
}


export default Water;
