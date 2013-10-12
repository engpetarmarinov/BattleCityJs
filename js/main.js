//single entry point
require.config({
	baseUrl: 'js',
	paths: {
		jquery: 'vendor/jquery-2.0.3.min',
		crafty: 'vendor/crafty-min'
	}
});

require(['game'], function(Game) {
	//start the game
	Game.start();
});
