const Ship = require("./ship");

class Cruiser extends Ship {
	constructor(options) {
		super(options);

		this.beamPattern = [];
		this.turnRadius = 4;
	}
}

module.exports = Cruiser;