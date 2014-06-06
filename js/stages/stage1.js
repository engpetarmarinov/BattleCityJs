define([
	'jquery',
	'crafty',
	'components'	
], function($,Crafty,C) {
	var tanks = {
		basic: 18,
		fast: 2
	};
	function init(){
		//the base
		require(['stages/base'], function (base){
			base.init();
		});
		Crafty.e('Block').at(0, 7, 0, -16).place('Bricks',4,2);
		Crafty.e('Block').at(0, 7).place('Steel',2,1);
		
		Crafty.e('Block').at(1, 1).place('Bricks');	
		Crafty.e('Block').at(1, 2).place('Bricks');	
		Crafty.e('Block').at(1, 3).place('Bricks');	
		Crafty.e('Block').at(1, 4).place('Bricks');	
		Crafty.e('Block').at(1, 5).place('Bricks',4,2);
		Crafty.e('Block').at(1, 9, 0, -16).place('Bricks',4,2);
		Crafty.e('Block').at(1, 9).place('Bricks');	
		Crafty.e('Block').at(1, 10).place('Bricks');	
		Crafty.e('Block').at(1, 11).place('Bricks');
		
		Crafty.e('Block').at(2, 7,  0, -16).place('Bricks');
		
		Crafty.e('Block').at(3, 1).place('Bricks');	
		Crafty.e('Block').at(3, 2).place('Bricks');	
		Crafty.e('Block').at(3, 3).place('Bricks');	
		Crafty.e('Block').at(3, 4).place('Bricks');	
		Crafty.e('Block').at(3, 5).place('Bricks',4,2);
		Crafty.e('Block').at(3, 7, 0, -16).place('Bricks');	
		Crafty.e('Block').at(3, 9, 0, -16).place('Bricks',4,2);
		Crafty.e('Block').at(3, 9).place('Bricks');	
		Crafty.e('Block').at(3, 10).place('Bricks');	
		Crafty.e('Block').at(3, 11).place('Bricks');
		
		Crafty.e('Block').at(5, 1).place('Bricks');	
		Crafty.e('Block').at(5, 2).place('Bricks');	
		Crafty.e('Block').at(5, 3).place('Bricks');	
		Crafty.e('Block').at(5, 4).place('Bricks',4,2);	
		Crafty.e('Block').at(5, 6, 0, -16).place('Bricks');
		Crafty.e('Block').at(5, 8, 0, -16).place('Bricks',4,2);
		Crafty.e('Block').at(5, 8).place('Bricks');
		Crafty.e('Block').at(5, 9).place('Bricks');
		Crafty.e('Block').at(5, 10).place('Bricks',4,2);
		
		Crafty.e('Block').at(6, 3).place('Steel');
		Crafty.e('Block').at(6, 8).place('Bricks');
		
		Crafty.e('Block').at(7, 1).place('Bricks');	
		Crafty.e('Block').at(7, 2).place('Bricks');	
		Crafty.e('Block').at(7, 3).place('Bricks');	
		Crafty.e('Block').at(7, 4).place('Bricks',4,2);	
		Crafty.e('Block').at(7, 6, 0, -16).place('Bricks');
		Crafty.e('Block').at(7, 8, 0, -16).place('Bricks',4,2);
		Crafty.e('Block').at(7, 8).place('Bricks');
		Crafty.e('Block').at(7, 9).place('Bricks');
		Crafty.e('Block').at(7, 10).place('Bricks',4,2);
		
		Crafty.e('Block').at(9, 1).place('Bricks');	
		Crafty.e('Block').at(9, 2).place('Bricks');	
		Crafty.e('Block').at(9, 3).place('Bricks');	
		Crafty.e('Block').at(9, 4).place('Bricks');	
		Crafty.e('Block').at(9, 5).place('Bricks',4,2);
		Crafty.e('Block').at(9, 7, 0, -16).place('Bricks');
		Crafty.e('Block').at(9, 9, 0, -16).place('Bricks',4,2);
		Crafty.e('Block').at(9, 9).place('Bricks');	
		Crafty.e('Block').at(9, 10).place('Bricks');	
		Crafty.e('Block').at(9, 11).place('Bricks');
		
		Crafty.e('Block').at(10, 7, 0, -16).place('Bricks');
		
		Crafty.e('Block').at(11, 1).place('Bricks');	
		Crafty.e('Block').at(11, 2).place('Bricks');	
		Crafty.e('Block').at(11, 3).place('Bricks');	
		Crafty.e('Block').at(11, 4).place('Bricks');	
		Crafty.e('Block').at(11, 5).place('Bricks',4,2);
		Crafty.e('Block').at(11, 9, 0, -16).place('Bricks',4,2);
		Crafty.e('Block').at(11, 9).place('Bricks');	
		Crafty.e('Block').at(11, 10).place('Bricks');	
		Crafty.e('Block').at(11, 11).place('Bricks');
		
		Crafty.e('Block').at(12, 7, 0, -16).place('Bricks',4,2);
		Crafty.e('Block').at(12, 7).place('Steel',2,1);		
	}
	return {
		init: init,
		tanks: tanks
	};
});
