var React = require('react');
var Header_actuador = require('../header_actuador/header_actuador.jsx');
var Sub_item = require('./sub_item/sub_item.jsx');

var Item_actuador = React.createClass({
  render: function() {
    return (
      <div className='container-fluid item-actuador'>
        <div className='row'>
          <div className='col-lg-12'>
            <Header_actuador titulo={this.props.titulo} />
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-6'>
            <Sub_item sub_title='Voltios' linea_1={this.props.l1v} linea_2={this.props.l2v} linea_3={this.props.l3v} />
          </div>
          <div className='col-lg-6'>
            <Sub_item sub_title='Amperios' linea_1={this.props.l1a} linea_2={this.props.l2a} linea_3={this.props.l3a} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Item_actuador;
