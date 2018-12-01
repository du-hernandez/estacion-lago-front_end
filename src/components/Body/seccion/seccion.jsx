/*
 * Autor: Duverney Hernandez Mora
 * comdujar@gmail.com, du.hernandez@udla.edu.co
 */

var React = require('react');

var jsPDF = require('jspdf');
require('jspdf-autotable');

var Sensor = require('../../sensor/sensor.jsx');
var Actuador = require('../../actuador/actuador.jsx');
var Footer = require('../../sensor/footer/footer.jsx');
var Reparametrizar = require('../../parametrizar/parametrizar.jsx');

var pubsub = require('pubsub-js');

var axios = require('axios');

var turno = 0;
//axios.defaults.timeout = 5000; // 5 s

var Seccion = React.createClass({

  getInitialState: function() {
    return {
      dataTem : undefined,
      dataPh : undefined,
      dataOxd : undefined,
      dataMotAct : undefined, // Guarda los datos actuales de los motores
      dataMotAll : undefined, // Guarda los datos de la consulta para el reporte de los motores
      dataTemPhOxdAct : undefined,

      dataMotVolLine1 : undefined,
      dataMotVolLine2 : undefined,
      dataMotVolLine3 : undefined,

      dataMotAmLine1 : undefined,
      dataMotAmLine2 : undefined,
      dataMotAmLine3 : undefined,

      date_start_temp : '0',
      date_start_ph : '0',
      date_start_oxd : '0',

      date_start_mot: '0',

      date_end_temp: '0',
      date_end_ph: '0',
      date_end_oxd: '0',

      date_end_mot: '0',

      time_start_temp: '0',
      time_start_ph: '0',
      time_start_oxd: '0',

      time_start_mot: '0',

      time_end_temp: '0',
      time_end_ph: '0',
      time_end_oxd: '0',

      time_end_mot: '0'
    };
  },

  remplazar: function(cadena, buscar, remplazar) {
    var resultado = '';
    for (var i = 0; i < (String(cadena).length); i++) {
      if (cadena.substring(i, i + 1) == '/') {
        resultado += '-';
      } else {
        resultado += cadena.substring(i, i + 1);
      }
    }
    return resultado;
  },

  componentWillMount: function() {
    this.reiniciar = pubsub.subscribe('limpiar', function(topic, data) {
      this.setState({
        date_start_temp : '0',
        date_start_ph : '0',
        date_start_oxd : '0',
        date_start_mot: '0',
        date_end_temp: '0',
        date_end_ph: '0',
        date_end_oxd: '0',
        date_end_mot: '0',
        time_start_temp: '0',
        time_start_ph: '0',
        time_start_oxd: '0',
        time_start_mot: '0',
        time_end_temp: '0',
        time_end_ph: '0',
        time_end_oxd: '0',
        time_end_mot: '0'
      });
    }.bind(this));

    this.puente = pubsub.subscribe('listener', function(topic, data){

      //this.update_states(JSON.parse(data)[0], JSON.parse(data)[8], JSON.parse(data)[9], JSON.parse(data)[10], JSON.parse(data)[11]);

      if (String(JSON.parse(data)[0]).length > 0) { // Hay una fecha de inicio?
        //console.log("Hay una fecha de inicio");
        if (String(JSON.parse(data)[8]) == 'true') { // Es para el sensor de temperatura temperatura?
          this.setState({
            date_start_temp : this.remplazar(JSON.parse(data)[0], '/', '-') // Actualiza la fecha de inicio
          });
        }
        if (String(JSON.parse(data)[9]) == 'true') { // Es para el sensor de PH
          this.setState({
            date_start_ph : this.remplazar(JSON.parse(data)[0], '/', '-')
          });
        }
        if (String(JSON.parse(data)[10]) == 'true') { // Es para el sensor de Oxd?
          this.setState({
            date_start_oxd : this.remplazar(JSON.parse(data)[0], '/', '-')
          });
        }
        if (String(JSON.parse(data)[11]) == 'true') { // Es para los motores?
          this.setState({
            date_start_mot : this.remplazar(JSON.parse(data)[0], '/', '-')
          });
        }
      } else {
        if (String(JSON.parse(data)[8]) == 'true') { // Es para el sensor de temperatura temperatura?
          this.setState({
            date_start_temp : '0'
          });
        }
        if (String(JSON.parse(data)[9]) == 'true') { // Es para el sensor de PH
          this.setState({
            date_start_ph : '0'
          });
        }
        if (String(JSON.parse(data)[10]) == 'true') { // Es para el sensor de Oxd?
          this.setState({
            date_start_oxd : '0'
          });
        }
        if (String(JSON.parse(data)[11]) == 'true') { // Es para los motores?
          this.setState({
            date_start_mot : '0'
          });
        }
      }

      //this.update_states(JSON.parse(data)[1], JSON.parse(data)[8], JSON.parse(data)[9], JSON.parse(data)[10], JSON.parse(data)[11]);
      /*if (JSON.parse(data)[1].length > 0) {
        this.setState({
          date_end: this.remplazar(JSON.parse(data)[1], '/', '-')
        });
      } else {
        this.setState({
          date_end: "0"
        });
      }*/
      if (String(JSON.parse(data)[1]).length > 0) { // Hay una fecha de fin?
        if (String(JSON.parse(data)[8]) == 'true') { // Es para el sensor de temperatura?
          this.setState({
            date_end_temp : this.remplazar(JSON.parse(data)[1], '/', '-')
          });
        }
        if (String(JSON.parse(data)[9]) == 'true') { // Es para el sensor de PH
          this.setState({
            date_end_ph : this.remplazar(JSON.parse(data)[1], '/', '-')
          });
        }
        if (String(JSON.parse(data)[10]) == 'true') { // Es para el sensor de Oxd?
          this.setState({
            date_end_oxd : this.remplazar(JSON.parse(data)[1], '/', '-')
          });
        }
        if (String(JSON.parse(data)[11]) == 'true') { // Es para los motores?
          this.setState({
            date_end_mot : this.remplazar(JSON.parse(data)[1], '/', '-')
          });
        }
      } else {
        // Si no hay una fecha de fin
        if (String(JSON.parse(data)[8]) == 'true') { // Es para el sensor de temperatura temperatura?
          this.setState({
            date_end_temp : '0'
          });
        }
        if (String(JSON.parse(data)[9]) == 'true') { // Es para el sensor de PH
          this.setState({
            date_end_ph : '0'
          });
        }
        if (String(JSON.parse(data)[10]) == 'true') { // Es para el sensor de Oxd?
          this.setState({
            date_end_oxd : '0'
          });
        }
        if (String(JSON.parse(data)[11]) == 'true') { // Es para los motores?
          this.setState({
            date_end_mot : '0'
          });
        }
      }
      //this.update_states(JSON.parse(data)[2], JSON.parse(data)[8], JSON.parse(data)[9], JSON.parse(data)[10], JSON.parse(data)[11]);

      if (String(JSON.parse(data)[2]).length > 0) { // Hay una hora de inicio?
        if (String(JSON.parse(data)[8]) == 'true') { // Es para el sensor de temperatura?
          this.setState({
            time_start_temp : JSON.parse(data)[2] + "-" + JSON.parse(data)[3] + "-" + JSON.parse(data)[4]
          });
        }
        if (String(JSON.parse(data)[9]) == 'true') { // Es para el sensor de PH
          this.setState({
            time_start_ph : JSON.parse(data)[2] + "-" + JSON.parse(data)[3] + "-" + JSON.parse(data)[4]
          });
        }
        if (String(JSON.parse(data)[10]) == 'true') { // Es para el sensor de Oxd?
          this.setState({
            time_start_oxd : JSON.parse(data)[2] + "-" + JSON.parse(data)[3] + "-" + JSON.parse(data)[4]
          });
        }
        if (String(JSON.parse(data)[11]) == 'true') { // Es para los motores?
          this.setState({
            time_start_mot : JSON.parse(data)[2] + "-" + JSON.parse(data)[3] + "-" + JSON.parse(data)[4]
          });
        }
      } else {
        /*
          this.setState({
            time_start : "0"
          });
        */
        if (String(JSON.parse(data)[8]) == 'true') { // Es para el sensor de temperatura?
          this.setState({
            time_start_temp : '0'
          });
        }
        if (String(JSON.parse(data)[9]) == 'true') { // Es para el sensor de PH
          this.setState({
            time_start_ph : '0'
          });
        }
        if (String(JSON.parse(data)[10]) == 'true') { // Es para el sensor de Oxd?
          this.setState({
            time_start_oxd : '0'
          });
        }
        if (String(JSON.parse(data)[11]) == 'true') { // Es para los motores?
          this.setState({
            time_start_mot : '0'
          });
        }
      }

      if (String(JSON.parse(data)[5]).length > 0) { // Hay una hora de fin?
        /*this.setState({
          time_end : JSON.parse(data)[5] + "-" + JSON.parse(data)[6] + "-" + JSON.parse(data)[7]
        });*/
        if (String(JSON.parse(data)[8]) == 'true') { // Es para el sensor de temperatura?
          this.setState({
            time_end_temp : JSON.parse(data)[5] + "-" + JSON.parse(data)[6] + "-" + JSON.parse(data)[7]
          });
        }
        if (String(JSON.parse(data)[9]) == 'true') { // Es para el sensor de PH
          this.setState({
            time_end_ph : JSON.parse(data)[5] + "-" + JSON.parse(data)[6] + "-" + JSON.parse(data)[7]
          });
        }
        if (String(JSON.parse(data)[10]) == 'true') { // Es para el sensor de Oxd?
          this.setState({
            time_end_oxd : JSON.parse(data)[5] + "-" + JSON.parse(data)[6] + "-" + JSON.parse(data)[7]
          });
        }
        if (String(JSON.parse(data)[11]) == 'true') { // Es para los motores?
          this.setState({
            time_end_mot : JSON.parse(data)[5] + "-" + JSON.parse(data)[6] + "-" + JSON.parse(data)[7]
          });
        }
      } else {
        /*this.setState({
          time_end : "0"
        });*/
        if (String(JSON.parse(data)[8]) == 'true') { // Es para el sensor de temperatura?
          this.setState({
            time_end_temp : '0'
          });
        }
        if (String(JSON.parse(data)[9]) == 'true') { // Es para el sensor de PH
          this.setState({
            time_end_ph : '0'
          });
        }
        if (String(JSON.parse(data)[10]) == 'true') { // Es para el sensor de Oxd?
          this.setState({
            time_end_oxd : '0'
          });
        }
        if (String(JSON.parse(data)[11]) == 'true') { // Es para los motores?
          this.setState({
            time_end_mot : '0'
          });
        }
      }
      //console.log("Temp: ", String(JSON.parse(data)[8]) == "true");
      //console.log("PH: ", String(JSON.parse(data)[9]) == "true");
      //console.log("Oxd: ", String(JSON.parse(data)[10]) == "true");
      //console.log("Temp: ", String(JSON.parse(data)[11]) == "true");
    }.bind(this));



    // En esta sección nos ocupamos de generar el reporte en formato PDF
    // -------------------------------------------------------------------------
    function generatePdf(dataTemp, tema, unidad, name) {
      var columns = ["No.", "Dato", "Fecha"];
      /*var data = [
          ["Daniela", "Hernandez Mora", 'Suaza', "No"],
          ["Anna Sofia", "Hernandez Mora", 	"Suaza", "No"],
          [3, "Iceland", 7.501, "Reykjavík"],
          [4, "Norway", 7.498, "Oslo"],
          [5, "Finland", 7.413, "Helsinki"]
      ];*/
      var contador = 0;
      var presentar = dataTemp.map(function(item){
        contador = contador + 1;
        return [contador, item.valor + String(unidad), item.fecha.replace('T', ' ')];
      });
      //console.log("Es así: ", presentar);

      var doc = new jsPDF('p', 'pt');

      /* ------------------------------------------ */
      // Esta sección es necesaria para enumerar las páginas
      var totalPagesExp = "{total_pages_count_string}";
      var pageContent = function (data) {
        // FOOTER
        var str = "Página " + data.pageCount;
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
            str = str + " de " + totalPagesExp;
        }
        doc.setFontSize(10);
        doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 10);
      };
      /* ------------------------------------------ */
      var f = new Date();
      var anyo = f.getFullYear();
      var mes = (f.getMonth() +1);
      var dia = f.getDate();
      if (String(mes).length == 1) {
        mes ="0" + mes;
      }
      if (String(dia).length == 1) {
        dia = "0" + dia;
      }
      var fecha = anyo + "/" + mes + "/" + dia;
      // From HTML
      // From html - shows how pdf tables can be be drawn from html tables
      /*
      examples.html = function () {
          var doc = new jsPDF('p', 'pt');
          doc.text("From HTML", 40, 50);
          var res = doc.autoTableHtmlToJson(document.getElementById("basic-table"));
          doc.autoTable(res.columns, res.data, {startY: 60});
          return doc;
      };
      */
      //doc.rect(574, 700, 10, 20);
      doc.setProperties({
      	title:  name + " (" + fecha + ")",
      	subject: 'Seguimiento del estado de las variables del sistema de control Acuicola',
      	author: 'Acuicola 2017',
      	keywords: 'acuicola, control, 2017, lago, piscicultura',
      	creator: 'Acuicola 2017'
      });
      doc.text("REPORTE DATOS ESTACIÓN ACUICOLA", 150, 40);
      doc.text(fecha, 475, 70);
      doc.text(String(tema), 40, 70);
      //console.log("Total de páginas: ", doc.putTotalPages());
      doc.autoTable(columns, presentar, {
        addPageContent: pageContent,
        margin: {top: 75},
        cellPadding: 5, // a number, array or object (see margin below)
        font: "helvetica", // helvetica, times, courier
        lineColor: 200,
        lineWidth: 0,
        fontStyle: 'normal', // normal, bold, italic, bolditalic
        //overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
        fillColor: false, // false for transparent or a color as described below
        textColor: 20,
        halign: 'left', // left, center, right
        valign: 'middle', // top, middle, bottom
        columnWidth: 'auto', // 'auto', 'wrap' or a number
        startY: false, // false (indicates margin top value) or a number

        pageBreak: 'always', // 'auto', 'avoid' or 'always'
        tableWidth: 'number', // 'auto', 'wrap' or a number,
        showHeader: 'everyPage', // 'everyPage', 'firstPage', 'never',
        tableLineColor: 200, // number, array (see color section below)
        tableLineWidth: 0,
        //addPageContent: function(data) {
          //doc.text("Reporte datos estación Acuicola", 190, 40);
        //}
      });

      /* ------------------------------------------ */
      // Esta sección es necesaria para enumerar las páginas
      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
      }
      /* ------------------------------------------ */
      //doc.output("dataurlnewwindow");
      doc.save("Reporte Acuicola");
    }

    // En esta sección nos ocupamos de generar el reporte en formato PDF para los motores
    // -------------------------------------------------------------------------
    function generatePdfMotores(m_ln1v, m_ln2v, m_ln3v, m_ln1a, n_ln2a, m_ln3a, tema, subtema, unidad_1, unidad_2, name) {
      var columns = ["No.", "Dato", "Fecha"];
      /*var data = [
          ["Daniela", "Hernandez Mora", 'Suaza', "No"],
          ["Anna Sofia", "Hernandez Mora", 	"Suaza", "No"],
          [3, "Iceland", 7.501, "Reykjavík"],
          [4, "Norway", 7.498, "Oslo"],
          [5, "Finland", 7.413, "Helsinki"]
      ];*/
      var contador = 0;
      var presentar = m_ln1v.map(function(item){
        contador = contador + 1;
        return [contador, item.valor + String(unidad_1), item.fecha.replace('T', ' ')];
      });
      //console.log("Es así: ", presentar);

      var doc = new jsPDF('p', 'pt');

      /* ------------------------------------------ */
      // Esta sección es necesaria para enumerar las páginas
      var totalPagesExp = "{total_pages_count_string}";
      var pageContent = function (data) {
        // FOOTER
        var str = "Página " + data.pageCount;
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
            str = str + " de " + totalPagesExp;
        }
        doc.setFontSize(10);
        doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 10);
      };
      /* ------------------------------------------ */
      var f = new Date();
      var anyo = f.getFullYear();
      var mes = (f.getMonth() +1);
      var dia = f.getDate();
      if (String(mes).length == 1) {
        mes ="0" + mes;
      }
      if (String(dia).length == 1) {
        dia = "0" + dia;
      }
      var fecha = anyo + "/" + mes + "/" + dia;
      // From HTML
      // From html - shows how pdf tables can be be drawn from html tables
      /*
      examples.html = function () {
          var doc = new jsPDF('p', 'pt');
          doc.text("From HTML", 40, 50);
          var res = doc.autoTableHtmlToJson(document.getElementById("basic-table"));
          doc.autoTable(res.columns, res.data, {startY: 60});
          return doc;
      };
      */
      //doc.rect(574, 700, 10, 20);
      doc.setProperties({
      	title:  name + " (" + fecha + ")",
      	subject: 'Seguimiento del estado de las variables del sistema de control Acuicola',
      	author: 'Acuicola 2017',
      	keywords: 'acuicola, control, 2017, lago, piscicultura',
      	creator: 'Acuicola 2017'
      });
      doc.text("REPORTE DATOS ESTACIÓN ACUICOLA", 150, 40);
      doc.text(String(tema), 40, 60);
      doc.text(fecha, 475, 60);
      doc.text("Sensor de voltaje línea 1", 40, 90);
      doc.text(String(subtema), 475, 90);
      //console.log("Total de páginas: ", doc.putTotalPages());
      doc.autoTable(columns, presentar, {
        addPageContent: pageContent,
        margin: {top: 100},
        cellPadding: 5, // a number, array or object (see margin below)
        font: "helvetica", // helvetica, times, courier
        lineColor: 200,
        lineWidth: 0,
        fontStyle: 'normal', // normal, bold, italic, bolditalic
        //overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
        fillColor: false, // false for transparent or a color as described below
        textColor: 20,
        halign: 'left', // left, center, right
        valign: 'middle', // top, middle, bottom
        columnWidth: 'auto', // 'auto', 'wrap' or a number
        //startY: false, // false (indicates margin top value) or a number

        pageBreak: 'always', // 'auto', 'avoid' or 'always'
        tableWidth: 'number', // 'auto', 'wrap' or a number,
        showHeader: 'everyPage', // 'everyPage', 'firstPage', 'never',
        tableLineColor: 200, // number, array (see color section below)
        tableLineWidth: 0,
        //addPageContent: function(data) {
          //doc.text("Reporte datos estación Acuicola", 190, 40);
        //}
      });

      var contador = 0;
      // console.log("m_12v es: ", m_ln2v);
      var presentar = m_ln2v.map(function(item){
        contador = contador + 1;
        return [contador, item.valor + String(unidad_1), item.fecha.replace('T', ' ')];
      });

      doc.text("Sensor de voltaje línea 2", 40, doc.autoTable.previous.finalY + 50);
      doc.text(String(subtema), 475, doc.autoTable.previous.finalY + 50);
      doc.autoTable(columns, presentar, {
        addPageContent: pageContent,

        startY: doc.autoTable.previous.finalY,

        cellPadding: 5, // a number, array or object (see margin below)
        font: "helvetica", // helvetica, times, courier
        lineColor: 200,
        lineWidth: 0,
        fontStyle: 'normal', // normal, bold, italic, bolditalic
        fillColor: false, // false for transparent or a color as described below
        textColor: 20,
        halign: 'left', // left, center, right
        valign: 'middle', // top, middle, bottom
        columnWidth: 'auto', // 'auto', 'wrap' or a number
        //startY: false, // false (indicates margin top value) or a number

        pageBreak: 'always', // 'auto', 'avoid' or 'always'
        tableWidth: 'number', // 'auto', 'wrap' or a number,
        showHeader: 'everyPage', // 'everyPage', 'firstPage', 'never',
        tableLineColor: 200, // number, array (see color section below)
        tableLineWidth: 0,
        //addPageContent: function(data) {
          //doc.text("Reporte datos estación Acuicola", 190, 40);
        //}
      });

      // Incluimos ahora la línea 3 del voltaje
      var contador = 0;
      //console.log("m_1n3v es: ", m_ln3v);
      var presentar = m_ln3v.map(function(item){
        contador = contador + 1;
        return [contador, item.valor + String(unidad_1), item.fecha.replace('T', ' ')];
      });

      doc.text("Sensor de voltaje línea 3", 40, doc.autoTable.previous.finalY + 50);
      doc.text(String(subtema), 475, doc.autoTable.previous.finalY + 50);
      doc.autoTable(columns, presentar, {
        addPageContent: pageContent,

        startY: doc.autoTable.previous.finalY,

        cellPadding: 5, // a number, array or object (see margin below)
        font: "helvetica", // helvetica, times, courier
        lineColor: 200,
        lineWidth: 0,
        fontStyle: 'normal', // normal, bold, italic, bolditalic
        fillColor: false, // false for transparent or a color as described below
        textColor: 20,
        halign: 'left', // left, center, right
        valign: 'middle', // top, middle, bottom
        columnWidth: 'auto', // 'auto', 'wrap' or a number
        //startY: false, // false (indicates margin top value) or a number

        pageBreak: 'always', // 'auto', 'avoid' or 'always'
        tableWidth: 'number', // 'auto', 'wrap' or a number,
        showHeader: 'everyPage', // 'everyPage', 'firstPage', 'never',
        tableLineColor: 200, // number, array (see color section below)
        tableLineWidth: 0,
        //addPageContent: function(data) {
          //doc.text("Reporte datos estación Acuicola", 190, 40);
        //}
      });

      // Incluimos ahora la línea 1 del sensor de amperaje
      var contador = 0;
      //console.log("m_ln1a es: ", m_ln1a);
      var presentar = m_ln1a.map(function(item){
        contador = contador + 1;
        return [contador, item.valor + String(unidad_2), item.fecha.replace('T', ' ')];
      });

      doc.text("Sensor de corriente línea 1", 40, doc.autoTable.previous.finalY + 50);
      doc.text(String(subtema), 475, doc.autoTable.previous.finalY + 50);
      doc.autoTable(columns, presentar, {
        addPageContent: pageContent,

        startY: doc.autoTable.previous.finalY,

        cellPadding: 5, // a number, array or object (see margin below)
        font: "helvetica", // helvetica, times, courier
        lineColor: 200,
        lineWidth: 0,
        fontStyle: 'normal', // normal, bold, italic, bolditalic
        fillColor: false, // false for transparent or a color as described below
        textColor: 20,
        halign: 'left', // left, center, right
        valign: 'middle', // top, middle, bottom
        columnWidth: 'auto', // 'auto', 'wrap' or a number
        //startY: false, // false (indicates margin top value) or a number

        pageBreak: 'always', // 'auto', 'avoid' or 'always'
        tableWidth: 'number', // 'auto', 'wrap' or a number,
        showHeader: 'everyPage', // 'everyPage', 'firstPage', 'never',
        tableLineColor: 200, // number, array (see color section below)
        tableLineWidth: 0,
        //addPageContent: function(data) {
          //doc.text("Reporte datos estación Acuicola", 190, 40);
        //}
      });

      // Incluimos ahora la línea 2 del sensor de amperaje
      var contador = 0;
      //console.log("m_ln2a es: ", m_ln2a);
      var presentar = n_ln2a.map(function(item){
        contador = contador + 1;
        return [contador, item.valor + String(unidad_2), item.fecha.replace('T', ' ')];
      });

      doc.text("Sensor de corriente línea 2", 40, doc.autoTable.previous.finalY + 50);
      doc.text(String(subtema), 475, doc.autoTable.previous.finalY + 50);
      doc.autoTable(columns, presentar, {
        addPageContent: pageContent,

        startY: doc.autoTable.previous.finalY,

        cellPadding: 5, // a number, array or object (see margin below)
        font: "helvetica", // helvetica, times, courier
        lineColor: 200,
        lineWidth: 0,
        fontStyle: 'normal', // normal, bold, italic, bolditalic
        fillColor: false, // false for transparent or a color as described below
        textColor: 20,
        halign: 'left', // left, center, right
        valign: 'middle', // top, middle, bottom
        columnWidth: 'auto', // 'auto', 'wrap' or a number
        //startY: false, // false (indicates margin top value) or a number

        pageBreak: 'always', // 'auto', 'avoid' or 'always'
        tableWidth: 'number', // 'auto', 'wrap' or a number,
        showHeader: 'everyPage', // 'everyPage', 'firstPage', 'never',
        tableLineColor: 200, // number, array (see color section below)
        tableLineWidth: 0,
        //addPageContent: function(data) {
          //doc.text("Reporte datos estación Acuicola", 190, 40);
        //}
      });


      // Incluimos ahora la línea 3 del sensor de amperaje
      var contador = 0;
      //console.log("m_ln3a es: ", m_ln3a);
      var presentar = m_ln3a.map(function(item){
        contador = contador + 1;
        return [contador, item.valor + String(unidad_2), item.fecha.replace('T', ' ')];
      });

      doc.text("Sensor de corriente línea 3", 40, doc.autoTable.previous.finalY + 50);
      doc.text(String(subtema), 475, doc.autoTable.previous.finalY + 50);
      doc.autoTable(columns, presentar, {
        addPageContent: pageContent,

        startY: doc.autoTable.previous.finalY,

        cellPadding: 5, // a number, array or object (see margin below)
        font: "helvetica", // helvetica, times, courier
        lineColor: 200,
        lineWidth: 0,
        fontStyle: 'normal', // normal, bold, italic, bolditalic
        fillColor: false, // false for transparent or a color as described below
        textColor: 20,
        halign: 'left', // left, center, right
        valign: 'middle', // top, middle, bottom
        columnWidth: 'auto', // 'auto', 'wrap' or a number
        //startY: false, // false (indicates margin top value) or a number

        pageBreak: 'always', // 'auto', 'avoid' or 'always'
        tableWidth: 'number', // 'auto', 'wrap' or a number,
        showHeader: 'everyPage', // 'everyPage', 'firstPage', 'never',
        tableLineColor: 200, // number, array (see color section below)
        tableLineWidth: 0,
        //addPageContent: function(data) {
          //doc.text("Reporte datos estación Acuicola", 190, 40);
        //}
      });

      /* ------------------------------------------ */
      // Esta sección es necesaria para enumerar las páginas
      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
      }
      /* ------------------------------------------ */
      //doc.output("dataurlnewwindow");
      doc.save("Reporte de motores estación Acuicola " + fecha);
    }

    this.generar_pdf = pubsub.subscribe('reporte', function(topic, data){
      if (data[0]) { // Temperatura
        setTimeout(function() {
          generatePdf(this.state.dataTem, "Sensor de temperatura", " °C", "Estación Acuicola - Temperatra");
        }.bind(this), 1000);
      }
      if (data[1]) {  // Ph
        setTimeout(function() {
          generatePdf(this.state.dataPh, "Sensor de Ph", "", "Estación Acuicola - PH");
        }.bind(this), 2000);
      }
      if (data[2]) { // Oxígeno disuelto
        setTimeout(function() {
          generatePdf(this.state.dataOxd, "Sensor de oxígeno disuelto", " ppm", "Estación Acuicola - Oxígeno disuelto");
        }.bind(this), 3000);
      }
      if (data[3]) { // Motores
        //console.log("La data es: ", data);
        // dataMotLine3
        this.getApi_motores();
        setTimeout(function() {
          generatePdfMotores(this.state.dataMotAll[0], this.state.dataMotAll[1], this.state.dataMotAll[2], this.state.dataMotAll[3], this.state.dataMotAll[4], this.state.dataMotAll[5], "Reporte de los motores de la estación Acuicola", "Motor 1", " Voltios", " Amperios", "Estación Acuicola - Motores");
          generatePdfMotores(this.state.dataMotAll[6], this.state.dataMotAll[7], this.state.dataMotAll[8], this.state.dataMotAll[9], this.state.dataMotAll[10], this.state.dataMotAll[11], "Reporte de los motores de la estación Acuicola", "Motor 2", " Voltios", " Amperios", "Estación Acuicola - Motores");
          generatePdfMotores(this.state.dataMotAll[12], this.state.dataMotAll[13], this.state.dataMotAll[14], this.state.dataMotAll[15], this.state.dataMotAll[16], this.state.dataMotAll[17], "Reporte de los motores de la estación Acuicola", "Motor 3", " Voltios", " Amperios", "Estación Acuicola - Motores");
          generatePdfMotores(this.state.dataMotAll[18], this.state.dataMotAll[19], this.state.dataMotAll[20], this.state.dataMotAll[21], this.state.dataMotAll[22], this.state.dataMotAll[23], "Reporte de los motores de la estación Acuicola", "Motor 4", " Voltios", " Amperios", "Estación Acuicola - Motores");
          //generatePdf(this.state.dataMotAll, "Motor 1", " v");
        }.bind(this), 4000);
      }
    }.bind(this));
    this.actualiza();
  },


