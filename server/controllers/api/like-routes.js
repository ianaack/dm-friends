const router = require("express").Router();
const { Like } = require("../../models/");
const withAuth = require("../../utils/auth");

// CREATE a new like
router.post("/", withAuth, async (req, res) => {
	const { postId } = req.body;
	const userId = req.user.id;

	const like = await Like.findOne({
		where: { postId, userId },
	});

	if (like) {
		return res.status(400).json({ message: "You already liked this post" });
	}

	const newLike = await Like.create({
		userId,
		postId,
	});

	res.json(newLike);
});

// DELETE a like
router.delete("/:id", withAuth, async (req, res) => {
	const { id } = req.params;
	const userId = req.user.id;

	const like = await Like.findByPk(id);

	if (!like) {
		return res.status(404).json({ message: "Like not found" });
	}

	if (like.userId !== userId) {
		return res
			.status(401)
			.json({ message: "You are not authorized to delete this like" });
	}

	await like.destroy();

	res.json({ message: "Like deleted successfully" });
});

module.exports = router;
