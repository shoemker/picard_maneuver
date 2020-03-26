const OrbitingObject = require("./orbiting_object");

const Utils = require("../utils");

class Sun extends OrbitingObject{
	constructor(options) {
		super(options);
		this.gradientColor = options.gradientColor;
	};


	draw(ctx, tilt) {

		const gradient = ctx.createRadialGradient(
			this.pos.x, this.pos.y, this.radius / 4,
			this.pos.x, this.pos.y, this.radius);
		// debugger
		gradient.addColorStop(0, this.gradientColor);
		gradient.addColorStop(1, "transparent");

		this.color = gradient;
		super.draw(ctx, tilt);
	};


}

module.exports = Sun;