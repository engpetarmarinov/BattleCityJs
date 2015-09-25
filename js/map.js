define([
	'jquery',
	'crafty',
	'components'
], function ($, Crafty, C) {
	var bgcolor = '#000';
	var grid = {
		width: 13,
		height: 13,
		tile: {
			width: 32,
			height: 32
		}
	};

	function loadBots(tanks) {
		for (var i = 0; i < 13; i += 2) {
			Crafty.e('Bot').setDirection('down').at(i, 0);
		}
	}
	function init() {
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
		//TODO: load X level

		//level 1
		var currentStage = 2;
		require(['stages/stage' + currentStage], function (stage) {
			// load bots
			loadBots(stage.tanks);
			// init stage
			stage.init();
		});

	}

	return {
		bgcolor: bgcolor,
		grid: grid,
		width: function () {
			return grid.width * grid.tile.width;
		},
		height: function () {
			return grid.height * grid.tile.height;
		},
		init: init
	};
});
