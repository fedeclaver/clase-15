const getProd = require('../utils/getProducts.js')

class ApiProductosMock {
    constructor() {}

    listar(cant = 50) {
        const Productos = []
        for (let i = 0; i < cant; i ++) {
            const producto = getProd()
            Productos.push(producto)
        }

        return Productos
    }
}

module.exports = ApiProductosMock