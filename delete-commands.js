/**
 * Set the value of commandIds to the ids of the commands you wish to delete before running this script.
 */
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');
const rest = new REST({ version: '10' }).setToken(token);

const commandIds = [
	'1003918237047734282',
	'1003902224927313990',
	'1003833870174654568',
];

// DELETE request sent to a defined URL with ids as path variables (global commands)
for (const commandId of commandIds) {
	rest.delete(Routes.applicationCommand(clientId, guildId, commandId))
		.then(() => console.log(`Sucessfully deleted guild command with ID ${commandId}`))
		.catch(console.error);
}