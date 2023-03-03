const router = require("express").Router();
const { Post, Tag } = require("../../models/");
const withAuth = require("../../utils/auth");

// GET all tags associated with a post
router.get("/posts/:postId/tags", async (req, res) => {
	const postId = req.params.postId;

	const post = await Post.findByPk(postId);
	if (!post) {
		return res.status(404).json({ message: "Post not found." });
	}

	const tags = await Tag.findAll({
		where: { postId },
	});

	res.json(tags);
});

// CREATE a new tag on a post
router.post("/posts/:postId/tags", withAuth, async (req, res) => {
	const postId = req.params.postId;
	const { name } = req.body;

	const post = await Post.findByPk(postId);
	if (!post) {
		return res.status(404).json({ message: "Post not found." });
	}

	const tag = await Tag.create({
		name,
		postId,
	});

	res.json(tag);
});

// UPDATE a tag associated with a post
router.put("/posts/:postId/tags/:tagId", withAuth, async (req, res) => {
	const postId = req.params.postId;
	const tagId = req.params.tagId;
	const { name, description } = req.body;

	const post = await Post.findByPk(postId);
	if (!post) {
		return res.status(404).json({ message: "Post not found." });
	}

	const tag = await Tag.findOne({
		where: { id: tagId, postId },
	});
	if (!tag) {
		return res.status(404).json({ message: "Tag not found." });
	}

	tag.name = name || tag.name;
	await tag.save();

	res.json(tag);
});

// DELETE a tag associated with a post
router.delete("/posts/:postId/tags/:tagId", withAuth, async (req, res) => {
	const postId = req.params.postId;
	const tagId = req.params.tagId;

	const post = await Post.findByPk(postId);
	if (!post) {
		return res.status(404).json({ message: "Post not found." });
	}

	const tag = await Tag.findOne({
		where: { id: tagId, postId },
	});
	if (!tag) {
		return res.status(404).json({ message: "Tag not found." });
	}

	await tag.destroy();

	res.json({ message: "Tag deleted successfully." });
});

module.exports = router;
