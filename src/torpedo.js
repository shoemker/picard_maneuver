const SpaceObject = require("./space_object");

class Torpedo extends SpaceObject {
	constructor(pos,direction) {
		super(pos);
		this.direction = direction;
		this.speed = 4;
	}

	move() {
		this.pos[0] += this.speed * this.direction[0];
		this.pos[1] -= this.speed * this.direction[1];
	};

}

module.exports = Torpedo;