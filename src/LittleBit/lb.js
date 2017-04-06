import React, { Component } from 'react';
import './App.css';


var up_int=0;

var font_del ={
  fontSize: 0
}

var Font_style ={
  fontSize: 30
}

var ws;
var wsUri = "wss://banana-rdm.eu-gb.mybluemix.net/ws/little";

var R_data={
    Little : 0
}

class LittleBit extends Component {
  constructor(props) {
    super();
    this.state = {
       Little : 0
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
            console.log(data);
            if(data.Little)R_data.Little=data.Little;

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



  Update=(e)=>{
    this.setState({Little:R_data.Little});
  }

  componentWillMount(){
    up_int=setInterval(this.Update,1000);
  }


  componentWillUnmount(){

    clearInterval(up_int);
  }


  render() {


    return (
      <div className="App" onclose="ws.close()">
        <div className="Little">
          <h1>Singing cutlery</h1>
          <h2>Today:{this.state.Little}</h2>
        </div>
      </div>
    );
  }
}


export default LittleBit;
