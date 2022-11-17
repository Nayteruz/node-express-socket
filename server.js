const WebSocket = require('ws');
const cursors = {};
const PORT = 5000;

const wsServer = new WebSocket.Server({
    port: PORT
});

wsServer.on('connection', function connection(socket) {
    socket.on('message', function (message) {
        message = JSON.parse(message)
        setPosition(message)
        switch (message.event) {
            case 'message':
                broadcastMessage(cursors, message)
                break;
            case 'connection':
                broadcastMessage(cursors, message)
                break;
        }
    })
})

function broadcastMessage(cursors, message) {
    wsServer.clients.forEach(client => {
        client.send(JSON.stringify(cursors))
    })
}

function setPosition(message){
    cursors['user_' + message.id] = {
        left:message.left,
        top:message.top,
        bg:message.bg,
    }
}

/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */



