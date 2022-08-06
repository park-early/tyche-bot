const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { request } = require('undici');
const embedColour = require('../enums/embedColour');

const data = new SlashCommandBuilder()
	.setName('cardinfo')
	.setDescription('Retrieves card information.')
	.addStringOption(option =>
		option.setName('id')
			.setDescription('Card ID')
			.setRequired(true),
	);

async function getJSONResponse(body) {
	let fullBody = '';

	for await (const requestData of body) {
		fullBody += requestData.toString();
	}

	return JSON.parse(fullBody);
}

// send a GET request and reply with an image of the card
async function execute(interaction) {
	const cardid = interaction.options.getString('id');
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
	interaction.reply({ embeds: [embed] });
}

module.exports = {
	data,
	execute,
};