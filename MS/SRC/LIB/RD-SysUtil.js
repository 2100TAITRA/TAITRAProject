/* jshint -W100 */

/*
DATE	MGRNO		SA		PG		Desc
1060502				Eric	Eric	美工套用修改
1060329 1050087     Kevin   Kevin   重複登入處理
1060721	1060593		Raymond	Raymond	保留手寫筆設定
1061205 1060934		Cloud 	Cloud	國合會介接轉入線上瀏覽
1080514	--			Kevin	Kevin	新增登入後通知訊息(原目的為提醒憑證將到期)
1080927 1080339     Kevin   Eric    jQuery 3.0 upgrade. ($.type => SSOUtil.typeOf)
1090327	1090230		Kevin	Joe 	弱掃用函式htmlencode補上try catch
1090415	--			Raymond	Raymond	修正呼叫localStorage.removeItem時, e.newValue是null, handleStorageEvent函式會發生Error的問題
1091106	1090777		Raymond	Raymond	保留新增文字意見時的加蓋職名章、時戳勾選設定
1100406	1100090		Raymond	Raymond	修正getOrgUnitNoByName查詢一級單位名稱的代碼時, 若該單位下還有二級單位, 會因為取到的單位名稱為自已及包含所有其下二級單位的連在一起的字串而判斷與指定的單位名稱不一致, 導致無法取得這個一級單位的代碼的問題
1100519	1100298		Raymond	Raymond	修正第1次叫用getOrgNode在同步下載OrgInfo.xml後, getOrgNode方法仍是回傳null的問題
1100520	1050087		Raymond	Raymond	比照一代記憶選用章戳的職名章對齊方式選項, 改記憶在localStorage
1100831	1101086		Raymond	Raymond	修改getOrgUnitNoByName新增選用的第3參數ownOUId, 若找到符合名稱的單位超過1個, 則以ownOUId前2碼過濾, 回傳與目前使用者同一級單位的二級單位代碼(內會用途)
1110818 1101532 	Kevin	Kevin	保留WebForm主題
1111012	1110865		Leslie	Leslie	新增用於機關客製化UI設定的共用屬性
1120220 1111363     Eric    Eric    可隱藏文字編輯工具列
1120706 -------     Eric    Eric    (各機關問題彙整表 序97)使用背景傳送時,第一份公文會跳undefined並且不會自動關閉.
                                    => merge: 2023.5.2 - 1111455 Eric, 公文開啟完成後立即初始化傳送子視窗
1120922	1111200		Kevin	David	更新組織結構移除實體資源檔，調整SignReasonList_OrgNo.xml內容改由timelibws.GetRsrcData取得資料
1130730	領務局序8	Raymond	Raymond	記憶上次加蓋的選用章戳保留在localStorage, 登出時不要清掉
1131121	1130552		Leslie	Leslie	[併1130877]修正目前邏輯無法正確支援「'」「"」的問題
1131204	1131151		Leslie	Leslie	修正因單位代碼含非數字部分，造成判斷一層決行與虛擬單位錯誤的問題
1140505	1140556		Kevin	Leslie	取消網址參數權杖
1140610	1131183		Leslie	Leslie	[Merge]新增行動自然人憑證模組[1110117]
1140612	1140166		Eric	Eric	[Merge]輔助分文檢索窗格功能[1130291]
1140321	1131303		Raymond	Raymond	新增保留啟用錯別字校正功能選項的設定值
1140723	1141011		Kevin	Leslie	弱掃修正[Client DOM Stored XSS]
1140801	1141011		Kevin	Leslie	弱掃修正[Client DOM Stored XSS]，試用套件消毒
1140924	退輔會序170	Leslie	Leslie	修正複數機關環境，彙併辦子文因重覆文號造成子文未正確加簽的問題
*/

/*
 * 產生公文系統物件
 *
 * window.theSSO -> 系統根物件
 * window.theSSO.User -> 使用者資訊
 * window.theSSO.User.EnvSettings -> 環境變數
 * window.theSSO.MP -> 訊息單一入口物件
 * window.theSSO.MP.ToDoList -> 待辦清單
 */
