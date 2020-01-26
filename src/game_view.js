const Game = require("./game");
const GameOpening = require("./game_opening");
const DrawnShip = require("./ships/drawn_ship");
const Enterprise = require("./ships/enterprise");
const Soyuz = require("./ships/soyuz");
const D7 = require("./ships/d7");
const Bird_of_Prey = require("./ships/bird_of_prey");
const Utils = require("./utils");
const UserDraw = require("./user_draw");

class GameView {

	constructor(ctx, audioCtx, sounds) {

		this.ctx = ctx;
		this.audioCtx = audioCtx;
		this.sounds = sounds;
		this.pause = false;

		// main ship is the default
		this.enterprise = true;

		this.images = this.loadImages();
		this.game = new Game(this.images);
		this.gameOpening = new GameOpening();
		this.demo = false;
	};
	

	start() {
		// start the animation
		requestAnimationFrame(this.animate.bind(this));
	};


	animate() {
		if (!this.pause) {

			// if unpaused this steps and draws either the game or the gameOpening
			if (this.gameOpening !== null) this.gameOpening.stepAndDraw(this.ctx);
			else {
				if (this.demo && (this.game.main.isGone() || this.game.enemies.length === 0)) {
					const muted = this.game.muted;
					this.game = new Game(this.images);
					this.loadScenario4();
					this.game.muted = muted;
				}
				else if (this.game.main.getHull() === 0) this.game.lose = true;
				else if (this.game.enemies.length === 0) this.game.win = true;
				else {
					this.game.enemies.forEach((enemy, i) => {
						if (enemy.isGone()){
							this.game.enemies.splice(i, 1);
							this.game.enemyAIs.splice(i, 1);
							if(this.game.main.getTarget() === enemy) this.game.changeMainTarget();
							if(this.game.enemies.length > 0) 
								this.game.enemies[this.game.enemies.length - 1].setLabels(true);
						} 
					})
					this.game.allies.forEach((ally, i) => {
						if (ally.isGone()) {
							this.game.allies.splice(i, 1);
							this.game.allyAIs.splice(i, 1);
						}
					})
					this.game.step();
				}
				this.game.draw(this.ctx);
			}

			// every call to animate requests causes another call to animate
			requestAnimationFrame(this.animate.bind(this));
		}
	};

	
	keyHandler(e) {
		if (e.type == 'keydown') this.game.getKeyMap()[e.keyCode] = true;
		else this.game.getKeyMap()[e.keyCode] = false;			
	};

	// get ship choice, 
	// get clicks for choices on draw screen
	// get scenario click if still in the opening of the game,
	// check to see if mute or autopilot is being clicked
	checkClick(e, gainNode) {
		const x = e.pageX;
		const y = e.pageY;

		if (this.gameOpening !== null) {
			if (this.gameOpening.getShipChoice()) {
				this.chooseShip(x,y);
			}
			else if(this.userDraw != null){
				this.drawingClick(x,y);
			}
			else {
				this.chooseScenario(x,y,gainNode);
			}
		}
		// start again from scenario choice
		else if (this.game.win || this.game.lose) {
			this.game = new Game(this.images);
			this.gameOpening = new GameOpening();
			this.gameOpening.setShipChoice(false);
			this.gameOpening.setScenario(true);
		}
		else {
			this.muteAndAutopilotBoxes(x,y,gainNode);
		}
	};


	drawingClick(x,y) {
		if (x >= 517 && x <= 731 && y >= 818 && y <= 872) {
			this.userDraw.acceptDrawing();
			this.drawing = this.userDraw.getDrawing();
			this.ssdPortrait = this.userDraw.getSSDportrait();
			
			this.gameOpening.setShipChoice(false);
			this.gameOpening.setScenario(true);
			this.enterprise = false;

			this.pauseGameToggle();
			this.userDraw = null;
		}
		else if (x >= 298 && x <= 330) {
			this.userDraw.changeColor(y);
		}
		else if (x >= 910 && x <= 1000) {
			this.userDraw.changeLineWidth(y);
		}
	}

	pauseGameToggle() {
		this.pause = this.pause === false;
		
		// needed to restart animation on unpause
		if (!this.pause) this.start();
	};


	openingOff() {
		this.gameOpening = null;
		// this.audioCtx.resume().then(() => { return true; });
		this.sounds.theme.play();
	};
	

	muteAndAutopilotBoxes(x, y, gainNode){
		if (x > 1085 && x < 1112) {
			if (y > 46 && y < 71) {
				this.game.muteToggle(gainNode);

				// if paused, draw to show checkmark in box
				if (this.pause) this.game.draw(this.ctx)
			}
			else if (y > 85 && y < 112) {
				this.game.autoPilotToggle();

				// if paused, draw to show checkmark in box
				if (this.pause) this.game.draw(this.ctx)
			}
		}
	};


	chooseShip(x,y) {
		if (y >= 440 && y <= 800) {
			if (x >= 140 && x <= 545) {
				this.gameOpening.setShipChoice(false);
				this.gameOpening.setScenario(true);
				this.enterprise = true;
			}
			else if (x >= 690 && x <= 1095) {
				this.gameOpening.setShipChoice(false);
				this.userDraw = new UserDraw(this.ctx);
				this.gameOpening.stepAndDraw(this.ctx);
				this.pause = true;
				this.userDraw.draw();
			}
		}
	};


