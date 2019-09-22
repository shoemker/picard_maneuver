const SpaceObject = require("./space_object");

class Star extends SpaceObject {
	constructor(options){
		super(options.pos);

		this.radius = options.radius;
		this.hue = options.hue;
		this.sat = options.sat;
		this.canvas_width = options.canvas_width;
		this.canvas_height = options.canvas_height;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 360);
		ctx.fillStyle = "hsl(" + this.hue + ", " + this.sat + "%, 88%)";
		ctx.fill();
	}
	
	shift(direction, speed) {
		super.shift(direction, speed);

		if (this.pos[0] > this.canvas_width) this.pos[0] = 0;
		else if (this.pos[0] < 0) this.pos[0] = this.canvas_width;

		if (this.pos[1] > this.canvas_height) this.pos[1] = 0;
		else if (this.pos[1] < 0) this.pos[1] = this.canvas_height;
	};

}

module.exports = Star;