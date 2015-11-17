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
