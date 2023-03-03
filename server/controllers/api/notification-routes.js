const router = require("express").Router();
const { Notification } = require("../../models/");
const withAuth = require("../../utils/auth");

// GET all notifications for the authenticated user
router.get("/", withAuth, async (req, res) => {
	const userId = req.user.id;

	const notifications = await Notification.findAll({
		where: { recipientId: userId },
		order: [["createdAt", "DESC"]],
	});

	res.json(notifications);
});

// CREATE a new notification
router.post("/", async (req, res) => {
	const { recipientId, message } = req.body;

	const newNotification = await Notification.create({
		recipientId,
		message,
	});

	res.json(newNotification);
});

// UPDATE a notification as read
router.put("/:id", withAuth, async (req, res) => {
	const notificationId = req.params.id;
	const userId = req.user.id;

	const notification = await Notification.findOne({
		where: { id: notificationId, recipientId: userId },
	});

	if (!notification) {
		return res.status(404).json({ message: "Notification not found." });
	}

	notification.read = true;
	await notification.save();

	res.json(notification);
});

// DELETE a notification
router.delete("/:id", withAuth, async (req, res) => {
	const notificationId = req.params.id;
	const userId = req.user.id;

	const notification = await Notification.findOne({
		where: { id: notificationId, recipientId: userId },
	});

	if (!notification) {
		return res.status(404).json({ message: "Notification not found." });
	}

	await notification.destroy();

	res.json({ message: "Notification deleted successfully." });
});

module.exports = router;
