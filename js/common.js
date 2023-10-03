/* //////////////////////////////////////
   Common Scripts

   author  : 1024jp <wolfrosch.com>
   site    : coteditor.com
   target  : all pages
   lastMod : 2021-01
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
//     version: v3.2.0 2020-03

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
		tooltip.open = true
		
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
