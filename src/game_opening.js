
// a version of this came from http://codentronix.com/2011/07/22/html5-canvas-3d-starfield/
class GameOpening {

	constructor(canvas_width, canvas_height) {
		this.canvas_width = canvas_width;
		this.canvas_height = canvas_height;

		this.max_depth = 32;

		this.stars = new Array(512);

		this.createOpeningStarfield();
	};


	createOpeningStarfield() {
		for (let i = 0; i < this.stars.length; i++) {
			this.stars[i] = {
				x: this.randomRange(-32, 32),
				y: this.randomRange(-32, 32),
				z: this.randomRange(1, this.max_depth)
			};
		};
	};


	stepAndDraw(ctx) {
		const halfWidth = this.canvas_width / 2;
		const halfHeight = this.canvas_height / 2;

		ctx.fillStyle = "rgb(0,0,0)";
		ctx.fillRect(0, 0, this.canvas_width, this.canvas_height);

		this.stars.forEach((star) => {
			star.z -= 0.1;

			if (star.z <= 0) {
				star.x = this.randomRange(-32, 32);
				star.y = this.randomRange(-32, 32);
				star.z = this.max_depth;
			}

			const k = 128.0 / star.z;
			const px = star.x * k + halfWidth;
			const py = star.y * k + halfHeight;

			if (px >= 0 && px <= this.canvas_width && py >= 0 && py <= this.canvas_height) {
				const size = (1 - star.z / 32.0) * 5;
				const shade = parseInt((1 - star.z / 32.0) * 255);
				ctx.fillStyle = "rgb(" + shade + "," + shade + "," + shade + ")";
				ctx.fillRect(px, py, size, size);
			}
		});

		this.drawText(ctx);
	};


	randomRange(minVal, maxVal) {
		return Math.floor(Math.random() * (maxVal - minVal - 1)) + minVal;
	};


	drawText(ctx) {
		ctx.fillStyle = "lightblue";

		ctx.font = "108px FINALOLD";
		ctx.fillText("The Picard Maneuver", this.canvas_width / 2 - 355, this.canvas_height / 3);
		
		ctx.font = "54px FINALOLD";
		ctx.fillText("Click Here To Start", this.canvas_width / 2 - 160, this.canvas_height / 3+ 150);
	}

}

module.exports = GameOpening;