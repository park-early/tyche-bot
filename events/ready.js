const { t_collection } = require('../database.js');
const name = 'ready';
const once = 'true';

function execute(client) {
	t_collection.sync();
	console.log(`Ready! Logged in as ${client.user.tag}`);
}

module.exports = {
	name,
	once,
	execute,
};