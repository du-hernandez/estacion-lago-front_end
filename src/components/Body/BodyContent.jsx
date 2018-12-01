var React = require('react');
var NavBar = require('../navBar/NavBar.jsx');
var Seccion = require('./seccion/seccion.jsx');


var BodyContent = React.createClass({
  render: function() {
    return(
      <div className='container-fluid'>
        <div className='row'>
          <NavBar />
        </div>
        <div className='row helper-top'>
          <div className='col-lg-12'>
            <Seccion />
          </div>
        </div>

      </div>
    );
  }
});

module.exports = BodyContent;

/*
El pH no tiene unidades porque realmente lo que estas midiendo es la concentración de protones H+ que posee una disolución.
El rango de valores de cualquier disolución de pH es desde 0 hasta 14, siendo
0-6 ácida
6-8 neutra
8-14 básica.
Por tanto, si posees una disolución neutra, estará entre ese rango de valores.

Quizá el pH se modifique en función de la disolución que te pida pero si te pregunta algo tan general, esos son los valores por definición.
*/
