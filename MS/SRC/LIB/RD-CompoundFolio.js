// CompoundFolio - 併案併辦子文處理
//   
// 1060414 Raymond Raymond 1050910 ErrMsg有"NoThreadOK"字眼表示非錯誤, 只是尚未有任何會畢資訊
// 1060621 Raymond Raymond 1060538 NoThreadOK -> NoThreadOk
// 1061020 Raymond Raymond 1060963 修正第一次點擊子文頁籤時左右翻頁按鈕會多跑一次母文的邏輯, 若出錯則子文會無法翻頁的問題
// 1061023 Raymond Raymond 1060282 新增參數由FolioView傳入相關選單元素供點擊子文頁籤第2次時顯示"列印"項目
// 1080923 Kevin   Eric    1080339 jQuery 3.0 upgrade
// 1091021 Raymond Raymond 1090564 新增子文及分會會畢單位公文支援信保特殊模式公文, 並修正因無DocObj物件get方法導致無法開啟子文及分會會畢公文問題
// 1100324 Raymond Raymond 1090845 新增子文若為電子來文可開啟EDI011功能, 子文基資取得改呼叫GetDocumentInfo2方法, 並取得SYSID, 以供開啟EDI011功能需要
// 1100901 Raymond Raymond 1100750 新增combineType參數, 從記錄在母文的ODWDCM的COM_NO裡以參數傳入, 用於判定併辦子文僅顯示來文內容(COM_COMBINE_TYPE != "3")
// 1120224 Raymond Raymond 1111225 啟用簽核意見窗格功能時, 開啟子文/分會公文時要重新整理簽核意見窗格
// 1130503 Raymond Raymond 中榮序96 修正啟用「檔案功能」按鈕時, 點擊子文第2次會跳去一個不存在網頁的問題
// 1140602 Raymond Raymond 1140772 修正若子文先設參考公文再併案, 在開啟母文後, 點擊子文頁籤會轉圈圈的問題

