class Storage {
    constructor(value, name, ) {
        this.value = value;
        this.name = name;
    }

    setValues() {
        this.value = JSON.parse(localStorage.getItem('investValues')) || [];
        this.name = JSON.parse(localStorage.getItem('investNames')) || [];
        this.portfolio = JSON.parse(localStorage.getItem('portfolioName')) || [];
    }

    verify() {
        var savedVar = ['investValues', 'investNames', 'portfolioName'];
        for (var i = 0; i < savedVar.length; i++) {
            if (localStorage.getItem(savedVar[i]) === null) {
                this.create();
            }
        }
    }

    create() {
        var savedVar = ['investValues', 'investNames', 'portfolioName'];
        for (var i = 0; i < savedVar.length; i++) {
            localStorage.setItem(savedVar[i], JSON.stringify([]));
        }
    }

    save(investName, investValue) {
        if (investName === '' || investName === 'undefined') {
            alert("Fill the form");
        } else {
            localStorage.setItem('investValues', JSON.stringify(this.value.concat(investValue)));
            localStorage.setItem('investNames', JSON.stringify(this.name.concat(investName)));
        }
    }

    delete(id) {
        var investValues = this.value;
        var investNames = this.name;
        investValues.splice(id, 1);
        investNames.splice(id, 1);
        localStorage.setItem('investValues', JSON.stringify(investValues));
        localStorage.setItem('investNames', JSON.stringify(investNames));
    }
}

class Table {
    update(investNames, investValues) {
        var node = document.getElementById('table');
        node.innerHTML = "";
        for (var i = 0; i < investValues.length; i++) {
            document.getElementById("table").innerHTML += `
            <tr id="element${i}">
                <td>${investValues[i]}</td>
                <td >${investNames[i]}</td>
                <td >
                    <button type="button" class="btn" onclick="del('${i}')"><span class="material-icons md-light">delete</span></button>
                </td>
            </tr>
            `;
        }
    }
}

class UI {
    constructor() {
        this.data = {
            type: 'pie',
            data: {
                labels: JSON.parse(localStorage.getItem('investNames')),
                datasets: [{
                    data: JSON.parse(localStorage.getItem('investValues')),
                    backgroundColor: ['#03071e', '#370617', '#6a040f', '#9d0208', '#d00000', '#dc2f02', '#e85d04', '#f48c06', '#faa307', '#ffba08']
                }]
            },
            options: {
                responsive: true,
                aspectRatio: 1.5,
                position: 'bottom',
                backgroundColor: '#000',
                color: '#000',
                borderColor: '#000',
                plugins: {}
            }
        }
    }

    update(chart) {
        chart.data.datasets[0].data = JSON.parse(localStorage.getItem('investValues'))
        chart.data.labels = JSON.parse(localStorage.getItem('investNames'))
        chart.update();
    }

    totalValue() {
        if (JSON.parse(localStorage.getItem('investValues')).length !== 0) {
            document.getElementById("totalValue").innerHTML = '$ ' + JSON.parse(localStorage.getItem('investValues')).reduce((a, b) => a + b);
        } else {
            document.getElementById("totalValue").innerHTML = '$ 0';
        }
    }

    portfolioName() {
        document.getElementById("portfolioName").innerHTML = JSON.parse(localStorage.getItem("portfolioName"))

    }
}

const storage = new Storage();
const table = new Table();
const ui = new UI();
storage.verify();
storage.setValues();
var chart = new Chart(document.getElementById("chart"), myChart = ui.data);
table.update(storage.name, storage.value);
ui.totalValue();
ui.portfolioName();

function del(id) {
    storage.delete(id);
    table.update(storage.name, storage.value);
    ui.update(chart);
    ui.totalValue();
}

function portfolioName() {
    var portfolio = prompt("Please enter your portfolio name");
    if (portfolio != null) {
        document.getElementById("portfolioName").innerHTML = portfolio;
        localStorage.setItem('portfolioName', JSON.stringify(portfolio));
    }
}

var form = document.getElementById('form-invest');

function handleForm(event) {
    event.preventDefault();
}
form.addEventListener('submit', handleForm);

document.getElementById('form-invest').addEventListener('submit', function (e) {
    const investName = document.getElementById('investName').value;
    const investValue = parseInt(document.getElementById('investValue').value);
    storage.save(investName, investValue);
    storage.setValues();
    ui.update(chart);
    table.update(storage.name, storage.value);
    ui.totalValue();
});