/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/d7.js":
/*!*******************!*\
  !*** ./src/d7.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst SSD = __webpack_require__(/*! ./ssd */ \"./src/ssd.js\");\n\nclass D7 extends Ship {\n\tconstructor(options) {\n\t\tsuper(options);\n\n\t\tthis.loadShipImg();\n\n\t\tthis.phaserRechargeMax = 210;\n\n\t\t// this.hullIntegrity = 50;\n\n\t\t// ssd is the ship systems display in the corner of the screen\n\t\tthis.ssd = new SSD({\n\t\t\tssd_x: 100,\n\t\t\tssd_y: 700,\n\t\t\tssd_width: 70,\n\t\t\tssd_height: 120,\n\t\t\timgName: './images/D7-SSD.png',\n\t\t\tbeamWeaponName: 'Disruptor',\n\t\t\timgCoords: [0, 0, 170, 175]\n\t\t});\n\t};\n\n\n\tdraw(ctx) {\n\t\tctx.save();\n\n\t\tthis.rotateCanvas(ctx);\n\n\t\t//draw ship\n\t\tif (this.shipExplosionCounter < 34) {\n\t\t\tctx.drawImage(this.shipImg, 0, 0, 380, 275,\n\t\t\t\tthis.pos[0],\n\t\t\t\tthis.pos[1],\n\t\t\t\tthis.width,\n\t\t\t\tthis.height\n\t\t\t);\n\t\t}\n\n\t\tctx.restore();\n\n\t\tsuper.draw(ctx);\n\t};\n\n\n\tloadShipImg() {\n\t\tthis.shipImg = new Image();\n\t\tthis.shipImg.onload = () => { return true; };\n\t\tthis.shipImg.src = './images/D7.png';\n\t};\n}\n\n\nmodule.exports = D7\n\n//# sourceURL=webpack:///./src/d7.js?");

/***/ }),

/***/ "./src/enemyAI.js":
/*!************************!*\
  !*** ./src/enemyAI.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst Utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nclass EnemyAI  {\n\tconstructor(controlledShip, opponent, randomness, torpImg) {\n\t\tthis.controlledShip = controlledShip;\n\t\tthis.opponent = opponent;\n\t\tthis.torpImg = torpImg;\n\t\tthis.randomness = randomness;\n\n\t\tthis.turnLeftLength = 0;\n\t\tthis.turnRightLength = 0;\n\t\tthis.turnCounter = 0;\n\t}\n\n\tconsultAI(onscreen){\n\t\tconst angleOfOponent = Utils.angleToOtherShip(this.controlledShip, this.opponent);\n\t\tconst turnCounterMax = 5;\n\t\tconst turnCircleMax = 50;\n\n\t\t// speed\n\t\tif ((this.controlledShip.getSpeed() < 2 && this.controlledShip.getSpeed() < this.opponent.getSpeed()) || \n\t\t\t\tthis.controlledShip.getSpeed() < 1) {\n\t\t\tthis.controlledShip.power(1);\n\t\t}\n\n\t\t// fire phasers\n\t\tif (this.controlledShip.phaserReady() && onscreen) this.controlledShip.firePhasers(this.opponent);\n\n\n\t\t// turning and torpedos\n\t\tif (!onscreen || this.controlledShip.torpedosReady()) {\n\t\t\tif (angleOfOponent > Math.PI * .0625 && angleOfOponent <= Math.PI) {\n\t\t\t\tif (this.turnCounter === turnCounterMax) {\n\t\t\t\t\tif(this.turnRightLength < turnCircleMax) {\n\t\t\t\t\t\tthis.controlledShip.changeDirection(1);\n\t\t\t\t\t\tthis.turnRightLength++;\n\t\t\t\t\t\tthis.turnLeftLength = 0;\n\t\t\t\t\t}\n\t\t\t\t\telse this.controlledShip.changeDirection(-1);\n\t\t\t\t}\n\t\t\t}\n\t\t\telse if (angleOfOponent < Math.PI * 1.9375 &&\n\t\t\t\tangleOfOponent > Math.PI) {\n\t\t\t\tif (this.turnCounter === turnCounterMax) {\n\t\t\t\t\tif (this.turnLeftLength < turnCircleMax) {\n\t\t\t\t\t\tthis.controlledShip.changeDirection(-1);\n\t\t\t\t\t\tthis.turnLeftLength++;\n\t\t\t\t\t\tthis.turnRightLength = 0;\n\t\t\t\t\t}\n\t\t\t\t\telse this.controlledShip.changeDirection(1);\n\t\t\t\t}\n\t\t\t}\n\t\t\telse this.controlledShip.fireTorpedos(this.torpImg);\n\t\t}\n\t\t// ai gets some randomness\n\t\telse if (this.randomness) {\n\t\t\tconst random = Math.random();\n\t\t\tif (random < .01) this.controlledShip.changeDirection(1);\n\t\t\telse if (random > .99) this.controlledShip.changeDirection(-1);\n\t\t}\n\n\t\tthis.turnCounter++;\n\t\tif (this.turnCounter > turnCounterMax) this.turnCounter = 0;\n\t}\n}\n\nmodule.exports = EnemyAI;\n\n//# sourceURL=webpack:///./src/enemyAI.js?");

/***/ }),

/***/ "./src/enterprise.js":
/*!***************************!*\
  !*** ./src/enterprise.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst SSD = __webpack_require__(/*! ./ssd */ \"./src/ssd.js\");\n\nclass Enterprise extends Ship {\n\tconstructor(options) {\n\t\tsuper(options);\n \n\t\tthis.loadShipImg();\n\n\t\t// this.hullIntegrity = 5;\n\n\n\t\t// rotates image 180 degrees so it faces left at start\n\t\tthis.rotationOffset = Math.PI;\n\n\n\t\t// ssd is the ship systems display in the corner of the screen\n\t\tthis.ssd = new SSD({\n\t\t\tssd_x: 1040,\n\t\t\tssd_y: 700,\n\t\t\tssd_width: 60,\n\t\t\tssd_height: 120,\n\t\t\timgName: './images/enterprise-refit-ssd.png',\n\t\t\tbeamWeaponName: \"Phaser\",\n\t\t\timgCoords: [0, 0, 54, 129]\n\t\t});\n\t};\n\t\n\n\tdraw(ctx) {\n\t\tctx.save();\n\n\t\tthis.rotateCanvas(ctx);\n\n\t\t//draw ship\n\t\tif (this.shipExplosionCounter < 34) {\n\t\t\tctx.drawImage(this.shipImg, 22, 0, 660, 300,\n\t\t\t\tthis.pos[0],\n\t\t\t\tthis.pos[1],\n\t\t\t\tthis.width,\n\t\t\t\tthis.height\n\t\t\t);\n\t\t}\n\n\t\tctx.restore();\n\t\t\n\t\tsuper.draw(ctx);\n\t};\n\n\n\tloadShipImg() {\n\t\tthis.shipImg = new Image();\n\t\tthis.shipImg.onload = () => { return true; };\n\t\tthis.shipImg.src = './images/uss-enterprise-png-view-original-669.png';\n\t};\n}\n\n\nmodule.exports = Enterprise\n\n//# sourceURL=webpack:///./src/enterprise.js?");

/***/ }),

