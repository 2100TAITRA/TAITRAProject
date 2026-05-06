/* jshint -W100 */

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
1100503	1100333		Kevin	Leslie	Merge登入效能調校，延遲載入JS檔，原單[1090329]
1100519 1100093 	Eric	Eric 	彙併辦母文傳送時一併封裝子文功能實作.
1100519	1100298		Raymond	Raymond	修正拖拉改變文字意見大小時, 會觸發resize, 致重複觸發onSSOResize問題
1100610	1100659		Raymond	Raymond	gCustomMgr改在RD-CustomMgr.js中產生, 其他JS不要new CustomMgr(), 以避免重複new, 造成客製化註冊的callback不見, 發文機關選單未初始化(出現"測試機關"選項)的問題
1100922	1080763		Raymond	Raymond	合併1070348, 自訂範本選單功能支援類別, 更新範本選單項目的功能獨立為一個function, 供AOL在刪除/新增範本時呼叫更新MP的範本選單, 及比照AOL新增共用範本功能
1100930	1101215		Leslie	Leslie	配合首頁分離後網址列異動，整合登入時增加註記欄位以供程式區別
1110110	1101352		Leslie	Leslie	於切換角色後，增加紀錄角色索引供ViewDoc子視窗取用
1110314	1110167		Leslie	Leslie	[考試院]UI調整
1110324	1101537		Leslie	Leslie	[考試院]Merge 找不到的切換身份功能
1110406	1101578		Eric	Leslie	[考試院]附件編輯相關功能
1110411	1101578		Eric	Raymond	判斷環境變數改為全域變數, 並增加判斷不支援的iPad、Mac、行動平台, 會自動停用附件編輯功能
1110414	1101578		Eric	Raymond	再修正判斷是否啟用附件編輯功能的條件加入不支援AbortController的平台(IE), 及強制改為不匯出頁面模式的條件
1110415 1110420 	Kevin	Kevin	機關角色切換時新增關閉子視窗行為
1110421 1110164 	Kevin	Kevin	弱掃移動script至js
1110629	1110629		Leslie	Leslie	配合考試院UI/UX需求，修改傳送選單，增加在Resize時調整選單長度
1110708	1110728		Raymond	Raymond	「參考公文設定」鈕從「設定」鈕選單搬到「齒輪」鈕選單下
1110816 1110633		Kevin	Kevin	新增來文參考附件檢視
1110907 1111021		Kevin   Zen		滲透測試風險修正
1111011	1110865		Leslie	Leslie	新增「簽閱附件」相關JS
1111026 陸委會序134	Kevin	Kevin   開啟時檢核公文機關與角色機關一致避免異常
1111122	1110863		Leslie	Leslie	新增「下載所有附件」子視窗相關JS
1111122	1111287		Kevin	Kevin	考試院新增顯示流程欄位
1111223	1111178		Leslie	Leslie	修改首頁由背景切換為前景時，所叫用的CheckLoginStatus()改為非同步模式，以解決可能會失敗的問題
1111223	1111400		David	Leslie	登入系統時，如有待補簽的公文，需顯示提示訊息
1120424	1120212		Leslie	Leslie	(Merge)新增可設定是否登入時直接切至MP
1120502	1120007		Leslie	Leslie	(Merge)[屏東]調整公文夾顯示方式為二階層顯示，供共通版可依設定啟用
1120810	1120503		Raymond	Raymond	新增用滑鼠拖拉儲存格間框線調整欄寬及將HTML DOM轉換為影像檔格式的功能
1120815 1120693     Kevin   Kevin   移除無用函式
1020828	1120195		Leslie	Leslie	(Merge)修改為壓縮版專用Code，延遲載入的JS檔名，全都依載入頁面做判斷
1120828	1120750		Leslie	Leslie	配合組改，增加初始化機關代碼對照表
1120901 1120709		Kevin	Leslie	弱掃修正Client DOM Stored XSS
1121222	-------		Leslie	Leslie	[卡驗收序31]新增依客製化設定創稿的預設簽核類型
1130122	1120860		Leslie	Leslie	登入時，角色選單設為伺服器端設定的預設角色
1130502	中榮序91	Leslie	Leslie	登入時預設Folder	DefaultFolderByLogin
1130502	中榮序92	Leslie	Leslie	增修依設定啟用MP點擊任意處即可開啟公文
1130614	中榮序128	Leslie	Leslie	[上線需求序11] 新增客製化設定以強制公文開啟狀態下，點擊「公文檢索」時開啟為半開模式
1130620	1130467		Leslie	Leslie	配合滲透測試，調整JS壓縮範圍至全JS
1130903	序215		Leslie	Leslie	增加於背景傳送階段，阻止使用者誤關視窗
1131004	序272		Leslie	Leslie	憑證(登入)時，將登入時的憑證改為優先選項
1131101	1130977		Kevin	Leslie	移除MobiScroll
1140109	1131229		Leslie	Leslie	Merge[1130733]配合升級第三方套件
1140225	1131246		Leslie	Leslie	修正當Window.Resize後，重建SuperTable
1140505	1140556		Kevin	Leslie	取消網址參數權杖
1140610	1131183		Leslie	Leslie	[Merge]新增行動自然人憑證模組[1110117]
1140121	1131303		Raymond	Raymond	新增錯別字校正功能RD-FixWordData.js、RD-ErrorCorrection.js
1140626	1140325		Leslie	Leslie	因已於[1130847]由DB取得彙併辦資訊，取消由封裝檔中讀入<併文清單>邏輯
1140924	1141104		Leslie	Leslie	外貿協會新增「優先度」(星號)功能欄位
1141023	1140849		Leslie	Leslie	MP列表增加顯示選取底色功能
1141117	北榮急序-19	Leslie	Leslie	自動開啟下一筆公文，補設底色功能
1150213	1141694		Leslie	Leslie	修正當公文基資(主旨)內容有"§"時，會造成搜尋功能異常
*/

/*測試用項目
 *var _logoned = false;
 *var _standalone = false;
 */
// 2020.6.15 - Eric, rename: noneJQuery -> tdlUseJSON
window.tdlUseJSON = true; // 2016.10.30 - 登記桌performance issue

var _disableFastInit = false; // 2016.11.1 - load SSO tracing...

var _debug = false;
var _debugTime = false; // 2016.8.22 - 測試登入時間
var _debugSubmit = false; // 2016.7 - Eric, added for submit develope trace...

var home_page_create_event_handled = false; // for debug only...
var _dbgPageInitLog = ''; // 測試用, 頁面初始化log字串.

// todolist_icon mode...
var _folderCnt = 0; // Demo內容folder數
var todolist_icon_folder_w = 256; // 單一folder佔用寬度(pixels)

// 主功能分頁: 首頁, 公文夾, 公布欄
var _subPageInfo = [ { btnId : "btn_start",   pageId : "startContainer" },
					 { btnId : "btn_mp",  pageId : "mpContainer" },
					 { btnId : "btn_billboard", pageId : "billboard"} ]; 

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

//1110421 Kevin 1110164 弱掃移動script至js Start
var _standalone = false;
var _useDEVAWS = false;
var _use2013ItemOnly = true;
var _testSignalR = true;
var _enableSignalRLog = true;
//var _standalone = true;

//1100503	Leslie[1100333]	Merge首頁登入效能調校，以下JS檔改為延遲載入，原單[1090329]
var loadJS = [];
//1100816	Leslie	配合QA作業，調整版號宣告型式(變數格式為[ver=版號])
//var uJSVersion = '5.0.56.0';
var uJSVersion = 'ver=5.0.105.045';

//1120828	Leslie[1120195]	依載入頁面來判斷載入的JS檔
var _currPage = location.pathname.split('/').pop();

if(_currPage.toUpperCase() == "EDOCM.HTML"){
	loadJS.push('Lib/WFH_Late_01.js');
	//1130620	Leslie[1130467]	配合滲透測試，調整JS壓縮範圍至LIB中的所有JS
	// loadJS.push('Lib/RD-AOL.js');
	// loadJS.push('Lib/RD-RndrAtt.js');	// 2021.6.8 - Eric, 應Leslie要求, 解出RD-RndrAtt.js
	loadJS.push('Lib/RD-AOLM.js');
	loadJS.push('Lib/RD-RndrAttM.js');	// 2021.6.8 - Eric, 應Leslie要求, 解出RD-RndrAtt.js
	loadJS.push('Lib/WFH_Late_02.js');
	loadJS.push('Lib/WFH_Late_03.js');
	//1130620	Leslie[1130467]	配合滲透測試，調整JS壓縮範圍至LIB中的所有JS
	// loadJS.push('Lib/RD-FolioModel.js');
	loadJS.push('Lib/RD-FolioModelM.js');
	loadJS.push('Lib/WFH_Late_04.js');
	loadJS.push('Lib/WFH_Late_05.js');
	loadJS.push('Lib/WFH_Late_06.js');
	loadJS.push('Lib/WFH_Late_07.js');
	loadJS.push('Lib/WFH_Late_08.js');
	loadJS.push('Lib/WFH_Late_09.js');
}
else{
	loadJS.push('Lib/jquery.simplemodal-1.4.4.js');
	loadJS.push('Lib/jquery.mobile.datepicker.js');
	//1140109	Leslie[1131229]	Merge[1130733]配合升級第三方套件
	// loadJS.push('Lib/JsBarcode/JsBarcode.code39.min.js');
	loadJS.push('Lib/Barcode39/Barcode39.min.js');
	loadJS.push('Lib/RD-CanvasUtil.js');
	loadJS.push('Lib/RD-SignFolder.js');
	//loadJS.push('Lib/RD-CustomMgr.js');
	loadJS.push('Lib/RD-AOL.js');
	//loadJS.push('Lib/RD-Coworker.js');	// 1110331 Raymond 1110164 無人使用, 移除
	loadJS.push('Lib/RD-DlgProcessSetting.js');
	loadJS.push('Lib/RD-RndrAtt.js');
	loadJS.push('Lib/MS-Common.js');
	loadJS.push('Lib/RD-Layout.js');
	loadJS.push('Lib/RD-Zoom.js');
	loadJS.push('Lib/RD-Edit.js');
	loadJS.push('Lib/RD-EditSO.js');
	loadJS.push('Lib/RD-DraftModel.js');
	loadJS.push('Lib/RD-DraftMgmt.js');
	loadJS.push('Lib/RD-FolioModel.js');
	loadJS.push('Lib/RD-FolioView.js');
	loadJS.push('Lib/RD-verifyEnve.js');
	loadJS.push('Lib/RD-ParseStampMgmt.js');
	loadJS.push('Lib/RD-SignWork.js');
	loadJS.push('Lib/RD-ObserverPattern.js');
	loadJS.push('Lib/RD-StampAct.js');
	loadJS.push('Lib/RD-jquery.tokenEdit.js');
	loadJS.push('Lib/RD-CompoundFolio.js');
	loadJS.push('Lib/RD-RefView.js');
	loadJS.push('Lib/MS-ODC010.js');
	loadJS.push('Lib/MS-ODC010WS.js');
	loadJS.push('Lib/MS-ODC010UI.js');
	loadJS.push('Lib/MS-ODC011.js');
	loadJS.push('Lib/MS-ODC013.js');
	loadJS.push('Lib/MS-ODC012.js');
	loadJS.push('Lib/RD-jquery.confirm.js');
	loadJS.push('Lib/RD-NewAttach.js');
	loadJS.push('Lib/RD-AttachMgmt.js');
	loadJS.push('Lib/RD-HistoryDoc.js');
	loadJS.push('Lib/RD-ReqDocNo.js');
	loadJS.push('Lib/RD-ImportFile.js');
	loadJS.push('Lib/RD-ExportFile.js');
	loadJS.push('Lib/RD-PrintFolio.js');
	loadJS.push('Lib/RD-AdjustOrder.js');
	loadJS.push('Lib/RD-ViewRefAtt.js');
	loadJS.push('Lib/RD-DraftCmds.js');
	loadJS.push('Lib/MS-Dept.js');
	loadJS.push('Lib/RD-HiCosSCard.js');
	loadJS.push('Lib/RD-NewDoc.js');
	loadJS.push('Lib/MS-GRP.js');
	loadJS.push('Lib/MS-ModeOrg.js');
	loadJS.push('Lib/MS-Choose.js');
	loadJS.push('Lib/MS-WedEditSave.js');
	loadJS.push('Lib/RD-watermark.jquery.js');
	loadJS.push('Lib/RD-UniView.js');
	loadJS.push('Lib/MS-ToState.js');
	loadJS.push('Lib/MS-ToMeetTime.js');
	loadJS.push('Lib/MS-Transfer.js');
	loadJS.push('Lib/MS-SetDept.js');
	loadJS.push('Lib/MS-EmployeeChange.js');
	loadJS.push('Lib/MS-SetIssueWordList.js');
	loadJS.push('Lib/RD-RefAttachMgmt.js');
	loadJS.push('Lib/RD-FolioCmds.js');
	loadJS.push('Lib/RD-ChangePpr.js');
	loadJS.push('Lib/RD-PrintRefDoc.js');
	loadJS.push('Lib/RD-RefDocMgmt.js'); // 2021.6 - 1080761 Eric mrege: 2018.5.15 - Eric, 1070298 內政部參考公文管理子視窗
	loadJS.push('Lib/CryptoJS/crypto-js.js');
	loadJS.push('Lib/jszip.js');	// 1110120 Raymond 1101417 另存整份公文改成打包成一個ZIP壓縮檔下載, 新增ZIP功能函式庫
	loadJS.push('Lib/JQM/jquery.csv-0.71.min.js');
	loadJS.push('Lib/MS-ViewRcvRefAtt.js'); //1110816 Kevin 1110633 新增來文參考附件檢視
	loadJS.push('Lib/RD-ViewTmpAtt.js');	//1111011	Leslie[1110865]	新增「簽閱附件」相關JS
	loadJS.push('Lib/RD-TmpAttachMgmt.js');
	loadJS.push('Lib/RD-ExportAtt.js');	//1111122	Leslie[1110863]	新增「下載所有附件」子視窗相關JS
	loadJS.push('Lib/jquery.resizableColumns.js');	// 1120808 Raymond 1120503 用滑鼠拖拉儲存格間框線調整欄寬的功能
	loadJS.push('Lib/dom-to-image.js');	// 1120810 Raymond 1120503 將HTML DOM轉換為影像檔格式的功能
	loadJS.push('Lib/Rd-MobileMoica.js');	//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
	loadJS.push('Lib/RD-FixWordData.js');	// 1140121 Raymond 1131303 新增錯別字校正資料物件
	loadJS.push('Lib/RD-ErrorCorrection.js');	// 1131223 Raymond 1131303 新增錯別字校正功能
}

//1090519	Leslie[1090329]	首頁登入效能，以下JS檔改為延遲載入	--END--  

// 2021.4.16 - 1100333 merge: 1080496, Eric Peng - 檢核系統是否已登入, 若未登入則直接跳傳回login頁
//  1. 若由Login跳轉, 沒有網址參數SAMLart
//  2. 若由切換機關功能觸發, 網址參數SAMLart記錄新的artifact
let artifact = SSOUtil.getURLParameter('SAMLart');
if (typeof artifact!='string' || artifact.length===0) {
	artifact = localStorage['Artifact'];
}
else {
	localStorage['Artifact'] = artifact;
}

if (typeof artifact!='string' || artifact.length===0) {
	//let _backToSSO =  confirm('Go back to login page? [artifact=' + artifact + ']');
    window.location.href = SSO_CONFIG.LoginPage;
}
else {
	//alert('@eDoc.html, Artifact=' + artifact);
}
	
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


