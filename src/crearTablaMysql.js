const {optionsmariadb} = require('../options/mariadb');
const knex = require('knex')(optionsmariadb);



knex.schema.dropTableIfExists('productos')
.then(()=>console.log('Tabla borrada...'))
.catch(e=>{
    console.log('Error en drop:', e);
    knexmariadb.destroy();
    process.exit(500);
});


knex.schema.createTable('productos', table => {
  table.increments('id').primary(),
  table.string('nombre'),
  table.string('codigo', 50),
  table.float('precio', 50),
  table.integer('stock')
}).then(()=>{
  console.log('tabla creada!');
  knex.destroy();
})
.catch(e=>{
  console.log('Error en create de tabla:', e);
  knex.destroy();
});

