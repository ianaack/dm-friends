const router = require("express").Router();
const { Post } = require("../../models/");
const withAuth = require("../../utils/auth");

// GET all posts
router.get("/", async (req, res) => {
	try {
		const posts = await Post.findAll();
		res.json(posts);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
});

// GET a specific post by id
router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findByPk(req.params.id);
		if (post) {
			res.json(post);
		} else {
			res.status(404).json({ message: "Post not found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
});

// CREATE a post
router.post("/", withAuth, async (req, res) => {
	const body = req.body;

	try {
		const newPost = await Post.create({ ...body, user_id: req.session.user_id });
		res.json(newPost);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
});

// UPDATE an existing post
router.put("/:id", withAuth, async (req, res) => {
	try {
		const [affectedRows] = await Post.update(req.body, {
			where: {
				id: req.params.id,
			},
		});

		if (affectedRows > 0) {
			res.status(200).end();
		} else {
			res.status(404).end();
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
});

// DELETE an existing post
router.delete("/:id", withAuth, async (req, res) => {
	try {
		const [affectedRows] = Post.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (affectedRows > 0) {
			res.status(200).end();
		} else {
			res.status(404).end();
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
});

module.exports = router;
