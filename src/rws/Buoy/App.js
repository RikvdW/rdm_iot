
import React, { Component } from 'react';
import './App.css';
import Chart from "chart.js";
import rcl from "react-chart-line";

var woble=true;

var up_int=0;
var b_int=0;

var font_del ={
  fontSize: 0
}

var Font_style ={
  fontSize: 30
}

var ws;
var wsUri = "wss://rws-ui.eu-gb.mybluemix.net/ws/sendData";

var R_data={
    Bouy_data: [
      [1,0,1,0,1,1,0,1,1,1],
      ["11:00","11:01","11:02","11:03","11:04","11:05","11:06","11:07","11:08","11:09"]
  ]
}



var chart = { msg: "Bouy", osX: [], osY: [] };

class Buoy extends Component {
  constructor(props) {
    super();
    this.state = {
       Bouy_data: [
       [2,0,2,0,2,2,0,2,2,2],
       ["11:00","11:01","11:02","11:03","11:04","11:05","11:06","11:07","11:08","11:09"]
     ]
    }

    this.wsConnect();
 }

 wsConnect=(e)=>{
        console.log("connect",wsUri);
        ws = new WebSocket(wsUri);
        //var line = "";    // either uncomment this for a building list of messages
        ws.onmessage = function(msg) {

            // parse the incoming message as a JSON object
            var data=  JSON.parse(msg.data);
            //console.log(data);
            if(data[0].Bouy_data)R_data.Bouy_data=data[0].Bouy_data;

        }
        ws.onopen = function() {
            ws.send("Open for data");
            //console.log("connected");
        }
        ws.onclose = function() {
            // update the status div with the connection status
            // in case of lost connection tries to reconnect every 3 secs
            setTimeout(this.wsConnect,3000);
        }

    }


 Bouy_data=(e)=>{
    for (var i=0,x=-10; i<10; i++,x++) {
      //console.log(this.state.Bouy_data);
      chart.osX[i] = this.state.Bouy_data[1][i];
      chart.osY[i] = this.state.Bouy_data[0][i];
    }

 }

  Update=(e)=>{
    this.setState({Bouy_data:R_data.Bouy_data});
    //console.log(this.state.Bouy_data)
  }

  componentWillMount(){
    b_int=setInterval(this.Bouy_data,1000);
    up_int=setInterval(this.Update,1000);
  }


  componentWillUnmount(){
    ws.close();
    clearInterval(b_int);
    clearInterval(up_int);
  }


  render() {


    return (
      <div className="App" onclose="ws.close()">
        <div className="Bouy">
          <h1>Buoy</h1>
          <rcl.ChartLine data={chart}/>
          <p>
          Using motion sensors to detect collisions with a buoy. Measurements are used to trigger maintenance.
          </p>
        </div>
      </div>
    );
  }
}


export default Buoy;
