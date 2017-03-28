
import React, { Component } from 'react';
import './App.css';
import rcl from "react-chart-line";

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

    Bouy_data: [
    [2,0,2,0,2,2,0,2,2,2],
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
     ],
     level:20
    }
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


 Bouy_data=(e)=>{

    for (var i=0,x=-10; i<10; i++,x++) {
      chart.osX[i] = this.state.Bouy_data[1][i];
      chart.osY[i] = this.state.Bouy_data[0][i];
    }

 }

  Update=(e)=>{
    this.setState({Bouy_data:R_data.Bouy_data});
  }

  render() {


    return (
      <div className="App">
        <div className="Bouy"><h1>Buoy</h1>
          <rcl.ChartLine data={chart}/>
          <h2 id="head_buoy">Smart buoy</h2>
          <p id="text_buoy">Together with Rijkswaterstaat, the ministry of infrastructure and environment, the IoT academy made a smart buoy to use in de Rotterdam Dock. <br/>
          The smart buoy on display registers every time a boat passes by and sends this via het LoRaWan network from KPN to the IoT, so this can be displayed. <br/>
          <br/>
          In the smart buoy a Marvin is placed, a Lora development board made by the IoT academy, and a movement sensor. Every time the buoy shakes the Marvin registers this and saves it, every minute the Marvin sends via LoRa if a boat passed by.</p>
        </div>
      </div>
    );
  }
}


export default Buoy;
