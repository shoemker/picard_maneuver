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
		if (this.shipExplosionCounter == 1) this.bridgeView.destroyed();
		super.draw(ctx, callback, shipImage);
	}

	firePhasers(){
		let returnValue = super.firePhasers();
		if (returnValue) this.bridgeView.phasersBubbleOn();
		return returnValue;
	}

	fireTorpedos() {
		let returnValue = super.fireTorpedos();
		if (returnValue) this.bridgeView.torpedosBubbleOn();
		return returnValue;
	}
}

module.exports = MainShip;