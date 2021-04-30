function calc001() {
  document.getElementById("alert-inf1").style.visibility = "hidden";
  var real = parseFloat(document.getElementById("real").value);
  var x = parseFloat(document.getElementById("x").value);
  var x0 = parseFloat(document.getElementById("x0").value);
  var x1 = parseFloat(document.getElementById("x1").value);
  var fx0 = parseFloat(document.getElementById("fx0").value);
  var fx1 = parseFloat(document.getElementById("fx1").value);
  res = fx0 + ((fx1 - fx0) / (x1 - x0)) * (x - x0);
  resultado(res, real);
  if (isNaN(res) == false) {
    extrapolacion1(x, x0, x1);
  }
}

function calc002() {
  document.getElementById("alert-inf1").style.visibility = "hidden";
  var real = parseFloat(document.getElementById("real").value);
  var x = parseFloat(document.getElementById("x").value);
  var x0 = parseFloat(document.getElementById("x0").value);
  var x1 = parseFloat(document.getElementById("x1").value);
  var x2 = parseFloat(document.getElementById("x2").value);
  var fx0 = parseFloat(document.getElementById("fx0").value);
  var fx1 = parseFloat(document.getElementById("fx1").value);
  var fx2 = parseFloat(document.getElementById("fx2").value);
  var b0 = fx0;
  var b1 = (fx1 - b0) / (x1 - x0);
  b1 = b1.toFixed(6);
  var b2 = (((fx2 - fx1) / (x2 - x1)) - b1) / (x2 - x0);
  b2 = b2.toFixed(6);
  res = b0 + b1 * (x - x0) + b2 * (x - x0) * (x - x1);
  res = res.toFixed(6);
  resultado(res, real);
  if (isNaN(res) == false) {
    extrapolacion2(x, x0, x1, x2);
  }
}

function calc003() {
  document.getElementById("alert-inf1").style.visibility = "hidden";
  var real = parseFloat(document.getElementById("real").value);
  var x = parseFloat(document.getElementById("x").value);
  var x0 = parseFloat(document.getElementById("x0").value);
  var x1 = parseFloat(document.getElementById("x1").value);
  var fx0 = parseFloat(document.getElementById("fx0").value);
  var fx1 = parseFloat(document.getElementById("fx1").value);
  res = ((x - x1) / (x0 - x1)) * fx0 + ((x - x0) / (x1 - x0)) * fx1;
  res = res.toFixed(8);
  resultado(res, real);
  if (isNaN(res) == false) {
    extrapolacion1(x, x0, x1);
  }
}

function calc004() {
  document.getElementById("alert-inf1").style.visibility = "hidden";
  var real = parseFloat(document.getElementById("real").value);
  var x = parseFloat(document.getElementById("x").value);
  var x0 = parseFloat(document.getElementById("x0").value);
  var x1 = parseFloat(document.getElementById("x1").value);
  var x2 = parseFloat(document.getElementById("x2").value);
  var fx0 = parseFloat(document.getElementById("fx0").value);
  var fx1 = parseFloat(document.getElementById("fx1").value);
  var fx2 = parseFloat(document.getElementById("fx2").value);
  res = ((x - x1) / (x0 - x1)) * ((x - x2) / (x0 - x2)) * fx0 + ((x - x0) / (x1 - x0)) * ((x - x2) / (x1 - x2)) * fx1 + ((x - x0) / (x2 - x0)) * ((x - x1) / (x2 - x1)) * fx2;
  res = res.toFixed(8);
  resultado(res, real);
  if (isNaN(res) == false) {
    extrapolacion2(x, x0, x1, x2);
  }
}

function resultado(res, real) {
  eliminar();
  if (isNaN(res)) {
    document.getElementById("alert-inf").style.visibility = "visible";
    document.getElementById("alert-inf").innerHTML = "Caracteres no válidos ";
    icono = document.createElement('i');
    icono.classList.add('fas', 'fa-exclamation-triangle');
    document.getElementById('alert-inf').appendChild(icono);

  } else {
    document.getElementById("alert-inf").innerHTML = "";
    document.getElementById("alert-inf").style.visibility = "hidden";
    document.getElementById("resultado").innerHTML = "Resultado:";
    document.getElementById("res").innerHTML = res;

    if (isNaN(real) == false) {
      document.getElementById("errorPorcentual").innerHTML = "Error porcentual:";
      resdif = (real - res) / real;
      respor = resdif * 100;
      document.getElementById("resp").innerHTML = respor.toFixed(2) + "%";
    }
  }
}

function eliminar() {
  document.getElementById("errorPorcentual").innerHTML = "";
  document.getElementById("resp").innerHTML = "";
  document.getElementById("resultado").innerHTML = "";
  document.getElementById("res").innerHTML = "";
}

function extrapolacion1(x, x0, x1) {
  if (isNaN(x) === false && isNaN(x0) === false && isNaN(x1) === false) {
    if (x0 <= x && x1 >= x) {
      /* Esta en el rango */
    } else {
      document.getElementById("alert-inf1").style.visibility = "visible";
      icono = document.createElement('i');
      icono.classList.add('fas', 'fa-lightbulb');
      document.getElementById("alert-inf1").innerHTML = "Es una extrapolación ";
      document.getElementById('alert-inf1').appendChild(icono);
    }
  }
}

function extrapolacion2(x, x0, x1, x2) {
  if (isNaN(x) === false && isNaN(x0) === false && isNaN(x1) === false && isNaN(x2) === false) {
    if (x0 <= x && x1 >= x || x0 <= x && x2 >= x) {
      /* Esta en el rango */
    } else {
      document.getElementById("alert-inf1").style.visibility = "visible";
      icono = document.createElement('i');
      icono.classList.add('fas', 'fa-lightbulb');
      document.getElementById("alert-inf1").innerHTML = "Es una extrapolación ";
      document.getElementById('alert-inf1').appendChild(icono);
    }
  }
}