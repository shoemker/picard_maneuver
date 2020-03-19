const SpaceObject = require("./space_object");
const Utils = require("../utils");

class Star extends SpaceObject {
	constructor(options){
		super(options.pos);

		this.radius = options.radius;
		this.hue = options.hue;
		this.sat = options.sat;
	};


	draw(ctx) {
		const fillStyle = "hsl(" + this.hue + ", " + this.sat + "%, 88%)";
		Utils.drawFilledCircle(ctx, this.pos[0], this.pos[1], this.radius, fillStyle);
	};
	
	
	shift(direction, speed) {
		super.shift(direction, speed);

		if (this.pos[0] > Utils.getCanvasDim().x) this.pos[0] = 0;
		else if (this.pos[0] < 0) this.pos[0] = Utils.getCanvasDim().x;

		if (this.pos[1] > Utils.getCanvasDim().y) this.pos[1] = 0;
		else if (this.pos[1] < 0) this.pos[1] = Utils.getCanvasDim().y;
	};

}

module.exports = Star;