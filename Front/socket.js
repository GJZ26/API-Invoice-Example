import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

const WEBSOCKET_REQUEST = {
    host: "127.0.0.1",
    port: 3032
}

export default function connectToWS(user_id) {
    console.log(user_id)

    const socket = io(`ws://${host}:${3032}`, {
        query: {
            userid: user_id
        }
    })

    socket.on("paynoti", (data) => {
        const invoice = data.id
        const date = data.date
        updateUI(invoice, date)
    })

}

function updateUI(id, date) {
    const element = document.getElementById(id)

    element.children[2].textContent = "RECEIVED"
    element.children[2].className = "ok"

    element.children[3].textContent = date
}