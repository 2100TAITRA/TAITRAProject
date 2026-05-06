/* jshint -W100 */

/*
DATE	MGRNO		SA		PG		Desc
1120824	中興序172	Raymond	Raymond	修正用AKI802文稿編輯開啟的DocView子視窗, 因mobileinit事件處理函式的JS順序在jQM之後, 未能執行必要的初始化行為, 導致popup行為異常的問題
*/

// 1120824 Raymond 中興序172 RD-ViewDoc.js的mobileinit事件處理函式搬到這個新的JS, 這個mobileinit事件處理函式須宣告在jQM載入之前才會被執行到
$(document).on('mobileinit', function () {   
	//$.mobile.loadingMessage = "載入中...";
	$.mobile.pageLoadErrorMessage = "載入網頁失敗！";
	$.mobile.touchOverflowEnabled = true;
	
	// 2013.2.7
	$.mobile.pushStateEnabled = true;

	var isMobile = navigator.userAgent.search(/Mobile/gi) > 0;
	// 2019.12.19 - 1081132 Eric, MacPC support! window.realMac
	// 2019.10.28 - 1080905 Eric, iPad OS 13 quick-fix
	if (!isMobile && !window.realMac) {
		isMobile = navigator.userAgent.search(/Macintosh/gi) > 0;
	}
	$.mobile.selectmenu.prototype.options.nativeMenu = isMobile;
	$.mobile.popup.prototype.options.history = false;
});
