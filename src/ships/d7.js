const Ship = require("./ship");
const SSD = require("../ssd");
const Utils = require("../utils");

class D7 extends Ship {
	constructor(options) {
		super(options);

		this.enemy = true;

		this.shipImg = {
			image: this.images.d7Img, x: 0, y: 0, width: 380, height: 275 };
			
		this.turnRadius = 2;

		this.beamSound = options.sounds.disruptSound;
		this.torpSound = options.sounds.kTorpSound;

		this.engineDamageDim = {left_x: 0, right_x: 66, y: 82, width: 3, height: 32};
		this.beamDamageDim = { left_x: 1, right_x: 67, y: 77, width: 7, height: 4 };
		this.torpImgOnSSD = { x: 30, y: 5 };

		this.engineFireLoc = { angle: 1.16 * Math.PI, distance: 27 };
		this.beamFireLoc = { angle: .78 * Math.PI, distance: 18 };
		this.torpFireLoc = { angle: 0, distance: 25 };

		this.callbacks = {
			beamDrawCB: Utils.drawWavyLine,
			engineDamCB: Utils.drawRect,
			beamDamCB: Utils.drawEllipse
		};

		this.width = 60;
		this.height = 30;

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
			shieldStrength: 100,
		});
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