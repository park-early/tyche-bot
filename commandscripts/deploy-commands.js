/**
 * Provide this script the commands you wish tyche-bot to have.
 * Be sure to update this file if changes are made to commands.
 * If changes are made, this script must be re-run.
 */
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('../config.json');

// define some commands and convert to JSON for the request body
const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

// PUT request sent to a defined URL with the ids as path variables and the commands in the request body
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Succesfully registered application commands'))
	.catch(console.error);