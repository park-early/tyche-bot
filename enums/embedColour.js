const embedColour = new Map([
	['Grass', 0x00FF00],
	['Fire', 0xFF0000],
	['Water', 0x0000FF],
	['Lightning', 0xFFFF00],
	['Dragon', 0xFFD700],
	['Fairy', 0xFFC0CB],
	['Darkness', 0x000000],
	['Colorless', 0xFFFFFF],
	['Metal', 0xC0C0C0],
	['Fighting', 0x964B00],
	['Psychic', 0x6A0DAD],
]);

// returns the hex code value corresponding to the card type, returns grey for trainer/supporter cards
function mapEmbedColour(card) {
	if (card.supertype == 'Trainer') return 0x808080;
	for (const embedColourType of embedColour.keys()) {
		if ((card.types)[0] == embedColourType) return embedColour.get(embedColourType);
	}
	throw 'Card type error';
}

module.exports = {
	mapEmbedColour,
};