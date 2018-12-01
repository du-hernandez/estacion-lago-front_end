var React = require('react');
var Item_actuador = require('./item_actuador/item_actuador.jsx');

var Body_actuador = React.createClass({

  render: function() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-12'>
            <Item_actuador
              titulo='Motor 1'
              l1v={this.props.m1l1v}
              l2v={this.props.m1l2v}
              l3v={this.props.m1l3v}
              l1a={this.props.m1l1a}
              l2a={this.props.m1l2a}
              l3a={this.props.m1l3a}/>
            <Item_actuador
              titulo='Motor 2'
              l1v={this.props.m2l1v}
              l2v={this.props.m2l2v}
              l3v={this.props.m2l3v}
              l1a={this.props.m2l1a}
              l2a={this.props.m2l2a}
              l3a={this.props.m2l3a}/>
            <Item_actuador
              titulo='Motor 3'
              l1v={this.props.m3l1v}
              l2v={this.props.m3l2v}
              l3v={this.props.m3l3v}
              l1a={this.props.m3l1a}
              l2a={this.props.m3l2a}
              l3a={this.props.m3l3a}/>
            <Item_actuador
              titulo='Motor 4'
              l1v={this.props.m4l1v}
              l2v={this.props.m4l2v}
              l3v={this.props.m4l3v}
              l1a={this.props.m4l1a}
              l2a={this.props.m4l2a}
              l3a={this.props.m4l3a}/>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Body_actuador;

var React = require('react');

var Head