//function CompoundFolio(comNo, signType) {	// 2016.8.31 新增signType, 因為GetDocumentInfo查不到SignType, 是記錄在ODWDCM的COM_NO裡, 要用參數傳入
function CompoundFolio(comNo, signType, combineType) {	// 1100901 Raymond 1100750 新增combineType, 因為GetDocumentInfo2查不到CombineType, 是記錄在ODWDCM的COM_NO裡, 要用參數傳入
	
	this.comNo = comNo; // 併辦案子文號
	this.signType = signType;	// 併辦案子文signType
	this.combineType = combineType;	// 1100901 Raymond 1100750 併陳(3)或併辦(除了3以外)
	
	this.loadDocument = function() {
		
		var dfd = $.Deferred();
		var that = this;
		
		// 從SSO取得WS_ODMSSP網址
		var url = "../odmssp/odmssp.asmx";
		/*if("theSSO" in window && "User" in theSSO) {
			url = theSSO.User.EnvSettings["WS_ODMSSP"];
			console.log("WS_ODMSSP = '" + url + "'");
		}
		url = url.replace(/^http[s]*:\/\/[a-zA-Z0-9\.]*\//, theWebServices.host + "/");   // 取代domain name以避免CORS*/
		if("SSO_CONFIG" in window)	// 2015.1.22 改從SSO_CONFIG取得
			url = SSO_CONFIG.getWSUrl("odmsspws");
		// 呼叫WebService取得下載資訊
		var params = new SOAPClientParameters();
		params.add("argArtifact", window.theUserInfo.Artifact);
		// 1100323 Raymond 1090845 新增argSourceOrgNo參數, 改呼叫GetDocumentInfo2
		params.add("argSourceOrgNo", window.theUserInfo.OrgID)
		params.add("argDocNo", comNo);
		// 1100324 Raymond 1090845 新增argSourceOrgNo參數, 改呼叫GetDocumentInfo2
		//SOAPClient.invoke(url, "GetDocumentInfo", params, true, function(r) {
		SOAPClient.invoke(url, "GetDocumentInfo2", params, true, function(r) {
			console.log(r);
			
			if(r.m_bSuccess) {
				if("m_docToDoList" in r && "childNodes" in r.m_docToDoList) {
					var docObj = {};
					docObj.fileIOWS = $(r.m_docToDoList).find("WEB_SERVICE").text();
					docObj.fileStoragePath = $(r.m_docToDoList).find("STORAGE_PATH").text();
					docObj.fileSubDir = $(r.m_docToDoList).find("SUB_DIR").text();
					// 1140602 Raymond 1140772 修正若子文先設參考公文再併案, 在開啟母文後, 點擊子文頁籤會轉圈圈的問題
					//docObj.docNo = $(r.m_docToDoList).find("DOC_NO").text();
					docObj.docNo = $(r.m_docToDoList).find("> ODWMSG > DOC_NO").text();
					docObj.signType = that.signType;	// 2016.8.23 紙本或線上, 2016.8.31 改用參數傳入
					// 1091021 Raymond 1090564 新增子文支援信保特殊模式, 並修正無get方法導致無法開啟子文問題
					docObj.draftSourceType = $(r.m_docToDoList).find("DRAFT_SOURCE_TYPE").text();
					// 1100323 Raymond 1090845 新增子文取得SYSID, 以支援開啟EDI011功能
					docObj.sysId = $(r.m_docToDoList).find("SYSID").text();
					docObj.get = function(type, name) {
						if(type == "ODWDCM" && name == "DRAFT_SOURCE_TYPE")
							return this.draftSourceType;
						// 1100323 Raymond 1090845 新增子文取得SYSID, 以支援開啟EDI011功能
						if(type == "ODWMSG" && name == "SYSID")
							return this.sysId;
						return "";
					};
					
					(new FolioModel()).init(docObj, {
						readOnly: true,		// 2016.8.23 子文唯讀
						hideODC010: true,	// 2016.8.23 子文隱藏基資
						//onlyFromDoc: that.combineType != "3",	// 1100901 Raymond 1100750 "併辦"子文僅顯示來文內容
						onlyFromDoc: that.combineType == "1",	// 1110823 Raymond 1110725 "併辦"判定改用=="1", 以避免有些子文COM_COMBINE_TYPE為空值, 被誤判為僅顯示來文的併辦子文的問題
						success: function() {
							console.log(this);
							console.log("開啟子文:" + this.getDocNo());
							that.model = this;
							// 1061020 Raymond 1060963 修正第一次點擊子文頁籤時左右翻頁按鈕會多跑一次母文的邏輯, 若出錯則子文會無法翻頁的問題
							if(theAOL.getCurrFolio())
								theAOL.getCurrFolio().closeView();
							// 2016.8.23 FIX子文開啟問題
							that.model.setAsCurr = function() {
								theAOL.getCurrFolio = function() {
									return that.model;
								}
								theAOL.signFolder = that.model.getSignFolder();
							};
							that.model.setAsCurr();
							if("customMgr" in theAOL)
								theAOL.customMgr.onload(that.model);
							
							new FolioView(this, $("#aol #leftPart .viewPort"));
							
							// 1120224 Raymond 1111225 啟用簽核意見窗格功能時, 開啟子文時要重新整理簽核意見窗格
							if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_PANEL") == "Y" && theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") != "Y")
								theAOL.setupComments($("#leftPart #sidePanel #signCmtList"));
							
							dfd.resolve(that);
						},
						error: function(errorText) {
							console.log(errorText);
						}
					});
				}
				else
					dfd.reject();
			}
			else
				dfd.reject();
		});
		
		return dfd.promise();
	}
	
	// 1061023 Raymond 1060282 新增參數由FolioView傳入相關選單元素供點擊子文頁籤第2次時顯示"列印"項目
	//this.refresh = function(target) {
	this.refresh = function(target, btn, screen, list, listbox, holding, closeMenu) {
		var that = this;
		if(typeof that.model !== "undefined") {
			if(that.model != theAOL.getCurrFolio()) {
				if(theAOL.getCurrFolio())	// 2016.8.23 FIX左右翻頁按鈕會bind 2次以上問題
					theAOL.getCurrFolio().closeView();
				
				theAOL.getCurrFolio = function() {
					return that.model;
				}
				theAOL.signFolder = that.model.getSignFolder();
				new FolioView(that.model, target || $("#aol #leftPart .viewPort"));	// 2016.8.23 增加target參數給參照使用
				
				// 1120224 Raymond 1111225 啟用簽核意見窗格功能時, 切換至已開啟的子文時要重新整理簽核意見窗格
				if(!target && theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_PANEL") == "Y" && theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") != "Y")
					theAOL.setupComments($("#leftPart #sidePanel #signCmtList"));
			}
			// 1130503 Raymond 中榮序96 修正啟用「檔案功能」按鈕時, 點擊子文第2次會跳去一個不存在網頁的問題
			//else {	// 1061023 Raymond 1060282 點擊子文頁籤第2次時顯示列印選單
			else if(!!target) {
				var menuItems = [
					{id:"printFolio",	name:"列印簽核文件",	vis:"onPrintFolioVisible",	fn:"onPrintFolio",	icon:"arrow-r",	chkStat: null},
					{id:"edi011",		name:"電子來文檔案明細",vis:"onOpenEDI011Visible",	fn:"onOpenEDI011",	icon:"arrow-r",	chkStat: null}	// 1100324 Raymond 1090845 新增彙併辦子文可開啟EDI011功能
				];
				var fm = that.model;	// 子文的FolioModel
				screen.height( $(document).height() ).removeClass( "ui-screen-hidden" );
				list.empty().filter( ".ui-listview" ).listview( "destroy" );
				
				for(var i=0; i<menuItems.length; i++) {
					var $li = $("<li tabindex='" + i + "'></li>");
					var mi = menuItems[i];
					if(mi.id == "divider") {
						$li.attr("data-role", "divider").attr("data-theme", "b").text(mi.name).appendTo(list);
					}
					else {
						if(typeof mi.vis === "string" && mi.vis.length > 0) {
							if(nsEditor && mi.vis in nsEditor) {
								var vis = false;
								try {
									vis = nsEditor[mi.vis].call(this, fm);	// 2016.9.2 傳入FolioModel參數
								}
								catch(e) {
									theLogger.error(e.message);
								}
								if(vis == true) {
									$li.attr("id", mi.id).attr("data-icon", mi.icon).append("<a>" + mi.name + "</a>").appendTo(list);
									// 2016.11.2 icon設定為check的選單項目要特別處理 for 回閱
									if(mi.icon == "check") {
										$li.find("a").on("click", {fn: mi.fn}, function(event) {
											if(event.data && "fn" in event.data && typeof event.data.fn === "string" && event.data.fn.length > 0) {
												if(nsEditor && event.data.fn in nsEditor) {
													var evt = $.Event("click", {target: event.target});
													evt.data = target || $("#aol #leftPart .viewPort");
													var checked = false;
													if($(this).hasClass("ui-checkbox-on"))
														$(this).addClass("ui-checkbox-off").removeClass("ui-checkbox-on");
													else {
														$(this).addClass("ui-checkbox-on").removeClass("ui-checkbox-off");
														checked = true;
													}
													try {
														nsEditor[event.data.fn].call(this, evt, fm, checked);	// 多傳入checked參數
													}
													catch(e) {
														theLogger.error(e.message);
													}
												}
											}
										});
									}
									else {
										$li.find("a").on("click", {fn: mi.fn}, function(event) {
											if(event.data && "fn" in event.data && typeof event.data.fn === "string" && event.data.fn.length > 0) {
												if(nsEditor && event.data.fn in nsEditor) {
													var evt = $.Event("click", {target: event.target});
													evt.data = target || $("#aol #leftPart .viewPort");
													closeMenu();	// 關閉選單
													try {
														/* 1061023 Raymond 子文不可以儲存吧
														//2017.2.15	Leslie	增加列印前自動儲存功能
														if(event.data.fn == "onPrintFolio"){
															var autoSave = true;
															var autoSaveBeforePrint = theSSO.User.EnvSettings.get('AOL_AUTOSAVE_BEFORE_PRINT');
															var docObj_AOL = theAOL.docObj;
															if ((typeof docObj_AOL.uiParam=='object' && typeof docObj_AOL.uiParam.aol_readonly_mode=='boolean') ||
																	(typeof docObj_AOL.uiParam=='object' && typeof docObj_AOL.uiParam.aol_disable_save=='boolean')){
																
																if (docObj_AOL.uiParam.aol_readonly_mode || docObj_AOL.uiParam.aol_disable_save) {
																	autoSave = false;
																}
															}
															
															if(autoSave && typeof autoSaveBeforePrint != "undefined" && autoSaveBeforePrint == 'Y'){
																//公文狀態為可儲存(非唯讀，非AKI802文稿編輯)時，檢核系統設定是否自動儲存
																//1060825	Leslie[1060515]	增加傳入目前儲存的觸發作業文字"列印"
																//theAOL.doSave().done(function() {
																theAOL.doSave("列印").done(function() {
																	nsEditor[event.data.fn].call(this, evt, fm);	// 2016.9.2 傳入FolioModel參數
																})
																.fail(function(errorText) {
																	alert(errorText);
																});
															}
															else
																nsEditor[event.data.fn].call(this, evt, fm);	// 2016.9.2 傳入FolioModel參數
														}
														else*/
															nsEditor[event.data.fn].call(this, evt, fm);	// 2016.9.2 傳入FolioModel參數
													}
													catch(e) {
														theLogger.error(e.message);
													}
												}
											}
										});
									}
								}
								else if(vis == 2) {	// 2016.12.15 新增要顯示選單項目但Disable
									theLogger.log("選單項目(id:" + mi.id + ")的vis callback function回傳2, 顯示該項目但Disable");
									$li.attr("id", mi.id).attr("data-icon", mi.icon).append("<a class='ui-disabled'>" + mi.name + "</a>").appendTo(list);
								}
								else {
									theLogger.log("選單項目(id:" + mi.id + ")的vis callback function回傳false, 不顯示該項目");
								}
							}
							else {	// 未掛載onXXXVisible callback function在nsEditor
								theLogger.warn("未掛載'" + mi.vis + "'在nsEditor命名空間下, 無法建立選單項目");
								// 2016.5, for DEMO
								//$li.attr("id", mi.id).attr("data-icon", mi.icon).append("<a>" + mi.name + "</a>").appendTo(list);
							}
						}
						else {	// 未定義vis callback function name?
							theLogger.error("未定義選單項目(id:" + mi.id + ")的vis callback function name");
						}
					}
				}
				list.listview();	// 套用選單樣式
				// 2016.11.2 檢核a.ui-icon-check改成ui-check-on/off
				list.find("a.ui-icon-check").each(function(idx, a) {
					$(a).removeClass("ui-btn-icon-right").addClass("ui-btn-icon-left").removeClass("ui-icon-check");
					var cmdid = $(a).parent().attr("id");
					for(var i=0; i<menuItems.length; i++) {
						var mi = menuItems[i];
						if(mi.id == cmdid) {
							if("chkStat" in mi && typeof mi.chkStat === "string" && mi.chkStat.length > 0) {
								if(nsEditor && mi.chkStat in nsEditor) {
									// 1061023 Raymond 1060952 多傳入evt參數給chkStat函式
									var evt = $.Event("click", {target: event.target});
									evt.data = target || $("#aol #leftPart .viewPort");
									try {
										//var b = nsEditor[mi.chkStat].call(a, fm);	// 傳入FolioModel參數
										var b = nsEditor[mi.chkStat].call(a, fm, evt);	// 傳入FolioModel參數, 1061023 Raymond 1060952 多傳入evt參數
										if(b)	// 依據chkStat指定的function回傳值決定初始的核取狀態
											$(a).addClass("ui-checkbox-on");
										else
											$(a).addClass("ui-checkbox-off");
									}
									catch(e) {
										theLogger.error(e.message);
									}
								}
							}
							break;
						}
					}
				});
				var t = $(btn).offset().top,
					l = $(btn).offset().left;
				listbox.removeClass("ui-selectmenu-hidden").css({left: (l+60)+"px", top: 0+"px", maxWidth: "200px"});
				holding = true;
			}
		}
		else
			theLogger.error("子文未載入! 無法設定為目前公文");
	}
};