/***/ "./src/explosion.js":
/*!**************************!*\
  !*** ./src/explosion.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Explosion {\n\tconstructor(img, sound) {\n\t\tthis.img = img;\n\t\tthis.sound = sound;\n\t\tthis.index = 0;\n\n\t\t// these are the x,y coords for different sprites on the sheet\n\t\tthis.sheet = [\n\t\t\t[ 380, 854,  30,  26],\n\t\t\t[ 250, 852,  30,  30],\n\t\t\t[ 115, 845,  40,  40],\n\n\t\t\t[ 760, 715,  50,  45],\n\t\t\t[ 628, 710,  53,  50],\n\t\t\t[ 495, 705,  60,  60],\n\t\t\t[ 360, 705,  65,  60],\n\t\t\t[ 230, 705,  70,  65],\n\t\t\t[ 100, 705,  70,  65],\n\n\t\t\t[ 750, 575,  70,  70],\n\t\t\t[ 618, 570,  74,  75],\n\t\t\t[ 490, 570,  70,  75],\n\t\t\t[ 357, 570,  75,  75],\n\t\t\t[ 225, 570,  77,  75],\n\t\t\t[ 100, 570,  70,  75],\n\n\t\t\t[ 748, 435,  74,  90],\n\t\t\t[ 616, 435,  78,  90],\t\t\t\n\t\t\t[ 488, 435,  74,  90],\n\t\t\t[ 355, 435,  79,  90],\t\t\t\n\t\t\t[ 223, 435,  81,  90],\n\t\t\t[  98, 435,  74,  90],\n\n\t\t\t[ 740, 290, 100, 115],\n\t\t\t[ 605, 290, 105, 115],\n\t\t\t[ 470, 290, 110, 115],\n\t\t\t[ 340, 290, 110, 115],\n\t\t\t[ 210, 290, 110, 115],\n\t\t\t[  90, 290,  90, 115],\n\n\t\t\t[ 730, 160, 110, 110],\n\t\t\t[ 600, 160, 110, 110],\n\t\t\t[ 470, 160, 110, 110],\n\t\t\t[ 340, 160, 110, 110],\n\t\t\t[ 215, 160, 100, 110],\n\t\t\t[  85, 160, 100, 110],\n\n\t\t\t[ 735,  40, 100,  95],\n\t\t\t[ 610,  40,  90,  90],\n\t\t\t[ 485,  45,  80,  85],\n\t\t\t[ 355,  50,  80,  75],\n\t\t\t[ 230,  50,  75,  70],\n\t\t\t[ 105,  59,  55,  51]\n\n\t\t];\n\t};\n\n\n\tdraw(ctx, pos) {\n\t\tif (this.index === 0) this.sound.play();\n\t\t\n\t\tif (this.index < this.sheet.length) {\n\t\t\tctx.drawImage(this.img, \n\t\t\t\tthis.sheet[this.index][0], this.sheet[this.index][1], this.sheet[this.index][2], this.sheet[this.index][3],\n\t\t\t\tpos[0]-this.index/2,\n\t\t\t\tpos[1] - 5-this.index/2,\n\t\t\t\t15+this.index,\n\t\t\t\t15+this.index\n\t\t\t);\n\n\t\t\tthis.index++;\n\t\t}\n\t\t\n\t\treturn this.index\n\t};\n}\n\nmodule.exports = Explosion;\n\n//# sourceURL=webpack:///./src/explosion.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Star = __webpack_require__(/*! ./star */ \"./src/star.js\");\nconst Planet = __webpack_require__(/*! ./planet */ \"./src/planet.js\");\nconst EnemyAI = __webpack_require__(/*! ./enemyAI */ \"./src/enemyAI.js\");\nconst Utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nclass Game {\n\n\tconstructor(canvas_width, canvas_height) {\n\t\tthis.canvas_width = canvas_width;\n\t\tthis.canvas_height = canvas_height;\n\n\t\tthis.stars = [];\n\t\tthis.base_speed_inverse = 5;\n\n\t\tthis.win = false;\n\t\tthis.lose = false;\n\t\tthis.muted = false;\n\t\tthis.autopilot = false;\n\n\t\tthis.createStarField();\n\t\tthis.loadTorpImg();\n\n\t\tthis.planet_08 = new Planet({\n\t\t\tpos: [300, 300],\n\t\t\timg: this.loadPlanet('./images/planets/planet_08.png'),\n\t\t\twidth: 200,\n\t\t\theight: 200,\n\t\t\tsheetCoords: [20, 20, 460, 480]\n\t\t});\n\n\t\tthis.moon_01 = new Planet({\n\t\t\tpos:[260, 410],\n\t\t\timg: this.loadPlanet('./images/planets/moon_01.png'),\n\t\t\twidth: 50,\n\t\t\theight: 50,\n\t\t\tsheetCoords: [3,3,58,58]\n\t\t})\n\t}\n\n\taddEnterprise(enterprise){\n\t\tthis.enterprise = enterprise;\n\t};\n\n\taddEnemy(enemy){\n\t\tthis.enemy = enemy;\n\t};\n\n\taddAI() {\n\t\tthis.enemyAI = new EnemyAI(this.enemy, this.enterprise, true, this.torpImg);\n\t\tthis.enterpriseAI = new EnemyAI(this.enterprise, this.enemy, true, this.torpImg);\n\t};\n\n\tstep() {\n\t\tthis.moveObjects();\n\n\t\tthis.enemyAI.consultAI(this.enemy.onscreen(this.canvas_width, this.canvas_height));\n\t\tif ( this.autopilot) \n\t\t\tthis.enterpriseAI.consultAI(this.enemy.onscreen(this.canvas_width, this.canvas_height));\n\n\t\tthis.checkTorpCollisions(this.enemy, this.enterprise.getTorpedos());\n\t\tthis.checkTorpCollisions(this.enterprise, this.enemy.getTorpedos());\n\t};\n\n\n\tmoveObjects() {\t\t\n\t\tthis.shift();\n\n\t\t// now give ships and objects their own movement\n\t\tthis.enemy.move(this.base_speed_inverse);\n\n\t\tthis.moveTorpedos(this.enterprise);\n\t\tthis.moveTorpedos(this.enemy);\n\t}\n\n\n\t// shift moves everything but main ship to show main ship's movement\n\tshift() {\n\n\t\tconst shift_x = this.enterprise.getDirection()[0] / this.base_speed_inverse;\n\t\tconst shift_y = this.enterprise.getDirection()[1] / this.base_speed_inverse;\n\n\n\t\tthis.stars.forEach((star) =>\n\t\t\t\t\tstar.shift([shift_x , shift_y], this.enterprise.getSpeed()));\n\n\t\tthis.enemy.shift([shift_x, shift_y], this.enterprise.getSpeed());\n\t\t\t\t\t\t\t\t\t\t\n\t\t// the planet and moon shift differently than the stars to give a layered background\n\t\tthis.planet_08.shift(\n\t\t\t[this.enterprise.getDirection()[0] / (this.base_speed_inverse -2),\n\t\t\tthis.enterprise.getDirection()[1] / (this.base_speed_inverse - 2)],\n\t\t\tthis.enterprise.getSpeed());\n\t\t\t\t\t\t\t\t\t\t\t\t\n\t\tthis.moon_01.shift(\n\t\t\t[this.enterprise.getDirection()[0] / (this.base_speed_inverse - 2.5),\n\t\t\tthis.enterprise.getDirection()[1] / (this.base_speed_inverse - 2.5)],\n\t\t\tthis.enterprise.getSpeed());\t\n\t}\n\n\n\tdraw(ctx){\n\t\t// clear canvas and draw black background\n\t\tctx.beginPath();\n\t\tctx.clearRect(0, 0, this.canvas_width, this.canvas_height);\n\t\tctx.fillStyle = \"black\";\n\t\tctx.fillRect(0, 0, this.canvas_width, this.canvas_height);\n\n\t\t// draw all of the objects\n\t\tthis.drawStars(ctx);\n\n\t\tthis.planet_08.draw(ctx);\n\t\tthis.moon_01.draw(ctx);\n\n\t\tthis.enterprise.draw(ctx);\n\t\tthis.enemy.draw(ctx);\n\n\t\t// draw mute box\n\t\tthis.drawMute(ctx);\n\t\tthis.drawAutopilot(ctx);\n\n\t\tif (this.lose) this.drawMessage(ctx, \"Sorry, your ship exploded\");\n\t\tif (this.win) this.drawMessage(ctx, \"Congratulations, You Win!\");\n\t};\n\n\n\tdrawStars(ctx) {\n\t\tthis.stars.forEach((star) => star.draw(ctx));\n\t};\n\n\n\tdrawMessage(ctx, message) {\n\t\tctx.font = \"72px FINALOLD\";\n\t\tctx.fillStyle = \"#FAFAD2\";\n\n\t\tctx.fillText(message, this.canvas_width/2-315, this.canvas_height/3 - 100);\n\t\tctx.fillText(\"Refresh to play again\", this.canvas_width / 2 - 270, this.canvas_height / 3 - 20);\n\t};\n\n\n\tdrawMute(ctx) {\n\t\tctx.beginPath();\n\t\tctx.rect(this.canvas_width - 130, 30, 20, 20);\n\t\tctx.strokeStyle = \"white\";\n\t\tctx.stroke();\n\n\t\tctx.font = \"24px Arial\";\n\t\tctx.fillStyle = \"white\";\n\t\tctx.fillText(\"Mute\", this.canvas_width - 100, 48);\n\n\t\tif (this.muted) {\n\t\t\tctx.beginPath();\n\t\t\tctx.moveTo(this.canvas_width - 130,40);\n\t\t\tctx.lineTo(this.canvas_width - 120,50);\n\t\t\tctx.lineTo(this.canvas_width - 105, 30)\n\t\t\tctx.strokeStyle = 'red';\n\t\t\tctx.lineWidth = 5;\n\t\t\tctx.stroke();\n\t\t}\n\t};\n\n\n\tdrawAutopilot(ctx) {\n\t\tctx.beginPath();\n\t\tctx.rect(this.canvas_width - 130, 70, 20, 20);\n\t\tctx.strokeStyle = \"white\";\n\t\tctx.stroke();\n\n\t\tctx.font = \"24px Arial\";\n\t\tctx.fillStyle = \"white\";\n\t\tctx.fillText(\"Autopilot\", this.canvas_width - 100, 88);\n\n\t\tif (this.autopilot) {\n\t\t\tctx.beginPath();\n\t\t\tctx.moveTo(this.canvas_width - 130, 80);\n\t\t\tctx.lineTo(this.canvas_width - 120, 90);\n\t\t\tctx.lineTo(this.canvas_width - 105, 70)\n\t\t\tctx.strokeStyle = 'red';\n\t\t\tctx.lineWidth = 5;\n\t\t\tctx.stroke();\n\t\t}\n\t};\n\n\n\tmuteToggle() {\n\t\tif (this.muted) this.muted = false;\n\t\telse this.muted = true;\n\t};\n\n\n\tautoPilotToggle() {\n\t\tif (this.autopilot) this.autopilot = false;\n\t\telse this.autopilot = true;\n\t};\n\n\t// factory method to create stars\n\t// a version of this came from http://thenewcode.com/81/Make-A-Starfield-Background-with-HTML5-Canvas\n\tcreateStarField() {\n\t\tconst starCount = 250;\n\t\tconst\tcolorrange = [0, 60, 240];\n\t\t\n\t\tfor (let i = 0; i < starCount; i++) {\n\t\t\tthis.stars.push(new Star({\n\t\t\t\tpos: [Math.random() * this.canvas_width, Math.random() * this.canvas_height],\n\t\t\t\tradius: Math.random() * 2.0,\n\t\t\t\thue: colorrange[this.getRandom(0, colorrange.length - 1)],\n\t\t\t\tsat: this.getRandom(50, 100),\n\t\t\t\tcanvas_width: this.canvas_width,\n\t\t\t\tcanvas_height: this.canvas_height\t\t\t\t\n\t\t\t}))\n\t\t}\n\t};\n\n\tgetRandom(min, max) {\n\t\treturn Math.floor(Math.random() * (max - min + 1)) + min;\n\t};\n\n\n\tmoveTorpedos(ship) {\n\t\tship.getTorpedos().forEach((torpedo, i) => {\n\t\t\ttorpedo.move();\n\n\t\t\t// delete torpedo when it moves offscreen\n\t\t\tlet center = torpedo.center();\n\t\t\tif (center[0] < 0 || center[0] > this.canvas_width ||\n\t\t\t\tcenter[1] < 0 || center[1] > this.canvas_height)\n\t\t\t\tship.getTorpedos().splice(i, 1);\n\t\t});\n\t};\n\n\n\tfireTorpedos(ship) {\n\t\tship.fireTorpedos(this.torpImg);\n\t};\n\n\n\tfirePhasers(ship) {\n\t\tconst enemyOnScreen = this.enemy.onscreen(this.canvas_width, this.canvas_height);\n\t\tif (ship === this.enterprise && enemyOnScreen) {\n\t\t\tship.firePhasers(this.enemy);\n\t\t}\n\t\telse if (enemyOnScreen) { \n\t\t\tship.firePhasers(this.enterprise);\n\t\t}\n\t};\n\n\n\tcheckTorpCollisions(ship, torpedos) {\n\t\tlet distance;\n\n\t\ttorpedos.forEach((torpedo,i) => {\n\t\t\tdistance = Utils.distance(ship, torpedo);\n\t\t\tif (distance < 30) {\n\t\t\t\ttorpedos.splice(i, 1);\n\t\t\t\tif (ship === this.enterprise) ship.receiveTorpHit(this.enemy);\n\t\t\t\telse ship.receiveTorpHit(this.enterprise)\n\t\t\t}\n\t\t})\n\t};\n\n\n\tloadTorpImg() {\n\t\tthis.torpImg = new Image();\n\t\tthis.torpImg.onload = () => { return true; }\n\t\tthis.torpImg.src = './images/torpedo.png';\n\t};\n\n\tloadPlanet(file) {\n\t\tlet img = new Image();\n\t\timg.onload = () => { return true; }\n\t\timg.src = file;\n\t\treturn img;\n\t};\n\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_opening.js":
