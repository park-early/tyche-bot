/**
 * Set the value of commandIds to the ids of the commands you wish to delete before running this script.
 */
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, token } = require('./config.json');
const rest = new REST({ version: '10' }).setToken(token);

const commandIds = [
	'1005559056846573698',
];

// DELETE request sent to a defined URL with ids as path variables (global commands)
for (const commandId of commandIds) {
	rest.delete(Routes.applicationCommand(clientId, commandId))
		.then(() => console.log(`Sucessfully deleted guild command with ID ${commandId}`))
		.catch(console.error);
}