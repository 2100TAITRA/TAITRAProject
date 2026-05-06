/* jshint -W100 */

/*
DATE	MGRNO		SA		PG		Desc
1050819	   		    Eric	Eric	Create, 實作獨立分頁檢閱公文功能(內嵌AOL/UniView)
1060925 1060812		Eric	Eric    提供theSSO.User.EnvSettings/SystemSets物件. (獨立頁面開啟時編輯文稿無法開啟設定子視窗問題)
1080927 1080339     Kevin   Eric    jQuery 3.0 upgrade. ($.type => SSOUtil.typeOf)
1090227	1080751		Raymond	Raymond	合併內政部1070381調閱線上簽核公文新增unv_obj參數\
1100519 1100093     Eric    Eric    merge: 2020.12.30 - 1090821, 支援外機關陳核會稿公文
1110110	1101352		Leslie	Leslie	於切換角色後，增加紀錄角色索引供ViewDoc子視窗取用，以避免多機關架構的子機關，用到母機關單位代碼(預設角色)時會出現異常
1110328 1100287		Leslie	Leslie	Merge[1070359]	歷史公文之來文及簽辦文稿內容
1110331 1110164		Raymond	Raymond	弱掃修正, 原本宣告在RD-ViewDoc.html的<script>程式碼, 移至JS宣告
1111128	1110920		Leslie	Leslie	增加載入Custom客製化設定
1120613	詮敘部序338	Raymond	Raymond	修正用AKI800文稿編輯開啟的DocView子視窗, 加入受文者會發生錯誤, 導致無法新增受文者的問題
1120828	1120750		Leslie	Leslie	配合組改，增加初始化機關代碼對照表
1121121	1120941		David	David	getDocumentInfo()新增紀錄公文裁撤機關代碼資訊，供調閱及AKI802文稿編輯可套用裁撤機關樣板顯示稿面
1131017	中榮序232	Leslie	Leslie	新增AKT116待點收多文瀏覽模式
1131024	1130285		Leslie	Leslie	修正考試院客製化UI，調整線上簽核「公文基資」至排序末端，以避免程式互動異常
1131206	1130847		David	Leslie	增修調閱要用到的COM_NO、REF_DOC
1140930	中榮序258	Raymond	Raymond	新增調閱要用到的ODWMSG.SYSID欄位
1141003 1141264     Leslie  Leslie  修正叫用WebService後的異常處理
*/


