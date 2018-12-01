var React = require('react');
var ItemBar = require('./ItemBar.jsx');
var DropDownBar = require('./DropDownBar.jsx');

var NavBar = React.createClass({
  render: function() {
    return(
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Barra de nacegación</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href=""></a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <ItemBar name='ACTUAL' isFirstOne={true} vinculo='#'/>
              <DropDownBar name='Reparametrizar'/>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li><a href='#'><b>Módulo de control Acuicola</b></a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = NavBar;



// <ItemBar name='LAPSO DE TIEMPO' isFirstOne={false} vinculo='#'/>


/*
<li>
  <button
    type="button"
    className="btn btn-info btn-md"
    data-toggle="modal"
    data-target="#mymodal">
    Reparametrizar
  </button>
</li>
*/
