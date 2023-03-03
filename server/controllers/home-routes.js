const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

// get all posts for homepage
router.get("/", async (req, res) => {
	try {
		const postData = await Post.findAll({
			include: [User],
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// get single post
router.get("/post/:id", async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id, {
			include: [
				User,
				{
					model: Comment,
					include: [User],
				},
			],
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/login", (req, res) => {
	if (req.session.loggedIn) {
		res.redirect("/");
		return;
	}
});

router.get("/signup", (req, res) => {
	if (req.session.loggedIn) {
		res.redirect("/");
		return;
	}
});

module.exports = router;
