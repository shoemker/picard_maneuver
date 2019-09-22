
class SpaceObject {
	constructor(pos) {
		this.pos = pos;
	}

	// shifts to account for main ship movement
	shift(direction, speed) {
		this.pos[0] -= speed * direction[0];
		this.pos[1] += speed * direction[1];
	};


}

module.exports = SpaceObject