const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const paginationEmbed = async (interaction, pages, timeout = 1000 * 60) => {
	if (!interaction && !interaction.channel) throw new Error('Channel is inaccessible.');
	if (!pages) throw new Error('Pages are not given.');
	let page = 0;

	await interaction.editReply({ embeds: [pages[page]], components: [getButtons(page)] });

	const filter = user => !user.bot;
	const collector = interaction.channel.createMessageComponentCollector({ filter, time: timeout });
	collector.on('collect', async buttonInteraction => {
		if (!buttonInteraction.isButton()) return;
		await buttonInteraction.deferUpdate();
		if (buttonInteraction.customId === 'prev' && page > 0) {
			page--;
		}
		else if (buttonInteraction.customId === 'next' && page < 10) {
			page++;
		}
		await buttonInteraction.editReply({ embeds: [pages[page]], components: [getButtons(page)] });
	});
};

const getButtons = page => {
	const row = new ActionRowBuilder()
		.addComponents([
			new ButtonBuilder()
				.setCustomId('prev')
				.setLabel('Prev')
				.setStyle(ButtonStyle.Primary)
				.setDisabled(page === 0),
			new ButtonBuilder()
				.setCustomId('next')
				.setLabel('Next')
				.setStyle(ButtonStyle.Primary)
				.setDisabled(page === 9),
		]);
	return row;
};

module.exports = {
	paginationEmbed,
};