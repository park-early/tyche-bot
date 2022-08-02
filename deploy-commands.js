/**
 * This script will look in the 'commands' folder for commands to add to tyche-bot.
 * If changes to 'commands' are made, this script must be re-run.
 */
const fs = require('node:fs');
const path = require('node:path');
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');


const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// iteratively adds the exported commands
// all commands will be exported with a data property that contains the information for the request body
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

// PUT request sent to a defined URL with the ids as path variables and the commands in the request body
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Succesfully registered application commands'))
	.catch(console.error);