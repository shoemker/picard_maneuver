const Ship = require("./ship");

class MainShip extends Ship {
	constructor(options) {
		super(options);

		this.beamPattern = [];
		this.turnRadius = 4;

		this.bridgeView = options.bridgeView;
	};

	takeDamage(attacker, damage) {
		this.bridgeView.shakeOn();
		return super.takeDamage(attacker, damage);
	}

	draw(ctx, callback, shipImage) {
		if (this.shipExplosionCounter == 1) this.bridgeView.destroyed()
		super.draw(ctx, callback, shipImage);
	}
}

module.exports = MainShip;