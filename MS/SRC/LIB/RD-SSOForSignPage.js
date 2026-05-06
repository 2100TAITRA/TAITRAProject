/* jshint -W100 */
/*-- 2019.4 - Eric, [開發用, 勿發布!] 測試公文傳送作業分頁功能 */
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
1080920 1080339     Kevin   Eric    jQuery 3.0 upgrade
1120901 1120709		Kevin	Leslie	弱掃修正Client DOM Stored XSS
1131101	1130977		Kevin	Leslie	移除MobiScroll
*/

/*測試用項目
 *var _logoned = false;
 *var _standalone = false;
 */
// 2020.6.17 - Eric, rename: noneJQuery -> tdlUseJSON
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

// 2015.6 - 新增registerIP參數. (入口網整合登入用)
function _postLoginProcess(SAMLart, registerIP, pincode) {
	/* 2016.6 - 由_parseUserInfo拉出為獨立function */
	function _setupLogger() {
		// 2016.4.29 支援II_LocalLog_等相關環境變數, 控制寫Log及上傳LocalLog功能
		var dr = theSSO.User.EnvSettings.get("II_LocalLog_DateRange");
		
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
					
					var up = theSSO.User.EnvSettings.get("II_LocalLog_UploadPath");
					if(typeof up === "string" && up.length > 0) {
						AlternativeLogger.set("uploadPath", up);
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
					AlternativeLogger.set("logLevel", 0);
				}
			}
			else
				theLogger.warn("環境變數II_LocalLog_DateRange(" + dr + ")設定格式不符");
		}
		else {	// 停止收集LOG
			theLogger.warn("環境變數II_LocalLog_DateRange未設定, 停止收集LOG");
			AlternativeLogger.set("logLevel", 0);
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
                
                // 2019.4.10 - Eric, 公文傳送效能測試.
                if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
                    theSSO.User.EnvSettings.II_SUBMIT_SIGN = 'Y';
                }

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
		if (window.theSSO.User.PlayRoles) {
			var role = window.theSSO.User.PlayRoles[0];
			
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
		
		theLogger.log('EOF _parseUserInfo().');
			
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
				if (typeof _debugTime ==='boolean' && _debugTime===true) {
					theLogger.debug(SSOUtil.dev_getCurrentTimeStr() + ' -tm- ODMSSP.GetToDoListByJSON() BEGIN...');
					tmSecBeginA = Date.now();
				}
				dfd = theWebServices.odmssp.getToDoListByJSON(SAMLart, '', {async:true});
			}
			else {
				if (typeof _debugTime ==='boolean' && _debugTime===true) {
					theLogger.debug(SSOUtil.dev_getCurrentTimeStr() + ' -tm- ODMSSP.GetToDoList() BEGIN...');
					tmSecBeginA = Date.now();
				}
				dfd = theWebServices.odmssp.getToDoList(SAMLart, {async:true});
			}
			
			dfd.then(function(rslt) {
				theSSO._dbgAlert('gonna MP.todolist.load() ...');
				
				if (typeof _debugTime ==='boolean' && _debugTime===true) {
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

					theSSO.MP.todolist.builder.setShowColumns(false, showSignType, showSignDueDate, showICOU, showICUser, !showTransInfo, showFromOU, showFromOrg, 
						showCurrLoc, folderDicuss, subfolderDiscussHost, showDocProperty, showDocPropertyLen); // 2019.2.21 - 1080211

					// 置換header
					$('#mpContainer #todolist_cntr').html('');
					$('#mpContainer #todolist_cntr').append($(theSSO.MP.todolist.builder.getListHeader()));
					//}
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
				
				_dfd.resolve();
			 })
			.fail(function(err) {
				_dfd.reject(err);
			 });
			
			theLogger.log('EOF _loadToDolist().');
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
	
	if (typeof _debugTime ==='boolean' && _debugTime===true) {
		theLogger.debug(SSOUtil.dev_getCurrentTimeStr() + ' -tm- postLoginProcess() BEGIN...');
		window.tmBeginPostLogon = Date.now();
	}
	
	/* 2015.1 - 登入系統時清除localStorage (須保留Artifact) */
	SSOUtil.clearLocalStorage(['Artifact']);
	SSOUtil.clearSessionStorage(); // 2019.5 - Eric
		
	//1080118 Kevin 1080049 修正Client Server Empty Password
	//$("#in_password")[0].value = ""; // 清空密碼
	$("#in_password").val('');
	
	// 記住最近登入的帳號
	var luserid = window.localStorage.latest_login_userid;
	if (typeof luserid !=='undefined' && luserid.length) { /* 2015.10 */
		luserid = luserid.toUpperCase();
	}
	
	// 2017.3.15	Leslie	重登入時，一律清掉"RD-CacheMgr.js"中的Cache[rsrc]
	theCacheMgr.rsrcCacheClear();
	
	// 2013.10 - 在日期後顯示Id(姓名!!!)
	var date = new Date();
    var sDate = '' + (date.getMonth()+1) + '月' + date.getDate() + '日, 星期' + SSOUtil.getTCDayOfWeek(date.getDay());
    //$('.date_info').text(sDate + ' - ' + luserid.toUpperCase());
				
	theSSO._dbgAlert('gonna invoke SAMLWS.GetUserInfo() ...');
	
	SSOUtil.loading('show', {text:'正在取得使用者資訊...', textVisible:true, theme:'c' });
	
	if (typeof _debugTime ==='boolean' && _debugTime===true) {
		var tmSecBegin = Date.now();	
	}
	
	var fEnhanceStartHtml = false;
	// 取得使用者資訊 + 取得系統設定及機關資訊 + 取得待辦事項清單
	theWebServices.SAMLWS.getUserInfoForPad(SAMLart, {async:true})
		.then(function(rslt) {
			if (typeof _debugTime ==='boolean' && _debugTime===true) {
				SSOUtil.dev_logTimeElapse('SAMLWS.getUserInfoForPad', tmSecBegin);
				//insertTimeElpase('SAMLWS.getUserInfoForPad', tmSecBegin);
			}
			
			return _parseUserInfo(SAMLart, rslt);
		})
		//1050719 Kevin 配合權杖登入介接方式，改以UserInfo儲存最後登入資訊
		.then(function() {
			if (typeof _debugTime ==='boolean' && _debugTime===true) {
				SSOUtil.dev_logTimeElapse('[SSO]getUserInfo', tmSecBegin);
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
				
				if(strUrl.indexOf("?") != -1)
					strUrl = strUrl + "&SAMLart=" + SAMLart;
				else 
					strUrl = strUrl + "?SAMLart=" + SAMLart;
			
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
			
			if (typeof _debugTime ==='boolean' && _debugTime===true) {
				tmSecBegin = Date.now();
			}
			
			return _getSettingRsrcFile(SAMLart);
		})
		.then(function(){
			if (typeof _debugTime ==='boolean' && _debugTime===true) {
				SSOUtil.dev_logTimeElapse('[SSO]getSettingRsrcFile', tmSecBegin);
				theLogger.debug(SSOUtil.dev_getCurrentTimeStr() + ' -tm- [SSO]_loadToDoList() BEGIN...');
				tmSecBegin = Date.now();
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
		.then(function(){
			if (typeof _debugTime ==='boolean' && _debugTime===true) {
				SSOUtil.dev_logTimeElapse('[SSO]_loadToDoList', tmSecBegin);
			}
			
			// 載入[首頁]模組
			//1050824 Kevin 每次重新登入時需重新取得首頁
			//if (typeof theSSO.startModuleLoaded == 'undefined' || theSSO.startModuleLoaded===false) {
				if (typeof _debugTime ==='boolean' && _debugTime===true) {
					tmSecBegin = Date.now();
				}
				
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
				
				if (typeof _debugTime ==='boolean' && _debugTime===true) {
					SSOUtil.dev_logTimeElapse('[SSO]loadStartPage', tmSecBegin);
					tmSecBegin = Date.now();
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
			
			if (typeof _debugTime ==='boolean' && _debugTime===true) {
				SSOUtil.dev_logTimeElapse('[SSO]initQueryDoc', tmSecBegin);
				tmSecBegin = Date.now();
			}
			
			// 2014.9
			window.scrollTo(0, 0);
			
			// 2017.3.8 - login布幕上移量修正(依window高度計算)
			var window_h = $(window).height();
			var marginTop = window_h * 1.2;
			$("#login").animate({"margin-top":'-'+marginTop+'px'}, 800,
						function() {
							$("#login").removeClass("login_slidedown").addClass("login_slideup");
						});
			
			// 2014.7 - Eric Peng, 建立SignalR連線 (登出再登入時, 先清除原先的theSSO.chat物件)
			if (theSSO.chat) {
				theLogger.error('-ERR- _postLogonProcess(), theSSO.chat != null.');
			}
			
			//20150617 Kevin SignalR不支援NLB架構
			//SSOUtil.connectSignalR(SSO_CONFIG.ServerHost + '/SR/SignalR', SAMLart, luserid, window.localStorage.latest_login_orgid);
			SSOUtil.connectSignalR(SSO_CONFIG.SignalRHost + '/SR/SignalR', SAMLart, luserid, window.localStorage.latest_login_orgid);
			
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
			return theWebServices.getUserInfo(theSSO.User.account, localStorage.Artifact, ''); // 2016.7.5 新增登入後直接呼叫公文製作的getUserInfo, 第3參數本是承辦單位ID, 在未開啟公文前沒機會得知, 故傳空白字串
		})	
		.then(function() {
			return thePublicRsrc.init(); // 2016.7.5 新增登入後直接初始化資源檔
		})	
		.then(function() {	// 2016.7.5 新增初始化樣版清單
			if (typeof _debugTime ==='boolean' && _debugTime===true) {
				tmSecBegin = Date.now();
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
			
			if (typeof _debugTime ==='boolean' && _debugTime===true) {
				SSOUtil.dev_logTimeElapse('[SSO]initNewDocWorkSpace', tmSecBegin);
			}
		})
		.then(function(){
			if (typeof _debugTime ==='boolean' && _debugTime===true) {
				SSOUtil.dev_logTimeElapse('[SSO]postLoginProcess', window.tmBeginPostLogon);
			}
			
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
		.fail(function(err) {
			// TBC: do clean and logout process here...
			if (typeof err=='object' && typeof err.description=='string' && err.description.length) {
			alert(err.description);
				theLogger.error('_postLoginProcess() failed. err=' + err.description);
			}
			else {
				//1120308 Kevin 調整先寫出Log
				theLogger.error('_postLoginProcess() failed.' + (typeof err=='object')?('err=' + err.toString()):'');
				alert('登入系統作業失敗!');
			}
			SSOUtil.loading('hide');
			return false;
		});

	theLogger.log('-III- after GetUserInfo/GetRsrcFile/GetToDoList.');
	
	// 2013.4 - Erin, 取得跑馬燈訊息 
	var msg = theWebServices.authws.getSpotLightMsg(localStorage.Artifact);
	if (typeof msg === 'string') {
		$("#latest_notify_subject").text(msg);
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
	// 2019.10.17 - 1080905[New] Eric, iPad OS 13 support, quick-fix 
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
	$('#btn_start').on('click', function() {		
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
			//1061211 Kevin 1061116 切回首頁時更新公告以及公布欄以及跑馬燈
			if (theSSO.User.EnvSettings.get("DESKTOP_BULLETIN") != "0")
				theStart.InitBU();

			if (theSSO.User.EnvSettings.get("DESKTOP_TB") != "0")
				theStart.InitTB();
			
			var msgSpot = theWebServices.authws.getSpotLightMsg(localStorage.Artifact);
			if (typeof msgSpot === 'string') {
				$("#latest_notify_subject").text(msgSpot);
			}
		}
		
		//$('#leftDrawer').hide();
	});
	
	// 按下上方工具列左邊的 '公文夾' tab
	$('#btn_mp').on('click', function() {
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
	});
	
	// 按下上方工具列左邊的 '公布欄' 頁籤
	$('#btn_billboard').on('click', function() {
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
	$('#btn_reload').on('click', function() {
		if (confirm('確定要重新取得待辦清單及通知?')===false) {
			return;
		}
		
		if (theSSO.MP.todolist!==undefined) {
			SSOUtil.loading('show', {text:'正在清除既有待辦清單項目...', textVisible:true, theme:'c' });
			
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
			var selFolder = $('#listPane #selectedFolder').attr('value');
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
				
				_initFolderListSpinWheel('selectedFolder', true, 'bottom');
				_initFolderListSpinWheel('selectedFolder_search', true, 'bottom');
			
				if ($('#listPane').is(':visible'))
				{
					var tdlBuilder = theSSO.MP.todolist.builder;
					if ($('#todolist_tb > tbody > tr').length===0) {
						if (selFolder==defaultSelFolder) { // 2016.9.6 - 套用重取前的文件夾
							tdlBuilder.makeToDoList_List_DOM('todolist_tb > tbody', '', '', 0);
						}
						else {
							$('#listPane #selectedFolder').attr('value', selFolder);
							tdlBuilder.makeToDoList_List_DOM('todolist_tb > tbody', selFolder, '', 0);
						}
					}
					else if (selFolder!=defaultSelFolder) {
						$('#listPane #selectedFolder').attr('value', selFolder);
						tdlBuilder.makeToDoList_List_DOM('todolist_tb > tbody', selFolder, '', 0);
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
							$tableForSort.trigger("sorton", [sorting]);
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
	$('#btn_logout').on('click', function() {
		
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

			if (typeof theSSO.MP.submitDocProcWnd!='undefined' && theSSO.MP.submitDocProcWnd!=null && 
				theSSO.MP.submitDocProcWnd.closed===false) {
				if (theSSO.MP.submitDocProcWnd.safeClose==false) {
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
				if(theSSO.logoned)
				rslt = theWebServices.authws.logout(window.localStorage.Artifact);
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
			$('#listPane #selectedFolder').attr('value', '全部');
			$('#listPane #selectedFolder').css('color', '#000'); // 2016.9.6
			
			//1131101	Leslie[1130977]	移除MobiScroll
			// $('#selectedFolder_search').mobiscroll('destroy');
			$('#selectedFolder_search').attr('value', '全部');
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
			
			// clear localStorage items
			// 強制登出可能為同時開啟兩個首頁，為避免問題不處理(此處不清應無問題，因為直接關閉頁面也不會清除，且登入時會再清除一次)。
			if (!theSSO.logOutNow) {
				SSOUtil.clearLocalStorage(null);
				SSOUtil.clearSessionStorage(); // 2019.5 - Eric
			}
            
            // 2019.4 - Eric, 傳送效能測試
            if (typeof window.sc!=='undefined' && window.sc!=null) {
                window.sc = null;
            }
            if (typeof theSSO.MP.SCardModuleInfo!='undefined' && theSSO.MP.SCardModuleInfo!=null) {
                theSSO.MP.SCardModuleInfo = null;
			}
			if (typeof theSSO.MP.submitDocWorker!='undefined' && theSSO.MP.submitDocWorker!=null) {
				theSSO.MP.submitDocWorker = null;
			}

			if (typeof theSSO.MP.submitDocProcWnd!='undefined' && theSSO.MP.submitDocProcWnd!=null && 
			    theSSO.MP.submitDocProcWnd.closed===false) {
				theSSO.MP.submitDocProcWnd.close();
			}
			
			// 2015.6 - 若由其它系統跳轉自動登入(->有SAMLart等網址參數), 則跳轉頁面至無網址參數位置!
			var sSAMLart = SSOUtil.getURLParameter('SAMLart');
			if (!!sSAMLart && sSAMLart.length) {
				var newLocation = location.origin + location.pathname;
				location.assign(newLocation);
			}
		
			//1061023 Kevin 1060634 調整介接訊息由首頁處理
			var sMSG = SSOUtil.getURLParameter('MSG');
			if (!!sMSG && sMSG.length) {
				var newLocation = location.origin + location.pathname;
				location.assign(newLocation);
			}
		}
	});

	// 2019.5.23 - Eric, add for 效能測試
	$(document).on('click', '#btn_uploadLog', function() {
		if (typeof AlternativeLogger=='object' && typeof AlternativeLogger.upload == 'function') {
			let tmBeginUploadLog = Date.now();
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
	if (typeof self.webWorkerContent!=='undefined' && self.webWorkerContent) {
		return;
	}

	var url = window.location.href;
	
	// 2013.11 - IE 不支援 window.location.origin, 在此處設定之!
	if (!window.location.origin) {
		window.location.origin = window.location.protocol + "//" +
			window.location.hostname + (window.location.port ? ':' +
			window.location.port: '');
	}
	
	_dbgPageInitLog += 'document.ready event.\r\n';
	
	// 2012.3.29 - 在標題列加入user資訊
	var title = document.title;
	var userid = window.location.latest_login_userid;
	if (!!userid && userid.toString().length) {
		title += "-" + window.localStorage.latest_login_userid;
	}
	// 1120901 Leslie  1120709 弱掃修正Client DOM Stored XSS
	title = HtmlEncode(title);
	//1130117 Kevin 1120709  弱掃修正Client DOM Stored XSS
	//document.title = title;
	document.title = DOMPurify.sanitize(title);
	
	
	_bindTopToolBarButtons();
	
	// 2012.4.11 - 動態載入ToolBox及BillBoard內容
	var $cntrStartPage = $('#startContainer');
	var $cntrBoard = $('#billboard');
	
	if ($('#mpContainer #eDocPreviewPane').length)
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
    
	function _onSSOOrientationChange(orient) {
		function _getScreenMode(innerWidth, innerHeight, orient) {
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
			var id = screenMode ? screenMode.id : 1;
			switch (id) {
			case 1: /*$inputPanel.css({marginTop:'260px'});*/ break;
			case 2: $inputPanel.css({marginTop:'180px'}); break;
			case 3: $inputPanel.css({marginTop:'390px'}); break;
			case 4: $inputPanel.css({marginTop:'262px'}); break;
			}
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
			
			// 2020.6.17 - 1090452 Eric, 移除此段以解決登入之輸入panel位移問題!
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
            _onSSOOrientationChange(event.orientation);
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
		
		var drawer_w = $('#imgDownDrawer').outerWidth(true); // 2017.4.5 - (美工)左側抽屜寬度
		 
		/* 若目前顯示視窗為AOL, 則h_header為hidden, 計算結果會是'0' */
		var h_header = $('#home_header').height();
		if (h_header===0) {
            return false;
        }
		 
		/* Login 布幕 */
		var $login = $('div#login');
		//var $inputPanel = $('div#login div.input_panel'); /* input panel */

		// 2020.6.17 - 1090452 Eric, 移除此段以解決登入之輸入panel位移問題!
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
		
		if (typeof trigger!=='string' || trigger.length===0) {
			trigger = 'todolist';
		}
		
		/* 若 UniView 已開啟檢閱公文, 應先關閉 */
		if (typeof theUniView === 'object' && theUniView.getDocId()!==null && theUniView.getDocId().length) {
			alert('已開啟公文檢閱中, 請關閉該公文再重試.');
			return;
		}
		
		// 2019.6.12 - Eric, 記錄MP顯示模式
		{
			let showIconPane = $('#todolistContainer #iconPane').is(':visible');
			let showListPane = $('#todolistContainer #listPane').is(':visible');
			let showSidePane = $('#todolistContainer #sidePane').is(':visible');
			if (showSidePane) {
				theSSO.MP.todolist.displayPane = 'sidePane';
			}
			else if (showIconPane) {
				theSSO.MP.todolist.displayPane = 'iconPane';
			}
			else {
				theSSO.MP.todolist.displayPane = 'listPane';
			}
		}


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
		if (!isDraft && trigger=='todolist') {
			$.mobile.loading('show');

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
			_prm = _dfd.promise();
		}
		else {
			_dfd.resolve({success:true});
			_prm = _dfd.promise();
		}

		_prm
		.done(function() {
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
			
			/* 2016.6.14 - 改用嵌入AOL模組後開啟公文
			* 2013.2.20 - RD-AOL.html設定為cache(跳轉至其它網頁後不卸載), 故在開啟該頁面前, 須先
			*   確認是否已載入, 若已載入, 則直接跳轉至該頁面內容!
			* 2013.1.30 - 改用jqm.changePage()載入公文編輯/簽核模組!
			*/
			if (theSSO.aolModuleLoaded) {
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- theSSO.aolModuleLoaded ...');
					//window.tmBeginDocInfo = Date.now();
				}

				$.mobile.loading('show');
				
				theLogger.debug('-I- befoer theAOL.reload()...');
				theAOL.reload(extraOption);
				theLogger.debug('-I- after theAOL.reload()...');
				
				_closeSidePaneAndPreviewWnd(trigger);
				
				$('#docWorkPane').show();
				
				// 2016.12.20
				if (notOpened && signTime.length && sDocObj.length) {
					doc.signTime = signTime;
						updatedDoc = JSON.parse(sDocObj);
					if (typeof updatedDoc=='object') {
						theSSO.MP.todolist.builder.updateDocObj(updatedDoc.msgId, updatedDoc);
					}
				}

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
					
					$('#aol').trigger('sso:moduleinit', [{}]); // 2016.6 - 觸發sso:moduleinit
					$('#aol').enhanceWithin();
					/* 2016.6.15 - 暫時先觸發pagecreate, 等AOL調整完後改觸發sso:modulecreate */
					$('#aol').trigger('pagecreate', [extraOption]);
					//$('#aol').trigger('sso:modulecreate', [{}]); 
									
					$('#docWorkPane').show();
					
					theSSO.aolModuleLoaded = true;
					
					// 2016.12.20
					if (notOpened && signTime.length && sDocObj.length) {
						doc.signTime = signTime;
						var updatedDoc = JSON.parse(sDocObj);
						if (typeof updatedDoc=='object') {
							theSSO.MP.todolist.builder.updateDocObj(updatedDoc.msgId, updatedDoc);
						}
					}

					if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
						SSOUtil.dev_logTimeElapse('openDocWithAOL[with loadAOLModule]',  window.tmBeginOpenDocWithAOL);
						window.tmBeginOpenDocWithAOL = null;
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
			return 'Unloaded...';
		});

		/* 2019.5 - DEV: multi-thread submit process, message event */ 
		//$(window).on('message', SSOUtil.receiveMessage);
		
		/*
		 * 2016.3 - 偵測 page orientation change, 調整版面layout
		 * 
		 * $(window).on('resize', ssoChangeDimension);
		 */
		$(window).on('orientationchange', onSSOOrientationChange);
				
		//if (typeof window._devMode=='boolean' && !!(window._devMode)) {
			$(window).on('resize', '#home', onSSOResize);
		//}
				
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
                $('#btn_login').trigger('click');
            }
        });
		
		_dbgPageInitLog += '#home - pagecreate event.\r\n';
		
        theLogger.debug('#home [pagecreate] event handler...');
		$(window).on('focus', function(e) {
			if (e.srcElement == window) {
				theLogger.debug('window.onfocus');
			}
		});
		
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
				.on('click', function() {
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
		$('#btn_layout').on('click', function(){
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
		
		$('#btn_listmode').on('click', function() {
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
				var selfolder = $('#selectedFolder_search').attr('value');
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
		$('#btn_iconmode').on('click', function(){
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
		
		$('#btn_logPageInit').on('click', function(){
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
			
			if (itemClasses.search('doc_desktop_showpage')==-1 && itemClasses.search('doc_desktop_sidepage')==-1 &&
				itemClasses.search('openToSide')==-1 && itemClasses.search('openToFull')==-1) {
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
					// 1120901 Leslie  1120709 弱掃修正Client Potential XSS
					// $('#'+itemId+' #sidePane').hide();
					$('#todolistContainer #sidePane').hide();
					
					var displayMode = localStorage.mp_display_mode;
					if (typeof displayMode=='string' && displayMode=='icon') {
						$listPane.hide();
						// $('#'+itemId+' #iconPane').show();
						$('#todolistContainer #iconPane').show();
					}
					else {
						// $('#'+itemId+' #iconPane').hide();
						$('#todolistContainer #iconPane').hide();
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
		
		// 2019.5.27 - 動畫結束記錄時間
		// 第一次傳送作業, 因跳轉至pincode子視窗, 結束作業時才跳轉回MP, transitionend不會被觸發. 因此無法記錄時間.
		if (typeof SSO_CONFIG.debugTime=='boolean' && SSO_CONFIG.debugTime) {
			$(document).on('transitionend', '#todolistContainer', function() {
				var tdlCntrClass = $('#todolistContainer').attr('class');
				//theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- ToDoListCntr transitionend, tdlCntrClass="' + tdlCntrClass + '".');
				if (tdlCntrClass.indexOf('doc_desktop_showpage')!=-1 ||
					tdlCntrClass.indexOf('doc_desktop_sidepage')!=-1) {
					//theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- MP SlideToOpen transitionend');
					if (window.tmEndSubmit!==0) {
						SSOUtil.dev_logTimeElapse('MP SlideToOpen transitionend.', window.tmEndSubmit);
						window.tmEndSubmit = 0;
					}
				}
			});
		}

		// 2012.3.14 - 開啟公文鍵隱藏
		//$('#mainContent .cmdForDoc').hide();
		
		var searchTimeout;	//2016.12.6	Leslie	查詢功能的TimeOut
		// 2012.8.30 - 條列清單項目篩選
		$('#tdl_list_filter').on('change keyup', function(event, ui) {
			if($(this).prop('comStart')) return;	//2016.12.6	Leslie	中文輸入未完成時，不做查詢
			
			//2016.12.6	Leslie	加上TimeOut行為，以避免連續輸入時Lag
			clearTimeout(searchTimeout);
			searchTimeout = setTimeout(function(){
			var slastKey = $('#tdl_list_filter').jqmData('last_key');
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
					var arTbText = allText.split('§');
					
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
			
			$('#tdl_list_filter').data('last_key', sFilter);
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
		
		// [圖示模式] 開啟公文
		$cmdForDoc.find('.cmdOpenDoc').on('click', function() {
			
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
						
						// 2016.6 - Eric, 草稿公文不叫用SetMsgStatus!
						var isDraft = theSSO.MP.todolist.builder.isDraftMsg(docObj);
						if (!isDraft) {
							var rslt2 = theWebServices.odmssp.setMsgStatus(SAMLart, docObj.msgId);
							if (rslt2.success===true) {
								theLogger.log('-I- invoke ODMSSP.SetMsgStatus() succeeded.');
							}
							else {
								if (rslt2.success!==true) {
									theLogger.warn('-I- invoke ODMSSP.SetMsgStatus() failed. ErrMsg=' + rslt2.errMsg);
									alert('叫用ODMSSP.SetMsgStatus! ErrMsg=' + rslt2.errMsg);
								}
							}
						}
			
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
		// 2020.6.17 - 1090452 Eric, 移除此段以解決登入之輸入panel位移問題!
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
		
		//1061023 Kevin 1060634 調整介接訊息由首頁處理
		var sMSG = SSOUtil.getURLParameter('MSG');
		if (!!sMSG && sMSG.length) {
			alert(decodeURI(sMSG));
		}
		
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
	
	// 2015.12.15 - 監視onunload
	window.addEventListener('unload', function() {
		theLogger.log("window.onunload...");
		theLogger.log('Before Logger upload [關閉分頁前上傳]');
		AlternativeLogger.upload("關閉分頁前上傳");
		
		//1060817	Leslie[1060740]	增加檢查關閉視窗前，是否有公文仍為開啟中
		if('theAOL' in window){
			var currFolio = theAOL.getCurrFolio();
			if( currFolio != false){
				window.ExceptionLog("視窗意外關閉");
			}
		}
		
		//1050823	Leslie	增加視窗管理，當首頁關閉時，一併關閉所有程式
		if (typeof theStart!=='undefined' && theStart!=null) // 2019.7.25 - Eric, 存在才執行!
			theStart.closeAllChildWin();
		
		//1050824	Leslie	追加於關閉視窗或重新整理時，登出該權杖
		try {
			//1060302 Kevin 若重複開啟首頁，第二個首頁會把第一個首頁登出修正
			if(theSSO.logoned)
				theWebServices.authws.logout(window.localStorage['Artifact']);
		}
		catch(err) {}
	});
}); // End of - $(document).ready(function() {
/*
 * 設定[文件夾]spin wheel之內容 (條列及搜尋子視窗都會叫用!)
 */
function _initFolderListSpinWheel(id, addAll, display_pos, triggerByTimer) {
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
					_initFolderListSpinWheel(id, addAll, display_pos, true)
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
				_initFolderListSpinWheel(id, addAll, display_pos, true)
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
	var folderList = tdlBuilder.getFolderInfoList(addAll);
	var wheels = [];
	var obj = { '公文夾': {} };
	var folderCnt = folderList.length;
	for(var i=0; i<folderCnt; i++) {
		obj['公文夾'][i] = folderList[i].name + (showCount?'　[件數:' + folderList[i].cnt + ']':'');
	}
	//1131101	Leslie[1130977]	移除MobiScroll
	/*wheels.push(obj);
	
	//tdlBuilder.tdl_List_wheels = wheels; // 2016.8.30
	
	$('#' + id).scroller({
			width: 120,
			wheels: wheels,
			theme: 'ios',
			//align_mode: display_pos, // 2012.2.1 - Eric Peng
			display: 'bubble',
			anchor: $('#'+id),
			setText: '確定',
			cancelText: '取消',
			rows: 9, // 2016.8 - 選項顯示9行
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
	
	// 點擊時顯示scroll wheel control
	$('#' + id).on('click', function() { $(this).scroller('show'); });
	
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
/*
 * 設定[人員角色]spin wheel之內容
 * 2014.11.26 - Raymond, 新增extOnClose參數, 若傳入function則在mobiscroll的onClose處理函式中呼叫這個外部onClose函式
 */
function _initRoleListSpinWheel(id, addAll, display_pos, extOnClose) {
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
		if (typeof localStorage[ls_Id] !== 'string') {
			SSOUtil.getOrgInfo(localStorage.Artifact, orgNo);
		}
		
		var _orgBaseInfo = SSO_CONFIG.getOrgInfo(orgNo);
		
		/* 2015.1 - 找不到機關資訊則跳過此角色 */
		if (!_orgBaseInfo) {
			continue;
		}
			
		var unitName = SSOUtil.getUnitName(role.orgNo, role.unitNo);
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
	
	var roleCnt = roleList.length;
	for(var i=0; i<roleCnt; i++) {
		obj[title][i] = roleList[i].name;
	}
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
					
					// // 2014.11.26 - Raymond, 若extOnClose有傳入function物件, 則叫用
					// if($.isFunction(extOnClose)) {
						// extOnClose(roleIndex, roleList[roleIndex].name);
					// }
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
	
	// setup content
	var selfolder = $('#selectedFolder_search').attr('value');
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
		//1060425 Kevin 修正在清單模式切換資料夾後，切換回側屜時未清除原資料夾公文
		$('#search-list').empty();
		theSSO.MP.todolist.builder.makeToDoList_SearchList('search-list', selfolder);
		
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
			},
			300);
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

		// 2019.5.23 - Eric, 測開啟效能!
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
					// 2012.12.11 - 包裝 PreviewCtrl Object
					// 2012.9.4 - 改在預覽頁面的右方工具列按鈕開啟!
					if (docObj.signType==='P') {
						theSSO.MP.openDocWithAOL(SAMLart, docObj, 'todolist', true); // => icon item click
					}
					else {
						theSSO.MP.PreviewCtrl.loadDocPreview(linkDocNo, linkDataB, isDraft, ICUserId);
					}
					
					// 2019.12.3 - 1080339 Eric, checkMsgValidity改為非同步叫用, 故下方程式碼應搬移至此處執行!
					// 半開 + 顯示預覽窗格
					if (validMsg && (docObj.signType==='E')) {
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
							
							SSOUtil.loading('hide');
							
							$('#todolistContainer').addClass('doc_desktop_sidepage').removeClass('doc_desktop_showpage');
							$('#todolistContainer #tdlPane').show();
							
							theSSO.MP.PreviewCtrl.openPreviewPane();

							if (typeof SSO_CONFIG.debugTime=='boolean' && SSO_CONFIG.debugTime===true) {
								SSOUtil.dev_logTimeElapse('PreviewDoc', window.tmBeginIconOpenDoc);
							}
						}
					}
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
		
		//$(this).preventDefault();
		return false;
	});
	
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
			}
		}
	});
	
	// 2013.9 - touchscreen也會有click event, 直接用
	$(document).on('click', '#todolist_tb > tbody > tr td.urlLink', function(event) {
		/* PC-清單模式-SignType:W (全開/半開) */
		var msgId = $(this).attr('data-msgid');
		// 2015.1 - 開啟SignType='W'待辦
		if (msgId.length) {
			var docObj = theSSO.MP.todolist.builder.getDocByMsgId(msgId);
			if (docObj && !!docObj.url && docObj.url.length) {
				// 2016.6 - 以新分頁開啟ASPX程式 */
				//theSSO.Util.openASPXDlg(docObj.url, window.localStorage['Artifact']);
				var newWnd = theSSO.Util.openASPX_NewFrame(docObj.url, window.localStorage.Artifact);
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
					}
				}
			}
		});
	}
	else {
		/* PC-清單模式-無tocuh 線上/紙本公文, click文號 */
		docItem = $('#todolist_tb > tbody > tr td.docno');
		$(document).on('click', '#todolist_tb > tbody > tr td.docno', function() {
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
				
				var SAMLart = localStorage.Artifact;
				theSSO.MP.todolist.builder.checkMsgValidity(SAMLart, docObj)
				.done(function(rslt) {
					var _tmBeginGetMenuRule = 0;
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

							if (typeof SSO_CONFIG.debugTime ==='boolean' && SSO_CONFIG.debugTime===true) {
								SSOUtil.dev_logTimeElapse('取得MenuRule作業', _tmBeginGetMenuRule);
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
		var displayValue = $(this).attr('value');
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
		
		/*
		 * 2012.9.4
		 * todo: 若有篩選條件, 在重新建立清單之後應依處理
		 *         a. 清空篩選條件 or b. 依篩選條件隱藏不符條件項目
		 */
		theSSO.MP.todolist.builder.resetContent('todolist_tb > tbody', value, 0);
		
		// 2016.8 - reset tablesorter's content
		theSSO.MP.todolist.builder.resortList();
		
		// 2012.12.11 - 若關鍵字不為空白, 則須以關鍵字篩選內容
		var $filter = $('#tdl_list_filter');
		if ($filter.length) {
			var filterText = $filter[0].value.toString();
			if (filterText.length) {
				$filter.jqmRemoveData('last_key'); // 將原先儲存之key值清空,才能觸發篩選動作
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
		var displayValue = $(this).attr('value');
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
		$('div#mainTitle div.title span.app_name').on('click', function() {
			if (typeof theSSO.chat !== 'undefined' && theSSO.chat !== null) {
				theLogger.debug('-I- SignalR latest state=' + theSSO.SignalR_State);
			}
			else {
				theLogger.debug('-I- SignalR test, theSSO.chat is invalid!');
			}
		});
	}
}

function transTargetDlg_btn_clicked() {
    $.mobile.changePage($('#dlgProcessFlow'), {transition: "slide", reverse:true, changeHash:false});
        
    $('#dlgTransTarget .dlg-title').css('display', 'block');
    $('#dlgTransTarget .inline-title h2').text('');
    return false;
}
