/* //////////////////////////////////////
   Common Scripts

   author  : 1024jp <wolfrosch.com>
   site    : coteditor.com
   target  : all pages
   require : jQuery
   lastMod : 2016-04
  /////////////////////////////////////// */


var isiPhone = navigator.userAgent.match(/iPhone|iPod/i);
var isRetina = window.devicePixelRatio > 1;


// replace @2x images ---------------------------------------------------------
//     version: v2.0.0 2016-04

if (isRetina && !isiPhone) {
	Array.prototype.forEach.call(document.querySelectorAll('img[srcset]'),
	                             function(img)
	{
		var src = img.getAttribute('srcset').replace(/([^ ]+) 2x/, '$1');
		
		img.setAttribute('src', src);
	});
}


// footnote to title ----------------------------------------------------------
//     version: v2.0.0 2016-04

Array.prototype.forEach.call(document.querySelectorAll('a[href^="#fnote"]'),
                             function(a)
{
	var note = document.querySelector(a.getAttribute('href')).textContent;
	
	a.setAttribute('title', a.textContent + ') ' + note)
	a.removeAttribute('href');
	a.style.cursor = 'help';
});


// Tooltip --------------------------------------------------------------------
//     version: v3.0.0 2016-04

// init tooltip

function toTooltip(el, options) {
	var tooltip;
	var defaults = {
		displaysUrl: true,
		class: false
	};
	var setting = Object.assign(defaults, options);
	
	// hover
	el.addEventListener('mouseover', function() {
		var title = el.getAttribute('title');
		var url = el.getAttribute('href');
		
		el.setAttribute('data-tooltip', title);
		el.removeAttribute('title');
		
		document.querySelector('body').insertAdjacentHTML('beforeend',
			'<dialog role="tooltip"></dialog>');
		tooltip = document.querySelector('body > dialog[role=tooltip]');
		
		// title
		title = title.replace(/ \(([^()]+?)\)$/gi, ' <span>($1)</span>')
		             .replace(' | ', ' <span>|</span> ');
		tooltip.innerHTML = '<p>' + title + '</p>';
		
		// url
		if (url && setting['displaysUrl']) {
			tooltip.insertAdjacentHTML('beforeend',
				'<p>' + decodeURIComponent(url) + '</p>');
		}
		
		// class
		if (setting['class']) {
			tooltip.setAttribute('class', setting['class']);
		}
		
		// fukidashi
		tooltip.insertAdjacentHTML('beforeend',
			'<div role="presentation"></div>');

		// display
		tooltip.style.opacity = '1';
	}, false);
	
	// remove tooltip
	el.addEventListener('mouseout', function() {
		tooltip.parentNode.removeChild(tooltip);
		el.setAttribute('title', el.getAttribute('data-tooltip'));
	}, false);
	
	// set tooltip position
	el.addEventListener('mousemove', function(e) {
		var windowWidth = window.innerWidth;
		var tooltipWidth = tooltip.clientWidth;
		
		var leftPos;
		if (tooltipWidth < 80) {  // short tip
			leftPos = e.pageX - (tooltipWidth / 2);
		} else if (tooltipWidth + e.pageX > windowWidth - 5) {  // left edge
			leftPos = windowWidth - tooltipWidth - 30;
		} else {  // normal
			leftPos = e.pageX - 30;
		}
		
		tooltip.style.top = (e.pageY - tooltip.clientHeight - 30) + 'px';
		tooltip.style.left = (leftPos - 8) + 'px';
		
		// fukidashi position
		tooltip.querySelector('div').style.left = (e.pageX - leftPos) + 'px';
	}, false);
}

// init tooltip
if (!navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
	Array.prototype.forEach.call(document.querySelectorAll('[title]'),
	                             function(el)
	{
		var opt = {};
		if (el.matches('nav a')) {
			opt = {displaysUrl: false};
		} else if (el.matches('.fnote')) {
			opt = {displaysUrl: false, class: 'note'};
		} else if (el.matches('[href*="//twitter.com/"]')) {
			opt = {'class': 'twitter'};
		} else if (el.matches('[href*="//github.com/"]')) {
			opt = {'class': 'github'};
		}
		
		toTooltip(el, opt);
	});
}


// google analytics tracking --------------------------------------------------
//     lastMod: 2014-08

if (location.hostname == 'coteditor.com') {
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	
	ga('create', 'UA-2404158-10', 'coteditor.com');
	ga('require', 'displayfeatures');
	ga('send', 'pageview');
}
