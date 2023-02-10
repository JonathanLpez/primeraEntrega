const socket = io()
socket.emit('message',`Hola me comunico desde un socket ${socket.id}`)