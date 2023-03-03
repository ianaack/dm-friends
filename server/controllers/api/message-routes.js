const router = require("express").Router();
const { Message, User } = require("../../models/");
const withAuth = require("../../utils/auth");

// GET all messages
router.get("/", withAuth, async (req, res) => {
	const userId = req.user.id;

	const messages = await Message.findAll({
		where: {
			[Op.or]: [{ senderId: userId }, { recipientId: userId }],
		},
		include: [
			{ model: User, as: "sender" },
			{ model: User, as: "recipient" },
		],
	});

	res.json(messages);
});

// CREATE a new message
router.post("/", withAuth, async (req, res) => {
	const { recipientId, body } = req.body;
	const senderId = req.user.id;

	const newMessage = await Message.create({
		senderId,
		recipientId,
		body,
	});

	res.json(newMessage);
});

module.exports = router;
