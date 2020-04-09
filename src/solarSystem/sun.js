const OrbitingObject = require("./orbiting_object");

class Sun extends OrbitingObject{
	constructor(options) {
		super(options);
		this.gradientColor = options.gradientColor;
		// this.lastPos;
	};

	// getLastPos() { return this.lastPositon; };

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

	// move(i) {
		// if (i != 0) super.move(true);
		// else {
		// 	this.lastPos = this.pos;
			// super.move();
		// }
	// }

}

module.exports = Sun;