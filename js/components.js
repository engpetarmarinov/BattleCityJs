/**
 * Defines Crafty components
 */
define([
	'jquery',
	'crafty',
	'map'
], function($, Crafty,Map) {
	var Config = {
		fireKey: 32 //Space
	}
	//Border for the map
	//TODO: maybe a smarter desicion is possible
	Crafty.c('Borders', {
		init: function() {
			this.requires('2D, Canvas, Solid');			
		}
	});
	// The Grid component allows an element to be located on a grid of tiles
	Crafty.c('Grid', {
		init: function() {
			this.attr({
				w: Map.grid.tile.width,
				h: Map.grid.tile.height
			});
		},
		// Locate this entity at the given position on the grid
		at: function(x, y) {
			if (x === undefined && y === undefined) {
				return {x: this.x / Map.grid.tile.width, y: this.y / Game.map_grid.tile.height}
			} else {
				this.attr({x: x * Map.grid.tile.width, y: y * Map.grid.tile.height});
				return this;
			}
		}
	});
	// An "Actor" is an entity that is drawn in 2D on canvas via our logical coordinate grid
	Crafty.c('Actor', {
		init: function() {
			this.requires('2D, Canvas, Grid');
		}
	});
	//Block
	Crafty.c('Bricks', {
		init: function() {
			this.requires('Actor, Color, Solid')
				.color('#fff');
		}
	});
	
	//Tank component
	Crafty.c('Tank', {
		directions: ['up','right','down','left'],
		currentDirection: 'up',
		init: function () {
			var tankComponent = this;
			tankComponent.requires('Actor, Multiway, Collision, SpriteAnimation, spr_tank1_s1')
				.attr({
					w: Map.grid.tile.width,
					h: Map.grid.tile.height
				})
				.multiway(2, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180})				
				.stopOnSolids()
				//setup animation
				.animate('TankMoveUp', 0, 3, 0)
				.animate('TankMoveRight', 0, 0, 0)
				.animate('TankMoveDown', 0, 1, 0)
				.animate('TankMoveLeft', 0, 2, 0);		
			
			// Watch for a change of direction and switch sprites
			tankComponent.bind('NewDirection', function(data) {
				if (data.x > 0) {
					 // start animation
					tankComponent.animate('TankMoveRight',1,-1);
					//set current direction of the tank
					tankComponent.currentDirection = tankComponent.directions[1];
					console.log('move right');
				} else if (data.x < 0) {
					// start animation
					tankComponent.animate('TankMoveLeft',1,-1);
					tankComponent.currentDirection = tankComponent.directions[3];
					console.log('move left');
				} else if (data.y > 0) {
					 // start animation
					tankComponent.animate('TankMoveDown',1,-1);
					tankComponent.currentDirection = tankComponent.directions[2];
					console.log('move down');
				} else if (data.y < 0) {
					 // start animation
					tankComponent.animate('TankMoveUp',1,-1);
					tankComponent.currentDirection = tankComponent.directions[0];
					console.log('move  up');
				} else {
					console.log('stop');
				}
			});
			//bind bullet firing
			Crafty.bind('KeyDown', function (e){
				if(e.keyCode === Config.fireKey){//space
					tankComponent.fire();
				}
			});
		},
		// Registers a stop-movement function to be called when
		//  this entity hits an entity with the "Solid" component
		stopOnSolids: function () {
		  this.onHit('Solid', this.stopMovement);		  
		  return this;
		},
		// Stops the movement
		stopMovement: function () {
		  this._speed = 0;
		  if (this._movement) {
			this.x -= this._movement.x;
			this.y -= this._movement.y;
		  }
		},
		//fire a bullet
		fire: function () {
			Crafty.e('Bullet').fire(this.x,this.y,this.currentDirection);
		}
	});
	//Tank Bullet
	Crafty.c('Bullet', {
		init: function () {
			this.requires('2D, Canvas, Collision, SpriteAnimation, spr_bullet')
			.attr({
				w: 8,
				h: 8
			})
			.explodeOnSolids()
			//setup animation
			.animate('BulletMoveUp', 0, 0, 0)
			.animate('BulletMoveRight', 0, 1, 0)
			.animate('BulletMoveDown', 0, 2, 0)
			.animate('BulletMoveLeft', 0, 3, 0);
		},
		fire: function(x, y, directionString) {
			var bulletComponent = this;
			var offsetX = 0, offsetY = 0;
			var dir;
			if (x === undefined || y === undefined || directionString === undefined) {
				throw 'Bullet function fire: requires x,y and direction params.';
				return false;
			} else {
				if(directionString === 'up'){
					dir = 'n';
					offsetX = Map.grid.tile.width / 2 - bulletComponent.w / 2;
				} else if(directionString === 'right'){
					dir = 'e';
					offsetX = Map.grid.tile.width;
					offsetY =Map.grid.tile.height / 2 - bulletComponent.h / 2;
				} else if(directionString === 'down'){
					dir = 's';
					offsetX = Map.grid.tile.width / 2 - bulletComponent.w / 2;
					offsetY = Map.grid.tile.height;
				} else if(directionString === 'left'){
					dir = 'w';
					offsetY = Map.grid.tile.height / 2 - bulletComponent.h / 2;
				}
				
				//place bullet at position
				bulletComponent.attr({
					x: (x + offsetX), 
					y: (y + offsetY)
				});
				
				// start sprite animation
				bulletComponent.animate('BulletMove'+ directionString.charAt(0).toUpperCase() + directionString.slice(1) ,1,-1);				
				//start moving to direction
				//TODO: better flying of the bullet
				setInterval(function (){
					bulletComponent.move(dir,6);
				}, 20);
				return this;
			}
		},
		explodeOnSolids: function () {
			var bulletComponent = this;
			this.onHit('Bricks', function(obj){
				if(typeof obj[0].obj.destroy === 'function'){
					obj[0].obj.destroy();
					bulletComponent.explode();
				}
			});
			this.onHit('Solid', this.explode);
			return this;
		},
		explode: function (){
			Crafty.e('Explosion').explode(this.x,this.y);
			this.destroy();
		}
	});
	//small explosion
	Crafty.c('Explosion', {
		init: function () {
			this.requires('2D, Canvas, SpriteAnimation, spr_small_explosion')
			.attr({
				w: 32,
				h: 32				
			})
			//setup animation
			.animate('Explode', 0, 0, 0);
		},
		explode: function (x,y) {
			var explosion = this;
			var offsetX = explosion.w / 2 - 4;
			var offsetY = explosion.h / 2 - 4;
			this.attr({
				x: (x - offsetX),
				y: (y - offsetY)
			});
			// start sprite animation
			explosion.animate('Explode' ,1, 1);
			setTimeout(function (){
				explosion.destroy();
			},100);
		}
	});
	//Item to be collected
	Crafty.c('Item', {
		init: function() {
			this.requires('Actor, Color')
					.color('rgb(170, 125, 40)');
		},
		collect: function() {
			this.destroy();
			Crafty.trigger('ItemCollected', this);
		}
	});
	//TODO: extend before returning
	//return Crafty;
});
