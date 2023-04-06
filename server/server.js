require("dotenv").config();
const path = require("path");
const express = require("express");
const session = require("express-session");
const routes = require("./controllers");
const errorHandler = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 8008;

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const oneDay = 1000 * 60 * 60 * 24;
const sess = {
	secret: process.env.SESS_SECRET,
	cookie: {
		maxAge: oneDay,
		httpOnly: true,
		secure: false,
		sameSite: "strict",
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// turn on connection to db and server
sequelize
	.sync({ force: false })
	.then(() => {
		app.listen(PORT, () => console.log(`Database now listening on ${PORT}`));
	})
	.catch((error) => {
		console.error("Error syncing database:", error);
	});
