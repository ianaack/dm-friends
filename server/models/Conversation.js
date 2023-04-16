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
			type: DataTypes.INTEGER, // JSON is only available in postgres, had to convert to an integer
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
