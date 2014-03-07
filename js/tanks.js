/**
 * Defines tanks and similar components
 */
define([
	'jquery',
	'crafty',
	'map'
], function($, Crafty,Map) {
	//local config
	var Config = {
		fireKey: 32, //Space Key
		tunnelWidth: Map.grid.tile.width / 2
	}
	Config.maxOffsetFromTunnel = Config.tunnelWidth / 2;
	
	//My Tank
	Crafty.c('MyTank', {
		init: function () {
			var tankComponent = this;
			tankComponent.requires('Tank, Multiway, spr_tank1_s1')
				.multiway(2, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});
		},
	});
	//Tank component
	Crafty.c('Tank', {
		directions: ['up','right','down','left'],
		currentDirection: 'up',
		init: function () {
			var tankComponent = this;
			tankComponent.requires('Block, Canvas, Collision, SpriteAnimation, spr_tank1_s1')
				.attr({
					w: Map.grid.tile.width,
					h: Map.grid.tile.height
				})
				//.multiway(2, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180})				
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
});
