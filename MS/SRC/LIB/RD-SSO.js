/* jshint -W100 */
/* 2021.4 - 1100333, Eric Peng - 此JS檔由修正後的登入網頁(SSO.html)使用 */
/*
DATE	MGRNO		SA		PG		Desc
1061211 1061116     Kevin   Kevin   切回首頁時更新公告以及公布欄以及跑馬燈
1061024 1060967		Eric 	Eric 	視窗縮放後部份欄位寬度不足問題修改.
1061023 1060634     Kevin   Kevin   調整介接訊息由首頁處理
1060914 1060802		Eric	Eric	關閉待辦事項側桌, 下次再開啟時應維持原顯示模式(列表/圖示)
1060712 1060576		Eric	Eric	由公文檢索開啟線上簽核公文, 於檢索側屜半開時關閉會造成系統異常問題修正
1060712 1060517     Eric	Eric    MP圖示清單模式, 以滑鼠左鍵點擊文號無法開啟公文問題.
1060502      		Eric	Eric    (1)側屜切換(全<->半開)修改.
									(2)iScroll升級至v5.2.0
1060502      		Eric	Eric    美工套用修改.
1060425 1060194     Kevin   Kevin   修正在清單模式切換資料夾後，切換回側屜時未清除原資料夾公文
1060421 1060272     Eric	Eric    傳送對象設定子視窗第2次開啟時, 異動別與傳送選單連動失效問題修正.
									登入布幕resize視窗時顯示異常問題修正.
1060329 1050087     Kevin   Kevin   重複登入處理
1060321             Kevin   Kevin   美工新增側邊抽屜
1060302				Kevin	Kevin	若重複開啟首頁，第二個首頁會把第一個首頁登出修正
1051005             Kevin   Kevin   首頁取得系統公告、公布欄
1050906 			Eric    Eric    重取待辦後仍應顯示原檢視文件夾項目
1060831 			Eric	Eric  	[條列模式]新增待辦, 若不在既有文件夾清單內, 公文夾選項未加入新的文件夾項目問題
1050824 			Eric    Eric    IE11 reload後圖示清單顯示異常問題
1050822 			Eric    Eric    追查IE11登入後耗時長問題(add time stamp log...)
1050819	   		    Eric	Eric	依AOL/UniView開啟狀態, 決定ToDoList/公文檢索項目點擊後開啟公文程序.
                                    實作叫用AOL開啟參照公文功能
                                    叫用AOL/UniView開啟公文唯讀檢閱功能
1060817	1060740		Leslie	Leslie	增加檢查關閉視窗前，是否有公文仍為開啟中，若有，則寫出ExceptionLog
1060928				Raymond	Raymond	登出前檢查若有開啟中的參照公文則清除之
1070202	1070116		Raymond	Raymond	開啟參照公文前檢查是否為紙本簽核, 是則不可開啟並提示訊息
1080624	1070831		Leslie	Leslie	[Merge 1070831]配合滲透測試修改，登入後直接把Artifact寫入Cookie
1080917 1080339     Kevin   Eric    [jQuery 3.0 upgrade]將全部 .click/.change(fn) sortcut 改成 .on('click'|'change' , fn)
									.bind/.unbind => .on/.off; $.type => SSOUtil.typeOf
1090306	1081088		Leslie	Leslie	配合Log新增相關功能，增加於登入時取得環境變數以設定是否啟用上傳Log功能
1091015	1090719		Leslie	Leslie	新增客製化登出函式
1091127 1090786		Eric	Eric	新增log以追查公文傳送/關閉後待辦清單頁未拉出問題.
1091231 1090722		Kevin	Kevin	額外確認SR註冊狀態
1100203 1090722		Kevin	Kevin	新增於切換頁面時重新檢核SR連線狀態
1100226				Leslie	Leslie	增修登出時註銷使用者權杖，以避免TB之Email於不登入模式下，會誤用無效的權杖
1100420 1100333     Eric    Eric    修改以符合修正後的登入網頁(SSO.html)使用
1100519 1100093 	Eric	Eric 	(1) 彙併辦母文傳送時一併封裝子文功能實作. (2)[驗測用]外機關陳核會稿功能實作!
1100930	1101215		Leslie	Leslie	配合首頁分離後網址列異動，整合登入時增加註記欄位以供程式區別
1110421 1110164 	Kevin	Kevin	弱掃移動script至js
1110816	1110787		Leslie	Leslie	增修彰師大客製化功能
1130809	1130313		Raymond	Raymond	合併1111007(1100394), 修正預設智慧卡登入時, 離線版無法登入的問題
1140610	1131183		Leslie	Leslie	[Merge]新增行動自然人憑證模組[1110117]
*/

/*測試用項目
 *var _logoned = false;
 *var _standalone = false;
 */
// 2020.6.15 - Eric, rename: noneJQuery -> tdlUseJSON
window.tdlUseJSON = true; // 2016.10.30 - 登記桌performance issue

var _disableFastInit = false; // 2016.11.1 - load SSO tracing...

var _debug = false;
var _debugTime = true; // 2016.8.22 - 測試登入時間
var _debugSubmit = false; // 2016.7 - Eric, added for submit develope trace...

var home_page_create_event_handled = false; // for debug only...
var _dbgPageInitLog = ''; // 測試用, 頁面初始化log字串.

// todolist_icon mode...
var _folderCnt = 0; // Demo內容folder數
var todolist_icon_folder_w = 256; // 單一folder佔用寬度(pixels)

// web browser 相關資訊
var SysObj = function() {
	"use strict";
	var vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
					(/firefox/i).test(navigator.userAgent) ? 'Moz' :
						'opera' in window ? 'O' : '',
		hasTouch = 'ontouchstart' in window;
		
	this.vender = vendor;
	this.hasTouch = hasTouch;
};

var sysObj = new SysObj();

// 2021.4.19 - 1100333 Eric, 刪減_postLoginProcess
//function _postLoginProcess(SAMLart, registerIP, pincode) {

//
// jQM's 'mobileinit' event handler
//
$(document).on('mobileinit', function () {   
    //$.mobile.loadingMessage = "載入中...";
    $.mobile.pageLoadErrorMessage = "載入網頁失敗！";
	$.mobile.touchOverflowEnabled = true;
	
	// 2013.2.7
	$.mobile.pushStateEnabled = true;

	var isMobile = navigator.userAgent.search(/Mobile/gi) > 0;
	// 2019.12.19 - 1081132 Eric, MacPC support! window.realMac
	// 2019.10.17 - 1080905 Eric, iPadOS 13 quick-fix
	if (!isMobile && !window.realMac) {
		isMobile = navigator.userAgent.search(/Macintosh/gi) > 0;
	}
	$.mobile.selectmenu.prototype.options.nativeMenu = isMobile;
	$.mobile.popup.prototype.options.history = false;
});

function getLocation() {
    alert("location=" + location.hash + ", pageLoadErrorMessage=" + $.mobile.pageLoadErrorMessage);
}

//1110421 Kevin 1110164 弱掃移動script至js Start
var _standalone = false;
var _useDEVAWS = false;
var _use2013ItemOnly = true;
var _testSignalR = true;
var _enableSignalRLog = true;
//var _standalone = true;

// debug alert enable/disable
theSSO._showDebugAlert = false;
theSSO._showSubmitAlert = false;

// 2019.7 - 1080654 Eric, time log
if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
	window.tmAfterFolioViewBEGIN = 0;
	window.tmBeginReloadAOL = 0;
	window.tmBeginFolioModelInit = 0;
	window.tmBeginNewFolioView = 0;
	window.tmBeginApplyPrintXSL = 0;
	window.tmBeginDownloadDraft = 0;
	window.tmBeginBuildNextOptions = 0;
	window.tmBeginOpenDoc = 0;
	window.tmBeginOpenDoc2 = 0;
	window.tmBeginOpenDoc3 = 0;
	window.tmBeginIconOpenDoc = 0;
	window.tmBeginOpenDocWithAOL = 0;
	window.tmBeginSubmit = 0;
	window.tmEndSubmit = 0;
	window.tmBeginSubmitAndOpenNext = 0;
	window.tmBeginSubmitAndOpenNext2 = 0;
	window.tmBeginSubmitStage2 = 0;
	window.tmBeginAcqDM = 0;
	window.tmBeginDLTmpl = 0;
	window.tmBeginPageRender = 0;
	window.tmBeginLogin = 0;
	window.tmBeginPostLogon = 0;
	window.tmGetPIN = 0;
	window.tmAfterGetPIN = 0;
	window.tmBeginSignDocWithSCard = 0;
	window.tmBeginEndSubmit = 0;
	window.tmBeginClearDoc = 0;
}
//1110421 Kevin 1110164 弱掃移動script至js End

