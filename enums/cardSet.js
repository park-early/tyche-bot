// map the common name to the setid
const cardSet = new Map([
	['Base Set', 'base1'],
	['Jungle', 'base2'],
	['Fossil', 'base3'],
	['Team Rocket', 'base5'],
]);

// returns the set id
function getSetId(set) {
	for (const setName of cardSet.keys()) {
		if (set == setName) return cardSet.get(setName);
	}
	throw 'Card set name or id error';
}

module.exports = {
	getSetId,
};