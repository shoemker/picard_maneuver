class Fire {
	constructor(img) {
		this.imageSheet = img;

		this.trailCounter = 0;
		this.trailCountMax = 10;
		this.trailPoints = new Array(this.trailCountMax);


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

	draw(ctx, pos) {

		// ctx.beginPath();
		// ctx.fillStyle = '#ff0000';
		// ctx.moveTo(pos[0], pos[1]);
		// ctx.arc(pos[0], pos[1], 3, 0, Math.PI * 2, true);
		// ctx.fill();

		ctx.drawImage(
			this.imageSheet,
			this.sheet[this.spriteIndex][0],
			this.sheet[this.spriteIndex][1],
			90, 90,
			pos.x, pos.y,
			12, 12
		);

		this.spriteIndex++;
		if (this.spriteIndex === 10) this.spriteIndex = 0;

		// this.trailPoints[this.trailCounter] = pos;
		// let i = this.trailCounter + 1;
		// let count = 0;

		// while (i != this.trailCounter) {
		// 	if (i === this.trailCountMax) i = 0;

		// 	if (this.trailPoints[i]) {
		// 		ctx.fillStyle = "hsl(232, 100%," + count / this.trailCountMax * 100 + "%)";
		// 		ctx.arc(this.trailPoints[i].x, this.trailPoints[i].y, 2, 0, 2*Math.PI);
	
		// 	}
		// 	count++;
		// 	i++;
		// }

		// this.trailCounter++;

	};

};
module.exports = Fire;