/*
function _getSubPageIndex(btnId) {
	var pageIdx = '';
	if (_subPageInfo.length) {
		for(pageIdx in _subPageInfo) {
			if (_subPageInfo.hasOwnProperty(pageIdx)) {
				var page = _subPageInfo[pageIdx];
				if (page.btnId==btnId) {
					return parseInt(pageIdx);
				}
			}
		}
	}
	return -1;
}

function slideupTransitionEnd(event) {
	theLogger.debug("slideupTransitionEnd, event=" + event.type);
	
	// 取得#mainPageContainer之高度
	var total_h = $("#mainPageContainer").outerHeight(false);
	event.target.style.top = (0 - total_h) + "px";
	if (typeof event.target.style.transform !== 'undefined') {
        event.target.style.transform = "";
    }
	else if (typeof event.target.style.msTransform !== 'undefined') {
        event.target.style.msTransform = "";
    }
	else if (typeof event.target.style.webkitTransform !== 'undefined') {
        event.target.style.webkitTransform = "";
    }
	
	$(this).off("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", arguments.callee);
}

function slidedownTransitionEnd(event) {
	theLogger.debug("slidedownTransitionEnd, event=" + event.type);
	event.target.style.top = "0px";
	
	if (typeof event.target.style.transform !== 'undefined') {
        event.target.style.transform = "";
    }
	else if (typeof event.target.style.msTransform !== 'undefined') {
        event.target.style.msTransform = "";
    }
	else if (typeof event.target.style.webkitTransform !== 'undefined') {
        event.target.style.webkitTransform = "";
    }
	
	$(this).off("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", arguments.callee);
}*/

/* 2021.4.19 - 1100333 Eric, 刪減 _bindTopToolBarButtons()*/
// function _bindTopToolBarButtons() {
	
/*
 * jQuery's ready() call back function
 * --- 主頁DOM loaded, ready ---
 */
