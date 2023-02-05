const controllerProducts = require('../products/controller.products.js')
const controllerCart = require('../cart/controller.cart.js')
const viewsRouter = require('../routes/views.router.js')

const router = (app)=>{ 
    app.use('/api/products', controllerProducts)
    app.use('/api/carts', controllerCart)
    app.use('/handlebarsProducts', viewsRouter)
  
}

module.exports = router