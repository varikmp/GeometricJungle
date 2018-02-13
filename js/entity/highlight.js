/** 
 * The Background. This class represents a game background.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford
 * TCSS491 - Winter 2018
 */
function Highlight(game, spritesheet, lane) {
	this.x = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
	this.hlane = lane;
	
	Entity.call(this, game, 0, 0, 0);
	this.draw = function () {
		this.ctx.drawImage(this.spritesheet,this.x, 60 + this.hlane * 80, 960, 80);
	};
	
	this.changeLane = function(lane) {
		this.hlane = lane;
	};
};

Highlight.prototype.update = function () {
};