// 2015.6 - 新增registerIP參數. (入口網整合登入用)
function _postLoginProcess(SAMLart, registerIP, pincode) {
	/* 2016.6 - 由_parseUserInfo拉出為獨立function */
	function _setupLogger() {
		// 2016.4.29 支援II_LocalLog_等相關環境變數, 控制寫Log及上傳LocalLog功能
		var dr = theSSO.User.EnvSettings.get("II_LocalLog_DateRange");
		
		//1090306	Leslie[1081088]	配合Log新增相關功能，logLevel改為只影響是否紀錄，移到外面設定
		var ll = theSSO.User.EnvSettings.get("II_LocalLog_Level");
		if(typeof ll === "string" && ll.length > 0) {
			AlternativeLogger.set("logLevel", ll);
		}
		else {
			// 2016.10.13 - iOS debug用log
			if ((window.iOS_device || enableIESaveLog) && typeof SSO_CONFIG.dev_MobileSaveLog=='boolean' && SSO_CONFIG.dev_MobileSaveLog) {
				ll = 4;
				AlternativeLogger.set("logLevel", ll);
			}
			theLogger.warn("環境變數II_LocalLog_Level未設定, 預設為" + AlternativeLogger.get("logLevel"));
		}
		
		// 2016.10.13 - iOS debug用log
		var enableIESaveLog = (_debugTime && navigator.userAgent.indexOf('Trident/7.')!==-1 && navigator.userAgent.indexOf('rv:11')!==-1) ? true : false;
		if ((typeof dr!=='string' || dr.length===0) && (window.iOS_device || enableIESaveLog) &&
			typeof SSO_CONFIG.dev_MobileSaveLog=='boolean' && SSO_CONFIG.dev_MobileSaveLog) {
			dr = SSO_CONFIG.dev_MobileLocalLogDateRange;
		}
		
		if(typeof dr === "string" && dr.length > 0) {
			var m = dr.split("-");	// 2016.9.6 正規表示式RegExp.$1不太可靠, 只好自己parse
			if(m.length == 2) {
				var sd = m[0],
					ed = m[1],
					td = new Date(),
					sd1 = new Date(Number(sd.substr(0, 3)) + 1911, Number(sd.substr(3, 2)) - 1, Number(sd.substr(5, 2)), 0, 0, 0, 0),
					ed1 = new Date(Number(ed.substr(0, 3)) + 1911, Number(ed.substr(3, 2)) - 1, Number(ed.substr(5, 2)), 23, 59, 59, 0);
				if (td >= sd1 && td <= ed1) {
					
					//1090306	Leslie[1081088]	配合Log新增相關功能，logLevel改為只影響是否紀錄，移到外面設定
					/*
					var ll = theSSO.User.EnvSettings.get("II_LocalLog_Level");
					if(typeof ll === "string" && ll.length > 0) {
						AlternativeLogger.set("logLevel", ll);
					}
					else {
						// 2016.10.13 - iOS debug用log
						if ((window.iOS_device || enableIESaveLog) && typeof SSO_CONFIG.dev_MobileSaveLog=='boolean' && SSO_CONFIG.dev_MobileSaveLog) {
							ll = 4;
							AlternativeLogger.set("logLevel", ll);
						}
						theLogger.warn("環境變數II_LocalLog_Level未設定, 預設為" + AlternativeLogger.get("logLevel"));
					}*/
					//1090306	Leslie[1081088]	配合Log新增相關功能，增加於登入時取得環境變數以設定是否啟用上傳Log功能，並依「IILocalLog_DateRange」設定調整
					AlternativeLogger.set('logAutoUpload', true);
					
					var up = theSSO.User.EnvSettings.get("II_LocalLog_UploadPath");
					if(typeof up === "string" && up.length > 0) {
						AlternativeLogger.set("uploadPath", up);

						// 2019.9.25 - Eric, add for performance log
						SSO_CONFIG.debugTime = true;
					}
					else {
						// 2016.10.13 - iOS debug用log
						if ((window.iOS_device || enableIESaveLog) && typeof SSO_CONFIG.dev_MobileSaveLog=='boolean' && SSO_CONFIG.dev_MobileSaveLog &&
							//1080117	Joe		1080049		弱掃修正Hardcoded Absolute Path
							// typeof SSO_CONFIG.dev_MobileLocalLogUploadPath=='string' && SSO_CONFIG.dev_MobileLocalLogUploadPath.length) {
							// up = SSO_CONFIG.dev_MobileLocalLogUploadPath;
							typeof theSSO.User.SystemSets.get("WORK_PATH") =='string' && theSSO.User.SystemSets.get("WORK_PATH").length) {
							var workPath = theSSO.User.SystemSets.get("WORK_PATH");
							if(workPath.substring(workPath.length-1) == '\\')
								workPath = workPath.substring(0, workPath.length-1) ;
							up = workPath + "\\LocalLog";
							//1080117	Joe		1080049		弱掃修正Hardcoded Absolute Path--E
							AlternativeLogger.set("uploadPath", up);
						}
						theLogger.warn("環境變數II_LocalLog_UploadPath未設定, 預設上傳LOG檔至'" + AlternativeLogger.get("uploadPath") + "'");
					}
					
					var ut = theSSO.User.EnvSettings.get("II_LocalLog_UploadThreshold");
					if(typeof ut === "string" && ut.length > 0)
						AlternativeLogger.set("autoUploadThreshold", ut);
					else
						theLogger.warn("環境變數II_LocalLog_UploadThreshold未設定, 預設自動上傳筆數為" + AlternativeLogger.get("autoUploadThreshold"));
				}
				else {	// 停止收集LOG
					theLogger.warn("超過環境變數II_LocalLog_DateRange設定的日期區間(" + dr + "), 停止收集LOG");
					//1090306	Leslie[1081088]	配合Log新增相關功能，增加於登入時取得環境變數以設定是否啟用上傳Log功能
					//AlternativeLogger.set("logLevel", 0);
					AlternativeLogger.set('logAutoUpload', false);
				}
			}
			else
				theLogger.warn("環境變數II_LocalLog_DateRange(" + dr + ")設定格式不符");
		}
		else {	// 停止收集LOG
			theLogger.warn("環境變數II_LocalLog_DateRange未設定, 停止收集LOG");
			//1090306	Leslie[1081088]	配合Log新增相關功能，增加於登入時取得環境變數以設定是否啟用上傳Log功能
			//AlternativeLogger.set("logLevel", 0);
			AlternativeLogger.set('logAutoUpload', false);
		}
	}
	/*
	 * 分析ODMSSP.GetUserInfo的回傳內容
	 */
	function _parseUserInfo(SAMLart, rslt) {
		var _dfd = $.Deferred();
	
		if (typeof rslt === 'object') {
			// parser user info into theSSO.User object
			if (!!window.theSSO) {
				window.theSSO.RawUser = rslt;
			}
			
			if (!window.theSSO.User) {
				_dfd.reject(new Error('@mLogin.js:_parseUserInfo(), window.theSSO.User is invalid!'));
				return _dfd.promise();
			}
			
			theSSO._dbgAlert('gonna SSOUtil.parseUserInfo() ...');
			
			//1050719 Kevin 改由UserInfo取得帳號
			/*var luserid = window.localStorage.latest_login_userid;
			//if (typeof luserid !=='undefined' && luserid.length) {
			//	luserid = luserid.toUpperCase();
			//}
			//window.theSSO.User.account = luserid;
			*/
				
			// parse user data (個人基資)
			SSOUtil.parseUserInfo(window.theSSO.User, rslt);
			
			theSSO._dbgAlert('gonna SSOUtil.parsePlayRoles() ...');
			
			// parse play roles
			if (!window.theSSO.User.PlayRoles) {
				window.theSSO.User.PlayRoles = [];
			}
			SSOUtil.parsePlayRoles(window.theSSO.User.PlayRoles, rslt);
			
			// parse linked cert(s) [2015.2]
			if (!window.theSSO.User.Certs) {
				window.theSSO.User.Certs = [];
			}
			SSOUtil.parseUserCerts(window.theSSO.User.Certs, rslt);
			
			// 設定預設角色為第1筆
			$('#roleid_input').data('roleIndex', 0);
			
			theSSO._dbgAlert('gonna SSOUtil.initSystemSettings() ...');
			
			// parse EnvSets
			if (!window.theSSO.User.EnvSettings) {
				theLogger.error('-ERR- theSSO.User.EnvSettings not defined...');
			}
			else {
				SSOUtil.initSystemSettings(window.theSSO.User.EnvSettings, window.theSSO.User.SystemSets, rslt);
				
				_setupLogger();
				
				// test
				if(!!_debug) {
					var sSubmitSign = theSSO.User.EnvSettings.get('II_SUBMIT_SIGN');
					var sServerSign = theSSO.User.EnvSettings.get('MS_SERVER_SIGN');
					theLogger.debug('II_SUBMIT_SIGN=\'' + sSubmitSign + '\', MS_SERVER_SIGN=\'' + sServerSign + '\'');
				}
			}
		}
	
		// 初始化角色選單

		// 2020.7.13 - Eric, dev test
		//let _default = 0;
		//if (localStorage['dev_debugDefaultRole']=='1') {
		//	_default = window.theSSO.User.PlayRoles.length-1;
		//}

		if (window.theSSO.User.PlayRoles) {
			var role = window.theSSO.User.PlayRoles[0];
			//var role = window.theSSO.User.PlayRoles[_default];
			
			// 2014.9 - 先取得角色orgNo的OrgInfo
			var orgNo = role.orgNo;
			var ls_Id = 'orgInfo_' + orgNo;
			if (typeof localStorage[ls_Id] !== 'string') {
				SSOUtil.getOrgInfo(SAMLart, orgNo);
			}
			var unitName = SSOUtil.getUnitName(role.orgNo, role.unitNo);
			var itemText = '';
			if (!!unitName) {
				itemText = unitName + '-' + role.name;
			}
			else {
				itemText = role.name;
			}
			$('#roleid_input')[0].value = itemText;
		}
		
		_initRoleListSpinWheel('roleid_input', true, 'bottom');
		//1131101	Leslie[1130977]	移除MobiScroll
		// $('#roleid_input').mobiscroll('setValue', [0]);
		theSSO.User.activeRoleIndex = 0;
		//$('#roleid_input').mobiscroll('setValue', [_default]);
		//theSSO.User.activeRoleIndex = _default;
		
		theLogger.log('EOF _parseUserInfo().');
			
		_dfd.resolve();
		return _dfd.promise();
	}

	/* 2021.5.3 - 1100333 Eric, merge: 
	 * 分析ODMSSP.GetUserInfo的回傳內容
	 */
	function _parseUserInfoByJSON(SAMLart, rslt) {
		var _dfd = $.Deferred();
		console.time('_parseUserInfoByJSON');

		theLogger.debug(SSOUtil.dev_getCurrentTimeStr() + ' -tm- _parseUserInfoByJSON() BEGIN...');
		let tmBeginParse = Date.now();

		if (typeof rslt === 'object') {
			// parser user info into theSSO.User object
			if (!!window.theSSO) {
				//window.theSSO.RawUser2 = rslt;
				window.theSSO.RawUser = rslt;
			}
			
			//if (!window.theSSO.User2) {
			if (!window.theSSO.User) {
				_dfd.reject(new Error('@mLogin.js:_parseUserInfo(), window.theSSO.User is invalid!'));
				return _dfd.promise();
			}
			
			theSSO._dbgAlert('gonna SSOUtil.parseUserInfo() ...');
			
				
			// parse user data (個人基資)
			SSOUtil.parseUserInfo2(window.theSSO.User, rslt);
			
			theSSO._dbgAlert('gonna SSOUtil.parsePlayRoles() ...');
			
			// parse play roles
			if (!window.theSSO.User.PlayRoles) {
				window.theSSO.User.PlayRoles = [];
			}
			SSOUtil.parsePlayRoles2(window.theSSO.User.PlayRoles, rslt);
			
			// parse linked cert(s) [2015.2]
			if (!window.theSSO.User.Certs) {
				window.theSSO.User.Certs = [];
			}
			SSOUtil.parseUserCerts2(window.theSSO.User.Certs, rslt);
			
			// 設定預設角色為第1筆
			$('#roleid_input').data('roleIndex', 0);
			
			theSSO._dbgAlert('gonna SSOUtil.initSystemSettings() ...');
			
			// parse EnvSets
			if (!window.theSSO.User.EnvSettings) {
				theLogger.error('-ERR- theSSO.User.EnvSettings not defined...');
			}
			else {
				SSOUtil.initSystemSettings2(window.theSSO.User.EnvSettings, window.theSSO.User.SystemSets, rslt);
				SSOUtil.dev_logTimeElapse('_parseUserInfoByJSON()', tmBeginParse);

				_setupLogger();
				
				// test
				if(!!_debug) {
					var sSubmitSign = theSSO.User.EnvSettings.get('II_SUBMIT_SIGN');
					var sServerSign = theSSO.User.EnvSettings.get('MS_SERVER_SIGN');
					theLogger.debug('II_SUBMIT_SIGN=\'' + sSubmitSign + '\', MS_SERVER_SIGN=\'' + sServerSign + '\'');
				}
			}
			
			//1120828	Leslie[1120750]	配合組改，增加初始化機關代碼對照表
			SSOUtil.initOrgMap(window.theSSO.OrgMap, rslt);
		}
		//1130122	Leslie[1120860]	設為伺服器端設定的預設角色
		var getRole = theWebServices.authws.getActiveRole(SAMLart);
		var defRoleIdx = (getRole.success)?theSSO.User.PlayRoles.findIndex((o)=>(o.id == getRole.roleId && o.unitNo == getRole.ouId && o.orgNo == getRole.orgNo)):0;
		
		// 初始化角色選單
		let _memberOf = rslt.AD_Account.m_MemberOf.Unit;
		if (theSSO.User.PlayRoles.length) {
			//1130122	Leslie[1120860]	設為伺服器端設定的預設角色
			// var role = theSSO.User.PlayRoles[0];
			var role = (defRoleIdx >=0)?theSSO.User.PlayRoles[defRoleIdx]:theSSO.User.PlayRoles[0];
			
			// 2021.5.3 - 1100333 Eric, merge: 2020.5.20 - 1090329 Eric, using m_MemberOf to get Name of Org/Unit
			// =>效能改善, 毋須下載OrgInfo即可取得扮演角色的單位及角色名稱!
			
			/*
			// 2014.9 - 先取得角色orgNo的OrgInfo
			let orgNo = role.orgNo;
			var ls_Id = 'orgInfo_' + orgNo;
			if (typeof localStorage[ls_Id] !== 'string') {
				SSOUtil.getOrgInfo(SAMLart, orgNo);
			}
			var unitName = SSOUtil.getUnitName(role.orgNo, role.unitNo);
			var itemText = '';
			if (!!unitName) {
				itemText = unitName + '-' + role.name;
			}
			else {
				itemText = role.name;
			}*/

			let i=0;
			let itemText='', unitName='';
			for(i=0; i<_memberOf.length; i++) {
				let _unit = _memberOf[i];
				if (_unit.m_UnitCode==role.unitNo) {
					unitName = _unit.m_UnitName;
					break;
				}
			}

			let orgCount = SSO_CONFIG.getOrgCount();
			let _orgBaseInfo = SSO_CONFIG.getOrgInfo(role.orgNo);
			if (orgCount>1) {
				if (unitName.length) {
					itemText = '[' + _orgBaseInfo.abbr + ']' + unitName + '--' + role.name;
				}
				else {
					itemText = '[' + _orgBaseInfo.abbr + ']' + role.name;
				}
			}
			else {
				if (unitName.length) {
					itemText = unitName + '--' + role.name;
				}
				else {
					itemText = role.name;
				}
			}

			$('#roleid_input')[0].value = itemText;
		}
		
		// 2021.5.3 - 1100333 Eric, merge: 2020.5.19 - 1090329 Eric
		_initRoleListSpinWheel('roleid_input', true, 'bottom', _memberOf);

		//1130122	Leslie[1120860]	設為伺服器端設定的預設角色
		//$('#roleid_input').mobiscroll('setValue', [0]);
		//theSSO.User.activeRoleIndex = 0;
		//1131101	Leslie[1130977]	移除MobiScroll
		// $('#roleid_input').mobiscroll('setValue', [defRoleIdx]);
		theSSO.User.activeRoleIndex = defRoleIdx;
		
		theLogger.log('EOF _parseUserInfoByJSON().');
			
		console.timeEnd('_parseUserInfoByJSON');
		_dfd.resolve();
		return _dfd.promise();
	}
	
	function _loadToDolist(SAMLart) {
		var _dfd = $.Deferred();
		
		// 載入待辦事項
		if(_standalone) {
			theSSO.MP.todolist.load();
			
			// 2014.8 - 載入清單後, 初始化文件夾清單spinWheel內容
			_initFolderListSpinWheel('selectedFolder', true, 'bottom');
			_initFolderListSpinWheel('selectedFolder_search', true, 'bottom');
				
			_dfd.resolve();
			theLogger.log('EOF _loadToDolist().');
			return _dfd.promise();
		}
		else {
			theSSO._dbgAlert('gonna odmssp.getToDoList() ...');
			
			var tmSecBeginA;
			var dfd = null;
			if (window.tdlUseJSON) {
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- ODMSSP.GetToDoListByJSON() BEGIN...');
					tmSecBeginA = Date.now();
				}
				dfd = theWebServices.odmssp.getToDoListByJSON(SAMLart, '', {async:true});
			}
			else {
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- ODMSSP.GetToDoList() BEGIN...');
					tmSecBeginA = Date.now();
				}
				dfd = theWebServices.odmssp.getToDoList(SAMLart, {async:true});
			}
			
			dfd.then(function(rslt) {
				theSSO._dbgAlert('gonna MP.todolist.load() ...');
				
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					if (window.tdlUseJSON) {
						SSOUtil.dev_logTimeElapse('ODMSSP.GetToDoListByJSON', tmSecBeginA);
					}
					else {
						SSOUtil.dev_logTimeElapse('ODMSSP.GetToDoList', tmSecBeginA);
					}
				}
				
				// 2016.7 - 設定是否隱藏燈號欄位,顯示補件狀況欄位
				var sEnablePerformance = theSSO.User.EnvSettings.SSO_ENABLE_PERFORMANCE;
				
				// 2016.10.30 - for performance trakcing...
				var forcePerformance = SSOUtil.getURLParameter('HideLights');
				if (forcePerformance=='Y') {
					sEnablePerformance = 'Y';
				}
				else if (forcePerformance=='N') {
					sEnablePerformance = 'N';
				}

				var showResupply = false;
				var sOrgId = theSSO.User.orgid;
				if (typeof sEnablePerformance=='string' && sEnablePerformance.length && SSOUtil.isValueTrue(sEnablePerformance)) {
					//if (typeof theSSO.User.orgid !== 'undefined' && theSSO.User.orgid=='A21020000I') {
					//	showResupply = true;
					//}
					theSSO.MP.todolist.builder.setHideLights(true, showResupply);
					
					// 置換header
					$('#mpContainer #todolist_cntr').html('');
					$('#mpContainer #todolist_cntr').append($(theSSO.MP.todolist.builder.getListHeader()));
				}
				/*else if (sOrgId=='A21020000I') {
					theSSO.MP.todolist.builder.setHideLights(false, true);
					// 置換header
					$('#mpContainer #todolist_cntr').html('');
					$('#mpContainer #todolist_cntr').append($(theSSO.MP.todolist.builder.getListHeader()));
				}*/
				else { 
					// 2018.9.28 - 1070955, 依環境變數設定, 顯示/隱藏特定欄位!
					
					//1140225	Leslie[1131246]	改叫用共用函式
					_reSetColumn();
					/*
					var showTransInfo=false, showSignType=true, showSignDueDate=false, showICOU=false, showICUser=false;
					var showFromOU=true, showFromOrg=false, showCurrLoc=false, showDocProperty=false;
					var sValue = theSSO.User.EnvSettings.get('MP_SHOW_TRANS_INFO');
					if (typeof sValue=='string' && SSOUtil.isValueTrue(sValue)) {
						showTransInfo = true;
					}

					sValue = theSSO.User.EnvSettings.get('MP_SHOW_SIGN_TYPE');
					if (typeof sValue=='string' && SSOUtil.isValueFalse(sValue)) {
						showSignType = false;
					}

					sValue = theSSO.User.EnvSettings.get('OD_SIGNDUEDATE');
					if (typeof sValue=='string' && sValue.length) {
						var settings = sValue.split('|');
						if (settings.length) {
							if (SSOUtil.isValueTrue(settings[0])) {
								showSignDueDate = true;
							}
						}
					}

					sValue = theSSO.User.EnvSettings.get('MP_SHOW_IC_DEPT_NAME');
					if (typeof sValue=='string' && SSOUtil.isValueTrue(sValue)) {
						showICOU = true;
					}

					sValue = theSSO.User.EnvSettings.get('MP_SHOW_IC_USER_NAME');
					if (typeof sValue=='string' && SSOUtil.isValueTrue(sValue)) {
						showICUser = true;
					}

					sValue = theSSO.User.EnvSettings.get('MP_SHOW_FROM_OU');
					if (typeof sValue=='string' && SSOUtil.isValueFalse(sValue)) {
						showFromOU = false;
					}

					sValue = theSSO.User.EnvSettings.get('MP_SHOW_FROM_ORG');
					if (typeof sValue=='string' && SSOUtil.isValueTrue(sValue)) {
						showFromOrg = true;
					}

					var folderDicuss='', subfolderDiscussHost='';
					sValue = theSSO.User.EnvSettings.get('MP_SHOW_CURR_LOCATE');
					if (typeof sValue=='string' && SSOUtil.isValueTrue(sValue)) {
						showCurrLoc = true;
						folderDicuss = theSSO.User.EnvSettings.get('FOLDER_DISCUSS');
						subfolderDiscussHost = theSSO.User.EnvSettings.get('SUBFOLDER_DISCUSS_HOST');
					}

					// 2019.1.24 - 1071075, 公文性質
					sValue = theSSO.User.EnvSettings.get('MP_SHOW_DOC_PROPERTY')
					if (typeof sValue=='string' && SSOUtil.isValueTrue(sValue)) {
						showDocProperty = true;
					}
										
					// 2019.2.21 - 1080211, 公文性質欄位可指定長度.
					let showDocPropertyLen = 5;
					if (showDocProperty) {
						sValue = theSSO.User.EnvSettings.get('MP_SHOW_DOC_PROPERTY_LENGTH')
						if (typeof sValue=='string' && sValue.length) {
							showDocPropertyLen = parseInt(sValue);
							if (typeof showDocPropertyLen!='number' || isNaN(showDocPropertyLen) || showDocPropertyLen<1 || showDocPropertyLen>15) {
								if (typeof showDocPropertyLen!='number' || isNaN(showDocPropertyLen) || showDocPropertyLen<1)
									showDocPropertyLen = 5;
								else 
									showDocPropertyLen = 15;

								theLogger.warn('-W- MP_SHOW_DOC_PROPERTY_LENGTH設定值為:' + sValue + '超出合理範圍(1-15), 強制設定為:' + showDocPropertyLen + '.');
							}
						}
					}
					
					// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期
					var showRcvDate = false;
					if(SSO_CONFIG.OrgNickName == 'SMEG')
						showRcvDate = true;

					// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期，add showRcvDate
					theSSO.MP.todolist.builder.setShowColumns(false, showSignType, showSignDueDate, showICOU, showICUser, !showTransInfo, showFromOU, showFromOrg, 
						showCurrLoc, folderDicuss, subfolderDiscussHost, showDocProperty, showDocPropertyLen, showRcvDate); // 2019.2.21 - 1080211

					// 置換header
					$('#mpContainer #todolist_cntr').html('');
					$('#mpContainer #todolist_cntr').append($(theSSO.MP.todolist.builder.getListHeader()));
					//}
					*/
				}
				
				var xmlToDoList;
				if (window.tdlUseJSON) {
					theSSO.MP.todolist.loadJSON(rslt.todolist); // rslt.todolist.ODWMSG [array of todo items]
				}
				else {
					theSSO.MP.todolist.load(xmlToDoList, rslt);
				}
				
				theSSO._dbgAlert('MP.todolist.load() finished...');
				
				// 2014.8 - 載入清單後, 初始化文件夾清單spinWheel內容
				_initFolderListSpinWheel('selectedFolder', true, 'bottom');
				_initFolderListSpinWheel('selectedFolder_search', true, 'bottom');
				
				if (localStorage.mp_display_mode=='icon' && !theSSO.MP.todolist.builder.shouldHideLights()) {
					$('#home #listPane').hide();
					$('#home #sidePane').hide();
					$('#home #iconPane').show();
					
					theSSO.MP.todolist.tdlicon_Scroll.refresh();
					var idx=0;
					if (SSOUtil.typeOf(theSSO.MP.todolist.folderScrolls)=='array') {
						for (idx=0; idx<theSSO.MP.todolist.folderScrolls.length; idx++) {
							theSSO.MP.todolist.folderScrolls[idx].refresh();
						}
					}
				}
				else {
					localStorage.mp_display_mode=='list';
				}
				
				// 2016.10.17
				if (theSSO.MP.todolist.builder.getSelectedFolder()=='') {
					theSSO.MP.todolist.builder.setSelectedFolder('全部');
				}
			
				theLogger.log('EOF _loadToDolist().');
				//1111223	Leslie[1111400]	登入系統時，如有待補簽的公文，需顯示提示訊息
				// _dfd.resolve();
				_dfd.resolve(rslt.AlertWaitResign);
			 })
			.fail(function(err) {
				_dfd.reject(err);
			 });
			
			return _dfd.promise();
		}
	}
	
	function _getSettingRsrcFile(SAMLart) {
		var _dfd = $.Deferred();
	
		// 取得MPRuleAOL及MPRule
		//var orgNo = window.theSSO.User.PlayRoles[0].orgNo;
		//SSOUtil.getMenuRule(SAMLart, orgNo, 'E');
		//SSOUtil.getMenuRule(SAMLart, orgNo, 'P');
		
		// Erin - 載入代理公文設定
		var theMPUiSetting = SSOUtil.getMPUiSetting(SAMLart);
		theSSO.MP.todolist.builder.setProxySetting(theMPUiSetting);
	
		theLogger.log('EOF _getSettingRsrcFile().');
		
		_dfd.resolve();
		return _dfd.promise();
    }
	
	if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
		theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- postLoginProcess() BEGIN...');
		window.tmBeginPostLogon = Date.now();
	}
	
	/* 2015.1 - 登入系統時清除localStorage (須保留Artifact) */
	// 2021.4.19 - 1100333 Eric, 若公文系統網頁與登入頁分開, 則保留login_page_config(由Login網頁記錄給公文系統網頁使用)
	let _href = window.location.href.toUpperCase();
	let _EDocPage = SSO_CONFIG.EDocPage.toUpperCase();
	if (_href.indexOf(_EDocPage)!==-1) {
		//1110324	Leslie[1101537]	[考試院]Merge 找不到的切換身份功能
		//SSOUtil.clearLocalStorage(['Artifact', 'login_page_config']);
		SSOUtil.clearLocalStorage(['Artifact', 'login_page_config', 'NewUser']);
		
		// 記錄SCard_Pin
		let keyword = sessionStorage['igotu'];
		if (typeof keyword=='string' && keyword.length) {
			theSSO.User.igotu = keyword;

			let keyLen = sessionStorage.length;
			for (i = 0; i < keyLen; i++){
				key = sessionStorage.key(i);
				if (key=='igotu') {
					sessionStorage.removeItem(key);
					break;
				}
			}
		}
		
		//1131004	Leslie[序272]	憑證(登入)時，將登入時的憑證改為優先選項
		if(!!sessionStorage['cCert'])
			localStorage['firstCert'] = sessionStorage['cCert'];
	}
	else {
		SSOUtil.clearLocalStorage(['Artifact']);
		//theSSOSSOUtil.clearSessionStorage(); ???
	}

	// 2019.11.1 - 1090927 Eric, for iOS DocSign debug
	if (window._devMode) {
		localStorage.scDevMode = '1';
	}
	else if ('scDevMode' in localStorage) {
		localStorage.scDevMode = '0';
	}
		
	//1080118 Kevin 1080049 修正Client Server Empty Password
	//$("#in_password")[0].value = ""; // 清空密碼
	$("#in_password").val('');
	
	let _tmBefore = Date.now();
	if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
		theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- registCookie BEGIN...');
	}

	//1080624	Leslie	[Merge 1070831]配合滲透測試修改，登入後直接把Artifact寫入Cookie
	var postData = new FormData();
	postData.append('ck',SAMLart);
	$.ajax({
		type:"POST",
		//1140415	Leslie[1140556]	改用Post方式傳送
		//url:SSO_CONFIG.ServerHost+"/iiws/registCookie.ashx?ck="+SAMLart,
		url:SSO_CONFIG.ServerHost+"/iiws/registCookie.ashx",
		data:postData,
		processData:false,
		contentType:false,
		//data:'{"ck":"'+SAMLart+'"}',	//保留功能
		//contentType:"application/json; charset=utf-8",
		// 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
		//dataType:"json"
		//dataType:"text"
	});

	if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
		SSOUtil.dev_logTimeElapse('registCookie DONE!', _tmBefore);
		_tmBefore = null;
	}
	
	// 記住最近登入的帳號
	var luserid = window.localStorage.latest_login_userid;
	if (typeof luserid !=='undefined' && luserid.length) { /* 2015.10 */
		luserid = luserid.toUpperCase();
	}
	
	// 2017.3.15	Leslie	重登入時，一律清掉"RD-CacheMgr.js"中的Cache[rsrc]
	theCacheMgr.rsrcCacheClear();
	
	// 2013.10 - 在日期後顯示Id(姓名!!!)
	var date = new Date();

	// 2021.2.17 - 1090927 Eric
	var sDate = '';
	if (window.location.href.indexOf('docvip.fdat.com.tw')!=-1 && window.SDLMode) {
		sDate = '' + (date.getMonth()+1) + '/' + date.getDate() + ' 周' + SSOUtil.getTCDayOfWeek(date.getDay());
	}
	else {
		//1110314	Leslie[1110167]	[考試院]UI調整	
    	//sDate = '' + (date.getMonth()+1) + '月' + date.getDate() + '日, 星期' + SSOUtil.getTCDayOfWeek(date.getDay());
		sDate = '' + (date.getFullYear() - 1911) + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日, 星期' + SSOUtil.getTCDayOfWeek(date.getDay());
	}
    //$('.date_info').text(sDate + ' - ' + luserid.toUpperCase());
				
	theSSO._dbgAlert('gonna invoke SAMLWS.GetUserInfo() ...');
	
	SSOUtil.loading('show', {text:'正在取得使用者資訊...', textVisible:true, theme:'c' });
	
	if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
		theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- SAMLWS.getUserInfoForPad() BEGIN...');
		_tmBefore = Date.now();
	}

	var fEnhanceStartHtml = false;
	// 取得使用者資訊 + 取得系統設定及機關資訊 + 取得待辦事項清單
	
	//1111223	Leslie[1111400]	登入系統時，如有待補簽的公文，需顯示提示訊息
	var alertWaitResign = '';
	
	// 2021.5.3 - 1100333 Eric, merge: 2020.5.19 - 1090329 Eric, get UserInfo by JSON string
	//theWebServices.SAMLWS.getUserInfoForPad(SAMLart, {async:true})
	theWebServices.SAMLWS.getUserInfoForPadByJSON(SAMLart, {async:true})
		.then(function(rslt) {
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
				SSOUtil.dev_logTimeElapse('SAMLWS.getUserInfoForPad', _tmBefore);
			}
			//1110624	Leslie[1110629]	配合首頁可支援客製化設定，移到首頁載入前執行
			theModMgr.include("Lib/Custom_" + SSO_CONFIG.OrgNickName + ".js");
			//return _parseUserInfo(SAMLart, rslt);
			return _parseUserInfoByJSON(SAMLart, rslt.userInfo); 
		})
		//1050719 Kevin 配合權杖登入介接方式，改以UserInfo儲存最後登入資訊
		.then(function() {
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
				let _log = SSOUtil.dev_getTimeElapseStr('[SSO]getUserInfoForPad [取得及初始化-使用者相關資訊及設定]', _tmBefore);
				theLogger.time(_log);
				_tmBefore = null;
			}
			
			window.localStorage.latest_login_orgid = theSSO.User.orgid;
			window.localStorage.latest_login_userid = theSSO.User.account;
			
			// 2016.10.19 - 記憶pincode?
			if (typeof pincode=='string' && pincode.length) {
				var keepPin = true;
				var rememberPincode = theSSO.User.EnvSettings.get('MP_REMEMBER_AOL_PINCODE');
				if (typeof rememberPincode=='string' && rememberPincode.length) {
					rememberPincode = rememberPincode.toLowerCase();
					if (rememberPincode=='false' || rememberPincode=='0') {
						keepPin = false;
					}
				}
				if (keepPin) {
					theSSO.User.igotu = pincode;
				}
			}
			
			//1050720 Kevin 新增通知訊息介接
			if(window.localStorage.RedirectPage && window.localStorage.RedirectPage !== '')
			{
				var strUrl = decodeURIComponent(window.localStorage.RedirectPage);
				
				//1140505	Leslie[1140556]	取消網址參數權杖
				// if(strUrl.indexOf("?") != -1)
					// strUrl = strUrl + "&SAMLart=" + SAMLart;
				// else 
					// strUrl = strUrl + "?SAMLart=" + SAMLart;
			
				//1051005 Kevin 支援首頁一併關閉功能
				//window.open(unescape(strUrl, ''));
				theStart.ChildWin.push(window.open(strUrl, ''));
				
				window.localStorage.removeItem('RedirectPage');
			}
		})
		.then(function() {
			/* 2016.4.1 - 應顯示姓名 */
			$('.date_info').text(sDate + ' - ' + theSSO.User.name);
			SSOUtil.loading('show', {text:'正在取得機關資訊及設定...', textVisible:true, theme:'c' });
			
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
				_tmBefore = Date.now();
			}
			return _getSettingRsrcFile(SAMLart);
		})
		.then(function(){
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
				SSOUtil.dev_logTimeElapse('[SSO]getSettingRsrcFile [取得設定及系統資源檔]', _tmBefore);
				theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- [SSO]_loadToDoList() BEGIN...');
				tmBefore = Date.now();
			}
			
			SSOUtil.loading('show', {text:'正在載入待辦事項...', textVisible:true, theme:'c' });
			
			// 2016.10.16
			if (typeof localStorage.mp_display_mode=='undefined') {
				if (typeof SSO_CONFIG.iOS_device=='boolean' && (SSO_CONFIG.iOS_device===true || (typeof window.forceUIMode=='string' && window.forceUIMode=='MOBILE'))) {
					localStorage.mp_display_mode = 'icon';
				}
				else {
					localStorage.mp_display_mode = 'list';
				}
			}
				
			return _loadToDolist(SAMLart);
		})
		//1111223	Leslie[1111400]	登入系統時，如有待補簽的公文，需顯示提示訊息
		// .then(function(){
		.then(function(argAlertWaitResign){
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
				SSOUtil.dev_logTimeElapse('[SSO]_loadToDoList [載入公文夾待辦事項內容]', _tmBefore);
				_tmBefore = Date.now();
			}
			
			//1110624	Leslie[1110629]	配合首頁可支援客製化設定，移到首頁載入前執行
			//theModMgr.include("Lib/Custom_" + SSO_CONFIG.OrgNickName + ".js");
			
			//1111223	Leslie[1111400]	登入系統時，如有待補簽的公文，需顯示提示訊息
			alertWaitResign = argAlertWaitResign;
			
			// 載入[首頁]模組
			//1050824 Kevin 每次重新登入時需重新取得首頁
			//if (typeof theSSO.startModuleLoaded == 'undefined' || theSSO.startModuleLoaded===false) {
				fEnhanceStartHtml = true;
				SSOUtil.loading('show', {text:'正在載入首頁內容...', textVisible:true, theme:'c' });
				return SSOUtil.injectHTMLModule('MS-Start.html', $('#startContainer')); // 2016.10.7 - ToDo:網頁後面加query string, 以解決cache問題!
            //}
		})
		.then(function() {
			var _dfd = $.Deferred();
			
			// 首頁套jQM
			if (fEnhanceStartHtml) {
				$('#startContainer').trigger('sso:moduleinit', [{}]); // 2016.6 - jQM enhanceWithin前trigger sso:moduleinit
                $('#startContainer').enhanceWithin();
				$('#startContainer').trigger('sso:modulecreate', [{}]); // 2016.6 - jQM enhanceWithin後trigger sso:modulecreate
				//1050824 Kevin 每次重新登入時需重新取得首頁
				//theSSO.startModuleLoaded = true;
				
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					SSOUtil.dev_logTimeElapse('[SSO]loadStartPage [載入首頁內容]', _tmBefore);
					_tmBefore = Date.now();
				}
            }
		
			//20160623 Kevin 二代改由Start實做
			// 2016.2.1 - 初始化系統部程式選單 (憑證整合設定網頁程式)
			//window.initSysMenu();
			
			/* 2016.4 - 初始化各側桌內容 */
			
			/* 2016.6 - 歷史簽辦側桌暫時移除 
			HistoryDocUtil.initClassifyListSpinWheel('selectedClassified');
			HistoryDocUtil.initHistoryDocList_List(); // 歷史簽辦側桌已移除...
			HistoryDocUtil.initWorkSpace();*/
			
			/* 2016.4 - 公文檢索側桌Demo */
			SSOUtil.loading('show', {text:'正在載入公文檢索項目...', textVisible:true, theme:'c' });
			//2016.11.16	Leslie	每次登入均重新取得檢索項目
			//if ($('#aki800ListWorkspace #querydoc_todolist_cntr .sBase').length===0) {
                //QueryDocUtil.initQueryDocList_List();
				theSSO.MP.queryDocList.init();
            //}
			QueryDocUtil.initWorkSpace();
			
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
				SSOUtil.dev_logTimeElapse('[SSO]init QueryDoc [載入公文檢索側屜內容]', _tmBefore);
				_tmBefore = Date.now();
			}
			
			// 2014.9
			window.scrollTo(0, 0);
			
			//1120424	Leslie[1120212]	(Merge)由這裡控制是否切至MP
			if(SSO_CONFIG.defaultShowMP == true){
				setTimeout(function() {
					theSSO.fastMPProcess = true;
					$('#btn_mp').trigger('click');
					theSSO.fastMPProcess = false;
				}, 100);
			}
			
			//1130502	Leslie[中榮序91]	中榮，登入時預設Folder
			if(theCustom.getCustomSet('DefaultFolderByLogin') != ''){
				setTimeout(function() {
					$('#selectedFolder').val(theCustom.getCustomSet('DefaultFolderByLogin')).trigger('change');
				}, 100);
			}
			
			//1130502	Leslie[中榮序92]	增修依設定啟用MP點擊任意處即可開啟公文
			if(theCustom.getCustomSet('MpEnableFullTrClick') == 'Y'){
				$(document).on('dblclick','#todolist_tb>tbody>tr',function(event){
					event.stopPropagation(); 
					if(!$(event.target).hasClass('docProc') && !$(event.target).hasClass('url_link'))
						$(this).find('td.docno').click(); 
				})
			}
			
			// 2019.7.30 - 1080654 Eric, 此時先不要拉起登入布幕
			// 2017.3.8 - login布幕上移量修正(依window高度計算)
			// var window_h = $(window).height();
			// var marginTop = window_h * 1.2;
			// $("#login").animate({"margin-top":'-'+marginTop+'px'}, 800,
			// 			function() {
			// 				$("#login").removeClass("login_slidedown").addClass("login_slideup");
			// 			});
			
			// 2014.7 - Eric Peng, 建立SignalR連線 (登出再登入時, 先清除原先的theSSO.chat物件)
			if (theSSO.chat) {
				theLogger.error('-ERR- _postLogonProcess(), theSSO.chat != null.');
			}
			
			//20150617 Kevin SignalR不支援NLB架構
			//SSOUtil.connectSignalR(SSO_CONFIG.ServerHost + '/SR/SignalR', SAMLart, luserid, window.localStorage.latest_login_orgid);
			SSOUtil.connectSignalR(SSO_CONFIG.SignalRHost + '/SR/SignalR', SAMLart, luserid, window.localStorage.latest_login_orgid);
			
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
				SSOUtil.dev_logTimeElapse('[SSO] connectSignalR() [即時通知訊息]', _tmBefore);
			}

			SSOUtil.loading('hide');
			
			// 將Wait Widget移回螢幕正中
			$('div.ui-loader').css('top', '50%');
			
			theSSO.logoned = true;
			_dfd.resolve();
			return _dfd.promise();
		})
		//.then(theWebServices.getUserInfo(theSSO.User.account, localStorage.Artifact, ''))
		//.then(thePublicRsrc.init)
		.then(function() {
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
				theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- [checkws]theWebServices.getUserInfo() BEGIN...');
				_tmBefore = Date.now();
			}
			return theWebServices.getUserInfo(theSSO.User.account, localStorage.Artifact, ''); // 2016.7.5 新增登入後直接呼叫公文製作的getUserInfo, 第3參數本是承辦單位ID, 在未開啟公文前沒機會得知, 故傳空白字串
		})	
		.then(function() {
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
				SSOUtil.dev_logTimeElapse('[checkws]theWebServices.getUserInfo() [公文製作用UserInfo]', _tmBefore);
				_tmBefore = Date.now();
			}
			return thePublicRsrc.init(); // 2016.7.5 新增登入後直接初始化資源檔
		})	
		.then(function() {	// 2016.7.5 新增初始化樣版清單
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
				SSOUtil.dev_logTimeElapse('[SSO]thePublicRsrc.init() [樣版清單及資源檔]', _tmBefore);
				_tmBefore = Date.now();
			}
			
			$("#newDocWorkspace #divUl").empty();	// 先清空清單項目, 或直接改SSO.html, 那就不需要執行這一行了
			thePublicRsrc.populateTmpl($("#newDocWorkspace #divUl"),
			function(tmplName, rsrcObj) {
				// TODO: onselect handler
				
			},
			function(tmplName, rsrcObj) {
				// TODO: onclickadd handler
				var isAOLOpened = false;
				if (typeof theAOL !== 'undefined') {
					var docOpened = theAOL.getCurrFolio();
					if (!!docOpened) {
						isAOLOpened = true;
					}
				}
				
				if (!isAOLOpened) {
					theSSO.MP.newDocProc(tmplName, rsrcObj);
				}
				else {
					localStorage.new_draft_from_tmpl = JSON.stringify(rsrcObj);
					theAOL.newDraftFromTmpl(); // 2016.10.11 - [序356]bug-fix
				}
			});
			$("#newDocWorkspace #divUl").listview("refresh").enhanceWithin();
			
			// 1100917 Raymond 1080763 合併1070348, 整個更新MP的範本選單項目的功能獨立為一個function, 以供AOL在刪除/新增範本時更新MP的範本選單
			theSSO.MP.updatePrivateSamples = function() {
				var $divUl2 = $("#newDocWorkspace #divUl2");
				
				// 1100922 Raymond 1080763 合併1070348, SSO更新範本選單時呼叫已移到nsEditor全域物件下的popPrivSample
				nsEditor.popPrivSample($divUl2, null, function(sampleName, rsrcObj) {	// onClickAdd callback
					theLogger.log("加入個人自訂範本文稿'" + sampleName + "'(ID:" + rsrcObj.id + ", FilePath:" + rsrcObj.filePath + ", Class:" + rsrcObj.cls + ")");
					
					var isAOLOpened = false;
					if (typeof theAOL !== 'undefined') {
						var docOpened = theAOL.getCurrFolio();
						if (!!docOpened) {
							isAOLOpened = true;
						}
					}

					// 1100917 Raymond 1080763 合併1070348, 不要設定docType, subDocType以免頁籤名無文別
					// docType, subDocType設為空值!
					//rsrcObj.docType = '';
					//rsrcObj.subDocType = '';
					
					if (!isAOLOpened) {
						theSSO.MP.newDocProc(sampleName, rsrcObj);
					}
					else {
						localStorage.new_draft_from_tmpl = JSON.stringify(rsrcObj);
						theAOL.newDraftFromTmpl(); // 2016.10.11 - [序356]bug-fix
					}
				}, function($li, rsrcFile) {	// onClickDel callback
					theLogger.log("刪除個人自訂範本文稿'" + rsrcFile.name + "'(ID:" + rsrcFile.id + ", FilePath:" + rsrcFile.filePath + ", Class:" + rsrcFile.cls + ")");
					
					// 1100917 Raymond 1080763 合併1070348, 新增傳入rsrcFile.cls做為新增的sampleClass參數
					//theWebServices.delPrivateExample(rsrcFile.wfioUrl, nsEditor._sampleRootPath, rsrcFile.filePath, rsrcFile.id)
					theWebServices.delPrivateExample(rsrcFile.wfioUrl, nsEditor._sampleRootPath, rsrcFile.filePath, rsrcFile.id, rsrcFile.cls)
						.done(function(sampleId, filePath) {
							theLogger.log("刪除'" + filePath + "'(ID:" + sampleId + ")成功");
							// 1100917 Raymond 1080763 合併1070348, 支援類別
							if($li.closest(".ui-collapsible").length && typeof filePath === "string" && filePath.length > 0) {	// 1100922 Raymond 用filePath是否為空判斷是否為刪除類別, 刪除類別的話, 不用計算剩餘範本數量
								var counts = $li.closest(".ui-collapsible").find("> h2 .ui-li-count").text();
								$li.closest(".ui-collapsible").find("> h2 .ui-li-count").text(counts - 1);
							}
							$li.remove();
							// 1100917 Raymond 1080763 合併1070348, 支援類別
							//var counts = $divUl2.find("> li").eq(0).find(".ui-li-count").text();
							//$divUl2.find("> li").eq(0).find(".ui-li-count").text(counts - 1);
						})
						.fail(function(errorText) {
							theLogger.log("刪除'" + rsrcFile.filePath + "'(ID:" + rsrcFile.id + ")失敗 - " + errorText);
							alert(errorText);
						});
				}, null);
			}
			theSSO.MP.updatePrivateSamples();	// 初始化時先執行一次更新範本選單功能
			
			// 1100922 Raymond 1080763 比照簽核模組的新增稿件頁籤新增共用範本功能
			thePublicRsrc.populateSample($("#newDocWorkspace #divUl2"), null, function(sampleName, rsrcFile) {
				theLogger.log("加入範本文稿'" + sampleName + "'(" + rsrcFile.name + ")");
				
				var isAOLOpened = false;
				if (typeof theAOL !== 'undefined') {
					var docOpened = theAOL.getCurrFolio();
					if (!!docOpened) {
						isAOLOpened = true;
					}
				}
				if (!isAOLOpened) {
					theSSO.MP.newDocProc(sampleName, rsrcFile);
				}
				else {
					localStorage.new_draft_from_tmpl = JSON.stringify(rsrcFile);
					theAOL.newDraftFromTmpl(); // 2016.10.11 - [序356]bug-fix
				}
				//panelWidget.close();
			}, null);
			//$("#newDocWorkspace #divUl2 ul").listview("refresh").enhanceWithin(); 
			
			// 1121222	Leslie[卡驗收序31]	新增依客製化設定創稿的預設簽核類型
			if(theCustom.getCustomSet("draftDefaultSignType") != ""){
				var defaultSignType = theCustom.getCustomSet("draftDefaultSignType");
				let bSignP = false,bSignE = true;
				if(defaultSignType == 'P'){
					bSignE = false;
					bSignP = true;
				}
				$('#radio-choice-signTypeP').prop('checked',bSignP).checkboxradio("refresh")
				$('#radio-choice-signTypeE').prop('checked',bSignE).checkboxradio("refresh")
			}
			
			// 1100917 Raymond 1080763 合併1070348, 新增切換樣版/範本
			$("#newDocWorkspace #newDoc_newTmpl").on('click', function() {
				$("#newDocWorkspace #divUl").show();
				$("#newDocWorkspace #divUl2").hide();
				$(this).addClass("ui-btn-active");
				$("#newDocWorkspace #newDoc_newSample").removeClass("ui-btn-active")
			});
			$("#newDocWorkspace #newDoc_newSample").on('click', function() {
				$("#newDocWorkspace #divUl").removeClass("ui-btn-active").hide();
				$("#newDocWorkspace #divUl2").addClass("ui-btn-active").show();
				$(this).addClass("ui-btn-active");
				$("#newDocWorkspace #newDoc_newTmpl").removeClass("ui-btn-active")
			});
			
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
				SSOUtil.dev_logTimeElapse('[SSO]initNewDocWorkSpace[創稿UI及功能]', _tmBefore);
			}
		})
		.then(function() {
			//1051130 Kevin 為了區分一二代公文系統，一律呼叫
			return window.theWebServices.authws.registIPWithArtifact(SAMLart);
			///* 2015.6 - 若由其它系統跳轉並自動登入, 須叫用AuthWS.RegistIPWithArtifact以建立IP<->Account mapping */
			//if (theSSO.logoned && (typeof registerIP !== 'undefined') && registerIP===true) {
			//	return window.theWebServices.authws.registIPWithArtifact(SAMLart);
			//}
			//else {
			//	var _dfd = $.Deferred();
			//	_dfd.resolve({});
			//	return _dfd.promise();
			//}
		})
		.then(function() { // 2019.7 - 108XXX Eric, 測試公文傳送子視窗
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
				SSOUtil.dev_logTimeElapse('[SSO]postLoginProcess', window.tmBeginPostLogon);
				SSOUtil.dev_logTimeElapse('登入公文系統作業', window.tmBeginLogin);
				window.tmBeginPostLogon = null;
			}
			
			//1100503	Leslie[1100333]	Merge登入效能調校，延遲載入JS檔，原單[1090329]
			if(typeof loadJS != 'undefined' && loadJS.length && loadJS.length > 0){
				loadJS.forEach(function(strJS){
					//1100816	Leslie	配合QA作業，調整版號宣告型式(變數格式為[ver=版號])
					//theModMgr.include(strJS+'?ver='+uJSVersion,'js');
					theModMgr.include(strJS+'?'+uJSVersion,'js');
				});
			}

			// 2019.7.30 - 1080654 Eric, 改在此時再拉起登入布幕
			var window_h = $(window).height();
			var marginTop = window_h * 1.2;
			$("#login").animate({"margin-top":'-'+marginTop+'px'}, 800,
				function() {
					$("#login").removeClass("login_slidedown").addClass("login_slideup");
					if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
						SSOUtil.dev_logTimeElapse('登入公文系統作業[含登入布幕拉起]', window.tmBeginLogin);
					}
			});
			
			//1111223	Leslie[1111400]	登入系統時，如有待補簽的公文，需顯示提示訊息
			if(typeof alertWaitResign == 'string' && alertWaitResign != '')
				alert(alertWaitResign);
			
			// 1100610 Raymond 1100659 gCustomMgr改在RD-CustomMgr.js中產生, 其他JS不要new CustomMgr(), 以避免重複new, 造成客製化註冊的callback不見, 發文機關選單未初始化(出現"測試機關"選項)的問題
			//1091015	Leslie[1090719]	配合客製化功能可增修於客製化JS中，調整載入客製化模組行為
			//window.gCustomMgr = new CustomMgr();
			//1110624	Leslie[1110629]	配合首頁可支援客製化設定，移到首頁載入前執行
			//theModMgr.include("Lib/Custom_" + SSO_CONFIG.OrgNickName + ".js");
			
			// 1110414 Raymond 1101578 再修正判斷是否啟用附件編輯功能的條件加入不支援AbortController的平台(IE), 及強制改為不匯出頁面模式的條件
			// 1110411 Raymond 1101578 判斷環境變數改為全域變數, 並增加判斷不支援的iPad、Mac、行動平台, 會自動停用附件編輯功能
			// 1110406	Leslie[1101578] 新增附件編輯相關功能
			window.enableAttachDirectEdit = false;
			if ('AOL_ENABLE_ATTACH_DIRECT_EDIT' in theSSO.User.EnvSettings && theSSO.User.EnvSettings.get("AOL_ENABLE_ATTACH_DIRECT_EDIT") == "Y"){
				SSO_CONFIG.enableConvertAttPage = false;	//啟用附件編輯模式下，強制改為不匯出頁面模式
				if (!(window.iOS_device || window.realMac || navigator.userAgent.search(/Mobile/gi) > 0 || !window.AbortController))
					window.enableAttachDirectEdit = true;
			}
			if (window.enableAttachDirectEdit) {
				
				//查詢模組是否正常運行
				if(!window.theAttEditMgr) {
					var _mgmtUrl = "localhost:21001";

					var controller = new AbortController();
					
					var callID = setTimeout(function(){
						console.log("fetch.setTimeout...Abort()");
						controller.abort();
						}, 5000);
						
					// 查詢模組是否正常運行
					function _query() {
						var dfd = $.Deferred();
						console.log("AttEditModule.query()...");
							return doQuery();
						function doQuery() {
							var url = "http://" + _mgmtUrl + "/query?target=moduleStatus";
							fetch(url,{
								signal: controller.signal
							})
							.then(function(resp) {
								console.log("AttEditModule.query() returns", resp.statusText);
								return resp.json();
							})
							.then(function(ro) {
								console.log("AttEditModule.query() returns", ro);
								if(ro.success == true)
									dfd.resolve(ro.version);	// 成功時回傳版號
								else
									dfd.reject(ro.errMsg, ro.errCode);	// 失敗時回傳錯誤訊息及代碼
							})
							.catch(function(e) {
								console.error("AttEditModule.query() failed!", e);
								dfd.reject(e);
							});
							return dfd.promise();
						}
					}
					
					_query()
					.done(function(res) {
						if(res >= "1.0") {	// query成功會回傳版號, 目前只發布了1.0版
							theLogger.log('[公文附件編輯模組]已啟用，版本：'+res+'。');
						}
						clearTimeout(callID);
					})
					.fail(function() {
						clearTimeout(callID);
						//失敗，提示要安裝
						theLogger.log('[公文附件編輯模組]未啟用。');

                        // 2023.2.14 - Eric, ToDo: 考試院保固需求序4, 提示異常排除說明文件
						//alert('找不到[公文附件編輯模組]，請確認是否已啟動或正確安裝。');
                        let strSSOFAQMsg = theSSO.User.EnvSettings.get('SSO_FAQ_MSG')
                        let strFAQ = ''
                        if (strSSOFAQMsg.length) {
                            let listFAQ = strSSOFAQMsg.split(';')
                            if (listFAQ.length > 0) {
                                strFAQ = listFAQ[0]
                            }
                        }
                        if (strFAQ.length) {
                            alert('找不到[公文附件編輯模組]，請確認是否已啟動或正確安裝。\n請參閱說明文件："' + strFAQ + '"以排除異常。');
                        }
                        else {
                            alert('找不到[公文附件編輯模組]，請確認是否已啟動或正確安裝。');
                        }
                        /*
                        function _showWarning(errorText) {
                            //let dfd = $.Deferred()
                        
                            let msg = '';
                            let faqUrl = 'tools/atteditaux_faq.pdf';
                            if (errorText.length>0) {
                                msg = errorText + "\r\n\r\n未啟動[公文附件編輯模組], 系統將以舊有方式下載/開啟附件!<br>";
                                msg += '請參閱：<a href="' + faqUrl + '" style="cursor:pointer" tarfget="_blank">[公文附件編輯模組]異常排除說明</a> FAQ排除異常'
                            }
                            else {
                                msg = "未啟動[公文附件編輯模組], 系統將以舊有方式下載/開啟附件!<br>";
                                msg += '請參閱：<a href="' + faqUrl + '" style="cursor:pointer" target="_blank">[公文附件編輯模組]異常排除說明</a> FAQ排除異常'
                            }

                            var param = {title: "[公文系統提示]",
                                message: msg,
                                buttons: [{	name: "確定",
                                            action: function() {
                                                    theLogger.log("使用者關閉提示視窗!");
                                                    //dfd.resolve({answer:1, asked:false});
                                                }
                                            }],
                                beforeShow: function() {
                                    //$(".contentPane").css("overflow", "hidden");	// 提示訊息顯示後, 禁止文稿頁面捲動
                                },
                                afterHide: function() {
                                    //$(".contentPane").css("overflow", "");	// 提示訊息關閉後, 恢復文稿頁面捲動
                                }
                            };
                            $.confirm(param);	
                            return; //dfd.promise();
                        }
                        _showWarning('');
                        */
					});
				}
			}

			let submitMode = theSSO.User.EnvSettings.get('AOL_SUBMIT_MODE');
			let preOpenSignPage = SSOUtil.isValueTrue(SSOUtil.getURLParameter('preOpenSubmitPage'));
			if (preOpenSignPage && typeof submitMode=='string' && submitMode.toLowerCase()=='signpage') {
				DocSubmitUtil.setupDocSubmitProcPage()
				.then(function(rslt) {
					// 設定啟用自動開次筆及是否用進階模式!
					// if (envName!=='AOL_AUTO_OPEN_NEXT_DOC' || envName!=='AOL_OPEN_NEXT_DOC_USE_ADVMODE') {
					let _envName = 'AOL_AUTO_OPEN_NEXT_DOC';
					let _envValue = 'N';
					let _remove = true;
					let _prmUserEnvSet = null;
					if (window.openNextDoc) {
						_envValue = 'Y';
						_remove = false;
						_prmUserEnvSet = theWebServices.authws.UpdateUserEnvSet(SAMLart, _envName, _envValue, _remove, {async:true});
					}
					else {
						let _dfdTmp = $.Deferred();
						_dfdTmp.resolve({success: true, skip: true});
						_prmUserEnvSet = _dfdTmp.promise();
					}

					_prmUserEnvSet
					.then(function(rslt) {
						theLogger.log('invoke authws.UpdateUserEnvSet(EnvName=' + _envName +', EnvVale='+ _envValue +') return:' + JSON.stringify(rslt));
						_envName = 'AOL_OPEN_NEXT_DOC_USE_ADVMODE';
						if (window.openNextDocAdvMode) {
							_envValue = 'Y';
							_remove = false;
							return theWebServices.authws.UpdateUserEnvSet(SAMLart, _envName, _envValue, _remove, {async:true})
						}
						else {
							let _dfdTmp = $.Deferred();
							_dfdTmp.resolve({success: true, skip: true});
							return _dfdTmp.promise();
						}
					})
					.then(function(rslt){
						theLogger.log('invoke authws.UpdateUserEnvSet(EnvName=' + _envName +', EnvVale='+ _envValue +') return:' + JSON.stringify(rslt));
					})
					.fail(function(errRslt) {
						theLogger.error('Invoke authws.UpdateUserEnvSet() failed, errRslt:' + JSON.stringify(errRslt));
					});
				})
				.fail(function(errRslt){
					theLogger.error('Invoke DocSubmitUtil.setupDocSubmitProcPage() failed, errRslt=' + JSON.stringify(errRslt));
				});
			}
		})
		.fail(function(err) {
			// TBC: do clean and logout process here...
			if (typeof err=='object' && typeof err.description=='string' && err.description.length) {
			alert(err.description);
				theLogger.error('_postLoginProcess() failed. err=' + err.description);
			}
			else {
				//1111215 Kevin 調整先寫出Log
				theLogger.error('_postLoginProcess() failed.' + (typeof err=='object')?('err=' + err.toString()):'');
				alert('登入系統作業失敗!');
			}
			SSOUtil.loading('hide');

			// 2021.4.19 - 1100333, Eric Peng - 登入後初始化作業失敗, 強制回Login(登入)頁!
			let _href = window.location.href.toUpperCase();
			let _EDocPage = SSO_CONFIG.EDocPage.toUpperCase();
			if (_href.indexOf(_EDocPage)!==-1) {
				SSOUtil.clearLocalStorage(null);
				window.location.href = SSO_CONFIG.LoginPage;
			}
			
			return false;
		});

	theLogger.log('-III- after GetUserInfo/GetRsrcFile/GetToDoList.');
	
	try {
		// 2013.4 - Erin, 取得跑馬燈訊息 
		var msg = theWebServices.authws.getSpotLightMsg(localStorage.Artifact);
		if (typeof msg === 'string') {
			$("#latest_notify_subject").text(msg);
		}
	}
	catch(err) {
		alert('取得跑馬燈訊息發生錯誤!');
		// 2021.4.19 - 1100333, Eric Peng - 登入後初始化作業失敗, 強制回Login(登入)頁!
		let _href = window.location.href.toUpperCase();
		let _EDocPage = SSO_CONFIG.EDocPage.toUpperCase();
		if (_href.indexOf(_EDocPage)!==-1) {
			SSOUtil.clearLocalStorage(null);
			window.location.href = SSO_CONFIG.LoginPage;
		}
	}
	
	/* 監測 localStorage['signValue']的異動, 以完成公文傳送作業! [使用iOS簽章App才有用] */
    window.addEventListener("storage", theSSO.handleStorageEvent, true);
	
	theLogger.log('-I- EOF _postLoginProcess.');
	return true;
}

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
}
/*
 * 1. [首頁]/[公文夾]/[公布欄]切換按鈕,
 * 2. [重取]按鈕
 */
