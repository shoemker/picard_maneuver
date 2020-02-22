const Frigate = require("./frigate");
const SSD = require("../ssd");
const Utils = require("../utils");

class Bird_of_Prey extends Frigate {
	constructor(options) {
		super(options);

		this.enemy = true;

		this.width = 30;
		this.height = 40;

		this.beamSound = options.sounds.disrupt2Sound;
		this.torpSound = options.sounds.kTorpSound;

		this.phaserRechargeMax = 170;
		this.torpedoReloadMax = 200;

		this.phaserColor = "green";

		this.phaserOffsetDistance = 20;
		this.phaserOffsetAngle = 1.6*Math.PI;

		this.phaserDamage = 10;
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
		super.draw(ctx, Utils.drawLine,
			{ image: this.images.bopImg, x: 0, y: 0, width: 267, height: 300 },
			target);

		// fires a 2nd disruptor line from other wing
		if (this.phaserCounter > 0 && this.ptarget && !this.ptarget.isGone())
			this.drawPhaser(ctx, 2 * Math.PI - this.phaserOffsetAngle, 0, Utils.drawLine);
	};


}

module.exports = Bird_of_Prey;