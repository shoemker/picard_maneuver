const Ship = require("./ship");
const Utils = require("../utils");

class MainShip extends Ship {
	constructor(options) {
		super(options);

		this.turnRadius = 2;

		this.pos = [
			Utils.getCanvasDim().x / 2 - this.width/2, 
			Utils.getCanvasDim().y / 2 - this.height/2 - 40];

		this.bridgeView = options.bridgeView;
	};

	takeDamage(attacker, damage) {
		this.bridgeView.shakeOn();
		return super.takeDamage(attacker, damage);
	};

	draw(ctx, beamCallback, engineDamageCallback, shipImage) {
		if (this.shipExplosionCounter == 1) this.bridgeView.destroyed();
		super.draw(ctx, beamCallback, engineDamageCallback, shipImage);
	};

	firePhasers(){
		let returnValue = super.firePhasers();
		if (returnValue) this.bridgeView.phasersBubbleOn();
		return returnValue;
	};

	fireTorpedos() {
		let returnValue = super.fireTorpedos();
		if (returnValue) this.bridgeView.torpedosBubbleOn();
		return returnValue;
	};
};

module.exports = MainShip;