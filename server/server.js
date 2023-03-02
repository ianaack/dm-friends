const express = require("express");
const routes = require("./controllers");
const path = require("path");
const sequelize = require("./config/connection");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => console.log("Sequelize now listening"));
});

app.listen(PORT, () => {
	console.log(`Express listening on port ${PORT}!`);
	sequelize.sync({ force: false });
});
