class interpolation {
  constructor(real, x, x0, x1, x2, fx0, fx1, fx2) {
    this.real = real;
    this.x = x;
    this.x0 = x0;
    this.x1 = x1;
    this.x2 = x2;
    this.fx0 = fx0;
    this.fx1 = fx1;
    this.fx2 = fx2;
  }

  linear() {
    return this.fx0 + ((this.fx1 - this.fx0) / (this.x1 - this.x0)) * (this.x - this.x0);
  }

  quadratic() {
    var b0 = this.fx0;
    console.log("b0 =" + b0);
    var b1 = (this.fx1 - b0) / (this.x1 - this.x0);
    b1 = b1.toFixed(6);
    console.log("b1 =" + b1);
    var b2 = ((this.fx2 - this.fx1) / (this.x2 - this.x1) - b1) / (this.x2 - this.x0);
    b2 = b2.toFixed(6);
    console.log("b2 =" + b2);
    var res = b0 + b1 * (this.x - this.x0) + b2 * (this.x - this.x0) * (this.x - this.x1);
    return res;
  }

  lagrange1() {
    return parseFloat(((this.x - this.x1) / (this.x0 - this.x1)) * this.fx0 + ((this.x - this.x0) / (this.x1 - this.x0)) * this.fx1);
  }

  lagrange2() {
    return parseFloat(((this.x - this.x1) / (this.x0 - this.x1)) * ((this.x - this.x2) / (this.x0 - this.x2)) * this.fx0 + ((this.x - this.x0) / (this.x1 - this.x0)) * ((this.x - this.x2) / (this.x1 - this.x2)) * this.fx1 + ((this.x - this.x0) / (this.x2 - this.x0)) * ((this.x - this.x1) / (this.x2 - this.x1)) * this.fx2);
  }

  checkExtrapolation1(x, x0, x1) {
    if (isNaN(x) === false && isNaN(x0) === false && isNaN(x1) === false) {
      if (!(x0 <= x && x1 >= x)) {
        isExtrapolation();
      }
    }
  }

  checkExtrapolation2(x, x0, x1, x2) {
    if (isNaN(x) === false && isNaN(x0) === false && isNaN(x1) === false && isNaN(x2) === false) {
      if (!(x0 <= x && x1 >= x || x0 <= x && x2 >= x)) {
        isExtrapolation();
      }
    }
  }

  printRes(res, real) {
    del()
    if (isNaN(res)) {
      isntValid()
    } else {
      document.getElementById("alert-inf").innerHTML = "";
      document.getElementById("alert-inf").style.visibility = "hidden";
      document.getElementById("resultado").innerHTML = "Resultado:";
      document.getElementById("res").innerHTML = res;
      if (isNaN(real) === false) {
        document.getElementById("errorPorcentual").innerHTML = "Error porcentual:";
        var respercent = ((real - res) / real) * 100;
        document.getElementById("resp").innerHTML = respercent.toFixed(2) + "%";
      }
    }
  }
}

function isExtrapolation() {
  document.getElementById("alert-inf1").style.visibility = "visible";
  var icono = document.createElement('i');
  icono.classList.add('fas', 'fa-lightbulb');
  document.getElementById("alert-inf1").innerHTML = "Es una extrapolación ";
  document.getElementById('alert-inf1').appendChild(icono);
}

function isntValid() {
  document.getElementById("alert-inf").style.visibility = "visible";
  document.getElementById("alert-inf").innerHTML = "Caracteres no válidos ";
  var icono = document.createElement('i');
  icono.classList.add('fas', 'fa-exclamation-triangle');
  document.getElementById('alert-inf').appendChild(icono);
}

function returnValue(id) {
  return parseFloat(document.getElementById(id).value)
}

function del() {
  const values = ['errorPorcentual', 'resp', 'resultado', 'res'];
  for (i = 0; i < values.length; i++) {
    document.getElementById(values[i]).innerHTML = "";
  }
}

function calc001() {
  document.getElementById("alert-inf1").style.visibility = "hidden";
  var val = new interpolation(returnValue('real'), returnValue('x'), returnValue('x0'), returnValue('x1'), 0, returnValue('fx0'), returnValue('fx1'), 0);
  var res = val.linear();
  val.printRes(res, val.real);
  if (isNaN(res) === false) {
    val.checkExtrapolation1(val.x, val.x0, val.x1);
  }
}


function calc002() {
  document.getElementById("alert-inf1").style.visibility = "hidden";
  var val = new interpolation(returnValue('real'), returnValue('x'), returnValue('x0'), returnValue('x1'), returnValue('x2'), returnValue('fx0'), returnValue('fx1'), returnValue('fx2'));
  var res = val.quadratic();
  console.log(val.real);
  console.log(val.x);
  console.log(val.x0);
  console.log(val.x1);
  console.log(val.x2);
  console.log(val.fx0);
  console.log(val.fx1);
  console.log(val.fx2);
  val.printRes(res, val.real);
  if (isNaN(res) === false) {
    val.checkExtrapolation2(val.x, val.x0, val.x1, val.x2);
  }
}

function calc003() {
  document.getElementById("alert-inf1").style.visibility = "hidden";
  var val = new interpolation(returnValue('real'), returnValue('x'), returnValue('x0'), returnValue('x1'), 0, returnValue('fx0'), returnValue('fx1'), 0);
  var res = val.lagrange1();
  val.printRes(res, val.real);
  if (isNaN(res) === false) {
    val.checkExtrapolation1(val.x, val.x0, val.x1);
  }
}

function calc004() {
  document.getElementById("alert-inf1").style.visibility = "hidden";
  var val = new interpolation(returnValue('real'), returnValue('x'), returnValue('x0'), returnValue('x1'), returnValue('x2'), returnValue('fx0'), returnValue('fx1'), returnValue('fx2'));
  var res = val.lagrange2();
  val.printRes(res, val.real);
  if (isNaN(res) === false) {
    val.checkExtrapolation2(val.x, val.x0, val.x1, val.x2);
  }
}
