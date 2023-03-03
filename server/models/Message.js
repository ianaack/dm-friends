const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Message extends Model {}

Message.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		sender_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "user",
				key: "id",
			},
		},
    recipient_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "user",
				key: "id",
			},
		}
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: "message",
	}
);

module.exports = Message;