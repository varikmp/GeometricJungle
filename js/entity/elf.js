function Elf(game, spritesheets) 
{
	// the sprite coordinate must be modified
	this.animation = new Animation(spritesheets[0], 118, 128, 4, 0.25, 4, true, 1);
	this.x = 100;
	this.y = 0;
	this.speed = 0;
	this.ctx = game.ctx;
	Entity.call(this, game, 100, 0);
}

Elf.prototype = new Entity();
Elf.prototype.constructor = Elf;

Elf.prototype.update = function() 
{
	// collision
	for (var i = 0; i < this.game.entities.length; i++)
	{
		var entity = this.game.entities[i];
		if (entity !== this && this.collide(entity))
			console.log('colliding...');
	}
	
	this.x += this.game.clockTick * this.speed;
	Entity.prototype.update.call(this);
}

Elf.prototype.draw = function() 
{
	this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}

Elf.prototype.collide = function(other) 
{
	return distance(this, other) < 10;
}