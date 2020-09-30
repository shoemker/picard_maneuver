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

		this.engineDamageDim = {left_x: 27, right_x: 35, y: 90, width: 8, height: 15};
		this.beamDamageDim = {left_x: 13, right_x: 39, y: 68, width: 4, height: 53};

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
			shieldStrength: 45,
		});
	};


	draw(ctx, target) {
		super.draw(ctx, Utils.drawLine, this.ssd.drawSquares, this.ssd.drawSquares,
			{ image: this.images.bopImg, x: 0, y: 0, width: 267, height: 300 },
			target);
	};


}

module.exports = Bird_of_Prey;