/*
// Custom style - shows how custom styles can be applied to tables
// Añade multiples tablas con una leyenda entre ellas
// Fuente: https://simonbengtsson.github.io/jsPDF-AutoTable/examples.js

examples.spans = function () {
    var doc = new jsPDF('p', 'pt');
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.setFontStyle('bold');
    doc.text('Col and row span', 40, 50);
    var data = getData(80);
    data.sort(function (a, b) {
        return parseFloat(b.expenses) - parseFloat(a.expenses);
    });
    doc.autoTable(getColumns(), data, {
        theme: 'grid',
        startY: 60,
        drawRow: function (row, data) {
            // Colspan
            doc.setFontStyle('bold');
            doc.setFontSize(10);
            if (row.index === 0) {
                doc.setTextColor(200, 0, 0);
                doc.rect(data.settings.margin.left, row.y, data.table.width, 20, 'S');
                doc.autoTableText("Priority Group", data.settings.margin.left + data.table.width / 2, row.y + row.height / 2, {
                    halign: 'center',
                    valign: 'middle'
                });
                data.cursor.y += 20;
            } else if (row.index === 5) {
                doc.rect(data.settings.margin.left, row.y, data.table.width, 20, 'S');
                doc.autoTableText("Other Groups", data.settings.margin.left + data.table.width / 2, row.y + row.height / 2, {
                    halign: 'center',
                    valign: 'middle'
                });
                data.cursor.y += 20;
            }

            if (row.index % 5 === 0) {
                var posY = row.y + row.height * 6 + data.settings.margin.bottom;
                if (posY > doc.internal.pageSize.height) {
                    data.addPage();
                }
            }
        },
        drawCell: function (cell, data) {
            // Rowspan
            if (data.column.dataKey === 'id') {
                if (data.row.index % 5 === 0) {
                    doc.rect(cell.x, cell.y, data.table.width, cell.height * 5, 'S');
                    doc.autoTableText(data.row.index / 5 + 1 + '', cell.x + cell.width / 2, cell.y + cell.height * 5 / 2, {
                        halign: 'center',
                        valign: 'middle'
                    });
                }
                return false;
            }
        }
    });
    return doc;
};
*/

  /*
  // Themes - shows how the different themes looks
  // Múltiples tablas
  examples.themes = function () {
      var doc = new jsPDF();
      doc.setFontSize(12);
      doc.setFontStyle('bold');

      doc.text('Theme "striped"', 14, 16);
      doc.autoTable(getColumns(), getData(), {startY: 20});

      doc.text('Theme "grid"', 14, doc.autoTable.previous.finalY + 10);
      doc.autoTable(getColumns(), getData(), {startY: doc.autoTable.previous.finalY + 14, theme: 'grid'});

      doc.text('Theme "plain"', 14, doc.autoTable.previous.finalY + 10);
      doc.autoTable(getColumns(), getData(), {startY: doc.autoTable.previous.finalY + 14, theme: 'plain'});

      return doc;
  };
  */



  componentWillUnMount: function() {
    pubsub.unsubscribe(this.puente);
    pubsub.unsubscribe(this.reiniciar);
    pubsub.unsubscribe(this.generar_pdf);
  },

  actualiza: function() {
    setInterval(function(){
      if (turno == 0) {
        //setTimeout(function() {
          this.getApi_tem();
        //}.bind(this), 100);
        turno = 1;
      } else {
        if (turno == 1) {
          //setTimeout(function() {
            this.getApi_ph();
          //}.bind(this), 300);
          turno = 2;
        } else {
          if (turno == 2) {
            //setTimeout(function() {
              this.getApi_oxd();
            //}.bind(this), 600);
            turno = 3;
          } else {
            if (turno == 3) {
              //setTimeout(function() {
                this.getApi_mot();
              //}.bind(this), 900);
              turno = 4;
            } else {
              if (turno == 4) {
                //setTimeout(function() {
                  this.getApi_tem_ph_oxd_act();
                //}.bind(this), 1200);
                turno = 0
              }
            }
          }
        }
      }
    }.bind(this), 700);
  },

  getApi_tem: function() {
    axios.get("http://localhost/api/Datos/tem/1/" + this.state.date_start_temp + "/" + this.state.date_end_temp + "/" + this.state.time_start_temp + "/" + this.state.time_end_temp)
    .then(function(response) {
      this.setState({
        dataTem: response.data
      });

    }.bind(this))
    .catch(function (error) {
      //console.log(error);
    });
  },

  getApi_ph: function() {
    axios.get("http://localhost/api/Datos/ph/1/" + this.state.date_start_ph +"/" + this.state.date_end_ph + "/"+ this.state.time_start_ph +"/" + this.state.time_end_ph)
    .then(function(resultado) {
      this.setState({
        dataPh: resultado.data
      });
    }.bind(this))
    .catch(function (error) {
      //console.log(error);
    });
  },

  getApi_oxd: function() {
    axios.get("http://localhost/api/Datos/oxd/1/" + this.state.date_start_oxd +"/" + this.state.date_end_oxd + "/"+ this.state.time_start_oxd +"/" + this.state.time_end_oxd)
    .then(function(respuesta) {
      this.setState({
        dataOxd: respuesta.data
      });
    }.bind(this))
    .catch(function (error) {
      //console.log(error);
    });
  },

  getApi_mot: function() {
    axios.get("http://localhost/api/DatosMotores")
    .then(function(response) {
      //console.log("Motores: ", response.data[1]);
      this.setState({
        dataMotAct: response.data
      });

    }.bind(this))
    .catch(function (error) {
      //console.log(error);
    });
  },

  getApi_motores : function() {
    axios.get("http://localhost/api/DatosMotores/cadena/1/"+ this.state.date_start_mot +"/"+ this.state.date_end_mot +"/"+ this.state.time_start_mot +"/" + this.state.time_end_mot)
    .then(function(response) {
      //console.log("Motores: ", response.data);
      //console.log("Motores: ", response.data[0]);
      //console.log("Motores: ", response.data[0][1].fk_sensor);

      //var j = 0;
      /*
      var arreglo = [];
      var motor = [];
      var contador = 0, sensores = 6;
      var i = 0;
      //console.log("El tamaño es: ", response.data.length);  -> 24
      for (i; i < (response.data.length); i++) { // < 24 (Los datos de los 4 motores 4x(v_ln1, v_ln2, v_ln3, a_ln1, a_ln2, a_l3) = 24)
        var temporal = response.data[i];
        if (contador < sensores) {
          arreglo = arreglo.concat(temporal);
          contador++;
        } else {
          motor = motor.concat(arreglo);
          break;
        }
      }*/

      /*
        var resultado = arreglo.map(function(item) {
          return [item.valor, item.fecha.replace('T', ' '), item.fk_sensor, ];
        });
      */

      //resultado = resultado.map(function(item) {
        //return item;
      //});

      this.setState({
        //dataMotVolLine1: response.data[1]
        dataMotAll: response.data
      });

      //console.log("La respuenta simplemente es: ", response.data[1]);
      //console.log("Data motores", this.state.dataMotVolLine1);
      //console.log("Data de oxígeno disuelto", this.state.dataOxd);
    }.bind(this))
    .catch(function (error) {
      //console.log(error);
    });
  },

  getApi_vol_ml2 : function(sensor, estado) {
    axios.get("http://localhost/api/Datos/"+ sensor +"/"+ estado +"/" + this.state.date_start_oxd +"/" + this.state.date_end_oxd + "/"+ this.state.time_start_oxd +"/" + this.state.time_end_oxd)
    .then(function(response) {
      //console.log("Motores: ", response.data[1]);
      this.setState({
        dataMotVolLine2: response.data
      });

    }.bind(this))
    .catch(function (error) {
      //console.log(error);
    });
  },

  getApi_vol_ml3 : function(sensor, estado) {
    axios.get("http://localhost/api/Datos/"+ sensor +"/"+ estado +"/" + this.state.date_start_oxd +"/" + this.state.date_end_oxd + "/"+ this.state.time_start_oxd +"/" + this.state.time_end_oxd)
    .then(function(response) {
      //console.log("Motores: ", response.data[1]);
      this.setState({
        dataMotVolLine3 : response.data
      });
    }.bind(this))
    .catch(function (error) {
      //console.log(error);
    });
  },

  getApi_am_ml1 : function(sensor, estado) {
    axios.get("http://localhost/api/Datos/"+ sensor +"/"+ estado +"/" + this.state.date_start_oxd +"/" + this.state.date_end_oxd + "/"+ this.state.time_start_oxd +"/" + this.state.time_end_oxd)
    .then(function(response) {
      //console.log("Motores: ", response.data[1]);
      this.setState({
        dataMotAmLine1 : response.data
      });
    }.bind(this))
    .catch(function (error) {
      //console.log(error);
    });
  },

  getApi_am_ml2 : function(sensor, estado) {
    axios.get("http://localhost/api/Datos/"+ sensor +"/"+ estado +"/" + this.state.date_start_oxd +"/" + this.state.date_end_oxd + "/"+ this.state.time_start_oxd +"/" + this.state.time_end_oxd)
    .then(function(response) {
      //console.log("Motores: ", response.data[1]);
      this.setState({
        dataMotAmLine2 : response.data
      });
    }.bind(this))
    .catch(function (error) {
      //console.log(error);
    });
  },

  getApi_am_ml3 : function(sensor, estado) {
    axios.get("http://localhost/api/Datos/"+ sensor +"/"+ estado +"/" + this.state.date_start_oxd +"/" + this.state.date_end_oxd + "/"+ this.state.time_start_oxd +"/" + this.state.time_end_oxd)
    .then(function(response) {
      //console.log("Motores: ", response.data[1]);
      this.setState({
        dataMotAmLine3 : response.data
      });
    }.bind(this))
    .catch(function (error) {
      //console.log(error);
    });
  },

  getApi_tem_ph_oxd_act: function() {
    axios.get("http://localhost/api/Datos")
    .then(function(response) {
      //console.log("Motores: ", response.data);
      this.setState({
        dataTemPhOxdAct: response.data
      });
    }.bind(this))
    .catch(function (error) {
      //console.log(error);
    });
  },

  render: function() {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-8'>
            <div className='row'>
              <div className='col-lg-4'>
                <Sensor titulo='Temperatura'
                  sub_title={this.state.dataTemPhOxdAct ? this.state.dataTemPhOxdAct[0] : ''}
                  unidad='°C'
                  idFechaStart='s11'
                  idFechaEnd='s12'
                  id_hh1='s1hh1'
                  id_mm1='s1mm1'
                  id_ss1='s1ss1'
                  id_hh2='s1hh2'
                  id_mm2='s1mm2'
                  id_ss2='s1ss2'
                  data_sensor={this.state.dataTem}/>
              </div>
              <div className='col-lg-4'>
                <Sensor
                  titulo='Ph'
                  sub_title={this.state.dataTemPhOxdAct ? this.state.dataTemPhOxdAct[1] : ''}
                  unidad='H+'
                  idFechaStart='s21'
                  idFechaEnd='s22'
                  id_hh1='s2hh1'
                  id_mm1='s2mm1'
                  id_ss1='s2ss1'
                  id_hh2='s2hh2'
                  id_mm2='s2mm2'
                  id_ss2='s2ss2'
                  data_sensor={this.state.dataPh}/>
              </div>
              <div className='col-lg-4'>
                <Sensor
                  titulo='Oxígeno disuelto'
                  sub_title={this.state.dataTemPhOxdAct ? this.state.dataTemPhOxdAct[2] : ''}
                  unidad='ppm'
                  idFechaStart='s31'
                  idFechaEnd='s32'
                  id_hh1='s3hh1'
                  id_mm1='s3mm1'
                  id_ss1='s3ss1'
                  id_hh2='s3hh2'
                  id_mm2='s3mm2'
                  id_ss2='s3ss2'
                  data_sensor={this.state.dataOxd}/>
              </div>
            </div>
            <div className='row'>
              <div className='col-lg-12'>
                <Footer/>
              </div>
            </div>
          </div>

          <div className='col-lg-4'>
            <div className='row'>
              <div className='col-lg-12'>
                <Actuador
                  titulo='Motores'
                  sub_title='Sin alertas'
                  myData={this.state.dataMotAct}/>
              </div>
            </div>
          </div>
        </div>
        <Reparametrizar
          oxd={this.state.dataTemPhOxdAct ? this.state.dataTemPhOxdAct[2] : ''}
          m1_check = {this.state.dataTemPhOxdAct ? this.state.dataTemPhOxdAct[3] : ''}
          m2_check = {this.state.dataTemPhOxdAct ? this.state.dataTemPhOxdAct[4] : ''}
          m3_check = {this.state.dataTemPhOxdAct ? this.state.dataTemPhOxdAct[5] : ''}
          m4_check = {this.state.dataTemPhOxdAct ? this.state.dataTemPhOxdAct[6] : ''}
          modo_check = {this.state.dataTemPhOxdAct ? this.state.dataTemPhOxdAct[7] : ''}
        />
      </div>
    );
  }
});

module.exports = Seccion;
