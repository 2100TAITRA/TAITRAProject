/* jshint -W100 */

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
1100503	1100333		Kevin	Leslie	Merge首頁分割後的效能調校，原單[1090329]，改為非同步處理
1101201	1101174		Leslie	Leslie	修正檢核帳號狀態的異常處理
1110315	1101451		David	Leslie	新增個人專區呼叫函式
1110317 1110217		Kevin	Kevin	新增錯誤處理
1110907 1111021		Kevin   Zen		滲透測試風險修正
1111223	1111178		Leslie	Leslie	修改首頁由背景切換為前景時，所叫用的CheckLoginStatus()改為非同步模式，以解決可能會失敗的問題
1120815 1120693     Kevin   Kevin   移除無用函式
1120901 1120709		Kevin	Leslie	弱掃修正Client DOM Stored XSS
1130226	1120589		Leslie	Leslie	[中榮][1040146]新增初次使用憑證加簽時，可依設定自動執行憑證鏈結
1131101	1130977		Kevin	Leslie	移除MobiScroll
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
				SOAPClient.invoke(wsUrl, wsFuncName, params, async,
                                  function (r)
                                  {
                                    theLogger.log('-I- AuthWS.' + wsFuncName + ' returns:');
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
			/* 2015.6 - 目前已不使用 */
			logonByPassword : function(orgNo, userId, password, options) {
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
            },
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
			logout : function(artifact, options) {
				var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
                if (!wsUrl || wsUrl.length==0) {
                    theLogger.error('-ERR- AuthWS.logout was invoked, but WS\'s url was missing!');
                    throw new Error('AuthWS尚未設定服務網址URL');
                }
                
                var params = new SOAPClientParameters(), res;
                params.add("argArtifact", artifact);
                
				//1091026	Leslie	修正因Chrome升級至80版後關閉視窗於unload事件無法以同步呼叫WS之問題，登出一律改為「非同步」(false -> true)
				//1110817	Leslie[1110787]	配合登出時可能會自動關閉視窗，改成invokeJSON
                //SOAPClient.invoke(wsUrl, "Logout", params, true,
                SOAPClient.invokeJSON(wsUrl, "Logout", params, true,
                                  function(r) {
									//1110817	Leslie[1110787]	配合登出時可能會自動關閉視窗，改成invokeJSON
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
                return res;
			},
			// 由Artifact取得對應登入帳號
			getAccountMappedByArtifact : function(artifact, options) {
				var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
                if (!wsUrl || wsUrl.length==0) {
                    theLogger.error('-ERR- AuthWS.GetAccountMappedByArtifact was invoked, but WS\'s url was missing!');
                    throw new Error('AuthWS尚未設定服務網址URL');
                }
				
				//1111223	Leslie[1111178]	修改支援非同步回傳
				var async = (options && options.async) ? options.async:false;
                
                var params = new SOAPClientParameters(), res = '';
                params.add("argArtifact", artifact);
                
				//1111223	Leslie[1111178]	修改支援非同步回傳
                // SOAPClient.invoke(wsUrl, "GetAccountMappedByArtifact", params, false,
                SOAPClient.invoke(wsUrl, "GetAccountMappedByArtifact", params, async,
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
									
									//1111223	Leslie[1111178]	修改支援非同步回傳
									if(async && options && options.callback && typeof options.callback == 'function')
										options.callback(res);
                                  });
                return res;
			},
			getSpotLightMsg : function(artifact, options){
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
			    
			},
			changeActiveRole : function(artifact, orgNo, unitNo, id, options){
			    var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
			    var params = new SOAPClientParameters(), res;
			    params.add("argArtifact",artifact);
			    params.add("argSourceOrgNo",orgNo);
			    params.add("argSuperiorOU",unitNo);
			    params.add("argRoleNo",id);
			    SOAPClient.invoke(wsUrl, "ChangeActiveRole", params, true,	// 1130809 Raymond 1130313 合併1111007(1100394), 離線版要非同步
                                  function(r) {
                                    theLogger.log(r);
                                    if(typeof r == 'boolean') {
					res = r;
					// 1130809 Raymond 1130313 合併1111007(1100394), 離線版在切換角色後立即重取theUserInfo, 使用者資訊維護才會變成所切換角色
					theWebServices.getUserInfo(theSSO.User.account, localStorage.Artifact, ''); // 2016.7.5 新增登入後直接呼叫公文製作的getUserInfo, 第3參數本是承辦單位ID, 在未開啟公文前沒機會得知, 故傳空白字串
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
				var _dfd = $.Deferred();	// 1130809 Raymond 1130313 合併1111007(1100394), 離線版要用非同步
			    SOAPClient.invoke(wsUrl, "GetActiveRole", params, true,	// 1130809 Raymond 1130313 合併1111007(1100394), 離線版要用非同步
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
											_dfd.resolve(res);	// 1130809 Raymond 1130313 合併1111007(1100394), 離線版要用非同步
										}
									}
									else {
                                        res = {success:false, errMsg:'叫用AuthWS.getActiveRole發生錯誤!'};
                                        throw new Error('叫用AuthWS.getActiveRole發生錯誤!');
                                    }
                                  });
			    return _dfd.promise();	// 1100730 Raymond 1100394 離線版要用非同步
			},
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
            getUserProgramsJSON: function (SAMLart, options)
            {
				var _dfd = $.Deferred();
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
				var wsFuncName = 'GetUserProgramsJSON';
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-ERR- AuthWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
				
				//1100503	Leslie[1100333]	Merge首頁分割後的效能調校，原單[1090329]改為非同步處理
				//var async = false;
				var async = true;
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
            },
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
			
			//1080801 Kevin 1080562 新增不允許同帳號重複登入
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
			//1120815 Kevin 1120693 移除無用函式
			////111032 Leslie[1101537]	[Merge_1070118] 新增機關切換
			//1110907 Zen 1111021 滲透測試風險修正，修改呼叫函式並傳入Artifact做驗證
			UserOrgSwitch: function (orgNo, userId, artifact, options)
			{
				var _dfd = $.Deferred();
				var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
				var wsFuncName = 'UserOrgSwitch';
				if (!wsUrl || wsUrl.length === 0)
				{
					theLogger.error('-ERR- AuthWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
					_dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
					return _dfd.promise();
				}

				var async = false;

				var params = new SOAPClientParameters(), res = '';
				params.add('argDomain', '');
				params.add('argAccount', userId);
				params.add('argOrgNo', orgNo);
				params.add('argArtifact', artifact);

				SOAPClient.invoke(wsUrl, wsFuncName, params, async,
					function (r)
					{
						theLogger.log("-I- AuthWS." + wsFuncName + " returns:" + r);
						if (typeof r == 'string')
						{
							res = r;
						}
						else
						{
							theLogger.warn('-W- 叫用 AuthWS.UserOrgSwitch() 回傳空字串');
						}
					});
				return res;
			},
			//1130226	Leslie[1120589]	[中榮][1040146]新增初次使用憑證加簽時，可依設定自動執行憑證鏈結
			LinkCert: function (certb64, orgNo, account, SAMLart, options){
				var _dfd = $.Deferred();
				var params = new SOAPClientParameters();
				var wsFuncName = 'LinkCert';
				var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('authws');
				if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-ERR- AuthWS.UpdateUserEnvSet was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('AuthWS尚未設定服務網址URL'));
					return _dfd.promise();
				}
				
				params.add('X509Cert'	, certb64);
				params.add('argOrgNo'	, orgNo);
				params.add('argAcc'		, account);
				params.add('argArtifact', SAMLart);
				
				SOAPClient.invokeJSON(wsUrl, wsFuncName, params, true,
					function(rslt){
						theLogger.log('-I- AuthWS.' + wsFuncName + ' returns:');
						theLogger.log(rslt);
						if (typeof rslt === 'object') {
							if(typeof rslt.value == 'string' && !rslt.value.startsWith('ERR-')){
								//鏈結成功
								theSSO.User.Certs.push({
									base64: certb64,
									softCert:false,
									tempCert:false
								});
								_dfd.resolve({success:true});
							}else{
								//鏈結失敗
								_dfd.reject({valid: false, errMsg: '指定的憑證未鏈結，請以IFM900完成個人憑證鏈結。'});
							}
						}
						else {
							_dfd.reject({valid: false, errMsg: '指定的憑證未鏈結，請以IFM900完成個人憑證鏈結。'});
						}
					}
				);
				
				return _dfd.promise();
			},
        };

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
			/*
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
                
				var async = false;
				if (options && (typeof options.async !=='undefined') && (options.async===true)) {
					async = true;
                }
                
                var params = new SOAPClientParameters();
                params.add("argArtifact", artifact);
                
                // SOAPClient.invoke() params:
                //   url, method name, method parameter values,
                //   call mode (async=true, sync=false), callback method
                SOAPClient.invoke(wsUrl, 'GetUserInfoForPad', params, async,
                                  function(r) {
                                    theLogger.log('-I- SAMLWS.getUserInfoForPad returns:');
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
			/* 2021.5.3 - 1100333 Eric, merge: 2020.5.19 - 1090329 Eric, get UserInfo by JSON string
               取得行動平台簽核的使用者Profile(此函式回傳JSON字串)
			 */
			   getUserInfoForPadByJSON: function (artifact, options) {
	            var _dfd = $.Deferred();
				
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('samlws');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-E- SAMLWS.getUserInfoForPad was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('SAMLWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
                
				var async = false;
				if (options && (typeof options.async !=='undefined') && (options.async===true)) {
					async = true;
                }
                
                var params = new SOAPClientParameters();
                params.add("argArtifact", artifact);

                var wsFuncName = 'GetUserInfoForPadbyJSON';
				SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,
					function (rslt) {
						if (typeof rslt === 'object' && typeof rslt.value=='string') {
							if (rslt.value.length) {
								//theLogger.log('-I- SAMLWS.' + wsFuncName + ' returns:');
								//theLogger.log(rslt.value);
								theLogger.debug(SSOUtil.dev_getCurrentTimeStr() + ' -tm- GetUserInfo JSON string to object BEGIN...');
								let tmSecBeginA = Date.now();

								var rsltObj = JSON.parse(rslt.value);
								SSOUtil.dev_logTimeElapse('GetUserInfo JSON string to object', tmSecBeginA);

								if (typeof rsltObj=='object' && rsltObj!==null && typeof rsltObj.AD_Account=='object') {
									// 1130809 Raymond 1130313 合併1111007(1100394), 新增isTemp屬性, 若離線版GetUserInfoForPadbyJSON是尚未連線登入過的帳號, 回傳的d.AD_Account會是假的、清空的, 需要使用者進一步修正確認
									if("isTemp" in rslt)
										_dfd.resolve({success:true, userInfo: rsltObj, isTemp: rslt.isTemp});
									else
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
	        },
		};
		
		// 2013.3.4 - 實作 OD_LIBWS proxy
		theWebServices.OD_LIBWS = {
			/* 取得是否可單位發文設定
			 */
            unitCanIssue : function(artifact, orgNo, inchargeOUId, options) {
				var _dfd = $.Deferred();
				
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('odlibws');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-E- OD_LIBWS.getUserInfo was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('OD_LIBWS尚未設定服務網址URL'));
					return _dfd.promise();
                }
                
				var async = false;
				if (options && (typeof options.async !=='undefined') && (options.async===true)) {
					async = true;
                }
                
                var params = new SOAPClientParameters();
                params.add('argArtifact', artifact);
				params.add('argOrgNo', orgNo);
				params.add('argInchargeOu', inchargeOUId);
                
                // SOAPClient.invoke() params:
                //   url, method name, method parameter values,
                //   call mode (async=true, sync=false), callback method
                SOAPClient.invoke(wsUrl, 'UnitCanIssue', params, async,
                                  function(r) {
                                    theLogger.log('-I- OD_LIB_WS.UnitCanIssue returns:');
                                    theLogger.log(r);
                                    if (typeof r !== 'object') {
                                        _dfd.reject({errMsg:'OD_LIB.UnitCanIssue回傳之內容異常!'});
                                    }
									else {
										_dfd.resolve(r);
									}
                                  });
                return _dfd.promise();
            },
            /* 取得右鍵選單程式的實際UrlWithParam字串
			 */
            getSSOContextMenuURL : function(artifact, msgId, docNo, progId, extraData, options) {
				var _dfd = $.Deferred();
				var funcName = 'GetSSOContextMenuURL';
                var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('odlibws');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-E- OD_LIBWS.' + funcName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('OD_LIBWS尚未設定服務網址URL'));
					return _dfd.promise();
				}
				
                // 2019.12.3 - 1080339 Eric, [jQ3] change default as async
				var async = true;
				if (options && (typeof options.async ==='boolean') && (options.async===false)) {
					async = false;
                }
                
                var params = new SOAPClientParameters();
                params.add('argArtifact', artifact);
				params.add('argMsgId', msgId);
				params.add('argDocNo', docNo);
                params.add('argProgId', progId);
                params.add('argExtraData', extraData);
                
                // SOAPClient.invoke() params:
                //   url, method name, method parameter values,
                //   call mode (async=true, sync=false), callback method
                SOAPClient.invoke(wsUrl, funcName, params, async,
                    function(r) {
                      theLogger.log('-I- OD_LIB_WS.' + funcName +' returns:');
                      theLogger.log(r);
                      if (typeof r !== 'object') {
                          _dfd.reject({success:false, errMsg:'OD_LIB_WS.' + funcName + '回傳之內容異常!'});
                      }
                      else {
                          if (typeof r.m_bSuccess=='boolean' && r.m_bSuccess===true &&
                              typeof r.m_strRetStr=='string' && r.m_strRetStr.length) {
                              _dfd.resolve({success:true, retStr:r.m_strRetStr});
                          }
                          else {
                              var errMsg='';
                              if (typeof r.m_strErrMsg == 'string' && r.m_strErrMsg.length) {
                                  errMsg = '叫用OdlibWS.' + funcName + '回傳失敗, ErrMsg=' + r.m_strErrMsg;
                              }
                              else {
                                  errMsg = '叫用OdlibWS.' + funcName + '回傳失敗, 無錯誤說明';
                              }
                              _dfd.reject({success:false, 'errMsg':errMsg});
                          }
                      }
                    });
                return _dfd.promise();
            }
		}

        //1051005 Kevin 新增TBWS以取得公布欄資訊
        theWebServices.TBWS = {
            GetUserBulletin: function (artifact, argCount, options)
            {
                var EnvUrl = window.location.protocol + '//' + theSSO.User.EnvSettings.get("WS_TB_SERVER");
                EnvUrl += '/TB_A/TBLIB/TBWS.asmx';

                var _dfd = $.Deferred();
                //var wsUrl = (options && options.url) ? options.url : SSO_CONFIG.getWSUrl('tbws');
                var wsUrl = (options && options.url) ? options.url : EnvUrl;
                var wsFuncName = 'GetUserBulletin';

                if (!wsUrl || wsUrl.length === 0) {
                    theLogger.error('-ERR- TBWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('TBWS尚未設定服務網址URL'));
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
                        theLogger.log('-I- TBWS.' + wsFuncName + ' returns:');
                        theLogger.log(r);
                        if (typeof r !== 'object') {
                            _dfd.reject({ success: false, errMsg: 'TBWS.' + wsFuncName + '回傳之內容異常!' });
                        }
                        else {
                            if (typeof r.m_bSuccess == 'boolean' && r.m_bSuccess === true) {
                                _dfd.resolve({ success: true, BulletinInfo: r.Rtn, nTotal: r.nTotal });
                            }
                            else {
                                var sErrMsg = '';
                                if (typeof r.m_strErrMsg == 'string' && r.m_strErrMsg.length) {
                                    sErrMsg = '叫用TBWS.' + wsFuncName + '回傳失敗, ErrMsg=' + r.m_strErrMsg;
                                }
                                else {
                                    sErrMsg = '叫用TBWS.' + wsFuncName + '回傳失敗, 無錯誤說明';
                                }
                                _dfd.reject({ success: false, errMsg: sErrMsg });
                            }
                        }
                    });

                return _dfd.promise();
            },
        };
		//1110315	Leslie[1101451]	新增個人專區呼叫函式
		theWebServices.PAWS = {
			SearchPersonalData: function (artifact, options){
				var _dfd = $.Deferred();
				
				var paWSUrl = 'PAWS_URL' in theSSO.User.SystemSets?theSSO.User.SystemSets["PAWS_URL"]:"";
				var wsUrl = (options && options.url) ? options.url : paWSUrl;
				if (!wsUrl || wsUrl.length === 0) {
                    theLogger.error('-ERR- PAWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject(new Error('PAWS尚未設定服務網址URL'));
                    return _dfd.promise();
                }
				var wsFuncName = 'SearchPersonalData';
				var async = true;
				
				var params = new SOAPClientParameters();
                params.add('argArtifact', artifact);
				
				SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,
                    function (rslt)
                    {
                        theLogger.log('-I- PAWS.' + wsFuncName + ' returns:');
                        theLogger.log(rslt);
						if (rslt.error) {
							if(typeof rslt.responseText=='string' && rslt.responseText.length)
								_dfd.reject({ success: false, errMsg: '叫用PAWS.' + wsFuncName + ' 時發生錯誤! ErrMsg=' + rslt.responseText});
							else
								_dfd.reject({ success: false, errMsg: '叫用PAWS.' + wsFuncName + ' 時發生錯誤!' });
						}
						else if(typeof rslt.value !== 'object'){
							_dfd.reject({ success: false, errMsg: '叫用PAWS.' + wsFuncName + '回傳之內容異常!' });
						}
						else{
							if(rslt.value.bSuccess){
								_dfd.resolve(rslt.value.PersonalDocDatas);
							}
							else{
								_dfd.reject({ success: false, errMsg: rslt.value.ErrMsg });
							}
						}
                    });

                return _dfd.promise();
			},
		}
	}

	/*
	 * 2012.2.17
	 */
	theSSO.MP.login = function login(org_id, user_id, password, finish_callback) {
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
			var promise = window.theWebServices.authws.logonByPasswordWithMachineType(org_id, user_id, password, 1);
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
					/* 1130809 Raymond 1130313 合併1111007(1100394), 離線版不要
					//1070831	Leslie	配合滲透測試修改，登入後直接把Artifact寫入Cookie
					//document.cookie = 'SAMLart=' + escape(SAMLart) + ';path=/';
					$.ajax({
						type:"POST",
						url:SSO_CONFIG.ServerHost+"/iiws/registCookie.ashx?ck="+SAMLart,
						//data:'{"ck":"'+SAMLart+'"}',	//保留功能
						contentType:"application/json; charset=utf-8",
						// 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
						//dataType:"json",
						dataType:"text",
					});*/
					
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
							
							/* 1130809 Raymond 1130313 合併1111007(1100394), 離線版不要
							//1070831	Leslie	配合滲透測試修改，登入後直接把Artifact寫入Cookie
							$.ajax({
								type:"POST",
								url:SSO_CONFIG.ServerHost+"/iiws/registCookie.ashx?ck="+SAMLart,
								//data:'{"ck":"'+SAMLart+'"}',	//保留功能
								contentType:"application/json; charset=utf-8",
								// 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
								//dataType:"json"
								dataType:"text"
								
							});*/
							
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
			
		var UsingArtifact = window.theWebServices.authws.GetArtifactByIP('');
		if(UsingArtifact != '')
		{
			var UsingAcc = window.theWebServices.authws.getAccountMappedByArtifact(UsingArtifact);
			
			if(confirm('此電腦已有[' + UsingAcc + ']連線紀錄，若繼續則前次登入未儲存資訊將遺失，是否繼續？'))
			{
				theLogger.log('此電腦已有[' + UsingAcc + ']連線紀錄，使用者選擇覆蓋。');
				return false;
			}
			else
			{
				theLogger.log('此電腦已有[' + UsingAcc + ']連線紀錄，使用者選擇不繼續連線。');
				return true;
			}
		}
		return false;
	};
	
	//1060329 Kevin 檢核登入狀態
	//1091231 Kevin 1090722 新增重取待辦設定
	//theSSO.MP.CheckLoginStatus = function CheckLoginStatus() {
	//1111223	Leslie[1111178]	修改首頁由背景切換為前景時，所叫用的CheckLoginStatus()改為非同步模式，以解決可能會失敗的問題
	// theSSO.MP.CheckLoginStatus = function CheckLoginStatus(strActive) {
	theSSO.MP.CheckLoginStatus = function CheckLoginStatus(strActive,async = false) {
		//1111223	Leslie[1111178]	整段重組
		/*
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
		//1100126 Kevin 1090722 因應Client端未判定斷線，取消判斷。
		//if(!theSSO.SRSetHello)
		{
			//1110317 Kevin 1110217 新增錯誤處理
			 try 
			 {
				//1091231 Kevin 1090722 新增重取待辦設定
				if(strActive)
					theSSO.SRLastError = strActive + ' ' + theSSO.SRLastError;
				
				theLogger.log('SignalR OpenDoc sHello' + theSSO.Artifact + " " + theSSO.User.account + ';' + theSSO.User.orgid);
				//1110317 Kevin 1110217 新增錯誤處理
				//theSSO.chat.server.sHello(theSSO.Artifact, theSSO.User.account + ';' + theSSO.User.orgid, $.connection.hub.transport.name, theSSO.SRLastError);
				theSSO.chat.server.sHello(theSSO.Artifact, theSSO.User.account + ';' + theSSO.User.orgid, $.connection.hub.transport.name, '連線檢核 ' + theSSO.SRLastError);
			}
			catch(e) {
                theLogger.error('SignalR connect fail.' + e.message);
            }
		}
		return true;*/
		/* 1130809 Raymond 1130313 合併1111007(1100394), 離線版不要檢核登入狀態
		function handleCallback(UsingAcc)	{
			if(UsingAcc == '')
			{
				alert('你已被登出公文系統。');
				theSSO.logoned = false;
				theSSO.logOutNow = true;
				$('#btn_logout').trigger('click');
				return false;
			}
			
			//檢核帳號狀態的異常處理
			if(UsingAcc.indexOf('ERR-') == 0){
				alert('驗證時發生異常，異常訊息：'+UsingAcc.replace('ERR-')+'，請稍候再試。');
				return false;
			}
			
			//額外確認SR註冊狀態
			theLogger.log('SignalR ' + theSSO.SignalR_State);
			 try 
			 {
				//重取待辦設定
				if(strActive)
					theSSO.SRLastError = strActive + ' ' + theSSO.SRLastError;
				
				theLogger.log('SignalR OpenDoc sHello' + theSSO.Artifact + " " + theSSO.User.account + ';' + theSSO.User.orgid);
				//錯誤處理
				theSSO.chat.server.sHello(theSSO.Artifact, theSSO.User.account + ';' + theSSO.User.orgid, $.connection.hub.transport.name, '連線檢核 ' + theSSO.SRLastError);
			}
			catch(e) {
				theLogger.error('SignalR connect fail.' + e.message);
			}
			return true;
		}
		
		var UsingAcc = window.theWebServices.authws.getAccountMappedByArtifact(theSSO.Artifact,{async: async, callback: handleCallback});
		if(!async)
			return handleCallback(UsingAcc);*/
		return true;
	};
	//1111223	Leslie[1111178]	修改首頁由背景切換為前景時，所叫用的CheckLoginStatus()改為非同步模式，以解決可能會失敗的問題	==END==

})(jQuery);

