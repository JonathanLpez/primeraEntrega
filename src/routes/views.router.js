const {
    Router
} = require('express')
const router = Router()
const fs = require('fs')
const file = 'primeraEntrega\src\products\productos.json'

const products = JSON.parse(fs.readFileSync(file))
router.get('/', (req, res) => {
    res.render('home', {
        products,
        style: 'styles.css'
    })
})

module.exports = router