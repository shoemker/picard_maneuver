class Shield {
	constructor(options) {
		this.pos = options.pos;
		this.start = options.start;
		this.end = options.end;
		this.multiplier = options.multiplier

		this.hitpoints = 100;
		this.color = "white";
		this.timer = 0;
	}

	draw(ctx) {
		let shieldPercentage = this.hitpoints / 100;
		// debugger
		ctx.beginPath();
		ctx.arc(this.pos[0], 
						this.pos[1], 
						100, 
						this.start * Math.PI + this.multiplier * Math.PI * (1 - shieldPercentage),
						this.end * Math.PI - this.multiplier * Math.PI * (1 - shieldPercentage));
	
		ctx.strokeStyle = this.color;
		ctx.stroke();
	}


}

module.exports = Shield;