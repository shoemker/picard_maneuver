const Ship = require("./ship");

class Enterprise extends Ship {
	constructor(options) {
		super(options);
 
		this.loadShipImg();
		this.loadSSDImg();

		this.rotationOffset = Math.PI;

	}

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
			900,
			550,
			60,
			120);
		
		// draw phasor
		if (this.phasorCounter > 0) {
			ctx.beginPath();
			ctx.moveTo(this.center()[0], this.center()[1]);
			ctx.lineTo(this.enemy.center()[0], this.enemy.center()[1]);
			ctx.strokeStyle = 'red';
			ctx.lineWidth = 2;
			ctx.stroke();
			this.phasorCounter++;
			if (this.phasorCounter > 20) this.phasorCounter = 0;
		}

	}




	loadShipImg() {
		this.shipImg = new Image();
		this.shipImg.onload = () => { return true; }
		this.shipImg.src = '../images/uss-enterprise-png-view-original-669.png';

	}

	loadSSDImg() {
		this.shipSSD = new Image();
		this.shipSSD.onload = () => { return true; }
		this.shipSSD.src = '../images/enterprise-refit-ssd.png';

	}

}


module.exports = Enterprise