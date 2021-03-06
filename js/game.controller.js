/** 
 * This file manages keyboard input.
 * 
 * Author(s): Varik Hoang, Peter Bae, Cuong Tran, Logan Stafford 
 * Based on code created by Seth Ladd and edited for use by Chris Marriott.
 * TCSS491 - Winter 2018
 */

var KEY_Q = "KeyQ";
var KEY_W = "KeyW";
var KEY_E = "KeyE";
var KEY_R = "KeyR";
var KEY_T = "KeyT";
var KEY_1 = "Digit1";
var KEY_2 = "Digit2";
var KEY_3 = "Digit3";
var KEY_4 = "Digit4";
var KEY_5 = "Digit5";
var KEY_SPACE = 32;
var LEFT = 0;
var RIGHT = 1;

function Controller(game, manager, animArr, soundArr) {
	this.manager = manager;
	this.game = game;
	this.ctx = null;
	this.unitSelected = false;
	this.laneSelected = false;
	this.selectedLane = 0;
	this.selectedUnit = 0;
	this.highlight;
	this.unitHighlight;
	
	/**
	 * The mapping key
	 */
    this.keymap = {};

    /**
     * The reference of 
     * the controller class
     */
    var that = this;
	
	this.init = function(ctx) {
		this.highlight = new Highlight(game, manager.getAsset("./img/background/highlight.png"), 100); 
		this.unitHighlight = new HighlightUnit(game, manager.getAsset("./img/background/unit.png"));
		this.ctx = ctx;
		game.addEntity(this.highlight);
		game.addEntity(this.unitHighlight);
	}
    
    /**
     * The method hooks the key
     * pressed with the mapping key
     */
    this.keydown = function(event) {	
    	soundArr[MENU_NAVSOUNDS].play();
    	
		if (event.code === KEY_1) {
			that.selectedLane = 1;
			that.highlight.changeLane(1);			
		} else if (event.code === KEY_2) {
			that.selectedLane = 2;
			that.highlight.changeLane(2);
		} else if (event.code === KEY_3) {
			that.selectedLane = 3;
			that.highlight.changeLane(3);
		} else if (event.code === KEY_4) {
			that.selectedLane = 4;
			that.highlight.changeLane(4);
		} else if (event.code === KEY_5) {
			that.selectedLane = 5;
			that.highlight.changeLane(5);
		}
		
		if (event.code === KEY_1 ||
			event.code === KEY_2 ||
			event.code === KEY_3 ||
			event.code === KEY_4 ||
			event.code === KEY_5) {
			
			that.laneSelected = true;
			console.log("lane selected");  
			console.log(that.selectedLane + " Down");
			
			if (that.unitSelected) {
				that.unitSelected = false;
				that.laneSelected = false;
				that.highlight.changeLane(100);
				that.unitHighlight.changeLoc(-100);
				spawnUnit(game, animArr, soundArr, that.selectedLane, that.selectedUnit, 0);
			}
		}
		
		if (event.code === KEY_Q) {
			console.log("Q Down");
			that.selectedUnit = 1;
			that.unitHighlight.changeLoc(0);
		} else if (event.code === KEY_W) {
			console.log("W Down");
			that.selectedUnit = 2;
			that.unitHighlight.changeLoc(1);
		} else if (event.code === KEY_E) {
			console.log("E Down");
			that.selectedUnit = 3;
			that.unitHighlight.changeLoc(2);
		} else if (event.code === KEY_R) {
			console.log("R Down");
			that.selectedUnit = 4;
		} else if (event.code === KEY_T) {
			console.log("T Down");
			that.selectedUnit = 5;
		}
		
		if (event.code === KEY_Q ||
			event.code === KEY_W ||
			event.code === KEY_E ||
			event.code === KEY_R ||
			event.code === KEY_T) {
			
			that.unitSelected = true;
			console.log("unit selected");
			console.log("unit selected");
			
			if (that.laneSelected) {
				that.laneSelected = false;
				that.unitSelected = false;
				that.highlight.changeLane(100);
				that.unitHighlight.changeLoc(-100);
				spawnUnit(game, animArr, soundArr, that.selectedLane, that.selectedUnit, 0);
			}
		}
		
        that.keymap[event.keyCode] = true;
		
		if (that.laneSelected || that.unitSelected) {
			event.preventDefault();
		}
    }
    
    /**
     * The method hooks the key
     * pressed with the mapping key
     */
    this.keyup = function(event) {
        that.keymap[event.keyCode] = false;
        event.preventDefault();
    }
    
	this.mouseclick = function(event) {	
		var eventX = event.pageX;
		var eventY = event.pageY;
		
		if (event.button === MOUSE_RIGHT_CLICK) {
			if ((eventX >= ICON_ELF_POS_START_X && eventX <= ICON_FAIRY_POS_END_X &&
			    eventY >= ICON_POS_START_Y && eventY <= ICON_POS_END_Y) && (game.currentBG != 4 && game.currentBG != 5)) {	
				soundArr[MENU_NAVSOUNDS].play(); // sound on when click at the right position
				if (eventX >= ICON_ELF_POS_START_X && eventX <= ICON_ELF_POS_END_X) {	
					that.selectedUnit = 1;
					that.unitHighlight.changeLoc(0);
				} else if (eventX >= ICON_KNIGHT_POS_START_X && eventX <= ICON_KNIGHT_POS_END_X) {			
					that.selectedUnit = 2;
					that.unitHighlight.changeLoc(1);
				} else if (eventX >= ICON_FAIRY_POS_START_X && eventX <= ICON_FAIRY_POS_END_X) {
					that.selectedUnit = 3;
					that.unitHighlight.changeLoc(2);
				}
				that.unitSelected = true;
			} else if ((eventX > MARGIN_X && eventX < MARGIN_X + HORIZONTAL_LANE_SIZE &&
				eventY >= LANE_1 && eventY < LANE_OFF) && (game.currentBG != 4 && game.currentBG != 5)) {
				soundArr[MENU_NAVSOUNDS].play(); // sound on when click at the right position
				if (eventY >= LANE_1 && eventY < LANE_2) {
					that.selectedLane = 1;
					that.highlight.changeLane(1);
					that.laneSelected = true;
				} else if (eventY >= LANE_2 && eventY < LANE_3) {
					that.selectedLane = 2;
					that.highlight.changeLane(2);
					that.laneSelected = true;
				} else if (eventY >= LANE_3 && eventY < LANE_4) {
					that.selectedLane = 3;
					that.highlight.changeLane(3);
					that.laneSelected = true;
				} else if (eventY >= LANE_4 && eventY < LANE_5) {
					that.selectedLane = 4;
					that.highlight.changeLane(4);
					that.laneSelected = true;
				} else if (eventY >= LANE_5 && eventY < LANE_OFF) {
					that.selectedLane = 5;
					that.highlight.changeLane(5);
					that.laneSelected = true;
				}				
			} else if (eventX >= ICON_MUSIC_TOGGLE_X && eventX < 1440 && eventY >= ICON_MUSIC_TOGGLE_Y && eventY < 810) {
				game.toggleMusic();
				soundArr[MENU_NAVSOUNDS].play();
			} else if ((eventX >= ICON_PLAY_START_X && eventX < ICON_PLAY_END_X && eventY >= ICON_PLAY_START_Y && eventY < ICON_PLAY_END_Y) && (game.currentBG == 4)) {
				game.newGame();
				soundArr[MENU_NAVSOUNDS].play();
			} else if ((eventX >= ICON_PAUSE_START_X && eventX < ICON_PAUSE_END_X && eventY >= ICON_PAUSE_START_Y && eventY < ICON_PAUSE_END_Y) && (game.currentBG == 0 || game.currentBG == 1
					|| game.currentBG == 2)) {
				game.pauseGame();
				soundArr[MENU_NAVSOUNDS].play();
			} else if ((eventX >= ICON_GAME_PAUSED_START_X && eventX < ICON_GAME_PAUSED_END_X && eventY >= ICON_GAME_PAUSED_START_Y && eventY < ICON_GAME_PAUSED_END_Y) && (game.currentBG == 5)) {
				game.pauseGame();
				soundArr[MENU_NAVSOUNDS].play();
			} else if ((eventX >= ICON_HOW_TO_PLAY_START_X && eventX < ICON_HOW_TO_PLAY_END_X && eventY >= ICON_HOW_TO_PLAY_START_Y && eventY < ICON_HOW_TO_PLAY_END_Y) && (game.currentBG == 4)) {
				game.showTutorial();
				soundArr[MENU_NAVSOUNDS].play();
			} else if ((eventX >= ICON_CLOSEHELP_START_X && eventX < ICON_CLOSEHELP_END_X && eventY >= ICON_CLOSEHELP_START_Y && eventY < ICON_CLOSEHELP_END_Y) && (game.currentBG == 6)) {
				game.showTutorial();
				soundArr[MENU_NAVSOUNDS].play();
			} else if ((eventX >= ICON_TRYAGAIN_START_X && eventX < ICON_TRYAGAIN_END_X && eventY >= ICON_TRYAGAIN_START_Y && eventY < ICON_TRYAGAIN_END_Y) && (game.currentBG == 3)) {
				game.start();
				soundArr[MENU_NAVSOUNDS].play();
			}
			
			
			if (that.unitSelected) {
				if (that.laneSelected) {
					that.laneSelected = false;
					spawnUnit(game, animArr, soundArr, that.selectedLane, that.selectedUnit, 0);
					soundArr[MENU_NAVSOUNDS].play();
				}

				that.unitSelected = false;
				that.highlight.changeLane(100);
				that.unitHighlight.changeLoc(-100);
			}
		}
		
		else if (event.button == 2) {
			if (that.laneSelected) {
				that.laneSelected = false;
				that.highlight.changeLane(100);
			}
			if (that.unitSelected) {
				that.unitSelected = false;
				that.unitHighlight.changeLoc(-100);
			}
			if (event.y <= 810 && event.x <= 810) {
				event.preventDefault();
			}
		}

	}
	
    // strictly hook event listener to the methods
	document.addEventListener("keydown", this.keydown, false);
	document.addEventListener("keyup", this.keyup, false);
	document.addEventListener("contextmenu", this.mouseclick, false);
	document.addEventListener("click", this.mouseclick, false);
}