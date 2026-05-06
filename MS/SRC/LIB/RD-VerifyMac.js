/*
DATE	MGRNO		SA		PG		Desc
1110421 1110164 	Kevin	Kevin	弱掃移動script至js
*/

/**
* Add ipad IOS7 Classes
* Allows us to temporariliy try to fix the slight scroll 100% hack.
* http://stackoverflow.com/questions/19012135/ios-7-ipad-safari-landscape-innerheight-outerheight-layout-issue
*/
if (navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i) && !window.navigator.standalone) {
	$('html').addClass('ipad ios7');
}

// 2020.1.15 - 1081132/1090015 Eric, [NCKU] _REAL_Mac support!
function _getURLParameter(paraname) {
	var rslt = decodeURIComponent((new RegExp('[?|&]' + paraname + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	if (typeof rslt !== 'string') {
		return '';
	}
	else {
		return rslt;
	}
}
if (window.location.href.indexOf('docvip.fdat.com.tw')!=-1) {
	window._getURLParameter = _getURLParameter;
}

function _isRealMac() {
	function _isValueTrue(value) {
		var s;
		if (typeof value === 'undefined' || value===null) {
			return false;
		}
		
		if (typeof value==='string') {
			s = value.toLowerCase();
			if (s==='true' || s==='y' || s==='1') {
				return true;
			}
		}
		return false;
	}

	function _isValueFalse(value) {
		var s;
		if (typeof value === 'undefined' || value===null) {
			return false;
		}
		
		if (typeof value==='string') {
			s = value.toLowerCase();
			if (s==='false' || s==='n' || s==='0') {
				return true;
			}
		}
		return false;
	}

	let sParamRealMac = _getURLParameter('RealMac');
	if (_isValueFalse(sParamRealMac)) {
		return false;
	}
	else if (_isValueTrue(sParamRealMac)) {
		let macBrowser = navigator.userAgent.match(/Macintosh/g) ? true : false;
		return macBrowser;
	}
	else {
		if ('realMac' in localStorage && localStorage['realMac'].length) {
			return _isValueTrue(localStorage['realMac']);
		}
		return false;
	}
}

// 2020.1.15 - 1081132/1090015 Eric, 修正MacPC判定及確認機制!
let macBrowser = navigator.userAgent.match(/Macintosh/g) ? true : false;
if (macBrowser) {
	let sParamRealMac = _getURLParameter('RealMac');
	if (sParamRealMac=='' && (typeof localStorage['realMac']=='undefined' || localStorage['realMac']=='')) {
		// userAgent回報為MacPC & 網址參數未設定 & localStorage未設定!
		let rtn = confirm('請確認此裝置是否為MacPC?\r\n\r\n[確定]/[好] => MacPC\r\n[取消] => iPad');
		if (rtn==true) {
			localStorage.realMac = 'true';
			window.realMac = true;
		}
		else {
			window.realMac = false;
			localStorage.realMac= 'false';
		}
	}
	else {
		let _realMac = _isRealMac();
		if (_realMac) {
			window.realMac = true;
			localStorage['realMac'] = 'true';
		}
		else {
			window.realMac = false;
			localStorage['realMac'] = 'false';
		}
	}
}
else {
	window.realMac = false;
}

console.log('window.realMac=' + window.realMac + ', localStorage.realMac=' + localStorage.realMac);

// 2021.2.4 - 1090927 Eric, suppor iPhone landscape screen
//if ((window.location.href.indexOf('docvip.fdat.com.tw')!=-1)) {
	window.SDLMode = false; // Small Device Landscape mode

	if (window.matchMedia("(max-width: 450px) and (orientation:portrait)").matches) {
		window.SDPMode = true;
	}
	else if (window.matchMedia("(max-width: 1000px) and (max-height:450px) and (orientation:landscape)").matches) {
		window.SDLMode = true;
	}
//}