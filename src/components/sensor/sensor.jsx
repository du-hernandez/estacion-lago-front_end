var React = require('react');
var Header_sensor = require('./header/header_sensor.jsx');
var Body_sensor = require("./body_sensor/body_sensor.jsx");

var Sensor = React.createClass({

  render: function() {
    return (
      <div className='container-fluid actuador'>
        <div className='row'>
          <div className='col-lg-12'>
            <Header_sensor
              titulo={this.props.titulo}
              sub_title={this.props.sub_title}
              unidad = {this.props.unidad}/>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <Body_sensor data_sensor={this.props.data_sensor} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Sensor;