/*!*****************************!*\
  !*** ./src/game_opening.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n// a version of this came from http://codentronix.com/2011/07/22/html5-canvas-3d-starfield/\nclass GameOpening {\n\n\tconstructor(canvas_width, canvas_height) {\n\t\tthis.canvas_width = canvas_width;\n\t\tthis.canvas_height = canvas_height;\n\n\t\tthis.max_depth = 32;\n\n\t\tthis.stars = new Array(512);\n\n\t\tthis.createOpeningStarfield();\n\t};\n\n\n\tcreateOpeningStarfield() {\n\t\tfor (let i = 0; i < this.stars.length; i++) {\n\t\t\tthis.stars[i] = {\n\t\t\t\tx: this.randomRange(-32, 32),\n\t\t\t\ty: this.randomRange(-32, 32),\n\t\t\t\tz: this.randomRange(1, this.max_depth)\n\t\t\t};\n\t\t};\n\t};\n\n\n\tstepAndDraw(ctx) {\n\t\tconst halfWidth = this.canvas_width / 2;\n\t\tconst halfHeight = this.canvas_height / 2;\n\n\t\tctx.fillStyle = \"rgb(0,0,0)\";\n\t\tctx.fillRect(0, 0, this.canvas_width, this.canvas_height);\n\n\t\tthis.stars.forEach((star) => {\n\t\t\tstar.z -= 0.1;\n\n\t\t\tif (star.z <= 0) {\n\t\t\t\tstar.x = this.randomRange(-32, 32);\n\t\t\t\tstar.y = this.randomRange(-32, 32);\n\t\t\t\tstar.z = this.max_depth;\n\t\t\t}\n\n\t\t\tconst k = 128.0 / star.z;\n\t\t\tconst px = star.x * k + halfWidth;\n\t\t\tconst py = star.y * k + halfHeight;\n\n\t\t\tif (px >= 0 && px <= this.canvas_width && py >= 0 && py <= this.canvas_height) {\n\t\t\t\tconst size = (1 - star.z / 32.0) * 5;\n\t\t\t\tconst shade = parseInt((1 - star.z / 32.0) * 255);\n\t\t\t\tctx.fillStyle = \"rgb(\" + shade + \",\" + shade + \",\" + shade + \")\";\n\t\t\t\tctx.fillRect(px, py, size, size);\n\t\t\t}\n\t\t});\n\n\t\tthis.drawText(ctx);\n\t};\n\n\n\trandomRange(minVal, maxVal) {\n\t\treturn Math.floor(Math.random() * (maxVal - minVal - 1)) + minVal;\n\t};\n\n\n\tdrawText(ctx) {\n\t\tctx.fillStyle = \"lightblue\";\n\n\t\tctx.font = \"108px FINALOLD\";\n\t\tctx.fillText(\"The Picard Maneuver\", this.canvas_width / 2 - 365, this.canvas_height / 3);\n\n\t\tctx.font = \"72px FINALOLD\";\n\t\tctx.fillText(\"A Tactical Starship Combat Game\", this.canvas_width / 2 - 380, this.canvas_height / 3+ 80);\n\n\t\tctx.fillStyle = \"white\";\n\t\tctx.font = \"54px FINALOLD\"; \n\t\tctx.fillText(\"Click Here To Start\", this.canvas_width / 2 - 170, this.canvas_height / 3+ 200);\n\t}\n\n}\n\nmodule.exports = GameOpening;\n\n//# sourceURL=webpack:///./src/game_opening.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameOpening = __webpack_require__(/*! ./game_opening */ \"./src/game_opening.js\");\nconst Enterprise = __webpack_require__(/*! ./enterprise */ \"./src/enterprise.js\");\nconst D7 = __webpack_require__(/*! ./d7 */ \"./src/d7.js\");\nconst Explosion = __webpack_require__(/*! ./explosion */ \"./src/explosion.js\")\n\n\nclass GameView {\n\n\tconstructor(ctx, width, height, sounds) {\n\n\t\tthis.ctx = ctx;\n\t\tthis.pause = false;\n\t\tthis.theme = sounds.theme;\n\n\t\tthis.game = new Game(width, height);\n\t\tthis.gameOpening = new GameOpening(width, height);\n\n\t\tthis.loadExplosionImg();\n\t\tthis.explosion = new Explosion(this.explosionImg, sounds.exploSound);\n\n\t\tthis.game.addEnterprise(new Enterprise({\n\t\t\tpos: [width/2 - 50, height/2 - 50],\n\t\t\tdirectionIndex: 18,\n\t\t\tdirection: [-3, 0],\n\t\t\tphaserColor: \"red\",\n\t\t\ttorpSound: sounds.torpSound,\n\t\t\tbeamSound: sounds.phasSound,\n\t\t\texplosion: this.explosion,\n\t\t\texplosionImg: this.explosionImg\n\t\t}));\n\n\t\tthis.game.addEnemy( new D7({\n\t\t\tpos: [0, 100],\n\t\t\tdirectionIndex: 0,\n\t\t\tdirection: [3, 0],\n\t\t\tphaserColor: \"green\",\n\t\t\ttorpSound: sounds.kTorpSound,\n\t\t\tbeamSound: sounds.disruptSound,\n\t\t\texplosion: this.explosion,\n\t\t\texplosionImg: this.explosionImg\n\t\t}));\n\n\t\tthis.game.addAI();\n\t};\n\t\n\n\tstart() {\n\t\tthis.bindKeyHandlers();\n\n\t\t// start the animation\n\t\trequestAnimationFrame(this.animate.bind(this));\n\t};\n\n\n\tanimate() {\n\t\tif (!this.pause) {\n\n\t\t\t// if unpaused this steps and draws either the game or the gameOpening\n\t\t\tif (this.gameOpening !== null) this.gameOpening.stepAndDraw(this.ctx);\n\t\t\telse {\n\t\t\t\tif (this.game.enterprise.getHull() === 0) this.game.lose = true;\n\t\t\t\telse if (this.game.enemy.getHull() === 0) this.game.win = true;\n\t\t\t\telse this.game.step();\n\n\t\t\t\tthis.game.draw(this.ctx);\n\t\t\t}\n\n\t\t\t// every call to animate requests causes another call to animate\n\t\t\trequestAnimationFrame(this.animate.bind(this));\n\t\t}\n\t};\n\n\t\n\tbindKeyHandlers() {\n\n\t\tconst MOVES = {\n\t\t\tw: 1,\n\t\t\ts:-1\n\t\t};\n\n\t\tconst that = this;\n\t\t\n\t\tif (this.game.enterprise.getHull() > 0) {\n\t\t\t\n\t\t\tObject.keys(MOVES).forEach(function (k) {\n\t\t\t\tconst move = MOVES[k];\n\t\t\t\tkey(k, function () { that.game.enterprise.power(move); });\n\t\t\t});\n\n\t\t\tkey(\"space\", function () { \n\t\t\t\tthat.game.firePhasers(that.game.enterprise); \n\t\t\t});\n\t\t\t\n\n\t\t\t//call to rotate ship image\n\t\t\tkey(\"a\", function () { that.game.enterprise.changeDirection(-1); });\n\t\t\tkey(\"d\", function () { that.game.enterprise.changeDirection(1); });\n\n\t\t\tkey(\"f\", function () { that.game.fireTorpedos(that.game.enterprise); });\n\t\t\tkey(\"k\", function () { that.game.fireTorpedos(that.game.enterprise); });\n\n\t\t\tkey(\"p\", function () { that.pauseGame(); });\n\t\t}\n\t};\n\n\t\n\tpauseGame() {\n\t\tif (!this.pause) this.pause = true;\n\t\telse { \n\t\t\tthis.pause = false;\n\t\t\trequestAnimationFrame(this.animate.bind(this));\n\t\t}\n\t};\n\n\n\topeningOff() {\n\t\tthis.gameOpening = null;\n\t\tthis.theme.play();\n\t};\n\n\n\tloadExplosionImg() {\n\t\tthis.explosionImg = new Image();\n\t\tthis.explosionImg.onload = () => { return true; }\n\t\tthis.explosionImg.src = './images/explosion-sprite-sheet.png';\n\t};\n\t\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n\tconst canvasEl = document.getElementsByTagName(\"canvas\")[0];\n\tcanvasEl.width = 1200;\n\tcanvasEl.height = 900;\n\tconst ctx = canvasEl.getContext(\"2d\");\n\n\t// sounds\n\tconst audioContext = new AudioContext();\n\tconst gainNode = audioContext.createGain();\n\tgainNode.gain.value = .25;\n\n\tconst phasSound = document.getElementById(\"phaser\");\n\tconst track1 = audioContext.createMediaElementSource(phasSound);\n\ttrack1.connect(gainNode).connect(audioContext.destination);\n\n\tconst disruptSound = document.getElementById(\"disruptor\");\n\tconst track2 = audioContext.createMediaElementSource(disruptSound);\n\ttrack2.connect(gainNode).connect(audioContext.destination);\n\n\tconst torpSound = document.getElementById(\"torpedo\");\n\tconst track3 = audioContext.createMediaElementSource(torpSound);\n\ttrack3.connect(gainNode).connect(audioContext.destination);\n\n\tconst kTorpSound = document.getElementById(\"klingonTorpedo\");\n\tconst track4 = audioContext.createMediaElementSource(kTorpSound);\n\ttrack4.connect(gainNode).connect(audioContext.destination);\n\n\tconst exploSound = document.getElementById(\"explosion\");\n\tconst track5= audioContext.createMediaElementSource(exploSound);\n\ttrack5.connect(gainNode).connect(audioContext.destination);\n\n\tconst theme = document.getElementById(\"theme\");\n\tconst track6 = audioContext.createMediaElementSource(theme);\n\ttrack6.connect(gainNode).connect(audioContext.destination);\n\n\tlet g = new GameView(ctx, canvasEl.width, canvasEl.height, {\n\t\tphasSound, disruptSound,\n\t\tkTorpSound, torpSound,\n\t\texploSound,\n\t\ttheme,\n\t\t}\n\t);\n\n\tg.start(ctx);\n\n\tcanvasEl.addEventListener(\"click\", (event) => {\n\t\tif (g.gameOpening !== null) {\n\t\t\tg.openingOff();\n\t\t\taudioContext.resume().then(() => { return true; });\n\t\t}\n\t\telse{\n\t\t\tconst x = event.pageX;\n\t\t\tconst y = event.pageY;\n\t\t\tconsole.log(x + \",\" + y);\n\t\t\tif (x > 1085 && x < 1112 && y > 46 && y < 71) {\n\t\t\t\tg.game.muteToggle();\n\n\t\t\t\tif (gainNode.gain.value > -.01 && gainNode.gain.value < .01) gainNode.gain.value = .25;\n\t\t\t\telse gainNode.gain.value = 0;\n\t\t\t}\n\t\t\telse if (x > 1085 && x < 1112 && y > 85 && y < 112) g.game.autoPilotToggle();\n\t\t}\n\t});\n});\n\nwindow.addEventListener('keydown', function (e) {\n\tif (e.keyCode == 32 && e.target == document.body) {\n\t\te.preventDefault();\n\t}\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/planet.js":
