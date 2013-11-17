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
		// Crafty loader
		Crafty.load([
			'img/tanks/tank1-s1.png',
			'img/tanks/bullet.png'
		], function() {
			//when loaded	
			//tank star 1 sprite
			Crafty.sprite(32, 32, 'img/tanks/tank1-s1.png', {
				spr_tank1_s1: [0, 3]
			},0,0);
			//bullet sprite
			Crafty.sprite(8, 8, 'img/tanks/bullet.png', {
				spr_bullet: [0, 0]
			},0,0);
		}, function (e) {
			//progress
		}, function (e) {
			//uh oh, error loading
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
