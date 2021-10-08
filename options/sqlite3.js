const optionsSqlite3 = {
  client: "sqlite3",
  connection: {
    filename: "./data/ecommerce.sqlite",
  },
  useNullAsDefault: true,
};
console.log('Conectando a la base de datos sqlite3...');

module.exports = {
  optionsSqlite3
}