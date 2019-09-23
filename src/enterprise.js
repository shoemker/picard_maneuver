const Ship = require("./ship");
const SSD = require("./ssd");

class Enterprise extends Ship {
	constructor(options) {
		super(options);
 
		this.loadShipImg();

		// rotates image 180 degrees so it faces left at start
		this.rotationOffset = Math.PI;

		// ssd is the ship systems display in the corner of the screen
		this.ssd = new SSD({
			ssd_x: 880,
			ssd_y: 550,
			ssd_width: 60,
			ssd_height: 120,
			imgName: '../images/enterprise-refit-ssd.png',
			imgCoords: [0, 0, 54, 129]
		});
	};

	draw(ctx) {
		ctx.save();

		this.rotateCanvas(ctx);

		//draw ship
		ctx.drawImage(this.shipImg, 22, 0, 660, 300,
			this.pos[0],
			this.pos[1],
			this.width,
			this.height);

		ctx.restore();
		
		super.draw(ctx);
	};

	
	loadShipImg() {
		this.shipImg = new Image();
		this.shipImg.onload = () => { return true; }
		this.shipImg.src = '../images/uss-enterprise-png-view-original-669.png';
	};


}


module.exports = Enterprise