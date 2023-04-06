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

// Model Associations
// User - Post
User.hasMany(Post, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
});

Post.belongsTo(User, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
});

// Post - Comment
Post.hasMany(Comment, {
	foreignKey: "post_id",
	onDelete: "CASCADE",
});

Comment.belongsTo(User, {
	foreignKey: "user_id",
	onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
	foreignKey: "post_id",
	onDelete: "CASCADE",
});

// User - Like - Post
User.belongsToMany(Post, {
	through: Like,
	foreignKey: "user_id",
});

Post.belongsToMany(User, {
	through: Like,
	foreignKey: "post_id",
});

// Post - PostTag - Tag
Post.belongsToMany(Tag, {
	through: PostTag,
	foreignKey: "post_id",
});

Tag.belongsToMany(Post, {
	through: PostTag,
	foreignKey: "tag_id",
});

// Category - Post
Category.hasMany(Post, {
	foreignKey: "category_id",
});

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
