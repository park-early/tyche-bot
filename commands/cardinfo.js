const { SlashCommandBuilder } = require('discord.js');
const { request } = require('undici');

const data = new SlashCommandBuilder()
	.setName('cardinfo')
	.setDescription('Retrieves card information.')
	.addStringOption((option) =>
		option
			.setName('id')
			.setDescription('Card id'),
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
	interaction.reply({ files: [((card.data).images).small] });
}

module.exports = {
	data,
	execute,
};