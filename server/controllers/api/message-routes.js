const router = require("express").Router();
const { Op } = require("sequelize");
const { Message, User } = require("../../models/");
const withAuth = require("../../utils/auth");

// GET all messages
router.get("/:id", withAuth, async (req, res) => {
	const sender_id = req.session.userId;
	const id = req.params.id;
	const recipient_id = User.findByPk(id);

	const messages = await Message.findAll({
		where: {
			[Op.or]: [{ sender_id: sender_id }, { recipient_id: recipient_id }],
		},
		include: [
			{ model: User, as: "sender" },
			{ model: User, as: "recipient" },
		],
	});

	res.status(200).json({
		message: `Here is the chat history between ${sender_id} and ${recipient_id}`,
		messages,
	});
});

// CREATE a new message
router.post("/", withAuth, async (req, res) => {
	const { recipient_id, content } = req.body;
	const sender_id = req.session.userId;

	const newMessage = await Message.create({
		content,
		sender_id,
		recipient_id,
	});

	res.json(newMessage);
});

module.exports = router;
