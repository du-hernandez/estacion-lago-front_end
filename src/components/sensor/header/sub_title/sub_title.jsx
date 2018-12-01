var React = require('react');

var Sub_title = React.createClass({
  render: function() {
    return (
      <h4 className='text-center bg-primary'>
        {this.props.titulo} {this.props.unidad}
      </h4>
    );
  }
});

module.exports = Sub_title;
