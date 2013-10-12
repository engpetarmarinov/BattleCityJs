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
	}
	var start = function() {
		Crafty.init(mapConfig.width, mapConfig.height);
		Crafty.background('rgb(0,0,0)');
		Crafty.e('Tank').at();
	};
	return {		
		start: start
	};
});
