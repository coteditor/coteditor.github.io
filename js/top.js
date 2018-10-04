/* //////////////////////////////////////
   Top Scripts

   author  : 1024jp <wolfrosch.com>
   site    : coteditor.com
   target  : top page
   lastMod : 2018-10
  /////////////////////////////////////// */


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
