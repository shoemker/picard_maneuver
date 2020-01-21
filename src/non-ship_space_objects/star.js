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
		ctx.beginPath();
		ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 360);
		ctx.fillStyle = "hsl(" + this.hue + ", " + this.sat + "%, 88%)";
		ctx.fill();
	};
	
	shift(direction, speed) {
		super.shift(direction, speed);

		if (this.pos[0] > Utils.getCanvasDim()[0]) this.pos[0] = 0;
		else if (this.pos[0] < 0) this.pos[0] = Utils.getCanvasDim()[0];

		if (this.pos[1] > Utils.getCanvasDim()[1]) this.pos[1] = 0;
		else if (this.pos[1] < 0) this.pos[1] = Utils.getCanvasDim()[1];
	};

}

module.exports = Star;