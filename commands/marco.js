const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
	.setName('marco')
	.setDescription('Replies with Polo!');

async function execute(interaction) {
	await interaction.reply('Polo!');
}

module.exports = {
	data,
	execute,
};