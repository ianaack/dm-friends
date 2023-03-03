const router = require("express").Router();
const { Comment } = require("../../models/");
const withAuth = require("../../utils/auth");

// GET all comments for a post
router.get("/post/:postId", withAuth, async (req, res) => {
	const { postId } = req.params;
	const comments = await Comment.findAll({
		where: { postId },
	});
	res.json(comments);
});

// CREATE a new comment for a post
router.post("/post/:postId", withAuth, async (req, res) => {
	const { postId } = req.params;
	const { body } = req.body;
	const comment = await Comment.create({
		body,
		postId,
	});
	res.json(comment);
});

// UPDATE an existing comment
router.put("/:id", withAuth, async (req, res) => {
	const { id } = req.params;
	const { body } = req.body;
	const comment = await Comment.findByPk(id);
	if (!comment) {
		return res.status(404).json({ message: "Comment not found" });
	}
	comment.body = body;
	await comment.save();
	res.json(comment);
});

// DELETE an existing comment
router.delete("/:id", withAuth, async (req, res) => {
	const { id } = req.params;
	const comment = await Comment.findByPk(id);
	if (!comment) {
		return res.status(404).json({ message: "Comment not found" });
	}
	await comment.destroy();
	res.json({ message: "Comment deleted successfully" });
});

module.exports = router;
