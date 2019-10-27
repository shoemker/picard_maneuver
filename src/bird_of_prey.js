const Ship = require("./ship");
const SSD = require("./ssd");
const Utils = require("./utils");

class Bird_of_Prey extends Ship {
	constructor(options) {
		super(options);

		this.shipImg = Utils.loadImg('./images/bop.png');
		this.turnRadius = 3;
		
		this.width = 30;
		this.height = 40;

		this.phaserRechargeMax = 170;
		this.torpedoReloadMax = 200;

		this.phaserOffsetDistance = 20;
		this.phaserOffsetAngle = 1.6*Math.PI;

		this.phaserDamage = 5;
		this.hullIntegrityMax = 80;
		this.hullIntegrity = this.hullIntegrityMax;

		// ssd is the ship systems display in the corner of the screen
		this.ssd = new SSD({
			ssdPos: options.ssdPos,
			img_size: [120,100],
			img_pos_offset: [-25, 10],
			img: Utils.loadImg('./images/bop-ssd.png'),
			beamWeaponName: 'Disruptor',
			imgCoords: [0, 0, 350, 240],
			shieldStrength: 40
		});
	};


	draw(ctx, target) {
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
		if (this.phaserCounter > 0 && this.ptarget) this.drawPhaser(ctx, .4*Math.PI);


		super.draw(ctx, target);
	};

	firePhasers(){
		const angle = Utils.angleToOtherShip(this, this.target)
		if ((angle > (2 * Math.PI - Math.PI / 9)) || (angle < Math.PI / 9)) super.firePhasers();
	}
}


module.exports = Bird_of_Prey;