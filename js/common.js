/* //////////////////////////////////////
   Common Scripts

   author  : 1024jp <wolfrosch.com>
   site    : coteditor.com
   target  : all pages
   lastMod : 2020-03
  /////////////////////////////////////// */


const isTouchDevice = ('ontouchstart' in window || navigator.maxTouchPoints);


// fire functions on load
if (document.readyState === 'interactive' ||
    document.readyState === 'complete')
{
  didLoadPage();
} else {
    document.addEventListener('DOMContentLoaded', didLoadPage);
}

function didLoadPage() {
	initTooltips();
}


// Tooltip --------------------------------------------------------------------
//     version: v3.1.0 2016-04

function setupTooltip(el, options) {
	const defaults = {
		displaysUrl: true,
		class: false
	};
	const setting = Object.assign(defaults, options);
	
	var tooltip;
	
	// hover
	el.addEventListener('mouseover', function() {
		var title = el.getAttribute('title');
		var url = el.getAttribute('href');
		
		el.setAttribute('data-tooltip', title);
		el.removeAttribute('title');
		
		document.body.insertAdjacentHTML('beforeend',
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

		// fade-in (on the next loop)
		setTimeout(function() {
			tooltip.style.opacity = '1';
		}, 0)
	});
	
	// remove tooltip
	el.addEventListener('mouseout', function() {
		tooltip.parentNode.removeChild(tooltip);
		el.setAttribute('title', el.getAttribute('data-tooltip'));
	});
	
	// set tooltip position
	el.addEventListener('mousemove', function(e) {
		const windowWidth = window.innerWidth;
		const tooltipWidth = tooltip.clientWidth;
		
		var leftPos;
		if (tooltipWidth < 80) {  // short tip
			leftPos = e.pageX - (tooltipWidth / 2);
		} else if (tooltipWidth + e.pageX > windowWidth - 5) {  // left edge
			leftPos = windowWidth - tooltipWidth - 30;
		} else {
			leftPos = e.pageX - 30;
		}
		
		tooltip.style.top = (e.pageY - tooltip.clientHeight - 30) + 'px';
		tooltip.style.left = (leftPos - 8) + 'px';
		
		// fukidashi position
		tooltip.querySelector('div').style.left = (e.pageX - leftPos) + 'px';
	});
}

// init tooltip
function initTooltips() {
	if (isTouchDevice) { return; }
	
	Array.prototype.forEach.call(document.querySelectorAll('[title]'), function(el)
	{
		var opt = {};
		if (el.matches('nav a')) {
			opt = {displaysUrl: false};
		} else if (el.matches('[href*="//twitter.com/"]')) {
			opt = {'class': 'twitter'};
		} else if (el.matches('[href*="//github.com/"]')) {
			opt = {'class': 'github'};
		}
		
		setupTooltip(el, opt);
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
