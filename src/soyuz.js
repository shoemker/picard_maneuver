const Ship = require("./ship");
const SSD = require("./ssd");
const Utils = require("./utils");

class Soyuz extends Ship {
	constructor(options) {
		super(options);

		this.turnRadius = 3;

		this.width = 35;
		this.height = 28;

		this.phaserRechargeMax = 170;
		this.torpedoReloadMax = 200;

		this.phaserOffsetDistance = 13;
		this.phaserOffsetAngle = 1.5 * Math.PI;
		this.phaserColor = "red";

		this.phaserDamage = 5;
		this.hullIntegrityMax = 100;
		this.hullIntegrity = this.hullIntegrityMax;

		// ssd is the ship systems display in the corner of the screen
		this.ssd = new SSD({
			ssdPos: options.ssdPos,
			img_size: [80, 100],
			img_pos_offset: [-5, 10],
			img: Utils.loadImg('./images/soyuz-ssd.png'),
			beamWeaponName: 'Phaser',
			imgCoords: [0, 0, 125, 215],
			shieldStrength: 35
		});
	};


	draw(ctx, target) {
		ctx.save();

		this.rotateCanvas(ctx);

		//draw ship
		if (this.shipExplosionCounter < 34) {
			ctx.drawImage(this.shipImg, 0, 0, 362, 237,
				this.pos[0],
				this.pos[1],
				this.width,
				this.height
			);
		}

		ctx.restore();

		// fires a 2nd phaser line from other side
		if (this.phaserCounter > 0 && this.ptarget) 
			this.drawPhaser(ctx, 2*Math.PI - this.phaserOffsetAngle);

		super.draw(ctx, target);
	};

	// soyuz can only fire beams if target is in front
	firePhasers() {
		const angle = Utils.angleToOtherShip(this, this.target)
		if ((angle > (2 * Math.PI - Math.PI / 9)) || (angle < Math.PI / 9)) super.firePhasers();
	}

	drawPhaser(ctx, angle) {
		super.drawPhaser(ctx, angle, true);
	}
}


module.exports = Soyuz;