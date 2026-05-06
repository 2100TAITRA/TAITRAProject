/* jshint -W100 */

/* 2021.4.20 - 1100333 Eric, 精簡版 for Login page */

/*
DATE	MGRNO		SA		PG		Desc
1061012 1060819     Eric    Eric    憑證登入及傳送簽章時若跨平台網頁元件作業異常, 提示使用者錯誤訊息
1060329 1050087     Kevin   Kevin   重複登入處理
1060302             Kevin   Kevin   若重複開啟首頁，第一個首頁會取不到權杖問題修正
1051111             Kevin   Kevin   修正部分登入失敗時會一值顯示登入中
1051005             Kevin   Kevin   首頁取得系統公告、公布欄
1080513	--			Kevin	Kevin	新增登入後通知訊息(原目的為提醒憑證將到期)
1080523	1080380		Leslie	Leslie	[Merge 1070831]調整Cookies的運作方式
1080917 1080339     Kevin   Eric    [jQuery 3.0 upn()grade]將全部 .click/.change(fn) sortcut 改成 .on('click'|'change' , fn)
									.bind() => .o
1090812	1090473		Leslie	Leslie	針對首頁切換(登入/MP切換)時，會叫用取得系統公告與公布欄行為，改為非同步
1091231 1090722		Kevin	Kevin	額外確認SR註冊狀態
1100420 1100333     Eric    Eric    刪減內容給登入網頁使用
1100929	1100944		Leslie	Leslie	新增可依設定顯示/隱藏客製化Logo區域
1101201	1101174		Leslie	Leslie	修正檢核帳號狀態的異常處理
1110816	1110787		Leslie	Leslie	增修彰師大客製化功能
1110908 1111021 	Kevin	Kevin	配合AuthWS調整，不呼叫已不檢核函式
1120815 1120693     Kevin   Kevin   調整忘記密碼訊息
1120901 1120709 	Kevin   Joe 	弱掃修正Client DOM Stored XSS
1130816 1130313		Raymond	Raymond	合併1111007(1100394), 新增離線版按鈕, 並判斷SSO_CONFIG.js的enableOfflineMode設為true時, 才顯示「離線版公文製作」按鈕
1131004	序272		Leslie	Leslie	憑證(登入)時，將登入時的憑證改為優先選項
1140203	1130962		Leslie	Leslie	增加新版圖型驗證功能
1140423	1140158		Leslie	Leslie	[退輔會]參考[1111290]新增無機關選單的ASP架構模式
1140610	1131183		Leslie	Leslie	[Merge]新增行動自然人憑證模組[1110117]
1140718	問題序155		Leslie	Leslie	不啟用行動自然人憑證時，該物件被直接移除，增加判斷條件
1141021	問題序312	Leslie	Leslie	修正人機驗證沒藏好的問題
1141027	1140845		Leslie	Leslie	新增密碼欄位顯示功能
*/

//
// jQM's 'mobileinit' event handler
//
$(document).on('mobileinit', function () {   
    //$.mobile.loadingMessage = "登入系統中...";
    $.mobile.pageLoadErrorMessage = "載入網頁失敗！";
	$.mobile.changePage.defaults.changeHash = false;
});

var _debugLogin = false; //true;