function _bindTopToolBarButtons() {
	var $btns = $("#home #mainMenu > div");
	var $btn_start = $($btns[0]);
	var $btn_mp = $($btns[1]);
	var $btn_billboard = $($btns[2]);
	
	var $start = $("#startContainer");
	var $mp = $("#mpContainer");
	var $billboard = $("#billboard");
	
	// 按下上方工具列左邊的 '首頁' tab
	$('#btn_start').on( 'click', function() {		
		var $targetPage = $start; //("#startContainer");
		var newIndex = 0;
		
		// 取得#mainPageContainer之高度
		var total_h = $("#mainPageContainer").outerHeight(false);

		// 目前顯示之頁面?
		var curIndex = 0;
		if ($btns.length) {
			for(var i=0; i<$btns.length; i++) {
				if ($($btns[i]).hasClass("selected")) {
					curIndex = i;
					break;
				}
			}
		}
					
		if (curIndex == _getSubPageIndex("btn_start")) { // 目前已顯示首頁!
			
			//1110805	Leslie	首頁待辦件數於顯示時，點擊回首頁一併更新(個人專區一併處理)
			if(!theSSO.MP.CheckLoginStatus())
				return;			
			if(SSO_CONFIG.MP_ENABLE_COUNT_LIST == "Y")
				theStart.InitTodoCountList();
			if('USE_PERSONAL' in theSSO.User.SystemSets && theSSO.User.SystemSets['USE_PERSONAL'] == 'Y')
				theStart.InitPA();
			return;
		}
		
		/* 2016.4 - 隱藏左上角抽屜 button */
		//$('#btn_Drawer').show();
		
		$btns.removeClass('selected');
		$btn_start.addClass('selected');
		
		var indexer_left = (80*newIndex) + (newIndex+1);
		$('#bottom-line').css('left', '' + indexer_left + 'px'); // '1px' // 2011.11 - 移動Tab下方連接線(讓button tab看起來與下方之內容在同一區域)
		
		var clientH = $mp.height();
		
		// 準備todolist頁面 -> 顯示在螢幕上方, z-index 設定大於目前頁面
		var $currentPage = null;
		if (curIndex==1) {
			$currentPage = $mp;
		}
		else {
			$currentPage = $billboard;
		}
		
		/* 2016.5 - 改用change css class solution*/
		if (typeof $targetPage[0].style.transform !== 'undefined') {
			$targetPage.show();
			setTimeout(function(){
				$targetPage.addClass('slidedown_page');
				$currentPage.removeClass('slidedown_page');
			}, 50);
        }
		
		// 2018.4.12 - Eric, bug-fix 登入系統之後再叫用!
		if (theSSO.logoned) {
			
			//1091231 Kevin 1090722 新增權杖&SR連線檢核
			if(!theSSO.MP.CheckLoginStatus())
				return;
		
			//1061211 Kevin 1061116 切回首頁時更新公告以及公布欄以及跑馬燈
			if (theSSO.User.EnvSettings.get("DESKTOP_BULLETIN") != "0")
				theStart.InitBU();

			if (theSSO.User.EnvSettings.get("DESKTOP_TB") != "0")
				theStart.InitTB();
			
			var msgSpot = theWebServices.authws.getSpotLightMsg(localStorage.Artifact);
			if (typeof msgSpot === 'string') {
				$("#latest_notify_subject").text(msgSpot);
			}
			
			//1110505	Leslie	首頁待辦件數於顯示時，點擊回首頁一併更新(個人專區一併處理)
			if(SSO_CONFIG.MP_ENABLE_COUNT_LIST == "Y")
				theStart.InitTodoCountList();
			if('USE_PERSONAL' in theSSO.User.SystemSets && theSSO.User.SystemSets['USE_PERSONAL'] == 'Y')
				theStart.InitPA();
		}
		
		//$('#leftDrawer').hide();
	});
	
	// 按下上方工具列左邊的 '公文夾' tab
	$('#btn_mp').on( 'click', function() {
		var $targetPage = $mp;
		var newIndex = 1;
		
		// 取得#mainPageContainer之高度
		var total_h = $("#mainPageContainer").outerHeight(false);

		// 目前顯示之頁面?
		var $btns = $("#home #mainMenu > div");
		var curIndex = 0;
		if ($btns.length) {
			for(var i=0; i<$btns.length; i++) {
				if ($($btns[i]).hasClass("selected")) {
					curIndex = i;
					break;
				}
			}
		}
					
		if (curIndex == _getSubPageIndex("btn_mp")) { // 目前已顯示公文夾!
			return;
		}
		
		/* 2016.4 - 隱藏左上角抽屜 button */
		$('#btn_Drawer').hide();
		
		$btns.removeClass('selected'); //$('#mainMenu > div').removeClass('selected');
		$btn_mp.addClass('selected'); //$('#btn_todolist').addClass('selected');
		
		var indexer_left = (80*newIndex) + (newIndex+1);
		$('#bottom-line').css('left', '' + indexer_left + 'px'); // '82px'); // 2011.11 - 移動Tab下方連接線(讓button tab看起來與下方之內容在同一區域)
		
		var clientH = $mp.height();
		
		// 準備todolist頁面
		var $currentPage = null;
		if (curIndex===0) {
			$currentPage = $start;
		}
		else {
			$currentPage = $billboard;
		}
				
		/* 2016.5 - 改用change css class solution */
		if (typeof $targetPage[0].style.transform !== 'undefined') {
			setTimeout(function(){
				$targetPage.addClass('slidedown_page');
				$currentPage.removeClass('slidedown_page');
			}, 50);
        }
				
		$('#leftDrawer').show();
		
		//1091231 Kevin 1090722 新增權杖&SR連線檢核
		if(!theSSO.MP.CheckLoginStatus())
			return;
	});
	
	// 按下上方工具列左邊的 '公布欄' 頁籤
	$('#btn_billboard').on( 'click', function() {
		var $targetPage = $billboard;
		var newIndex = 2;
				
		// 取得#mainPageContainer之高度
		var total_h = $("#mainPageContainer").outerHeight(false);

		// 目前顯示之頁面?
		var curIndex = 0;
		if ($btns.length) {
			for(var i=0; i<$btns.length; i++) {
				if ($($btns[i]).hasClass("selected")) {
					curIndex = i;
					break;
				}
			}
		}
					
		if (curIndex == _getSubPageIndex("btn_billboard")) { // 目前已顯示首頁!
			return;
		}
		
		/* 2016.4 - 隱藏左上角抽屜 button */
		//$('#btn_Drawer').show();
		$btns.removeClass('selected');
		$btn_start.addClass('selected');
		
		var indexer_left = (80*newIndex) + (newIndex+1);
		$('#bottom-line').css('left', '' + indexer_left + 'px'); // '1px' // 2011.11 - 移動Tab下方連接線(讓button tab看起來與下方之內容在同一區域)
		
		var clientH = $mp.height();
		
		// 準備billboard頁面
		var $currentPage = null;
		if (curIndex==1) {
			$currentPage = $mp;
		}
		else {
			$currentPage = $start;
		}
		
		/* 2016.5 - 改用change css class solution*/
		if (typeof $targetPage[0].style.transform !== 'undefined') {
			$targetPage.show();
			setTimeout(function(){
				$targetPage.addClass('slidedown_page');
				$currentPage.removeClass('slidedown_page');
			}, 50);
        }
		
		//$('#leftDrawer').hide();
	});
	
	// 按[重取]按鍵觸發重取待辦事項!
	// 2016.6 - 目前只實作todolist重取, 尚未實作首頁通知事項重取!
	//1110314	Leslie[1110167]	[考試院]UI調整	
	//$('#btn_reload').on('click', function() {
	$('#btn_reload, .btn_reload').on('click', function() {
		if (confirm('確定要重新取得待辦清單及通知?')===false) {
			return;
		}
		
		//1091231 Kevin 1090722 新增權杖&SR連線檢核
		if(!theSSO.MP.CheckLoginStatus('使用者重取待辦'))
			return;
		
		if (theSSO.MP.todolist!==undefined) {
			SSOUtil.loading('show', {text:'正在清除既有待辦清單項目...', textVisible:true, theme:'c' });
			
			// 2019.12.6 - 1080339 Eric, jQuery 3 升級後若在真正取得待辦清單前click公文夾選單button, 會造成選單失效問題修正!
			$('#listPane #selectedFolder').prop('disabled', true);
			$('#sidePane #selectedFolder_search').prop('disabled', true);

			theSSO.MP.todolist.builder.emptyToDoList_Icon('todolist_icon_cntr');
			theSSO.MP.todolist.builder.emptyToDoList_List('todolist_tb > tbody');
			theSSO.MP.todolist.builder.emptyToDoList_SearchList('search-list');
			
			// 2016.10.16
			$('#listPane #tdl_list_filter').val('');
			$('#sidePane #tdl-searchview-filter-input').val('');
			theSSO.MP.todolist.builder.setFilterWord('');
			
			/*
			 * 2015.9.20 - Eric Peng [重設清單後立即sort!]
			 *  1. 比對目前sort設定, 若同項目, 則反向! 不同項目, 則依欄位預設屬性正/反向
			 *  2. 作業完成記錄sort設定於 <table data-sortIndex='xxx' data-sortReverse='x'>, 以供下次排序作業比對.
			 */
			var sIndex = $('.sData #todolist_tb').attr('data-sortIndex');
			var currentIndex = parseInt(sIndex);
			
			// 2016.9.6 - 記錄目前檢視的文件夾
			var defaultSelFolder = '全部';
			
			// 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
			//var selFolder = $('#listPane #selectedFolder').attr('value');
			var selFolder = $('#listPane #selectedFolder').val();
			if (typeof selFolder !=='string' || selFolder.length===0) {
				selFolder = defaultSelFolder;
			}
			
			var sorting = null;
			var sortDir = 0;
			var defaultSortIdx = theSSO.MP.todolist.builder.getDefaultSortIndex(); // 預排使用文號排序
			var idx = defaultSortIdx;
			var sReverseSort;
			if (currentIndex!==-1) { // 2016.12.8 - 未排序過就不sort
                if (currentIndex==defaultSortIdx) {
                    sReverseSort = $('.sData #todolist_tb').attr('data-sortReverse');
                    if (SSOUtil.typeOf(sReverseSort)!='string' || sReverseSort.length<=0) {
                        sReverseSort = 0;
                    }
                    if (typeof sReverseSort != 'string') {
                        sReverseSort = '0';
                    }
                    sortDir = (sReverseSort=='0' || sReverseSort==='') ? 0 : 1;
                    sorting = [[idx, sortDir]];
                }
                else {
                    // set sorting column and direction, this will sort on the first and third column the column index starts at zero
                    sReverseSort = $('.sData #todolist_tb').attr('data-sortReverse');
                    if (typeof sReverseSort != 'string') {
                        sReverseSort = '0';
                    }
                    sortDir = (sReverseSort=='0' || sReverseSort==='') ? 0 : 1;
                    sorting = [[currentIndex, sortDir], [defaultSortIdx,0]];
                    idx = currentIndex;
                }
			}
			// ToDo: 重取時清除sort資訊!!!
			//$('.sData #todolist_tb').attr({'data-sortIndex': '', 'data-sortReverse': '0'});
			
			// 清除圖像示清單原有文件夾項目
			do {
				theSSO.MP.todolist.folderScrolls.pop();
			} while(theSSO.MP.todolist.folderScrolls.length);
			
			var $iconCntr = $('#todolist_icon_cntr');
			$iconCntr.width(0);
			if (theSSO.MP.todolist.tdlicon_Scroll) {
				theSSO.MP.todolist.tdlicon_Scroll.refresh();
			}
			
			SSOUtil.loading('show', {text:'正在載入待辦事項...', textVisible:true, theme:'c' });
		
			var xmlToDoList;
			var dfd = null;
			if (window.tdlUseJSON) {
				dfd = theWebServices.odmssp.getToDoListByJSON(localStorage.Artifact, {async:true});
			}
			else {
				dfd = theWebServices.odmssp.getToDoList(localStorage.Artifact, {async:true});
			}
			
			dfd.then(function(rslt) {
				theSSO._dbgAlert('gonna MP.todolist.load() ...');
			
				if (window.tdlUseJSON) {
					theSSO.MP.todolist.loadJSON(rslt.todolist);
				}
				else {
					theSSO.MP.todolist.load(xmlToDoList, rslt);
				}
				theSSO._dbgAlert('MP.todolist.load() finished...');
				
				// 2014.8 - 載入清單後, 初始化文件夾清單spinWheel內容
				// reset SpinWheels
				//1131101	Leslie[1130977]	移除MobiScroll
				// $('#listPane #selectedFolder').scroller('clear');
				// $('#listPane #selectedFolder').scroller('destroy');
				$('#listPane #selectedFolder').prop('value', selFolder);
				
				// 2016.9.27, 半開模式應為#sidePane
				//1131101	Leslie[1130977]	移除MobiScroll
				// $('#sidePane #selectedFolder_search').scroller('clear');
				// $('#sidePane #selectedFolder_search').scroller('destroy');
				$('#sidePane #selectedFolder_search').prop('value', defaultSelFolder);
				
				// 2019.12.6 - 1080339 Eric, jQuery 3 升級後若在真正取得待辦清單前click公文夾選單button, 會造成選單失效問題修正!
				// 作業完成, enable buttons.
				$('#listPane #selectedFolder').prop('disabled', false);
				$('#sidePane #selectedFolder_search').prop('disabled', false);

                // 2023.4.17 - 1120067 Eric, 切換代理角色後, 只顯示特定代理人待辦項目
                let active_role = null;
                let _doclist_proxy = null;
                let enableShowProxyDocOnly = SSOUtil.isValueTrue(theSSO.User.EnvSettings.get('SSO_ENABLE_SHOW_PROXYDOC_ONLY'));
                if (enableShowProxyDocOnly) {
                    active_role = theSSO.User.PlayRoles[theSSO.User.activeRoleIndex];
                    if (active_role.proxyAccount.length) {
                        // 只顯示特定代理人待辦項目
                        _doclist_proxy = theSSO.MP.todolist.builder.getProxyRoleDocList(active_role);
                    }
                }

				_initFolderListSpinWheel('selectedFolder', true, 'bottom', _doclist_proxy);
				_initFolderListSpinWheel('selectedFolder_search', true, 'bottom', _doclist_proxy);

				if ($('#listPane').is(':visible'))
				{
					var tdlBuilder = theSSO.MP.todolist.builder;
					if ($('#todolist_tb > tbody > tr').length===0) {
						if (selFolder==defaultSelFolder) { // 2016.9.6 - 套用重取前的文件夾
							tdlBuilder.makeToDoList_List_DOM('todolist_tb > tbody', '', '', 0, active_role);
						}
						else {
							// 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
							//$('#listPane #selectedFolder').attr('value', selFolder);
							$('#listPane #selectedFolder').val(selFolder);
							tdlBuilder.makeToDoList_List_DOM('todolist_tb > tbody', selFolder, '', 0, active_role);
						}
					}
					else if (selFolder!=defaultSelFolder) {
						// 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
						//$('#listPane #selectedFolder').attr('value', selFolder);
						$('#listPane #selectedFolder').val(selFolder);
						tdlBuilder.makeToDoList_List_DOM('todolist_tb > tbody', selFolder, '', 0, active_role);
					}
						
					// 2011.11.14 - 燈號
					$("#todolistToolbar .red_cnt").text(tdlBuilder.lights.red);
					$("#todolistToolbar .yellow_cnt").text(tdlBuilder.lights.yellow);
					$("#todolistToolbar .white_cnt").text(tdlBuilder.lights.white);
					$("#todolistToolbar .green_cnt").text(tdlBuilder.lights.green);
					$("#todolistToolbar .purple_cnt").text(tdlBuilder.lights.purple);
					
					// 2015.9 - 排序元件update cache內容.
					var $tableForSort = $('.sData #todolist_tb');
					$tableForSort.trigger('update', {
						callback : function() {
							// 排序!
							if (!!sorting) { // 2016.12.8 - Eric Peng, 可能不排序
								// 2019.4.25 - 1071242, Eric - 公文夾無待辦時, [重取待辦]作業會有錯誤造成後續待辦清單顯示異常問題修正.
								var todoCount = $tableForSort.find('tbody tr').length;
								if (todoCount>=1) {
									$tableForSort.trigger("sorton", [sorting]);
								}
								// 記錄本次排序設定.
								$('.sData #todolist_tb').attr({'data-sortIndex': idx.toString(), 'data-sortReverse': sortDir.toString()});
							}
						}
					});
					
					// 2016.6 - 首頁更新 (statInfo: red/yellow/unread)
					var statInfo = tdlBuilder.getToDoListNumbers();
					$('#home').trigger('sso:todolist_reloaded', [
						{lights: {red:statInfo.read, yellow: statInfo.yellow, unread:statInfo.unread},
						 folders:{}}
					]);
				}
				
				if ($('#home #sidePane').is(':visible')) {
					var extraParam = {
						selectedFolder: theSSO.MP.todolist.builder.getSelectedFolder(),
						filterWord: theSSO.MP.todolist.builder.getFilterWord(),
					};
					SSOUtil.loading('show');
					
					_initDocPreviewContent(extraParam);
					
					SSOUtil.loading('hide');
				}
				
				theStart.InitFlotImp();
				theStart.InitFlotTodo('', '');
				
				SSOUtil.loading('hide');
			 })
			.fail(function(err) {
				theLogger.error('-ERR- invoke ODMSSP.GetToDoList() failed.');
				// 2017.1.3 - 提示錯誤訊息
				if (typeof err=='object' && typeof err.message=='string' && err.message.length) {
					alert('重取待辦事項失敗, ' + err.message + '!');
				}
				else {
					alert('重取待辦事項失敗!');
				}
				SSOUtil.loading('hide');
				return;
			 });
		}
	});
	
	/* [登出] button - 2016.6 - 由#home 'pagecreate' event handler移至此處 */
	$('#btn_logout').on( 'click', function() {
		
		theLogger.log('登出處理，是否為強制登出[' + theSSO.logOutNow + ']');
		
		//1060329 Kevin 新增強制登出行為
		var confirmed = false;
		if(!theSSO.logOutNow)
		{
			if (typeof theSSO=='undefined' || typeof theSSO.logoned=='undefined' || !theSSO.logoned) {
				return;
			}
		
			if (typeof theAOL == 'object' && theAOL.getCurrFolio()) {
				alert('公文開啟簽辦中, 請先關閉公文再登出.');
				return;
			}

			// 2019.7 - 1080654 Eric, 檢核傳送子視窗是否工作中...
			if (typeof theSSO.MP.submitDocProcWnd!='undefined' && theSSO.MP.submitDocProcWnd!=null && 
				theSSO.MP.submitDocProcWnd.closed!==true) {
				if (theSSO.MP.submitDocProcWnd.safeClose==false) {
					alert('公文傳送作業中, 請稍候再登出.');
					return;
				}
			}
			else if (typeof theSSO.MP.submitDocProcFrameWnd!='undefined' && theSSO.MP.submitDocProcFrameWnd!=null) {
				// 2020.7.8 - 1090390 Eric, 若有公文傳送iFrame須先確定是否已處理完畢，若處理完畢才能登出！
				if (theSSO.MP.submitDocProcFrameWnd.safeClose==false) {
					alert('公文傳送作業中, 請稍候再登出.');
					return;
				}
			}
		
			confirmed = confirm('確定要離開系統?');
		}
			
		//1060329 Kevin 新增強制登出行為
		if (theSSO.logOutNow || confirmed)
		{
			// 2015.12.15 - Raymond, 登出前上傳目前為止的LOG檔
			theLogger.log('Before Logger upload[登出前上傳]');
			AlternativeLogger.upload("登出前上傳");
			
			// 1060928 Raymond 登出前檢查若有開啟中的參照公文則清除之
			if(("theAOL" in window) && ("getRefFolio" in theAOL) && !!theAOL.getRefFolio()) {
				theLogger.warn("登出前關閉開啟中的參照公文[" + theAOL.getRefFolio().getDocNo() + "]");
				theAOL.getRefFolio().closeView();
				delete theAOL.getRefFolio;
			}
			
			if (typeof theUniView=='object' && theUniView.getDocId().length) {
				$('#uniView #uvBtnClose').trigger('click');
			}
			
			// 2015.6 - 毋論叫用AuthWS.logout成功與否, 一律回登入前狀態. (Artifact已失效!)
			var rslt = null;
			try {
				//1060329 Kevin 若重複開啟首頁，第二個首頁會把第一個首頁登出修正
				if (theSSO.logoned) {
					//1100226	Leslie	增修登出時註銷使用者權杖，以避免TB之Email於不登入模式下，會誤用無效的權杖
					$.ajax({
						type:"POST",
						//1140415	Leslie[1140556]	改用Post方式傳送
						//url:SSO_CONFIG.ServerHost+"/iiws/registCookie.ashx?ck=",
						url:SSO_CONFIG.ServerHost+"/iiws/registCookie.ashx",
						//data:'{"ck":"'+SAMLart+'"}',	//保留功能
						contentType:"application/json; charset=utf-8",
						//dataType:"text"
					});
					
					//1110907 Zen 1111021 滲透測試風險修正，切換帳號時為驗證Artifact先不登出，待驗證完畢後於Server登出
					if(!(window.localStorage.NewUser && window.localStorage.NewUser != ''))
						rslt = theWebServices.authws.logout(window.localStorage.Artifact);
				}
			}
			catch(err) {
				alert('登出系統, 叫用AuthWS.Logout失敗:' + err.message);
			}
			
			//1050823	Leslie	增加視窗管理，當首頁登出時，一併關閉所有程式
			theStart.closeAllChildWin();
			
			//1060329 Kevin 後方已處理，此處Mark
			//window.localStorage.Artifact='';
			
			// 2012.8.14
			$("#login").animate({"margin-top":"0", "display":"block"}, 500,
								function() {
									$("#login").addClass("login_slidedown").removeClass('login_slideup'); // 2017.4 - remove 'login_slideup' class
									
									// 2016.11.16 - 公文夾切換回待辦
									setTimeout(function() {
											$('#home .doc_desktop_subpage').removeClass('doc_desktop_showpage').addClass('doc_desktop_hiddenpage');
											$('#home #todolistContainer').removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_showpage');
											// 側屜顯示
											$('#home #leftDrawer .drawer_switch .tab-item').removeClass('tab-focus');
											$('#home #leftDrawer #tab_todo').addClass('tab-focus');
										
											$('#btn_start').trigger('click');
										}, 500); // 2016.10.17 - 切換回首頁
							   });
			
			theSSO.logoned = false;
									
			if (!theSSO.MP.PreviewCtrl.isPreviewPaneClosed()) {
				// closeRightPane();
				
				// 清除todolist預覽項目
				
				// 清除aki800預覽項目
			}
			
			// reset SpinWheels
			//1131101	Leslie[1130977]	移除MobiScroll
			// $('#selectedFolder').mobiscroll('destroy');

			// 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
			//$('#listPane #selectedFolder').attr('value', '全部');
			$('#listPane #selectedFolder').val('全部');
			$('#listPane #selectedFolder').css('color', '#000'); // 2016.9.6
			
			//1131101	Leslie[1130977]	移除MobiScroll
			// $('#selectedFolder_search').mobiscroll('destroy');
			// 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
			//$('#selectedFolder_search').attr('value', '全部');
			$('#selectedFolder_search').val('全部');
			$('#selectedFolder_search').css('color', '#000'); // 2016.9.6
			
			if (typeof theSSO.MP.todolist!=='undefined') {
				theSSO.MP.todolist.builder.emptyToDoList_Icon('todolist_icon_cntr');
				theSSO.MP.todolist.builder.emptyToDoList_List('todolist_tb > tbody');
				theSSO.MP.todolist.builder.emptyToDoList_SearchList('search-list');
				
				// 清除原有項目
				do {
					var obj = theSSO.MP.todolist.folderScrolls.pop();
				}while(theSSO.MP.todolist.folderScrolls.length);
				
				var $iconCntr = $('#todolist_icon_cntr');
				$iconCntr.width(0);
				if (theSSO.MP.todolist.tdlicon_Scroll) {
					theSSO.MP.todolist.tdlicon_Scroll.refresh();
				}
			}
			
			if (theSSO.MP.PreviewCtrl.getCurrentPreviewCount()>0) {
				theSSO.MP.PreviewCtrl.resetContent();
			}
			
			// 2016.10.16 - 重設待辦清單顯示模組內容
			$('#listPane #tdl_list_filter').val('');
			$('#sidePane #tdl-searchview-filter-input').val('');
			theSSO.MP.todolist.builder.setFilterWord('');
			theSSO.MP.todolist.builder.setSelectedFolder('全部');
			
			$('#listPane #tdl_list_toolbar').show();
			
			if (typeof theSSO !== 'undefined') {
				theSSO.resetUserAndOrgData();
			}
			
			//1110324	Leslie[1101537] [考試院]Merge 找不到的切換身份功能
			if(window.localStorage.NewUser && window.localStorage.NewUser != "")
			{
				var NewUser = window.localStorage.NewUser.split('|');
				//1110907 Zen 1111021 滲透測試風險修正，修改呼叫函式並傳入Artifact做驗證
				//1120815 Kevin 1120693 移除無用函式
				var NewSaml = theWebServices.authws.UserOrgSwitch(NewUser[0], NewUser[1], localStorage.Artifact);

				let newLocation = '';
				if(NewSaml.indexOf("ERR-")==-1) {
					newLocation = location.origin + location.pathname; // 2019.6 - 1080496, Eric Peng - 切換機關時, 直接重載eDoc.html
					newLocation += "?SAMLart=" + NewSaml;
				}
				else {
					newLocation = location.origin + loginPagePathName; // 2019.6 - 1080496, Eric Peng - 顯示錯誤訊息後重登 -> 回SSO.html
					newLocation += "?MSG=" + NewSaml;
				}

				if (typeof newLocation=='string' && newLocation.length) {
					location.assign(newLocation);
				}
				else {
					location.assign(location.origin + loginPagePathName);
				}
				return;
			}
			
			// clear localStorage items
			// 強制登出可能為同時開啟兩個首頁，為避免問題不處理(此處不清應無問題，因為直接關閉頁面也不會清除，且登入時會再清除一次)。
			if (!theSSO.logOutNow) {
				SSOUtil.clearLocalStorage(null);
			}
			
			// 2019.7 - 1080654 Eric, 傳送效能改善
            if (typeof window.sc!=='undefined' && window.sc!=null) {
                window.sc = null;
            }
            if (typeof theSSO.MP.SCardModuleInfo!='undefined' && theSSO.MP.SCardModuleInfo!=null) {
                theSSO.MP.SCardModuleInfo = null;
			}
			if (typeof theSSO.MP.submitDocProcWnd!='undefined' && theSSO.MP.submitDocProcWnd!=null && 
			    theSSO.MP.submitDocProcWnd.closed===false) {
				theSSO.MP.submitDocProcWnd.close();

				DocSubmitUtil.stopDocSubmitPageMessageListen();
			}
			else if (typeof theSSO.MP.submitDocProcFrameWnd!='undefined' && theSSO.MP.submitDocProcFrameWnd!=null && 
				theSSO.MP.submitDocProcFrameWnd.closed===false) { // 2020.7.10 - 1090390
				// 移除傳送子視窗iFrame!
				let $docSubmitPageFrame = $('#submitPageCntr > iFrame');
				if ($docSubmitPageFrame.length) {
					$('#submitPageCntr')[0].removeChild($docSubmitPageFrame[0]);
				}
				DocSubmitUtil.stopDocSubmitPageMessageListen();
			}

			// 2021.4.16, 1100333 - Eric, [待Kevin_Confirm!]
			let loginPage = SSO_CONFIG.LoginPage;
			let url_path = location.pathname.substr(0, location.pathname.lastIndexOf('/'));
			let loginPagePathName = url_path + '/' + loginPage;
			let newLocationAssigned = false;

			// 2015.6 - 若由其它系統跳轉自動登入(->有SAMLart等網址參數), 則跳轉頁面至無網址參數位置!
			//1100929	Leslie[1101215]	配合首頁分離後網址列異動，整合登入時增加註記欄位以供程式區別
			//var sSAMLart = SSOUtil.getURLParameter('SAMLart');
			//if (!!sSAMLart && sSAMLart.length) {
			if('AutoLogon' in window.localStorage && window.localStorage.AutoLogon == 'Y'){
				//1091015	Leslie[1090719]	新增客製化登出函式(僅針對整合登入)
				if('CustomLogout' in window && typeof window.CustomLogout == 'function'){
					window.localStorage.removeItem('AutoLogon');
					window.CustomLogout();
					return;
				}
				
				var newLocation = location.origin + loginPagePathName; // 2021.4.20 - 1100033 Eric
				location.assign(newLocation);
				newLocationAssigned = true;
			}
		
			//1061023 Kevin 1060634 調整介接訊息由首頁處理
			var sMSG = SSOUtil.getURLParameter('MSG');
			if (!!sMSG && sMSG.length) {
				var newLocation = location.origin + loginPagePathName;  // 2021.4.20 - 1100033 Eric
				location.assign(newLocation);
				newLocationAssigned = true;
			}

			// 2021.4.19 - 1100333, Eric Peng - 登入後初始化作業失敗, 強制回Login(登入)頁!
			let _href = window.location.href.toUpperCase();
			let _EDocPage = SSO_CONFIG.EDocPage.toUpperCase();
			if (_href.indexOf(_EDocPage)!==-1 && !newLocationAssigned) {
				let loginPage = SSO_CONFIG.LoginPage;
				if (loginPage.length) {
					window.location.href = loginPage;
				}
			}

			theSSO.rawUserXML = ''; // 2019.7 - 1080654 Eric, 公文傳送子視窗實作.

			//1100504	Leslie[1090634]	配合偵測使用者閒置功能，登出時應復原強制登出的判斷，避免使用者下次登出時沒有防呆
			theSSO.logOutNow = false;
		}
	});

	// 2019.7 - 1080654 Eric, add for 效能測試
	$(document).on('click', '#btn_uploadLog', function() {
		if (typeof AlternativeLogger=='object' && typeof AlternativeLogger.upload == 'function') {
			let tmBeginUploadLog = Date.now();
			theLogger.log('Before Logger upload [Manual Log Upload]');
			AlternativeLogger.upload('Manual Log Upload');
			theLogger.time(SSOUtil.dev_getTimeStr(tmBeginUploadLog) + ' -tm- Upload Log File BEGIN...');
			if (window.tmBeginCollectLog!=0 && window.tmEndCollectLog!=0) {
				SSOUtil.dev_logTimeElapse('Collect Log Data', window.tmBeginCollectLog, 0, window.tmEndCollectLog);
				window.tmBeginCollectLog = window.tmEndCollectLog = 0;
			}
			SSOUtil.dev_logTimeElapse('Upload Log File', tmBeginUploadLog);
		}
	});
}
/*
 * jQuery's ready() call back function
 * --- 主頁DOM loaded, ready ---
 */
