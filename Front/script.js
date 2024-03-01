const loginForm = document.getElementById('login')
const payForm = document.getElementById('pay')
const outLogin = document.getElementById('outlogin')
const tableBody = document.getElementById('tbl')
const btnpay = document.getElementById('btnpay')
const btnlogin = document.getElementById('btnlogin')

import connectToWS from './socket.js'

const API_REQUEST = {
    host: "3.216.187.129",
    port: 3030
}

var user_name = ""
var token = ""
var user_id = ""

function loginHandler(e) {
    e.preventDefault()
    const email = document.getElementById('emailinput').value
    const password = document.getElementById('passwordinput').value

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
    loginForm.children[3].children[1].disabled = true
    loginForm.className = "disable"

    // Activate pay form
    // Disabling current form.
    payForm.children[1].children[0].disabled = false
    payForm.children[2].children[0].disabled = false
    payForm.children[3].disabled = false
    payForm.className = ""

    getAllRecords()
    connectToWS(user_id)
}

function addRecordToTable(id, concept, amount, statu, date = "N/A") {
    const row = document.createElement('tr')
    row.innerHTML =
        `
    <td>${concept}</td>
    <td>${amount}</td>
    <td class="${statu === "RECEIVED" ? "ok" : "wait"}">${statu}</td>
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
            const records = data.data
            records.map((record) => {
                clearTable(true);
                addRecordToTable(record.id, record.concept, record.amount, record.status, !record.date ? "N/A" : record.date)
            })
        })
        .catch((err) => {
            console.log(err)
        });
}

function paymentHandler(e) {
    e.preventDefault() //pedro@dummy.com

    const concept = document.getElementById('conceptinput').value
    const amount = document.getElementById('amountinput').value

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
            clearTable(true);
            addRecordToTable(data.data.id, data.data.concept, data.data.amount, data.data.status, !data.data.date ? "N/A" : data.data.date)
        })
        .catch((err) => {
            console.log(err)
        });


}

btnlogin.addEventListener('click', (e) => {
    loginHandler(e)
})

btnpay.addEventListener('click', (e) => {
    paymentHandler(e)
})