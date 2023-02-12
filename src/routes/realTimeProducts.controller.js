const {
    Router
} = require('express')
const router = Router()
const file = 'src/products/productos.json'
const ProductManager = require('../class/productManager.js')
const productsMaganer = new ProductManager(file)

router.get('/', async (req, res) => {
    res.render('realTimeProducts.handlebars', {
        style: 'stylesSocket.css',
        title: "realTimeProducts"
       
    })
})

io.on('connection', async socket => {
    console.log(`Cliente conectado con id ${socket.id}`)

    const products = await productsMaganer.getProducts()
    await io.emit('products', products)

    socket.on('add', async (data) => {
        const add = await productsMaganer.addProduct(
            code = data.valueCode,
            title = data.valueTitle, 
            description = data.valueDescription,
            price = data.valuePrice,
            thumbail = data.valueThumbail,
            stock = data.valueStock)
        console.log(add)
        if(add == true){ 
            io.emit("add-exitoso", "se creo el producto")
        } else{
            socket.emit("add-exitoso", "No se pudo agregar valida el code")
        }
    })

    socket.on('borrar', async (data) => {
        const id = Number(data)
        const res = await productsMaganer.deteleById(id)
        console.log(res)
        if(res != true){
            await socket.emit("deleted-exitoso", `No se borro el producto valida el id ${id}`)
        } else{ 
            await io.emit("deleted-exitoso", `Se borro el producto con id ${id}`)     
        }
    })
})

module.exports = router