const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const cardSet = require('../enums/cardSet');
const embedColour = require('../enums/embedColour');
const { paginationEmbed } = require('../pagination');
const pokemonTcgApi = require('pokemontcgsdk');

const data = new SlashCommandBuilder()
	.setName('openpack')
	.setDescription('Open a pack of cards!')
	.addStringOption(option =>
		option.setName('id')
			.setDescription('Card Set ID')
			.setRequired(true),
	);

// generate 10 random numbers from the range [1, number of cards in the set]
async function execute(interaction) {
	const setid = interaction.options.getString('id');
	const pages = [];
	for (let i = 0; i < 10; i++) {
		const cardid = setid + '-' + (Math.floor(Math.random() * cardSet.mapCardSet(setid)) + 1);
		const card = await pokemonTcgApi.card.find(cardid);
		const embed = new EmbedBuilder()
			.setTitle(`${card.name}`)
			.addFields(
				{ name: 'ID', value: card.id },
				{ name: 'Rarity', value: card.rarity },
			)
			.setImage((card.images).small)
			.setColor(embedColour.mapEmbedColour(card.types[0]));
		pages.push(embed);
	}

	await paginationEmbed(interaction, pages, 1000 * 60 * 5);
}

module.exports = {
	data,
	execute,
};