const {
    Router
} = require('express')
const router = Router()
const file = 'src/products/productos.json'
const ProductManager = require('../class/productManager.js')
const productsMaganer = new ProductManager(file)

router.get('/', async (req, res) => {

    const products = await productsMaganer.getProducts()
    res.render('realTimeProducts.handlebars', {
        style: 'stylesSocket.css',
        title: "realTimeProducts",
        products: products
    })
})

io.on('connection', socket => {
    console.log(`Cliente conectado con id ${socket.id}`)

    socket.on('add', async (data) => {
        const add = await productsMaganer.addProduct(
            code = data.valueCode,
            title = data.valueTitle, 
            description = data.valueDescrition,
            price = data.valuePrice,
            thumbail = data.valueThumbail,
            stock = data.valueStock)
        console.log(add)
        if(add == true){ 
            socket.emit("add-exitoso", "se creo el producto")
        } else{
            socket.emit("add-exitoso", "No se pudo agregar valida el code")
        }
    })

    socket.on('borrar', async (data) => {
        const id = Number(data)
        const res = await productsMaganer.deteleById(id)
        console.log(res)
        if(res != true){
            socket.emit("deleted-exitoso", `No se borro el producto valida el id ${id}`)
        } else{ 
            socket.emit("deleted-exitoso", `Se borro el producto con id ${id}`)
        }
    })
})

module.exports = router