// 2019.10.21 - 1080339 Eric, jquery 3.0 upgrade
//$(document).ready(function() {
$(function() {
	
	// 1120901 Leslie  1120709 弱掃修正Client DOM Stored XSS
	function HtmlEncode(s) {
		var div = document.createElement('div');
		div.appendChild(document.createTextNode(s));
		return div.innerHTML;
	}
	
	var url = window.location.href;
	
	// 2013.11 - IE 不支援 window.location.origin, 在此處設定之!
	if (!window.location.origin) {
		window.location.origin = window.location.protocol + "//" +
			window.location.hostname + (window.location.port ? ':' +
			window.location.port: '');
	}

	// 2019.7 - 1080654 Eric, 若連線網址為http://docvip.fdat.com.tw 則啟用_debugSubmit
	//if (window.location.href.indexOf('docvip.fdat.com.tw')!=-1) {
	//	_debugSubmit = true;
	//}

	// 2020.8.6 - Eric, setFocus to #login #in_userid
	//setTimeout(function() {
	//	let $uid = $('#login #in_userid')
		// let _theId = $uid.val();
		// if (_theId.length) {
		// 	$uid[0].setSelectionRange(0, _theId.length);
		// }
	//	$uid.focus();
	//}, 1);

	$(window).on('load', function() { // 2021.2.22 - Eric, for jQ3
		//$('#login #in_userid').focus();
		// 2021.2.22 - 1090927 Eric, iPhone 直式螢幕顯示不支援訊息.
		if (!window.SDPMode) {
			$('#login #in_userid').trigger('focus'); // 2021.2.22 - Eric, for jQ3
		}

	 	// let $uid = $('#login #in_userid')
	 	// let _theId = $uid.val();
	 	// if (_theId.length) {
	 	// 	$uid[0].setSelectionRange(0, _theId.length);
	 	// }
	 	// $uid.focus();

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
	
	// 2012.3.29 - 在標題列加入user資訊
	var title = document.title;
	var userid = window.location.latest_login_userid;
	if (!!userid && userid.toString().length) {
		title += "-" + window.localStorage.latest_login_userid;
	}
	
	// 1120901 Leslie  1120709 弱掃修正Client DOM Stored XSS
	title = HtmlEncode(title);	
	document.title = title;
	
	_bindTopToolBarButtons();
	
	// 2012.4.11 - 動態載入ToolBox及BillBoard內容
	var $cntrStartPage = $('#startContainer');
	var $cntrBoard = $('#billboard');
	
	theSSO.MP.PreviewCtrl.init("#mpContainer #eDocPreviewPane");
	
    // DEV:測試流程設定子視窗...
    $(document).on('click', '#test_modFlowBtn', function() {
      $.mobile.changePage($('#dlgProcessFlow'), {transition:'pop', reverse:false, changeHash:false});
    });
	
	// 2012.4.12 - 測試jQM page relative events
	$(document).on('pagcontainerbeforeload', function(event, ui) {
		_dbgPageInitLog += '#home - pagebeforeload event.\r\n';
	});
	
	// 2016.5
	//$(document).on('pageload', function(event, ui) {
	$(document).on('pagecontainercreate', function(event, ui) {
		_dbgPageInitLog += 'body - pagecontainercreate event.\r\n';
	});
	
	$(document).on('pageinit', '#home', function(event) {
		_dbgPageInitLog += '#home - pageinit event.\r\n';
	});
	
	$('#home').on('pagebeforecreate', function(event) {
		_dbgPageInitLog += '#home - pagebeforecreate event.\r\n';
		
		theLogger.debug('#home [pagebeforecreate] event handler...');
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
			// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期，add rcvDate
			var _item_reduce = ['dueDate', 'docNo', 'ICUserName', 'fromOUName', 'txName', 'toUserName', 'rcvDate'];
			var _col_min = [6.5, 10.5, 5.2, 6.2, 5, 5, 6.5]; // 2017.3.8 - docNo width 9->10.5 EM	// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期，add rcvDate=6.5
			
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
			// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期，add rcvDate
			var _item_reduce = ['dueDate', 'docNo', 'ICUserName', 'fromOUName', 'txName', 'toUserName' ,'rcvDate'];
			var _col_min = [6.5, 10, 5.2, 6.5, 5, 5,6.5]; // 2017.3.8 - docNo width 9->10.5 EM	// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期，add rcvDate=6.5
			
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
	
	// 1100519 Raymond 1100298 修正拖拉改變文字意見大小時, 會觸發resize, 致重複觸發onSSOResize問題
	//function onSSOResize(event, ui) {
	function onSSOResize(evt, ui) {
		if(evt.target !== window)	// 非window的resize事件, 不要繼續處理
			return false;
		
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
		
		var drawer_w = $('#imgDownDrawer').outerWidth(true); // 2017.4.5 - (美工)左側抽屜寬度
		 
		/* 若目前顯示視窗為AOL, 則h_header為hidden, 計算結果會是'0' */
		var h_header = $('#home_header').height();
		if (h_header===0) {
            return false;
        }
		 
		/* Login 布幕 */
		var $login = $('div#login');
		//var $inputPanel = $('div#login div.input_panel'); /* input panel */

		// 2020.6.16 - 1090452 Eric, 移除此段以解決登入之輸入panel位移問題!
		//$login.width(window_w);
		//$login.height(window_h);
		
		/* 調整#mainPageContainer */
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
		
		//1140225	Leslie[1131246]	Resize時，叫用共用函式以重整標題顯示
		_reSetColumn(true);
		
		// #todolistContainer > #listPane > div.fullViewContent
		// 全開待辦清單(列表)
		var $listPane = $('#tdlPane #listPane');
		if ($listPane.find('.sData table#todolist_tb > tbody > tr').length) {
			_resizeListPane({w:window_w, h:window_h}, h_header, $listPane);
		}
		
		/*else if ($listPane.find('.sData table#todolist_tb > tbody > tr').length) {
			// 若已有內容但不顯示 => 清除下次重設!
			var newTable = $('<table id="todolist_tb"><tbody></tboy></table>');
			var tbCntr = $('#tdlPane #listPane #todolist_cntr');
			
			//$('#mpContainer #todolist_cntr').html('');
			//$('#mpContainer #todolist_cntr').append($(theSSO.MP.todolist.builder.getListHeader()));
		}*/
		
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
		}
		
		//1110629	Leslie[1110629]	配合考試院UI/UX需求，修改傳送選單，增加在Resize時調整選單長度
		$('#pcSubmit ,#pcUtil').removeClass('hideIcon');
		//1110809	Leslie	resize時，可能還沒進過文稿頁面，
		if($('#tcControl1').length && $('#pcTxList').length && $('#pcTxEasy').length ){			
			let leftLimit = $('#tcControl1').offset().left + $('#tcControl1').width();
			let txLeft = ($('#pcTxList').offset().left | $('#pcTxEasy').offset().left) - 48;
			if(txLeft < leftLimit && txLeft > 0)	//壓到左邊選單
				$('#pcSubmit ,#pcUtil').addClass('hideIcon');
			else
				$('#pcSubmit ,#pcUtil').removeClass('hideIcon');
		}
		
		return true;
	
		/* 決定是否update各待辦UI之顯示layout (依各UI之待辦項目數量是否為0判定)
		 * combine value of following: 0x1: icon todo, 0x2: list todo, 0x4: search todo (with preview pane)
		*/
		//var UIUpdateFlag = theSSO.MP.todolist.builder.getContainerUIUpdateFlag();
		
		/* 公文預覽模式左方窗格 */
		//var $searchViewFolder = $('#sidePane .searchViewContent .searchView_Folder');
		//if (UIUpdateFlag & 4) {
		//	var margin_top = 15;
		//	var searchListView_h = window_h - h_header;
		//
		//	var $searchWrapper = $('#sidePane .searchViewContent .search-wrapper');
		//	var $searchFilter = $searchWrapper.find('form');
		//	
		//	var searchFolder_h = $searchViewFolder.height();  // 文件夾清單控制項高度
		//	var searchFilter_h = $searchFilter.height();	// 文件夾內容篩選文字控制項高度
		//	var searchList_h = searchListView_h - searchFolder_h - searchFilter_h - margin_top;
		//	$('#search-list').css({'height': ''+searchList_h+'px'}); // 600-(47+5)
		//	$("#search-list").parent().css({'margin-top':'15px'});
		//}
		
		/* 公文預覽內容 see @RD-DocPreview.js _loadDocPreview() */
		//if ((UIUpdateFlag & 4) && !!theSSO && !!theSSO.MP && !!theSSO.MP.PreviewCtrl) {
		//	var navBarWidth = $('div.folio_preview_nav').width();
		//	var cntrWidth = window_w - (SSOUtil.getEMSize($('#tdlPane')[0]) * 25);
		//	var navBarLeft = (cntrWidth - navBarWidth) / 2;
		//	$(theSSO.MP.PreviewCtrl.cntrId + ' .folio_preview_nav').css({left: navBarLeft});
		//}
		
		/* icon todolist */
		//if (UIUpdateFlag & 1) {
		//	// 圖示清單窗格高度...
		//	var todolist_h=0, idx=0;
		//	var $folders = $('.folderList > li');
		//	
		//	// 文件夾標題高度
		//	var h_FolderTitle = SSOUtil.getEMSize($('#home')[0]); //$('#iconPane ul.folderList').height();
		//	var h_FolderPane = window_h - h_header - h_FolderTitle; /* 視窗高 減去[系統標題列], 再減去文件夾標題列 */
		//
		//	$folders.each(function(){
		//		var $folioList = $(this).find('.folioList');
		//		$folioList.each(function() {
		//			$(this).css({height:''+h_FolderPane+'px'});
		//		});
		//	});
		//	
		//	theSSO.MP.todolist.tdlicon_Scroll.refresh();
		//	
		//	if (theSSO.MP.todolist.folderScrolls.length) {
		//		var hNow = $('ul.folderList li#fldr_0').height();
		//		if (hNow<200) {
		//			theLogger.warn('-W- Invalid icon_folder height:' + hNow);
		//		}
		//	}
		//	
		//	if (SSOUtil.typeOf(theSSO.MP.todolist.folderScrolls)=='array') {
		//		for (idx=0; idx<theSSO.MP.todolist.folderScrolls.length; idx++) {
		//			theSSO.MP.todolist.folderScrolls[idx].refresh();
		//		}
		//	}
		//}
		
		/* list todolist */
		//if (UIUpdateFlag & 2) {
		//	var h_full = window_h - h_header;
		//	$('#listPane .fullViewContent').css({height:'' + h_full + 'px'});
		//	
		//	var h_listToolbar = $('#todolistToolbar').height();
		//	if (orient=='portrait' && screenMode.width<1000) {
		//		h_listToolbar = 92; /* 2016.3 - iPad直式顯示, 上方toolbar (公文夾/燈號/搜尋 controls)會折行, 暫時以經驗值代入 */
		//		/* 92: toolbar折行後高度, 43: margin-top offset! */
		//	}
		//	
		//	/* div.sData 有一個margin-top=43, 須加入扣除項目 */
		//	var marginTop = parseInt($('#todolist_cntr div.sBase div.sData').css('margin-top'));
		//	if (isNaN(marginTop)) {
		//		marginTop = 0;
		//	}
		//	
		//	var h_container = window_h - h_header - h_listToolbar - marginTop; /* overlap with table header, 故不扣除 h_tableHeader */
		//	var w_container = $('#todolist_cntr div.sBase .sHeader').width();
		//	/* 2016.4 - 取消寬度設定 */
		//	/*$('#todolist_cntr div.sBase div.sData').css({height:''+ h_container +'px', width:''+w_container+'px'});*/
		//	$('#todolist_cntr div.sBase div.sData').css({height:''+ h_container +'px'});
		//}
		
		//return true;
	}
	
	function _openDocWithAOL(SAMLart, docObj, trigger, closeSideDrawer, extraOption) {
		function _closeSidePaneAndPreviewWnd(trigger) {
			if (trigger=='todolist') {
				/* 關閉側桌 */
				if ($('#listPane').is(':visible')) {
					$('#listPane .dragControlPane .drag_to_close').trigger('click');
				}
				else if ($('#iconPane').is(':visible')) {
					$('#iconPane .dragControlPane .drag_to_close').trigger('click');
				}
				else if ($('#sidePane').is(':visible')) {
					$('#sidePane .dragControlPane .drag_to_close').trigger('click');
				}
				/* 隱藏預覽窗格 */
				$('#eDocPreviewPane').hide();
				
				/* ToDo:清除預覽窗格內容 */
			}
			else if (trigger=='aki800') {
				/* 關閉側桌 */
				if ($('#querydoc_leftTopPane').is(':visible')) {
					$('#querydoc_leftTopPane .dragControlPane .drag_to_close').trigger('click');
				}
				else if ($('#searchViewContent').is(':visible')) {
					$('#searchViewContent .dragControlPane .drag_to_close').trigger('click');
				}
				/* 隱藏預覽窗格 */
				$('#inspectPreviewPane').hide();
				
				/* 隱藏側桌窗格 */
				$('#leftDrawer').removeClass('drawer_show');
			}
		}

		// 2021.5 - 1100093 - merge: 2020.3.3 - 1081168 Eric, 子文彙併辦, 取得封裝檔最後一流程之彙併辦子文清單, 
        // 回傳: string array.
        function _getEnveFileCOMDoc(_enveXML, docNo) {
            if (_enveXML!==null) {
                let nodeSiteContents = _enveXML.getElementsByTagName("簽核點定義");
                if (nodeSiteContents.length) {
                    let nodeSiteContent = nodeSiteContents[nodeSiteContents.length-1];
					let COMNos = [];
					// <簽核文件夾>/<併文清單>/<子文>
					let i=0;
					let nodeCOMNos = nodeSiteContent.getElementsByTagName("子文");
					if (nodeCOMNos.length) {
						COMNos.push(docNo)
					}
                    for(i=0; i<nodeCOMNos.length; i++) {
                        let nodeCOMNo = nodeCOMNos[i];
                        COMNos.push(nodeCOMNo.textContent);
                    }

                    if (COMNos.length) {
                        return COMNos;
                    }
                    return null;
                }
            }
            return null;
		}
		
		if (typeof trigger!=='string' || trigger.length===0) {
			trigger = 'todolist';
		}
		
		/* 若 UniView 已開啟檢閱公文, 應先關閉 */
		if (typeof theUniView === 'object' && theUniView.getDocId()!==null && theUniView.getDocId().length) {
			alert('已開啟公文檢閱中, 請關閉該公文再重試.');
			return;
		}

		// 2019.7 - 1080654 Eric, 開啟公文效能log
		if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
			theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- openDocWithAOL BEGIN...');
			window.tmBeginOpenDocWithAOL = Date.now();
		}
		
		// 2016.7 - 若已有開啟公文, 則應開啟為參考公文
		// [2016.7.27 - 目前Raymond尚未實作完成, 暫以提示訊息警告]
		var sDocObj = '';
		if (typeof theAOL !=='undefined' && theAOL.getCurrFolio()) {
			if (theAOL.getCurrFolio().readOnly()) {
				// 唯讀模式開啟, 不能開參照公文
				alert('已開啟公文檢閱中, 請關閉該公文再重試.');
				return;
			}
			// 1070202 Raymond 1070116 增加檢查紙本簽核公文, 不可開啟參照公文
			else if(docObj.signType == 'P') {
				alert('紙本簽核公文無法進行歷史檢視功能!\n請關閉目前開啟中公文, 再開啟此公文.');
				return;
			}
			else {
				/* 開啟為參照公文 */
				//alert('開啟為參照公文功能尚未實作完成!');
				
				//1121221	Leslie[卡驗收序23]	同一份公文時，不開參照模式，直接回到文稿編輯
				if(theAOL.docObj.docNo == docObj.docNo){
					if (closeSideDrawer) {
						_closeSidePaneAndPreviewWnd(trigger);
					}
					return;
				}
				
				var refDocId = docObj.docNo + '-ref';
				sDocObj = JSON.stringify(docObj);
				var showODC010 = true;
				
				/* 由AKI800檢索項目觸發者, 不顯示公文基資 */
				if (typeof extraOption =='object' && extraOption.aol_readonly_mode) {
					showODC010 = false;
				}
				
				if (typeof sDocObj=='string' && sDocObj.length) {
					localStorage[refDocId] = sDocObj;
					theAOL.reference(refDocId, showODC010);
					if (closeSideDrawer) {
						_closeSidePaneAndPreviewWnd(trigger);
					}
				}
				return;
			}
		}
		
		if (typeof closeSideDrawer == 'undefined') {
			closeSideDrawer = true;
		}
		
		// 2016.6 - Eric, 草稿公文不叫用SetMsgStatus!
		var isDraft = false;
		if (trigger=='todolist') {
			isDraft = theSSO.MP.todolist.builder.isDraftMsg(docObj);
		}
		
		// 2017.2.24 - 開啟公文前, 取最新ODWMSG內容, 並更新待辦清單內的docObj
		var _prm, _dfd = $.Deferred();
		var _msgIdList='';
		if (trigger=='todolist') {
			$.mobile.loading('show');

			// 2020.1.10 - 1080701 Eric, 開啟[草稿]公文前叫用ODMSSP.SetDraftMsgStatus以更新ODWMSG.XML內容!
			if (isDraft) {
				// 2019.7 - 1080654 Eric, load doc performance
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 準備公文檔案/基資 BEGIN...');
					window.tmBeginDocInfo = Date.now();
				}

				theWebServices.odmssp.setDraftMsgStatus(SAMLart, docObj.sourceOrgNo, docObj.msgId, docObj.ownUserId)
				.done(function(rslt){
					if (rslt.success===true) {
						theLogger.log('-I- invoke ODMSSP.setDraftMsgStatus() succeeded.');
						_dfd.resolve({success:true});
					}
					else {
						_dfd.reject({success:false, errMsg:rslt.errMsg});
					}
				})
				.fail(function(errRslt){
					let errMsg = '';
					if (typeof errRslt.errMsg && errRslt.errMsg.length) {
						errMsg = errRslt.errMsg;
					}
					_dfd.reject({success:false, errMsg:'叫用ODMSSP.SetDraftMsgStatus發生錯誤, errMsg=' + errMsg + ' [OrgNo=' + 
						docObj.sourceOrgNo + ', DocNo=' + docObj.docNo + ', MsgId=' + docObj.msgId + ']'});
				})
			}
			else {
				// 2019.7 - 1080654 Eric, load doc performance
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 準備公文檔案/基資 BEGIN...');
					window.tmBeginDocInfo = Date.now();
				}

				var rslt = theWebServices.odmssp.setMsgStatus(SAMLart, docObj.msgId);
				if (rslt.success===true) {
					theLogger.log('-I- invoke ODMSSP.SetMsgStatus() succeeded.');

					_msgIdList = docObj.msgId + ';';
					theWebServices.odmssp.getMsgODWMSG(SAMLart, _msgIdList, {async:true})
					.done(function(rsltODWMSG) {
						var $odwmsgs = $(rsltODWMSG.m_docToDoList).find('ODWMSG');
						var odwmsgNode = $odwmsgs[0];
						if (typeof odwmsgNode=='object') {
							if (!theSSO.MP.todolist.builder.updateDocObjByODWMSG(docObj.msgId, odwmsgNode)) {
								_dfd.reject({success:false, _errMsg:'叫用todolist.builder.updateDocObjByODWMSG()發生錯誤!', _showError:true});
							}
							else {
								var msgId= docObj.msgId;
								docObj = theSSO.MP.todolist.builder.getDocByMsgId(msgId);
								_dfd.resolve({success:true});
							}
						}
						else {
							_dfd.reject({success:false, _errMsg:'叫用ODMSSP.getMsgODWMSG(..., msgId=' + docObj.msgId + ', ...)成功, 但無法由回傳值取得ODWMSG內容!', _showError:true});
						}
					})
					.fail(function(rslt) {
						theLogger.warn('-I- invoke ODMSSP.getMsgODWMSG(..., msgId=' + docObj.msgId + ', ...) failed. ErrMsg=' + rslt.errMsg);
						alert('叫用ODMSSP.getMsgODWMSG()發生錯誤! ErrMsg=' + rslt.errMsg);
						_dfd.reject({success:false, _errMsg:('叫用ODMSSP.getMsgODWMSG! ErrMsg=' + rslt.errMsg), _showError:false});
					});
				}
				else {
					if (rslt.success!==true) {
						theLogger.warn('-I- invoke ODMSSP.SetMsgStatus() failed. ErrMsg=' + rslt.errMsg);
						alert('叫用ODMSSP.SetMsgStatus! ErrMsg=' + rslt.errMsg);
						_dfd.reject({success:false, _errMsg:('叫用ODMSSP.SetMsgStatus! ErrMsg=' + rslt.errMsg), _showError:false});
					}
				}
			}
			_prm = _dfd.promise();
		}
		else {
			// 唯讀檢閱模式, 取得公文封裝檔以分析彙併辦子文文號.
			// 2021.5 - 1100093 - merge: 2020.3.6 - 1081168 Eric, 彙併辦母文取子文資訊
			//1140626	Leslie[1140325]	因已於[1130847]由DB取得彙併辦資訊，取消由封裝檔中讀入<併文清單>邏輯，以下均註解
			// if (docObj.signType=='E') {
				// // docObj = { 
				// // sourceOrgNo: "301000000A"
				// // docNo: "1090154010"
				// // subject: "[ept]測試彙併辦封裝-0304-ex001"
				// // fileIOWS: "https://DOCFILE.FDAT.COM.TW/WebFileIo_219/T2100FileIOService.asmx"
				// // fileStoragePath: "D:\FILESRV_DATA_219\FILE_PATH\upload\"
				// // fileSubDir: "301000000A\10903\04\1090154010"
				// // signType: "E" };

				// // 下載封裝檔, 取最後一個<簽核點定義>, 確認是否有<併文清單>/<子文>
				// let wfio = new WebFileIO(docObj.fileIOWS);
				// let ecapFileName = docObj.docNo + '-X.XML';
				// let dirPath = SSOUtil.combineLocalPath(docObj.fileStoragePath, docObj.fileSubDir);
				// wfio.download(dirPath, ecapFileName, {
					// success: function(fil, res) {
						// theLogger.log(fil);
						// try {
							// // 2020.3.3 - 1081168 Eric, 保留封裝檔內容以處理彙併辦子文封裝!
							// let enveCOMNos = _getEnveFileCOMDoc(fil, docObj.docNo);
							// if (Array.isArray(enveCOMNos) && enveCOMNos.length) {
								// /*<COM_NO>
									// <DOC>
										// <COM_DOC_NO>1090154010</COM_DOC_NO>
										// <SIGN_TYPE>E</SIGN_TYPE>
										// ...
										// <COM_COMBINE_TYPE>1</COM_COMBINE_TYPE>
										// ...
									// </DOC>*/
								// if (typeof docObj.ODWDCM=='undefined' || docObj.ODWDCM==null) {
									// docObj.ODWDCM = {};
								// }
								// if (typeof docObj.ODWDCM.COM_NO=='undefined' || docObj.ODWDCM.COM_NO==null) {
									// docObj.ODWDCM.COM_NO = [];
								// }

								// let i=0;
								// for(i=0; i<enveCOMNos.length; i++) {
									// let _comNoDoc = {
										// COM_DOC_NO: enveCOMNos[i],
										// COM_COMBINE_TYPE: '1',
										// SIGN_TYPE: 'E',
									// };
									// docObj.ODWDCM.COM_NO.push(_comNoDoc);
								// }
							// }
							// _dfd.resolve({success:true});
						// }
						// catch(e) {
							// _dfd.reject(e.message);
						// }
					// },
					// error: function(status) {
						// _dfd.reject(status);
					// }
				// });
			// }
			// else {
				_dfd.resolve({success:true});
			// }
			_prm = _dfd.promise();
		}

		_prm.done(function() {
			// 2019.7 - 1080654 Eric, load doc performance
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                SSOUtil.dev_logTimeElapse('準備公文檔案/基資',  window.tmBeginDocInfo);
                window.tmBeginDocInfo = null;
			}

			// 2016.12.20 - 開啟公文後設定signTime
			var notOpened = false, updatedDoc=null;
			var signTime = '';
			if (docObj.signTime==='') {
				notOpened = true;
				signTime = SSOUtil.getCurrentTimeStr_YYYMMDDhhmm();
				docObj.signTime = signTime;
			}

			sDocObj = JSON.stringify(docObj);
			localStorage.working_doc_obj = sDocObj;
			
			// 先設回原值, 俟開啟完成後再重設
			if (notOpened) {
				docObj.signTime = '';
			}
			
			//1141117	Leslie[1140849]	北榮急序-19，MP列表增加顯示選取底色功能
			if(!!theSSO.MP.lastOpenMsgId && theCustom.getCustomSet('MPListSelectedColor') !== ''){
				_resetListColor($(`#todolist_tb > tbody > tr[data-msgid="${docObj.msgId}"]`));
			}
			
			/* 2016.6.14 - 改用嵌入AOL模組後開啟公文
			* 2013.2.20 - RD-AOL.html設定為cache(跳轉至其它網頁後不卸載), 故在開啟該頁面前, 須先
			*   確認是否已載入, 若已載入, 則直接跳轉至該頁面內容!
			* 2013.1.30 - 改用jqm.changePage()載入公文編輯/簽核模組!
			*/
			if (theSSO.aolModuleLoaded) {
				// 2019.7 - Eric, load doc performance
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- theSSO.aolModuleLoaded ...');
				}

				$.mobile.loading('show');
				
				theLogger.debug('-I- befoer theAOL.reload()...');
				theAOL.reload(extraOption);
				theLogger.debug('-I- after theAOL.reload()...');
				
				_closeSidePaneAndPreviewWnd(trigger);

				// 2020.1.7 - 1081090 Eric, 開啟公文前回復套件上方工具列之原始狀態
				if ('defaultAOLToolbarCSSSet' in theSSO && typeof theSSO.defaultAOLToolbarCSSSet!=='undefined' && theSSO.defaultAOLToolbarCSSSet!==null) {
					SSOUtil.resetAOLToolbarCSS(theSSO.defaultAOLToolbarCSSSet, 'restore');
				}
				
				$('#docWorkPane').show();
				
				// 2016.12.20
				if (notOpened && signTime.length && sDocObj.length) {
					// doc.signTime = signTime; // 2019.7 - ToDo: Eric - 確認這行在幹嘛!!!???
					updatedDoc = JSON.parse(sDocObj);
					if (typeof updatedDoc=='object') {
						theSSO.MP.todolist.builder.updateDocObj(updatedDoc.msgId, updatedDoc);
					}
				}

				// 2019.7 - 1080654 Eric, load doc performance
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					SSOUtil.dev_logTimeElapse('openDocWithAOL',  window.tmBeginOpenDocWithAOL);
					window.tmBeginOpenDocWithAOL = null;
				}
			}
			else {
				$.mobile.loading('show');
				
				theLogger.debug('-I- befoer SSOUtil.injectHTMLModule()...');
				SSOUtil.injectHTMLModule('RD-AOL.html', $('#docWorkPane #aol'))
				.then(function(rslt) {
					theLogger.debug('-I- SSOUtil.injectHTMLModule() DONE!');
					
					_closeSidePaneAndPreviewWnd(trigger);
					
						// 2017.4.21 - 1060272 select#chooseX 避免選到傳送子視窗
					// 2016.12.8 - 傳送選單不套用jQM
					var noneJQueryTxSel = theSSO.User.EnvSettings.get('SSO_NOT_USE_JQM_TXSEL');
					if (SSOUtil.isValueTrue(noneJQueryTxSel)) {
							$('#aol #transPanel select#chooseA').attr('data-native-menu', 'true');
							$('#aol #transPanel select#chooseB').attr('data-native-menu', 'true');
							$('#aol #transPanel select#chooseC').attr('data-native-menu', 'true');
							$('#aol #transPanel select#chooseD').attr('data-native-menu', 'true');
						
						theLogger.log('-I- 傳送異動別選單使用原生select elements.');
					}

                    // 2023.4.14 - Eric 考試院彙整表序10, 公文基資立貼標籤移到最下面
                    if (SSO_CONFIG.OrgNickName=='EXAM' || ('dev_OrgNickName' in localStorage && localStorage.dev_OrgNickName=='EXAM')) {
                        $docInfoTag = $($('#aol .viewPort div.tags > div.tags-group')[0]);
                        if ($docInfoTag.length) {
                            $parent = $docInfoTag.parent();
                            $docInfoTag.appendTo($parent)
                        }
                    }

					$('#aol').trigger('sso:moduleinit', [{}]); // 2016.6 - 觸發sso:moduleinit
					$('#aol').enhanceWithin();
					/* 2016.6.15 - 暫時先觸發pagecreate, 等AOL調整完後改觸發sso:modulecreate */
					$('#aol').trigger('pagecreate', [extraOption]);
					//$('#aol').trigger('sso:modulecreate', [{}]); 
									
					$('#docWorkPane').show();
					
					theSSO.aolModuleLoaded = true;
					
					// 2016.12.20
					if (notOpened && signTime.length && sDocObj.length) {
						//doc.signTime = signTime; // 2019.7 - ToDo: Eric - 確認這行在幹嘛!!!???
						var updatedDoc = JSON.parse(sDocObj);
						if (typeof updatedDoc=='object') {
							theSSO.MP.todolist.builder.updateDocObj(updatedDoc.msgId, updatedDoc);
						}
					}

					// 2019.7 - 1080654 Eric, load doc performance
					if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
						SSOUtil.dev_logTimeElapse('openDocWithAOL[with loadAOLModule]',  window.tmBeginOpenDocWithAOL);
						window.tmBeginOpenDocWithAOL = null;
					}

					// 2021.4.21 - 1080761 Eric, merge MOI-1070298 參考公文功能.
					let sVal = theSSO.User.SystemSets.USE_REF_DOC;
					if (typeof sVal=='string' && sVal.length && SSOUtil.isValueTrue(sVal)) {
						let $moBtnRefDocSet = $('#moGrpUtil #moBtnRefDocSet');
						// 1110711 Raymond 1110728 參考公文設定鈕從「設定」鈕選單搬到「齒輪」鈕選單
						//let $btnRefDocSet = $('#popupSetting #btnRefDocSet');
						let $btnRefDocSet = $('#popupAdvance #btnRefDocSet');
						$moBtnRefDocSet.show();
						$btnRefDocSet.show();
					}
					else {
						let $moBtnRefDocSet = $('#moGrpUtil #moBtnRefDocSet');
						// 1110711 Raymond 1110728 參考公文設定鈕從「設定」鈕選單搬到「齒輪」鈕選單
						//let $btnRefDocSet = $('#popupSetting #btnRefDocSet');
						let $btnRefDocSet = $('#popupAdvance #btnRefDocSet');
						$moBtnRefDocSet.hide();
						$btnRefDocSet.hide();
					}

					// 2021.2.3 - 1090927 Eric Peng, support iPhone layout
					if (window.SDLMode && window.innerWidth<750) { // 2021.4.19 - Eric
						//let $btnClose = $('#aol #moBtnClose');
						let $btnSave = $('#aol #moBtnSave');
						let $btnFlowSet = $('#aol #moBtnFlowSet'); // 簽辦意見
						//$btnClose.height('1.2em');
						$btnSave.find('span').text('儲存'); //.height('1.2em');
						$btnFlowSet.find('span').text('意見'); //.height('1.2em');

						//$('#aol #moGrpUtil').css('right', '16em');
					}
				})
				.fail(function(rslt){
					theLogger.log('-E- invoke SSOUtil.injectHTMLModule("RD-AOL.html", ...) failed');
						$.mobile.loading('hide');
					return;
				});
			}
			
			/* 2016.3 - 記錄主頁面切換到AOL頁面前的orientation */
			if (typeof window.orientation !== 'undefined') {
				theSSO.MP.orientationBeforeAOL = window.orientation; /* 實測iOS 9, orientation值為0,90,180,270;其中0,180為直式 */
			}

			// 2019.7 - 1080654 Eric, 測試取次筆公文功能
			// setTimeout(function() {
			// 	let rsltENext = theSSO.MP.todolist.builder.getENextId(docObj.msgId);
			// 	if (typeof rsltENext!='undefined' && rsltENext!==null) {
			// 		console.log('-I- rsltENext=' + JSON.stringify(rsltENext));
			// 	}
			// }, 1500);
		})
		.fail(function(rslt) {
			if (typeof rslt=='object' && typeof rslt._errMsg=='string' && typeof rslt._showError=='boolean' && rslt._showError) {
				alert(rslt._errMsg);
			}
			
			$.mobile.loading('hide');
		});
	}
	theSSO.MP.openDocWithAOL = _openDocWithAOL; // 2016.7
	
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

		// 2019.7.25 - 1080654 Eric, 啟用自動開啟次筆公文, 進階模式
		// openNextDoc=Y&ONDAdvMode=Y
		// let sValue = localStorage['ENV_AOL_AUTO_OPEN_NEXT_DOC'];
		// if (SSOUtil.getURLParameter('openNextDoc').length) {
		// 	sValue = SSOUtil.getURLParameter('openNextDoc');
		// }
		// if (typeof sValue!=='string') {
		// 	sValue = '';
		// }
		// theSSO.openNextDoc= SSOUtil.isValueTrue(sValue);

		// sValue = localStorage['ENV_AOL_OPEN_NEXT_DOC_USE_ADVMODE'];
		// if (SSOUtil.getURLParameter('ONDAdvMode').length) {
		// 	sValue = SSOUtil.getURLParameter('ONDAdvMode');
		// }
		// if (typeof sValue!=='string') {
		// 	sValue = '';
		// }
		// theSSO.openNextDocAdvMode = SSOUtil.isValueTrue(sValue);

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

		// 2021.4.19 - 1100333, Eric Peng - 分割登入/SSO網頁, 由localStorage取Login.html網址參數設定值
		if (typeof localStorage.login_page_config=='string' && localStorage.login_page_config.length) {
			let loginPageConfig = JSON.parse(localStorage.login_page_config);
			if (typeof loginPageConfig=='object' && loginPageConfig!=null) {
				window._debugTime = loginPageConfig._debugTime;
				window.noneJQuery = loginPageConfig.noneJQuery;
				window._disableFastInit = loginPageConfig._disableFastInit;
				window.showFolderCnt = loginPageConfig.showFolderCnt;
				// 2022.6.28 - 1110180 Eric
				if (typeof window.forceUIMode!=='string') {
					window.forceUIMode = loginPageConfig.forceUIMode;
				}
				window._devMode = loginPageConfig._devMode;
			}
		}
		
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
			$('#login #radio-choice-loginbyAccount').closest('.ui-field-contain').hide();
			
			// 2016.11.11 - iOS device, 設定分會設定子視窗之class	
			$('#PDoc_CoWWKFDialog').addClass('iOS');
		}
		else { // 2017.1.9 - 若預設用智慧卡登入, iPad顯示異常問題
			// 2016.11.29 - 支援預設顯示智慧卡登入
			if (SSO_CONFIG.LoginType=='SMARTCARD') {
				$('div#login #radio-choice-loginbyAccount').prop('checked', false);
				$('div#login #radio-choice-loginbyCert').prop('checked', true);
				$('div#login div.userid_wrapper').hide();
				$('div#login div.password_wrapper label[for="password"]').text('金鑰密碼：');
			}
		}
		
		
		/* 2014.8 - 暫行解決方案for iOS 7 Safari登入後，載入的todolist網頁內容會scroll超出頁面上方
		 * ToDo: 目前頁面下方仍會多出一條約20px之空間!
		 */
		$('body').on('pagechange', function(){
		    window.scrollTo(0, 0);
        });
		
		/* 2016.7 - 關閉網頁時處理函式 */
		$(window).on('unload', function() {
			// 2021.4.19 - 1100333, Eric Peng
			//1110826	Leslie	針對踢掉前一分頁，增加flag以識別不要清空localStorage
			if(!('keepStorage' in theSSO && theSSO.keepStorage == true))
			SSOUtil.clearLocalStorage(null);
		});
		
		/*
		 * 2016.3 - 偵測 page orientation change, 調整版面layout
		 * 
		 * $(window).on('resize', ssoChangeDimension);
		 */
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
				
		//if (typeof window._devMode=='boolean' && !!(window._devMode)) {
			// 2019.10.1 - 1080339 Eric, 直接由.bind改成.on, div#home未收到resize event問題修改!
			//$(window).on('resize', '#home', onSSOResize);
			$(window).on('resize', onSSOResize);
			
		//}
		}
				
		/* 測試 Module Inject events */
		/*$(document).on('sso:moduleinit', '#startContainer', function(e, extra) {
			console.log('sso:moduleinit event...');	
		});
		
		$(document).on('sso:modulecreate', '#startContainer', function(e, extra) {
			console.log('sso:modulecreate event...');	
		});*/
		
		// 2012.8.29
		theLogger.log("before $('#login').page()...");
		var $login = $('#login');
		$login.page();
		theLogger.log("after $('#login').page()...");
		$login.addClass("login_slidedown");
		
		// 2016.6 - press "Enter" to login...
		$login.find('input#in_userid, input#in_password').on('keypress', function(e) {
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
		
		//1110420	Leslie[1110069]	新增首頁Logo可依機關調整
		$('#LoginTitle').addClass(SSO_CONFIG.OrgNickName+'_Logo');
		$('#Logo').addClass(SSO_CONFIG.OrgNickName+'_Logo');
		
		/* 2012.8.20 - 初始化主畫面及流程設定頁面內容 */
		_initMainPage();
		
		/* 2016.4 */
		$('#btn_Drawer').on('click', function(){
			var $drawer = $('#mainPageContainer #leftDrawer');
			var strClass = $drawer.attr('class');
			if (strClass.search('top_of_subpage')>=0) {
                $drawer.removeClass('top_of_subpage');
            }
			else {
				$drawer.addClass('top_of_subpage');
			}
			return;
		});
		
		// 2021.2.18 - 1090927 Eric, iPhone landscape support
		if (window.SDLMode) { // 2021.4.19 - Eric
			let $leftDrawer = $('#leftDrawer');
			if ($leftDrawer.length) {
				$leftDrawer.find('#tab_todo .drawer_title').text('待辦');
				$leftDrawer.find('#tab_newdraft .drawer_title').text('創稿');
				$leftDrawer.find('#tab_aki800 .drawer_title').text('檢索');
			}

			let $todolist_tab_title = $('#todolistContainer .drag_item_title > span');
			$todolist_tab_title.text('待辦');
			let $newDoc_tab_title = $('#newDocWorkspace .drag_item_title > span');
			$newDoc_tab_title.text('創稿');
			let $aki800_tab_title = $('#aki800ListWorkspace .drag_item_title > span');
			$aki800_tab_title.text('檢索');
		}

		/* 左方側桌切換鈕 */
		$('#leftDrawer .drawer_switch .tab-item').on('click', function(event) {
			function _switchDesktopContent(newSubPage, oldSubPage, showPreview) {
				// sidePage classes: todoSubPage / newDocSubPage / historyDocSubPage / aki800SubPage
				// desktop panes: eDocPreviewPane, docWorkPane(線上/紙本簽辦, 線上唯讀檢閱), newDocPreviewPane, inspectPreviewPane, pDocInspectPane(紙本影像檢閱/來文影像檢閱)
				switch (newSubPage) {
					case 'todoSubPage': {
						$('#newDocPreviewPane').hide(); $('#inspectPreviewPane').hide();
						$('#eDocInspectPane').hide(); $('#pDocInspectPane').hide();
						if (showPreview && theSSO.MP.PreviewCtrl.getCurrentPreviewCount()) {
                            $('#eDocPreviewPane').show();
                        }
						break;
					}
					case 'newDocSubPage' : {
						$('#eDocPreviewPane').hide();
						$('#inspectPreviewPane').hide();
						break;
					}
					case 'historyDocSubPage' : {
						$('#eDocPreviewPane').hide();
						$('#newDocPreviewPane').hide();
						break;
					}
					case 'aki800SubPage' : {
						$('#eDocPreviewPane').hide();
						$('#newDocPreviewPane').hide();
						break;
					}
					default:
						return;
                }
			}
			
			var itemId = '';
			
			// ids: tab_todo, tab_newdraft, tab_history_todo, tab_aki800
			var itemClass = $(event.currentTarget).attr('class');
			var $leftDrawer = $('#leftDrawer');
			var $targetSubPage = null;
			var prevSubPageClass = '', targetSubPageClass = '', newPos = 'full';
			
			if (itemClass.search('tab-focus')>=0) {
				itemId = $(event.currentTarget).attr('id');
				switch (itemId) {
				case 'tab_todo': {
					$targetSubPage = $('#mpContainer .todoSubPage'); targetSubPageClass='todoSubPage';
					if ($targetSubPage.find('.searchViewContent').is(':visible')) {
                        newPos = 'side';
                    }
					break;
				}
				case 'tab_newdraft': { $targetSubPage = $('#mpContainer .newDocSubPage'); targetSubPageClass='newDocSubPage'; newPos='side'; break; }
				case 'tab_history_todo': {
					$targetSubPage = $('#mpContainer .historyDocSubPage'); targetSubPageClass='historyDocSubPage';
					if ($targetSubPage.find('.searchViewContent').is(':visible')) {
                        newPos = 'side';
                    }
					break; }
				case 'tab_aki800': {
					$targetSubPage = $('#mpContainer .aki800SubPage'); targetSubPageClass='aki800SubPage';
					
					if ($targetSubPage.find('.searchViewContent').is(':visible')) {
                        newPos = 'side';
                    }
					break; }
				default: {
					}
				}
				
				if (!!$targetSubPage) {
					if ($targetSubPage.attr('class').search('doc_desktop_showpage')>=0) {
                        // 開啟中 => 關閉之
						$targetSubPage.removeClass('doc_desktop_showpage');
                    }
					else if ($targetSubPage.attr('class').search('doc_desktop_sidepage')>=0) {
                        // 半開啟中 => 關閉之
						$targetSubPage.removeClass('doc_desktop_sidepage');
                    }
					else {
						if (newPos=='side') {
                            $targetSubPage.removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_sidepage');
							// 1100922 Raymond 1080763 合併1071123, 新增檢查範本清單是否有異動, 有異動的話要刷新
							if(itemId == "tab_newdraft" && localStorage['refreshSampleList'] === "true") {	// 從AKI802開啟的公文加入的新範本, 無法直接控制刷新MP的範本清單, 故以設定此localStorage變數代表有異動
								theSSO.MP.updatePrivateSamples();
								localStorage.removeItem('refreshSampleList');	// 刷新後清除
							}
                        }
						else {
							$targetSubPage.removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_showpage');
						}
						$leftDrawer.addClass('drawer_show');
					}
					
					$leftDrawer.removeClass('drawer_show');
					_switchDesktopContent(targetSubPageClass, '', false);
                }
                return;
            }
			
			var $tabItems = $('#leftDrawer .drawer_switch .tab-item');
			$tabItems.removeClass('tab-focus');
			$(event.currentTarget).addClass('tab-focus');
			
			// 找目前工作桌上顯示的內容
			// eDocPreviewPane
			var $currentDisplayWorkPane = $('#mpDesktop work_pane:visible');
			
			//var $drawPanels = $("#leftDrawer .draw_panel");
			//$drawPanels.hide();
			/*<div data-role="content" id="mainContent">
				<div id='mainPageContainer'>
				  <div id="mpContainer">
				    <div id="todolistContainer" class="sso_subpage doc_desktop_subpage doc_desktop_showpage">
				    <div id="newDocWorkspace" class="newDocSubPage doc_desktop_subpage"></div>
					<div id="historyDocWorkspace" class="historyDocSubPage doc_desktop_subpage"></div>
					<div id="aki800ListWorkspace" class="aki800SubPage doc_desktop_subpage"></div>
			*/
			$docDesktopSubPages = $("#mpContainer .doc_desktop_subpage");
			$docDesktopSubPages.removeClass('doc_desktop_showpage');
			
			itemId = $(event.currentTarget).attr('id');
			var $targetItem = null;
			switch (itemId) {
            case 'tab_todo': {
				$targetSubPage = $('#mpContainer .todoSubPage');
				if ($targetSubPage.find('.searchViewContent').is(':visible')) {
					newPos = 'side';
				}
				
				if (newPos=='side') {
                    $targetSubPage.removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_sidepage');
                }
				else {
					$targetSubPage.removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_showpage');
				}
				targetSubPageClass='todoSubPage'; break; }
			case 'tab_newdraft': {
				$targetSubPage = $('#mpContainer .newDocSubPage');
				$targetSubPage.removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_sidepage');
				// 1100922 Raymond 1080763 合併1071123, 新增檢查範本清單是否有異動, 有異動的話要刷新
				if(localStorage['refreshSampleList'] === "true") {	// 從AKI802開啟的公文加入的新範本, 無法直接控制刷新MP的範本清單, 故以設定此localStorage變數代表有異動
					theSSO.MP.updatePrivateSamples();
					localStorage.removeItem('refreshSampleList');	// 刷新後清除
				}
				targetSubPageClass='newDocSubPage'; break; }
			case 'tab_history_todo': {
				$targetSubPage = $('#mpContainer .historyDocSubPage');
				if ($targetSubPage.find('.searchViewContent').is(':visible')) {
					newPos = 'side';
				}
				
				if (newPos=='side') {
					$targetSubPage.removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_sidepage');
				}
				else {
					$targetSubPage.removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_showpage');
				}
				targetSubPageClass='historyDocSubPage'; break; }
			case 'tab_aki800': {
				$targetSubPage = $('#mpContainer .aki800SubPage');
				
				//1130614	Leslie[中榮序128]	[上線需求序11] 新增客製化設定以強制公文開啟狀態下，點擊「公文檢索」時開啟為半開模式
				if ($('#docWorkPane').is(':visible')){
					if(!!theCustom.getCustomSet('TabAKI800WithSideMode')){
						$targetSubPage.find('.fullViewContent').hide();
						$targetSubPage.find('.searchViewContent').show();
						QueryDocUtil.initQueryDocPreviewContent();
						$('#querydoc_leftTopPane .drag_control.drag_to_full').addClass('hidden_item');
					}
				}
				else if(!!theCustom.getCustomSet('TabAKI800WithSideMode')){
					$targetSubPage.find('.fullViewContent').show();
					$targetSubPage.find('.searchViewContent').hide();
					$('#querydoc_leftTopPane .drag_control.drag_to_full').addClass('hidden_item');
				}				
				
				if ($targetSubPage.find('.searchViewContent').is(':visible')) {
					newPos = 'side';
				}
				
				if (newPos=='side') {
					$targetSubPage.removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_sidepage');
				}
				else {
					$targetSubPage.removeClass('doc_desktop_hiddenpage').addClass('doc_desktop_showpage');
				}
				targetSubPageClass='aki800SubPage'; break; }
			default: {
				}
            }
			$leftDrawer.removeClass('drawer_show');
			_switchDesktopContent(targetSubPageClass, '');
		});
		
		/* 點側桌頁右上方button切換顯示模式 */
		$('.dragControlPane .drag_control').on('click', function(event){
			theLogger.log('side desk moving...');
			var posAfter = null, posBefore = null;
			var closeBeforeSwitch = true;
			
			var $actCtrl = $(event.currentTarget);
			var actCtrlClass = $actCtrl.attr('class');
			
			/* drag_to_half, drag_to_close, drag_to_full */
			if (actCtrlClass.search('drag_to_half')>=0) {
                posAfter = 'side';
            }
			else if (actCtrlClass.search('drag_to_close')>=0) {
                posAfter = 'close';
				closeBeforeSwitch = false;
            }
			else if (actCtrlClass.search('drag_to_full')>=0) {
                posAfter = 'full';
            }
			
			var $sidePage = $(event.currentTarget).closest('.doc_desktop_subpage');
			var pageId = $sidePage.attr('id');
			var $listPane = $('#tdlPane #listPane'); // 2017.3.7
			var $target = null;
			var $leftDrawer = $('#mpContainer #leftDrawer');
			
			var half_w, win_w, $previewPane=null;
			switch (pageId) {
            case 'todolistContainer': {
				$targetPane = $('#todolistContainer');
				/* 顯示 searchViewContent => 半開 */
				if ($('#sidePane .searchViewContent').is(':visible')) {
                    posBefore = 'side';
                }
				else { /* 顯示其它 list/icon => 全開 */
					posBefore = 'full';
				}
				
				var displayMode = localStorage.mp_display_mode; // 2017.5
				if (posBefore !== posAfter) {
					if (posAfter!=='close') {
						// 確認是否可直接切換(毋須先關再開, 切換內容)
						if (posBefore=='full' && $('#todolistContainer #iconPane').is(':visible')) {
							closeBeforeSwitch = false;
						}
						else if (posBefore=='side') { // 2017.5
							if (typeof displayMode=='string' && displayMode=='icon') {
								closeBeforeSwitch = false;
							}
						}
					}
                    if (posBefore=='full' && posAfter == 'side') {
                        half_w = SSOUtil.getEMSize($('#tdlPane')[0]) * 25;
						if (closeBeforeSwitch) {
							SSOUtil.loading('show');
							$leftDrawer.removeClass('drawer_show'); // 2017.5.2
							$targetPane.addClass('openToSide').removeClass('doc_desktop_showpage');
						}
						else {
							$targetPane.addClass('doc_desktop_sidepage').removeClass('doc_desktop_showpage');
							$('#tdlPane #iconPane').hide();
							$('#tdlPane #listPane').hide();
							$('#tdlPane #sidePane').show();
							
							var extraParam;
							if (localStorage.mp_display_mode=='list') {
								extraParam = {
									selectedFolder: theSSO.MP.todolist.builder.getSelectedFolder(), //$('#listPane #selectedFolder').val(),
									filterWord: theSSO.MP.todolist.builder.getFilterWord(),
								};
							}
							
							SSOUtil.loading('show');
							_initDocPreviewContent(extraParam);
							SSOUtil.loading('hide');
													 
							if (theSSO.MP.PreviewCtrl.getCurrentPreviewCount()>0) {
								$previewPane = $('#mpDesktop #eDocPreviewPane');
								if (!$previewPane.is(':visible')) {
									$previewPane.show();
								}
							}
						}
                    }
					else if (posBefore=='full' && posAfter == 'close') {
                        $targetPane.removeClass('doc_desktop_showpage');
						setTimeout(function() {
							// 2017.9.14 - 1060802, bug-fix 圖示關閉後再開啟變成列表模式問題!
							/* / 下次全開一律為list mode!
							$('#iconPane').hide();
							$('#sidePane').hide();
							$listPane.show();*/

							if (localStorage.mp_display_mode=='list') {
								// 2017.3.7
								if ($listPane.data('resize')=='true') {
									theSSO.MP.reiszeListPane(null, null, $listPane);
								}
							}
						}, 500);
                    }
					else if (posBefore=='side' && posAfter == 'full') {
						win_w = $(window).innerWidth();
						if (closeBeforeSwitch) {
							$leftDrawer.removeClass('drawer_show'); // 2017.5.2
							$targetPane.addClass('openToFull').removeClass('doc_desktop_sidepage');
						}
						else {
							$targetPane.addClass('doc_desktop_showpage').removeClass('doc_desktop_sidepage');
							
							// 2017.5
							if (typeof displayMode=='string' && displayMode=='icon') {
								$('#tdlPane #sidePane').hide();
								$listPane.hide();
								$('#tdlPane #iconPane').show();
							}
							else {
							$('#tdlPane #iconPane').hide();
							$('#tdlPane #sidePane').hide();
							$listPane.show();
							}
							
							// 2017.3.7
							if ($listPane.data('resize')=='true') {
								theSSO.MP.reiszeListPane(null, null, $listPane);
							}
						}
                    }
					else if (posBefore=='side' && posAfter == 'close') {
                        $targetPane.removeClass('doc_desktop_sidepage');
                    }
                }
				break;
			}
			case 'newDocWorkspace': {
				/* 顯示 searchViewContent => 半開 */
				if ($('#newDocWorkspace .list_layout').is(':visible')) {
                    posBefore = 'side';
                }
				else { /* 顯示 .icon_layout => 全開 */
					posBefore = 'full';
				}
				
				if (posBefore != posAfter) {
					/* 創稿只有半開 */
					if (posBefore=='side' && posAfter == 'close') {
						
						if ($('#newDocPreviewPane').is(':visible')) {
						  $('#newDocPreviewPane').removeClass('slideToOpen');
						  /* 先關閉預覽視窗, 在newDocPreviewPane transitionend event中關閉創稿側屜 */
						}
						else {
							$('#newDocWorkspace').removeClass('doc_desktop_sidepage');
							setTimeout(function() {
							   // 取消選取項目
							   var $divUl = $('#divUl');
							   $divUl.find("a button").remove();
							   $divUl.find("a").removeClass("ui-btn-active");
							   $(this).addClass("ui-btn-active");
							   
							   $('#newDocWorkspace').show();
							}, 1500);
						}
                    }
				}
				break;
			}
			case 'historyDocWorkspace': {
				/* 顯示 searchViewContent => 半開 */
				if ($('#history_leftTopPane .searchViewContent').is(':visible')) {
                    posBefore = 'side';
                }
				else { /* 顯示其它 list/icon => 全開 */
					posBefore = 'full';
				}
				
				if (posBefore !== posAfter) {
                    if (posBefore=='full' && posAfter == 'side') {
                        half_w = SSOUtil.getEMSize($('#tdlPane')[0]) * 25;
						$('#historyDocWorkspace').addClass('doc_desktop_sidepage').removeClass('doc_desktop_showpage');
						 $('#history_leftBottomPane').hide();
						 $('#history_leftTopPane .fullViewContent').hide();
						 $('#history_leftTopPane .searchViewContent').show();
						 HistoryDocUtil.initHistoryDocPreviewContent();
						 $('#history_leftTopPane').show();
						 
						 if (theSSO.MP.PreviewCtrl.getCurrentPreviewCount()>0) {
                            $previewPane = $('#mpDesktop #eDocPreviewPane');
							if (!$previewPane.is(':visible')) {
							   $previewPane.show();
							}
                         }
                    }
					else if (posBefore=='full' && posAfter == 'close') {
                        $('#historyDocWorkspace').removeClass('doc_desktop_showpage');
                    }
					else if (posBefore=='side' && posAfter == 'full') {
						win_w = $(window).innerWidth();
                        $('#historyDocWorkspace').addClass('doc_desktop_showpage').removeClass('doc_desktop_sidepage');
						$('#history_leftBottomPane').hide();
						$('#history_leftTopPane .searchViewContent').hide();
						$('#history_leftTopPane .fullViewContent').show();
						$('#history_leftTopPane').show();
						
						/*var $previewPane = $('#mpDesktop #eDocPreviewPane');
						 *if ($previewPane.is(':visible')) {
						 *	$previewPane.hide();
						 *}
						 */
                    }
					else if (posBefore=='side' && posAfter == 'close') {
                        $('#historyDocWorkspace').removeClass('doc_desktop_sidepage');
						/*var $previewPane = $('#mpDesktop #eDocPreviewPane');
						 *if ($previewPane.is(':visible')) {
						 *$previewPane.hide();
						 *}
						 */
                    }
                }
				break;
			}
			case 'aki800ListWorkspace': {
				$targetPane = $('#aki800ListWorkspace');
				/* 顯示 searchViewContent => 半開 */
				if ($('#querydoc_leftTopPane .searchViewContent').is(':visible')) {
                    posBefore = 'side';
                }
				else { /* 顯示其它 list/icon => 全開 */
					posBefore = 'full';
				}
				
				if (posBefore !== posAfter) {
					// 2017.5.2 - 公文檢索頁全開/半開切換, 都必須關閉再拉開(因須更換全部內容!)
					if (posAfter!=='close') {
						closeBeforeSwitch = true;
					}
					
                    if (posBefore=='full' && posAfter == 'side') {
						// 2017.5.2
						if (closeBeforeSwitch) {
							$leftDrawer.removeClass('drawer_show');
							$targetPane.addClass('openToSide').removeClass('doc_desktop_showpage');
						}
						else {
                        $('#aki800ListWorkspace').addClass('doc_desktop_sidepage').removeClass('doc_desktop_showpage');
						 $('#querydoc_leftTopPane .fullViewContent').hide();
						 $('#querydoc_leftTopPane .searchViewContent').show();
						 QueryDocUtil.initQueryDocPreviewContent();
						 $('#querydoc_leftTopPane').show();
                    }
                    }
					else if (posBefore=='full' && posAfter == 'close') {
                        $('#aki800ListWorkspace').removeClass('doc_desktop_showpage');
                    }
					else if (posBefore=='side' && posAfter == 'full') {
						// 2017.5.2
						if (closeBeforeSwitch) {
							$leftDrawer.removeClass('drawer_show');
							$targetPane.addClass('openToFull').removeClass('doc_desktop_sidepage');
						}
						else {
						win_w = $(window).innerWidth();
                        $('#aki800ListWorkspace').addClass('doc_desktop_showpage').removeClass('doc_desktop_sidepage');
						//$('#querydoc_leftBottomPane').hide();
						$('#querydoc_leftTopPane .searchViewContent').hide();
						$('#querydoc_leftTopPane .fullViewContent').show();
						$('#querydoc_leftTopPane').show();
						
						/*var $previewPane = $('#mpDesktop #inspcectDocPreviewPane');
						 *if ($previewPane.is(':visible')) {
						 *	$previewPane.hide();
						 *}
						 */
                    }
                    }
					else if (posBefore=='side' && posAfter == 'close') {
                        $('#aki800ListWorkspace').removeClass('doc_desktop_sidepage');
                    }
                }
				break;
            }
			default: break;
		    }
		});
		
		$(document).on('click', '#divUl li.list a', function(event) { // 2017.3.2 - dynamic-binding
			event.preventDefault();
			
			var $divUl = $('#divUl');
			$divUl.find("a button").remove();
			$divUl.find("a").removeClass("ui-btn-active");
			$(this).addClass("ui-btn-active");
			
			var sDraftTmplFile = $(this).attr('title');
			var tmplImgFile = '';
			switch (sDraftTmplFile) {
			case '110令_稿.xml': tmplImgFile='110.png'; break;
			case '111令受文者_稿.xml': tmplImgFile='111.png'; break;
			case '210函_稿.xml': tmplImgFile='210.png'; break;
			case '211書函_稿.xml': tmplImgFile='211.png'; break;
			case '410開會通知單_稿.xml': tmplImgFile='410.png'; break;
			case '310公告_稿.xml': tmplImgFile='310.png'; break;
			case '510簽_稿.xml': tmplImgFile='510.png'; break;
			case '611請辦單_稿.xml': tmplImgFile='611.png'; break;
            }
			
			$("<button>選用</button>").appendTo(this).buttonMarkup({corners: true, shadow: true, theme: 'b'})
				.on ( 'click', function() {
					//that.newDraft(choose);
					//panelWidget.close();
				});
				
			if (!!tmplImgFile && tmplImgFile.length) {
				$('#newDocPreviewPane img.page_inner').attr('src',  'IMAGE\\SSO\\' + tmplImgFile);  
            }
			else {
				$('#newDocPreviewPane img.page_inner').attr('src',  'IMAGE\\SSO\\NoTmplPic.png');
			}
			
			var $previewPane = $('#newDocPreviewPane');
			var previewPaneClasses = $previewPane.attr('class');
			if (previewPaneClasses.search('slideToOpen')==-1) {
				/* 2016.5 - 若在show()之後直接叫用addClass, 則會直接顯示, 故改於setTimeout叫用, 才會有slide效果 */
                $('#newDocPreviewPane').show();
				setTimeout(function() { $('#newDocPreviewPane').addClass('slideToOpen'); }, 50);
            }

			var choose = $(this).data("rsrcFile");
			return false;
		});
		
		// DEV: 測試HTML Element dimension用
		$('#btn_layout').on( 'click', function(){
			_dumpLayout();
		});
		
        var w = $('#todolistContainer').width();
        var h = $('#todolistContainer').height();
        theLogger.debug('#todolistContainer size, w=' + w + ' h=' + h);
          
        // 清單模式之排序條件
        $('#listPane input[name=radio-sort]').on('change', function() {
            var mode = $('#listPane input[name=radio-sort]:checked').val();
            alert('Sort mode=' + mode);
        });
		
		// 注意: 必須使用 new operator, function iScroll() 才會回傳 this.
		if (!theSSO.MP.todolist.builder.shouldHideLights()) {
			theSSO.MP.todolist.tdlicon_Scroll = new IScroll('#tdl_icon_list_content', {scrollX:true, scrollY:false}); // 圖示公文清單頁 // 2017.4.18, iScroll -> IScroll, add '#'
		}
		
		{
			var rowCnt = $('#todolist_tb tbody tr').length;
			theLogger.log('item count=' + rowCnt);
		}
		
		// 隱藏公布欄及工具箱之toolbar buttons
		$('#bottom_tb_billboard').hide();
		$('#bottom_tb_toolbox').hide();
		
		/* 2016.6 - 實作改以transform拉到螢幕外, 故毋須隱藏!!
		 * 隱藏首頁/公布欄 
		 * $('#startContainer').hide();
		 * $('#mpContainer').hide();
		 * $('#billboard').hide();
		 */
		
		// 2016.5 - 隱藏圖像模式窗格
		//$('#listPane').hide();
		$('#iconPane').hide(); // 2016.3
		
		$('#btn_listmode').on( 'click', function(){
			if ($('#listPane').is(':visible')) {
				return;
			}
			
			// 2012.9.5 - 測試iPad參數用
			{
				var $loginPage = $("#login");
				theLogger.debug("login page css info: z-index=" + $loginPage.css('z-index') +
							", left=" + $loginPage.css('left') +
							", top=" + $loginPage.css('top') +
							", width=" + $loginPage.outerWidth(false) +
							", height=" + $loginPage.outerHeight(false) +
							", position=" + $loginPage.css('position') +
							", display=" + $loginPage.css('display'));
				
				var $home = $("#home");
				theLogger.debug("home page css info: z-index=" + $home.css("z-index") +
							", left=" + $loginPage.css('left') +
							", top=" + $loginPage.css('top') +
							", position=" + $loginPage.css('position') +
							", display=" + $loginPage.css('display'));
				//return;
			}
			
			// 切換至待辦事項-清單模式
			$('#iconPane').css({'display':'none'});
			$('#listPane').css({'display':'block'});
						
			// 建立清單表格內容
			if ($('#todolist_tb > tbody > tr').length===0) {
				_initToDoList_List();
			}
			
			var window_h = $(window).height();
			var window_w = $(window).width();
			var headerbar_h = $('#home_header').height();
			// 2011.11.10
			if ($('#search-list > li').length===0) {
				// setup content
				// 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
				//var selfolder = $('#selectedFolder_search').attr('value');
				var selfolder = $('#selectedFolder_search').val();
				theSSO.MP.todolist.builder.makeToDoList_SearchList('search-list', selfolder);
				
				// 2014.8 - 調整高度, 改為動態計算
				var margin_top = 15;
				var searchListView_h = window_h - headerbar_h;
				
				// 2012.2.1 - 設定搜尋結果div之高度
				$('#search-list').parent().parent().css('height', '' + searchListView_h + 'px'); // 沒有bottom toolbar + 36px
								
				// searchWrapper, 除文件夾清單外的其它項目!
				var $searchViewFolder = $('#sidePane .searchViewContent .searchView_Folder');
				if ($searchViewFolder.is(':visible')) {
					var $searchWrapper = $('#sidePane .searchViewContent .search-wrapper');
					var $searchFilter = $searchWrapper.find('form');
					
					var searchFolder_h = $searchViewFolder.height();  // 文件夾清單控制項高度
					var searchFilter_h = $searchFilter.height();	// 文件夾內容篩選文字控制項高度
					var searchList_h = searchListView_h - searchFolder_h - searchFilter_h - margin_top;
					$('#search-list').css({'height': ''+searchList_h+'px'}); // 600-(47+5)
					$("#search-list").parent().css({'margin-top':'15px'});
				}
			}
	  
			$('#listPane > div').height($('#todolistContainer').height());
			home_page_create_event_handled = true;
			
			if ($('#listPane').data('resize')=='true') {
				_resizeListPane({w:window_w, h:window_h}, headerbar_h, $('#listPane'));
				$('#listPane').data('resize', 'false');
			}
			
			localStorage.mp_display_mode = 'list'; // 2016.10.13 - Eric Peng, 記憶顯示模式
		});
		
		/* 切換顯示模式為圖示模式 */
		$('#btn_iconmode').on( 'click', function(){
			if ($('#iconPane').is(':visible')) {
				return;
			}
			
			$('#listPane').css({'display':'none'});
			$('#iconPane').css({'display':'block'});
			
			if (typeof theSSO.MP.todolist.tdlicon_Scroll!=='object' || theSSO.MP.todolist.tdlicon_Scroll===null) {
				var iconModeContainerId = 'todolist_icon_cntr';
				builder.makeToDoList_Icon(iconModeContainerId, '1');
				theSSO.MP.todolist.tdlicon_Scroll = new IScroll('#tdl_icon_list_content', {scrollX:true, scrollY:false}); // 圖示公文清單頁 // 2017.4.18, iScroll -> IScroll, add '#'
			}

			// 2014.10 			
			theSSO.MP.todolist.tdlicon_Scroll.refresh();
			var idx=0;
			if (SSOUtil.typeOf(theSSO.MP.todolist.folderScrolls)=='array') {
				for (idx=0; idx<theSSO.MP.todolist.folderScrolls.length; idx++) {
					theSSO.MP.todolist.folderScrolls[idx].refresh();
				}
			}
			
			localStorage.mp_display_mode = 'icon'; // 2016.10.13 - Eric Peng, 記憶顯示模式
		});
		
		$('#btn_logPageInit').on ('click', function(){
			$.mobile.changePage('#blankBlackPage', { transition: "turn" } );
		});
		
		/* 2016.4 - transition結束event處理
		 * =>由於transition被啟動必由其它事件觸發(如 addClass, click etc...), 故其開始不會有event
		 */
		$('#mpContainer .doc_desktop_subpage').on('transitionend', function(e) {
			var $target = $(e.target);
			var itemClasses = $target.attr('class');
			var itemId = $target.attr('id');
			var $leftDrawer = $('#leftDrawer');
			var $listPane = $('#tdlPane #listPane');

			// 2020.11.27 - 1090786, Eric - 公文傳送/關閉後待辦清單頁未拉出問題.
			theLogger.log('-I- .doc_desktop_subpage:onTransitionEnd, targetId=' + itemId + ', itemClass=' + itemClasses);

			// 2021.1.7 - 1090786 Eric, MP todolist公文傳送/關閉後未顯示問題
			if (itemId=='todolistContainer' && itemClasses.search('doc_desktop_showpage')!==-1) {
				if ($listPane.length) {
					theLogger.log('-I- @SSO.\'transitionend\' event #listPane.css.display="' + $listPane[0].style.display + '" html=' + $listPane[0].outerHTML.substr(0, 256) + '...');
				}
				
				let _displayMode = ('mp_display_mode' in localStorage)?localStorage.mp_display_mode:'';
				if (_displayMode!='icon' && $listPane.length && $listPane[0].style.display=='none') {
					$listPane.show();
					theLogger.log('-I- .doc_desktop_subpage:onTransitionEnd, $listPane.show() invoked!');
				}
			}
			
			if (itemClasses.search('doc_desktop_showpage')==-1 && itemClasses.search('doc_desktop_sidepage')==-1 &&
				itemClasses.search('openToSide')==-1 && itemClasses.search('openToFull')==-1) {

				// 2020.11.27 - 1090786, Eric - 公文傳送/關閉後待辦清單頁未拉出問題.
				theLogger.log('-I- .doc_desktop_subpage:onTransitionEnd, $target gonna add class: [doc_desktop_hiddenpage]');

                /* 完成後隱藏項目 */
				$target.addClass('doc_desktop_hiddenpage');
				
				/* 顯示側屜列 */
				var _AOLOpened = false;
				if (typeof theAOL !=='undefined' && typeof theAOL.getCurrFolio !=='undefined') {
					_AOLOpened = theAOL.getCurrFolio();
				}
				
				if (itemId=='aki800ListWorkspace') {
					/* 開啟UniView/AOL唯讀檢閱時, 不顯示側桌 */
					if ($('#pDocInspectPane').is(':visible')) {
						return;
					}
					else if ($('#docWorkPane').is(':visible')) {
						/* 2017.7.11 - 1060576, 確認是否為AOL唯讀開啟 */
						if (!!_AOLOpened && _AOLOpened.readOnly()) {
							return;
						}
					}
				}
								
				theSSO.MP.changeNewDocSidePaneTitle(_AOLOpened);
				$leftDrawer.addClass('drawer_show');
            }
			
			/* 先關後開 */
			var extraParam;
			if (itemClasses.search('openToSide')!==-1) {
				$target.removeClass('openToSide');
				
				if (itemId=='todolistContainer') {
				$('#iconPane').hide();
				$('#listPane').hide();
				$('#sidePane').show();
				
				SSOUtil.loading('show');
				if (localStorage.mp_display_mode=='list') {
					extraParam = {
						selectedFolder: theSSO.MP.todolist.builder.getSelectedFolder(), //$('#listPane #selectedFolder').val(),
						filterWord: theSSO.MP.todolist.builder.getFilterWord(),
					};
				}
				_initDocPreviewContent(extraParam);
				SSOUtil.loading('hide');
				}
				else if (itemId=='aki800ListWorkspace') {
					//$('#aki800ListWorkspace').addClass('doc_desktop_sidepage').removeClass('doc_desktop_showpage');
					$('#querydoc_leftTopPane .fullViewContent').hide();
					$('#querydoc_leftTopPane .searchViewContent').show();
					QueryDocUtil.initQueryDocPreviewContent();
					$('#querydoc_leftTopPane').show();
				}
				
				setTimeout(function(){
					$target.addClass('doc_desktop_sidepage');
				}, 200);
			}
			else if (itemClasses.search('openToFull')!==-1) {
				$target.removeClass('openToFull');
				
				if (itemId=='todolistContainer') {
					$('#'+itemId+' #sidePane').hide();
					
					var displayMode = localStorage.mp_display_mode;
					if (typeof displayMode=='string' && displayMode=='icon') {
						$listPane.hide();
						$('#'+itemId+' #iconPane').show();
					}
					else {
						$('#'+itemId+' #iconPane').hide();
				$listPane.show();
					}
					
				// 2017.3.7
					if ($listPane.is(':visible') && $listPane.data('resize')=='true') {
					theSSO.MP.reiszeListPane(null, null, $listPane);
				}
				
				// 2016.10.14 - Eric Peng, sidePane -> listPane, 依sidePane文件夾
				var updateList=false, updateFilter=false;
				extraParam = {
					selectedFolder: theSSO.MP.todolist.builder.getSelectedFolder(),
					filterWord: theSSO.MP.todolist.builder.getFilterWord(),
				};
				
				var selFolder = $('#listPane #selectedFolder').val();
				if (selFolder != extraParam.selectedFolder) {
					updateList = true;
				}
				
				var filterWord = $('#listPane #tdl_list_filter').val();
				if (filterWord != extraParam.filterWord) {
					updateFilter = true;
				}
				
				if (updateList) {
					SSOUtil.loading('show');
					
					var $selFolder = $('#listPane #selectedFolder');
					$selFolder.val(extraParam.selectedFolder);
					$selFolder.trigger('change');
				}
				
				if (updateFilter) {
					var $tdlFilter = $('#listPane #tdl_list_filter');
					$tdlFilter.val(extraParam.filterWord);
					$tdlFilter.trigger('change');
				}
				SSOUtil.loading('hide');
				}
				else if (itemId=='aki800ListWorkspace') {
					//$('#aki800ListWorkspace').addClass('doc_desktop_showpage').removeClass('doc_desktop_sidepage');
					$('#querydoc_leftTopPane .searchViewContent').hide();
					$('#querydoc_leftTopPane .fullViewContent').show();
					$('#querydoc_leftTopPane').show();
				}
				
				setTimeout(function(){
					$target.addClass('doc_desktop_showpage');
				}, 200);
				
				// 關閉預覽窗格
				setTimeout(function(){
					theSSO.MP.PreviewCtrl.hidePreviewPane();
				}, 1000);
			}
		});
		
		$('#newDocPreviewPane').on('transitionend', function(e){
			var $target = $(e.target);
			var itemClasses = $target.attr('class');
			if (itemClasses.search('slideToOpen')==-1) {
                $target.hide();
				
				/* side_pane 'side' to 'close' */
				$('#newDocWorkspace').removeClass('doc_desktop_sidepage');
				setTimeout(function() {
				   // 取消選取項目
				   var $divUl = $('#divUl');
				   $divUl.find("a button").remove();
				   $divUl.find("a").removeClass("ui-btn-active");
				   $(this).addClass("ui-btn-active");
				   
				   $('#newDocWorkspace').show();
				}, 1500);
            }
		});
		
		// 2019.7 - 1080654 Eric, 動畫結束記錄時間(公文傳送時效log)
		// 第一次傳送作業, 因跳轉至pincode子視窗, 結束作業時才跳轉回MP, transitionend不會被觸發. 因此無法記錄時間.
		$(document).on('transitionend', '#todolistContainer', function() {
			if (typeof SSO_CONFIG.debugTime=='boolean' && SSO_CONFIG.debugTime) {
				var tdlCntrClass = $('#todolistContainer').attr('class');
				if (tdlCntrClass.indexOf('doc_desktop_showpage')!=-1 ||
					tdlCntrClass.indexOf('doc_desktop_sidepage')!=-1) {
					if (window.tmEndSubmit!==0) {
						SSOUtil.dev_logTimeElapse('MP SlideToOpen transitionend.', window.tmEndSubmit);
						window.tmEndSubmit = 0;
					}
				}
			}
		});

		// 2012.3.14 - 開啟公文鍵隱藏
		//$('#mainContent .cmdForDoc').hide();
		
		var searchTimeout;	//2016.12.6	Leslie	查詢功能的TimeOut
		// 2012.8.30 - 條列清單項目篩選
		$('#tdl_list_filter').on('change keyup', function(event, ui) {
			if($(this).prop('comStart')) return;	//2016.12.6	Leslie	中文輸入未完成時，不做查詢
			
			//2016.12.6	Leslie	加上TimeOut行為，以避免連續輸入時Lag
			clearTimeout(searchTimeout);
			searchTimeout = setTimeout(function(){
			var slastKey = $('#tdl_list_filter').jqmData('lastKey');
			if (!!slastKey && slastKey.length) {
				slastKey = slastKey.toLowerCase();
			}
			else {
				slastKey = '';
			}
			
			var sFilter = $('#tdl_list_filter')[0].value;
			if (!sFilter || (typeof sFilter != 'string')) {
				sFilter = '';
			}
			else {
				sFilter = sFilter.toLowerCase();
			}
			
			if (sFilter==slastKey) {
				theLogger.log('match with last keyword:"' + slastKey + '", do nothing...');
				return;
			}
			else {
				theLogger.log('new filter key:"' + sFilter + '", lastFilder="' + slastKey + '"');
			}
			
			/*/
			// 2012.9.3 - todo:
			//   1. 優化項目 => 若新的filter與舊的比較, 僅新增字元, 則可由目前仍列出的項目篩選
			//   2. 中文字輸入時, 取出的sFilter會有額外的全形底線字元:"＿", 應trim掉.
			/*/
			
				// 2016.12.6	Leslie	搜尋功能優化
				if(sFilter != ''){
					var $tbObj;
					if(sFilter.indexOf(slastKey) != -1)
						$tbObj = $('.sData #todolist_tb tbody tr:visible');
					else
						$tbObj = $('.sData #todolist_tb tbody tr')
					var allText = $tbObj.text().toLowerCase();
					//1150213	Leslie[1141694]	修正當公文基資(主旨)內容有"§"時，會造成搜尋功能異常
					// var arTbText = allText.split('§');
					var arTbText = allText.split('┼┼┼┼┼');
					
					$tbObj.css('display', 'none');
					for(var idxTB = 0,idxMax = arTbText.length-1;idxTB < idxMax;idxTB++){
						if(arTbText[idxTB].indexOf(sFilter) != -1)
							$tbObj.eq(idxTB).css('display', 'table-row');
					}
				}
				else
					$('.sData #todolist_tb tbody tr').css('display', 'table-row');
			/*
			var txt = '';
			$('.sData #todolist_tb tbody tr').each(function() {
				if (sFilter==='') {
					$(this).css('display', 'table-row');
				}
				else {
					var txt = this.innerText.toLowerCase();
					//console.log("item txt=" + txt);
					if (txt.indexOf(sFilter) == -1) {
						// 找 <input value="xxx">
						// 2016.12.6	Leslie	MP已未使用input欄位，取消多餘邏輯
						$(this).css('display', 'none');
						/*txt = $(this).find('input').val();
						if (!!txt && txt.length) {
							txt = txt.toLowerCase();
						}
						
						if (!txt || txt.indexOf(sFilter)==-1) {
							//console.log("input value=" + txt);
							$(this).css('display', 'none');
							//console.log("display = none");
						}
						else {
							$(this).css('display', 'table-row');
							//console.log("display = table-row");
						}*/
					/*}
					else {
						$(this).css('display', 'table-row');
						//console.log("display = table-row");
					}
				}
			});*/
			
			// 2019.9.6 - 1080339 Eric, jQuery 3.x upgrade [一致性修改, 全部改用jQMData]
			//$('#tdl_list_filter').data('last_key', sFilter);
			$('#tdl_list_filter').jqmData('lastKey', sFilter);

			theSSO.MP.todolist.builder.setFilterWord(sFilter);
			},300);	//2016.12.6	Leslie	TimeOut時間，0.3秒
			//if (sFilter != )
		}).on('compositionstart', function(){
			$(this).prop('comStart', true);
			console.log('中文輸入，start');
		}).on('compositionend', function(){
			$(this).prop('comStart', false);
			console.log('中文輸入，end');
			$(this).trigger("change");
		});
		
		var $cmdForDoc = $('#mpDesktop div.cmdForDoc');
		
		// [圖示模式]開啟公文
		$cmdForDoc.find('.cmdOpenDoc').on( 'click', function() {
			
			//1060329 Kevin 開啟前檢核登入狀態
			if(!theSSO.MP.CheckLoginStatus())
				return;
			
			if (theSSO.MP.PreviewCtrl.getCurrentPreviewCount()>=0)
			{
				var linkDoc = theSSO.MP.PreviewCtrl.getCurrentPreviewDoc();
				if (linkDoc===null) {
					alert('無法取得公文資訊 [PreviewCtrl.getCurrentPreviewDoc()]');
					return;
				}
				
				// 2016.622 - Raymond, 測試開啟紙本簽核
				//if (linkDoc.signType=='P') {
				//	alert('尚未實作紙本公文簽辦');
				//	return;
				//}
				
				if (!!linkDoc) {
					// 2019.7 - 1080654 Eric, load doc performance
					if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
						theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 由預覽視窗開啟公文作業(DocNo=' + linkDoc.docNo + ') BEGIN...');
						window.tmBeginOpenDoc = Date.now();
						window.tmBeginOpenDoc2 = window.tmBeginOpenDoc;
						if (window.iOS_device) {
							window.tmBeginOpenDoc3 = window.tmBeginOpenDoc;
						}
						else {
							window.tmBeginOpenDoc3 = 0;
						}
					}

					var docObj = theSSO.MP.todolist.builder.getDocByMsgId(linkDoc.msgId, linkDoc.ICUserId);
					if (docObj===null) {
						alert('找不到MsgId="' + linkDoc.msgId + '"對應的公文');
						return;
					}
					else {
						theLogger.log('docObj=' + docObj);
					}
					
					var SAMLart = localStorage.Artifact;
					theSSO.MP.todolist.builder.checkMsgValidity(SAMLart, docObj)
					.then(function(rslt) {
						var sDocObj = JSON.stringify(docObj);
						theLogger.log('localStorage.working_doc_obj = ' + sDocObj);
						localStorage.working_doc_obj = sDocObj;
											
						// 2013.9.6 - Eric, 開啟公文前先叫用ODMSSP.SetMsgStatus (=>在Server準備ODWDCM/ODWWKF檔)
						var SAMLart = localStorage.Artifact;
						
						// 2020.1.9 - 1080701 Eric, 開啟[草稿]公文前叫用ODMSSP.SetDraftMsgStatus以更新ODWMSG.XML內容!
						var _dfdInside = $.Deferred();

						// 2016.6 - Eric, 草稿公文不叫用SetMsgStatus!
						var isDraft = theSSO.MP.todolist.builder.isDraftMsg(docObj);
						if (isDraft) {
							theWebServices.odmssp.setDraftMsgStatus(SAMLart, docObj.sourceOrgNo, docObj.msgId, docObj.ownUserId)
							.done(function(rslt) {
								_dfdInside.resolve({success:true});
							})
							.fail(function(errRslt){
								_dfdInside.reject({success:false, errMsg: errRslt.errMsg});
							});
						}
						else {
							var rslt2 = theWebServices.odmssp.setMsgStatus(SAMLart, docObj.msgId);
							if (rslt2.success===true) {
								theLogger.log('-I- invoke ODMSSP.SetMsgStatus() succeeded.');
								_dfdInside.resolve({success:true});
							}
							else {
								if (rslt2.success!==true) {
									theLogger.warn('-I- invoke ODMSSP.SetMsgStatus() failed. ErrMsg=' + rslt2.errMsg);
									alert('叫用ODMSSP.SetMsgStatus! ErrMsg=' + rslt2.errMsg);
									_dfdInside.reject({success:false, errMsg: 'Invoke ODMSSP.SetMsgStatus() failed. ErrMsg=' + rslt2.errMsg})
								}
							}
						}
						return _dfdInside.promise();
					})
					.then(function(rslt) {
						/* 2016.6.14 - 改用嵌入AOL模組後開啟公文
						 * 2013.2.20 - RD-AOL.html設定為cache(跳轉至其它網頁後不卸載), 故在開啟該頁面前, 須先
						 *   確認是否已載入, 若已載入, 則直接跳轉至該頁面內容!
						 * 2013.1.30 - 改用jqm.changePage()載入公文編輯/簽核模組!
						 */
						if (theSSO.aolModuleLoaded) {
							$.mobile.loading('show');
							
							theAOL.reload();
							
							/* 關閉側桌 */
							if ($('#listPane').is(':visible')) {
								$('#listPane .dragControlPane .drag_to_close').trigger('click');
							}
							else if ($('#sidePane').is(':visible')) {
								$('#sidePane .dragControlPane .drag_to_close').trigger('click');
							}
							/* 隱藏預覽窗格 */
							$('#eDocPreviewPane').hide();
							
							$('#docWorkPane').show();
							$.mobile.loading('hide');
								
							/* 關閉todolist側桌
							 *var tdlclass = $('#mpContainer #todolistContainer').get('class');
							 * 顯示 aol 頁面
							 */
							
							/*theAOL.reload();	// 2013.9.13 - Raymond, 使用reload方法來開啟另一筆公文或開啟原來那一筆, 因為關閉AOL會清空畫面, 所以即使開原來那一筆也要重載
							theLogger.log('-I- gonna invoke $.mobile.changePage(\'#aolo\', ...) ...');
							setTimeout(function() {
								$.mobile.changePage($('#aol'), {transition: 'slide', changeHash: false}); }, 200);
								//$('body').pagecontainer('change', '#aol', {transition: 'slide', changeHash: false}); }, 200); // 2016.5
							theLogger.log('-I- after invoke $.mobile.changePage(\'#aolo\', ...).');
							*/
						}
						else {
							/* 2013.9 - Raymond, iOS Safari第一次載入內容時,用slide會造成AOL顯示異常
							 *$.mobile.changePage('RD-AOL.html', {transition: 'slide', changeHash: false});
							 */
							
							$.mobile.loading('show');
							
							SSOUtil.injectHTMLModule('RD-AOL.html', $('#docWorkPane #aol'))
							.then(function(rslt){
								/* 關閉側桌 */
								if ($('#listPane').is(':visible')) {
									$('#listPane .dragControlPane .drag_to_close').trigger('click');
								}
								else if ($('#sidePane').is(':visible')) {
									$('#sidePane .dragControlPane .drag_to_close').trigger('click');
								}
								/* 隱藏預覽窗格 */
								$('#eDocPreviewPane').hide();
								
								// 2016.12.9 - 傳送選單不套用jQM (補圖示模式開啟)
								var noneJQueryTxSel = theSSO.User.EnvSettings.get('SSO_NOT_USE_JQM_TXSEL');
								if (SSOUtil.isValueTrue(noneJQueryTxSel)) {
									$('#aol #chooseA').attr('data-native-menu', 'true');
									$('#aol #chooseB').attr('data-native-menu', 'true');
									$('#aol #chooseC').attr('data-native-menu', 'true');
									$('#aol #chooseD').attr('data-native-menu', 'true');
									theLogger.log('-I- 傳送異動別選單使用原生select elements.');
								}
								
								$('#aol').trigger('sso:moduleinit', [{}]); // 2016.6 - 觸發sso:moduleinit
								$('#aol').enhanceWithin();
								/* 2016.6.15 - 暫時先觸發pagecreate, 等AOL調整完後改觸發sso:modulecreate */
								$('#aol').trigger('pagecreate');
								
								//$('#aol').trigger('sso:modulecreate', [{}]); 
								$('#docWorkPane').show();
								
								theSSO.aolModuleLoaded = true;
								
								$.mobile.loading('hide');
							})
							.fail(function(rslt){
								theLogger.log('-E- invoke SSOUtil.injectHTMLModule("RD-AOL.html", ...) failed');
								return;
							});
						}
						
						/* 2016.3 - 記錄主頁面切換到AOL頁面前的orientation */
						if (typeof window.orientation !== 'undefined') {
							theSSO.MP.orientationBeforeAOL = window.orientation; /* 實測iOS 9, orientation值為0,90,180,270;其中0,180為直式 */
						}

						// 2019.7 - 1080654 測取次筆公文!
						// setTimeout(function() {
						// 	let nextEDoc = theSSO.MP.todolist.builder.getENextId(docObj.msgId);
						// 	if (nextEDoc.success.true && typeof nextEDoc.nextMsgId=='string' && nextEDoc.nextMsgId.length) {
						// 		console.log('-I- nextEDoc: ' +  JSON.stringify(nextEDoc));
						// 	}
						// 	else {
						// 		console.log('-W- 無法取得次筆公文. nextEDoc=' + JSON.stringify(nextEDoc));
						// 	}
						// }, 1500);
					})
					.fail(function(rslt) {
						if(!!rslt && !!rslt.msg) {
							theLogger.error(rslt.msg);
						}
						else {
							theLogger.error('檢核MsgId有效性或loadDocPreview failed.');
						}
					});
				}
			}
		});
    }); // EndOf $('#home').on('pagecreate', function(event, ui) {
    
    $(document).on('pageshow', '#home', function(event, ui) {
		
		//1100503	Leslie[1100333]	配合首頁分割後，修正登入記時的變數以傳遞至後續計算
		window.tmBeginLogin = new Date(parseInt(localStorage.tmBeginLogin));
		
		//1110330	Leslie[1101537] 身份切換後，若視窗Reload應清空網址參數
		if(performance.navigation.type == performance.navigation.TYPE_RELOAD) {
			location.search = '';
		}
		
		/* inner functions */
		function _getIconFolderH() {
		    if ($('#iconPane').is(':visible')) {
				var containerH = $('#iconPane').height();
				var headerH = $('#todolist_icon_cntr .folderList').height(); // 2016.8.24 - IE11 reload bug
				return containerH - headerH;//code
			}
			else {
				var containerH = $('#mpContainer').height();
				var headerH = Math.floor(SSOUtil.getEMSize($('#home')[0]) * 2.5); // 2016.8.24 - IE11 reload bug
				return containerH - headerH;
			}
		}
		
		// for debug
		// if (window.location.href.indexOf('docvip.fdat.com.tw')!=-1) {
		// 	alert(window.navigator.userAgent);
		// }

		if (event.target.id!="home")
			return;
		
		_dbgPageInitLog += '#home - pagecontainershow event.\r\n';
		
        theLogger.log('----- page events -----\r\n' + _dbgPageInitLog + '-----\r\n');
		_dbgPageInitLog=''; // clear content...
        
        var w = $('#todolistContainer').width();
        var h = $('#todolistContainer').height();
        
        var h_header = $('#home .ui-header').outerHeight();
		var $footer = $('#home .ui-footer');
		var h_footer = 0;
		if ($footer.length) { // 2012.8.24 - 若沒有footer,則不計
			var h1 = $footer.outerHeight();
			h_footer = parseInt(h1)+1; // 2012.8.7
		}
		
        // 2012.8.21 - 單行清單改為圖示式! (上方有文件夾指定editor及搜尋filter)
		$('#search-list').removeClass('ui-shadow');
		
		/* 2014.8 - 暫行解決方案for iOS 7 Safari登入後，載入的todolist網頁內容會scroll超出頁面上方
		 * ToDo: 目前頁面下方仍會多出一條約20px之空間!
		 */
        var wnd_h = $(window).height();
		//var wnd_h = window.innerHeight || $(window).height();
        
        theLogger.debug('#todolistContainer size, w=' + w + ' h=' + h + ' #home css[display]=' + $('#home').css('display'));
		
		if (typeof theSSO.MP.splitterV === 'undefined' || theSSO.MP.splitterV===null)
        {
            var magic_num = 16; // 2011.8.12 - Eric Peng, 測試page height去除header+footer height後,會少16px...原因待查(scrollbar?)
			if (h_footer===0) {
				magic_num = 0; // 2012.8.24 - 若無footer, 則不用magic_num (高度毋須調整)
			}
			var h_extra = h_header+h_footer+magic_num;
			var h_sc = 0;
			
			theLogger.debug("Env. variables: h_header=" + h_header + ", h_footer=" + h_footer +
						", magic_num=" + magic_num + " [wnd_h=" + wnd_h + "]");
			
            if (wnd_h>h_extra) {
				h_sc = wnd_h - h_extra;
                $('#todolistContainer').css('height', '' + h_sc + 'px');
				
				// 2017.3.7
				$('#mpContainer .doc_desktop_subpage').css('height', '100%');
				//	$('#mpContainer .doc_desktop_subpage').css('height', '' + h_sc + 'px');
            }
			
			// 2012.12.13 - 設定MsgPortal頁面寬度為螢幕寬度!
            //$("#todolistContainer").width($(window).width());
			
			$('#mpContainer .doc_desktop_subpage').css('width', '100%'); // 2017.3.7
			//	$('#mpContainer .doc_desktop_subpage').width($(window).width());
			
            // 第一次顯示, 初始化#mainPageContainer高度
			var h_mpc = $('#mainPageContainer').height();
			if (h_mpc<h_sc)
			{
				$('#mainPageContainer').height(h_sc);
				//1060321 Kevin 美工新增側邊抽屜
				$('#imgDownDrawer').height(h_sc);
			}
				
			// 2016.4 - temp code for 相容性判定
			theSSO.MP.splitterV = {};
        }

		// 2011.8.22 - select style of eDoc
        $('#folderListExtra > .ui-select > div').removeClass('ui-btn-corner-all');
        $('#folderListExtra > .ui-select > div').addClass('ui-btn-corner-tl ui-btn-corner-tr');
        
        var clientH = $('#todolistContainer').height();
		//$('#billboard').css({display:'block', height:'' + clientH + 'px', top: '-' + clientH + 'px'});
		//$('#startContainer').css({display:'block', height:'' + clientH + 'px', top: '-' + clientH + 'px'});
		
		var h_folder = _getIconFolderH();
		theLogger.debug("IconFolder h=" + h_folder);

		// 2019.12.13 - 1080339 Eric, bug fix.
		//for (var idx in theSSO.MP.todolist.folderScrolls)
		var idx=0;
		if (SSOUtil.typeOf(theSSO.MP.todolist.folderScrolls)=='array') {
			for (idx=0; idx<theSSO.MP.todolist.folderScrolls.length; idx++) {
				// 2015.11 - Eric Peng, iOS9 bug-fix
				if (h_folder>0) {
					$(theSSO.MP.todolist.folderScrolls[idx].wrapper).css('height', '' + h_folder + 'px');
					theLogger.log('gonna refresh #' + idx + ' scroller');
					theSSO.MP.todolist.folderScrolls[idx].refresh();
				}
			}
		}
		theSSO.MP.todolist.tdlicon_Scroll.refresh();
		
		// 2012.8 - 設定login頁面之高寬
		var w = $(window).width();
		var h = $(window).height();
		var bw = $("body").width();
		var bh = $("body").height();
		theLogger.debug("window w=" + w + ", h=" + h +
					"; body w=" + bw + ", h=" + bh);
		// 2020.6.16 - 1090452 Eric, 移除此段以解決登入之輸入panel位移問題!
		//$("#login").css({"width":bw+"px", "height":bh+"px"});
		
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
			//1051205 Kevin 設定已經登入，避免觸發整合登入模式
			theSSO.logoned = true;
			//1050719 Kevin 配合權杖登入介接方式，改以UserInfo儲存最後登入資訊 Start
			window.localStorage.Artifact = sSAMLart;
			//1060329 Kevin 紀錄權杖
			theSSO.Artifact = sSAMLart;
			_postLoginProcess(sSAMLart, true);
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
		// 2021.4.19 - 1100333, Eric Peng - 分割Login(登入)/eDoc頁面!
		else if (typeof theSSO.logoned!='boolean' || theSSO.logoned===false) { 
			// 2021.4.19 - 1100333, Eric Peng - 登入後初始化作業失敗, 強制回Login(登入)頁!
			let _href = window.location.href.toUpperCase();
			let _EDocPage = SSO_CONFIG.EDocPage.toUpperCase();
			if (_href.indexOf(_EDocPage)!==-1) {
				let SAMLart = localStorage.Artifact;
				if (typeof SAMLart=='string' && SAMLart.length) {
					theSSO.Artifact = SAMLart; // 紀錄權杖
					_postLoginProcess(SAMLart, '', '');
				}
				else {
					window.location.href = SSO_CONFIG.LoginPage;
				}
			}
		}
		
		//1061023 Kevin 1060634 調整介接訊息由首頁處理
		var sMSG = SSOUtil.getURLParameter('MSG');
		if (!!sMSG && sMSG.length) {
			alert(decodeURI(sMSG));
		}
		
		//1110420	Leslie[1110069]	網頁Title依客製化需求調整
		if(SSO_CONFIG.OrgNickName == 'SMEG')
			document.title = '電子簽核系統';
		
		//1100507	Leslie[1100333]	配合首頁分離，首頁部分停用Window整合登入
		/*
		//1051005 Kevin Window整合登入功能
		if (SSOUtil.getURLParameter('ACT')=="OS")
			SSO_CONFIG.WindowLogon = true;
		
		//2016.7.25 - Leslie, Window整合登入功能
		//1060329 Kevin 重複登入處理
		//if (SSO_CONFIG.WindowLogon && !theSSO.logoned){
		if (SSO_CONFIG.WindowLogon && !theSSO.logoned && !theSSO.MP.CheckUsing()){
			SSO_CONFIG.WindowLogon = false;	//設為False，僅初次開啟視窗時啟動Window整合登入
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
							_postLoginProcess(sWinLogonRtn, true);
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
		*/
    });
    
    $(document).on('pagebeforeshow', '#home', function() {
		_dbgPageInitLog += '#home - pagebeforeshow event...\r\n';
        theLogger.debug('#home page, pagebeforeshow event...');
		
        var w = $('#todolistContainer').width();
        var h = $('#todolistContainer').height();
        theLogger.debug('#todolistContainer size, w=' + w + ' h=' + h);
    });
	
	// 2014.9 - 解決 $.mobile.changePage 後無法顯示SSO頁面問題!
	$(document).on('pagechange', function(event, dataObj) {
		function _addActivePageClass($page) {
			var activeClass = 'ui-page-active';
			if (!!$page) {
				var classname = $page.attr('class');
				if (classname.search(activeClass)===-1) {
					theLogger.warn('-W- 指定的頁面(Id=' + $page.attr('id') + ') 沒有class:\'' + activeClass + '\', quick-fix補上.');
					$page.addClass(activeClass);
				}
			}
		}
		
		function _removeActivePageClass($page) {
			var activeClass = 'ui-page-active';
			if (!!$page) {
				var classname = $page.attr('class');
				if (classname.search(activeClass)!==-1) {
					theLogger.warn('-W- 指定的頁面(Id=' + $page.attr('id') + ') 有class:\'' + activeClass + '\', quick-fix去除.');
					$page.removeClass(activeClass);
				}
			}
		}
		
		/* 2014.9 - Eric Peng, quick-fix for chrome changePage bug!
		 * => AOL關閉後無法顯示SSO頁面問題
		 * 說明: (1) 檢核 pageshow, pagechange event callback functions 執行時, div#home的class有'ui-page-acitve'
		 *       (2) 相關event結束後, SSO頁面未顯示, 畫面為空白灰色. 再檢視div#home的class, 'ui-page-active'已被移除!
		 *       (3) 此修正會在0.1秒後, 將該element的'ui-page-active' class加回來!
		 *       (4) jQM + chrome bug!? (iOS Safari無此問題)
		 */
		var $toPage = dataObj.toPage;
		var $fromPage = dataObj.options.fromPage;
		theLogger.debug('-I- "pagechange" event, from:' + ((!!$fromPage)?$fromPage.attr('id'):'none') +
					', to:' + $toPage.attr('id'));
		
		if ($toPage.attr('id')==='home' ||
			$toPage.attr('id')==='aol') {
			setTimeout(function() { _addActivePageClass($toPage) },
					   100);
			
			/* 2016.3 - 若在AOL作業時旋轉screen, 須重新計算layout */
			if ($toPage.attr('id')==='home') {
                if ((typeof theSSO.MP.orientationBeforeAOL!='undefined') && (typeof window.orientation != 'undefined')) {
					if ((theSSO.MP.orientationBeforeAOL!=null) && (theSSO.MP.orientationBeforeAOL != window.orientation)) {
						/* for iOS 0,180為portrait, 90,270為landscape */
						var orient = (window.innerWidth < window.innerHeight) ? 'portrait' : 'landscape';
						
						/* 2016.3.15 - 有時由AOL回MP, 收到此event時, #mainPage仍未顯示, 須等待一段時間才會出現
						 * 因此改為先詢問標題高度, 若為0表示尚未顯示 => 等0.3秒再叫用_onSSOOrientationChange重設頁面dimension.
						*/
						var h_header = $('#home_header').height();
						if (h_header==0) {
							theLogger.log('-I- h_header==0, use setTimeout(_onSSOOrientationChange)...');
							setTimeout(function() { _onSSOOrientationChange(orient); }, 300);
						}
						else {
							theLogger.log('-I- h_header=' + h_header + ', call _onSSOOrientationChange()...');
							_onSSOOrientationChange(orient);
						}
					}
					theSSO.MP.orientationBeforeAOL = null;
				}
			}
		}
		if (!!$fromPage) {
			if ($fromPage.attr('id')!==$toPage.attr('id')) {
				setTimeout(function() { _removeActivePageClass($fromPage) }, 300);	//code
			}
		}
	});
    
	// 2012.2.23 - cross-document message test
	/*
    window.addEventListener('message', receiver, false);
    function receiver(e) {
      alert('msg recieved. src=' + e.source + ', data=' + e.data); 
	}*/
	
	//1130903	Leslie[序215]	增加於背景傳送階段，阻止使用者誤關視窗
	window.addEventListener('beforeunload', function(event) {
//		theLogger.log("window.onbeforeunload...");
		if (typeof theSSO.MP.submitDocProcWnd!='undefined' && theSSO.MP.submitDocProcWnd!=null && 
			theSSO.MP.submitDocProcWnd.closed!==true) {
			if (theSSO.MP.submitDocProcWnd.safeClose==false) {
				event.returnValue=true; 
				event.preventDefault();
			}
		}
		else if (typeof theSSO.MP.submitDocProcFrameWnd!='undefined' && theSSO.MP.submitDocProcFrameWnd!=null) {
			if (theSSO.MP.submitDocProcFrameWnd.safeClose==false) {
				event.returnValue=true; 
				event.preventDefault();
			}
		}
	})
	
	// 2015.12.15 - 監視onunload
	window.addEventListener('unload', function() {
		theLogger.log("window.onunload...");
		AlternativeLogger.upload("關閉分頁前上傳");
		
		//1060817	Leslie[1060740]	增加檢查關閉視窗前，是否有公文仍為開啟中
		if('theAOL' in window){
			var currFolio = theAOL.getCurrFolio();
			if( currFolio != false){
				window.ExceptionLog("視窗意外關閉");
			}
		}
		
		//1050823	Leslie	增加視窗管理，當首頁關閉時，一併關閉所有程式
		theStart.closeAllChildWin();
		
		//1050824	Leslie	追加於關閉視窗或重新整理時，登出該權杖
		try {
			//1060302 Kevin 若重複開啟首頁，第二個首頁會把第一個首頁登出修正
			if(theSSO.logoned){
				//1100226	Leslie	增修登出時註銷使用者權杖，以避免TB之Email於不登入模式下，會誤用無效的權杖
				$.ajax({
						type:"POST",
						//1140415	Leslie[1140556]	改用Post方式傳送
						//url:SSO_CONFIG.ServerHost+"/iiws/registCookie.ashx?ck="+SAMLart,
						url:SSO_CONFIG.ServerHost+"/iiws/registCookie.ashx",
						//data:'{"ck":"'+SAMLart+'"}',	//保留功能
						contentType:"application/json; charset=utf-8",
						//dataType:"text"
					});
				theWebServices.authws.logout(window.localStorage['Artifact']);
			}
		}
		catch(err) {}
	});
	
	//1100203 Kevin 1090722 新增於切換頁面時重新檢核SR連線狀態
	window.addEventListener('visibilitychange', function() {
		
		if (document.visibilityState === 'visible')
		{
			theLogger.log("window.onvisibilitychange.visible");
			
			if(theSSO.logoned)
			{
				//1111223	Leslie[1111178]	修改首頁由背景切換為前景時，所叫用的CheckLoginStatus()改為非同步模式，以解決可能會失敗的問題
				// if(!theSSO.MP.CheckLoginStatus())
					// return;
				theSSO.MP.CheckLoginStatus(undefined, true);
			}
		}
		else
			theLogger.log("window.onvisibilitychange.hide");
	});
	
}); // End of - $(document).ready(function() {
/*
 * 設定[文件夾]spin wheel之內容 (條列及搜尋子視窗都會叫用!)
 * 2023.4.14 - 1120067
 */
