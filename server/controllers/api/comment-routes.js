const router = require("express").Router();
const { Comment, User } = require("../../models/");
const withAuth = require("../../utils/auth");

// GET all comments for a post
router.get("/post/:postId", withAuth, async (req, res) => {
	try {
		const comments = await Comment.findAll({
			where: { post_id: req.params.postId },
		});
		res.status(200).json({
			message: `Here are all the comments for Post id:${req.params.postId}`,
			comments,
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
});

// CREATE a new comment for a post
router.post("/post/:postId", withAuth, async (req, res) => {
	try {
		const comment = await Comment.create({
			...req.body,
			post_id: req.params.postId,
			user_id: req.session.userId,
		});
		res.status(200).json({ message: "Comment added successfully", comment });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
});

// UPDATE an existing comment
router.put("/post/:postId/:commentId", withAuth, async (req, res) => {
	try {
		const [affectedRows] = await Comment.update(req.body, {
			where: {
				id: req.params.commentId,
				post_id: req.params.postId,
				user_id: req.session.userId,
			},
		});
		if (affectedRows > 0) {
			res
				.status(200)
				.json({ affectedRows, message: "Comment updated successfully" })
				.end();
		} else {
			res.status(404).json({ message: "Comment not found" }).end();
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
});

// DELETE an existing comment
router.delete("/post/:postId/:commentId", withAuth, async (req, res) => {
	try {
		const affectedRows = await Comment.destroy({
			where: {
				id: req.params.commentId,
			},
		});

		if (affectedRows > 0) {
			res
				.status(200)
				.json({ affectedRows, message: "Comment deleted successfully" })
				.end();
		} else {
			res.status(404).json({ message: "Comment not found" }).end();
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server Error" });
	}
});

module.exports = router;
