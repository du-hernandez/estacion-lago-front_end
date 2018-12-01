var React = require('react');

var Header_actuador = React.createClass({
  render: function() {
    return (
      <h4 className='text-center bg-info'> { this.props.titulo } </h4>
    );
  }
});

module.exports = Header_actuador;
