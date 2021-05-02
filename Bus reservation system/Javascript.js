window.onload = function load() {
  verifyStorage();
  update();
};

const createStorage = () => {
  for (var i = 0; i < 35; i++) {
    localStorage.setItem('seat_' + i, 'Avaible');
  }
};

const verifyStorage = () => {
  for (var i = 0; i < 35; i++) {
    if (localStorage.getItem('seat_' + i) === null) {
      createStorage();
    }
  }
};

function update() {
  for (var i = 0; i < 35; i++) {
    id = 'n' + i;
    item = localStorage.getItem('seat_' + i);
    document.getElementById(id).innerHTML = item;
  }
}

function clicktb(clicked_id) {
  document.getElementById('num_seat').value = parseInt(clicked_id) + 1;
}

function resetinput() {
  document.getElementById('num_seat').value = 1;
  document.getElementById('name_seat').value = '';
}

function save() {
  var numSeat = parseInt(document.getElementById('num_seat').value);
  var nameSeat = document.getElementById('name_seat').value;
  if (localStorage.getItem('seat_' + (numSeat - 1)) != 'Avaible') {
    alert("The seat isn't avaible");
  } else if (nameSeat === '') {
    alert('the field cannot be empty');
  } else {
    localStorage.setItem('seat_' + (numSeat - 1), nameSeat);
    resetinput();
    update();
  }
}

function edit() {
  var numSeat = parseInt(document.getElementById('num_seat_modal').value);
  var nameSeat = document.getElementById('name_seat_modal').value;
  if (localStorage.getItem('seat_' + (numSeat - 1)) === 'Avaible') {
    alert('Seat must be reserved');
  } else if (nameSeat === '') {
    alert('the field cannot be empty');
  } else {
    localStorage.setItem('seat_' + (numSeat - 1), nameSeat);
    resetinput();
    update();
  }
}

function del() {
  var numberSeat = parseInt(document.getElementById('num_seat').value);
  if (localStorage.getItem('seat_' + (numberSeat - 1)) === 'Avaible') {
    alert('Seat must be reserved');
  } else {
    var answer = window.confirm('Are you sure?');
    if (answer) {
      localStorage.setItem('seat_'+ (numberSeat - 1), 'Avaible');
      resetinput();
      update();
    }
  }
}
