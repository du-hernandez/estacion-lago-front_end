var React = require('react');
var Sub_title = require('./sub_title/sub_title.jsx');

var Header_sensor = React.createClass({

  render: function() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-12'>
            <h4 className='text-center'> {this.props.titulo} </h4>
          </div>
          <div className='col-lg-12'>
            <Sub_title titulo={this.props.sub_title /*Temperarura actual*/ } unidad = {this.props.unidad}/>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Header_sensor;
