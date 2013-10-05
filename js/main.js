//Global configs
mapConfig = {
	width: 600,
	height: 600
};


require.config({
	baseUrl: 'js',
	paths: {
		jquery: 'vendor/jquery-2.0.3.min',
		crafty: 'vendor/crafty-min'
	}
});

require(['jquery', 'crafty'], function($, Crafty) {
	$('div').css('border', '1px solid red');

	Crafty.init(mapConfig.width, mapConfig.height);
	Crafty.background('rgb(127,127,127)');

	//Paddles
	Crafty.e("Paddle, 2D, Canvas, Color, Multiway")
		.color('rgb(255,0,0)')
		.attr({x: 20, y: 100, w: 10, h: 100})
		.multiway(4, {W: -90, S: 90});
	Crafty.e("Paddle, 2D, Canvas, Color, Multiway")
		.color('rgb(0,255,0)')
		.attr({x: 580, y: 100, w: 10, h: 100})
		.multiway(4, {UP_ARROW: -90, DOWN_ARROW: 90});

	//Ball
	Crafty.e("2D, Canvas, Color, Collision")
		.color('rgb(0,0,255)')
		.attr({x: mapConfig.width/2, y: mapConfig.height/2, w: 10, h: 10,
				dX: Crafty.math.randomInt(2, 5),
				dY: Crafty.math.randomInt(2, 5)}
		)
		.bind('EnterFrame', function() {
			//hit floor or roof
			if (this.y <= 0 || this.y >= 290)
				this.dY *= -1;

			if (this.x > mapConfig.width) {
				this.x = mapConfig.width/2;
				Crafty("LeftPoints").each(function() {
					this.text(++this.points + " Points")
				});
			}
			if (this.x < 10) {
				this.x = mapConfig.width/2;
				Crafty("RightPoints").each(function() {
					this.text(++this.points + " Points")
				});
			}
			this.x += this.dX;
			this.y += this.dY;
		})
		.onHit('Paddle', function() {
			this.dX *= -1;
		});

	//Score boards
	Crafty.e("LeftPoints, Canvas, 2D, Text")
		.attr({x: 20, y: 20, w: 100, h: 20, points: 0})
		.text("0 Points");
	Crafty.e("RightPoints, Canvas, 2D, Text")
		.attr({x: 515, y: 20, w: 100, h: 20, points: 0})
		.text("0 Points");
});
