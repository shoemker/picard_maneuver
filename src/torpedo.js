const SpaceObject = require("./space_object");

class Torpedo extends SpaceObject {
	constructor(pos,direction) {
		super(pos);
		this.direction = direction;
		this.speed = 3;

		this.loadTorpImg();
	}
	
	draw(ctx) {
		ctx.drawImage(this.torpImg, 0, 0, 44, 46,
			this.pos[0],
			this.pos[1],
			10,
			10);
	}


	move() {
		this.pos[0] += this.speed * this.direction[0];
		this.pos[1] -= this.speed * this.direction[1];
	};

	loadTorpImg() {
		this.torpImg = new Image();
		this.torpImg.onload = () => { return true; }
		this.torpImg.src = '../images/torpedo.png';
	}

}

module.exports = Torpedo;