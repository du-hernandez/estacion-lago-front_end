var React = require('react');
var pubsub = require('pubsub-js'); // Importamos la librería 'pubsub' en el generador del evento a escuchar
// El componente que envía el evento no lo subscribre, solo importa la librería como ya vimos

var ItemBar = React.createClass({
  getInitialState: function() {
    return{
      actual: true,
      lapso: false
    };
  },
  oculta: function() {
    $('#mycarousel').slideUp("slow");
  },
  muestra: function() {
    $('#mycarousel').slideDown("slow");
  },
  onClick: function(event) {
    //console.log(this.props.name);
    if (this.props.name == 'LAPSO DE TIEMPO') {
      this.oculta();
    } else {
      if (this.props.name == 'ACTUAL') {
        this.muestra();
      } else {
        if (this.props.name == '1') {
          // Generamos el evento:
          pubsub.publish('listener', false);
        } else {
          if (this.props.name == '2') {
            // Generamos el evento:
            pubsub.publish('listener', true);
          } else {

          }
        }
      }
    }
  },
  render: function() {
    return(
      <li className={this.props.isFirstOne == true ? 'active' : ''}>
        <a onClick={this.onClick}>{this.props.name}</a>
      </li>
    );
  }
});

module.exports = ItemBar;