// ConFolio - 分會公文處理
//

// 1091021 Raymond 1090564 新增分會會畢單位公文的strDraftSourceType參數
//function ConFolio(conOu, fileIOWS, docNo) {
function ConFolio(conOu, fileIOWS, docNo, strDraftSourceType) {
	
	this.conOu = conOu; // 分會單位
	this.fileIOWS = fileIOWS;
	this.docNo = docNo;
	// 1091021 Raymond 1090564 新增記錄分會會畢單位公文的strDraftSourceType參數
	this.strDraftSourceType = strDraftSourceType;
	
	this.loadDocument = function() {
		
		var dfd = $.Deferred();
		var that = this;
		
		var docObj = {};
		docObj.fileIOWS = this.fileIOWS;
		docObj.fileStoragePath = this.conOu.DocPath;
		docObj.fileSubDir = "";
		docObj.docNo = this.docNo;
		docObj.signType = "E";
		// 1091021 Raymond 1090564 新增分會會畢單位公文支援信保特殊模式, 並修正無get方法導致無法開啟分會會畢公文問題
		docObj.get = function(type, name) {
			if(type == "ODWDCM" && name == "DRAFT_SOURCE_TYPE")
				return that.strDraftSourceType;
			return "";
		};
		
		(new FolioModel()).init(docObj, {
			readOnly: true,		// 唯讀
			hideODC010: true,	// 隱藏基資
			success: function() {
				console.log(this);
				console.log("開啟分會公文:" + this.getDocNo());
				that.model = this;
				// 2016.8.23 FIX子文開啟問題
				that.model.setAsCurr = function() {
					theAOL.getCurrFolio = function() {
						return that.model;
					}
					theAOL.signFolder = that.model.getSignFolder();
				};
				that.model.setAsCurr();
				if("customMgr" in theAOL)
					theAOL.customMgr.onload(that.model);
				
				new FolioView(this, $("#aol #leftPart .viewPort"));
				
				// 1120224 Raymond 1111225 啟用簽核意見窗格功能時, 開啟分會公文時要重新整理簽核意見窗格
				if(theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_PANEL") == "Y" && theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") != "Y")
					theAOL.setupComments($("#leftPart #sidePanel #signCmtList"));
				
				dfd.resolve(that);
			},
			error: function(errorText) {
				console.log(errorText);
				dfd.reject(errorText);
			}
		});
		
		return dfd.promise();
	}
	
	this.refresh = function(target) {
		var that = this;
		if(typeof that.model !== "undefined") {
			if(that.model != theAOL.getCurrFolio()) {
				if(theAOL.getCurrFolio())	// 2016.8.23 FIX左右翻頁按鈕會bind 2次以上問題
					theAOL.getCurrFolio().closeView();
				
				theAOL.getCurrFolio = function() {
					return that.model;
				}
				theAOL.signFolder = that.model.getSignFolder();
				new FolioView(that.model, target || $("#aol #leftPart .viewPort"));	// 2016.8.23 增加target參數給參照使用
				
				// 1120224 Raymond 1111225 啟用簽核意見窗格功能時, 切換至已開啟的分會公文時要重新整理簽核意見窗格
				if(!target && theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_PANEL") == "Y" && theSSO.User.EnvSettings.get("AOL_ENABLE_SIGNCOMMENT_BY_DRAFT") != "Y")
					theAOL.setupComments($("#leftPart #sidePanel #signCmtList"));
			}
		}
		else
			theLogger.error("分會公文未載入! 無法設定為目前公文");
	}
};

