class BackgroundObject {
	constructor(options){
		this.pos = options.pos;

		this.radius = options.radius;
		this.hue = options.hue;
		this.sat = options.sat;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 360);
		ctx.fillStyle = "hsl(" + this.hue + ", " + this.sat + "%, 88%)";
		ctx.fill();
	}

}

module.exports = BackgroundObject