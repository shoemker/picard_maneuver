const Utils = require("./utils");

class GameOpening {

	constructor(canvas_width, canvas_height) {
		this.canvas_width = canvas_width;
		this.canvas_height = canvas_height;
		this.choose = false;

		this.max_depth = 32;

		this.stars = new Array(512);

		this.createOpeningStarfield();

		this.bopScenImg = Utils.loadImg('./images/bops_scenario.png');
		this.d7ScenImg = Utils.loadImg('./images/D7_scenario.png');
	};

	getChoose() { return this.choose; }
	setChoose() { this.choose = true; }

	// a version of the starfield came from http://codentronix.com/2011/07/22/html5-canvas-3d-starfield/
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

		if (!this.choose) this.drawText(ctx);
		else this.drawScenario(ctx);
	};


	randomRange(minVal, maxVal) {
		return Math.floor(Math.random() * (maxVal - minVal - 1)) + minVal;
	};


	drawScenario(ctx) {
		ctx.drawImage(this.d7ScenImg, 0, 0, 350, 350,  150, 300,  350, 350);
		ctx.drawImage(this.bopScenImg, 0, 0, 350, 350,  700, 300,  350, 350);

		ctx.beginPath();
		ctx.rect(150, 300, 350, 350);
		ctx.strokeStyle = "grey";
		ctx.lineWidth = 3;
		ctx.stroke();

		ctx.beginPath();
		ctx.rect(700, 300, 350, 350);
		ctx.strokeStyle = "grey";
		ctx.lineWidth = 3;
		ctx.stroke();

		ctx.fillStyle = "lightblue";
		ctx.font = "72px FINALOLD";
		ctx.fillText("Click a Scenario", this.canvas_width / 2 - 190, 200);

		ctx.font = "48px FINALOLD";
		ctx.fillText("Fight a Cruiser", 215, 715);
		ctx.fillText("Or 2 Smaller Birds of Prey", 670, 715);

	};


	drawText(ctx) {
		ctx.fillStyle = "lightblue";

		ctx.font = "108px FINALOLD";
		ctx.fillText("The Picard Maneuver", this.canvas_width / 2 - 365, this.canvas_height / 3);

		ctx.font = "72px FINALOLD";
		ctx.fillText("A Tactical Starship Combat Game", this.canvas_width / 2 - 380, this.canvas_height / 3+ 80);

		ctx.fillStyle = "white";
		ctx.font = "54px FINALOLD"; 
		ctx.fillText("Click Here To Start", this.canvas_width / 2 - 170, this.canvas_height / 3+ 200);
	}

}

module.exports = GameOpening;