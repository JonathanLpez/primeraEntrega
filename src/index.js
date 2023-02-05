const express = require('express')
const router = require('./routes/index.js')
const morgan = require('morgan')
const handlebars = require('express-handlebars')

port = 8080

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname+'/public'))


router(app)

app.listen(port, () => {
    console.log(`Listen in port ${port}`)
})