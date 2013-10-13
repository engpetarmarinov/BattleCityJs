define([
	'jquery',
	'crafty',
	'map'
], function($,Crafty,Map) {
	//Loading Scene
	Crafty.scene('Loading', function() {
		console.log('loading scene');
		Crafty.e('2D, Canvas, Text')
			.attr({
				x: Map.grid.tile.width + Map.grid.tile.width/2, 
				y: Map.height()/2
			})
			.text('Press any key to start...')
			.textColor('#FFFFFF')
			.textFont({ size: '30px', weight: 'bold' })
			.unselectable();
	  // Load our sprite map image
		Crafty.load([
			'img/tanks/tank1-s1.png',
		], function() {
			Crafty.sprite(32, 'img/tanks/tank1-s1.png', {
				tank1_s1: [0, 0]
			},0,0);
		});
		this.startGame = function() {
			Crafty.scene('Game');
		};
		this.bind('KeyDown', this.startGame);
	}, function() {
		this.unbind('KeyDown', this.startGame);
	});
	//Game Scene
	Crafty.scene('Game', function() {
		//init the map
		Map.init();
		//Creat tank entity
		Crafty.e('Tank').at(Map.grid.width/2 -3,Map.grid.height - 1);
	});
	
	return Crafty;
});