/* 獨立檢閱公文/來文內容分頁, 內嵌AOL/UniView */
(function($){
	//1111128	Leslie[1110920]	宣告當前為ViewDoc
	sessionStorage.viewDoc = true;
	
	// 1110331 Raymond 1110164 弱掃修正, 原本宣告在RD-ViewDoc.html的<script>程式碼, 移至JS宣告
	// 2019.12.19 - 1081132 Eric, quick-fix for [REAL] Mac support!
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

		if ('realMac' in localStorage && localStorage['realMac'].length) {
			return _isValueTrue(localStorage.realMac);
		}
		return false;
	}
	let _realMac = _isRealMac();
	if (_realMac) {
		window.realMac = true;
	}
	else {
		window.realMac = false;
	}
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
	_devMode = false;
	if (typeof theLogger == 'undefined' && typeof console !== 'undefined') {
		window.theLogger = console;
	}
	if (typeof theSSO !=='object') {
		window.theSSO = {};
	}
	// 以SSO_CONFIG內的WS_URLs設定WebServices網址
	theWebServices.url(SSO_CONFIG.WS_URLs);
	
    /* 不 include 相關模組, 直接加入函式實作 */
    if (typeof theWebServices.authws !== 'object') {
		theWebServices.authws = {
            getActiveRole : function(artifact, options){
			    var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
			    var params = new SOAPClientParameters(), res;
			    params.add("argArtifact",artifact);
			    SOAPClient.invoke(wsUrl, "GetActiveRole", params, false,
                    function(r) {
                        //theLogger.log(r);
                        if (typeof r == 'object') {
                            if (r.length==3) {
                                res = {
                                    success: true,
                                    roleId: r[0],
                                    ouId: r[1],
                                    orgNo: r[2],
                                };
                            }
                        }
                        else {
                            res = {success:false, errMsg:'叫用AuthWS.getActiveRole發生錯誤!'};
                            throw new Error('叫用AuthWS.getActiveRole發生錯誤!');
                        }
                    });
			    return res;
			},
        };
    }
    
    /* 不 include 相關模組, 直接加入函式實作 */
    if (typeof theWebServices.SAMLWS !== 'object') {
        // 2013.3.4 - 實作 SAMLWS proxy
		theWebServices.SAMLWS = {
			/* 取得使用者Profile */
            getUserInfo : function(artifact, options) {
				var _dfd = $.Deferred();
				
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('samlws');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-E- SAMLWS.getUserInfo was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('SAMLWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
                
				var async = false;
				if (options && (typeof options.async !=='undefined') && (options.async===true)) {
					async = true;
                }
                
                var params = new SOAPClientParameters();
                params.add("argArtifact", artifact);
                
                // SOAPClient.invoke() params:
                //   url, method name, method parameter values,
                //   call mode (async=true, sync=false), callback method
                SOAPClient.invoke(wsUrl, 'GetUserInfo', params, async,
                                  function(r) {
                                    theLogger.log('-I- SAMLWS.getUserInfo returns:');
                                    theLogger.log(r);
                                    if (typeof r !== 'object') {
                                        _dfd.reject({errMsg:'回傳之UserInfo內容異常!'});
                                    }
									else {
										_dfd.resolve(r);
									}
                                  });
                return _dfd.promise();
            },
            /* 2017.9.19 - 1060812
			 * 取得行動平台簽核的使用者Profile
			 */
            getUserInfoForPad : function(artifact, options) {
				var _dfd = $.Deferred();
				
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('samlws');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-E- SAMLWS.getUserInfoForPad was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('SAMLWS尚未設定服務網址URL'));
					return _dfd.promise();
                }

                //1141003 Leslie[1141264]  修正叫用WebService後的異常處理
                var wsFuncName = 'GetUserInfoForPadbyJSON';
                
				var async = false;
				if (options && (typeof options.async !=='undefined') && (options.async===true)) {
					async = true;
                }
                
                var params = new SOAPClientParameters();
                params.add("argArtifact", artifact);
                
                // SOAPClient.invoke() params:
                //   url, method name, method parameter values,
				//1120828	Leslie	配合組改，增加初始化機關代碼對照表，一併改用JSON函式
                /*SOAPClient.invoke(wsUrl, 'GetUserInfoForPad', params, async,
                                  function(r) {
                                    theLogger.log('-I- SAMLWS.getUserInfoForPad returns:');
                                    theLogger.log(r);
                                    if (typeof r !== 'object') {
                                        _dfd.reject({errMsg:'回傳之UserInfo內容異常!'});
                                    }
									else {
										_dfd.resolve(r);
									}
                                  });*/
                SOAPClient.invokeJSON(wsUrl, 'GetUserInfoForPadbyJSON', params, async,
					function (rslt) {
						if (typeof rslt === 'object' && typeof rslt.value=='string') {
							if (rslt.value.length) {
								var rsltObj = JSON.parse(rslt.value);

								if (typeof rsltObj=='object' && rsltObj!==null && typeof rsltObj.AD_Account=='object') {
									_dfd.resolve({success:true, userInfo: rsltObj});
								}
								else {
									_dfd.reject(new Error('叫用SAMLWS.' + wsFuncName + '時發生錯誤! ErrMsg=回傳之JSON字串轉換為物件作業失敗!'));
								}
							}
							else {
								if (typeof rslt.m_strErrMsg=='string' &&  rslt.m_strErrMsg.length) {
									_dfd.reject(new Error('叫用SAMLWS.' + wsFuncName + '時發生錯誤! ErrMsg=' + rslt.m_strErrMsg));
								}
								else {
									_dfd.reject(new Error('叫用SAMLWS.' + wsFuncName + ' 時發生錯誤! [回傳空字串]'));
								}
							}                                          
						}
						else {
							if (rslt.error && typeof rslt.responseText=='string' && rslt.responseText.length) {
								_dfd.reject(new Error('叫用SAMLWS.' + wsFuncName + ' 時發生錯誤! ErrMsg=' + rslt.responseText));
							}
							else {
								_dfd.reject(new Error('叫用SAMLWS.' + wsFuncName + ' 時發生錯誤!'));
							}
						}
                                  });
                return _dfd.promise();
            }
        };
    }
    
    /*
	 * 分析ODMSSP.GetUserInfo的回傳內容
	 */
	function _parseUserInfo(SAMLart, rslt) {
		var _dfd = $.Deferred();
        
		if (typeof rslt === 'object') {
			theSSO._dbgAlert('gonna SSOUtil.parseUserInfo() ...');
			
			// parser user info into theSSO.User object
            if (!!window.theSSO) {
                window.theSSO.RawUser = rslt;
            }
            
            if (!window.theSSO.User) {
                _dfd.reject(new Error('@mLogin.js:_parseUserInfo(), window.theSSO.User is invalid!'));
                return _dfd.promise();
            }
				
			// parse user data (個人基資)
			//1120828	Leslie[1120750]	改用JSON格式物件
			//SSOUtil.parseUserInfo(window.theSSO.User, rslt);
			SSOUtil.parseUserInfo2(window.theSSO.User, rslt);
			
			theSSO._dbgAlert('gonna SSOUtil.parsePlayRoles() ...');
			
			// parse play roles
			if (!window.theSSO.User.PlayRoles) {
				window.theSSO.User.PlayRoles = [];
			}
			//1120828	Leslie[1120750]	改用JSON格式物件
			// SSOUtil.parsePlayRoles(window.theSSO.User.PlayRoles, rslt);
			SSOUtil.parsePlayRoles2(window.theSSO.User.PlayRoles, rslt);
			
			// parse linked cert(s) [2015.2]
			if (!window.theSSO.User.Certs) {
				window.theSSO.User.Certs = [];
			}
			//1120828	Leslie[1120750]	改用JSON格式物件
			// SSOUtil.parseUserCerts(window.theSSO.User.Certs, rslt);
			SSOUtil.parseUserCerts2(window.theSSO.User.Certs, rslt);
			
			theSSO._dbgAlert('gonna SSOUtil.initSystemSettings() ...');
			
			// parse EnvSets
			if (!window.theSSO.User.EnvSettings) {
				theLogger.error('-ERR- theSSO.User.EnvSettings not defined...');
			}
			else {
				//1120828	Leslie[1120750]	改用JSON格式物件
				// SSOUtil.initSystemSettings(window.theSSO.User.EnvSettings, window.theSSO.User.SystemSets, rslt);
				SSOUtil.initSystemSettings2(window.theSSO.User.EnvSettings, window.theSSO.User.SystemSets, rslt);
			}
			
			//1120828	Leslie[1120750]	配合組改，增加初始化機關代碼對照表
			SSOUtil.initOrgMap(window.theSSO.OrgMap, rslt);
		}
	
		theSSO.User.activeRoleIndex = 0;
		//1110110	Leslie[1101352]	切換角色後，增加紀錄角色索引供ViewDoc子視窗取用
		if(typeof localStorage.activeRoleIndex === 'string' && !isNaN(parseInt(localStorage.activeRoleIndex))){
			theSSO.User.activeRoleIndex = parseInt(localStorage.activeRoleIndex);
		}
		
		theLogger.log('EOF _parseUserInfo().');
			
		_dfd.resolve();
		return _dfd.promise();
	}
    
    function _openDocWithAOL(SAMLart, docObj, trigger, extraOption) {
		if (typeof trigger!=='string' || trigger.length===0) {
			trigger = 'todolist';
		}
		
        $.mobile.loading('show');
        
		theWebServices.SAMLWS.getUserInfoForPad(SAMLart) // 2017.9.25 - Eric Peng, 1060812
        .then(function(rslt) {
			//1120828	Leslie[1120750]	一併改用JSON函式
            // return _parseUserInfo(SAMLart, rslt);
            return _parseUserInfo(SAMLart, rslt.userInfo);
        })
        .then(function() {
            /* 暫時給ActiveRole的OUId */
            /* 2021.5 - 1100093 Eric, merge: 2020.12.30 - 1090821, 支援外機關陳核會稿公文*/
            if (typeof docObj.ODWMSG=='undefined') {
                docObj.ODWMSG = {
                    OWN_OU_ID: theSSO.User.PlayRoles[theSSO.User.activeRoleIndex].unitNo,
                };
            }
            else {
                docObj.ODWMSG.OWN_OU_ID = theSSO.User.PlayRoles[theSSO.User.activeRoleIndex].unitNo;
            }
			// 1120613 Raymond 詮敘部現場序338 修正用AKI800文稿編輯開啟的DocView子視窗, 加入受文者會發生錯誤, 導致無法新增受文者的問題
			// docObj無ownOUId情況下getUserInfo的theUserInfo會沒有DepartID, SOAPClientParameters在欄位內容是undefined時, toJSON方法不會組出該欄位, 會導致呼叫GetOrgInfo4ADWithDLKey失敗
			if(!("ownOUId" in docObj))
				docObj.ownOUId = docObj.ODWMSG.OWN_OU_ID;
            
            var sDocObj = JSON.stringify(docObj);
            localStorage.working_doc_obj = sDocObj;
            
            
            /* 嵌入AOL模組後開啟公文 */    
            return SSOUtil.injectHTMLModule('RD-AOL.html', $('#aol'));
        })
        .then(function(rslt) {

			//1131024	Leslie[1130285]	修正考試院客製化UI，調整線上簽核「公文基資」至排序末端，以避免程式互動異常
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
            $('#aol').show();
            
            $.mobile.loading('hide');
        })
        .fail(function(rslt){
            theLogger.log('-E- invoke SSOUtil.injectHTMLModule("RD-AOL.html", ...) failed');
            $.mobile.loading('hide');
            //1141003 Leslie[1141264]  修正叫用WebService後的異常處理
            theLogger.error(rslt);
            alert(`開啟DocView模組時發生異常[${rslt.message}]，請截取當前畫面並關閉視窗再試一次，若仍無法正常開啟，請通知系統管理員以協助收集相應異常紀錄。`)
        });
	}
	window.openDocWithAOL = _openDocWithAOL; // 2016.7
    
     // 取網址參數SAMLart為Artifact
    var parameter = window.location.search;
    var params = SSOUtil.parseUrlParam(parameter);
    
    var SAMLart = params.Artifact;
    var docId = params.DocId;
    var signType = params.SignType;
    
    if (typeof window.viewDocInfo == 'undefined') {
        window.viewDocInfo = null;
    }
    
    window.model = {
        viewModule: '',
        SAMLart: SAMLart,
        docId: docId,
        signType: signType,
    };
    
    // 2019.5.24 - Eric, 1080363 bug-fix, theSSO物件可能已定義, 故改為逐層檢核!
    if (typeof window.theSSO !== 'object') {
        window.theSSO = {};
    }

    if (typeof window.theSSO.User!='object') {
        window.theSSO.User = {};
    }

    if (typeof window.theSSO.Artifact!='string' || window.theSSO.Artifact.length===0) {
        window.theSSO.Artifact = SAMLart; // 2019.4.23 - 1080363, Eric-新增for AKI802開啟AOL另存範本時使用
    }
	
	//1131017	Leslie[中榮序232]	新增AKT116待點收多文瀏覽模式
	function _initDocList(docList, $divUl, onSelect){
		let arDoc = [...docList]

		for(var doc of arDoc){
			$("<li data-theme='c' class='list' data-icon='false'><a></a></li>").appendTo($divUl).find("a")
			.attr('title', doc.DocNo)
			.text(doc.DocNo)
			.data('unvDoc',doc)
			.on('click', function(event){
				event.preventDefault();
				
				$divUl.find("a").removeClass("ui-btn-active");
				$(this).addClass("ui-btn-active");
				if($.isFunction(onSelect))
					onSelect($(this).data('unvDoc'));	//開啟選取公文
			})
		}
		
	}
	
	function _prepareOpenDocAOL(_doc, _histroyDocFilePath = ''){
		var _docNo = _doc.DocNo;
		var _sourceOrgNo = _doc.SourceOrgNo;
		 theWebServices.odmssp.getDocumentInfo(model.SAMLart, _docNo, _sourceOrgNo)
		.done(function(rslt) {
			/*rslt.rtnODWMSG = { docNo, wsdl, storagePath, subDir};*/
			var _docObj = {
				msgId: '-1', // 已歸檔公文/AKI800調閱公文沒有msgId	//2016.11.14	Leslie	 來文未辦理前，僅有來文的流程點為"0"，故設為0會造成程式判斷略過來文內容，改為-1
				sourceOrgNo: _doc.SourceOrgNo,
				docNo: _doc.DocNo,
				subject: _doc.Subject,
				fileIOWS: rslt.rtnODWMSG.wsdl,
				// 1110328 Leslie[1100287]	Merge[1070359]	歷史公文之來文及簽辦文稿內容
				//fileStoragePath: rslt.rtnODWMSG.storagePath,
				fileStoragePath: _histroyDocFilePath.length?_histroyDocFilePath:rslt.rtnODWMSG.storagePath,
				// 1110602 Leslie[1110371]	交通部特有狀況，模式是歷史公文，但ODMSSP會取得有SUB_DIR(需棄用)
				//fileSubDir: rslt.rtnODWMSG.subDir,
				fileSubDir: _histroyDocFilePath.length?'':rslt.rtnODWMSG.subDir,
				signType: viewDocInfo.signType,
				//2019.7 - ToDo: [內政部已實作] 補齊_docOjb.ODWMSG, 須與一般todolist公文行為一致, 但可能缺少部份欄位!

				/* 2021.5 - 1100093 Eric, merge: 2020.12.30 - 1090821, 支援外機關陳核會稿公文*/
				/* 唯讀開啟, 給第一個角色的UnitNo [AOL模組載入設定/資源檔要用] */
				ODWMSG : {
					COME_OTHERS: rslt.rtnODWMSG.comeOthers,
					ORGNO_OTHERS: rslt.rtnODWMSG.orgNoOthers,
					SOURCE_ORG_NO: rslt.rtnODWMSG.sourceOrgNo
					,DISSOLVE_ORG_NO: rslt.rtnODWMSG.DissolveOrgNo //1121121 David 1120941 記錄裁撤機關代碼
					,DOC_NO: rslt.rtnODWMSG.docNo //1131104	Leslie[序322]	修正彙併辦公文於調閱模式，出現重覆母文的問題
					,SYSID: rslt.rtnODWMSG.sysId	// 1140930 Raymond 中榮序258 新增調閱要用到的SYSID
				},
			};

			// 2020.10.13 - 1090564, for SMEGWebDoc
			if (typeof rslt.rtnODWMSG.draftSourceType=='string' && rslt.rtnODWMSG.draftSourceType.length) {
				_docObj.ODWDCM = {
					DRAFT_SOURCE_TYPE: rslt.rtnODWMSG.draftSourceType
				}  ;     
			}
			
			//1131206	Leslie[1130847]	增修調閱要用到的COM_NO、REF_DOC
			if (typeof _docObj.ODWDCM == 'undefined')
				_docObj.ODWDCM = {};
			_docObj.ODWDCM["COM_NO"] = rslt.rtnODWMSG.comNo;
			_docObj.ODWDCM["REF_DOC"] = rslt.rtnODWMSG.refDoc;

			/* 設定線上簽核唯讀(@localStorage.aol_readonly_mode)
			   設定線上簽核基資頁(不顯示/AKI802/ODC010, @localStorage.aol_disable_odc010)
			   localStorage.aol_disable_save, localStorage.aol_disable_odc010
			 */
			var extraOption = {
				aol_readonly_mode: viewDocInfo.readOnlyMode,
				aol_disable_odc010: true,
				aol_disable_save: viewDocInfo.disableSave,  // 2016.9.13 - add for 文稿編輯可編輯,不可儲存.
				unv_obj: viewDocInfo.UNVObj		/* 1090227 Raymond 1080751 合併內政部1070381 線上簽核公文開啟多傳入UNV檔物件 [尚未完成] */
			};
				
			window.openDocWithAOL(model.SAMLart, _docObj, '', extraOption);
		})
		.fail(function(e){
			theLogger.error('ERROR! invoke ODMSSP.getDocumentInfo() failed.');
		});
	}
    
    $(document).on('pagecreate', '#viewDoc', function(event) {
        if ($(event.target).attr('id')!=='viewDoc') {
            return false;
        }
        
		//1111128	Leslie[1110920]	支援客製化設定
		theModMgr.include("Lib/Custom_" + SSO_CONFIG.OrgNickName + ".js");
		
        SSOUtil.loading('show');
        
        if (_devMode) {
            if (typeof model.SAMLart !== 'string' || model.SAMLart.length===0) {
                model.SAMLart = localStorage.Artifact;
            }
            if (typeof model.docId!=='string' || model.docId.length===0) {
                model.docId = 'testdoc';
            }
        }
        
        if (typeof model.SAMLart!=='string' || model.SAMLart.length===0 ||
            typeof model.docId!=='string' || model.docId.length===0) {
            alert('參數異常, Artifact/DocId未設定或為空字串');
            window.close();
            SSOUtil.loading('hide');
            return;
        }
        
        var sViewDocInfo = localStorage['viewDoc_out_' + model.docId];
        if (typeof sViewDocInfo !== 'string' && _devMode) {
            sViewDocInfo = localStorage.viewDoc_out_testdoc;
        }
        
        if (typeof sViewDocInfo !== 'string' || sViewDocInfo.length===0) {
            alert('viewDocInfo內容異常! [read from localStorage failed!]');
            window.close();
            return;
        }
        
        var _viewDocInfo = JSON.parse(sViewDocInfo);
        if (_viewDocInfo===null) {
            alert('viewDocInfo內容異常, 無法開啟! [parse to JSON]');
            window.close();
            return;
        }

		// 1110328 Leslie[1100287]	Merge[1070359]	歷史公文之來文及簽辦文稿內容        
        let _histroyDocFilePath = ''; // 歷史公文

        // 2018.6.12 - 1070359 內政部歷史公文開啟. (非2100公文系統產出)
        if (typeof _viewDocInfo.UNVObj=='object' && _viewDocInfo.UNVObj!==null) {
            let _UNVObj = _viewDocInfo.UNVObj;
            let doc=null, _testDoc=false;
            if ($.type(_UNVObj.UnvRoot.Doc)=='array' && _UNVObj.UnvRoot.Doc.length) {
                doc = _UNVObj.UnvRoot.Doc[0];
            }
            else {
                doc = _UNVObj.UnvRoot.Doc;
            }
            // 1. 取出所有ATT.Type='8'項目(歷史公文DI), 將其置換為一個AOL項目.
            // 2. 其它項目
            let mainAttArr=[], historyAttArr=[], extraPDocAtt=null;
            if ($.type(doc.Att)=='array' && doc.Att.length>1) {
                let i=0;
                for(i=0; i<doc.Att.length; i++) {
                    let _att = doc.Att[i];
                    if (_att.Type==='8') {
                        historyAttArr.push(_att);
                    }
                    else {
                        mainAttArr.push(_att);
                    }
                }
            }
            else if (typeof _viewDocInfo.HistoryDoc=='boolean' && _viewDocInfo.HistoryDoc && typeof doc.Att.File.FilePath=='string') { // 歷史公文
                _histroyDocFilePath = doc.Att.File.FilePath;
            }

            if (historyAttArr.length) {
                extraPDocAtt = {
                    Type: '99', // 歷史公文一律給'99', 另以RD-ViewDoc.html內嵌AOL開啟
                    Alias: '"來文及文稿檔', 
                    PrintEnable: 'TRUE',
                    File: {
                            Pages: '1', 
                            FileName: doc.DocNo + '-X.XML',
                            FilePath: historyAttArr[0].File.FilePath,
                            WSDL: historyAttArr[0].File.WSDL
                        },
                    Group: {GrpName:'來文附件檔-1', StartPO: '0'}
                };

                if (_testDoc){
                    extraPDocAtt.File.FileName = '1010111942-X.XML';
                    extraPDocAtt.testDocNo = '1010111942';
                }

                mainAttArr.push(extraPDocAtt);
                _UNVObj.UnvRoot.Doc.Att = mainAttArr;
            }
			
			//1131017	Leslie[中榮序232]	AKT116新增支援多文瀏覽模式
			if(_viewDocInfo.docInfoPage == 'AKS116' && ($.type(_UNVObj.UnvRoot.Doc)=='array' && _UNVObj.UnvRoot.Doc.length)){
				$('#viewDoc').addClass('mutliDoc');	//啟用多文瀏覽模式UI
				_initDocList(_UNVObj.UnvRoot.Doc, $('#docContent #divUl'), _prepareOpenDocAOL);	
				$('#docContent #divUl').listview("refresh").enhanceWithin();			
				$('#docContent').show();
				$('#docContent #divUl').find('a').eq(0).addClass("ui-btn-active");
			}
        }
        // 1110328 Leslie[1100287]	Merge[1070359]	歷史公文之來文及簽辦文稿內容	==END==
        
        window.viewDocInfo = _viewDocInfo;
        viewModule = viewDocInfo.openDocModule;
        
        if (viewModule=='AOL') {
            // 線上簽核UNV檔只記錄DocNo/SourceOrgNo, 須自行查詢電子檔存放路徑(ODMSSP.GetDocumentInfo2)
            model.viewModule = 'AOL';
            
            var _doc=null;
            if (SSOUtil.typeOf(viewDocInfo.UNVObj.UnvRoot.Doc)=='array') {
                _doc = viewDocInfo.UNVObj.UnvRoot.Doc[0];
            }
            else {
                _doc = viewDocInfo.UNVObj.UnvRoot.Doc;
            }
            
            if (_doc===null) {
                theLogger.error('ERROR! viewDocInfo.UNVObj cann\'t find Doc obj');
                alert('UNV內沒有DOC資訊!');
                return;
            }
			
			//1131017	Leslie[中榮序232]	改為叫用共用函式            
            // var _docNo = _doc.DocNo;
            // var _sourceOrgNo = _doc.SourceOrgNo;
             // theWebServices.odmssp.getDocumentInfo(model.SAMLart, _docNo, _sourceOrgNo)
            // .done(function(rslt) {
                // /*rslt.rtnODWMSG = { docNo, wsdl, storagePath, subDir};*/
                // var _docObj = {
                    // msgId: '-1', // 已歸檔公文/AKI800調閱公文沒有msgId	//2016.11.14	Leslie	 來文未辦理前，僅有來文的流程點為"0"，故設為0會造成程式判斷略過來文內容，改為-1
                    // sourceOrgNo: _doc.SourceOrgNo,
                    // docNo: _doc.DocNo,
                    // subject: _doc.Subject,
                    // fileIOWS: rslt.rtnODWMSG.wsdl,
                    // // 1110328 Leslie[1100287]	Merge[1070359]	歷史公文之來文及簽辦文稿內容
                    // //fileStoragePath: rslt.rtnODWMSG.storagePath,
                    // fileStoragePath: _histroyDocFilePath.length?_histroyDocFilePath:rslt.rtnODWMSG.storagePath,
					// // 1110602 Leslie[1110371]	交通部特有狀況，模式是歷史公文，但ODMSSP會取得有SUB_DIR(需棄用)
                    // //fileSubDir: rslt.rtnODWMSG.subDir,
					// fileSubDir: _histroyDocFilePath.length?'':rslt.rtnODWMSG.subDir,
                    // signType: viewDocInfo.signType,
                    // //2019.7 - ToDo: [內政部已實作] 補齊_docOjb.ODWMSG, 須與一般todolist公文行為一致, 但可能缺少部份欄位!

                    // /* 2021.5 - 1100093 Eric, merge: 2020.12.30 - 1090821, 支援外機關陳核會稿公文*/
                    // /* 唯讀開啟, 給第一個角色的UnitNo [AOL模組載入設定/資源檔要用] */
                    // ODWMSG : {
                        // COME_OTHERS: rslt.rtnODWMSG.comeOthers,
                        // ORGNO_OTHERS: rslt.rtnODWMSG.orgNoOthers,
                        // SOURCE_ORG_NO: rslt.rtnODWMSG.sourceOrgNo
						// ,DISSOLVE_ORG_NO: rslt.rtnODWMSG.DissolveOrgNo //1121121 David 1120941 記錄裁撤機關代碼
                    // },
                // };

                // // 2020.10.13 - 1090564, for SMEGWebDoc
                // if (typeof rslt.rtnODWMSG.draftSourceType=='string' && rslt.rtnODWMSG.draftSourceType.length) {
                    // _docObj.ODWDCM = {
                        // DRAFT_SOURCE_TYPE: rslt.rtnODWMSG.draftSourceType
                    // }  ;     
                // }

                // /* 設定線上簽核唯讀(@localStorage.aol_readonly_mode)
                   // 設定線上簽核基資頁(不顯示/AKI802/ODC010, @localStorage.aol_disable_odc010)
                   // localStorage.aol_disable_save, localStorage.aol_disable_odc010
                 // */
                // var extraOption = {
                    // aol_readonly_mode: viewDocInfo.readOnlyMode,
                    // aol_disable_odc010: true,
                    // aol_disable_save: viewDocInfo.disableSave,  // 2016.9.13 - add for 文稿編輯可編輯,不可儲存.
                    // unv_obj: viewDocInfo.UNVObj		/* 1090227 Raymond 1080751 合併內政部1070381 線上簽核公文開啟多傳入UNV檔物件 [尚未完成] */
                // };
                    
                // window.openDocWithAOL(model.SAMLart, _docObj, '', extraOption);
            // })
            // .fail(function(e){
                // theLogger.error('ERROR! invoke ODMSSP.getDocumentInfo() failed.');
            // });
			
			_prepareOpenDocAOL(_doc, _histroyDocFilePath);	//以UniView.Doc開啟公文
        }
        else if (viewModule=='UniView') {
            model.viewModule = 'UniView';
            
            // wrapper UNVObj functions
            viewDocInfo.UNVObj = new UNVObj(viewDocInfo.UNVObj);
            
            var $uniView = $('#uniView');
            var $uniViewContent = $uniView.find('#uvMainContent');
            if ($uniViewContent.length===0) {
                $.mobile.loading('show');
                
                //SSOUtil.injectHTMLModule('RD-UniView.html', $('#mainContent #uniView'))
                SSOUtil.injectHTMLModule('RD-UniView.html', $('#uniView'))
                .then(function(rslt) {
                    $('#uniView').trigger('sso:moduleinit', [{}]); // 2016.6 - 觸發aol:moduleinit
                    $('#uniView').enhanceWithin();
                    /* 2016.6.15 - 暫時先觸發pagecreate, 等UniView調整完後改觸發sso:modulecreate */
                    $('#uniView').trigger('pagecreate', [{mode:'out', signType:'P', docId: model.docId}]);
                    //$('#aol').trigger('sso:modulecreate', [{}]); 

                    $('#uniView').show();

                    // 2017.9.25 - Eric Peng 1060812, 提供theSSO.User.EnvSettings/SystemSets object
                    var _dfdIn = $.Deferred();
                    theWebServices.SAMLWS.getUserInfoForPad(model.SAMLart)
                    .then(function(rslt) {
						//1120828	Leslie[1120750]	一併改用JSON函式
                        // var pm2 = _parseUserInfo(SAMLart, rslt);
                        var pm2 = _parseUserInfo(SAMLart, rslt.userInfo);
                        pm2.done(function(rslt) {
                            _dfdIn.resolve(rslt);
                        })
                        .fail(function(rslt){
                            _dfdIn.reject({success:false, _errMsg:'叫用parseUserInfo失敗.'});
                        });
                    })
                    .fail(function(errRslt){
                        _dfdIn.reject(errRslt);
                    });
                    return _dfdIn.promise();
                })
                .then(function(rslt) {
                    //$('#uniView').trigger('pageshow');
                    if (typeof window.theUniView!=='object') {
                        window.theUniView = new UniView(model.SAMLart, model.docId, true, '#uniView .uvViewPort');
                        if (typeof window.theUniView=='object' && window.theUniView!==null) {
                            // 2017.8.25 - 1060741, 將artifact儲存至localStorage
                            localStorage.Artifact = model.SAMLart;

                            theUniView.init(model.SAMLart, model.docId, true)
                            .done(function(rslt){
                                if (typeof theUniView=='object') {
                                    theUniView.showDocContent();
                                }
                                $.mobile.loading('hide');
                            })
                            .fail(function(rslt){
                                alert('UniView模組初始化失敗! [叫用theUniView.init失敗]');
                                $.mobile.loading('hide');
                            });
                        }
                        else {
                            alert('UniView模組初始化失敗! [theUniView==null]');
                            $.mobile.loading('hide');
                        }
                    }
                    else {
                        theUniView.reload(model.SAMLart, model.docId, false)
                        $.mobile.loading('hide');
                    }

                    /*if (typeof theUniView=='object') {
                        theUniView.showDocContent();
                    }
                    $.mobile.loading('hide');*/
                })
                .fail(function(rslt) {
                    theLogger.log('-E- invoke SSOUtil.injectHTMLModule("RD-UniView.html", ...) failed');
                    $.mobile.loading('hide');    
                });
            }
        }
        else {
            alert('指定的openModule不正確:' + viewModule);
            return;
        }
    });
    
    $(document).on('pageshow', '#viewDoc', function(event) {
        if (typeof event.target ==='object') {
            if ($(event.target).attr('id')!=='viewDoc') {
                return;
            }
        }
        
        if (model.viewModule=='AOL') {
        }
        else if (model.viewModule=='UniView') {
        }
    });
            
    $(window).on('resize', function(event, ui) {
        var h_all = $(window).height();
        $('#viewDoc').css('height', '' + h_all + 'px');
        
        theLogger.log('viewDoc.resize event, gonna invoke uniViewRefreshDimension()...[viewDoc h="' + h_all + '"]');
        if (typeof window.uniViewRefreshDimension=='function') {
            window.uniViewRefreshDimension();
        }
    });
    
})(jQuery);

/*
 * jQuery's ready() call back function
 * --- 主頁DOM loaded, ready ---
 */
// 2019.10.21 - 1080339 Eric, jquery 3.0 upgrade
//$(document).ready(function() {
$(function() {
});