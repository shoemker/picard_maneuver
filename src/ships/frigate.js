const Ship = require("./ship");
const Utils = require("../utils");

class Frigate extends Ship {
	constructor(options) {
		super(options);

		this.beamPattern = [3, 5, 3, 20];
		this.turnRadius = 3;
	};
	

	// frigate can only fire beams if target is in front
	firePhasers() {
		const angle = Utils.angleToOtherShip(this, this.target)
		if ((angle > (2 * Math.PI - Math.PI / 9)) || (angle < Math.PI / 9)) super.firePhasers();
	};
}

module.exports = Frigate;