/*!***********************!*\
  !*** ./src/planet.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const SpaceObject = __webpack_require__(/*! ./space_object */ \"./src/space_object.js\");\n\nclass Planet extends SpaceObject {\n\tconstructor(options) {\n\t\tsuper(options.pos);\n\t\tthis.img = options.img;\n\t\tthis.width = options.width;\n\t\tthis.height = options.height;\n\t\tthis.sheetCoords = options.sheetCoords;\n\t}\n\n\tdraw(ctx) {\n\t\tctx.drawImage(this.img,\n\t\t\tthis.sheetCoords[0], this.sheetCoords[1], this.sheetCoords[2], this.sheetCoords[3],\n\t\t\tthis.pos[0],\n\t\t\tthis.pos[1],\n\t\t\tthis.width,\n\t\t\tthis.height);\n\n\t}\n}\n\nmodule.exports = Planet;\n\n//# sourceURL=webpack:///./src/planet.js?");

/***/ }),

/***/ "./src/shield.js":
/*!***********************!*\
  !*** ./src/shield.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Shield {\n\tconstructor(options) {\n\t\tthis.pos = options.pos;\n\t\tthis.start = options.start;\n\t\tthis.end = options.end;\n\t\tthis.multiplier = options.multiplier\n\n\t\tthis.hitpoints = 100;\n\t\tthis.color = \"#ADD8E6\";\n\t\tthis.timer = 0;\n\t}\n\n\tgetHitpoints() {\n\t\treturn this.hitpoints;\n\t}\n\n\tup() {\n\t\treturn this.hitpoints > 0;\n\t}\n\n\n\tdraw(ctx) {\n\t\tthis.timer++;\n\t\tif (this.timer === 20) {\n\t\t\tthis.timer = 0;\n\t\t\tthis.color = \"#ADD8E6\";\n\t\t}\n\n\t\tlet shieldPercentage = this.hitpoints / 100;\n\n\t\tctx.beginPath();\n\t\tctx.arc(this.pos[0], \n\t\t\tthis.pos[1], \n\t\t\t100, \n\t\t\tthis.start * Math.PI + this.multiplier * Math.PI * (1 - shieldPercentage),\n\t\t\tthis.end * Math.PI - this.multiplier * Math.PI * (1 - shieldPercentage)\n\t\t);\n\t\n\t\tctx.lineWidth = 7;\n\t\tctx.strokeStyle = this.color;\n\t\tctx.stroke();\n\t}\n\n\n\thit(damage) {\n\t\tthis.timer = 1;\n\t\tthis.color = \"red\";\n\n\t\tthis.hitpoints -= damage;\n\t\tif (this.hitpoints < 0) this.hitpoints = 0;\n\t}\n}\n\nmodule.exports = Shield;\n\n//# sourceURL=webpack:///./src/shield.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst SpaceObject = __webpack_require__(/*! ./space_object */ \"./src/space_object.js\");\nconst Torpedo = __webpack_require__(/*! ./torpedo */ \"./src/torpedo.js\");\nconst Utils = __webpack_require__(/*! ./utils */ \"./src/utils.js\");\n\nclass Ship extends SpaceObject{\n\n\tconstructor(options) {\n\t\tsuper(options.pos);\n\n\t\tthis.directionIndex = options.directionIndex;\n\t\tthis.direction = options.direction;\n\t\tthis.phaserColor = options.phaserColor;\n\t\tthis.beamSound = options.beamSound;\n\t\tthis.torpSound = options.torpSound;\n\t\tthis.explosion = options.explosion;\n\t\tthis.explosionImg = options.explosionImg;\n\n\t\tthis.speed = 0;\n\t\tthis.width = 60;\n\t\tthis.height = 30\n\t\tthis.phaserCounter = 0;\n\t\tthis.torpExplosionCounter = 0;\n\t\tthis.shipExplosionCounter = 0;\n\t\t\n\t\tthis.rotationOffset = 0;\n\t\tthis.increment = Math.PI / 18;\n\n\t\tthis.torpedos = [];\n\t\tthis.ssd;\n\n\t\tthis.phaserRecharge = 0;\n\t\tthis.phaserRechargeMax = 180;\n\n\t\tthis.torpedoReload = 0;\n\t\tthis.torpedoReloadMax= 220;\n\n\t\tthis.hullIntegrityMax = 200;\n\t\tthis.hullIntegrity = this.hullIntegrityMax;\n\t}\n\n\t// getter methods\n\tgetDirection() { return this.direction; }\n\tgetSpeed() {\treturn this.speed; }\n\tgetTorpedos() { return this.torpedos; }\n\tgetRotation() { return this.rotationOffset; }\n\tphaserReady() { return this.phaserRecharge === this.phaserRechargeMax; }\n\ttorpedosReady() { return this.torpedoReload === this.torpedoReloadMax; }\n\tgetHull() { return this.hullIntegrity; }\n\n\n\trotateCanvas(ctx) {\n\t\tctx.translate(this.center()[0], this.center()[1]);\n\t\tctx.rotate(this.rotationOffset);\n\t\tctx.translate(-(this.center()[0]), -(this.center()[1]));\n\t};\n\t\n\n\tmove(base_speed_inverse) {\n\t\tthis.pos[0] += (this.direction[0] / base_speed_inverse) * this.speed ;\n\t\tthis.pos[1] -= (this.direction[1] / base_speed_inverse) * this.speed ;\n\t};\n\n\t\n\tdraw(ctx) {\n\n\t\t// draw torpedos if any\n\t\tthis.torpedos.forEach((torpedo) => torpedo.draw(ctx));\n\n\t\t//draw ship systems display\n\t\tthis.ssd.draw(ctx,\n\t\t\tthis.phaserRecharge / this.phaserRechargeMax,\n\t\t\tthis.torpedoReload / this.torpedoReloadMax,\n\t\t\tthis.hullIntegrity / this.hullIntegrityMax\n\t\t);\n\n\t\tif (this.phaserCounter > 0) this.drawPhaser(ctx);\n\n\t\t// recharge weapons\n\t\tif (this.phaserRecharge !== this.phaserRechargeMax) this.phaserRecharge++;\n\t\tif (this.torpedoReload !== this.torpedoReloadMax) this.torpedoReload++;\n\n\t\t//shows torpedo hit\n\t\tif (this.torpExplosionCounter) {\n\t\t\tthis.drawTorpExplosion(ctx);\n\t\t\tthis.torpExplosionCounter++;\n\t\t\tif (this.torpExplosionCounter > 10) this.torpExplosionCounter = 0;\n\t\t}\n\n\t\tif (this.hullIntegrity === 0) this.shipExplosionCounter = this.drawShipExplosion(ctx);\n\t}\n\n\t// draw the phaser fire. The line extends toward the target over phaserDrawMax frames,\n\t// then stays there for a few frames\n\tdrawPhaser(ctx) {\n\n\t\tconst phaserDrawMax = 12;\n\t\tlet xDelta = this.target.center()[0] - this.center()[0];\n\t\tlet yDelta = this.target.center()[1] - this.center()[1];\n\n\t\t// beam should stop if it hits a shield\n\t\tif (this.target.ssd.getShields()[this.target.shieldHit].getHitpoints() > 0) {\n\t\t\tconst distance = Utils.distance(this, this.target);\n\t\t\tconst distanceRatio = (distance-35)/distance\n\t\t\txDelta = xDelta * distanceRatio;\n\t\t\tyDelta = yDelta * distanceRatio;\n\t\t}\n\n\t\tlet ratio = this.phaserCounter/ phaserDrawMax;\n\t\tif (ratio > 1) ratio = 1;\n\n\t\tconst xProgress = ratio * xDelta + this.center()[0];\n\t\tconst yProgress = ratio * yDelta + this.center()[1];\n\n\t\tctx.beginPath();\n\t\tctx.moveTo(this.center()[0], this.center()[1]);\n\t\tctx.lineTo(xProgress, yProgress);\n\t\tctx.strokeStyle = this.phaserColor;\n\t\tctx.lineWidth = 3;\n\t\tctx.stroke();\n\n\t\tthis.phaserCounter++;\n\n\t\tif (this.phaserCounter >= phaserDrawMax) {\n\t\t\tif (this.target.ssd.getShields()[this.target.shieldHit].getHitpoints() > 0) {\n\t\t\t\tthis.target.drawShieldOnHit(ctx, this.target.shieldHit);\n\t\t\t}\n\t\t\telse this.target.drawHullPhaserHit(ctx,this.phaserColor);\n\t\t}\n\n\t\tif (this.phaserCounter > (phaserDrawMax+10)) this.phaserCounter = 0;\n\t};\n\t\n\n\tdrawTorpExplosion(ctx) {\t\n\t\tlet x;\n\t\tlet y;\n\n\t\t// if it hits a shield, it explodes there\n\t\tif (this.ssd.getShields()[this.shieldHit].getHitpoints() > 0) {\n\t\t\tconst xDelta = this.attacker.center()[0] - this.center()[0];\n\t\t\tconst yDelta = this.attacker.center()[1] - this.center()[1];\n\t\t\tconst distance = Utils.distance(this, this.attacker);\n\t\t\tconst percentage = 35 / distance;\n\t\t\tx = this.center()[0] + xDelta * percentage;\n\t\t\ty = this.center()[1] - 8 + yDelta * percentage;\n\n\t\t\tthis.drawShieldOnHit(ctx, this.shieldHit);\n\t\t}\n\t\telse {\n\t\t\tx =\tthis.center()[0];\n\t\t\ty =\tthis.center()[1] - 5;\n\t\t}\n\n\t\tctx.drawImage(this.explosionImg, 606, 295, 100, 100, x, y, 10, 10);\n\t};\n\n\n\tdrawShieldOnHit(ctx, shieldNum){\n\t\tconst startAndEnd = [\n\t\t\t[1.75,  .25],\n\t\t\t[ .25,  .75],\n\t\t\t[ .75, 1.25],\n\t\t\t[1.25, 1.75]\n\t\t];\n\t\t\n\t\tctx.beginPath();\n\t\tctx.arc(\n\t\t\tthis.center()[0],\n\t\t\tthis.center()[1],\n\t\t\t35,\n\t\t\tstartAndEnd[shieldNum][0] * Math.PI + this.rotationOffset,\n\t\t\tstartAndEnd[shieldNum][1] * Math.PI + this.rotationOffset\n\t\t);\n\n\t\tctx.lineWidth = 1;\n\n\t\tctx.strokeStyle = \"#ADD8E6\";\n\t\tctx.stroke();\n\t};\n\t\n\n\tdrawHullPhaserHit(ctx, color) {\n\t\tctx.beginPath();\n\n\t\tctx.arc(this.center()[0], this.center()[1], 8, 0, Math.PI * 2);\n\t\tctx.fillStyle = color;\n\t\tctx.fill();\n\t};\n\n\n\tdrawShipExplosion(ctx) {\n\t\tthis.explosion.draw(ctx, this.center());\n\t};\n\n\n\tpower(impulse) {\n\t\tif (impulse > 0 && this.speed < 3) this.speed += impulse;\n\t\telse if (impulse < 0 && this.speed > -1) this.speed += impulse;\n\t};\n\n\n\tfirePhasers(target) {\n\t\tif (this.phaserRecharge === this.phaserRechargeMax) {\n\t\t\tthis.target = target;\n\t\t\tthis.target.receivePhaserHit(this);\n\t\t\tthis.phaserCounter = 1;\n\n\t\t\tthis.phaserRecharge = 0;\n\t\t\tthis.beamSound.play();\n\t\t}\n\t};\n\n\n\tfireTorpedos(torpImg) {\n\t\tif (this.torpedoReload === this.torpedoReloadMax) {\n\t\t\tthis.torpedos.push(new Torpedo(this.center(), torpImg, this.directionIndex - 1));\n\t\t\tthis.torpedos.push(new Torpedo(this.center(), torpImg, this.directionIndex));\n\t\t\tthis.torpedos.push(new Torpedo(this.center(), torpImg, this.directionIndex + 1));\n\t\t\tthis.torpedoReload = 0;\n\t\t\tthis.torpSound.play();\n\t\t}\n\t}\n\n\n\treceivePhaserHit(attacker) {\n\t\tthis.takeDamage(attacker, 18);\n\t};\n\n\n\treceiveTorpHit(attacker) {\n\t\tthis.takeDamage(attacker, 20);\n\t\tthis.torpExplosionCounter = 1;\n\t};\n\n\n\ttakeDamage(attacker, damage){\n\t\tthis.attacker = attacker;\n\n\t\tthis.whichShieldWasHit(attacker);\n\n\t\tif (this.ssd.getShields()[this.shieldHit].getHitpoints() > 0) {\n\t\t\tthis.ssd.getShields()[this.shieldHit].hit(damage);\n\t\t}\n\t\telse this.hullIntegrity -= damage;\n\n\t\tif (this.hullIntegrity < 0) this.hullIntegrity = 0;\n\t};\n\n\t\n\twhichShieldWasHit(attacker) {\n\t\tconst angle = Utils.angleToOtherShip(this, attacker);\n\n\t\tif (angle <= .25 * Math.PI || angle >= 1.75 * Math.PI) this.shieldHit = 0;\n\t\telse if (angle > .25 * Math.PI && angle < .75 * Math.PI) this.shieldHit = 1;\n\t\telse if (angle >= .75 * Math.PI && angle <= 1.25 * Math.PI) this.shieldHit = 2;\n\t\telse this.shieldHit = 3;\n\t};\n\n\n\tchangeDirection(dir) { \n\t\tthis.rotationOffset += dir*this.increment;\n\t\tif (dir > 0 && this.directionIndex === 35) this.directionIndex = 0;\n\t\telse if (dir < 0 && this.directionIndex === 0) this.directionIndex = 35;\n\t\telse this.directionIndex += dir;\n\n\t\tif (this.rotationOffset > 6.2) this.rotationOffset -= Math.PI *2;\n\t\telse if (this.rotationOffset < -.000000001) this.rotationOffset += Math.PI * 2;\n\n\t\tthis.direction = this.directionArray[this.directionIndex];\n\t};\n\n}\n\nmodule.exports = Ship\n\n\n\n\n//# sourceURL=webpack:///./src/ship.js?");

