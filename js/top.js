/* //////////////////////////////////////
   Top Scripts

   author  : 1024jp <wolfrosch.com>
   site    : coteditor.com
   target  : top page
   require : iQuery, unslider.js
   lastMod : 2014-11
  /////////////////////////////////////// */


// download info tooltip -----------------------------------------------------
//     require: jQuery

jQuery(function ($) {
	var infoTip = $('#latest dl');
	
	$('#latest a.download, #latest dl').hover(function(event) {
		infoTip.stop(true, false).fadeIn();
	}, function(event) {
		infoTip.stop(true, false).delay(200).fadeOut();
	});
});


// init slideshow -------------------------------------------------------------
//     require: jQuery, unslider

jQuery(function() {
	$('#screenshots').unslider({
		delay: 6000,
		dots: true,
		fluid: true 
	});
});
