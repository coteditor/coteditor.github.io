/* //////////////////////////////////////
   Common Scripts

   author  : 1024jp <wolfrosch.com>
   site    : coteditor.github.io
   target  : all pages
   require : iQuery
   lastMod : 2014-03
  /////////////////////////////////////// */


var isiPhone = navigator.userAgent.match(/iPhone|iPod/i);
var isRetina = window.devicePixelRatio > 1;


// replace @2x images ---------------------------------------------------------
//     require: jQuery

jQuery(function ($) {
	if (isRetina && !isiPhone) {
		$('[srcset]').each(function () {
			$(this).attr('src', $(this).attr('srcset').replace(/([^ ]+) 2x/, '$1'));
		});
	}
});


// footnote to title ----------------------------------------------------------
//     version: v1.0 2013-10
//     require: jQuery

jQuery.fn.fnoteTip = function() {
	return this.each(function () {
		var note = $($(this).attr('href')).text();
		
		$(this).attr('title', $(this).text() + ') ' + note)
		       .css('cursor', 'help')
		       .removeAttr('href');
	});
}

// init fnoteTip
jQuery(function ($) {
	$('a[href^="#fnote"]').fnoteTip();
});


// Tooltip --------------------------------------------------------------------
//     version: v2.0.1 2013-10
//     require: jQuery

jQuery.fn.tooltip = function(options) {
	var tooltip;
	var defaults = {
		displayUrl: true,
		class: false
	};
	var setting = $.extend(defaults, options);
	
	return this.hover(function () {
		var title = this.title;
		var url   = this.href;
		
		$(this).attr('data-tooltip', this.title).removeAttr('title');
		$('body').append('<dialog role="tooltip"></dialog>');
		tooltip = $('body > dialog[role=tooltip]');
		
		// title
		title = title.replace(/ \(([^()]+?)\)$/gi, ' <span>($1)</span>')
		             .replace(' | ', ' <span>|</span> ');
		
		tooltip.html('<p>' + title + '</p>');
		
		// url
		if (url && setting['displayUrl']) {
			tooltip.append('<p>' + decodeURIComponent(url) + '</p>');
		}
		
		// class
		if (setting['class']) {
			tooltip.attr('class', setting['class']);
		}
		
		// fukidashi
		tooltip.append('<div role="presentation"></div>');
		
		// display
		tooltip.stop(true, false).delay(400).fadeIn();
		
	// remove tooltip
	}, function () {
		tooltip.remove();
		$(this).attr('title', $(this).attr('data-tooltip'));
	
	// set tooltip position
	}).mousemove(function (e) {
		var offset = $('body').offset();
		var topPos = e.pageY - tooltip.height() - 30;
		var leftPos;

		if        (tooltip.width() < 80) {	// short tip
			leftPos = e.pageX - (tooltip.width() / 2);
		} else if (tooltip.width() + e.pageX < $(window).width() - 5) {  // normal
			leftPos = e.pageX - 30;
		} else {  // left edge
			leftPos = $(window).width() - tooltip.width() - 30;
		}
		tooltip.css({left:leftPos - 8, top:topPos})
			.find('div').css({left:e.pageX - leftPos});  // fukidashi position
	});
}

// init tooltip
jQuery(function ($) {
	if (!navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
		$('[title]').each(function () {
			if ($(this).is('a[type="application/rss+xml"]')) {
				$(this).tooltip({class: 'feed'});
			} else if ($(this).is('nav a')) {
				$(this).tooltip({displayUrl: false});
			} else if ($(this).is('.fnote')) {
				$(this).tooltip({displayUrl: false, class: 'note'});
			} else if ($(this).is('[href*="//twitter.com/"]')) {
				$(this).tooltip({'class': 'twitter'});
			} else if ($(this).is('[href*="//github.com/"]')) {
				$(this).tooltip({'class': 'github'});
			} else {
				$(this).tooltip();
			}
		});
	}
});


// google analytics tracking --------------------------------------------------
//     lastMod: 2014-03

if (location.hostname == 'coteditor.github.io') {
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	
	ga('create', 'UA-2404158-10', 'coteditor.github.io');
	ga('send', 'pageview');
}