/***/ }),

/***/ "./src/space_object.js":
/*!*****************************!*\
  !*** ./src/space_object.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nclass SpaceObject {\n\tconstructor(pos) {\n\t\tthis.pos = pos;\n\n\t\tthis.width;\n\t\tthis.height;\n\n\t\t// this array contains all of the directions (36 of them)\n\t\tthis.directionArray = [\n\t\t\t[7, 0],\n\t\t\t[7, -1],\n\t\t\t[7, -2],\n\t\t\t[6, -3],\n\t\t\t[5, -4],\n\t\t\t[4, -5],\n\t\t\t[3, -6],\n\t\t\t[2, -7],\n\t\t\t[1, -7],\n\t\t\t[0, -7],\n\t\t\t[-1, -7],\n\t\t\t[-2, -7],\n\t\t\t[-3, -6],\n\t\t\t[-4, -5],\n\t\t\t[-5, -4],\n\t\t\t[-6, -3],\n\t\t\t[-7, -2],\n\t\t\t[-7, -1],\n\t\t\t[-7, 0],\n\t\t\t[-7, 1],\n\t\t\t[-7, 2],\n\t\t\t[-6, 3],\n\t\t\t[-5, 4],\n\t\t\t[-4, 5],\n\t\t\t[-3, 6],\n\t\t\t[-2, 7],\n\t\t\t[-1, 7],\n\t\t\t[0, 7],\n\t\t\t[1, 7],\n\t\t\t[2, 7],\n\t\t\t[3, 6],\n\t\t\t[4, 5],\n\t\t\t[5, 4],\n\t\t\t[6, 3],\n\t\t\t[7, 2],\n\t\t\t[7, 1]\n\t\t];\n\t};\n\n\t// shifts to account for main ship movement\n\tshift(direction, speed) {\n\t\tthis.pos[0] -= speed * direction[0];\n\t\tthis.pos[1] += speed * direction[1];\n\t};\n\n\tonscreen(canvas_width, canvas_height) {\n\t\tconst center = this.center();\n\t\treturn (center[0] > 0 && center[0] < canvas_width &&\n\t\t\t\t\t\tcenter[1] > 0 && center[1] < canvas_height);\n\t};\n\n\tcenter() {\n\t\treturn [this.pos[0] + this.width / 2, this.pos[1] + this.height / 2];\n\t};\n\n}\n\nmodule.exports = SpaceObject\n\n//# sourceURL=webpack:///./src/space_object.js?");

/***/ }),

