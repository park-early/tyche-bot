const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { t_collection } = require('../database.js');

const data = new SlashCommandBuilder()
	.setName('collection')
	.setDescription('Check out your collected cards!');

// find all cards belonging to that user, display them in an embed
async function execute(interaction) {
	const collection = await t_collection.findAll({
		where: {
			userid: interaction.user.id,
		},
		limit: 10,
	});
	let inventory = '';
	collection.forEach(row => {
		inventory = inventory.concat(row.cardid + '\n');
	});
	if (inventory === '') inventory = 'You have no cards!';
	const embed = new EmbedBuilder()
		.setTitle('Your Collection')
		.setDescription(inventory);
	await interaction.reply({ embeds: [embed] });
}

module.exports = {
	data,
	execute,
};