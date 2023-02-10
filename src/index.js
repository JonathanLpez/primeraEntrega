const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const {Server} = require('socket.io')

const router = require('./routes/index.js')


const port = 8080

const app = express()

const httpServer = app.listen(port, ()=> console.log(`listen in port ${port}`))
const io = new Server(httpServer)

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname+'/public'))


router(app)

io.on('connection', socket => { 
    console.log(`Nuevo cliente conectado con id ${socket.id}`)

    socket.on('message', data =>{ 
        console.log(data)
    })
})

