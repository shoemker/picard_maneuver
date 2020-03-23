const Utils = require("./utils");
const SolarSystem = require("./solarSystem/solar_system");
const SSData1 = require("./solarSystem/ss_data1");

class GameOpening {

	constructor(ctx) {
		this.canvas_width = Utils.getCanvasDim().x;
		this.canvas_height = Utils.getCanvasDim().y;
		this.shipChoice = true;
		this.scenario = false;
		this.userDraw = null;
		this.max_depth = 32;

		this.centerOfSS = { x: Utils.getCanvasDim().x / 2, y: 170 };
		this.ss = new SolarSystem(.294, this.centerOfSS);
		SSData1.addDataToSS(ctx, this.ss);

		this.stars = new Array(512);

		this.createOpeningStarfield();

		// this.logoImg = Utils.loadImg('./images/st-logo.png');

		this.sillyImg = Utils.loadImg('./images/sillyDrawing.png');
		this.enterImg = Utils.loadImg('./images/uss-enterprise-png-choice.png');

		this.bopScenImg = Utils.loadImg('./images/scenarios/bops_scenario.png');
		this.d7ScenImg = Utils.loadImg('./images/scenarios/D7_scenario.png');
		this.fleetScenImg = Utils.loadImg('./images/scenarios/fleet_scenario.png');
	};

	setUserDraw(ud) { this.userDraw = ud; }
	getUserDraw() { return this.userDraw; }

	getShipChoice() { return this.shipChoice; }
	setShipChoice(choice) { this.shipChoice = choice; }

	getScenario() { return this.scenario; }
	setScenario(scen) { this.scenario = scen; }

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

		ctx.clearRect(0, 0, Utils.getCanvasDim().x, Utils.getCanvasDim().y);
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.fillRect(0, 0, this.canvas_width, this.canvas_height);

		if (this.scenario) {
			// ctx.drawImage(this.logoImg, 60, 0, 450, 512, 294, 25, 700, 850);
			this.ss.step();
			this.ss.draw(ctx);
			this.drawScenario(ctx);
		} 
		else {
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
		}

		if (this.shipChoice) this.drawShipChoice(ctx);
		else if (this.getUserDraw()) this.userDraw.draw();
	};


	randomRange(minVal, maxVal) {
		return Math.floor(Math.random() * (maxVal - minVal - 1)) + minVal;
	};


	drawScenario(ctx) {

		ctx.drawImage(this.d7ScenImg, 0, 0, 350, 350,  37, 450,  350, 350);
		ctx.drawImage(this.bopScenImg, 0, 0, 350, 350, 424, 450, 350, 350);
		ctx.drawImage(this.fleetScenImg, 0, 0, 350, 350, 813, 450, 350, 350);

		ctx.beginPath();

		ctx.rect(37, 450, 350, 350);
		ctx.rect(424, 450, 350, 350);
		ctx.rect(813, 450, 350, 350);

		ctx.lineWidth = 3;
		ctx.stroke();

		ctx.fillStyle = "lightblue";
		ctx.font = "80px FINALOLD";
		ctx.fillText("Now Click a Scenario Below", 250, 400);

		ctx.font = "44px FINALOLD";
		ctx.fillText("Fight a Cruiser", 110, 865);
		ctx.fillText("2 Smaller Birds of Prey", 428, 865);
		ctx.fillText("or in a Fleet Action", 850, 865);
	};


	drawShipChoice(ctx) {
		const y = 540;
		const x1 = 130;
		const x2 = 780;

		ctx.fillStyle = "lightblue";

		ctx.font = "132px FINALOLD";
		ctx.fillText("The Picard Maneuver", 
			this.canvas_width / 2 - 435, 
			this.canvas_height /3-30);

		ctx.font = "72px FINALOLD";
		ctx.fillText("A Tactical Starship Combat Game", 
			this.canvas_width / 2 - 380, 
			this.canvas_height / 3+ 50);

		ctx.fillStyle = "#FAFAD2";

		ctx.font = "54px FINALOLD"; 
		ctx.fillText("Play as This Ship", x1, y);
		ctx.fillText("Doodle Your Own Ship", x2-40, y);


		ctx.fillText("Click Here!", x1+50, y + 240);
		ctx.fillText("Click Here!", x2+60 , y + 240);

		ctx.fillStyle = "lightblue";
		ctx.font = "72px FINALOLD";
		ctx.fillText("OR", 570, y+135);

		ctx.drawImage(this.enterImg, 22, 0, 660, 300, x1, y + 28, 300, 150);
		ctx.drawImage(this.sillyImg, 0, 50, 490, 350, x2, y+2, 300, 200);
	}
}

module.exports = GameOpening;