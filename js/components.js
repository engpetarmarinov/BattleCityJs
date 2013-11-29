/**
 * Defines Crafty components
 */
define([
	'jquery',
	'crafty',
	'map'
], function($, Crafty,Map) {
	var Config = {
		fireKey: 32, //Space Key
		tunnelWidth: Map.grid.tile.width / 2
	}
	Config.maxOffsetFromTunnel = Config.tunnelWidth / 2;
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
		at: function(x, y, offsetX, offsetY) {
			if(offsetX === undefined) offsetX = 0;
			if(offsetY === undefined) offsetY = 0;
			if(x === undefined && y === undefined) {
				return {x: this.x / Map.grid.tile.width + offsetX, y: this.y / Game.map_grid.tile.height + offsetY}
			} else {
				this.attr({x: x * Map.grid.tile.width + offsetX, y: y * Map.grid.tile.height + offsetY});
				return this;
			}
		}
	});
	// Block
	Crafty.c('Block', {
		init: function() {
			this.requires('2D, Grid');
		},
		place: function (type, cols ,rows){
			if(typeof(cols) === 'undefined'){
				if(type === 'Bricks'){
					cols = 4;
				} else {
					cols = 2;
				}
			}
			if(typeof(rows) === 'undefined'){
				if(type === 'Bricks'){
					rows = 4;
				} else {
					rows = 2;
				}
			}
			for(var i = 0; i < rows; i++){
				for(var j = 0; j < cols; j++){
					var blockType = Crafty.e(type);					
					blockType.attr({
						x: this.x + j * blockType.w,
						y: this.y + i * blockType.h
					});
				}
			}
		}
	});
	// BaseDefence
	Crafty.c('BaseDefence', {
		init: function() {
			this.requires('2D, Canvas');
		},
		place: function (type){
			var x = Map.grid.tile.width * 5 + Map.grid.tile.width / 2;
			var y = Map.grid.tile.height * 12 - Map.grid.tile.height / 2 ;
			//left side
			if(type === 'Bricks'){
				cols = 2;
			} else {
				cols = 1;
			}
			if(type === 'Bricks'){
				rows = 6;
			} else {
				rows = 3;
			}
			for(var i = 0; i < rows; i++){
				for(var j = 0; j < cols; j++){
					var blockType = Crafty.e(type);					
					blockType.attr({
						x: x + j * blockType.w,
						y: y + i * blockType.h
					});
				}
			}
			//top
			var x = Map.grid.tile.width * 6;
			var y = Map.grid.tile.height * 12 - Map.grid.tile.height / 2 ;
			if(type === 'Bricks'){
				cols = 4;
			} else {
				cols = 2;
			}
			if(type === 'Bricks'){
				rows = 2;
			} else {
				rows = 1;
			}
			for(var i = 0; i < rows; i++){
				for(var j = 0; j < cols; j++){
					var blockType = Crafty.e(type);					
					blockType.attr({
						x: x + j * blockType.w,
						y: y + i * blockType.h
					});
				}
			}
			//right side
			var x = Map.grid.tile.width * 7;
			var y = Map.grid.tile.height * 12 - Map.grid.tile.height / 2 ;
			if(type === 'Bricks'){
				cols = 2;
			} else {
				cols = 1;
			}
			if(type === 'Bricks'){
				rows = 6;
			} else {
				rows = 3;
			}
			for(var i = 0; i < rows; i++){
				for(var j = 0; j < cols; j++){
					var blockType = Crafty.e(type);					
					blockType.attr({
						x: x + j * blockType.w,
						y: y + i * blockType.h
					});
				}
			}
			
		}
	});
	//Bricks
	Crafty.c('Bricks', {
		init: function() {
			this.requires('2D, Canvas, Solid, SpriteAnimation, spr_bricks');
			this.attr({
				w: 8,
				h: 8
			})
			.animate('Bricks', 0, 0, 0)
			.animate('Bricks',1,-1);
		},
		explode: function (){
			this.destroy();
		}
	});
	//Steel
	Crafty.c('Trees', {
		init: function() {
			this.requires('2D, Canvas, SpriteAnimation, spr_trees');
			this.attr({
				w: 16,
				h: 16
			})
			.animate('Trees', 0, 0, 0)
			.animate('Trees',1,-1);
		}
	});
	//Steel
	Crafty.c('Steel', {
		init: function() {
			this.requires('2D, Canvas, Solid, SpriteAnimation, spr_steel');
			this.attr({
				w: 16,
				h: 16
			})
			.animate('Steel', 0, 0, 0)
			.animate('Steel',1,-1);
		}
	});
	//Tank component
	Crafty.c('Tank', {
		directions: ['up','right','down','left'],
		currentDirection: 'up',
		init: function () {
			var tankComponent = this;
			tankComponent.requires('Block, Canvas, Multiway, Collision, SpriteAnimation, spr_tank1_s1')
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
				tankComponent.easeChangeDirection();
			});
			//bind bullet firing
			Crafty.bind('KeyDown', function (e){
				if(e.keyCode === Config.fireKey){//space
					tankComponent.fire();
				}
			});
		},
		
		easeChangeDirection: function () {
			if (this.currentDirection === 'right' || this.currentDirection === 'left') {
				var mod = this.y % Config.tunnelWidth;
				if (mod < Config.maxOffsetFromTunnel) {
					this.y = this.y - mod;
				} else if (mod > (Config.tunnelWidth - Config.maxOffsetFromTunnel)) {
					this.y = this.y + (Config.tunnelWidth - mod);
				}
			} else if (this.currentDirection === 'down' || this.currentDirection === 'up') {
				var mod = this.x % Config.tunnelWidth;
				if (mod < Config.maxOffsetFromTunnel) {
					this.x = this.x - mod;
				} else if (mod > (Config.tunnelWidth - Config.maxOffsetFromTunnel)) {
					this.x = this.x + (Config.tunnelWidth - mod);
				}
			}
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
			if (x === undefined || y === undefined || directionString === undefined) {
				throw 'Bullet function fire: requires x,y and direction params.';
				return false;
			} else {
				if(directionString === 'up'){
					bulletComponent.dir = 'n';
					offsetX = Map.grid.tile.width / 2 - bulletComponent.w / 2;
				} else if(directionString === 'right'){
					bulletComponent.dir = 'e';
					offsetX = Map.grid.tile.width;
					offsetY =Map.grid.tile.height / 2 - bulletComponent.h / 2;
				} else if(directionString === 'down'){
					bulletComponent.dir = 's';
					offsetX = Map.grid.tile.width / 2 - bulletComponent.w / 2;
					offsetY = Map.grid.tile.height;
				} else if(directionString === 'left'){
					bulletComponent.dir = 'w';
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
					bulletComponent.move(bulletComponent.dir,6);
				}, 20);
				return this;
			}
		},
		explodeOnSolids: function () {
			this.onHit('Solid', this.explode);
			return this;
		},
		explode: function (){
			Crafty.e('Explosion').explode(this.x,this.y,this.dir);
			this.destroy();
		}
	});
	//small explosion
	Crafty.c('Explosion', {
		init: function () {
			this.requires('2D, Canvas, Collision, SpriteAnimation, spr_small_explosion')
			.attr({
				w: 32,
				h: 32
			})
			//setup animation
			.animate('Explode', 0, 0, 0);
		},
		explode: function (x,y,dir) {
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
			//create impact
			Crafty.e('ExplosionImpact').impact(x,y,dir);
		}
	});
	//impact of the explosion
	Crafty.c('ExplosionImpact', {
		init: function () {
			this.requires('2D, Canvas, Collision');
		},
		impact: function (x,y,dir) {
			var impactObject = this;
			var impactWidth = 32;
			var impactHeight = 6;
			//orientation of the impact
			if(dir === 'e' || dir === 'w'){
				this.attr({
					w: impactHeight,
					h: impactWidth
				});
			} else {
				this.attr({
					w: impactWidth,
					h: impactHeight
				});
			}
			this.attr({
				x: (x - impactObject.w/2 + 4),
				y: (y - impactObject.h/2 + 4)
			});
			this.onHit('Solid', function (solidObjs){
				if(solidObjs.length > 0){
					for(var i = 0; i < solidObjs.length; i++){
						if(typeof(solidObjs[i].obj.explode) === 'function'){
							solidObjs[i].obj.explode();
						}
					}
				}
			});
			setTimeout(function(){
				impactObject.destroy();
			}, 100);
		}
	});
	//Item to be collected
	Crafty.c('Item', {
		init: function() {
			this.requires('Block, Color')
					.color('rgb(170, 125, 40)');
		},
		collect: function() {
			this.destroy();
			Crafty.trigger('ItemCollected', this);
		}
	});
	
	//Base
	Crafty.c('Base', {
		init: function() {
			console.log('init base');
			this.requires('2D, Canvas, Grid, Solid, SpriteAnimation, spr_base');
			this.attr({
				w: 32,
				h: 32
			})
			.animate('Base', 0, 0, 0)
			.animate('BaseHit', 0, 1, 0)
			.animate('Base',1,-1);
		},
		explode: function (){
			this.animate('BaseHit',1,-1);
			//TODO: game over
		}
	});
	//TODO: extend before returning
	//return Crafty;
});
