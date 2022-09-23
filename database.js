const { Sequelize, DataTypes } = require('sequelize');

// initialize database
const sequelize = new Sequelize('databse', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	storage: 'database.sqlite',
});

const t_collection = sequelize.define('collections', {
	userid: DataTypes.BIGINT,
	cardid: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = {
	t_collection,
};