const fs = require('fs')


class CartManager {

    constructor(file) {
        this.file = file
        this.carts = []
        this.products = JSON.parse(fs.readFileSync('src/products/productos.json'))
        this.idCart = 0

        try {
            this.carts = JSON.parse(fs.readFileSync(this.file))
            console.log("Data base Cart online")
        } catch (error) {
            fs.writeFileSync(this.file, JSON.stringify([]));
            console.log('Data base Cart created')
        }
    }

    async newCart() {

        this.idCart = this.carts.length + 1
        const cart = {
            id: this.idCart,
            products: []
        }

        this.carts.push(cart)

        try {
            await fs.writeFileSync(this.file, JSON.stringify(this.carts))
            return `New cart add with id ${cart.id}`
        } catch (error) {
            return "Error"
        }
    }

    async getCartID(cid) {
        const cartFilter = await this.carts.find(cart => cart.id == cid)
        if (cartFilter) {
            return cartFilter
        } else {
            return `Not found cart with id ${cid}`
        }
    }

    async postProductInCart(cid, pid) {
        const cartFilter = await this.carts.find(cart => cart.id == cid)
        const prodFilter = await this.products.find(prod => prod.id == pid)


        try {
            if (cartFilter && prodFilter) {
                const addProduct = {
                    id: pid,
                    quantity: 1
                }

                const prod = cartFilter.products.find(prod => prod.id == prodFilter.id)

                if (prod) {
                    prod.quantity = prod.quantity + 1
                    await fs.writeFileSync(this.file, JSON.stringify(this.carts))
                    return `Producto repetido con id ${pid}, se agrega uno mas`
                } else {
                    cartFilter.products.push(addProduct)
                    await fs.writeFileSync(this.file, JSON.stringify(this.carts))
                    return `Producto agregado al cart con id ${cid}`
                }
            } else{
                return `Not found cart o product`
            }



        } catch (error) {
            return `Error desde clase`
        }

    }

}

module.exports = CartManager