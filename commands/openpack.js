const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');
const cardSet = require('../enums/cardSet');
const embedColour = require('../enums/embedColour');
const { paginationEmbed } = require('../pagination');

const data = new SlashCommandBuilder()
	.setName('openpack')
	.setDescription('Open a pack of cards!')
	.addStringOption(option =>
		option.setName('id')
			.setDescription('Card Set ID')
			.setRequired(true),
	);

async function getJSONResponse(body) {
	let fullBody = '';

	for await (const requestData of body) {
		fullBody += requestData.toString();
	}

	return JSON.parse(fullBody);
}

// generate 10 random numbers from the range [1, number of cards in the set]
async function execute(interaction) {
	const setid = interaction.options.getString('id');
	const pages = [];
	for (let i = 0; i < 10; i++) {
		const cardid = setid + '-' + (Math.floor(Math.random() * cardSet.mapCardSet(setid)) + 1);
		const response = await request(`https://api.pokemontcg.io/v2/cards/${cardid}`);
		const card = await getJSONResponse(response.body);
		const embed = new EmbedBuilder()
			.setTitle(`${(card.data).name}`)
			.addFields(
				{ name: 'ID', value: (card.data).id },
				{ name: 'Rarity', value: (card.data).rarity },
			)
			.setImage(((card.data).images).small)
			.setColor(embedColour.mapEmbedColour((card.data).types[0]));
		pages.push(embed);
		// interaction.channel.send({ embeds: [embed] });
	}

	await paginationEmbed(interaction, pages, 1000 * 60 * 5);
}

module.exports = {
	data,
	execute,
};