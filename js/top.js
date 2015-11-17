/* //////////////////////////////////////
   Top Scripts

   author  : 1024jp <wolfrosch.com>
   site    : coteditor.com
   target  : top page
   require : iQuery, unslider.js
   lastMod : 2015-11
  /////////////////////////////////////// */


// init slideshow -------------------------------------------------------------
//     require: jQuery, unslider

jQuery(function() {
	$('.slider').unslider({
		delay: 6000
	});
	
	// support swipe asynchronically
	var scripts = [
		'http://stephband.info/jquery.event.move/js/jquery.event.move.js',
		'http://stephband.info/jquery.event.swipe/js/jquery.event.swipe.js'
	];
	$.getScript(scripts[0]);
	$.getScript(scripts[1], function() {
		$('.sliderman').unslider('initSwipe');
	});
});


// Facebook SDK --------------------------------------------------------------

window.fbAsyncInit = function() {
	FB.init({
		appId      : '372238259620880',
		xfbml      : true,
		version    : 'v2.5'
	});
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
