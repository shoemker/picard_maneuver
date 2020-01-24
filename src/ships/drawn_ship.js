const Ship = require("./ship");
const SSD = require("../ssd");

class DrawnShip extends Ship {
	constructor(options) {
		super(options);

		this.image = options.image;
		this.turnRadius = 4;
		this.enemy = false;

		this.beamSound = options.sounds.phasSound;
		this.torpSound = options.sounds.torpSound;

		this.phaserColor = "red";
		this.beamPattern = [];


		// ssd is the ship systems display in the corner of the screen
		this.ssd = new SSD({
			ssdPos: options.ssdPos,
			img_size: [60, 120],
			img_pos_offset: [5, 4],
			img: this.images.entSsdImg,
			beamWeaponName: "Phaser",
			imgCoords: [0, 0, 110, 257],
			shieldStrength: 100,
		});
	};


	draw(ctx, ) {
		ctx.save();

		this.rotateCanvas(ctx);

		//draw ship
		if (this.shipExplosionCounter < 34) {
			ctx.drawImage(this.image, 0, 0, 500, 500,
				this.pos[0], this.pos[1], 50, 50
			);
		}

		ctx.restore();

		super.draw(ctx);
	};
}


module.exports = DrawnShip