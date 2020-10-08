class Fire {
	constructor(img) {
		this.imageSheet = img;

		this.trailCounter = 0;
		this.trailCountMax = 40;
		this.trailPoints = new Array(this.trailCountMax);

		this.width = 12;

		this.spriteIndex = 0;
		this.sheet = [
			[40,115],
			[147,115],
			[255,115],
			[361,115],
			[467,115],
			[40,208],
			[147,208],
			[255,208],
			[361,208],
			[467,208]
		];
	};


	getWidth() { return this.width; };

	draw(ctx, pos, shiftDir) {

		this.drawFlames(ctx, pos);

		// add current location (overwriting oldest) for trail in array implementing queue
		this.trailPoints[this.trailCounter] = 
			{ x: pos.x + this.width / 2, y: pos.y + this.width / 2 };

		let i = this.trailCounter + 6;
		if (i >= this.trailCountMax) i = i%this.trailCountMax;

		let count = 0;
		while (i !== this.trailCounter) {

			// shift all points to account for screen shifting that keeps main ship
			// in the center
			if (this.trailPoints[i]) {
				this.trailPoints[i].x -= shiftDir.x * shiftDir.speed;
				this.trailPoints[i].y += shiftDir.y * shiftDir.speed;

				ctx.beginPath(); 

				// lightness and radius trail off toward the end of the tail
				ctx.fillStyle = "hsl(0, 100%," + count / this.trailCountMax * 100 + "%)";
				ctx.arc(this.trailPoints[i].x, this.trailPoints[i].y, 
					2 * count / this.trailCountMax, 0, 2*Math.PI);

				ctx.fill();
			}
			count++;
			i++;
			if (i >= this.trailCountMax) i = i % this.trailCountMax;
		}

		this.trailCounter++;
		if (this.trailCounter === this.trailCountMax) this.trailCounter = 0;

	};

	
	// cycle through sprite sheet to draw flames
	drawFlames(ctx, pos) {
		ctx.drawImage(
			this.imageSheet,
			this.sheet[this.spriteIndex][0],
			this.sheet[this.spriteIndex][1],
			90, 90,
			pos.x, pos.y,
			this.width, this.width
		);

		this.spriteIndex++;
		if (this.spriteIndex === 10) this.spriteIndex = 0;
	}

};
module.exports = Fire;
