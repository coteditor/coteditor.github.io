/* //////////////////////////////////////
   Common Scripts

   author  : 1024jp <wolfrosch.com>
   site    : coteditor.com
   target  : all pages
   lastMod : 2026-11
  /////////////////////////////////////// */


const canHover = window.matchMedia('(hover: hover)').matches;

// fire functions on load
// note: load this script with `defer` so that the document is parsed first
initTooltips();


// Tooltip --------------------------------------------------------------------

function setupTooltip(el, {displaysUrl = true, className} = {}) {
	let tooltip;
	
	// hover
	el.addEventListener('mouseenter', () => {
		const title = el.getAttribute('title');
		const url = el.getAttribute('href');
		
		el.dataset.tooltip = title;
		el.removeAttribute('title');
		
		tooltip = document.createElement('dialog');
		tooltip.setAttribute('role', 'tooltip');
		tooltip.open = true;
		document.body.append(tooltip);
		
		// title
		const html = title.replace(/ \(([^()]+?)\)$/, ' <span>($1)</span>')
		                  .replace(' | ', ' <span>|</span> ');
		tooltip.innerHTML = `<p>${html}</p>`;
		
		// url
		if (url && displaysUrl) {
			tooltip.insertAdjacentHTML('beforeend',
				`<p>${decodeURIComponent(url)}</p>`);
		}
		
		// class
		if (className) {
			tooltip.className = className;
		}
	});
	
	// remove tooltip
	el.addEventListener('mouseleave', () => {
		if (!tooltip) { return; }
		
		tooltip.remove();
		el.setAttribute('title', el.dataset.tooltip);
	});
	
	// set tooltip position
	el.addEventListener('mousemove', (e) => {
		if (!tooltip) { return; }
		
		const windowWidth = window.innerWidth;
		const tooltipWidth = tooltip.clientWidth;
		
		let leftPos;
		if (tooltipWidth < 80) {  // short tip
			leftPos = e.pageX - (tooltipWidth / 2);
		} else if (tooltipWidth + e.pageX > windowWidth - 5) {  // left edge
			leftPos = windowWidth - tooltipWidth - 30;
		} else {
			leftPos = e.pageX - 30;
		}
		
		tooltip.style.top = `${e.pageY - tooltip.clientHeight - 30}px`;
		tooltip.style.left = `${leftPos - 8}px`;
	});
}

// init tooltip
function initTooltips() {
	if (!canHover) { return; }
	
	for (const el of document.querySelectorAll('[title]')) {
		let opt = {};
		if (el.matches('nav a')) {
			opt = {displaysUrl: false};
		} else if (el.matches('[href*="//github.com/"]')) {
			opt = {className: 'github'};
		}
		
		setupTooltip(el, opt);
	}
}
