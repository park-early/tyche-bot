const embedColour = new Map([
	['Grass', 0x00FF00],
	['Fire', 0xFF0000],
]);

// returns the hex code value corresponding to the card type
function mapEmbedColour(type) {
	for (const embedColourType of embedColour.keys()) {
		if (type == embedColourType) return embedColour.get(embedColourType);
	}
	return 0x000000;
}

module.exports = {
	mapEmbedColour,
};