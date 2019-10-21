const Ship = require("./ship");
const SSD = require("./ssd");
const Utils = require("./utils");

class Enterprise extends Ship {
	constructor(options) {
		super(options);
 
		this.shipImg = Utils.loadImg('./images/uss-enterprise-png-view-original-669.png');

		// phaser animation starts from middle of saucer instead of center of ship
		this.phaserStartOffset = 18;

		// ssd is the ship systems display in the corner of the screen
		this.ssd = new SSD({
			ssdPos: options.ssdPos,
			img_size: [60, 120],
			img_pos_offset: [5,0],
			img: Utils.loadImg('./images/enterprise-refit-ssd.png'),
			beamWeaponName: "Phaser",
			imgCoords: [0, 0, 54, 129]
		});
	};
	

	draw(ctx) {
		ctx.save();

		this.rotateCanvas(ctx);

		//draw ship
		if (this.shipExplosionCounter < 34) {
			ctx.drawImage(this.shipImg, 22, 0, 660, 300,
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


module.exports = Enterprise