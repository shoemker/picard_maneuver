const Ship = require("./ship");

class Enterprise extends Ship {
	constructor(options) {
		super(options);
 
		this.loadShipImg();
	
	}

	draw(ctx) {
		ctx.save();

		this.rotateCanvas(ctx);

		ctx.drawImage(this.shipImg, 22, 0, 660, 300,
			this.pos[0],
			this.pos[1],
			this.width,
			this.height);

		ctx.restore();
		
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

}


module.exports = Enterprise