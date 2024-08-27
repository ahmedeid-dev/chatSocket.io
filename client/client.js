const sendButton = document.getElementById('sendButton')
const messageInput = document.getElementById('messageInput')
const row = document.querySelector('.row')
const socket = io('http://localhost:3000')

sendButton.addEventListener('click', () => {
    if (messageInput.value) socket.emit('message', messageInput.value)
})
socket.on('received', (message) => {
    row.innerHTML += `
                <div class="col-md-10 sender">
                    <div class="msg">
                        <h3  class="h4 p-2 rounded-4 my-2">${message.message}</h3>
                        <p>sent : <span>${new Date(message.createdAt).toLocaleTimeString()}</span> </p>
                    </div>
                </div>
    `
    messageInput.value = ''
})
socket.on('connect', () => {
    socket.emit('loading')
})
socket.on('display', (data) => {
    row.innerHTML = ''
    data.forEach((message) => {
        row.innerHTML += `
        <div class="col-md-10 sender">
            <div class="msg">
                <h3  class="h4 rounded-4 ">${message.message}</h3>
                <p>sent : <span>${new Date(message.createdAt).toLocaleTimeString()}</span> </p>
            </div>
        </div>
    `
    })
})
window.scrollTo(0, document.body.scrollHeight)