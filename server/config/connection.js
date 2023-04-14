require("dotenv").config({ debug: true });
const Sequelize = require("sequelize");
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = process.env.DATABASE_URL;

let sequelize;

if (DB_URL) {
	sequelize = new Sequelize(DB_URL);
} else {
	sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
		host: "localhost",
		dialect: "mysql",
		port: 3306,
	});
}

module.exports = sequelize;
