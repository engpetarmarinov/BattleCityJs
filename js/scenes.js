define([
	'jquery',
	'crafty',
	'map'
], function($,Crafty,Map) {
	var Config = {
		startKey: 32 //Space key
	}
	//Loading Scene
	Crafty.scene('Loading', function() {
		var sceneObject = this;
		console.log('loading scene');
		Crafty.e('2D, Canvas, Text')
			.attr({
				x: Map.grid.tile.width + Map.grid.tile.width/2, 
				y: Map.height()/2
			})
			.text('Press SPACE key to start...')
			.textColor('#FFFFFF')
			.textFont({ size: '24px', weight: 'bold' })
			.unselectable();
		// Crafty loader
		Crafty.load([
			'img/tanks/tank1-s1.png',
			'img/tanks/bullet.png',
			'img/small-explosion.png',
			'img/blocks/brick-wall.png',
			'img/blocks/base.png',
			'img/blocks/steel-wall.png',
			'img/blocks/trees.png'
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
			//bullet explosion
			Crafty.sprite(32, 32, 'img/small-explosion.png', {
				spr_small_explosion: [0, 0]
			},0,0);
			//bricks
			Crafty.sprite(8,8, 'img/blocks/brick-wall.png', {
				spr_bricks: [0,0]
			});
			//trees
			Crafty.sprite(16,16, 'img/blocks/trees.png', {
				spr_trees: [0,0]
			});
			//base
			Crafty.sprite(32,32, 'img/blocks/base.png', {
				spr_base: [0,0]
			});
			//base
			Crafty.sprite(16,16, 'img/blocks/steel-wall.png', {
				spr_steel: [0,0]
			});
		}, function (e) {
			//progress
		}, function (e) {
			//uh oh, error loading
		});		
		this.startGame = function() {
			Crafty.scene('Game');
		};
		this.pressToStart = function (e){
			if(e.keyCode === Config.startKey){
				sceneObject.startGame();				
			}
		}
		this.bind('KeyDown', this.pressToStart);
	}, function() {
		this.unbind('KeyDown', this.pressToStart);
	});
	
	//Game Scene
	Crafty.scene('Game', function() {
		//init the map
		Map.init();
		//Creat tank entity
		Crafty.e('MyTank').at(4, Map.grid.height - 1);
		//Crafty.e('Tank').at(0,0);
	});
	
	return Crafty;
});
