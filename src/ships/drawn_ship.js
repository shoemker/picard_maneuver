const MainShip = require("./main_ship");
const SSD = require("../ssd");
const Utils = require("../utils");

class DrawnShip extends MainShip {
	constructor(options, drawing, ssdImg) {
		super(options);

		this.image = drawing;
		this.enemy = false;

		this.width = 50;
		this.height = 50;

		this.beamSound = options.sounds.phasSound;
		this.torpSound = options.sounds.torpSound;

		this.engineDamageDim = { left_x: 7, right_x: 60, y: 78, width: 3, height: 35 };
		this.beamDamageDim = { left_x: 34, right_x: 34, y: 22, width: 7, height: 4 };
		this.torpImgOnSSD = { x: 30, y: 50 };

		this.engineFireLoc = { angle: 1.18 * Math.PI, distance: 18 };
		this.beamFireLoc = { angle: 0, distance: 20 };
		this.torpFireLoc = { angle: 0, distance: 0 };


		this.phaserColor = "red";

		// ssd is the ship systems display in the corner of the screen
		this.ssd = new SSD({
			ssdPos: options.ssdPos,
			img_size: [100, 100],
			img_pos_offset: [-15, 14],
			img: ssdImg,
			beamWeaponName: "Phaser",
			imgCoords: [0, 0, 500, 500],
			shieldStrength: 100,
		});
	};


	draw(ctx) {
		super.draw(ctx, Utils.drawLine, this.ssd.drawRects, this.ssd.drawEllipses,
			{ image: this.image, x: 1, y: 1, width: 498, height: 498 });
	};
}


module.exports = DrawnShip;