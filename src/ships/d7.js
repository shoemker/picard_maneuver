const Ship = require("./ship");
const SSD = require("../ssd");
const Utils = require("../utils");

class D7 extends Ship {
	constructor(options) {
		super(options);

		this.enemy = true;

		this.beamPattern = [];
		this.turnRadius = 4;

		this.beamSound = options.sounds.disruptSound;
		this.torpSound = options.sounds.kTorpSound;

		this.phaserRechargeMax = 200;
		this.torpedoReloadMax = 190;

		this.phaserColor = "green";
		this.phaserOffsetDistance = 16;

		// ssd is the ship systems display in the corner of the screen
		this.ssd = new SSD({
			ssdPos: options.ssdPos,
			img_size: [75, 114],
			img_pos_offset: [-3, 3],
			img: this.images.d7SsdImg,
			beamWeaponName: 'Disruptor',
			imgCoords: [0, 0, 207, 287],
			shieldStrength: 100
		});
	};


	draw(ctx, target) {
		super.draw(ctx, Utils.drawWavyLine,
			{ image: this.images.d7Img, x: 0, y: 0, width: 380, height: 275 },
			target);
	};


	// when beam is drawn, it could be drawn from either side depending on where target it
	firePhasers() {
		const angle = Utils.angleToOtherShip(this, this.target);
		if (angle <= Math.PI) this.phaserOffsetAngle = .7 * Math.PI;
		else this.phaserOffsetAngle = 1.3 * Math.PI;

		super.firePhasers();
	}
}


module.exports = D7;