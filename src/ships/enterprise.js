const Cruiser = require("./cruiser");
const SSD = require("../ssd");
const Utils = require("../utils");

class Enterprise extends Cruiser {
	constructor(options) {
		super(options);
 
		this.enemy = false;

		this.beamSound = options.sounds.phasSound;
		this.torpSound = options.sounds.torpSound;
		
		this.width = 60;
		this.height = 30;
		
		// phaser animation starts from middle of saucer instead of center of ship
		this.phaserOffsetDistance = 18;
		this.phaserColor = "red";

		// ssd is the ship systems display in the corner of the screen
		this.ssd = new SSD({
			ssdPos: options.ssdPos,
			img_size: [60, 120],
			img_pos_offset: [5,4],
			img: this.images.entSsdImg,
			beamWeaponName: "Phaser",
			imgCoords: [0, 0, 110, 257],
			shieldStrength: 100,
		});
	};
	

	draw(ctx) {
		super.draw(ctx, Utils.drawLine, 
			{ image:this.images.enterpriseImg, x:22, y:0, width:660, height:300});
	};
}


module.exports = Enterprise