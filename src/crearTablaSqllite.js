
const {optionsSqlite3} = require('../options/sqlite3');
const knex = require('knex')(optionsSqlite3);

const {optionsmariadb} = require('../options/mariadb');
const knexmariadb = require('knex')(optionsmariadb);



knex.schema.dropTableIfExists('mensajes')
.then(()=>console.log('Tabla borrada...'))
.catch(e=>{
    console.log('Error en drop:', e);
    knex.destroy();
    process.exit(500);
});

knex.schema.createTable('mensajes', table => {
  table.increments('id').primary()
  table.string('autor', 50).notNullable();
  table.string('texto').notNullable();
  table.string('fyh', 50).notNullable();

  
}).then(()=>{
  console.log('Tabla de mensajes creada...');
  knex.destroy();
})
.catch(e=>{
    console.log('Error en proceso:', e);
    knex.destroy();
});



knexmariadb.schema.dropTableIfExists('productos')
.then(()=>console.log('Tabla borrada...'))
.catch(e=>{
    console.log('Error en drop:', e);
    knexmariadb.destroy();
    process.exit(500);
});


knexmariadb.schema.createTable('productos', table => {
  table.increments('id').primary();
  table.string('nombre', 50).notNullable();
  table.string('codigo', 10).notNullable();
  table.float('precio'),
  table.integer('stock');
}).then(()=>{
  console.log('Tabla de productos creada...');
  knexmariadb.destroy();
})
.catch(e=>{
    console.log('Error en proceso:', e);
    knexmariadb.destroy();
});


