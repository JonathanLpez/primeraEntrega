const express = require('express')
const morgan = require('morgan')

const app = express()
const server = require('http').createServer(app)
global.io = require('socket.io')(server)

const router = require('./routes/index.js')
const handlebars = require('./configHandlebars.js')

const port = 8080

server.listen(port, ()=> console.log(`listen in port ${port}`))

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(express.static(__dirname+'/public'))


router(app)
handlebars(app)