	chooseScenario(x,y,gainNode) {
		if (y >= 317 && y <= 734) {
			if (x > 54 && x < 407) {
				this.loadScenario1();
				this.openingOff();
			}
			else if (x > 440 && x < 795) {
				this.loadScenario2();
				this.openingOff();
			}
			else if (x > 830 && x < 1184) {
				this.loadScenario3();
				this.openingOff();
			}
		}
		// continuous demo mode
		else if (x > 20 && y > 20 && x < 40 && y < 40) {
			this.game.muteToggle(gainNode);
			this.loadScenario4();
			this.openingOff();
		}
	}

	
	loadScenario1(){
		this.game.createPlanetAndMoon(this.images.planet_08, [0, 0, 480, 480],this.images.moon_01 );

		// this.addShip([shipXpos, shipYpos],[ssdXpos, ssdYpos, ssdScale, ssdLabels], aiTargeting, rotation, phaserRecharge, torpedoReload)
		this.addMain([1040, 710, 1, true], false, Math.PI, 0, 0);
		this.addD7([0, 100], [100, 710, 1, true], false, 0, 0, 0);

		this.game.main.setTarget(this.game.enemies[0]);
	};


	loadScenario2() {
		this.game.createPlanetAndMoon(this.images.planet_03, [0, 0, 480, 480], this.images.moon_01);

		// this.addShip([shipXpos, shipYpos],[ssdXpos, ssdYpos, ssdScale, ssdLabels], aiTargeting, rotation, phaserRecharge, torpedoReload)
		this.addMain([1040, 710, 1, true], false, Math.PI, 0, 0);
		this.addBop([0, 400], [100, 630, .6, false], true, 0, 80, 100);
		this.addBop([0, 50], [100, 775, .6, true], true, 0, 0, 0);

		this.game.main.setTarget(this.game.enemies[0]);
	};


	loadScenario3() {
		this.game.createPlanetAndMoon(this.images.moon_03, [0, 0, 110, 110], this.images.moon_01);

		// this.addShip([shipXpos, shipYpos],[ssdXpos, ssdYpos, ssdScale, ssdLabels], aiTargeting, rotation, phaserRecharge, torpedoReload)
		this.addMain([1060, 765, .7, true], true, Math.PI);
		this.addSoyuz([600, 350], [1064, 475, .6, false], true, Math.PI);
		this.addSoyuz([600, 450], [1064, 618, .6, false], true, Math.PI,50,50);
		this.addBop([0, 300], [104, 475, .6, false], true, 0, 80, 100);
		this.addBop([0, 100], [104, 618, .6, false], true, 0);
		this.addD7([0, 200], [100, 765, .7, true], true, .1*Math.PI);

		this.game.main.setTarget(this.game.randomTarget(this.game.main));
	};

	loadScenario4() {
		this.loadScenario3();
		this.demo = true;
		this.game.autoPilotToggle();
	};


	addMain(ssdPos, aiTargeting, rotationOffset, phaserRecharge, torpedoReload) {
		const options = {
			pos: [Utils.getCanvasDim()[0] / 2 - 50, Utils.getCanvasDim()[1] / 2 - 50], 
			ssdPos,
			rotationOffset,
			images: this.images,
			sounds: this.sounds,
			phaserRecharge,
			torpedoReload 
		}

		if (this.enterprise) {
			this.game.addMainShip(new Enterprise(options), aiTargeting);
		}
		else {
			this.game.addMainShip(new DrawnShip(options, this.drawing, this.ssdPortrait), aiTargeting);
		}
	}

	
	addBop(pos, ssdPos, aiTargeting, rotationOffset, phaserRecharge, torpedoReload) {
		this.game.addEnemy(new Bird_of_Prey({
			pos, ssdPos,
			rotationOffset,
			images: this.images,
			sounds: this.sounds,
			phaserRecharge,
			torpedoReload
		}), aiTargeting);
	};

	addSoyuz(pos, ssdPos, aiTargeting, rotationOffset, phaserRecharge, torpedoReload) {
		this.game.addAlly(new Soyuz({
			pos, ssdPos,
			rotationOffset,
			images: this.images,
			sounds: this.sounds,
			phaserRecharge,
			torpedoReload
		}), aiTargeting);
	};

	addD7(pos, ssdPos, aiTargeting, rotationOffset, phaserRecharge, torpedoReload) {
		this.game.addEnemy(new D7({
			pos, ssdPos,
			rotationOffset,
			images: this.images,
			sounds: this.sounds,
			phaserRecharge,
			torpedoReload
		}), aiTargeting);
	};


	loadImages() {
		return {
			bopSsdImg: Utils.loadImg('./images/bop-ssd.png'),
			d7SsdImg: Utils.loadImg('./images/d7-ssd.png'),
			soyuzSsdImg: Utils.loadImg('./images/soyuz-ssd2.png'),
			entSsdImg: Utils.loadImg('./images/enterprise-ssd.png'),
			sparksImg: Utils.loadImg('./images/sparks.png'),
			explosionImg: Utils.loadImg('./images/explosion-sprite-sheet.png'),
			bopImg: Utils.loadImg('./images/bop.png'),
			d7Img: Utils.loadImg('./images/D7.png'),
			soyuzImg: Utils.loadImg('./images/soyuz.png'),
			enterpriseImg: Utils.loadImg('./images/uss-enterprise-png-view-original-669.png'),
			torpImg: Utils.loadImg('./images/torpedo.png'),
			kTorpImg: Utils.loadImg('./images/many_torpedos.png'),		
			moon_01: Utils.loadImg('./images/planets/moon_01.png'),
			moon_03: Utils.loadImg('./images/planets/moon_03.png'),
			planet_08: Utils.loadImg('./images/planets/planet_08.png'),
			planet_03: Utils.loadImg('./images/planets/planet_03.png'),
		}
	};
}

module.exports = GameView;