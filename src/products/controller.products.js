const {
    Router
} = require('express')

const router = Router();
const file = './products/productos.json'

const ProductManager = require('../class/productManager.js')
const prodManager = new ProductManager(file)

// Solicitar todos los productos
router.get('/', async (req, res) => {

    let limit = req.query.limit;

    try {
        const products = await prodManager.getProducts();
        console.log(products)
        if(products.length == 0){
            res.status(200).json({message: "Not found products in db"})
        }
        else{ 
            if (limit > 0) {
                const newArray = products.slice(0, limit)
                res.status(200).json(newArray)
            } else {
                res.status(200).json(products)
            }
        }
       

    } catch (error) {
        res.status(500).json({
            error: "Error"
        })
    }

})

// Solicitar producto por id

router.get('/:pid', async (req, res) => {

    const pid = Number(req.params.pid)

    try {
        const prodFilter = await prodManager.getProductById(pid)
        res.status(200).json(prodFilter)
    } catch (error) {
        res.status(500).json({
            error: "error"
        })
    }
})

// Agregar producto

router.post('/', async (req, res) => {

    const {
        code,
        title,
        description,
        price,
        thumbail,
        stock,
        status
    } = req.body

    if (code == null || title == null || description == null || price == null || stock == null || status == null) {
        res.status(500).json({
            message: "error intenta ingresar producto incompleto"
        })
    } else {

        try {
            const prodAdd = await prodManager.addProduct(code, title, description, price, thumbail, stock, status)
            res.status(201).json(prodAdd)
        } catch (error) {
            res.status(500).json({
                error: "error"
            })
        }
    }

})

// Actualizar producto

router.put('/:pid', async(req, res)=>{

    const pid =Number(req.params.pid)
    console.log(pid)
    const {code,title,description,price,thumbail,stock,status} = req.body

    try {
        const prodModify = await prodManager.updateById(pid, code, title, description, price,thumbail,stock,status)
        res.status(201).json(prodModify)
    } catch (error) {
        res.status(500).json({
            error: "error"
        })
    }


})

// Eliminar producto por id

router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)

    try {
        const prodDelete = await prodManager.deteleById(id)
        res.status(201).json(prodDelete)
    } catch (error) {
        res.status(500).json({
            error: "error"
        })
    }
})
module.exports = router