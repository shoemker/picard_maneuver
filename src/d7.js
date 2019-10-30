const Ship = require("./ship");
const SSD = require("./ssd");
const Utils = require("./utils");

class D7 extends Ship {
	constructor(options) {
		super(options);

		this.turnRadius = 4;
		this.enemy = true;

		this.phaserRechargeMax = 200;
		this.torpedoReloadMax = 190;

		this.phaserColor = "green";
		this.phaserOffsetDistance = 16;

		// ssd is the ship systems display in the corner of the screen
		this.ssd = new SSD({
			ssdPos: options.ssdPos,
			img_size: [70, 120],
			img_pos_offset: [0, 0],
			img: Utils.loadImg('./images/D7-SSD.png'),
			beamWeaponName: 'Disruptor',
			imgCoords: [0, 0, 170, 175],
			shieldStrength: 100
		});
	};


	draw(ctx, target) {
		ctx.save();

		this.rotateCanvas(ctx);

		//draw ship
		if (this.shipExplosionCounter < 34) {
			ctx.drawImage(this.shipImg, 0, 0, 380, 275,
				this.pos[0],
				this.pos[1],
				this.width,
				this.height
			);
		}

		ctx.restore();

		super.draw(ctx, target);
	};

	// when beam is drawn, it could be drawn from either side depending on where target it
	firePhasers() {
		const angle = Utils.angleToOtherShip(this, this.target);
		if (angle <= Math.PI) this.phaserOffsetAngle = .7 * Math.PI;
		else this.phaserOffsetAngle = 1.3 * Math.PI;

		super.firePhasers();
	}
}


module.exports = D7