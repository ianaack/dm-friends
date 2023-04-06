const router = require("express").Router();
const { User } = require("../../models");

// GET all users
router.get("/", async (req, res) => {
	try {
		const users = await User.findAll();
		res.json(users);
	} catch (err) {
		console.error(err);
		res.json({ message: "Server Error" }).status(500);
	}
});

// GET a specific user by id
router.get("/:id", async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (user) {
			res.json(user);
		} else {
			res.json({ message: "User not found" }).status(404);
		}
	} catch (err) {
		console.error(err);
		res.json({ message: "Server Error" }).status(500);
	}
});

// CREATE a user
router.post("/", async (req, res) => {
	try {
		const newUser = await User.create(req.body);

		req.session.save(() => {
			req.session.userId = newUser.id;
			req.session.username = newUser.username;
			req.session.loggedIn = true;

			res.json(newUser);
		});
	} catch (err) {
		console.error(err);
		res.json({ message: "Server Error" }).status(500);
	}
});

// UPDATE an existing user
router.put("/:id", async (req, res) => {
	try {
		const updatedUser = await User.update(req.body, {
			where: { id: req.params.id },
		});
		res.json(updatedUser);
	} catch (err) {
		console.error(err);
		res.json({ message: "Server Error" }).status(500);
	}
});

// DELETE an existing user
router.delete("/:id", async (req, res) => {
	try {
		const rowsDeleted = await User.destroy({ where: { id: req.params.id } });
		if (rowsDeleted === 0) {
			res.json({ message: "User not found" }).status(404);
		} else {
			res.json({ message: "User Deleted" }).status(204);
		}
	} catch (err) {
		console.error(err);
		res.json({ message: "Server Error" }).status(500);
	}
});

// LOGIN a user
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({
			where: {
				username: req.body.username,
			},
		});

		if (!user) {
			res.json({ message: "No user account found!" }).status(400);
			return;
		}

		const validPassword = user.checkPassword(req.body.password);

		if (!validPassword) {
			res.json({ message: "Invalid Password!" }).status(400);
			return;
		}

		req.session.save(() => {
			req.session.userId = user.id;
			req.session.username = user.username;
			req.session.loggedIn = true;

			res.json({ user, message: "You are now logged in!" });
		});
	} catch (err) {
		res.status(400).json({ message: "Overall Catch!" });
	}
});

// LOGOUT a user
router.post("/logout", (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.json({message: "You are now logged out!"}).status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
