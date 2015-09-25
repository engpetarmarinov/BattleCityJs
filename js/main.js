/**
 * Game single entry point
 */
"use strict";
require.config({
	baseUrl: 'js',
	paths: {
		jquery: 'vendor/jquery-2.0.3.min',
		crafty: 'vendor/crafty'
	}
});

require(['game'], function (Game) {
	//start the game
	Game.start();
});
