const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const embedColour = require('../enums/embedColour');
const pokemonTcgApi = require('pokemontcgsdk');

const data = new SlashCommandBuilder()
	.setName('cardinfo')
	.setDescription('Retrieves card information.')
	.addStringOption(option =>
		option.setName('id')
			.setDescription('Card ID')
			.setRequired(true),
	);

// send a GET request and reply with an image of the card
async function execute(interaction) {
	const cardid = interaction.options.getString('id');
	const card = await pokemonTcgApi.card.find(cardid);
	const embed = new EmbedBuilder()
		.setTitle(`${card.name}`)
		.addFields(
			{ name: 'ID', value: card.id },
			{ name: 'Rarity', value: card.rarity },
		)
		.setImage((card.images).small)
		.setColor(embedColour.mapEmbedColour(card.types[0]));
	await interaction.reply({ embeds: [embed] });
}

module.exports = {
	data,
	execute,
};