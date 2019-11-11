const Ship = require("./ship");
const SSD = require("./ssd");
const Utils = require("./utils");

class Bird_of_Prey extends Ship {
	constructor(options) {
		super(options);

		this.turnRadius = 3;
		this.enemy = true;

		this.width = 30;
		this.height = 40;

		this.beamSound = options.sounds.disrupt2Sound;
		this.torpSound = options.sounds.kTorpSound;

		this.phaserRechargeMax = 170;
		this.torpedoReloadMax = 200;

		this.phaserColor = "green";
		this.beamPattern = [3, 2, 3, 20];

		this.phaserOffsetDistance = 20;
		this.phaserOffsetAngle = 1.6*Math.PI;

		this.phaserDamage = 5;
		this.hullIntegrityMax = 100;
		this.hullIntegrity = this.hullIntegrityMax;

		// ssd is the ship systems display in the corner of the screen
		this.ssd = new SSD({
			ssdPos: options.ssdPos,
			img_size: [120,100],
			img_pos_offset: [-25, 12],
			img: this.images.bopSsdImg,
			beamWeaponName: 'Disruptor',
			imgCoords: [0, 0, 350, 240],
			shieldStrength: 45
		});
	};


	draw(ctx, target) {
		ctx.save();

		this.rotateCanvas(ctx);

		//draw ship
		if (this.shipExplosionCounter < 34) {
			ctx.drawImage(this.images.bopImg, 0, 0, 267, 300,
				this.pos[0], this.pos[1], this.width, this.height
			);
		}

		ctx.restore();

		// fires a 2nd disruptor line from other wing
		if (this.phaserCounter > 0 && this.ptarget && !this.ptarget.isGone()) 
			this.drawPhaser(ctx, 2 * Math.PI - this.phaserOffsetAngle);
;

		super.draw(ctx, target);
	};

	// bird of prey can only fire beams if target is in front
	firePhasers(){
		const angle = Utils.angleToOtherShip(this, this.target)
		if ((angle > (2 * Math.PI - Math.PI / 9)) || (angle < Math.PI / 9)) super.firePhasers();
	}
}

module.exports = Bird_of_Prey;