//
// 2013.3 - 擴充 theWebServices 以實作 AuthWS, SAMLWS proxy functions
//
// Note:
//  options有下列選項:
//   url: Web Service之URL, 若未指定, 則使用系統的預設值(theWebServices載入時自動存入ws_urls陣列中)
//
(function($){
	if (!!theWebServices) {
		// 2013.3.4 - 實作 AuthWs proxy
		theWebServices.authws = {
			/*
			 * 由登入系統 (叫用AuthWS.LogonByPasswordWithLimitsAndOrgNo)
			 */
            logonByPasswordWithMachineType : function(orgNo, userId, password, machineType, options) {
				var _dfd = $.Deferred();
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
				var wsFuncName = 'LogonByPasswordWithLimitsAndOrgNoAndMachineType';
                if (!wsUrl || wsUrl.length==0) {
                    theLogger.error('-ERR- AuthWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
				}
				
                var params = new SOAPClientParameters(), res;
				params.add('argOrgNo', orgNo);
                params.add('argAccount', userId);
                params.add('argPassword', password);
				params.add('argMachineType', machineType);
                
                // SOAPClient.invoke() params:
                //   url, method name, method parameter values,
                //   call mode (async=true, sync=false), callback method
                //SOAPClient.invoke(wsUrl, "LogonByPasswordWithLimitsAndOrgNoAndMachineType", params, async,
				//1110308	Leslie[1101521]	新增圖型驗證功能，改用invokeJSON
				// SOAPClient.invoke(wsUrl, wsFuncName, params, async,
				SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,
                                  function (r)
                                  {
									//1110308	Leslie[1101521]	新增圖型驗證功能，改用invokeJSON，增加處理回傳值
									if('value' in r)
										r = r.value;
                                    theLogger.log('-I- AuthWS.' + wsFuncName + ' returns:');
                                    theLogger.log(r);
                                    if (r.length===0) {
                                        _dfd.reject(new Error('回傳權仗為空字串!'));
                                    }
									else {
										_dfd.resolve(r);
									}
								  //1110308	Leslie[1101521]	新增圖型驗證功能，增加傳入options
                                  //});
								  },options);
				return _dfd.promise();
            },
			/* 2015.6 - 目前已不使用 */
			/*logonByPassword : function(orgNo, userId, password, options) {
				var _dfd = $.Deferred();
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
                if (!wsUrl || wsUrl.length==0) {
                    theLogger.error('-ERR- AuthWS url 設定值異常!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
				}
				
                var params = new SOAPClientParameters(), res;
                params.add('argOrgNo', orgNo);
                params.add('argAccount', userId);
                params.add('argPassword', password);
                
                // SOAPClient.invoke() params:
                //   url, method name, method parameter values,
                //   call mode (async=true, sync=false), callback method
                SOAPClient.invoke(wsUrl, "LogonByPasswordWithLimitsAndOrgNo", params, async,
                                  function(r) {
                                    theLogger.debug("-I- AuthWS.LogonByPasswordWithLimitsAndOrgNo returns:" + r);
                                    if (r.length===0) {
                                        _dfd.reject(new Error('回傳權仗為空字串!'));
                                    }
									else {
										_dfd.resolve(r);
									}
                                  });
				return _dfd.promise();
            },*/
            logonByCert : function(certb64, signature, timeStamp, orgNo, options) {
                var _dfd = $.Deferred();
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
                if (!wsUrl || wsUrl.length==0) {
                    theLogger.error('-ERR- AuthWS url 設定值異常!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
				}
				
                var params = new SOAPClientParameters(), res;
                params.add('argCert', certb64);
                params.add('strEncrypted', signature);
                params.add('argTimeStamp', timeStamp);
                params.add('argOrgNo', orgNo);
                
                /* SOAPClient.invoke() params:
                 *   url, method name, method parameter values,
                 *   call mode (async=true, sync=false), callback method
                 */
                SOAPClient.invoke(wsUrl, 'LogonByCert', params, async,
                                  function(r) {
                                    theLogger.debug("-I- AuthWS.LogonByCert returns:" + r);
                                    if (r.length===0) {
                                        _dfd.reject(new Error('回傳權仗為空字串!'));
                                    }
									else {
										_dfd.resolve(r);
									}
                                  });
				return _dfd.promise();
            },
			/* 登出系統 (叫用AuthWS.Logout)
			 */
			/*logout : function(artifact, options) {
				var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
                if (!wsUrl || wsUrl.length==0) {
                    theLogger.error('-ERR- AuthWS.logout was invoked, but WS\'s url was missing!');
                    throw new Error('AuthWS尚未設定服務網址URL');
                }
                
                var params = new SOAPClientParameters(), res;
                params.add("argArtifact", artifact);
                
				//1091026	Leslie	修正因Chrome升級至80版後關閉視窗於unload事件無法以同步呼叫WS之問題，登出一律改為「非同步」(false -> true)
                SOAPClient.invoke(wsUrl, "Logout", params, true,
                                  function(r) {
                                    theLogger.log("-I- AuthWS.logout returns:");
                                    theLogger.log(r);
                                    if(typeof r == 'boolean') {
										res = r;
									}
									else {
                                        throw new Error('叫用AuthWS.Logout失敗!');
                                    }
                                  });
                return res;
			},*/
			// 由Artifact取得對應登入帳號
			getAccountMappedByArtifact : function(artifact, options) {
				var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
                if (!wsUrl || wsUrl.length==0) {
                    theLogger.error('-ERR- AuthWS.GetAccountMappedByArtifact was invoked, but WS\'s url was missing!');
                    throw new Error('AuthWS尚未設定服務網址URL');
                }
                
                var params = new SOAPClientParameters(), res = '';
                params.add("argArtifact", artifact);
                
                SOAPClient.invoke(wsUrl, "GetAccountMappedByArtifact", params, false,
                                  function(r) {
                                    theLogger.log("-I- AuthWS.GetAccountMappedByArtifact returns:");
                                    theLogger.log(r);
                                    if(typeof r == 'string') {
										res = r;
									}
									else {
										//1101201	Leslie[1101174]	修正檢核帳號狀態的異常處理
                                        //theLogger.warn('-W- 叫用 AuthWS.GetAccountMappedByArtifact() 回傳空字串');
										theLogger.warn('-W- 叫用 AuthWS.GetAccountMappedByArtifact() 發生例外');
										if('m_ErrCode' in r)
											theLogger.warn('-W- m_ErrCode：'+r.m_ErrCode);
										if('m_strErrMsg' in r){
											res = "ERR-" + r.m_strErrMsg
											theLogger.warn('-W- m_strErrMsg：'+r.m_strErrMsg);
										}
										else
											res = 'ERR-未知的錯誤。';
                                    }
                                  });
                return res;
			},
			/*getSpotLightMsg : function(artifact, options){
			    var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
			    var params = new SOAPClientParameters(), res;
			    params.add("argArtifact", artifact);
			    
			    SOAPClient.invoke(wsUrl, "GetSpotLightMsg", params, false,
                                  function(r) {
                                    //theLogger.log("-I- AuthWS.logout returns:");
                                    theLogger.log(r);
                                    if(typeof r == 'string') {
						res = r;
				    }
					else if(r != null) // 2015.03.16 Kevin 新增判斷回傳值為空字串
					{
						res = '';  
					}
					else {
						throw new Error('叫用AuthWS.GetSpotLightMsg!');
					}
                                  });
			    return res;
			    
			},*/
			/*changeActiveRole : function(artifact, orgNo, unitNo, id, options){
			    var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
			    var params = new SOAPClientParameters(), res;
			    params.add("argArtifact",artifact);
			    params.add("argSourceOrgNo",orgNo);
			    params.add("argSuperiorOU",unitNo);
			    params.add("argRoleNo",id);
			    SOAPClient.invoke(wsUrl, "ChangeActiveRole", params, false, function(r) {
                    theLogger.log(r);
                    if(typeof r == 'boolean') {
						res = r;
				    }
				    else {
                        throw new Error('叫用AuthWS.changeActiveRole!');
                    }
                });
			    return res;
			},
			getActiveRole : function(artifact, options){
			    var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
			    var params = new SOAPClientParameters(), res;
			    params.add("argArtifact",artifact);
			    SOAPClient.invoke(wsUrl, "GetActiveRole", params, false,
                                  function(r) {
										theLogger.log(r);
										if(typeof r == 'object') {
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
			},*/
			//1071024 Kevin 更新密碼新增傳入機關代碼 
			//public string ChangePasswordWithOrgNo(string argOrgNo, string argAccount, string argOldPassword, string argNewPassword)
			ChangePasswordWithOrgNo : function(orgNo, userId, oldPassword, newPassword, options) {
				var _dfd = $.Deferred();
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-ERR- AuthWS.ChangePasswordWithOrgNo was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
				}
				
                var params = new SOAPClientParameters();
				params.add('argOrgNo', orgNo);
				params.add('argAccount', userId);
                params.add('argOldPassword', oldPassword);
				params.add('argNewPassword', newPassword);
                
                /* SOAPClient.invoke() params:
                 *   url, method name, method parameter values,
                 *   call mode (async=true, sync=false), callback method
                 */
                SOAPClient.invoke(wsUrl, "ChangePasswordWithOrgNo", params, async,
                                  function(r) {
									// ChanagePassword 成功會直接回傳Artifact 
                                    theLogger.log("-I- AuthWS.ChangePasswordWithOrgNo returns:");
                                    theLogger.log(r);
                                    if (r.length===0) {
                                        _dfd.reject(new Error('回傳權仗為空字串!'));
                                    }
									else {
										_dfd.resolve(r);
									}
                                  });
				return _dfd.promise();
            },
			changePassword : function(userId, oldPassword, newPassword, options) {
				var _dfd = $.Deferred();
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-ERR- AuthWS.changePassword was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
				}
				
                var params = new SOAPClientParameters();
				params.add('argAccount', userId);
                params.add('argOldPassword', oldPassword);
				params.add('argNewPassword', newPassword);
                
                /* SOAPClient.invoke() params:
                 *   url, method name, method parameter values,
                 *   call mode (async=true, sync=false), callback method
                 */
                SOAPClient.invoke(wsUrl, "ChangePassword", params, async,
                                  function(r) {
									// ChanagePassword 成功會直接回傳Artifact 
                                    theLogger.log("-I- AuthWS.ChangePassword returns:");
                                    theLogger.log(r);
                                    if (r.length===0) {
                                        _dfd.reject(new Error('回傳權仗為空字串!'));
                                    }
									else {
										_dfd.resolve(r);
									}
                                  });
				return _dfd.promise();
            },
			/* 2015.2 - Eric Peng, 新增 */
			checkCertificateValidity : function(cert, usage, sourceOrgNo, options) {
				/* 取得驗證錯誤說明 */
				function _getErrStr(code) {
					if (code==-100) {
						return '有效性檢核作業時發生錯誤!';
					}
					switch(code) {
					case -1: return '憑證已過效期';
					case -2: return '憑證CA簽章驗證失敗';
					case -3: return '憑證已廢止';
					case -4: return '憑證用途錯誤';
					case -5: return '憑證未設定指定用途';
					case -6: return '機關憑證未鏈結';
					default:
						return '憑證驗證作業失敗[Server], 未知的代碼:' + code;
					}
				}
				
				var _dfd = $.Deferred();
				var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-ERR- AuthWS.checkCertificateValidity was invoked, but WS\'s url was missing!');
                    _dfd.reject({success:false, errCode:-101, errMsg:'AuthWS尚未設定服務網址URL'});
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
				}
        
                var params = new SOAPClientParameters();
				params.add('X509Cert', cert);
                params.add('Usage', usage);
				params.add('SOURCE_ORGNO', sourceOrgNo);
                
                /* SOAPClient.invoke() params:
                 *   url, method name, method parameter values,
                 *   call mode (async=true, sync=false), callback method
                 */
                SOAPClient.invoke(wsUrl, 'CheckCertificateValidity', params, async,
                                  function(r) {
									// CheckCertificateValidity完成會直接回傳long: 
                                    theLogger.log("-I- AuthWS.CheckCertificateValidity returns:" + r);
                                    if (r!==0) {
										var errStr = _getErrStr(r);
                                        _dfd.resolve({success:false, errCode:r, errMsg:errStr});
                                    }
									else {
										_dfd.resolve({success:true});
									}
                                  });
				return _dfd.promise();
			},
			/*
			 * 2015.6.4 - 由其它平台登入系統, 開啟公文系統時須叫用AuthWS.RegisterIPWithArtifcat以註冊IP/Artificate對照表!
			 */
            registIPWithArtifact : function(SAMLart, options) {
				var _dfd = $.Deferred();
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
				//1051130 Kevin 由此向Server註冊為二代使用
				//var wsFuncName = 'RegistIPWithArtifact';
				var wsFuncName = 'RegistIPWithArtifactAndMachineType';
				
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-ERR- AuthWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
				}
				
                var params = new SOAPClientParameters();
				params.add('argArtifact', SAMLart);
                params.add('argIP', ''); // 行動平台IP給空字串, server自行判定!
                //1051130 Kevin 由此向Server註冊為二代使用
				params.add('argMachineType', '1');
				
                // SOAPClient.invoke() params:
                //   url, method name, method parameter values,
                //   call mode (async=true, sync=false), callback method
                SOAPClient.invoke(wsUrl, wsFuncName, params, async,
                                  function(r) {
                                    theLogger.log('-I- AuthWS.' + wsFuncName + ' returns:');
                                    theLogger.log('    ' + JSON.stringify(r));
                                    if (r.m_bSuccess!==true) {
                                        _dfd.reject(new Error('ErrMsg=' + r.m_strErrMsg));
                                    }
									else {
										_dfd.resolve(r);
									}
                                  });
				return _dfd.promise();
            },
            /*
			 * 2015.6.17 - Kevin 新增取得選單
			 */
            /*getUserProgramsJSON: function (SAMLart, options)
            {
				var _dfd = $.Deferred();
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
				var wsFuncName = 'GetUserProgramsJSON';
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-ERR- AuthWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
				}
				
                var params = new SOAPClientParameters();
				params.add('argArtifact', SAMLart);
                    
                // SOAPClient.invoke() params:
                //   url, method name, method parameter values,
                //   call mode (async=true, sync=false), callback method
                SOAPClient.invoke(wsUrl, wsFuncName, params, async,
                    function (r)
                    {
                        if (typeof _debug=='boolean' && !!_debug) {
                        theLogger.log('-I- AuthWS.' + wsFuncName + ' returns:');
                        theLogger.log('    ' + JSON.stringify(r));
                        }

                                    if (r.indexOf('ERR-')===-1) {
                                        _dfd.resolve(r);
                                    }
                                    else {
                            _dfd.reject(new Error('取得應用程式選單失敗:' + r.m_strErrMsg));
                        }
                    });
                return _dfd.promise();
            },
            //1051005 Kevin 新增取得系統公告
            GetUserBulletinNew: function (artifact, argCount, options)
            {
                var _dfd = $.Deferred();
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
                var wsFuncName = 'GetUserBulletinNew';
                if (!wsUrl || wsUrl.length === 0) {
                    theLogger.error('-ERR- AuthWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
                    return _dfd.promise();
                }

				//1090812	Leslie[1090473]	修正取得模式，改為非同步
                //var async = false;
				var async = true;

                var params = new SOAPClientParameters();
                params.add('argArtifact', artifact);
                params.add('argCount', argCount);

                // SOAPClient.invoke() params:
                //   url, method name, method parameter values,
                //   call mode (async=true, sync=false), callback method
                SOAPClient.invoke(wsUrl, wsFuncName, params, async,
                    function (r)
                    {
                        theLogger.log('-I- AuthWS.' + wsFuncName + ' returns:');
                        theLogger.log(r);
                        if (typeof r !== 'object') {
                            _dfd.reject({ success: false, errMsg: 'AuthWS.' + wsFuncName + '回傳之內容異常!' });
                        }
                        else {
                            if (typeof r.m_bSuccess == 'boolean' && r.m_bSuccess === true){
                                _dfd.resolve({ success: true, BulletinInfo: r.Rtn, nTotal: r.nTotal });
                            }
                            else {
                                var sErrMsg = '';
                                if (typeof r.m_strErrMsg == 'string' && r.m_strErrMsg.length) {
                                    sErrMsg = '叫用AuthWS.' + wsFuncName + '回傳失敗, ErrMsg=' + r.m_strErrMsg;
                                }
                                else {
                                    sErrMsg = '叫用AuthWS.' + wsFuncName + '回傳失敗, 無錯誤說明';
                                }
                                _dfd.reject({ success: false, errMsg: sErrMsg });
                            }
                                    }
                                  });
				return _dfd.promise();
            },*/
			 //1060329 Kevin 新增檢核是否重複登入
            GetArtifactByIP: function (argIP, options)
            {
                var _dfd = $.Deferred();
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
                var wsFuncName = 'GetArtifactByIP';
                if (!wsUrl || wsUrl.length === 0) {
                    theLogger.error('-ERR- AuthWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
                    return _dfd.promise();
                }

                var async = false;

                var params = new SOAPClientParameters(), res = '';
                params.add('argIP', argIP);

                SOAPClient.invoke(wsUrl, wsFuncName, params, async,
                    function(r) {
                        theLogger.log("-I- AuthWS." + wsFuncName + " returns:" + r);
                        if(typeof r == 'string') {
                             res = r;
                        }
                        else {
                            theLogger.warn('-W- 叫用 AuthWS.GetAccountMappedByArtifact() 回傳空字串');
                        }
                     });
                return res;
			},
			
			//1080801 Keevin 1080562 新增不允許同帳號重複登入
            LogonChk: function (argOrgNo, argAcc, options)
            {
                var _dfd = $.Deferred();
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
                var wsFuncName = 'LogonChk';
                if (!wsUrl || wsUrl.length === 0) {
                    theLogger.error('-ERR- AuthWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
                    return _dfd.promise();
                }

                var async = false;

                var params = new SOAPClientParameters(), res = '';
                params.add('argOrgNo', argOrgNo);
				params.add('argAcc', argAcc);

                SOAPClient.invoke(wsUrl, wsFuncName, params, async,
                    function(r) {
                        theLogger.log("-I- AuthWS." + wsFuncName + " returns:" + r);
                        res = r;
                     });
                return res;
			},
			// 2019.7 Eric, 新增以儲存自動開次筆設定
			/*
			<UpdateUserEnvSet xmlns="http://www.2100t.com.tw/webservices/">
				<argArtifact>string</argArtifact>
				<argEnvName>string</argEnvName>
				<argEnvValue>string</argEnvValue>
				<argRemove>boolean</argRemove>
			</UpdateUserEnvSet>
			*/
			UpdateUserEnvSet: function(SAMLart, envName, envValue, remove, options) {
				var _dfd = $.Deferred();
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-ERR- AuthWS.UpdateUserEnvSet was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
					return _dfd.promise();
				}
				
				if (typeof envName!='string' || envName.length==0) {
					theLogger.error('-ERR- AuthWS.UpdateUserEnvSet "EnvName"須為字串!');
					_dfd.reject(new Error('Auth.UpdateUserEnvSet 無效的EnvName參數值!'));
					return _dfd.promise();
				}

				if (envName!=='AOL_AUTO_OPEN_NEXT' && envName!=='AOL_AUTO_OPEN_NEXT_ADV_MODE') {
					theLogger.error('-ERR- AuthWS.UpdateUserEnvSet 不合法的[EnvName='+ envName +']!');
					_dfd.reject(new Error('Auth.UpdateUserEnvSet 不合法的[EnvName='+ envName +']!'));
					return _dfd.promise();
				}

				envValue = (typeof envValue=='string')?envValue:'';
				remove = (typeof remove=='boolean')?remove:false;
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
				}
				
				var params = new SOAPClientParameters();
				params.add('argArtifact', SAMLart);
				params.add('argEnvName', envName);
                params.add('argEnvValue', envValue);
				params.add('argRemove', remove);
                
                /* SOAPClient.invoke() params:
                 *   url, method name, method parameter values,
                 *   call mode (async=true, sync=false), callback method
                 */
                SOAPClient.invoke(wsUrl, "UpdateUserEnvSet", params, async,
                                  function(r) {
									// ChanagePassword 成功會直接回傳Artifact 
                                    theLogger.log("-I- AuthWS.UpdateUserEnvSet returns:");
                                    theLogger.log(r);
                                    if (r.m_bSuccess!==true) {
										let errMsg = r.m_strErrMsg;
										if (typeof errMsg!='string' || errMsg.length==0) {
											errMsg = '未回傳ErrorMsg';
										}
                                        _dfd.reject(new Error(errMsg));
                                    }
									else {
										_dfd.resolve({success:true, rslt: r});
									}
                                  });
				return _dfd.promise();
			},
			//1110302 Leslie[1101537]	[Merge_1070118] 新增機關切換
            //1120815 Kevin 1120693 移除無用函式
			//1110307	Leslie[1101521]	[Merge_1080793]新增忘記密碼功能
			ForgotPWD: function (orgNo, userId, options) {
                var _dfd = $.Deferred();
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-ERR- AuthWS.ForgotPWD was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
				}
				
                var params = new SOAPClientParameters();
				params.add('argOrgNo', orgNo);
				params.add('Account', userId);
                
                /* SOAPClient.invoke() params:
                 *   url, method name, method parameter values,
                 *   call mode (async=true, sync=false), callback method
                 */
                SOAPClient.invokeJSON(wsUrl, "ForgotPWD", params, async,
                                  function(r) {
									// ChanagePassword 成功會直接回傳Artifact 
                                    theLogger.log("-I- AuthWS.ForgotPWD returns:");
                                    theLogger.log(r);
                                    if (r.length===0) {
                                        _dfd.reject(new Error('回傳權仗為空字串!'));
                                    }
									else {
										_dfd.resolve(r);
									}
                                  });
				return _dfd.promise();
            },
			//1110308	Leslie[1101521]	新增圖型驗證功能
			GetCaptchaMode: function(options){
				var _dfd = $.Deferred();
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-ERR- AuthWS.GetCaptchaMode was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
				}
				
                var params = new SOAPClientParameters();
                
                /* SOAPClient.invoke() params:
                 *   url, method name, method parameter values,
                 *   call mode (async=true, sync=false), callback method
                 */
                SOAPClient.invokeJSON(wsUrl, "GetCaptchaMode", params, async,
                                  function(r) {
									// GetCaptchaMode 成功會回傳Y/N 
                                    theLogger.log("-I- AuthWS.GetCaptchaMode returns:");
                                    theLogger.log(r);
                                    if ('error' in r) {
                                        _dfd.reject(new Error('檢核是否啟用圖型驗證失敗!'));
                                    }
									else {
										_dfd.resolve(r);
									}
                                  });
				return _dfd.promise();
			},
			GenCaptcha:function(options){
				var _dfd = $.Deferred();
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-ERR- AuthWS.GenCaptcha was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
				}
				
                var params = new SOAPClientParameters();
				                
                /* SOAPClient.invoke() params:
                 *   url, method name, method parameter values,
                 *   call mode (async=true, sync=false), callback method
                 */
                SOAPClient.invokeJSON(wsUrl, "GenCaptcha", params, async,
                                  function(r) {
									// GenCaptcha 成功會回傳驗證圖的Base64 
                                    theLogger.log("-I- AuthWS.GenCaptcha returns:");
                                    theLogger.log(r);
                                    if ('error' in r) {
                                        _dfd.reject(new Error('取得驗證圖型失敗!'));
                                    }
									else {
										_dfd.resolve(r);
									}
                                  },options);
				return _dfd.promise();
			},
			//1110308	Leslie[1101521]	新增圖型驗證功能	==END==
			//1140203	Leslie[1130962]	增加新版圖型驗證功能
			VerifyCheckCaptcha: function(verify, options){
				var _dfd = $.Deferred();
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-ERR- AuthWS.VerifyCheckCaptcha was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
				}
				
                var params = new SOAPClientParameters();
				params.add('argVerify', verify);
				
				SOAPClient.invokeJSON(wsUrl, "VerifyCheckCaptcha", params, async,
                                  function(r) {
									// 回傳驗證結果
                                    theLogger.log("-I- AuthWS.VerifyCheckCaptcha returns:");
                                    theLogger.log(r);
                                    if ('error' in r) {
                                        _dfd.reject(new Error('驗證失敗!'));
                                    }
									else {
										_dfd.resolve(r);
									}
                                  },options);
				return _dfd.promise();
			}
        };
	}

	/*
	 * 2012.2.17
	 */
	//1110308	Leslie[1101521]	新增圖型驗證功能
	// theSSO.MP.login = function login(org_id, user_id, password, finish_callback) {
	theSSO.MP.login = function login(org_id, user_id, password, finish_callback, options) {
		//1060302 Kevin 若重複開啟首頁，第一個首頁會取不到權杖問題修正
		//var SAMLart = window.localStorage.Artifact;
		//if (!!SAMLart && SAMLart.lenght>0) {
		//	window.localStorage.Artifact='';
		//	SAMLart = '';
		//}
		var SAMLart = '';

		let _tmBefore = null;
		if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
			theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- MP.login() BEGIN... [使用帳號/密碼登入]');
			_tmBefore = Date.now();
		}
		
		var expireErrStr = 'PASSWORD_EXPIRE';
		try {
			// 2014.8 - change logon function to logonByPasswordWithMachineType
			//1110308	Leslie[1101521]	新增圖型驗證功能
			// var promise = window.theWebServices.authws.logonByPasswordWithMachineType(org_id, user_id, password, 1);
			var promise = window.theWebServices.authws.logonByPasswordWithMachineType(org_id, user_id, password, 1, options);
			promise.done(function(rslt) {
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					if (_tmBefore!==null) {
						let _log = SSOUtil.dev_getTimeElapseStr('叫用AuthWS.logonByPaswordWithMachineType()', _tmBefore);
						theLogger.time(_log);
					}
					else {
						theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- AuthWS.logonByPaswordWithMachineType() Finished.');
					}
				}

				// 2014.10 - 測試changepassword
				/*if (confirm('測試密碼屆期, 變更密碼作業?')) {
					rslt='ERR-PASSWORD_EXPIRE';
				}*/
                if (rslt.indexOf('ERR-') === -1) {
					
					//1080513 Kevin 新增登入後通知訊息(原目的為提醒憑證將到期)
					if (rslt.indexOf('|')!=-1) {
						theSSO.logonPopMsg = rslt.split('|')[1];
						rslt = rslt.split('|')[0];
					}
					
					SAMLart = rslt;
					window.localStorage.Artifact = SAMLart;
					theLogger.log("-I- Logon succeeded. SAMLart=" + SAMLart);
					//1060329 Kevin 紀錄權杖
					theSSO.Artifact = SAMLart;
					//alert("Logon succeeded. SAMLart=" + SAMLart);
					//1070831	Leslie	配合滲透測試修改，登入後直接把Artifact寫入Cookie
					//document.cookie = 'SAMLart=' + escape(SAMLart) + ';path=/';
					//1140415	Leslie[1140556]	改用Post方式傳送
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
						//dataType:"json",
						//dataType:"text",
					});
					
					// 記錄登入成功之機關代碼及帳號
					window.localStorage.latest_login_orgid = org_id;
					window.localStorage.latest_login_userid = user_id;
					
					// 2012.2.29 - 測cookies [expire funtionality]
					var expire_normal = new Date();
					var expire_short = new Date();
					
					var nowStr = expire_short.toGMTString();
					
					if (finish_callback) {
						finish_callback(SAMLart);
					}
					else {
					  SSOUtil.loading('hide');
					}
				}
				else {
					SSOUtil.loading('hide');
					var sErr = rslt.substr(4);
						if (sErr===expireErrStr) {
							// setup exchange data for changePassword process
							theSSO.MP.exData = {
								changePassword : {
									orgId : org_id,
									userId : user_id
								}
							};
							
							SSOUtil.loading('hide');
							
							// 要求新密碼!
							// 2019.10.30 - 1080339 Eric, jQuery 3.0 upgrade
							//$("#lnkChagnePasswordDlg").trigger('click');
							$("body").pagecontainer("change", 'RD-DlgChangePassword.html?ver=5.0.34.0', {transition:'slidedown', changeHash: false, history:false});  // 2016.5
						}
						else {
							alert("登入錯誤:" + sErr);
							SSOUtil.loading('hide');
							//1110308	Leslie[1101521]	新增圖型驗證功能
							if($('#verifyCodeContain').is(':visible'))
								$('#lkVerifyCode').trigger('click')
						}
				}
			})
			.fail(function(errObj){
				alert(errObj);
				//1051111 Kevin 修正部分登入失敗時會一值顯示登入中
				SSOUtil.loading('hide');
			});
		}
		catch(err) {
			SSOUtil.loading('hide');
			if (typeof err.message === 'undefined') {
				alert('登入系統錯誤-叫用登入函式(logonByPasswordWithMachineType)失敗. [no responseText]');
			}
			else {
				alert('登入系統錯誤-叫用登入函式(logonByPasswordWithMachineType)失敗:' + err.message);
			}
		}
	}
    
    /*
	 * 2016.7.11
	 */
	theSSO.MP.loginByCert = function loginByCert(org_id, pincode, finish_callback) {
		//1060302 Kevin 若重複開啟首頁，第一個首頁會取不到權杖問題修正
		//var SAMLart = window.localStorage.Artifact;
		//if (!!SAMLart && SAMLart.lenght>0) {
		//	window.localStorage.Artifact='';
		//	SAMLart = '';
		//}
		let _tmBefore = null, _tmSCJob = null;
		if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- theSSO.MP.loginByCert() BEGIN...');
			_tmBefore = Date.now();
			_tmSCJob = Date.now();
		}

		var SAMLart = '';
		let _prmSignature = null;
		{
			let _dfd = $.Deferred();
			var sTBS;
			/* 2020.12 - 1090689, 因須取跨平台網頁元件模組資訊, 後移至計算簽章時再取時間.
			var now = new Date();
			var sTBS = now.getFullYear() + '-' + SSOUtil.padLeft((now.getMonth() + 1), 2) + '-' +
				SSOUtil.padLeft(now.getDate(), 2) + '-' + SSOUtil.padLeft(now.getHours(), 2) + '-' +
				SSOUtil.padLeft(now.getMinutes(), 2) + '-' + SSOUtil.padLeft(now.getSeconds(), 2);
			var tbsB64 =  Base64.encode(sTBS);
            */

            var encode = 'base64';
            var hashAlg = 'SHA1';
            
			// ToDo: (1)取pincode, (2)取加簽字串, (3) 叫用Smartcard加簽函式
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
				theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- SmartCard.makeSignature() BEGIN...');
				_tmBefore = Date.now();
			}

			// 2020.12.21 1090689 - 檢核跨平台網頁元件版本
			let sc1 = new SmartCard();
			let sc2 = new SmartCard();
			sc1.getSCardModuleInfo()
			.then(function(rslt) {
				// tbs raw string format: YYYY-mm-dd-hh-MM-ss (ex: 2016-07-11-13-38-23)
				var now = new Date();
				sTBS = now.getFullYear() + '-' + SSOUtil.padLeft((now.getMonth() + 1), 2) + '-' +
					SSOUtil.padLeft(now.getDate(), 2) + '-' + SSOUtil.padLeft(now.getHours(), 2) + '-' +
					SSOUtil.padLeft(now.getMinutes(), 2) + '-' + SSOUtil.padLeft(now.getSeconds(), 2);
				var tbsB64 =  Base64.encode(sTBS);

            	return sc2.makeSignature(tbsB64, encode, pincode, hashAlg)
			})
			.then(function(rslt){
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					SSOUtil.dev_logTimeElapse('SmartCard.makeSignature() DONE!', _tmBefore);
				}
				//1131004	Leslie[序272]	憑證登入時，將登入時的憑證改為優先選項
				sessionStorage.cCert = rslt.currModule;
				sc2.reset();
				
				var _rslt = $.extend({orgNo: org_id, timeStamp: sTBS}, rslt);
                _dfd.resolve(_rslt);
            })
            .fail(function(errRslt){
				sc1.reset();
				sc2.reset();
				_dfd.reject({success:false, errMsg: errRslt._errMsg});
            });
			_prmSignature = _dfd.promise();
			
			/*
			sTBS = now.getFullYear() + '-' + SSOUtil.padLeft((now.getMonth() + 1), 2) + '-' +
				SSOUtil.padLeft(now.getDate(), 2) + '-' + SSOUtil.padLeft(now.getHours(), 2) + '-' +
				SSOUtil.padLeft(now.getMinutes(), 2) + '-' + SSOUtil.padLeft(now.getSeconds(), 2);
			var tbsB64 =  Base64.encode(sTBS);

			var sc2 = new SmartCard();
			sc2.makeSignature(tbsB64, encode, pincode, hashAlg)
			.then(function(rslt){
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					SSOUtil.dev_logTimeElapse('SmartCard.makeSignature() DONE!', _tmBefore);
				}
				sc2.reset();
				
				var _rslt = $.extend({orgNo: org_id, timeStamp: sTBS}, rslt);
                _dfd.resolve(_rslt);
            })
            .fail(function(rslt){
				sc1.reset();
				sc2.reset();
				_dfd.reject({success:false, errMsg: rslt._errMsg});
			});
			_prmSignature = _dfd.promise();
			*/
		}

        _prmSignature
		.then(function(rslt) {
            // 取得簽體後叫用AuthWS.logonByCert
            try {
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					SSOUtil.dev_logTimeElapse('SmartCard [取得憑證及簽體] 完成!', _tmSCJob);
					_tmSCJob = null;

					theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- authws.logonByCert() BEGIN...');
					_tmBefore = Date.now();
				}

                var _dfd = $.Deferred();
                
                // change logon function to logonByPasswordWithMachineType
                window.theWebServices.authws.logonByCert(rslt.certb64, rslt.signature, rslt.timeStamp, org_id)
                .then(function(rslt) {
					if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
						SSOUtil.dev_logTimeElapse('AuthWS.logonByCert() DONE!', _tmBefore);
						_tmBefore = null;
					}

                    // 取得簽體後叫用AuthWS.logonByCert
                    try {
                        // 2014.10 - 測試changepassword
                        /*if (confirm('測試密碼屆期, 變更密碼作業?')) {
                            rslt='ERR-PASSWORD_EXPIRE';
                        }*/
                            
                        if (rslt.indexOf('ERR-')===-1) {
							
							//1080513 Kevin 新增登入後通知訊息(原目的為提醒憑證將到期)
							if (rslt.indexOf('|')!=-1) {
								theSSO.logonPopMsg = rslt.split('|')[1];
								rslt = rslt.split('|')[0];
							}
							
                            SAMLart = rslt;
                            window.localStorage.Artifact = SAMLart;
                            theLogger.log("-I- Logon succeeded. SAMLart=" + SAMLart);
                            //1060329 Kevin 紀錄權杖
                            theSSO.Artifact = SAMLart;
                            
							//1070831	Leslie	配合滲透測試修改，登入後直接把Artifact寫入Cookie
							//1140415	Leslie[1140556]	改用Post方式傳送
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
							
							if (finish_callback) {
								if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
									theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- _postLoginProcess() BEGIN...');
									window.tmBeginPostLogon = Date.now(); // [_postLoginProcess開始]
								}
                                finish_callback(SAMLart, false, pincode); // 2016.10.19 - add pincode
                            }
                            else {
                                SSOUtil.loading('hide');
                            }
                        }
						//1110324	Leslie[1101521]	增加處理回傳的密碼過期
						else if(rslt.indexOf('PASSWORD_EXPIRE') != -1 ){
							let user_id = rslt.split('|')[1];
							SSOUtil.loading('hide');
							theSSO.MP.exData = {
								changePassword : {
									orgId : org_id,
									userId : user_id
								}
							};
							
							// 要求新密碼!
							$("body").pagecontainer("change", 'RD-DlgChangePassword.html?ver=5.0.34.0', {transition:'slidedown', changeHash: false, history:false});  // 2016.5
						}
                        else {
                            SSOUtil.loading('hide');
                            var sErr = rslt.substr(4);
                            alert("登入錯誤:" + sErr);
                        }
                    }
                    catch(err) {
                        SSOUtil.loading('hide');
                        if (typeof err.message === 'undefined') {
                            alert('登入系統錯誤-叫用登入函式(logonByCert)失敗. [no responseText]');
                        }
                        else {
                            alert('登入系統錯誤-叫用登入函式(logonByCert)失敗:' + err.message);
                        }
                    }
                })
                .fail(function(err){
                    var errMsg;
                    if (!!err && err.message) {
                        errMsg = err.message;
                    }
                    else if (!!err && err.errMsg) {
                        errMsg = err.errMsg;
                    }
                    theLogger.error('Invoke AuthWS.logonByCert failed, errMsg:' + errMsg);
                    alert('登入系統作業錯誤-' + errMsg);
                    SSOUtil.loading('hide');
                });
            }
            catch(e) {
                SSOUtil.loading('hide');
                theLogger.error('Invoke AuthWS.logonByCert failed, errMsg:' + e.message);
                alert("登入錯誤:" + e.message);
            }
        })
        .fail(function(failRslt_Logon){
            /* 2017.10.12 - 1060819, 修訂回報錯誤機制 */
			var _errMsg = '';
			if (!!failRslt_Logon._errMsg) {
				_errMsg = '登入錯誤:' + failRslt_Logon._errMsg;
            }
            else if (!!failRslt_Logon.errMsg) {
                _errMsg = '登入錯誤:' + failRslt_Logon.errMsg;
            }
            else {
                _errMsg = '登入錯誤:' + failRslt_Logon.toString();
			}
			
			if (!!_errMsg && _errMsg.length) {
				theLogger.warn(_errMsg);
                alert(_errMsg);
			}
			SSOUtil.loading('hide');
        });
	};

	//1060329 Kevin 重複登入處理
	theSSO.MP.CheckUsing = function CheckUsing() {
			
		//1110908 Kevin 1111021 配合AuthWS調整，不呼叫已不檢核函式
		//var UsingArtifact = window.theWebServices.authws.GetArtifactByIP('');
		//if(UsingArtifact != '')
		//{
		//	var UsingAcc = window.theWebServices.authws.getAccountMappedByArtifact(UsingArtifact);
		//	
		//	if(confirm('此電腦已有[' + UsingAcc + ']連線紀錄，若繼續則前次登入未儲存資訊將遺失，是否繼續？'))
		//	{
		//		theLogger.log('此電腦已有[' + UsingAcc + ']連線紀錄，使用者選擇覆蓋。');
		//		return false;
		//	}
		//	else
		//	{
		//		theLogger.log('此電腦已有[' + UsingAcc + ']連線紀錄，使用者選擇不繼續連線。');
		//		return true;
		//	}
		//}
		return false;
	};
	
	//1060329 Kevin 檢核登入狀態
	//1091231 Kevin 1090722 新增重取待辦設定
	//theSSO.MP.CheckLoginStatus = function CheckLoginStatus() {
	theSSO.MP.CheckLoginStatus = function CheckLoginStatus(strActive) {
			
		var UsingAcc = window.theWebServices.authws.getAccountMappedByArtifact(theSSO.Artifact);
		
		if(UsingAcc == '')
		{
			alert('你已被登出公文系統。');
			theSSO.logoned = false;
			theSSO.logOutNow = true;
			$('#btn_logout').trigger('click');
			return false;
		}
		
		//1101201	Leslie[1101174]	修正檢核帳號狀態的異常處理
		if(UsingAcc.indexOf('ERR-') == 0){
			alert('驗證時發生異常，異常訊息：'+UsingAcc.replace('ERR-')+'，請稍候再試。');
			return false;
		}
		
		//1091021 Kevin 1090722 額外確認SR註冊狀態
		theLogger.log('SignalR ' + theSSO.SignalR_State);
		if(!theSSO.SRSetHello)
		{
			//1091231 Kevin 1090722 新增重取待辦設定
			if(strActive)
				theSSO.SRLastError = strActive + ' ' + theSSO.SRLastError;
			
			theLogger.log('SignalR OpenDoc sHello' + theSSO.Artifact + " " + theSSO.User.account + ';' + theSSO.User.orgid);
			theSSO.chat.server.sHello(theSSO.Artifact, theSSO.User.account + ';' + theSSO.User.orgid, $.connection.hub.transport.name, theSSO.SRLastError);
		}
		
		return true;
	};
	
	//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
	theSSO.MP.LogonByMobileMoica = function LogonByMobileMoica(org_id, user_id, verifyMode, finish_callback){
		
		function _CheckLogonByMobileMoica(org_id,user_id){
			var _dfd = $.Deferred();
			var artifact = sessionStorage["Artifact"];
			theMoica.CheckLogonByMobileMoica(org_id,user_id,{async:true,url:SSO_CONFIG.getWSUrl('authws')}).then(function(rslt){
				console.log(rslt);
				if(rslt.isSuccess)
					_dfd.resolve(rslt);
				else{
					_dfd.reject(new Error(rslt));
				}
			})
			return _dfd.promise();
		}
		
		function _waitResult(org_id,user_id){
			var _dfd = $.Deferred();
			theMoica.verifyTimeOut = 180;
			var $timer = $('#dlgQrCode .countDown');
			theMoica.countDown = setInterval(function(){
				theMoica.verifyTimeOut--;
				if($timer.length)
					$timer.text(theMoica.verifyTimeOut);
				else
					$timer = $('#dlgQrCode .countDown');
				if(theMoica.verifyTimeOut == 0){
					clearInterval(theMoica.countDown);
				}
				if(theMoica.verifyTimeOut%3 == 0){
					theMoica.CheckResultByMobileMoica({async:true,url:SSO_CONFIG.getWSUrl('authws')}).then(function(rslt){
						if(rslt.isSuccess){
							clearInterval(theMoica.countDown);
							$.mobile.changePage( window.location.href+'#home');	//收掉QRCode對話框
							//驗證成功
							_dfd.resolve(_CheckLogonByMobileMoica(org_id,user_id));
						}
						else if(!rslt.isSuccess && rslt.errorMsg.indexOf('尚未完成') == 0)
							_dfd.reject(rslt.errorMsg);
					})
					.fail(function(err){
						clearInterval(theMoica.countDown);
						alert(err.errMsg)
						_dfd.reject(new Error(err.errMsg));
					})
				}
			},1000)
			return 	_dfd.promise();
		}
		
		var SAMLart = '';
		try{
			theMoica.InitVerifyForMoica(org_id, user_id, verifyMode, {async:true,url:SSO_CONFIG.getWSUrl('authws')}).then(function(rslt){
				console.log(rslt);
				sessionStorage["trancation_id"]=rslt.trancation_id;
				sessionStorage["sp_ticket_id"]=rslt.sp_ticket_id;
				
				if(rslt.isSuccess){
					if(verifyMode == theMoica.verifyMode.WebToAPP){
						theMoica.actionMoicaAPP(user_id, rslt.sp_ticket);
					}
					else if(verifyMode == theMoica.verifyMode.QRCode){
						sessionStorage["QrCode"] = rslt.sp_ticket;
						sessionStorage['AuthwsURL'] = SSO_CONFIG.getWSUrl('authws');
						sessionStorage["moica_org_id"] = org_id;
						sessionStorage["moica_user_id"] = user_id;
						$.mobile.changePage('RD-MoicaQrCode.html', { role: "dialog", data:'Logon'});
					}
					return _waitResult(org_id,user_id);
				}
				else{
					return {isSuccess:false,errorMsg:rslt.errorMsg};
				}
			})
			.done(function(rslt){
				if('isSuccess' in rslt && rslt.isSuccess){
					SAMLart = rslt.Artifact;
					window.localStorage.Artifact = SAMLart;
					theLogger.log("-I- Logon succeeded. SAMLart=" + SAMLart);
					theSSO.Artifact = SAMLart;
					
					$.ajax({
						type:"POST",
						url:SSO_CONFIG.ServerHost+"/iiws/registCookie.ashx?ck="+SAMLart,
						//data:'{"ck":"'+SAMLart+'"}',	//保留功能
						contentType:"application/json; charset=utf-8",
						dataType:"text"
					});
					
					if (finish_callback) {
						finish_callback(SAMLart, false);
					}
					else {
						SSOUtil.loading('hide');
					}
				}
				else {
					SSOUtil.loading('hide');
					var sErr = rslt.errorMsg.replace('ERR-','');
					alert("登入錯誤:" + sErr);
				}
			})
			.fail(function(errObj){
				alert(errObj);
				SSOUtil.loading('hide');
			});
		}
		catch(err){
			SSOUtil.loading('hide');
			if (typeof err.message === 'undefined') {
				alert('登入系統錯誤-叫用登入函式(InitVerifyForMoica)失敗. [no responseText]');
			}
			else {
				alert('登入系統錯誤-叫用登入函式(InitVerifyForMoica)失敗:' + err.message);
			}
		}
	}
	//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]	==END==
	

})(jQuery);