/*
 * jQuery's ready() call back function
 */
// 2019.10.28 - 1080339 Eric, jQuery 3 upgrad
//$(document).ready(function() {
$(function() {
	
	// 1120901 Leslie  1120709 弱掃修正Client DOM Stored XSS
	function HtmlEncode(s) {
		var div = document.createElement('div');
		div.appendChild(document.createTextNode(s));
		return div.innerHTML;
	}
	
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
			// 1120901 Leslie  1120709 弱掃修正Client DOM Stored XSS
			// $('#in_userid')[0].value = luserid;
			$('#in_userid')[0].value = HtmlEncode(luserid);
		}
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
		
		var orgCnt = SSO_CONFIG.getOrgCount();
		for(var i=0; i<orgCnt; i++) {
			var orgInfo = SSO_CONFIG.getOrgInfo(i);
			obj[title][i] = orgInfo.orgName;
				
				// ASP架構才可以指定登入機關...
				if (SSO_CONFIG.IISystemMode==='Normal') {
					break;
				}
		};
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
            window.tmBeginLogin = Date.now();
		}
		
		// 2012.8.29 - 改用MobiScroll
		var orgid = _getOrgId('');
		var userid = $('#in_userid')[0].value;
		var userKey = $('#in_password')[0].value;
		
		//1050719 Kevin 新增憑證登入
		if($('#radio-choice-loginbyAccount')[0].checked) {
			if (typeof orgid === 'string' && typeof userid === 'string' && typeof userKey === 'string') {
				if (orgid.length>0 && userid.length>0 && userKey.length>0) {
					
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
						
						// 2021.4.19 - 1100333 Eric
						//setTimeout(_postLoginProcess(SAMLart), 100);
						setTimeout(function() {
                            window.location.href = SSO_CONFIG.EDocPage;
                        }, 100);	
					}
					else {
						window.scrollTo(0, 0);
						// 2021.4.19 - 1100333 Eric
						theSSO.MP.login(orgid, userid, userKey, function(SAMLart, registerIP, userKey) {
                            window.localStorage.Artifact = SAMLart;
                            setTimeout(function() {
                                window.location.href = SSO_CONFIG.EDocPage;
                            }, 100);
                        });
					}
				}
				else {
					alert("帳號或密碼不可為空白!");
				}
			}
			else {
				alert("帳號或密碼不可為空白!");
			}
		}
		else
		{
			if (typeof orgid === 'string' && typeof password === 'string' && orgid.length && userKey.length) {
				//1060329 Kevin 重複登入處理
				if(theSSO.MP.CheckUsing())
					return;
				
				window.scrollTo(0, 0);

				SSOUtil.loading('show', {text:'正在登入系統...', textVisible:true, theme:'c'}); // 2017.10.12 - 1060819
				// 2021.4.19 - 1100333 Eric, for Login.html
				theSSO.MP.loginByCert(orgid, userKey, function(SAMLart, registerIP, userKey) {
					window.localStorage.Artifact = SAMLart;
                    // 記錄登入成功之機關代碼及帳號
                    window.localStorage.latest_login_orgid = orgid;
					window.localStorage.latest_login_userid = userid;

                    setTimeout(function() {
						let _rslt = SSOUtil.processKeyword(userKey); // {success:true, key:xxxx}
						sessionStorage.igotu = _rslt.key;
                        window.location.href = SSO_CONFIG.EDocPage;
                    }, 100);
				});
			}
			else {
				alert("密碼不可為空白!");
			}
		}
    });

	$(document).on('pagecreate', '#login', function() {
        theLogger.debug('#login page, [pagecreate] event handler invoked...');
		_initOrgListSpinWheel("orgid_input", true, 'bottom');
		theLogger.debug('#login page, [pagecreate] event handler end.');
    });
    
    $(document).on('pageinit', '#login', function() {
        theLogger.debug('#login page, [pageinit] event handler invoked...');
		
        $("div#login input[name='radio-choice-login-type']").on("change", function(event, ui) {
            var checkId = $(event.target).attr('id'); //is(':checked');
            if (checkId.search('loginbyCert')>0) {
                $('div#login div.userid_wrapper').hide();
                $('div#login div.password_wrapper label[for="password"]').text('金鑰密碼：');
            }
            else if (checkId.search('loginbyAccount')>0) {
                $('div.userid_wrapper').show();
                $('div#login div.password_wrapper label[for="password"]').text('密　碼：');   
            }
        });
		theLogger.debug('#login page, [pageinit] event handler end.');
    });
	
    //$('#main').live('pageshow', function() {
    $(document).on('pagecontainershow', '#login', function() {
        theLogger.debug('#login page, [pageshow] event handler invoked...');
    });
	
	$(document).on('pagecreate', '#dlgChangePassword', function() {
		// callback function for changePassword dialog's OK button.
		$('#dlgChangePassword a#CPWD_OKBtn').on('click', function(){
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
						$.ajax({
							type:"POST",
							url:SSO_CONFIG.ServerHost+"/iiws/registCookie.ashx?ck="+SAMLart,
							//data:'{"ck":"'+SAMLart+'"}',	//保留功能
							contentType:"application/json; charset=utf-8",
							// 2019.8.27 - 1080339 Eric, jQuery 3.x upgrade
							//dataType:"json"
							dataType:"text"
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
			
			// 2021.4.19 - 1100333, Eric Peng, callback改為開啟eDoc.html
			// #CPWD_OkBtn沒有設定href, 故須自行關閉...
			// $('#dlgChangePassword').dialog('close');
			_callChangeUserKey(theSSO.MP.exData.changePassword.userId, oldVal, newVal, function(SAMLart, registerIP, pincode) {
				window.localStorage.Artifact = SAMLart;
                // 記錄登入成功之機關代碼及帳號
                window.localStorage.latest_login_orgid = orgid;
                window.localStorage.latest_login_userid = userid;
                setTimeout(function() {
                    window.location.href = SSO_CONFIG.EDocPage;
                }, 100);
			});
		});
		
		$('#dlgChangePassword a#CPWD_CancelBtn').on('click', function(SAMLart, registerIP, pincode){
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
});