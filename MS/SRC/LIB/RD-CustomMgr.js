// CustomMgr class
//	2016.5.10 新增command機制, 改用theLogger
// 1100610 Raymond 1100659 客製化模組改為全域物件, 其他JS不要new CustomMgr(), 以避免重複new, 造成客製化註冊的callback不見, 發文機關選單未初始化(出現"測試機關"選項)的問題
// 1111012	Leslie	1110865	新增專用於取得客製化設定值的函式
// 1111128	Leslie	--		增加檢核是否為DocView模式

// global enum strings
var CUSTOM = {
	LOAD: "load",
	INIT: "init",
	CHANGE: "change",
	REFRESH: "refresh",
	POPUP: "popup",
	COMMAND: "command",
	SHOWDLG: "showdlg"
};

function CustomMgr() {

	// private members
	var _loadTable = new Array();
	var _initTable = new Array();
	var _changeTable = new Array();   // 全域
	var _refreshTable = new Array();
	var _fieldTable = new Array();
	var _popupTable = new Array();
	var _commandTable = new Array();	// 2016.5.10 新增command機制
	var _draftCtx;
	
	var thisMgr = this;
	// private methods
	function findCurrElems(fldName) {
		var elems = [];
		for(var i=0; i<_fieldTable.length; i++) {
			if(_fieldTable[i].fldName == fldName)
				elems.push(_fieldTable[i].elem);
		}
		return elems;
	}
	
	function RefreshCallback(filter, callbacks) {
		this.filter = filter;
		if(Object.prototype.toString.call(callbacks) === "[object Array]") {	// 複數組fldName-callback
			this.callAll = function(srcFldNm, val, srcPara) {
				for(var i=0; i<callbacks.length; i++) {
					if(typeof callbacks[i].fldName === "string" && callbacks[i].fldName.length > 0) {
						var elems = findCurrElems(callbacks[i].fldName);
						if(elems.length > 0) {
							try {
								callbacks[i].callback.call(_draftCtx.pubObj, srcFldNm, val, callbacks[i].fldName, elems, srcPara);
							}
							catch(e) {
								theLogger.error("[客製化框架] Exception! " + e.message + " - " + e.sourceURL + ":" + e.line);
							}
						}
						else
							theLogger.log("[客製化框架] 目前頁面上找不到\"" + callbacks[i].fldName + "\"關聯的元素");
					}
				}
			}
		}
		else {	// 一組fldName-callback
			this.callAll = function(srcFldNm, val, srcPara) {
				if(typeof callbacks.fldName === "string" && callbacks.fldName.length > 0) {
					var elems = findCurrElems(callbacks.fldName);
					if(elems.length > 0) {
						try {
							callbacks.callback.call(_draftCtx.pubObj, srcFldNm, val, callbacks.fldName, elems, srcPara);
						}
						catch(e) {
							theLogger.error("[客製化框架] Exception! " + e.message + " - " + e.sourceURL + ":" + e.line);
						}
					}
					else
						theLogger.log("[客製化框架] 目前頁面上找不到\"" + callbacks.fldName + "\"關聯的元素");
				}
			}
		}
	}
	
	function DraftCtx() {
		var _localInitTable = new Array(),
			_localChangeTable = new Array(),
			_localNotifyTable = new Array(),
			_localRefreshTable = new Array(),
			_localPopupTable = new Array(),
			_localCommandTable = new Array();	// 2016.5.10 新增command機制
		
		this.oninit = function($para, para, fldName, $sp, inline, defInit, preventDefault) {
			for(var i=0; i<_localInitTable.length; i++) {
				if(_localInitTable[i].filter != null) {
					var fltr = _localInitTable[i].filter;
					if(typeof fltr === "string") {
						if(fltr.length == 0 || fltr == fldName) {
							theLogger.log("[客製化框架] '" + fldName + "'初始化, 呼叫#" + i + " callback function(local scope)");
							if(_localInitTable[i].callback.call(this.pubObj, $para, para, $sp, inline, defInit, thisMgr.onchange) == false)
								preventDefault = true;
						}
					}
					else
						theLogger.error("[客製化框架] filter非字串?");
				}
				else {
					theLogger.log("[客製化框架] '" + fldName + "'初始化, 呼叫#" + i + " callback function(local scope, 未指定過濾欄位名稱)");
					if(_localInitTable[i].callback.call(this.pubObj, $para, para, $sp, inline, defInit, thisMgr.onchange) == false)
						preventDefault = true;
				}
			}
			if(preventDefault)
				theLogger.log("[客製化框架] 忽略'" + fldName + "'欄位的預設初始化動作");
			else {
				theLogger.log("[客製化框架] 執行'" + fldName + "'欄位的預設初始化動作");
				defInit();
			}
		}
		this.onchange = function(val, para, fldName, preVal) {
			for(var i=0; i<_localChangeTable.length; i++) {
				if(_localChangeTable[i].filter != null) {	// 依指定欄位名稱過濾
					var fltr = _localChangeTable[i].filter;
					if(typeof fltr === "string") {
						if(fltr.length == 0 || fltr == fldName) {
							theLogger.log("[客製化框架] '" + fldName + "'異動, 呼叫#" + i + " callback function(local scope)");
							_localChangeTable[i].callback.call(this.pubObj, val, para, fldName, preVal);
						}
					}
					else
						theLogger.error("[客製化框架] filter非字串?");
				}
				else {	// 未指定欄位名稱的callbacks, 即每欄位有異動都要呼叫
					theLogger.log("[客製化框架] '" + fldName + "'異動, 呼叫#" + i + " callback function(local scope, 未指定過濾欄位名稱)");
					_localChangeTable[i].callback.call(this.pubObj, val, para, fldName, preVal);
				}
			}
		}
		this.onrefresh = function(fldName, val, para) {
			for(var i=0; i<_localRefreshTable.length; i++) {
				if(_localRefreshTable[i].filter != null) {
					var fltr = _localRefreshTable[i].filter;
					if(typeof fltr === "string") {
						if(fltr.length == 0 || fltr == fldName) {
							theLogger.log("[客製化框架] '" + fldName + "'異動通知, 呼叫#" + i + " callback function(local scope)");
							_localRefreshTable[i].callAll(fldName, val, para);
						}
					}
					else
						theLogger.error("[客製化框架] filter非字串?");
				}
			}
		}
		this.onpopup = function(fldName, $list, inline, defPopup, preventDefault) {
			for(var i=0; i<_localPopupTable.length; i++) {
				if(_localPopupTable[i].filter != null) {
					var fltr = _localPopupTable[i].filter;
					if(typeof fltr === "string") {
						if(fltr.length == 0 || fltr == fldName) {
							theLogger.log("[客製化框架] '" + fldName + "'展開選取清單, 呼叫#" + i + " callback function(local scope)");
							_localPopupTable[i].callback.call(this.pubObj, $list, inline, defPopup);
							preventDefault = true;	// 有執行過就避免執行預設的
						}
					}
					else
						theLogger.error("[客製化框架] filter非字串?");
				}
			}
			if(!preventDefault)
				defPopup();
		}
		this.oninitcmd = function(fldName, buildCmdProc) {	// 2016.5.10 新增command機制 - 2階段執行, phase1.建立指令列按鈕
			for(var i=0; i<_localCommandTable.length; i++) {
				var fltr = _localCommandTable[i].filter;
				if(typeof fltr === "string") {
					if(fltr.length == 0 || fltr == fldName) {
						if(_localCommandTable[i].queryVisible && $.isFunction(_localCommandTable[i].queryVisible)) {	// 若註冊時提供queryVisible回呼函式, 則叫用回呼函式
							theLogger.log("[客製化框架] '" + fldName + "'建立指令按鈕, 呼叫#" + i + " callback function(global scope)");
							if(_localCommandTable[i].queryVisible.call(_draftCtx.pubObj) == true)	// 判斷queryVisible回呼函式的回傳值為true才建立指令按鈕
								buildCmdProc.call(this.pubObj, _localCommandTable[i]);	// 傳入Command物件, 含callback/href, 會在指令列按鈕被點擊時才叫用(phase2.)
							else
								theLogger.log("callback function(global scope)回傳非true, 不建立指令按鈕");
						}
						else {	// 若註冊時未提供queryVisible回呼函式, 則一律建立指令按鈕
							buildCmdProc.call(this.pubObj, _localCommandTable[i]);	// 傳入Command物件, 含callback/href, 會在指令列按鈕被點擊時才叫用(phase2.)
						}
					}
				}
				else
					theLogger.error("[客製化框架] filter非字串?");
			}
		}
		this.pubObj = {
			register: function() {	// 2014.11.18 init與change合併成register, 語意更清楚
				if(arguments.length > 1) {
					if(typeof arguments[0] === "string") {
						if(arguments[0] == "init") {	// 第1個參數是callback種類, 目前僅定義"init"、"change"
							if(arguments.length > 2) {  // 第2個參數是filter, 第3個參數是callback
								_localInitTable.push({
									filter: arguments[1],
									callback: arguments[2]
								});
							}
							else {
								_localInitTable.push({
									filter: null,
									callback: arguments[1]
								});
							}
						}
						else if(arguments[0] == "change") {
							if(arguments.length > 2) {  // 第2個參數是filter, 第3個參數是callback
								_localChangeTable.push({
									filter: arguments[1],
									callback: arguments[2]
								});
							}
							else {
								_localChangeTable.push({
									filter: null,
									callback: arguments[1]
								});
							}
						}
						else if(arguments[0] == "refresh") {
							if(arguments.length > 2)
								_localRefreshTable.push(new RefreshCallback(arguments[1], arguments[2]));
							else
								_localRefreshTable.push(new RefreshCallback(null, arguments[1]));
						}
						else if(arguments[0] == "popup") {
							if(arguments.length > 2) {  // 第2個參數是filter, 第3個參數是callback
								_localPopupTable.push({
									filter: arguments[1],
									callback: arguments[2]
								});
							}
							else {
								_localPopupTable.push({
									filter: null,
									callback: arguments[1]
								});
							}
						}
						else if(arguments[0] == "command") {	// 2016.5.10 新增command機制
							if(arguments.length > 3) {
								// 檢查參數型別
								if (typeof arguments[1] !== "string")
									theLogger.error("[客製化框架] command模組第1參數'fldName'(欄位名稱)必須是字串");
								else if(typeof arguments[2] !== "string")
									theLogger.error("[客製化框架] command模組第2參數'cmdName'(指令名稱)必須是字串");
								else if(!$.isFunction(arguments[3]))
									theLogger.error("[客製化框架] command模組第3參數'callback'必須是函式");
								else
									_localCommandTable.push({
										filter: arguments[1],
										cmdname: arguments[2],
										callback: arguments[3]
									});
								// 額外提供第5參數則為queryVisible
								if(arguments.length > 4) {
									if(!$.isFunction(arguments[4]))
										theLogger.warn("[客製化框架] command模組第4參數(OPTIONAL)'queryVisible'必須是函式");
									else
										_localCommandTable[_localCommandTable.length - 1].queryVisible = arguments[4];
								}
							}
							else
								theLogger.error("[客製化框架] command參數錯誤");
						}
						else if(arguments[0] == "showdlg") {	// 2016.5.10 新增showdlg機制
							if(arguments.length > 6) {
								// 檢查參數型別
								if (typeof arguments[1] !== "string")
									theLogger.error("[客製化框架] showdlg模組第1參數'fldName'(欄位名稱)必須是字串");
								else if(typeof arguments[2] !== "string")
									theLogger.error("[客製化框架] showdlg模組第2參數'cmdName'(指令名稱)必須是字串");
								else if(typeof arguments[3] !== "string")
									theLogger.error("[客製化框架] showdlg模組第3參數'href'(子視窗IFrame網址)必須是字串");
								else if(typeof arguments[4] !== "string" && typeof arguments[4] !== "number")
									theLogger.error("[客製化框架] showdlg模組第4參數'width'(子視窗寬度)必須是字串或數字");
								else if(typeof arguments[5] !== "string" && typeof arguments[5] !== "number")
									theLogger.error("[客製化框架] showdlg模組第5參數'height'(子視窗高度)必須是字串或數字");
								else if(!$.isFunction(arguments[6]))
									theLogger.error("[客製化框架] showdlg模組第6參數'callback'必須是函式");
								else
									_localCommandTable.push({
										filter: arguments[1],
										cmdname: arguments[2],
										href: arguments[3],
										width: arguments[4],
										height: arguments[5],
										callback: arguments[6]
									});
								// 額外提供第5參數則為queryVisible
								if(arguments.length > 7) {
									if(!$.isFunction(arguments[7]))
										theLogger.warn("[客製化框架] showdlg模組第7參數(OPTIONAL)'queryVisible'必須是函式");
									else
										_localCommandTable[_localCommandTable.length - 1].queryVisible = arguments[7];
								}
							}
							else
								theLogger.error("[客製化框架] showdlg參數錯誤");
						}
					}
					else
						theLogger.error("[客製化框架] 第1個參數必須是字串!");
				}
				else
					theLogger.error("[客製化框架] 必須要有參數");
				return this;
			}
		}
	}
	
	// public methods of mgr
	this.onload = function(dm) {
		_draftCtx = new DraftCtx(); // 新增暫時物件
		for(var i=0; i<_loadTable.length; i++) {
			if(_loadTable[i].filter != null) {
				var fltr = _loadTable[i].filter;
				var docType = dm.getDocType(), subDocType = dm.getSubDocType();
				if(!("docType" in fltr) || fltr.docType == "" || docType == fltr.docType) {
					if(!("subDocType" in fltr) || fltr.subDocType == "" || subDocType == fltr.subDocType) {
						theLogger.log("[客製化框架] '" + docType + ((subDocType.length)?"(" + subDocType + ")":"") + "'載入, 呼叫#" + i + " callback function");
						_loadTable[i].callback.call(_draftCtx.pubObj, dm);
					}
				}
			}
			else {
				theLogger.log("[客製化框架] 文稿載入, 呼叫#" + i + " callback function(未指定過濾文別/副文別)");
				_loadTable[i].callback.call(_draftCtx.pubObj, dm);
			}
		}
		return this;
	}
	this.oninit = function($para, para, fldName, $sp, inline, defInit) {
		var preventDefault = false; // 是否已呼叫過匹配的callback
		for(var i=0; i<_initTable.length; i++) {
			if(_initTable[i].filter != null) {
				var fltr = _initTable[i].filter;
				if(typeof fltr === "string") {
					if(fltr.length == 0 || fltr == fldName) {
						theLogger.log("[客製化框架] '" + fldName + "'初始化, 呼叫#" + i + " callback function(global scope)");
						if(_initTable[i].callback.call(_draftCtx.pubObj, $para, para, $sp, inline, defInit, thisMgr.onchange) == false)
							preventDefault = true;
					}
				}
				else
					theLogger.error("[客製化框架] filter非字串?");
			}
			else {
				theLogger.log("[客製化框架] '" + fldName + "'初始化, 呼叫#" + i + " callback function(global scope)");
				if(_initTable[i].callback.call(_draftCtx.pubObj, $para, para, $sp, inline, defInit, thisMgr.onchange) == false)
					preventDefault = true;
			}
		}
		_draftCtx.oninit($para, para, fldName, $sp, inline, defInit, preventDefault);
		return this;
	}
	this.onchange = function(val, para, fldName, preVal) {
		for(var i=0; i<_changeTable.length; i++) {
			if(_changeTable[i].filter != null) {	// 依指定欄位名稱過濾
				var fltr = _changeTable[i].filter;
				if(typeof fltr === "string") {
					if(fltr.length == 0 || fltr == fldName) {
						theLogger.log("[客製化框架] '" + fldName + "'異動, 呼叫#" + i + " callback function(global scope)");
						_changeTable[i].callback.call(_draftCtx.pubObj, val, para, fldName, preVal);
					}
				}
				else
					theLogger.error("[客製化框架] filter非字串?");
			}
			else {	// 未指定欄位名稱的callbacks, 即每欄位有異動都要呼叫
				theLogger.log("[客製化框架] '" + fldName + "'異動, 呼叫#" + i + " callback function(global scope)");
				_changeTable[i].callback.call(_draftCtx.pubObj, val, para, fldName, preVal);
			}
		}
		_draftCtx.onchange(val, para, fldName, preVal);  // 呼叫暫存的當前文稿的onchange
		
		for(i=0; i<_refreshTable.length; i++) {
			if(_refreshTable[i].filter != null) {
				if(typeof fltr === "string") {
					if(fltr.length == 0 || fltr == fldName) {
						theLogger.log("[客製化框架] '" + fldName + "'異動通知, 呼叫#" + i + " callback function(global scope)");
						_refreshTable[i].callAll(fldName, val, para);
					}
				}
				else
					theLogger.error("[客製化框架] filter非字串?");
			}
			else {
				theLogger.log("[客製化框架] '" + fldName + "'異動通知, 呼叫#" + i + " callback function(global scope)");
				_refreshTable[i].callAll(fldName, val, para);
			}
		}
		_draftCtx.onrefresh(fldName, val, para);
		return this;
	}
	this.onpopup = function(fldName, $list, inline, defPopup) {
		var preventDefault = false;
		for(var i=0; i<_popupTable.length; i++) {
			if(_popupTable[i].filter != null) {
				var fltr = _popupTable[i].filter;
				if(typeof fltr === "string") {
					if(fltr.length == 0 || fltr == fldName) {
						theLogger.log("[客製化框架] '" + fldName + "'展開選取清單, 呼叫#" + i + " callback function(global scope)");
						_popupTable[i].callback.call(_draftCtx.pubObj, $list, inline, defPopup);
						preventDefault = true;	// 有執行過就避免執行預設的展開選單動作
					}
				}
				else
					theLogger.error("[客製化框架] filter非字串?");
			}
		}
		_draftCtx.onpopup(fldName, $list, inline, defPopup, preventDefault);
	}
	this.oninitcmd = function(fldName, buildCmdProc) {	// 2016.5.10 新增command機制 - 2階段執行, phase1.建立指令列按鈕
		for(var i=0; i<_commandTable.length; i++) {
			var fltr = _commandTable[i].filter;
			if(typeof fltr === "string") {
				if(fltr.length == 0 || fltr == fldName) {
					if(_commandTable[i].queryVisible && $.isFunction(_commandTable[i].queryVisible)) {	// 若註冊時提供queryVisible回呼函式, 則叫用回呼函式
						theLogger.log("[客製化框架] '" + fldName + "'建立指令按鈕, 呼叫#" + i + " callback function(global scope)");
						if(_commandTable[i].queryVisible.call(_draftCtx.pubObj) == true)	// 判斷queryVisible回呼函式的回傳值為true才建立指令按鈕
							buildCmdProc.call(_draftCtx.pubObj, _commandTable[i]);	// 傳入Command物件, 含callback/href, 會在指令列按鈕被點擊時才叫用(phase2.)
						else
							theLogger.log("callback function(global scope)回傳非true, 不建立指令按鈕");
					}
					else {	// 若註冊時未提供queryVisible回呼函式, 則一律建立指令按鈕
						buildCmdProc.call(_draftCtx.pubObj, _commandTable[i]);	// 傳入Command物件, 含callback/href, 會在指令列按鈕被點擊時才叫用(phase2.)
					}
				}
			}
			else
				theLogger.error("[客製化框架] filter非字串?");
		}
		_draftCtx.oninitcmd(fldName, buildCmdProc);
	}
	this.clearFieldTable = function() {
		theLogger.log("[客製化框架] 清空欄位表");
		_fieldTable.length = 0;
	}
	this.addFieldTable = function(fldName, elem) {
		theLogger.log("[客製化框架] add '" + fldName + "'欄位元素" + elem.tagName);
		_fieldTable.push({fldName: fldName, elem: elem});
	}
	
	// Singleton object
	window.theCustom = {
		// public methods
		register: function() {	// 2014.11.18 load、init、change合併成register, 語意更清楚
			//1111128	Leslie	增加檢核是否為DocView模式
			if(sessionStorage.viewDoc)
				return;
			if(arguments.length > 1) {
				if(typeof arguments[0] === "string") {
					if(arguments[0] == "load") {	// 第1個參數是callback種類, 目前僅定義"load"、"init"、"change"
						if(arguments.length > 2) {  // 第2個參數是filter, 第3個參數是callback
							_loadTable.push({
								filter: arguments[1],
								callback: arguments[2]
							});
						}
						else {
							_loadTable.push({
								filter: null,
								callback: arguments[1]
							});
						}
					}
					else if(arguments[0] == "init") {
						if(arguments.length > 2) {  // 第2個參數是filter, 第3個參數是callback
							_initTable.push({
								filter: arguments[1],
								callback: arguments[2]
							});
						}
						else {
							_initTable.push({
								filter: null,
								callback: arguments[1]
							});
						}
					}
					else if(arguments[0] == "change") {
						if(arguments.length > 2) {  // 第2個參數是filter, 第3個參數是callback
							_changeTable.push({
								filter: arguments[1],
								callback: arguments[2]
							});
						}
						else {
							_changeTable.push({
								filter: null,
								callback: arguments[1]
							});
						}
					}
					else if(arguments[0] == "refresh") {
						if(arguments.length > 2)
							_refreshTable.push(new RefreshCallback(arguments[1], arguments[2]));
						else
							_refreshTable.push(new RefreshCallback(null, arguments[1]));
					}
					else if(arguments[0] == "popup") {
						if(arguments.length > 2) {  // 第2個參數是filter, 第3個參數是callback
							_popupTable.push({
								filter: arguments[1],
								callback: arguments[2]
							});
						}
						else {
							_popupTable.push({
								filter: null,
								callback: arguments[1]
							});
						}
					}
					else if(arguments[0] == "command") {	// 2016.5.10 新增command機制
						if(arguments.length > 3) {
							// 檢查參數型別
							if (typeof arguments[1] !== "string")
								theLogger.error("[客製化框架] command模組第1參數'fldName'(欄位名稱)必須是字串");
							else if(typeof arguments[2] !== "string")
								theLogger.error("[客製化框架] command模組第2參數'cmdName'(指令名稱)必須是字串");
							else if(!$.isFunction(arguments[3]))
								theLogger.error("[客製化框架] command模組第3參數'callback'必須是函式");
							else
								_commandTable.push({
									filter: arguments[1],
									cmdname: arguments[2],
									callback: arguments[3]
								});
							// 額外提供第5參數則為queryVisible
							if(arguments.length > 4) {
								if(!$.isFunction(arguments[4]))
									theLogger.warn("[客製化框架] command模組第4參數(OPTIONAL)'queryVisible'必須是函式");
								else
									_commandTable[_commandTable.length - 1].queryVisible = arguments[4];
							}
						}
						else
							theLogger.error("[客製化框架] command參數錯誤");
					}
					else if(arguments[0] == "showdlg") {	// 2016.5.10 新增showdlg機制
						if(arguments.length > 6) {
							// 檢查參數型別
							if (typeof arguments[1] !== "string")
								theLogger.error("[客製化框架] showdlg模組第1參數'fldName'(欄位名稱)必須是字串");
							else if(typeof arguments[2] !== "string")
								theLogger.error("[客製化框架] showdlg模組第2參數'cmdName'(指令名稱)必須是字串");
							else if(typeof arguments[3] !== "string" && !$.isFunction(arguments[3]))
								theLogger.error("[客製化框架] showdlg模組第3參數'href'(子視窗IFrame網址)必須是字串或函式");
							else if(typeof arguments[4] !== "string" && typeof arguments[4] !== "number")
								theLogger.error("[客製化框架] showdlg模組第4參數'width'(子視窗寬度)必須是字串或數字");
							else if(typeof arguments[5] !== "string" && typeof arguments[5] !== "number")
								theLogger.error("[客製化框架] showdlg模組第5參數'height'(子視窗高度)必須是字串或數字");
							else if(!$.isFunction(arguments[6]))
								theLogger.error("[客製化框架] showdlg模組第6參數'callback'必須是函式");
							else
								_commandTable.push({
									filter: arguments[1],
									cmdname: arguments[2],
									href: arguments[3],
									width: arguments[4],
									height: arguments[5],
									callback: arguments[6]
								});
							// 額外提供第5參數則為queryVisible
							if(arguments.length > 7) {
								if(!$.isFunction(arguments[7]))
									theLogger.warn("[客製化框架] showdlg模組第7參數(OPTIONAL)'queryVisible'必須是函式");
								else
									_commandTable[_commandTable.length - 1].queryVisible = arguments[7];
							}
						}
						else
							theLogger.error("[客製化框架] showdlg參數錯誤");
					}
				}
				else
					theLogger.error("[客製化框架] 第1個參數必須是字串!");
			}
			else
				theLogger.error("[客製化框架] 必須要有參數");
			return this;
		},
		setValue: function(fldName, val, noTriggerChange) {
			var elems = findCurrElems(fldName);
			if(elems.length) {
				$.each(elems, function(i, elem) {
					$(elem).text(val).val(val).trigger("apply");	// 設值
					if(!noTriggerChange && "editCtlr" in elem) {	// 呼叫callback, noTriggerChange未設則預設會呼叫
						var pa = elem.editCtlr.para;
						thisMgr.onchange(val, pa, fldName);
					}
				});
			}
			else
				theLogger.warn("找不到指定欄位名稱'" + fldName + "'的元素");
			return this;
		},
		// 1111012	Leslie	1110865	新增專用於取得客製化設定值的函式
		getCustomSet: function(key){
			if('CustomSet' in theCustom && key in theCustom.CustomSet)
				return theCustom.CustomSet[key];
			return '';
		}
	};
}

(function() {
	// 1100610 Raymond 1100659 客製化模組改為全域物件, 其他JS不要new CustomMgr(), 以避免重複new, 造成客製化註冊的callback不見, 發文機關選單未初始化(出現"測試機關"選項)的問題
	window.gCustomMgr = new CustomMgr();
	
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-CustomMgr.js").finish();
})();
