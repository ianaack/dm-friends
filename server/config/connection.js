require("dotenv").config({ debug: true });
const Sequelize = require("sequelize");
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_URL = process.env.DB_URL;
const DB_PORT = process.env.DB_PORT;

const LOCAL_DB_NAME = process.env.LOCAL_DB_NAME;
const LOCAL_DB_USER = process.env.LOCAL_DB_USER;
const LOCAL_DB_PASSWORD = process.env.LOCAL_DB_PASSWORD;

let sequelize;

if (DB_URL) {
	sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
		host: DB_URL,
		dialect: "mysql",
		port: DB_PORT,
	});
	console.log("Connected to DigitalOcean!");
} else {
	sequelize = new Sequelize(LOCAL_DB_NAME, LOCAL_DB_USER, LOCAL_DB_PASSWORD, {
		host: "localhost",
		dialect: "mysql",
		port: 3306,
	});
	console.log("Connected to local");
}

module.exports = sequelize;