function _initFolderListSpinWheel(id, addAll, display_pos, _filterd_doclist, triggerByTimer) {
	/*
	 * 2017.12.20 - Eric Peng, (NCKU問題)傳送時切換文件夾, 若同時有新進訊息, 可能會造成IE瀏覽器分頁回前頁問題
	 * => 經測試IE若在顯示mobiScroller時, 執行重設動作則會發生此錯誤!
	 */
	if (typeof triggerByTimer!=='boolean') {
		triggerByTimer = false;
	}
	
	var strForDelayUpdate = 'delayUpdateFolderListSpin_' + id;
	var strWaitForUpdate = 'waitForUpdateSW_' + id;
	
	if (typeof theSSO.MP[strForDelayUpdate] == 'boolean' && theSSO.MP[strForDelayUpdate]===true) {
		// 目前無法更新mobiScroll內容
		theLogger.warn('-W- _initFolderListSpinWheel() mobiSrcoll顯示中, 無法更新內容! [strForDelayUpdate="' + strForDelayUpdate + '"]');

		// 若尚未設定[待update], 設定之
		if (typeof theSSO.MP[strWaitForUpdate]!=='boolean' || theSSO.MP[strWaitForUpdate]!==true) {
			if (!!theSSO.logoned) {
				// 若設定2秒timer trigger執行update作業
				setTimeout(function() {
					_initFolderListSpinWheel(id, addAll, display_pos, _filterd_doclist, true); // 2023.4.14 - 1120067
				}, 2000);
				theLogger.log('-I- _initFolderListSpinWheel() END. [設定2秒後重試作業, triggerByTimer=false]');
			}

			theSSO.MP[strWaitForUpdate] = true;
			console.log('-I- setup MP.' + strWaitForUpdate + ' flag to true.');
			return null;
		}

		// 由timer trigger叫用時, 若仍禁止執行, 則再設定delay trigger一次
		if (triggerByTimer && !!theSSO.logoned) {
			setTimeout(function() {
				_initFolderListSpinWheel(id, addAll, display_pos, _filterd_doclist, true); // 2023.4.14 - 1120067
			}, 2000);
			theLogger.log('-I- _initFolderListSpinWheel() END. [設定2秒後重試作業, triggerByTimer=true]');
		}

		return null;
	}

	if (typeof theSSO.MP[strWaitForUpdate]==='boolean' && theSSO.MP[strWaitForUpdate]===true) {
		theSSO.MP[strWaitForUpdate] = false;
		console.log('-I- clear MP.' + strWaitForUpdate + ' flag.');
	}

	theSSO.MP[strForDelayUpdate] = true;

	var type = typeof $('#'+id)[0];
	theLogger.debug('_initFolderListSpinWheel() typeof target element:' + type);
	
	if (id===undefined || id.length===0) {
		alert('_initFolderListSpinWheel(), invalid "id"');
		return null;
	}
	
	var showCount = false;
	var sShowCount = theSSO.User.EnvSettings.get('SSO_FOLDERLIST_DISPLAY_COUNT');
	if (typeof sShowCount=='string' && sShowCount.length) {
		if (SSOUtil.isValueTrue(sShowCount))
			showCount = true;
	}
	
	if (typeof window.showFolderCnt=='boolean') {
		showCount = window.showFolderCnt;
	}
	
	var tdlBuilder = theSSO.MP.todolist.builder;
	var folderList = tdlBuilder.getFolderInfoList(addAll, _filterd_doclist); // 2023.4.14 - 1120067, add _filterd_doc_list
	var wheels = [];
	//1110314	Leslie[1110167]	[考試院]UI調整	
	var arFolderList = [];
	
	//1120502	Leslie[1120007]	[屏東]調整公文夾顯示方式為二階層顯示
	var _lastFolder = "";
	
	var obj = { '公文夾': {} };
	var folderCnt = folderList.length;
	for(var i=0; i<folderCnt; i++) {
		obj['公文夾'][i] = folderList[i].name + (showCount?'　[件數:' + folderList[i].cnt + ']':'');
		//1110314	Leslie[1110167]	[考試院]UI調整	
		var oItem = {value:folderList[i].name,label:folderList[i].name + (showCount?'　[件數:' + folderList[i].cnt + ']':'')};
		if(folderList[i].proxyFolder){
			folderSetting = theSSO.MP.todolist.builder.getProxyFolderSetting(oItem.value, true);
			if (folderSetting!==null) {
				if (typeof folderSetting.proxySetting.folderItemStyle.font.color=='object' &&
					typeof folderSetting.proxySetting.folderItemStyle.font.color.code=='string') {
					clrCode = folderSetting.proxySetting.folderItemStyle.font.color.code;
					if (clrCode.length) {
						oItem.color=clrCode;
					}
				}
			}
		}
		//1120502	Leslie[1120007]	[屏東]調整公文夾顯示方式為二階層顯示
		if(theCustom.getCustomSet('Enable2LayerFolder') == 'Y'){
			if(folderList[i].folder == undefined)
				_lastFolder = folderList[i].name;
			if(oItem.label.indexOf(_lastFolder) > -1)
				oItem.label = oItem.label.replace(_lastFolder+'-','　　');
		}
		arFolderList.push(oItem)
	}
	
	//1110811	Leslie	一律先註銷onclick
	$('#' + id).off('click');
	
	//1110314	Leslie[1110167]	[考試院]UI調整	
	$('#' + id).autocomplete({
		source:arFolderList
		,minLength: 0
		,select: function(event,ui){
			$(this).val(ui.item.value).trigger('change');
			return false;
		},open: function(event,ui){
			theSSO.MP[strForDelayUpdate] = true;
			var curr = $(this).val();
			var $menu = $(this).autocomplete('instance').menu.activeMenu;
			var $folderDiv = $menu.find('div:contains("'+curr+'")').eq(0);
			var tgTop = $folderDiv[0].offsetTop;
			$menu[0].scroll(0,tgTop);
			//$folderDiv.addClass('ui-state-active')
			return false;
		},close: function(event,ui){
			theSSO.MP[strForDelayUpdate] = false;
		}
	}).on('click',function(){
		$(this).autocomplete( "search", "" );
	}).autocomplete( "instance" )._renderItem = function( ul, item ) {
		var bSelected = $(this)[0].element.val() == item.value;
		return $( '<li'+(bSelected?' style="background-color:#FFff0080"':'')+'>' )
			.append( '<div ' + (item.color?'style="color:'+item.color+'">':">") + item.label + "</div>" )
			.appendTo( ul );
    };
	$('#' + id).autocomplete('instance').menu.activeMenu.css('max-height','40%').css('overflow-y','auto');
	theSSO.MP[strForDelayUpdate] = false;
	return;
	//1110314	Leslie[1110167]	[考試院]UI調整	==END==
	
	//1131101	Leslie[1130977]	移除MobiScroll
	/*wheels.push(obj);
	
	// 2019.12.6 - 1080339 Eric, jQ3 重取代辦文件夾選單control異常問題修改.
	$('#' + id).off('focus');
	
	// 2021.2.2 - 1090927 Eric, support iPhone (landscape orientation only)
	let scollerRows = 9;
	let displayMode = 'bubble';
	if (window.SDLMode) { // 2021.4.19 - Eric
		scollerRows = 5;
		displayMode = 'modal';
	}

	// 2021.12.6 - Eric dev. test
	if (SSOUtil.isValueTrue(localStorage.dev_test_FolderListSpinWheel)) {
		displayMode = 'modal';
	}

	$('#' + id).scroller({
			width: 120,
			wheels: wheels,
			theme: 'ios',
			//align_mode: display_pos, // 2012.2.1 - Eric Peng
			display: displayMode, // 'bubble', 2021.2.18 - 1090927 Eric, 預設'bubble' iPhone 改為'modal'
			anchor: $('#'+id),
			setText: '確定',
			cancelText: '取消',
			rows: scollerRows, // 2016.8 - 選項預設顯示9行(若iPhone則調整為5行!)
			parseValue: function (s) {
				// 此處為叫用'setValue'時, 外部傳入的設定值!
				var d = [];
				var i=-1, folder='';
				if (typeof s=='string' && s.length) {
					for (i in wheels[0]['公文夾']) {
						if (wheels[0]['公文夾'].hasOwnProperty(i)) {
							folder = wheels[0]['公文夾'][i];
							// 2016.11 - 若顯示文件夾數量, 應先去除再比對!
							if (typeof folder=='string' && folder.length) {
								var cntIdx = folder.indexOf('　[件數:');
								if (cntIdx!==-1) {
									folder = folder.substr(0, cntIdx);
								}
							}
							if (typeof folder=='string' && folder.length && folder==s) {
							d.push(parseInt(i));
								break;
							}
						}
					}
				}
				else {
					d.push(1); //[1];
				}
				return d;
			},
			formatResult: function(d) {
				var sRslt = wheels[0]['公文夾'][d[0]];
				if (typeof sRslt=='string' && sRslt.length) {
					var cntIdx = sRslt.indexOf('　[件數:');
					if (cntIdx!==-1) {
						sRslt = sRslt.substr(0, cntIdx);
					}
				}
				return sRslt;
			},
			onBeforeShow: function(event, inst) {
				if (id=='selectedFolder') {
					$('div.dw-w.ios').addClass('tdl_mobiscroll');
				}

				// 2017.12.18 - IE傳送後, 收到reply訊息前立即切換瀏覽器會載入前一頁網頁問題.
				theSSO.MP[strForDelayUpdate] = true;
			},
			onMarkupReady: function(html, inst) {
				if (id=='selectedFolder' || id=='selectedFolder_search') {
					var $li = html.find('.dww .dw-ul .dw-li');
					var i=0, $item=null, folderStr='', folderSetting=null, clrCode='', cntIdx=-1;
					var selIndex=-1, selFolder=$('#'+id).val();
					for(i=0;i<$li.length; i++) {
						$item = $($li[i]).find('.dw-i');
						folderStr=$item.text();
						if (typeof folderStr=='string' && folderStr.length) {
							cntIdx = folderStr.indexOf('　[件數:');
							if (cntIdx!==-1) {
								folderStr = folderStr.substr(0, cntIdx);
							}
						}
						if (typeof folderStr=='string' && folderStr.length) {
							folderSetting = theSSO.MP.todolist.builder.getProxyFolderSetting(folderStr, true);
							if (folderSetting!==null) {
								if (typeof folderSetting.proxySetting.folderItemStyle.font.color=='object' &&
									typeof folderSetting.proxySetting.folderItemStyle.font.color.code=='string') {
									clrCode = folderSetting.proxySetting.folderItemStyle.font.color.code;
									if (clrCode.length) {
										$item.css('color', clrCode);
									}
								}
							}
							
							if (folderStr==selFolder) {
								selIndex = i;
						}
					}
				}
				
					// 2016.11 - 設定目前選定項目!
					if (selIndex>=0) {
						setTimeout(function(){
							$('#'+id).mobiscroll('setValue', selFolder);},
							100);
					}
				}
				
			},
			onShow: function(event, inst) {
				if (id=='selectedFolder' || id=='selectedFolder_search') {
					$('div.dw-w.ios').addClass('tdl_mobiscroll');
				}
			},
			onClose: function(event, inst) { // 2017.12.20 
				theSSO.MP[strForDelayUpdate] = false; // 2017.12.20
			}
	});
	
	// 2019.12.6 - 1080339 Eric, jQ3 重取代辦文件夾選單control異常問題修改. [jQ3測試, 毋須註冊此callback亦可正常運作!]
	// 點擊時顯示scroll wheel control
	//$('#' + id).on('click',  function() { $(this).scroller('show'); });
	
	// 2015.5 - Eric Peng, 解決iOS8取消選取後，再次點擊時不會顯示選單問題.
	$('#' + id).on('focus', function(ev){
		$(this).trigger('blur');
		ev.preventDefault();
	});

	// 2017.12.20 - Eric Peng, NCKU傳送時切換文件夾, 若同時有新進訊息, 可能會造成IE瀏覽器分頁回前頁問題
	theSSO.MP[strForDelayUpdate] = false;
	
	return wheels;
	*/
}
// 2023.4.14 - 1120067 Eric - 切換到代理角色時只顯示代理公文
function _updateTDLProxyDocDisplay() {
    let active_role = theSSO.User.PlayRoles[theSSO.User.activeRoleIndex];

    if (typeof theSSO.MP.todolist=='undefined') {
        return;
    }

    // 2019.12.6 - 1080339 Eric, jQuery 3 升級後若在真正取得待辦清單前click公文夾選單button, 會造成選單失效問題修正!
    $('#listPane #selectedFolder').prop('disabled', true);
    $('#sidePane #selectedFolder_search').prop('disabled', true);

    theSSO.MP.todolist.builder.emptyToDoList_Icon('todolist_icon_cntr');
    theSSO.MP.todolist.builder.emptyToDoList_List('todolist_tb > tbody');
    theSSO.MP.todolist.builder.emptyToDoList_SearchList('search-list');
    
    // 2016.10.16
    $('#listPane #tdl_list_filter').val('');
    $('#sidePane #tdl-searchview-filter-input').val('');
    theSSO.MP.todolist.builder.setFilterWord('');
    
    // 重設清單後立即sort!
    var sIndex = $('.sData #todolist_tb').attr('data-sortIndex');
    var currentIndex = parseInt(sIndex);
    
    // 2016.9.6 - 記錄目前檢視的文件夾
    var defaultSelFolder = '全部';
    
    // 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
    //var selFolder = $('#listPane #selectedFolder').attr('value');
    var selFolder = $('#listPane #selectedFolder').val();
    if (typeof selFolder !=='string' || selFolder.length===0) {
        selFolder = defaultSelFolder;
    }
    
    var sorting = null;
    var sortDir = 0;
    var defaultSortIdx = theSSO.MP.todolist.builder.getDefaultSortIndex(); // 預排使用文號排序
    var idx = defaultSortIdx;
    var sReverseSort;
    if (currentIndex!==-1) { // 2016.12.8 - 未排序過就不sort
        if (currentIndex==defaultSortIdx) {
            sReverseSort = $('.sData #todolist_tb').attr('data-sortReverse');
            if (SSOUtil.typeOf(sReverseSort)!='string' || sReverseSort.length<=0) {
                sReverseSort = 0;
            }
            if (typeof sReverseSort != 'string') {
                sReverseSort = '0';
            }
            sortDir = (sReverseSort=='0' || sReverseSort==='') ? 0 : 1;
            sorting = [[idx, sortDir]];
        }
        else {
            // set sorting column and direction, this will sort on the first and third column the column index starts at zero
            sReverseSort = $('.sData #todolist_tb').attr('data-sortReverse');
            if (typeof sReverseSort != 'string') {
                sReverseSort = '0';
            }
            sortDir = (sReverseSort=='0' || sReverseSort==='') ? 0 : 1;
            sorting = [[currentIndex, sortDir], [defaultSortIdx,0]];
            idx = currentIndex;
        }
    }
    
    // 清除圖像示清單原有文件夾項目
    do {
        theSSO.MP.todolist.folderScrolls.pop();
    } while(theSSO.MP.todolist.folderScrolls.length);
    
    var $iconCntr = $('#todolist_icon_cntr');
    $iconCntr.width(0);
    if (theSSO.MP.todolist.tdlicon_Scroll) {
        theSSO.MP.todolist.tdlicon_Scroll.refresh();
    }
    
    let _dfd_get_doclist = $.Deferred();

    if (active_role.proxyAccount.length) {
        // 只顯示特定代理人待辦項目
        let _doclist_proxy = theSSO.MP.todolist.builder.getProxyRoleDocList(active_role);

        let rslt = {success:true};
        rslt.tdlProxyUser = _doclist_proxy;
        _dfd_get_doclist.resolve(rslt);
    }
    else {
        // 恢復顯示所有待辦項目
        let rslt = {
            success: true,
            tdlProxyUser: null
        };
        _dfd_get_doclist.resolve(rslt);
    }

    _dfd_get_doclist.then(function(rslt) {
        theSSO._dbgAlert('gonna MP.todolist.load() ...');

        var tdlBuilder = theSSO.MP.todolist.builder;

        // 若原先顯示的文件夾無符合的待辦項目, 則切換到[全部]
        let _doclist_proxy = null;
        if (typeof rslt.tdlProxyUser!='undefind' && rslt.tdlProxyUser!=null) {
            _doclist_proxy = rslt.tdlProxyUser;

            if (selFolder!=defaultSelFolder) {
                let _folder_info_list = tdlBuilder.getFolderInfoList(true, _doclist_proxy)

                let cntFolder = _folder_info_list.length;
                let i = 0;
                let folder_found = false;
                for(i=0; i<cntFolder; i++) {
                    let _folder_info = _folder_info_list[i];
                    // smaple _folder_info = { cnt: 1, folder: "待處理", name:"待處理-內會待核示", proxyFolder:true, signType: "E" }
                    if (_folder_info.name==selFolder) {
                        folder_found = true;
                        break;
                    }
                }

                if (folder_found==false) {
                    selFolder = defaultSelFolder;
                }
            }
        }
        
        // 2014.8 - 載入清單後, 初始化文件夾清單spinWheel內容
        // reset SpinWheels
		//1131101	Leslie[1130977]	移除MobiScroll
        // $('#listPane #selectedFolder').scroller('clear');
        // $('#listPane #selectedFolder').scroller('destroy');
        $('#listPane #selectedFolder').prop('value', selFolder);
        
        // 2016.9.27, 半開模式應為#sidePane
		//1131101	Leslie[1130977]	移除MobiScroll
        // $('#sidePane #selectedFolder_search').scroller('clear');
        // $('#sidePane #selectedFolder_search').scroller('destroy');
        $('#sidePane #selectedFolder_search').prop('value', defaultSelFolder);
        
        // 2019.12.6 - 1080339 Eric, jQuery 3 升級後若在真正取得待辦清單前click公文夾選單button, 會造成選單失效問題修正!
        // 作業完成, enable buttons.
        $('#listPane #selectedFolder').prop('disabled', false);
        $('#sidePane #selectedFolder_search').prop('disabled', false);

        _initFolderListSpinWheel('selectedFolder', true, 'bottom', _doclist_proxy);
        _initFolderListSpinWheel('selectedFolder_search', true, 'bottom', _doclist_proxy);
    
        if ($('#listPane').is(':visible')) {
            let doc_filter_role = null;
            if (active_role.proxyAccount.length) {
                doc_filter_role = active_role;
            }

            if ($('#todolist_tb > tbody > tr').length===0) {
                if (selFolder==defaultSelFolder) { // 套用重取前的文件夾
                    tdlBuilder.makeToDoList_List_DOM('todolist_tb > tbody', '', '', 0, doc_filter_role);
                }
                else {
                    // 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
                    //$('#listPane #selectedFolder').attr('value', selFolder);
                    $('#listPane #selectedFolder').val(selFolder);
                    tdlBuilder.makeToDoList_List_DOM('todolist_tb > tbody', selFolder, '', 0, doc_filter_role);
                }
            }
            else if (selFolder!=defaultSelFolder) {
                // 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
                //$('#listPane #selectedFolder').attr('value', selFolder);
                $('#listPane #selectedFolder').val(selFolder);
                tdlBuilder.makeToDoList_List_DOM('todolist_tb > tbody', selFolder, '', 0, doc_filter_role);
            }
                
            // 燈號
            $("#todolistToolbar .red_cnt").text(tdlBuilder.lights.red);
            $("#todolistToolbar .yellow_cnt").text(tdlBuilder.lights.yellow);
            $("#todolistToolbar .white_cnt").text(tdlBuilder.lights.white);
            $("#todolistToolbar .green_cnt").text(tdlBuilder.lights.green);
            $("#todolistToolbar .purple_cnt").text(tdlBuilder.lights.purple);
            
            // 2015.9 - 排序元件update cache內容.
            var $tableForSort = $('.sData #todolist_tb');
            $tableForSort.trigger('update', {
                callback : function() {
                    // 排序!
                    if (!!sorting) { // 2016.12.8 - Eric Peng, 可能不排序
                        // 2019.4.25 - 1071242, Eric - 公文夾無待辦時, [重取待辦]作業會有錯誤造成後續待辦清單顯示異常問題修正.
                        var todoCount = $tableForSort.find('tbody tr').length;
                        if (todoCount>=1) {
                            $tableForSort.trigger("sorton", [sorting]);
                        }
                        // 記錄本次排序設定.
                        $('.sData #todolist_tb').attr({'data-sortIndex': idx.toString(), 'data-sortReverse': sortDir.toString()});
                    }
                }
            });
            
            // 不更新首頁 (statInfo: red/yellow/unread)
            /*var statInfo = tdlBuilder.getToDoListNumbers();
            $('#home').trigger('sso:todolist_reloaded', [
                {lights: {red:statInfo.read, yellow: statInfo.yellow, unread:statInfo.unread},
                 folders:{}}
            ]);*/
        }
        
        if ($('#home #sidePane').is(':visible')) {
            var extraParam = {
                selectedFolder: theSSO.MP.todolist.builder.getSelectedFolder(),
                filterWord: theSSO.MP.todolist.builder.getFilterWord(),
            };
            SSOUtil.loading('show');
            
            _initDocPreviewContent(extraParam);
            
            SSOUtil.loading('hide');
        }
        
        // 不更新首頁
        //theStart.InitFlotImp();
        //theStart.InitFlotTodo('', '');
        
        SSOUtil.loading('hide');
     })
    .fail(function(err) {
        theLogger.error('-ERR- invoke ODMSSP.GetToDoList() failed.');
        // 2017.1.3 - 提示錯誤訊息
        if (typeof err=='object' && typeof err.message=='string' && err.message.length) {
            alert('重取待辦事項失敗, ' + err.message + '!');
        }
        else {
            alert('重取待辦事項失敗!');
        }
        SSOUtil.loading('hide');
        return;
     });

} // EOF _updateTDLProxyDocDisplay()

