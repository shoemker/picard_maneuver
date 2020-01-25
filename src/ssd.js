const Shield = require("./shield");
const Utils = require("./utils");

// SSD is the ship's systems display in the corner of the screen
class SSD {
	constructor(options) {
		this.ssd_x = options.ssdPos[0];
		this.ssd_y = options.ssdPos[1];
		this.scale = options.ssdPos[2];
		this.labels = options.ssdPos[3];
		
		this.ssd_total_width = 70 * this.scale;
		this.ssd_total_height = 120 * this.scale;

		this.img_pos_offset = options.img_pos_offset;
		this.img_size_x = options.img_size[0] * this.scale;
		this.img_size_y = options.img_size[1] * this.scale;
		this.img_pos_x = this.ssd_x + this.img_pos_offset[0] * this.scale;
		this.img_pos_y = this.ssd_y + this.img_pos_offset[1];

		this.imgCoords = options.imgCoords;
		this.beamWeaponName = options.beamWeaponName;
		this.shieldStrength = options.shieldStrength;
		this.SSDimg = options.img;

		this.setUpVirtualCanvas();

		this.shields = [];
		this.raiseShields();
	};


	getShields() { return this.shields; };
	setLabels(val) { this.labels = val; };


	// draw original image on virtual canvas and call captureImage to get the data
	setUpVirtualCanvas() {
		this.virtualCanvas = document.createElement('canvas');
		this.virtualCanvas.width = this.img_size_x;
		this.virtualCanvas.height = this.img_size_y;
		this.virtualCtx = this.virtualCanvas.getContext('2d');

		this.virtualCtx.drawImage(this.SSDimg, this.imgCoords[0], this.imgCoords[1], this.imgCoords[2], this.imgCoords[3],
			0, 0, this.img_size_x, this.img_size_y);

		this.captureImage();
	}

	// this function gets the ssd imageData from the virtual canvas after it's drawn
	// it then sets the black pixels to transparent
	captureImage() {
		this.imgData = this.virtualCtx.getImageData(0, 0, this.img_size_x, this.img_size_y);

		// // sets the black pixels to transparent
		// for (let index = 0; index < this.imgData.data.length; index += 4) {
		// 	if (this.imgData.data[index] === 0) this.imgData.data[index + 3] = 0;		
		// }

		this.updateImg(1);
	};


	// updates the image data, making pixels red with current hull %
	// then puts image data on a canvas which is then turned into an image.
	// Called once from captureImage() and then called from takeDamage() in ship class
	updateImg(hullPercentage){
		const start = Math.floor(this.imgData.data.length * hullPercentage / 4.0) * 4;
		for (let index = start; index < this.imgData.data.length; index += 4) {
			// if (this.imgData.data[index] === 153) break;
			if (this.imgData.data[index] !== 0) {
				this.imgData.data[index] = 250;
				this.imgData.data[index + 1] = 0;
				this.imgData.data[index + 2] = 0;
			}			
		}
		this.virtualCtx.putImageData(this.imgData, 0, 0);
		this.updatedImg = new Image();
		this.updatedImg.src = this.virtualCanvas.toDataURL();
	};


	draw(ctx, phaserRechargePercent, torpedoReloadPercent, hullPercentage, target) {

		ctx.drawImage(this.updatedImg, this.img_pos_x, this.img_pos_y);		
		
		ctx.beginPath(); 
		
		this.drawShields(ctx);
		ctx.lineWidth = 3;

		// draw phaser recharge bar
		this.drawRechargeBar(ctx, this.ssd_x - 60, phaserRechargePercent);

		// draw torpedo reload
		this.drawRechargeBar(ctx, this.ssd_x + this.ssd_total_width + 50, torpedoReloadPercent);

		this.drawHullIntegrity(ctx, hullPercentage);

		if(this.labels) this.drawLabels(ctx);

		if (target) Utils.drawTarget(ctx, this.ssd_x - 30 + 0 * this.scale, 
			this.ssd_y +10 - 20 * this.scale, 15 * this.scale, 2);
	};


	drawShields(ctx) {
		this.shields.forEach((shield) => shield.draw(ctx, this.scale))
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

		ctx.fillText("Hull Integrity: " + Math.floor(hullPercentage*100) + "%", 
			this.ssd_x-43-30*(1-this.scale), this.ssd_y - 30*this.scale);
	};


	drawLabels(ctx) {
		ctx.font = "18px Arial";
		ctx.fillStyle = "#FAFAD2";

		let x_coord;
		if (this.beamWeaponName === "Disruptor") x_coord = this.ssd_x - 93;
		else x_coord = this.ssd_x - 85;

		const y_coord = this.ssd_y;

		ctx.fillText(this.beamWeaponName, x_coord, y_coord + 150 * this.scale);
		ctx.fillText("Recharge", this.ssd_x - 95, y_coord + 15 + 160 * this.scale);

		ctx.fillText("Torpedo", this.ssd_x + this.ssd_total_width + 20, y_coord + 150 * this.scale);
		ctx.fillText("Reload", this.ssd_x + this.ssd_total_width + 25, y_coord + 15 + 160 * this.scale);
	};


	// factory method to create shield objects
	raiseShields() {
		const x = this.ssd_x + this.ssd_total_width / 2;
		const y = this.ssd_y + this.ssd_total_height / 2

		// forward shield
		this.shields.push(new Shield({
			pos: [x, y + 10],
			start: 1.3, end: 1.7,
			radius: 80 * this.scale,
			shieldStrength: this.shieldStrength
		}));

		// starboard shield
		this.shields.push(new Shield({
			pos: [x - 30 * this.scale, y + 5],
			start: 1.85, end: 2.15,
			radius: 100 * this.scale,
			shieldStrength: this.shieldStrength
		}));

		// rear shield
		this.shields.push(new Shield({
			pos: [x, y - 1],
			start: .3, end: .7,
			radius: 80 * this.scale,
			shieldStrength: this.shieldStrength
		}));

		// port shield
		this.shields.push(new Shield({
			pos: [x + 30 * this.scale, y + 5],
			start: .85, end: 1.15,
			radius: 100 * this.scale,
			shieldStrength: this.shieldStrength
		}));
	};
}

module.exports = SSD;