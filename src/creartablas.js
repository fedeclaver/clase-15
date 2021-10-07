import knexLib from "knex";
import { optionsmariadb } from "../options/mariadb";

//mysql class
class ClienteSql {
  constructor(config) {
    this.knex = knexLib(config);
  }

  crearTabla() {
    return this.knex.schema.dropTableIfExists("articulos").finally(() => {
      return this.knex.schema.createTable("articulos", (table) => {
        table.increments("id").primary();
        table.string("nombre", 50).notNullable();
        table.string("codigo", 10).notNullable();
        table.float("precio");
        table.integer("stock");
      });
    });
  }
}

//mariadb
const tablamariadb = new ClienteMysql(optionsmariadb);
tablamariadb
  .crearTabla()
  .then(() => {
    console.log("tabla mariadb creada");
  })
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    tablamariadb.close();
  });