/*
 * 設定[人員角色]spin wheel之內容
 * 2014.11.26 - Raymond, 新增extOnClose參數, 若傳入function則在mobiscroll的onClose處理函式中呼叫這個外部onClose函式
 * 2021.5.3 - 1100333 Eric, merge: 2020.5.20 - 1090329 Eric, add memberOf and remove exOnClose
 */
function _initRoleListSpinWheel(id, addAll, display_pos, memberOf) { // extOnClose) {
	var type = typeof $('#'+id)[0];
	theLogger.debug('_initRoleListSpinWheel() typeof target element:' + type);
	
	if (id===undefined || id.length===0) {
		alert('_initRoleListSpinWheel(), invalid "id"');
		return;
	}
	
	var playRoles = window.theSSO.User.PlayRoles;
	if (!playRoles || playRoles.length<=0) {
		throw new Error('theSSO.User.PlayRoles沒有內容. @mSSO.js, _initRoleListSpinWheel().');
	}
	
	var roleList = [];
	var orgCount = SSO_CONFIG.getOrgCount();
	for(var roleIdx in window.theSSO.User.PlayRoles) {
		var role = window.theSSO.User.PlayRoles[roleIdx];
		var item = {
			id : role.Id,
			rawObj : role,
		};
		
		// 2014.9 - 先取得角色orgNo的OrgInfo
		var orgNo = role.orgNo;
		var ls_Id = 'orgInfo_' + orgNo;
		var useMemberOf = false;
		if (typeof memberOf=='object' && memberOf!==null) {
			useMemberOf = true;
		}

		if (!useMemberOf) {
			if (typeof localStorage[ls_Id] !== 'string') {
				SSOUtil.getOrgInfo(localStorage.Artifact, orgNo);
			}
		}
		
		var _orgBaseInfo = SSO_CONFIG.getOrgInfo(orgNo);
		
		/* 2015.1 - 找不到機關資訊則跳過此角色 */
		if (!_orgBaseInfo) {
			continue;
		}
			
		var unitName = '';
		if (!useMemberOf) { 
			unitName = SSOUtil.getUnitName(role.orgNo, role.unitNo);
		}
		else {
			console.log('_initRoleListSpinWheel using memberOf data...');
			for(i=0; i<memberOf.length; i++) {
				let _unit = memberOf[i];
				if (_unit.m_UnitCode==role.unitNo) {
					unitName = _unit.m_UnitName;
					break;
				}
			}
		}

		if (orgCount>1) {
			if (!!unitName) {
				item.name = '[' + _orgBaseInfo.abbr + ']' + unitName + '--' + role.name;
			}
			else {
				item.name = '[' + _orgBaseInfo.abbr + ']' + role.name;
			}
		}
		else {
			if (!!unitName) {
				item.name = unitName + '--' + role.name;
			}
			else {
				item.name = role.name;
			}
		}
		
		// 2016.10.19 - 顯示代理角色提示.
		if (typeof role.proxyAccount=='string' && role.proxyAccount.length) {
			item.name += '-代理[' + role.proxyUserName + ']';
		}
		
		roleList.push(item);
	}
	
	var wheels = [];
	var title = '人員角色';
	
	var obj = {};
	obj[title] = {};
	//1110314	Leslie[1110167]	[考試院]UI調整	
	var arRoleSelect = [];
	var roleCnt = roleList.length;
	for(var i=0; i<roleCnt; i++) {
		obj[title][i] = roleList[i].name;
		//1110314	Leslie[1110167]	[考試院]UI調整	
		arRoleSelect.push({value:i,label:roleList[i].name});
	}
	//UI選單
	
	//1110314	Leslie[1110167]	[考試院]UI調整，設為一般下拉式選單
	$('#' + id).autocomplete({
		source:arRoleSelect
		,minLength: 0
		,select: function(event,ui){
			var roleIndex = (ui.item.value == ui.item.label)?0:ui.item.value;
			var artifact = window.localStorage.Artifact;
			var orgNo = window.theSSO.User.PlayRoles[roleIndex].orgNo;
			var unitNo = window.theSSO.User.PlayRoles[roleIndex].unitNo;
			var roleId = window.theSSO.User.PlayRoles[roleIndex].id;
			
			//1110415 Kevin 1110420 機關角色切換時新增關閉子視窗行為
			if(orgNo!=theSSO.User.PlayRoles[theSSO.User.activeRoleIndex].orgNo && theStart.ChildWin.length>0)
			{
				if(!window.confirm('當進行機關角色切換時，將關閉目前開啟之程式，確認是否切換。'))
				{
					//$('#roleid_input').mobiscroll('setValue', [theSSO.User.activeRoleIndex]);
					$('#roleid_input').data('roleIndex', theSSO.User.activeRoleIndex);
					return;
				}
				else
					theStart.closeAllChildWin();
			}

            // 2023.4.14 - Eric, 1120067 - 考試院切換代理人角色時僅顥示代理人待辦
            let triggerReload = false;
            if (SSOUtil.isValueTrue(theSSO.User.EnvSettings.get('SSO_ENABLE_SHOW_PROXYDOC_ONLY')) && theSSO.User.activeRoleIndex<theSSO.User.PlayRoles.length) {
                let role_before = theSSO.User.PlayRoles[theSSO.User.activeRoleIndex];
                let role_after = theSSO.User.PlayRoles[roleIndex];

                if (role_after.proxyAccount.length) {
                    triggerReload = true;
                }
                else if (role_before.proxyAccount.length>0 && role_after.proxyAccount.length==0) {
                    triggerReload = true;
                }
            }
					
			var role = theWebServices.authws.changeActiveRole(artifact, orgNo, unitNo, roleId);
			theSSO.User.activeRoleIndex = roleIndex;
			localStorage.activeRoleIndex = roleIndex;

            // 2023.4.14 - Eric, 1120067 - 考試院切換代理人角色時僅顥示代理人待辦
            if (triggerReload) {
                _updateTDLProxyDocDisplay();
            }

			$(this).val(ui.item.label);
			return false;
		},open: function(event,ui){
			var curr = $(this).val();
			var $menu = $(this).autocomplete('instance').menu.activeMenu;
			var roleDiv = $menu.find('div:contains("'+curr+'")').get(0);
			$menu[0].scroll(0,roleDiv.offsetTop);
			return false;
		}
	}).on('click',function(){
		$(this).autocomplete( "search", "" );
	}).autocomplete( "instance" )._renderItem = function( ul, item ) {
		let setColor = item.label.indexOf('代理[') > -1;
		var bSelected = $(this)[0].element.val() == item.label;
		return $( '<li'+(bSelected?' style="background-color:#FFff0080"':'')+'>' )
			.append( '<div ' + (setColor?'style="color:#F00">':">") + item.label + "</div>" )
			.appendTo( ul );
    };
	$('#' + id).autocomplete('instance').menu.activeMenu.css('max-height','50%').css('overflow-y','auto');
	//1110314	Leslie[1110167]	[考試院]UI調整，設為一般下拉式選單	==END==
	
	return;
	
	//1131101	Leslie[1130977]	移除MobiScroll
	// wheels.push(obj);
	
	// theLogger.log('$(\'#'+id+ '\') length=' + $('#' + id).length);
	
	// $('#' + id).mobiscroll({
			// width: 180,
			// wheels: wheels,
			// theme: 'ios',
			// //align_mode: display_pos, // 2012.2.1 - Eric Peng
			// lang: 'cht', // 2013.1 - 使用中文.
			// display: 'bubble',
			// anchor: $('#'+id),
			// setText: '確定',
			// cancelText: '取消',
			// parseValue: function (s) {
				// var d = [];
				// if (!!s && s !== '' && s !== 'undefined') {
					// for (var i in wheels[0][title]) {
						// var role = wheels[0][title][i];
						// if (role == s)
							// d.push(parseInt(i));
					// }
				// }
				// else {
					// d.push(0); //[1,1,1];
				// }
				// return d;
			// },
			// formatResult: function(d) {
				// var sRslt = wheels[0][title][d[0]];
				// return sRslt;
			// },
			// onClose : function(valueText, btn, inst) {
				// /* 2014.1 - Note: onClose被叫用時inst.values是開啟時的設定值 inst.temp才是目前的設定值!
				 // */
				// var select = inst.temp;
				// if (btn==='set' && typeof select == 'object' && !!select.length) {
					// theLogger.log('select=' + select);
					
					// var roleIndex = select[0];
					// $('#' + id).data('roleIndex', roleIndex);
					
					// // Erin, call AuthWS.ChangeActiveRole here...
					// var artifact = window.localStorage.Artifact;
					// var orgNo = window.theSSO.User.PlayRoles[roleIndex].orgNo;
					// var unitNo = window.theSSO.User.PlayRoles[roleIndex].unitNo;
					// var roleId = window.theSSO.User.PlayRoles[roleIndex].id;
					// var role = theWebServices.authws.changeActiveRole(artifact, orgNo, unitNo, roleId);
					
					// // ToDo: 依目前系統選定的角色顯示清單預設值
					// /*
					// var getRole = theWebServices.authws.getActiveRole(window.localStorage["Artifact"]);
					// */
					// theSSO.User.activeRoleIndex = roleIndex;
					// //1110110	Leslie[1101352]	切換角色後，增加紀錄角色索引供ViewDoc子視窗取用
					// localStorage.activeRoleIndex = roleIndex;
					
					// // 2014.11.26 - Raymond, 若extOnClose有傳入function物件, 則叫用
					// //if($.isFunction(extOnClose)) {
					// //	extOnClose(roleIndex, roleList[roleIndex].name);
					// //}
				// }
				// return true;
			// },
			// onShow: function(event, inst) {
				// if (id=='roleid_input') {
					// $('div.dw-w.ios').addClass('role_mobiscroll');
				// }
			// },
			// onMarkupReady: function(html, inst) {
				// if (id=='roleid_input') {
					// var $li = html.find('.dww .dw-ul .dw-li');
					// var i=0, $item=null, folderStr='';
					// for(i=0;i<$li.length; i++) {
						// $item = $($li[i]).find('.dw-i');
						// folderStr=$item.text();
						// if (typeof folderStr=='string' && folderStr.length && folderStr.indexOf('代理[')!==-1) {
							// $item.css('color', '#F00');
						// }
					// }
				// }
			// }
	// });

	// // 點擊時顯示scroll wheel control
	// $('#' + id).on('click', function() { $(this).scroller('show'); });
	
	// // 2015.5 - Eric Peng, 解決iOS8取消選取後，再次點擊時不會顯示選單問題.
	// $('#' + id).on('focus', function(ev){
		// $(this).trigger('blur');
		// ev.preventDefault();
	// });
}

