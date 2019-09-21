class Star {
	constructor(options){
		this.pos = options.pos;

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
	
	shift(direction, vel) {
		this.pos[0] -= vel * direction[0];
		this.pos[1] += vel * direction[1];

		if (this.pos[0] > this.canvas_width) this.pos[0] = 0;
		else if (this.pos[0] < 0) this.pos[0] = this.canvas_width;

		if (this.pos[1] > this.canvas_height) this.pos[1] = 0;
		else if (this.pos[1] < 0) this.pos[1] = this.canvas_height;
	};

}

module.exports = Star