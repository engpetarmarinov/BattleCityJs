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
		},
	});
	//Tank component
	Crafty.c('Tank', {
		init: function() {
			this.requires('Actor, Fourway, Color')
				.attr({
					w: Map.grid.tile.width,
					h: Map.grid.tile.height
				})
				.fourway(3)
				.color('rgb(20, 75, 40)');
		}
	});
	//TODO: extend before returning
	return Crafty;
});
