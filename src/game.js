const Enterprise = require("./enterprise");

class Game {

	constructor(dim_x, dim_y) {
		this.dim_x = dim_x;
		this.dim_y = dim_y;

		this.enterprise = new Enterprise()
	}

	step(timeDelta) {


	}

}