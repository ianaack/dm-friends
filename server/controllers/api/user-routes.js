const router = require("express").Router();
const { User } = require("../../models");

// GET all users
router.get("/", async (req, res) => {
	try {
		const users = await User.findAll();
		res.json(users);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
});

// GET a specific user by id
router.get("/:id", async (req, res) => {
	try {
		const user = await User.findByPk(req.params.id);
		if (user) {
			res.json(user);
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
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
		res.status(500).json({ message: "Server Error" });
	}
});

// UPDATE an existing user
router.put("/:id", async (req, res) => {
	try {
		const [rowsUpdated, [updatedUser]] = await User.update(req.body, {
			returning: true,
			where: { id: req.params.id },
		});
		if (rowsUpdated === 0) {
			res.status(404).json({ message: "User not found" });
		} else {
			res.json(updatedUser);
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
});

// DELETE an existing user
router.delete("/:id", async (req, res) => {
	try {
		const rowsDeleted = await User.destroy({ where: { id: req.params.id } });
		if (rowsDeleted === 0) {
			res.status(404).json({ message: "User not found" });
		} else {
			res.status(204).send();
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
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
			res.status(400).json({ message: "No user account found!" });
			return;
		}

		const validPassword = user.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({ message: "No user account found!" });
			return;
		}

		req.session.save(() => {
			req.session.userId = user.id;
			req.session.username = user.username;
			req.session.loggedIn = true;

			res.json({ user, message: "You are now logged in!" });
		});
	} catch (err) {
		res.status(400).json({ message: "No user account found!" });
	}
});

// LOGOUT a user
router.post("/logout", (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
