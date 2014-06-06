define([
	'jquery',
	'crafty',
	'components'
], function($,Crafty,C) {
	var tanks = {
		basic: 14,
		armor: 2,
		fast: 4
	};
	function init(){		
		//the base
		require(['stages/base'], function (base){
			base.init();
		});
		
		Crafty.e('Block').at(0, 4).place('Trees');
		Crafty.e('Block').at(0, 5).place('Trees');
		Crafty.e('Block').at(0, 8).place('Steel');
		
		Crafty.e('Block').at(1, 1).place('Bricks');
		Crafty.e('Block').at(1, 2).place('Bricks');
		Crafty.e('Block').at(1, 5).place('Trees');
		Crafty.e('Block').at(1, 6).place('Bricks');
		Crafty.e('Block').at(1, 8).place('Bricks');
		Crafty.e('Block').at(1, 9).place('Bricks');
		Crafty.e('Block').at(1, 10).place('Bricks');
		Crafty.e('Block').at(1, 11).place('Bricks');
		Crafty.e('Block').at(1, 12).place('Bricks');
		
		Crafty.e('Block').at(2, 6).place('Bricks');
		
		Crafty.e('Block').at(3, 0).place('Steel');
		Crafty.e('Block').at(3, 1).place('Steel');
		Crafty.e('Block').at(3, 3).place('Bricks');
		Crafty.e('Block').at(3, 4).place('Bricks');
		Crafty.e('Block').at(3, 6).place('Bricks');
		Crafty.e('Block').at(3, 7).place('Steel');
		Crafty.e('Block').at(3, 8).place('Steel');
		Crafty.e('Block').at(3, 9).place('Bricks');
		Crafty.e('Block').at(3, 10).place('Bricks');
		Crafty.e('Block').at(3, 12).place('Bricks');
		
		Crafty.e('Block').at(4, 6).place('Trees');
		Crafty.e('Block').at(4, 7).place('Trees');
		
		Crafty.e('Block').at(5, 5).place('Bricks');
		Crafty.e('Block').at(5, 6).place('Trees');
		Crafty.e('Block').at(5, 7).place('Bricks');
		Crafty.e('Block').at(5, 8).place('Bricks');
		Crafty.e('Block').at(5, 9).place('Bricks');
		Crafty.e('Block').at(5, 10).place('Bricks');
		
		Crafty.e('Block').at(6, 2).place('Bricks');
		Crafty.e('Block').at(6, 4).place('Steel');
		Crafty.e('Block').at(6, 6).place('Trees');
		Crafty.e('Block').at(6, 9).place('Bricks');
		Crafty.e('Block').at(6, 9).place('Bricks');
		
		Crafty.e('Block').at(7, 0).place('Steel');
		Crafty.e('Block').at(7, 1).place('Bricks');
		Crafty.e('Block').at(7, 2).place('Bricks');
		Crafty.e('Block').at(7, 6).place('Steel');
		Crafty.e('Block').at(7, 7).place('Bricks');
		Crafty.e('Block').at(7, 8).place('Bricks');
		Crafty.e('Block').at(7, 9).place('Bricks');
		Crafty.e('Block').at(7, 10).place('Bricks');
		
		Crafty.e('Block').at(8, 5).place('Steel');
		
		Crafty.e('Block').at(9, 1).place('Bricks');
		Crafty.e('Block').at(9, 2).place('Bricks');
		Crafty.e('Block').at(9, 3).place('Steel');
		Crafty.e('Block').at(9, 4).place('Bricks');
		Crafty.e('Block').at(9, 7).place('Bricks');
		Crafty.e('Block').at(9, 9).place('Bricks');
		Crafty.e('Block').at(9, 11).place('Bricks');
		Crafty.e('Block').at(9, 12).place('Bricks');
		
		Crafty.e('Block').at(10, 2).place('Steel');
		Crafty.e('Block').at(10, 4).place('Trees');
		Crafty.e('Block').at(10, 5).place('Trees');
		Crafty.e('Block').at(10, 6).place('Trees');
		Crafty.e('Block').at(10, 9).place('Steel');
		Crafty.e('Block').at(10, 12).place('Bricks');
		
		Crafty.e('Block').at(11, 1).place('Bricks');
		Crafty.e('Block').at(11, 2).place('Bricks');
		Crafty.e('Block').at(11, 4).place('Bricks');
		Crafty.e('Block').at(11, 6).place('Bricks');
		Crafty.e('Block').at(11, 7).place('Bricks');
		Crafty.e('Block').at(11, 8).place('Bricks');
		Crafty.e('Block').at(11, 9).place('Bricks');
		Crafty.e('Block').at(11, 11).place('Bricks');
		Crafty.e('Block').at(11, 12).place('Bricks');
		
		Crafty.e('Block').at(12, 4).place('Steel');
	}
	return {
		init: init,
		tanks: tanks
	};
});
