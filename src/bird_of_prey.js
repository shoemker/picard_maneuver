const Ship = require("./ship");
const SSD = require("./ssd");
const Utils = require("./utils");

class Bird_of_Prey extends Ship {
	constructor(options) {
		super(options);

		this.shipImg = Utils.loadImg('./images/bop1.png');

		this.width = 30;
		this.height = 40;

		this.phaserRechargeMax = 200;
		this.torpedoReloadMax = 190;

		// ssd is the ship systems display in the corner of the screen
		this.ssd = new SSD({
			ssdPos: options.ssdPos,
			ssd_width: 70,
			ssd_height: 120,
			imgName: './images/bop-ssd.png',
			beamWeaponName: 'Disruptor',
			imgCoords: [0, 0, 350, 240]
		});
	};


	draw(ctx) {
		ctx.save();

		this.rotateCanvas(ctx);

		//draw ship
		if (this.shipExplosionCounter < 34) {
			ctx.drawImage(this.shipImg, 0, 0, 267, 300,
				this.pos[0],
				this.pos[1],
				this.width,
				this.height
			);
		}

		ctx.restore();

		super.draw(ctx);
	};
}


module.exports = Bird_of_Prey;