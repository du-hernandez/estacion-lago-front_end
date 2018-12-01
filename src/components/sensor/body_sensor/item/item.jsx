var React = require('react');

var Item = React.createClass({
  render: function() {
    return (
      <div>
        <b>
          {this.props.valor}&nbsp;&nbsp;
        </b>
        <span>
          {this.props.fecha}
        </span>
      </div>
    );
  }
});

module.exports = Item;