/*
 * jQuery's ready() call back function
 */
// 2019.10.28 - 1080339 Eric, jQuery 3 upgrad
//$(document).ready(function() {
$(function() {
	function _initControls() {
		var lorgid = window.localStorage['latest_login_orgid'];
		var luserid = window.localStorage['latest_login_userid'];
		if (typeof lorgid === 'string' && lorgid.length) {
			// 2012.8.29 - 改用MobiScroll
			var org_name =_getOrgName(lorgid);
			$("#orgid_input")[0].value = org_name;
		}
		else if (!lorgid || lorgid=="") {
			$("#orgid_input")[0].value = SSO_CONFIG.getOrgInfo(0).orgName;
		}
		
		if (typeof luserid === 'string' && luserid.length) {
			//1120901 Joe 1120709 弱掃修正Client DOM Stored XSS
			// $('#in_userid')[0].value = luserid;
			$('#in_userid')[0].value = HtmlEncode(luserid);
		}
		//1110308	Leslie[1101521]	新增圖型驗證功能
		var promise = window.theWebServices.authws.GetCaptchaMode()
		promise.done(function(rslt) {
			//1140203	Leslie[1130962]	增加新版圖型驗證功能
			// if (rslt.value === 'Y'){
			var capSet = rslt.value.split(';')
			var bVeirfy = capSet[0] == 'Y'
			var capMode = capSet[1];
			if (bVeirfy){
				$('#verifyCodeContain').show();
				theSSO.MP.verifyCaptcha = true;
				//1140203	Leslie[1130962]	增加新版圖型驗證功能
				theSSO.MP.verifyCaptchaMode = capMode;
			}
		})
		.fail(function(errObj){
			alert(errObj);
		});
	}

	// psudo-GUID [Note: The result is NOT a REAL GUID!!!]
	function guidGenerator() {
	    var S4 = function() {
		   	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		};
		return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	}
	/*
	 * 設定[登入機關]spin wheel之內容 (#orgid_input)
	 */
	function _initOrgListSpinWheel(id, addAll, display_pos) {
		var type = typeof $('#'+id)[0];
		theLogger.debug('_initOrgListSpinWheel() typeof target element:' + type);
		
		if (id==undefined || id.length==0) {
			alert('_initOrgListSpinWheel(), invalid "id"');
            theLogger.warn('_initOrgListSpinWheel(), invalid "id"');
			return;
		}
		
		var wheels = [];
		var title = '機關'; //'會辦語詞';
		
		var obj = {};
		obj[title] = {};
		
		//1110320	Leslie[1110167]	[考試院]UI調整，設為一般下拉式選單
		var arOrg = [];
		
		var orgCnt = SSO_CONFIG.getOrgCount();
		for(var i=0; i<orgCnt; i++) {
			var orgInfo = SSO_CONFIG.getOrgInfo(i);
			obj[title][i] = orgInfo.orgName;
			//1110320	Leslie[1110167]	[考試院]UI調整，設為一般下拉式選單
			arOrg.push(orgInfo.orgName);
				
				// ASP架構才可以指定登入機關...
				if (SSO_CONFIG.IISystemMode==='Normal') {
					break;
				}
		};
		
		//1110320	Leslie[1110167]	[考試院]UI調整，設為一般下拉式選單
		$('#' + id).autocomplete({
			source:arOrg
			,minLength: 0
			,select: function(event,ui){
				$(this).val(ui.item.label);
				return false;
			}
		}).on('click',function(){
			$(this).autocomplete( "search", "" );
		});
		$('#' + id).autocomplete('instance').menu.activeMenu.css('z-index','500');
		return;
		
		//1131101	Leslie[1130977]	移除MobiScroll
		/*wheels.push(obj);
		
		$('#' + id).scroller({
				width: 120,
				wheels: wheels,
				theme: 'ios',
				//align_mode: display_pos, // 2012.2.1 - Eric Peng
				display: 'bubble',
				anchor: $('#'+id),
				setText: '確定',
				cancelText: '取消',
				parseValue: function (s) {
					var d = [];
					if (!!s && s !== '' && s !== 'undefined') {
						for (var i in wheels[0][title]) {
							var org = wheels[0][title][i];
							if (org == s)
								d.push(parseInt(i));
						}
					}
					else {
						d.push(0); //[1,1,1];
					}
					return d;
				},
				formatResult: function(d) {
					var sRslt = wheels[0][title][d[0]];
					return sRslt;
				}
		});
		
		// 點擊時顯示scroll wheel control
		$('#' + id).on('click', function() { $(this).scroller('show'); });
		
		// 2015.5 - Eric Peng, 解決iOS8取消選取後，再次點擊時不會顯示選單問題.
		$('#' + id).on('focus', function(ev){
			//$(this).blur();
			$(this).trigger('blur');
			ev.preventDefault();
		});*/
	}

	function _getOrgId(orgName) {
		var name = '';
		if (!orgName || (orgName.length==0)) {
			name = $("#orgid_input")[0].value;
		}
		else {
			name = orgName;
		}
			
		var cnt = SSO_CONFIG.getOrgCount();
		var orgInfo = null;
		for(var i=0; i<cnt; i++) {
			orgInfo = SSO_CONFIG.getOrgInfo(i);
			if (orgInfo.orgName === name) {
				theLogger.log('Target Org Id=' + orgInfo.orgCode + ', Name=' + orgInfo.orgName);
				return orgInfo.orgCode;
			}
		}
		return '';
	}

	function _getOrgName(orgId) {
		if (!orgId || (orgId.length===0)) {
			return '';
		}
			
		var cnt = SSO_CONFIG.getOrgCount();
		var orgInfo = null;
		for(var i=0; i<cnt; i++) {
			orgInfo = SSO_CONFIG.getOrgInfo(i);
			if (orgInfo.orgCode === orgId) {
				theLogger.log('Target Org name=' + orgInfo.orgName + ', Id=' + orgInfo.orgCode);
				return orgInfo.orgName;
			}
		}
		return '';
	}

    // 清空 artifact
	//1060302 Kevin 若重複開啟首頁，第一個首頁會取不到權杖問題修正
    //window.localStorage['Artifact'] = '';
	
	//alert('cookie=' + unescape(document.cookie));
	
	_initControls();
    
    $('#btn_login').on('click', function() {
		if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 登入公文系統作業 BEGIN...');
			//1100503	Leslie[1100333]	配合首頁分割後，修正登入記時的變數以傳遞至後續計算
            //window.tmBeginLogin = Date.now();
			window.localStorage.tmBeginLogin = Date.now();
		}
		
		// 2012.8.29 - 改用MobiScroll
		var orgid = _getOrgId('');
		var userid = $('#in_userid')[0].value;
		var userKey = $('#in_password')[0].value;
		
		//1140423	Leslie[1140158]	[退輔會]參考[1111290]新增無機關選單的ASP架構模式[AspHideOrg]
		var bCheckOrgidPass = (orgid.length > 0)?true:(SSO_CONFIG.IISystemMode === 'AspHideOrg');

		//1050719 Kevin 新增憑證登入
		if($('#radio-choice-loginbyAccount')[0].checked) {
			// 1130809 Raymond 1130313 合併1111007(1100394), 離線版要改用非同步
			//1110308	Leslie[1101521]	新增圖型驗證功能
			//var options = new Object();
			var options = {async: true};
			
			if (typeof orgid === 'string' && typeof userid === 'string' && typeof userKey === 'string') {
				//1140423	Leslie[1140158]	[退輔會]參考[1111290]新增無機關選單的ASP架構模式[AspHideOrg]
				// if (orgid.length>0 && userid.length>0 && userKey.length>0) {
				if (bCheckOrgidPass && userid.length>0 && userKey.length>0) {
					
					//1110330	Leslie[1101521]	新增圖型驗證功能，調整驗證順序
					if(theSSO.MP.verifyCaptcha){
						let veriVal = $('#in_verifyCode')[0].value ;
						if(typeof veriVal === 'string' && veriVal.length == 0){
							//1140203	Leslie[1130962]	增加新版圖型驗證功能
							if(theSSO.MP.verifyCaptchaMode == '2')
								alert('請點擊核取方塊');
							else
							alert('驗證碼不可為空白!');
							$('#lkVerifyCode').trigger('click');
							return;
						}
						options.headers = new Object();
						options.sendOut = true;		//設定為送出header
						options.headers.CHV = veriVal;
						options.headers.CHA = $('#verifyCodeContain img').data('CHA');
					}		
					
					//1060329 Kevin 重複登入處理
					if(theSSO.MP.CheckUsing())
						return;
						
					SSOUtil.loading('show', { text:'正在登入系統...', textVisible:true, theme:'c' });
			
					if (_debugLogin) { // for none-WebService testing
						var SAMLart = guidGenerator();
						window.localStorage.Artifact = SAMLart;
						theLogger.log("-I- Logon succeeded. SAMLart=" + SAMLart);
						
						// 記錄登入成功之機關代碼及帳號
						window.localStorage.latest_login_orgid = orgid;
						window.localStorage.latest_login_userid = userid;
						
						// 2021.4.20 - 1100333 Eric, 成功登入後跳轉至eDoc網頁
						//setTimeout(_postLoginProcess(SAMLart), 100);	
						setTimeout(function() {
                            window.location.href = SSO_CONFIG.EDocPage+'?='+Date.now();
                        }, 100);	
					}
					else {
						window.scrollTo(0, 0);
						// 2021.4.20 - 1100333 Eric, 成功登入後跳轉至eDoc網頁
						theSSO.MP.login(orgid, userid, userKey, function(SAMLart, registerIP, userKey) {
                            window.localStorage.Artifact = SAMLart;
                            setTimeout(function() {
								window.location.href = SSO_CONFIG.EDocPage+'?='+Date.now();
                            }, 100);
						//1110308	Leslie[1101521]	新增圖型驗證功能，傳入options
                        //});
						},options);
					}
				}
				else {
					//1110330	Leslie[1101521]	新增圖型驗證功能，調整驗證順序
					if(theSSO.MP.verifyCaptcha){
						let veriVal = $('#in_verifyCode')[0].value ;
						if(typeof veriVal === 'string' && veriVal.length == 0){
							//1140203	Leslie[1130962]	增加新版圖型驗證功能
							if(theSSO.MP.verifyCaptchaMode == '2')
								alert('請點擊核取方塊');
							else
							alert('帳號或密碼不可為空白!\n驗證碼不可為空白!');
							$('#lkVerifyCode').trigger('click');
							return;
						}
						//1140203	Leslie[1130962]	增加新版圖型驗證功能，補上缺漏驗證
						else
							alert("帳號或密碼不可為空白!");
					}
					else
					alert("帳號或密碼不可為空白!");
				}
			}
			else {
				//1110330	Leslie[1101521]	新增圖型驗證功能，調整驗證順序
				if(theSSO.MP.verifyCaptcha){
					let veriVal = $('#in_verifyCode')[0].value ;
					if(typeof veriVal === 'string' && veriVal.length == 0){
						//1140203	Leslie[1130962]	增加新版圖型驗證功能
						if(theSSO.MP.verifyCaptchaMode == '2')
							alert('請點擊核取方塊');
						else
						alert('帳號或密碼不可為空白!\n驗證碼不可為空白!');
						$('#lkVerifyCode').trigger('click');
						return;
					}
				}
				else
				alert("帳號或密碼不可為空白!");
			}
		}
		//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
		//1140718	Leslie[問題彙整序155]	不啟用行動自然人憑證時，該物件被直接移除，增加判斷條件
		// else if($('#radio-choice-loginbyMobileMoica')[0].checked) {
		else if($('#radio-choice-loginbyMobileMoica').length && $('#radio-choice-loginbyMobileMoica')[0].checked) {
			if (typeof orgid === 'string' && typeof userid === 'string' && orgid.length && userid.length) {
				if(theSSO.MP.CheckUsing())
					return;
				window.scrollTo(0, 0);
				
				var isMobile = navigator.userAgent.search(/Mobile/gi) > 0;
				if (!isMobile && !window.realMac) {
					isMobile = navigator.userAgent.search(/Macintosh/gi) > 0;
				}
				var verifyMode = (isMobile || iOS_device)?theMoica.verifyMode.WebToAPP:theMoica.verifyMode.PUSH;//PC預設為推播，行動裝置預設為WebToAPP
				
				theSSO.MP.LogonByMobileMoica(orgid, userid, verifyMode, function(SAMLart, registerIP, userKey) {
                    window.localStorage.Artifact = SAMLart;
                    // 記錄登入成功之機關代碼及帳號
                    window.localStorage.latest_login_orgid = orgid;
					window.localStorage.latest_login_userid = userid;

                    setTimeout(function() {
                        window.location.href = SSO_CONFIG.EDocPage;
                    }, 100);
                });				
			}
			else {
				alert("帳號不可為空白!");
			}
		}		
		else
		{
			if (typeof orgid === 'string' && typeof userKey === 'string' && orgid.length && userKey.length) {
				//1060329 Kevin 重複登入處理
				if(theSSO.MP.CheckUsing())
					return;
				
				window.scrollTo(0, 0);

				SSOUtil.loading('show', {text:'正在登入系統...', textVisible:true, theme:'c'}); // 2017.10.12 - 1060819
				// 2021.4.20 - 1100333 Eric, 成功登入後跳轉至eDoc網頁
				theSSO.MP.loginByCert(orgid, userKey, function(SAMLart, registerIP, userKey) {
                    window.localStorage.Artifact = SAMLart;
                    
					// 記錄登入成功之機關代碼及帳號
                    window.localStorage.latest_login_orgid = orgid;
					window.localStorage.latest_login_userid = userid;

                    setTimeout(function() {
						let _rslt = SSOUtil.processKeyword(userKey); // {success:true, key:xxxx}
						sessionStorage.igotu = _rslt.key;
                        window.location.href = SSO_CONFIG.EDocPage+'?='+Date.now();
                    }, 100);
                });
			}
			else {
				alert("密碼不可為空白!");
			}
		}
    });
	
	//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
	$('#lkQRCode').on('click',function(){
		var orgid = _getOrgId('');
        var userid = $('#in_userid')[0].value;
		if (typeof orgid === 'string' && typeof userid === 'string' && orgid.length && userid.length) {
			if(theSSO.MP.CheckUsing())
				return;
			window.scrollTo(0, 0);
						
			theSSO.MP.LogonByMobileMoica(orgid, userid, theMoica.verifyMode.QRCode, function(SAMLart, registerIP, userKey) {
				window.localStorage.Artifact = SAMLart;
				// 記錄登入成功之機關代碼及帳號
				window.localStorage.latest_login_orgid = orgid;
				window.localStorage.latest_login_userid = userid;

				setTimeout(function() {
					window.location.href = SSO_CONFIG.EDocPage;
				}, 100);
			});				
		}
		else {
			alert("帳號不可為空白!");
		}
	})

	$(document).on('pagecreate', '#login', function() {
        theLogger.debug('#login page, [pagecreate] event handler invoked...');
        
		// 1130816 Raymond 1130313 合併1111007(1100394), 新增離線版按鈕, 並判斷SSO_CONFIG.js的enableOfflineMode設為true時, 才顯示「離線版公文製作」按鈕
		if('serviceWorker' in navigator && !!SSO_CONFIG && SSO_CONFIG.enableOfflineMode == true) {
			if(!!navigator.serviceWorker.controller &&
				navigator.serviceWorker.controller.scriptURL.match(/sw.js$/)) {
				$("#gotoOfflineLoginPage").show();
				navigator.serviceWorker.ready.then(function(registration) {
					console.log("%cService Worker Registered", "background: wheat; color: darkblue", registration);
					registration.addEventListener('updatefound', function() {
						console.log("ServiceWorker.onupdatefound", registration.installing);
						let newInstall = registration.installing;
						$('#gotoOfflineLoginPage').find(".ui-btn").addClass("ui-disabled");
						$('#gotoOfflineLoginPage').find(".ui-btn").text('更新離線版公文製作');
						newInstall.postMessage("offlineMode=false");	// 若已安裝過離線版ServiceWorker, 連線模式登入頁要先通知ServiceWorker預設為連線模式
						// 偵測安裝結束
						newInstall.addEventListener('statechange', function(evt) {
							console.log("ServiceWorker.onstatechange", evt.target.state);
							if(evt.target.state == "activated") {
								$('#gotoOfflineLoginPage').find(".ui-btn").removeClass("ui-disabled");
								$('#gotoOfflineLoginPage').find(".ui-btn").text("離線版公文製作");
								evt.target.postMessage("offlineMode=false");	// 安裝結束後連線模式登入頁要先通知ServiceWorker預設為連線模式
								//location.reload();	// 更新完的ServiceWorker好像要重新整理才會生效
							}
						});
					});
					var t0 = new Date();
					if(registration.installing) {
						registration.installing.postMessage("offlineMode=false");	// 若已安裝過離線版ServiceWorker, 連線模式登入頁要先通知ServiceWorker預設為連線模式
						console.log("postMessage1 - ", (new Date() - t0) + "ms");
					}
					else if(registration.waiting) {
						registration.waiting;
					}
					else if(registration.active) {
						registration.active.postMessage("offlineMode=false");	// 若已安裝過離線版ServiceWorker, 連線模式登入頁要先通知ServiceWorker預設為連線模式
						console.log("postMessage1 - ", (new Date() - t0) + "ms");
					}
				});
			}
			// 安裝/更新進度條及取得最後一次連線登入更新資源檔的機關代碼
			navigator.serviceWorker.addEventListener('message', function(event) {
				console.log(event.data);
				if(typeof event.data == "string" && event.data.match(/^\{/)) {
					let param = JSON.parse(event.data);
					if(param.action == "install") {
					}
					else if(param.action == "update") {
					}
					else if(param.action == "progress") {
						$('#gotoOfflineLoginPage').find(".ui-btn").text('更新離線版公文製作(' + param.downloadedFiles + '/' + param.totalFiles + ')');
					}
					else if(param.action == "complete") {
					}
				}
			});
		}
		_initOrgListSpinWheel("orgid_input", true, 'bottom');
		//1100929	Leslie[1100944]	新增可依設定顯示/隱藏客製化Logo區域
		if(SSO_CONFIG.CustomLogoPath != ""){
			$('#OrgTitle').css('background-image', 'url(' + SSO_CONFIG.CustomLogoPath + ')').show();
		}		
		//1140423	Leslie[1140158]	[退輔會]參考[1111290]新增無機關選單的ASP架構模式[AspHideOrg]
		if(SSO_CONFIG.IISystemMode === 'AspHideOrg')
			$('#orgid_wrapper').hide();
		theLogger.debug('#login page, [pagecreate] event handler end.');
    });
    
    $(document).on('pageinit', '#login', function() {
        theLogger.debug('#login page, [pageinit] event handler invoked...');
		
        $("div#login input[name='radio-choice-login-type']").on("change", function(event, ui) {
            var checkId = $(event.target).attr('id'); //is(':checked');
            if (checkId.search('loginbyCert')>0) {
                $('div#login div.userid_wrapper').hide();
                $('div#login div.password_wrapper label[for="password"]').text('金鑰密碼：');
				//1110324	Leslie[1101521]	新增圖型驗證功能
				//1141021	Leslie[序312]	移至後面
				// if(theSSO.MP.verifyCaptcha)
					// $('#verifyCodeContain').hide();
				//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
				$('div#login div.password_wrapper').show();
				$('#lkResetPWD').hide();
				$('div#login a#lkQRCode').hide();
				//1141021	Leslie[序312]	移到這裡
				if(theSSO.MP.verifyCaptcha)
					$('#verifyCodeContain').hide();
            }
            else if (checkId.search('loginbyAccount')>0) {
				//1110816	Leslie[1110787]	增修彰師大客製化功能
				if(SSO_CONFIG.OrgNickName == 'NCUE'){
					var arHost = location.host.split('.');
					arHost[0] += 's';
					var urlAutoLoginByType = location.protocol + "//" + arHost.join('.') + '/IIWS/AutoLoginByType.aspx?fromSSO=1';
					location.assign(urlAutoLoginByType);
				}
				else{
	                $('div.userid_wrapper').show();
	                $('div#login div.password_wrapper label[for="password"]').text('密　碼：');   
					//1110324	Leslie[1101521]	新增圖型驗證功能
					if(theSSO.MP.verifyCaptcha)
						$('#verifyCodeContain').show();
					//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
					$('div#login div.password_wrapper').show();
					$('#lkResetPWD').show();
					$('div#login a#lkQRCode').hide();
				}
            }
			//1140610	Leslie[1131183]	[Merge]新增行動自然人憑證模組[1110117]
			else if (checkId.search('loginbyMobileMoica') > 0){
				$('div#login div.userid_wrapper').show();
				$('div#login div.password_wrapper').hide();
				$('div#login a#lkQRCode').show();
				$('#lkResetPWD').hide();
			}
			//1120517	Leslie[1111006]	未啟用時，一律隱藏
			if(theSSO.MP.verifyCaptcha == undefined)
				$('#verifyCodeContain').hide();
        });
		
		//1110308	Leslie[1101521]	新增圖型驗證功能
		if($('#verifyCodeContain').is(':visible')){
			$('#lkVerifyCode').on('click',function(event,ui){
				var options = new Object();
				options.headers = new Object();
				options.receive = true;		//設定為接取header
				options.headers.CHA = "";	//設定要接取的header欄位
				$('#in_verifyCode').val('');
				
				var promise = window.theWebServices.authws.GenCaptcha(options)
				promise.done(function(rslt) {
					if(rslt.value.indexOf('data:img/png') !== -1){
						$('#verifyCodeContain img').attr('src',rslt.value).data('CHA',rslt.headers['CHA']);
						//1110601	Leslie	修正圖形驗證在預設為智慧卡登入時的顯示異常
						if (SSO_CONFIG.LoginType=='SMARTCARD')
							$('#verifyCodeContain').hide();
						//1140203	Leslie[1130962]	增加新版圖型驗證功能
						if(theSSO.MP.verifyCaptchaMode == '2'){
							$('#verifyCodeContain label').css('visibility','hidden');
							$('#verifyCodeContain input').parent().hide();
							$('#verifyCodeContain .checkmark').remove()
							theSSO.MP.captchaVerify = {};
							$('#verifyCodeContain img').off('click').on('click', function(event,ui){
								if(event.offsetX >= 60)
									return;
								theSSO.MP.captchaVerify['arTarget'] = `${event.offsetX}:${event.offsetY}`;
								var options = new Object();
								options.headers = new Object();
								options.sendOut = true;		//設定為送出header
								options.receive = true;		//設定為接取header
								options.headers.CHV = "";	//設定要接取的header欄位
								options.headers.CHA = $('#verifyCodeContain img').data('CHA');								
								
								$('#in_verifyCode').val('');
								var strVerify = JSON.stringify(theSSO.MP.captchaVerify)
								
								var promiseVeri = window.theWebServices.authws.VerifyCheckCaptcha(strVerify, options);
								promiseVeri.done(function(rslt) {
									if(rslt.value){
										$('#in_verifyCode').val(rslt.headers['CHV']);
										//畫上勾勾
										$('<div>').addClass('checkmark').css({'top':event.offsetY-15,'left':event.offsetX+$('#verifyCodeContain label').width()+5}).appendTo('#verifyCodeContain');
										$('#verifyCodeContain img').off('click');
									}
								})
								.fail(function(errObj){
									theLogger.log("人機驗證異常："+rslt.errorDetail.string);
								})
							});
							theSSO.MP.captchaVerify['arPoint'] = [];
							$('html').off('mousemove').on('mousemove', function(event,ui){
								if(theSSO.MP.captchaVerify['arPoint'].length < 20)
									theSSO.MP.captchaVerify['arPoint'].push(`${event.clientX}:${event.clientY}`)
								else
									$('html').off('mousemove');
							});
						}
					}
					else{
						theLogger.log("取得驗證圖型失敗:" + rslt.errorDetail.string)
						alert("取得驗證圖型失敗:" + rslt.errorDetail.string + "，請洽系統管理員。");
					}
				})
				.fail(function(errObj){
					alert(errObj);
				});
			}).trigger('click');
		}

		//1141027	Leslie[1140845]	新增密碼欄位顯示功能
		$('[type="password"]:visible').each(function(i,o){
			var $pwdParent = $(o).parent().css('position','relative');	//設定上層定位為相對模弍
			var $pwd = $(o);
			$('<div class="eye showPW"></div>')
			.css('left',`calc(${$pwd.width()}px - 1em)`)
			.on('click',function(e){
				let pw = $pwd.get(0);
				const type = pw.getAttribute('type') === 'password' ? 'text' : 'password';
				pw.setAttribute('type', type);
				
				e.target.classList.toggle("hidePW");
				e.target.classList.toggle("showPW");
			})
			.appendTo($pwdParent);
			
			$(window).resize(function(){
				$pwdParent.find('.eye').css('left',`calc(${$pwd.width()}px - 1em)`);
			})
		})
		
		theLogger.debug('#login page, [pageinit] event handler end.');
    });
	
    //$('#main').live('pageshow', function() {
    $(document).on('pagecontainershow', '#login', function() {
        theLogger.debug('#login page, [pageshow] event handler invoked...');
    });
	
	$(document).on('pagecreate', '#dlgChangePassword', function() {
		// callback function for changePassword dialog's OK button.
		$('#dlgChangePassword a#CPWD_OKBtn').on('click', function() {
			//1080118 Kevin 1080049 修正Client Server Empty Password調整名稱
			//function _callChangePassword(userId, oldPassword, newPassword, finish_callback) {
			//1080214 Kevin 1080179 修正Client Server Empty Password調整名稱
			//function _callChangeUserKey(userId, oldPassword, newPassword, finish_callback) {
			function _callChangeUserKey(userId, oldKey, newKey, finish_callback) {
				//1080818 Kevin 1080049 弱掃不存密碼
				//theLogger.debug('-I- gonna change user\'s password, newPassword=[' + newPassword + '], oldPassword=[' + oldPassword + ']....');
				
				//1071024 Kevin 修正換密碼不支援ASP架構
				//var promise = window.theWebServices.authws.changePassword(userId, oldPassword, newPassword);
				//1080214 Kevin 1080179 修正Client Server Empty Password調整名稱
				//var promise = window.theWebServices.authws.ChangePasswordWithOrgNo(theSSO.MP.exData.changePassword.orgId, userId, oldPassword, newPassword);
				var promise = window.theWebServices.authws.ChangePasswordWithOrgNo(theSSO.MP.exData.changePassword.orgId, userId, oldKey, newKey);
				promise.done(function(rslt) {
					if (rslt.indexOf('ERR-')===-1)
					{
						SAMLart = rslt;
						window.localStorage.Artifact = SAMLart;
						theLogger.log("ChangePassword succeeded. SAMLart=" + SAMLart);
						//1060329 Kevin 紀錄權杖
						theSSO.Artifact = SAMLart;
						
						//1070831	Leslie	配合滲透測試修改，登入後直接把Artifact寫入Cookie
						//1140415	Leslie[1140556]	改用Post方式傳送
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
						
						// 記錄登入成功之機關代碼及帳號
						window.localStorage.latest_login_orgid = theSSO.MP.exData.changePassword.orgId;
						window.localStorage.latest_login_userid = theSSO.MP.exData.changePassword.userId;
						
						// 2012.2.29 - 測cookies [expire funtionality]
						var expire_normal = new Date();
						var expire_short = new Date();
						var nowStr = expire_short.toGMTString();
						
						if (finish_callback) {
							finish_callback(SAMLart);
						}
						else {
						  SSOUtil.loading('hide');
						}
					}
					else {
						SSOUtil.loading('hide');
						var sErr = rslt.substr(4);
                        theLogger.log("設定新密碼時發生錯誤:" + sErr)
						alert("設定新密碼時發生錯誤:" + sErr);
						theSSO.MP.exData.changePassword = null;
						SSOUtil.loading('hide');
					}
				})
				.fail(function(errObj){
					alert(errObj);
					theSSO.MP.exData.changePassword = null;
				});
			}
			
			//1080118 Kevin 1080049 修正Client Server Empty Password調整名稱
			/*
			var oldPassword='', newPassword='', confirmNewPassword='';
			var $dlg = $('#dlgChangePassword');
			oldPassword = $dlg.find('#oldPassword').val();
			newPassword = $dlg.find('#newPassword').val();
			confirmNewPassword = $dlg.find('#confirmNewPassword').val();
			if (oldPassword.length===0 || newPassword.length===0 || confirmNewPassword.length===0) {
				alert('密碼不可為空白!');
				return;
			}
			else if (newPassword===oldPassword) {
				alert('新密碼不可與原密碼相同!');
				return;
			}
			else if (newPassword!==confirmNewPassword) {
				alert('新密碼與確認密碼不符!');
				return;
			}
			
			// #CPWD_OkBtn沒有設定href, 故須自行關閉...
			// $('#dlgChangePassword').dialog('close');
			_callChangePassword(theSSO.MP.exData.changePassword.userId, oldPassword, newPassword, _postLoginProcess);
			*/
			var $dlg = $('#dlgChangePassword');
			var oldVal = $dlg.find('#oldVal').val();
			var newVal = $dlg.find('#newVal').val();
			var confirmNewVal = $dlg.find('#confirmNewVal').val();
			if (oldVal.length===0 || newVal.length===0 || confirmNewVal.length===0) {
				alert('密碼不可為空白!');
				return;
			}
			else if (newVal===oldVal) {
				alert('新密碼不可與原密碼相同!');
				return;
			}
			else if (newVal!==confirmNewVal) {
				alert('新密碼與確認密碼不符!');
				return;
			}
			
			// #CPWD_OkBtn沒有設定href, 故須自行關閉...
			// $('#dlgChangePassword').dialog('close');

			// 2021.6 - 1100333, Eric Peng, callback改為開啟eDoc.html 
			//_callChangeUserKey(theSSO.MP.exData.changePassword.userId, oldVal, newVal, _postLoginProcess);
			_callChangeUserKey(theSSO.MP.exData.changePassword.userId, oldVal, newVal, function(SAMLart, registerIP, userKey) {
                window.localStorage.Artifact = SAMLart;
                // 記錄登入成功之機關代碼及帳號
				//1110307	Leslie[1101521]	[Merge_1080793]一併修正Bug，這裡無需設定(變更密碼時已設定完成)
                // window.localStorage.latest_login_orgid = orgid;
                // window.localStorage.latest_login_userid = userid;
                setTimeout(function() {
                    window.location.href = SSO_CONFIG.EDocPage+'?='+Date.now();
                }, 100);
            });
		});
		
		$('#dlgChangePassword a#CPWD_CancelBtn').on('click', function(){
			theSSO.MP.exData.changePassword = null;
		});
	});
	
	
	$(document).on('pagebeforeshow', '#dlgChangePassword', function() {
		var $dlg = $('#dlgChangePassword');
		
		//1080118 Kevin 1080049 修正Client Server Empty Password
		//$dlg.find('#oldPassword').val('');
		//$dlg.find('#newPassword').val('');
		//$dlg.find('#confirmNewPassword').val('');
		$dlg.find('#oldVal').val('');
		$dlg.find('#newVal').val('');
		$dlg.find('#confirmNewVal').val('');
		
		// 不顯示header bar的關閉button
		$('#dlgChangePassword').find('.ui-header a.ui-btn-icon-notext').css({display:'none'});
	});

	//1141027	Leslie[1140845]	新增密碼欄位顯示功能
	$(document).on('pageshow', '#dlgChangePassword', function(){
		var $dlg = $('#dlgChangePassword');
		//1141027	Leslie[1140845]	新增密碼欄位顯示功能
		$dlg.find('[type="password"]:visible').each(function(i,o){
			var $pwdParent = $(o).parent().css('position','relative');	//設定上層定位為相對模弍
			var $pwd = $(o);
			$('<div class="eye showPW"></div>')
			.css('left',`calc(${$pwd.width()}px - 1em)`)
			.on('click',function(e){
				let pw = $pwd.get(0);
				const type = pw.getAttribute('type') === 'password' ? 'text' : 'password';
				pw.setAttribute('type', type);
				
				e.target.classList.toggle("hidePW");
				e.target.classList.toggle("showPW");
			})
			.appendTo($pwdParent);
			
			$(window).resize(function(){
				$dlg.find('.eye').css('left',`calc(${$pwd.width()}px - 1em)`);
			})
		})		
	})
		
	//1110307	Leslie[1101521]	[Merge_1080793]新增忘記密碼功能
	$(document).on('pagecreate', '#dlgResetPassword', function() {
		$('#dlgResetPassword a#RPWD_OkBtn').click(function() {
			
			function _resetPassword(orgId,userId){
				var promise = window.theWebServices.authws.ForgotPWD(orgId, userId);
				promise.done(function(rslt) {
					if (rslt.value.indexOf('ERR-')===-1)
					{
						//1120815 Kevin 1120693 調整訊息
						//alert('寄送密碼變更通知信成功。');
						alert('寄送密碼變更通知信成功，若無法取得通知信，請聯繫系統管理員設定或改以其他方式登入。');
						SSOUtil.loading('hide');
					}
					else {
						SSOUtil.loading('hide');
						var sErr = rslt.value.substr(4);
                        theLogger.log("寄送密碼變更通知信時發生錯誤:" + sErr)
						alert(sErr);
						SSOUtil.loading('hide');
					}
				})
				.fail(function(errObj){
					alert(errObj);
					theSSO.MP.exData.changePassword = null;
				});
			}
			
			var $dlg = $('#dlgResetPassword');
			var userId = $dlg.find('#resetUserID').val();
			var orgName = $dlg.find('#dlOrgList').val();
			var orgId = _getOrgId(orgName);
			if(userId.length === 0){
				alert("帳號不可為空白");
				return;
			}
			_resetPassword(orgId,userId);
		})
		
		$('#dlgResetPassword a:first').off('click').click(function(ev){
			$.mobile.changePage( window.location.href+'#home')
		});
		
		_initOrgListSpinWheel("dlOrgList", true, 'bottom');
		var lorgid = window.localStorage['latest_login_orgid'];
		var luserid = window.localStorage['latest_login_userid'];
		if (typeof lorgid === 'string' && lorgid.length) {
			// 2012.8.29 - 改用MobiScroll
			var org_name =_getOrgName(lorgid);
			$("#dlOrgList")[0].value = org_name;
		}
		else if (!lorgid || lorgid=="") {
			$("#dlOrgList")[0].value = SSO_CONFIG.getOrgInfo(0).orgName;
		}
		
		if (typeof luserid === 'string' && luserid.length) {
			//1120901 Joe 1120709 弱掃修正Client DOM Stored XSS
			// $('#resetUserID')[0].value = luserid;
			$('#resetUserID')[0].value = HtmlEncode(luserid);
		}
	})
	//1110307	Leslie[1101521]	[Merge_1080793]新增忘記密碼功能	==END==
});


//1120901 Joe 1120709 弱掃修正Client DOM Stored XSS
function HtmlEncode(s) {
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(s));
	return div.innerHTML;
}
	