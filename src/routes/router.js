const controllerProducts = require('../products/controller.products.js')
const controllerCart = require('../cart/controller.cart.js')
const controllerHandlebars = require('../products/controller.HandlebarsProducts.js')
const controllerRealTimeProducts  = require('../products/controller.realTimeProducts.js')

const router = (app)=>{ 
    app.use('/api/products', controllerProducts)
    app.use('/api/carts', controllerCart)
    app.use('/handlebarsProducts', controllerHandlebars)
    app.use('/realTimeProducts', controllerRealTimeProducts )
}

module.exports = router