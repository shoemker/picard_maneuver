
// a version of this came from http://codentronix.com/2011/07/22/html5-canvas-3d-starfield/
class GameOpening {

	constructor(canvas_width, canvas_height) {
		this.canvas_width = canvas_width;
		this.canvas_height = canvas_height;

		this.max_depth = 32;

		this.stars = new Array(512);

		this.initStars();
	}

	initStars() {
		for (var i = 0; i < this.stars.length; i++) {
			this.stars[i] = {
				x: this.randomRange(-32, 32),
				y: this.randomRange(-32, 32),
				z: this.randomRange(1, this.max_depth)
			}
		}
	}

	stepAndDraw(ctx) {
		var halfWidth = this.canvas_width / 2;
		var halfHeight = this.canvas_height / 2;

		ctx.fillStyle = "rgb(0,0,0)";
		ctx.fillRect(0, 0, this.canvas_width, this.canvas_height);

		for (var i = 0; i < this.stars.length; i++) {
			this.stars[i].z -= 0.1;

			if (this.stars[i].z <= 0) {
				this.stars[i].x = this.randomRange(-32, 32);
				this.stars[i].y = this.randomRange(-32, 32);
				this.stars[i].z = this.max_depth;
			}

			var k = 128.0 / this.stars[i].z;
			var px = this.stars[i].x * k + halfWidth;
			var py = this.stars[i].y * k + halfHeight;

			if (px >= 0 && px <= this.canvas_width && py >= 0 && py <= this.canvas_height) {
				var size = (1 - this.stars[i].z / 32.0) * 5;
				var shade = parseInt((1 - this.stars[i].z / 32.0) * 255);
				ctx.fillStyle = "rgb(" + shade + "," + shade + "," + shade + ")";
				ctx.fillRect(px, py, size, size);
			}
		}
	}

	randomRange(minVal, maxVal) {
		return Math.floor(Math.random() * (maxVal - minVal - 1)) + minVal;
	}
}

module.exports = GameOpening;