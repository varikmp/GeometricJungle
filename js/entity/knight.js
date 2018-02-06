/** 
 * The Knight class. Represents the Knight character.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * TCSS491 - Winter 2018
 */
 var IDLE = 0;
 var WALK = 1;
 var ATTACK = 2;
 var DEAD = 3;
 
function Knight(game, spritesheets, lane, team) {
	/** Sprite coordinates must be modified if spritesheets are changed! */
	this.animations = spritesheets;
	this.animation = new Animation(spritesheets[WALK], 136, 128, 7, 0.12, 7 , true, 1.1);
	this.speed = 25;
	this.state = WALK;
	this.lane = lane;
	this.team = team;
	this.ctx = game.ctx;
	switch (lane) {
		case 1:
			Entity.call(this, game, 0, 60, 1);
			break;
		case 2:
			Entity.call(this, game, 0, 140, 2);
			break;
		case 3:
			Entity.call(this, game, 0, 220, 3);
			break;
		case 4:
			Entity.call(this, game, 0, 300, 4);
			break;
		case 5:
			Entity.call(this, game, 0, 380, 5);
	}
	
	this.game.manager.getMusic('./sound/pop.mp3').play();
}

Knight.prototype = new Entity();
Knight.prototype.constructor = Knight;

Knight.prototype.update = function() {
	// collision
	for (var i = 0; i < this.game.entities.length; i++) {
		var entity = this.game.entities[i];
		if (entity !== this && this.collide(entity))
			console.log('Knight colliding...');
	}
	
	if (this.x > 300 && this.state !== IDLE) {
		this.idle();
	}
	
	this.x += this.game.clockTick * this.speed;
	Entity.prototype.update.call(this);
}

Knight.prototype.draw = function() {
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Knight.prototype.idle = function() {
	this.animation = new Animation(this.animations[0], 133, 128, 7, 0.13, 7, true, 1.1);
	this.state = IDLE;
	this.speed = 0;
}

Knight.prototype.collide = function(other) {
	return distance(this, other) < 10;
}