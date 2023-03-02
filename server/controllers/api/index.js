const router = require("express").Router();
const categoryRoutes = require("./category-routes");
const commentRoutes = require("./comment-routes");
const likeRoutes = require("./like-routes");
const messageRoutes = require("./message-routes");
const notificationRoutes = require("./notification-routes");
const postRoutes = require("./post-routes");
const tagRoutes = require("./tag-routes");
const userRoutes = require("./user-routes");

router.use("/categories", categoryRoutes);
router.use("/comments", commentRoutes);
router.use("/likes", likeRoutes);
router.use("/messages", messageRoutes);
router.use("/notifications", notificationRoutes);
router.use("/posts", postRoutes);
router.use("/tags", tagRoutes);
router.use("/users", userRoutes);

module.exports = router;
