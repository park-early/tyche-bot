const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getSetId } = require('../enums/cardSet');
const embedColour = require('../enums/embedColour');
const { paginationEmbed } = require('../pagination');
const pokemonTcgApi = require('pokemontcgsdk');

const data = new SlashCommandBuilder()
	.setName('openpack')
	.setDescription('Open a pack of cards!')
	.addStringOption(option =>
		option.setName('name')
			.setDescription('Name of the card set')
			.setRequired(true),
	);

// generate 10 random cards from the given set and bundle them into a pack
// pack will contain 6 commons, 3 uncommons, and 1 rare (in that order)
async function execute(interaction) {
	const setId = getSetId(interaction.options.getString('name'));
	const pages = [];

	// grab all the cards from the set (excluding energies)
	await interaction.deferReply();
	const commons = await pokemonTcgApi.card.all({ q: `set.id:${setId} rarity:common -supertype:energy` });
	const uncommons = await pokemonTcgApi.card.all({ q: `set.id:${setId} rarity:uncommon -supertype:energy` });
	const rares = await pokemonTcgApi.card.all({ q: `set.id:${setId} rarity:rare` });

	const cards = [];
	// grab random common card ids
	for (let i = 0; i < 6; i++) {
		cards.push(commons[(Math.floor(Math.random() * commons.length))]);
	}
	// grab random uncommon card ids
	for (let i = 0; i < 3; i++) {
		cards.push(uncommons[(Math.floor(Math.random() * uncommons.length))]);
	}
	// grab random rare card id
	cards.push(rares[(Math.floor(Math.random() * rares.length))]);

	// bundle cards into embeds
	cards.forEach(card => {
		const embed = new EmbedBuilder()
			.setTitle(`${card.name}`)
			.addFields(
				{ name: 'ID', value: card.id },
				{ name: 'Rarity', value: card.rarity },
			)
			.setImage((card.images).small)
			.setColor(embedColour.mapEmbedColour(card));
		pages.push(embed);
	});

	await paginationEmbed(interaction, pages, 1000 * 60 * 5);
}

module.exports = {
	data,
	execute,
};