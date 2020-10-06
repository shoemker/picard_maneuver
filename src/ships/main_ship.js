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


	getShift() {
		this.shiftDir = {
			x: this.getDirection().x, 
			y: this.getDirection().y, 
			speed: this.getSpeed() / 3};

		return {
			x: this.getDirection().x,
			y: this.getDirection().y,
			speed: this.getSpeed()};
	};


	takeDamage(attacker, damage) {
		this.bridgeView.shakeOn();
		let returnValue = super.takeDamage(attacker, damage);

		// if (this.engineDamCount === 1) this.bridgeView.enginDamBubbleOn();
		// else if (this.beamDamCount === 1) this.bridgeView.beamDamBubbleOn();
		// else if (this.torpDamCount === 1) this.bridgeView.torpDamBubbleOn();
		return returnValue;
	};


	draw(ctx, beamCallback, engineDamCallback, beamDamCallback, shipImage) {
		if (this.shipExplosionCounter == 1) this.bridgeView.destroyed();
		super.draw(ctx, beamCallback, engineDamCallback, beamDamCallback, shipImage);
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