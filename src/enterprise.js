const Ship = require("./ship");
const Shield = require("./shield");


class Enterprise extends Ship {
	constructor(options) {
		super(options);
 
		this.loadShipImg();
		this.loadSSDImg();

		// rotates image 180 degrees so it faces left at start
		this.rotationOffset = Math.PI;

		// ssd is the ship systems display in the corner of the screen
		this.ssd_x = 880;
		this.ssd_y = 550;
		this.ssd_width = 60;
		this.ssd_height = 120
		
		this.raiseShields(this.ssd_x+this.ssd_width/2, this.ssd_y + this.ssd_height/2);
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

		//draw ship systems display
		ctx.drawImage(this.shipSSD, 0, 0, 54, 129,
			this.ssd_x,
			this.ssd_y,
			this.ssd_width,
			this.ssd_height);
		
		super.draw(ctx);
	};




	loadShipImg() {
		this.shipImg = new Image();
		this.shipImg.onload = () => { return true; }
		this.shipImg.src = '../images/uss-enterprise-png-view-original-669.png';
	};

	loadSSDImg() {
		this.shipSSD = new Image();
		this.shipSSD.onload = () => { return true; }
		this.shipSSD.src = '../images/enterprise-refit-ssd.png';
	};

}


module.exports = Enterprise