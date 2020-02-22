const Cruiser = require("./cruiser");
const SSD = require("../ssd");
const Utils = require("../utils");

class DrawnShip extends Cruiser {
	constructor(options, drawing, ssdImg) {
		super(options);

		this.image = drawing;
		this.enemy = false;

		this.width = 50;
		this.height = 50;

		this.beamSound = options.sounds.phasSound;
		this.torpSound = options.sounds.torpSound;

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


	draw(ctx, ) {
		ctx.save();

		this.rotateCanvas(ctx);

		//draw ship
		if (this.shipExplosionCounter < 34) {
			ctx.drawImage(this.image, 1, 1, 498, 498,
				this.pos[0], this.pos[1], this.width, this.height
			);
		}

		ctx.restore();

		super.draw(ctx, Utils.drawLine);
	};
}


module.exports = DrawnShip