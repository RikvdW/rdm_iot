import React, { Component } from 'react';

export default class Info extends Component {
  render(props) {
    switch (this.props.Count){
    case 0:
      return <div id='text'>

        <p> <b>The IoT Academy</b><br/><br/>
      The IoT Academy is a foundation which has the mission to contribute to innovation in the Netherlands by stimulating Internet of Things. The Foundation works closely with its partners and the developer community and was founded in 2016 by KPN and the RDM Makerspace.<br/><br/> On this page we show some of our setups.</p>
          </div>
          break;
    case 1:
      return  <div id='text'>
        <p><b>Buoy</b><br/><br/>
        Using motion sensors to detect collisions with a buoy. Measurements are used to trigger maintenance.
        </p>
        </div>
    break;
    case 2:
      return <div id='text'>
      <p><b>Tunnel</b><br/><br/>
        Measuring smoke and light values in a tunnel can help increase tunnel safety and accident response.  </p>
      </div>
    break;
    case 3:
      return <div id='text'>
      <p><b>Water level</b><br/><br/>
      Using infrared distance sensor the water height in a canal is measured. Values are used to control water pumps in the field.</p>
      </div>
    break;
    case 4:
      return <div id='text'>
      <p><b>Weather</b><br/><br/>
    Many processes depend on weather conditions. Think about corrosion of metal assets, sales cycle in retail, shipping conditions in a port, crowd control on festivals, etc. Therefor it is important to be able to combine weather data and weather predictions with Internet of Things solutions.</p>
      </div>
    break;
    case 5:
      return <div id='text'>
      <p><b>Tunnel</b><br/><br/>
        Measuring smoke and light values in a tunnel can help increase tunnel safety and accident response.  </p>
      </div>
    break;
    default:
      return null;
    break;
    }

  }
}
