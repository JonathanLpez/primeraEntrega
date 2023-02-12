const fs = require('fs')

class ProductManager {

    constructor(file) {
        this.file = file
        this.products = []
        this.id = 0;

        try {
            this.products = JSON.parse(fs.readFileSync(this.file))
            console.log('Data base Products online')
        } catch (error) {

            fs.writeFileSync(this.file, JSON.stringify([]));
            console.log('Data base Products created')
        }

    }

    async addProduct(code, title, description, price, thumbail, stock = 1, status = true) {

        this.id = this.products.length + 1

        const product = {
            id: this.id,
            code,
            title,
            description,
            price,
            thumbail,
            stock,
            status
        }

        const productFilter = this.products.find(prod => prod.code == product.code)

        if (!productFilter) {
            this.products.push(product);
            const dataJson = JSON.stringify(this.products)
            await fs.writeFileSync(this.file, dataJson)
            return true
        } else {
            return false
        }


    }

    async getProducts() {

        try {
            return this.products;
        } catch (error) {
            return 'error al leer todos los productos'
        }


    }


    async getProductById(id) {

        const prodById = await this.products.find(prod => prod.id === id)

        if (prodById) {
            return prodById
        } else {
            return `Not Found id ${id}`
        }

    }

    async deteleById(id) {


        try {
            const filter = this.products.filter(prod => prod.id !== id)
            console.log(filter.length)
            if (filter.length === 0 ) {
                return false
            } else {
                this.products = filter
                await fs.promises.writeFile(this.file, JSON.stringify(this.products))
                return true
            }

        } catch (error) {
            return false
        }


    }

    async updateById(pid, code, title, desc, precio, img, stock, status) {

        const prod = this.products.find(prod => prod.id === pid)
        console.log(prod)

        try {
            prod.code = code
            prod.title = title
            prod.description = desc
            prod.price = precio
            prod.thumbail = img
            prod.stock = stock
            prod.status = status

            await fs.promises.writeFile(this.file, JSON.stringify(this.products))
            return `Producto modificado con id ${prod.id}`
        } catch (error) {
            return 'Error al modificar producto'
        }
    }




}


module.exports = ProductManager;