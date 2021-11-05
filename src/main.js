const express = require('express');

const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;
const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')
const util = require('util')
const ContenedorMemoria = require('../contenedores/ContenedorMemoria.js')
const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js')
const ContenedorDatabase = require('../contenedores/ContenedorDatabase.js')
//--------------------------------------------
// instancio servidor, socket y api

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const {optionsSqlite3} = require('../options/SQLite3');
const {optionsmariadb} = require('../options/mariadb');

const ApiProductosMock = require('../api/productos-test.js');
//const productosApi = new ContenedorMemoria()
//const mensajesApi = new ContenedorArchivo('mensajes.json')
//const productosApi = new ContenedorArchivo('productos.json')
const productosApi = new ContenedorMemoria(optionsmariadb,'productos')
const mensajesApi = new ContenedorDatabase(optionsSqlite3,'mensajes');
//--------------------------------------------
// configuro el socket
     const apiProductos = new ApiProductosMock()
const ProductosRouter = require('../router/productos.js')
//app.use('/', new ProductosRouter());

// Definimos un esquema autores
const autores = new schema.Entity('autores');
// Definimos un esquema mensaje
const mensaje = new schema.Entity('mensaje', {
    author: autores
  });
  const mensajes = new schema.Entity('mensajes', {
    mensajes: [mensaje],
  });


io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');
    const apiProductos = new ApiProductosMock()
    // carga inicial de productos
    socket.emit('productos', await apiProductos.listar(5));

    // actualizacion de productos
    socket.on('update', producto => {
        productosApi.guardar(producto)
        io.sockets.emit('productos', productosApi.listarAll());
    })

    // carga inicial de mensajes
    const msjListar = await mensajesApi.listarAll();
    const normalizar = normalize({id: 'mensaje',mensajes: msjListar},mensajes);
        print(normalizar);
        socket.emit('mensajes',normalizar);



    // actualizacion de mensajes
    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajesApi.guardar(mensaje)
        const msjListar = await mensajesApi.listarAll();
        const normalizar = normalize({id: 'mensaje',mensajes: msjListar},mensajes);
        print(normalizar);
        io.sockets.emit('mensajes',normalizar);
    })
});


  function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
  }


 


//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
