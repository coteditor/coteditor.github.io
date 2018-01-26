/* //////////////////////////////////////
   Scripts for Sparkle User Agent

   author  : 1024jp <wolfrosch.com>
   site    : coteditor.com
   target  : all pages
   lastMod : 2018-01
  /////////////////////////////////////// */


if (isLegacySparkle()) {
	document.getElementById('sparkle-note').style.display = "block";
}


function isLegacySparkle() {
	var userAgent = navigator.userAgent;
// 	var userAgent = "CotEditor/3.2.0-beta Sparkle/1.15";  // for test
	
	if (!userAgent.includes("CotEditor")) { return false; }
	
	var versions = userAgent.match(/CotEditor\/([0-9]+)\.([0-9]+)\.([0-9]+)/).slice(1, 4);
	
	// CotEditor has a modern Sparkle on v3.3.0 or later
	if (versions[0] < 3) { return true; }
	if (versions[0] > 3) { return false; }  // modern
	
	return versions[1] < 3;
};
