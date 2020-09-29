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

		this.engineDamageDim = { left_x: 0, right_x: 66, y: 82, width: 3, height: 32 };

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
			engineDamageDim: { left_x: 13, right_x: 39, y: 68, width: 4, height: 53 }
		});
	};


	draw(ctx) {
		super.draw(ctx, Utils.drawLine, this.ssd.drawSquaresOnSSD,
			{ image: this.image, x: 1, y: 1, width: 498, height: 498 });
	};
}


module.exports = DrawnShip;