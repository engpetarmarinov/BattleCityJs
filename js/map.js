define([
	'jquery',
	'crafty',
	'components'	
], function($,Crafty,C) {
	var bgcolor = '#000';
	var grid = {
		width: 13,
		height: 13,
		tile: {
			width: 32,
			height: 32,
		}
	};
	// A 2D array to keep track of all occupied tiles
	var occupied = new Array(grid.width);
	for (var i = 0; i < grid.width; i++) {
	  occupied[i] = new Array(grid.height);
	  for (var y = 0; y < grid.height; y++) {
		occupied[i][y] = false;
	  }
	}
	function init(){
		console.log('init map');
		//borders		
		//left border
		Crafty.e('Borders').attr({
			w: 0,
			h: grid.height * grid.tile.height,
			x: grid.width * grid.tile.width,
			y: 0
		});
		//bottom border
		Crafty.e('Borders').attr({
			w: grid.width * grid.tile.width,
			h: 0,
			x: 0,
			y: grid.height * grid.tile.height
		});
		//right border
		Crafty.e('Borders').attr({
			w: 0,
			h: grid.height * grid.tile.height,
			x: 0,
			y: 0
		});
		//top border
		Crafty.e('Borders').attr({
			w: grid.width * grid.tile.width,
			h: 0,
			x: 0,
			y: 0
		});
		
		//random block of bricks
		var max_bricks = 5;
		for (var x = 0; x < grid.width; x++) {
			for (var y = 0; y < grid.height; y++) {
				if (Math.random() < 0.02 && !occupied[x][y]) {
					Crafty.e('Bricks').at(x, y);
					occupied[x][y]=true;
					if (Crafty('Bricks').length >= max_bricks) {
						return;
					}
				}
			}
		}
	}
	
	return {
		bgcolor: bgcolor,
		grid: grid,
		width: function(){
			return grid.width * grid.tile.width;
		},
		height: function(){
			return grid.height * grid.tile.height;
		},
		init: init
	};
});