function _initDocPreviewContent(extraParam) {
	extraParam = (typeof extraParam=='object') ? extraParam : null;

	theLogger.log('_initDocPreviewContent() begin, extraParam=' + extraParam==null?'null':JSON.stringify(extraParam)); // 2021.3.29 - 1100356
	
	// setup content
	// 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
	//var selfolder = $('#selectedFolder_search').attr('value');
	var selfolder = $('#selectedFolder_search').val();
	var changeSelFolder = false;
	if (!!extraParam && extraParam.selectedFolder.length) {
		if (selfolder!==extraParam.selectedFolder) {
			selfolder = extraParam.selectedFolder;
			$('#sidePane #selectedFolder_search').val(selfolder);
			changeSelFolder = true;
		}
	}	
		
	var updateList = false;
	if (($('#search-list > li').length===0) || changeSelFolder) {
		updateList = true;
	}
	
	// 2011.11.10
	var currFilter='', newFilter='';
	var $filterInput=null;
	if (updateList) {
		theLogger.log('_initDocPreviewContent() updateList=Y, gonna call tdlBuilder.makeToDoList_SearchList()'); // 2021.3.29 - 1100356

		//1060425 Kevin 修正在清單模式切換資料夾後，切換回側屜時未清除原資料夾公文
		$('#search-list').empty();
		theSSO.MP.todolist.builder.makeToDoList_SearchList('search-list', selfolder);
		
		theLogger.log('_initDocPreviewContent() after tdlBuilder.makeToDoList_SearchList()'); // 2021.3.29 - 1100356

		// 套用關鍵字篩選
		currFilter = $('#sidePane #tdl-searchview-filter-input').val();
		newFilter = '';
		if (!!extraParam && extraParam.filterWord.length) {
			newFilter = theSSO.MP.todolist.builder.getFilterWord();
		}
		if (newFilter!=currFilter) {
			$filterInput = $('#sidePane #tdl-searchview-filter-input');
			$filterInput.val(newFilter);
			$filterInput.trigger('change');
		}
		
		// 2014.8 - 調整高度, 改為動態計算
		var margin_top = 15;
		var window_h = $(window).height();
		var headerbar_h = $('#home_header').height();
		var searchListView_h = window_h - headerbar_h;
		
		// 2012.2.1 - 設定搜尋結果div之高度
		$('#search-list').parent().parent().css('height', '' + searchListView_h + 'px'); // 沒有bottom toolbar + 36px
				
		// searchWrapper, 除文件夾清單外的其它項目!
		setTimeout(function() {
				theLogger.log('_initDocPreviewContent() Timeout callback - BEGIN...'); // 2021.3.29 - 1100356
			// 2016.5 - jQM 1.4.5 listview filter
				var $searchViewFolder = $('#sidePane .searchViewContent .searchView_Folder .ui-input-text');
				if ($searchViewFolder.is(':visible')) {
					var $searchWrapper = $('#sidePane .searchViewContent .search-wrapper');
					//var $searchFilter = $searchWrapper.find('form');
					var $searchFilter = $searchWrapper.find('form .ui-input-search');
					
					var searchFolder_h = $searchViewFolder.outerHeight(true); //height();  // 文件夾清單控制項高度
					var searchFilter_h = $searchFilter.outerHeight(true); //height();	// 文件夾內容篩選文字控制項高度
					var searchList_h = searchListView_h - searchFolder_h - searchFilter_h - margin_top;
					$('#search-list').css({'height': ''+searchList_h+'px'}); // 600-(47+5)
					$("#search-list").parent().css({'margin-top':'15px'});
				}
				theLogger.log('_initDocPreviewContent() Timeout callback - END..'); // 2021.3.29 - 1100356

				// 2021.3.29 - 1100356 Eric, 顯示預覽公文完成時上傳目前為止的LOG檔
				theLogger.log('Before Logger upload[顯示預覽公文完成上傳]');
				AlternativeLogger.upload("顯示預覽公文完成上傳");
			},
			300);

		theLogger.log('_initDocPreviewContent() END.'); // 2021.3.29 - 1100356
	}
	else {
		// 套用關鍵字篩選
		currFilter = $('#sidePane #tdl-searchview-filter-input').val();
		newFilter = '';
		if (!!extraParam && extraParam.filterWord.length) {
			newFilter = theSSO.MP.todolist.builder.getFilterWord();
		}
		
		if (newFilter!=currFilter) {
			$filterInput = $('#sidePane #tdl-searchview-filter-input');
			$filterInput.val(newFilter);
			$filterInput.trigger('change');
		}

		theLogger.log('_initDocPreviewContent() END. [updateList=N]'); // 2021.3.29 - 1100356
	}
}
	
