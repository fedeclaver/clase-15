const express = require('express')
const ApiProductosMock = require('../api/productos-test.js')

class ProductosRouter extends express.Router {
    constructor() {
        super()

        const apiProductos = new ApiProductosMock()
        
        this.get('', async (req, res, next) => {
            const productos = await apiProductos.listar(req.query.limit)

            res.json(productos)
        })

        this.post('', async (req, res, next) => {
            const productos = await apiProductos.listar(1)

            res.json(productos[0])
        })
    }

}

module.exports = ProductosRouter