/***/ "./src/ssd.js":
/*!********************!*\
  !*** ./src/ssd.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Shield = __webpack_require__(/*! ./shield */ \"./src/shield.js\");\n\n// SSD is the ship's systems display in the corner of the screen\nclass SSD {\n\tconstructor(options) {\n\t\tthis.ssd_x = options.ssd_x;\n\t\tthis.ssd_y = options.ssd_y;\n\t\tthis.ssd_width = options.ssd_width;\n\t\tthis.ssd_height = options.ssd_height;\n\t\tthis.imgCoords = options.imgCoords;\n\t\tthis.beamWeaponName = options.beamWeaponName;\n\t\t\n\t\tthis.loadSSDImg(options.imgName);\n\n\t\tthis.shields = [];\n\t\tthis.raiseShields();\n\t};\n\n\n\tgetShields() {\n\t\treturn this.shields;\n\t};\n\n\n\tdraw(ctx, phaserRechargePercent, torpedoReloadPercent, hullPercentage) {\n\n\t\tctx.drawImage(this.SSDimg, this.imgCoords[0], this.imgCoords[1], this.imgCoords[2], this.imgCoords[3],\n\t\t\tthis.ssd_x,\n\t\t\tthis.ssd_y,\n\t\t\tthis.ssd_width,\n\t\t\tthis.ssd_height);\n\n\t\tctx.beginPath(); \n\t\t\n\t\tthis.drawShields(ctx);\n\t\tctx.lineWidth = 3;\n\n\t\t// draw phaser recharge bar\n\t\tthis.drawRechargeBar(ctx, this.ssd_x - 60, phaserRechargePercent);\n\n\t\t// draw torpedo reload\n\t\tthis.drawRechargeBar(ctx, this.ssd_x + this.ssd_width + 50, torpedoReloadPercent);\n\n\t\tthis.drawHullIntegrity(ctx, hullPercentage);\n\n\t\tthis.drawLabels(ctx);\n\t};\n\n\n\tdrawShields(ctx) {\n\t\tthis.shields.forEach((shield) => shield.draw(ctx))\n\t};\n\n\n\tdrawRechargeBar(ctx, x, percentage) {\n\t\tlet bar_height = this.ssd_height - 6;\n\n\t\tctx.beginPath();\n\t\tctx.rect(x, this.ssd_y, 10, this.ssd_height);\n\t\tctx.strokeStyle = \"grey\";\n\t\tctx.stroke();\n\n\t\tctx.beginPath();\n\t\tif (percentage === 1) ctx.fillStyle = \"green\";\n\t\telse ctx.fillStyle = \"grey\";\n\t\tctx.fillRect(x+3, this.ssd_y + 3 + bar_height*(1-percentage), 4, bar_height*percentage);\n\t};\n\n\n\tdrawHullIntegrity(ctx, hullPercentage) {\n\t\tctx.font = \"18px Arial\";\n\t\tif (hullPercentage >= .85) ctx.fillStyle = \"#FAFAD2\";\n\t\telse if (hullPercentage >= .35) ctx.fillStyle = \"yellow\";\n\t\telse ctx.fillStyle = \"red\";\n\n\t\tctx.fillText(\"Hull Integrity: \" + Math.floor(hullPercentage*100) + \"%\", this.ssd_x-43, this.ssd_y - 30);\n\t};\n\n\n\tdrawLabels(ctx) {\n\t\tctx.font = \"18px Arial\";\n\t\tctx.fillStyle = \"#FAFAD2\";\n\n\t\tlet x_coord;\n\t\tif (this.beamWeaponName === \"Disruptor\") x_coord = this.ssd_x - 93;\n\t\telse x_coord = this.ssd_x - 85;\n\n\t\tctx.fillText(this.beamWeaponName, x_coord, this.ssd_y + 150);\n\t\tctx.fillText(\"Recharge\", this.ssd_x - 95, this.ssd_y + 175);\n\n\t\tctx.fillText(\"Torpedo\", this.ssd_x + this.ssd_width + 20, this.ssd_y + 150);\n\t\tctx.fillText(\"Reload\", this.ssd_x + this.ssd_width + 25, this.ssd_y + 175);\n\t};\n\n\n\t// factory method to create shield objects\n\traiseShields() {\n\t\tconst x = this.ssd_x + this.ssd_width / 2;\n\t\tconst y = this.ssd_y + this.ssd_height / 2\n\n\t\t// forward shield\n\t\tthis.shields.push(new Shield({\n\t\t\tpos: [x, y + 25],\n\t\t\tstart: 1.4,\n\t\t\tend: 1.6,\n\t\t\tmultiplier: .1\n\t\t}));\n\n\t\t// starboard shield\n\t\tthis.shields.push(new Shield({\n\t\t\tpos: [x - 30, y + 5],\n\t\t\tstart: 1.8,\n\t\t\tend: 2.2,\n\t\t\tmultiplier: .2\n\t\t}));\n\n\t\t// rear shield\n\t\tthis.shields.push(new Shield({\n\t\t\tpos: [x, y - 23],\n\t\t\tstart: .4,\n\t\t\tend: .6,\n\t\t\tmultiplier: .1,\n\t\t}));\n\n\t\t// port shield\n\t\tthis.shields.push(new Shield({\n\t\t\tpos: [x + 30, y + 5],\n\t\t\tstart: .8,\n\t\t\tend: 1.2,\n\t\t\tmultiplier: .2\n\t\t}));\n\t};\n\n\n\tloadSSDImg(imgName) {\n\t\tthis.SSDimg = new Image();\n\t\tthis.SSDimg.onload = () => { return true; }\n\t\tthis.SSDimg.src = imgName;\n\t};\n}\n\nmodule.exports = SSD;\n\n//# sourceURL=webpack:///./src/ssd.js?");

