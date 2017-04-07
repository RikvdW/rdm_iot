import React, { Component } from 'react';
import './App.css';

import cloud_with_rain from './cloud_with_rain.ico';
import wind from './wind.ico';
import cloud from './cloud.ico'

var up_int=0;


var wsUri = "wss://rws-ui.eu-gb.mybluemix.net/ws/sendWeather";

var R_data={
    Little : 0
}

class Weather extends Component {
  constructor(props) {
    super();
    this.state = {
       weather : {
       },
       pic : cloud_with_rain
    }

    this.wsConnect();
 }

 wsConnect=(e)=>{
        console.log("connect",wsUri);
        var ws = new WebSocket(wsUri);
        //var line = "";    // either uncomment this for a building list of messages
        ws.onmessage = function(msg) {

            // parse the incoming message as a JSON object
            var data=  JSON.parse(msg.data);
            //console.log(data);
            if(data.weather)R_data=data.weather;


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

  Update=(e)=>{
    this.setState({weather:R_data});
    if(this.state.weather.weather===1){
      this.setState({pic:cloud})
    }
  }
  componentWillMount(){
    up_int=setInterval(this.Update,1000);
  }
  componentWillUnmount(){

    clearInterval(up_int);
  }
  render() {
    return (
      <div className="App">
        <div className="weer">
        <h1>Weather</h1>
        <img id='weather' src={this.state.pic} />
        <h2>{this.state.weather.temp} ˚C</h2>
        <p></p>
        <img id='wind' src={wind} />
        <h2>{this.state.weather.wspd} km/s</h2>
        <h2>{this.state.weather.wdir}</h2>
        </div>
      </div>
    );
  }
}


export default Weather;
