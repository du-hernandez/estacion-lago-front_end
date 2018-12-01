var React = require('react');

var Sub_item = React.createClass({
  render: function() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-12'>
            <h4 className='text-center'>
              { this.props.sub_title }
            </h4>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-4'>
            <label>LN1</label>
          </div>
          <div className='col-lg-4'>
            <label>LN2</label>
          </div>
          <div className='col-lg-4'>
            <label>LN3</label>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-4'>
            <span>{ this.props.linea_1 }</span>
          </div>
          <div className='col-lg-4'>
            <span> { this.props.linea_2 } </span>
          </div>
          <div className='col-lg-4'>
            <span> { this.props.linea_3 } </span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Sub_item;
