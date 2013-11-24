define([
	'jquery',
	'crafty',
	'components'	
], function($,Crafty,C) {
	function init(){
		Crafty.e('BaseDefence').place('Bricks');
		Crafty.e('Base').at(6, 12);
	}
	return {
		init: init
	};
});