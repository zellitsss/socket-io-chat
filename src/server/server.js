const io = require('socket.io')(3001)

io.on('connection', (socket) => {
    socket.emit('initConnection', {connected: true})

    socket.on('login', (data) => {
        socket.userName = data.name
        
        console.log('Login as ' + data.name)
    })

    socket.on('new message', (data) => {
        console.log('new message from ' + socket.userName + ': ' + data)
        socket.broadcast.emit('new message', {
            name: socket.userName,
            message: data
        })
    })
})