define([
	'jquery',
	'crafty',
	'components'
], function($,Crafty,C) {
	var grid = {
		width: 13,
		height: 13,
		tile: {
			width: 32,
			height: 32,
		}
	};
	return {
		grid: grid,
		width: function(){
			return grid.width * grid.tile.width;
		},
		height: function(){
			return grid.height * grid.tile.height;
		}		
	};
});
