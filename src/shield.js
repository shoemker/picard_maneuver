class Shield {
	constructor(options) {
		this.pos = options.pos;
		this.start = options.start;
		this.end = options.end;
		this.multiplier = options.multiplier

		this.hitpoints = 100;
		this.color = "#ADD8E6";
		this.timer = 0;
	}

	getHitpoints() {
		return this.hitpoints;
	}

	draw(ctx) {
		this.timer++;
		if (this.timer === 20) {
			this.timer = 0;
			this.color = "#ADD8E6";
		}

		let shieldPercentage = this.hitpoints / 100;

		ctx.beginPath();
		ctx.arc(this.pos[0], 
						this.pos[1], 
						100, 
						this.start * Math.PI + this.multiplier * Math.PI * (1 - shieldPercentage),
						this.end * Math.PI - this.multiplier * Math.PI * (1 - shieldPercentage));
	
		ctx.lineWidth = 7;
		ctx.strokeStyle = this.color;
		ctx.stroke();
	}


	hit() {
		this.timer = 1;
		this.color = "red";

		this.hitpoints -= 20;
		if (this.hitpoints < 0) this.hitpoints = 0;
	}
}

module.exports = Shield;