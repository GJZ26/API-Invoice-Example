const loginForm = document.getElementById('login')
const payForm = document.getElementById('pay')
const outLogin = document.getElementById('outlogin')
const tableBody = document.getElementById('tbl')

const API_REQUEST = {
    host: "127.0.0.1",
    port: 3030
}

var user_name = ""
var token = ""
var user_id = ""

function loginHandler(e) {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    const body = {
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "password": password
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }

    fetch(`http://${API_REQUEST.host}:${API_REQUEST.port}/users/access`, body)
        .then(response => response.json())
        .then((data) => {
            if (data.status == "not found") {
                outLogin.textContent = "User not found."
            } else {
                const res = data.data[0]
                doEverything(res)
            }

        })
        .catch((err) => {
            console.log("AA")
            console.log(err)
        });

}

function doEverything(data) {
    user_id = data.id
    user_name = data.name
    token = data.token

    // Disabling current form.
    loginForm.children[1].children[0].disabled = true
    loginForm.children[2].children[0].disabled = true
    loginForm.children[3].disabled = true
    loginForm.className = "disable"

    // Activate pay form
    // Disabling current form.
    payForm.children[1].children[0].disabled = false
    payForm.children[2].children[0].disabled = false
    payForm.children[3].disabled = false
    payForm.className = ""

    getAllRecords()
}

function addRecordToTable(id, concept, amount, statu, date = "N/A") {
    const row = document.createElement('tr')
    row.innerHTML =
        `
    <td>${concept}</td>
    <td>${amount}</td>
    <td>${statu}</td>
    <td>${date}</td>
    <td>${user_name}</td>
    `
    row.id = id;
    tableBody.appendChild(row)
}

function clearTable(removeAll = false) {
    if (removeAll) {
        if (tableBody.children[0].classList.contains("deleteme")) {
            tableBody.innerHTML = ''
        }
    } else {
        tableBody.innerHTML = '<tr class="deleteme"><td colspan="5" style="text-align: center; padding:30px 0px; font-size:1.6rem">No data</td></tr>'
    }
}

function getAllRecords() {
    const body = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Auth": token,
            "UserID": user_id
        },
    }

    fetch(`http://${API_REQUEST.host}:${API_REQUEST.port}/pays/`, body)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const records = data.data
            records.map((record) => {
                clearTable(true);
                addRecordToTable(record.id, record.concept, record.amount, record.status, !record.date  ? "N/A" : record.date)
            })
        })
        .catch((err) => {
            console.log("Se produjo un error al realizar la solicitud:");
            console.error(err);
        });
}

function paymentHandler(e) {
    e.preventDefault() //pedro@dummy.com

    const concept = e.target[0].value
    const amount = e.target[1].value

    if (!concept || !amount) {
        return alert("Complete los campos")
    }

    const body = {
        method: "POST",
        body: JSON.stringify({
            "token": token,
            "user_id": user_id,
            "concept": concept,
            "amount": amount
        }),
        headers: {
            "Content-Type": "application/json",
        },
    }

    fetch(`http://${API_REQUEST.host}:${API_REQUEST.port}/pays/`, body)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            clearTable(true);
            addRecordToTable(data.data.id, data.data.concept, data.data.amount, data.data.status, !data.data.date ? "N/A" : data.data.date)
        })
        .catch((err) => {
            console.log("AA")
            console.log(err)
        });


    console.log(e)
}

loginForm.addEventListener('submit', (e) => {
    loginHandler(e)
})

payForm.addEventListener('submit', (e) => {
    paymentHandler(e)
})