const router = require("express").Router();
const { Post } = require("../models/");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
	try {
		const postData = await Post.findAll({
			where: {
				userId: req.session.userId,
			},
		});
	} catch (err) {
		res.redirect("login");
	}
});

router.get("/new", withAuth, (req, res) => {});

router.get("/edit/:id", withAuth, async (req, res) => {
	try {
		const postData = await Post.findByPk(req.params.id);
	} catch (err) {
		res.redirect("login");
	}
});

module.exports = router;
