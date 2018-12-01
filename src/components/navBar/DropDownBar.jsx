var React = require('react');
var axios = require('axios');
var ItemBar = require('./ItemBar.jsx');
var DropDownBar = React.createClass({
  getInitialState: function() {
    return{
      data: undefined
    };
  },
  componentWillMount: function() {
    //this.getApi(this.props.id_estacion); // Retorna el conjunto de estaciones
  },
  getApi: function(query_est) {
    axios.get("http://200.21.7.94/Sweb_gral/Service1.svc/Servicio_Consultar/" + query_est + ",0")
    .then(function(response) {
      //console.log("La data es: ", response.data);
      this.setState({ data: JSON.parse(response.data.ServicioConsultasResult)});
      //console.log("La nueva data es: ", this.state.data);
      //console.log("Un dato es: ", this.state.data[0].id_estacion);
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  },
  render: function() {
    return(
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.name}<span className="caret"></span></a>
        <ul className="dropdown-menu">
          <li>
            <button
              type="button"
              className="btn btn-info btn-md"
              data-toggle="modal"
              data-target="#mymodal">
              Reparametrizar
            </button>
          </li>
        </ul>
      </li>
    );
  }
});
module.exports = DropDownBar;
