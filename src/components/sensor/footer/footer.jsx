var React = require('react');

var pubsub = require('pubsub-js');

var Footer = React.createClass({

  hora_inicio: function() {
    return (this.refs.date_starthh.value != "" && this.refs.date_startmm.value != "" && this.refs.date_startss.value != "");
  },

  hora_fin: function() {
    return (this.refs.date_endhh.value != "" && this.refs.date_endmm.value != "" && this.refs.date_endss.value != "");
  },

  onClick: function(event) {
    if (event.target.id == "consultar") {
      var object_data = "";
      if (this.refs.date_start.value != "" && this.refs.date_end.value != "") {
        if (this.hora_inicio() && this.hora_fin()) {
          object_data = [this.refs.date_start.value, this.refs.date_end.value, this.refs.date_starthh.value,
            this.refs.date_startmm.value, this.refs.date_startss.value, this.refs.date_endhh.value,
            this.refs.date_endmm.value, this.refs.date_endss.value, this.refs.temp.checked,
            this.refs.ph.checked, this.refs.oxd.checked, this.refs.motores.checked];
          pubsub.publish('listener', JSON.stringify(object_data));
        } else {
          if (this.hora_inicio()) {
            object_data = [this.refs.date_start.value, this.refs.date_end.value, this.refs.date_starthh.value,
              this.refs.date_startmm.value, this.refs.date_startss.value, '', '', '', this.refs.temp.checked,
              this.refs.ph.checked, this.refs.oxd.checked, this.refs.motores.checked];
            pubsub.publish('listener', JSON.stringify(object_data));
          } else {
            if (this.hora_fin()) {
              object_data = [this.refs.date_start.value, this.refs.date_end.value, '', '', '',
              this.refs.date_endhh.value, this.refs.date_endmm.value, this.refs.date_endss.value,
              this.refs.temp.checked, this.refs.ph.checked, this.refs.oxd.checked, this.refs.motores.checked];
              pubsub.publish('listener', JSON.stringify(object_data));
            } else {
              object_data = [this.refs.date_start.value, this.refs.date_end.value, '', '', '', '', '', '',
              this.refs.temp.checked, this.refs.ph.checked, this.refs.oxd.checked, this.refs.motores.checked];
              pubsub.publish('listener', JSON.stringify(object_data));
            }
          }
        }
      } else {
        if (this.refs.date_start.value != "" && this.refs.date_end.value == "") {
          if (this.hora_inicio() && this.hora_fin()) {
            object_data = [this.refs.date_start.value, '', this.refs.date_starthh.value,
            this.refs.date_startmm.value, this.refs.date_startss.value, this.refs.date_endhh.value,
            this.refs.date_endmm.value, this.refs.date_endss.value, this.refs.temp.checked, this.refs.ph.checked,
            this.refs.oxd.checked, this.refs.motores.checked];
            pubsub.publish('listener', JSON.stringify(object_data));
          } else {
            if (this.hora_inicio()) {
              object_data = [this.refs.date_start.value, '', this.refs.date_starthh.value, this.refs.date_startmm.value,
              this.refs.date_startss.value, '', '', '', this.refs.temp.checked, this.refs.ph.checked, this.refs.oxd.checked,
              this.refs.motores.checked];
              pubsub.publish('listener', JSON.stringify(object_data));
            } else {
              if (this.hora_fin()) {
                object_data = [this.refs.date_start.value, '', '', '', '', this.refs.date_endhh.value,
                this.refs.date_endmm.value, this.refs.date_endss.value, this.refs.temp.checked, this.refs.ph.checked,
                this.refs.oxd.checked, this.refs.motores.checked];
                pubsub.publish('listener', JSON.stringify(object_data));
              } else {
                object_data = [this.refs.date_start.value, '', '', '', '', '', '', '', this.refs.temp.checked,
                this.refs.ph.checked, this.refs.oxd.checked, this.refs.motores.checked];
                pubsub.publish('listener', JSON.stringify(object_data));
              }
            }
          }
        } else {
          if (this.refs.date_start.value == "" && this.refs.date_end.value != "") {
            if (this.hora_fin()) {
              object_data = ['', this.refs.date_end.value, '', '', '', this.refs.date_endhh.value,
              this.refs.date_endmm.value, this.refs.date_endss.value, this.refs.temp.checked,
              this.refs.ph.checked, this.refs.oxd.checked, this.refs.motores.checked];
              pubsub.publish('listener', JSON.stringify(object_data));
            } else {
              object_data = ['', this.refs.date_end.value, '', '', '', '', '', ''];
              pubsub.publish('listener', JSON.stringify(object_data));
            }
          } else {
            // Nada que mandar
          }
        }
      }
    } else {
      if (event.target.id == "reporte") {
        var est0 = false, est1 = false, est2 = false, est3 = false;
        this.refs.temp.checked ? est0=true : '';
        this.refs.ph.checked ? est1=true : '';
        this.refs.oxd.checked ? est2=true : '';
        this.refs.motores.checked ? est3=true : '';
        var object_data = [est0, est1, est2, est3];
        pubsub.publish('reporte', object_data);
      } else {
        // De lo contrario los campos serán limpiados
        pubsub.publish('limpiar');
        $('#date_start').val("");
        $('#date_starthh').val("");
        $('#date_startmm').val("");
        $('#date_startss').val("");
        $('#date_end').val("");
        $('#date_endhh').val("");
        $('#date_endmm').val("");
        $('#date_endss').val("");
      }
    }
  },

  render: function() {
    return (
      <div className='container-fluid footer'>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='row'>
              <div className='col-lg-12'>
                <p>
                  <code>
                    Por favor haga su consulta con el formato de hora de 24 horas.
                    Se toma la hora 00:00:00 si no se indica otra.
                  </code>
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12'>
                <label>De</label>
                <input type="text" className='form-control' placeholder='Seleccione una fecha de inicio' id='date_start' ref='date_start' readOnly />
                <div className='row'>
                  <div className='col-lg-4'>
                    <input type='text' className='form-control' placeholder='hh' ref='date_starthh' />
                  </div>
                  <div className='col-lg-4'>
                    <input type='text' className='form-control' placeholder='mm' ref='date_startmm' />
                  </div>
                  <div className='col-lg-4'>
                    <input type='text' className='form-control' placeholder='ss' ref='date_startss' />
                  </div>
                </div>
              </div>
              <div className='col-lg-12'>
                <label>Hasta</label>
                <input type="text" className='form-control' placeholder='Seleccione una fecha de fin' id='date_end' ref='date_end' readOnly />
                <div className='row'>
                  <div className='col-lg-4'>
                    <input type='text' className='form-control' placeholder='hh' ref='date_endhh' />
                  </div>
                  <div className='col-lg-4'>
                    <input type='text' className='form-control' ref='date_endmm' placeholder='mm' />
                  </div>
                  <div className='col-lg-4'>
                    <input type='text' className='form-control' ref='date_endss' placeholder='ss' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-6'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='row'>
                  <div className='col-lg-12'>
                    <label>Parámetros de la consulta</label>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-lg-6'>
                    <div className='checkbox'>
                      <label>
                        <input type='checkbox' value='temp' name='temp' ref='temp' id='temp'/>
                        Temperatura
                      </label>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='checkbox'>
                      <label>
                        <input type='checkbox' value='ph' name='ph' ref='ph' id='ph'/>
                        PH
                      </label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-lg-6'>
                    <div className='checkbox'>
                      <label>
                        <input type='checkbox' value='oxd' name='oxd' ref='oxd' id='oxd'/>
                        Oxígeno disuelto
                      </label>
                    </div>
                  </div>
                  <div className='col-lg-6'>
                    <div className='checkbox'>
                      <label>
                        <input type='checkbox' value='motores' name='motores' ref='motores' id='motores'/>
                        Motores
                      </label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-lg-6'></div>
                </div>
                  <div className='form-group'>
                    <div className='row'>
                      <div className='col-lg-12'>
                        <input type='button' className='btn btn-primary btn-sm btn-block' onClick={ this.onClick } value='CONSULTAR' id="consultar"/>
                      </div>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='row'>
                      <div className='col-lg-12'>
                        <input type='button' className='btn btn-success btn-sm btn-block' onClick={this.onClick} value='GENERAR REPORTE' id="reporte" />
                      </div>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='row'>
                      <div className='col-lg-12'>
                        <input type='button' className='btn btn-warning btn-sm btn-block' onClick={this.onClick} value='LIMPIAR CAMPOS' id="limpiar" />
                      </div>
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

module.exports = Footer;
