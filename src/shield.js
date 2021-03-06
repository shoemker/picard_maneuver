class Shield {
	constructor(options) {
		this.pos = options.pos;
		this.start = options.start;
		this.end = options.end;
		this.radius = options.radius;

		this.maxHitpoints = options.shieldStrength;
		this.hitpoints = this.maxHitpoints;
		this.color = "#ADD8E6";
		this.timer = 0;
	}

	getHitpoints() { return this.hitpoints; }

	up() { return this.hitpoints > 0; }


	draw(ctx, scale) {
		this.timer++;
		if (this.timer === 40) {
			this.timer = 0;
			this.color = "#ADD8E6";
		}

		let shieldPercentage = this.hitpoints / this.maxHitpoints;

		ctx.beginPath();

		if (this.hitpoints > 0) { // have to do this check because of a mysterious bug when user would draw ship
			ctx.arc(this.pos[0], 
				this.pos[1], 
				this.radius, 
				this.start * Math.PI + (this.end - this.start)/2* Math.PI * (1 - shieldPercentage),
				this.end * Math.PI - (this.end - this.start)/2 * Math.PI * (1 - shieldPercentage)
			);
		
			ctx.lineWidth = 3 + 4*scale*this.maxHitpoints/100;
			ctx.strokeStyle = this.color;
			ctx.stroke();
		}
	}


	hit(damage) {
		this.timer = 1;
		this.color = "red";

		this.hitpoints -= damage;
		if (this.hitpoints < 0) this.hitpoints = 0;
	}
}

module.exports = Shield;