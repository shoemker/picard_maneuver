const Shield = require("./shield");

// SSD is the ship's systems display in the corner of the screen
class SSD {
	constructor(options) {
		this.ssd_x = options.ssd_x;
		this.ssd_y = options.ssd_y;
		this.ssd_width = options.ssd_width;
		this.ssd_height = options.ssd_height;
		this.imgCoords = options.imgCoords;
		this.beamWeaponName = options.beamWeaponName;
		
		this.loadSSDImg(options.imgName);

		this.shields = [];
		this.raiseShields();
	}


	getShields() {
		return this.shields;
	}


	draw(ctx, phasorRechargePercent, torpedoReloadPercent) {


		ctx.drawImage(this.SSDimg, this.imgCoords[0], this.imgCoords[1], this.imgCoords[2], this.imgCoords[3],
			this.ssd_x,
			this.ssd_y,
			this.ssd_width,
			this.ssd_height);

		ctx.beginPath(); 
		
		this.drawShields(ctx);
		ctx.lineWidth = 3;

		// draw phasor recharge bar
		this.drawRechargeBar(ctx, this.ssd_x - 60, phasorRechargePercent);

		// draw torpedo reload
		this.drawRechargeBar(ctx, this.ssd_x + this.ssd_width + 50, torpedoReloadPercent);

		ctx.beginPath();
		ctx.font = "20px Arial";
		ctx.fillStyle = "white";

		let x_coord;
		if (this.beamWeaponName === "Disruptor") x_coord = this.ssd_x - 93;
		else x_coord = this.ssd_x - 88;

		ctx.fillText(this.beamWeaponName, x_coord, 700);
		ctx.fillText("Recharge", this.ssd_x - 95, 725);

		ctx.fillText("Torp", this.ssd_x+this.ssd_width + 35, 700);
		ctx.fillText("Reload", this.ssd_x + this.ssd_width + 25, 725);

	};


	drawShields(ctx) {
		this.shields.forEach((shield) => shield.draw(ctx))
	};


	drawRechargeBar(ctx, x, percentage) {
		let bar_height = this.ssd_height - 6;

		ctx.beginPath();
		ctx.rect(x, this.ssd_y, 10, this.ssd_height);
		ctx.strokeStyle = "grey";
		ctx.stroke();

		ctx.beginPath();
		if (percentage === 1) ctx.fillStyle = "green";
		else ctx.fillStyle = "grey";
		ctx.fillRect(x+3, this.ssd_y + 3 + bar_height*(1-percentage), 4, bar_height*percentage);
	}


	// factory method to create shield objects
	raiseShields() {
		const x = this.ssd_x + this.ssd_width / 2;
		const y = this.ssd_y + this.ssd_height / 2

		// forward shield
		this.shields.push(new Shield({
			pos: [x, y + 25],
			start: 1.4,
			end: 1.6,
			multiplier: .1
		}));

		// starboard shield
		this.shields.push(new Shield({
			pos: [x - 30, y + 5],
			start: 1.8,
			end: 2.2,
			multiplier: .2
		}));

		// rear shield
		this.shields.push(new Shield({
			pos: [x, y - 23],
			start: .4,
			end: .6,
			multiplier: .1,
		}));

		// port shield
		this.shields.push(new Shield({
			pos: [x + 30, y + 5],
			start: .8,
			end: 1.2,
			multiplier: .2
		}));
	};


	loadSSDImg(imgName) {
		this.SSDimg = new Image();
		this.SSDimg.onload = () => { return true; }
		this.SSDimg.src = imgName;
	};
}

module.exports = SSD;