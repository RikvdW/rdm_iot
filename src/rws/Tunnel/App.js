
import React, { Component } from 'react';
import './App.css';
import Gauge from 'react-svg-gauge';


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
    level:0
}


class Tunnel extends Component {
  constructor(props) {
    super();
    this.state = {
       light_val:0,
       gas_val:0
    }
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





  Update=(e)=>{
    this.setState({light_val:R_data.light_val});
    this.setState({gas_val:R_data.gas_val});
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
    var W=window.innerWidth
    Font_style.fontSize=20*W/780;
    return (
      <div className="App">
        <div className="tunnel"><h1>Tunnel</h1>
          <Gauge minMaxLabelStyle ={font_del} valueLabelStyle={Font_style} value={this.state.light_val} topLabelStyle={Font_style} value={this.state.light_val} width={250*W/2000}  height={180*W/1200} label="light (%)" color={L_colorHex} />
          <Gauge minMaxLabelStyle ={font_del} valueLabelStyle={Font_style} value={this.state.gas_val} topLabelStyle={Font_style} width={250*W/2000} height={180*W/1200} label="gas (%)" color={G_colorHex} />
        </div>
      </div>
    );
  }
}


export default Tunnel;