// 2019.10.21 - 1080339 Eric, jquery 3.0 upgrade
//$(document).ready(function() {
$(function() {
	//var url = window.location.href;
	
	// 2013.11 - IE 不支援 window.location.origin, 在此處設定之!
	if (!window.location.origin) {
		window.location.origin = window.location.protocol + "//" +
			window.location.hostname + (window.location.port ? ':' +
			window.location.port: '');
	}

	// 2021.2.22 - Eric, for jQ3
	$(window).on('load', function() { 
		// 2021.2.22 - 1090927 Eric, iPhone 直式螢幕顯示不支援訊息.
		if (!window.SDPMode) {
			$('#login #in_userid').trigger('focus'); // 2021.2.22 - Eric, for jQ3
		}

		 // 2021.2.22 - 1090927 Eric, iPhone 直式螢幕顯示不支援訊息.
		 if (window.SDPMode) {
			$('#SDPMode_curtain').addClass('sd_portrait_mode');
			$('div.ui-page').addClass('sd_portrait_mode');
		 }

		 if (window.SDPMode || window.SDLModed) {
			window.SDW_width = window.innerWidth;
			window.SDW_height = window.innerHeight;
		 }
	});
		
	_dbgPageInitLog += 'document.ready event.\r\n';
		
	//theSSO.MP.PreviewCtrl.init("#mpContainer #eDocPreviewPane");
	
	// 2016.5
	//$(document).on('pageload', function(event, ui) {
	$(document).on('pagecontainercreate', function(event, ui) {
		_dbgPageInitLog += 'body - pagecontainercreate event.\r\n';
	});
	
	// 2020.6.16 - 1090452 Eric, iPad Air (@iPad OS 13.x) orientationchange event, with wrong width data.
	function _onSSOOrientationChange(orient, event) {
		theLogger.debug('_onSSOOrientationChange invoked..., orient=' + orient);

		function _getScreenMode(innerWidth, innerHeight, orient) {
			// 2020.6.12 - CDC 1090452, ToDo: (1) iPad OS 13.X Portrait回報width異常, (2)新版iPad/iPad Air/iPad Pro之尺寸待驗證.
			// legacy iPad/iPad mini: 1024 x 768
			// iPad 10.2: 1080 x 810 (2160x1620)
			// iPad Pro 10.5: 1112 x 834 (2224x1668)
			// iPad Air 10.5: 1112 x 834 (2224x1668)
			// iPad Pro 11:  1194 x 834 (2388x1668)
			// iPad Pro 12.9: 1366 * 1024 (2731x2160)
			var screenMode = [
				{ id:1, name:'iPad_LandScape', width:1024, height:672, orient:orient }, 
				{ id:2, name:'iPad_Portrait', width:768, height:928, orient:orient },
				{ id:3, name:'iPadPro_LandScape', width:1366, height:928, orient:orient },
				{ id:4, name:'iPadPro_Portrait', width:1024, height:1270, orient:orient } ];
			
			var diffX, diffY;
			var diff = 0, diffLeast = -1;
			var selectMode = screenMode[0];
			var len = screenMode.length;
			for (var i=0; i<len; i++) {
				diffX = Math.abs(innerWidth-screenMode[i].width);
				diffY = Math.abs(innerHeight-screenMode[i].height);
				if (diffX!==0 || diffY!==0) {
					diff = Math.sqrt(diffX*diffX + diffY*diffY);
				}
				else {
					diff = 0;
				}
				
				//diffs[i] = diff;
				if (diffLeast<0) {
					diffLeast = diff;
					selectMode = screenMode[i];
				}
				else if (diffLeast>diff) {
					diffLeast = diff;
					selectMode = screenMode[i];
				}
			}
			return selectMode;
		}
		
		function changePos_Login(screenMode, $inputPanel) {
			// 2020.6.12 - 1090452 Eric, 移除此段以解決登入之輸入panel位移問題!
			console.log('-I- changePos_Login() do nothing...');
			return;

			/*var id = screenMode ? screenMode.id : 1;
			switch (id) {
			case 1: //$inputPanel.css({marginTop:'260px'});
			  break;
			case 2: $inputPanel.css({marginTop:'180px'}); break;
			case 3: $inputPanel.css({marginTop:'390px'}); break;
			case 4: $inputPanel.css({marginTop:'262px'}); break;
			}*/
		}
		/* 1. div#home
		 *      div#home_header (標題列)
		 *         => css with media query
		 *      div#mainContent
		 *        div#mainPageContainer (h=?)
		 *        	div#startContainer (h=?, top=?)   => 目前不顯示
		 *        	div#mpContainer (h=?, w=?)
		 *        	  div#mpDesktop
		 *        	    div#eDocPreviewPane (線上公文預覽窗格)
		 *        	  div#todolistContainer
		 *          	div#tdlPane (w=?)
		 *            		div#tdlPane_dummy1
		 *             		  div#listPane
		 *                		div.fullViewContent (條列項目待辦)
		 *                  		... div.folioList (h=?,  單行待辦高度)
		 *                    div#sidePane
		 *                		div.searchViewContent (h=?, 預覽公文時右方待辦清單)
		 *              	  div#iconPane (圖示項目待辦)
		 *                		div#todolist_icon_cntr (w=?)
		 *                  		ul.folderList (w=?)
		 *                    			li
		 *                       		... div.folioList (h=?)
		 *        div#billboard (h=?, top=?) => 目前不顯示
		 * 2. div#login w=?, h=? (login布幕, 捲動動畫的y軸捲動量=?)
		 */
		 
		 var window_h = window.innerHeight;
		 var window_w = window.innerWidth;

		 // 2019.11.1 - 1080927 Eric, 配合iPad 回桌面再次開啟時, 會發出異常orientation change event問題修正!
		 if (window.iOS_device && 
			 (window_h>window_w && orient=='landscape') || (window_w>window_h && orient=='portrait')) {
			return;
		 }
		 
		 /* 若目前顯示視窗為AOL, 則h_header為hidden, 計算結果會是'0' */
		 var h_header = $('#home_header').height();
		 if (h_header===0) {
            return false;
         }
		 
		 if (h_header!==0) { 
			var screenMode = _getScreenMode(window_w, window_h, orient);
						
			/* Login 布幕 */
			var $login = $('div#login');
			var $inputPanel = $('div#login div.input_panel'); /* input panel */

			// 2020.6.16 - 1090452 Eric, 移除此段以解決登入之輸入panel位移問題!
			//$login.width(window_w);
			//$login.height(window_h);

			changePos_Login(screenMode, $inputPanel);
			
			/* 標題列調整 */
			/* using css media qurey */
			
			$('#mainPageContainer').css({height:''+(window_h-h_header)+'px'});
			//1060321 Kevin 美工新增側邊抽屜
			$('#imgDownDrawer').css({height:''+(window_h-h_header)+'px'});
			
			/* 決定是否update各待辦UI之顯示layout (依各UI之待辦項目數量是否為0判定)
			 * combine value of following: 1: icon todo, 2: list todo, 4: search todo (with preview pane)
			*/
			var UIUpdateFlag = theSSO.MP.todolist.builder.getContainerUIUpdateFlag();
			
			/* 公文預覽模式左方窗格 */
			var $searchViewFolder = $('#sidePane .searchViewContent .searchView_Folder');
			if (UIUpdateFlag & 4) {
				var margin_top = 15;
				var searchListView_h = window_h - h_header;
			
				var $searchWrapper = $('#sidePane .searchViewContent .search-wrapper');
				var $searchFilter = $searchWrapper.find('form');
				
				var searchFolder_h = $searchViewFolder.height();  // 文件夾清單控制項高度
				var searchFilter_h = $searchFilter.height();	// 文件夾內容篩選文字控制項高度
				var searchList_h = searchListView_h - searchFolder_h - searchFilter_h - margin_top;
				$('#search-list').css({'height': ''+searchList_h+'px'}); // 600-(47+5)
				$("#search-list").parent().css({'margin-top':'15px'});
			}
			
			/* 公文預覽內容 see @RD-DocPreview.js _loadDocPreview() */
			if ((UIUpdateFlag & 4) && !!theSSO && !!theSSO.MP && !!theSSO.MP.PreviewCtrl) {
				var navBarWidth = $('div.folio_preview_nav').width();
				var cntrWidth = window_w - (SSOUtil.getEMSize($('#tdlPane')[0]) * 25);
				var navBarLeft = (cntrWidth - navBarWidth) / 2;
				$(theSSO.MP.PreviewCtrl.cntrId + ' .folio_preview_nav').css({left: navBarLeft});
			}
			
			/* icon todolist */
			if (UIUpdateFlag & 1) {
				// 圖示清單窗格高度...
				var todolist_h=0, idx=0;
				var $folders = $('.folderList > li');
				
				// 文件夾標題高度
				var h_FolderTitle = SSOUtil.getEMSize($('#home')[0]); //$('#iconPane ul.folderList').height();
				var h_FolderPane = window_h - h_header - h_FolderTitle; /* 視窗高 減去[系統標題列], 再減去文件夾標題列 */
			
				$folders.each(function(){
					var $folioList = $(this).find('.folioList');
					$folioList.each(function() {
						$(this).css({height:''+h_FolderPane+'px'});
					});
				});
				
				theSSO.MP.todolist.tdlicon_Scroll.refresh();
				
				if (theSSO.MP.todolist.folderScrolls.length) {
					var hNow = $('ul.folderList li#fldr_0').height();
					if (hNow<200) {
						theLogger.warn('-W- Invalid icon_folder height:' + hNow);
					}
				}
				
				if (SSOUtil.typeOf(theSSO.MP.todolist.folderScrolls)=='array') {
					for (idx=0; idx<theSSO.MP.todolist.folderScrolls.length; idx++) {
						theSSO.MP.todolist.folderScrolls[idx].refresh();
					}
				}
			}
			
			/* list todolist */
			if (UIUpdateFlag & 2) {
				var h_full = window_h - h_header;
				$('#listPane .fullViewContent').css({height:'' + h_full + 'px'});
				
				var h_listToolbar = $('#todolistToolbar').height();
				if (orient=='portrait' && screenMode.width<1000) {
					h_listToolbar = 92; /* 2016.3 - iPad直式顯示, 上方toolbar (公文夾/燈號/搜尋 controls)會折行, 暫時以經驗值代入 */
					/* 92: toolbar折行後高度, 43: margin-top offset! */
				}
				
				/* div.sData 有一個margin-top=43, 須加入扣除項目 */
				var marginTop = parseInt($('#todolist_cntr div.sBase div.sData').css('margin-top'));
				if (isNaN(marginTop)) {
					marginTop = 0;
				}
				
				var h_container = window_h - h_header - h_listToolbar - marginTop; /* overlap with table header, 故不扣除 h_tableHeader */
				var w_container = $('#todolist_cntr div.sBase .sHeader').width();
				/* 2016.4 - 取消寬度設定 */
				/*$('#todolist_cntr div.sBase div.sData').css({height:''+ h_container +'px', width:''+w_container+'px'});*/
				$('#todolist_cntr div.sBase div.sData').css({height:''+ h_container +'px'});
			}
			
			return true;
		}
	}
	
	function onSSOOrientationChange(event) {
		if (!!event && !!event.orientation) {
            // 2020.6.16 - 1090452, CDC iPad orientationchange
			let _event = event;
			let _orientation = event.orientation;
			// 2021.2.25 - Eric Peng, 修改'orientationchange' event發生時, window size可能尚未update的處理機制
			// 原方案: 100秒後再執行layout調整
			// 新方案: 以setInterval設定偵測函式, 觸發時檢核window.innerWidth是否符合條件, 符合時再執行layout調整作業!
			/*
			setTimeout(function(){
				_onSSOOrientationChange(_orientation, _event);
			}, 100);*/

			let _dfd = $.Deferred();
			_dfd.done(function() {
				theLogger.log('-I- onSSOOrientationChange gonna invoke _onSSOOrientationChange()...');
				_onSSOOrientationChange(_orientation, _event);
			})
			.fail(function(errRslt){
				theLogger.warn('-W- onSSOOrientationChange() cancel modify layout process, errMsg=' + errRslt.errMsg);
			});

			// 2021.2.25 - Eric Peng, for iPad, screen.width/screen.height值為portrait模式之尺寸!
			let sc_w = window.screen.width;
			let sc_h = window.screen.height;
			let interval = setInterval(function() {
				if (_orientation=='landscape') {
					if (window.innerWidth==sc_h) {
						theLogger.log('-I- onSSOOrientationChange() [landscape] window.innerWidth==sc_h==' + sc_h);
						_dfd.resolve({success:true, width:window.innerWidth});
						clearInterval(interval);
						interval = null;		
					}
					else {
						theLogger.log('-I- onSSOOrientationChange() [landscape] window.innerWidth=' + window.innerWidth +　', sc_w=' + sc_w);
					}
				}
				else if (_orientation=='portrait') {
					if (window.innerWidth==sc_w) {
						theLogger.log('-I- onSSOOrientationChange() [portrait] window.innerWidth==sc_w==' + sc_w);
						_dfd.resolve({success:true, width:window.innerWidth});
						clearInterval(interval);
						interval = null;		
					}
					else {
						theLogger.log('-I- onSSOOrientationChange() [portrait] window.innerWidth=' + window.innerWidth +　', sc_w=' + sc_w);
					}
				}
			}, 100);

			// 超過1.5秒則不執行!
			setTimeout(function(){
				_dfd.reject({success:false, errMsg:'time out!'});
				clearInterval(interval);
				interval = null;
			}, 1500);
        }
	}

	// 2021.2.24 - 1090927 Eric, support iPhone landscape mode
	function onSDPOrientationChange(event) {
		if (!!event && !!event.orientation) {
			theLogger.log('-dev- onSDPOrientationChange() event=' + JSON.stringify(event.orientation));
			let _orientation = event.orientation;
			let $curtain = $('#SDPMode_curtain')

			// Note: 實測發現旋轉後直式螢幕提示訊息顯示位置不正確. 故須於此處調整.
			//   @iOS orientationchange event發生時, winodw.innerWidth/innerHeight可能尚未完成異動, 故回報之數值有可能不正確
			//   依google查詢結果, 目前並未有任何可靠的方法可以取得異動完成時間點! 因此目前實作改用轉動後套不同css方式解決提示訊息顯示不正確問題!
			//  ref.: https://stackoverflow.com/questions/12452349/mobile-viewport-height-after-orientation-change
			if (_orientation=='landscape') {
				$curtain.addClass('sd_landscape_mode');
			}
			else if (_orientation=='portrait') {
				$curtain.removeClass('sd_landscape_mode');
			}
        }
	}

	// 2021.2.24 - 1090927 Eric, support iPhone landscape mode
	function onSDLOrientationChange(event) {
		if (!!event && !!event.orientation) {
            let _orientation = event.orientation;
			let $curtain = $('#SDPMode_curtain')
			// _orientation: 'landscape' | 'portrait'
			if (_orientation=='landscape') {
				$curtain.removeClass('sd_portrait_mode');
		        $('div.ui-page').removeClass('sd_portrait_mode');
			}
			else if (_orientation=='portrait') {
				$curtain.addClass('sd_portrait_mode');
				$('div.ui-page').addClass('sd_portrait_mode');
			}
		}
	}
	
	function _resizeListPane(windowSize, h_header, $listPane) {
		// 2017.10.24 - 1060967
		var $tabColGroup = $('#listPane #todolist_cntr .sHeader #todolist_tb colgroup');
		var $tabCols = $tabColGroup.children('col');

		// 2018.10.5 - 1070955 - 可調整ToDoList欄位
		function _isColumnVisible($col) {
			var display = window.getComputedStyle($col[0], null).getPropertyValue('display');
			if (display==='none') {
				return false;
			}
			return true;
		}

		// 寬度不足時, 減少特定欄位之寬度
		function _reduceListWidth(w_lsCntr, $firstTRItem, $DataTRItem, $cols_header, $cols_data) {
			var _item_reduce = ['dueDate', 'docNo', 'ICUserName', 'fromOUName', 'txName', 'toUserName' ];
			var _col_min = [6.5, 10.5, 5.2, 6.2, 5, 5]; // 2017.3.8 - docNo width 9->10.5 EM
			
			var idxItem = -1, idxCol = -1, i=-1, j=-1;
			var w_item_org = 0, w_item_new = 0;
			var $tdItems = $firstTRItem.find('td');
			var $tdItem = null, targetPropName='', propName='';
			var w_tb_total = 0,  w_tb_item = 0;
			for (idxItem=0; idxItem<_item_reduce.length; idxItem++) {
				w_tb_total = 0;
				w_tb_item = 0;
				idxCol = -1;
				w_item_new = SSOUtil.getEMSize($DataTRItem[0]) * _col_min[idxItem];
				targetPropName = _item_reduce[idxItem];
				for(i=0; i<$tdItems.length; i++) {
					$tdItem = $($tdItems[i]);
					propName = $tdItem.data('prop');
					if (typeof propName=='string' && propName==targetPropName) {
						idxCol = i;
						break;
					}
				}
				
				// 修改指定欄位寬度
				if (idxCol>=0) {
					for(j=0; j<$cols_data.length; j++) {
						$col = $($cols_data[j]);
						if (idxCol!==j) {
							if (_isColumnVisible($col)) { // 2018.10.5 - 1070955, skip hidden columns
								w_tb_total += parseInt($col.attr('width'));
							}
						}
						else {
							w_item_org = parseInt($col.attr('width'));
						}
					}
					
					if (w_item_org > w_item_new) {
						// 總長已小於
						if ((w_tb_total+w_item_new)<=w_lsCntr) {
							w_item_new = w_lsCntr - w_tb_total;
							$($cols_header[idxCol]).attr('width', w_item_new);
							$($cols_data[idxCol]).attr('width', w_item_new);
							$($cols_header[idxCol]).attr('data-reduced', 'true'); // 2017.10.20 - 1060967
							return;
						}
						else {
							$($cols_header[idxCol]).attr('width', w_item_new);
							$($cols_data[idxCol]).attr('width', w_item_new);
							$($cols_header[idxCol]).attr('data-reduced', 'true'); // 2017.10.20 - 1060967
						}
					}
				}
			}
		}

		// 2017.10.24 - 1060967, 視窗前次縮小已減少寬度之欄位, 重新計算寬度(字型可能不同)
		function _reCalcListWidth(w_lsCntr, $firstTRItem, $DataTRItem, $cols_header, $cols_data, rcCalcAll) {
			var _item_reduce = ['dueDate', 'docNo', 'ICUserName', 'fromOUName', 'txName', 'toUserName' ];
			var _col_min = [6.5, 10, 5.2, 6.5, 5, 5]; // 2017.3.8 - docNo width 9->10.5 EM
			
			var idxItem = -1, idxCol = -1, i=-1, j=-1;
			var w_item_org = 0, w_item_new = 0;
			var $tdItems = $firstTRItem.find('td');
			var $tdItem = null, targetPropName='', propName='';
			var w_tb_total = 0,  w_tb_item = 0;

			var addWidth = 0, sReduced='', reduced = false;
			for (idxItem=0; idxItem<_item_reduce.length; idxItem++) {
				w_tb_total = 0;
				w_tb_item = 0;
				idxCol = -1;
				reduced = false;
				w_item_new = SSOUtil.getEMSize($DataTRItem[0]) * _col_min[idxItem];
				targetPropName = _item_reduce[idxItem];

				for(i=0; i<$tdItems.length; i++) {
					$tdItem = $($tdItems[i]);
					propName = $tdItem.data('prop');
					if (typeof propName=='string' && propName==targetPropName) {
						idxCol = i;
						break;
					}
				}
				
				// 修改指定欄位寬度
				if (idxCol>=0) {
					for(j=0; j<$cols_header.length; j++) {
						$col = $($cols_header[j]);
						if (idxCol!==j) {
							if (_isColumnVisible($col)) { // 2018.10.5 - 1070955, skip hidden columns
								w_tb_total += parseInt($col.attr('width'));
							}
						}
						else {
							w_item_org = parseInt($col.attr('width'));
							sReduced = $col.attr('data-reduced');
							if (typeof sReduced=='string' && SSOUtil.isValueTrue(sReduced)) {
								reduced = true;
							}
						}
					}
					
					if (reduced || rcCalcAll) {
						$($cols_header[idxCol]).attr('width', w_item_new);
						$($cols_data[idxCol]).attr('width', w_item_new);
						$($cols_header[idxCol]).removeAttr('data-reduced');
						addWidth += (w_item_new - w_item_org);
					}
				}
			}

			// 縮短主旨
			if (addWidth>0) {
				var idxSubject = -1, wSubject=0;
				for(i=0; i<$tdItems.length; i++) {
					$tdItem = $($tdItems[i]);
					propName = $tdItem.data('prop');
					if (typeof propName=='string' && propName=='subject') {
						idxSubject = i;
						break;
					}
				}

				if (idxSubject>0) {
					$col = $($cols_header[idxSubject]);
					wSubject = parseInt($col.attr('width'));
					if (!isNaN(wSubject)) {
						wSubject -= addWidth;
						$($cols_header[idxSubject]).attr('width', wSubject);
						$($cols_data[idxSubject]).attr('width', wSubject);
					}
				}
			}
		}

		if (typeof $listPane!='object' || $listPane.length===0) return;
		
		var window_h = (typeof windowSize=='object' && windowSize!==null && windowSize.h) ? windowSize.h : window.innerHeight;
		if (!isNaN(h_header)) {
			h_header = $('#home_header').height();
			if (h_header===0) {
				return false;
			}
		}
		
		var i=0;
		var h_fvc = window_h - h_header;
		$('#tdlPane #listPane .fullViewContent').css({height:'' + h_fvc + 'px'});
		if ($listPane.find('.fullViewContent .sData table#todolist_tb tbody > tr').length) {
			// 列表清單隱藏時, 後續寬高計算size會有異常 => 標記須resize, 後續顥示前再執行!
			if (!$listPane.is(':visible')) {
				$listPane.data('resize', 'true');
				return;
			}
			
			var h_lsCntr = $listPane.find('.sBase').height() - $listPane.find('.sBase .sHeader').height();
			var w_lsCntr = $listPane.find('.sBase').width();
			
			$listPane.find('.sData').css({height: h_lsCntr +'px'});

			// 由第一筆<tr>找subject序號
			var $firstTRItem = $($listPane.find('.sData table > tbody > tr')[0]);
			var $DataTRItem = $($listPane.find('.sData table > tbody > tr')[1]);
			if ($firstTRItem.length) {
				var $tdItems = $firstTRItem.find('td');
				var $tdItem = null, propName='';
				var subjectIndex = -1;
				for(i=0; i<$tdItems.length; i++) {
					$tdItem = $($tdItems[i]);
					propName = $tdItem.data('prop');
					if (typeof propName=='string' && propName=='subject') {
						subjectIndex = i;
						break;
					}
				}
				
				// 修改主旨欄位寬度
				if (subjectIndex>=0) {
					var $cols_header = $listPane.find('.sHeader table > colgroup > col');
					var $cols_data = $listPane.find('.sData table > colgroup > col');
					var $col = null;
					var w_tb_total = 0, w_tb_subject=0;
					for(i=0; i<$cols_data.length; i++) {
						$col = $($cols_data[i]);
						if (subjectIndex!==i) {
							if (_isColumnVisible($col)) { // 2018.10.5 - 1070955, skip hidden columns
								w_tb_total += parseInt($col.attr('width'));
							}
						}
						else {
							w_tb_subject = parseInt($col.attr('width'));
						}
					}
					
					var w_min_subject = SSOUtil.getEMSize($listPane[0]) * 20; // 最少20字元寬(英文)
					var w_tb_subject_new = w_lsCntr - w_tb_total;
					if (w_tb_subject_new<w_min_subject) {
						w_tb_subject_new = w_min_subject;
					}
					
					$($cols_header[subjectIndex]).attr('width', w_tb_subject_new);
					$($cols_data[subjectIndex]).attr('width', w_tb_subject_new);
					
					// 長度超出時, 設法減少其它欄位長度
					if ((w_tb_total+w_tb_subject_new)>w_lsCntr) {
						_reduceListWidth(w_lsCntr-1, $firstTRItem, $DataTRItem, $cols_header, $cols_data);
						$tabColGroup.attr('data-reducedWidth', 'true'); // 2017.10.24 - 1060967
					}
					else { // 2017.10.24 - 1060967, 視窗縮小後再拉大, 欄位寬度不足問題修改
						var sReduced = $tabColGroup.attr('data-reducedWidth');
						if (typeof sReduced=='string' && sReduced.length) {
							sReduced = sReduced.toLowerCase();
							if (SSOUtil.isValueTrue(sReduced)) {
								// 因縮放有可能會套用不同字型, 故須重新計算有異動過欄位之寬度
								_reCalcListWidth(w_lsCntr-1, $firstTRItem, $DataTRItem, $cols_header, $cols_data, false);
								$tabColGroup.attr('data-reducedWidth', '');
							}
						}
						else {
							// 若一開始解析度小於1024, 則會套用較小字型, 故須重新計算有部份欄位之寬度
							var sSmallFont = $tabColGroup.attr('data-sFont');
							if (typeof sSmallFont=='string' && sSmallFont.length) {
								sSmallFont = sSmallFont.toLowerCase();
								if (SSOUtil.isValueTrue(sSmallFont)) {
									_reCalcListWidth(w_lsCntr-1, $firstTRItem, $DataTRItem, $cols_header, $cols_data, true);
									$tabColGroup.attr('data-sFont', '');
								}
							}
						}
					}

					// 計算最後table總寬度
					w_tb_total = 0;
					for(i=0; i<$cols_data.length; i++) {
						$col = $($cols_data[i]);
						if (_isColumnVisible($col)) { // 2018.10.5 - 1070955, 隱藏欄位忽略不計.
							w_tb_total += parseInt($col.attr('width'));
						}
					}
					
					// 2018.10.4 - 1070955, resize後, 更新 #listPane .sHeader #todolist_tb 內記錄的欄位寬度數值!
					// data-currLocW="xxx" data-subjW="xxx" [data-fontsize="xx.xxpx"]
					var currLocEnabled = theSSO.MP.todolist.builder.showCurrLocate();
					if (currLocEnabled) {
						var isCurrLocVisible = false;
						var idxCurrLoc = -1;
						var $DataTH = $listPane.find('.fullViewContent .sData table#todolist_tb thead > tr > th');
						for(i=0; i<$DataTH.length; i++) {
							var $TH = $($DataTH[i]);
							var _prop = $TH.data('prop');
							if (_prop=='currLocate') {
								idxCurrLoc = i;
								isCurrLocVisible = $TH.is(':visible');
								break;
							}
						}

						if (idxCurrLoc>0) {
							var $sHeaderTable = $listPane.find('.sHeader #todolist_tb');
							var wCurrLoc = $sHeaderTable.data('currLocW');
							var wSubj = $sHeaderTable.data('subjW');
							if (typeof wCurrLoc=='string'&&wCurrLoc.length && typeof wSubj=='string' && wSubj.length) {
								if (isCurrLocVisible) {
									$sHeaderTable.data('subjW', w_tb_subject_new+'')
									theLogger.log('-I- change .sHeader #todolist_tb data-subjw to '+ w_tb_subject_new + '[old value='+ wSubj +']');
								}
								else {
									var nCurrLoc = parseInt(wCurrLoc);
									var wNewSubject = w_tb_subject_new-nCurrLoc;
									$sHeaderTable.data('subjW', wNewSubject+'');
									theLogger.log('-I- change .sHeader #todolist_tb data-subjw to '+ wNewSubject + '[old value='+ wSubj +']');
								}
							}
						}
					}
					
					var $sData = $listPane.find('.sData');
					// 2017.10.24 - 1060967, fix width data
					var wCntr = $sData.closest('.todolist_container').width();
					$sData.css({width: wCntr + 'px'});
					//$sData.css({width: w_tb_total + 'px'});
					if (w_tb_total>w_lsCntr) {
						$sData.addClass('showExtraContent');
					}
					else {
						$sData.removeClass('showExtraContent');
					}
				}
			}
			
			$listPane.data('resize', '');
		}
	}
	theSSO.MP.resizeListPane = _resizeListPane; // 2017.4.7 - bug-fix, typo
	
	function _resizeIconPane(windowSize, h_header, $iconPane) {
		// 圖示模式, 毋論是否顯示, 不會影像計算結果 => 直接resize
		
		var h_total = $('#iconPane').height();
		var h_Scroll = h_total - $iconPane.find('ul.folderList').height();
		$iconPane.find('div.folioList').css({'height': h_Scroll+'px'});
		
		setTimeout(function() {
			for (idx=0; idx<theSSO.MP.todolist.folderScrolls.length; idx++) {
				theSSO.MP.todolist.folderScrolls[idx].refresh();
			}
		}, 100);
	}
	
	function _resizeSidePane(windowSize, h_header, $sidePane) {
		if (typeof $sidePane!='object' || $sidePane.length===0) return;
		
		var $searchViewFolder = $sidePane.find('.searchViewContent .searchView_Folder');
		
		var window_h = (typeof windowSize=='object' && windowSize.h) ? windowSize.h : window.innerHeight;
		//var window_w = (typeof windowSize=='object' && windowSize.w) ? windowSize.w : window.innerWidth;
		
		var h_svc = window_h - h_header;
		$searchViewFolder.parent().css({height:'' + h_svc + 'px'});
		
		var $searchList = $sidePane.find('#search-list');
		var margin_top_svc = parseInt($searchList.css('margin-top'));
		if (isNaN(margin_top_svc)) {
			margin_top_svc = 0;
		}
		
		var slst_t = $searchList.position().top; // 取相對窗格左上位置
		var searchList_h = h_svc - slst_t - (margin_top_svc * 2); // 
		$searchList.css({'height': ''+searchList_h+'px'}); // 600-(47+5)
	}
	
	// 2017.3.6 - resize 檢索側屜-全開
	function _resizeAKI800ListPane(windowSize, h_header, $listPane) {
		if (typeof $listPane!='object' || $listPane.length===0) return;
		
		var window_h = (typeof windowSize=='object' && windowSize.h) ? windowSize.h : window.innerHeight;
		var h_fvc = window_h - h_header;
		$listPane.find('.fullViewContent').css({height:'' + h_fvc + 'px'});
		if ($listPane.find('.fullViewContent .sData table#querydoc_todolist_tb tbody > tr').length) {
			// 檢索側屜不會隱藏 (只會transform到螢幕外) => 直接resize
			
			var h_lsCntr = $listPane.find('.sBase').height() - $listPane.find('.sBase .sHeader').height();
			var w_lsCntr = $listPane.find('.sBase').width();
			
			$listPane.find('.sData').css({height: h_lsCntr +'px', width: w_lsCntr + 'px'});
	
			// 由第一筆<tr>找subject序號
			var $firstTRItem = $($listPane.find('.sData table > tbody > tr')[0]);
			if ($firstTRItem.length) {
				var $tdItems = $firstTRItem.find('td');
				var $tdItem = null, propName='';
				var subjectIndex = -1;
				for(i=0; i<$tdItems.length; i++) {
					$tdItem = $($tdItems[i]);
					propName = $tdItem.data('prop');
					if (typeof propName=='string' && propName=='subject') {
						subjectIndex = i;
						break;
					}
				}
				
				// 修改主旨欄位寬度
				if (subjectIndex>=0) {
					var $cols_header = $listPane.find('.sHeader table > colgroup > col');
					var $cols_data = $listPane.find('.sData table > colgroup > col');
					var $col = null;
					var w_tb_total = 0, w_tb_subject=0;
					for(i=0; i<$cols_data.length; i++) {
						$col = $($cols_data[i]);
						if (subjectIndex!==i) {
							w_tb_total += parseInt($col.attr('width'));
						}
						else {
							w_tb_subject = parseInt($col.attr('width'));
						}
					}
					
					var w_min_subject = SSOUtil.getEMSize($listPane[0]) * 20; // 最少20字元寬(英文)
					var w_tb_subject_new = w_lsCntr - w_tb_total - 1;
					if (w_tb_subject_new<w_min_subject) {
						w_tb_subject_new = w_min_subject;
					}
					$($cols_header[subjectIndex]).attr('width', w_tb_subject_new);
					$($cols_data[subjectIndex]).attr('width', w_tb_subject_new);
				}
			}
		}
	}
	
	// 2017.3.6 - resize 檢索側屜-半開
	function _resizeAKI800SidePane(windowSize, h_header, $sidePane) {
		if (typeof $sidePane!='object' || $sidePane.length===0) return;
		
		var window_h = (typeof windowSize=='object' && windowSize.h) ? windowSize.h : window.innerHeight;
		var window_w = (typeof windowSize=='object' && windowSize.w) ? windowSize.w : window.innerWidth;
		var h_svc = window_h - h_header;
	
		var $searchWrapper = $sidePane.find('.searchViewContent .search-wrapper');
		var $searchList = $sidePane.find('#querydoc-search-list');
		
		$searchWrapper.parent().css({height: h_svc+'px'});
		
		var margin_top_svc = parseInt($searchList.css('margin-top'));
		if (isNaN(margin_top_svc)) {
			margin_top_svc = 0;
		}
		
		var slst_t = $searchList.position().top; // 取相對窗格左上位置
		var searchList_h = h_svc - slst_t - (margin_top_svc*2); // 
		$searchList.css({'height': ''+searchList_h+'px'}); // 600-(47+5)
	}
	
	function onSSOResize(event, ui) {
		var window_h = window.innerHeight;
		var window_w = window.innerWidth;
		 
		// 2017.4 - login布幕高度
		var $login = $('#login');
		if ($login.length) {
			var sClass = $login.attr('class');
			if (typeof sClass == 'string' && sClass.indexOf('login_slideup')!==-1) {
				$login.css('margin-top', '-' + (window_h * 1.5) +'px');
			}
		}
		
        /* 2023.4.19 - Eric, 登入頁面已無相關elements, 毋須執行
		var drawer_w = $('#imgDownDrawer').outerWidth(true); // 2017.4.5 - (美工)左側抽屜寬度
		 
		// 若目前顯示視窗為AOL, 則h_header為hidden, 計算結果會是'0'
		var h_header = $('#home_header').height();
		if (h_header===0) {
            return false;
        }
		 
		// Login 布幕
		var $login = $('div#login');
		//var $inputPanel = $('div#login div.input_panel'); // input panel

		// 2020.6.16 - 1090452 Eric, 移除此段以解決登入之輸入panel位移問題!
		//$login.width(window_w);
		//$login.height(window_h);
		
		// 調整#mainPageContainer
		$('#mainPageContainer').css({height:''+(window_h-h_header)+'px'});
		//1060321 Kevin 美工新增側邊抽屜
		$('#imgDownDrawer').css({height:''+(window_h-h_header)+'px'});
		
		var h_extra = h_header;
		var h_tdlcntr = 0;
			
		theLogger.debug("Env. variables: h_header=" + h_header + ", window_h=" + window_h + ", window_w=" + window_w);
		
		// #eDocPreivewPane (預覽窗格)
		if (typeof theSSO.MP.PreviewCtrl == 'object') {
			theSSO.MP.PreviewCtrl.windowSizeChanged();
		}
		
		// #mainPageContainer -> #mpContainer -> #todolistContainer	
        if (window_h>h_extra) {
			h_tdlcntr = window_h - h_extra;
            $('#todolistContainer').css('height', '' + h_tdlcntr + 'px');
		}
		$('#todolistContainer').css('width', (window_w - drawer_w) + 'px'); // 2017.4.5 - 美工套用
		
		// #todolistContainer > #listPane > div.fullViewContent
		// 全開待辦清單(列表)
		var $listPane = $('#tdlPane #listPane');
		if ($listPane.find('.sData table#todolist_tb > tbody > tr').length) {
			_resizeListPane({w:window_w, h:window_h}, h_header, $listPane);
		}
		
		// #todolistContainer > #iconPane
		// 全開待辦清單(圖示)
		var idx=0;
		var $iconPane = $('#todolistContainer #iconPane');
		if (theSSO.MP.todolist.folderScrolls.length>0) { // 毋須檢查是否visible => size計算沒問題
			_resizeIconPane({w:window_w, h:window_h}, h_header, $iconPane);
		}
		
		// #todolistContainer > #sidePane > div.searchViewContent > div
		// 半開待辦清單
		var $sidePane = $('#tdlPane #sidePane');
		var $searchViewFolder = $sidePane.find('.searchViewContent .searchView_Folder');
		//if ($searchViewFolder.is(':visible')) {
		if ($sidePane.find('ul#search-list > li').length) {
			_resizeSidePane({w:window_w, h:window_h}, h_header, $sidePane);
		}
		//else {
		//}
		
		// 檢索側屜
		var $leftTopPaneAKI800 = $('#aki800ListWorkspace #querydoc_leftTopPane');
		if ($leftTopPaneAKI800.find('.fullViewContent #querydoc_todolist_cntr .sData table > tbody > tr').length) {
			_resizeAKI800ListPane({w:window_w, h:window_h}, h_header, $leftTopPaneAKI800);
		}
		if ($leftTopPaneAKI800.find('.searchViewContent ul#querydoc-search-list > li').length) {
			_resizeAKI800SidePane({w:window_w, h:window_h}, h_header, $leftTopPaneAKI800);
		}
		
		 //20170414 Kevin 首頁重繪
		if(theSSO.logoned)
		{
			theStart.InitFlotImp();
			theStart.InitFlotTodo('', '');
		}
		
		//2017.4.21 Eric Peng, UniView模組resize
		if ($('#uniView #uvMainContent').length) {
			var h_uvToolbar = 0, h_uvPane = window_h - h_header;
			if ($('#uvLeftPart').is(':visible')) {
				h_uvToolbar = $('#uvLeftPart .top_tool_bar').height();
			}
			else {
				h_uvToolbar = 2.8 * SSOUtil.getEMSize($('#mainContent')[0]); // UniView上方工具列高度設定為2.8em
			}
			$('#uniView .uvContentPane').css({'height': h_uvPane-h_uvToolbar + 'px'});
		}*/
		
		return true;
	}

	// 2021.4.19 - 1100333 Eric, 刪減_openDocWithAOL
	//function _openDocWithAOL(SAMLart, docObj, trigger, closeSideDrawer, extraOption) {
	
	// jQM產生主頁面時叫用
    $(document).on('pagecreate', '#home', function(event, ui) {
		if (event.target.id!="home") {
			theLogger.log("#home.on_pagecreate different event.target.id='" + event.target.id + "'");
			return;
		}
		
		// 2016.10.30 - enable debug time log...
		if (SSOUtil.getURLParameter('DebugTime')=='Y') {
			window._debugTime = true;
			SSO_CONFIG.debugTime = true; // 2019.9.25 - Eric, add for performance log
		}

		if (SSOUtil.getURLParameter('FastTableBuild')=='N') {
			window.tdlUseJSON = false;
		}
		if (SSOUtil.getURLParameter('DisableFastInit')=='Y') {
			window._disableFastInit = true;
		}
		if (SSOUtil.getURLParameter('ShowFolderCnt')=='Y') {
			window.showFolderCnt = true;
		}
		var sUIMode = SSOUtil.getURLParameter('UIMode');
		if (typeof sUIMode=='string' && sUIMode.length) {
			sUIMode = sUIMode.toUpperCase();
			if (sUIMode=='MOBILE') {
				window.forceUIMode='MOBILE';
			}
			else if (sUIMode=='PC') {
				window.forceUIMode='PC';
			}
		}
		else { // 2017.3 - 若螢幕寬度小於1200=>強制設為MOBILE UI(傳送&傳送選項UI)
			if (window.screen.width<1200) {
				window.forceUIMode='MOBILE';
			}
		}
		
		// 2017.3.1 - 開發者模式Enable?
		var sDevMode = SSOUtil.getURLParameter('DevMode');
		if (typeof sDevMode=='string' && sDevMode.length) {
			window._devMode = SSOUtil.isValueTrue(sDevMode);
		}

		// 2021.4.19 - 1100333, Eric Peng - 記錄網址參數設定值(eDoc網頁開啟時套用)
		let loginPageConfig = {
			_debugTime: window._debugTime,
			noneJQuery: window.noneJQuery,
			_disableFastInit: window._disableFastInit,
			showFolderCnt: window.showFolderCnt,
			forceUIMode: window.forceUIMode,
			_devMode: window._devMode
		};
		localStorage.login_page_config = JSON.stringify(loginPageConfig);
		
		// 2017.4 - color scheme 實作!
		if (typeof theSSO == 'object' && typeof theSSO.setColorScheme == 'undefined') {
			theSSO.setColorScheme = function(clrScheme) {
				if (typeof clrScheme=='string') {
					var $body = $('body');
					var sClass = $body.attr('class');
					
					// 與目前設定值相同, 結束作業!
					if (clrScheme.length && sClass.indexOf(clrScheme)!=-1) {
						return;
					}
					
					$body.removeClass('cs-ly'); $body.removeClass('cs-lg'); $body.removeClass('cs-lp');
					
					// 預設值 => 清除classname後結束!
					if (clrScheme.length===0) { localStorage.color_scheme = ''; return; }
					
					switch(clrScheme) {
					case 'cs-ly': case 'cs-lg': case 'cs-lp':
						$body.addClass(clrScheme);
						localStorage.color_scheme = clrScheme;
						break;
					}
				}
			};
			
			theSSO.getColorScheme = function() {
				var $body = $('body');
				var sClass = $body.attr('class');
				if (sClass.indexOf('cs-ly')!=-1) return 'cs-ly';
				if (sClass.indexOf('cs-lg')!=-1) return 'cs-lg';
				if (sClass.indexOf('cs-lp')!=-1) return 'cs-lp';
				return '';
			};
			
			theSSO.initColorScheme = function() {
				var clrScheme = localStorage.color_scheme;
				if (typeof clrScheme=='string' && clrScheme.length) {
					theSSO.setColorScheme(clrScheme);
				}
				else {
					localStorage.color_scheme = '';
				}
			};
		}
		theSSO.initColorScheme(); // 2017.4
		
		// 2016.10.7 - 行動裝置, 隱藏智慧卡登入UI
		if (typeof iOS_device=='boolean' && iOS_device===true) {
			//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
			if(!SSO_CONFIG.enableMobileMoica)
				$('#login #radio-choice-loginbyAccount').closest('.ui-field-contain').hide();
			else
				$('#login #radio-choice-loginbyCert').remove();
			
			// 2016.11.11 - iOS device, 設定分會設定子視窗之class	
			$('#PDoc_CoWWKFDialog').addClass('iOS');
		}
		// 1130809 Raymond 1130313 合併1111007(1100394), 修正預設智慧卡登入時, 離線版無法登入的問題
		//else { // 2017.1.9 - 若預設用智慧卡登入, iPad顯示異常問題
		else if(!theSSO || theSSO.offlineMode != true) { // 2017.1.9 - 若預設用智慧卡登入, iPad顯示異常問題
			// 2016.11.29 - 支援預設顯示智慧卡登入
			if (SSO_CONFIG.LoginType=='SMARTCARD') {
				$('div#login #radio-choice-loginbyAccount').prop('checked', false);
				$('div#login #radio-choice-loginbyCert').prop('checked', true);
				$('div#login div.userid_wrapper').hide();
				$('div#login div.password_wrapper label[for="password"]').text('金鑰密碼：');
			}
			
			//1140704	Leslie[1131183]	增修首頁依設定決定是否啟用Fido
			if(!SSO_CONFIG.enableMobileMoica)
				$('#login #radio-choice-loginbyMobileMoica').remove();
		}
		
		// 1111014	Leslie	新增可依設定決定是否啟用"忘記密碼"功能(僅支援純DB驗證/修改)
		if(SSO_CONFIG.EnableResetPWD)
			$('#lkResetPWD').show()
		else
			$('#lkResetPWD').hide()
				
		/* 2014.8 - 暫行解決方案for iOS 7 Safari登入後，載入的todolist網頁內容會scroll超出頁面上方
		 * ToDo: 目前頁面下方仍會多出一條約20px之空間!
		 */
		$('body').on('pagechange', function(){
		    window.scrollTo(0, 0);
        });
		
		/* 2016.7 - 關閉網頁時處理函式 */
		$(window).on('unload', function() {
			return 'Unloaded...';
		});
		
		// 2021.2.19 - 1090927 Eric, iPhone旋轉不異動layout
		if (window.SDPMode) {
			$(window).on('orientationchange', onSDPOrientationChange);
			$('#SDPMode_curtain').addClass('sd_portrait_mode');
		}
		else if (window.SDLMode) {
			theLogger.log('-I- SDLMode="ON", do not handle "resize"/"orientationchange" event.');
			$(window).on('orientationchange', onSDLOrientationChange);
			$('#SDPMode_curtain > span').replaceWith('<span>本系統不支援手機直式模式，<br>請轉為橫式後繼續作業．</span>');
		}
		else {
			$(window).on('orientationchange', onSSOOrientationChange);
			$(window).on('resize', onSSOResize);
		}
				
		/* 測試 Module Inject events */
		/*$(document).on('sso:moduleinit', '#startContainer', function(e, extra) {
			console.log('sso:moduleinit event...');	
		});
		
		$(document).on('sso:modulecreate', '#startContainer', function(e, extra) {
			console.log('sso:modulecreate event...');	
		});*/
		
		//1110420	Leslie[1110069]	新增首頁Logo可依機關調整
		$('#LoginTitle').addClass(SSO_CONFIG.OrgNickName+'_Logo');
				
		// 2012.8.29
		theLogger.log("before $('#login').page()...");
		var $login = $('#login');
		$login.page();
		theLogger.log("after $('#login').page()...");
		$login.addClass("login_slidedown");
		
		// 2016.6 - press "Enter" to login...
		//1110330	Leslie	增加處理驗證碼欄位
		//$login.find('input#in_userid, input#in_password').on('keypress', function(e) {
		$login.find('input#in_userid, input#in_password, input#in_verifyCode').on('keypress', function(e) {
			if(e.which == 10 || e.which == 13) { // Enter pressed?
                $('#btn_login').trigger( 'click' );
            }
        });
		
		_dbgPageInitLog += '#home - pagecreate event.\r\n';
		
		theLogger.debug('#home [pagecreate] event handler...');
		
		// 2019.9.17 - 1080339 Eric, .focus(fn) => on('onfocus', fn)
		$(window).on('focus', function(e) {
			if (e.srcElement == window) {
				theLogger.debug('window.onfocus');
			}
		});
		
		// 2021.4.19- 1100333 Eric, 首頁/待辦內容登入後才有!
		/* 2012.8.20 - 初始化主畫面及流程設定頁面內容 */
		_initMainPage(false);
		
		// DEV: 測試HTML Element dimension用
		$('#btn_layout').on( 'click', function(){
			_dumpLayout();
		});
		
		// 隱藏公布欄及工具箱之toolbar buttons
		$('#bottom_tb_billboard').hide();
		$('#bottom_tb_toolbox').hide();
		
		// 2016.5 - 隱藏圖像模式窗格
		//$('#listPane').hide();
		$('#iconPane').hide(); // 2016.3
    }); // EndOf $('#home').on('pagecreate', function(event, ui) {
    
    $(document).on('pageshow', '#home', function(event, ui) {
		let _dbgPageInitLog = '';
		_dbgPageInitLog += '#home - pagecontainershow event.\r\n';
		
        theLogger.log('----- page events -----\r\n' + _dbgPageInitLog + '-----\r\n');
		_dbgPageInitLog=''; // clear content...
        

		/* 2015.6 - 若網址參數有SAMLart且未登入系統, 自動登入
		 * URL -> http://.../RD-SSO.html?SAMLart=xxxx&Username=xxx&Orgno=xxxx)
		 */
		var sSAMLart = SSOUtil.getURLParameter('SAMLart');
		var mapAccount = '';
		if (typeof sSAMLart!=='undefined' && sSAMLart!==null && sSAMLart.length) {
			mapAccount = window.theWebServices.authws.getAccountMappedByArtifact(sSAMLart);
		}
		
		//1060329 Kevin 當取得Artifact時，表示Server已經允許登入，不檢核重複登入。(未修改僅註記)
		if (sSAMLart.length && mapAccount.length && !theSSO.logoned)
		{
			/* 2021.4.20 - 1100333-ToDo Eric, 整合登入, 請Kevin確認是否應修改 (方案?)
			*/
			//1051205 Kevin 設定已經登入，避免觸發整合登入模式
			theSSO.logoned = true;
			//1050719 Kevin 配合權杖登入介接方式，改以UserInfo儲存最後登入資訊 Start
			window.localStorage.Artifact = sSAMLart;
			//1060329 Kevin 紀錄權杖
			theSSO.Artifact = sSAMLart;
			//1100929	Leslie[1101215]	配合首頁分離後網址列異動，整合登入時增加註記欄位以供程式區別
			window.localStorage.AutoLogon = 'Y';
			
			//1110816	Leslie[1110787]	增修彰師大客製化功能
			if(SSO_CONFIG.OrgNickName == 'NCUE'){
				var fromSSO = SSOUtil.getURLParameter('fromSSO');
				if (typeof fromSSO!=='undefined' && fromSSO!==null && fromSSO.length){
					window.localStorage.fromSSO = fromSSO;
				}
			}						
			
			// 2021.4.20 - 1100333 Eric, 改為跳轉網頁
			//_postLoginProcess(sSAMLart, true);
			setTimeout(function() {
				window.location.href = SSO_CONFIG.EDocPage;
			}, 100);

			//var account = SSOUtil.getURLParameter('Username');
			//var orgId = SSOUtil.getURLParameter('Orgno');
			//if (!!account && account.length && !!orgId && orgId.length) {
			//	window.localStorage.Artifact = sSAMLart;
			//	window.localStorage.latest_login_orgid = orgId;
			//	window.localStorage.latest_login_userid = account;
			//	_postLoginProcess(sSAMLart, true);
			//	
			//	theSSO.integratedLogon = true;
			//}
			//1050719 Kevin End
		}

		//1061023 Kevin 1060634 調整介接訊息由首頁處理
		var sMSG = SSOUtil.getURLParameter('MSG');
		if (!!sMSG && sMSG.length) {
			//1110915	Leslie	彰師大可強制將暨有權杖登出
			if(SSO_CONFIG.OrgNickName == 'NCUE'){
				if(confirm(sMSG+"\n\n是否將其強制登出?\n\n若是，請於確認後再重新登入即可。")){
					var  r = new RegExp(/\b(?:\[[0-9a-zA-Z-]*\])?[0-9a-zA-Z-]{36,36}\b/,'i');
					var artifact = (r.test(sMSG))? sMSG.match(r)[0]:"";
					
					if(artifact != ""){					
						var params = new SOAPClientParameters();
						params.add("argArtifact", artifact);
						
						SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl('authws'), "Logout", params, true,
							function(r) {
								r = r.value
								theLogger.log("-I- AuthWS.logout returns:");
								theLogger.log(r);
								if(typeof r == 'boolean') {
									res = r;
								}
								else {
									throw new Error('叫用AuthWS.Logout失敗!');
								}
							});
					}
				}
			}
			else
			alert(decodeURI(sMSG));
		}
		
		//1051005 Kevin Window整合登入功能
		if (SSOUtil.getURLParameter('ACT')=="OS")
			SSO_CONFIG.WindowLogon = true;
		
		//2016.7.25 - Leslie, Window整合登入功能
		//1060329 Kevin 重複登入處理
		//if (SSO_CONFIG.WindowLogon && !theSSO.logoned){
			
		//1100507	Leslie[1100333]	配合首頁分離，改用SessionStorage暫存Windows整合登入狀態，以控管登出時不會自動登入
		//if (SSO_CONFIG.WindowLogon && !theSSO.logoned && !theSSO.MP.CheckUsing()){
			//SSO_CONFIG.WindowLogon = false;	//設為False，僅初次開啟視窗時啟動Window整合登入
		if (!('StopWindowLogon' in sessionStorage) && SSO_CONFIG.WindowLogon && !theSSO.logoned && !theSSO.MP.CheckUsing()){
			sessionStorage.StopWindowLogon = true;
			var _winLogonAshx = SSO_CONFIG.ServerHost+"/WA/windowlogin.ashx";
			var sWinLogonRtn = "";
			$.ajax({
                    type: "POST",
                    url: _winLogonAshx,
                    success: function (data) {
                        if (data.hasOwnProperty("d")) {
							sWinLogonRtn = data.d;
                        }
                        else {
							sWinLogonRtn = data;
                        }
						
						if(sWinLogonRtn.indexOf('ERR') === -1){
							window.localStorage.Artifact = sWinLogonRtn;
							//1060329 Kevin 紀錄權杖
							theSSO.Artifact = sWinLogonRtn;
							// 2021.4.20 - 1100333 Eric, 改為跳轉網頁
							//_postLoginProcess(sWinLogonRtn, true);
							setTimeout(function() {
								window.location.href = SSO_CONFIG.EDocPage;
							}, 100);
						}
						else{
							var sErr = sWinLogonRtn.substr(4);
							alert(sErr);
						}
                    },
					error: function(err)
					{
						alert("Windows Logon Error");
					}
                });
		}
		
		//1110420	Leslie[1110069]	網頁Title依客製化需求調整
		if(SSO_CONFIG.OrgNickName == 'SMEG')
			document.title = '電子簽核系統-登入';
    });
	
	/* 2021.4.20 - 1100333-ToDo Eric, Kevin確認是否應修改 */
	//1100203 Kevin 1090722 新增於切換頁面時重新檢核SR連線狀態
	/*window.addEventListener('visibilitychange', function() {
		
		if (document.visibilityState === 'visible')
		{
			theLogger.log("window.onvisibilitychange.visible");
			
			if(theSSO.logoned)
			{
				if(!theSSO.MP.CheckLoginStatus())
					return;
			}
		}
		else
			theLogger.log("window.onvisibilitychange.hide");
	});*/
	
}); // End of - $(document).ready(function() {

function _initMainPage() {
	var w = screen.availWidth;
    var h = screen.availHeight - 160;
    theLogger.debug("Browser client area w:" + w + ", h:" + h);
    
    var date = new Date();
    var sDate = '' + (date.getMonth()+1) + '月' + date.getDate() + '日, 星期' + SSOUtil.getTCDayOfWeek(date.getDay());
    $('.date_info').text(sDate);

    try {
        $(document).on('click', '#modFlowBtn', function() {
          $.mobile.changePage($('#dlgProcessFlow'), {transition:'pop', reverse:false, changeHash:false, history:false });     
        });
    }
    catch(e) {
        alert(e.message);
    }
}
