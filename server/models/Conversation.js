const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Conversation extends Model {}

Conversation.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		messages_id: {
			type: DataTypes.JSON, //This will be a JSON object that stores an array with the message id's.
			references: {
				model: "message",
				key: "id",
			},
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: "conversation",
	}
);

module.exports = Conversation;
