var React = require('react');

var axios = require('axios');

var qs = require('qs')

var Parametrizar = React.createClass({
  getInitialState: function() {
    return {
      estado: true
    };
  },

  componentWillMount: function() {
    //this.getApi_vals_actuales();
    this.actualiza();
    setTimeout(function(){

      $(function() {
        $('#m1_m').change(function() {
          if ($('#m1_m').prop('checked') ) {
            this.motores_estado();
          } else {
            setTimeout(function(){
              this.motores_estado();
            }.bind(this), 1500);
          }
        }.bind(this));
        $('#m2_m').change(function() {
          if ($('#m2_m').prop('checked') ) {
            setTimeout(function(){
              this.motores_estado();
            }.bind(this), 1500);
          } else {
            setTimeout(function(){
              this.motores_estado();
            }.bind(this), 1500);
          }
        }.bind(this));
        $('#m3_m').change(function() {
          if ($('#m3_m').prop('checked') ) {
            setTimeout(function(){
              this.motores_estado();
            }.bind(this), 1500);
          } else {
            setTimeout(function(){
              this.motores_estado();
            }.bind(this), 1500);
          }
        }.bind(this));
        $('#m4_m').change(function() {
          if ($('#m4_m').prop('checked') ) {
            setTimeout(function(){
              this.motores_estado();
            }.bind(this), 1500);
          } else {
            setTimeout(function(){
              this.motores_estado();
            }.bind(this), 1500);
          }
        }.bind(this));
        $('#modo_manual').change(function() {
          // De esta forma, cuando haya un cambio de estado deberán apagarse todos los motores
          // 1) Constatamos el estado actual del modo manual
          //if ($('#modo_manual').prop('checked') ) { // Se activa el modo manual
            // Debemos en este caso desactivar el modo automático,
            // detener todos los motores y desactivar el ciclo de encendido automático del controlador de motores
            if ($('#m1_m').prop('checked') ) {
              var x = $("#m1_m");
              var y = x.parent();
              y.click();
              x.click();
            }
            if ($('#m2_m').prop('checked') ) {
              var x = $("#m2_m");
              var y = x.parent();
              y.click();
              x.click();
            }
            if ($('#m3_m').prop('checked') ) {
              var x = $("#m3_m");
              var y = x.parent();
              y.click();
              x.click();
            }
            if ($('#m4_m').prop('checked') ) {
              var x = $("#m4_m");
              var y = x.parent();
              y.click();
              x.click();
            }
            setTimeout(function(){
              this.motores_estado();
            }.bind(this), 1500);
          //} else { // Se activa el modo automático
            // Implica activar el ciclo de encendido automático de los motores.
            // Pasamos a modo automático
            //setTimeout(function(){
              //this.motores_estado();
            //}.bind(this), 1500);
          //}
        }.bind(this));
      }.bind(this));

      // El retardo de 5s se hace porque el método componentWillMount se ejecuta antes de cargar la página
      // para cuando se ejecuten las siguientes sentencias ya ha de haber cargado JQuery
      if (String(this.props.m1_check) === 'True') {
        var x = $("#m1_m"); // Seleccionamos el motor 1 del modo manual
        var y = x.parent();
        y.click();
        x.click();
        /*if ($('#m1_m').prop('checked') ) {
        	console.log("Motor 1 activado");
        }*/
      } else {
      }
      if (String(this.props.m2_check) === 'True') {
        var x = $("#m2_m"); // Seleccionamos el motor 2 del modo manual
        var y = x.parent();
        y.click();
        x.click();
        /*if ($('#m2_m').prop('checked') ) {
        	console.log("Motor 2 activado");
        }
        */
      } else {
      }
      if (String(this.props.m3_check) === 'True') {
        var x = $("#m3_m"); // Seleccionamos el motor 2 del modo manual
        var y = x.parent();
        y.click();
        x.click();
        /*if ($('#m3_m').prop('checked') ) {
        	console.log("Motor 3 activado");
        }
        */
      } else {
      }
      if (String(this.props.m4_check) === 'True') {
        var x = $("#m4_m"); // Seleccionamos el motor 2 del modo manual
        var y = x.parent();
        y.click();
        x.click();
        /*if ($('#m4_m').prop('checked') ) {
        	console.log("Motor 4 activado");
        }*/
      } else {
      }
      if (String(this.props.modo_check) === 'True') {
        // Activamos el modo manual
        x = $("#modo_manual"); // Seleccionamos el modo manual
        y = x.parent();
        y.click();
        x.click();
        /*if ($('#m4_m').prop('checked') ) {
        	console.log("Motor 4 activado");
        }*/
      } else {
        //alert("Entra al modo automático");
        // Activamos el modo automático
        x = $("#modo_automatico"); // Seleccionamos el motor 4 del modo manual
        y = x.parent();
        //y.removeClass('off');
        //y.removeClass('btn-default');
        //y.addClass('btn-success');
        y.click();
        x.click();
      }
    }.bind(this), 5000);
  },

  actualiza: function() {
    setInterval(function(){
      this.getApi_vals_actuales();
    }.bind(this), 3000);
  },

  motores_estado: function() {
    var m1 = 0, m2 = 0, m3 = 0, m4 = 0, cont_estado = 0;
    if ($('#m1_m').prop('checked')) { m1 = 1; }
    if ($('#m2_m').prop('checked')) { m2 = 1; }
    if ($('#m3_m').prop('checked')) { m3 = 1; }
    if ($('#m4_m').prop('checked')) { m4 = 1; }
    if ($('#modo_manual').prop('checked')) { cont_estado = 1; }
    axios.get("http://localhost/api/Controlador/"+ m1 +"/"+ m2 +"/"+ m3 +"/"+ m4 +"/"+ cont_estado)
    .then(function(response) {
      // Utilizamos una petición GET para insertar datos a la base de datos
    }.bind(this))
    .catch(function (error) {
      //console.log(error);
    });
  },

  onClick: function(event) {
    if (this.refs.m1.value != '' && this.refs.m2.value != '' && this.refs.m3.value != '' && this.refs.m4.value != '' && this.refs.oxdmin.value != '' && this.refs.oxdmax.value != '' && this.refs.calibraion.value != '') {
      setTimeout(function() {
        this.getApi_actualiza();
      }.bind(this), 1000);
      setTimeout(function() {
        this.getApi_calibra_sonda_oxd();
      }.bind(this), 4000);
    } else {
      alert("Por favor asegúrese de llenar todos los campos");
    }
  },

  getInitialState: function() {
    return {
      current_parameter: undefined
    };
  },

  // Recupera los valores parámetro actuales de los sensores
  getApi_vals_actuales: function() {
    axios.get("http://localhost/api/DatosMotores/'")
    .then(function(response) {
      this.setState({
        current_parameter: response.data
      });
    }.bind(this))
    .catch(function (error) {
      //console.log(error);
    });
  },

  // Actualiza los parametros de los motores y del sensor de oxígeno disuelto
  getApi_actualiza: function() {
    axios.get("http://localhost/api/Actualiza/"+this.refs.m1.value+"/"+this.refs.m2.value+"/"+this.refs.m3.value+"/"+this.refs.m4.value+"/"+this.refs.oxdmin.value+"/"+this.refs.oxdmax.value + "/end")
    .then(function(response) {
      console.log("La respuesta es: ", response);
    }.bind(this))
    .catch(function (error) {
      //console.log(error);
    });
  },

  getApi_calibra_sonda_oxd: function() {
    axios.get("http://localhost/api/Calibra/"+this.refs.calibraion.value+"/0/0/0/0/0")
    /* Aunque en el Api, el método es: public string Get(string cadena),
     * recordemos que definimos una estructura para las peticiones en el archivo: App_Start/WebApiConfig.cs
     * y dado esa configuración, para enviar un númoro decimal nos ha funcionado hacer la petición GET de la
     * forma como podemos verlo:
     * -> axios.get("http://localhost/api/Calibra/"+this.refs.calibraion.value+"/0/0/0/0/0")
     */
    .then(function(response) {
      console.log("La respuesta es: ", response);
    }.bind(this))
    .catch(function (error) {
      //console.log(error);
    });
  },
  render: function() {
    return (
      <div id='mymodal' className='modal fade' role='dialog'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className="modal-title">
                Ventana de control
              </h4>
            </div>
            <div className='modal-body'>
              <ul className="nav nav-tabs">
                <li className="active"><a data-toggle="tab" href="#parametrizar">Parametrizar</a></li>
                <li><a data-toggle="tab" href="#manual">Modo</a></li>
              </ul>
              <div className="tab-content">
                <div id="parametrizar" className="tab-pane fade in active">
                  <div className='container-fluid'>
                    <div className='row'>
                      <div className='col-lg-3'>
                        <div className='form-group'>
                          <label>
                            Motor 1
                          </label>
                          <p>Amperaje máximo motor 1</p>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Amperaje máximo motor 1'
                            ref='m1'
                          />
                          <span>
                            Valor actual&nbsp;
                            <code>
                              { this.state.current_parameter ? this.state.current_parameter[0].replace(",", ".") + " A" : '' }
                            </code>
                          </span>
                        </div>
                      </div>
                      <div className='col-lg-3'>
                        <div className='form-group'>
                          <label>
                            Motor 2
                          </label>
                          <p>Amperaje máximo motor 2</p>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Amperaje máximo motor 2'
                            ref='m2'
                          />
                          <span>
                            Valor actual&nbsp;
                            <code>
                              { this.state.current_parameter ? this.state.current_parameter[1].replace(",", ".") + " A" : '' }
                            </code>
                          </span>
                        </div>
                      </div>

                      <div className='col-lg-3'>
                        <div className='form-group'>
                          <label>
                            Motor 3
                          </label>
                          <p>Amperaje máximo motor 3</p>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Amperaje máximo motor 3'
                            ref='m3'
                          />
                          <span>
                            Valor actual&nbsp;
                            <code>
                              { this.state.current_parameter ? this.state.current_parameter[2].replace(",", ".") + " A" : '' }
                            </code>
                          </span>
                        </div>
                      </div>

                      <div className='col-lg-3'>
                        <div className='form-group'>
                          <label>
                            Motor 4
                          </label>
                          <p>Amperaje máximo motor 4</p>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Amperaje máximo motor 4'
                            ref='m4'
                          />
                          <span>
                            Valor actual&nbsp;
                            <code>
                              { this.state.current_parameter ? this.state.current_parameter[3].replace(",", ".") + " A" : '' }
                            </code>
                          </span>
                        </div>
                      </div>

                    </div>
                    <div className='row modal-seccion'>
                      <div className='col-lg-6'>
                        <div className='form-group'>
                          <p>Oxígeno disuelto mínimo tolerable</p>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Oxígeno disuelto mínimo tolerable'
                            ref='oxdmin'
                          />
                          <span>
                            Valor actual&nbsp;
                            <code>
                              { this.state.current_parameter ? this.state.current_parameter[4].replace(",", ".") + " ppm" : '' }
                            </code>
                          </span>
                        </div>
                      </div>
                      <div className='col-lg-6'>
                        <div className='form-group'>
                          <p>Oxígeno disuelto máximo ideal</p>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Oxígeno disuelto máximo ideal'
                            ref='oxdmax'
                          />
                          <span>
                            Valor actual&nbsp;
                            <code>
                              { this.state.current_parameter ? this.state.current_parameter[5].replace(",", ".") + " ppm" : '' }
                            </code>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className='modal-header'>
                      <h4 className="modal-title">
                        Calibración Sonda de Oxígeno Disuelto
                      </h4>
                    </div>
                    <div className='row modal-seccion'>
                      <div className='col-lg-12'>
                        <div className='form-group'>
                          <p>Valor de calibración de la sonda</p>
                          <input
                            type='text'
                            className='form-control'
                            placeholder='Valor de calibración'
                            ref='calibraion'
                          />
                          <span>
                            La calibración actual establecida es de &nbsp;
                            <code>
                              { this.state.current_parameter ? this.state.current_parameter[6].replace(",", ".") : ''}
                            </code>
                          </span>
                          <p>
                            <code>El oxígeno disuelto actual es: <b> { this.props.oxd ? this.props.oxd.replace(",", ".") + " ppm" : ''} </b> </code>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-dismiss="modal">
                      Cerrar
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={ this.onClick }>
                      Guardar
                    </button>
                  </div>
                </div>
                <div id="manual" className="tab-pane fade">
                  <div className='container-fluid'>

                    <div className='row'>
                      <div className='col-lg-12 text-center'>
                        <input
                          type="checkbox"
                          data-toggle="toggle"
                          data-on="Manual"
                          data-off="Automático"
                          data-onstyle="warning"
                          data-offstyle="success"
                          data-width="115"
                          data-height="10"
                          id='modo_manual'
                          onChange={this.onChange}
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-lg-12'>
                        <hr/>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-lg-3'>
                        <div className='form-group'>
                          <div className='row'>
                            <div className='col-lg-12'>
                              <h4 className='text-center'>
                                Motor 1
                              </h4>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-lg-12'>
                              <div className='form-group text-center'>
                                <input
                                  type="checkbox"
                                  data-toggle="toggle"
                                  data-on="Encendido"
                                  data-off="Apagado"
                                  data-onstyle="success"
                                  data-offstyle="default"
                                  data-width="100"
                                  data-height="10"
                                  className='m1'
                                  onChange={this.onChange}
                                  id='m1_m'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-lg-3'>
                        <div className='form-group'>
                          <div className='row'>
                            <div className='col-lg-12'>
                              <h4 className='text-center'>
                                Motor 2
                              </h4>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-lg-12'>
                              <div className='form-group text-center'>
                                <input
                                  type="checkbox"
                                  data-toggle="toggle"
                                  data-on="Encendido"
                                  data-off="Apagado"
                                  data-onstyle="success"
                                  data-offstyle="default"
                                  data-width="100"
                                  data-height="10"
                                  className='m2'
                                  onChange={this.onChange}
                                  id='m2_m'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='col-lg-3'>
                        <div className='form-group'>
                          <div className='row'>
                            <div className='col-lg-12'>
                              <h4 className='text-center'>
                                Motor 3
                              </h4>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-lg-12'>
                              <div className='form-group text-center'>
                                <input
                                  type="checkbox"
                                  data-toggle="toggle"
                                  data-on="Encendido"
                                  data-off="Apagado"
                                  data-onstyle="success"
                                  data-offstyle="default"
                                  data-width="100"
                                  data-height="10"
                                  className='m3'
                                  onChange={this.onChange}
                                  id='m3_m'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='col-lg-3'>
                        <div className='form-group'>
                          <div className='row'>
                            <div className='col-lg-12'>
                              <h4 className='text-center'>
                                Motor 4
                              </h4>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-lg-12'>
                              <div className='form-group text-center'>
                                <input
                                  type="checkbox"
                                  data-toggle="toggle"
                                  data-on="Encendido"
                                  data-off="Apagado"
                                  data-onstyle="success"
                                  data-offstyle="default"
                                  data-width="100"
                                  data-height="10"
                                  className='m4'
                                  onChange={this.onChange}
                                  id='m4_m'
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-dismiss="modal">
                      Cerrar
                    </button>
                  </div>
                </div>
                <div id="automatico" className="tab-pane fade">
                  <div className='row'>

                  </div>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <hr/>
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-dismiss="modal">
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Parametrizar;



/*
Toggle con Material Design
<label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="switch-1">
  <input type="checkbox" id="switch-1" className="mdl-switch__input" />
  <span className="mdl-switch__label"></span>
</label>
*/

/*
Togge con Bootstrap toggle
<input type="checkbox" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger" />
<input type="checkbox" checked data-toggle="toggle" data-onstyle="warning" data-offstyle="info" />
*/



/*
<li><a data-toggle="tab" href="#automatico">Modo Automático</a></li>
<div className='col-lg-12 text-center'>
    <input
      type="checkbox"
      data-toggle="toggle"
      data-on="Activado"
      data-off="Des activado"
      data-onstyle="success"
      data-offstyle="danger"
      data-width="115"
      data-height="10"
      onChange={this.onChange}
      id='modo_automatico'
    />
</div>
*/