/***/ }),

/***/ "./src/star.js":
/*!*********************!*\
  !*** ./src/star.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const SpaceObject = __webpack_require__(/*! ./space_object */ \"./src/space_object.js\");\n\nclass Star extends SpaceObject {\n\tconstructor(options){\n\t\tsuper(options.pos);\n\n\t\tthis.radius = options.radius;\n\t\tthis.hue = options.hue;\n\t\tthis.sat = options.sat;\n\t\tthis.canvas_width = options.canvas_width;\n\t\tthis.canvas_height = options.canvas_height;\n\t};\n\n\tdraw(ctx) {\n\t\tctx.beginPath();\n\t\tctx.arc(this.pos[0], this.pos[1], this.radius, 0, 360);\n\t\tctx.fillStyle = \"hsl(\" + this.hue + \", \" + this.sat + \"%, 88%)\";\n\t\tctx.fill();\n\t};\n\t\n\tshift(direction, speed) {\n\t\tsuper.shift(direction, speed);\n\n\t\tif (this.pos[0] > this.canvas_width) this.pos[0] = 0;\n\t\telse if (this.pos[0] < 0) this.pos[0] = this.canvas_width;\n\n\t\tif (this.pos[1] > this.canvas_height) this.pos[1] = 0;\n\t\telse if (this.pos[1] < 0) this.pos[1] = this.canvas_height;\n\t};\n\n}\n\nmodule.exports = Star;\n\n//# sourceURL=webpack:///./src/star.js?");

