const express = require('express')
const router = require('./routes/index.js')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const {Server} = require('socket.io')

port = 8080

const app = express()
const io = app.listen(port, ()=> console.log(`listen in port ${port}`))

const socketServer = new Server(io)

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname+'/public'))


router(app)

socketServer.on('connection', socket => { 
    console.log(`Nuevo cliente conectado`)

    socket.on('message', data =>{ 
        console.log(data)
    })
})

