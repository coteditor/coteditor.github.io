/* //////////////////////////////////////
   Top Scripts

   author  : 1024jp <wolfrosch.com>
   site    : coteditor.com
   target  : top page
   require : iQuery, unslider.js
   lastMod : 2015-04
  /////////////////////////////////////// */


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
