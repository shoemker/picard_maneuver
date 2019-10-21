const Shield = require("./shield");
const Utils = require("./utils");

// SSD is the ship's systems display in the corner of the screen
class SSD {
	constructor(options) {
		this.ssd_x = options.ssdPos[0];
		this.ssd_y = options.ssdPos[1];
		this.ssd_total_width = 70;
		this.ssd_total_height = 120;

		this.img_size = options.img_size;
		this.img_pos_offset = options.img_pos_offset;
		this.imgCoords = options.imgCoords;
		this.beamWeaponName = options.beamWeaponName;
		
		this.SSDimg = options.img;

		this.shields = [];
		this.raiseShields();
	};


	getShields() {
		return this.shields;
	};


	draw(ctx, phaserRechargePercent, torpedoReloadPercent, hullPercentage, target) {

		ctx.drawImage(this.SSDimg, this.imgCoords[0], this.imgCoords[1], this.imgCoords[2], this.imgCoords[3],
			this.ssd_x + this.img_pos_offset[0],
			this.ssd_y + this.img_pos_offset[1],
			this.img_size[0],
			this.img_size[1]);

		ctx.beginPath(); 
		
		this.drawShields(ctx);
		ctx.lineWidth = 3;

		// draw phaser recharge bar
		this.drawRechargeBar(ctx, this.ssd_x - 60, phaserRechargePercent);

		// draw torpedo reload
		this.drawRechargeBar(ctx, this.ssd_x + this.ssd_total_width + 50, torpedoReloadPercent);

		this.drawHullIntegrity(ctx, hullPercentage);

		this.drawLabels(ctx);

		if (target) Utils.drawTarget(ctx, this.ssd_x+35, this.ssd_y+160, 15,2);
	};


	drawShields(ctx) {
		this.shields.forEach((shield) => shield.draw(ctx))
	};


	drawRechargeBar(ctx, x, percentage) {
		let bar_height = this.ssd_total_height - 6;

		ctx.beginPath();
		ctx.rect(x, this.ssd_y, 10, this.ssd_total_height);
		ctx.strokeStyle = "grey";
		ctx.stroke();

		ctx.beginPath();
		if (percentage === 1) ctx.fillStyle = "green";
		else ctx.fillStyle = "grey";
		ctx.fillRect(x+3, this.ssd_y + 3 + bar_height*(1-percentage), 4, bar_height*percentage);
	};


	drawHullIntegrity(ctx, hullPercentage) {
		ctx.font = "18px Arial";
		if (hullPercentage >= .85) ctx.fillStyle = "#FAFAD2";
		else if (hullPercentage >= .35) ctx.fillStyle = "yellow";
		else ctx.fillStyle = "red";

		ctx.fillText("Hull Integrity: " + Math.floor(hullPercentage*100) + "%", this.ssd_x-43, this.ssd_y - 30);
	};


	drawLabels(ctx) {
		ctx.font = "18px Arial";
		ctx.fillStyle = "#FAFAD2";

		let x_coord;
		if (this.beamWeaponName === "Disruptor") x_coord = this.ssd_x - 93;
		else x_coord = this.ssd_x - 85;

		ctx.fillText(this.beamWeaponName, x_coord, this.ssd_y + 150);
		ctx.fillText("Recharge", this.ssd_x - 95, this.ssd_y + 175);

		ctx.fillText("Torpedo", this.ssd_x + this.ssd_total_width + 20, this.ssd_y + 150);
		ctx.fillText("Reload", this.ssd_x + this.ssd_total_width + 25, this.ssd_y + 175);
	};


	// factory method to create shield objects
	raiseShields() {
		const x = this.ssd_x + this.ssd_total_width / 2;
		const y = this.ssd_y + this.ssd_total_height / 2

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

}

module.exports = SSD;