function initConFolio(orgNo, docNo) {
	
	var dfd = $.Deferred();
	var that = this;
	
	var url = SSO_CONFIG.getWSUrl("odmsspws");
	// 呼叫WebService取得下載資訊
	var params = new SOAPClientParameters();
	params.add("argArtifact", localStorage['Artifact']);
	params.add("argOrgNo", orgNo);
	params.add("argDocNo", docNo);
	SOAPClient.invoke(url, "GetThreadFlowInfo", params, true, function(r) {
		theLogger.log("GetThreadFlowInfo returns:");
		console.log(r);
		
		if(r.m_bSuccess) {
			// 1091021 Raymond 1090564 新增回傳分會會畢單位公文新增的strDraftSourceType參數
			//dfd.resolve(r.ThreadOuObj);
			dfd.resolve(r.ThreadOuObj, r.strDraftSourceType);
		}
		else {
			// 1060621 Raymond 1060538 NoThreadOK -> NoThreadOk
			// 1060414 Raymond 1050910 ErrMsg有"NoThreadOK"字眼表示非錯誤, 只是尚未有任何會畢資訊
			//if(r.m_strErrMsg.indexOf("NoThreadOK") >= 0)
			if(r.m_strErrMsg.indexOf("NoThreadOk") >= 0) {
				// 1091021 Raymond 1090564 新增回傳分會會畢單位公文新增的strDraftSourceType參數
				//dfd.resolve([]);
				dfd.resolve([], r.strDraftSourceType);
			}
			else
				dfd.reject(r.m_strErrMsg);
		}
	});
	return dfd.promise();
};


(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-CompoundFolio.js").finish();
})();