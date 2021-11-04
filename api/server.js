const express = require('express')
const ProductosRouter = require('./router/productos.js')

const app = express()

app.use(express.json())

app.use('/productos', new ProductosRouter())

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
 })
 server.on('error', error => console.log(`Error en servidor: ${error}`))