//1141023	Leslie[1140849]	MP列表增加顯示選取底色功能
function _resetListColor(tr){
	if(theCustom.getCustomSet('MPListSelectedColor') !== ''){
		let bgColor = theCustom.getCustomSet('MPListSelectedColor');
		$('#todolist_tb > tbody > tr[style]').css('background-color','')
		if($(tr).length){
			let currMsgId = $(tr).attr('data-msgid');
			$(tr).css('background-color',bgColor).addClass('selected');
			theSSO.MP.lastOpenMsgId = $(tr).attr('data-msgid');
		}
	}
}
	
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
    
    $("#sidePane").hide();
    
    var win_w = $(window).width();
    
    // 圖示模式layout
    _folderCnt = $('.todolist_icon .folderList > li').length;
    $('.todolist_icon .folderList').css('width', _folderCnt * todolist_icon_folder_w);
    theLogger.debug('[initMainPage] folderList width= ' + $('#leftBottomPane .folderList').eq(0).width());
    
	// 2017.5.17 - Eric, bug-fix 移除'click'及'tap'中間的','
	// 2017.4.19 - add 'tap' (for iScroll5 lib)
	// 2013.9 - touchscreen也會有click event, 直接用
	$(document).on('click tap', '.folioLink', function(event) {
		/* PC-圖像模式(全開/半開) click 文號*/
		
		// 2016.12.15 - 防止連續點擊開啟公文鍵
		if (typeof theSSO.MP.openDocClicked !== 'undefined' && theSSO.MP.openDocClicked===true) {
			if (!!_debug) {
				theLogger.log('連續點擊開啟公文鍵, skip...');
			}
			return;
		}
		else {
			theSSO.MP.openDocClicked = true;
			setTimeout(function(){ theSSO.MP.openDocClicked=false; }, 1000);
		}
		
		/* 2015.1 - Eric Peng, iScorller會造成click事件被觸發2次, quick-fix */
		if (!!theSSO.MP.lastClick) {
			var lastTick = theSSO.MP.lastClick.getTime();
			var currentClick = new Date();
			var thisTick = currentClick.getTime();
			if ((thisTick-lastTick) < 2000) {
				return;
			}
		}
		theSSO.MP.lastClick = new Date();

		// 2019.7 - 1080654 Eric, 測開啟公文效能
		if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
			let _docNo = $(this).attr('data-docno');
			theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 預覽公文作業(圖示清單, DocNo=' + _docNo + ') BEGIN...');
			window.tmBeginIconOpenDoc = Date.now();
			window.tmBeginIconOpenDoc2 = window.tmBeginIconOpenDoc;
			if (window.iOS_device) {
				window.tmBeginIconOpenDoc3 = window.tmBeginIconOpenDoc;
			}
			else {
				window.tmBeginIconOpenDoc3 = 0;
			}
		}
		
		//1060329 Kevin 開啟前檢核登入狀態
		if(!theSSO.MP.CheckLoginStatus())
			return;
		
		/* 2016.4 - 可能是歷史簽辦或公文檢索項目 */
		var $workSpace = $(event.currentTarget).closest('div.doc_desktop_subpage');
		var sSubPageId = $workSpace.attr('id');
		var $li = null;
		if (sSubPageId=='historyDocWorkspace' || sSubPageId=='aki800ListWorkspace') {
			$li = $(event.currentTarget).closest('li');
            var signType = $li.attr('data-signType');
			if (!!signType && (signType=='E' || signType=='P')) {
                HistoryDocUtil.showInspectPreviewPane(signType, sSubPageId);
            }
			return;
        }
		
		// 2015.1.19 - Eric Peng, 在文號element外touchend, 不觸發動作!
		var w = $(this).width();
		var h = $(this).height();
		if (event.offsetX > w || event.offsetY > h) {
			return false;
		}
		
		var linkDataA = $(this).attr('data-docno');
		var linkDataB = $(this).attr('data-msgid');
		var isDraft = false, ICUserId;
		$li = $(this).closest('li');
		
		if ($li.length) {
			if ($li.attr('data-draft')=='true') {
				isDraft = true;
			}
			ICUserId = $li.attr('data-icuser');
		}
		
		//alert('folioLink clicked!');
		var msgId = '' + linkDataB;
		
		var linkDocNo = '';
		if (linkDataA!==undefined) {
			linkDocNo = linkDataA.toString();
		}
		
		var docObj = theSSO.MP.todolist.builder.getDocByMsgId(msgId, ICUserId);
		if (docObj===null) {
			theLogger.log('MsgId:' + msgId + ' 找不到對應的todolist物件!');
			return false;
		}
		
		var validMsg = false;		
		if ((linkDocNo.length>0) || (isDraft && msgId.length)) { // 有文號: 線上/紙本簽核公文; 2017.1.3 - 尚未取號草稿無法開啟問題!
			theLogger.log('gonna open doc #folio_' + linkDocNo + ' ...');
			
			if (_debug_no_open_folio) {
				theLogger.debug("debug mode don't open doc...");
			}
			else {
				var SAMLart = localStorage.Artifact;
				theSSO.MP.todolist.builder.checkMsgValidity(SAMLart, docObj)
				.then(function(rslt) {
					validMsg = true;

					let openInPreview = false;
					// 2012.12.11 - 包裝 PreviewCtrl Object
					// 2012.9.4 - 改在預覽頁面的右方工具列按鈕開啟!
					if (docObj.signType==='P' || window.SDLMode) { // 2021.2.18 - Eric, 1090927 iPhone support! (iPhone Device直接開啟, 不顯示公文預覽UI)
						theSSO.MP.openDocWithAOL(SAMLart, docObj, 'todolist', true); // => icon item click
					}
					else {
						theLogger.log('[.folioLink] click event before PreviewCtrl.loadDocPreview()'); // 2021.3.29 - 1100356

						theSSO.MP.PreviewCtrl.loadDocPreview(linkDocNo, linkDataB, isDraft, ICUserId);
						openInPreview = true;

						theLogger.log('[.folioLink] click event PreviewCtrl.loadDocPreview() done.'); // 2021.3.29 - 1100356
					}
					
					// 2019.10.29 - 1080339 Eric, checkMsgValidity已改成非同步叫用!
					// 半開 + 顯示預覽窗格
					if (openInPreview && validMsg && docObj.signType==='E') { // 2021.2.18 - Eric, 1090927 iPhone support! 
						/* 顯示 searchViewContent => 半開 */
						var posBefore = '';
						if ($('#sidePane .searchViewContent').is(':visible')) {
							posBefore = 'half';
						}
						else { /* 顯示其它 list/icon => 全開 */
							posBefore = 'full';
						}
						if (theSSO.MP.PreviewCtrl.isPreviewPaneClosed() || posBefore=='full') {
							// 將待辦改為半開
							//var half_w = SSOUtil.getEMSize($('#tdlPane')[0]) * 25; // 半開時左側寬固定為: 25em
							$('#todolistContainer #iconPane').hide();
							$('#todolistContainer #listPane').hide();
							$('#todolistContainer #sidePane').show();
							
							SSOUtil.loading('show');
							
							var extraParam;
							if (localStorage.mp_display_mode=='list') {
								extraParam = {
									selectedFolder: theSSO.MP.todolist.builder.getSelectedFolder(), //$('#listPane #selectedFolder').val(),
									filterWord: theSSO.MP.todolist.builder.getFilterWord(),
								};
							}
							_initDocPreviewContent(extraParam);

							theLogger.log('[.folioLink] click event _initDocPreviewContent() done.'); // 2021.3.29 - 1100356
							
							SSOUtil.loading('hide');
							
							$('#todolistContainer').addClass('doc_desktop_sidepage').removeClass('doc_desktop_showpage');
							$('#todolistContainer #tdlPane').show();
							
							theSSO.MP.PreviewCtrl.openPreviewPane();

							theLogger.log('-I- .folioLink click event PreviewCtrl.openPreviewPane() done.'); // 2021.3.29 - 1100356

							// 2019.7 - 1080654 Eric, load doc performance
							if (typeof SSO_CONFIG.debugTime=='boolean' && SSO_CONFIG.debugTime===true) {
								SSOUtil.dev_logTimeElapse('PreviewDoc', window.tmBeginIconOpenDoc);
							}
						}
					}
					theLogger.log('[.folioLink] click event [showDoc process] END.'); // 2021.3.29 - 1100356
				})
				.fail(function(rslt) {
					if(!!rslt && !!rslt.msg) {
						theLogger.error(rslt.msg);
					}
					else {
						theLogger.error('檢核MsgId有效性或loadDocPreview failed.');
					}
				});
			}
		}
		
		theLogger.log('[.folioLink] click event END'); // 2021.3.29 - 1100356

		//$(this).preventDefault();
		return false;
	});
	
	// 2020.2.10 - (merge 內政部問題) 1090016 Eric, 通知類公文更新[閱讀]狀態
	function _updateNotifyItemOpenFlag(_docObj) {
		let signTime = '';
		let sDocObj = '';
		let notOpened = false;
		if (_docObj.signTime==='') {
			notOpened = true;
			signTime = SSOUtil.getCurrentTimeStr_YYYMMDDhhmm();
			_docObj.signTime = signTime;
			sDocObj = JSON.stringify(_docObj); // save tmp opened docObj
			_docObj.signTime = '';
		}
		
		if (notOpened && signTime.length && sDocObj.length) {
			// invoke ODMSSP.SetMsgStatus
			let rslt = theWebServices.odmssp.setMsgStatus(localStorage.Artifact, _docObj.msgId);
			if (rslt.success===false) {
				alert('叫用ODMSSP.SetMsgStatus()發生錯誤!');
				return;
			}
			updatedDoc = JSON.parse(sDocObj);
			if (typeof updatedDoc=='object') {
				theSSO.MP.todolist.builder.updateDocObj(updatedDoc.msgId, updatedDoc);
			}
		}	
	}

	// 2013.9 - touchscreen也會有click event, 直接用
	$(document).on('click', 'div.notify_item .urlLink', function(event) {
		/* PC-圖像模式-SignType:W (全開/半開) */
		/* 2015.1 - Eric Peng, iScorller會造成click事件被觸發2次, quick-fix */
		if (!!theSSO.MP.lastClick) {
			var lastTick = theSSO.MP.lastClick.getTime();
			var currentClick = new Date();
			var thisTick = currentClick.getTime();
			if ((thisTick-lastTick) < 2000) {
				return;
			}	
		}
		theSSO.MP.lastClick = new Date();
		
		//1060329 Kevin 開啟前檢核登入狀態
		if(!theSSO.MP.CheckLoginStatus())
			return;
		
		// 2015.1.19 - Eric Peng, 在文號element外touchend, 不觸發動作!
		var w = $(this).width();
		var h = $(this).height();
		if (event.offsetX > w || event.offsetY > h) {
			return false;
		}

		var msgId = $(this).attr('data-msgid');
		// 2015.1 - 開啟SignType='W'待辦
		if (msgId.length) {
			var docObj = theSSO.MP.todolist.builder.getDocByMsgId(msgId);
			if (docObj && !!docObj.url && docObj.url.length) {
				// 2016.6 - 以新分頁開啟ASPX程式 */
				//theSSO.Util.openASPXDlg(docObj.url, window.localStorage['Artifact']);
				var newWnd = theSSO.Util.openASPX_NewFrame(docObj.url, window.localStorage.Artifact);
				if (newWnd!==null) {
					// 2020.2.10 - 1090016 Eric, 通知類公文更新[閱讀]狀態
					_updateNotifyItemOpenFlag(docObj);
				}
			}
		}
	});
	
	// 2013.9 - touchscreen也會有click event, 直接用
	$(document).on('click', '#todolist_tb > tbody > tr td.urlLink', function(event) {
		//1130502	Leslie[中榮序92]	增修依設定啟用MP點擊任意處即可開啟公文
		event.stopPropagation(); 
		
		/* PC-清單模式-SignType:W (全開/半開) */
		var msgId = $(this).attr('data-msgid');
		// 2015.1 - 開啟SignType='W'待辦
		if (msgId.length) {
			//1141023	Leslie[1140849]	MP列表增加顯示選取底色功能
			if(theCustom.getCustomSet('MPListSelectedColor') !== '')
				_resetListColor($(this).closest('tr'));
			
			var docObj = theSSO.MP.todolist.builder.getDocByMsgId(msgId);
			if (docObj && !!docObj.url && docObj.url.length) {
				// 2016.6 - 以新分頁開啟ASPX程式 */
				//theSSO.Util.openASPXDlg(docObj.url, window.localStorage['Artifact']);
				var newWnd = theSSO.Util.openASPX_NewFrame(docObj.url, window.localStorage.Artifact);
				if (newWnd!==null) {
					// 2020.2.10 - 1090016 Eric, 通知類公文更新[閱讀]狀態
					_updateNotifyItemOpenFlag(docObj);
				}
			}
		}
		
		//1060329 Kevin 開啟前檢核登入狀態
		if(!theSSO.MP.CheckLoginStatus())
			return;
	});
	
	// todolist_tb項目點擊後預覽公文
	var docItem;
	if (sysObj.hasTouch) {
		/* 清單模式-有tocuh 線上/紙本公文, 點[文號] */
		docItem = $('#todolist_tb > tbody > tr');
		$(document).on('click', '#todolist_tb > tbody > tr', function() {
			// 2016.12.19 - 防止連續點擊開啟公文鍵
			if (typeof theSSO.MP.openDocClicked !== 'undefined' && theSSO.MP.openDocClicked===true) {
				if (!!_debug) {
					theLogger.log('連續點擊傳送鍵, skip...');
				}
				return;
			} else {
				theSSO.MP.openDocClicked = true;
				setTimeout(function(){theSSO.MP.openDocClicked=false; }, 1000);
			}
		
			//1060329 Kevin 開啟前檢核登入狀態
			if(!theSSO.MP.CheckLoginStatus())
				return;
		
			var msgId = $(this).attr('data-msgid');
			if (!msgId || (msgId.length===0)) {
				return;
			}
			var isDraft = false, ICUserId='';
			var sDraft = $(this).attr('data-draft');
			if (!!sDraft && sDraft=='true') {
				isDraft = true;
				ICUserId = $(this).attr('data-ICUser');
			}
			
			var docObj = theSSO.MP.todolist.builder.getDocByMsgId(msgId, ICUserId);
			if (docObj===null) {
				theLogger.log('MsgId:' + msgId + ' 找不到對應的todolist物件!');
				return;
			}
			
			//1141023	Leslie[1140849]	MP列表增加顯示選取底色功能
			if(theCustom.getCustomSet('MPListSelectedColor') !== '')
				_resetListColor($(this).closest('tr'));

			// 2019.7 - 1080654 Eric, load doc performance
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
				theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 開啟公文作業(DocNo=' + docObj.docNo + ') BEGIN...');
				window.tmBeginOpenDoc = Date.now();
				window.tmBeginOpenDoc2 = window.tmBeginOpenDoc;
				if (window.iOS_device) {
					window.tmBeginOpenDoc3 = window.tmBeginOpenDoc;
				}
				else {
					window.tmBeginOpenDoc3 = 0;
				}
			}

			if (!!docObj) {
				var $docNo = $(this).find('td.docno');
				var linkDocNo = $docNo.attr('docno');
				if (msgId.length) {
					if (!!docObj && docObj.signType==='W') {
						return;
					}
					
					var SAMLart = localStorage.Artifact;
					theSSO.MP.todolist.builder.checkMsgValidity(SAMLart, docObj)
					.then(function(rslt) {
						var menuRule = SSOUtil.getMenuRule_Obj(SAMLart, docObj.sourceOrgNo, docObj.signType);
						if (menuRule) {
							if (docObj.signType=='E' || docObj.signType=='P') {
								var rule = menuRule.getRule(docObj.folder, docObj.subfolder);
								if (typeof rule=='undefined' || rule===null) {
									alert('無法取得公文夾[' + docObj.folder + '-' + docObj.subfolder +']MenuRule設定');
									return;	
								}
							}
							
							// 清單模式直接開啟公文
							theSSO.MP.openDocWithAOL(SAMLart, docObj, 'todolist', true); // list item touch
						}
						else {
							alert('無法取得MenuRule設定');
						}
					})
					.fail(function(rslt){
						if(!!rslt && !!rslt.msg) {
							theLogger.error(rslt.msg);
						}
						else {
							theLogger.error('檢核MsgId有效性或loadDocPreview failed.');
						}
					});
				}
				// 2015.1 - 開啟SignType='W'待辦
				else if (msgId.length && docObj.signType=='W') {
					docItem = theSSO.MP.todolist.builder.getDocByMsgId(msgId);
					if (!!docItem && !!docItem.url && docItem.url.length) {
						// 2016.6 - 以新分頁開啟ASPX程式 */
						
						//theSSO.MP.openASPXDlg(docItem.url, window.localStorage['Artifact']);
						var newWnd = theSSO.Util.openASPX_NewFrame(docItem.url, window.localStorage.Artifact);
						if (newWnd!==null) {
							// 2020.2.10 - 1090016 Eric, 通知類公文更新[閱讀]狀態
							_updateNotifyItemOpenFlag(docItem);
						}
					}
				}
			}
		});
	}
	else {
		/* PC-清單模式-無tocuh 線上/紙本公文, click文號 */
		docItem = $('#todolist_tb > tbody > tr td.docno');
		//1130502	Leslie[中榮序92]	增修依設定啟用MP點擊任意處即可開啟公文
		// $(document).on('click', '#todolist_tb > tbody > tr td.docno', function() {
		$(document).on('click', '#todolist_tb > tbody > tr td.docno', function(event) {
			
			//1130502	Leslie[中榮序92]	增修依設定啟用MP點擊任意處即可開啟公文
			event.stopPropagation(); 
			
			// 2016.12.19 - 防止連續點擊開啟公文鍵
			if (typeof theSSO.MP.openDocClicked !== 'undefined' && theSSO.MP.openDocClicked===true) {
				if (!!_debug) {
					theLogger.log('連續點擊開啟公文鍵, skip...');
				}
				return;
			}
			else {
				theSSO.MP.openDocClicked = true;
				setTimeout(function(){ theSSO.MP.openDocClicked=false; }, 1000);
			}
			
			// 2019.7 - 1080654 Eric, load doc performance
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
				var $docNo = $(this);
				var linkDocNo = $docNo.text();
				theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 開啟公文作業(DocNo=' + linkDocNo + ') BEGIN...');
				window.tmBeginOpenDoc = Date.now();
				window.tmBeginOpenDoc2 = window.tmBeginOpenDoc;
				window.tmBeginOpenDoc3 = window.tmBeginOpenDoc2;
			}

			//1060329 Kevin 開啟前檢核登入狀態
			if(!theSSO.MP.CheckLoginStatus())
				return;
		
			var $docNo = $(this);
			var linkDocNo = $docNo.text();
			/* note about data-xxx attributes:
			 * 直接在DOM Element加入data-xxx屬性
			 * 若以jquery的data('xxx')取值, 在chrome必須將名稱改為'全小寫'
			 * 要避免此問題, 可用jquery的attr('data-xxx') 方式取值, 此時可用原來大小寫的名稱
			 * iOS Safari待測!
			 */
			
			var $tr = $(this).closest('tr');
			if ($tr===null || $tr.length===0) {
				return;
			}
			
			//1141023	Leslie[1140849]	MP列表增加顯示選取底色功能
			if(theCustom.getCustomSet('MPListSelectedColor') !== '')
				_resetListColor($tr);
			
			var msgId = $tr.attr('data-msgid');
			var isDraft = false, ICUserId='';
			var sDraft = $tr.attr('data-draft');
			if (!!sDraft && sDraft=='true') {
				isDraft = true;
				ICUserId = $tr.attr('data-ICUser');
			}
			
			if (linkDocNo.length && msgId.length) {
				var docObj = theSSO.MP.todolist.builder.getDocByMsgId(msgId, ICUserId);
				if (docObj===null) {
					theLogger.log('MsgId:' + msgId + ' 找不到對應的todolist物件!');
					return;
				}
				if (!!docObj && docObj.signType==='W') {
					return;
				}
				
				//1111026 Kevin 陸委會序134 開啟時檢核公文機關與角色機關一致避免異常
				if (docObj.sourceOrgNo != theSSO.User.PlayRoles[theSSO.User.activeRoleIndex].orgNo) {
					var strMsg = '本份公文所屬機關為' + docObj.ODWMSG.ORGNAME + '，請切換所屬機關角色後再開啟本份公文。';
					alert(strMsg);
					theLogger.log('MsgId:' + msgId + strMsg);
					return;
				}
				
				var SAMLart = localStorage.Artifact;
				theSSO.MP.todolist.builder.checkMsgValidity(SAMLart, docObj)
				.done(function(rslt) {
					// 2019.7 - 1080654 Eric, load doc performance
					let _tmBeginGetMenuRule = 0;
					if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
						theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 取得MenuRule[signType=' + docObj.signType + ']內容 BEGIN...');
						_tmBeginGetMenuRule = Date.now();
					}

					var menuRule = SSOUtil.getMenuRule_Obj(SAMLart, docObj.sourceOrgNo, docObj.signType);
					if (menuRule) {
						if (docObj.signType=='E' || docObj.signType=='P') {
							var rule = menuRule.getRule(docObj.folder, docObj.subfolder);
							if (typeof rule=='undefined' || rule===null) {
								alert('無法取得公文夾[' + docObj.folder + '-' + docObj.subfolder +']MenuRule設定');
								return;	
							}

							// 2019.7 - 1080654 Eric, load doc performance
							if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
								let _log = SSOUtil.dev_getTimeElapseStr('取得MenuRule作業', _tmBeginGetMenuRule);
								theLogger.time(_log);
								_tmBeginGetMenuRule = 0;
							}
						}
						
						// 清單模式直接開啟公文 (list item, non-touch)
						theSSO.MP.openDocWithAOL(SAMLart, docObj, 'todolist', true);	
					}
					else {
						alert('無法取得MenuRule設定');
					}
				})
				.fail(function(rslt){
					if(!!rslt && !!rslt.msg) {
						theLogger.error(rslt.msg);
					}
					else {
						theLogger.error('檢核MsgId有效性或loadDocPreview failed.');
					}
				});
			}
		});
		
		//1111122 Kevin 1111287 考試院新增顯示流程欄位
		//2017.6.22 開啟公文流程檢視子視窗
		//1130502	Leslie[中榮序92]	增修依設定啟用MP點擊任意處即可開啟公文
		// $(document).on('click', '#todolist_tb > tbody > tr td.docProc', function() {
		$(document).on('click', '#todolist_tb > tbody > tr td.docProc', function(event) {
			
			//1130502	Leslie[中榮序92]	增修依設定啟用MP點擊任意處即可開啟公文
			event.stopPropagation(); 
			
			// 2016.12.19 - 防止連續點擊開啟公文鍵
			if (typeof theSSO.MP.tdlActionClicked !== 'undefined' && theSSO.MP.tdlActionClicked===true) {
				if (!!_debug) {
					theLogger.log('連續點擊開啟公文鍵, skip...');
				}
				return;
			}
			else {
				theSSO.MP.tdlActionClicked = true;
				setTimeout(function(){ theSSO.MP.tdlActionClicked=false; }, 1000);
			}
						
			//1060329 Kevin 開啟前檢核登入狀態
			if(!theSSO.MP.CheckLoginStatus())
				return;
		
			/* note about data-xxx attributes:
			 * 直接在DOM Element加入data-xxx屬性
			 * 若以jquery的data('xxx')取值, 在chrome必須將名稱改為'全小寫'
			 * 要避免此問題, 可用jquery的attr('data-xxx') 方式取值, 此時可用原來大小寫的名稱
			 * iOS Safari待測!
			 */
			var $tr = $(this).closest('tr');
			if ($tr===null || $tr.length===0) {
				return;
			}
			
			//1141023	Leslie[1140849]	MP列表增加顯示選取底色功能
			if(theCustom.getCustomSet('MPListSelectedColor') !== '')
				_resetListColor($tr);
			
			var msgId = $tr.attr('data-msgid');
			var isDraft = false, ICUserId='';
			var sDraft = $tr.attr('data-draft');
			if (!!sDraft && sDraft=='true') {
				isDraft = true;
				ICUserId = $tr.attr('data-ICUser');
			}

			if (isDraft) {
				theSSO.MP.tdlActionClicked=false;
				return;
			} 
			
			if (msgId.length) {
				var docObj = theSSO.MP.todolist.builder.getDocByMsgId(msgId, ICUserId);
				if (docObj===null) {
					theLogger.log('MsgId:' + msgId + ' 找不到對應的todolist物件!');
					return;
				}
				if (!!docObj && docObj.signType==='W') {
					return;
				}
								
				//alert('open ODT260 clicked... docNo=' + docObj.docNo + ', msgId=' + docObj.msgId);
				var SAMLart = localStorage.Artifact;
				var sUrl = theSSO.User.EnvSettings['OD_FLOW_PAGE'];
				if (sUrl.length) {
					//1140505	Leslie[1140556]	取消網址參數權杖
					// var sUrlWithParam = sUrl + '?SAMLart=' + SAMLart + '&pDocNo=' + docObj.docNo + '&SOURCE_ORGNO=' + docObj.sourceOrgNo;
					var sUrlWithParam = sUrl + '?pDocNo=' + docObj.docNo + '&SOURCE_ORGNO=' + docObj.sourceOrgNo;
					theSSO.Util.openASPXApp_NewFrame(sUrlWithParam);
				}
			}
		});

		//1141014	Leslie[1141104]	新增優先度的設定功能
		$(document).on('click', '#todolist_tb > tbody > tr td.PRIORITY', function(event){
			var $tr = $(this).closest('tr');
			var msgId = $tr.attr('data-msgid');
			var ICUserId = $tr.attr('data-ICUser');
			if(!msgId.length)
				return;
			var docObj = theSSO.MP.todolist.builder.getDocByMsgId(msgId, ICUserId);
			var envShowPriority = theSSO.User.EnvSettings.get('MP_SHOW_PRIORITY').split("|")
			var enableSetFolder = '';
			if(envShowPriority.length == 2)
				enableSetFolder = envShowPriority[1];
			if(docObj.ICOUId.substr(0,2) != docObj.ownOUId.substr(0,2) || ![enableSetFolder,'待處理-主辦'].includes(`${docObj.folder}-${docObj.subfolder}`))
				return;
			
			//1141023	Leslie[1140849]	MP列表增加顯示選取底色功能
			if(theCustom.getCustomSet('MPListSelectedColor') !== '')
				_resetListColor($tr);
			
			Util.getDlg("RD-PrioritySetting.html").done(function($dlg) {
				$dlg.find("header > h1").unwrap();
				$dlg.find("footer > div").css("width", "50%").unwrap();
				
				$dlg.find("a#ok").on('click', function(event) {
					let mNewPriority = $dlg.find('#priority').val();
					//更新公文的優先度
					var async = false;
					var params = new SOAPClientParameters();
					params.add('argArtifact', localStorage.Artifact);
					params.add('argOrgNo'	, docObj.sourceOrgNo);
					params.add('argDocNo'	, docObj.docNo);
					params.add('argPriority', mNewPriority);
					
					var res;
					var wsFuncName = 'SetDocPriority';
					var wsUrl = SSO_CONFIG.getWSUrl('odlibws');
					try {
						SOAPClient.invokeJSON(wsUrl, wsFuncName, params, false,
									function(rslt){
										theLogger.log('-I- odlibws.' + wsFuncName + ' returns:');
										theLogger.log(rslt);
										if (typeof rslt === 'object') {
											res = rslt.value;
										}
										else {
											throw new Error('叫用 odlibws.' + wsFuncName + ' 時發生錯誤!');
										}
									});	
						if(typeof res == 'object' && 'RtnBool' in res && res.RtnBool){
							docObj.priority = mNewPriority; 
							theSSO.MP.todolist.builder.updateToDoListHtmlItem(docObj)
						}
						else if(res.ErrorClass.IsErr)
							alert(`儲存優先度失敗：${res.ErrorClass.ErrMessage}`);
					} catch (error) {
						alert(error.message);
					}				
					
					$.modal.close();
				});
				$dlg.find("#cancel").on('tap', function() {
					$.modal.close();
				});
				
				var w = $("#mainContent").width(),
					h = $("#mainContent").height();
				theLogger.log("設定公文優先度對話框, w:" + w + ",h:" + h);
				$.modal($dlg, {
					appendTo: $("#mainContent"),
					overlayCss: {width: w, height: h},
					containerCss: {width: "220px", height: "180px"},
					autoResize:true,
					onShow:function() {
						$dlg.trigger("create");
					$dlg.find('#lbDocNo').text("公文文號："+docObj.docNo);
						if(docObj.priority != '0'){
							$dlg.find('#priority option').each(function(){ if($(this).val() < docObj.priority) $(this).remove() });
							$dlg.find('#priority').selectmenu('refresh');
						}
						$dlg.find('#priority').val(docObj.priority).change();
					}
				});
			});
			$("#popupAdvance").popup("close");
		})
	}
	
    $('.folder_title_btn_r').on('click', function() {
        var next = $(this).data('link');
		var folderCount = theSSO.MP.todolist.builder.folderCount;
        if (next!==null && next>0) {   
            if (next>0 && next < folderCount)
            {
                var nextId = 'fldr_' + next;
                
                var idx = parseInt(next);
				if (idx >= 0 && idx < theSSO.MP.todolist.folderScrolls.length) {
					theSSO.MP.todolist.folderScrolls[idx].refresh();
				}
				
				var shiftX = idx * todolist_icon_folder_w;
				var translateCmd = 'translate3d(-' + shiftX + 'px, 0px, 0px)';
			    $(this).closest('.folderList').css({'-webkit-transition-duration': '200ms', '-webkit-transform': translateCmd});
								                
                var list_h = $('#'+nextId).eq(0).height();
                theLogger.log('gonna display folder id: ' + nextId +
                            ' , h=' + list_h + ' (folder count=' + folderCount + ')');
            }
        }
    });
	
	$('.folder_title_btn_l').on('click', function(){
        var next = $(this).data('link');
		var folderCount = theSSO.MP.todolist.builder.folderCount;
        if (next!==null && next>=0) {
            if (next < folderCount)
            {
                var nextId = 'fldr_' + next;
                var idx = parseInt(next);
				if (idx >= 0 && idx < theSSO.MP.todolist.folderScrolls.length) {
					theSSO.MP.todolist.folderScrolls[idx].refresh();
				}
                
				var shiftX = idx * todolist_icon_folder_w;
				var translateCmd = 'translate3d(-' + shiftX + 'px, 0px, 0px)';
			    $(this).closest('.folderList').css({'-webkit-transition-duration': '200ms', '-webkit-transform': translateCmd,
												    'transition-duration':'200ms', 'transform': translateCmd});
	  
                var list_h = $('#'+nextId).eq(0).height();
				//$('.todolist_icon').touchScroll({scrollHeight: list_h});
                theLogger.log('gonna display folder id: ' + nextId +
                            ' , h=' + list_h + ' (folder count=' + folderCount + ')');
            }
        }
    });
	
	// 按展開icon觸發 input 之 click
	/*var $wrapper = $("#selectedFolder").closest(".selector_wrapper");
	var $selector = $wrapper.find('input');
	var $span = $wrapper.find("span.ui-icon-arrow-d");
	$span.click(function(event) {
		$selector.trigger("click");
		event.stopPropagation();
	});*/
		
	// 條列模式, 切換文件夾時觸發
	$(document).on('change', '#selectedFolder', function() {
		// 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
		//var displayValue = $(this).attr('value');
		var displayValue = $(this).val();
		var value = displayValue;
		
		if (displayValue==="全部") {
			value = "";
		}
		theSSO.MP.todolist.builder.setSelectedFolder(displayValue);
				
		// 2016.9.6 - 代理文件夾修改文字顏色
		var clrCode = '#000', _tClrCode = '';
		var folderSetting = theSSO.MP.todolist.builder.getProxyFolderSetting(value, true);
		if (folderSetting!==null) {
			if (typeof folderSetting.proxySetting.folderItemStyle.font.color=='object' &&
				typeof folderSetting.proxySetting.folderItemStyle.font.color.code=='string') {
				_tClrCode = folderSetting.proxySetting.folderItemStyle.font.color.code;
				if (_tClrCode.length!==0) {
					clrCode = _tClrCode;
				}
			}
		}
		$('#listPane #selectedFolder').css('color', clrCode);

        // 2023.4.17 - 1120067 Eric, 考試院只顯示代理公文功能
        let active_role = null;
        let enableShowProxyDocOnly = SSOUtil.isValueTrue(theSSO.User.EnvSettings.get('SSO_ENABLE_SHOW_PROXYDOC_ONLY'));
        if (enableShowProxyDocOnly) {
            active_role = theSSO.User.PlayRoles[theSSO.User.activeRoleIndex];
        }
		
		/*
		 * 2012.9.4
		 * todo: 若有篩選條件, 在重新建立清單之後應依處理
		 *         a. 清空篩選條件 or b. 依篩選條件隱藏不符條件項目
		 */
		theSSO.MP.todolist.builder.resetContent('todolist_tb > tbody', value, 0, active_role);
		
		// 2016.8 - reset tablesorter's content
		theSSO.MP.todolist.builder.resortList();
		
		//1141023	Leslie[1140849]	MP列表增加顯示選取底色功能
		if(!!theSSO.MP.lastOpenMsgId && theCustom.getCustomSet('MPListSelectedColor') !== ''){
			_resetListColor($(`#todolist_tb > tbody > tr[data-msgid="${theSSO.MP.lastOpenMsgId}"]`));
		}
		
		// 2012.12.11 - 若關鍵字不為空白, 則須以關鍵字篩選內容
		var $filter = $('#tdl_list_filter');
		if ($filter.length) {
			var filterText = $filter[0].value.toString();
			if (filterText.length) {
				$filter.jqmRemoveData('lastKey'); // 將原先儲存之key值清空,才能觸發篩選動作
				$filter.trigger('change');
			}
		}
		
		// 2011.11.14 - 燈號統計數量		
		var tdlbuilder = theSSO.MP.todolist.builder;
		$("#todolistToolbar .red_cnt").text(tdlbuilder.lights.red);
		$("#todolistToolbar .yellow_cnt").text(tdlbuilder.lights.yellow);
		$("#todolistToolbar .white_cnt").text(tdlbuilder.lights.white);
		$("#todolistToolbar .green_cnt").text(tdlbuilder.lights.green);
		$("#todolistToolbar .purple_cnt").text(tdlbuilder.lights.purple);
	});
	
	$(document).on('change', '#selectedFolder_search', function() {
		// 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
		//var displayValue = $(this).attr('value');
		var displayValue = $(this).val();
		var value = displayValue;
		if (displayValue==='全部') {
			value = '';
		}
		theSSO.MP.todolist.builder.setSelectedFolder(displayValue);
		
		// 2016.10.14 - 代理文件夾修改文字顏色
		var clrCode = '#000', _clrColde = '';
		var folderSetting = theSSO.MP.todolist.builder.getProxyFolderSetting(value, true);
		if (folderSetting!==null) {
			if (typeof folderSetting.proxySetting.folderItemStyle.font.color=='object' &&
				typeof folderSetting.proxySetting.folderItemStyle.font.color.code=='string') {
				_clrColde = folderSetting.proxySetting.folderItemStyle.font.color.code;
				if (typeof _clrColde=='string' && _clrColde.length!==0) {
					clrCode = _clrColde;
				}
			}
		}
		$('#sidePane #selectedFolder_search').css('color', clrCode);
		
		/* 2012.9.4
		 * todo: 若有篩選條件, 在重新建立清單之後應依處理
		 *         a. 清空篩選條件 or b. 依篩選條件隱藏不符條件項目
		 */
		theSSO.MP.todolist.builder.resetSearchList('search-list', value);
		
		// 2012.12.11 - 若關鍵字不為空白,則須以關鍵字篩選內容
		var $filter = $('.searchViewContent .search-wrapper form.ui-listview-filter input');
		if ($filter.length) {
			var filterText = $filter[0].value.toString();
			if (filterText.length) {
				$filter.trigger('change');
			}
		}
	});
		
	// 2016.10.14 - 記錄篩選用關鍵字
	$(document).on('filterablebeforefilter', '#sidePane #search-list', function(event, ui) {
		theSSO.MP.todolist.builder.setFilterWord(ui.input.val());
	});
	
	// 2014.4 - 測公文核決設定子視窗
	$('#popupApprove2').popup({ overlayTheme: "a" });
	
	if (_testSignalR) {
		$('div#mainTitle div.title span.app_name').on('click', function(){
			if (typeof theSSO.chat !== 'undefined' && theSSO.chat !== null) {
				theLogger.debug('-I- SignalR latest state=' + theSSO.SignalR_State);
			}
			else {
				theLogger.debug('-I- SignalR test, theSSO.chat is invalid!');
			}
		});
	}
}

//1140225	Leslie[1131246]	增修重設MP標題欄位函式，共登入與Resize叫用
function _reSetColumn(reGen){
	var showTransInfo=false, showSignType=true, showSignDueDate=false, showICOU=false, showICUser=false;
	var showFromOU=true, showFromOrg=false, showCurrLoc=false, showDocProperty=false;
	//1140924	Leslie[1141104]	外貿協會新增「優先度」(星號)功能欄位
	var showPriority = false;
	var sValue = theSSO.User.EnvSettings.get('MP_SHOW_TRANS_INFO');
	if (typeof sValue=='string' && SSOUtil.isValueTrue(sValue)) {
		showTransInfo = true;
	}

	sValue = theSSO.User.EnvSettings.get('MP_SHOW_SIGN_TYPE');
	if (typeof sValue=='string' && SSOUtil.isValueFalse(sValue)) {
		showSignType = false;
	}

	sValue = theSSO.User.EnvSettings.get('OD_SIGNDUEDATE');
	if (typeof sValue=='string' && sValue.length) {
		var settings = sValue.split('|');
		if (settings.length) {
			if (SSOUtil.isValueTrue(settings[0])) {
				showSignDueDate = true;
			}
		}
	}

	sValue = theSSO.User.EnvSettings.get('MP_SHOW_IC_DEPT_NAME');
	if (typeof sValue=='string' && SSOUtil.isValueTrue(sValue)) {
		showICOU = true;
	}

	sValue = theSSO.User.EnvSettings.get('MP_SHOW_IC_USER_NAME');
	if (typeof sValue=='string' && SSOUtil.isValueTrue(sValue)) {
		showICUser = true;
	}

	sValue = theSSO.User.EnvSettings.get('MP_SHOW_FROM_OU');
	if (typeof sValue=='string' && SSOUtil.isValueFalse(sValue)) {
		showFromOU = false;
	}

	sValue = theSSO.User.EnvSettings.get('MP_SHOW_FROM_ORG');
	if (typeof sValue=='string' && SSOUtil.isValueTrue(sValue)) {
		showFromOrg = true;
	}

	var folderDicuss='', subfolderDiscussHost='';
	sValue = theSSO.User.EnvSettings.get('MP_SHOW_CURR_LOCATE');
	if (typeof sValue=='string' && SSOUtil.isValueTrue(sValue)) {
		showCurrLoc = true;
		folderDicuss = theSSO.User.EnvSettings.get('FOLDER_DISCUSS');
		subfolderDiscussHost = theSSO.User.EnvSettings.get('SUBFOLDER_DISCUSS_HOST');
	}

	// 2019.1.24 - 1071075, 公文性質
	sValue = theSSO.User.EnvSettings.get('MP_SHOW_DOC_PROPERTY')
	if (typeof sValue=='string' && SSOUtil.isValueTrue(sValue)) {
		showDocProperty = true;
	}
						
	// 2019.2.21 - 1080211, 公文性質欄位可指定長度.
	let showDocPropertyLen = 5;
	if (showDocProperty) {
		sValue = theSSO.User.EnvSettings.get('MP_SHOW_DOC_PROPERTY_LENGTH')
		if (typeof sValue=='string' && sValue.length) {
			showDocPropertyLen = parseInt(sValue);
			if (typeof showDocPropertyLen!='number' || isNaN(showDocPropertyLen) || showDocPropertyLen<1 || showDocPropertyLen>15) {
				if (typeof showDocPropertyLen!='number' || isNaN(showDocPropertyLen) || showDocPropertyLen<1)
					showDocPropertyLen = 5;
				else 
					showDocPropertyLen = 15;

				theLogger.warn('-W- MP_SHOW_DOC_PROPERTY_LENGTH設定值為:' + sValue + '超出合理範圍(1-15), 強制設定為:' + showDocPropertyLen + '.');
			}
		}
	}

	//1140924	Leslie[1141104]	外貿協會新增「優先度」(星號)功能欄位
	sValue = theSSO.User.EnvSettings.get('MP_SHOW_PRIORITY').split("|")[0]
	if (typeof sValue=='string' && SSOUtil.isValueTrue(sValue)) {
		showPriority = true;
	}
	
	// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期
	var showRcvDate = false;
	if(SSO_CONFIG.OrgNickName == 'SMEG')
		showRcvDate = true;

	// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期，add showRcvDate
	//1140924	Leslie[1141104]	外貿協會新增「優先度」(星號)功能欄位
	theSSO.MP.todolist.builder.setShowColumns(false, showSignType, showSignDueDate, showICOU, showICUser, !showTransInfo, showFromOU, showFromOrg, 
		showCurrLoc, folderDicuss, subfolderDiscussHost, showDocProperty, showDocPropertyLen, showRcvDate, showPriority); // 2019.2.21 - 1080211
		
	// 置換header
	$('#mpContainer #todolist_cntr').html('');
	$('#mpContainer #todolist_cntr').append($(theSSO.MP.todolist.builder.getListHeader()));

	//1140225	Leslie[1131246]	配合Resize，增加重建SuperTable函式
	if(reGen){
		theSSO.MP.todolist.reInitToDoList();
		$('#selectedFolder').trigger('change');
	}
}

function transTargetDlg_btn_clicked() {
    $.mobile.changePage($('#dlgProcessFlow'), {transition: "slide", reverse:true, changeHash:false});
        
    $('#dlgTransTarget .dlg-title').css('display', 'block');
    $('#dlgTransTarget .inline-title h2').text('');
    return false;
}
