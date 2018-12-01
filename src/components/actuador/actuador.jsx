var React = require('react');
var Header = require('../sensor/header/header_sensor.jsx');
var Body_actuador = require('./body_actuador/body_actuador.jsx');

var Actuador = React.createClass({

  render: function() {
    return (
      <div className='container-fluid actuador'>
        <div className='row'>
          <div className='col-lg-12'>
          <Header titulo={this.props.titulo} sub_title={this.props.sub_title}/>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-12'>
            <Body_actuador
              m1l1v={this.props.myData ? this.props.myData[0] : ""}
              m1l2v={this.props.myData ? this.props.myData[1] : ""}
              m1l3v={this.props.myData ? this.props.myData[2] : ""}
              m1l1a={this.props.myData ? this.props.myData[3] : ""}
              m1l2a={this.props.myData ? this.props.myData[4] : ""}
              m1l3a={this.props.myData ? this.props.myData[5] : ""}
              m2l1v={this.props.myData ? this.props.myData[6] : ""}
              m2l2v={this.props.myData ? this.props.myData[7] : ""}
              m2l3v={this.props.myData ? this.props.myData[8] : ""}
              m2l1a={this.props.myData ? this.props.myData[9] : ""}
              m2l2a={this.props.myData ? this.props.myData[10] : ""}
              m2l3a={this.props.myData ? this.props.myData[11] : ""}
              m3l1v={this.props.myData ? this.props.myData[12] : ""}
              m3l3v={this.props.myData ? this.props.myData[13] : ""}
              m3l2v={this.props.myData ? this.props.myData[14] : ""}
              m3l1a={this.props.myData ? this.props.myData[15] : ""}
              m3l2a={this.props.myData ? this.props.myData[16] : ""}
              m3l3a={this.props.myData ? this.props.myData[17] : ""}
              m4l1v={this.props.myData ? this.props.myData[18] : ""}
              m4l2v={this.props.myData ? this.props.myData[19] : ""}
              m4l3v={this.props.myData ? this.props.myData[20] : ""}
              m4l1a={this.props.myData ? this.props.myData[21] : ""}
              m4l2a={this.props.myData ? this.props.myData[22] : ""}
              m4l3a={this.props.myData ? this.props.myData[23] : ""}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Actuador;

/*
-- Valor actual para un sensor
SELECT valor, fecha FROM datos WHERE fk_sensor = (SELECT id_sensor FROM sensor WHERE nombre = 'am_m1l1') ORDER BY fecha DESC LIMIT 1;
*/
