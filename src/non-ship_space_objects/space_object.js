const Utils = require("../utils");

class SpaceObject {
	constructor(pos) {
		if (pos) this.pos = pos;
		this.direction = {x:0,y:0};
		this.width;
		this.height;
	};


	move(base_speed_inverse) {
		this.pos[0] += (this.direction.x / base_speed_inverse) * this.speed;
		this.pos[1] -= (this.direction.y / base_speed_inverse) * this.speed;
	};


	// shifts to account for main ship movement
	shift(direction, speed) {
		this.pos[0] -= speed * direction[0];
		this.pos[1] += speed * direction[1];
	};


	onscreen() {
		const center = this.center();
		return (center[0] > 0 && center[0] < Utils.getCanvasDim().x &&
			center[1] > 0 && center[1] < Utils.getCanvasDim().y);
	};

	 
	center() {
		return [this.pos[0] + this.width / 2, this.pos[1] + this.height / 2];
	};

}

module.exports = SpaceObject