const router = require("express").Router();
const { Like } = require("../../models/");
const withAuth = require("../../utils/auth");

// GET all likes
router.get("/", async (req, res) => {
	try {
		const likes = await Like.findAll();
		res.status(200).json({ message: "All likes", likes });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
});

// CREATE a new like
router.post("/", withAuth, async (req, res) => {
	try {
		const { post_id } = req.body;
		const user_id = req.session.userId;

		const like = await Like.findOne({
			where: { post_id, user_id },
		});

		if (like) {
			return res.status(400).json({ message: "You already liked this post" });
		}

		const newLike = await Like.create({
			user_id,
			post_id,
		});

		res.status(200).json({
			message: `User with id: ${user_id} liked Post with id: ${post_id}`,
			newLike,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
});

// DELETE a like
router.delete("/:id", withAuth, async (req, res) => {
	try {
		const { id } = req.params.id;
		const user_id = req.session.userId;
		const like = await Like.findByPk(id);

		if (!like) {
			return res.status(404).json({ message: "Like not found" });
		}
		if (like.user_id !== user_id) {
			return res
				.status(401)
				.json({ message: "You are not authorized to delete this like" });
		}
		await like.destroy();
		res.json({ message: "Like deleted successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
});

module.exports = router;
