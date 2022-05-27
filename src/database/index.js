const Sequelize = require("sequelize");

const DB_NAME = "la_vie";
const DB_USER = "root";
const DB_PASS = "1234";
const DB_CONFIG = {
   dialect: "mysql",
   host: "localhost",
   port: 3306,
   define : {
      timestamps: false 
   }
};

let db = {};

try {
   db = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_CONFIG);
} catch (error) {
   console.error("Erro ao tentar uma conexão com o banco de dados");
}

async function hasConnection() {
   try {
      await db.authenticate();
      console.log("Banco de dados conectados");
   } catch (error) {
      console.error(error);
   }
}

Object.assign(db, {
   hasConnection,
});

module.exports = db;
