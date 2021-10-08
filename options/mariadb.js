const optionsmariadb = {
  client: "mysql",
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: "coder",
    password: "coder",
    database: "ecommerce",
  },
};
console.log('Conectando a la base de datos mysql...');
module.exports = {
  optionsmariadb,
};
