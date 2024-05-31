<a href="https://shoemker.github.io/picard_maneuver/"><img src="./images/screenshots/Screenshot1.jpg"></a>

<h2>Picard Maneuver Overview</h2>
You are in control of a starship thrust into combat with an enemy. By controlling your speed and direction and firing your phasers and torpedos, you can destroy the other ship. Just watch out because the other ship has it's own weapons.
<br><br>
<h2>Technologies Used</h2>
<ol>
	<li>JavaScript: This game is written entirely in JavaScript.</li>
	<li>Canvas: And rendered with the Canvas element.</li>
	<li>No libraries are used.</li>
</ol>
<br>
<h2>Features</h2>
<ol>
	<li>Option to draw your own ship with cursor and play as that ship if desired.</li>
	<li>Control over main ship (speed, direction, weapons).</li>
	<li>Each ship has a beam weapon which, for the main ship, has a 360 degree firing arc and a spread of 3 torpedos which fire forward from the ship.</li>
	<li>Ship AI for enemies and allies</li>
	<li>Optional autopilot of the main ship if you just want to watch.</li>
	<li>Option to fight against either one cruiser, 2 birds of prey, or fight in a fleet action.</li>
	<li>Screen where scenario is chosen features a detailed, seemingly 3D, model of a solar system with planets, moons, asteroids and a comet. Planets have light and dark sides as they orbit.</li>
	<li>View of the bridge with flashing lights and shaking when ship is hit.</li>
	<li>Visuals for 4 different beam weapons of the 4 ships featured in the game.</li>
	<li>Shields show on hit (until they're down).</li>
	<li>Game music and sound effects.</li>
	<li>Mute and pause options.</li>
	<li>Moving starfield to indicate main ship movement.</li>
	<li>Ship Systems Display (of adjustable size) in corner to indicate shield strength, hull integrity, weapon recharge status and damage to systems. Shield strength is indicated by size of shield. Transparent portrait of ship turns red as ship is damaged to indicate hull integrity.</li>
	<li>When shot through a downed shield, there is a chance to temporarily damage engines, beam weapon, or torpedo weapon. With damaged engines, ship's top speed is reduced. Damaged beam weapon results in weaker, thinner beam. A damaged torpedo system doubles reload time for torpedos.</li>
	<li>When engines, beams, or torpedos are damaged there is a fire on the ship's image with a trail of flame behind the ship. The trail takes into account the shifting of objects to show apparent motion of main ship.</li>
	<li>Small "radar" screen in upper left corner of screen to show positions of offscreen ships</li>
	<li>When facing multiple enemies, a red target symbol appears on the ship that main ship is targeting with its phasors, and a corresponding target appears on the enemy's Ship Systems Display. This is the ship that the 360 degree beam weapon will fire at. Target can be changed by player.</li>
	<li>Arrow appears at edge of screen when main ship's target is offscreen.</li>
	<li>When ships have zero hull integrity there is a visible explosion.</li>
</ol> 
<br>
<a href="https://shoemker.github.io/picard_maneuver/"><img src="./images/screenshots/pm_Screenshot.jpg"></a>
<br>
<br>
<h2>Interesting Code Example 1</h2>
<p>There are cases in which it is necessary to determine the angle to another ship. </p>
<ol>
	<li>When determining which shield is being hit by enemy fire.</li>
	<li>When determining if the enemy ship (or the main ship on autopilot) should fire torpedos.</li>
</ol>
<p>We have a ship (ship1) which is getting fired on by ship2 or is deciding if ship2 is in it's torpedo firing arc. We can find the angle to the other ship by first determing the xDelta or difference in position of the ships in pixels on the x-axis and doing the same for yDelta on the y-axis. </p>
<p>Then we use Math.atan (which is arc tangent or inverse tangent) to get an angle from the two deltas. We may need to add PI or 2*PI to get a full circle of radians. Finally we subtract the ship1's rotation in radians to get the angle relative to ship1.</p>

```
angleToOtherShip(ship, otherShip) {
	const xDelta = otherShip.center()[0] - ship.center()[0];
	const yDelta = otherShip.center()[1] - ship.center()[1];

	// find the angle between the 2 objects
	const arcTangent = Math.atan(yDelta / xDelta);
	if (xDelta < 0) angle = arcTangent + Math.PI;
	else if(xDelta > 0 && yDelta < 0) angle = arcTangent + Math.PI * 2;
	else angle = arcTangent;

	// take the rotation of the hit ship into account
	angle -= ship.getRotation();
	if (angle < 0) angle += Math.PI * 2;
	return angle;
}

```
<br>
<h2>Interesting Code Example 2</h2>
<p>Originally, if you tried to fire weapons or change speed while turning, your turn would stop because the program wouldn't
continue detecting the keydown event that would indicate the turn. The solution was to save keydown and keyup events
to a POJO</p>

```
keyHandler(e) {
	if (e.type == 'keydown') this.game.getKeyMap()[e.key] = true;
	else this.game.getKeyMap()[e.key] = false;	
};
```

<p>Here, keyHandler, a function in the game_view.js class uses the event key as a key in the keyMap POJO from the game.js
class. If the event.type is keydown, the value in the POJO is set to true, and if it's keyup, the value is set to false.</p>
<br>

```
checkKeyMap() {
		if (this.keyMap[" "]) this.firePhasers(this.main);

		if (this.keyMap["t"] && this.turnCounter === 0) this.changeMainTarget();

		if (this.keyMap["f"] || this.keyMap["k"]) this.fireTorpedoes(this.main);

		if ((this.keyMap["w"] || this.keyMap["ArrowUp"]) && this.turnCounter === 0)
			this.main.power(.5);

		if ((this.keyMap["s"] || this.keyMap["ArrowDown"]) && this.turnCounter === 0)
			this.main.power(-.5);

		if (this.keyMap["a"] || this.keyMap["ArrowLeft"]) this.main.changeDirection(-1);

		if (this.keyMap["d"] || this.keyMap["ArrowRight"]) this.main.changeDirection(1);
};
```
<p>checkKeyMap is a function in the game.js class that is called every few frames. If any of the keys
have true values, the associated actions are taken. These true values correspond to keys that are 
currently pressed down, allowing things like firing while turning to be possible. When the keys are
no longer pressed, a keyup event is handled, the value is set to false, and no action is taken for that key. </p>