/**
 * Set the value of commandId to the id of the command you wish to delete before running this script.
 */
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');
const rest = new REST({ version: '10' }).setToken(token);

const commandId = '1003833870174654570';

// DELETE request sent to a defined URL with ids as path variables
rest.delete(Routes.applicationGuildCommand(clientId, guildId, commandId))
	.then(() => console.log('Sucessfully deleted guild command'))
	.catch(console.error);