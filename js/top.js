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
	var region = $('#latest');
	var infoTip = region.find('dl');
	
	region.find('a.download, dl').hover(function(event) {
		infoTip.stop(true, false).fadeIn();
	}, function(event) {
		infoTip.stop(true, false).delay(200).fadeOut();
	});
});


// init slideshow -------------------------------------------------------------
//     require: jQuery, unslider

jQuery(function() {
	var region = $('#screenshots');
	var unslider = region.unslider({
		delay: 6000,
		dots: true,
		fluid: true 
	});
	var data = unslider.data('unslider');
	
	region.append('<a class="arrow prev"></a>');
	region.append('<a class="arrow next"></a>');
	
	region.find('.arrow').click(function(event) {
		event.preventDefault();
		
		if ($(this).hasClass('prev')) {
			data.prev();
		} else {
			data.next();
		};
	});
});


// Facebook SDK --------------------------------------------------------------

window.fbAsyncInit = function() {
	FB.init({
		appId      : '372238259620880',
		xfbml      : true,
		version    : 'v2.2'
	});
};

(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