/***/ }),

/***/ "./src/torpedo.js":
/*!************************!*\
  !*** ./src/torpedo.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const SpaceObject = __webpack_require__(/*! ./space_object */ \"./src/space_object.js\");\n\nclass Torpedo extends SpaceObject {\n\tconstructor(pos, torpImg, directionIndex) {\n\t\tsuper(pos);\n\n\t\tthis.torpImg = torpImg;\n\t\t\n\t\tif (directionIndex === 36) directionIndex = 0;\n\t\telse if (directionIndex === -1) directionIndex = 35;\n\n\t\tthis.direction = this.directionArray[directionIndex];\n\t\tthis.speed = 3;\n\t\tthis.height = 10;\n\t\tthis.width = 10;\n\t};\n\t\n\t\n\tdraw(ctx) {\n\t\tctx.drawImage(this.torpImg, 0, 0, 44, 46,\n\t\t\tthis.pos[0],\n\t\t\tthis.pos[1],\n\t\t\tthis.width,\n\t\t\tthis.height);\n\t};\n\n\n\tmove() {\n\t\tthis.pos[0] += this.speed * this.direction[0];\n\t\tthis.pos[1] -= this.speed * this.direction[1];\n\t};\n\n};\n\nmodule.exports = Torpedo;\n\n//# sourceURL=webpack:///./src/torpedo.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst Utils = {\n\n\tdistance(obj1, obj2) {\n\t\tlet distance_x = obj1.center()[0] - obj2.center()[0];\n\t\tlet distance_y = obj1.center()[1] - obj2.center()[1];\n\t\treturn Math.sqrt(distance_x * distance_x + distance_y * distance_y);\n\t},\n\n\tangleToOtherShip(ship, otherShip) {\n\t\tconst xDelta = otherShip.center()[0] - ship.center()[0];\n\t\tconst yDelta = otherShip.center()[1] - ship.center()[1];\n\n\t\t// find the angle between the 2 objects\n\t\tconst arcTangent = Math.atan(yDelta / xDelta);\n\t\tif(xDelta < 0) angle = arcTangent + Math.PI;\n\t\telse if(xDelta > 0 && yDelta < 0) angle = arcTangent + Math.PI * 2;\n\t\telse angle = arcTangent;\n\n\t\t// take the rotation of the hit ship into account\n\t\tangle -= ship.getRotation();\n\t\tif (angle < 0) angle += Math.PI * 2;\n\t\treturn angle;\n\t}\n}\n\nmodule.exports = Utils;\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ });