const Main = require("./main_ship");
const SSD = require("../ssd");
const Utils = require("../utils");

class Enterprise extends Main {
	constructor(options) {
		super(options);
 
		this.enemy = false;

		this.shipImg = {
			image: this.images.enterpriseImg, x:22, y:0, width:660, height:300 };

		this.beamSound = options.sounds.phasSound;
		this.torpSound = options.sounds.torpSound;

		this.engineDamageDim = {left_x: 13, right_x: 52, y: 68, width: 4, height: 53};
		this.beamDamageDim = { left_x: 34, right_x: 34, y: 22, width: 7, height: 4 };
		this.torpImgOnSSD = {x: 30, y: 50};

		this.engineFireLoc = { angle: .86 * Math.PI, distance: 25 };
		this.beamFireLoc = { angle: 0, distance: 20 };
		this.torpFireLoc = { angle: 0, distance: 0 };

		this.callbacks = { 
			beamDrawCB: Utils.drawLine, 
			engineDamCB: Utils.drawRect,
			beamDamCB: Utils.drawEllipse };

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
}


module.exports = Enterprise