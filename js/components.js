define([
	'jquery',
	'crafty',
	'map'
], function($, Crafty,Map) {

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
				.color('#fff');;
		}
	});
	
	//Tank component
	Crafty.c('Tank', {
		init: function() {
			this.requires('Actor, Multiway, Collision, tank1_s1, SpriteAnimation')
				.attr({
					w: Map.grid.tile.width,
					h: Map.grid.tile.height
				})
				.multiway(2, {UP_ARROW: -90, DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180})				
				.stopOnSolids()
				//setup animation
				//TODO: debug sprite animation
				.animate('TankMoveUp', 0, 0, 2)
				.animate('TankMoveRight', 1, 0, 2)
				.animate('TankMoveDown', 2, 0, 2)
				.animate('TankMoveLeft', 3, 0, 2);
			// Watch for a change of direction and switch sprites
			this.bind('NewDirection', function(data) {
				if (data.x > 0) {
					 // start animation
					this.animate('TankMoveRight',24);
					console.log('move right');
				} else if (data.x < 0) {
					// start animation
					this.animate('TankMoveLeft',24);
					console.log('move left');
				} else if (data.y > 0) {
					 // start animation
					this.animate('TankMoveDown',24);
					console.log('move down');
				} else if (data.y < 0) {
					 // start animation
					this.animate('TankMoveUp',24);
					console.log('move  up');
				} else {
					console.log('stop');
				}
			});
		},
		// Registers a stop-movement function to be called when
		//  this entity hits an entity with the "Solid" component
		stopOnSolids: function() {
		  this.onHit('Solid', this.stopMovement);

		  return this;
		},
		// Stops the movement
		stopMovement: function() {
		  this._speed = 0;
		  if (this._movement) {
			this.x -= this._movement.x;
			this.y -= this._movement.y;
		  }
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
