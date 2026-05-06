/*
DATE	MGRNO		SA		PG		Desc
1110421 1110164 	Kevin	Kevin	弱掃移動script至js
*/

$(function() {
    var date = new Date;
    localStorage.login_time = date.toDateString();
	
	var _plistUrl = 'https://www.2100t.com.tw/MS2/Install/DocSign.plist'; /*App安裝描述檔的URL*/
	var _version = '1.0.8'; /*欲發布App的版本*/
	var _href = 'itms-services://?action=download-manifest&url=' + encodeURIComponent(_plistUrl);
	$('a.ipa-list').attr('href', _href);
	$('span#version').text(_version);
	
	//alert('href=' + $('a.ipa-list').attr('href'));
});