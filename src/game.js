const D7 = require("./d7");
const Enterprise = require("./enterprise");


class Game {

	constructor(dim_x, dim_y) {
		this.dim_x = dim_x;
		this.dim_y = dim_y;

		this.D7 = new Enterprise({
			pos: [0, 0],
			vel: [0, 0]
		})
	}

	addEnterprise(enterprise){
		this.enterprise = enterprise;
	}

	step(timeDelta) {
		this.moveObjects(timeDelta);
	}

	draw(ctx){
		ctx.beginPath();
		ctx.clearRect(0, 0, this.dim_x, this.dim_y);
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, this.dim_x, this.dim_y);
		this.enterprise.draw(ctx);
		this.D7.draw(ctx);
	}

	moveObjects(timeDelta) {
		this.enterprise.move(timeDelta);
	}

}

module.exports = Game;