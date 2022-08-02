const name = 'interactionCreate';

async function execute(interaction) {
	console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	// return if the command does not exist
	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
}

module.exports = {
	name,
	execute,
};