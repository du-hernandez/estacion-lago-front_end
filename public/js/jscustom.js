//$('#mycarousel').hide();

$(document).ready(inicio);

function inicio() {
  $("#date_start,#date_end").datepicker({
  //minDate: -32850,
  //maxDate: -1096, //Pone la fecha máxima como 10 días a partir de hoy
  dateFormat: "yy/mm/dd", //el formato de fecha es día/mes/año (ej.: 23/10/2012)
  //changeMonth: true,
  changeYear: true,
  yearRange: '-100:+0',
  });
}
