/*
 * En este apartado nos encargamos de cargar los datos
 */
var React = require('react');
var Item = require('./item/item.jsx');
var axios = require('axios');
var Body_sensor = React.createClass({
  /*
  getInitialState: function() {
    return {
      id_sensor: this.props.id_sensor,
      data_tem: undefined
    };
  },*/
  /*
  componentWillMount: function() {
    this.getApi();
  },*/
  /*
  getApi: function() {
    axios.get("http://localhost/api/Datos/" + this.state.id_sensor + "/1/0/0/0/0")
    .then(function(response) {
      this.setState({ data_tem: response.data
      });
      //this.getApi(this.props.consulta, this.props.sensor, this.props.estacion);
      this.getApi();
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
  },
  */
  render: function() {
    return (
      <div className='muestra-datos'>
        {
          //this.state.data_tem? this.state.data_tem[1].valor : console.log("Sin crear")
          this.props.data_sensor ? (
            this.props.data_sensor.map(function(item, index) {
              return <Item valor={item.valor} fecha={item.fecha} key = {index}/>
            })
          ) : (
            ''
          )
        }
      </div>
    );
  }
});

module.exports = Body_sensor;
