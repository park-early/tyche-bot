// for now, the set count only includes pokemon cards (no supporters, energy, etc.)
const cardSet = new Map([
	['xy1', 114],
]);

// returns the number of cards in a set
function mapCardSet(set) {
	for (const setId of cardSet.keys()) {
		if (set == setId) return cardSet.get(setId);
	}
	throw 'Invalid Card Set';
}

module.exports = {
	mapCardSet,
};