(function($){
	// 定義 theSSO物件
	if (typeof window.theSSO === 'undefined') {
		var _wsServerHost = '';
		if (typeof SSO_CONFIG=='object' && typeof SSO_CONFIG.ServerHost=='string' && SSO_CONFIG.ServerHost.length) {
			_wsServerHost = SSO_CONFIG.ServerHost;
		}
		else {
			_wsServerHost = window.location.protocol + '//' + window.location.hostname;
		}
		
		window.theSSO = {
			_showDebugAlert : false,
			_doRealSubmit : true,
			logoned : false,
			//1080514 Kevin 新增登入後通知訊息(原目的為提醒憑證將到期)
			logonPopMsg : '',
			//1050823 Kevin 新增SR重連次數計算
			SRReConCount : 0,
			//1060329 Kevin 新增強制登出
			logOutNow : false,
			//1060329 Kevin 新增紀錄權杖
			Artifact : '',
			aolModuleLoaded : false,
			uniViewModuleLoaded : false,
			useSSL : false,
			// 1130809 Raymond 1130313 合併1111007(1100394), 新增離線模式旗標
			offlineMode: false,
			// for debug
			_dbgAlert : function(msg) {
				if (theSSO._showDebugAlert) {
					alert(msg);
				}
			},
			// web server name or IP
			WSServerHost : _wsServerHost,
			
			// reset functions
			resetUserAndOrgData : function() {
				theSSO.RawUser = {};
				theSSO.User = {};
				theSSO.User.EnvSettings = {
					get : function(envName) {
							var value = this[envName];
							if (typeof value === 'undefined') {
								value = '';
							}
							return value;
					}
				};
				theSSO.User.SystemSets = {
					get : function(envName) {
							var value = this[envName];
							if (typeof value === 'undefined') {
								value = '';
							}
							return value;
					}
				};
				
				// 2013.12
				theSSO.menuRuleAOL = [];
				theSSO.menuRulePDoc = [];
				
				// 2014.9 - 停止SignalR的連線...
				if (typeof theSSO.chat !== 'undefined') {
					$.connection.hub.stop()
					theSSO.chat = null;
				}
			},
			
			/* localStorage value change event handler
			 * 此處會處理localStorage 'certDataUpdated' 及 'signValueUpdated' 二個欄位異動時發出的change event
			 * 目前實作'signValueUpdate'
			 */
			handleStorageEvent : function(e) {
				// 1090415 Raymond 修正呼叫localStorage.removeItem時, e.newValue是null, 用e.newValue.length會發生Error的問題
				//theLogger.log('SSOPage - storage event: key="' + e.key + '", newValue="' + ((e.newValue.length>32)?e.newValue.substr(0, 32):e.newValue) + '"');
				theLogger.log('SSOPage - storage event: key="' + e.key + '", newValue="' + ((!!e.newValue && e.newValue.length>32)?e.newValue.substr(0, 32):e.newValue) + '"');
	
				var _dfd = null;
				var remotePath = '', rsltSubmit = {};
				var newtext = '';
				if (e.key==='certDataUpdated') {
					theLogger.log('-I- localStorage[certDataUpdated] change event triggered.');
					
					// 2020.8.7 - 1090490 Eric, bug-fix
					if (e.newValue=='') {
						return;
					}

					_dfd = (typeof theSSO.MP.queryCertDeferred=='object') ? theSSO.MP.queryCertDeferred : null;
					var strQueryRslt = localStorage.certDataUpdated; // certDataUpdate內記錄:帳號/existCert
					if ((typeof strQueryRslt!=='string') || (strQueryRslt.length===0)) {
						if (!!_dfd) {
							_dfd.reject({success:false, errMsg:'certDataUpdated內容為空字串'});
						}
						return;
					}
					
					theLogger.log('-I- localStorage[certDataUpdated] event, QueryRslt=' + strQueryRslt);
					
					// 2019.11.4 - 1080927 Eric, (1) iPad OS 13 support, (2) certowner replace account
					// 2019.2.14 - 1080179 Eric Peng, 弱掃account項目修正, 改為certowner.
					var _queryRslt = JSON.parse(strQueryRslt);
					if (!!_queryRslt && !!_queryRslt.certowner && _queryRslt.certowner.length) {
						var _errMsg = localStorage.queryCertError;
						if (!!_errMsg && _errMsg.length) {
							if (!!_dfd) {
								_dfd.reject({success:false, errMsg:_errMsg});
							}
							theLogger.error('iOS_QueryCert failed, errMsg=' + _errMsg);
							return;
						}
						
						if (!!_dfd && (_queryRslt.certExist===false)) {
							theLogger.log('-W- _queryRslt.certExist = false');
							_dfd.resolve({success:true, certExist:false});
							return;
						}
						
						var strCertInfo = localStorage['certData-' + _queryRslt.certowner];
						if (!!strCertInfo && strCertInfo.length) {
							var _certInfo = JSON.parse(strCertInfo);
							if (_certInfo && !!_dfd) {
								// check to see if it is linked cert
								_dfd.resolve({success:true, certExist:true, account:_queryRslt.certowner, certInfo:_certInfo});
							}
							return;
						}

						if (!!_dfd) {
							_dfd.reject({success:false, account:_queryRlst.certowner, errMsg:'localStorage[certData-' + _queryRslt.certowner + ']資料異常!'});
						}
						else {
							theLogger.error('已取得certData,但queryCertDeferred為NULL。');
						}
						return;
					}
					else if ('oldDocSign' in _queryRslt) {
						alert('DocSign App簽章程式為舊版, 請更新至V1.0.8版以上再繼續作業!');
						if (!!_dfd) {
							_dfd.reject({success:false, certowner:'', errMsg:'DocSign App簽章程式為舊版, 無法作業!'});
						}
						else {
							theLogger.error('DocSign App簽章程式為舊版, 無法作業!');
						}
						return;
					}
					
					if (!!_dfd) {
						_dfd.reject({success:false, errMsg:'無效的localStorage.certDataUpdated內容!(str=\'' + strQueryRslt +'\')'});
						return;
					}
					else {
						theLogger.error('取得憑證作業異常，且theSSO.MP.queryCertDeferred為NULL.');
					}
				}
				else if (e.key==='signValueUpdated')
				{
					theLogger.log('-I- localStorage[signValueUpdated] change event triggered.');
					
					_dfd = (typeof theSSO.MP.signDataDeferred=='object') ? theSSO.MP.signDataDeferred : null;
					
					var _update = localStorage.signValueUpdated;
					if (typeof _update=='undefined' || _update.length===0) {
						if (!!_dfd) {
							_dfd.reject({success:false, errMsg:'signValueUpdated內容為空字串'});
						}
						return;
					}
					
					var _strErr = localStorage.signDocError;
					var errObj=null, _errMsg='';
					if (typeof _strErr=='string' && _strErr.length) {
						theLogger.error('-W- localStorage[signDocError]=' + _strErr);
						
						errObj = JSON.parse(_strErr);
						if (!!errObj) {
							if (!!_dfd) {
								_dfd.reject({success:false, errCode:errObj.errCode, errMsg:errObj.errMsg});
								return;
							}
							else {
								theLogger.error('Error! iOS簽章App回傳簽章Error, theSSO.MP.signDocDeferred為NULL! [errCode=' +
										  errObj.errCode + ', Msg=' + errObj.errMsg + ']');
								return;
							}
						}
						else {
							if (!!_dfd) {
								_errMsg = '無效的errObj:' + _strErr;
								_dfd.reject({success:false, errCode:'-1', errMsg: _errMsg});
								return;
							}
							else {
								_errMsg = 'Error! iOS簽章App回傳簽章Error, theSSO.MP.signDocDeferred為NULL! [無效的errObj：' + _strErr + ']';
								theLogger.error(_errMsg);
								return;
							}
						}
					}
					
					var SAMLart = localStorage.Artifact;
					var docObj = theAOL.docObj;
					var docNo = docObj.docNo, msgId = docObj.msgId;
					
					var signDocNo = localStorage.signDocNo;
					var signMsgId = localStorage.signMsgId;
					var _signCert = '', _signValue = '';
					var _errMsg = '';
					if (docNo===signDocNo && signMsgId===msgId) {
						_signCert = localStorage['signCert-' + msgId];
						_signValue = localStorage['signatureValue-' + msgId];
						theLogger.log('-I- theSSO.handleStorageEvent() e.key=' + e.key + ', signValue=' + _signValue);
					}
					else {
						_errMsg = '簽章值資訊的docNo/msgId與目前開啟公文不同!';
						theLogger.error('Error! 簽章值資訊的docNo/msgId與目前開啟公文不同!');
					}
					
					if (!!_signValue && _signValue.length && !!_signCert && _signCert.length)
					{
						// 2015.2 - Eric Peng, 改為觸發deferred obj的resolve, 觸發後續作業.
						if (!!_dfd) {
							_dfd.resolve({success:true, docNo:signDocNo, msgId:signMsgId, signCert:_signCert, signValue:_signValue});
						}
						else {
							theLogger.error('Error! iOS加簽作業成功，但 MP.signDocDeferred is null.');
						}
					}
					else {
						if (!!_dfd) {
							if (!_errMsg || (_errMsg.length===0)) {
								_errMsg = 'localStorage記錄的簽章值或憑證資訊異常!';
							}
							_dfd.reject({success:false, errMsg:_errMsg});
						}
					}
				}
				else if (e.key==='Artifact') //1060329 Kevin 此處為同瀏覽器重複登入
				{
					theLogger.log('-I- localStorage Artifact:' + localStorage.Artifact + ' changed:' + e.newValue + ' theSSO.Artifact:' + theSSO.Artifact);
					
					if(theSSO.logoned && theSSO.Artifact != '' && e.newValue && e.newValue != '' && theSSO.Artifact != e.newValue)
					{
						alert('你已重複登入，此頁面已被登出。');
						//1110826	Leslie	針對踢掉前一分頁，增加flag以識別不要清空localStorage
						theSSO.keepStorage = true;
						theSSO.logoned = false;
						theSSO.logOutNow = true;
						$('#btn_logout').trigger('click');
					}
					else
						theLogger.log('使用者已登出，不重複執行登出。')
					
				}
				else if (e.key==='AKI888OPENR') //1061205 Cloud 國合會介接轉入線上瀏覽
				{
					theSSO.MP.queryDocList.CallBackByImgView();
				}
			} // End of handleStorageEvent
		};

		// 2019.7 - 1080654 Eric, for DevTest
		//if (window.location.href.indexOf('docvip.fdat.com.tw')!==-1 && window.location.href.indexOf('MSDev')!==-1) {
		//	theSSO._doRealSubmit = false;
		//}
	}
		
	var sso = window.theSSO;
	// 定義 theSSO.MP 物件
	if (theSSO.MP === undefined || theSSO.MP === null) {
		theSSO.MP = {
			// 即時通知訊息處理機制! (處理函式見RD-RTCProcess.js)
			rtcMsgProcessing : false, /* 正在處理RTC訊息 */
			rtcMsgQueue : [], /* 尚未處理的RTC訊息 */
			// for ICON Mode, 單一folder佔用寬度(pixels)
			todolist_icon_folder_w : 256
		};
	}
	
	// 2015.1 - iOS簽章App加簽/憑證查詢作業
	if ((sso.MP.envelopeUitl === undefined) || (sso.MP.envelopeUitl === null)) {
		sso.MP.envelopeUtil = {
			/* 使用此JS函式, 以URL Scheme方式叫用native objective-c執行指定作業
			 * 目前
			 * [url sheme格式: 'T2100PKI://#' + action + '&' + params]
			 *
			 * Protocol: 固定字串: 'T2100PKI://'
			 * action : 字串, 作業代碼 [目前提供: queryCert, signDoc]
			 * args : object of arguments
			 *      1. each item is a name:value pair
			 *      2. 設定值必須為字串型別.
			 */
			iOS_URLSchemeCall : function(action, args) {
				/* 將args物件轉換為參數字串 */
				var fullParam='', itemStr='';
				var idx;
				for (idx in args) {
					if (fullParam.length) {
						// 2020.8.6 - 1090490 Eric
						// let _value = args[idx];
						// if (idx=='tobeSign' && SSOUtil.isValueTrue(localStorage['dev_tobeSign'])) {
						// 	_value = 'PFNpZ25lZEluZm8+PENhbm9uaWNhbGl6YXRpb25NZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy9UUi8yMDAxL1JFQy14bWwtYzE0bi0yMDAxMDMxNSI+PC9DYW5vbmljYWxpemF0aW9uTWV0aG9kPjxTaWduYXR1cmVNZXRob2QgQWxnb3JpdGhtPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNyc2Etc2hhMjU2Ij48L1NpZ25hdHVyZU1ldGhvZD48L1NpZ25lZEluZm8+';
						// }
						// itemStr = '&' + idx + '=' + encodeURIComponent(_value);
						itemStr = '&' + idx + '=' + encodeURIComponent(args[idx]);
					}
					else {
						itemStr = idx + '=' + encodeURIComponent(args[idx]);
					}
					fullParam += itemStr;
				}
			  
				var urlStr = "T2100PKI://#action=" + action + '&' + fullParam;
				theLogger.log('iOS_URLSchemeCall, urlStr=' + urlStr);
				
				window.location = urlStr;
				
				// 2020.8.6 - 1090490 Eric
				//localStorage['dev_last_DocSign_job_' + action] = urlStr;
				// 2020.8.6 - 1090490 Eric
				//window.open(urlStr);
			},
			iOS_QueryCert: function(_orgNo, _account, _rsltUrl, _dfd) {
				var _theAccount = _account.toUpperCase();
				var _certInfo, done = false;
				var strCertInfo = localStorage['certData-' + _theAccount];
				//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]，新增判斷當前使用者是否已登錄行動自然人憑證，若是，則在未申辦軟體式正式憑證時，仍回應可用Client加簽
				var fidoCert = theSSO.User.Certs.find(function(o){return o.isFido == true;})
				if (!!strCertInfo && strCertInfo.length) {
					_certInfo = JSON.parse(strCertInfo);
					if (!!_certInfo && _certInfo.cert && _certInfo.cert.length) {
						_dfd.resolve({success:true, certExist:true, certInfo: _certInfo});
						done = true;
					}
					//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]，整個else段落都Merge過來
					else if (!!_certInfo && !_certInfo.exist) {
						if(fidoCert != null)
							theSSO.MP.queryCertDeferred.resolve({success:false, certExist:false, certInfo:null, mobileMoica: true});
						_dfd.resolve({success:true, certExist:false, certInfo:null});
						done = true;
					}
				}
				
                if (!done) {
                    // 2020.8.3 - 1090490 Eric, ToDo: 移出, 提前於函式叫用前設定, 以避免觸發handleStorageEvent
					/* 查詢作業前先清空相關欄位值 */
					localStorage.queryCertError = '';
					localStorage.certDataUpdated = '';
				
					var params = {
						orgNo : _orgNo,
						account : _theAccount,
						rsltUrl : _rsltUrl,
						ver: '2.0' // 2019.11.5 - 1080927 Eric, for DocSign version check...
					};
					theLogger.log("-I- before iOS_URLSchemeCall(\'queryCert\')...");
					sso.MP.envelopeUtil.iOS_URLSchemeCall('queryCert', params);
				}
				
				if (!!_dfd) {
					// 2020.11.9 - merge 2020.8.12 - 1090490 Eric, set timeout for error
					setTimeout(function() {
						if (!!theSSO.MP.signDataDeferred) {
							//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]，新增判斷當前使用者是否已登錄行動自然人憑證，若是，則在未申辦軟體式正式憑證時，仍回應可用Client加簽
							if(fidoCert != null)
								theSSO.MP.queryCertDeferred.resolve({success:false, certExist:false, certInfo:null, mobileMoica: true});
							theSSO.MP.signDataDeferred.reject({success:false, errMsg:'-TimeOut- iOS公文簽章App沒有回應！'});
							theLogger.error('ERROR! 叫用iOSApp signDoc逾時...');
						}
					}, 30000);
					return _dfd.promise();
				}
				else {
					return {success:false, errMsg:'傳入之_dfd物件不可為NULL!'};
				}
			},
			/* 2022.1.4 - 1101433 Eric, 支援傳入hash值加簽模式 */
			/* 2015.2 - 使用iOS簽章app加簽公文封裝內容 */
			iOS_SignData : function(_orgNo, _account, _docNo, _msgId, _tobeSign, _fHashSign, _rsltUrl, _dfd) {
				/* 作業前先清空相關欄位值 */
				localStorage.setItem('signatureValue-' + _msgId, '');
				localStorage.setItem('signCert-' + _msgId, '');
				localStorage.setItem('signDocNo', '');
				localStorage.setItem('signMsgId', '');
					
				var params  = {
					orgNo : _orgNo,
					account : _account,
					docNo : _docNo,
					msgId : _msgId,
					rsltUrl : _rsltUrl,
					ver: '2.0' // 2019.11.5 - 1080927 Eric, for DocSign version check...
				};

				// 2022.1.4 - 1101443 Eric, 為避免DocSign舊版產生異常簽章值, 以新的參數傳遞待簽內容的hash值
				if (_fHashSign===true) {
					params.tbsHash = _tobeSign;
				}
				else {
					params.tobeSign = _tobeSign;
				}
				
				theLogger.log("-I- before iOS_URLSchemeCall(\'signDoc\')...");
				sso.MP.envelopeUtil.iOS_URLSchemeCall('signDoc', params);
				if (!!_dfd) {
					// 2020.8.6 - 1090490 Eric, set timeout for error
					setTimeout(function() {
						if (!!theSSO.MP.signDataDeferred) {
							theSSO.MP.signDataDeferred.reject({success:false, errMsg:'-TimeOut- iOS公文簽章App沒有回應！'});
							theLogger.error('ERROR! 叫用iOSApp signDoc逾時...');
						}
					}, 15000);
					return _dfd.promise();
				}
				else {
					return {success:false, errMsg:'傳入之_dfd物件不可為NULL!'};
				}
			},
			/* 2015.3 - 新增 url 參數並改用 WebFileIO Web service */
			signEnvelope : function(artifact, docNo, ICUserId, msgId, signValue, signCert, orgNo, fileIOWSUrl) {
				var rslt = null;
				// 2016.7 - 支援草稿傳送封裝
				if (typeof ICUserId !=='undefined' && ICUserId.length) {
					rslt = theWebServices.webFileIO.signDraftEnvelope(artifact, docNo, ICUserId, msgId, signValue, signCert, orgNo, { url: fileIOWSUrl});
				}
				else {
					rslt = theWebServices.webFileIO.signEnvelope(artifact, docNo, msgId, signValue, signCert, orgNo, { url: fileIOWSUrl});
				}
				if (rslt.success) {
					// call ODMSSP.SubmitMsg
					theLogger.log('gonna call submitMsg...');
				}
				return rslt;
			}
		};
	}
    
	/* 2015.10 - 由ODWMSG.OWN_ROLE_ID判定目前決行人員層級 */
	function _getOfficerLevel(docObj) {
		if (typeof docObj.ownRoleId!=='undefined' && docObj.ownRoleId.length) {
			if (sso_const.APPORVAL_OFFICER.indexOf(docObj.ownRoleId)!==-1) {
				return 1;
			}
			if (sso_const.FIRSTCLASS_OFFICER.indexOf(docObj.ownRoleId)!==-1) {
				return 2;
			}
			if (sso_const.SECONDCLASS_OFFICER.indexOf(docObj.ownRoleId)!==-1) {
				return 3;
			}
		}
		return -1;
	}

	// 2014.3 - 輔助函式
	if ((sso.Util === undefined || sso.Util === null)) {
		sso.Util = {
			/* 登入系統後, 檢核各資訊取得WebService是否已完成, 若已完成則切換到主頁!
			 */
			showMainPage : function() {
				
			},
			/*
			 * 2015.10 - 檢核是否為先簽後辦公文的[簽呈]核決
			 */
			isSignDocApprove : function(aolObj, dfd) {
				var _dfd = (typeof dfd === 'undefined' || dfd===null) ? $.Deferred() : dfd;
				aolObj = (typeof aolObj !== 'undefined') ? aolObj : null;
				if (aolObj===null) {
					_dfd.reject({success:false, errMsg:'aolObj is NULL.'});
					return _dfd.promise();
				}
				
				var sSignDocNameList = theSSO.User.EnvSettings.get('WE_SIGN_DOCNAME_LIST');
				var signDocNameList = [];
				if ((typeof sSignDocNameList!=='undefined') && sSignDocNameList.length) {
					signDocNameList = sSignDocNameList.split(';');
				}
				
				if ((typeof signDocNameList==='undefined') || (signDocNameList.length===0)) {
					_dfd.resolve({success:true, isSignDocDraft: false});
					return _dfd.promise();
				}
				
				var folio = aolObj.getCurrFolio();
				if (typeof folio === 'undefined') {
					_dfd.reject({success:false, errMsg: '無法取得目前公文的Folio物件'});
					return _dfd.promise();
				}
				
				var i = 0;
				var res = [];
				var cnt = folio.getDraftCounts();
				function doAccq() {
					res.push({});
					//res.push({name: _getMappedDraftName(i)});
					folio.accquireDraftModel(i)
						.done(function(dm) {
							var j=0, _isSignDocDraft = true, _item = null;
							try {
								if (dm===null) {
									// 來文簽辦用文稿
									res[res.length-1].success = true;
									res[res.length-1].isSignDraft = false;
								}
								else {
									var draftType = dm.getDocType();
									res[res.length-1].success = true;
									if ((typeof draftType==='undefined' || draftType.length===0)) {
										res[res.length-1].isSignDraft = false;
									}
									else {
										res[res.length-1].isSignDraft = (signDocNameList.indexOf(draftType)!==-1) ? true : false;
									}
								}
							}
							catch(e) {
								theLogger.warn(i + ":Exception! " + e.message + " - " + e.sourceURL + ":" + e.line);
								res[res.length-1].success = false;
								res[res.length-1].errorText = e.message;
							}
							
							if (++i < cnt) {
								doAccq();
							}
							else {
								// 所有文稿皆已取得, 有任一文稿非[簽]類型, 則不為先簽後稿之[簽呈]
								for(j=0; j<res.length; j++) {
									_item = res[j];
									if (!!_item && _item.success===true && _item.isSingDraft!==true) {
										_isSignDocDraft = false;
										break;
									}
								}
								_dfd.resolve({success:true, isSignDocDraft: _isSignDocDraft});
							}
						})
						.fail(function(errorText) {
							// 任一文稿取得失敗則視為失敗!
							_dfd.reject({success:false, errMsg:'無法取得文稿內容, 文稿序='+i});
						});
				}
				
				if(cnt > 0) {
					doAccq();
				}
				else {
					// 無文稿
					_dfd.reject({success:false, errMsg: '沒有任何文稿'});
				}
				
				return _dfd.promise();
			},
			/* 勾選核決時是否應顯示設定子視窗
			 */
			getApproveOptionsDlgDisplaySettings : function(aolObj, envSettings, dfd) {
				var _dfd = (typeof dfd === 'undefined' || dfd===null) ? $.Deferred() : dfd;
				
				aolObj = (typeof aolObj !== 'undefined') ? aolObj : null;
				if (aolObj===null) {
					_dfd.reject({success:false, errMsg:'aolObj不可為null.'});
					return _dfd.promise();
				}
				
				var docObj = aolObj.docObj;
				
				// 是否顯示核決設定子視窗
				var sAskCloseType = envSettings['AOL_ALWAYS_ASK_CLOSE_TYPE'];
				var askCloseType = true;
				if ((typeof sAskCloseType !== 'undefined') && sAskCloseType.length) {
					if (SSOUtil.isValueFalse(sAskCloseType)) {
						askCloseType = false;
					}
				}
				
				if (!askCloseType) {
					// 毋須顯示提示子視窗, 會直接取ODWMSG.CLOSE_TYPE為結案類型, 其它設定值可不管!
					_dfd.resolve({askCloseType:false, userLevel:-1, enableUnitIssue:false, enableSendMail:false, sendMailMsg:''});
					return _dfd.promise();
				}
				
				// 是否顯示發送電子郵件checkbox
				var sShowIsNotify = envSettings['OD_SHOW_IS_NOTIFY'];
				var showSendMail = false;
				var msg = '';
				if (!!sShowIsNotify && sShowIsNotify.length) {
					var setting = sShowIsNotify.split('|');
					if (setting.length>=2) {
						showSendMail = SSOUtil.isValueTrue(setting[0]);
						msg = setting[1];
					}
				}
				
				// 決行層級(依判決角色取得)
				var UserLevel = _getOfficerLevel(docObj);
				
				// ODWMSG.IS_NOTIFY
				var sendMail = SSOUtil.isValueTrue(docObj.get('ODWDCM', 'IS_NOTIFY'));
				
				// 是否允許單位發文
				var enableUnitIssue = false;
				if (UserLevel===2 || UserLevel===3) {
					// 非一層決行才可以使用單位發文.
					theWebServices.OD_LIBWS.unitCanIssue(localStorage.Artifact, docObj.sourceOrgNo, docObj.ICOUId)
					.done(function(rslt){
						if (!!rslt) {
							var sRslt = rslt.m_strRetStr;
							if (SSOUtil.isValueTrue(sRslt)) {
								enableUnitIssue = true;
							}
							_dfd.resolve({
								askCloseType : askCloseType, // 是否顯示設定子視窗
								userLevel : UserLevel, // 決行層級
								enableUnitIssue : enableUnitIssue, // 是否顯示'單位發文' checkbox
								sendMail : sendMail, // ODWMSG.IS_NOTIFY="Y"
								enableSendMail : showSendMail, // 是否顯示'發送電子郵件或張貼網頁'checkbox
								sendMailMsg : msg // '發送電子郵件或張貼網頁'checkbox說明文字
							});
						}
					})
					.fail(function(rslt){
						_dfd.reject({success:false, errMsg:rslt});
					});
				}
				else {
					_dfd.resolve({
						askCloseType : askCloseType, // 是否顯示設定子視窗
						userLevel : UserLevel, // 決行層級
						enableUnitIssue : false, // 是否顯示'單位發文' checkbox
						enableSendMail : showSendMail, // 是否顯示'發送電子郵件或張貼網頁'checkbox
						sendMailMsg : msg // '發送電子郵件或張貼網頁'checkbox說明文字
					});
				}
				return _dfd.promise();
			},
			/* 2015.1 - 開啟SignType='W'之待辦事項對應應用程式 */
			openASPXDlg : function(url, artifact) {
				/*
				* 注意: $('#dlgASPXPage')之內容須在 jQM 的 page 之外, 否則 $dlg.trigger('create')
				* 
				* 2013.4 - 目前div#dlgASPXPage HTML DOM內容放在mSSO.html內!
				*/
				if (!url || url.length==0 || !artifact || artifact.length==0) {
					alert('URL及Artifact不可為空白');
					return;
				}
				
				var $dlg = $("#dlgASPXPage").clone(true);
				   
				/* 按下[關閉]鍵 */
				// 2019.9.16 - 1080339 Eric
				$dlg.find('a.closeBtn').on('click', function() {
					$.modal.close();
				});
			   
				/* 按下[取消]鍵
				 *$dlg.find("a#targetDlgCancel").click(function(event) {
				 *	$.modal.close();
				 *);
				 */
			   
				var w = $(window).width(),
					h = $(window).height(); // - 80;
				$.modal($dlg,
						{ appendTo:$('#home'),
						  overlayCss:{height:h, width:w},
						  //containerCss: { 'background-color' : '#ffd' },
						  minWidth:(w-80),	// Leslie modify to 80
						  minHeight:(h-60)});
			   
				$dlg.enhanceWithin(); //trigger('create');
		   
				var $frame = $dlg.find('iframe.aspx_page_content');
				if ($frame.length) {
					var urlWithParam = '';
					if (!!artifact && artifact.length && url.length) {
						//1140505	Leslie[1140556]	取消網址參數權杖
						//urlWithParam = url + '&SAMLart=' + artifact;
						urlWithParam = url
						$frame[0].src = urlWithParam;
					}
				}
			},
			/* 2016.6 - 以新分頁開啟SignType='W'之待辦事項對應應用程式 */
			openASPX_NewFrame : function(url, artifact) {
				if (!url || url.length==0 || !artifact || artifact.length==0) {
					alert('URL及Artifact不可為空白');
					return null;
				}
				
				var newWnd = null;
				var urlWithParam = '';
				if (!!artifact && artifact.length && url.length) {
					//1140505	Leslie[1140556]	取消網址參數權杖
					// urlWithParam = url + '&SAMLart=' + artifact;
					urlWithParam = url;
				}
				
				if (urlWithParam.length) {
					newWnd = window.open(urlWithParam, '_blank');
				}
				return newWnd;
			},
			/* 2016.6 - 以新分頁開啟SignType='W'之待辦事項對應應用程式 */
			openASPXApp_NewFrame : function(urlWithParam) {
				if (typeof urlWithParam !=='string' || urlWithParam.length===0) {
					alert('URL不可為空白 [SSOUtil.openASPXApp_NewFrame]');
					return null;
				}
				
				var newWnd = window.open(urlWithParam, '_blank');
				return newWnd;
			}
			/* 20181206 Kevin 1081066 新增弱掃用函式 */
			//1090327 Joe 1090230	補上try catch
			,htmlEncode : function(html) {
				if(html != undefined){
					var temp = document.createElement ("div");
					//2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
					(temp.textContent != undefined ) ? (temp.textContent = html) : (temp.innerText = html);
					var output = temp.innerHTML;
					temp = null;
					//1131121	Leslie[1130552、1130877]	修正目前邏輯無法正確支援「'」「"」的問題
					// return output;
					return output.replace(/['"]/g, function (c) {
						switch (c) {
							case '\'': return '&apos;';
							case '"': return '&quot;';
						}
					});
				}
				else{
					return "";
				}
			}
		};
	}
	// 設定WS的Urls => 2014.9 - 移至SSO_CONFIG(@SSO_CONFIG.js)
    /*sso.ws_urls = {
        authws : theSSO.WSServerHost + '/IIWS/AuthWS.asmx',
        samlws : theSSO.WSServerHost + '/IIWS/SAML.asmx',
        odmsspws : theSSO.WSServerHost + '/odmssp/odmssp.asmx',
        envelopeWS : theSSO.WSServerHost + '/EnvelopeWS/xmldsig.asmx',
        
        // 公文製作使用 Web Services
        checkWS : theSSO.WSServerHost + '/WEDEP/check2.asmx',
        webEditWS : theSSO.WSServerHost + '/WEDEP/webeditws02.asmx'
    };*/
	
	sso.rsrcPath = '/Other/';
	
	// 定義系統使用常數
	if (typeof(window.sso_const)==='undefined') {
		window.sso_const = {};
	}
	var sc = window.sso_const;
	if (sc) {
		sc.FIRSTCLASS_UNITNO_LEN = 2; // 一級單位代碼長度->2碼
		//1131204	Leslie[1131151]	修正因單位代碼含非數字部分，造成判斷一層決行與虛擬單位錯誤的問題，改用字串紀錄與比對
		// sc.APPROVEUNIT_NUM = 95; // 95以上為一層決行單位
		// sc.VIRTUALUNIT_NUM = 90; // 90-94為總收/發,研考,檔案室等單位
		sc.APPROVEUNIT_NUM = '95'; // 95以上為一層決行單位
		sc.VIRTUALUNIT_NUM = '90'; // 90-94為總收/發,研考,檔案室等單位
		sc.SECONDCLASS_OFFICER = [ 'OD21', 'OD22', 'OD23', 'OD24', 'OD25' ]; // 2級單位長官
		sc.FIRSTCLASS_OFFICER = [ 'OD11', 'OD12', 'OD13', 'OD14', 'OD15' ];  // 1級單位長官, 2017.11.23, 1061171-預排流程插入會辦單位流程順序異常問題修改.
		sc.APPORVAL_OFFICER = [ 'OD01', 'OD02', 'OD03', 'OD04', 'OD05', 'OD06', ];	// 核決單位長官 OD01~OD06 (OD01最大->OD06最小)
		sc.LV1_APPROVE_UNIT_VIRTUAL_CODE = '3'; // <VIRTUAL>3</VIRTUAL>項目為一層決行單位.
		// 2015.5 - Eric Peng, bug fix 虛擬單位Virtual='2'
		sc.VIRTUAL_UNIT_VIRTUAL_CODE = '2'; // <VIRTUAL>2</VIRTUAL>項目為虛擬單位.
		
		// 由MenuRule列舉傳送對象時,須展開至哪一個層級設定
		sc.OptLvl_Unit = '1';
		sc.OptLvl_Role = '2';
		sc.OptLvl_Account = '3';
		sc.OptLvl_Undefined = '-1';
		
		/* 角色常數定義*/
		sc.ROLENO_DIPATCH = 'OD16';   // 分辦人員
		sc.ROLENO_DISPATCH = 'OD16';   // 分辦人員
		sc.ROLENO_REGISTER = 'OD17';   // 登記桌
		sc.ROLENO_CLS2OFFICER = 'OD21';   // 科長
		sc.ROLENO_RECEIVER = 'OD91';   // 收文人員
		sc.ROLENO_PRINT = 'OD92';   // 繕印人員
		sc.ROLENO_CHECK = 'OD93';   // 校對人員
		sc.ROLENO_ISSUER = 'OD94';   // 發文人員
		sc.ROLENO_FILEMGR = 'OD95';   // 檔管人員
		sc.ROLENO_RDEXAM = 'OD96';   // 研考人員
		sc.ROLENO_COSIGN = 'OD97'; // 會簽人員
		sc.ROLENO_OPERATOR = 'OD99';   // 承辦人
		
		/* 虛擬單位定義 */
		// 總收, 總發, 研考, 檔案室
		sc.UNIT_RECEIVE = '91';
		sc.UNIT_ISSUE = '92';
		sc.UNIT_RDEXAM = '93';
		sc.UNIT_FILEROOM = '94';
		
		/* 結案類型 - 2015.10 */
		sc.APPROVAL_MIN = 1;           // 1
		sc.APPROVAL_PUBLISH_ORG = 1;	// 1, 判發(機關發文)
		sc.APPROVAL_PUBLISH_UNIT = 2;		// 2, 判發(單位發文)
		sc.APPROVAL_PERMISSION = 3;		// 3, 判行
		sc.APPROVAL_DEFAULT = sc.APPROVAL_PERMISSION; // 3
		sc.APPROVAL_MAX = sc.APPROVAL_PERMISSION;     // 3
		
		sc.DRAFT_MSG_ID_END	= 2000; // 草稿最大MsgId
		sc.DRAFT_MSG_ID_START =	100; // 草稿最小MsgId

		// 2021.5 - 1100093 merge: 2020.3.5 - 1081168 Eric, 子文彙併辦/解除彙併辦封裝!
		sc.MergeDocTxName = '彙併辦';
		sc.RemoveMergeDocTxName = '解除彙併辦';
				
		/* 紙本傳送選項
		sc.MENU_ITEM_DISPLAYNONE = -1;
		sc.MENU_ITEM_DISABLE = 0;
		sc.MENU_ITEM_ENABLE = 1;*/
	}
	
	window.user_profile = {};

	// 清除狀態資訊時應刪除的localStorage欄位
	var _localStorage_status_field = ['Artifact'];
	
	// SSO Utility functions container object
	if (window.SSOUtil===undefined) {
		window.SSOUtil = {};
	}
	
	// 2019.09.09- 1080339 Eric, jQuery 3 $.type() deprecated.
	function _typeOf(_obj) {
		return Object.prototype.toString.call(_obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
	}

	/* 目的: 取得OrgInfo_$OrgNo$.xml檔, 轉為XML DOM Object 並於localStorage['orgInfo_orgNo']儲存XML內容字串!
	 * (This is a SSOUtil method)
	 */
	function getOrgInfo(artifact, orgNo) {
		var sOrgInfo = '';
		var orgInfo_xn = null;
		var filename = 'OrgInfo_' + orgNo + '.xml';
		var ls_id = 'orgInfo_' + orgNo;
		
		// 若已有資訊, 則結束作業
		if (typeof window.localStorage[ls_id] === 'string' && window.localStorage[ls_id].length) {
			return true;
		}
		
		// 2014.9 - 改用WebFileIO取得Server上的設定檔...
		var wfio = new WebFileIO(SSO_CONFIG.getWSUrl('fileiows'), '', artifact);
		var serverPath = SSO_CONFIG.getRsrcServerPath('sso', orgNo);
		wfio.download(serverPath, filename, {
			async : false,
			success: function(rslt, res) {
				if (rslt !== undefined) {
					orgInfo_xn = rslt;
					if (orgInfo_xn) {
						sOrgInfo = new XMLSerializer().serializeToString(orgInfo_xn);
					}
					if (typeof sOrgInfo !== 'string') {
						sOrgInfo = '';
					}
					else {
						window.localStorage[ls_id] = sOrgInfo;
					}
				}
				else {
					theLogger.warn("-W- WebFileIO呼叫成功但夾檔資料未下載");
				}
			},
			error: function(errorText) {
				theLogger.error('-E- getOrgInfo() invoke wfio.download failed, errMsg=' + errorText);
			}
		});

		return (sOrgInfo.length>0) ? true : false;
	}
	
	/* 取得MPRuleE_$orgno$.xml or MPRule_$orgno$.xml檔, 並轉為XML字串存入localStorage[menuRuleAOL_$orgno$ | menuRulePDoc_$orgno$]
	 * (This is a SSOUtil method)
	 */
	function getMenuRule(artifact, orgNo, signType, options) {
		var sMenuRule = '';
		var menuRule_xn = null;
		var filename = (signType=='P') ? 'MPRule_' + orgNo + '.xml' : 'MPRuleE_' + orgNo + '.xml';
		var ls_id = (signType=='P') ? 'menuRulePDoc_' + orgNo : 'menuRuleAOL_' + orgNo;
		
		// 若已有資訊, 則
		if (typeof window.localStorage[ls_id] === 'string' && window.localStorage[ls_id].length) {
			return;
		}
		
		var wsUrl = '';
		if (typeof options=='object' && typeof options.url=='string' && options.url.length) {
			wsUrl = options.url;
		}
		if (wsUrl.length===0 && typeof SSO_CONFIG=='object') {
			wsUrl = SSO_CONFIG.getWSUrl('fileiows');
		}
		
		// 2014.9 - 改用WebFileIO取得Server上的設定檔...
		var wfio = new WebFileIO(wsUrl, '', artifact);
		var serverPath = (typeof SSO_CONFIG=='object')?SSO_CONFIG.getRsrcServerPath('sso', orgNo):theSSO.getRsrcServerPath('sso', orgNo);
		wfio.download(serverPath, filename, {
			async : false,
			success: function(rslt, res) {
				if(rslt !== undefined) {
					menuRule_xn = rslt;
					if (menuRule_xn) {
						sMenuRule = new XMLSerializer().serializeToString(menuRule_xn);
					}
					
					if (typeof sMenuRule !== 'string') {
						sMenuRule = '';
					}
					else {
						window.localStorage[ls_id] = sMenuRule;
					}
				}
				else {
					theLogger.warn('-W- WebFileIO呼叫成功但夾檔資料未下載.');
				}
			},
			error: function(errorText) {
				theLogger.error('-E- getMenuRule() invoke wfio.download() failed, ErrMsg=' + errorText);
			}
		});

		return (sMenuRule.length>0) ? true : false;
	}
	
	/* 取得ODRPUI.xml 並轉為XML字串存入 localStorage[ODRPUI_$orgno$]
	 * (This is a SSOUtil method)
	 */
	function getODRPUI(artifact, orgNo, options) {
		var sODRPUI = '';
		var filename = 'ODRPUI.xml'; // 2016.7 - 目前尚未區分機關
		
		var ls_id = 'ODRPUI_' + orgNo;
		
		// 若已有資訊, 則
		if (typeof window.localStorage[ls_id] === 'string' && window.localStorage[ls_id].length) {
			return;
		}
		
		var wsUrl = '';
		if (typeof options=='object' && typeof options.url=='string' && options.url.length) {
			wsUrl = options.url;
		}
		if (wsUrl.length===0 && typeof SSO_CONFIG=='object') {
			wsUrl = SSO_CONFIG.getWSUrl('fileiows');
		}
		
		// 2014.9 - 改用WebFileIO取得Server上的設定檔...
		var wfio = new WebFileIO(wsUrl, '', artifact);
		var serverPath = (typeof SSO_CONFIG=='object')?SSO_CONFIG.getRsrcServerPath('AOL\\OD'):theSSO.getRsrcServerPath('AOL\\OD'); // , orgNo); 2016.7 - 目前尚未區分機關
		wfio.download(serverPath, filename, {
			async : false,
			success: function(rslt, res) {
				if(rslt !== undefined) {
					if (rslt) {
						sODRPUI = new XMLSerializer().serializeToString(rslt);
					}
					
					if (typeof sODRPUI !== 'string') {
						sODRPUI = '';
					}
					else {
						window.localStorage[ls_id] = sODRPUI;
					}
				}
				else {
					theLogger.warn('-W- WebFileIO呼叫成功但夾檔資料未下載.');
				}
			},
			error: function(errorText) {
				theLogger.error('-E- getMenuRule() invoke wfio.download() failed, ErrMsg=' + errorText);
			}
		});

		return (sODRPUI.length>0) ? true : false;
	}
	
	function getSignReasonList(artifact, orgNo) {
		var _sFileHeader = 'SignReasonList_';
		var sSignReasonList = '';
		var ls_id = _sFileHeader + orgNo;
		
		// 若已有資訊, 則return
		if (typeof window.localStorage[ls_id] === 'string' && window.localStorage[ls_id].length) {
			sSignReasonList = window.localStorage[ls_id];
			return sSignReasonList.length ? true : false;
		}

		//1120922 David 1111200 更新組織結構移除實體資源檔，改由timelibws.GetRsrcData取得資料
		/*var filename = ls_id + '.XML';
		
		// 2014.9 - 改用WebFileIO取得Server上的設定檔...
		var wfio = new WebFileIO(SSO_CONFIG.getWSUrl('fileiows'), '', artifact);
		var serverPath = SSO_CONFIG.getRsrcServerPath('SSO', orgNo);  // 2016.7 - 依機關區分存放位置
		wfio.download(serverPath, filename, {
			async : false,
			success: function(rslt, res) {
				if(rslt !== undefined) {
					if (rslt) {
						sSignReasonList = new XMLSerializer().serializeToString(rslt);
					}
					
					if (typeof sSignReasonList !== 'string') {
						sSignReasonList = '';
					}
					else {
						window.localStorage[ls_id] = sSignReasonList;
					}
				}
				else {
					theLogger.warn('-W- WebFileIO呼叫成功但夾檔資料未下載.');
				}
			},
			error: function(errorText) {
				theLogger.error('-E- getSignReasonList() invoke wfio.download() failed, ErrMsg=' + errorText);
			}
		});

		return (sSignReasonList.length>0) ? true : false;*/
		let params = new SOAPClientParameters();
		params.add('argArtifact', artifact);
		params.add('argTypeMain', "GenSignReasonList");
		params.add('argTypeDetail', "");
		params.add('argSourceOrgNo', orgNo);

		SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl('timelibws'), 'GetRsrcData', params, false, function (r)
		{
			if('value' in r)
				r = r.value;
			if (!r.ErrorClass.IsErr)
			{
				if (r.RtnStr !== undefined ) {
					sSignReasonList = r.RtnStr;
					window.localStorage[ls_id] = sSignReasonList;
				}
				else
					console.log("取得無法線上簽核原因異常");
			}
			else
				console.log("取得無法線上簽核原因錯誤："+r.ErrorClass.ErrMessage[0]);
		});
		return (sSignReasonList.length>0) ? true : false;
	}
	
	/*
	 *  由localStorage['orgInfo_$orgNo$']取得指定機關代碼的XML DOM object (This is a SSOUtil method)
	 *  參數: orgNo, 機關代碼
	 *  回傳值:
	 *    orgInfo: XML DOM object for orgInfo
	 * (This is a SSOUtil method)
	 */
	function getOrgNode(orgNo) {
		var sOrgInfoXML = window.localStorage['orgInfo_' + orgNo];
		
		if (typeof sOrgInfoXML === 'undefined') {
			SSOUtil.getOrgInfo(localStorage.Artifact, orgNo);
			// 1100519 Raymond 1100298 同步下載OrgInfo.xml後會儲存到localStorage, sOrgInfoXML變數要再取一次, 不然會仍是undefined
			sOrgInfoXML = window.localStorage['orgInfo_' + orgNo];
		}
		
		var parser, orgInfoDOM, orgInfoDoc, orgPath;
		var $orgNodes, orgNode, no, orgCnt, i;
		if (!!sOrgInfoXML && sOrgInfoXML.length)
		{
			parser = new DOMParser();
			orgInfoDOM = parser.parseFromString(sOrgInfoXML, 'text/xml');
			orgInfoDoc = orgInfoDOM.documentElement;
			if (orgInfoDoc) {
				$orgNodes = $(orgInfoDoc).find('OrgInfo')
							.filter(function() {
								return $('OrgCode', this).text()===orgNo;
							});
				
				if ($orgNodes.length) {
					return $orgNodes[0];
				}
			}
		}
		return null;
	}
	
	/*
	 * 取得單位名稱 (This is a SSOUtil method)
	 * 參數:
	 *	orgNode: OrgInfo xml node
	 *	unitNo:單位代碼
	 */
	function getOrgUnitName(orgNode, unitNo) {
		if (orgNode && unitNo && unitNo.length)
		{
			var unitPath = 'Unit[UnitCode="' + unitNo + '"]';
			if (!!orgNode)
			{
				var $unitNodes = $(orgNode).find(unitPath);
				if ($unitNodes.length) {
					var unitNode = $unitNodes[0];
					if (!!unitNode)
				{
					var unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
					return unitName;
				}	
			}
		}
		}
		else {
			theLogger.error('-ERR- SSOUtil.getOrgUnitName(), Invalid orgNode or unitNo.');
		}
		return '';
	}
	/*
	 * 取得角色名稱 (This is a SSOUtil method)
	 * 參數:
	 *	orgNode: OrgInfo xml node
	 *	unitNo:單位代碼
	 *	roleNo:角色代碼
	 */
	function getOrgRoleName(orgNode, unitNo, roleNo) {
		if (!!orgNode && unitNo.length && roleNo.length)
		{
			var fullPath = 'Unit[UnitCode="' + unitNo + '"] Role[RoleNo="' + roleNo + '"]';
			var $roleNodes = $(orgNode).find(fullPath);
			if ($roleNodes.length) {
				var roleNode = $roleNodes[0];
			if (roleNode)
			{
				var roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
				return roleName;
			}
		}
		}
		return '';
	}

	/* 2021.3.16 - 1090836, 取核判區分角色名稱
	*/
	function getRoleNameForDraftAppRole(orgNode, roleNo, unitNo) {
		if (orgNode==null || typeof roleNo !=='string' || roleNo.length===0) {
			return '';
		}

		let roleName = '';
		// 一級單位長官!
		if (sso_const.APPORVAL_OFFICER.indexOf(roleNo)!=-1) {
			// sc.LV1_APPROVE_UNIT_VIRTUAL_CODE = '3'; // <VIRTUAL>3</VIRTUAL>項目為一層決行單位.
			let $units = $(orgNode).find('Unit');
			if ($units.length) {
				let i=0, cntUnit=$units.length;
				for(i=0; i<cntUnit; i++) {
					let _virtual = SSOUtil.xml_getChildNodeValue($units[i], 'Virtual');
					if (_virtual!=='3') continue;

					let _fullpath = 'Role[RoleNo="' + roleNo + '"]';
					let $roleNodes = $($units[i]).find(_fullpath);
					if ($roleNodes.length) {
						roleName = SSOUtil.xml_getChildNodeValue($roleNodes[0], 'RoleName');
						return roleName;
					}
				}
			}
		}
		else if (roleNo=='OD11') { // 二層決行
			if (unitNo.length==3) {
				unitNo = unitNo.substr(0, sso_const.FIRSTCLASS_UNITNO_LEN)
			}
			roleName = SSOUtil.getOrgRoleName(orgNode, unitNo, roleNo);
			return roleName;
		}
		else if (roleNo=='OD21') { // 三層決行
			if (unitNo.length==3) {
				roleName = SSOUtil.getOrgRoleName(orgNode, unitNo, roleNo);
				return roleName;
			}
		}
		return '';
	}
	/*
	 * 取得使用者資訊 (Note:先找RoleNo/Account符合者, 若沒有, 則找Account符合者再取其角色資訊) (This is a SSOUtil method)
	 * 參數:
	 *	orgNode: OrgInfo xml node
	 *	unitNo:單位代碼
	 *	roleNo:角色代碼
	 *	account: 帳號
	 *	excludeRoleList: 排除的角色項目
	 *	excludeProxy: 排除代理項目 (2016.7)
	 * 回傳:
	 *	userInfo: 使用者資訊 OUId, OUName, RoleId, RoleName, UserId, UserName
	 */
	function getOrgUserInfo(orgNode, unitNo, roleNo, account, excludeRoleList, excludeProxy) {
		var _excludeProxy = (typeof excludeProxy === 'undefined') ? false : excludeProxy;
		if (!!orgNode && !!unitNo && unitNo.length &&
			!!account && account.length)
		//	!!roleNo && roleNo.length && !!account && account.length)
		{
			account = account.toLowerCase(); /* 2015.10 - 全部轉為小寫比對 */
			
			var unitPath = 'Unit[UnitCode="' + unitNo + '"]';
			var rolePath = '';
			if (!!roleNo && roleNo.length) {
				rolePath = 'Role[RoleNo="' + roleNo + '"]';
			}
			var occupantPath = 'RoleOccupant';
				
			var _roleNo, $unitNodes, unitNode, $roleNodes, roleNode, $roleOccupants, occupantNode;
			var userName, roleName, unitName, userInfo;
			var i=0, j=0, isProxy = false;
			if (!!orgNode)
				{
				$unitNodes = $(orgNode).find(unitPath);
				if ($unitNodes.length<=0) {
					return null;
				}
					
				unitNode = $unitNodes[0];
				if (!!unitNode)
				{
					unitName = SSOUtil.xml_getChildNodeValue(unitNode, 'UnitName');
					$roleNodes = [];
					if (!!rolePath && rolePath.length) {
						$roleNodes = $(unitNode).children(rolePath);
					}
						
					// 2014.12 - Bug fix, 支援 roleNO 未設定!	
					if ($roleNodes.length>0) {
						for(i=0; i<$roleNodes.length; i++)
						{
							roleNode = $roleNodes[i];
							if (!!roleNode) {
								roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
								$roleOccupants = $(roleNode).children(occupantPath)
													  .filter(function(){
														 /* 2015.10 - 全部轉為小寫比對 */
														 var _account = $('Account', this).text().toLowerCase();
														 return _account==account;
													  });
								if ($roleOccupants.length)
								{
									for(j=0; j<$roleOccupants.length; j++) {
										occupantNode = $roleOccupants[j];
										if (occupantNode) {
											isProxy = false;
											if (_excludeProxy) {
												isProxy = SSOUtil.xml_getAttrValue(occupantNode, 'IsProxy');
												if (typeof isProxy === 'undefined') {
													isProxy = false;
												}
												if (isProxy) continue;
											}
											
											userName = SSOUtil.xml_getChildNodeValue(occupantNode, 'Name');
											userInfo =  {
												OUId: unitNo,
												OUName: unitName,
												RoleId: roleNo,
												RoleName: roleName,
												UserId: account,
												UserName: userName
											};
											return userInfo;
										}
									}
								}
							}
						}
					}
					
					// [未指定角色]或[指定角色找不到], 找其它角色, 排除excludeRoleList
					rolePath = 'Role';
					var $roleNodes2 = $(unitNode).children(rolePath);
					var i=0, roleCnt = $roleNodes2.length;
					for (i=0; i<roleCnt; i++) {
						roleNode = $roleNodes2[i];
						_roleNo = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleNo');
						roleName = SSOUtil.xml_getChildNodeValue(roleNode, 'RoleName');
						var idx = -1;
						if (typeof excludeRoleList !== 'undefined' &&
							excludeRoleList!==null &&
							(excludeRoleList.legnth>0))
						{
							excludeRoleList.indexOf(_roleNo);
						}
						
						if (idx===-1)
						{
							$roleOccupants = $(roleNode).children(occupantPath)
											 .filter(function(){
											     /* 2015.10 - 全部轉為小寫比對 */
											     var _account = $('Account', this).text().toLowerCase();
												 return _account==account;
											 });
							if ($roleOccupants.length) {
								for(j=0; j<$roleOccupants.length; j++) {
									occupantNode = $roleOccupants[j];
							
									isProxy = false;
									if (_excludeProxy) {
										isProxy = SSOUtil.xml_getAttrValue(occupantNode, 'IsProxy');
										if (typeof isProxy === 'undefined') {
											isProxy = false;
										}
										if (isProxy) continue;
									}
								
									if (occupantNode) {
										userName = SSOUtil.xml_getChildNodeValue(occupantNode, 'Name');
										userInfo =  {
											OUId: unitNo,
											OUName: unitName,
											RoleId: _roleNo,
											RoleName: roleName,
											UserId: account,
											UserName: userName
										};
										return userInfo;
									}
								}
							}
						}
					}
				}
			}
		}
		return null;
	}
	
	/* 取得單位名稱 (This is a SSOUtil method)
	 * 參數:
	 *	orgNode: OrgInfo xml node
	 *	unitNo:單位代碼
	 */
	function getUnitName(orgNo, unitNo)
	{
		var sOrgInfoXML = window.localStorage['orgInfo_' + orgNo];
		if (!!sOrgInfoXML && sOrgInfoXML.length)
		{
			var parser = new DOMParser();
			var orgInfoDOM = parser.parseFromString(sOrgInfoXML, 'text/xml');
			var orgInfoDoc = orgInfoDOM.documentElement;
			var orgPath = 'OrgInfo';
			var unitPath = 'Unit[UnitCode="' + unitNo + '"]';
			if (!!orgInfoDoc) {
				var $orgNodes = $(orgInfoDoc).children(orgPath)
								.filter(function() {
									return $('OrgCode', this).text()===orgNo;
								});
				if ($orgNodes.length<=0) {
					return '';
				}
				
				var orgInfo = $orgNodes[0];
				if (!!orgInfo) {
					var $unitNodes = $(orgInfo).find(unitPath);
					if ($unitNodes.length<=0) {
						return '';
					}
						
					var unitInfo = $unitNodes[0];
					if (!!unitInfo)
					{
						var unitName = SSOUtil.xml_getChildNodeValue(unitInfo, 'UnitName');
						return unitName;
					}
				}
			}
		}
		return '';
	}
	/* 取得單位名稱 (This is a SSOUtil method)
	 * 參數:
	 *	orgNode: OrgInfo xml node
	 *	unitNo:單位代碼
	 */
	// 1100831 Raymond 1101086 新增選用的第3參數ownOUId, 若找到符合名稱的單位超過1個, 則以ownOUId前2碼過濾, 回傳與目前使用者同一級單位的二級單位代碼(內會用途)
	//function getOrgUnitNoByName(orgNode, unitName)
	function getOrgUnitNoByName(orgNode, unitName, ownOUId)
	{
		if (typeof orgNode != 'object') return '';
		if (typeof unitName!='string' || unitName.length===0) return '';
		
		var $unitNodes = $(orgNode).find('Unit').filter(function() {
								// 1100406 Raymond 1100090 修正若Unit下還有Unit, $('UnitName', this)會取到自已的UnitName及包含所有子Unit的UnitName的連在一起的字串, 導致無法取得單位代碼的問題
								//return $('UnitName', this).text()===unitName;
								return $('> UnitName', this).text()===unitName;
							});
		
		if ($unitNodes.length<=0) {
			return '';
		}
		
		// 1100831 Raymond 1101086 若找到符合名稱的單位超過1個且第3參數ownOUId有值, 則以ownOUId前2碼過濾, 回傳與目前使用者同一級單位的二級單位代碼(內會用途)
		if($unitNodes.length > 1 && !!ownOUId) {
			var ownOUIdLv1 = ownOUId.substr(0, 2);
			$unitNodes = $unitNodes.filter(function() {
				return $("> UnitNo", this).text().substr(0, 2) == ownOUIdLv1;
			});
			if($unitNodes.length <= 0) {
				theLogger.warn("以OWN_OU_ID的一級單位代碼(" + ownOUIdLv1 + ")過濾後, 重名的單位中無符合的二級單位");
				return '';
			}
			else {
				if($unitNodes.length > 1) {
					var uo = [];
					$unitNodes.each(function() {
						uo.push($("> UnitNo", this).text());
					});
					theLogger.warn("以OWN_OU_ID的一級單位代碼(" + ownOUIdLv1 + ")過濾後, 重名的單位中符合的二級單位仍有" + $unitNodes.length + "個(" + uo.join(",") + "), 只能取第一個的單位代碼回傳");
				}
				var unitInfo = $unitNodes[0];
			}
		}
		else
		var unitInfo = $unitNodes[0];
		if (!!unitInfo) {
			var unitNo = SSOUtil.xml_getChildNodeValue(unitInfo, 'UnitNo');
			return unitNo;
		}
		return '';
	}
	/* 依角色取得頭像圖示. (This is a SSOUtil method) */
	function getRoleIconPathname(orgNo, unitNo, roleId)
	{
		/*#define ROLENO_DISPATCH  _T("OD16")   // 分辦人員
		#define ROLENO_REGISTER    _T("OD17")   // 登記桌
		#define ROLENO_RECEIVER    _T("OD91")   // 收文人員
		#define ROLENO_PRINT       _T("OD92")   // 繕印人員
		#define ROLENO_CHECK	   _T("OD93")   // 校對人員
		#define ROLENO_ISSUER	   _T("OD94")   // 發文人員
		#define ROLENO_FILEMGR     _T("OD95")   // 檔管人員
		#define ROLENO_RDEXAM	   _T("OD96")   // 研考人員
		OD21~OD25 => 二級單位(單位代碼長度為3碼)長官;21最大, 25最小
		OD11~OD15 => 一級單位長官;11最大, 15最小
		OD01~OD06 => 一層決行單位長官; 01最大, 06最小
		0D99 => 承辦人
		*/
		if (typeof roleId == 'string') {
			switch(roleId) {
			case 'OD99': return 'IMAGE/WorkFlow/clerk.png';
			case 'OD22': case 'OD23':
			case 'OD24': case 'OD25':
				return 'IMAGE/workflow/lv2_unit_subboss.png';
			case 'OD21': return 'IMAGE/WorkFlow/lv2_unit_boss.png';
			case 'OD12': case 'OD13':
			case 'OD14': case 'OD15':
				return 'IMAGE/WorkFlow/unit_subboss.png';
			case 'OD11': return 'IMAGE/WorkFlow/unit_boss.png';
			case 'OD02': case 'OD03':
			case 'OD04': case 'OD05':
			case 'OD06':
				return 'IMAGE/WorkFlow/subboss.png';
			case 'OD01': return 'IMAGE/WorkFlow/portrait_boss.png';
			}
		}
		return 'IMAGE/WorkFlow/portrait_empty.png';
	}
	/* 2013.4 - Erin, 取得MPUiSetting.xml
	 *
	 * Note: P2實作,MPUiSetting.xml檔暫時放置於網站應用程式資料夾的/Other子目錄下 (This is a SSOUtil method)
	 */
	function getMPUiSetting(artifact)
	{
		function _parseFont(fontNode) {
			var colorNodes = $(fontNode).find('COLOR');
			var colorRed = SSOUtil.xml_getChildNodeValue(colorNodes,'RED');
			var colorGreen = SSOUtil.xml_getChildNodeValue(colorNodes,'GREEN');
			var colorBlue = SSOUtil.xml_getChildNodeValue(colorNodes,'BLUE');
			
			// 2016.9.6 - 另外記錄CSS color code string
			var r=0,g=0,b=0;
			r = parseInt(colorRed);
			g = parseInt(colorGreen);
			b = parseInt(colorBlue);
			if (r<0 || isNaN(r)) r=0; if (r>255) r=255;
			if (g<0 || isNaN(g)) g=0; if (g>255) g=255;
			if (b<0 || isNaN(b)) b=0; if (b>255) b=255;
			var code = '#' + SSOUtil.jf_PADL2(r.toString(16).toUpperCase(), 2, '0') +
					   SSOUtil.jf_PADL2(g.toString(16).toUpperCase(), 2, '0') +
					   SSOUtil.jf_PADL2(b.toString(16).toUpperCase(), 2, '0');
			
			var font = {
				'color': {'red': colorRed, 'green': colorGreen, 'blue': colorBlue, 'code': code},
			};
			return font;
		}
		function _parseProxySetting(proxySettingNodes) {
			var newfolder = SSOUtil.xml_getChildNodeValue(proxySettingNodes, 'NEWFOLDER');
			var newsubfolder = SSOUtil.xml_getChildNodeValue(proxySettingNodes, 'NEWSUBFOLDER');
			var pFolderItemStyleNodes = $(proxySettingNodes).find('FOLDER_ITEM_STYLE');
			if (pFolderItemStyleNodes.length) {
				pFolderItemStyle = _parseFolderItemStyle(pFolderItemStyleNodes);
			}
			else{
				theLogger.log("MPUiSetting.xml裡找不到PROXY_SETTING下的FOLDER_ITEM_STYLE子節點");
			}
			var proxySetting = {
				'newfolder': newfolder,
				'newsubfolder': newsubfolder,
				'folderItemStyle': pFolderItemStyle,
			};
			return proxySetting;
		}
		function _parseFolderItemStyle(folderItemStyleNode) {
			var fontNode = $(folderItemStyleNode).find('FONT');
			font = _parseFont(fontNode);
			var imageIndex = SSOUtil.xml_getChildNodeValue(folderItemStyleNode, 'IMAGE_INDEX');
			var folderItemStyle = {
				'font': font,
				'imageIndex': imageIndex,
			};
			return folderItemStyle;
		}
		function _parseFolderUISetting(UISettingNode) {
			var folder = SSOUtil.xml_getChildNodeValue(UISettingNode, 'FOLDER');
			var subfolder = SSOUtil.xml_getChildNodeValue(UISettingNode, 'SUBFOLDER');
			
			var folderItemStyleNodes = $(UISettingNode).find('FOLDER_ITEM_STYLE');
			var proxySettingNodes = $(UISettingNode).find('PROXY_SETTING');
			
			var folderItemStyle, proxySetting;
			if (folderItemStyleNodes.length) {
				folderItemStyle = _parseFolderItemStyle(folderItemStyleNodes[0]);//1是proxy_setting裡的
			}
			else {
				// error handling....
				theLogger.warn("MPUiSetting.xml裡找不到FOLDER_UI_SETTING下的FOLDER_ITEM_STYLE子節點");
			}
	
			if (proxySettingNodes) {
				proxySetting = _parseProxySetting(proxySettingNodes);
			}
			else {
				// error handling....
				theLogger.warn("MPUiSetting.xml裡找不到FOLDER_UI_SETTING下的PROXY_SETTING子節點");
			}
			
			var folderUISetting = {
				'folder': folder,
				'subfolder': subfolder,
				'folderItemStyle': folderItemStyle,
				'proxySetting': proxySetting,
			};
			//theLogger.log(folderUISetting);
			return folderUISetting;
		}
		
		var rsltArray;
		
		var setting_xn = null;
		var filename = 'MPUiSetting.xml';
				
		// 2014.9 - 改用WebFileIO取得Server上的設定檔...
		var wfio = new WebFileIO(SSO_CONFIG.getWSUrl('fileiows'), '', artifact);
		var serverPath = SSO_CONFIG.getRsrcServerPath('sso', ''); // @ DEFAULT/SSO
		wfio.download(serverPath, filename, {
			async : false,
			success: function(rslt, res) {
				var arraySetting = [];
				var obj = {};
				var $rslt = $(rslt);
				var settings = $rslt.find('FOLDER_UI_SETTING');
				
				if (settings.length) {
					for (var i=0;i<settings.length;i++) {
						var setting = settings[i];
						var folderUISetting = _parseFolderUISetting(setting);
						arraySetting.push(folderUISetting);
					}
					rsltArray = arraySetting;
				}
				else {
					theLogger.warn('-W- WebFileIO呼叫成功但夾檔資料未下載.');
				}
			},
			error: function(errorText) {
				theLogger.error('-ERR- getMPUiSetting failed. reason:' + errorText);
			}
		});
		
		return rsltArray;
	}
	
	// 取得公文流程明細 (This is a SSOUtil method)
	function getDocToDoList(docNo, SAMLart, options)
	{
		// 2021.5 - 1100093 - merge: 獨立為function
		function _makeToDoListJSObj(nodeToDoList) {
			var $items = $(nodeToDoList).find('TODO_LIST');
			let docToDoList = [];
			for(var i=0; i<$items.length; i++) {
				var item = $items[i];
				
				var flowItem = {};
				SSOUtil.convertXMLNodeToObj(item, fieldnames, flowItem, objAttrs);
				if (flowItem.ownUserId.length) {
					flowItem.ownUserId = flowItem.ownUserId.toUpperCase();
				}
				if (flowItem.toUserId.length) {
					flowItem.toUserId = flowItem.toUserId.toUpperCase();
				}
				
				if (docToDoList === null) {
					docToDoList = [];
				}
				docToDoList.push(flowItem);
			}
			return docToDoList;
		}

		// 2018.4.12 - 1070463, 新增PROXY_SEND以判定代理人簽辦!
		var fieldnames = ['MSG_ID', 'FOLDER', 'SUBFOLDER', 'OWN_USER_ID', 'OWN_OU_ID',
						  'OWN_OU_NAME', 'OWN_ROLE_ID', 'INCHARGE_OU', 'SOURCE_ORGNO', 'TX_NAME',
						  'TX_REASON', 'TX_TIME', 'TX_FLAG', 'WWKF_MARK', 'TMP_CER',
						  'THREAD', 'STD_HOUR', 'ACT_HOUR', 'FROM_OU', 'FROM_OU_ID',
						  'FROM_USER', 'FROM_USER_ID', 'TO_USER_ID', 'TO_USER_NAME', 'TO_OU_ID',
						  'TO_OU_NAME', 'TO_ROLE_ID', 'TO_ROLE_NAME', 'APP_USER_ID', 'APP_USER_NAME',
						  'APP_ROLE_ID', 'REJECT_USER_NAME', 'FROM_MSG_ID', 'FROM_THREAD', 'FROM_THREAD_MSG_ID',
						  'SIGN_TYPE', 'SIGN_TIME', 'NEW_TIME', 'PROXY_SEND'];
		var objAttrs = ['msgId', 'folder', 'subfolder', 'ownUserId', 'ownOUId',
						 'ownOUName', 'ownRoleId', 'inChargeOU', 'sourceOrgNo', 'txName',
						 'txReason', 'txTime', 'txFlag', 'wwkfMark', 'tmpCer',
						 'thread', 'stdHour', 'actHour', 'fromOU', 'fromOUId',
						 'fromUser', 'fromUserId', 'toUserId', 'toUserName', 'toOUId',
						 'toOUName', 'toRoleId', 'toRoleName', 'appUserId', 'appUserName',
						 'appRoleId', 'rejectUserName', 'fromMsgId', 'fromThread', 'fromThreadMsgId',
						 'signType', 'signTime', 'newTime', 'proxySend' ];
			
		// 2021.5 - 1100093 - merge: 2020.3.4 - 1081168 Eric Peng, 支援非同步作業!
		if (typeof options !== 'undefined' && (typeof options.async !== 'undefined') && options.async==true) {
			let _dfd = $.Deferred();
			theWebServices.odmssp.getDocToDoList(SAMLart, docNo, options)
			.done(function(rslt) {
				let _docToDoList = _makeToDoListJSObj(rslt.m_docToDoList);
				if (_docToDoList.length) {
					_dfd.resolve({success:true, 'docToDoList': _docToDoList});
				}
				else {
					_dfd.reject({success:false, errMsg: '回傳內容無<TODO_LIST>項目'});
				}
			})
			.fail(function(errRslt) {
				_dfd.reject(errRslt);
			});
			return _dfd.promise();
		}
		else {
			var rslt = theWebServices.odmssp.getDocToDoList(SAMLart, docNo, options);	
			let _docToDoList = _makeToDoListJSObj(rslt.m_docToDoList);
			return _docToDoList;
		}
	}
	
	//1140924	Leslie[退輔會序170]	修正複數機關環境，彙併辦子文因重覆文號造成子文未正確加簽的問題
	function getDocToDoList2(sourceOrgNo, docNo, SAMLart, options)
	{
		// 2021.5 - 1100093 - merge: 獨立為function
		function _makeToDoListJSObj(orgNo, nodeToDoList) {
			var $items = $(nodeToDoList).find('TODO_LIST');
			let docToDoList = [];
			for(var i=0; i<$items.length; i++) {
				var item = $items[i];
				
				var flowItem = {};
				SSOUtil.convertXMLNodeToObj(item, fieldnames, flowItem, objAttrs);
				if (flowItem.ownUserId.length) {
					flowItem.ownUserId = flowItem.ownUserId.toUpperCase();
				}
				if (flowItem.toUserId.length) {
					flowItem.toUserId = flowItem.toUserId.toUpperCase();
				}
				
				if (docToDoList === null) {
					docToDoList = [];
				}

                // 2023.9.27 - Eric 屏東序145
                if (flowItem.sourceOrgNo==orgNo) {
                    docToDoList.push(flowItem);
                }
                else {
                    theLogger.warn('流程明細項目MsgId=\'' + flowItem.msgId + '\' sourceOrgNo=\'' + flowItem.sourceOrgNo + '\' 與公文[OrgNo=\'' + orgNo + '\']不符!')
                }
			}
			//1130118	Leslie[屏東序403]	修改並追查子文未封裝問題，改為彙併辦子文檢核失敗時阻擋以避免後續封裝問題
			docToDoList.rawXml = JSON.stringify(nodeToDoList);
			return docToDoList;
		}

		// 2018.4.12 - 1070463, 新增PROXY_SEND以判定代理人簽辦!
		var fieldnames = ['MSG_ID', 'FOLDER', 'SUBFOLDER', 'OWN_USER_ID', 'OWN_OU_ID',
						  'OWN_OU_NAME', 'OWN_ROLE_ID', 'INCHARGE_OU', 'SOURCE_ORGNO', 'TX_NAME',
						  'TX_REASON', 'TX_TIME', 'TX_FLAG', 'WWKF_MARK', 'TMP_CER',
						  'THREAD', 'STD_HOUR', 'ACT_HOUR', 'FROM_OU', 'FROM_OU_ID',
						  'FROM_USER', 'FROM_USER_ID', 'TO_USER_ID', 'TO_USER_NAME', 'TO_OU_ID',
						  'TO_OU_NAME', 'TO_ROLE_ID', 'TO_ROLE_NAME', 'APP_USER_ID', 'APP_USER_NAME',
						  'APP_ROLE_ID', 'REJECT_USER_NAME', 'FROM_MSG_ID', 'FROM_THREAD', 'FROM_THREAD_MSG_ID',
						  'SIGN_TYPE', 'SIGN_TIME', 'NEW_TIME', 'PROXY_SEND'];
		var objAttrs = ['msgId', 'folder', 'subfolder', 'ownUserId', 'ownOUId',
						 'ownOUName', 'ownRoleId', 'inChargeOU', 'sourceOrgNo', 'txName',
						 'txReason', 'txTime', 'txFlag', 'wwkfMark', 'tmpCer',
						 'thread', 'stdHour', 'actHour', 'fromOU', 'fromOUId',
						 'fromUser', 'fromUserId', 'toUserId', 'toUserName', 'toOUId',
						 'toOUName', 'toRoleId', 'toRoleName', 'appUserId', 'appUserName',
						 'appRoleId', 'rejectUserName', 'fromMsgId', 'fromThread', 'fromThreadMsgId',
						 'signType', 'signTime', 'newTime', 'proxySend' ];
		
		//1140509 David 屏東序1142 新增取得先簽核決者資訊
		fieldnames.push('SIGNDRAFT_APP_NAME');
		objAttrs.push('SignDraftAppName');
			
		// 2021.5 - 1100093 - merge: 2020.3.4 - 1081168 Eric Peng, 支援非同步作業!
		if (typeof options !== 'undefined' && (typeof options.async !== 'undefined') && options.async==true) {
			let _dfd = $.Deferred();
            // 2023.9 - Eric 屏東序145, 未傳入OrgNo會回傳所有同文號的流程資訊問題修正
			theWebServices.odmssp.getDocToDoList2(SAMLart, sourceOrgNo, docNo, options)
			.done(function(rslt) {
				let _docToDoList = _makeToDoListJSObj(sourceOrgNo, rslt.m_docToDoList);
				if (_docToDoList.length) {
					_dfd.resolve({success:true, 'docToDoList': _docToDoList});
				}
				else {
					_dfd.reject({success:false, errMsg: '回傳內容無<TODO_LIST>項目'});
				}
			})
			.fail(function(errRslt) {
				_dfd.reject(errRslt);
			});
			return _dfd.promise();
		}
		else {
            // 2023.9 - Eric 屏東序145, 未傳入OrgNo會回傳所有同文號的流程資訊問題修正
			var rslt = theWebServices.odmssp.getDocToDoList2(SAMLart, sourceOrgNo, docNo, options);	
			let _docToDoList = _makeToDoListJSObj(sourceOrgNo, rslt.m_docToDoList);
			return _docToDoList;
		}
	}
	
	// 串接檔案路徑(以'\'分隔子目錄) (This is a SSOUtil method)
	function combineLocalPath(pathPart1, pathPart2)
	{
		function _addBackSlashTail(path) {
			if (!!path && (path.substring(path.length-1, 1)!=='\\')) {
				path += '\\';
			}
			return path;
		}
		
		function _removeBackSlashHead(path) {
			if (!!path && path.length>1) {
				if (path.substring(0, 1)==='\\') {
					var s = path.substring(1);
					return s;
				}
				return path;
			}
			return '';
		}
		
		var s1 = pathPart1, s2 = '';
		if (pathPart1.length) {
			s1 = _addBackSlashTail(pathPart1);
		}
			
		if (pathPart2.length) {
			s2 = _removeBackSlashHead(pathPart2);
		}
		
		var fullPath = s1 + s2;
		return fullPath;
	}
	/*
	 * 目的: 產生ODWMSG的XML DOM object (this is a SSOUtil method)
	 */
	function getODWMSG_XMLDOMObj(docObj)
	{
		if (!docObj) {
			return null;
		}
		
		var ODWMSG_Obj = docObj.ODWMSG;
		if (!ODWMSG_Obj) {
			return null;
		}
		
		/* for SIGN_TYPE ="E", "P" */
		var mapForUpdate = [
			{ attr: 'subject', nodeName: 'SUBJECT' }, 
			{ attr: 'dueDate', nodeName: 'DUE_DATE' }, 
			{ attr: 'outLMT', nodeName: 'MSG_OUT_LMT' }, 
			{ attr: 'alarmLMT', nodeName: 'MSG_ALM_LMT' }, 
			{ attr: 'alarmTime', nodeName: 'ALARM_TIME' }, 
			{ attr: 'docState', nodeName: 'DOC_STATE' }, 
			
			{ attr: 'secret', nodeName: 'SECRETE' }, 
			{ attr: 'speed', nodeName: 'SPEED' }, 
			{ attr: 'fromOUName', nodeName: 'FROM_OU' },  // 送文單位
			
			{ attr: 'txName', nodeName: 'TX_NAME' }, // 異動別
			{ attr: 'toOUId', nodeName: 'TO_OU_ID' },  // 傳送至
			{ attr: 'toOUName', nodeName: 'TO_OU_NAME' },
			{ attr: 'toRoleId', nodeName: 'TO_ROLE_ID' },
			{ attr: 'toRoleName', nodeName: 'TO_ROLE_NAME' },
			{ attr: 'toUserId', nodeName: 'TO_USER_ID' },
			{ attr: 'toUserName', nodeName: 'TO_USER_NAME' },
			
			/* 2013.12 - 核決/剔退可能異動的欄位 */
			{ attr: 'appUserId', nodeName: 'APP_USER_ID' },
			{ attr: 'appUserName', nodeName: 'APP_USER_NAME' },
			{ attr: 'appRoleId', nodeName: 'APP_ROLE_ID' },
			{ attr: 'rejectUserName', nodeName: 'REJECT_USER_NAME' },
			
			/* 2014.9 - 是否使用臨時憑證加簽 */
			{ attr: 'tmpCert', nodeName: 'TMP_CER' }
		];
		
		// update docObj attributes to ODWMSG
		for (var i=0; i<mapForUpdate.length; i++) {
			var mapItem = mapForUpdate[i];
			if (typeof docObj[mapItem.attr] === 'undefined') {
				theLogger.warn('-W- docObj.' + mapItem.attr + ' attribute is undefined!');
				continue;
			}
			ODWMSG_Obj[mapItem.nodeName] = docObj[mapItem.attr];
		}
		/* 2015.3.6 - Eric Peng, the 3rd parameter should be null */
		var xmlDoc = document.implementation.createDocument('', 'ODWMSG', null);
		for(var propertyName in ODWMSG_Obj) {
			var value = ODWMSG_Obj[propertyName];
			
			var elem = xmlDoc.createElement(propertyName);
			var txtElem = xmlDoc.createTextNode(value);
			elem.appendChild(txtElem);
			xmlDoc.documentElement.appendChild(elem);
		}
		
		var serializer = new XMLSerializer();
		theLogger.debug(serializer.serializeToString(xmlDoc));
		
		return xmlDoc;
	}
	
	/*
	 * 目的: 產生ODWDCM的XML DOM object (this is a SSOUtil method)
	 */
	function getODWDCM_XMLDOMObj(ODWDCM_Obj) {
		if (!ODWDCM_Obj) {
			theLogger.warn('-W- getODWDCM_XMLDOMObj() ODWDCM_Obj is null');
			return null;
		}
		
		/*
		 * ODWDCM.XML檔案layout:
		 * <root>
		 *   <item>
		 *    <欄位1>...</欄位1>
		 *    <欄位2>...</欄位2>
		 *    ...
		 *   </item>
		 * </root>
		 */
		var elemComNo, elemComDoc, comNoObj, comDocObj;
		var elem, value, txtElem;
		var idx;
		/* 2015.3.6 - Eric Peng, the 3rd parameter should be null */
		var xmlDoc = document.implementation.createDocument('', 'root', null);
		var xmlItem = xmlDoc.createElement('item');
		for(var propertyName in ODWDCM_Obj) {
			// 2014.3 - COM_NO欄位內容有子欄位, 應特別處理!
			if (propertyName==='COM_NO') {
				elemComNo = null; comNoObj = null;
				comNoObj = ODWDCM_Obj[propertyName];
				// COM_NO object 為一 array.
				if ((comNoObj != null) && (comNoObj.length>=1)) { // 2016.12.12 - Eric Peng, bug-fix, 只有一筆時亦可以儲存!
					elemComNo = xmlDoc.createElement(propertyName);
					for(idx=0; idx<comNoObj.length; idx++) {
						comDocObj = comNoObj[idx];
						elemComDoc = xmlDoc.createElement('DOC');// 2016.12.6 - 應為'DOC'而非'DOC_NO'
						for(var propName in comDocObj) {
							value = null; elem = null; txtElem = null;
							elem = xmlDoc.createElement(propName);
							value = comDocObj[propName];
							txtElem = xmlDoc.createTextNode(value);
							elem.appendChild(txtElem);
							elemComDoc.appendChild(elem);
						}
						elemComNo.appendChild(elemComDoc);
					}
					xmlItem.appendChild(elemComNo);
				}
				else {
					elemComNo = xmlDoc.createElement(propertyName);
					xmlItem.appendChild(elemComNo);
				}
			}
			else if (propertyName==='COM_DOC_COMBINE_TYPE') {
				// 2016.7 - client only, don't write back
			}
			else if (propertyName=='REF_DOC') { // 2021.6 - 1080761 Eric, merge 2018.5.14 - 1070298, 參考公文
				let elemRefDoc=null, elemRDoc=null, refDocObj=null, _rDocObj=null;
				let elem, value, txtElem;
				refDocObj = ODWDCM_Obj[propertyName];
				// REF_DOC object 為一 array.
				if ((refDocObj !== null) && (refDocObj.length>=1)) {
					elemRefDoc = xmlDoc.createElement(propertyName);
					for(idx=0; idx<refDocObj.length; idx++) {
						_rDocObj = refDocObj[idx];
						elemRDoc = xmlDoc.createElement('DOC');
						for(var propName in _rDocObj) {
							if (_rDocObj.hasOwnProperty(propName)) {
								value = null; elem = null; txtElem = null;
								elem = xmlDoc.createElement(propName);
								value = _rDocObj[propName];
								txtElem = xmlDoc.createTextNode(value);
								elem.appendChild(txtElem);
								elemRDoc.appendChild(elem);
							}
						}
						elemRefDoc.appendChild(elemRDoc);
					}
					xmlItem.appendChild(elemRefDoc);
				}
				else {
					elemRefDoc = xmlDoc.createElement(propertyName);
					xmlItem.appendChild(elemRefDoc);
				}
			}
			else {
				value = null; elem = null; txtElem = null;
				value = ODWDCM_Obj[propertyName];
				elem = xmlDoc.createElement(propertyName);
				txtElem = xmlDoc.createTextNode(value);
				elem.appendChild(txtElem);
				xmlItem.appendChild(elem);
			}
		}
		xmlDoc.documentElement.appendChild(xmlItem);
		
		var serializer = new XMLSerializer();
		theLogger.debug(serializer.serializeToString(xmlDoc));
		
		return xmlDoc;
	}
	
	/*
	 * 目的: Show loading animation (This is a SSOUtil method)
	 */
	function loading(showOrHide, opts) {
		setTimeout(function() {
			// 2025.6.12 - Eric, 1140166, (merge 1130291) RD-DocCompare.html網頁沒有jQM
            if (!!$.mobile) {
				$.mobile.loading(showOrHide, opts);
			}
		});
	}
	/*
	 * 目的: 取得中文時間字串, 格式: mm/dd hh:MM:ss
	 */
	function _getROCTime(timeObj) {
		if (!!timeObj) {
			var month, date, hour, minute, second;
			month =  SSOUtil.jf_PADL2((timeObj.getMonth()+1).toString(), 2, '0');
			date = SSOUtil.jf_PADL2(timeObj.getDate().toString(), 2, '0');
			hour = SSOUtil.jf_PADL2(timeObj.getHours().toString(), 2, '0');
			minute = SSOUtil.jf_PADL2(timeObj.getMinutes().toString(), 2, '0');
			second = SSOUtil.jf_PADL2(timeObj.getSeconds().toString(), 2, '0'); 
			var sTime = '' + month + '/' + date + ' ' +
						hour + ':' + minute + ':' + second;
			return sTime;
		}
		return '';
	}
	/*
	 * 目的: 取得指定名稱的網址參數設定值
	 */
	function _getURLParameter(paraname) {
		var rslt = decodeURIComponent((new RegExp('[?|&]' + paraname + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
		if (typeof rslt !== 'string') {
			return '';
		}
		else {
			return rslt;
		}
	}
	
	/* 2015.11.27
	 * 目的: 產生ODWMSG的XML DOM object (this is a SSOUtil method)
	 */
	function _uploadWWKFFile(docObj, strWWKF_XML, serverPath)
	{
		var _dfd = $.Deferred();
		var WWKF_XmlObj = (new window.DOMParser()).parseFromString(strWWKF_XML, 'text/xml');
		if (typeof WWKF_XmlObj==='undefined' || WWKF_XmlObj===null) {
            _dfd.reject({Success:false, ErrMsg:'WWKF的XML字串內容不正確!'});
			return _dfd.promise();
        }
		
		var serializer = new XMLSerializer();
		theLogger.debug('wwkf=' + serializer.serializeToString(WWKF_XmlObj));
		
		var wfio = new WebFileIO(docObj.fileIOWS);
		wfio.upload(serverPath, 'ODWWKF-00.xml', WWKF_XmlObj, {
			success: function(rslt) {
				theLogger.log('-=ODWWKF-00.xml上傳完畢=-');
				_dfd.resolve({Success:true});
			},
			error: function(errorText) {
				theLogger.warn('-W- ODWWKF-00.xml上傳失敗! ' + errorText);
				_dfd.reject({Success:false, ErrMsg:'ODWWKF-00.XML上傳失敗, ' + errorText});
			},
			async: false
		});
		return _dfd.promise();
	}
	/* 2015.12.4
	 * 取得指定單位的VirtualCode (This is a SSOUtil method)
	 * 參數:
	 *	orgNode: OrgInfo xml node
	 *	unitNo:單位代碼
	 * 回傳:
	 *	virtualCode: <Unit><VirtualCode>欄位值
	 */
	function _getOrgUnitVirtualCode(orgNode, unitNo) {
		if (!!orgNode && !!unitNo && unitNo.length)
		{
			var unitPath = 'Unit[UnitCode="' + unitNo + '"]';
			var $unitNodes, unitNode, virtualCode;
			var i=0;
			if (!!orgNode)
			{
				$unitNodes = $(orgNode).find(unitPath);
				if ($unitNodes.length<=0) {
					return '';
				}
					
				unitNode = $unitNodes[0];
				if (!!unitNode)
				{
					virtualCode = SSOUtil.xml_getChildNodeValue(unitNode, 'Virtual');
					if (typeof virtualCode !== 'undefined' && virtualCode.length) {
                        return virtualCode;
                    }
				}
			}
		}
		return '';
	}
				
	/* 2015.12.4
	 * 目的: 檢核公文目前是否為會辦中
	 */
	function _isConsultingDoc(docObj, envSet, orgNode) {
		if ((typeof docObj !== 'undefined') && docObj) {
			var ownOUId = docObj.ownOUId;
			var ICOUId = docObj.ICOUId;
			var lv1ICOU  = (ICOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN) ? ICOUId.substr(0, 2) : ICOUId;
			var lv1OwnOU = (ownOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN) ? ownOUId.substr(0, 2) : ownOUId;
			var atInchargeUnit = false;
			var virtualCode = '';

        	if (lv1ICOU == lv1OwnOU) {
				atInchargeUnit = true;
			}
			
			if (ownOUId.length==sso_const.FIRSTCLASS_UNITNO_LEN && (ownOUId==lv1ICOU)){
                atInchargeUnit = true;
            }
			
			if (atInchargeUnit) {
				// 2017.8.23 - 1060791, 內會依Jerry要求, 新增額外判定
				if (ownOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN) {
					// OWN_OU_DI為3碼, 與INCHARGE_OU不同則視為會辦
					if (ownOUId!=ICOUId) {
						return true;
					}
				}
				else {
					// OWN_OU_DI為2碼, 與INCHARGE_OU前2碼不同則視為會辦
					if (ownOUId!=lv1ICOU) {
						return true;
					}
				}

				// 與承辦單位同一級單位, 檢核是否為內會
                var sCoopFolders = envSet['OD_INNER_COOP_FOLDER'];

				// 2017.8.21 - Eric, 1060791 - 變數名稱應為"OD_INNER_COOP_FOLDERS" (結尾有'S')
				if ((typeof sCoopFolders =='undefined') || sCoopFolders.length) {
					sCoopFolders = envSet['OD_INNER_COOP_FOLDERS'];
				}

				if ((typeof sCoopFolders !=='undefined') && sCoopFolders.length) {
					var coopFolders = sCoopFolders.split(';'); // 2017.8.21 - Eric, 1060791-bug-fix
					if (coopFolders.length) {
						var curFolder = docObj.folder + '-' + docObj.subfolder;
						if (coopFolders.indexOf(curFolder)!=-1) {
							return true;
						}
					}
				}

				return false;
            }
			
			// 與承辦單位不同一級單位
			if (!!orgNode) {
                virtualCode = _getOrgUnitVirtualCode(orgNode, lv1OwnOU);
				if ((typeof virtualCode !=='undefined') && virtualCode.length){
                    if (virtualCode!=sso_const.LV1_APPROVE_UNIT_VIRTUAL_CODE && virtualCode!=sso_const.VIRTUAL_UNIT_VIRTUAL_CODE) {
						// 非虛擬單位及一層決行單位 => 會辦.
						return true;
                    }
                }
            }
		}
		return false;
	}
	
	/* 2016.6
	 * 目的: 由外部HTML檔將模組內容載入SSO網頁 (首頁/AOL/公文檢索/UniView)
	 */
	function _injectHTMLModule(url, $container) {
		var d = $.Deferred();
		
		// 2016.10.18 - 若html沒有網址參數, 加artifact (避免client使用cache檔案)
		if (typeof url=='string' && url.length) {
			if (url.indexOf('?')==-1 && typeof localStorage.Artifact=='string' && localStorage.Artifact.length) {
				//1140505	Leslie[1140556]	取消網址參數權杖
				// url += ('?' + localStorage.Artifact);
				url += ('?' + Date.now());
			}
		}
		
		$.get(url, function(data, statusText, jqXHR) {
			if (!!$container) {
				var $wrapper = $('<div></div>');
				//1140723	Leslie[1141011]	弱掃修正[Client DOM Stored XSS](使用此功能開啟的html，經查均未使用內置或外部javascript
				// $wrapper.get(0).innerHTML = data;
				// 1140801	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]，試用套件消毒
				// $wrapper.get(0).innerHTML = data.replace(/javascript/ig,'').replace(/<script/ig,'');
				$wrapper.get(0).innerHTML = DOMPurify.sanitize(data, {WHOLE_DOCUMENT: true, ADD_TAGS: ['iframe'], ADD_ATTR:['accessKey']});
				var $module = $wrapper.find(":jqmData(ssomodule='true'), :jqmData(role='page')");
                $container.get(0).innerHTML = $module.get(0).innerHTML;
				d.resolve($container);
            }
			else {
				d.reject('container is null');
			}
		});
		return d.promise();
	}
	
	// 登出或關閉時, 清除localStorage暫存內容
	function _clearLocalStorage(arrExtraRemain) {
		var key, item;
		var keyLen = localStorage.length;
		var removeKey = [];
		
		// 登入時保留Artifact (由arrExtraRemain傳入)
		
		// 1140321 Raymond 1131303 新增保留啟用錯別字校正功能選項的設定值
		// 1130730 Raymond 領務局卡驗收需求序8 記憶上次加蓋的選用章戳保留在localStorage, 登出時不要清掉
		// 1100520 Raymond 1050087 比照一代記憶選用章戳的職名章對齊方式選項, 改記憶在localStorage
		// 1091106 Raymond 1090777 保留新增文字意見時的加蓋職名章、時戳勾選設定
		// 2019.12.19 - 1081132 Eric, 保留是否為真實Mac PC設定!
		// 1080729 Eric 新增保留自動開啟次筆公文設定值.
		// 1060502 Eric 新增保留color-scheme設定值.
		// 1050720 Kevin 新增通知訊息介接:'RedirectPage'
		// 1050908 Raymond 新增縮放比要記憶
		// 1060721 Raymond 1060593 保留手寫筆設定
		// 1070320 Raymond 1070363 保留勾選簽辦意見窗格設定
		// 1110818 Kevin   1101532 保留WebForm主題
        // 1120220 Eric    1111363 顯示/隱藏文字編輯工具列(aolEnableTextEditToolbar)
		//var arrRemain = ['logHistory', 'localLog', 'certData-', 'RedirectPage', 'zoomController_', 'mp_display_', 'color_scheme'];
		var arrRemain = ['logHistory', 'localLog', 'certData-', 'RedirectPage', 'zoomController_',
						 'mp_display_', 'color_scheme', 'pen_setting_', 'show_sign_comment_panel', 'dev_', 
                         'realMac', 'aolTextNoteWith', 'signet_with_stamp_align_mode', 'webform_color', 'aolEnableTextEditToolbar', 'last_selected_stamp', // 2019.10.28 - Eric, 'dev_' 開頭項目不刪
						 'enableFixWord', 'autoNextFixWord', 'enableFixWord4TextComment'];
		if (typeof _debug=='boolean' && _debug===true) {
			arrRemain.push('ttdl_');
		}
		//1100930	Leslie	配合首頁分離後網址列異動，整合登入時增加註記欄位以供程式區別，應保留localStorage供後續判斷用
		arrRemain.push('AutoLogon');
		//1110817 Leslie 彰師大單一簽入整合
		arrRemain.push('fromSSO');
		
		var i=0, j=0, remainKey='', isRemain=false;
		for (i = 0; i < keyLen; i++){
			isRemain = false;
			key = localStorage.key(i);
			if ((/^latest_login_/).test(key)) {
				continue;
			}
			
			for(j=0; j<arrRemain.length; j++) {
				remainKey = arrRemain[j];
				if (remainKey.length && key.indexOf(remainKey)!==-1) {
					isRemain = true;
					break;
				}
			}
			
			// 保留項目, 跳過
			if (isRemain) continue;
			
			// 額外保留項目
			if (typeof arrExtraRemain!=='undefined' && arrExtraRemain!==null && arrExtraRemain.length) {
				for(j=0; j<arrExtraRemain.length; j++) {
					remainKey = arrExtraRemain[j];
					if (remainKey.length) {
						if (key.indexOf(remainKey)!==-1) {
							isRemain = true;
							break;
						}
					}
				}	
				if (isRemain) continue;
			}
			removeKey.push(key);
		}
		
		for (i=0; i<removeKey.length; i++) {
			item = removeKey[i];
			localStorage.removeItem(item);
			theLogger.debug('remove localStoarge item:' + item);
		}
	}
	
	/* 取得右鍵選單應用程式項目, source:SSOContextMenuItems.xml */
	function _getSSOContextMenuItems(artifact, orgNo) {
		var filename = 'SSOContextMenuItems.xml';
		var ls_id = 'SSOMenuItem_' + orgNo;
		
		var ssoMenuItems = [];
		// 若已有資訊, 則結束作業
		if (typeof window.localStorage[ls_id] === 'string' && window.localStorage[ls_id].length) {
			var parser = new DOMParser();
			var orgMenuItem_xn = parser.parseFromString(window.localStorage[ls_id], 'text/xml');
			if (orgMenuItem_xn!==null) {
				var $orgMenuItem_xn = $(orgMenuItem_xn);
				var i=0, item=null;
				var $item_xn = $orgMenuItem_xn.find('ITEM');
				for(i=0; i<$item_xn.length; i++) {
					item = $item_xn[i];
					ssoMenuItems.push({
						progId: SSOUtil.xml_getChildNodeValue(item, 'PROG_ID'),
						title: SSOUtil.xml_getChildNodeValue(item, 'TITLE'),
						signType: SSOUtil.xml_getChildNodeValue(item, 'SIGN_TYPE'),
						folder: SSOUtil.xml_getChildNodeValue(item, 'FOLDER'),
					});
				}
				return ssoMenuItems.length ? ssoMenuItems : null;
			}
			return null;
		}
		
		// 2014.9 - 改用WebFileIO取得Server上的設定檔...
		var wfio = new WebFileIO(SSO_CONFIG.getWSUrl('fileiows'), '', artifact);
		var serverPath = SSO_CONFIG.getRsrcServerPath('sso');
		wfio.download(serverPath, filename, {
			async : false,
			success: function(rslt, res) {
				if (rslt !== undefined) {
					var allMenuItem_xn = rslt;
					var $orgMenuItem_xn = null;
					
					if (allMenuItem_xn) {
						$orgMenuItem_xn = $(allMenuItem_xn).find('ORG[org_no="'+ orgNo + '"]');
						if ($orgMenuItem_xn.length) {
							sOrgMenuItem = new XMLSerializer().serializeToString($orgMenuItem_xn[0]);
							window.localStorage[ls_id] = sOrgMenuItem;
							
							var i=0, item=null;
							var $item_xn = $orgMenuItem_xn.find('ITEM');
							for(i=0; i<$item_xn.length; i++) {
								item = $item_xn[i];
								ssoMenuItems.push({
									progId: SSOUtil.xml_getChildNodeValue(item, 'PROG_ID'),
									title: SSOUtil.xml_getChildNodeValue(item, 'TITLE'),
									signType: SSOUtil.xml_getChildNodeValue(item, 'SIGN_TYPE'),
									folder: SSOUtil.xml_getChildNodeValue(item, 'FOLDER'),
								});
							}
						}
						else { // 沒有程式項目, 給空的內容, 避免每次作業都向server要!
							sOrgMenuItem = '<ORG></ORG>';
							window.localStorage[ls_id] = sOrgMenuItem;
						}
					}
				}
				else {
					theLogger.warn('-W- WebFileIO呼叫成功但夾檔資料未下載. [filename="' + filename + '"]');
				}
			},
			error: function(errorText) {
				theLogger.error('-E- getOrgInfo() invoke wfio.download failed, errMsg=' + errorText);
			}
		});

		return ssoMenuItems.length ? ssoMenuItems : null;
	}
	
	function _openContextMenuProgram(SAMLart, _docObj, key, _webAppList) {
		function _getSSOContextMenuURL(SAMLart, msgId, docNo, progId) {
			// 2019.12.3 - 1080399 Eric, jQ3 patch. [升級jQ3後 then call 一律會在 return後才被叫用!]
			let _dfd = $.Deferred();
			var wsLocation = theSSO.User.EnvSettings.get('WS_LOCATION'); // WS_LOCATION:'HTTP://DOCLB.FDAT.COM.TW/oddep/'
			if (wsLocation==='') {
				alert('環境變數[WS_LOCATION]未設定或為空字串!');
				theLogger.error('ERROR! _getSSOContextMenuURL() 環境變數[WS_LOCATION]未設定或設定為空字串');
				_dfd.reject({success:false, errMsg: '環境變數[WS_LOCATION]未設定或為空字串!'});
				return _dfd.promise();
			}
			
			var exOption;
			var sWSEndPointUrl = wsLocation;
			if (wsLocation.length) {
				if (wsLocation.substr(wsLocation.length-1)!=='/') {
					sWSEndPointUrl += '/';
				}
				sWSEndPointUrl += 'lib/od_lib.asmx';
				exOption = {
					url: sWSEndPointUrl,
				};
			}

			var sUrlWithParam='';
			theWebServices.OD_LIBWS.getSSOContextMenuURL(SAMLart, msgId, docNo, progId, '', exOption)
			.then(function(rslt){
				sUrlWithParam = rslt.retStr;
				_dfd.resolve({success:true, sUrlWithParam: rslt.retStr});
			})
			.fail(function(rslt){
				theLogger.error('ERROR! _getSSOContextMenuURL() fail, ErrMsg=' + rslt.errMsg);
				_dfd.reject({success:false, errMsg: '_getSSOContextMenuURL() fail, ErrMsg=' + rslt.errMsg});
			});
			return _dfd.promise(); // sUrlWithParam;
		}
		
		// 2019.09 - 1080339 Eric, jQuery 3 $.type() deprecated.
		if (typeof key=='string' && _typeOf(_webAppList)=='array' && _webAppList.length)	{
			var appKey = '', sHeader='';
			if (key.indexOf('WebApp:')===0) {
				sHeader = 'WebApp:';
				appKey = key.substr(sHeader.length);
			}
			else if (key.indexOf('WebAppId:')===0) {
				sHeader = 'WebAppId:';
				appKey = key.substr(sHeader.length);
			}
			
			if (appKey.length===0) {
				theLogger.error('ERROR! SSOUtil.openContextMenuProgram() appKey==""');
				return;
			}
			
			var pageUrl='', urlWithParam='';
			var i=0, webAppItem=null;
			for(i=0; i<_webAppList.length; i++) {
				if (_webAppList[i].Id==appKey) {
					webAppItem = _webAppList[i];
					break;
				}
			}
			
			if (webAppItem!==null) {
				// 2019.12.3 - 1080399 Eric, jQ3 upgrade patch.
				if (webAppItem.progId.length) {
					_getSSOContextMenuURL(SAMLart, _docObj.msgId, _docObj.docNo, webAppItem.progId)
					.done(function(rslt){
						let pageUrl = rslt.sUrlWithParam;
						if (pageUrl==='') {
							alert('無法取得ProgId=' + webAppItem.progId + '的應用程式資訊!');
							return;
						}
						theSSO.Util.openASPXApp_NewFrame(pageUrl);
					})
					.fail(function(errRslt) {
						alert('無法取得ProgId=' + webAppItem.progId + '的應用程式資訊!');
					});
				}
				else {
					pageUrl = webAppItem.url;
					theSSO.Util.openASPXApp_NewFrame(pageUrl);
				}
			}
		}
	}
	
	// 2020.1.7 - 1081090 Eric 重設/記憶目前AOL上方工具列的UI的css狀態
	function _resetAOLToolbarCSS(mdl, flag) {
		// 可切換顯示/隱藏的UI元素, 
		var uis = [
			'#aol #chkApprove',
			'#aol #chkReject',
			'#aol #moChkApprove',
			'#aol #moChkReject',
			'#aol #pcTxList',
			'#aol #pcSubmit',
			'#aol #pcUtil',
			'#aol #moGrpUtil',
			'#aol #moSubmitPanel',
			'#btnSave',
			'#moBtnSave',
			'#transPanel',
			'#moSubmitPanel',
			'#btnCloseR',
			'#moGrpUtil',
			'#btnPopupSetting',
			'#aol a#btnCoworkProcSetting'
		];
		
		if(flag == "save") {
			// 2019.12.24 - 1081090 Eric, save DOM elem's style.display and style.visibility
			mdl.css_id = [];
			mdl.css_display = [];
			mdl.css_visibility = [];
		}
		if(flag == "save") {
			for(var i=0; i<uis.length; i++) {
				// 2019.12.24 - 1081090 Eric, save dom element css
				if ($(uis[i]).length) {
					let css_disp = $(uis[i])[0].style.display;
					let css_visibility = $(uis[i])[0].style.visibility;
					mdl.css_id.push(uis[i]);
					mdl.css_display.push(css_disp);
					mdl.css_visibility.push(css_visibility);
					theLogger.log("resetAOLToolbarCSS:記憶'" + uis[i] + "' (style.display='" + css_disp + "', style.visiblity='" + css_visibility + "')");
				}
			}
		}
		else if(flag == "restore") {
			if("css_id" in mdl && SSOUtil.typeOf(mdl.css_id) == "array") {
				for(var i=0; i<mdl.css_id.length; i++) {
					let $target = $(mdl.css_id[i]);
					if ($target.length) {
						$target[0].style.display = mdl.css_display[i];
						$target[0].style.visibility = mdl.css_visibility[i];
						theLogger.log("resetAOLToolbarCSS:復原'" + uis[i] + "' (style.display='" + mdl.css_display[i] + "', style.visiblity='" + mdl.css_visibility[i] + "')");
					}
				}
			}
		}
	}

	function _dev_getCurrentTimeStr() {
		var now = new Date();
		var sTime = SSOUtil.padLeft(now.getMinutes(), 2) + ':' + SSOUtil.padLeft(now.getSeconds(), 2) + "." + SSOUtil.padLeft(now.getMilliseconds(), 3);
		return sTime;
	}
	
	// 2019.7 - Eric 傳送效能
	function _dev_getTimeStr(_DateTime) {
		if (typeof _DateTime=='object') {
			var sTime = SSOUtil.padLeft(_DateTime.getMinutes(), 2) + ':' + SSOUtil.padLeft(_DateTime.getSeconds(), 2) + "." + SSOUtil.padLeft(_DateTime.getMilliseconds(), 3);
			return sTime;
		}
		return '';
	}
	// 2019.7 - 1080654 Eric 傳送效能 - add tmEnd
	function _dev_logTimeElapse(title, tmBegin, tmExclude, tmEnd) {
		if (typeof tmBegin=='undefined' || tmBegin===null || tmBegin===0) {
			theLogger.time(_dev_getCurrentTimeStr() + ' -tm- ' + title + ' 耗時: n/a 秒');
			return;
		}

		var tmNow = (typeof tmEnd=='undefined' || tmEnd==null)?Date.now():tmEnd;
		var elapse = (tmNow - tmBegin);
		if (typeof tmExclude == 'number') {
			elapse -= tmExclude;
			elapse /= 1000.0;
			theLogger.time(_dev_getCurrentTimeStr() + ' -tm- ' + title + ' 耗時: ' + elapse.toString() + '秒 [Exclude: ' + tmExclude/1000.0 + '秒]');
		}
		else {
			elapse /= 1000.0;
			theLogger.time(_dev_getCurrentTimeStr() + ' -tm- ' + title + ' 耗時: ' + elapse.toString() + '秒');
		}
	}

	// 2019.7 - 1080654 Eric 傳送效能
	function _dev_getTimeElapseStr(title, tmBegin, tmExclude, tmEnd) {
		if (typeof tmBegin=='undefined' || tmBegin===null || tmBegin===0) {
			return _dev_getCurrentTimeStr() + ' -tm- ' + title + ' 耗時: n/a 秒';
		}

		var tmNow = (typeof tmEnd=='undefined' || tmEnd==null)?Date.now():tmEnd;
		var elapse = (tmNow - tmBegin);
		if (typeof tmExclude == 'number') {
			elapse -= tmExclude;
			elapse /= 1000.0;
			return _dev_getCurrentTimeStr() + ' -tm- ' + title + ' 耗時: ' + elapse.toString() + '秒 [Exclude: ' + tmExclude/1000.0 + '秒]';
		}
		else {
			elapse /= 1000.0;
			return _dev_getCurrentTimeStr() + ' -tm- ' + title + ' 耗時: ' + elapse.toString() + '秒';
		}
	}
	
	function _getCurrentTimeStr_YYYMMDDhhmm(withSec) {
		var now = new Date();
		var sTime = SSOUtil.padLeft(now.getFullYear()-1911, 3) + SSOUtil.padLeft(now.getMonth()+1, 2) + SSOUtil.padLeft(now.getDate(), 2) +
				    SSOUtil.padLeft(now.getHours(), 2) + SSOUtil.padLeft(now.getMinutes(), 2);
		if (typeof withSec=='boolean' && !!withSec) {
			sTime += SSOUtil.padLeft(now.getSeconds(), 2);
		}
		return sTime;
	}
	
	// 2019.09 - 1080339 Eric, jQuery 3 $.type() deprecated.
	function _typeOf(_obj) {
		return Object.prototype.toString.call(_obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
	}

	// 2020.6.30 - 1090289 Eric, 公文傳送子視窗位置
	// Find Left Boundry of current Window
	function _findLeftWindowBoundry()
	{
		// In Internet Explorer window.screenLeft is the window's left boundry
		if (window.screenLeft)
		{
			return window.screenLeft;
		}
		
		// In Firefox window.screenX is the window's left boundry
		if (window.screenX)
			return window.screenX;
			
		return 0;
	}
		
	// 2020.6.30 - 1090289 Eric, 公文傳送子視窗位置
	// Find Left Boundry of the Screen/Monitor
	function _findLeftScreenBoundry()
	{
		// Check if the window is off the primary monitor in a positive axis
		// X,Y                  X,Y                    S = Screen, W = Window
		// 0,0  ----------   1280,0  ----------
		//     |          |         |  ---     |
		//     |          |         | | W |    |
		//     |        S |         |  ---   S |
		//      ----------           ----------
		/*if (_findLeftWindowBoundry() > window.screen.width)
		{
			return _findLeftWindowBoundry()- (_findLeftWindowBoundry() - window.screen.width);
		}*/
		if (_findLeftWindowBoundry() >= 0) {
			return _findLeftWindowBoundry();
		}

		// Check if the window is off the primary monitor in a negative axis
		// X,Y                  X,Y                    S = Screen, W = Window
		// 0,0  ----------  -1280,0  ----------
		//     |          |         |  ---     |
		//     |          |         | | W |    |
		//     |        S |         |  ---   S |
		//      ----------           ----------
		// This only works in Firefox at the moment due to a bug in Internet Explorer opening new windows into a negative axis
		// However, you can move opened windows into a negative axis as a workaround
		if (_findLeftWindowBoundry() < 0 && _findLeftWindowBoundry() > (window.screen.width * -1))
		{
			return (window.screen.width * -1);
		}

		// If neither of the above, the monitor is on the primary monitor whose's screen X should be 0
		return 0;
	}

	// 2021.4.20 - 1100333 Eric, separate Login/eDoc pages
	function _processKeyword(keyword) {
		if (typeof keyword!=='string' || keyword.length==0) {
			return  {success:false, key:''};
		}
		let _in = {"key": keyword};
		let _out = $.extend({success:true}, _in);
		return _out;
	}
	
	// 2021.5 - 1100093 merge: 2020.3.3 - 1081168 Eric, 子文彙併辦, 取得封裝檔最後一流程之彙併辦子文清單, 
    // 回傳: string array.
    function _getEnveFileCOMDoc(_docObj) {
        if ('_enveXML' in _docObj && _docObj._enveXML!==null) {
            let nodeSiteContents = _docObj._enveXML.getElementsByTagName("簽核點定義");
            if (nodeSiteContents.length) {
                let nodeSiteContent = nodeSiteContents[nodeSiteContents.length-1];
                // 確認MsgId不為目前簽辦公文之MsgId
                let sId = $(nodeSiteContent).attr('Id');
                let sHeader = 'sign_';
                let nodeMsgId = '';
                if (sId.length>sHeader.length) {
                    nodeMsgId = sId.substr(sId.indexOf(sHeader)+sHeader.length); // sign_$MsgId$
                }
                if (nodeMsgId.length && _docObj.msgId==nodeMsgId) {
                    // 不使用目前流程點之<簽核點定義>
                    if (nodeSiteContents.length>1) {
                        nodeSiteContent = nodeSiteContents[nodeSiteContents.length-2]; // 取前一個流程點內容
                    }
                    else {
                        nodeSiteContent = null;
                    }
                }

                if (nodeSiteContent==null) {
                    return null;
                }

                let COMNos = [];
                // <簽核文件夾>/<併文清單>/<子文>
                let nodeCOMNos = nodeSiteContent.getElementsByTagName("子文");
                let i=0;
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

	// 2021.5 - 1100093 Eric, merge 1081168
	function _checkEnveSubDocInfo(_docObj, async) {
		let _dfdProc = $.Deferred()

		// 由公文封裝檔及ODWMSG.COM_NO取得彙併辦子文清單, 若有異動, 則須執行子文[彙併辦]/[解除彙併辦]流程封裝作業!
		let enveCOMNos = _getEnveFileCOMDoc(_docObj);
		if ((Array.isArray(enveCOMNos) && enveCOMNos.length) ||
			(Array.isArray(_docObj.ODWDCM.COM_NO) && _docObj.ODWDCM.COM_NO.length)) {
			// 檢核是否異動子文清單!
			let newMergeDocs = [];
			let unMergeDocs = [];
			let i=0;
			let cntCOMDoc = _docObj.ODWDCM.COM_NO.length;    
			let newCOMNos = [];
			for(i=0; i<cntCOMDoc; i++) {
				let comDoc = _docObj.ODWDCM.COM_NO[i];
				if (comDoc.COM_DOC_NO!=_docObj.docNo && comDoc.COM_COMBINE_TYPE==='1') {
					let comDocNo = comDoc.COM_DOC_NO;
					if (enveCOMNos==null || (enveCOMNos.indexOf(comDocNo)==-1)) {
						newMergeDocs.push(comDocNo);
					}
				}
				newCOMNos.push(comDoc.COM_DOC_NO);
			}

			if (enveCOMNos!==null) {
				for(i=0; i<enveCOMNos.length; i++) {
					let comNo = enveCOMNos[i];
					if (newCOMNos.indexOf(comNo)==-1) {
						unMergeDocs.push(comNo);
					}
				}
			}

			if (async===false) {
				return {
					success:true, 
					'newMergeDocs':newMergeDocs.length?true:false, 
					'unMergeDocs':unMergeDocs.length?true:false
				};
			}
			else {
				_dfdProc.resolve({
					success:true, 
					'newMergeDocs':newMergeDocs.length?true:false, 
					'unMergeDocs':unMergeDocs.length?true:false
				});
				return _dfdProc.promise();
			}
		}
		else {
			if (async===false) {
				return {
					success: false, 
					newMergeDocs: false, 
					unMergeDocs: false
				};
			}
			else {
				_dfdProc.resolve({success:true, newMergeDocs:false, unMergeDocs:false});
				return _dfdProc.promise();
			}
		}
	}

	/* 2021.6 - 1080761 Eric, merge 2018.5.15 - 1070298, 以獨立分頁開啟ViewDoc模組, 檢閱公文內容 */
	function _viewRefDoc(SAMLart, docNo, sourceOrgNo, signType) {
		let rtn = theWebServices.webFileIO.getDocUnvDataByJSON(SAMLart, docNo, sourceOrgNo, {async:true});
		let sUnvObj = "";
		rtn.done(function(rslt) {
			sUnvObj = rslt.rtnJSON;
			if (sUnvObj !== "") {
				let UnvObj = JSON.parse(sUnvObj);
				let objViewDoc = {
					UNVObj: UnvObj,
					docInfoPage: "none",
					openDocModule: (signType=='E')?'AOL':'UniView',
					'signType': signType,
					readOnlyMode: true
				};
				let docId = docNo+'_'+Util.genGUID();
				localStorage['viewDoc_out_'+docId] = JSON.stringify(objViewDoc);

				let url = 'RD-ViewDoc.html?Artifact=' + SAMLart + '&DocId=' + encodeURI(docId);
				theSSO.Util.openASPXApp_NewFrame(url);
			}
		})
		.fail(function(rslt) {
			alert(rslt.errMsg);
		});
	}
	
	// 2023.7.6 - merge: 2023.5.2 - 1111455 Eric, 內政部首次傳送效能改善
    // => 若設定符合, 初始化傳送子視窗 (開啟線上簽核公文後時執行)
    function _setupAOLSubmitDocProcWnd(_docObj, docSubmitUtil) {
        if (typeof _docObj!='undefined' && _docObj!==null && _docObj.signType=='E' && 
            (typeof theSSO.MP.submitDocProcFrameWnd=='undefined' || theSSO.MP.submitDocProcFrameWnd==null)) {
            let _sumbitMode = 'basic';
            let clientSignMode = SSO_CONFIG.getClientSignMode();
            let iOSDevice = window.iOS_device;
            
            let sSubmitSign = theSSO.User.EnvSettings.get('II_SUBMIT_SIGN');
            let sEnvSubmitMode = theSSO.User.EnvSettings.get('AOL_SUBMIT_MODE');
            if (typeof sEnvSubmitMode=='string' && sEnvSubmitMode.length) {
                sEnvSubmitMode = sEnvSubmitMode.toLowerCase();
            }

            let fSubmitSign=true;
            if (SSOUtil.isValueFalse(sSubmitSign)) {
                fSubmitSign = false;
            }

            // 行動平台, 非智慧卡憑證加簽 => 傳送子視窗皆不支援!
            if (!iOSDevice && clientSignMode=='SCard') {
                if (typeof sEnvSubmitMode=='string' && sEnvSubmitMode.toLowerCase()=='signpage') {
                    // 2022.5.31 - 1101623 Eric, merge: 2020.7.8 - 1090390 Eric, IE: sigePage, chrome/firefox: 'webworker' or 'iframe'
                    let ua = window.navigator.userAgent;
                    if (ua.indexOf("MSIE")!=-1 || ua.indexOf("Trident")!=-1)  { //is IE, use ActiveX
                        _sumbitMode = sEnvSubmitMode;
                    }
                    else {
                        _sumbitMode = 'iframe'; // 2020.7.8 - 1090390 Eric, Chrome/FireFox - WebWorker/iFrame?
                    }
                }
            }
            
            if (fSubmitSign && _sumbitMode=='iframe' && 
                (typeof theSSO.MP.submitDocProcWnd=='undefined' || theSSO.MP.submitDocProcWnd==null || theSSO.MP.submitDocProcWnd.closed==true)) {
                    setTimeout(() => {
                        if (typeof theSSO.MP.submitPageInitializeing=='undefined' || theSSO.MP.submitPageInitializeing==false) {
                            theSSO.MP.submitPageInitializeing = true;
                            docSubmitUtil.setupDocSubmitProcPage('', _sumbitMode)
                            .then(function(){
                                theSSO.MP.submitPageInitializeing = false;
                            });
                        }
                    }, 200);
            }
        }
    }
	
 	/*
	 * 2013.11 - exported as SSOUtil functions should declare here
	 */
	SSOUtil.getOrgInfo = getOrgInfo;
	SSOUtil.getMenuRule = getMenuRule;
	SSOUtil.getOrgNode = getOrgNode;
	SSOUtil.getOrgUnitName = getOrgUnitName;
	SSOUtil.getOrgUnitNoByName = getOrgUnitNoByName; // 2016.9.2 - 新增
	SSOUtil.getOrgRoleName = getOrgRoleName;
	SSOUtil.getOrgUserInfo = getOrgUserInfo;
	SSOUtil.getUnitName = getUnitName;
	SSOUtil.getRoleIconPathname = getRoleIconPathname;
	SSOUtil.getRoleNameForDraftAppRole = getRoleNameForDraftAppRole;
	SSOUtil.getMPUiSetting = getMPUiSetting;
	SSOUtil.getDocToDoList = getDocToDoList;
	//1140924	Leslie[退輔會序170]	修正複數機關環境，彙併辦子文因重覆文號造成子文未正確加簽的問題
	SSOUtil.getDocToDoList2 = getDocToDoList2;
	SSOUtil.combineLocalPath = combineLocalPath;
	SSOUtil.getODWMSG_XMLDOMObj = getODWMSG_XMLDOMObj;
	SSOUtil.getODWDCM_XMLDOMObj = getODWDCM_XMLDOMObj;
	SSOUtil.loading = loading;
	SSOUtil.getROCTime = _getROCTime;
	SSOUtil.getURLParameter = _getURLParameter;
	SSOUtil.getOfficerLevel = _getOfficerLevel;
	SSOUtil.uploadWWKFFile = _uploadWWKFFile; 	// 2015.12.4 - 1040735
	SSOUtil.isConsultingDoc = _isConsultingDoc;	// 2015.12.4 - 1040735
	
	SSOUtil.injectHTMLModule = _injectHTMLModule; // 2016.6 - 二代框架
	SSOUtil.getODRPUI = getODRPUI; // 取ODRPUI.XML並存為XML字串.
	SSOUtil.getSignReasonList = getSignReasonList; // 取紙本簽核原因
	SSOUtil.clearLocalStorage = _clearLocalStorage; // 2016.7 - 清除localStorage內容
	
	SSOUtil.getSSOContextMenuItems = _getSSOContextMenuItems;
	SSOUtil.openContextMenuProgram = _openContextMenuProgram;
	
	SSOUtil.getCurrentTimeStr_YYYMMDDhhmm = _getCurrentTimeStr_YYYMMDDhhmm; // 2016.12.20
	
	SSOUtil.dev_logTimeElapse = _dev_logTimeElapse;
	SSOUtil.dev_getCurrentTimeStr = _dev_getCurrentTimeStr;
	SSOUtil.dev_getTimeStr = _dev_getTimeStr;
	SSOUtil.dev_getTimeElapseStr = _dev_getTimeElapseStr;

	// 2019.9.27 - 1080339 Eric, jQuery 3.0 upgrade. $.type() alternative function 
	SSOUtil.typeOf = _typeOf;
	SSOUtil.resetAOLToolbarCSS = _resetAOLToolbarCSS; // 2020.1.7 - 1081090 Eric

	// 2020.6.30 - 1090289 Eric, 公文傳送子視窗位置
	SSOUtil.leftWindowBoundry = _findLeftWindowBoundry;
	SSOUtil.leftScreenBoundry = _findLeftScreenBoundry;

	// 2021.4.20 - 1100333 Eric, separate Login/eDoc page
	SSOUtil.processKeyword = _processKeyword;

	// 2021.5 - 1100093 Eric
	SSOUtil.getEnveFileCOMDoc = _getEnveFileCOMDoc;
	SSOUtil.checkEnveSubDocInfo = _checkEnveSubDocInfo;

	SSOUtil.viewRefDoc = _viewRefDoc; // 2021.6 - 1080761 Eric, merge 2018.5.15 - 1070298
	SSOUtil.setupAOLSubmitDocProcWnd = _setupAOLSubmitDocProcWnd; // 2023.7.6 merge: 2023.5.2 - 1111455 Eric
	
	//1111012	Leslie[1110865]	新增用於機關客製化UI設定的共用屬性(唯讀)
	Object.defineProperty(SSOUtil,'CustomUIClass',{get(){
		let nickName = SSO_CONFIG.OrgNickName.toLowerCase();
		return nickName.replace(/^./, nickName[0].toUpperCase()) + "UI";
	}})

})(jQuery);
