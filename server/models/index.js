// import models
const Category = require("./Category");
const Comment = require("./Comment");
const Like = require("./Like");
const Message = require("./Message");
const Notification = require("./Notification");
const Post = require("./Post");
const PostTag = require("./PostTag");
const Tag = require("./Tag");
const User = require("./User");

// Create Associations after building models
User.hasMany(Post);

Post.belongsTo(User, {
	foreignKey: "user_id",
});

Post.hasMany(Comment);

Comment.belongsTo(Post, {
	foreignKey: "post_id",
});

User.belongsToMany(Post, {
	through: Like,
	foreignKey: "user_id",
});

Post.belongsToMany(User, {
	through: Like,
	foreignKey: "post_id",
});

Post.belongsToMany(Tag, {
	through: PostTag,
	foreignKey: "post_id",
});

Tag.belongsToMany(Post, {
	through: PostTag,
	foreignKey: "tag_id",
});

Category.hasMany(Post);

Post.belongsTo(Category, {
	foreignKey: "category_id",
});

module.exports = {
	Category,
	Comment,
	Like,
	Message,
	Notification,
	Post,
	PostTag,
	Tag,
	User,
};
