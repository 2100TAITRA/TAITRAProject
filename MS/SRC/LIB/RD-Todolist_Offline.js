/* jshint -W100 */

/*
DATE	MGRNO		SA		PG		Desc
1050819	   		    Eric	Eric	新增ODMSSP.MenuSubmit, GetDocumentInfo2叫用函式
									通知項目補件狀況欄位修正.
1050819	   		    Eric	Eric	非'待處理'及'會核中'公文夾待辦項目, 燈號一律為白燈
								    判斷燈號時, 取環境變數"II_ALARM_BY_MSGOUTLMT"設定值
								    顯示[補件狀況]欄位時, 機密等及為[密]以上公文, 文號顯示為紅色.
1050822	   		    Eric	Eric	updateToDoListHtmlItem函式, 判斷 MP icon list 有內容時時才會update icon list.
1050824 			Eric    Eric    IE11 reload後圖示清單顯示異常問題
								    啟用隱藏燈號欄位(SSO_ENABLE_PERFORMANCE="Y")時, 通知項目(SignType="W")的欄位內容與title對不起來.
1050825 			Eric    Eric    新增ODWWKF操作函式(@MPDocObj)
1050827 			Eric    Eric    更新MP項目修改, 支援未有supertable, 刪除MPDocObject內容[@builder._updateToDoListHtmlItem]
1050829 			Eric    Eric    修正補件狀況無法排序問題.
1050831 			Eric    Eric    調整表格欄位大小
									新增待辦項目時, 重設文件夾清單.
1050905				Eric	Eric	提供公文製作會稿單位匯入為預排流程會辦(順/分會)項目函式.(ODWWKF)
1050906				Eric	Eric	代理公文夾文字顏色依MPUiSetting.xml指定顯示
1050908	NO.218		Eric	Eric	修正會辦流程插入確認子視窗選順會, 卻在預排流程插入分會流程問題
1050908 NO.174		Eric    Eric    紙本創稿, 環境變數OD_NEED_P_RECORD值為"Y"或"P"才須詢問紙本簽核原因.
1051005				Kevin	Kevin	新增登入通知訊息
1051006				Eric	David	修正代理人創稿取代理人帳號資訊錯字問題
1051219	1051122		David	David	速別代碼4，MP速別圖示同普通圖示
1060425 1060194     Kevin   Kevin	修正燈號數量不正確問題
1060502      		Eric	Eric    iScroll升級至v5.2.0
1060517      		Eric	Eric    移除冗餘code
1060811	n/a			Eric	Eric    修正燈號欄位排序異常bug
1060920 1060802		Eric 	Eric 	條列模式顯示, 新進待辦訊息, 該待辦不在目前的公文夾清單內, 切換到圖示清單內容顯示異常問題.
1061012 1060894		Eric	Eric	右鍵選單功能不叫用ODMSSP.SetMsgStatus
1061024 1060967		Eric 	Eric 	視窗縮放後部份欄位寬度不足問題修改.
1061106 1060748		David	Eric	預排流程設定子視窗流程項目異動後關閉,儲存公文WWKF資料時發生錯誤問題修正.
1070115 1061276		David 	Eric	傳送/儲存公文提示錯誤訊息內容改善.
1080516	1080371		David	David	計算未閱讀數量時，草稿一律視為已閱讀(同MP待辦已閱讀圖示判斷邏輯)
1080820 1080701     David   Eric    創稿重複文號問題檢核修改.
1080927 1080339     Kevin   Eric    jQuery 3.0 upgrade. ($.type => SSOUtil.typeOf)
1081118	1080997		David	David	新增未閱讀數量排除資料夾功能
1090601	1090345		David	David	已辦畢資料夾需依照公文狀態顯示燈號，調整燈號白燈判斷邏輯
1091109 1090688     Eric    Eric    解決登入時無待辦, 未產生supertable, 造成後續無法正確刪除待辦事項問題!
1110309	1101394		Leslie	Leslie	增修共通的MP圖示ToolTip功能
1110318	1101388		David	David	考試院紙本簽核不需分會，顯示詢問插入預排流程時不需詢問分會
1110323	1101416		David	David	如TODO_LIST有註記需變更文號顏色時，調整畫面文號顏色
1110419	1110064		Leslie	Leslie	新增信保客製化顯示欄位「收創文日期」
1110430	1101388		David	David	自動新增預排流程時，依簽核類型判斷傳送角色
1110614	1110281		David	David	通知待辦新增依ODWMSG.IC_OU_NAME、IC_USER_NAME顯示畫面承辦單位、承辦人欄位資料
1110624	1110268		David	David	符合傳送時需檢核可發文稿件附件格式的資料夾右鍵選單排除對應的異動別
1110913	1110652		Leslie	Leslie	新增更新待辦時，主動更新首頁統計件數
1110926	1110889		Leslie	Leslie	新增客製化欄位設定功能
1111011	1110865		Leslie	Leslie	配合新增的簽閱附件，新增配套邏輯
1111124	1111127		Leslie	Leslie	修改MP清單圖示顯示方式，並支援依客製化設定改為文字圖示
1111122	1111287		Kevin	Kevin	考試院新增顯示流程欄位(參考2017.6.22成大流程)
1111223	1111400		David	Leslie	登入系統時，如有待補簽的公文，需顯示提示訊息
1120217	1110881		David	Leslie	銓敘部-序14，新增支援紙本草稿轉正式公文
1120322	1110881		David	David	(銓敘部彙整表序162、現場序79)線上轉紙本後，支援轉為正式公文功能
1120502	1120007		Leslie	Leslie	(Merge)[屏東]調整公文夾顯示方式為二階層顯示，供共通版可依設定啟用
1120503	-------		David	David	(銓敘部問題彙整表序278)紙本草稿轉正式公文支援代理人處理
1120706 -------     Eric    Eric    (各機關問題彙整表 序97)開啟背景傳送, 第一筆公文傳送時會跳出undefined訊息且未關閉公文問題修正.
1120724	1120284		David	David	會稿單位加入預排流程功能，支援後會流程
1120927	1111383		Leslie	Leslie	客委會增加客製化功能：燈號統計排除重覆公文
1121024	-------		David	David	插入預排流程時，內會類型RADIO_SELECTED_1應設定為2
1130809	1130313		Raymond	Raymond	新增離線版RD-Todolist_Offline.js, 合併1111007(1100394)並修改創稿不檢查重複公文及更新統計件數
1140723	1141011		Kevin	Leslie	弱掃修正[Client DOM Stored XSS]，註解開發測試用程式碼
*/

/*
docObject@_docList: 
[table使用欄位] -> speed, ['light'(outLMT,alarmLMT, alarmTime)], secret, signType, ['opened'(signTime)], dueDate, docNo, ICUserName, fromOUName, subject, txName, toUserName, newTime
[其它]
  msgId, ICOUName, 
  outLMT, alarmLMT, alarmTime, // 燈號相關
  doc.docState, folder, subfolder,
  signTime -> 若有值則為已閱讀(目前流程點開啟公文時間)
*/

(function($){
	// 2013.3.4 - 實作 AuthWs proxy
	if (!!theWebServices) {
		// 實作 ODMSSP WebService 叫用物件
	    theWebServices.odmssp = {
	        /* 取得待辦事項清單
			 */
	        getToDoList: function (artifact, options)
	        {
	            if (typeof options === 'undefined') {
	                options = null;
	            }

	            var _dfd = $.Deferred();
	            var wsFuncName = 'GetToDoList';
	            var wsUrl = (options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                _dfd.reject(new Error('ODMSSP WS尚未設定服務網址URL'));
	                return _dfd.promise();
	            }

	            var async = false;
	            if (options && (typeof options.async !== 'undefined') && (options.async === true)) {
	                async = true;
	            }
	            var params = new SOAPClientParameters();
	            params.add('argArtifact', artifact);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, async,
                                  function (rslt)
                                  {
                                      theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:');
                                      theLogger.log(rslt);
                                      if (typeof rslt === 'object') {
                                          _dfd.resolve(rslt);
                                      }
                                      else {
                                          _dfd.reject(new Error('叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!'));
                                      }
                                  });
	            return _dfd.promise();
	        },
			/* 取得待辦事項清單(回傳JSON)
			 */
	        getToDoListByJSON: function (artifact, sort, options) {
	            if (typeof options === 'undefined') {
	                options = null;
	            }
				
				if (typeof sort!=='string' || sort.length===0)
					sort = 'DOC_NO-0'; // 預設以文號排序

	            var _dfd = $.Deferred();
	            var wsFuncName = 'GetTodoListJSON';
	            var wsUrl = (options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                _dfd.reject(new Error('ODMSSP WS尚未設定服務網址URL'));
	                return _dfd.promise();
	            }

	            var async = false;
	            if (options && (typeof options.async !== 'undefined') && (options.async === true)) {
	                async = true;
	            }
	            var params = new SOAPClientParameters();
	            params.add('argArtifact', artifact);
				params.add('argSort', sort);

				SOAPClient.invokeJSON(wsUrl, wsFuncName, params, async,
                                function (rslt) {
									if (typeof rslt === 'object' && typeof rslt.value=='object') {
										if (rslt.value.m_bSuccess===true && typeof rslt.value.m_strRetStr=='string') {
											//theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:');
											//theLogger.log(rslt.value.m_strRetStr);
											var rsltObj = JSON.parse(rslt.value.m_strRetStr);
											
											//1111223	Leslie[1111400]	登入系統時，如有待補簽的公文，需顯示提示訊息
											var strAlterWaitResign = '';
											if('AlertWaitResign' in rslt.value && typeof rslt.value.AlertWaitResign == 'string')
												strAlterWaitResign = rslt.value.AlertWaitResign;
											
											if (typeof rsltObj=='object' && rsltObj!==null && typeof rsltObj.ToDoList=='object') {
												//1111223	Leslie[1111400]	登入系統時，如有待補簽的公文，需顯示提示訊息
												// _dfd.resolve({success:true, todolist: rsltObj.ToDoList});
												_dfd.resolve({success:true, todolist: rsltObj.ToDoList, AlertWaitResign: strAlterWaitResign});
											}
											else {
												_dfd.reject(new Error('叫用ODMSSP.' + wsFuncName + '時發生錯誤! ErrMsg=回傳之JSON字串轉換為物件作業失敗!'));
											}
										}
										else {
											if (typeof rslt.value.m_strErrMsg=='string' &&  rslt.value.m_strErrMsg.length) {
												_dfd.reject(new Error('叫用ODMSSP.' + wsFuncName + '時發生錯誤! ErrMsg=' + rslt.value.m_strErrMsg));
											}
											else {
												_dfd.reject(new Error('叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!'));
											}
										}                                          
									}
									else {
										if (rslt.error && typeof rslt.responseText=='string' && rslt.responseText.length) {
											_dfd.reject(new Error('叫用ODMSSP.' + wsFuncName + ' 時發生錯誤! ErrMsg=' + rslt.responseText));
										}
										else {
											_dfd.reject(new Error('叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!'));
										}
									}
                                });
	            return _dfd.promise();
	        },
	        // 取得公文的辦理流程明細
	        getDocToDoList: function (artifact, docNo, options)
	        {
	            //var _dfd = $.Deferred();
	            var wsFuncName = 'GetDocTodoList';

				// 2021.5 - 1100093 merge: 2020.3.4 - 1081168 Eric, support async invoke
				let _dfd = null;
				let _async = false;
				if (typeof options!=='undefined' && (typeof options.async !== 'undefined') && options.async===true) {
					_async = true;
					_dfd = $.Deferred();
				}

	            var wsUrl = (options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                if (_dfd) {
						_dfd.reject({success:false, errMsg:'ODMSSP WS尚未設定服務網址URL'});
						return _dfd.promise();
					}
					else {
						throw new Error('ODMSSP WS尚未設定服務網址URL');
					}
	            }

	            var params = new SOAPClientParameters(), res;
	            params.add('argArtifact', artifact);
	            params.add('argDocNo', docNo);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, _async, function (rslt) {
					theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:');
					theLogger.log(rslt);
					if (typeof rslt === 'object') {
						res = rslt;
						if (_dfd) {
							_dfd.resolve(res);
						}
					}
					else {
						if (_dfd) {
							_dfd.reject({success:false, errMsg:'叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!'});
						}
						else {
							throw new Error('叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!');
						}
					}
				});

				if (_async) {
					return _dfd.promise();
				}
				else {
					return res;
				}
	        },
			// 傳送公文前封裝公文最新內容
			// ToDo: 2019/7 - Eric Peng, 確認是否已移至WebFileIO? 應移除?
			//   ODMSSP有UpdateEnvelope/SignEnvelope函式!
			//   WebFileIO有UpdateEnvelope/UpdateDraftEnvelope, SignEnvelope, SignDraftEnvelope
	        __updateEnvelope: function (artifact, docNo, msgId, workFilename, flags, orgNo, pincode, options)
	        {
	            var _dfd = $.Deferred();

	            var wsFuncName = 'UpdateEnvelope';
	            var wsUrl = (options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                _dfd.reject({ success: false, errMsg: 'ODMSSP WS尚未設定服務網址URL' });
	                return _dfd.promise();
	            }

	            var async = false;
	            if (options && (typeof options.async !== 'undefined') && (options.async === true)) {
	                async = true;
	            }

	            var params = new SOAPClientParameters(), res;
	            params.add('argArtifact', artifact);
	            params.add('argDocNo', docNo);
	            params.add('argMsgId', msgId);
	            params.add('argWorkFilename', workFilename);
	            params.add('argFlags', flags);
	            params.add('argOrgNo', orgNo);
	            params.add('argPincode', pincode);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, async,
                                  function (rslt)
                                  {
                                      theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:');
                                      theLogger.log(rslt);
                                      if (typeof rslt === 'object') {
                                          res = {};
                                          if (rslt.m_bSuccess === true) {
                                              res.success = true;
                                              res.toBeSigned = rslt.m_strRetStr;
                                              res.errCode = res.errMsg = '';
                                          }
                                          else {
                                              res.success = false;
                                              res.errCode = rslt.m_ErrCode;
                                              res.errMsg = rslt.m_strErrMsg;
                                              res.toBeSigned = '';
                                          }
                                          _dfd.resolve(res);
                                      }
                                      else {
                                          _dfd.reject({ success: false, errCode: -1000, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!(內部錯誤)' });
                                      }
                                  });
	            /*
				 * res 欄位:
				 * success : boolean, true / false
				 * toBeSigned : 作業成功回傳的待簽核資料, Bese64編碼過的字串.
				 * errCode : 發生錯誤時的錯誤代碼.
				 * errMsg : 錯誤說明.
				 */
	            return _dfd.promise();
	        },
			// 傳送公文前封裝公文最新內容的數位簽章
			// ToDo: 2019/7 - Eric Peng, 確認是否已移至WebFileIO? 應移除?
			//   ODMSSP有UpdateEnvelope/SignEnvelope函式!
			//   WebFileIO有UpdateEnvelope/UpdateDraftEnvelope, SignEnvelope, SignDraftEnvelope
	        __signEnvelope: function (artifact, docNo, msgId, signValue, signCert, orgNo, options)
	        {
	            var _dfd = $.Deferred();
	            var wsFuncName = 'SignEnvelope';
	            var wsUrl = (options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                _dfd.reject({ success: false, errMsg: 'ODMSSP WS尚未設定服務網址URL' });
	                return _dfd.promise();
	            }

	            if (artifact.length === 0 || docNo.length === 0 || msgId.length === 0 ||
					signValue.length === 0 || signCert.length === 0 || orgNo.length === 0) {
	                _dfd.reject({ success: false, errMsg: '叫用ODMSSP.' + wsFuncName + ', 提供無效的參數值' });
	                return _dfd.promise();
	            }

	            var params = new SOAPClientParameters(), res;
	            params.add('argArtifact', artifact);
	            params.add('argDocNo', docNo);
	            params.add('argMsgId', msgId);
	            params.add('argSignValue', signValue);
	            params.add('argSignCert', signCert);
	            params.add('argOrgNo', orgNo);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, false,
                                  function (rslt)
                                  {
                                      theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:');
                                      theLogger.log(rslt);
                                      if (typeof rslt === 'object') {
                                          res = {};
                                          // ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
                                          if (rslt.m_bSuccess === true) {
                                              res.success = true;
                                              res.errCode = res.errMsg = '';
                                          }
                                          else {
                                              res.success = false;
                                              res.errCode = rslt.m_ErrCode;
                                              res.errMsg = rslt.m_strErrMsg;
                                          }
                                      }
                                      else {
                                          res = { success: false, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!' };
                                      }

                                      if (res.success) {
                                          _dfd.resolve(res);
                                      }
                                      else {
                                          _dfd.reject(res);
                                      }
                                  });
	            return _dfd.promise();
	        },
	        // 開啟公文前叫用 (Server在公文目錄準備ODWDCM.XML, ODWWKF-xx.XML檔)
	        setMsgStatus: function (artifact, msgId, options)
	        {
				options = (typeof options=='object')?options:null;
				
	            var wsFuncName = 'SetMsgStatus';
	            var wsUrl = (!!options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                throw new Error('ODMSSP WS尚未設定服務網址URL');
	            }

	            if (artifact.length === 0 || msgId.length === 0) {
	                throw new Error('叫用ODMSSP.' + wsFuncName + ', 無效的參數值');
	            }

	            var params = new SOAPClientParameters(), res;
	            params.add('argArtifact', artifact);
	            params.add('argMsgId', msgId);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, false,
                                  function (rslt)
                                  {
                                      theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:');
                                      theLogger.log(rslt);
                                      if (typeof rslt === 'object') {
                                          res = {};
                                          // ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
                                          if (rslt.m_bSuccess === true) {
                                              res.success = true;
                                              res.errMsg = '';
                                          }
                                          else {
                                              res.success = false;
                                              res.errMsg = rslt.m_strErrMsg;
                                          }
                                      }
                                      else {
                                          throw new Error('叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!');
                                      }
                                  });
	            return res;
			},
			// 2020.1.10 - 1080701 Eric, 開啟[草稿]公文前叫用 (Server在公文目錄準備ODWDCM.XML, ODWWKF-xx.XML檔)
	        setDraftMsgStatus: function (artifact, orgNo, draftMsgId, userId, options)
	        {
				options = (typeof options=='object')?options:null;
				let _dfd = $.Deferred();
				
	            var wsFuncName = 'SetDraftMsgStatus';
	            var wsUrl = (!!options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                throw new Error('ODMSSP WS尚未設定服務網址URL');
				}
				
	            if (artifact.length === 0 || orgNo.length===0 || draftMsgId.length === 0 || userId.length===0) {
	                throw new Error('叫用ODMSSP.' + wsFuncName + ', 無效的參數值');
				}
				
				let _async = true;
				if (options!==null && typeof options.async=='boolean' && options.async===false)
					_async = false;

	            var params = new SOAPClientParameters(), res;
				params.add('argArtifact', artifact);
				params.add('argOrgNo', orgNo);
				params.add('argDraftMsgId', draftMsgId);
				params.add('argUserName', userId);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, _async, function (rslt) {
					theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:');
					theLogger.log(rslt);
					if (typeof rslt === 'object') {
						res = {};
						// ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
						if (rslt.m_bSuccess === true) {
							res.success = true;
							res.errMsg = '';
						}
						else {
							res.success = false;
							res.errMsg = rslt.m_strErrMsg;
						}
						if (_async) {
							if (res.success) {
								_dfd.resolve(res);
							}
							else {
								_dfd.reject(res);
							}
						}
					}
					else {
						if (_async) {
							_dfd.reject({success:false, errMsg:'叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!'});
						}
						else {
							throw new Error('叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!');
						}
					}
				});
				if (_async) {
					return _dfd.promise();
				}
				else {
					return res;
				}
	        },
	        // 設定公文傳送時是否使用臨時憑證加簽[若為臨時憑證,會在DB註記應補簽!]
	        setTodoListTmpCerState: function (artifact, sourceOrgNo, msgId, state, docNo, options) {
	            var _dfd = $.Deferred();

	            var wsFuncName = 'SetTodoListTmpCerState';
	            var wsUrl = (options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                _dfd.reject({ success: false, errCode: -1000, errMsg: 'ODMSSP WS尚未設定服務網址URL' });
	                return _dfd.promise();
	            }

	            if (artifact.length === 0 || msgId.length === 0) {
	                _dfd.reject({ success: false, errCode: -1001, errMsg: '叫用ODMSSP.' + wsFuncName + ', 無效的參數值' });
	                return _dfd.promise();
	            }

				// 2021.5 - 1100093 merge: check status value
				if (state!=='Y' && state!=='N') {
					_dfd.reject({ success: false, errCode: -1002, errMsg: '叫用ODMSSP.' + wsFuncName + ', 無效的State參數值:"' + state  + '" (有效值:Y|N)'});
	                return _dfd.promise();
				}

	            var params = new SOAPClientParameters(), res;
	            params.add('argArtifact', artifact);
	            params.add('argSourceOrgNo', sourceOrgNo);
	            params.add('argMsgId', msgId);
	            params.add('argState', state);
	            params.add('argDocNo', docNo);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, false,
                                  function (rslt)
                                  {
                                      theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:');
                                      theLogger.log(rslt);
                                      if (typeof rslt === 'object') {
                                          res = {};
                                          // 解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
                                          if (rslt.m_bSuccess === true) {
                                              res.success = true;
                                              res.errMsg = '';
                                              _dfd.resolve(res);
                                          }
                                          else {
                                              res.success = false;
                                              res.errMsg = rslt.m_strErrMsg;
                                              _dfd.reject(res);
                                          }
                                          theLogger.debug('-I- 叫用ODMSSP.' + wsFuncName + ', m_bSuccess=' + (res.success ? 'true' : 'false'));
                                      }
                                      else {
                                          res = { success: false, errCode: -1002, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!' };
                                          _dfd.reject(res);
                                      }
                                  });
	            return _dfd.promise();
	        },
	        /* 傳送公文 (DB/流程作業) [!!!目前尚未實作非同步叫用功能!!!]
			 */
	        submitMsg: function (artifact, msgId, isDraft, remotePath, webFileIOWSUrl, options)
	        {
	            var wsFuncName = 'SubmitMsg';
	            var wsUrl = (options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                return { success: false, errCode: -1000, errMsg: 'ODMSSP WS尚未設定服務網址URL' };
	            }

	            if (artifact.length === 0 || msgId.length === 0 || remotePath.length === 0 ||
					webFileIOWSUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, 存在無效的參數!');
	                return { success: false, errCode: -1001, errMsg: '叫用ODMSSP.' + wsFuncName + ', 無效的參數值' };
	            }

	            var params = new SOAPClientParameters(), res;
	            params.add('argArtifact', artifact);
	            if (isDraft) {
	                params.add('argMsgId', '0');
	            }
	            else {
	                params.add('argMsgId', msgId);
	            }
	            params.add('argRemotePath', remotePath);
	            params.add('argWebFileIOWS', webFileIOWSUrl);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, false,
                                  function (rslt)
                                  {
                                      theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:' + rslt);
                                      if (typeof rslt === 'object') {
                                          res = {};
                                          // ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
                                          if (rslt.m_bSuccess === true) {
                                              res.success = true;
                                              res.errMsg = '';
                                          }
                                          else {
                                              res.success = false;
											  res.errMsg = rslt.m_strErrMsg;
											   // 2018.1.15 - 1061276
											   if (typeof rslt.m_CheckDataErr=='boolean' && rslt.m_CheckDataErr===true) {
											    res.checkDataErr = true;
											  }
                                          }
                                      }
                                      else {
                                          res = { success: false, errCode: -1002, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!' };
                                      }
                                  });

	            theLogger.log('-I- ODMSSP.submitMsg() return:' + res);
	            return res;
	        },
	        /* 儲存公文 (ODMSSP WebService, DB作業)
			 */
	        saveMsg: function (artifact, msgId, options) {
	            var wsFuncName = 'SaveMsg';
	            var wsUrl = (options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- odmssp.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                return { success: false, errCode: -1000, errMsg: 'odmssp WS尚未設定服務網址URL' };
	            }

	            if (artifact.length === 0 || msgId.length === 0) {
	                return { success: false, errCode: -1001, errMsg: '叫用odmssp.' + wsFuncName + ', 提供無效的參數值' };
	            }

	            var params = new SOAPClientParameters(), res;
	            params.add('argArtifact', artifact);
	            params.add('argMsgId', msgId);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, false,
                                  function (rslt) {
                                      theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:');
                                      theLogger.log(rslt);
                                      if (typeof rslt === 'object') {
                                          res = {};
                                          // ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
                                          if (rslt.m_bSuccess === true) {
                                              res.success = true;
                                              res.errMsg = '';
                                          }
                                          else {
                                              res.success = false;
											  res.errMsg = rslt.m_strErrMsg;
											  // 2018.1.15 - 1061276
											  if (typeof rslt.m_CheckDataErr=='boolean' && rslt.m_CheckDataErr===true) {
											    res.checkDataErr = true;
											  }
                                          }
                                      }
                                      else {
                                          theLogger.error('Error! ODMSSP.SubmitMsg() 回傳不為object');
                                          res = { success: false, errCode: -1002, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!' };
                                      }
                                  });
	            return res;
	        },
	        /* 儲存草稿公文 (ODMSSP WebService, DB作業)
			 */
	        saveDraftMsg: function (artifact, _docObj, options)
	        {
	            var wsFuncName = 'SaveDraftMsg';
	            var wsUrl = (options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- odmssp.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                return { success: false, errCode: -1000, errMsg: 'odmssp WS尚未設定服務網址URL' };
	            }

	            if (artifact.length === 0 || _docObj.msgId.length === 0) {
	                return { success: false, errCode: -1001, errMsg: '叫用odmssp.' + wsFuncName + ', 提供無效的參數值' };
	            }

	            var params = new SOAPClientParameters(), res;
	            params.add('argArtifact', artifact);
	            params.add('argOrgNo', _docObj.sourceOrgNo);
	            if (_docObj.get('ODWMSG', 'IS_PROXY_DOC') == '1') {
	                params.add('argUserName', _docObj.ICUserId);
	            }
	            else {
	                params.add('argUserName', theSSO.User.account);
	            }

	            var msgIdPure = _docObj.msgId;
	            if (_docObj.msgId.indexOf('_') !== -1) {
	                msgIdPure = _docObj.msgId.substring(0, _docObj.msgId.indexOf('_'));
	            }
	            params.add('argMsgId', msgIdPure);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, false,
					function (rslt)
					{
						theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:');
						theLogger.log(rslt);
						if (typeof rslt === 'object') {
							res = {};
							// ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
							if (rslt.m_bSuccess === true) {
								res.success = true;
								res.errMsg = '';
								// 2020.1.13 - 1080701 草稿儲存完須更新ODWDCM.LAST_UPDATE_PROG/LAST_UPDATE_TIME
								res.LastUpdateProg = rslt.LastUpdateProg;
								res.LastUpdateTime = rslt.LastUpdateTime;
							}
							else {
								res.success = false;
								res.errMsg = rslt.m_strErrMsg;
								// 2018.1.15 - 1061276
								if (typeof rslt.m_CheckDataErr=='boolean' && rslt.m_CheckDataErr===true) {
									res.checkDataErr = true;
								}
							}
						}
						else {
							theLogger.error('Error! ODMSSP.SubmitMsg() 回傳不為object');
							res = { success: false, errCode: -1002, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!' };
						}
				});
	            return res;
	        },
	        /* 2014.1 - 接到新進待辦通知時, 取得指定待辦事項的公文基資(ODWMSG)內容
			 */
	        getMsgODWMSG: function (artifact, msgIdList, options)
	        {
	            // msgIdList format: 'msgId1;msgId2;msgId3;...'
	            if (typeof options === 'undefined') {
	                options = null;
	            }

	            var _dfd = $.Deferred();
	            var wsFuncName = 'GetMsgODWMSG';
	            var wsUrl = (!!options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                throw new Error('ODMSSP WS尚未設定服務網址URL');
	            }

	            var async = false;
	            if (options && (typeof options.async !== 'undefined') && (options.async === true)) {
	                async = true;
	            }

	            var params = new SOAPClientParameters();
	            params.add('argArtifact', artifact);
	            params.add('argMsgIdList', msgIdList);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, async,
                                  function (rslt)
                                  {
                                      theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:');
                                      theLogger.log(rslt);
                                      if (typeof rslt === 'object') {
                                          _dfd.resolve(rslt);
                                      }
                                      else {
                                          _dfd.reject(new Error('叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!'));
                                      }
                                  });
	            return _dfd.promise();
	        },
	        /* 確認MsgId是否仍有效 */
	        isMsgInVaild: function (artifact, msgId, options)
	        {
	            //function name : IsMsgInValid
	            if (typeof options === 'undefined') {
	                options = null;
	            }

	            var _dfd = $.Deferred();
	            var wsFuncName = 'IsMsgInValid';
	            var wsUrl = (options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                throw new Error('ODMSSP WS尚未設定服務網址URL');
	            }

	            var async = false;
	            if (options && (typeof options.async !== 'undefined') && (options.async === true)) {
	                async = true;
	            }

	            var params = new SOAPClientParameters();
	            params.add('argArtifact', artifact);
	            params.add('argMsgId', msgId);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, async,
					function (rslt)
					{
					    //theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:' + rslt);
					    if (typeof rslt === 'object') {
					        if ((typeof rslt.m_bSuccess !== 'undefined') && rslt.m_bSuccess === true) {
					            _dfd.resolve({ success: true, valid: true });
					        }
					        else {
					            if ((typeof rslt.m_bSuccess !== 'undefined') && !!rslt.m_strErrMsg) {
					                _dfd.reject({ success: true, valid: false, msg: rslt.m_strErrMsg });
					            }
					            else {
					                _dfd.reject({ success: false, valid: false, msg: '叫用ODMSSP:' + wsFuncName + '發生錯誤! (rslt.m_bSuccess!=true)' });
					            }
					        }
					    }
					    else {
					        _dfd.reject({ success: false, valid: false, msg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤! (rslt不為object)' });
					    }
					});
	            return _dfd.promise();
	        },
	        /* 取得公文基資
			 * 
			 * =>草稿傳送前叫用, 以確認該公文是否已存在!
			 */
	        getDocumentInfo2: function (artifact, orgNo, docNo, _dfd, options)
	        {
	            if (typeof options === 'undefined') {
	                options = null;
	            }

	            if (typeof _dfd == 'undefined')
	                _dfd = $.Deferred();

	            var wsFuncName = 'GetDocumentInfo2';
	            var wsUrl = (options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                _dfd.reject({ success: false, errMsg: 'ODMSSP WS尚未設定服務網址URL' });
	                return _dfd.promise();
	            }

	            var async = false;
	            if (options && (typeof options.async !== 'undefined') && (options.async === true)) {
	                async = true;
	            }

	            var params = new SOAPClientParameters();
	            params.add('argArtifact', artifact);
	            params.add('argSourceOrgNo', orgNo);
	            params.add('argDocNo', docNo);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, async,
					function (rslt)
					{
					    var i = 0, $todolist = null, _todolist = [];
					    if (typeof rslt === 'object') {
					        // <RetMsg>/<m_bSuccess>
					        if ((typeof rslt.m_bSuccess !== 'undefined') && rslt.m_bSuccess === true) {
					            if (typeof rslt.m_docToDoList !== 'undefined' && rslt.m_docToDoList !== null) {
					                $todolist = $(rslt.m_docToDoList).find('ODWMSG'); // 2017.5.26 - Eric, 1060327
					                for (i = 0; i < $todolist.length; i++) {
					                    _todolist.push($todolist[i]);
					                }
					                _dfd.resolve({ success: true, todoList: _todolist }); // 回傳 array of <ODWMSG> node
					            }
					            else {
					                _dfd.reject({ success: false, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤, 回傳的m_strRetStr找不到或為空字串' });
					            }
					        }
					        else if ((typeof rslt.m_bSuccess !== 'undefined') && rslt.m_bSuccess === false) {
					            _dfd.resolve({ success: true, todoList: [] });
					        }
					        else {
					            if ((typeof rslt.m_bSuccess !== 'undefined') && !!rslt.m_strErrMsg) {
									// 2018.1.15 - 1061276
									if (typeof rslt.m_CheckDataErr=='boolean' && rslt.m_CheckDataErr===true) {
										_dfd.reject({ success: true, errMsg: rslt.m_strErrMsg, checkDataErr: true });
									}
									else {
										_dfd.reject({ success: false, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤, ErrMsg:' + rslt.m_strErrMsg });
									}
					            }
					            else {
					                _dfd.reject({ success: false, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤, rslt.m_bSuccess!=true' });
					            }
					        }
					    }
					    else {
					        _dfd.reject({ success: false, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤, rslt不為object' });
					    }
					});
	            return _dfd.promise();
	        },
	        /* 取得公文正式儲存區資訊 */
	        newMsg: function (artifact, orgNo, _dfd)
	        {
	            if (typeof options === 'undefined') {
	                options = null;
	            }

	            if (typeof _dfd == 'undefined')
	                _dfd = $.Deferred();

	            if (typeof artifact == 'undefined' || artifact.length === 0) {
	                _dfd.reject({ success: false, errMsg: '無效的artifact參數值!' });
	                return _dfd.promise();
	            }

	            if (typeof orgNo == 'undefined' || orgNo.length === 0) {
	                _dfd.reject({ success: false, errMsg: '無效的orgNo參數值!' });
	                return _dfd.promise();
	            }

	            var wsFuncName = 'NewMsg';
	            var wsUrl = (options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                _dfd.reject({ success: false, errMsg: 'ODMSSP WS尚未設定服務網址URL' });
	                return _dfd.promise();
	            }

	            var async = false;
	            if (options && (typeof options.async !== 'undefined') && (options.async === true)) {
	                async = true;
	            }

	            var params = new SOAPClientParameters(), res;
	            params.add('argArtifact', artifact);
	            params.add('argSourceOrgNo', orgNo);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, async,
					function (rslt)
					{
					    var arrRslt, _srvNo = '', _webService = '', _storagePath = '';
					    if (typeof rslt === 'object') {
					        if ((typeof rslt.m_bSuccess !== 'undefined') && rslt.m_bSuccess === true) {
					            if (typeof rslt.m_strRetStr !== 'undefined' && rslt.m_strRetStr.length) {
					                // m_strRetStr format: [SRV_NO]$[WEB_SERVICE]$[STORAGE_PATH]
					                arrRslt = rslt.m_strRetStr.split('$');
					                if ((arrRslt.length >= 3) && !!arrRslt[0] && arrRslt[0].length &&
										!!arrRslt[1] && arrRslt[1].length && !!arrRslt[2] && arrRslt[2].length) {
					                    _dfd.resolve({ success: true, newMsgInfo: { srvNo: arrRslt[0], wsUrl: arrRslt[1], storagePath: arrRslt[2] } });
					                }
					                else {
					                    _dfd.reject({ success: false, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤, 回傳的m_strRetStr格式不正確:' + rslt.m_strRetStr });
					                }
					            }
					            else {
					                _dfd.reject({ success: false, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤, 回傳的m_strRetStr找不到或為空字串' });
					            }
					        }
					        else {
					            if ((typeof rslt.m_bSuccess !== 'undefined') && !!rslt.m_strErrMsg) {
					                _dfd.reject({ success: false, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤, ErrMsg:' + rslt.m_strErrMsg });
					            }
					            else {
					                _dfd.reject({ success: false, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤, rslt.m_bSuccess!=true' });
					            }
					        }
					    }
					    else {
					        _dfd.reject({ success: false, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤, rslt不為object' });
					    }
					});
	            return _dfd.promise();
	        },
	        /* 二代創稿函式 */
	        newDraft: function (artifact, orgNo, signType, ouId, ouName, roleNo, roleName, account, empName, cRuleNo, nesrReason, docType, options)
	        {
	            if (typeof options === 'undefined') {
	                options = null;
	            }
	            var _dfd = $.Deferred();

	            var wsFuncName = 'NewDraft';
	            var wsUrl = (options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                throw new Error('ODMSSP WS尚未設定服務網址URL');
	            }

	            var async = false;
	            if (options && (typeof options.async !== 'undefined') && (options.async === true)) {
	                async = true;
	            }

	            var params = new SOAPClientParameters(), res;
	            params.add('argArtifact', artifact);
	            params.add('argOrgNo', orgNo);
	            params.add('argSignType', signType);
	            params.add('argOuId', ouId);
	            params.add('argOuName', ouName);
	            params.add('argRoleNo', roleNo);
	            params.add('argRoleName', roleName);
	            params.add('argUserName', account);
	            params.add('argEmpName', empName);
	            params.add('argCRuleNo', cRuleNo);
	            params.add('argNesrReason', nesrReason);
	            params.add('argDocType', docType);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, async,
					function (rslt)
					{
					    //theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:' + rslt);
					    if (typeof rslt === 'object') {
					        if ((typeof rslt.m_bSuccess !== 'undefined') && rslt.m_bSuccess === true) {
					            if (typeof rslt.m_strRetStr !== 'undefined' && rslt.m_strRetStr.length) {
					                _dfd.resolve({ success: true, sODWMSG: rslt.m_strRetStr });
					            }
					            else {
					                _dfd.reject(new Error('叫用ODMSSP.' + wsFuncName + ' 時發生錯誤, 回傳的m_strRetStr找不到或為空字串'));
					            }
					        }
					        else {
					            if ((typeof rslt.m_bSuccess !== 'undefined') && !!rslt.m_strErrMsg) {
					                _dfd.reject(new Error('叫用ODMSSP.' + wsFuncName + ' 時發生錯誤, ErrMsg:' + rslt.m_strErrMsg));
					            }
					            else {
					                _dfd.reject(new Error('叫用ODMSSP.' + wsFuncName + ' 時發生錯誤, rslt.m_bSuccess!=true'));
					            }
					        }
					    }
					    else {
					        _dfd.reject(new Error('叫用ODMSSP.' + wsFuncName + ' 時發生錯誤, rslt不為object'));
					    }
					});
	            return _dfd.promise();
	        },
	        /* 右鍵傳送公文 (右鍵傳送及紙本特定txName時會叫用)
			 */
	        menuSubmit: function (artifact, orgNo, msgId, docNo, menuSetting, remotePath, webFileIOWSUrl, options)
	        {
				// 2021.6 - 1100748 Eric, 支援非同步叫用.
				if (typeof options === 'undefined') {
	                options = null;
	            }

				let _dfd = null;

	            var wsFuncName = 'MenuSubmit';
	            var wsUrl = (options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                return { success: false, errCode: -1000, errMsg: 'ODMSSP WS尚未設定服務網址URL' };
	            }

	            if (artifact.length === 0 || msgId.length === 0 || remotePath.length === 0 ||
					webFileIOWSUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, 存在無效的參數!');
	                return { success: false, errCode: -1001, errMsg: '叫用ODMSSP.' + wsFuncName + ', 無效的參數值' };
	            }

				var async = false;
	            if (options && (typeof options.async !== 'undefined') && (options.async === true)) {
	                async = true;
					_dfd = $.Deferred();
	            }

	            var params = new SOAPClientParameters(), res;
	            params.add('argArtifact', artifact);
	            params.add('argSourceOrgNo', orgNo);
	            params.add('argMsgId', msgId);
	            params.add('argDocNo', docNo);
	            params.add('argMenuSetting', menuSetting);
	            params.add('argRemotePath', remotePath);
	            params.add('argWebFileIOWS', webFileIOWSUrl);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, async, function (rslt) {
					theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:' + rslt);
					if (typeof rslt === 'object') {
						res = {};
						// ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
						if (rslt.m_bSuccess === true) {
							res.success = true;
							res.errMsg = '';
							if (!!_dfd) {
								_dfd.resolve(res);
							}
						}
						else {
							res.success = false;
							res.errMsg = rslt.m_strErrMsg;
							// 2018.1.15 - 1061276
							if (typeof rslt.m_CheckDataErr=='boolean' && rslt.m_CheckDataErr===true) {
								res.checkDataErr = true;
							}
							if (!!_dfd) {
								_dfd.reject(res);
							}
						}
					}
					else {
						res = { success: false, errCode: -1002, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!' };
						if (!!_dfd) {
							_dfd.reject(res);
						}
					}
				});

				if (!!_dfd) {
					return _dfd.promise();
				}
				else {
	            	theLogger.log('-I- ODMSSP.' + wsFuncName + '() return:' + res);
					return res;
				}
	        },
	        /* 檢核是否為列管公文 (右鍵傳送時會叫用)
			 */
	        isAuditDoc: function (artifact, orgNo, docNo, options)
	        {
	            var _dfd = $.Deferred();

	            var wsFuncName = 'IsAuditDoc';
	            var wsUrl = (options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                return { success: false, errCode: -1000, errMsg: 'ODMSSP WS尚未設定服務網址URL' };
	            }

	            if (artifact.length === 0 || orgNo.length === 0 || docNo.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, 存在無效的參數!');
	                return { success: false, errCode: -1001, errMsg: '叫用ODMSSP.' + wsFuncName + ', 無效的參數值' };
	            }

	            var params = new SOAPClientParameters(), res;
	            params.add('argArtifact', artifact);
	            params.add('argSourceOrgNo', orgNo);
	            params.add('argDocNo', docNo);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, false,
                                  function (rslt)
                                  {
                                      theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:' + rslt);
                                      if (typeof rslt === 'object') {
                                          res = {};
                                          // ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
                                          if (rslt.m_bSuccess === true) {
                                              res.success = true;
                                              res.errMsg = '';
                                              res.nAuditDoc = 2;
                                          }
                                          else {
                                              if (rslt.m_strErrMsg == '此公文目前未列管') {
                                                  res.success = true;
                                                  res.errMsg = '';
                                                  res.nAuditDoc = 1;
                                              }
                                              else {
                                                  res.success = false;
												  res.errMsg = rslt.m_strErrMsg;
												  // 2018.1.15 - 1061276
												  if (typeof rslt.m_CheckDataErr=='boolean' && rslt.m_CheckDataErr===true) {
												    res.checkDataErr = true;
												  }
                                              }
                                          }
                                      }
                                      else {
                                          res = { success: false, errCode: -1002, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!' };
                                      }
                                  });

	            theLogger.log('-I- ODMSSP.' + wsFuncName + '() return:' + res);
	            return res;
	        },
	        //1051005 Kevin 新增登入通知訊息
	        GetLoginMsg: function (artifact, options)
	        {
				 if (typeof options === 'undefined') {
	                options = null;
	            }
				
	            var _dfd = $.Deferred();

	            var wsFuncName = 'GetLoginMsg';
	            var wsUrl = (!!options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                _dfd.reject({ success: false, errCode: -1000, errMsg: 'ODMSSP WS尚未設定服務網址URL' });
	            }

	            if (artifact.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, 存在無效的參數!');
	                _dfd.reject({ success: false, errCode: -1001, errMsg: '叫用ODMSSP.' + wsFuncName + ', 無效的參數值' });
	            }

	            var params = new SOAPClientParameters(), res;
	            params.add('argArtifact', artifact);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, true,
                               function (rslt)
                               {
                                   theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:');
                                   theLogger.log('    ' + JSON.stringify(rslt));

                                   if (typeof rslt === 'string') {
                                       if (rslt.indexOf('ERR-') === -1)
                                           _dfd.resolve(rslt);
                                       else
                                           _dfd.reject({ success: false, errCode: -1003, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤:' + rslt });
                                   }
								   else if (typeof rslt=='object') {
										_dfd.resolve('');
								   }
                                   else {
                                       _dfd.reject({ success: false, errCode: -1002, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!' });
                                   }
                               });
	            return _dfd.promise();
	        },
			//1120322 David 新增傳入公文文號
			//SetMsgE2PForDraft: function(artifact, orgNo, ICUserId, msgId, E2PCode, E2PReason, options) {
			SetMsgE2PForDraft: function(artifact, orgNo, ICUserId, msgId, E2PCode, E2PReason, DocNo, options) {
				if (typeof options === 'undefined') {
	                options = null;
	            }
				
	            var _dfd = $.Deferred();

	            var wsFuncName = 'SetMsgE2PForDraft';
	            var wsUrl = (!!options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                _dfd.reject({ success: false, errCode: -1000, errMsg: 'ODMSSP WS尚未設定服務網址URL' });
	            }

	            if (artifact.length===0 || orgNo.length===0 || msgId.length===0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, 存在無效的參數!');
	                _dfd.reject({ success: false, errCode: -1001, errMsg: '叫用ODMSSP.' + wsFuncName + ', 無效的參數值' });
	            }

	            var params = new SOAPClientParameters(), res;
	            params.add('argArtifact', artifact);
				params.add('argOrgNo', orgNo);
				params.add('argUserName', ICUserId);
				params.add('argMsgId', msgId);
				params.add('argCRuleNo', E2PCode);
				params.add('argCRuleReason', E2PReason);
				params.add('argDocNo', DocNo);//1120322 David 新增傳入公文文號

	            SOAPClient.invoke(wsUrl, wsFuncName, params, true,
					function (rslt) {
						theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:' + rslt);
						if (typeof rslt === 'object') {
							res = {};
							// ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
							if (rslt.m_bSuccess === true) {
								res.success = true;
								res.errMsg = '';
								_dfd.resolve(res);
							}
							else {
								res.success = false;
								res.errMsg = rslt.m_strErrMsg;
								res.errCode = -2000;
								_dfd.reject(res);
							}
						}
						else {
							res = { success: false, errCode: -1002, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!' };
							_dfd.reject(res);
						}
					});
	            return _dfd.promise();
			},
			SetMsgE2P: function(artifact, orgNo, msgId, docNo, remotePath, fileIOWS, E2PCode, E2PReason, options) {
				if (typeof options === 'undefined') {
	                options = null;
	            }
				
	            var _dfd = $.Deferred();

	            var wsFuncName = 'SetMsgE2P';
	            var wsUrl = (!!options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                _dfd.reject({ success: false, errCode: -1000, errMsg: 'ODMSSP WS尚未設定服務網址URL' });
	            }

	            if (artifact.length===0 || orgNo.length===0 || msgId.length===0 ||
					docNo.length===0 || remotePath.length===0 || fileIOWS.length===0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, 存在無效的參數!');
	                _dfd.reject({ success: false, errCode: -1001, errMsg: '叫用ODMSSP.' + wsFuncName + ', 無效的參數值' });
	            }

	            var params = new SOAPClientParameters(), res;
	            params.add('argArtifact', artifact);
				params.add('argOrgNo', orgNo);
				params.add('argMsgId', msgId);
				params.add('argDocNo', docNo);
				params.add('argRemotePath', remotePath);
				params.add('argWebFileIOWS', fileIOWS);
				params.add('argCRuleNo', E2PCode);
				params.add('argCRuleReason', E2PReason);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, true,
					function (rslt) {
						theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:' + rslt);
						if (typeof rslt === 'object') {
							res = {};
							// ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
							if (rslt.m_bSuccess === true) {
								res.success = true;
								res.errMsg = '';
								_dfd.resolve(res);
							}
							else {
								res.success = false;
								res.errMsg = rslt.m_strErrMsg;
								res.errCode = -2000;
								_dfd.reject(res);
							}
						}
						else {
							res = { success: false, errCode: -1002, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!' };
							_dfd.reject(res);
						}
					});
	            return _dfd.promise();
			},
			// 2107.10.12 - 1060894, 右鍵選單開啟前叫用 (取得ODWDCMG內容)
	        getODWDCMStr: function (artifact, orgNo, docNo, msgId, options) {
				options = (typeof options=='object')?options:null;
				
	            var wsFuncName = 'GetODWDCMstr';
	            var wsUrl = (!!options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                throw new Error('ODMSSP WS尚未設定服務網址URL');
	            }

	            if (artifact.length === 0 || msgId.length === 0) {
	                throw new Error('叫用ODMSSP.' + wsFuncName + ', 無效的參數值');
				}
				
				var fAsync = (options!==null && options.async)?true:false;
				var _dfdIn = null;
				if (fAsync) {
					_dfdIn = $.Deferred();
				}

	            var params = new SOAPClientParameters(), res;
				params.add('argArtifact', artifact);
				params.add('argOrgNo', orgNo)
				params.add('argDocNo', docNo);
	            params.add('argMsgId', msgId);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, false,
					function (rslt) {
						theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:');
						theLogger.log(rslt);
						if (typeof rslt === 'object') {
							res = {};
							// ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
							if (rslt.m_bSuccess === true) {
								res.success = true;
								res.errMsg = '';
								res.retStr = rslt.m_strRetStr;
								if (_dfdIn) {
									_dfdIn.resolve(res);
								}
							}
							else {
								res.success = false;
								res.errMsg = rslt.m_strErrMsg;
								if (_dfdIn) {
									_dfdIn.reject(res);
								}
							}
						}
						else {
							throw new Error('叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!');
						}
					});

				if (!fAsync) {
					return res;
				}
				else {
					return _dfd.promise();
				}
			},
			// 2020.1.10 - 1080701 Eric, 儲存前檢核 for 創稿公文文號重複問題
			checkDraftLastUpdate: function(artifact, orgNo, draftMsgId, userId, xmlStr, options) {
				//function name : IsMsgInValid
	            if (typeof options === 'undefined') {
	                options = null;
	            }

	            var _dfd = $.Deferred();
	            var wsFuncName = 'CheckDraftLastUpdate';
	            var wsUrl = (options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                throw new Error('ODMSSP WS尚未設定服務網址URL');
	            }

	            var async = true;
	            if (options && (typeof options.async !== 'undefined') && (options.async === false)) {
	                async = false;
	            }

				var params = new SOAPClientParameters();
				params.add('argArtifact', artifact);
				params.add('argOrgNo', orgNo);
				params.add('argDraftMsgid', draftMsgId);
				params.add('argUserName', userId);
				params.add('argXml', xmlStr);
				
	            SOAPClient.invoke(wsUrl, wsFuncName, params, async,
					function (rslt)
					{
					    //theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:' + rslt);
					    if (typeof rslt === 'object') {
					        if ((typeof rslt.m_bSuccess !== 'undefined') && rslt.m_bSuccess === true) {
					            _dfd.resolve({ success: true, valid: true });
					        }
					        else {
					            if ((typeof rslt.m_bSuccess !== 'undefined') && !!rslt.m_strErrMsg) {
					                _dfd.resolve({ success: true, valid: false, msg: rslt.m_strErrMsg });
					            }
					            else {
					                _dfd.resolve({ success: false, valid: false, msg: '叫用ODMSSP:' + wsFuncName + '發生錯誤! (rslt.m_bSuccess!=true, 但rslt.m_strErrMsg為空值)' });
					            }
					        }
					    }
					    else {
					        _dfd.reject({ success: false, valid: false, msg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤! (rslt不為object)' });
					    }
					});
	            return _dfd.promise();
			},
			// 2021.5 - 1100093 merge: 2021.1.14 - 1090821, 公文傳送時產出呈現檔(外機關陳核會稿公文回退文, 本機關公文送外機關會簽)
			genCoPDF: function(artifact, orgNo, docNo, CoPDFName, options) {
				if (typeof options === 'undefined') {
	                options = null;
	            }
				
	            var _dfd = $.Deferred();

	            var wsFuncName = 'GenCoPDF';
	            var wsUrl = (!!options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                _dfd.reject({ success: false, errCode: -1000, errMsg: 'ODMSSP WS尚未設定服務網址URL' });
	            }

	            if (artifact.length===0 || orgNo.length===0 || docNo.length===0 ||
					CoPDFName.length===0) {
	                theLogger.error('-E- ODMSSP.' + wsFuncName + ' was invoked, 存在無效的參數!');
	                _dfd.reject({ success: false, errCode: -1001, errMsg: '叫用ODMSSP.' + wsFuncName + ', 無效的參數值' });
	            }

	            var params = new SOAPClientParameters(), res;
	            params.add('argArtifact', artifact);
				params.add('argOrgNo', orgNo);
				params.add('argDocNo', docNo);
				params.add('argCoPDFName', CoPDFName);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, true,
					function (rslt) {
						theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:' + rslt);
						if (typeof rslt === 'object') {
							res = {};
							// ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
							if (rslt.m_bSuccess === true) {
								res.success = true;
								res.errMsg = '';
								_dfd.resolve(res);
							}
							else {
								res.success = false;
								res.errMsg = rslt.m_strErrMsg;
								res.errCode = -2000;
								_dfd.reject(res);
							}
						}
						else {
							res = { success: false, errCode: -1002, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!' };
							_dfd.reject(res);
						}
					});
	            return _dfd.promise();
			},
			//1120217	Leslie[1110881]	銓敘部-序14，新增支援紙本草稿轉正式公文
			//1120503 David 支援代理人處理
			//ProcDraftToMain: function(artifact, draftMsgId, orgNo, docNo, options){
			ProcDraftToMain: function(artifact, _docObj, options){
				var wsFuncName = 'ProcDraftToMain';
	            var wsUrl = (options && options.url) ? options.url : theWebServices.url('odmsspws');
	            if (!wsUrl || wsUrl.length === 0) {
	                theLogger.error('-E- odmssp.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
	                return { success: false, errCode: -1000, errMsg: 'odmssp WS尚未設定服務網址URL' };
	            }
				
				//1120503 David 支援代理人處理
				let draftMsgId = _docObj.msgId;
				let orgNo = _docObj.sourceOrgNo;
				let docNo = _docObj.docNo;
				let proxyAccount = "";
				if (_docObj.get('ODWMSG', 'IS_PROXY_DOC') == '1')
	                proxyAccount = _docObj.ICUserId;

	            if (artifact.length === 0 || draftMsgId.length === 0 || orgNo.length===0 || docNo.length === 0) {
	                return { success: false, errCode: -1001, errMsg: '叫用odmssp.' + wsFuncName + ', 提供無效的參數值' };
	            }

	            var params = new SOAPClientParameters(), res;
	            params.add('argArtifact', artifact);
	            params.add('argDraftMsgId', draftMsgId);
	            params.add('argOrgNo', orgNo);
	            params.add('argDocNo', docNo);
				//1120503 David 支援代理人處理
				params.add('argProxyAccount', proxyAccount);

	            SOAPClient.invoke(wsUrl, wsFuncName, params, false,
                                  function (rslt) {
                                      theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:');
                                      theLogger.log(rslt);
                                      if (typeof rslt === 'object') {
                                          res = {};
                                          // ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
                                          if (rslt.m_bSuccess === true) {
                                              res.success = true;
                                              res.errMsg = '';
											  
											  res.sMsgId = rslt.sMsgId
											  res.sWebService = rslt.sWebService 
											  res.sSrvNo = rslt.sSrvNo
											  res.sStoragePath = rslt.sStoragePath
											  res.sSubDir = rslt.sSubDir
                                          }
                                          else {
                                              res.success = false;
											  res.errMsg = rslt.m_strErrMsg;
                                          }
                                      }
                                      else {
                                          theLogger.error('Error! ODMSSP.SubmitMsg() 回傳不為object');
                                          res = { success: false, errCode: -1002, errMsg: '叫用ODMSSP.' + wsFuncName + ' 時發生錯誤!' };
                                      }
                                  });
	            return res;
			},
	    };
		
		/* 2015.3 - updateEnvelope / signEnvelope 改在 WebFileIO 實作 */
		theWebServices.webFileIO = {
			// 傳送公文前封裝公文最新內容
			updateEnvelope : function(artifact, docNo, msgId, workFilename, flags, orgNo, pincode, options) {
				var _dfd = $.Deferred();
				
				var wsFuncName = 'UpdateEnvelope';
				var wsUrl = (options && options.url) ? options.url : theWebServices.url('fileiows');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-E- FileIOWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject({success:false, errMsg:'FileIOWS尚未設定服務網址URL'});
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
                }
                
                var params = new SOAPClientParameters(), res;
                params.add('argArtifact', artifact);
				params.add('argDocNo', docNo);
				params.add('argMsgId', msgId);
				params.add('argWorkFilename', workFilename);
				params.add('argFlags', flags);
				params.add('argOrgNo', orgNo);
				params.add('argPincode', pincode);
                
                SOAPClient.invoke(wsUrl, wsFuncName, params, async,
                                  function(rslt) {
                                    theLogger.log('-I- FileIOWS.' + wsFuncName + ' returns:');
                                    theLogger.log(rslt);
                                    if (typeof rslt === 'object') {
										res = {};
										if (rslt.m_bSuccess===true) {
											res.success = true;
											res.toBeSigned = rslt.RtnStr;
											res.errCode = res.errMsg = '';
											_dfd.resolve(res); // 2021.5 - 1100093 merge: 2020.3.5 - 1081168 Eric, bug-fix
										}
										else {
											res.success = false;
											res.errCode = -1;
											res.errMsg = rslt.m_strErrMsg;
											res.toBeSigned = '';
											_dfd.reject(res); // 2021.5 - 1100093 merge: 2020.3.5 - 1081168 Eric, bug-fix
										}
									}
									else {
                                        _dfd.reject({success:false, errCode:-1000, errMsg:'叫用FileIOWS.' + wsFuncName + ' 時發生錯誤!(內部錯誤)'});
                                    }
                                  });
				/*
				 * res 欄位:
				 * success : boolean, true / false
				 * toBeSigned : 作業成功回傳的待簽核資料, Bese64編碼過的字串.
				 * errCode : 發生錯誤時的錯誤代碼.
				 * errMsg : 錯誤說明.
				 */
				return _dfd.promise();
			},
			// 傳送草稿公文前封裝公文最新內容
			updateDraftEnvelope : function(artifact, docNo, ICUserId, msgId, workFilename, flags, orgNo, pincode, options) {
				var _dfd = $.Deferred();
				
				var wsFuncName = 'UpdateDraftEnvelope';
				var wsUrl = (options && options.url) ? options.url : theWebServices.url('fileiows');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-E- FileIOWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject({success:false, errMsg:'FileIOWS尚未設定服務網址URL'});
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
                }
                
                var params = new SOAPClientParameters(), res;
                params.add('argArtifact', artifact);
				params.add('argDocNo', docNo);
				params.add('argUserName', ICUserId);
				params.add('argMsgId', msgId);
				params.add('argWorkFilename', workFilename);
				params.add('argFlags', flags);
				params.add('argOrgNo', orgNo);
				params.add('argPincode', pincode);
                
                SOAPClient.invoke(wsUrl, wsFuncName, params, async,
                                  function(rslt) {
                                    theLogger.log('-I- FileIOWS.' + wsFuncName + ' returns:');
                                    theLogger.log(rslt);
                                    if (typeof rslt === 'object') {
										res = {};
										if (rslt.m_bSuccess===true) {
											res.success = true;
											res.toBeSigned = rslt.RtnStr;
											res.errCode = res.errMsg = '';
											_dfd.resolve(res); // 2021.4.1 - Eric, bug-fix
										}
										else {
											res.success = false;
											res.errCode = -1;
											res.errMsg = rslt.m_strErrMsg;
											res.toBeSigned = '';
											_dfd.reject(res); // 2021.4.1 - Eric, bug-fix (發生錯誤應改call reject!)
										}
									}
									else {
                                        _dfd.reject({success:false, errCode:-1000, errMsg:'叫用FileIOWS.' + wsFuncName + ' 時發生錯誤!(內部錯誤)'});
                                    }
                                  });
				/*
				 * res 欄位:
				 * success : boolean, true / false
				 * toBeSigned : 作業成功回傳的待簽核資料, Bese64編碼過的字串.
				 * errCode : 發生錯誤時的錯誤代碼.
				 * errMsg : 錯誤說明.
				 */
				return _dfd.promise();
			},
			// 傳送公文前封裝公文最新內容的數位簽章
			signEnvelope : function(artifact, docNo, msgId, signValue, signCert, orgNo, options) {
				var _dfd = $.Deferred();
				var wsFuncName = 'SignEnvelope';
				var wsUrl = (options && options.url) ? options.url : theWebServices.url('fileiows');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-E- FileIOWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject({success:false, errMsg:'FileIOWS尚未設定服務網址URL'});
					return _dfd.promise();
                }
				
				if (artifact.length===0 || docNo.length===0 || msgId.length===0 ||
					signValue.length===0 || signCert.length===0 || orgNo.length===0) {
					_dfd.reject({success:false, errMsg:'叫用FileIOWS.' + wsFuncName + ', 提供無效的參數值'});
					return _dfd.promise();
				}
                
                var params = new SOAPClientParameters(), res;
                params.add('argArtifact', artifact);
				params.add('argDocNo', docNo);
				params.add('argMsgId', msgId);
				params.add('argSignValue', signValue);
				params.add('argSignCert', signCert);
				params.add('argOrgNo', orgNo);
                
                SOAPClient.invoke(wsUrl, wsFuncName, params, false,
                                  function(rslt) {
                                    theLogger.log('-I- FileIOWS.' + wsFuncName + ' returns:');
                                    theLogger.log(rslt);
                                    if (typeof rslt === 'object') {
										res = {};
										// ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
										if (rslt.m_bSuccess===true) {
											res.success = true;
											res.errCode = res.errMsg = '';
										}
										else {
											res.success = false;
											res.errCode = -1;
											res.errMsg = rslt.m_strErrMsg;
										}
									}
									else {
                                        res = {success:false, errMsg:'叫用FileIOWS.' + wsFuncName + ' 時發生錯誤!'};
                                    }
									
									if (res.success) {
										_dfd.resolve(res);
									}
									else {
										_dfd.reject(res);
									}
                                  });
				return _dfd.promise();
			},
			// 傳送公文前封裝公文最新內容的數位簽章
			signDraftEnvelope : function(artifact, docNo, ICUserId, msgId, signValue, signCert, orgNo, options) {
				var _dfd = $.Deferred();
				var wsFuncName = 'SignDraftEnvelope';
				var wsUrl = (options && options.url) ? options.url : theWebServices.url('fileiows');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-E- FileIOWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject({success:false, errMsg:'FileIOWS尚未設定服務網址URL'});
					return _dfd.promise();
                }
				
				if (artifact.length===0 || docNo.length===0 || msgId.length===0 ||
					signValue.length===0 || signCert.length===0 || orgNo.length===0) {
					_dfd.reject({success:false, errMsg:'叫用FileIOWS.' + wsFuncName + ', 提供無效的參數值'});
					return _dfd.promise();
				}
                
                var params = new SOAPClientParameters(), res;
                params.add('argArtifact', artifact);
				params.add('argDocNo', docNo);
				params.add('argUserName', ICUserId);
				params.add('argMsgId', msgId);
				params.add('argSignValue', signValue);
				params.add('argSignCert', signCert);
				params.add('argOrgNo', orgNo);
                
                SOAPClient.invoke(wsUrl, wsFuncName, params, false,
                                  function(rslt) {
                                    theLogger.log('-I- FileIOWS.' + wsFuncName + ' returns:');
                                    theLogger.log(rslt);
                                    if (typeof rslt === 'object') {
										res = {};
										// ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
										if (rslt.m_bSuccess===true) {
											res.success = true;
											res.errCode = res.errMsg = '';
										}
										else {
											res.success = false;
											res.errCode = -1;
											res.errMsg = rslt.m_strErrMsg;
										}
									}
									else {
                                        res = {success:false, errMsg:'叫用FileIOWS.' + wsFuncName + ' 時發生錯誤!'};
                                    }
									
									if (res.success) {
										_dfd.resolve(res);
									}
									else {
										_dfd.reject(res);
									}
                                  });
				return _dfd.promise();
			},
			/* 2016.7 - Eric Peng, 草稿上傳前, 須複製電子檔至公文正式儲存區 */
			//1111011	Leslie[1110865]	配合新增的簽閱附件，新增配套邏輯
			//copyDraftFilesToStoragePath : function(artifact, docNo, signType, hasRefAttach, draftFilePath, destServerWSUrl, destFilePath, options) {
			copyDraftFilesToStoragePath : function(artifact, docNo, signType, hasRefAttach, draftFilePath, destServerWSUrl, destFilePath, options, hasTmpAttach = false) {
				function argFile(draftFilePath, destFilePath) {
					this.FilePath = draftFilePath;
					this.FileName = '';
					this.ToPath = destFilePath;
					this.ToName = '';
				}
				
				// 2016.11.18
				var _dfd = null;
				if (typeof options=='object' && typeof options.dfd=='object') {
					_dfd = options.dfd;
				}
				else {
					_dfd = $.Deferred();
				}
				
				// 2016.11.3
				if (typeof hasRefAttach!=='boolean') {
					hasRefAttach = false;
				}

				// 2020.9.15 - 1090564 Eric, 草稿電子檔搬移時須調整檔案/子目錄清單!
				let fSMEGWebDoc = false;
				if (typeof options=='object' && typeof options.fSMEGWebDoc=='boolean') {
					fSMEGWebDoc = options.fSMEGWebDoc;
				}
				
				var wsFuncName = 'WebFileIO';
				var wsUrl = (options && options.url) ? options.url : theWebServices.url('fileiows');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-E- FileIOWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject({success:false, errMsg:'FileIOWS尚未設定服務網址URL'});
					return _dfd.promise();
                }
				
				if (typeof artifact=='undefined' || typeof docNo=='undefined' || typeof draftFilePath=='undefined' ||
					typeof destServerWSUrl=='undefined' || typeof destFilePath=='undefined' ||
					artifact.length===0 || docNo.length===0 || draftFilePath.length===0 || destServerWSUrl.length===0 ||
					destFilePath.length===0) {
					_dfd.reject({success:false, errMsg:'叫用FileIOWS.' + wsFuncName + ', 提供無效的參數值'});
					return _dfd.promise();
				}
                
				var fAsync = true;
				if (typeof options=='object' && typeof options.async=='boolean' && options.async===false) {
					fAsync = false;
				}
                
				var DEMgmtPath = docNo + '-00-99';
				var fileCollection = [];
				fileCollection.push(new argFile(draftFilePath, destFilePath));
				fileCollection.push(new argFile(SSOUtil.combineLocalPath(draftFilePath, DEMgmtPath), SSOUtil.combineLocalPath(destFilePath, DEMgmtPath)));
				if (signType=='E') {
					var DEBackupPath = docNo + '-00-01';
					// 線上簽核公文須加入: 文號-00-01資料夾
					if (!fSMEGWebDoc) {
						fileCollection.push(new argFile(SSOUtil.combineLocalPath(draftFilePath, DEBackupPath), SSOUtil.combineLocalPath(destFilePath, DEBackupPath)));
					}
					
					// 2016.11.3 - 有參考附件檔, 加入'_RefAtt'資料夾
					if (hasRefAttach) {
						fileCollection.push(new argFile(SSOUtil.combineLocalPath(draftFilePath, '_RefAtt'), SSOUtil.combineLocalPath(destFilePath, '_RefAtt')));
					}
					
					//1111011	Leslie[1110865]	配合新增的簽閱附件，新增配套邏輯
					if(hasTmpAttach){
						fileCollection.push(new argFile(SSOUtil.combineLocalPath(draftFilePath, '_TmpAtt'), SSOUtil.combineLocalPath(destFilePath, '_TmpAtt')));
					}
				}
				
                var params = new SOAPClientParameters();
                params.add('argArtifact', artifact);
				params.add('argType', '4'); // WebFileIO 搬移檔案, Type固定給"4"
				params.add('argFileCollection', fileCollection);
				params.add('argDeleteSource', 'false'); // 作業完成後是否刪除原位置檔案=>false, TSP會在草稿傳送成功後執行
				params.add('argOverWrite', 'true'); // 是否覆寫目的位置檔案=>true.
				params.add('argRemoteService', destServerWSUrl); // 公文正式儲存區位置Server的WebFileIO網址!
				                
                SOAPClient.invoke(wsUrl, wsFuncName, params, fAsync,
					function(rslt) {
						function parseError(rslt) {
							var arrErr = [], err, i=0;
							if(rslt.length) {
								for(i=0; i<rslt.length; i++) {
									err = rslt[i];
									if (err.ErrNo.length && err.ErrNo!=='0') {
										arrErr.push(err);
									}
								}
								if (arrErr.length) {
									return arrErr;
								}
							}
							return null;	// WebFileIOResult節點無child, 表示無錯誤
						}
						
						var res = {}, _arrErr = null;
						if (typeof rslt === 'object') {
							_arrErr = parseError(rslt);
							if (_arrErr===null) {
								res.success = true;
								res.errCode = res.errMsg = '';
							}
							else {
								res.success = false;
								res.errCode = _arrErr[0].ErrNo;
								res.errMsg = _arrErr[0].ErrMsg;
								res.errObj = _arrErr;
							}
						}
						else {
							res = {success:false, errMsg:'叫用FileIOWS.' + wsFuncName + ' 時發生錯誤!'};
						}
						
						if (res.success) {
							_dfd.resolve(res);
						}
						else {
							_dfd.reject(res);
						}
					});
				return _dfd.promise();
			},
			/* 2016.8 - Eric Peng, 取得待檢閱公文的 UNV Object */
			getDocUnvDataByJSON : function(artifact, docNo, orgNo, options) {
				var _dfd = $.Deferred();
				var wsFuncName = 'GetDocUnvDataByJSON';
				var wsUrl = (options && options.url) ? options.url : theWebServices.url('fileiows');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-E- FileIOWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject({success:false, errMsg:'FileIOWS尚未設定服務網址URL'});
					return _dfd.promise();
                }
				
				if (artifact.length===0 || docNo.length===0 || orgNo.length===0) {
					_dfd.reject({success:false, errMsg:'叫用FileIOWS.' + wsFuncName + ', 提供無效的參數值'});
					return _dfd.promise();
				}
                
                var params = new SOAPClientParameters(), res;
                params.add('argArtifact', artifact);
				params.add('argDocNo', docNo);
				params.add('argOrgNo', orgNo);
				
				SOAPClient.invokeJSON(wsUrl, wsFuncName, params, false,
                                  function(rslt) {
                                    theLogger.log('-I- FileIOWS.' + wsFuncName + ' returns:');
                                    theLogger.log(rslt);
                                    if (typeof rslt.value === 'object') {
										res = {};
										// ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
										if (rslt.value.m_bSuccess===true) {
											res.success = true;
											res.errCode = res.errMsg = '';
											res.rtnJSON = rslt.value.RtnStr;
										}
										else {
											res.success = false;
											res.errCode = -1;
											res.errMsg = rslt.value.m_strErrMsg;
										}
									}
									else {
                                        res = {success:false, errMsg:'叫用FileIOWS.' + wsFuncName + ' 時發生錯誤!'};
                                    }
									
									if (res.success) {
										_dfd.resolve(res);
									}
									else {
										_dfd.reject(res);
									}
                                  });
				return _dfd.promise();
			},
			// 2021.5 - 1100093 merge: 2020.3.4 - 1081168 Eric, 傳送公文前確認彙併辦子文已封裝
			getCOMDocMergeStatus : function(artifact, orgNo, docNo, msgId, mainDocNo, mainDocMsgId, flags, options) {
				var _dfd = $.Deferred();
				
				var wsFuncName = 'GetCOMDocMergeStatus';
				var wsUrl = (options && options.url) ? options.url : theWebServices.url('fileiows');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-E- FileIOWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject({success:false, errMsg:'FileIOWS尚未設定服務網址URL'});
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
                }
                
				let sVal = localStorage.dev_testCOMDocMergeStatus;
				if (window.location.href.indexOf('docvip.fdat.com.tw')!==-1 && (typeof sVal==='string') && SSOUtil.isValueTrue(sVal)) {
					// enum { AMS_INVALID=-1, AMS_NONE=0, AMS_UNENVELOP_MERGEFLOW=1, AMS_UNENVELOP_REMOVEMERGEFLOW=2, AMS_UNENVELOP_REPLACEOLD=4 };
					let res = {
						success: true,
						mergeStateCode: 1,
						removeTmpContent: false,
						errCode: '',
						errMsg: '',
					};
					_dfd.resolve(res);
					return _dfd.promoise();
				}

                var params = new SOAPClientParameters(), res;
				params.add('argArtifact', artifact);
				params.add('argOrgNo', orgNo);
				params.add('argDocNo', docNo);
				params.add('argMsgId', msgId);
				params.add('argMainDocNo', mainDocNo);
				params.add('argMainDocMsgId', mainDocMsgId);
				params.add('argFlags', flags);
				                
                SOAPClient.invoke(wsUrl, wsFuncName, params, async,
                                  function(rslt) {
                                    theLogger.log('-I- FileIOWS.' + wsFuncName + ' returns:');
                                    theLogger.log(rslt);
                                    if (typeof rslt === 'object') {
										res = {};
										if (rslt.m_bSuccess===true) {
											res.success = true;
											res.mergeStateCode = rslt.mergeStateCode;
											res.removeTmpContent = rslt.removeTmpContent;
											res.errCode = res.errMsg = '';
											_dfd.resolve(res);
										}
										else {
											res.success = false;
											res.errCode = -1;
											res.errMsg = rslt.m_strErrMsg;
											_dfd.reject(res);
										}
									}
									else {
                                        _dfd.reject({success:false, errCode:-1000, errMsg:'叫用FileIOWS.' + wsFuncName + ' 時發生錯誤!(內部錯誤)'});
                                    }
                                  });
				/*
				 * res 欄位:
				 * success : boolean, true / false
				 * toBeSigned : 作業成功回傳的待簽核資料, Bese64編碼過的字串.
				 * errCode : 發生錯誤時的錯誤代碼.
				 * errMsg : 錯誤說明.
				 */
				return _dfd.promise();
			},
			// 2021.5 - 1100093 merge: 2020.3.4 - 1081168 Eric, 傳送公文前封裝子文彙併辦流程
			updateCOMDocEnvelope : function(artifact, docNo, msgId, mainDocNo, mainDocMsgId, flags, orgNo, pincode, options) {
				var _dfd = $.Deferred();
				
				var wsFuncName = 'UpdateCOMDocEnvelope';
				var wsUrl = (options && options.url) ? options.url : theWebServices.url('fileiows');
                if (!wsUrl || wsUrl.length===0) {
                    theLogger.error('-E- FileIOWS.' + wsFuncName + ' was invoked, but WS\'s url was missing!');
                    _dfd.reject({success:false, errMsg:'FileIOWS尚未設定服務網址URL'});
					return _dfd.promise();
                }
				
				var async = false;
				if (options && (typeof options.async !== 'undefined') && (options.async===true)) {
					async = true;
                }

				let sVal = localStorage.dev_testCOMDocMergeStatus;
				if (window.location.href.indexOf('docvip.fdat.com.tw')!==-1 && (typeof sVal==='string') && SSOUtil.isValueTrue(sVal)) {
					// enum { AMS_INVALID=-1, AMS_NONE=0, AMS_UNENVELOP_MERGEFLOW=1, AMS_UNENVELOP_REMOVEMERGEFLOW=2, AMS_UNENVELOP_REPLACEOLD=4 };
					let res = {
						success: true,
						toBeSigned: 'M9UDbjOKyPCWAgZDm9VcWyBAfPJleSsso21HvFFAOnE=',
						errCode: '',
						errMsg: '',
					};
					_dfd.resolve(res);
					return _dfd.promoise();
				}
                
                var params = new SOAPClientParameters(), res;
                params.add('argArtifact', artifact);
				params.add('argDocNo', docNo);
				params.add('argMsgId', msgId);
				params.add('argMainDocNo', mainDocNo);
				params.add('argMainDocMsgId', mainDocMsgId);
				params.add('argFlags', flags);
				params.add('argOrgNo', orgNo);
				params.add('argPincode', pincode);
                
                SOAPClient.invoke(wsUrl, wsFuncName, params, async,
                                  function(rslt) {
                                    theLogger.log('-I- FileIOWS.' + wsFuncName + ' returns:');
                                    theLogger.log(rslt);
                                    if (typeof rslt === 'object') {
										res = {};
										if (rslt.m_bSuccess===true) {
											res.success = true;
											res.toBeSigned = rslt.RtnStr;
											res.errCode = res.errMsg = '';
											_dfd.resolve(res);
										}
										else {
											res.success = false;
											res.errCode = -1;
											res.errMsg = rslt.m_strErrMsg;
											res.toBeSigned = '';
											_dfd.reject(res);
										}
									}
									else {
                                        _dfd.reject({success:false, errCode:-1000, errMsg:'叫用FileIOWS.' + wsFuncName + ' 時發生錯誤!(內部錯誤)'});
                                    }
                                  });
				/*
				 * res 欄位:
				 * success : boolean, true / false
				 * toBeSigned : 作業成功回傳的待簽核資料, Bese64編碼過的字串.
				 * errCode : 發生錯誤時的錯誤代碼.
				 * errMsg : 錯誤說明.
				 */
				return _dfd.promise();
			},
		};
	}
	
	if (typeof (theSSO.MP.todolist) === "undefined") {
		if (typeof _standalone=='boolean' && _standalone===true) {
			theSSO.MP.todolist = new ToDoList_AJAX();
		}
		else {
			theSSO.MP.todolist = new ToDoList();
		}
		
		theSSO.MP.todolist.folderScrolls = [];
	}
})(jQuery);

/* 2014.4 - 封裝 RTCMsg 內的待辦項目內容及操作
 *  待辦項目可能有二筆以上, 此時subMsg為array型別.
 */
/*function RTCMsgItems(subMsg) {
	var _rawSubMsg = subMsg;
	var _subMsg = [];
	
	function _getSubMsgCount() {
		return _subMsg.length;
	};
	
	function _getMsgItem(msgId) {
		var key;
		for(key in _subMsg) {
			var item = _subMsg(key);
			if (item.getMsgId()===msgId) {
				return item;
			}
		}
		return null;
	}*/
	
	/*
	 * 將 SubMsg內的單一項目轉換為物件 (assoicate with methods)
	 */
	/*function RTCMsgItem(rawMsg) {
		var _rawMsg = rawMsg;
		
		function _getActionType() {
			return _rawMsg.ActionType;
		}
		
		function _isDraft() {
			var sDraft = _rawMsg.Draft.toLowerCase();
			if (sDraft==='true') {
				return true;
			}
			else {
				return false;
			}
		}
		
		function _isSuccess() {
			var sSuccess = _rawMsg.Success.toLowerCase();
			if (sSuccess==='true') {
				return true;
			}
			else {
				return false;
			}
		}
		
		function _getMsgId() {
			return _rawMsg.MsgId;
		}
		
		function _getTaskType() {
			return _rawMsg.TaskType;
		}
		
		this.isDraft = _isDraft;
		this.getActionType = _getActionType;
		this.isSuccess = _isSuccess;
		this.getMsgId = _getMsgId;
		this.getTaskType = _getTaskType;
		
		return this;
	}*/
	
	
	/*
	 * 將 SubMsg 內容轉換為 物件Array
	 */
	/*function _setupSubMsg(rawSubMsg) {
		var key;
		if (typeof rawSubMsg === 'undefined')
			return false;
		
		if (Array.isArray(rawSubMsg)) {
			for(key in rawSubMsg) {
				var _rawItem = rawSubMsg[key];
				var item = new RTCMsgItem(_rawItem);
				if (!!item) {
					_subMsg.push(item);
				}
			}
		}
		return true;
	}
	
	if (!_setupSubMsg(_rawSubMsg)) {
		return null;
	}
	
	this.getSubMsgCount = _getSubMsgCount;
	this.getMsgItem = _getMsgItem;
	return this;
};*/

/* Wrapper object for 公文基資(ODWMSG/ODWDCM)
 * 提供下列函式
 * get(target, fieldname) : 取得欄位值, target->'ODWMSG'/'ODWDCM', fieldnames->array of 欄位名稱
 * set(target, fieldsets): 設定欄位值, target->'ODWMSG'/'ODWDCM', sets->array of fieldSet
 * getODWMSG(): 取得 ODWMSG 物件
 * getODWDCM(): 取得 ODWDCM 物件
 */
function MPDocObj(rawObj) {
	var that = null;
	
	var _docObj = null;
	if (typeof rawObj === 'string') {
		_docObj = JSON.parse(rawObj);
	}
	else {
		_docObj = rawObj;
	}
	
	that = _docObj;
	that.ODWWKF = null;
	
	/* for SIGN_TYPE ="E", "P" */
	var _mapForUpdate = [
		{ attr: 'alarmLMT', nodeName: 'MSG_ALM_LMT' }, 
		{ attr: 'alarmTime', nodeName: 'ALARM_TIME' }, 
		{ attr: 'appRoleId', nodeName: 'APP_ROLE_ID' },
		{ attr: 'appUserId', nodeName: 'APP_USER_ID' },
		{ attr: 'appUserName', nodeName: 'APP_USER_NAME' },
		
		{ attr: 'msgId', nodeName: 'MSG_ID'}, // 2016.12.7 - 補缺漏
		{ attr: 'docNo', nodeName: 'DOC_NO'},
		{ attr: 'docState', nodeName: 'DOC_STATE' }, 
		{ attr: 'dueDate', nodeName: 'DUE_DATE' },
		{ attr: 'fromOUName', nodeName: 'FROM_OU' },  // 送文單位
		
		/*{ attr: 'ICOUId', nodeName: 'INCHARGE_OU'},
		 *{ attr: 'ICOUName', nodeName: 'IC_OU_NAME'},
		 *{ attr: 'ICUserId', nodeName: 'IC_USER_ID'},
		 *{ attr: 'ICUserName', nodeName: 'IC_USER_NAME'},
		 */
		
		{ attr: 'outLMT', nodeName: 'MSG_OUT_LMT' }, 
		{ attr: 'secret', nodeName: 'SECRETE' }, 
		{ attr: 'speed', nodeName: 'SPEED' }, 
		
		{ attr: 'rejectUserName', nodeName: 'REJECT_USER_NAME' },
		{ attr: 'subject', nodeName: 'SUBJECT' },
		{ attr: 'fromSubject', nodeName: 'FROM_SUBJECT' },
		
		{ attr: 'tmpCert', nodeName: 'TMP_CER' },
		{ attr: 'toOUId', nodeName: 'TO_OU_ID' },  // 傳送至
		{ attr: 'toOUName', nodeName: 'TO_OU_NAME' },
		
		{ attr: 'toRoleId', nodeName: 'TO_ROLE_ID' },
		{ attr: 'toRoleName', nodeName: 'TO_ROLE_NAME' },
		{ attr: 'toUserId', nodeName: 'TO_USER_ID' },
		{ attr: 'toUserName', nodeName: 'TO_USER_NAME' },
		{ attr: 'txName', nodeName: 'TX_NAME' }, // 異動別
		{ attr: 'rcvDate', nodeName: 'RCV_DATE' },	// 2022.4.19	Leslie[1110064]	信保新增收創文日期
		//1110927	Leslie[1110889]	新增欄位
		{ attr: 'keyWord', nodeName: 'KEY_WORD' },
		{ attr: 'taType', nodeName: 'TA_TYPE' },
		{ attr: 'MOCSdocPty', nodeName: 'MOCS_DOCPTY' },
		//1111122 Kevin 1111287 新增流程
		{ attr: 'docProc', nodeName: '' }
	];
		
	// 取得欄位值!
	function _get(target, fieldname) {
		var rslt;
		var i = 0, name = '', value;
		var srcObj = _docObj.ODWMSG;
		if (target.search('ODWDCM')!==-1) {
			srcObj = _docObj.ODWDCM;
		}
		
		if (typeof srcObj === 'undefined' || srcObj===null) {
			theLogger.error('-ERR- target Object: [' + target + '] 未定義/初始化!');
			return null;
		}
		
		if (typeof fieldname === 'string') {
			value = srcObj[fieldname];
			rslt = value;
		}
		else if (Array.isArray(fieldname)) { // 2019.9.16 - 1080339 Eric, $.isArray => Array.isArray()
			rslt = {};
			for (i=0; i<fieldname.length; i++) {
				name = fieldname[i];
				value = srcObj[name];
				if (typeof value === 'undefined') {
					value = null;
				}
				rslt[name] = value;
			}	
		}
		
		return rslt;
	}
	
	/* 設定欄位值!
	 *
	 * filedSets範例:
	 * fieldSets = [
	 *	{ fieldname : 'TO_OU_ID',  value : valueObj1 },
	 *	{ fieldname : 'TO_OU_NAMe',  value : valueObj2 }
	 * ]
	 */
	function _set(actorId, target, fieldSets) {
		var set;
		var srcObj = _docObj.ODWMSG;
		if (target.search('ODWDCM')!==-1) {
			srcObj = _docObj.ODWDCM;
		}
		
		if (typeof srcObj === 'undefined' || srcObj===null) {
			theLogger.error('-ERR- target Object: [' + target + '] 未定義/初始化!');
			return false;
		}
		
		var mapItem = null;
		var i = 0, j = 0;
		for (i=0; i<fieldSets.length; i++) {
			set = fieldSets[i];
			if (!!set && typeof set.value !=='undefined') {
				srcObj[set.fieldname] = set.value;
				
				// update _docObj attributes
				for (j=0; j<_mapForUpdate.length; j++) {
					mapItem = _mapForUpdate[j];
					if (typeof _docObj[mapItem.attr] !== 'undefined' && mapItem.nodeName===set.fieldname) {
						_docObj[mapItem.attr] = set.value;
						break;
					}
				}
			}
			else {
				throw new Error('欄位:' + set.fieldname + '的設定值未定義!');
			}
		}

		return true;
	}
	
	/* 設定欄位值!
	 * actorId: 觸發異動的source id
	 * target: 'ODWMSG' / 'ODWDCM'
	 * fieldSets: 異動欄位清單及異動值
	 * 
	 * filedSets範例:
	 * fieldSets = [
	 *	{ fieldname : 'TO_OU_ID',  value : valueObj1 },
	 *	{ fieldname : 'TO_OU_NAMe',  value : valueObj2 }
	 * ]
	 */
	function _set2(actorId, target, fieldSets) {
		var set;
		var srcObj = _docObj.ODWMSG;
		if (target.search('ODWDCM')!==-1) {
			srcObj = _docObj.ODWDCM;
		}
		
		if (typeof srcObj === 'undefined' || srcObj===null) {
			theLogger.error('-ERR- target Object: [' + target + '] 未定義/初始化!');
			return false;
		}
		
		var mapItem = null;
		var i = 0, j = 0;
		
		if (fieldSets.length) {
			for (i=0; i<fieldSets.length; i++) {
				set = fieldSets[i];
				if (!!set && (typeof set.value !=='undefined')) {
					srcObj[set.fieldname] = set.value;
					
					// update _docObj attributes
					for (j=0; j<_mapForUpdate.length; j++) {
						mapItem = _mapForUpdate[j];
						if (typeof _docObj[mapItem.attr] !== 'undefined' && mapItem.nodeName===set.fieldname) {
							_docObj[mapItem.attr] = set.value;
							break;
						}
					}
				}
				else {
					throw new Error('欄位:' + set.fieldname + '的設定值未定義!');
				}
			}
		}
		else if (typeof fieldSets == 'object') {
			var name = '';
			for(name in fieldSets) {
				if (fieldSets.hasOwnProperty(name) && (typeof srcObj[name]!=='undefined') && srcObj[name]!==null) {
					srcObj[name] = fieldSets[name];
					
					// update _docObj attributes
					for (j=0; j<_mapForUpdate.length; j++) {
						mapItem = _mapForUpdate[j];
						if (typeof _docObj[mapItem.attr] !== 'undefined' && mapItem.nodeName===name) {
							_docObj[mapItem.attr] = fieldSets[name];
							break;
						}
					}
				}
			}
		}
		return true;
	}
	
	function _getODWMSG() {
		return _docObj.ODWMSG;	
	}
	
	function _getODWDCM() {
		return _docObj.ODWDCM;
	}

	/*
	 * 目的: 產生ODWMSG的XML DOM object (this is a SSOUtil method)
	 */
	function _getODWMSG_XMLDOMObj() {
		if (!_docObj) {
			return null;
		}
		
		var ODWMSG_Obj = _docObj.ODWMSG;
		if (!ODWMSG_Obj) {
			return null;
		}
		
		// update docObj attributes to ODWMSG
		var mapItem = null;
		var i = 0;
		var xmlDoc, propertyName, value;
		for (i=0; i<_mapForUpdate.length; i++) {
			mapItem = _mapForUpdate[i];
			if (typeof docObj[mapItem.attr] !== 'undefined') {
				ODWMSG_Obj[mapItem.nodeName] = _docObj[mapItem.attr];
			}
			else {
				theLogger.warn('-W- docObj.' + mapItem.attr + 'attribute is undefined!');	
			}
		}
		
		xmlDoc = document.implementation.createDocument('', 'ODWMSG', null);
		for(propertyName in ODWMSG_Obj) {
			if (ODWMSG_Obj.hasOwnProperty(propertyName)) {
				value = ODWMSG_Obj[propertyName];
				
				var elem = xmlDoc.createElement(propertyName);
				var txtElem = xmlDoc.createTextNode(value);
				elem.appendChild(txtElem);
				xmlDoc.documentElement.appendChild(elem);
			}
		}
		
		var serializer = new XMLSerializer();
		theLogger.debug(serializer.serializeToString(xmlDoc));
		
		return xmlDoc;
	}
	
	/*
	 * 目的: 產生ODWMSG的XML DOM object (this is a SSOUtil method)
	 */
	function _getODWDCM_XMLDOMObj() {
		var ODWDCM_Obj = _docObj.ODWDCM;
		if (typeof ODWDCM_Obj === 'undefined' || !ODWDCM_Obj) {
			theLogger.warn('-W- _getODWDCM_XMLDOMObj() ODWDCM_Obj is null');
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
		var xmlDoc = document.implementation.createDocument('', 'root', null);
		var xmlItem = xmlDoc.createElement('item');
		for(var propertyName in ODWDCM_Obj) {
			if (!ODWDCM_Obj.hasOwnProperty(propertyName)) {
				continue;
			}
			
			// 2014.3 - COM_NO欄位內容有子欄位, 應特別處理!
			if (propertyName==='COM_NO') {
				elemComNo = null; comNoObj = null;
				comNoObj = ODWDCM_Obj[propertyName];
				// COM_NO object 為一 array.
				if ((comNoObj !== null) && (comNoObj.length>=1)) {
					elemComNo = xmlDoc.createElement(propertyName);
					for(idx=0; idx<comNoObj.length; idx++) {
						comDocObj = comNoObj[idx];
						elemComDoc = xmlDoc.createElement('DOC'); // 2016.12.6 - 應為'DOC'而非'DOC_NO'
						for(var propName in comDocObj) {
							if (comDocObj.hasOwnProperty(propName)) {
								value = null; elem = null; txtElem = null;
								elem = xmlDoc.createElement(propName);
								value = comDocObj[propName];
								txtElem = xmlDoc.createTextNode(value);
								elem.appendChild(txtElem);
								elemComDoc.appendChild(elem);
							}
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
	 * 目的: 產生ODWMSG的XML DOM object (this is a SSOUtil method)
	 */
	function _getODWWKF_XMLDOMObj() {
		var ODWWKF_Obj = that.ODWWKF;
		if (typeof ODWWKF_Obj === 'undefined' || !ODWWKF_Obj) {
			theLogger.warn('-W- _getODWWKF_XMLDOMObj() ODWWKF_Obj is null');
			return null;
		}
		
		if (SSOUtil.typeOf(ODWWKF_Obj)!=='array') {
			theLogger.warn('-W- _getODWWKF_XMLDOMObj() ODWWKF_Obj is not an array');
			return null;
		}
		
		/*
		 * ODWWKF-XX.XML檔案layout:
		 * <root>
		 *   <item>
		 *    <欄位1>...</欄位1>
		 *    <欄位2>...</欄位2>
		 *    ...
		 *   </item>
		 * </root>
		 */
		var elemCoOptions, elemCoOption, coOptionsObj, coOptionObj;
		var elem, value, txtElem;
		var item=null;
		var i=0, idx = 0;
		var xmlDoc = document.implementation.createDocument('', 'root', null);
		var xmlItem = null;
		var propertyName=null, propName=null;
		for(i=0; i<ODWWKF_Obj.length; i++) {
			item = ODWWKF_Obj[i];
			
			xmlItem = xmlDoc.createElement('item');	
			for(propertyName in item) {
				if (!item.hasOwnProperty(propertyName))
					continue;
				
				// COWORK_OPTIONS欄位內容有子欄位, 應特別處理!
				if (propertyName=='COWORK_OPTIONS') {
					elemCoOptions = null;
					coOptionsObj = null;
					coOptionsObj = item[propertyName];
					// COWORK_OPTIONS object 為一 array.
					if ((SSOUtil.typeOf(coOptionsObj)=='array') && (coOptionsObj !== null) && (coOptionsObj.length>=1))
					{
						elemCoOptions = xmlDoc.createElement(propertyName);
						for(idx=0; idx<coOptionsObj.length; idx++)
						{
							coOptionObj = coOptionsObj[idx];
							elemCoOption = xmlDoc.createElement('OPTIONS');
							for(propName in coOptionObj)
							{
								if (coOptionObj.hasOwnProperty(propName)) {
									value = null; elem = null; txtElem = null;
									elem = xmlDoc.createElement(propName);
									value = coOptionObj[propName];
									txtElem = xmlDoc.createTextNode(value);
									elem.appendChild(txtElem);
									elemCoOption.appendChild(elem);
								}
							}
							elemCoOptions.appendChild(elemCoOption);
						}
						xmlItem.appendChild(elemCoOptions);
					}
					else {
						elemCoOptions = xmlDoc.createElement(propertyName);
						xmlItem.appendChild(elemCoOptions);
					}
				}
				else {
					value = null; elem = null; txtElem = null;
					value = item[propertyName];
					elem = xmlDoc.createElement(propertyName);
					txtElem = xmlDoc.createTextNode(value);
					elem.appendChild(txtElem);
					xmlItem.appendChild(elem);
				}
			}
			xmlDoc.documentElement.appendChild(xmlItem);	
		}
		
		var serializer = new XMLSerializer();
		theLogger.debug(serializer.serializeToString(xmlDoc));
		
		return xmlDoc;
	}
	
	function _isDraftDoc(sso_const) {
		var min_draft_id = 100, max_draft_id = 2000;
		if (typeof sso_const === 'undefined') {
			max_draft_id = sso_const.DRAFT_MSG_ID_END;
			min_draft_id = sso_const.DRAFT_MSG_ID_START;
		}
		
		var msgId='', msgIdInfo = [], msgIdPure=-1;
		if(_docObj.signType=="E" || _docObj.signType=="P") {
			msgId = _docObj.msgId;
			if (!!msgId && msgId.length) {
				if (msgId.indexOf('_')!==-1) {
					msgIdInfo = msgId.split('_');
					if (msgIdInfo.length>=2) {
						msgIdPure = parseInt(msgIdInfo[0]);
						if (msgIdPure<=max_draft_id && msgIdPure>=min_draft_id) {
							return true;
						}
					}
				}
				else {
					msgIdPure = parseInt(msgId);
					if (msgIdPure<=max_draft_id && msgIdPure>=min_draft_id) {
						return true;
					}
				}
			}
			
		}
		return false;
	}
	
	/* 載入公文的ODWWKF-NN.XML檔內容 */
	function _initODWWKF() {
		function _makeCoworkOptionObj(optionNode) {
			var optionItem=null, len=0, node=null;
			if (!!optionNode) {
				optionItem = {};
				len = optionNode.childNodes.length;
				for(var i=0; i<len; i++) {
					node = optionNode.childNodes[i];
					if (node.nodeType==1) { // 只取child elements
						optionItem[node.nodeName] = SSOUtil.xml_getNodeValue(node);
					}
				}
				return optionItem;
			}
			return null;
		}
		
		function _makeWWKF(rootNode) {
			if (!!rootNode) {
				var wwkf = [];
				var wwkf_xns = $(rootNode).find('item');
				var wwkfItem=null, wwkf_xn=null;
				var i=0, j=0, k=0, len=0, node=null;
				
				var $coOptionNodes=null, cntCoOption=0, arrCoworkOption=null;
				var coOptionNode=null, coOptionObj=null;
				for(i=0; i<wwkf_xns.length; i++) {
					wwkf_xn = wwkf_xns[i];
					wwkfItem = {};
					len = wwkf_xn.childNodes.length;
					for(j=0; j<len; j++) {
						node = wwkf_xn.childNodes[j];	
						if (node.nodeType==1) { // 只取child elements
							if (node.nodeName==='COWORK_OPTIONS') {
								// [分會]異動別有子項目
								$coOptionNodes = $(node).find('OPTIONS');
								cntCoOption = $coOptionNodes.length;
								arrCoworkOption = [];
								for(k=0; k<cntCoOption; k++) {
									coOptionNode = $coOptionNodes[k];
									coOptionObj = _makeCoworkOptionObj(coOptionNode);
									if (coOptionObj!==null) {
										arrCoworkOption.push(coOptionObj);
									}
								}
								
								if (arrCoworkOption.length) {
									wwkfItem[node.nodeName] = arrCoworkOption;
								}
								else {
									wwkfItem[node.nodeName] = [];
								}
							}
							else {
								wwkfItem[node.nodeName] = SSOUtil.xml_getNodeValue(node);
							}
						}
					}
					
					if (typeof wwkfItem.TX_NAME=='string' && wwkfItem.TX_NAME.length) {
						wwkf.push(wwkfItem);
					}
				}	
				return wwkf;
			}
			return null;
		}
	   
		// 下載ODWWKF-XX.XML
		// 叫用WebFileIO取得ODWWKF-00.XML
		var fileIOWSUrl = _docObj.fileIOWS;
		var fileStoragePath = _docObj.fileStoragePath;
		var fileSubDir = _docObj.fileSubDir;
		var odwwkf = _getODWWKF();
	   
	    var thread = _get('ODWMSG', 'THREAD');
		if (typeof thread == 'string' && thread.length==1) {
			thread = '0' + thread;
		}
		
		if (typeof thread !== 'string' || thread.length!==2) {
			thread = '00';
		}
		
		var dirPath = fileStoragePath + '\\' + fileSubDir;
		var fileName = 'ODWWKF-' + thread + '.XML';
		theLogger.log('ODWWKF file path=' + dirPath + ', filename=' + fileName);
	   
		var wfio = new WebFileIO(fileIOWSUrl, _docObj.ownUserId, localStorage.Artifact);
		var wwkfXML = null;
		wfio.download(dirPath, fileName, {
			async : false,
			success: function(fil, res) {
				if(fil !== undefined) {
					wwkfXML = fil;
				}
				else {
					theLogger.log('-I- WebFileIO呼叫成功但夾檔資料未下載. 檔案:' + fileName);
				}
			},
			error: function(errorText) {
				theLogger.error(errorText);
			}
		});
	   
		// parse ODWWKF XML into a JS Object
		if (wwkfXML) {
			var root = $(wwkfXML).find('root');
			if (root.length>0) {
				that.ODWWKF = _makeWWKF(root[0]);
			}
		}
		
		if (typeof that.ODWWKF =='undefined') {
			that.ODWWKF = [];
		}
	}
	
	function _updateODWWKF(newWWKF) {
		if (typeof newWWKF=='object' && SSOUtil.typeOf(newWWKF)=='array') {
			that.ODWWKF = newWWKF;
			that.wwkfUpdated = true;
		}
	}
	
	//2017.11.6 - 1060748 bug-fix (@IE)
	function _updateODWWKF_Str(sNewWWKF) {
		if (typeof sNewWWKF=='string') {
			if (sNewWWKF.length==0) {
				that.ODWWKF = null;
				that.wwkfUpdated = true;
			}
			else {
				that.ODWWKF = JSON.parse(sNewWWKF);
				that.wwkfUpdated = true;
			}
		}
	}

	// 2016.9.05 - 由文稿指定會辦單位異動預排流程
	function _updateWWKFCoWorkFlow(arrCoworkUnit) {
		function _isUnitOfficer(roleId) {
			if (typeof roleId != 'string') {
				roleId = '';
			}
			if (roleId.length && (sso_const.FIRSTCLASS_OFFICER.indexOf(roleId)!==-1)) {
				return true;
			}
			return false;
		}

		function _groupWWKFFlow(_docObj, returnToICUserTX) {
			if (typeof returnToICUserTX !== 'string') {
				returnToICUserTX = '';
			}

			var beforeInner = [], // 組室內會辦前流程(科長前)
				afterInner= [], // 組室內會辦後流程
				delInner=[], // 移除之組室內會辦流程(未執行)
				before= [], // 組室外會辦前流程(科長前)
				after= [], // 組室外會辦後流程
				del= []; // 移除之組室外會辦流程(未執行)
			
			var docOwnOUId = _docObj.ownOUId;
			if (typeof docOwnOUId!=='string' || docOwnOUId.length===0) {
				return null;
			}
			var docOwnOUId_fc = (docOwnOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN) ? docOwnOUId.substring(0, sso_const.FIRSTCLASS_UNITNO_LEN) : docOwnOUId;
			
			var ICOUId = _docObj.ICOUId;
			var ICUserId = _docObj.ICUserId;

			// sso_const.FIRSTCLASS_UNITNO_LEN
			var ownOUId='', ownOUId_fc='', numOUId=0;
			var wwkf = _docObj.ODWWKF;
			var i=0, item=null, subitem=null, inner=false;
			for(i=0; i<wwkf.length; i++) {
				item = wwkf[i];
				subitem = null;
				
				ownOUId = item.OWN_OU_ID;
				ownOUId_fc = (ownOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN) ? ownOUId.substring(0, sso_const.FIRSTCLASS_UNITNO_LEN) : ownOUId;
				
				if (SSOUtil.typeOf(item.COWORK_OPTIONS)=='array' && item.COWORK_OPTIONS.lengt) {
					inner = false;
					submitem = item.COWORK_OPTIONS[0];
					
					if (afterInner.length===0 && before.length===0 && after.length===0 && del.length===0) {
						// 組室長官之前,且尚未出組室...
						inner = true;
					}
					
					/* 分會流程點, 除非已執行, 否則一律刪除
					 * 組室內已執行流程, 保留, 會辦單位之前
					 */
					if (item.SIGN_F=='Y') {
						// 已完成之分會流程加入之清單 => 組室內: listBeforeInner, 組室外: listBefore
						if (inner) {
							beforeInner.push(item);
						}
						else {
							before.push(item);
						}
					}
					else {
						// 未完成之分會流程加入之清單 => 組室內: listDelInner, 組室外: listDel
						if (inner) {
							delInner.push(item);
						}
						else {
							del.push(item);
						}
					}
					continue;
				}
				
				if (docOwnOUId_fc==ownOUId_fc) { // 相同一級單位項目
					if (item.SIGN_F=='Y') { // 組室內已執行流程, 保留, 會辦單位之前
						beforeInner.push(item);
						continue;
					}
					if (ownOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN && ownOUId!=docOwnOUId) { // 組室內會辦單位, 刪除
						delInner.push(item);
						continue;
					}
					if (returnToICUserTX.length && item.TX_NAME==returnToICUserTX &&
						ownOUId==_docObj.ICOUId && item.OWN_USER_ID==_docObj.ICUserId) { // 回原承辦人流程, 刪除..
						delInner.push(item);
						continue;
					}
					if (_isUnitOfficer(item.OWN_ROLE_ID)) { // 組室一級單位長官, 保留, 會辦單位之後
						afterInner.push(item);
					}
					else { // 組室一般簽核人員, 保留, 會辦單位之前
						beforeInner.push(item);
					}
				}
				else { // 不同一級單位項目
					numOUId = parseInt(ownOUId_fc);
					if (!isNaN(numOUId) && numOUId>=sso_const.VIRTUALUNIT_NUM) { // 虛擬及決行單位[95以上], 保留, 會辦單位之後
						after.push(item);
					}
					else if (!isNaN(numOUId)) {
						if (item.SIGN_F=='Y') { // 已執行過之流程，一律保留, 會辦單位前
							before.push(item);
						}
						else { // 會辦單位, 刪除
							del.push(item);
						}
					}
				}
			}
			
			return {
				'beforeInner': beforeInner, // 組室內會辦前流程(科長前)
				'afterInner': afterInner, // 組室內會辦後流程
				'delInner': delInner, // 移除之組室內會辦流程(未執行)
				'before': before, // 組室外會辦前流程(科長前)
				'after': after, // 組室外會辦後流程
				'del': del,
			};
		}
		
		function _groupWWKFFlow_CoWorkOnly(_docObj) {
			var all=[],
				inner = [], // 組室內會辦前流程(科長前)
				outer = [], // 組室內會辦後流程
				AfterApp = [];//1120724 David 1120284 後會流程
				
			var docOwnOUId = _docObj.ownOUId;
			if (typeof docOwnOUId!=='string' || docOwnOUId.length===0) {
				return null;
			}
			var docOwnOUId_fc = (docOwnOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN) ? docOwnOUId.substring(0, sso_const.FIRSTCLASS_UNITNO_LEN) : docOwnOUId;
			
			var wwkf = _docObj.ODWWKF;
			if (SSOUtil.typeOf(wwkf)!=='array') {
				return null;
			}
			
			// sso_const.FIRSTCLASS_UNITNO_LEN
			var ownOUId='', ownOUId_fc='', numOUId=0;
			var i=0, j=0, item=null, subitem=null;
			for(i=0; i<wwkf.length; i++) {
				item = wwkf[i];

				if (item.SIGN_F=='Y') {
					continue;
				}
				
				ownOUId = item.OWN_OU_ID;
				ownOUId_fc = (ownOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN) ? ownOUId.substring(0, sso_const.FIRSTCLASS_UNITNO_LEN) : ownOUId;
				if (ownOUId.length && docOwnOUId_fc!=ownOUId_fc) { // 不同一級單位項目
					numOUId = parseInt(ownOUId_fc);
					if (isNaN(numOUId) || numOUId>=sso_const.VIRTUALUNIT_NUM) { // 虛擬及決行單位[95以上]
						continue;
					}
					all.push(item);
				}
				else if (ownOUId.length) { // 相同一級單位
					if (ownOUId==docOwnOUId) { // 相同單位流程點, 不列入
						continue;
					}
					if (_isUnitOfficer(item.OWN_ROLE_ID)) { // 組室一級單位長官, 不列入
						continue;
					}
					if (ownOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN && docOwnOUId.length==sso_const.FIRSTCLASS_UNITNO_LEN) { // 目前在一級單位, 流程項目為二級單位 => 加入
						all.push(item);
						continue;
					}
					if (docOwnOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN && ownOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN &&
						ownOUId!==docOwnOUId) { // 目前在二級單位，流程項目為二級之不同單位，加入
						all.push(item);
					}
				}
				else if (SSOUtil.typeOf(item.COWORK_OPTIONS)=='array' && item.COWORK_OPTIONS.length) {
					all.push(item);
					continue;
				}
			}
			
			var isInner = false, subOwnOUId='', subOwnOUId_fc='';
			for(i=0; i<all.length; i++) {
				item = all[i];
				ownOUId = item.OWN_OU_ID;
				ownOUId_fc = (ownOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN) ? ownOUId.substring(0, sso_const.FIRSTCLASS_UNITNO_LEN) : ownOUId;
				
				if(ownOUId.length && ownOUId_fc==docOwnOUId_fc) { // 組室內會辦單位(順會)
					inner.push(item); 
				}
				else if (item.TX_NAME == theSSO.User.EnvSettings.get('AOL_COWORK_TXNAME_AFTER_APPROVE')) {//1120724 David 1120284 紀錄原有的後會流程
					AfterApp.push(item); 
				}
				else if (SSOUtil.typeOf(item.COWORK_OPTIONS)!='array' ||  item.COWORK_OPTIONS.length===0) { // 組室外會辦單位(順會)
					outer.push(item); 
				}
				else if (SSOUtil.typeOf(item.COWORK_OPTIONS)=='array' && item.COWORK_OPTIONS.length) {
					isInner = false;
					for(j=0; j<item.COWORK_OPTIONS.length; j++) {
						subitem = item.COWORK_OPTIONS[j];
						subOwnOUId = subitem.OWN_OU_ID;
						subOwnOUId_fc = (subOwnOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN) ? subOwnOUId.substring(0, sso_const.FIRSTCLASS_UNITNO_LEN) : subOwnOUId;
						if (subOwnOUId_fc==docOwnOUId_fc) {
							isInner = true;
						}
						if (isInner) {
							inner.push(subitem);
						}
						else {
							outer.push(subitem);
						}
					}
				}
				
			}
			
			return {
				'inner': inner,
				'outer': outer,
				'AfterApp': AfterApp,//1120724 David 1120284 紀錄原有的後會流程
			};
		}
		
		function _groupNewCoworkFlow(_docObj, arrCoworkUnit) {
			var docOwnOUId = _docObj.ownOUId;
			if (typeof docOwnOUId!=='string' || docOwnOUId.length===0) {
				return null;
			}
			var docOwnOUId_fc = (docOwnOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN) ? docOwnOUId.substring(0, sso_const.FIRSTCLASS_UNITNO_LEN) : docOwnOUId;
			var ownOUId='', ownOUID_fc='';
			var i=0, unit=null;
			var orgNode = SSOUtil.getOrgNode(_docObj.sourceOrgNo);
			if (orgNode===null) {
				theLogger.error('ERROR! _groupNewCoworkFlow() 找不到機關代碼:' + _docObj.sourceOrgNo + '的OrgNo.');
				return null;
			}

			var listUnit = [], listInnerUnit = [];
			var listAfterAppUnit = [];//1120724 David 1120284 紀錄會稿單位內的後會單位
			for(i=0; i<arrCoworkUnit.length; i++)
			{
				unit = arrCoworkUnit[i];
				if (unit.value===null || unit.value.length===0) { //未給單位代碼
					ownOUId = SSOUtil.getOrgUnitNoByName(orgNode, unit.name); //getOrgUnitName
				}
				else {
					ownOUId = unit.value;
					unitName = SSOUtil.getOrgUnitName(orgNode, ownOUId);
					if (typeof unitName != 'string' || unitName.length===0) {
						theLogger.error('ERROR! _groupNewCoworkFlow() 無效的機關代碼:"' + ownOUId + '"');
						return null;
					}
				}
				
				if (typeof ownOUId=='string' && ownOUId.length>=sso_const.FIRSTCLASS_UNITNO_LEN && (ownOUId!=docOwnOUId)) { // 排除目前公文所在單位
					ownOUID_fc = (ownOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN) ? ownOUId.substring(0, sso_const.FIRSTCLASS_UNITNO_LEN) : ownOUId;
					
					//1120724 David 1120284 紀錄會稿單位內的後會單位
					if (typeof unit.type =='string' && unit.type == theSSO.User.EnvSettings.get('AOL_COWORK_TXNAME_AFTER_APPROVE')){
						listAfterAppUnit.push({unitNo:ownOUId, unitName:unit.name});
					}
					else if (ownOUID_fc!=docOwnOUId_fc) { // 不同一級單位 =>  加入組室外會辦單位
						listUnit.push({unitNo:ownOUId, unitName:unit.name});
					}
					else { // 相同一級單位
						if (ownOUId.length>sso_const.FIRSTCLASS_UNITNO_LEN) { // 只能會二級單位 => 加入組室內會辦單位
							listInnerUnit.push({unitNo:ownOUId, unitName:unit.name});
						}
					}
				}
			}
			return {
				'Units': listUnit,
				'inner': listInnerUnit,
				'AfterApp': listAfterAppUnit,//1120724 David 1120284 紀錄會稿單位內的後會單位
			};
		}
		
		function _confirmUpdateProcess(co_wwkf_new, confirmUpdate, enableAsyncFlow) {
			var _dfd = $.Deferred();
			if (confirmUpdate) {
				//1110318 David 1101388 考試院紙本簽核不需分會
				if(that.signType == "P" && SSO_CONFIG.OrgNickName == "EXAM")
					enableAsyncFlow = false;

				if ((co_wwkf_new.Units.length>1) && enableAsyncFlow) { // 2016.11.2 - [序469]大於一筆才問是否加入為分會!
					_promptCoworkFlowConfirmDlg()
					.then(function(rslt) {
						_dfd.resolve(rslt);
					})
					.fail(function(rslt) {
						_dfd.reject(rslt);
					});
				}
				else {
					var dlgRslt = confirm('是否將公文製作稿件中會辦單位資訊新增至公文預排流程中?');	//2017.01.24	Leslie	BugFix comfirm→confirm
					var doUpdateProcess = true;		//2017.01.24	Leslie	補上宣告
					if (!dlgRslt) {
						doUpdateProcess = false;
					}
					_dfd.resolve({success:true, doUpdateProcess:doUpdateProcess, 'syncFlow':syncFlow});	//2017.01.24	Leslie	補上回傳結果
				}
			}
			else {
				syncFlow = true;
				if ((co_wwkf_new.Units.length>1) && typeof theSSO.User.EnvSettings.AOL_DEFAULT_COWORK_FLOW_MODE=='string' && theSSO.User.EnvSettings.AOL_DEFAULT_COWORK_FLOW_MODE=='1') {
					syncFlow = false;
				}
				_dfd.resolve({success:true, doUpdateProcess:true, 'syncFlow':syncFlow});
			}
			return _dfd.promise();
		}
		
		function _promptCoworkFlowConfirmDlg() {
			var _dfd = $.Deferred();
			var defaultFlowType = 0;
			if (typeof theSSO.User.EnvSettings.AOL_DEFAULT_COWORK_FLOW_MODE=='string' && theSSO.User.EnvSettings.AOL_DEFAULT_COWORK_FLOW_MODE=='1') {
				defaultFlowType = 1;
			}
			
			var syncFlow = (defaultFlowType==1) ? false : true;
			var doUpdateProcess = true;
			var $theDlg = $('#confirmInsertCoWWKFDialog');
			
			$(document).on('popupafteropen', '#confirmInsertCoWWKFDialog', function(event, ui) {
				if (defaultFlowType==1) {
					// 預設為分會
					$theDlg.find('#r-choice-inscowork-1').prop('checked', false).checkboxradio('refresh');
					$theDlg.find('#r-choice-inscowork-2').prop('checked', true).checkboxradio('refresh');
				}
				else {
					$theDlg.find('#r-choice-inscowork-1').prop('checked', true).checkboxradio('refresh');
					$theDlg.find('#r-choice-inscowork-2').prop('checked', false).checkboxradio('refresh');
				}
			});
			
			$(document).on('popupcreate', '#confirmInsertCoWWKFDialog', function(event, ui) {
				// why not been called? ahhhhhh ahhhhh ahhhh....
			});
			
			// 結束後清除 selectmenu object
			$(document).on('popupafterclose', '#confirmInsertCoWWKFDialog', function(event, ui) {
				//setTimeout(function() {$theDlg.popup('destroy');}, 200);
			});
			
			$('#confirmInsertCoWWKFDialog #btn_InsCoWWKFCancel').on('click', function(){
				_dfd.resolve({success:true, doUpdateProcess:false});
				$('#confirmInsertCoWWKFDialog').popup('close');
			});
			
			$('#confirmInsertCoWWKFDialog #btn_InsCoWWKFDOK').on('click', function(){
				var asyn = $theDlg.find('#r-choice-inscowork-2').prop('checked'); // 2016.9.8 - bug-fix
				if (asyn) {
					syncFlow = false;
				}
				else {
					syncFlow = true;
				}
				var rslt = {success:true, 'doUpdateProcess':true, 'syncFlow':syncFlow};
				_dfd.resolve(rslt);
				$('#confirmInsertCoWWKFDialog').popup('close');
			});
			
			var _options = {corners: false, history: false, positionTo: 'window' }; 
			$theDlg.popup(_options);
			$('#confirmInsertCoWWKFDialog').popup('open', _options);
			SSOUtil.loading('hide');
			return _dfd.promise();
		}

		//1110430 David 1101388 新增傳入docObj物件
		//function _makeNewInnerItem(listInner, syncFlow, orgNo, errItems) {
		function _makeNewInnerItem(_docObj, listInner, syncFlow, orgNo, errItems) {
			// {unitNo:ownOUId, unitName:unit.name}
			var txName = '內會', coworkRoleId='OD16', coworkRoleName='分辦人員';
			//1110430 David 1101388 依簽核類型判斷傳送角色
			if(theAOL.docObj.signType == "P"){
				coworkRoleId = 'OD17';
				coworkRoleName = '登記桌';
			}
			var rootItem = null; // 原實作Note: 2011.5.13 - 組會內會辦一律用順會...
			
			var orgNode = SSOUtil.getOrgNode(orgNo);
			if (orgNode===null) {
				theLogger.error('ERROR! _makeNewInnerItem() OrgInfo找不到機關資訊[機關代碼=' + orgNo + ']');
				return [];
			}
			
			var listItem = [];
			var i=0; unit=null;
			
			// 取第一個項目以取得一級單位
			unit = listInner[0];
			var unitNo = unit.unitNo.length>sso_const.FIRSTCLASS_UNITNO_LEN ? unit.unitNo.substring(0, sso_const.FIRSTCLASS_UNITNO_LEN) : unit.unitNo; // 2017.8.8 - Eric Peng, bug-fix
			var $unit_xn = $(orgNode).find('Unit[UnitCode="' + unitNo + '"]');
			if ($unit_xn.length===0) {
				theLogger.error('ERROR! _makeNewInnerItem() OrgInfo找不到機關資訊找不到單位資訊[單位代碼=' + unitNo + ']');
				return [];
			}
			
			var $subunit_xn=null, subunit_xn=null, $role_xn=null;
			var roleName='';
			for(i=0; i<listInner.length; i++) {
				unit = listInner[i];
				$subunit_xn = $($unit_xn[0]).find('Unit[UnitCode="' + unit.unitNo + '"]');
				// 2021.10.18 - Eric, 聯合大學二代上線序35 bug-fix
				// if ($subnit_xn.length) {
				if ($subunit_xn.length) {
					$role_xn = $($subunit_xn[0]).find('Role[RoleNo="' + coworkRoleId + '"]');
					if ($role_xn.length) {
						roleName = SSOUtil.xml_getChildNodeValue($role_xn[0], 'RoleName');
						listItem.push({
							OWN_USER_ID: '',
							OWN_USER_NAME: '',
							OWN_OU_ID: unit.unitNo,
							OWN_OU_NAME: unit.unitName,
							OWN_ROLE_ID: coworkRoleId,
							OWN_ROLE_NAME: roleName,
							
							CREATE_BY: '',
							SEND_BY: '',
							SEND_TIME: '',
							ADDBY: '0', // 分會項目: '1'
							//1121024 David 內會類型應是2
							//RADIO_SELECTED_1: '1', // 分會項目: '3'
							RADIO_SELECTED_1: '2', // 分會項目: '3'
							SIGN_F: 'N',
							
							TX_NAME: txName,
						});
					}
					else {	// 2021.12.6 - 1101392 Eric, 若單位內無登記桌, 提示訊息並中止作業!
						if (typeof errItems!='undefined' && Array.isArray(errItems)) {
							errItems.push(unit.unitName);
						}
					}
				}
			}

			// 2021.12.6 - 1101392 Eric, 若單位內無登記桌, 提示訊息並中止作業!
			if (Array.isArray(errItems) && errItems.length) {
				return [];
			}
			
			if (typeof rootItem=='object' && rootItem!==null && listItem.length>1) {
				rootItem.COWORK_OPTIONS = listItem;
				return [rootItem];
			}
			else {
				return listItem;
			}
		}
		
		function _makeNewOuterItem(_docObj, listUnit, syncFlow, orgNo, returnToICUserTX, errItems) {
			// {unitNo:ownOUId, unitName:unit.name}
			var txName = '';
			var appUserId = _docObj.get('ODWMSG', 'APP_USER_ID');
			var appRoleId = _docObj.get('ODWMSG', 'APP_ROLE_ID');
			var coworkRoleId='OD16', coworkRoleName='分辦人員';
			//1110430 David 1101388 依簽核類型判斷傳送角色
			if(theAOL.docObj.signType == "P"){
				coworkRoleId = 'OD17';
				coworkRoleName = '登記桌';
			}
			var rootItem = null; // 原實作Note: 2011.5.13 - 組會內會辦一律用順會...
			if (!syncFlow && listUnit.length>1) {
				txName = '分會';
				rootItem = {
					OWN_USER_ID: '',
					OWN_USER_NAME: '',
					OWN_OU_ID: '',
					OWN_OU_NAME: '',
					OWN_ROLE_ID: '',
					OWN_ROLE_NAME: '',
					
					CREATE_BY: '',
					SEND_BY: '',
					SEND_TIME: '',
					ADDBY: '1', // 分會項目: '1'
					RADIO_SELECTED_1: '3', // 分會項目: '3'
					SIGN_F: 'N',
					
					TX_NAME: txName,
				};
			}
			else {
				var menuRuleAOL = SSOUtil.getMenuRule_Obj(localStorage.Artifact, orgNo, 'E');
				if ((typeof appUserId=='string' && appUserId.length) ||
					(typeof appRoleId=='string' && appRoleId.length)) {
					txName = menuRuleAOL.ruleEnvSetting.coworkTxNameAfterApprove;
				}
				else {
					txName = menuRuleAOL.ruleEnvSetting.coworkTxNameBeforeApprove;
				}
			}
			
			var orgNode = SSOUtil.getOrgNode(orgNo);
			if (orgNode===null) {
				theLogger.error('ERROR! _makeNewInnerItem() OrgInfo找不到機關資訊[機關代碼=' + orgNo + ']');
				return [];
			}
			
			var listItem = [];
			var i=0, unit=null;
			
			var $role_xn=null, roleName='';
			var $unit_xn=null;
			var rootUnitName = '';
			for(i=0; i<listUnit.length; i++) {
				unit = listUnit[i];
				$unit_xn = $(orgNode).find('Unit[UnitCode="' + unit.unitNo + '"]');
				if ($unit_xn.length) {
					$role_xn = $($unit_xn[0]).find('Role[RoleNo="' + coworkRoleId + '"]');
					if ($role_xn.length) {
						roleName = SSOUtil.xml_getChildNodeValue($role_xn[0], 'RoleName');
						
						if (rootItem!==null) {
							if (rootUnitName.length) {
								rootUnitName += (' ' + unit.unitName);
							}
							else {
								rootUnitName = unit.unitName;
							}
						}
						
						listItem.push({
							OWN_USER_ID: '',
							OWN_USER_NAME: '',
							OWN_OU_ID: unit.unitNo,
							OWN_OU_NAME: unit.unitName,
							OWN_ROLE_ID: (rootItem===null) ? coworkRoleId : '', // 順會才寫入分辦人員角色
							OWN_ROLE_NAME: (rootItem===null) ? roleName : '',
							
							CREATE_BY: '',
							SEND_BY: '',
							SEND_TIME: '',
							ADDBY: (rootItem===null) ? '0' : '1', // 順會:'0', 分會項目: '1'
							//1110822	Leslie	修正"後會/順會"的類型，正確應該是"2"
							//RADIO_SELECTED_1: (rootItem===null) ? '1' : '3', // 順會:'1', 分會項目: '3'
							RADIO_SELECTED_1: (rootItem===null) ? ((txName == menuRuleAOL.ruleEnvSetting.coworkTxNameAfterApprove)?'4':'2') : '3', // 順會:'2', 分會項目: '3'
							SIGN_F: 'N',
							
							TX_NAME: txName,
						});
					}
					else {	// 2021.12.6 - 1101392 Eric, 若單位內無登記桌, 提示訊息並中止作業!
						if (typeof errItems!='undefined' && Array.isArray(errItems)) {
							errItems.push(unit.unitName);
						}
					}
				}
			}

			// 2021.12.6 - 1101392 Eric, 若單位內無登記桌, 提示訊息並中止作業!
			if (Array.isArray(errItems) && errItems.length) {
				return [];
			}
			
			if (typeof rootItem=='object' && rootItem!==null && listItem.length>1) {
				rootItem.OWN_OU_NAME = rootUnitName;
				rootItem.COWORK_OPTIONS = listItem;
				return [rootItem];
			}
			else {
				// 加入會辦完回承辦人流程
				if (listItem.length && typeof returnToICUserTX=='string' && returnToICUserTX.length && syncFlow) {
					var excludeRoleList = ['OD16', 'OD17'];
					var ICUserInfo = SSOUtil.getOrgUserInfo(orgNode, _docObj.ICOUId, '', _docObj.ICUserId, excludeRoleList);
					if (typeof ICUserInfo=='object' && ICUserInfo!==null) {
						listItem.push({
							OWN_USER_ID: ICUserInfo.UserId,
							OWN_USER_NAME: ICUserInfo.UserName,
							OWN_OU_ID: ICUserInfo.OUId,
							OWN_OU_NAME: ICUserInfo.OUName,
							OWN_ROLE_ID: ICUserInfo.RoleId,
							OWN_ROLE_NAME: ICUserInfo.RoleName,
							
							CREATE_BY: '',
							SEND_BY: '',
							SEND_TIME: '',
							ADDBY: '0', // 分會項目: '1'
							RADIO_SELECTED_1: '1', // 分會項目: '3'
							SIGN_F: 'N',
							
							TX_NAME: returnToICUserTX,
						});
					}
				}
				return listItem;
			}
		}

		//1120724 David 1120284 新增後會單位物件及檢察是否有登記桌
		function _makeNewAfterAppItem(_docObj, listUnit, orgNo, errItems) {
			// {unitNo:ownOUId, unitName:unit.name}
			var txName = theSSO.User.EnvSettings.get('AOL_COWORK_TXNAME_AFTER_APPROVE');
			var coworkRoleId='OD16', coworkRoleName='分辦人員';
			//依簽核類型判斷傳送角色
			if(theAOL.docObj.signType == "P"){
				coworkRoleId = 'OD17';
				coworkRoleName = '登記桌';
			}

			var orgNode = SSOUtil.getOrgNode(orgNo);
			if (orgNode===null) {
				theLogger.error('ERROR! _makeNewInnerItem() OrgInfo找不到機關資訊[機關代碼=' + orgNo + ']');
				return [];
			}

			var listItem = [];
			var i=0, unit=null;

			var $role_xn=null, roleName='';
			var $unit_xn=null;
			var rootUnitName = '';
			for(i=0; i<listUnit.length; i++) {
				unit = listUnit[i];
				$unit_xn = $(orgNode).find('Unit[UnitCode="' + unit.unitNo + '"]');
				if ($unit_xn.length) {
					$role_xn = $($unit_xn[0]).find('Role[RoleNo="' + coworkRoleId + '"]');
					if ($role_xn.length) {
						roleName = SSOUtil.xml_getChildNodeValue($role_xn[0], 'RoleName');
						rootUnitName = unit.unitName;
					}

					listItem.push({
						OWN_USER_ID: '',
						OWN_USER_NAME: '',
						OWN_OU_ID: unit.unitNo,
						OWN_OU_NAME: unit.unitName,
						OWN_ROLE_ID: coworkRoleId,
						OWN_ROLE_NAME: roleName,
						CREATE_BY: '',
						SEND_BY: '',
						SEND_TIME: '',
						ADDBY: '1',
						RADIO_SELECTED_1: '4', // 後會:'4'
						SIGN_F: 'N',
						
						TX_NAME: txName,
					});
				}
				else {	//若單位內無登記桌, 提示訊息並中止作業!
					if (typeof errItems!='undefined' && Array.isArray(errItems)) {
						errItems.push(unit.unitName);
					}
				}
			}

			//若單位內無登記桌, 提示訊息並中止作業!
			if (Array.isArray(errItems) && errItems.length) {
				return [];
			}

			return listItem;
		}
		
		var _dfdProcWWKF = $.Deferred();
		var sProcCoWorkFolderList = theSSO.User.EnvSettings.get('AOL_PROCCOWORK_FOLDER_LIST');
		if (typeof sProcCoWorkFolderList=='string' && sProcCoWorkFolderList.length) {
			var folderList = sProcCoWorkFolderList.split(';');
			var folderStr = that.folder + '+' + that.subfolder;
			if (folderList.indexOf(folderStr)==-1) {
				theLogger.log('-I- 文件夾:[' + folderStr + ']毋須異動會辦流程.');
				_dfdProcWWKF.resolve({success:true, update:false});
				return _dfdProcWWKF.promise();
			}
		}
		else {
			theLogger.log('-I- _updateWWKFCoWorkFlow() 環境變數:[AOL_PROCCOWORK_FOLDER_LIST]未設定, 不異動會辦流程.');
			_dfdProcWWKF.reject({success:false, update:false, errMsg: '環境變數:[AOL_PROCCOWORK_FOLDER_LIST]未設定'});
			return _dfdProcWWKF.promise();
		}
		
		var wwkf = _getODWWKF();
		if (wwkf===null) {
			_initODWWKF();
			wwkf=_getODWWKF();
			if (wwkf===null) {
				theLogger.log('-I- _updateWWKFCoWorkFlow() 無法取得公文ODWWKF內容.');
				_dfdProcWWKF.reject({success:false, update:false, errMsg: ' 無法取得公文ODWWKF內容.'});
				return _dfdProcWWKF.promise();
			}
		}

		var returnToICUserTX = theSSO.User.EnvSettings.get('AOL_AUTO_ADD_RETURN'); // 會辦後(順會)自動加入回承辦人流程
		if (typeof returnToICUserTX !=='string') {
			returnToICUserTX = '';
		}
		
		var co_wwkf_old = _groupWWKFFlow_CoWorkOnly(that);
		var co_wwkf_new = _groupNewCoworkFlow(that, arrCoworkUnit);
		var orgNo = that.sourceOrgNo;
		
		var fSameInner = true;
		var fSameOut = true;
		
		var i=0, j=0, OUId1='', OUId2='';
		if (co_wwkf_new.inner.length==co_wwkf_old.inner.length) { // 比對組室內之會辦單位清單
			// 數量相同, 逐一比對(順序相同才視為相同)
			for(i=0; i<co_wwkf_new.inner.length; i++) {
				OUId1 = co_wwkf_new.inner[i].unitNo;
				OUId2 = co_wwkf_old.inner[i].OWN_OU_ID;
				if (OUId1!==OUId2) {
					fSameInner = false;
					break;
				}
			}
		}
		else {
			fSameInner = false;
		}
		
		if (co_wwkf_new.Units.length==co_wwkf_old.outer.length)  { // 比對其它組室之會辦單位清單
			// 數量相同, 逐一比對(順序相同才視為相同)
			for(i=0; i<co_wwkf_new.Units.length; i++) {
				OUId1 = co_wwkf_new.Units[i].unitNo;
				OUId2 = co_wwkf_old.outer[i].OWN_OU_ID;
				if (OUId1!==OUId2) {
					fSameOut = false;
					break;
				}
			}
		}
		else {
			fSameOut = false;
		}

		if (co_wwkf_new.AfterApp.length==co_wwkf_old.AfterApp.length)  { //1120724 David 1120284 比對後會單位清單
			// 數量相同, 逐一比對(順序相同才視為相同)
			for(i=0; i<co_wwkf_new.AfterApp.length; i++) {
				OUId1 = co_wwkf_new.AfterApp[i].unitNo;
				OUId2 = co_wwkf_old.AfterApp[i].OWN_OU_ID;
				if (OUId1!==OUId2) {
					fSameOut = false;
					break;
				}
			}
		}
		else {
			fSameOut = false;
		}
		
		if (fSameInner && fSameOut) { // 若文稿/WWKF的會辦單位清單內容一致, 不異動WWKF
			theLogger.log('-I- updateWWKFCoWorkFlow() END. [會辦單位未異動]');
			_dfdProcWWKF.resolve({success:true, update:false});
			return _dfdProcWWKF.promise();
		}
		
		// to be continued @AOLDoc.cpp Ln:28116
		var confirmUpdate = false;
		var syncFlow = true;
		var enableAsyncFlow = false;
		if (typeof theSSO.User.EnvSettings.AOL_ASK_INSERT_COWORK_INFO=='string' && SSOUtil.isValueTrue(theSSO.User.EnvSettings.AOL_ASK_INSERT_COWORK_INFO)) {
			confirmUpdate = true;
		}
		if (typeof theSSO.User.EnvSettings.AOL_INSERT_MULTITHREAD_FLOW=='string' && SSOUtil.isValueTrue(theSSO.User.EnvSettings.AOL_INSERT_MULTITHREAD_FLOW)) {
			enableAsyncFlow = true;
		}
		
		_confirmUpdateProcess(co_wwkf_new, confirmUpdate, enableAsyncFlow)
		.then(function(rslt) {
			// rslt: {success:true, doUpdateProcess:true|false, syncFlow:true|false}
			if (rslt.doUpdateProcess)
			{
				var wwkf_old = _groupWWKFFlow(that, returnToICUserTX);
				if (typeof wwkf_old=='object' && wwkf_old!==null)
				{
					var listNewFlow = [];
					/* { beforeInner, // 組室內會辦前流程(科長前)
						 afterInner, // 組室內會辦後流程
						 delInner, // 移除之組室內會辦流程(未執行)
						 before, // 組室外會辦前流程(科長前)
						 after, // 組室外會辦後流程
						 del,
					   };*/
					if (wwkf_old.beforeInner.length) {
						listNewFlow = listNewFlow.concat(wwkf_old.beforeInner);
					}

					// 2021.12.6 - 1101392 Eric, 若單位內無登記桌, 提示訊息並中止作業!
					let errItemInner=[], errItemOuter=[];
					if (co_wwkf_new.inner.length) {
						//1110430 David 1101388 新增傳入docObj物件
						//let innerItems = _makeNewInnerItem(co_wwkf_new.inner, rslt.syncFlow, orgNo, errItemInner);
						let innerItems = _makeNewInnerItem(that, co_wwkf_new.inner, rslt.syncFlow, orgNo, errItemInner);
						// 2021.10.18 - Eric, 聯合大學二代上線序35 bug-fix
						//if (SSOUtil.typeOf(unitItems)=='array' && unitItems.length) {
						if (SSOUtil.typeOf(innerItems)=='array' && innerItems.length) {
							listNewFlow = listNewFlow.concat(innerItems);
						}
					}
					if (wwkf_old.afterInner.length) {
						listNewFlow = listNewFlow.concat(wwkf_old.afterInner);
					}
					if (wwkf_old.before.length) {
						listNewFlow = listNewFlow.concat(wwkf_old.before);
					}
					if (co_wwkf_new.Units.length) {
						let unitItems = _makeNewOuterItem(that, co_wwkf_new.Units, rslt.syncFlow, orgNo, errItemOuter);
						if (SSOUtil.typeOf(unitItems)=='array' && unitItems.length) {
							listNewFlow = listNewFlow.concat(unitItems);
						}
					}
					//1120724 David 1120284 新增後會單位物件及檢察是否有登記桌
					let listNewAfterAppFlow = [];
					let errItemAfterApp=[];
					if (co_wwkf_new.AfterApp.length) {
						let unitItems = _makeNewAfterAppItem(that, co_wwkf_new.AfterApp, orgNo, returnToICUserTX, errItemAfterApp);
						if (SSOUtil.typeOf(unitItems)=='array' && unitItems.length) {
							listNewAfterAppFlow = listNewAfterAppFlow.concat(unitItems);
						}
					}

					// 2021.12.6 - 1101392 Eric, 若單位內無登記桌, 提示訊息並中止作業!
					//1120724 David 1120284 新增後會單位檢核
					//if (errItemInner.length || errItemOuter.length) {
					if (errItemInner.length || errItemOuter.length || errItemAfterApp.length) {
						let sMsg = '會辦單位［';
						let idxItem=0;
						for(idxItem=0; idxItem<errItemInner.length; idxItem++) {
							if (idxItem==(errItemInner.length-1) && (errItemOuter.length==0)) {
								sMsg += errItemInner[idxItem];
							}
							else {
								sMsg += errItemInner[idxItem] + '，';
							}
						}

						for(idxItem=0; idxItem<errItemOuter.length; idxItem++) {
							if (idxItem==(errItemOuter.length-1)) {
								sMsg += errItemOuter[idxItem];
							}
							else {
								sMsg += errItemOuter[idxItem] + '，';
							}
						}

						let sSep = '';
						if (sMsg.length>50) {
							sSep = '\r\n';
						}
						
						sMsg += '］無分辦人員，' + sSep + '請重新確認會辦對象後重新設定。';

						let _dfd = $.Deferred();
						_dfd.reject({success:false, update:false, showErrMsg: true, errMsg: sMsg});
						return _dfd.promise();
					}

					if (wwkf_old.after.length) {
						listNewFlow = listNewFlow.concat(wwkf_old.after);
					}
					//1120724 David 1120284 新增自動加入後會單位
					if (listNewAfterAppFlow.length) {
						listNewFlow = listNewFlow.concat(listNewAfterAppFlow);
					}

					_updateODWWKF(listNewFlow);
					_dfdProcWWKF.resolve({success:true, update:true, wwkf:listNewFlow});
				}
				else {
					_dfdProcWWKF.reject({success:false, update:false, errMsg: '原有預排流程資料異常[co_wwkf_old]'});
				}
			}
			else {
				_dfdProcWWKF.resolve({success:true, update:false, wwkf:_getODWWKF()});
			}
		})
		.fail(function(rslt) {
			// 2021.12.6 - 1101392 Eric, 若單位內無登記桌, 提示訊息並中止作業!
			if (typeof rslt.showErrMsg=='boolean' && rslt.showErrMsg===true && 
			    typeof rslt.errMsg=='string' && rslt.errMsg.length) {
				alert(rslt.errMsg);
			}
			_dfdProcWWKF.reject({success:false, update:false, errMsg: rslt.errMsg});
		});
		
		return _dfdProcWWKF.promise();
	}
	
	function _getODWWKF() {
		if (typeof that.ODWWKF =='object') {
			return that.ODWWKF;
		}
		return null;
	}
	
	function _isODWWKFUpdated() {
		if (typeof that.wwkfUpdated=='boolean' && typeof that.ODWWKF=='object') {
			return that.wwkfUpdated;
		}
		return false;
	}
	
	function _resetODWWKF() {
		that.ODWWKF = null;
	}
	
	function _replaceAsynCOWWKItem(wwkfItem, idx) {
		if (typeof idx !='number') {
			idx = -1;
		}
		
		if (typeof wwkfItem=='object' && wwkfItem!==null && SSOUtil.typeOf(that.ODWWKF)=='array' &&
			idx>=0 && idx<=that.ODWWKF.length) {
			var orgItem = that.ODWWKF[idx];
			if (orgItem!==null && orgItem.TX_NAME=='分會') {
				that.ODWWKF[idx] = wwkfItem;
				that.wwkfUpdated = true;
				return true;
			}
			else {
				theLogger.error('ERRRO! _replaceCOWWKItem() 原WWKF項目[index=' + idx + ']非分會流程');
			}
		}
		return false;
	}
	
	function _insertWWKFItemTail(wwkfItem) {
		if (typeof wwkfItem=='object' && wwkfItem!==null) {
			that.ODWWKF.push(wwkfItem);
			that.wwkfUpdated = true;
			return true;
		}
		return false;
	}
	
	that.getODWWKF = _getODWWKF;
	that.getODWMSG = _getODWMSG;
	that.getODWDCM = _getODWDCM;
	that.set = _set;
	that.set2 = _set2; // 2016.7
	that.getODWMSG_XMLDOMObj = _getODWMSG_XMLDOMObj;
	that.getODWDCM_XMLDOMObj = _getODWDCM_XMLDOMObj;
	that.getODWWKF_XMLDOMObj = _getODWWKF_XMLDOMObj; // 2016.8.25
	that.isDraftDoc = _isDraftDoc;
	that.nextOptions = null;
	
	that.get = _get;
	
	that.getODWWKF = _getODWWKF;
	that.initODWWKF = _initODWWKF;
	that.updateODWWKF = _updateODWWKF;
	that.updateODWWKF_Str = _updateODWWKF_Str; // 2017.11.6 - 1060748 bug-fix (@IE)
	that.isODWWKUpdated = _isODWWKFUpdated;
	that.resetODWWKF = _resetODWWKF;
	that.updateWWKFCoWorkFlow = _updateWWKFCoWorkFlow;
	that.replaceAsynCOWWKItem = _replaceAsynCOWWKItem;
	that.insertWWKFItemTail = _insertWWKFItemTail;
	
	return that;
}
/* 待辦項目清單模式初始化作業.
 * a. 建立清單內容
 * b. 轉換為固定標題,內容可捲動的super table
 * c. 公文燈號資訊
 */
function _initToDoList_List(docCntr) {
	// 2019.2.21 - 1080211
	function _getColumnIndex($rawTableHeader, colName) {
		var $_th = $rawTableHeader.find('tr > th');
		var i=0, columnIndex=-1;
		var $theTH = null;
		for (i=0; i<$_th.length; i++) {
			$theTH = $($_th[i]);
			if ($theTH.data('prop')==colName) {
				columnIndex = i;
				break;
			}
		}
		return columnIndex;
	}

	// docCntr
	var tableHeader = $('#mpContainer #todolist_cntr #todolist_tb')[0];
	var $tableHeader = $(tableHeader);
	var $headers = $tableHeader.find('thead tr > th');

	// 2020.11.9 - merge 1090688 Eric, MOI todolist_tb delete msg problem fix.
	_docItemPropIndex = [];
	if ($headers.length) {	
		var _idxHeader = 0, $header = null, indexItem = null;
		for(_idxheader=0; _idxHeader<$headers.length; _idxHeader++) {
			$header = $($headers[_idxHeader]);
			indexItem = { name: $header.attr('data-prop'), index: _idxHeader};
			_docItemPropIndex.push(indexItem);
		}
	}
	
	var tdlBuilder = theSSO.MP.todolist.builder;
	
	// 初始化清單內容
	var tmSecBeginA;
	if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
		theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- tdlBuilder.makeToDoList_List' + (window.tdlUseJSON?'_DOM':'') + '() BEGIN...');
		tmSecBeginA = Date.now();
	}
	
	var tableContent = null; //{full:'xxxx', part:'aaaa'}
	//1110927	Leslie[1110889]	無論以XML或JSON載入，一律以純HTML產出MP
	//if (!!window.tdlUseJSON) {
		//sTDLTableItem = tdlBuilder.makeToDoList_List_DOM('todolist_tb > tbody', '', '', 0);
		tableContent = tdlBuilder.makeToDoList_List_DOM('todolist_tb > tbody', '', '', 0);
	//}
	//else {
	//	tdlBuilder.makeToDoList_List('todolist_tb > tbody', '', '', 0);
	//}
	
	if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
		SSOUtil.dev_logTimeElapse('tdlBuilder.makeToDoList_List' + (window.tdlUseJSON?'_DOM':''), tmSecBeginA);
	}
			  
	// 2012.2.7 - superTable + jQM scrollview
	
	// 轉換為supertable
	if ($('#todolist_cntr .sBase').length) {
		// 已是superTable->登出後登入叫用
	}
	else {
		var mySuperTable = null;
		if (tdlBuilder.getToDoListCount()) {
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
				theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- new supertTable() BEGIN...');
				tmSecBeginA = Date.now();
			}
			
			// 2019.2.21 - 1080211
			let $rawTableHeader = $('#todolist_tb thead');
			mySuperTable = new superTable("todolist_tb", {
				cssSkin : "sSky",
				fixedCols : 0,
				headerRows : 1,
				onStart : function () {
					// onStart handler
				},
				onFinish : function () {
					function _getTBColWidth($tabCol) {
						var cnt = $tbCol_header.length;
						var i=0, total_w=0, item_w=0;
						for(i=0; i<cnt; i++) {
							item_w = parseInt($($tbCol_header[i]).attr('width'));
							if (item_w>0) {
								total_w += item_w;
							}
						}
						return total_w;
					}
					
					// onFinish handler
					var win_w = window.innerWidth;
					var $tbColGrp_header = $('#listPane .sHeader #todolist_tb colgroup');
					var $tbCol_header = $tbColGrp_header.children('col');
					var $tbCol_data = $('#listPane .sData #todolist_tb colgroup col');

					if (win_w<=1024) {
						// 2017.10.24 -1060967
						let total_w = _getTBColWidth($tbCol_header);

						// 2021.2.19 - 1090927 Eric, support iPhone landscape
						let availableW = 976;
						if (window.SDLMode) {
							let $tbCntr = $('#listPane .tdl_tb_cntr');
							if ($tbCntr.length) {
								availableW = $tbCntr.width() - 8;
							}
						}

						if (total_w>availableW || (window.SDLMode && total_w>availableW)) {
							if (!theSSO.MP.todolist.builder.shouldHideLights()) {
								// 調整[辦理期限]欄位長度
								let diff = total_w - availableW;
								var dueDateColIdx = _getColumnIndex($rawTableHeader, 'dueDate');
								if (dueDateColIdx>=0) {
									let w_org = parseInt($($tbCol_header[dueDateColIdx]).attr('width'))
									let w_new = w_org - diff;
									if (w_new<50) w_new = 50;
									
									$($tbCol_header[dueDateColIdx]).attr('width', w_new);
									$($tbCol_data[dueDateColIdx]).attr('width', w_new);
								}
								
								// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期
								var rcvDateColIdx = _getColumnIndex($rawTableHeader, 'rcvDate');
								if (rcvDateColIdx>=0) {
									let w_org = parseInt($($tbCol_header[rcvDateColIdx]).attr('width'))
									let w_new = w_org - diff;
									if (w_new<50) w_new = 50;
									
									$($tbCol_header[rcvDateColIdx]).attr('width', w_new);
									$($tbCol_data[rcvDateColIdx]).attr('width', w_new);
								}

								total_w = _getTBColWidth($tbCol_header);

								// 2021.2.19 - 調整[文號]=>100/[送文單位]=>???欄位長度
								if (window.SDLMode && (availableW<total_w)) {
									diff = total_w - availableW;

									let docNoColIdx = _getColumnIndex($rawTableHeader, 'docNo');
									if (docNoColIdx>=0) {
										let w_org = parseInt($($tbCol_header[docNoColIdx]).attr('width'));
										let w_min = w_org-20;
										let w_new = w_org - diff;
										if (w_new<w_min) w_new = w_min;

										$($tbCol_header[docNoColIdx]).attr('width', w_new);
										$($tbCol_data[docNoColIdx]).attr('width', w_new);
										
										total_w = _getTBColWidth($tbCol_header);
										if (availableW<total_w) {
											diff = total_w - availableW;
											// fromOUName
											let fromOUNameColIdx = _getColumnIndex($rawTableHeader, 'fromOUName');
											if (fromOUNameColIdx>=0) {
												w_org = parseInt($($tbCol_header[fromOUNameColIdx]).attr('width'));
												w_new = w_org - diff;
												if (w_new<80) w_new = 80;

												$($tbCol_header[fromOUNameColIdx]).attr('width', w_new);
												$($tbCol_data[fromOUNameColIdx]).attr('width', w_new);
											}
										}
									}
								}

							}
						}

						// 2017.10.24 - 1060967, 初始時若視窗寬度小於1024會用小字型計算欄寬, 標記以供後續視窗縮放時計算欄寬使用.
						$tbColGrp_header.attr('data-sFont', 'true');
					}
					else {
						if (theSSO.MP.todolist.builder.showCurrLocate()) { // 2018.10.2 - 1070955
							theSSO.MP.todolist.builder.adjustFolderField('');
						}

						// 2019.2.21 - 1080211, 調整[公文性質]欄位寬度為指定之字數寬
						if (tdlBuilder.shouldShowDocProperty()) {
							let docPtyColIdx = _getColumnIndex($rawTableHeader, 'docPtyName');
							let subjectColIdx = _getColumnIndex($rawTableHeader, 'subject');
							if ($tbCol_header.length>docPtyColIdx && $tbCol_header.length>subjectColIdx) {
								let w_docPtyOrg = parseInt($($tbCol_header[docPtyColIdx]).attr('width'));
								let w_subjOrg = parseInt($($tbCol_header[subjectColIdx]).attr('width'));
								let w_docPtyNew = SSOUtil.getEMSize($('#tdlPane')[0]) * tdlBuilder.getShowDocPropertyLen() + 10;
								let diff = w_docPtyNew - w_docPtyOrg;
								let w_subjNew = w_subjOrg - diff;
							
								$($tbCol_header[subjectColIdx]).attr('width', w_subjNew);
								$($tbCol_data[subjectColIdx]).attr('width', w_subjNew);

								$($tbCol_header[docPtyColIdx]).attr('width', w_docPtyNew);
								$($tbCol_data[docPtyColIdx]).attr('width', w_docPtyNew);
							}
						}
					}

					// 2018.10.9 - 1070955, 計算最後table總寬度視須要顯示horz-scroll bar
					var $listPane = $('#tdlPane #listPane');
					theSSO.MP.todolist.builder.updateSuperTableHScroll($listPane)

					if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
						SSOUtil.dev_logTimeElapse('new supertTable', tmSecBeginA);
					}
				},
				dataTableExtraClass : 'tablesorter',
			});

			// 2020.11.9 - 1090688 Eric, 解決登入時無待辦, 未產生supertable, 造成後續無法正確刪除待辦事項問題!
			theSSO.MP.tdlSuperTable = mySuperTable;
		}
		
		//
		// 2020.11.9 - 1090688 Eric, 解決登入時無待辦, 未產生supertable, 造成後續無法正確刪除待辦事項問題.
		//  1. 登入時若無待辦, 則下列作業不執行; 
		//  2. 後續若有新進訊息加入, 則會在第一筆訊息加入時再度觸發產生supertable再執行.
		//
		if (typeof theSSO.MP.tdlSuperTable!='undefined' && theSSO.MP.tdlSuperTable!=null)
		{
			// 2015.6 - 提示排序項目(@標題)
			$(document).on('st_headerStyleUpdated', '#todolist_cntr .sData #todolist_tb', function(event, extra) {
				theLogger.debug('event st_headerStyleUpdated triggered.');
				
				// remove all header information
				var $headers = $('#todolist_cntr .sHeader table thead th');
						
				$headers.removeClass(extra.css[0]).removeClass(extra.css[1]);
				var l = extra.list.length;
				for (var i = 0; i < l; i++) {
					$($headers[extra.list[i][0]]).addClass(extra.css[extra.list[i][1]]);
				}    
			});
			
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
				theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- apply tablesorter BEGIN...');
				tmSecBeginA = Date.now();
			}
				
			// 按上方標題可排序功能
			$('#todolist_cntr .sData #todolist_tb').tablesorter({
				// 2016.10.30 - 初始化時, 不執行sort作業, ODMSSP.GetToDoListByJSON預設會以文號排序!
				//sortList: [[theSSO.MP.todolist.builder.getDefaultSortIndex(),0]], 
				// define a custom text extraction function
				textExtraction: function(node) {
					var targetProp = $(node).jqmData('prop');
					var $tr = $(node).closest('tr');
					var msgId = $tr.jqmData('msgid');
					
					// 2013.12 - Eric Peng
					var value = tdlBuilder.getPropValue(msgId, targetProp);
					return value;
				},
				});
		
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
				SSOUtil.dev_logTimeElapse('apply tablesorter', tmSecBeginA);
			}
						
			// 2016.10. 只取部份table內容初始化, 此處補齊內容
			if ((typeof _disableFastInit!=='boolean' || _disableFastInit!==true) &&
				typeof tableContent.part=='string' && tableContent.part.length &&
				typeof tableContent.full=='string' && tableContent.full.length) {
				
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- tdlBuilder setFullContent BEGIN...');
					tmSecBeginA = Date.now();
				}
			
				var $sData_tbody = $('#listPane #todolist_cntr .sData #todolist_tb tbody');
				if ($sData_tbody.length) {
					$sData_tbody[0].innerHTML = tableContent.full;
				}
				
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					SSOUtil.dev_logTimeElapse('tdlBuilder setFullContent', tmSecBeginA);
				}
			}
			
			// 2015.5 - 記錄目前sort設定, 後續作業可判定是否反向sort
			var hideLight = theSSO.MP.todolist.builder.shouldHideLights();
			var sortIndex = '-1';
			if (hideLight) {
				sortIndex = '-1';	
			}
			$('.sData #todolist_tb').attr({'data-sortIndex': sortIndex, 'data-sortReverse': '0'});
			
			// 2019.9.16 - 1080339 Eric
			$('#todolist_cntr .sHeader table thead th a').on('click', function(){
				var $th = $(this).closest('th');
				var str = $th.jqmData('prop');
				
				// 2017.6.22 成大[流程]欄位不排序
				if (typeof str=='string' && str==='docProc')
					return;

				if (!!str && str.length) {
					// 找到該欄位的索引值
					var idx = 0;
					for(var i=0; i<_docItemPropIndex.length;i++) {
						var prop = _docItemPropIndex[i];
						if (prop.name == str) {
							idx = prop.index;
							break;
						}
					}
					
					/*
					// 2015.5.7 - Eric Peng
					//  1. 比對目前sort設定, 若同項目, 則反向! 不同項目, 則依欄位預設屬性正/反向
					//  2. 作業完成記錄sort設定於 <table data-sortIndex='xxx' data-sortReverse='x'>, 以供下次排序作業比對.
					*/
					var sIndex = $('.sData #todolist_tb').attr('data-sortIndex');
					var currentIndex = parseInt(sIndex);
					
					var sorting = null;
					var reverse = 0;
					var sortDir = 0;
					var defaultSortIndex = theSSO.MP.todolist.builder.getDefaultSortIndex();
					//if (currentIndex!==-1) { // 2016.12.8 - Eric Peng, 可能未排序	// 2016.12.29	Leslie	點擊排序應無需判斷是否已排序過
					if (currentIndex==idx) {
						var sReverseSort;
						if (currentIndex==idx) {
							sReverseSort = $('.sData #todolist_tb').attr('data-sortReverse');
							sortDir = (sReverseSort=='0' || sReverseSort==='') ? 1 : 0;//code
						}
						
						if (idx==defaultSortIndex) {
							sorting = [[idx, sortDir]];
						}
						else {
							sorting = [[idx, sortDir], [defaultSortIndex, 0]];
						}
					}
					else {
						// set sorting column and direction, this will sort on the first and third column the column index starts at zero
						if (idx===0 || idx===2) {
							sorting = [[idx,1],[defaultSortIndex,0]];
							sortDir = 1;
						}
						else {
							if (idx==defaultSortIndex) {
								sorting = [[idx,0]];
							}
							else {
								sorting = [[idx,0],[defaultSortIndex,0]];
							}
							sortDir = 0;
						}
					}
					//}	
					
					// 2016.11.1 - 若總數不符, 先Update cache content...
					var selectedFolder = $('#listPane #selectedFolder').val();
					if (selectedFolder=='全部') {
						var tbCache = {};
						var $tdlTable = $('#todolist_cntr .sData #todolist_tb');
						$tdlTable.trigger('getCache', tbCache);
						if (typeof tbCache.row=='object') {
							var cntTDL = tdlBuilder.getToDoListCount();
							theLogger.log('-tm- cache row count=' + tbCache.row.length + ', todolist count=' + cntTDL);
								
							if (tbCache.row.length!==cntTDL) {
								var tmSecBeginUpdate;
								if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
									theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- [UPDATE]tablesorter BEGIN...');
									tmSecBeginUpdate = Date.now();
								}
								
								$tdlTable.trigger('update', {
									callback: function() {
										if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
											SSOUtil.dev_logTimeElapse('[UPDATE]tablesorter', tmSecBeginUpdate);
										}
										
										if (!!sorting) { // 2016.12.8 - Eric Peng, 可能未排序
											var $tableForSort = $("#listPane .sData #todolist_tb");
											// 記錄本次排序設定.
											$tableForSort.attr({'data-sortIndex': idx.toString(), 'data-sortReverse': sortDir.toString()});
											// 觸發排序作業.
											$tableForSort.trigger("sorton",[sorting]);
										}
										
										SSOUtil.loading('hide');
									},
								});
								
								SSOUtil.loading('show');
								// 先回傳, 等update cache完成會觸發'sorton' event...
								return;
							}
						}
					}
					
					if (!!sorting) { // 2016.12.8 - Eric Peng, 可能未排序
						var $tableForSort = $("#listPane .sData #todolist_tb");
						// 記錄本次排序設定.
						$tableForSort.attr({'data-sortIndex': idx.toString(), 'data-sortReverse': sortDir.toString()});
						// 觸發排序作業.
						$tableForSort.trigger("sorton",[sorting]);
					}
				}
			});
		}
	}
	
	// 2011.11.14 - 燈號
	$("#todolistToolbar .red_cnt").text(tdlBuilder.lights.red);
	$("#todolistToolbar .yellow_cnt").text(tdlBuilder.lights.yellow);
	$("#todolistToolbar .white_cnt").text(tdlBuilder.lights.white);
	$("#todolistToolbar .green_cnt").text(tdlBuilder.lights.green);
	$("#todolistToolbar .purple_cnt").text(tdlBuilder.lights.purple);
}
/* 待辦事項處理物件 (以AJAX取得ToDoList.XML *開發測試時內部使用*)
 */
function ToDoList_AJAX() {
	/* inner functions */
	//1140723	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]，本段為開發測試用
	/*
	function _getIconFolderH() {
		if ($('#iconPane').is(':visible')) {
			var containerH = $('#iconPane').height();
			var headerH = $('#todolist_icon_cntr').height();
			return containerH - headerH - 2;//code
		}
		else {
			var containerH = $('#mpContainer').height();
			var headerH = SSOUtil.getEMSize($('#home')[0]) * 2;
			return containerH - headerH;
		}
	}
		
	var delay =  5000, // timeout: 5 seconds
	    todolistXmlUrl = 'todolist\\todolist.xml',
	    dataType = 'xml';
		
	var builder = ToDoListBuilder();
	
	theLogger.log('load todolist via AJAX, SrcFile=' + todolistXmlUrl);
	
	this.load = function(xmlToDoList) {
		var _todolist = this;
		$.ajax({
			type:"get",
			url: todolistXmlUrl,
			async: false,
			cache: false,
			success: function(xmldata) {
				xmlToDoList = $(xmldata).find('ToDoList');
				if (xmlToDoList!==null) {
					var cnt = $(xmlToDoList).find('ODWMSG').length;
					if (cnt>=1) {
						theLogger.log('todolist cnt=' + (cnt-1)); // 總數須去除第一筆無資料的header
						builder.init(xmlToDoList);
						
						// 圖示內容
						builder.makeToDoList_Icon('todolist_icon_cntr', '1');
						
						// 清單內容
						_initToDoList_List();
						
						//tdlBuilder.makeToDoList_List('todolist_tb > tbody', '', '', 0);
						
						// 設定folderList寬度
						var width = folderCnt * todolist_icon_folder_w;
						$('#iconPane .folderList').css('width', '' + width + 'px');
						
						// 設定各文件夾為scrollable(垂直方向捲動)
						var $folders = $('#iconPane .folioList');
						var folderCnt = $folders.length;
						if (folderCnt>0) {
							//$('#iconPane > div').not(':last').width(todolist_icon_folder_w * folderCnt);
							$('#iconPane div#todolist_icon_cntr').width(todolist_icon_folder_w * folderCnt);
							$('#todolist_icon_cntr ul.folderList').width(todolist_icon_folder_w * folderCnt);
							//$('.todolist_icon .folderList').css('width', _folderCnt * todolist_icon_folder_w);
							if (!!theSSO.MP.todolist.tdlicon_Scroll) {
								theSSO.MP.todolist.tdlicon_Scroll.refresh();
							}
							theLogger.debug('[tdlBuilder.load] folderList width= ' + $('#iconPane .folderList').eq(0).width());
							
							// 清除原有項目
							do {
								var obj = theSSO.MP.todolist.folderScrolls.pop();
							}while(theSSO.MP.todolist.folderScrolls.length);
							
							$('#iconPane .folderList > li').show();
							
							$('#todolist_icon_cntr .folderList').css({'-webkit-transition-duration': '', '-webkit-transform': ''});
							
							// 2014.8 - 目前未使用, 圖示模式Title的向左/向右scroll button
							$('#iconPane .folderList > li .folder_title_btn_l').hide();
							$('#iconPane .folderList > li .folder_title_btn_r').hide();
							
							var h_folder = _getIconFolderH();
							for (var i=0; i<folderCnt; i++) {
								var fid = 'fldr_items_' + i;
								$($folders[i]).attr('id', fid).css('height', h_folder + 'px');
								var folderStr = $($folders[i]).closest('#fldr_'+i).attr('data-folder');
								var newScroll = new IScroll('#'+fid); // 2017.4.18, iScroll -> IScroll, add '#'
								newScroll.folder = folderStr;
								theSSO.MP.todolist.folderScrolls.push(newScroll);
							}
							
							var idx=0;
							for (idx=0; idx<theSSO.MP.todolist.folderScrolls.length; idx++) {
								theSSO.MP.todolist.folderScrolls[idx].refresh();
							}
						}
						
						theLogger.log('ToDoList_AJAX loaded!');
					}
				}
			},
			error: function(xhr, status) {
				setTimeout(function() {
								theLogger.warn('load ToDoList failed! status=' + status);
						   },
					       _todolist.delay);
			}
		});
	};
	
	this.builder = builder;
	*/
	//1140723	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]，本段為開發測試用	==END==
}

/* 待辦事項處理物件 (叫用ODMSSP.GetToDoList取得ToDoList.XML)
 */
function ToDoList() {
	/* inner functions */
	function _getIconFolderH() {
		var containerH=0, headerH=0;
		if ($('#iconPane').is(':visible')) {
			containerH = $('#iconPane').height();
			//var headerH = $('#todolist_icon_cntr').height();
			headerH = $('#todolist_icon_cntr .folderList').height(); // 2016.8.24 - IE11 reload fix.
			return containerH - headerH - 2;
		}
		else {
			containerH = $('#mpContainer').height();
			headerH = Math.floor(SSOUtil.getEMSize($('#home')[0]) * 2.5);
			return containerH - headerH;
		}
	}
		
	var rootNodeName = 'ToDoList',
	    itemNodeName = 'ODWMSG',
		iconModeContainerId = 'todolist_icon_cntr', //; 2018.10.9 - bug-fix
		listModeContainerId = 'todolist_tb > tbody'; // 2016.3
		
	var builder = ToDoListBuilder();
	
	this.load = function(xmlToDoList, xmldata) {
		var tmSecBegin = Date.now();
		var tmPartBegin;
		if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
			theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- tdlbuilder.load() BEGIN...');
		}
		xmlToDoList = $(xmldata.m_docToDoList);
		if (xmlToDoList!==null) {
			var cnt = $(xmlToDoList).find(itemNodeName).length;
			if (cnt>=1) {
				theLogger.log('todolist cnt=' + (cnt-1)); // 總數須去除第一筆無資料的header
				
				builder.init(xmlToDoList);
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					SSOUtil.dev_logTimeElapse('tdlbuilder.load() DOC cnt=' + (cnt-1) + ', ', tmSecBegin);
				}		
				
				// 圖示內容
				var hideLights = builder.shouldHideLights();
				if (!hideLights) { // 2016.10.27 - 登記桌隱藏燈號模式, 先不建立圖示內容!
					if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
						theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- builder.makeToDoList_Icon() BEGIN...');
						tmPartBegin = Date.now();
					}
				
					builder.makeToDoList_Icon(iconModeContainerId, '1');
					
					if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
						SSOUtil.dev_logTimeElapse('builder.makeToDoList_Icon', tmPartBegin);
					}
				}
				else {
					theLogger.debug('-I- 登記桌隱藏燈號模式, 先不建立圖示內容!');
					$('#listPane #tdl_list_toolbar').hide(); // 2016.10.27 - 隱藏圖示模式切換鈕!
				}
				
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- builder._initToDoList_List() BEGIN...');
					tmPartBegin = Date.now();	
				}
				
				// 2016.3 - 清單內容
				// 2017.8.29 - 1060802, quick-fix
				if (localStorage.mp_display_mode=='icon') {
					$('#mpContainer #listPane').show();
				}
				_initToDoList_List();
				// 2017.8.29 - 1060802, quick-fix
				if (localStorage.mp_display_mode=='icon') {
					$('#mpContainer #listPane').hide();
				}
				
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					SSOUtil.dev_logTimeElapse('tdlbuilder._initToDoList_List', tmPartBegin);
				}
								
				// 設定folderList寬度
				//var width = folderCnt * todolist_icon_folder_w;
				//$folders.css('width', '' + width + 'px');
				
				// 設定各文件夾為scrollable(垂直方向捲動)
				if (!hideLights) {
					var $folders = $('#iconPane .folioList');
					var folderCnt = $folders.length;
				
					//$('#leftBottomPane > div').not(':last').width(todolist_icon_folder_w * folderCnt);
					$('#iconPane div#todolist_icon_cntr').width(todolist_icon_folder_w * folderCnt);
					$('#todolist_icon_cntr ul.folderList').width(todolist_icon_folder_w * folderCnt);
					//$('.todolist_icon .folderList').css('width', _folderCnt * todolist_icon_folder_w);
					if (!!theSSO.MP.todolist.tdlicon_Scroll) {
						theSSO.MP.todolist.tdlicon_Scroll.refresh();
					}
					theLogger.debug('[tdlBuilder.load] folderList width= ' + $('#iconPane .folderList').eq(0).width());
					
					// 清除原有項目
					do {
						var obj = theSSO.MP.todolist.folderScrolls.pop();
					}while(theSSO.MP.todolist.folderScrolls.length);
					
					$('.folderList > li').show();
					
					$('#todolist_icon_cntr .folderList').css({'-webkit-transition-duration': '', '-webkit-transform': ''});
					
					$('.folderList > li .folder_title_btn_l').hide();
					$('.folderList > li .folder_title_btn_r').hide();
					
					
					var h_folder = _getIconFolderH();
					for (var i=0; i<folderCnt; i++) {
						var fid = 'fldr_items_' + i;
						$($folders[i]).attr('id', fid).css('height', h_folder + 'px');
						var folderStr = $($folders[i]).closest('#fldr_'+i).attr('data-folder');
						var newScroll = new IScroll('#'+fid); // 2017.4.18, iScroll -> IScroll, add '#'
						newScroll.folder = folderStr;
						theSSO.MP.todolist.folderScrolls.push(newScroll);
					}
					
					// 2019.12.13 - 1080339 Eric, bug fix.
					//for (var idx in theSSO.MP.todolist.folderScrolls)
					var idx=0;
					if (SSOUtil.typeOf(theSSO.MP.todolist.folderScrolls)=='array') {
						for (idx=0; idx<theSSO.MP.todolist.folderScrolls.length; idx++) {
							theSSO.MP.todolist.folderScrolls[idx].refresh();
						}
					}
				}
				
				theLogger.log('ToDoList loaded!');
			}
		}
	};
	
	this.loadJSON = function(todolist) {
		var tmSecBegin = Date.now();
		var tmPartBegin;
		if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
			theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- tdlbuilder.initByJSON() BEGIN...');
		}
		
		if (typeof todolist.ODWMSG=='object' && todolist.ODWMSG!==null) {
			var cnt = 0;
			var arrToDo = [];
			if (SSOUtil.typeOf(todolist.ODWMSG)=='array') {
				cnt = todolist.ODWMSG.length;
				arrToDo = todolist.ODWMSG;
			}
			else {
				cnt = 1;
				arrToDo = [todolist.ODWMSG];
			}
		
			if (cnt>=1) {
				theLogger.log('todolist cnt=' + (cnt-1)); // 總數須去除第一筆無資料的header
				
				builder.initByJSON(arrToDo);
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					SSOUtil.dev_logTimeElapse('tdlbuilder.initByJSON() DOC cnt=' + (cnt-1) + ', ', tmSecBegin);
				}		
				
				// 圖示內容
				var hideLights = builder.shouldHideLights();
				if (!hideLights) { // 2016.10.27 - 登記桌隱藏燈號模式, 先不建立圖示內容!
					if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
						theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- builder.makeToDoList_Icon() BEGIN...');
						tmPartBegin = Date.now();
					}
				
					builder.makeToDoList_Icon(iconModeContainerId, '1');
					
					if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
						SSOUtil.dev_logTimeElapse('builder.makeToDoList_Icon', tmPartBegin);
					}
				}
				else {
					theLogger.debug('-I- 登記桌隱藏燈號模式, 先不建立圖示內容!');
					$('#listPane #tdl_list_toolbar').hide(); // 2016.10.27 - 隱藏圖示模式切換鈕!
				}
				
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- builder._initToDoList_List() BEGIN...');
					tmPartBegin = Date.now();	
				}
				
				// 2016.3 - 清單內容

				// 2017.8.29 - 1060802, quick-fix
				if (localStorage.mp_display_mode=='icon') {
					$('#mpContainer #listPane').show();
				}
				_initToDoList_List();

				// 2017.8.29 - 1060802, quick-fix
				if (localStorage.mp_display_mode=='icon') {
					$('#mpContainer #listPane').hide();
				}
				
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					SSOUtil.dev_logTimeElapse('builder._initToDoList_List', tmPartBegin);
				}
								
				// 設定folderList寬度
				//var width = folderCnt * todolist_icon_folder_w;
				//$folders.css('width', '' + width + 'px');
				
				// 設定各文件夾為scrollable(垂直方向捲動)
				if (!hideLights) {
					var $folders = $('#iconPane .folioList');
					var folderCnt = $folders.length;
				
					//$('#leftBottomPane > div').not(':last').width(todolist_icon_folder_w * folderCnt);
					$('#iconPane div#todolist_icon_cntr').width(todolist_icon_folder_w * folderCnt);
					$('#todolist_icon_cntr ul.folderList').width(todolist_icon_folder_w * folderCnt);
					//$('.todolist_icon .folderList').css('width', _folderCnt * todolist_icon_folder_w);
					if (!!theSSO.MP.todolist.tdlicon_Scroll) {
						theSSO.MP.todolist.tdlicon_Scroll.refresh();
					}
					theLogger.debug('[tdlBuilder.load] folderList width= ' + $('#iconPane .folderList').eq(0).width());
					
					// 清除原有項目
					do {
						var obj = theSSO.MP.todolist.folderScrolls.pop();
					}while(theSSO.MP.todolist.folderScrolls.length);
					
					$('.folderList > li').show();
					
					$('#todolist_icon_cntr .folderList').css({'-webkit-transition-duration': '', '-webkit-transform': ''});
					
					$('.folderList > li .folder_title_btn_l').hide();
					$('.folderList > li .folder_title_btn_r').hide();
					
					
					var h_folder = _getIconFolderH();
					var i=0, idx=null;
					for (i=0; i<folderCnt; i++) {
						var fid = 'fldr_items_' + i;
						$($folders[i]).attr('id', fid).css('height', h_folder + 'px');
						var folderStr = $($folders[i]).closest('#fldr_'+i).attr('data-folder');
						var newScroll = new IScroll('#' + fid); // 2017.4.18, iScroll -> IScroll, add '#'
						newScroll.folder = folderStr;
						theSSO.MP.todolist.folderScrolls.push(newScroll);
					}
					
					for (idx in theSSO.MP.todolist.folderScrolls) {
						if (theSSO.MP.todolist.folderScrolls.hasOwnProperty(idx)) {
							theSSO.MP.todolist.folderScrolls[idx].refresh();
						}
					}
				}
				
				theLogger.log('ToDoList loaded!');
			}
		}
	};
	
	this.builder = builder;
	this.deleteMsg = function(docObj, removeObj, updateLight) {
		if (typeof removeObj==='undefined') {
			removeObj = false;
		}
		
		builder.deleteMsg(docObj, removeObj, updateLight);
	};
	this.restoreMsg = function(docObj) {
		if (!!docObj) {
			builder.restoreMsg(docObj);
		}
	};
} // EOF ToDoList function object

// 回傳用來建立待辦事項清單之物件
function ToDoListBuilder() {
	// 2021.7 - 1100854 Eric
	let _sNewTimeHeader = '送方<br />傳送時間';
	if (SSO_CONFIG.OrgNickName=='NUK') {
		_sNewTimeHeader = '送方<br />傳送 時間　';
	}

	// 2018.11 - Eric, bug-fix, data-prop 不一致修正! (inchargeUserName->ICUserName, sendTime->newTime, sendTo->toUserName etc...)
	var _listHeader = {
		normal: '<table id="todolist_tb" data-id="normal"> <!-- 傳統條列式待辦事項清單 -->' +
					'<thead> <!-- todolist 標題列 -->' +
						'<tr> <!--th><a href="#">序</a></th-->' +
							'<th data-prop="speed" style="width:1.2em"><a href="#" data-prop="speed">速<br/>別</a><div class="sortIcon"></div></th>' +
							'<th data-prop="light" style="width:1.2em"><a href="#" data-prop="light">燈<br/>號</a><div class="sortIcon"></div></th>' +
							'<th data-prop="secret" style="width:1.2em"><a href="#" data-prop="secret">密<br/>等</a><div class="sortIcon"></div></th>' +
							'<th data-prop="signType" style="width:1.2em"><a href="#">類<br/>型</a><div class="sortIcon"></div></th>' +
							'<th data-prop="opened" style="width:1.6em"><a href="#" data-prop="opened"><a href="#">閱<br/>讀</a></a><div class="sortIcon"></div></th>' +
							'<th style="width:5em;" data-prop="dueDate"><a href="#">辦理<br/>期限</a><div class="sortIcon"></div></th>' +
							'<th style="width:5em;" data-prop="signDueDate"><a href="#">陳核<br/>限辦日</a><div class="sortIcon"></div></th>' +
							'<th class="docno_header" style="width:10em;" data-prop="docNo"><a href="#" data-prop="docNo">文　號</a><!--div class="ui-icon-arrow-1-s" style="float:right;cursor:pointer;"></div--><div class="sortIcon"></div></th>' +
							'<th style="width:3.5em;" data-prop="ICOUName"><a href="#" data-prop="ICOUName">承辦<br/>單位</a><div class="sortIcon"></div></th>' +
							'<th style="width:4em;" data-prop="ICUserName"><a href="#" data-prop="ICUserName">承辦人</a><div class="sortIcon"></div></th>' +
							'<th style="width:3.5em;" data-prop="fromOUName"><a href="#" data-prop="fromOUName">送文<br/>單位</a><div class="sortIcon"></div></th>' +
							'<th style="min-width:18em;" class="subject_header" data-prop="subject"><a href="#">主　　旨</a><div class="sortIcon"></div></th>' +
							'<th style="width:5em;" data-prop="txName"><a href="#" data-prop="txName">異動別</a><div class="sortIcon"></div></th>' +
							'<th data-prop="toUserName" style="width:4em"><a href="#" data-prop="toUserName">傳送至</a><div class="sortIcon"></div></th>' +
							'<th class="newTime" style="width:4.5em;" data-prop="newTime"><a href="#" data-prop="newTime">' + _sNewTimeHeader + ' </a><div class="sortIcon"></div></th>' +
						'</tr>' +
					'</thead>' +
					'<tbody> <!-- 待辦事項清單內容 -->' +
					'</tbody>' +
				'</table>',
		hideLight: '<table id="todolist_tb" data-id="hideLight"> <!-- 傳統條列式待辦事項清單 -->' +
						'<thead> <!-- todolist 標題列 -->' +
							'<tr>' +
								'<th style="width:5em;" data-prop="dueDate"><a href="#">辦理<br/>期限</a><div class="sortIcon"></div></th>' +
								'<th class="docno_header" style="width:10em;" data-prop="docNo"><a href="#" data-prop="docNo">文　　號</a><div class="sortIcon"></div></th>' +
								'<th style="width:5em;" data-prop="fromOUName"><a href="#" data-prop="fromOUName">送文<br/>單位</a><div class="sortIcon"></div></th>' +
								'<th style="min-width:18em;" class="subject_header" data-prop="subject"><a href="#">主　　旨</a><div class="sortIcon"></div></th>' +
								'<th class="newTime" style="width:4.5em;" data-prop="newTime"><a href="#" data-prop="newTime">' + _sNewTimeHeader + '</a><div class="sortIcon"></div></th>' +
							'</tr>' +
						'</thead>' +
						'<tbody> <!-- 待辦事項清單內容 -->' +
						'</tbody>' +
					'</table>',
		/* scree_w<=1024使用 */
		ss_normal: '<table id="todolist_tb" data-id="ss_normal"> <!-- 傳統條列式待辦事項清單 -->' +
					'<thead> <!-- todolist 標題列 -->' +
						'<tr> <!--th><a href="#">序</a></th-->' +
							'<th data-prop="speed" style="width:1.2em"><a href="#" data-prop="speed">速<br/>別</a><div class="sortIcon"></div></th>' +
							'<th data-prop="light" style="width:1.2em"><a href="#" data-prop="light">燈<br/>號</a><div class="sortIcon"></div></th>' +
							'<th data-prop="secret" style="width:1.2em"><a href="#" data-prop="secret">密<br/>等</a><div class="sortIcon"></div></th>' +
							'<th data-prop="signType" style="width:1.2em"><a href="#">類<br/>型</a><div class="sortIcon"></div></th>' +
							'<th data-prop="opened" style="width:1.6em"><a href="#" data-prop="opened"><a href="#">閱<br/>讀</a></a><div class="sortIcon"></div></th>' +
							'<th style="width:3em; max-width:3.6em;" data-prop="dueDate"><a href="#">辦理<br/>期限</a><div class="sortIcon"></div></th>' +
							'<th class="docno_header" style="width:5em;" data-prop="docNo"><a href="#" data-prop="docNo">文　號</a><!--div class="ui-icon-arrow-1-s" style="float:right;cursor:pointer;"></div--><div class="sortIcon"></div></th>' +
							'<th style="width:2em; max-width:2.6em;" data-prop="ICUserName"><a href="#" data-prop="ICUserName">承辦人</a><div class="sortIcon"></div></th>' +
							'<th style="width:2.6em;" data-prop="fromOUName"><a href="#" data-prop="fromOUName">送文<br/>單位</a><div class="sortIcon"></div></th>' +
							'<th style="width:18em; min-width:15em;" class="subject_header" data-prop="subject"><a href="#">主　　旨</a><div class="sortIcon"></div></th>' +
							'<th style="width:2.5em; max-width:2.6em;" data-prop="txName"><a href="#" data-prop="txName">異動別</a><div class="sortIcon"></div></th>' +
							'<th data-prop="toUserName"><a href="#" data-prop="toUserName">傳送至</a><div class="sortIcon"></div></th>' +
							'<th class="newTime" style="width:4.5em;" data-prop="newTime"><a href="#" data-prop="newTime">' + _sNewTimeHeader + '</a><div class="sortIcon"></div></th>' +
						'</tr>' +
					'</thead>' +
					'<tbody> <!-- 待辦事項清單內容 -->' +
					'</tbody>' +
				'</table>',
		ss_hideTransInfo: '<table id="todolist_tb" data-id="ss_hideTransInfo"> <!-- 傳統條列式待辦事項清單 -->' +
					'<thead> <!-- todolist 標題列 -->' +
						'<tr> <!--th><a href="#">序</a></th-->' +
							'<th data-prop="speed" style="width:1.2em"><a href="#" data-prop="speed">速<br/>別</a><div class="sortIcon"></div></th>' +
							'<th data-prop="light" style="width:1.2em"><a href="#" data-prop="light">燈<br/>號</a><div class="sortIcon"></div></th>' +
							'<th data-prop="secret" style="width:1.2em"><a href="#" data-prop="secret">密<br/>等</a><div class="sortIcon"></div></th>' +
							'<th data-prop="signType" style="width:1.2em"><a href="#">類<br/>型</a><div class="sortIcon"></div></th>' +
							'<th data-prop="opened" style="width:1.6em"><a href="#" data-prop="opened"><a href="#">閱<br/>讀</a></a><div class="sortIcon"></div></th>' +
							'<th style="width:3em; max-width:3.6em;" data-prop="dueDate"><a href="#">辦理<br/>期限</a><div class="sortIcon"></div></th>' +
							'<th class="docno_header" style="width:5em;" data-prop="docNo"><a href="#" data-prop="docNo">文　號</a><!--div class="ui-icon-arrow-1-s" style="float:right;cursor:pointer;"></div--><div class="sortIcon"></div></th>' +
							'<th style="width:2em; max-width:2.6em;" data-prop="ICUserName"><a href="#" data-prop="ICUserName">承辦人</a><div class="sortIcon"></div></th>' +
							'<th style="width:2em; max-width:2.6em;" data-prop="fromOUName"><a href="#" data-prop="fromOUName">送文<br/>單位</a><div class="sortIcon"></div></th>' +
							'<th style="width:18em; min-width:15em;" class="subject_header" data-prop="subject"><a href="#">主　　旨</a><div class="sortIcon"></div></th>' +
							'<th class="newTime" style="width:4.5em;" data-prop="newTime"><a href="#" data-prop="newTime">' + _sNewTimeHeader + '</a><div class="sortIcon"></div></th>' +
						'</tr>' +
					'</thead>' +
					'<tbody> <!-- 待辦事項清單內容 -->' +
					'</tbody>' +
				'</table>',
		/* 2021.2.19 - 1090927 Eric, SDLMode使用, for iPhone Landscape */
		sdl_normal: '<table id="todolist_tb" data-id="sdl_normal"> <!-- 傳統條列式待辦事項清單 -->' +
					'<thead> <!-- todolist 標題列 -->' +
						'<tr> <!--th><a href="#">序</a></th-->' +
							'<th data-prop="speed" style="width:1.2em"><a href="#" data-prop="speed">速<br/>別</a><div class="sortIcon"></div></th>' +
							'<th data-prop="light" style="width:1.2em"><a href="#" data-prop="light">燈<br/>號</a><div class="sortIcon"></div></th>' +
							'<th data-prop="secret" style="width:1.2em"><a href="#" data-prop="secret">密<br/>等</a><div class="sortIcon"></div></th>' +
							'<th data-prop="signType" style="width:1.2em"><a href="#">類<br/>型</a><div class="sortIcon"></div></th>' +
							'<th data-prop="opened" style="width:1.6em"><a href="#" data-prop="opened"><a href="#">閱<br/>讀</a></a><div class="sortIcon"></div></th>' +
							'<th style="width:3em; max-width:3.1em;" data-prop="dueDate"><a href="#">辦理<br/>期限</a><div class="sortIcon"></div></th>' +
							'<th class="docno_header" style="width:4em;" data-prop="docNo"><a href="#" data-prop="docNo">文　號</a><!--div class="ui-icon-arrow-1-s" style="float:right;cursor:pointer;"></div--><div class="sortIcon"></div></th>' +
							'<th style="width:2em; max-width:2.6em;" data-prop="ICUserName"><a href="#" data-prop="ICUserName">承辦人</a><div class="sortIcon"></div></th>' +
							'<th style="width:2.6em; max-width:3em;" data-prop="fromOUName"><a href="#" data-prop="fromOUName">送文<br/>單位</a><div class="sortIcon"></div></th>' +
							'<th style="width:18em; min-width:15em;" class="subject_header" data-prop="subject"><a href="#">主　　旨</a><div class="sortIcon"></div></th>' +
							'<th style="width:2.5em; max-width:2.6em;" data-prop="txName"><a href="#" data-prop="txName">異動別</a><div class="sortIcon"></div></th>' +
							'<th data-prop="toUserName"><a href="#" data-prop="toUserName">傳送至</a><div class="sortIcon"></div></th>' +
							'<th class="newTime" style="width:4.5em;" data-prop="newTime"><a href="#" data-prop="newTime">' + _sNewTimeHeader + '</a><div class="sortIcon"></div></th>' +
						'</tr>' +
					'</thead>' +
					'<tbody> <!-- 待辦事項清單內容 -->' +
					'</tbody>' +
				'</table>',
		/* 2021.2.19 - 1090927 Eric, SDLMode使用, for iPhone Landscape */
		sdl_hideTransInfo: '<table id="todolist_tb" data-id="sdl_hideTransInfo"> <!-- 傳統條列式待辦事項清單 -->' +
				'<thead> <!-- todolist 標題列 -->' +
					'<tr> <!--th><a href="#">序</a></th-->' +
						'<th data-prop="speed" style="width:1.2em"><a href="#" data-prop="speed">速<br/>別</a><div class="sortIcon"></div></th>' +
						'<th data-prop="light" style="width:1.2em"><a href="#" data-prop="light">燈<br/>號</a><div class="sortIcon"></div></th>' +
						'<th data-prop="secret" style="width:1.2em"><a href="#" data-prop="secret">密<br/>等</a><div class="sortIcon"></div></th>' +
						'<th data-prop="signType" style="width:1.2em"><a href="#">類<br/>型</a><div class="sortIcon"></div></th>' +
						'<th data-prop="opened" style="width:1.6em"><a href="#" data-prop="opened"><a href="#">閱<br/>讀</a></a><div class="sortIcon"></div></th>' +
						'<th style="width:3em; max-width:3.1em;" data-prop="dueDate"><a href="#">辦理<br/>期限</a><div class="sortIcon"></div></th>' +
						'<th class="docno_header" style="width:4em;" data-prop="docNo"><a href="#" data-prop="docNo">文　號</a><!--div class="ui-icon-arrow-1-s" style="float:right;cursor:pointer;"></div--><div class="sortIcon"></div></th>' +
						'<th style="width:2em; max-width:2.6em;" data-prop="ICUserName"><a href="#" data-prop="ICUserName">承辦人</a><div class="sortIcon"></div></th>' +
						'<th style="width:2em; max-width:2.6em;" data-prop="fromOUName"><a href="#" data-prop="fromOUName">送文<br/>單位</a><div class="sortIcon"></div></th>' +
						'<th style="width:18em; min-width:15em;" class="subject_header" data-prop="subject"><a href="#">主　　旨</a><div class="sortIcon"></div></th>' +
						'<th class="newTime" style="width:4.5em;" data-prop="newTime"><a href="#" data-prop="newTime">' + _sNewTimeHeader + '</a><div class="sortIcon"></div></th>' +
					'</tr>' +
				'</thead>' +
				'<tbody> <!-- 待辦事項清單內容 -->' +
				'</tbody>' +
			'</table>',
		// 2018.09.27 - 1070955
		fullMPCol: 
			'<table id="todolist_tb" data-id="fullMPCol"> <!-- 傳統條列式待辦事項清單 -->' +
					'<thead> <!-- todolist 標題列 -->' +
					'<tr> <!--th><a href="#">序</a></th-->' +
						'<th data-prop="speed" style="width:1.2em"><a href="#" data-prop="speed">速<br/>別</a><div class="sortIcon"></div></th>' +
						'<th data-prop="light" style="width:1.2em"><a href="#" data-prop="light">燈<br/>號</a><div class="sortIcon"></div></th>' +
						'<th data-prop="secret" style="width:1.2em"><a href="#" data-prop="secret">密<br/>等</a><div class="sortIcon"></div></th>' +
						'<th data-prop="signType" style="width:1.2em"><a href="#">類<br/>型</a><div class="sortIcon"></div></th>' +
						'<th data-prop="opened" style="width:1.6em"><a href="#" data-prop="opened"><a href="#">閱<br/>讀</a></a><div class="sortIcon"></div></th>' +
						'<th style="width:5em;" data-prop="dueDate"><a href="#">辦理<br/>期限</a><div class="sortIcon"></div></th>' +
						'<th style="width:5em;" data-prop="signDueDate"><a href="#">陳核<br/>限辦日</a><div class="sortIcon"></div></th>' +
						'<th class="docno_header" style="width:10em;" data-prop="docNo"><a href="#" data-prop="docNo">文　號</a><!--div class="ui-icon-arrow-1-s" style="float:right;cursor:pointer;"></div--><div class="sortIcon"></div></th>' +
						'<th style="width:4em;" data-prop="ICOUName"><a href="#" data-prop="ICOUName">承辦<br/>單位</a><div class="sortIcon"></div></th>' +
						'<th style="width:5em;" data-prop="ICUserName"><a href="#" data-prop="ICUserName">承辦人</a><div class="sortIcon"></div></th>' +
						'<th style="width:3.5em;" data-prop="fromOUName"><a href="#" data-prop="fromOUName">送文<br/>單位</a><div class="sortIcon"></div></th>' +
						'<th style="min-width:18em;" class="subject_header" data-prop="subject"><a href="#">主　　旨</a><div class="sortIcon"></div></th>' +
						'<th style="width:5.5em;" data-prop="txName"><a href="#" data-prop="txName">異動別</a><div class="sortIcon"></div></th>' +
						'<th data-prop="toUserName" style="width:4em"><a href="#" data-prop="toUserName">傳送至</a><div class="sortIcon"></div></th>' +
						'<th style="width:5em;" data-prop="fromOrg"><a href="#" data-prop="fromOrg">來文<br/>機關</a><div class="sortIcon"></div></th>' +
						'<th class="newTime" style="width:4.5em;" data-prop="newTime"><a href="#" data-prop="newTime">' + _sNewTimeHeader + '</a><div class="sortIcon"></div></th>' +
						'<th data-prop="currLocate" style="width:4em"><a href="#" data-prop="" style="cursor:default">目前<br/>位置</a><div class="sortIcon"></div</th>' +
					'</tr>' +
				'</thead>' +
				'<tbody> <!-- 待辦事項清單內容 -->' +
				'</tbody>' +
			'</table>',
	};
	
	// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
	var _toolTip = {
		speed:{
			"1":"普通件",
			"2":"速件",
			"3":"最速件",
			"4":"不需填列",
		},
		secret:{
			"":"普通",
			"1":"普通",
			"2":"密件",
			"3":"密件",
			"4":"密件",
			"5":"密件",
		},
		ReadNon:"未讀取",
		Readed:"已讀取",
		signType:{
			"E": "線上簽核",
			"P": "紙本簽核",
			"W": "通知",
		},
		light:{
			"white":"未列入時效計算之公文及通知",
			"purple":"逾期未歸檔",
			"green":"辦理中公文",
			"red":"逾期未辦畢公文",
			"yellow":"即將逾期未辦畢公文",
		},
		resupply:{
			"0":"辦理中",
			"1":"補件中" ,
			"2":"補件收件",
		},       
	};
	
	//1111124	Leslie[1111127]	修改MP清單圖示顯示方式，並支援依客製化設定改為文字圖示
	var clsWord = '';
		
	//1110926	Leslie[1110889]	新增客製化欄位設定功能
	var _customTodo = {
		speed: {
			Header : '<th data-prop="speed" style="width:1.2em"><a href="#" data-prop="speed">速<br/>別</a><div class="sortIcon"></div></th>',
			Column : function(speed, doc){
				if(doc.signType == 'W' && speed.length === 0)
					speed = 3;
				let speedName = ['','普通','速件','最速件']
				let spIdx = (isNaN(speed % 4))? -1: (speed % 4);
				if(spIdx >= 0)
					//1111124	Leslie[1111127]	修改MP清單圖示顯示方式，並支援依客製化設定改為文字圖示
					// return '<td data-prop="speed" title="'+_toolTip.speed[speed]+'"> <img alt="Spd:'+speedName[spIdx]+'" src="./IMAGE/ART/Todo-Speed'+(!!spIdx?spIdx:1)+'.png" /></td>';
					return `<td data-prop="speed" title="${_toolTip.speed[speed]}" class="MP-Icon MP-SPD${speed} ${clsWord}"></td>`;
				else
					return '<td></td>';
			}
		},
		light: {
			Header : '<th data-prop="light" style="width:1.2em"><a href="#" data-prop="light">燈<br/>號</a><div class="sortIcon"></div></th>',
			Column : function(lightInfo, doc){
				//1111124	Leslie[1111127]	修改MP清單圖示顯示方式，並支援依客製化設定改為文字圖示
				// return '<td data-prop="light" title="' + theSSO.Util.htmlEncode(_toolTip.light[lightInfo.light]) + '"><img alt="light:' + theSSO.Util.htmlEncode(lightInfo.light) + '" src="'+ theSSO.Util.htmlEncode(lightInfo.url) + '"></img></td>';
				return `<td data-prop="light" title="${theSSO.Util.htmlEncode(_toolTip.light[lightInfo.light])}" class="MP-Icon MP-LT${lightInfo.value} ${clsWord}"></td>`;
			}
		},
		secret: {
			Header : '<th data-prop="secret" style="width:1.2em"><a href="#" data-prop="secret">密<br/>等</a><div class="sortIcon"></div></th>',
			Column : function(secret, doc){
				let secIdx = secret * 1;
				//1111124	Leslie[1111127]	修改MP清單圖示顯示方式，並支援依客製化設定改為文字圖示
				// return '<td data-prop="secret" title="'+_toolTip.secret[secret]+'"> <img alt="sec:'+((secIdx < 2)?'白':'黃')+'" src="./IMAGE/ART/Todo-Secret'+((secIdx < 2)?1:2)+'.png" /></td>';
				return `<td data-prop="secret" title="${_toolTip.secret[secret]}" class="MP-Icon MP-SEC${(secIdx < 2)?1:2} ${clsWord}"></td>`;
			}
		},
		signType: {
			Header : '<th data-prop="signType" style="width:1.2em"><a href="#">類<br/>型</a><div class="sortIcon"></div></th>',
			Column : function(signType, doc){
				//1111124	Leslie[1111127]	修改MP清單圖示顯示方式，並支援依客製化設定改為文字圖示
				// var signTypeImg = (signType == 'E')?'Online':'Pepper';
				// signTypeImg = (signType == 'W')?'Notify':signTypeImg
				// return '<td data-prop="signType" title="'+_toolTip.signType[signType]+'"> <img alt="signType:'+signType+'" src="./IMAGE/ART/Todo-SignType'+signTypeImg+'.png" /></td>';
				return `<td data-prop="signType" title="${_toolTip.signType[signType]}" class="MP-Icon MP-${signType} ${clsWord}"></td>`;
			},
			SetName : 'showSignType',
		},
		signTime: {
			Header : '<th data-prop="opened" style="width:1.6em"><a href="#" data-prop="opened"><a href="#">閱<br/>讀</a></a><div class="sortIcon"></div></th>',
			Column : function(signTime, doc){
				var Readed = !!(doc.signTime.length || doc.isDraft)
				//1111124	Leslie[1111127]	修改MP清單圖示顯示方式，並支援依客製化設定改為文字圖示
				// return '<td class="opened" data-prop="opened"  title="'+(Readed?_toolTip.Readed:_toolTip.ReadNon)+'"> <img src="./IMAGE/ART/Todo-'+(Readed?'Readed':'ReadNon')+'.png" alt="opened:'+Readed*1+'" /></td>';
				return `<td class="opened MP-Icon MP-RD${Readed*1}" data-prop="opened"  title="${(Readed?_toolTip.Readed:_toolTip.ReadNon)}"></td>`;
			}
		},
		docPtyName: {
			get Header(){
				if (typeof that.showDocPropertyLen!='number' || that.showDocPropertyLen<1) {
					that.showDocPropertyLen = 5;
				}
				else if (that.showDocPropertyLen>15) {
					that.showDocPropertyLen = 15;
				}
				let colWidth = 'calc(' + that.showDocPropertyLen + 'em + 8px)';
				let colMaxWidth = (that.showDocPropertyLen+1) + 'em';
				return '<th style="width:' + colWidth + ';max-width:' + colMaxWidth +'" data-prop="docPtyName"><a href="#">公文性質</a><div class="sortIcon"></div></th>';
			},
			Column : function(dispDocPtyName, doc){
				if (dispDocPtyName.length && (dispDocPtyName.length>that.showDocPropertyLen)) {
					dispDocPtyName = doc.docPtyName.substr(0, that.showDocPropertyLen);
				}
				return '<td data-prop="docPtyName" class="to_e tbc_centre td_docPty">' + theSSO.Util.htmlEncode(dispDocPtyName) + '</td>';
			},
			SetName : 'showDocProperty',
		},
		dueDate: {
			Header : '<th style="width:5em;" data-prop="dueDate"><a href="#">辦理<br/>期限</a><div class="sortIcon"></div></th>',
			Column : function(dueDate, doc){
				if(doc.signType == 'W')
					return '<td class="to_e"></td>';
				return '<td data-prop="dueDate" class="to_e tbc_centre">' + _getFormatDate(dueDate) + '</td>';
			}
		},
		rcvDate: {
			Header : '<th style="width:5em;" data-prop="rcvDate"><a href="#">收創文<br/>日期</a><div class="sortIcon"></div></th>',
			Column : function(rcvDate, doc){
				if(doc.signType == 'W')
					return '<td class="to_e"></td>';
				return '<td data-prop="rcvDate" class="to_e tbc_centre">' + _getFormatDate(rcvDate) + '</td>'; // 2017.10.24 - 1060967, add tbc_centre
			},
			SetName : 'showRcvDate',
		},
		signDueDate: {
			Header : '<th style="width:5em;" data-prop="signDueDate"><a href="#">陳核<br/>限辦日</a><div class="sortIcon"></div></th>',
			Column : function(signDueDate, doc){
				if(doc.signType == 'W')
					return '<td class="to_e"></td>';
				return '<td data-prop="signDueDate" class="to_e tbc_centre">' + _getFormatDate(signDueDate) + '</td>'
			},
			SetName : 'showSignDueDate',
		},
		docNo: {
			Header : '<th class="docno_header" style="width:10em;" data-prop="docNo"><a href="#" data-prop="docNo">文　號</a><!--div class="ui-icon-arrow-1-s" style="float:right;cursor:pointer;"></div--><div class="sortIcon"></div></th>',
			Column : function(docNo, doc){
				if(doc.signType == 'W')
					return '<td class="docno urlLink" data-prop="docNo" data-msgid="' + theSSO.Util.htmlEncode(doc.msgId) + '">[開啟...]</td>'
				if (docNo.length){
					let folder = doc.folder + '-' + doc.subfolder;
					let rrbGrayColor = false;
					if (SSOUtil.typeOf(_customTodo.rrbGrayColorFolders)=='array' && _customTodo.rrbGrayColorFolders.length && _customTodo.rrbGrayColorFolders.indexOf(folder)!=-1) {
						rrbGrayColor = true;
					}

					var docNoClass = 'docno context-menu-todo';
					if (_customTodo.colorDocNo) {
						if (doc.secret=='2' || doc.secret=='3' || doc.secret=='4' || doc.secret=='5') {
							docNoClass = 'docno context-menu-todo redText';
						}
					}
					else if (rrbGrayColor) {
						docNoClass += ' rrbSpecColor';
					}
					//1110323 David 1101416 如TODO_LIST有註記需變更文號顏色時，調整畫面文號顏色
					else if(typeof doc.ODWMSG.CHANGE_DOC_COLOR =='string' && doc.ODWMSG.CHANGE_DOC_COLOR == "Y"){
						docNoClass += ' redText';
					}

					// 2016.12.5 - 1051175, 鐵工局稽核類公文, 文號前面加'*'
					var docNoForDisplay = doc.docNo;
					if (SSO_CONFIG.OrgNickName=='RRB' || _debug) {
						var isAudit = (typeof doc.ODWMSG.IS_AUDIT=='string')?doc.ODWMSG.IS_AUDIT:'N';
						if (isAudit=='Y'||isAudit=='y') {
							docNoForDisplay = '*' + doc.docNo;
						}
					}
					return '<td class="' + docNoClass + '" data-prop="docNo" data-docno="' + theSSO.Util.htmlEncode(doc.docNo) + '">' + theSSO.Util.htmlEncode(docNoForDisplay) + '</td>';
				}else{
					if (_isDraftMsg(doc)) 
						return '<td class="docno" data-prop="docNo" data-docno="">[尚未取號]</td>';
					else 
						return '<td class="docno" data-prop="docNo" data-docno=""></td>';
				}
			}
		},
		ICOUName: {
			Header : '<th style="width:3.5em;" data-prop="ICOUName"><a href="#" data-prop="ICOUName">承辦<br/>單位</a><div class="sortIcon"></div></th>',
			Column : function(ICOUName, doc){
				return '<td data-prop="ICOUName" class="to_e">' + (ICOUName.length?theSSO.Util.htmlEncode(ICOUName):'') + '</td>'
			},
			SetName : 'showICOU',
		},
		ICUserName: {
			Header : '<th style="width:5.5em;" data-prop="ICUserName"><a href="#" data-prop="ICUserName">承辦人</a><div class="sortIcon"></div></th>',
			Column : function(ICUserName, doc){
				return '<td data-prop="ICUserName" class="to_e">' + (ICUserName.length?theSSO.Util.htmlEncode(ICUserName):'') + '</td>'
			},
			SetName : 'showICUser',
		},
		fromOUName: {
			Header : '<th style="width:3.5em;" data-prop="fromOUName"><a href="#" data-prop="fromOUName">送文<br/>單位</a><div class="sortIcon"></div></th>',
			Column : function(fromOUName, doc){
				if(doc.signType == 'W')
					return '<td class="to_e" data-prop="fromOUName"></td>'
				return '<td data-prop="fromOUName" class="to_e">' + (fromOUName.length?theSSO.Util.htmlEncode(fromOUName):'') + '</td>'
			},
			SetName : 'showFromOU',
		},
		fromSubject: {
			Header : '<th style="min-width:18em;" class="subject_header" data-prop="subject"><a href="#">主　　旨</a><div class="sortIcon"></div></th>',
			Column : function(fromSubject, doc){
				var sSubj = '';
				var len = 256; // 20; 2016.7 - change length
				if (fromSubject.length > len) {
					sSubj = fromSubject.substr(0, len);
					sSubj += '...';
				}
				else {
					sSubj = fromSubject;
				}
				
				if (!!_debug) {
					var sfolder = doc.folder + '-' + doc.subfolder;
					var sEscSubj = SSOUtil.escapeXml(sSubj);
					return '<td class="subject" data-prop="subject" title="'+ theSSO.Util.htmlEncode(sfolder) + ', MsgId=' + theSSO.Util.htmlEncode(doc.msgId) + '">' + theSSO.Util.htmlEncode(sEscSubj) + '</td>';
				}
				else {
					//1120209	Leslie	[銓敘部-序12]補上ToolTip
					// return '<td class="subject"  data-prop="subject">' + theSSO.Util.htmlEncode(SSOUtil.escapeXml(sSubj)) + '</td>';
					return `<td class="subject"  data-prop="subject" title="${theSSO.Util.htmlEncode(fromSubject)}">${theSSO.Util.htmlEncode(SSOUtil.escapeXml(sSubj))}</td>`;
				}
			}
		},
		txName: {
			Header : '<th style="width:5.5em;" data-prop="txName"><a href="#" data-prop="txName">異動別</a><div class="sortIcon"></div></th>',
			Column : function(txName, doc){
				if(doc.signType == 'W')
					return '<td class="to_e"></td>';
				return '<td data-prop="txName" class="to_e">' + (txName.length?theSSO.Util.htmlEncode(txName):'') + '</td>'
			},
			SetName : 'hideTransInfo',
		},
		toUserName: {
			Header : '<th data-prop="toUserName" style="width:8em"><a href="#" data-prop="toUserName">傳送至</a><div class="sortIcon"></div></th>',
			Column : function(toUserName, doc){
				if(doc.signType == 'W')
					return '<td class="to_e"></td>';
				if (typeof toUserName=='string') {
					return '<td data-prop="toUserName" class="to_e">' + (toUserName.length?theSSO.Util.htmlEncode(toUserName):'') + '</td>';
				}
				else {
					// toOUName, toRoleName
					var _toXXX = theSSO.Util.htmlEncode(doc.toOUName);
					var _sendTo = theSSO.Util.htmlEncode(doc.toOUName); // 2018.10.2 - 1070955
					if (typeof doc.toRoleName=='string' && doc.toRoleName.length) {
						_toXXX += '<br>' + theSSO.Util.htmlEncode(doc.toRoleName);
						_sendTo += '-' + theSSO.Util.htmlEncode(doc.toRoleName);
					}
					return '<td data-prop="toUserName" class="to_e" title="'+ _sendTo +'">' + _toXXX + '</td>';
				}
			},
			SetName : 'hideTransInfo',
		},
		fromOrg: {
			Header : '<th style="width:5em;" data-prop="fromOrg"><a href="#" data-prop="fromOrg">來文<br/>機關</a><div class="sortIcon"></div></th>',
			Column : function(fromOrg, doc){
				if (fromOrg.length && doc.signType != 'W') 
					return '<td data-prop="fromOrg" class="to_e" title="'+ theSSO.Util.htmlEncode(fromOrg) +'">' + theSSO.Util.htmlEncode(fromOrg) + '</td>'; // 2016.9.8 - 調整顯示內容
				else 
					return '<td data-prop="fromOrg" class="to_e"></td>';
			},
			SetName : 'showFromOrg',
		},
		newTime: {
			Header : '<th class="newTime" style="width:4.5em;" data-prop="newTime"><a href="#" data-prop="newTime">送方<br />傳送時間</a><div class="sortIcon"></div></th>',
			Column : function(newTime, doc){
				if (doc.newTime.length==11)	{
					sDate = doc.newTime.substring(3, 5) + '/' +
								doc.newTime.substring(5, 7) + ' ';
					sTime = doc.newTime.substring(7, 9) + ':' +
								doc.newTime.substring(9, 11);
					//2016.12.9	Leslie	增加隱藏欄位以隔絕辦理期限與文號，避免連續數字被誤判
					sDate = '<span style="display:none">€</span>' + theSSO.Util.htmlEncode(sDate);
					return '<td class="newTime" data-prop="newTime"><p style="nowrap:none;">' + sDate + '</p>' +
							'<p style="nowrap:none;">' + theSSO.Util.htmlEncode(sTime) + '</p></td>';
				}
				else {
					return '<td class="newTime" data-prop="newTime"></td>';
				}
			}
		},
		currLocate: {
			Header : '<th data-prop="currLocate" style="width:4em"><a href="#" data-prop="" style="cursor:default">目前<br/>位置</a><div class="sortIcon"></div</th>',
			Column : function(currLocate, doc){
				if(doc.signType == 'W')
					return '<td class="to_e" data-prop="currLocate"></td>';
				//1120209	Leslie	[銓敘部-序12]補上ToolTip
				// return '<td class="to_e" data-prop="currLocate">' + theSSO.Util.htmlEncode(currLocate) + '</td>';
				return `<td class="to_e" data-prop="currLocate" title="${theSSO.Util.htmlEncode(currLocate)}">${theSSO.Util.htmlEncode(currLocate)}</td>`;
			},
			SetName : 'showCurrLocAlways',
		},
		keyWord: {
			Header : '<th data-prop="keyWord" style="width:4em"><a href="#" data-prop="" style="cursor:default">關鍵字</a><div class="sortIcon"></div</th>',
			Column : function(keyWord, doc){
				if(doc.signType == 'W')
					return '<td class="to_e"></td>';
				if (keyWord.length) 
					return '<td data-prop="keyWord" class="to_e" title="'+ theSSO.Util.htmlEncode(keyWord) +'">' + theSSO.Util.htmlEncode(keyWord) + '</td>'; 
				else 
					return '<td data-prop="keyWord" class="to_e"></td>';
			}
		},
		taType: {
			Header : '<th data-prop="taType" style="width:2.5em"><a href="#" data-prop="" style="cursor:default">報送<br/>案別</a><div class="sortIcon"></div</th>',
			Column : function(taType, doc){
				if(doc.signType == 'W')
					return '<td class="to_e"></td>';
				if (taType.length) 
					return '<td data-prop="taType" class="to_e tbc_centre" title="'+ theSSO.Util.htmlEncode(taType) +'">' + theSSO.Util.htmlEncode(taType) + '</td>'; 
				else 
					return '<td data-prop="taType" class="to_e"></td>';
			}
		},
		MOCSdocPty: {
			Header : '<th data-prop="MOCSdocPty" style="width:2.5em"><a href="#" data-prop="" style="cursor:default">列管<br/>類別</a><div class="sortIcon"></div</th>',
			Column : function(MOCSdocPty, doc){
				if(doc.signType == 'W')
					return '<td class="to_e"></td>';
				if (MOCSdocPty.length) 
					return '<td data-prop="MOCSdocPty" class="to_e tbc_centre" title="'+ theSSO.Util.htmlEncode(MOCSdocPty) +'">' + theSSO.Util.htmlEncode(MOCSdocPty) + '</td>'; 
				else 
					return '<td data-prop="MOCSdocPty" class="to_e"></td>';
			}
		}
		,
		//1111122 Kevin 1111287 新增流程
		docProc: {
			Header : '<th data-prop="docProc" style="width:3em"><a href="#" data-prop="docProc" style="cursor:default">流程</a></th>',
			Column : function(docProc, doc){
				if(doc.signType == 'W')
					return '<td class="docProc"></td>';
				else
					return '<td data-prop="docProc" class="docProc"><span class="url_link">[開啟]</span></td>';
			}
		}
	}
	function _getFormatDate(srcDate){
		if (srcDate.length==7) {
			let sDate = srcDate.substring(0, 3) + '/' + srcDate.substring(3, 5) + '/' +	srcDate.substring(5, 7);
			if (window.innerWidth<=1024 && !_shouldHideLights()) {
				sDate = srcDate.substring(3, 5) + '/' + srcDate.substring(5, 7);
			}
			return theSSO.Util.htmlEncode(sDate) + '<span style="display:none">€</span>';
		}
		return '';
	}
	//1110926	Leslie[1110889]	新增客製化欄位設定功能	--END--
	
	// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期，add showRcvDate
	// 2019.1.24 - 1071075, 新增[公文性質]欄位
	// 2018.9.28 - 1070955
	function _buildListHeader(hideLights, showSignType, showSignDueDate, 
							showICOU, showICUser, hideTransInfo, showFromOU, showFromOrg, 
							showCurrLoc, showDocProperty, showDocPropertyLen, showRcvDate) {
		var sMPCol = '<table id="todolist_tb"> <!-- 傳統條列式待辦事項清單 -->' +
					   '<thead> <!-- todolist 標題列 -->' +
					     '<tr>';
						 
		//1110926	Leslie[1110889]	新增客製化欄位設定功能，到這裡，一定是沒有客製化的待辦欄位
		if('CustomSet' in theCustom && !('CustomTodoSet' in theCustom.CustomSet))//有客製化設定，但沒待辦部分
			theCustom.CustomSet.CustomTodoSet = []
		else
			theCustom.CustomSet = {CustomTodoSet : []}
		
		if (!hideLights) {
			sMPCol += '<th data-prop="speed" style="width:1.2em"><a href="#" data-prop="speed">速<br/>別</a><div class="sortIcon"></div></th>' +
					  '<th data-prop="light" style="width:1.2em"><a href="#" data-prop="light">燈<br/>號</a><div class="sortIcon"></div></th>' +
					  '<th data-prop="secret" style="width:1.2em"><a href="#" data-prop="secret">密<br/>等</a><div class="sortIcon"></div></th>';
			//1110926	Leslie[1110889]	新增客製化欄位設定功能
			theCustom.CustomSet.CustomTodoSet = theCustom.CustomSet.CustomTodoSet.concat(['speed','light','secret']);
			if (that.narrowWindow || showSignType) {
				sMPCol += '<th data-prop="signType" style="width:1.2em"><a href="#">類<br/>型</a><div class="sortIcon"></div></th>';
				//1110926	Leslie[1110889]	新增客製化欄位設定功能
				theCustom.CustomSet.CustomTodoSet.push('signType');
			}
			sMPCol += '<th data-prop="opened" style="width:1.6em"><a href="#" data-prop="opened"><a href="#">閱<br/>讀</a></a><div class="sortIcon"></div></th>';
			//1110926	Leslie[1110889]	新增客製化欄位設定功能
			theCustom.CustomSet.CustomTodoSet.push('signTime');
		}

		// 2019.1.24 - 1071075, 新增[公文性質]欄位
		if (showDocProperty) {
			// 2019.2.21 - 10802115, [公文性質]欄位可指定顯示字數
			if (typeof showDocPropertyLen!='number' || showDocPropertyLen<1) {
				showDocPropertyLen = 5;
			}
			else if (showDocPropertyLen>15) {
				showDocPropertyLen = 15;
			}
			let colWidth = 'calc(' + showDocPropertyLen + 'em + 8px)';
			let colMaxWidth = (showDocPropertyLen+1) + 'em';
			sMPCol += '<th style="width:' + colWidth + ';max-width:' + colMaxWidth +'" data-prop="docPtyName"><a href="#">公文性質</a><div class="sortIcon"></div></th>';
			//1110926	Leslie[1110889]	新增客製化欄位設定功能
			theCustom.CustomSet.CustomTodoSet.push('docPtyName');
		}

		sMPCol += '<th style="width:5em;" data-prop="dueDate"><a href="#">辦理<br/>期限</a><div class="sortIcon"></div></th>';
		//1110926	Leslie[1110889]	新增客製化欄位設定功能
		theCustom.CustomSet.CustomTodoSet.push('dueDate');
		
		// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期，add showRcvDate
		if(showRcvDate){
			sMPCol += '<th style="width:5em;" data-prop="rcvDate"><a href="#">收創文<br/>日期</a><div class="sortIcon"></div></th>';
			//1110926	Leslie[1110889]	新增客製化欄位設定功能
			theCustom.CustomSet.CustomTodoSet.push('rcvDate');
		}

		if (!hideLights && showSignDueDate) {
			sMPCol += '<th style="width:5em;" data-prop="signDueDate"><a href="#">陳核<br/>限辦日</a><div class="sortIcon"></div></th>';
			//1110926	Leslie[1110889]	新增客製化欄位設定功能
			theCustom.CustomSet.CustomTodoSet.push('signDueDate');
		}

		sMPCol += '<th class="docno_header" style="width:10em;" data-prop="docNo"><a href="#" data-prop="docNo">文　號</a><!--div class="ui-icon-arrow-1-s" style="float:right;cursor:pointer;"></div--><div class="sortIcon"></div></th>';
		//1110926	Leslie[1110889]	新增客製化欄位設定功能
		theCustom.CustomSet.CustomTodoSet.push('docNo');

		if (!hideLights) {
			if (showICOU) {
				sMPCol += '<th style="width:3.5em;" data-prop="ICOUName"><a href="#" data-prop="ICOUName">承辦<br/>單位</a><div class="sortIcon"></div></th>';
				//1110926	Leslie[1110889]	新增客製化欄位設定功能
				theCustom.CustomSet.CustomTodoSet.push('ICOUName');
			}
			if (showICUser) {
				sMPCol += '<th style="width:5.5em;" data-prop="ICUserName"><a href="#" data-prop="ICUserName">承辦人</a><div class="sortIcon"></div></th>';
				//1110926	Leslie[1110889]	新增客製化欄位設定功能
				theCustom.CustomSet.CustomTodoSet.push('ICUserName');
			}
			if (showFromOU) {
				sMPCol += '<th style="width:3.5em;" data-prop="fromOUName"><a href="#" data-prop="fromOUName">送文<br/>單位</a><div class="sortIcon"></div></th>';
				//1110926	Leslie[1110889]	新增客製化欄位設定功能
				theCustom.CustomSet.CustomTodoSet.push('fromOUName');
			}
		}
		else {
			sMPCol += '<th style="width:3.5em;" data-prop="fromOUName"><a href="#" data-prop="fromOUName">送文<br/>單位</a><div class="sortIcon"></div></th>';
			//1110926	Leslie[1110889]	新增客製化欄位設定功能
			theCustom.CustomSet.CustomTodoSet.push('fromOUName');
		}

		sMPCol += '<th style="min-width:18em;" class="subject_header" data-prop="subject"><a href="#">主　　旨</a><div class="sortIcon"></div></th>';
		//1110926	Leslie[1110889]	新增客製化欄位設定功能
		theCustom.CustomSet.CustomTodoSet.push('fromSubject');

		if (!hideLights && !hideTransInfo) {
			sMPCol += '<th style="width:5.5em;" data-prop="txName"><a href="#" data-prop="txName">異動別</a><div class="sortIcon"></div></th>' +
					  '<th data-prop="toUserName" style="width:8em"><a href="#" data-prop="toUserName">傳送至</a><div class="sortIcon"></div></th>';
			//1110926	Leslie[1110889]	新增客製化欄位設定功能
			theCustom.CustomSet.CustomTodoSet.push('txName');
			theCustom.CustomSet.CustomTodoSet.push('toUserName');
		}

		if (!hideLights) {
			if (showFromOrg) {
				sMPCol += '<th style="width:5em;" data-prop="fromOrg"><a href="#" data-prop="fromOrg">來文<br/>機關</a><div class="sortIcon"></div></th>';
				//1110926	Leslie[1110889]	新增客製化欄位設定功能
				theCustom.CustomSet.CustomTodoSet.push('fromOrg');
			}
		}
		
		// 2017.6.22 - 成大 流程
		sMPCol += '<th data-prop="docProc" style="width:3em"><a href="#" data-prop="docProc" style="cursor:default">流程</a></th>';
		theCustom.CustomSet.CustomTodoSet.push('docProc');

		sMPCol += '<th class="newTime" style="width:4.5em;" data-prop="newTime"><a href="#" data-prop="newTime">' + _sNewTimeHeader + '</a><div class="sortIcon"></div></th>';
		//1110926	Leslie[1110889]	新增客製化欄位設定功能
		theCustom.CustomSet.CustomTodoSet.push('newTime');

		if (!hideLights && showCurrLoc) {
			sMPCol += '<th data-prop="currLocate" style="width:4em"><a href="#" data-prop="" style="cursor:default">目前<br/>位置</a><div class="sortIcon"></div</th>';
			//1110926	Leslie[1110889]	新增客製化欄位設定功能
			theCustom.CustomSet.CustomTodoSet.push('currLocate');
		}

		sMPCol += '</tr></thead><tbody> <!-- 待辦事項清單內容 --></tbody></table>';
		return sMPCol;
	}

	var that = {
		folderCount: 0,
		_nofilterfoldername:'全部',
		lights: { total: 0,
				  red: 0,
				  yellow:0,
				  white:0,
				  green:0,
				  purple:0
		},
		listCntrId : '',	// 條列待辦清單 ContainerId
		iconCntrId : '',    // 圖示待辦清單 ContainerId
		searchListCntrId : '', // 預覽視窗右方待辦清單 ContainerId
		listSortBy: '', // 條列清單排序用欄位 [預設: 文號]
		listFilterFolder: '',  // 條列清單指定要顯示的Folder/SubFolder
		searchListFilterFolder: '', // 搜尋清單指定要顯示的Folder/SubFolder
		
		folderList : [], // {folder:'', subfolder:'', count:1, isProxy:false};
		selectedFolder : '',
		filterWord: '',

		// 2018.10.08 - 1070955, 依EnvSet設定顯示/隱藏列表清單欄位
		listHeader : _listHeader.fullMPCol,
		showReSupplyStatus: false, // 登記桌顯示補件狀況
		hideLights: false, // 登記桌隱藏燈號欄位
		hideTransInfo: false, // 隱藏異動別/傳送至欄位!
		narrowWindow: false,		// 螢幕寬度不大於1024 pixels
		showSignType: true, 		// 隱藏簽核類型
		showSignDueDate: false,		// 顯示陳核限辦日
		showICOU: false, 			// 顯示承辦單位
		showICUser: false, 			// 顯示承辦人
		showFromOU: true,  			// 顯示送文單位
		showFromOrg: false,			// 顯示來文機關
		showCurrLoc: false,			// 顯示[目前位置]
		showCurrLocFolder: '',      // 顯示[目前位置]之Folder
		showCurrLocSubFolder: '',	// 顯示[目前位置]之SubFolder
		showDocProperty: false,     // 2019.1.24 - 1071075, 新增[公文性質]欄位
		showDocPropertyLen: 0,	// 2019.2.21 - 1080211, [公文性質]欄位可指定顯示長度(字數)
		showRcvDate: false,		// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期
		NotifyShowDeptInfo:false//1110614 David 1110281 依照系統參數MP_NOTIFY_SHOW_DEPTINFO設定判斷是否顯示通知類型的單位人員資訊
	};
	
	var _self = this;
	var _doclist = [];
	var _sortfunc = {};
	
	var _odwmsgFieldList = [];
	var _proxySetting = null;
	
// inner functions
	/*function DocObject() {
		var ODWMSG = null;
		var ODWDCM = null;
		var _doc = this;
		
		function _init(ODWMSG_xn) {}
		function _get(attrName) {}
		function _set(name, value) {}
		
		this.init = _init;
		this.get = get;
		this.set = _set;
		
		return this;
	}*/
	
	/*
	 * Sorting compare functions
	 */
	
	/* sort by specific property's value [plan value]
	 * 目前用於 docNo, Subject, dueDate 欄位
	 */
	var _sortByValue = function(fieldName, a, b) {
		if (a[fieldName] == b[fieldName]) return 0;
		if (a[fieldName] > b[fieldName]) {
			return 1;
		}
		else {
			return -1;
		}
	};

	// sort by docNo
	var _sortByDocNo = function(a, b) {
		if (a.docNo == b.docNo) return 0;
		if (a.docNo > b.docNo) {
			return 1;
		}
		else {
			return -1;
		}
	};
	
	// sort by subject
	var _sortBySubject = function(a, b) {
		if (a.fromSubject == b.fromSubject) return 0;
		if (a.fromSubject > b.fromSubject) {
			return 1;
		}
		else {
			return -1;
		}
	};
	
	// sort by 燈號
	_self._sortByLight = function(a, b) {
		var light_a = _getLightInfo(a);
		var light_b = _getLightInfo(b);
		if (light_a.value == light_b.value)
			return 0;
		
		if (light_a.value > light_b.value) {
			return 1;
		}
		else  {
			return -1;
		}
	};

	// sort by 辦理期限
	_self._sortByDueDate = function(a, b) {
		if (a.dueDate == b.dueDate) return 0;
		
		if (b.dueDate.length===0)
			return -1;
		
		if (a.dueDate > b.dueDate) return 1;
		
		return -1;
	};
	
	_sortfunc.sort_docno =_sortByDocNo;
	_sortfunc.sort_subject = _sortBySubject;
	_sortfunc.sort_light = _sortByLight;
	_sortfunc.sort_dueDate = _sortByDueDate;
	
	// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期
	_self._sortByRcvDate = function(a, b) {
		if (a.rcvDate == b.rcvDate) return 0;
		
		if (b.rcvDate.length===0)
			return -1;
		
		if (a.rcvDate > b.rcvDate) return 1;
		
		return -1;
	};
	_sortfunc.sort_rcvDate = _sortByRcvDate;
	
	/* SIGN_TYPE = "W" 項目 (@todolist_tb, 條列項目)
	 * doc: 待辦項目的JS object.
	 * sn: [測試用]序號! (目前已不使用!)
	 */
	_self._createNotifyItem_List = function(doc, sn) {
		/*
		<td></td> => 速別
		<td></td> => 燈號
		<td></td> => 密等
		<td><img alt="type:通知" src="./IMAGE/ART/Todo-SignTypeNotify.png" /></td>
		<td></td> => 已閱讀
		<td></td> => due-date
		<td class="docno"><span>1000000003</span></td>
		<td>查爾斯一</td>
		<td>總收</td>
		<td>[EPT]ODT300加密測試...</td>
		<td>送請簽核</td>
		<td>查爾斯四</td>
		<td>06/07 15:20</td> <!-- new time -->
		*/
		
		var $item = $('<tr></tr>');
		
		// 2021.10 - 1100991 Eric, add htmlEncode
		// 2013.6.25 - 加MsgId資訊
		$item.attr('data-msgId',  theSSO.Util.htmlEncode(doc.msgId));
		
		var $subItem = null;

		// 2021.7 - 1100849 Eric, NUK tooltip
		// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
		//let fShowTip = false;
		let sTip = '';
		// if (SSO_CONFIG.OrgNickName=='NUK') {
			// fShowTip = true;
		// }
		
		var resupply = doc.reSupplyALM;
		if (that.shouldShowResupply() && that.shouldHideLights()) {
			$subItem = $('<td data-prop="reSupplyALM"></td>');
			if (resupply==='')
				resupply = '0';
				
			switch(resupply) {
			case '0': $subItem.append($('<img alt="resupply:辦理中" src="./IMAGE/ART/Todo-LightBlank.png" />')); sTip='普通件(Standard)'; break;
			case '1': $subItem.append($('<img alt="resupply:補件中" src="./IMAGE/ART/Todo-LightOrange.png" />')); sTip='速件(Priority)'; break;
			case '2': $subItem.append($('<img alt="resupply:補件收件" src="./IMAGE/ART/Todo-LightBlue.png" />')); sTip='最速件(High Priority)'; break;
			}
			// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
			$subItem.attr('title',_toolTip.resupply[resupply]);
			if (!!$subItem)
				$item.append($subItem);
		}
		
		// 2016.8.23 - 隱藏燈號欄位時仍應顯示燈號統計資訊 
		var lightInfo = _getLightInfo(doc);
		$item.attr('data-light', theSSO.Util.htmlEncode(lightInfo.light)); // 燈號統計
		
		if (!that.shouldHideLights()) {
			// 速別: 1,普通, 2:速件, 3:最速件
			$subItem = $('<td data-prop="speed"></td>');
			
			var speed = doc.speed;
			if (speed.length===0) {
				speed = '3';
			}
			switch(speed) {
			// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能，一併修正錯誤的圖示
			/*case "1": $subItem.append($('<img alt="Spd:普通" src="./IMAGE/ART/Todo-LightWhite.png" />')); sTip='普通件(Standard)'; break;
			case "2": $subItem.append($('<img alt="Spd:速件" src="./IMAGE/ART/Todo-LightBlue.png" />')); sTip='速件(Priority)'; break;
			case "3": $subItem.append($('<img alt="Spd:最速件" src="./IMAGE/ART/Todo-LightRed.png" />')); sTip='最速件(High Priority)'; break;
			//1051219 David 1051122 速別代碼4，MP速別圖示同普通圖示
			case "4": $subItem.append($('<img alt="Spd:" src="./IMAGE/ART/Todo-LightWhite.png" />')); sTip='普通件(Standard)'; break;*/
			case "1": $subItem.append($('<img alt="Spd:普通" src="./IMAGE/ART/Todo-Speed1.png" />'));break;
			case "2": $subItem.append($('<img alt="Spd:速件" src="./IMAGE/ART/Todo-Speed2.png" />'));break;
			case "3": $subItem.append($('<img alt="Spd:最速件" src="./IMAGE/ART/Todo-Speed3.png" />'));break;
			case "4": $subItem.append($('<img alt="Spd:" src="./IMAGE/ART/Todo-Speed1.png" />')); break;
			}

			if (!!$subItem) {
				//1051219 David 1051122 速別代碼4，MP速別圖示同普通圖示
				// if (fShowTip) {
					// $subItem.attr('title', sTip);
				// }
				$subItem.attr('title',_toolTip.speed[speed])
				$item.append($subItem);
			}
			
			// 燈號
			$subItem = $('<td data-prop="light"></td>');
			$('<img></img>').attr({alt:'燈號', src: theSSO.Util.htmlEncode(lightInfo.url)}).appendTo($subItem);
					
			if (!!$subItem) {
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				//if (fShowTip) {
					// $subItem.attr('title', theSSO.Util.htmlEncode(lightInfo.tip));
				// }
				$subItem.attr('title', theSSO.Util.htmlEncode(_toolTip.light[lightInfo.light]));
				$item.append($subItem);
			}
			
			if (that.shouldShowResupply()) {
				$subItem = $('<td data-prop="reSupplyALM"></td>');
				if (resupply==='')
					resupply = '0';
					
				switch(resupply) {
				case '0': $subItem.append($('<img alt="resupply:辦理中" src="./IMAGE/ART/Todo-LightBlank.png" />')); break;
				case '1': $subItem.append($('<img alt="resupply:補件中" src="./IMAGE/ART/Todo-LightOrange.png" />')); break;
				case '2': $subItem.append($('<img alt="resupply:補件收件" src="./IMAGE/ART/Todo-LightBlue.png" />')); break;
				}
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				$subItem.attr('title',_toolTip.resupply[resupply]);
				if (!!$subItem)
					$item.append($subItem);
			}
			else {
				// 密等: 1: 普通, 2:密, 3:機密, 4:極機密, 5:絕對機密
				$subItem = $('<td data-prop="secret"></td>');
				var secret = doc.secret;
				switch(secret) {
				case "1": case "":
					$('<img></img>').attr({alt:'sec:白', src:'./IMAGE/ART/Todo-Secret1.png'}).appendTo($subItem); break;
				case "2": case "3": case "4": case "5":
					$('<img></img>').attr({alt:'sec:黃', src:'./IMAGE/ART/Todo-Secret2.png'}).appendTo($subItem); break;
				}
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				$subItem.attr('title',_toolTip.secret[secret]);
				
				if (!!$subItem) {
					$item.append($subItem);
				}
			}
				
			if (that.narrowWindow || that.showSignType) { // 2018.09.28 – 1070955
				// 簽核類型: 'W' -> 通知
				$subItem = $('<td data-prop="signType"></td>');
				$('<img></img>').attr({alt:'signType:W', src:'./IMAGE/ART/Todo-SignTypeNotify.png'}).appendTo($subItem);
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				$subItem.attr('title',_toolTip.signType[doc.signType]);
				if (!!$subItem)
					$item.append($subItem);
			}
				
			// 已閱讀
			$subItem = $('<td class="opened" data-prop="opened"></td>');
			if (doc.signTime.length || doc.isDraft) { // 2016.12.20 - 草稿一律為已閱讀!
				$('<img></img>').attr({src:'./IMAGE/ART/Todo-Readed.png', alt:'opened:1'}).appendTo($subItem);
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				$subItem.attr('title',_toolTip.Readed);
			}
			else {
				$('<img></img>').attr({src:'./IMAGE/ART/Todo-ReadNon.png', alt:'opened:0'}).appendTo($subItem);
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				$subItem.attr('title',_toolTip.ReadNon);
			}
			if (!!$subItem)
				$item.append($subItem);
		}

		// 2019.1.24 - 1071075, 公文性質
		if (!that.narrowWindow && that.showDocProperty) {
			$subItem = $('<td class="to_e"></td>').appendTo($item);
		}
			
		// 辦理期限
		$subItem = $('<td class="to_e"></td>').appendTo($item);
		
		// 2018.09.28 – 1070955 [陳核限辦日]
		if (!that.shouldHideLights() && !that.narrowWindow && that.showSignDueDate) {
			$subItem = $('<td class="to_e"></td>').appendTo($item);
		}

		// 文號
		//$subItem = $('<td class="urlLink">[開啟...]</td>').appendTo($item);	
		$subItem = $('<td class="docno urlLink" data-prop="docNo">[開啟...]</td>').attr({'data-msgid': theSSO.Util.htmlEncode(doc.msgId)}).appendTo($item);

		if (!that.shouldHideLights() && !that.narrowWindow && that.showICOU) { // 2018.09.28 – 1070955
			// 承辦單位
			//1110614 David 1110281 通知待辦新增依ODWMSG.IC_OU_NAME、IC_USER_NAME顯示畫面承辦單位、承辦人欄位資料
			//$subItem = $('<td class="to_e"></td>').appendTo($item);
			if(that.NotifyShowDeptInfo){
				if (doc.ICOUName.length) {
					$subItem = $('<td class="to_e" data-prop="ICOUName">' + theSSO.Util.htmlEncode(doc.ICOUName) + '</td>');
				}
				else
					$subItem = $('<td data-prop="ICOUName" class="to_e"></td>');
			}
			else
				$subItem = $('<td data-prop="ICOUName" class="to_e"></td>');
			$item.append($subItem);
		}

		// 2020.6.16 - 1090452 Eric, listHeader.ss_normal layout 有[承辦人]欄位 (narrowWindow=true)
		if (!that.shouldHideLights() && (that.showICUser || that.narrowWindow)) {
			// 承辦人
			//1110614 David 1110281 通知待辦新增依ODWMSG.IC_OU_NAME、IC_USER_NAME顯示畫面承辦單位、承辦人欄位資料
			//$subItem = $('<td class="to_e"></td>').appendTo($item);
			if(that.NotifyShowDeptInfo){
				if (doc.ICUserName.length) {
					$subItem = $('<td data-prop="ICUserName" class="to_e">' + theSSO.Util.htmlEncode(doc.ICUserName) + '</td>');
				}
				else
					$subItem = $('<td data-prop="ICUserName" class="to_e"></td>');
			}
			else
				$subItem = $('<td data-prop="ICUserName" class="to_e"></td>');
			$item.append($subItem);
		}
		
		// 送文單位
		if (that.shouldHideLights() || that.narrowWindow || that.showFromOU) { // 2018.09.28 – 1070955
			$subItem = $('<td class="to_e" data-prop="fromOUName"></td>').appendTo($item);
		}
		
		// 主旨
		if (doc.fromSubject.length) {
			var sSubj = '';
			var len = 256;
			if (doc.fromSubject.length > len) {
				sSubj = doc.fromSubject.substr(0, len);
				sSubj += '...';
			}
			else {
				sSubj = doc.fromSubject;
			}
			$subItem = $('<td data-prop="subject" class="to_e">' + theSSO.Util.htmlEncode(sSubj) + '</td>');
		}
		else {
			$subItem = $('<td data-prop="subject"></td>');
		}
		if (!!$subItem)
			$item.append($subItem);
			
		if (!that.shouldHideLights() && !that.shouldHideTransInfo()) { // 2017.2.13
			// 異動別
			$subItem = $('<td class="to_e"></td>').appendTo($item);
				
			// 傳送至
			$subItem = $('<td class="to_e"></td>').appendTo($item);
		}
		
		if (!that.shouldHideLights() && !that.narrowWindow && that.showFromOrg) { // 2018.09.28 – 1070955
			// 來文機關
			$subItem = $('<td class="to_e"></td>').appendTo($item);
		}
		
		// 2017.6.22 - 成大 流程
        // 2023.4.20 - Eric: Quick-fix columns mis-match!
        if (!that.narrowWindow) {
            $subItem = $('<td data-prop="docProc" class="docProc"><span class="url_link placeholder"></span></td>');
            if (!!$subItem)
                $item.append($subItem);
        }
			
		// 送方傳送時間
		// => <td>06/07 15:20</td> <!-- new time -->
		if (SSO_CONFIG.OrgNickName=="NUK" && doc.fullNewTime.length==13) {
			var sDate = doc.fullNewTime.substring(0, 3) + '/'  + 
						doc.fullNewTime.substring(3, 5) + '/' +
			            doc.fullNewTime.substring(5, 7);
			var sTime = doc.fullNewTime.substring(7, 9) + ':' +
						doc.fullNewTime.substring(9, 11)+ ':' +
						doc.fullNewTime.substring(11, 13);
			//2016.12.9	Leslie	增加隱藏欄位以隔絕辦理期限與文號，避免連續數字被誤判
			sDate = '<span style="display:none">€</span>' + theSSO.Util.htmlEncode(sDate);
			$subItem = $('<td class="newTime" data-prop="newTime" style="font-size:smaller"><p style="nowrap:none;">' + sDate + '</p>' +
						'<p style="nowrap:none;">' + theSSO.Util.htmlEncode(sTime) + '</p></td>');
		}
		else if (doc.newTime.length==11)	{
			if (SSO_CONFIG.OrgNickName=="NUK") {
				var sDate = doc.newTime.substring(0, 3) + '/' +
						   	doc.newTime.substring(3, 5) + '/' +
							doc.newTime.substring(5, 7) + ' ';
				var sTime = doc.newTime.substring(7, 9) + ':' +
							doc.newTime.substring(9, 11)+ ':' +
							'00';
				//2016.12.9	Leslie	增加隱藏欄位以隔絕辦理期限與文號，避免連續數字被誤判
				sDate = '<span style="display:none">€</span>' + theSSO.Util.htmlEncode(sDate);
				$subItem = $('<td class="newTime" data-prop="newTime" style="font-size:smaller"><p style="nowrap:none;">' + sDate + '</p>' +
							'<p style="nowrap:none;">' + theSSO.Util.htmlEncode(sTime) + '</p></td>');
			}
			else {
				var sDate = doc.newTime.substring(3, 5) + '/' +
							doc.newTime.substring(5, 7) + ' ';
				var sTime = doc.newTime.substring(7, 9) + ':' +
							doc.newTime.substring(9, 11);
				//2016.12.9	Leslie	增加隱藏欄位以隔絕辦理期限與文號，避免連續數字被誤判
				sDate = '<span style="display:none">€</span>' + theSSO.Util.htmlEncode(sDate);
				$subItem = $('<td class="newTime" data-prop="newTime"><p style="nowrap:none;">' + sDate + '</p>' +
							'<p style="nowrap:none;">' + theSSO.Util.htmlEncode(sTime) + '</p></td>');
			}
		}
		else {
			$subItem = $('<td class="newTime" data-prop="newTime"></td>');
		}
		if (!!$subItem)
			$item.append($subItem);

		if (!that.shouldHideLights() && !that.narrowWindow && that.showCurrLoc) { // 2018.09.28 – 1070955
			// 目前位置
			$subItem = $('<td class="to_e"></td>').appendTo($item);
		}
			
		//2016.12.9	Leslie	增加隱藏欄位以隔絕每一列
		$item.append($('<td style="display:none">§</td>'));
			
		return $item;
	};
	
	/* 傳統table清單 - [目前使用]
	 * table item之相關style定義於css檔: ToDoList_List.css
	 * 
	 * 參數
	 * doc: 待辦項目的JS object.
	 * sn: [測試用]序號! (目前已不使用!)
	 */
	_self._createNewItem_List3 = function(doc, sn, rrbGrayColorFolders)  { // doc is an object
		/*
		<tr data-msgId="72112" data-light="red">
			<td data-prop="speed"><img alt="Spd:普通" src="./IMAGE/ART/Todo-LightWhite.png" /></td>
			<td data-prop="light"><img alt="lgt:紅" src="./IMAGE/ART/Todo-LightRed.png" /></td>
			<td data-prop="secret"><img alt="Sec:密等" src="./IMAGE/ART/Todo-Secret1.png" /></td>
			<td data-prop="signType"><img alt="type:線上簽核" src="./IMAGE/ART/Todo-SignTypeOnline.png" /></td>
			<td class="opened" data-prop="opened"><img alt="開啟:已閱讀" src="./IMAGE/ART/Todo-Readed.png" /></td>
			<td data-prop="dueDate">100/06/13</td> <!-- due-date -->
			<td class="docno" data-prop="docNo" data-docno="1000000003"><span>1000000003</span></td>
			<td data-prop="ICUserName">查爾斯一</td>
			<td data-prop="fromOUName">總收</td>
			<td data-prop="subject">[EPT]ODT300加密測試...</td>
			<td data-prop="txName">送請簽核</td>
			<td data-prop="toUserName">查爾斯四</td>
			<td class="newTime" data-prop="newTime">06/07 15:20</td> <!-- new time -->
		</tr>
		*/
		
		if (doc.signType=='W') {
			return _createNotifyItem_List(doc, sn);
		}
		
		var isDraft = _isDraftMsg(doc);
		
		var $item = $('<tr></tr>');
		
		// 2012.12.7 - 加MsgId資訊
		$item.attr('data-msgId', theSSO.Util.htmlEncode(doc.msgId));
		if (isDraft) {
			$item.attr('data-draft', true);
			$item.attr('data-ICUser', theSSO.Util.htmlEncode(doc.ICUserId));
		}
		
		var $subItem = null;
		
		var resupply = doc.reSupplyALM;
		var colorDocNo = false;

		// 2021.7 - 1100849 Eric, NUK tooltip
		// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
		// let fShowTip = false;
		let sTip = '';
		// if (SSO_CONFIG.OrgNickName=='NUK') {
			// fShowTip = true;
		// }

		if (that.shouldShowResupply() && that.shouldHideLights()) {
			colorDocNo = true;
			$subItem = $('<td data-prop="reSupplyALM"></td>');
			if (resupply==='')
				resupply = '0';
				
			switch(resupply) {
			case '0': $subItem.append($('<img alt="resupply:辦理中" src="./IMAGE/ART/Todo-LightBlank.png" />')); sTip='普通件(Standard)'; break;
			case '1': $subItem.append($('<img alt="resupply:補件中" src="./IMAGE/ART/Todo-LightOrange.png" />')); sTip='速件(Priority)'; break;
			case '2': $subItem.append($('<img alt="resupply:補件收件" src="./IMAGE/ART/Todo-LightBlue.png" />')); sTip='最速件(High Priority)'; break;
			}
			if (!!$subItem) {
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				// if (fShowTip) {
					// $item.attr('title', sTip);
				// }
				$subItem.attr('title',_toolTip.resupply[resupply]);
				$item.append($subItem);
			}
		}
		
		// 2016.8.23 - 隱藏燈號欄位時仍應顯示燈號統計資訊 
		var lightInfo = _getLightInfo(doc);
		$item.attr('data-light', theSSO.Util.htmlEncode(lightInfo.light)); // 燈號統計
		
		if (!that.shouldHideLights()) {
			// 速別: 1,普通, 2:速件, 3:最速件
			$subItem = $('<td data-prop="speed"></td>');
			var speed = doc.speed;
			switch(speed) {
			case "1": $subItem.append($('<img alt="Spd:普通" src="./IMAGE/ART/Todo-Speed1.png" />')); sTip='普通件(Standard)'; break;
			case "2": $subItem.append($('<img alt="Spd:速件" src="./IMAGE/ART/Todo-Speed2.png" />')); sTip='速件(Priority)'; break;
			case "3": $subItem.append($('<img alt="Spd:最速件" src="./IMAGE/ART/Todo-Speed3.png" />')); sTip='最速件(High Priority)'; break;
			//1051219 David 1051122 速別代碼4，MP速別圖示同普通圖示
			case "4": $subItem.append($('<img alt="Spd:" src="./IMAGE/ART/Todo-Speed1.png" />')); break;
			}
			if (!!$subItem) {
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				// if (fShowTip) {
					// $item.attr('title', sTip);
				// }
				$subItem.attr('title',_toolTip.speed[speed]);
				$item.append($subItem);
			}
		
			// 燈號
			$subItem = $('<td data-prop="light"></td>');
			$('<img></img>').attr({alt:'燈號', src: theSSO.Util.htmlEncode(lightInfo.url)}).appendTo($subItem);		
			if (!!$subItem) {
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				// if (fShowTip) {
					// $item.attr('title', theSSO.Util.htmlEncode(lightInfo.tip));
				// }
				$subItem.attr('title',_toolTip.light[lightInfo.light]);
				$item.append($subItem);
			}
		
			if (that.shouldShowResupply()) {
				colorDocNo = true;
				$subItem = $('<td data-prop="reSupplyALM"></td>');
				if (resupply==='')
					resupply = '0';
					
				switch(resupply) {
				case '0': $subItem.append($('<img alt="resupply:辦理中" src="./IMAGE/ART/Todo-LightBlank.png" />')); break;
				case '1': $subItem.append($('<img alt="resupply:補件中" src="./IMAGE/ART/Todo-LightOrange.png" />')); break;
				case '2': $subItem.append($('<img alt="resupply:補件收件" src="./IMAGE/ART/Todo-LightBlue.png" />')); break;
				}
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				$subItem.attr('title',_toolTip.resupply[resupply]);
				if (!!$subItem)
					$item.append($subItem);
			}
			else {
				// 密等: 1: 普通, 2:密, 3:機密, 4:極機密, 5:絕對機密
				$subItem = $('<td data-prop="secret"></td>');
				var secret = doc.secret;
				switch(secret) {
				case "1":
				case "":
					$('<img></img>').attr({alt:'sec:白', src:'./IMAGE/ART/Todo-Secret1.png'}).appendTo($subItem); break;
				case "2":
				case "3":
				case "4":
				case "5":
					$('<img></img>').attr({alt:'sec:黃', src:'./IMAGE/ART/Todo-Secret2.png'}).appendTo($subItem); break;
				}
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				$subItem.attr('title',_toolTip.secret[secret]);
				
				if (!!$subItem) {
					$item.append($subItem);
				}
			}
		
			if (that.narrowWindow || that.showSignType) { // 2018.09.28 – 1070955
				// 簽核類型: 'E' -> 線上, 'P' -> 紙本
				$subItem = $('<td data-prop="signType"></td>');
				switch(doc.signType) {
				case "E": $('<img></img>').attr({alt:'signType:E', src:'./IMAGE/ART/Todo-SignTypeOnline.png'}).appendTo($subItem); break;
				case "P": $('<img></img>').attr({alt:'signType:P', src:'./IMAGE/ART/Todo-SignTypePepper.png'}).appendTo($subItem); break;
				}
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				$subItem.attr('title',_toolTip.signType[doc.signType]);
				if (!!$subItem)
					$item.append($subItem);
			}
			
			// 已閱讀
			$subItem = $('<td class="opened" data-prop="opened"></td>');
			if (doc.signTime.length || doc.isDraft) { // 2016.12.20 - 草稿一律為已閱讀
				$('<img></img>').attr({src:'./IMAGE/ART/Todo-Readed.png', alt:'opened:1'}).appendTo($subItem);
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				$subItem.attr('title',_toolTip.Readed);
			}
			else {
				$('<img></img>').attr({src:'./IMAGE/ART/Todo-ReadNon.png', alt:'opened:0'}).appendTo($subItem);
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				$subItem.attr('title',_toolTip.ReadNon);
			}
			if (!!$subItem)
				$item.append($subItem);
		}

		// 2019.1.24 - 1071075, 公文性質
		if (!that.narrowWindow && that.showDocProperty) {
			// 2019.2.21 - 10802115, [公文性質]欄位可指定顯示字數
			let showDocPropertyLen = that.showDocPropertyLen;
			let dispDocPtyName = doc.docPtyName;
			if (typeof showDocPropertyLen!='number' || showDocPropertyLen<1) {
				showDocPropertyLen = 5;
			}
			else if (showDocPropertyLen>15) {
				showDocPropertyLen = 15;
			}
			if (dispDocPtyName.length && (doc.docPtyName.length>showDocPropertyLen)) {
				dispDocPtyName = doc.docPtyName.substr(0, showDocPropertyLen);
			}
			$subItem = $('<td data-prop="docPtyName" class="to_e tbc_centre td_docPty">' + theSSO.Util.htmlEncode(dispDocPtyName) + '</td>');
			if (!!$subItem) {
				$item.append($subItem);
			}
		}
			
		// 辦理期限
		if (doc.dueDate.length==7) {
			var sDate = doc.dueDate.substring(0, 3) + '/' + doc.dueDate.substring(3, 5) + '/' +
			            doc.dueDate.substring(5, 7);
			// 2016.10.24
			if (window.innerWidth<=1024 && !_shouldHideLights()) {
				sDate = doc.dueDate.substring(3, 5) + '/' + doc.dueDate.substring(5, 7);
			}
			//2016.12.9	Leslie	增加隱藏欄位以隔絕辦理期限與文號，避免連續數字被誤判
			sDate = theSSO.Util.htmlEncode(sDate) + '<span style="display:none">€</span>';
			$subItem = $('<td data-prop="dueDate" class="to_e tbc_centre">' + sDate + '</td>'); // 2017.10.24 - 1060967, add tbc_centre
		}
		else {
			$subItem = $('<td data-prop="dueDate" class="to_e tbc_centre"></td>'); // 2017.10.24 - 1060967, add tbc_centre
		}
		if (!!$subItem)
			$item.append($subItem);
		
		// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期
		if (!that.narrowWindow && that.showRcvDate) {
			if (doc.rcvDate.length==7) {
				sDate = doc.rcvDate.substring(0, 3) + '/' + doc.rcvDate.substring(3, 5) + '/' +
							doc.rcvDate.substring(5, 7);
				// 2016.10.24
				if (window.innerWidth<=1024 && !_shouldHideLights()) {
					sDate = doc.rcvDate.substring(3, 5) + '/' + doc.rcvDate.substring(5, 7);
				}
				sDate = theSSO.Util.htmlEncode(sDate) + '<span style="display:none">€</span>';
				$subItem = $('<td data-prop="rcvDate" class="to_e tbc_centre">' + sDate + '</td>'); // 2017.10.24 - 1060967, add tbc_centre
			}
			else {
				$subItem = $('<td data-prop="rcvDate" class="to_e tbc_centre"></td>');	// 2017.10.24 - 1060967, add tbc_centre
			}
			if (!!$subItem)
			$item.append($subItem);
		}
		
		// 2018.09.28 – 1070955 [陳核限辦日]
		if (!that.shouldHideLights() && !that.narrowWindow && that.showSignDueDate) {
			if (doc.signDueDate.length==7) {
				var sDate = doc.signDueDate.substring(0, 3) + '/' + 
						 	doc.signDueDate.substring(3, 5) + '/' +
							doc.signDueDate.substring(5, 7);
				//	Leslie	增加隱藏欄位以隔絕辦理期限與文號，避免連續數字被誤判
				sDate = theSSO.Util.htmlEncode(sDate) + '<span style="display:none">€</span>';
				$subItem = $('<td data-prop="signDueDate" class="to_e tbc_centre">' + sDate + '</td>'); 
			}
			else {
				$subItem = $('<td data-prop="signDueDate" class="to_e tbc_centre"></td>');

				if (typeof doc.signDueDate=='string' && doc.signDueDate.length)
					theLogger.log('Invalid SIGN_DUEDATE length, DocNo=' + doc.docNo + ', SIDG_DUEDATE=' + doc.signDueDate);
			}
			if (!!$subItem)
				$item.append($subItem);
		}
		
		// 文號
		if (doc.docNo.length) {
			// 2019.6.11 - Eric Peng - 1080412
			let folder = doc.folder + '-' + doc.subfolder;
			let rrbGrayColor = false;
			if (SSOUtil.typeOf(rrbGrayColorFolders)=='array' && rrbGrayColorFolders.length && rrbGrayColorFolders.indexOf(folder)!=-1) {
				rrbGrayColor = true;
			}

			var docNoClass = 'docno context-menu-todo';
			if (colorDocNo) {
				if (doc.secret=='2' || doc.secret=='3' || doc.secret=='4' || doc.secret=='5') {
					docNoClass = 'docno context-menu-todo redText';
				}
			}
			else if (rrbGrayColor) {
				docNoClass += ' rrbSpecColor';
			}
			//1110323 David 1101416 如TODO_LIST有註記需變更文號顏色時，調整畫面文號顏色
			else if(typeof doc.ODWMSG.CHANGE_DOC_COLOR =='string' && doc.ODWMSG.CHANGE_DOC_COLOR == "Y"){
				docNoClass += ' redText';
			}

			// 2016.12.5 - 1051175, 鐵工局稽核類公文, 文號前面加'*'
			var docNoForDisplay = doc.docNo;
			if (SSO_CONFIG.OrgNickName=='RRB' || _debug) {
				var isAudit = (typeof doc.ODWMSG.IS_AUDIT=='string')?doc.ODWMSG.IS_AUDIT:'N';
				if (isAudit=='Y'||isAudit=='y') {
					docNoForDisplay = '*' + doc.docNo;
				}
			}
			$subItem = $('<td class="' + docNoClass + '" data-prop="docNo" data-docno="' + theSSO.Util.htmlEncode(doc.docNo) + '">' + theSSO.Util.htmlEncode(docNoForDisplay) + '</td>');
		}
		else {
			if (isDraft) {
				$subItem = $('<td class="docno" data-prop="docNo" data-docno="">[尚未取號]</td>');
			}
			else {
				$subItem = $('<td class="docno" data-prop="docNo" data-docno=""></td>');
			}
		}
		if (!!$subItem)
			$item.append($subItem);
			
		if (!that.shouldHideLights() && !that.narrowWindow && that.showICOU) { // 2018.09.28 – 1070955
			// 承辦單位
			$subItem = $('<td class="to_e" data-prop="ICOUName">' + doc.ICOUName + '</td>').appendTo($item);
		}

		// 承辦人
		// 2020.6.16 - 1090452 Eric, listHeader.ss_normal layout 有[承辦人]欄位 (narrowWindow=true)
		if (!that.shouldHideLights() && (that.showICUser || that.narrowWindow)) { // 2018.09.28 – 1070955
			if (doc.ICUserName.length) {
				$subItem = $('<td data-prop="ICUserName" class="to_e">' + theSSO.Util.htmlEncode(doc.ICUserName) + '</td>');
			}
			else {
				$subItem = $('<td data-prop="ICUserName" class="to_e"></td>');
			}
			if (!!$subItem)
				$item.append($subItem);
		}
		
		if (that.shouldHideLights() || that.narrowWindow || that.showFromOU) { // 2018.09.28 – 1070955
			// 送文單位
			$subItem = null;
			if (doc.fromOUName.length) {
				//$subItem = $('<td data-prop="fromOUName" class="to_e"><input type="text" size="10" readonly="readonly" maxLength="10" value="' + doc.fromOUName + '"></input></td>');
				$subItem = $('<td data-prop="fromOUName" class="to_e">' + theSSO.Util.htmlEncode(doc.fromOUName) + '</td>'); // 2016.9.8 - 調整顯示內容
			}
			else {
				$subItem = $('<td data-prop="fromOUName" class="to_e"></td>');
			}
			if (!!$subItem)
				$item.append($subItem);
		}
		
		// 主旨
		if (doc.fromSubject.length) {
			var sSubj = '';
			var len = 256; // 20; 2016.7 - change length
			if (doc.fromSubject.length > len) {
				sSubj = doc.fromSubject.substr(0, len);
				sSubj += '...';
			}
			else {
				sSubj = doc.fromSubject;
			}
			
			if (_debug) {
				var sfolder = doc.folder + '-' + doc.subfolder;
				$subItem = $('<td class="subject" data-prop="subject" title="'+ theSSO.Util.htmlEncode(sfolder) + '">' + theSSO.Util.htmlEncode(SSOUtil.escapeXml(sSubj)) + '</td>');
			}
			else {
				$subItem = $('<td class="subject"  data-prop="subject">' + theSSO.Util.htmlEncode(SSOUtil.escapeXml(sSubj)) + '</td>');
			}
		}
		else {
			$subItem = $('<td class="subject" data-prop="subject"></td>');
		}
		if (!!$subItem)
			$item.append($subItem);
			
		// 異動別
		if (!that.shouldHideLights() && !that.shouldHideTransInfo()) { // 2017.2.13
			if (doc.txName.length) {
				$subItem = $('<td data-prop="txName" class="to_e">' + theSSO.Util.htmlEncode(doc.txName) + '</td>');
			}
			else {
				$subItem = $('<td data-prop="txName" class="to_e"></td>');
			}
			if (!!$subItem) {
				$item.append($subItem);
			}
				
			// 傳送至
			if (doc.toUserName.length) {
				$subItem = $('<td data-prop="toUserName" class="to_e">' + theSSO.Util.htmlEncode(doc.toUserName) + '</td>');
			}
			else {
				if (typeof doc.toOUName!=='string' || doc.toOUName.length===0) {
					$subItem = $('<td data-prop="toUserName" class="to_e"></td>');
				}
				else {
					// toOUName, toRoleName
					var _toXXX = theSSO.Util.htmlEncode(doc.toOUName);
					var _sendTo = theSSO.Util.htmlEncode(doc.toOUName);
					if (typeof doc.toRoleName=='string' && doc.toRoleName.length) {
						_toXXX += '<br>' + theSSO.Util.htmlEncode(doc.toRoleName);
						_sendTo = theSSO.Util.htmlEncode(doc.toRoleName);
					}
					$subItem = $('<td data-prop="toUserName" class="to_e" title="'+ _sendTo +'">' + _toXXX + '</td>');
				}
			}
			if (!!$subItem) {
				$item.append($subItem);
			}
		}
			
		if (!that.shouldHideLights() && !that.narrowWindow && that.showFromOrg) { // 2018.09.28 – 1070955
			// 來文機關
			if (doc.fromOrg.length) {
				$subItem = $('<td class="to_e" data-prop="fromOrg" title="'+ theSSO.Util.htmlEncode(doc.fromOrg) +'">'+ theSSO.Util.htmlEncode(doc.fromOrg) +'</td>').appendTo($item);
			}
			else {
				$subItem = $('<td class="to_e" data-prop="fromOrg"></td>').appendTo($item);
			}
		}
		
        // 2017.6.22 - 成大 流程
        // 2023.4.20 - Eric: Quick-fix columns mis-match!
        if (!that.narrowWindow) {
            if (doc.signType==='P' || doc.signType==='E') {
                if (isDraft) {
                    $subItem = $('<td data-prop="docProc" class="docProc"></td>'); // 2017.7.31 - bug-fix ($sSubItem -> $subItem)
                }
                else {
                    $subItem = $('<td data-prop="docProc" class="docProc"><span class="url_link">[開啟]</span></td>');
                }
            }
            if (!!$subItem) {
                $item.append($subItem);
            }
        }

		// 送方傳送時間
		// => <td>06/07 15:20</td> <!-- new time -->
		// 2021.7 - 1100854 Eric
		if (SSO_CONFIG.OrgNickName=="NUK" && doc.fullNewTime.length==13) {
			var sDate = doc.fullNewTime.substring(0, 3) + '/'  + 
						doc.fullNewTime.substring(3, 5) + '/' +
			            doc.fullNewTime.substring(5, 7);
			var sTime = doc.fullNewTime.substring(7, 9) + ':' +
						doc.fullNewTime.substring(9, 11)+ ':' +
						doc.fullNewTime.substring(11, 13);
			//2016.12.9	Leslie	增加隱藏欄位以隔絕辦理期限與文號，避免連續數字被誤判
			sDate = '<span style="display:none">€</span>' + theSSO.Util.htmlEncode(sDate);
			$subItem = $('<td class="newTime" data-prop="newTime" style="font-size:smaller"><p style="nowrap:none;">' + sDate + '</p>' +
						'<p style="nowrap:none;">' + theSSO.Util.htmlEncode(sTime) + '</p></td>');
		} 
		else if (doc.newTime.length==11)	{
			if (SSO_CONFIG.OrgNickName=="NUKK") {
				var sDate = doc.newTime.substring(0, 3) + '/' +
						   	doc.newTime.substring(3, 5) + '/' +
							doc.newTime.substring(5, 7) + ' ';
				var sTime = doc.newTime.substring(7, 9) + ':' +
							doc.newTime.substring(9, 11)+ ':' +
							'00';
				//2016.12.9	Leslie	增加隱藏欄位以隔絕辦理期限與文號，避免連續數字被誤判
				sDate = '<span style="display:none">€</span>' + theSSO.Util.htmlEncode(sDate);
				$subItem = $('<td class="newTime" data-prop="newTime" style="font-size:smaller"><p style="nowrap:none;">' + sDate + '</p>' +
							'<p style="nowrap:none;">' + theSSO.Util.htmlEncode(sTime) + '</p></td>');
			}
			else {
				sDate = doc.newTime.substring(3, 5) + '/' +
						doc.newTime.substring(5, 7) + ' ';
				var sTime = doc.newTime.substring(7, 9) + ':' +
							doc.newTime.substring(9, 11);
				//2016.12.9	Leslie	增加隱藏欄位以隔絕辦理期限與文號，避免連續數字被誤判
				sDate = '<span style="display:none">€</span>' + theSSO.Util.htmlEncode(sDate);
				$subItem = $('<td class="newTime" data-prop="newTime"><p style="nowrap:none;">' + sDate + '</p>' +
							'<p style="nowrap:none;">' + theSSO.Util.htmlEncode(sTime) + '</p></td>');
			}
		}
		else {
			$subItem = $('<td class="newTime" data-prop="newTime"></td>');
		}
		if (!!$subItem)
			$item.append($subItem);
			
		// 2018.9.27 - 1070955 [目前位置]
		if (!that.shouldHideLights() && !that.narrowWindow && that.showCurrLoc) {
			$subItem = $('<td class="to_e" data-prop="currLocate">' + theSSO.Util.htmlEncode(doc.currLocate) + '</td>')
			if (!!$subItem) $item.append($subItem);
		}

		//2016.12.9	Leslie	增加隱藏欄位以隔絕每一列
		$item.append($('<td style="display:none">§</td>'));
			
		return $item;
	};
	
	// 2011.11.10 
	_self._createNewItem_SearchList = function(doc) {
		/*
		  <li>
			<div class="lights">
				<img alt="type:線上簽核" src="./IMAGE/ART/Todo-SignTypeOnline.png"/>
				<img alt="lgt:紅" src="./IMAGE/SSO/1_alert_red.gif"/>
				<!--<img alt="開啟:已閱讀" src="./IMAGE/SSO/icon_read.gif"/>-->
				<br/>
			</div>
			<a href="#" class="sl_docNo">1000100020</a>
			<p class="sl_content sl_subject">測試公文主旨００１</p>
			<p class="sl_content sl_incharge">人事室二科 查爾斯一</p>
		  </li>
		*/
		var $item = $('<li></li>').attr({'data-theme':'c'}).addClass('ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-c');
		var $outer = $('<div></div>').addClass('ui-btn-inner ui-li');
		var $inner = $('<div></div>').addClass('ui-btn-text');
		
		var $subItem = null;
		
		if (doc.signType!="W")
		{ // lights
			var $lights = $('<div></div>').addClass('lights'); // 2020.4.21 - 1080339 Eric, </div => </div>
			
			// 燈號
			var lightInfo = _getLightInfo(doc);
			if (lightInfo.light!='green') {
				$('<img></img>').attr({alt:'燈號', src: theSSO.Util.htmlEncode(lightInfo.url)}).appendTo($lights);
			}
			
			// 速別
			var speed = doc.speed;
			switch(speed) {
			//case "1": lights.append($('<img alt="Spd:普通" src="./IMAGE/ART/Todo-Speed1.png" />')); break;
			case "2": $lights.append($('<img alt="Spd:速件" src="./IMAGE/ART/Todo-Speed2.png" />')); break;
			case "3": $lights.append($('<img alt="Spd:最速件" src="./IMAGE/ART/Todo-Speed3.png" />')); break;
			}
			
			// 密等: 1: 普通, 2:密, 3:機密, 4:極機密, 5:絕對機密
			var secret = doc.secret;
			switch(secret) {
			case "2": case "3":
			case "4": case "5":
				$('<img></img>').attr({alt:'sec:黃', src:'./IMAGE/ART/Todo-Secret2.png'}).appendTo($lights); break;
			}
			
			// 簽核類型: 'E' -> 線上, 'P' -> 紙本
			switch(doc.signType) {
			case "E": $('<img></img>').attr({alt:'signType:E', src:'./IMAGE/ART/Todo-SignTypeOnline.png'}).appendTo($lights); break;
			case "P": $('<img></img>').attr({alt:'signType:P', src:'./IMAGE/ART/Todo-SignTypePepper.png'}).appendTo($lights); break;
			}
			
			// 未閱讀
			if (doc.signTime.length==0) {
				$('<img></img>').attr({src:'./IMAGE/ART/Todo-ReadNon.png'}).appendTo($lights);
			}
			
			if (!!$lights)
				$inner.append($lights);
		}
					
		if (doc.signType!="W") { // 文號 : <a href="#" class="sl_docNo">1000100020</a>
			if (doc.docNo.length) {
				$subItem = $('<a>' + theSSO.Util.htmlEncode(doc.docNo) + '</a>');
			}
			else {
				$subItem = $('<a"></a>');
			}
			$subItem.addClass('sl_docNo ui-link-inherit').attr('href', '#');
			
			if (!!$subItem)
				$inner.append($subItem);	
		}
		
		{	// 主旨 : <p class="sl_content sl_subject">測試公文主旨００１</p>
			if (doc.fromSubject.length) {
				if (doc.fromSubject.length>24) {
					$subItem = $('<p>' + theSSO.Util.htmlEncode(doc.fromSubject.substr(0, 24)) + '...</p>');
				}
				else {
					$subItem = $('<p>' + theSSO.Util.htmlEncode(doc.fromSubject) + '</p>');
				}
			}
			else {
				$subItem = $('<td></td>');
			}
			
			if (doc.signType!="W") {
				$subItem.addClass('sl_content sl_subject ui-li-desc');
			}
			else {
				$subItem.addClass('sl_content sl_subject ui-li-tdl-w');
			}
			
			if (!!$subItem)
				$inner.append($subItem);
		}
			
		if (doc.signType!="W") {	
			// 承辦人 : <p class="sl_content sl_incharge">人事室二科 查爾斯一</p>
			if (doc.ICUserName.length || doc.ICOUName.length) {
				var txt = doc.ICOUName;
				if (txt.length && doc.ICUserName.length)
					txt += ' ';
				if (doc.ICUserName.length)
					txt += doc.ICUserName;
				
				if (txt.length) {
					$subItem = $('<p>' + theSSO.Util.htmlEncode(txt) + '</p>');
				}
				else {
					$subItem = $('<p></p>');
				}
			}
			else {
				$subItem = $('<td></td>');
			}
			$subItem.addClass('sl_content sl_incharge ui-li-desc');
			
			if (!!$subItem)
				$inner.append($subItem);
		}
		
		$outer.append($inner);
		
		// span (for jQM list object)
		$('<span></span>').addClass('ui-icon ui-icon-arrow-r ui-icon-shadow').appendTo($outer);
		
		$item.append($outer);
		return $item;
	};
	
	/* 分析doc內容, 取得present item的 class (Icon模式使用)
	 */
	_self._getItemExtraClass = function(doc) {
		/*if (_debug && (doc.docNo=='1000000308')) {
			console.log('DcoNo=' + doc.docNo +	', speed=' + doc.speed);
		}*/
			
		var speed = doc.speed;
		if (speed==undefined) {
			if (doc.signTime.length || doc.isDraft) { // 2016.12.20 - 草稿一律為已閱讀
				return 'opened_normal_item';
			}
			else {
				return 'normal_item';
		}
		}
		
		// 2016.5 - 密件優先!
		if (doc.secret == '2' ||doc.secret =='3') {
			if (doc.signTime.length || doc.isDraft) { // 2016.12.20 - 草稿一律為已閱讀!
				return 'opened_secret_item';
			}
			else {
				return 'secret_item';
			}
		}
		
		switch(speed) {
		case '2':
			{
				if (doc.signTime.length || doc.isDraft) { // 2016.12.20 - 草稿一律為已閱讀!
					return 'opened_urgent_item';
				}
				else {
					return 'urgent_item';
			}
				break;
			}
		case '3':
			{
				if (doc.signTime.length || doc.isDraft) { // 2016.12.20 - 草稿一律為已閱讀!
					return 'opened_most_urgent_item';
				}
				else {
					return 'most_urgent_item';
			}
		}
		}
		
		if (doc.signTime.length || doc.isDraft) { // 2016.12.20 - 草稿一律為已閱讀!
			return 'opened_normal_item';
		}
		else {
			return 'normal_item';
		}
	};
	
	/* 燈號判定
	 * {
			light: 'white', // => white / purple / green / red / yellow
			url: './IMAGE/SSO/****.gif, // => 對應燈號的icon圖示
			value: 1 // ??
	 * }
	*/
	_self._getLightInfo = function(doc) {
		/* 2017.8.11 - bug-fix, 回傳物件value值修訂, 以實作依燈號排序功能
		 * 2016.8.19 - 非待處理/會核中公文, 一律顯示白燈
		 */
		//1090601 David 1090345 已辦畢資料夾需依照公文狀態顯示燈號，調整燈號白燈判斷邏輯
		//if (doc.folder!=='待處理' && doc.folder!=='會核中') {
		if (doc.folder!=='待處理' && doc.folder!=='會核中' && doc.folder !== '已辦畢') {
			return {light:'white', url:"./IMAGE/ART/Todo-LightWhite.png", value:2, tip:''};
		}

		//1090601 David 1090345 已辦畢公文如DOC_STATE>=13，顯示白燈
		if(doc.folder == '已辦畢' && doc.docState >= "13")
			return {light:'white', url:"./IMAGE/ART/Todo-LightWhite.png", value:2, tip:''};

		var DtTime = new Date();
		var dYear = SSOUtil.jf_PADL2( (DtTime.getFullYear()-1911).toString(),3,"0");
		var dMon  = SSOUtil.jf_PADL2( (DtTime.getMonth()+1).toString(),2,"0");
		var dDay  = SSOUtil.jf_PADL2( DtTime.getDate().toString() , 2,"0");
		var cTime = dYear + dMon + dDay;
		
		var msgOut = doc.outLMT;
	
		/*/0960501 CAESAR [000723-藥檢局]修正使用者抱怨訊息入口中限辦日期相同之公文,警示燈號卻不同之問題
		//		 新增環境變數sII_ALARM_BY_MSGOUTLMT,若設定為Y,則:
		//		 系統日期大於TODO_LIST.MSG_OUT_LMT=>顯示紅燈
		//		 系統日期等於TODO_LIST.MSG_OUT_LMT=>顯示黃燈	
		//		 系統日期小於TODO_LIST.MSG_OUT_LMT=>顯示綠燈
		*/
		// 2016.8.19 - 讀取環境變數"II_ALARM_BY_MSGOUTLMT".
		if (typeof that.alarmByMsgOutLmt == 'undefined') {
			that.alarmByMsgOutLmt = false;
			var sValue = theSSO.User.EnvSettings.get('II_ALARM_BY_MSGOUTLMT');
			if (typeof sValue=='string' && (sValue=='Y' || sValue=='y')) {
				that.alarmByMsgOutLmt = true;
			}
		}
		
		// 2021.7 - 1100849 Eric, NUK tooltip (add 'tip' attribute)
		if(that.alarmByMsgOutLmt) {
			if(doc.alarmTime.length !== 0) {
				//2017.9.25 David 修正參數錯誤問題
				//if(doc.state == "09") {
				if(doc.docState == "09") {
					return {light:'white', url:"./IMAGE/ART/Todo-LightWhite.png", value:2, tip:''};
				}
				else {
					if(cTime > doc.alarmTime) {
						return {light:'purple', url:'./IMAGE/ART/Todo-LightPurple.png', value:4, tip:''};
					}
					else {
						return {light:'white', url:'./IMAGE/ART/Todo-LightWhite.png', value:2, tip:''};
					}
				}
			}
			else if(msgOut==='') {
				return {light:'green', url:'./IMAGE/ART/Todo-LightGreen.png', value:3, tip:'未屆辦理期限(Within the time allowed)'};	
			}
			else if(cTime > msgOut)	{
				return {light:'red', url:'./IMAGE/ART/Todo-LightRed.png', value:0, tip:'已逾辦理期限(Overdue)'};
			}
			else if(cTime == msgOut) {
				return {light:'yellow', url:'./IMAGE/ART/Todo-LightYellow.png', value:1, tip:'已屆辦理期限(Expiring)'};	
			}
			else {
				return {light:'green', url:'./IMAGE/ART/Todo-LightGreen.png', value:3, tip:'未屆辦理期限(Within the time allowed)'};	
			}
		}
	
		if(msgOut!=='') {
			if(cTime > msgOut) {
				return {light:'red', url:'./IMAGE/ART/Todo-LightRed.png', value:0, tip:'已逾辦理期限(Overdue)'};
			}
		}
	
		if(doc.dueDate!=='') {
			if(cTime > doc.dueDate) {
				return {light:'red', url:'./IMAGE/ART/Todo-LightRed.png', value:0, tip:'已逾辦理期限(Overdue)'};
			}
		}
	
		var msgAlt = doc.alarmLMT;
		if(msgAlt!=='') {
			if(cTime > msgAlt) {
				return {light:'yellow', url:'./IMAGE/ART/Todo-LightYellow.png', value:1, tip:'已屆辦理期限(Expiring)'};	
			}
		}
	
		var alt = doc.alarmTime;
		if(alt!=='') {
			if(cTime >= alt) {
				return {light:'yellow', url:'./IMAGE/ART/Todo-LightYellow.png', value:1, tip:'已屆辦理期限(Expiring)'};	
			}	
		}
	
		return {light:'green', url:'./IMAGE/ART/Todo-LightGreen.png', value:3, tip:'未屆辦理期限(Within the time allowed)'};
	};
	
	// 2016.9.6 - 由_getFolderString移出並加入由代理文件夾名稱反查功能
	_self._getProxyFolderSetting = function(proxySetting, folderStr, isProxyFolderStr) {
		if (typeof isProxyFolderStr !=='boolean') {
			isProxyFolderStr = false;
		}
		
		for (var x in proxySetting) {
			if (!proxySetting.hasOwnProperty(x)) continue;
			
			var set = proxySetting[x];
			var tFolderStr = isProxyFolderStr ? set.proxySetting.newfolder : set.folder;
			if (isProxyFolderStr) {
				if (set.proxySetting.newsubfolder.length) {
					tFolderStr += ('-' + set.proxySetting.newsubfolder);
				}
			}
			else {
				if (set.subfolder.length) {
					tFolderStr += ('-' + set.subfolder);
				}
			}
			
			if (tFolderStr === folderStr) {
				if (!!set.proxySetting) {
					return set;
				}
				else {
					return null;
				}
			}
		}
		return null;
	};
		
	/* 取得公文的Folder/SubFolder
	 * 若為代理公文, 則會由MPUISetting取得對應的顯示設定
	 *  -> 代理公文夾 FOLDER/SUBFOLDER
	 *  -> 字型 (行動版尚未實作)
	 *  -> 顏色 (行動版尚未實作)
	 */
	_self._getFolderString = function(docObj, returnProxyFlag) {
		if (typeof returnProxyFlag =='undefined') {
			returnProxyFlag = false;
		}
		
		var proxyFolder = false; // 是否為代理公文
		var displayFolder = docObj.folder; // 用於記錄公文的folder, 非代理: docObj.folder, 代理: folderProxySetting.proxySetting.newfolder
		var folderStr = docObj.folder; // 非代理: folder-subfolder, 代理: [folderProxySetting.proxySetting.newfolder]-[folderProxySetting.proxySetting.newsubfolder]
		if (docObj.subfolder.length) {
			folderStr += ('-' + docObj.subfolder);
			// 2019.12.5 - Eric, 版更公文夾清單異常 bug-fix (代理未列出, 待處理排序未在前面)
			//displayFolder += ('-' + docObj.subfolder); // 2019.7 - 1080654 Eric, (自動開啟次筆公文) 非代理公文 displayFolder與folderStr應一致!
		}
			
		if (folderStr.length && (docObj.ODWMSG.IS_PROXY_DOC==='1'))
		{
			// 代理公文
			var folderProxySetting = _self._getProxyFolderSetting(_proxySetting, folderStr);
			if (!!folderProxySetting) {
				folderStr = folderProxySetting.proxySetting.newfolder;
				displayFolder = folderProxySetting.proxySetting.newfolder;
				if (folderProxySetting.proxySetting.newsubfolder.length) {
					folderStr += ('-' + folderProxySetting.proxySetting.newsubfolder);
					proxyFolder = true;
				}
			}
		}
		
		if (returnProxyFlag) {
			return { folderStr:folderStr, proxy: proxyFolder, displayFolder: displayFolder, signType:docObj.signType};
		}
		return folderStr;
	};
			
	/* 拖拉待辦項目 => 目前已取消實作
	 */
	/*var _itemDragStart = function(event, param)
	{
		var _prefix = 'folder_';
		// Raymond added, Drag & drop開始後禁止iscroll及計算iscroll位移
		var k = $(event.currentTarget).closest('.folioList').attr('id');
		console.log(event.type + ': 禁止' + k + '的iScroll功能...');
		
		//var iso = folderScrolls[k];	// iScroll api, 以後若folderScrolls改用字典(物件)方式記錄時再用這個取法
		var idx = parseInt(k.substr(_prefix.length)) - 1;	// id是從1開始, 故減1
		if(theSSO.MP.todolist.folderScrolls.length > 0 && idx < theSSO.MP.todolist.folderScrolls.length) {
			var iso = theSSO.MP.todolist.folderScrolls[idx];
			param.pos.x += iso.x;
			param.pos.y += iso.y;
			iso.disable();
		}
		else {
			console.log('超出陣列範圍! idx=' + idx + ', folderScrolls.length=' + theSSO.MP.todolist.folderScrolls.length);
		}
		
		if(theSSO.MP.todolist.tdlicon_Scroll != null && theSSO.MP.todolist.tdlicon_Scroll instanceof iScroll) {
			param.pos.x += theSSO.MP.todolist.tdlicon_Scroll.x;
			param.pos.y += theSSO.MP.todolist.tdlicon_Scroll.y;
			theSSO.MP.todolist.tdlicon_Scroll.disable();	// 禁止圖示模式窗格的左右iScroll機能
		}
	};
	
	var _itemDragEnd = function(event, param) {
		var _prefix = 'folder_';
		// Raymond added, Drag & drop結束後啟用iscroll					
		var k = $(event.currentTarget).closest('.folioList').attr('id');
		console.log(event.type + ': 恢復' + k + '的iScroll功能...');
		
		//var iso = folderScrolls[k];	// iScroll api, 以後若folderScrolls改用字典(物件)方式記錄時再用這個取法
		var idx = parseInt(k.substr(_prefix.length)) - 1;	// id是從1開始, 故減1
		if(theSSO.MP.todolist.folderScrolls.length > 0 && idx < theSSO.MP.todolist.folderScrolls.length) {
			theSSO.MP.todolist.folderScrolls[idx].enable();	// 恢復iScroll機能
		}
		else {
			console.log('超出陣列範圍! idx=' + idx + ', folderScrolls.length=' + theSSO.MP.todolist.folderScrolls.length);
		}
		
		if(theSSO.MP.todolist.tdlicon_Scroll != null && theSSO.MP.todolist.tdlicon_Scroll instanceof iScroll)
			theSSO.MP.todolist.tdlicon_Scroll.enable();	// 恢復圖示模式窗格的左右iScroll機能
	}*/
	
	// 取得圖示公文項目(HTML dom object)
	_self._createNewItem_Icon = function(doc, rrbSpecColor)  { // doc is an object
		/*<li data-msgid="$msgId$">
			<div class="item normal_item working_item opened_normal_item">
				<div class="content">
					<div class="lights">
						<img alt="lgt:紅" src="./IMAGE/SSO/1_alert_red.gif"/>
						<img alt="type:線上簽核" src="./IMAGE/ART/Todo-SignTypeOnline.png"/>
					</div>
					<div class="docNo">
						<a class="folioLink" href="#" data-docno="1000001001" data-msgid="100233">1000001001</a>
					</div>
					<div class="subject">
						<span>測試公文主旨一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十</span>
					</div>
					<div class="clerk">
						<img alt="承辦人" src="./IMAGE/ART/Todo-IconUser.png"/>
						<p>人事室二科 查爾斯一</p>
					</div>
				</div>
			</div>
		</li>
		*/

		// 2019.6.11 - 1080412, Eric Peng
		rrbSpecColor = (typeof rrbSpecColor=='boolean')?rrbSpecColor:false;
		
		if (doc.signType=='W' && _debug) {
			theLogger.log('_createNewItem_Icon, gonna process doc, signType=\"' + theSSO.Util.htmlEncode(doc.signType) + '\"');
		}
		
		var isDraft = _isDraftMsg(doc);
		//1120217	Leslie[1110881]	銓敘部-序14，增加可以一併更新MsgID
		// var todoMsgId = doc.msgId;
		var todoMsgId = ('newMsgId' in doc && doc.newMsgId.length !== 0)?doc.newMsgId:doc.msgId;
		var $item = $('<li></li>').attr('data-msgid', theSSO.Util.htmlEncode(todoMsgId));
		if (isDraft) {
			$item.attr('data-draft', 'true');
			$item.attr('data-ICUser', theSSO.Util.htmlEncode(doc.ICUserId));
		}

		var $outer = $('<div></div>') // 2019.8.26 - Eric, bug-fix - typo
					.attr('class', 'item')
					.appendTo($item);
		
		// 2013.8 - Eric Peng - 取消拖拉機制!
		// Raymond Edit!!! - for 公文併文拖拉			
		// Raymond added, 加上'draggable'支援Drag and Drop
		if (doc.signType=='E' || doc.signType=='P') {
			//$outer.addClass('draggable')
			//	  .on('dragstart', _itemDragStart)	// Raymond added, Drag & drop 開始後禁止iscroll及計算iscroll位移
			//      .on('dragend', _itemDragEnd);
		}
					
	    var $content = null;
		if (doc.signType=='W') {
			$outer.addClass('notify_item');
			$content = $('<div></div>').attr('class', 'content').appendTo($outer);
			var $light = $('<div></div>').addClass('lights').appendTo($content);
			$('<img></img>').attr('src', './IMAGE/ART/Todo-SignTypeNotify.png').appendTo($light);
			
			// 開啟URL
			$subItem = $('<a>  [開啟...]</a>').attr({'class':'urlLink', href:'#', 'data-docno': theSSO.Util.htmlEncode(doc.docNo), 'data-msgid' : theSSO.Util.htmlEncode(doc.msgId), });
			$('<div></div>').append($subItem).appendTo($content);
			$subItem = null;
		}
		else {
			// 依公文速別/密等區分底色
			var extraClass = _getItemExtraClass(doc);
			$outer.addClass(extraClass);
			
			$content = $('<div></div>').attr('class', 'content').appendTo($outer);
			var $lights = $('<div></div>').attr('class', 'lights').appendTo($content);
			
			var $subItem = null;
			
			// 公文燈號
			var lightInfo = _getLightInfo(doc);
			if (lightInfo.light!='green' && lightInfo.light!='white') { // 2016.11.23 - 白燈也不顯示!
				$('<img></img>').attr('src', lightInfo.url).appendTo($lights);
			}
			
			// 2011.11.10 - 加深陰影
			if (lightInfo.light=='red') {
				$outer.addClass('most_heavy_shadow');
			}
			
			// 線上/紙本簽核
			if (doc.signType=='E' || doc.signType=='P') {
				if (doc.signType=='E') {
					$('<img></img>').attr('src', './IMAGE/ART/Todo-SignTypeOnline.png').appendTo($lights);
				}
				else {
					$('<img></img>').attr('src', './IMAGE/ART/Todo-SignTypePepper.png').appendTo($lights);
				}
			}
			
			// 文號
			var sDocNo = doc.docNo;
			if (sDocNo.length===0 && isDraft) {
				sDocNo = '[尚未取號]';
			}
			
			// 2016.12.5 - 1051175, 鐵工局稽核類公文, 文號前面加'*'
			var docNoForDisplay = sDocNo; // 2017.1.3 - bug-fix
			if (SSO_CONFIG.OrgNickName=='RRB' || _debug) {
				var isAudit = (typeof doc.ODWMSG.IS_AUDIT=='string')?doc.ODWMSG.IS_AUDIT:'N';
				if (isAudit=='Y'||isAudit=='y') {
					docNoForDisplay = '*' + doc.docNo;
				}
			}	

			// 2019.6.11 - 1080412, Eric Peng
			let docNoClass = 'folioLink context-menu-todo';
			if (rrbSpecColor) {
				docNoClass += ' rrbSpecColor';
			}
			//1110323 David 1101416 如TODO_LIST有註記需變更文號顏色時，調整畫面文號顏色
			else if(typeof doc.ODWMSG.CHANGE_DOC_COLOR =='string' && doc.ODWMSG.CHANGE_DOC_COLOR == "Y"){
				docNoClass += ' redText';
			}
			$subItem = $('<a>' + theSSO.Util.htmlEncode(docNoForDisplay) + '</a>').attr({'class':docNoClass, href:'#', 'data-docno': theSSO.Util.htmlEncode(doc.docNo), 'data-msgid' : theSSO.Util.htmlEncode(todoMsgId), });
			
			$('<div></div>').attr('class', 'docNo').append($subItem).appendTo($content);
			$subItem = null;
		}
		
		// 主旨
		var subj = '';
		if (doc.fromSubject.length>40) {
			subj = doc.fromSubject.substring(0, 37) + '...';
		}
		else {
			subj = doc.fromSubject;
		}
		var $subject = $('<div><span>' + theSSO.Util.htmlEncode(subj) + '</span></div>').attr('class', 'subject');
		$subject.appendTo($content);
		
		if (doc.signType!='W') {
			/* 承辦人
			 *  <div class="clerk">
			 *	  <img alt="承辦人" src="./IMAGE/ART/Todo-IconUser.png"/>
			 *	  <p>人事室二科 查爾斯一</p>
			 *  </div>
			*/
			
			$subItem = $('<div></div>').attr('class', 'clerk').append($('<img alt="承辦人" src="./IMAGE/ART/Todo-IconUser.png" />'));
			if (doc.ICUserName.length || doc.ICOUName.length) {
				$subItem.append($('<p>' + theSSO.Util.htmlEncode(doc.ICOUName) + ' ' + theSSO.Util.htmlEncode(doc.ICUserName) +  '</p>'));
			}
			$content.append($subItem);
		}
		/*else {
		  *	$subject.find('span').attr({'class':'urlLink', 'data-msgId': doc.msgId });
		}*/
		
		return $item;
	};
	
	_self._getCurrentDate = function() {
		var d = new Date();
		var sYear='', sMonth='', sDay='';
		var twYear = d.getFullYear()-1911;
		if (twYear >= 100) {
			sYear = d.getFullYear()-1911;
		}
		else if (twYear >= 10) {
			sYear = '0' + (d.getFullYear()-1911);
		}
		else {
			sYear = '00' + (d.getFullYear()-1911);
		}
		
		if ((d.getMonth()+1) < 10) {
			sMonth = '0' + (d.getMonth()+1);
		}
		else {
			sMonth = '' + (d.getMonth()+1);
		}
		
		if (d.getDate()<10) {
			sDay = '0' + d.getDate();
		}
		else {
			sDay = '' + d.getDate();
		}
		
		var sDate = sYear + sMonth + sDay;
		return sDate;
	};
	
	var _getDueDateGroupTitle = function (date) {
		var sTitle = '';
		if (date.length==7) {
			var sYear = date.substring(0, 3);
			var sMonth = date.substring(3, 5);
			var sDay = date.substring(5, 7);
			if (sYear.indexOf('0') == 0)
				sYear = sYear.substring(1,3);
			if (sYear.indexOf('0')==0)
				sYear = sYear.substring(1,2);
			
			if (sMonth.indexOf('0')==0)
				sMonth = sMonth.substring(1,2);
			if (sDay.indexOf('0')==0)
				sDay = sDay.substring(1,2);
			sTitle=sYear+'年'+sMonth+'月'+sDay+'日';
		}
		return sTitle;
	};
	
	/* 2015.1 - 轉換SignType='W'項目的URL內容.
	 * (行動平台與PC平台實作以不同網頁處理指定訊息)
	 */
	var _modifyToDoUrl = function(url) {
		// ODDEP/ODT221 >>>>   EP/EPT221
		var rslt = url.toLowerCase();
		if (rslt.indexOf('oddep/odt221')!=-1) {
			return rslt.replace('oddep/odt221', 'ep/ept221');
		}
		// AK//AKT802   >>>>   EP/EPT802
		else if (rslt.indexOf('ak/akt802')!=-1) {
			return rslt.replace('ak/akt802', 'ep/ept802');
		}
		else if (rslt.indexOf('ak//akt802')!=-1) {
			return rslt.replace('ak//akt802', 'ep/ept802');
		}
		// ED/ED4/EDT403   >>>>   EP/EPT403
		else if (rslt.indexOf('ed/ed4/edt403')!=-1) {
			return rslt.replace('ed/ed4/edt403', 'ep/ept403');
		}
		// ED/ED4/EDT405   >>>>   EP/EPT405
		else if (rslt.indexOf('ed/ed4/edt405')!=-1) {
			return rslt.replace('ed/ed4/edt405', 'ep/ept405');
		}
		// EA/EA03/EAT311   >>>>   EP/EPT311
		else if (rslt.indexOf('ea/ea03/eat311')!=-1) {
			return rslt.replace('ea/ea03/eat311', 'ep/ept311');
		}
		return url;
	};
	
	// 記錄所有ODWMSG欄位
	var _makeODWMSG = function(docNode) {
		if (!!docNode) {
			var odwmsg = {};
			var len = docNode.childNodes.length;
			for(var i=0; i<len; i++) {
				var node = docNode.childNodes[i];
				if (node.nodeType==1) { // 只取child elements
					odwmsg[node.nodeName] = SSOUtil.xml_getNodeValue(node);
				}
			}
			return odwmsg;
		}
		return null;
	};
	
	/* 由XML <ODWMSG> node轉出 javascript doc object [2019/2/18 - 目前收到新進訊息時才會取ODWMSG XML並執行此函式, 登入待辦清單使用JSON]
	 * 2015.10.7 - 目前SignType='E'之篩選條件: (a)103年以後公文, (b)草稿排除, (c)會核中-主辦排除
	 */
	var _getDocFromODWMSG = function(docNode) {
		/*
		 * 2014.8 - 去除102年以前公文(含102年)
		 */
		function _excludeDoc(docNo) {
			if (docNo.length===0) return false;
			if (docNo.length>3) {
				var sFileYear = docNo.substr(0, 3);
				var fileYear = parseInt(sFileYear);
				if (fileYear<=102) {
					return true;
				}
			}
			return false;
		}
		/*
		 * 2015.1 - Eric Peng, 篩選應列入的通知訊息(SignType='W')
		 */
		function _excludeDoc_W(docNode) {
			//ODT221_AUDITMSG_FOLDER / EDT405_AUDITMSG_FOLDER / AKT802_AUDITMSG_FOLDER / EDT403_AUDITMSG_FOLDER / EAT310_APPLMSG_FOLDER
			var _folder = SSOUtil.xml_getChildNodeValue(docNode, 'FOLDER');
			var _subfolder = SSOUtil.xml_getChildNodeValue(docNode, 'SUBFOLDER');
			var _fullfolder = '';
			if (!!_folder && _folder.length && !!_subfolder && _subfolder.length) {
				_fullfolder = _folder + '-' + _subfolder;
			}
			else if (!!_folder && _folder.length) {
				_fullfolder = _folder;
			}
			
			var folder = theSSO.User.SystemSets['ODT221_AUDITMSG_FOLDER'];
			if (!!folder && (_fullfolder == folder)) {
				return false;
			}
			folder = theSSO.User.SystemSets['EDT405_AUDITMSG_FOLDER'];
			if (!!folder && (_fullfolder == folder)) {
				return false;
			}
			folder = theSSO.User.SystemSets['AKT802_AUDITMSG_FOLDER'];
			if (!!folder && (_fullfolder == folder)) {
				return false;
			}
			folder = theSSO.User.SystemSets['EDT403_AUDITMSG_FOLDER'];
			if (!!folder && (_fullfolder == folder)) {
				return false;
			}
			folder = theSSO.User.SystemSets['EAT310_APPLMSG_FOLDER'];
			if (!!folder && (_fullfolder == folder)) {
				return false;
			}
			return true;
		}
		
		if ((typeof docNode === 'undefined') || docNode===null)
			return null;
		
		var doc = null;
		
		// 取紙本/線上簽核公文&SIGN_TYPE="W"項目...
		var msgId = SSOUtil.xml_getChildNodeValue(docNode, 'MSG_ID');
		if (typeof msgId=='undefined' || msgId===null || msgId.length===0) {
			return null;
		}
		
		var signType = SSOUtil.xml_getChildNodeValue(docNode, 'SIGN_TYPE');
		
		// 2013.6 - 篩選去除102年以前項目!
		var docNo = SSOUtil.xml_getChildNodeValue(docNode, 'DOC_NO');
		
		var isDraft = false;
		var excludeDoc = false;
		
		if (signType=='P' || signType=='E') {
			isDraft = _isDraftMsgId(msgId);
			if (!isDraft) {
				// 2017.8 - Eric Peng, 1060798 - 不排除102年以前項目.
				excludeDoc = false; //_excludeDoc(docNo);
			}
		}
		// 2015.1 - 取應列入的通知訊息
		else if (signType=='W') {
			// 2016.8 - Eric Peng, 顯示所有signType=='W'項目.
			excludeDoc = false; // _excludeDoc_W(docNode);
		}
			
		// 2014.11 - 暫時先去除[會核中-主辦]公文
		var folder = SSOUtil.xml_getChildNodeValue(docNode, 'FOLDER');
		var subfolder = SSOUtil.xml_getChildNodeValue(docNode, 'SUBFOLDER');
		
		/* 2016.8 - 不再篩選顯示公文!
		// 2016.6 - 顯示草稿公文
		// 2015.1 - 去除草稿公文
		//if (folder=='草稿' || (folder==='會核中' && subfolder==='主辦')) {
		if (folder==='會核中' && subfolder==='主辦') {
			excludeDoc = true;
		}*/
			
		if ((signType=='P'||signType=='E') && (!excludeDoc))
		{
			doc = {};
			doc.isDraft = isDraft;
			msgId = SSOUtil.xml_getChildNodeValue(docNode, 'MSG_ID');
			if (msgId.indexOf('_')!==-1) {
				msgId = msgId.substring(0, msgId.indexOf('_'));
			}
			doc.msgId = msgId;
			
			doc.docNo = SSOUtil.xml_getChildNodeValue(docNode, 'DOC_NO');
			doc.signType = signType;
			doc.ICOUName = SSOUtil.xml_getChildNodeValue(docNode, 'IC_OU_NAME');
			doc.ICOUId = SSOUtil.xml_getChildNodeValue(docNode, 'INCHARGE_OU');
			doc.ICUserName = SSOUtil.xml_getChildNodeValue(docNode, 'IC_USER_NAME');
			doc.ICUserId = SSOUtil.xml_getChildNodeValue(docNode, 'IC_USER_ID');
			if (doc.ICUserId.length) {
				doc.ICUserId = doc.ICUserId.toUpperCase();
			}
			doc.sourceOrgNo = SSOUtil.xml_getChildNodeValue(docNode, 'SOURCE_ORGNO');
			doc.subject = SSOUtil.xml_getChildNodeValue(docNode, 'SUBJECT');
			doc.fromSubject = SSOUtil.xml_getChildNodeValue(docNode, 'FROM_SUBJECT');
			
			doc.dueDate = SSOUtil.xml_getChildNodeValue(docNode, 'DUE_DATE');
			doc.outLMT = SSOUtil.xml_getChildNodeValue(docNode, 'MSG_OUT_LMT');
			doc.alarmLMT = SSOUtil.xml_getChildNodeValue(docNode, 'MSG_ALM_LMT');
			doc.alarmTime = SSOUtil.xml_getChildNodeValue(docNode, 'ALARM_TIME');
			doc.docState = SSOUtil.xml_getChildNodeValue(docNode, 'DOC_STATE');
			
			doc.secret = SSOUtil.xml_getChildNodeValue(docNode, 'SECRETE');
			doc.speed = SSOUtil.xml_getChildNodeValue(docNode, 'SPEED');
			doc.folder = SSOUtil.xml_getChildNodeValue(docNode, 'FOLDER');
			doc.subfolder = SSOUtil.xml_getChildNodeValue(docNode, 'SUBFOLDER');
			doc.signTime = SSOUtil.xml_getChildNodeValue(docNode, 'SIGN_TIME'); // 若有表示已閱讀...
			doc.newTime = SSOUtil.xml_getChildNodeValue(docNode, 'NEW_TIME'); // 送方傳送時間
			doc.fromOUName = SSOUtil.xml_getChildNodeValue(docNode, 'FROM_OU'); // 送文單位
			
			// 2013.4
			doc.ownOUId = SSOUtil.xml_getChildNodeValue(docNode, 'OWN_OU_ID');
			doc.ownUserId = SSOUtil.xml_getChildNodeValue(docNode, 'OWN_USER_ID');
			if (doc.ownUserId.length) {
				doc.ownUserId = doc.ownUserId.toUpperCase();
			}
			
			// 2013.9
			doc.ownRoleId = SSOUtil.xml_getChildNodeValue(docNode, 'OWN_ROLE_ID');
				
			// 2013.9 - 傳送
			doc.txName = SSOUtil.xml_getChildNodeValue(docNode, 'TX_NAME');
			doc.toUserName = SSOUtil.xml_getChildNodeValue(docNode, 'TO_USER_NAME'); // 傳送至
			doc.toUserId = SSOUtil.xml_getChildNodeValue(docNode, 'TO_USER_ID');
			if (doc.toUserId.length) {
				doc.toUserId = doc.toUserId.toUpperCase();
			}
			doc.toRoleName = SSOUtil.xml_getChildNodeValue(docNode, 'TO_ROLE_NAME');
			doc.toRoleId = SSOUtil.xml_getChildNodeValue(docNode, 'TO_ROLE_ID');
			doc.toOUName = SSOUtil.xml_getChildNodeValue(docNode, 'TO_OU_NAME');
			doc.toOUId = SSOUtil.xml_getChildNodeValue(docNode, 'TO_OU_ID');
			
			/* 公文電子檔位置(FileIO WS + disk path)
			 *<STORAGE_PATH>D:\FILESRV_DATA\FILE_PATH\upload</STORAGE_PATH>
			 *<SUB_DIR>301060000C\10101\04\1010500001</SUB_DIR>
			 *<WEB_SERVICE>http://deva.nfa.com.tw/WebFileIo/T2100FileIOService.asmx</WEB_SERVICE>
			 */
			doc.fileIOWS = SSOUtil.xml_getChildNodeValue(docNode, 'WEB_SERVICE');
			doc.fileStoragePath = SSOUtil.xml_getChildNodeValue(docNode, 'STORAGE_PATH');
			doc.fileSubDir = SSOUtil.xml_getChildNodeValue(docNode, 'SUB_DIR');
			
			/* 2014.1 - for公文核決. */
			doc.appUserId = SSOUtil.xml_getChildNodeValue(docNode, 'APP_USER_ID');
			doc.appUserName = SSOUtil.xml_getChildNodeValue(docNode, 'APP_USER_NAME');
			doc.appRoleId = SSOUtil.xml_getChildNodeValue(docNode, 'APP_ROLE_ID');
			doc.rejectUserName = SSOUtil.xml_getChildNodeValue(docNode, 'REJECT_USER_NAME');
			
			// RESUPPLY_ALM
			doc.reSupplyALM = SSOUtil.xml_getChildNodeValue(docNode, 'RESUPPLY_ALM');
			
			/* 2014.10 - 伺服器處理中狀態 */
			doc.submitProcessing = false;

			// 2018.10.08 - 1070955
			doc.fromOrg = SSOUtil.xml_getChildNodeValue(docNode, 'FROM_ORG');
			doc.signDueDate = SSOUtil.xml_getChildNodeValue(docNode, 'SIGN_DUEDATE');
			doc.currLocate = SSOUtil.xml_getChildNodeValue(docNode, 'CURR_LOCATION');

			/* 2019.1.31 - Eric 補1071075, 新增[公文性質]欄位 */
			doc.docPtyName = SSOUtil.xml_getChildNodeValue(docNode, 'DOC_PTY_NAME');
			if (typeof doc.docPtyName!='string') {
				doc.docPtyName = '';
			}
			// 2021.7 - 1100854 - fullNewTime
			if (SSO_CONFIG.OrgNickName=="NUK") {
				doc.fullNewTime = SSOUtil.xml_getChildNodeValue(docNode, 'FULL_NEW_TIME');
			}
			// 2022.4.19	Leslie[1110064]	信保新增收創文日期
			doc.rcvDate = SSOUtil.xml_getChildNodeValue(docNode, 'RCV_DATE');
			
			//1110927	Leslie[1110889]	新增欄位
			doc.keyWord = SSOUtil.xml_getChildNodeValue(docNode, 'KEY_WORD');			
			doc.taType = SSOUtil.xml_getChildNodeValue(docNode, 'TA_TYPE');			
			doc.MOCSdocPty = SSOUtil.xml_getChildNodeValue(docNode, 'MOCS_DOCPTY');		
			//1111122 Kevin 1111287 新增流程
			doc.docProc='';	
		}
		else if (signType=='W' && (!excludeDoc)) {
			folder = SSOUtil.xml_getChildNodeValue(docNode, 'FOLDER');
			var fromSubject = SSOUtil.xml_getChildNodeValue(docNode, 'FROM_SUBJECT');
			if (folder.length && fromSubject.length) // 2013.4 - SIGN_TYPE="W"項目, 須有主旨才列入清單顯示!
			{
				doc = {};
				doc.msgId = SSOUtil.xml_getChildNodeValue(docNode, 'MSG_ID');
				doc.signType = signType;
				doc.folder = folder;
				doc.subfolder = SSOUtil.xml_getChildNodeValue(docNode, 'SUBFOLDER');
				doc.ownUserId = SSOUtil.xml_getChildNodeValue(docNode, 'OWN_USER_ID');
				if (doc.ownUserId.length) {
					doc.ownUserId = doc.ownUserId.toUpperCase();
				}
				doc.subject = SSOUtil.xml_getChildNodeValue(docNode, 'SUBJECT');
				doc.fromSubject = fromSubject;
				
				var url_b64 = SSOUtil.xml_getChildNodeValue(docNode, 'URL');
				var url = '';
				if (url_b64.length>0) {
					url = Base64.decode(url_b64);
				}
				doc.url = url; // 2016.8.22 - 二代毋須轉換. _modifyToDoUrl(url);
				//console.log('[W] MsgId=' + doc.msgId + ', url=' + doc.url);
				
				doc.signTime = SSOUtil.xml_getChildNodeValue(docNode, 'SIGN_TIME'); // 若有表示已閱讀...(SIGN_TYPE="W"項目仍有效)
				
				/* 2015.1 - Eric Peng, 新增解析下列欄位 */
				doc.ICOUName = SSOUtil.xml_getChildNodeValue(docNode, 'IC_OU_NAME');
				doc.ICOUId = SSOUtil.xml_getChildNodeValue(docNode, 'INCHARGE_OU');
				doc.ICUserName = SSOUtil.xml_getChildNodeValue(docNode, 'IC_USER_NAME');
				doc.ICUserId = SSOUtil.xml_getChildNodeValue(docNode, 'IC_USER_ID');
				if (doc.ICUserId.length) {
					doc.ICUserId = doc.ICUserId.toUpperCase();
				}
				doc.sourceOrgNo = SSOUtil.xml_getChildNodeValue(docNode, 'SOURCE_ORGNO');
				
				doc.dueDate = SSOUtil.xml_getChildNodeValue(docNode, 'DUE_DATE');
				doc.outLMT = SSOUtil.xml_getChildNodeValue(docNode, 'MSG_OUT_LMT');
				doc.alarmLMT = SSOUtil.xml_getChildNodeValue(docNode, 'MSG_ALM_LMT');
				doc.alarmTime = SSOUtil.xml_getChildNodeValue(docNode, 'ALARM_TIME');
			
				doc.subject = SSOUtil.xml_getChildNodeValue(docNode, 'SUBJECT');
				doc.fromSubject = SSOUtil.xml_getChildNodeValue(docNode, 'FROM_SUBJECT');
				
				doc.secret = SSOUtil.xml_getChildNodeValue(docNode, 'SECRETE');
				doc.speed = SSOUtil.xml_getChildNodeValue(docNode, 'SPEED');
				
				// RESUPPLY_ALM
				doc.reSupplyALM = SSOUtil.xml_getChildNodeValue(docNode, 'RESUPPLY_ALM');
				
				doc.newTime = SSOUtil.xml_getChildNodeValue(docNode, 'NEW_TIME'); // 送方傳送時間

				// 2018.9.28 - 1070955
				doc.fromOrg = SSOUtil.xml_getChildNodeValue(docNode, 'FROM_ORG');
				doc.signDueDate = SSOUtil.xml_getChildNodeValue(docNode, 'SIGN_DUEDATE');
				doc.currLocate = SSOUtil.xml_getChildNodeValue(docNode, 'CURR_LOCATION');

				/* 2019.1.31 - Eric 補1071075, 新增[公文性質]欄位 */
				doc.docPtyName = SSOUtil.xml_getChildNodeValue(docNode, 'DOC_PTY_NAME');
				if (typeof doc.docPtyName!='string') {
					doc.docPtyName = '';
				}

				// 2021.7 - 1100854 - fullNewTime
				if (SSO_CONFIG.OrgNickName=="NUK") {
					doc.fullNewTime = SSOUtil.xml_getChildNodeValue(docNode, 'FULL_NEW_TIME');
				}
				// 2022.4.19	Leslie[1110064]	信保新增收創文日期
				doc.rcvDate = SSOUtil.xml_getChildNodeValue(docNode, 'RCV_DATE');
				
				//1110927	Leslie[1110889]	新增欄位
				doc.keyWord = SSOUtil.xml_getChildNodeValue(docNode, 'KEY_WORD');			
				doc.taType = SSOUtil.xml_getChildNodeValue(docNode, 'TA_TYPE');			
				doc.MOCSdocPty = SSOUtil.xml_getChildNodeValue(docNode, 'MOCS_DOCPTY');		
				//1111122 Kevin 1111287 新增流程
				doc.docProc='';					
			}
		}
		
		// read all field from ODWMSG
		if (!!doc) {
			if (doc.msgId=='0') {
				theLogger.debug('found target example doc...');
			}
			var odwmsg = _makeODWMSG(docNode);
			if (typeof odwmsg == 'object') {
				doc.ODWMSG = odwmsg;
				/* 2016.8 - 草稿的ODWMSG.MSG_ID記錄為不含帳號項目 */
				if (doc.isDraft) {
					doc.ODWMSG.MSG_ID = doc.msgId;
				}
			}
		}
		
		return doc;
	};
	
	/* 取得Folder/Subfolder清單
     * 2023.4.14 - 1120067 Eric, ToDo: 指定篩選後的待辦項目清單, 再依其內容取得公文夾清單
	 */
	var _getFolderInfoList = function(addAll, _filterd_doc_list, listDocFolder, listNotifyFolder) {
		var folderInfoList = [];

        // 2023.4.14 - 1120067 Eric
        let _the_doc_list = ((typeof _filterd_doc_list == 'undefined') || _filterd_doc_list==null)?_doclist:_filterd_doc_list;

		var docCnt = _the_doc_list.length;

		var tmpList = {};
		var foldernameList = [];
		
		var i=0, j=0, _cnt=0;
		var displayFolder='', folderStr='', obj=null, isProxy=false;
		if (typeof listDocFolder=='undefined' || listDocFolder===null) {
			listDocFolder = {};
		}
		
		if (typeof listNotifyFolder=='undefined' || listNotifyFolder===null) {
			listNotifyFolder={};
		}
			
		// 2019.12.5 - Eric, 修改版更公文夾排序及代理公文夾未列出問題. rsltFldrStr => rsltFldrInfo
		var rsltFldrInfo=null;
		let cntRaw = _the_doc_list.length; // 2020.11.9 - merge 2020.8.11 - Eric, bug-fix
		for(i=0; i<cntRaw; i++) {
			doc = _the_doc_list[i];
				
			// 2016.11.22 - 傳送作業處理中公文不計...
			if (typeof doc.submitProcessing=='boolean' && doc.submitProcessing===true) {
				docCnt-=1; // 總數同步減1
				continue;
			}
			
			obj = null;
			
			isProxy = (doc.ODWMSG.IS_PROXY_DOC === '1') ? true : false; // 2014.1- 處理代理公文
			signType = doc.signType; // 2016.9.30 - 通知/公文分開
			
			rsltFldrInfo = _getFolderString(doc, true); 
			if (!!rsltFldrInfo && rsltFldrInfo.folderStr.length) {
				try {
					obj = tmpList[rsltFldrInfo.folderStr];
					if (typeof obj!=='undefined' && obj!==null && obj.cnt>=1) {
						obj.cnt += 1;
					}
					else {
						tmpList[rsltFldrInfo.folderStr] = { name:rsltFldrInfo.folderStr, cnt:1, proxyFolder:isProxy, folder: rsltFldrInfo.displayFolder, signType: doc.signType};
						if (signType=='E' || signType=='P') {
							if (typeof listDocFolder[rsltFldrInfo.displayFolder]=='undefined' || listDocFolder[rsltFldrInfo.displayFolder]===null) {
								listDocFolder[rsltFldrInfo.displayFolder]=rsltFldrInfo.displayFolder;
							}
						}
						else {
							if (typeof listNotifyFolder[rsltFldrInfo.displayFolder]=='undefined' || listNotifyFolder[rsltFldrInfo.displayFolder]===null) {
								listNotifyFolder[rsltFldrInfo.displayFolder]=rsltFldrInfo.displayFolder;
							}
						}
					}
				}
				catch(err) {
					theLogger.error('Error:' + err.description + '\n');
				}
			}
		}
	
		if (addAll===true) {
			folderInfoList.push({name:that._nofilterfoldername, cnt:docCnt });
		}
		
		// 2016.8 - sort folder-subfolder, 相同folder項目會靠在一起
		var targetFolder='', folder='', listFolderIndex=[], signType='';
		var listSubFolder = [];
		var rsltFolder = [], folderObj=null;
		
		// 先處理公文項目
		var _tmpMainFolderList=[], _tmpMinorFolderList=[], _sortedFolderList;
		for(folderObj in listDocFolder) {
			if(listDocFolder.hasOwnProperty(folderObj)) {
				targetFolder = listDocFolder[folderObj];
				for(obj in tmpList) {
					if (tmpList.hasOwnProperty(obj)) {
						folder = tmpList[obj].folder;
						signType = tmpList[obj].signType;
						if (folder==targetFolder && (signType=='E' || signType=='P')) {
							if (folder=='待處理' || folder=='草稿' ) {
								_tmpMainFolderList.push(tmpList[obj]);
							}
							else {
								_tmpMinorFolderList.push(tmpList[obj]);
							}
						}
					}
				}
			}
		}

		// 2018.11 - Eric Peng, 不同瀏覽器sort結果不同修正. (中文常用字依筆畫由小至大!)
		let strLocale='zh-TW', strA='王', strB='陳';
		if (strA.localeCompare(strB, strLocale)>0) {
			strLocale = 'zh-Hant-TW';
		}
		theLogger.log('-I- strLocale="' + strLocale + '"');

		// 加入[待處理/草稿]folder公文
		_sortedFolderList = _tmpMainFolderList.sort(function(a, b){
			return a.name.localeCompare(b.name, strLocale);
		});
		folderInfoList = folderInfoList.concat(_sortedFolderList);
		// 加入其它folder公文
		_sortedFolderList = _tmpMinorFolderList.sort(function(a, b){
			return a.name.localeCompare(b.name, strLocale);
		});
		folderInfoList = folderInfoList.concat(_sortedFolderList);
		
		// 處理通知項目
		var _tmpFolderList = [];
		for(folderObj in listNotifyFolder) {
			if(listNotifyFolder.hasOwnProperty(folderObj)) {
				targetFolder = listNotifyFolder[folderObj];
				for(obj in tmpList) {
					if (tmpList.hasOwnProperty(obj)) {
						folder = tmpList[obj].folder;
						signType = tmpList[obj].signType;
						if (folder==targetFolder && signType=='W') {
							_tmpFolderList.push(tmpList[obj]);
						}
					}
				}
			}
		}
		_sortedFolderList = _tmpFolderList.sort(function(a, b){
			return a.name.localeCompare(b.name, strLocale);
		});
		folderInfoList = folderInfoList.concat(_sortedFolderList);

		//1120502	Leslie[1120007]	[屏東]調整公文夾顯示方式為二階層顯示
		if (!addAll) {
			return folderInfoList;
		}
		else if(theCustom.getCustomSet('Enable2LayerFolder') != 'Y')
			return folderInfoList;
		
		let _sortFolder = [], folderInfoListGrouped = [];
		folderInfoList.forEach(function(o){
			if(_sortFolder.indexOf(o.folder) == -1 && o.folder != undefined)
				_sortFolder.push(o.folder)
		})
		folderInfoListGrouped.push(folderInfoList[0]);	//全部
		_sortFolder.forEach(function(f){
			let _currFolder = folderInfoList.filter(function(o){return o.folder == f});
			let _groupTotalCnt = _currFolder.reduce(function(s,o){return s+o.cnt},0);
			folderInfoListGrouped.push({name:f, cnt:_groupTotalCnt })	//每一組的上層，例：待處理、草稿、己送出...
			folderInfoListGrouped = folderInfoListGrouped.concat(_currFolder);
		})

		/*groupCnt = foldernameList.length;
		for(i=0; i<groupCnt; i++) {
			x = foldernameList[i];
			folderInfoList.push(tmpList[x]);
		}*/
		//return folderInfoList;
		return folderInfoListGrouped;	//1120502	Leslie[1120007]	[屏東]調整公文夾顯示方式為二階層顯示 ==END==
	};
	
	// 2011.11.14 - light counts
	var _count_lights = function(newItem) {
		if (newItem===undefined) return;
		
		var light = '';
		if (typeof newItem=='string') {
			light = newItem;
		}
		else if (typeof newItem=='object') {
			light = newItem.data('light');
		}
		
		that.lights.total += 1; // 2012.1.30 - total count
		if (typeof light=='string' && light.length>0) {
			switch(light) {
			case 'red': that.lights.red += 1; break;
			case 'yellow': that.lights.yellow += 1; break;
			case 'white': that.lights.white += 1; break;
			case 'green': that.lights.green += 1; break;
			case 'purple': that.lights.purple += 1; break;
			}
		}
	};
	
	function _setupContextMenu(selectorClass) {
		//return; /* 2016.8 - 尚未實作, 先取消 */
	
		function _getCurrentFlow_PDoc(_docObj) {
			var currentFlow = null;
			var rslt = _docObj.get('ODWMSG', ['FOLDER', 'SUBFOLDER', 'OWN_OU_ID', 'OWN_ROLE_ID', 'OWN_USER_ID']);
			if (!!rslt) {
				currentFlow = {};
				currentFlow.Folder = (!!rslt.FOLDER) ? rslt.FOLDER : '';
				currentFlow.SubFolder = (!!rslt.SUBFOLDER) ? rslt.SUBFOLDER : '';
				currentFlow.OUId = (!!rslt.OWN_OU_ID) ? rslt.OWN_OU_ID : '';
				currentFlow.RoleId = (!!rslt.OWN_ROLE_ID) ? rslt.OWN_ROLE_ID : '';
				currentFlow.UserId = (!!rslt.OWN_USER_ID) ? rslt.OWN_USER_ID : '';
				if (currentFlow.UserId.length===0) {
					currentFlow.UserId = theSSO.User.account;
				}
			}
            return currentFlow;
		}
		
		function _makeSSOMenuHeader(_docObj) {
			var menuItems = {
				docNoInfo: { // 文號提示
					name: _docObj.docNo,
					nextOption: null,
					disabled: function() { return true; },
					docObj: _docObj,
				},
				"sep1": "---------", // 分隔線
			};
			return menuItems;
		}
		
		function _buildSubmitMenuItem(_docObj, nextOptions) {
			function _txDDL_GetRoleTitle_EDoc(option) {
				var display = '';
				if (typeof option.present == 'string' && option.present.length) {
					if (option.present=='role') {
						return '[不指定人員]';
					}
					else if (option.present=='unit') {
						return '[不指定單位]';
					}
				}
				if (option.toOUId.length > sso_const.FIRSTCLASS_UNITNO_LEN) {
					display = option.toOUName + ' - ';
				}
				display += option.toRoleName;
				return display;
			}
			
			function _getOptionTitle(option, signType, chooseLv) {
				if ((typeof (option.title) != 'undefined') && option.title.length) {
					return option.title;
				}
				
				if (signType=='P' && chooseLv>=1 && chooseLv<=3) {
					// 2016.8 - 紙本調整顯示title
					if (option.finalTarget && option.toUserName.length) {
						return option.toUserName;
					}
					
					/*switch(chooseLv) {
					case 1: return option.toOUName;
					case 2: return option.toRoleName;
					case 3: return option.toUserName;
					}*/

					// 2021.6.11 - 1100747 Eric, bug-fix [醫策會TO_OU='U']
					let _title = '';
					switch(chooseLv) {
					case 1: _title = option.toOUName; break;
					case 2: _title = option.toRoleName; break;
					case 3: _title = option.toUserName; break;
					}
		
					if (_title.length==0 && option.toOU=='U') {
						_title = option.toOUName;
					}
					return _title;
				}
				
				if ((typeof (option.toUserId) != 'undefined') && option.toUserId.length) {
					return option.toUserName;
				}
				else if ((typeof (option.toRoleId) != 'undefined') && option.toRoleId.length) {
					if (signType=='P') {
						return option.toRoleName;
					}
					else if (signType=='E') {
						return _txDDL_GetRoleTitle_EDoc(option);
					}
					else {
						return '--OOOOPS--';
					}
				}
				else if ((typeof (option.toOUId) != 'undefined') && option.toOUId.length) {
					if (typeof option.present=='string' && option.present.length) {
						if (option.present=='unit')
							return '[不指定單位]';
					}
					return option.toOUName;
				}
			}
			
			function _getMenuId(txName, option, isNoChildRoot) { // 2016.11.18 - 沒有傳送對象的異動別, id為[txName]
				var id = '';
				if (typeof isRoot=='undefined') {
					isRoot = false;
				}
				
				if (typeof option.toOUId =='string' && option.toOUId.length) {
					id = txName + '@' + option.toOUId + '@' + option.toOUName;
					if (typeof option.toRoleId=='string' && option.toRoleId.length) {
						id += ('@' + option.toRoleId + '@' + option.toRoleName);
					}
					else {
						id += '@@';
					}
					if (typeof option.toUserId=='string' && option.toUserId.length) {
						id += ('@' + option.toUserId + '@' + option.toUserName);
					}
					else {
						id += '@@';
					}
				}
				else {
					if (isNoChildRoot) {
						id = txName;
					}
					else {
					// 無傳送對象異動別傳送, 暫給固定字串
					id = txName + '@@@@@@';
				}
				}
				return id;
			}
			
			function _buildSubItem(tMenuItem, txName, option, _docObj, lv) {
				var i=0, subOption=null, item=null;
				
				if (typeof tMenuItem.items !=='object') {
					tMenuItem.items = {};
				}
				
				for(i=0; i<option.options.length; i++) {
					subOption = option.options[i];
					if (typeof subOption.options=='object' && subOption.options!==null && subOption.options.length) {
						item = {
							name: _getOptionTitle(subOption, _docObj.signType, lv),
							nextOption: subOption,
							docObj: _docObj,
						};
						_buildSubItem(item, txName, subOption, _docObj, lv+1);
					}
					else {
						item = {
							name: _getOptionTitle(subOption, _docObj.signType, lv),
							nextOption: subOption,
							docObj: _docObj,
						};
					}
					tMenuItem.items[_getMenuId(txName, subOption)] = item;
				}
				return true;
			}
			
			// 2021.6 - 1100748 Eric, TO_OU="V" 實作.
			function _buildApproveOfficerSubItem(tMenuItem, txName, option, _docObj, lv) {
				function _getAppOfficerId(_option) {
					let _user_id='',_user_name='',_role_id='',_role_name='';
					if (typeof _option.user_name=='string'&&_option.user_name.length) {
						_user_name = _option.user_name;
					}
					if (typeof _option.user_id=='string'&&_option.user_id.length) {
						_user_id = _option.user_id;
					}
					if (typeof _option.role_name=='string'&&_option.role_name.length) {
						_role_name = _option.role_name;
					}
					if (typeof _option.role_id=='string'&&_option.role_id.length) {
						_role_id = _option.role_id;
					}
					return _user_name+'@'+_user_id+'@'+_role_name+'@'+_role_id;
				}
				var i=0, subOption=null, item=null;
				if (typeof tMenuItem.items !=='object') {
					tMenuItem.items = {};
				}
				
				for(i=0; i<option.extra.options.length; i++) {
					subOption = option.extra.options[i];
					item = {
						name: (typeof subOption.user_name=='string'&&subOption.user_name.length)?subOption.user_name:subOptoin.role_name,
						nextOption: option.options[0],
						docObj: _docObj,
					};
					item.options = option.options;

					tMenuItem.items[_getMenuId(txName, option.options[0])+'$'+_getAppOfficerId(subOption)] = item;
				}
				return true;
			}

			var menuItem = _makeSSOMenuHeader(_docObj);
			var item=null;
			var i=0, option=null, display='';
			//1110624 David 1110268 取得傳送時需檢核可發文稿件的附件格式的資料夾異動別
			var checkIssueAttachFolderSet = theSSO.User.SystemSets.get("CHECK_ISSUE_ATTACH_FOLDER_SET");
			var checkIssueAttachFolder = [];
			if(checkIssueAttachFolderSet != ""){
				let ArrIssueAttachFolderSet = checkIssueAttachFolderSet.split('|');
				if(typeof ArrIssueAttachFolderSet[0] != undefined)
					checkIssueAttachFolder = ArrIssueAttachFolderSet[0].split(';');
			}

			for(i=0; i<nextOptions.length; i++) {
				option = nextOptions[i];
				/*if (option.txName=='分會' || option.webPage.url.length) {
				 *  // 分會暫不列出!
					continue;
				}*/
				
				//1110624 David 1110268 符合傳送時需檢核可發文稿件的附件格式的資料夾右鍵選單排除對應的異動別
				if(checkIssueAttachFolder.length > 0 && checkIssueAttachFolder.includes(_docObj.folder + "-" + _docObj.subfolder + "-" + option.txName))
					continue;
				
				display = '';
				if (typeof option.display=='string') {
					display = option.display;
				}
				else if (typeof option.ruleOption=='object' && typeof option.ruleOption.display=='string') {
					display = option.ruleOption.display;
				}
				
				var disabled = false;
				var _ruleErrItem = [];

				// 2021.6.17 - 1100748 Eric, TO_OU='V' implement
				SSOUtil.checkSuitable_PreSubmit(_docObj, option.ruleOption, _ruleErrItem);
				if (SSOUtil.typeOf(_ruleErrItem)=='array' && _ruleErrItem.length) {
					disabled = true;
				}
				
				if (typeof option.options=='object' && option.options.length==1 &&
					(typeof (option.options[0].options)=='undefined' || (typeof (option.options[0].options)=='object' && option.options[0].options.length===0))) { // 2016.11.9 - bug-fix
					//((_docObj.signType=='P') || (_docObj.signType=='E' && typeof (option.options[0].options)=='object' && option.options[0].options.length===0))) {
					// 只有一個子項目時, 以該子項目為menuId
					item = {
						name: display,
						nextOption: option,
						docObj: _docObj,
					};
					
					var subOption = option.options[0];
					if (disabled) {
						item.disabled = function() { return true; };
					}

					// 2021.6 - 1100748 Eric, TO_OU='V' 實作
					if (typeof option.extra=='object' && option.extra.options) {
						_buildApproveOfficerSubItem(item, option.extra.txName, option, _docObj, 1);
						menuItem[option.txName] = item;
					}
					else {
						menuItem[_getMenuId(option.txName, subOption)] = item;
					}
				}
				else if (typeof option.options=='object' && option.options.length) {
					item = {
						name: display,
						nextOption: option,
						docObj: _docObj,
					};
					
					if (disabled) {
						item.disabled = function() { return true; };
					}
					else {
						_buildSubItem(item, option.txName, option, _docObj, 1);
					}
					menuItem[option.txName] = item;
				}
				else {
					item = {
						name: display,
						nextOption: option,
						docObj: _docObj,
					};
					
					if (disabled) {
						item.disabled = function() { return true; };
					}
					menuItem[_getMenuId(option.txName, option, true)] = item;
				}
			}
			return menuItem;
		}
		
		// 由menu_id取得ruleOption
		function _getRuleOption(menuId, _menuItems) {
			function _getSubItemRuleOption(menuId, subItems) {
				var item = null;
				for(var itemId in subItems) {
					if (subItems.hasOwnProperty(itemId)) {
						item = subItems[itemId];
						if (itemId==menuId) {
							return item.nextOption;
						}
						
						if (typeof(item.items)!=='undefined') {
							nextOption = _getSubItemRuleOption(menuId, item.items);
							if (nextOption!==null) {
								return nextOption;
							}
						}
					}
				}
				return null;
			}
			
			var nextOption=null, item=null;
			for (var itemId in _menuItems) {
				if (_menuItems.hasOwnProperty(itemId)) {
					item = _menuItems[itemId];
					if (itemId==menuId) {
						return item.nextOption;
					}
					
					if (typeof(item.items)!=='undefined') {
						nextOption = _getSubItemRuleOption(menuId, item.items);
						if (nextOption!==null) {
							return item.nextOption; // 回傳txName對應的ruleOption
						}
					}
				}
			}
			return null;
		}
		
		/* 右鍵選項-紙本專用項目: 流程資訊(ODI260), 開啟公文基資/稿件=>開啟公文?, 分會進度查詢 */
		function _buildPDocMenuItem(SAMLart, _docObj, _menuItems, webAppList, emptyMenu) {
			var addFlowInfo=false, addCoworkPage=false, addItem=false;
			if (!_docObj.isDraft) {
				addFlowInfo = true;
			}
			
			// ToDo: 實作開啟公文基資,公文稿件對應功能
			
			// [紙本]判定是否應顯示<分會進度查詢>選項
			var folder = _docObj.folder + '-' + _docObj.subfolder;
			var sValue = theSSO.User.EnvSettings.get('MP_SHOW_COWORK_LIST');
			if (typeof sValue=='string' && sValue.length) {
				var listFolder = sValue.split(';');
				if (listFolder.indexOf(folder)!==-1) {
					addCoworkPage = true;
				}
			}
			
			orgCnt = webAppList.length;
			if (addFlowInfo || addCoworkPage) {
				if (typeof emptyMenu=='boolean' && emptyMenu) {
					_menuItems = _makeSSOMenuHeader(_docObj);
				}
				else { // 已有項目, 加分隔線
					_menuItems.sep2 = "---------";
				}
				
				var pageUrl='', urlWithParam='';
				if (addFlowInfo) {
					pageUrl = theSSO.User.EnvSettings.get('OD_FLOW_PAGE'); //'ODDEP\ODI260.aspx';
					if (pageUrl!=='') {
						urlWithParam = pageUrl + '?SAMLart=' + SAMLart + '&pDocNo=' + _docObj.docNo + '&SOURCE_ORGNO=' + _docObj.sourceOrgNo;
						_menuItems['WebApp:' + pageUrl] =  {
							name: '流程資訊',
							'urlWithParam': urlWithParam,
						};
						webAppList.push({Id:pageUrl, progId:'', url:urlWithParam});
					}
				}
				
				// 分會進度查詢網址?
				if (addCoworkPage) {
					pageUrl = theSSO.User.EnvSettings.get('OD_COWORK_PAGE'); //'MS-Cowork_' + _docObj.sourceOrgNo + '.htm';
					
					if (pageUrl==='') {
						var sUrl = 'HTTP://DOCLB.FDAT.COM.TW/ED/ED2/EDR240.aspx';
						alert('EnvSet[OD_COWORK_PAGE]未設定, 給固定值:' + sUrl);
						pageUrl = sUrl;
					}
					
					if (pageUrl!=='') {
						var sDeptShowMode = '2';
						urlWithParam = pageUrl + '?SAMLart=' + SAMLart + '&SOURCEORGNO=' + _docObj.sourceOrgNo + '&DOC_NO=' + _docObj.docNo;
						_menuItems['WebApp:' + pageUrl] =  {
							name: '分會進度查詢',
							'urlWithParam': urlWithParam,
						};
						webAppList.push({Id:pageUrl, progId:'', url:urlWithParam});
					}
				}
			}
			
			if (typeof emptyMenu=='boolean' && emptyMenu && webAppList.length>orgCnt) {
				return _menuItems;	
			}
			return null;
		}
		
		/* 右鍵選項-開啟應用程式項目 */
		function _buildWebAppMenuItem(SAMLart, _docObj, _menuItems, webAppList, emptyMenu) {
			function _matchStatus(docFolder, signType, item) {
				if (item.signType.indexOf(signType+';')!==-1) {
					var enableFolders = item.folder + ';';
					if (enableFolders.indexOf(docFolder+';')!=-1) {
						return true;
					}
				}
				return false;
			}
			
			var orgCnt = webAppList.length;
			var ssoMenuItems = SSOUtil.getSSOContextMenuItems(SAMLart, _docObj.sourceOrgNo);
			var validMenuItems = [];
			if (!!ssoMenuItems && ssoMenuItems.length) { //progId, title, signType, folder
				var i=0, item=null;
				var docFolder = _docObj.folder + '-' + _docObj.subfolder;
				var signType = _docObj.signType;
				for(i=0; i<ssoMenuItems.length; i++) {
					item = ssoMenuItems[i];
					if (_matchStatus(docFolder, signType, item)) {
						validMenuItems.push(item);
					}
				}
				
				if (validMenuItems.length) {
					if (typeof emptyMenu=='boolean' && emptyMenu) {
						_menuItems = _makeSSOMenuHeader(_docObj);
					}
					else { // 已有項目, 加分隔線
						_menuItems.sep3 = "---------";
					}
					
					for(i=0; i<validMenuItems.length; i++) {
						item = validMenuItems[i];
						_menuItems['WebAppId:' + item.progId] = {
							name: item.title,
						};
						webAppList.push({Id:item.progId, progId:item.progId, url:''});
					}
				}
			}
			
			if (typeof emptyMenu=='boolean' && emptyMenu && webAppList.length>orgCnt) {
				return _menuItems;
			}
			return null;
		}
		
		function _checkAuditDoc(_docObj, txName) {
			function _shouldCheckAuditDoc(closeType, txName) {
				if (typeof closeType!=='string' || closeType==='' ||
					typeof txName!=='string' || txName==='') {
					theLogger.error('ERROR! _shouldCheckAuditDoc() closeType/txName不可為空字串.');
					return false;
				}
				var sUseAuditDoc = theSSO.User.EnvSettings.get('USE_AUDIT_DOC');
				var setting = [];
				var sDoCheck='', checkCloseType='', sTxNames='', checkTxNames='';
				if (sUseAuditDoc.length) { //format => L"Y|3|送請簽核";
					setting = sUseAuditDoc.split('|');
					sDoCheck = setting[0];
					if (!SSOUtil.isValueTrue(sDoCheck))
						return false;
					
					if (setting.length>1) {
						checkCloseType = setting[1];
					}
					if (checkCloseType.find(closeType)==-1) return false;
					
					if (setting.length>2) {
						sTxNames = setting[2];
						sTxNames += ';';
						if (sTxNames.find(txName)!==-1) {
							return true;
						}
					}
				}
				return false;
			}
			
			var closeType = _docObj.get('ODWMSG', 'CLOSE_TYPE');
			var checkAuditDoc = false;
			if (closeType.length && typeof txName=='string' && txName.length) {
				checkAuditDoc = _shouldCheckAuditDoc(closeType, txName);
			}
			
			var nAudit = '2';
			if (checkAuditDoc) {
				theWebServices.odmssp.isAuditDoc(SAMLart, _docObj.sourceOrgNo, _docObj.docNo)
				.done(function(rslt){
					// res.success = true; res.errMsg = ''; res.nAuditDoc = 2;
					if (res.success) {
						return {success:true, checkAuditDoc:true, 'nAuditDoc':res.nAuditDoc};
					}
					else {
						return {success:false, checkAuditDoc:true, errMsg:res.errMsg};
					}
				})
				.fail(function(rslt){
					return {success:false, checkAuditDoc:true, errMsg:'叫用ODMSSP.IsAuditDoc()時發生錯誤'};
				});
			}
			else {
				return {success:true, checkAuditDoc:false};
			}
		}
		
		var menuItems = null;
		var _webAppList = [];
		$.contextMenu({
            selector: '.' + selectorClass, 
            /*callback: function(key, options) {
                var m = "clicked: " + key;
                window.console && console.log(m) || alert(m); 
            },*/
            build: function($trigger, e) {
				/* this callback is executed every time the menu is to be shown
				 * its results are destroyed every time the menu is hidden
				 * e is the original contextmenu event, containing e.pageX and e.pageY (amongst other data)
				 */
				var msgId = $(e.currentTarget).attr('data-msgid');
				var isDraft = false, ICUserId='';
				if (typeof msgId == 'undefined' || (msgId.length<=0))  {
                    var $targetTR = $(e.currentTarget).closest('tr');
					msgId = $targetTR.attr('data-msgid');
					var sDraft = $targetTR.attr('data-draft');
					if (typeof sDraft=='string' && sDraft=='true') {
						isDraft = true;
						ICUserId = $targetTR.attr('data-ICUser');
					}
                }
				
				var rawDocObj = that.getDocByMsgId(msgId, isDraft ? ICUserId : '');
				if (rawDocObj===null) {
					theLogger.warn('-W- build_PopupMenu 無法取得docObj, MsgId=' + msgId + isDraft ? (', ICUserId=' + ICUserId) : '');
                    return false;
                }
				
				var sDocObj = JSON.stringify(rawDocObj);
				var docObj = new MPDocObj(sDocObj);
				
				if (typeof theAOL=='object' && theAOL.getCurrFolio()) {
					if (docObj.msgId==theAOL.docObj.msgId) {
						if (isDraft) {
							if (docObj.ICUserId==theAOL.docObj.ICUserId) {
								alert('指定的公文文稿已開啟，請關閉後重試!');
								theLogger.log('-W- 右鍵作業, 指定的公文文稿已開啟，請關閉後重試! [MsgId="' + docObj.msgId + '", ICUserId="' +  docObj.ICUserId + '"]');
								return false;
							}
						}
						else {
							alert('指定的公文文稿已開啟，請關閉後重試! [MsgId="' + docObj.msgId + '"]');
							return false;
						}
					}
				}
				
				var SAMLart = localStorage.Artifact;

				/* 2017.10.12 - 1060894, 產生右鍵選單作業修改:
					(1)不叫用ODMSSP.SetMsgStatus, 
					(2)非草稿不下載ODWDCM.XML檔, 改用ODMSSP.GetODWDCMStr函式取得ODWDCM內容!
				 */
				/*if (!docObj.isDraft) {
					theWebServices.odmssp.setMsgStatus(SAMLart, docObj.msgId);
				}*/
				theSSO.MP.todolist.builder.initODWDCM(docObj, {async:false, openDoc:false});
				
				menuItems = null;
				_webAppList = [];
				var menuRuleItem = false;
				
				var currentFlow=null, menuRule=null, orgNo=null, nextOptions=null, menu=null;
				if (docObj.signType=='P') {
					currentFlow = _getCurrentFlow_PDoc(docObj, SAMLart);
					menuRule = SSOUtil.getMenuRule_Obj(SAMLart, docObj.sourceOrgNo, docObj.signType);
					orgNode = SSOUtil.getOrgNode(docObj.sourceOrgNo);
					
					if (typeof currentFlow=='object' && typeof menuRule=='object' && typeof orgNode=='object') {
						nextOptions = _buildPDocNextOptions(currentFlow, menuRule, orgNode, docObj, {forPopupMenu: true});
						
						menu = menuRule.getRule(docObj.folder, docObj.subfolder);
						if ((typeof menu == 'object') && (menu!==null)) {
							if (typeof menu.menuRuleItem=='boolean' && menu.menuRuleItem===true) {
								menuRuleItem = true;
							}
						}
					}
					
					if (typeof nextOptions=='object' && nextOptions!==null && nextOptions.length!==0) {
						docObj.nextOptions = nextOptions;
						menuItems = _buildSubmitMenuItem(docObj, nextOptions);				
					}
				}
				else if (docObj.signType=='E' && !isDraft) {
					// 線上簽核只有部份文件夾可顯示右鍵選單...
					var showMenuFolders = theSSO.User.EnvSettings.get('AOL_SHOW_CONTEXTMENU_FOLDER');
					var showMenu = false;
					var folderStr='';
					if (showMenuFolders.length) {
						if (showMenuFolders.substring(showMenuFolders.length-1)!=='|') {
							showMenuFolders += '|';
						}
						
						folderStr = docObj.folder + ';' + docObj.subfolder + '|'; // 以'|'分隔設定選項
						if (showMenuFolders.indexOf(folderStr)!==-1) {
							showMenu = true;
						}
					}
					
					if (showMenu) {
						currentFlow = _getCurrentFlow_PDoc(docObj, SAMLart);
						menuRule = SSOUtil.getMenuRule_Obj(SAMLart, docObj.sourceOrgNo, docObj.signType);
						orgNode = SSOUtil.getOrgNode(docObj.sourceOrgNo);
						if (typeof currentFlow=='object' && typeof menuRule=='object' && typeof orgNode=='object') {
							// 2016.10.5 - 線上簽核只有部份文件夾顯示右鍵傳送選項...[右鍵傳送時不會異動封裝檔]
							var showSendMenuFolders = theSSO.User.EnvSettings.get('AOL_CONTEXTMENU_SHOW_SEND');
							var showSendMenu = false;
							if (showSendMenuFolders.length) {
								if (showSendMenuFolders.substring(showSendMenuFolders.length-1)!=='|') {
									showSendMenuFolders += '|';
								}
								if (showSendMenuFolders.indexOf(folderStr)!==-1) {
									showSendMenu = true;
								}
							}
							if (showSendMenu) {
								nextOptions = _buildEDocNextOptions(currentFlow, menuRule, orgNode, docObj, {mode:'submitTargets'});
							}
							
							menu = menuRule.getRule(docObj.folder, docObj.subfolder);
							if ((typeof menu == 'object') && (menu!==null)) {
								if (typeof menu.menuRuleItem=='boolean' && menu.menuRuleItem===true) {
									menuRuleItem = true;
								}
							}
						}
						
						if (typeof nextOptions=='object' && nextOptions!==null && nextOptions.length!==0) {
							docObj.nextOptions = nextOptions;
							menuItems = _buildSubmitMenuItem(docObj, nextOptions);
						}
					}
				}
				
				/* ToDo: (?)加入下列選單項目: 開啟公文(取代開啟公文基資及開啟公文稿件功能)
				*/
				if (menuRuleItem) { // 依一代實作, MenuRule(E)_$OrgNo$.xml若沒有對應的FOLDER/SUBFOLDER, 就不會有應用程式選單
					var emptyMenu = (menuItems===null) ? true : false;
					var newMenuItems = null;
					if (docObj.signType==='P') {
						newMenuItems = _buildPDocMenuItem(SAMLart, docObj, menuItems, _webAppList, emptyMenu);
						if (emptyMenu && newMenuItems!==null) {
							menuItems = newMenuItems;
							emptyMenu = false;
						}
					}
					
					var newMenuItems2 = _buildWebAppMenuItem(SAMLart, docObj, menuItems, _webAppList, emptyMenu);
					if (emptyMenu && newMenuItems2!==null) {
						menuItems = newMenuItems2;
						emptyMenu = false;
					}
					
					if (typeof menuItems=='object' && menuItems!==null && !emptyMenu) {
						if (menuItems.empty===true) {
							menuItems = null;
						}
						else {
							delete menuItems.empty;
						}
					}
				}
				
				if (typeof menuItems=='object' && menuItems!==null) {
                    return {
						/* 點選單項目後, 叫用此函式 */
						callback: function(key, options) {
							// 目前key即為MenuSetting
							var sErrMsg='';
							if (typeof key=='string' && key.length) {
								if(key.indexOf('WebApp:')===0 || key.indexOf('WebAppId:')===0) {
									// 右鍵選單為開啟ASPX程式項目
									//alert('右鍵選項開啟應用程式項目, Key=' + key);
									SSOUtil.openContextMenuProgram(SAMLart, docObj, key, _webAppList);
									return;
								}

								// docObj
								var txData = null;
								if (key.indexOf('@')==-1) {
									txData = [key]; // key即為txName
								}
								else {
									txData = key.split('@');
								}
								
								var txName=txData[0];
								var toOUId='', toOUName='', toRoleId='', toRoleName='', toUserId='', toUserName='';
								var sSetting='', setting=null;
								if (txData.length>2) {
									toOUId=txData[1]; toOUName=txData[2];
								}
								if (txData.length>4) {
									toRoleId=txData[3]; toRoleName=txData[4];
								}
								if (txData.length>6) {
									toUserId=txData[5]; toUserName=txData[6];
								}
								docObj.set2('sso', 'ODWMSG', {
									'TX_NAME':txName,
									'TO_OU_ID':toOUId, 'TO_OU_NAME':toOUName,
									'TO_ROLE_ID':toRoleId, 'TO_ROLE_NAME':toRoleName,
									'TO_USER_ID':toUserId, 'TO_USER_NAME':toUserName
								});
								
								if (txName.length) {
									var m = "clicked: " + key;
									theLogger.log(m);
									
									var auditDocRslt = _checkAuditDoc(docObj, txName);
									if (auditDocRslt.success===false) {
										return;
									}
									else if (auditDocRslt.nAuditDoc=='1') {
										var sPromptMsg = '公文文號' + docObj.docNo + '是否為先存後辦公文，需進行公文列管？';
										var showED411 = confirm(sPromptMsg);
										if (showED411===true) {
											var wsEDSite = theSSO.User.EnvSetting.get('WS_ED_SITE');
											if (typeof wsEDSit=='string' && wsEDSite.length) {
												var urlWithParam = wsEDSite;
												if (urlWithParam.substring(wsEDSite.length-1)!='/') {
													urlWithParam += '/';
												}
												urlWithParam += ('ED4/ED411.aspx?SAMLart=' + localStorage.Artifact + '&OrgNo=' + docObj.sourceOrgNo + '&DocNo=' + docObj.docNo);
												theSSO.Util.openASPX_NewFrame(urlWithParam, localStorage.Artifact);
											}
											else {
												sErrMsg='環境變數WS_ED_SITE未設定, 無法取得ED411網址';
												alert(sErrMsg);
												theLogger.error(sErrMsg);
											}
											return;
										}
									}
									
									// ToDo: (?)實作SpeicalTX='V', 中央大學核決傳送功能!
									var approveOfficer = '';
									
									var option = _getRuleOption(key, menuItems);
									if (option!==null && option.ruleOption!==null) {
										if (option.ruleOption.txName==='分會' && docObj.signType=='P') {
											// 紙本分會傳送, 開啟分會設定子視窗, 選好分會單位關閉後傳送!
											//alert('[紙本]分會傳送作業!');
											SSOUtil.showCoworkProcSettingDlg(docObj)
											.then(function(rslt) {
												if (rslt.success && rslt.doUpdateProcess) {
													SSOUtil.loading('show', { text:'公文傳送作業中', textVisible:true });
													return SSOUtil.doMenuSubmitProc(docObj, option.ruleOption, key);
												}
												else {
													// 使用者取消作業
													SSOUtil.loading('hide');
												}
											})
											.fail(function(rslt) {
												SSOUtil.loading('hide');
											});
											return;
										}
										
										// 執行右鍵傳送作業!
										SSOUtil.loading('show', { text:'公文傳送作業中', textVisible:true });
										SSOUtil.doMenuSubmitProc(docObj, option.ruleOption, key); //, approveOfficer);
									}
									else {
										sErrMsg = '無法取得ruleOption! [menuId=' + key + ']';
										alert(sErrMsg);
										theLogger.error('ERROR! contextMenu selected, ' + sErrMsg);
									}
								}
							}
						},
						items: menuItems,
					};
                }
				return false;
			}
        });

		// 2017.5.17 - Eric Peng, remove...
        //$('.context-menu-todo').on('click', function(e){
        //    console.log('clicked', this);
        //});
	}
	
	/*
	 * cntrId: container's id (<ul>)
	 * listId: 未使用??
	 * folder: 只列出指定公文夾內之公文.
	 * sortBy: 排序方式(尚未實作!)
	*/
	var _makeToDoList_List2 = function(cntrId, folder, listId, sortBy) {
		theLogger.log('-I- makeToDoList_List2() cntrId=' + cntrId + '.');
		
		// 2016.7 - 登記桌可隱藏燈號欄位
		
		
		//alert('_makeToDoList_List2() invoked!')
		if (typeof _doclist === 'undefined' || _doclist===null) {
			theLogger.error('Error! _makeToDoList_List2() _docList un-initialized!');
			return;
		}
		
		if (typeof cntrId==='undefined' || cntrId===null) {
			theLogger.error('Error! _makeToDoList_List2() cntrId is invalid!');
			return;
		}
		
		if (typeof listId==='undefined' || listId===null) {
			theLogger.error('Error! _makeToDoList_List2() listId is invalid!');
			return;
		}
		
		// 移除現有的
		var oldlist = $('#' + cntrId);
		if (oldlist.children('tr').length>0) {
			oldlist.empty();
		}
		
		// 2014.1 - 記錄container Id
		that.listCntrId = cntrId;
		
		// 2011.11.14
		that.lights.total = 0; // 2012.1.30
		that.lights.red = that.lights.yellow = that.lights.white = 0;
		that.lights.green = that.lights.purple = 0;
		var ligth = '';
		
		var list = null; // <ul> element to be created!
		var doclist = null;
		var doc = null;
		var msgId = '';
		var cnt = 0;
				
		var docCnt = _doclist.length;

		var newItem=null;
		var i=0;
		var tmpFolder='';
		var createItem = false;
		var itemIndex = 0;

		// 2019.6.11 - 1080412, Eric Peng
		let sRRBGrayColorFolders = theSSO.User.EnvSettings.get('MP_DOC_COLOR_BY_FOLDER');
		let rrbGrayColorFolders = [];
		if (typeof sRRBGrayColorFolders=='string' && sRRBGrayColorFolders.length) {
			rrbGrayColorFolders = sRRBGrayColorFolders.split(';');
		}
		if (SSOUtil.typeOf(rrbGrayColorFolders)!='array' || rrbGrayColorFolders==null || rrbGrayColorFolders.length==0) {
			rrbGrayColorFolders = [];
		}
		
		if (!!sortBy && sortBy.length>0)
		{
			doclist = [];
			
			// 先排序, 再產生 item
			for(i=0; i<docCnt; i++) {
				newItem = null;
				doc = _doclist[i];
				createItem = false;
				if (doc.signType=="P" || doc.signType=="E" || doc.signType=="W")
				{
					if (typeof folder=='string' && (folder.length>0))
					{
						// 2014.1 - 代理公文處理
						// 只列出指定FOLDER-SUBFOLDER下的公文'
						tmpFolder = _getFolderString(doc);
						/*tmpfolder = doc.folder;
						if (doc.subfolder.length) {
							tmpfolder += '-' + doc.subfolder;
						}*/
						
						if (!tmpFolder || tmpFolder.length==0) {
							theLogger.warn('cannot get folderstring, DocNo=' + doc.docNo + ', MsgId=' + doc.msgId);
						}
						
						if (tmpfolder===folder) {
							createItem = true;
						}
					}
					else if (doc.submitProcessing) {
						createItem = false;
					}
					else { // 未指定FOLDER-SUBFOLDER -> 列出全部
						createItem = true;
					}
				}
				
				if (createItem) {
					doclist.push(doc);	
				}
			}
			
			// sort raw item list here...
			if (doclist.length>0) {
				// 先用文號排序後再以燈號排序...
				doclist.sort(_sortfunc['sort_light']);
			}
			
			var sToDoElem = '', sItemElem='';
			
			itemIndex = 0;
			for(i=0, j=doclist.length; i<j; i++)
			{
				newItem = null;
				doc = doclist[i];
				
				if (doc.submitProcessing)
					continue;
				
				newItem = _self._createNewItem_List3(doc, itemIndex, rrbGrayColorFolders); // 2019.6.11 - 1080412, Eric Peng
				//sItemElem = _self._getNewItemElem_List3(doc, itemIndex);
				if (!!newItem) {
					// 2011.11.14 - light counts
					_count_lights(newItem);
					$('#'+cntrId).append(newItem);
				}
				itemIndex++;
			}
		}
		else { // 毋須排序 -> 依清單順序
			for(i=0; i<docCnt; i++)
			{
				newItem = null;
				doc = _doclist[i];
				createItem = false;
				/* 2015.1 - Eric Peng, 加入SignType='W'項目 */
				if (doc.signType==='P' || doc.signType==='E' || doc.signType==='W')
				{
					if (folder!=undefined && (folder.length>0))
					{
						// 2014.1 - 代理公文處理
						// 只列出指定FOLDER-SUBFOLDER下的公文
						tmpFolder = _getFolderString(doc);
						/*tmpfolder = doc.folder;
						if (doc.subfolder.length) {
							tmpfolder += '-' + doc.subfolder;
						}*/
						
						if (!tmpFolder || tmpFolder.length==0) {
							theLogger.warn('cannot get folderstring, DocNo=' + doc.docNo + ', MsgId=' + doc.msgId);
						}
						
						if (tmpFolder===folder) {
							createItem = true;
						}
					}
					else if (doc.submitProcessing) {
						createItem = false;
					}
					else { // 未指定FOLDER-SUBFOLDER -> 列出全部
						createItem = true;
					}
				}
				
				if (createItem) {
					newItem = _self._createNewItem_List3(doc, itemIndex, rrbGrayColorFolders); // 2019.6.11 - 1080412, Eric Peng
					if (!!newItem) {
						// 2011.11.14 - light counts
						_count_lights(newItem);
					}
					itemIndex++;
				}
				
				if (!!newItem) {
					$('#' + cntrId).append(newItem);
				}
			}
		}
		
		//$('#' + cntrId + ' ul').listview();
		
		_setupContextMenu('context-menu-todo');
		
		var id = $('#' + cntrId + ' ul').attr('id');
		theLogger.log('container\'s id=' + id);
	};
	
	/* SIGN_TYPE = "W" 項目 (@todolist_tb, 條列項目)
	 * doc: 待辦項目的JS object.
	 * sn: [測試用]序號! (目前已不使用!)
	 */
	_self._createNotifyItem_List_DOMStr = function(doc, sn) {
		/*
		<td></td> => 速別
		<td></td> => 燈號
		<td></td> => 密等
		<td><img alt="type:通知" src="./IMAGE/ART/Todo-SignTypeNotify.png" /></td>
		<td></td> => 已閱讀
		<td></td> => due-date
		<td class="docno"><span>1000000003</span></td>
		<td>查爾斯一</td>
		<td>總收</td>
		<td>[EPT]ODT300加密測試...</td>
		<td>送請簽核</td>
		<td>查爾斯四</td>
		<td>06/07 15:20</td> <!-- new time -->
		*/
		
		// 2016.8.23 - 隱藏燈號欄位時仍應顯示燈號統計資訊 
		var lightInfo = _getLightInfo(doc);
			
		var sItem = '<tr data-msgId="' + theSSO.Util.htmlEncode(doc.msgId) + '" data-light="' + theSSO.Util.htmlEncode(lightInfo.light) + '">';
		var sSubItem = '';
		
		var resupply = doc.reSupplyALM;
		if (that.shouldShowResupply() && that.shouldHideLights()) {
			sSubItem = '<td data-prop="reSupplyALM">';
			if (resupply==='')
				resupply = '0';
			// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
			sSubItem = '<td data-prop="reSupplyALM" title="'+_toolTip.resupply[resupply]+'">';
				
			switch(resupply) {
			case '0': sSubItem += '<img alt="resupply:辦理中" src="./IMAGE/ART/Todo-LightBlank.png" />'; break;
			case '1': sSubItem += '<img alt="resupply:補件中" src="./IMAGE/ART/Todo-LightOrange.png" />'; break;
			case '2': sSubItem += '<img alt="resupply:補件收件" src="./IMAGE/ART/Todo-LightBlue.png" />'; break;
			}
			if (sSubItem.length) {
				sSubItem += '</td>';
				sItem += sSubItem;
			}
		}

		// 2021.7 - 1100849 Eric, NUK tooltip
		// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
		// let fShowTip = false;
		// if (SSO_CONFIG.OrgNickName=='NUK') {
			// fShowTip = true;
		// }

		if (!that.shouldHideLights()) {
			// 速別: 1,普通, 2:速件, 3:最速件
			sSubItem = '<td data-prop="speed"';
			var speed = doc.speed;
			if (speed.length===0) {
				speed = '3';
			}
			// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
			sSubItem += ' title="'+_toolTip.speed[speed]+'">';
			switch(speed) {
			case "1": 
				{ 
					// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
					// if (fShowTip) {
						// sSubItem += ' title="普通件(Standard)">';
					// }
					// else {
						// sSubItem += '>';
					// }
					sSubItem += '<img alt="Spd:普通" src="./IMAGE/ART/Todo-Speed1.png" />'; break;
				}
			case "2": 
				{ 
					// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
					// if (fShowTip) {
						// sSubItem += ' title="速件(Priority)">';
					// }
					// else {
						// sSubItem += '>';
					// }
					sSubItem += '<img alt="Spd:速件" src="./IMAGE/ART/Todo-Speed2.png" />'; break;
				}
			case "3": 
				{
					// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
					// if (fShowTip) {
						// sSubItem += ' title="最速件(High Priority)">';
					// }
					// else {
						// sSubItem += '>';
					// }
					sSubItem += '<img alt="Spd:最速件" src="./IMAGE/ART/Todo-Speed3.png" />'; break;
				}
			//1051219 David 1051122 速別代碼4，MP速別圖示同普通圖示
			case "4": 
				{
					// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
					// if (fShowTip) {
						// sSubItem += ' title="普通件(Standard)">';
					// }
					// else {
						// sSubItem += '>';
					// }
					sSubItem += '<img alt="Spd:" src="./IMAGE/ART/Todo-Speed1.png" />'; break;
				}
			default: sSubItem += '>'; break;
			}
			
			if (sSubItem.length) {
				sSubItem += '</td>';
				sItem += sSubItem;
			}
			
			// 燈號
			// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
			// if (fShowTip) {
				// sSubItem = '<td data-prop="light" title="' + theSSO.Util.htmlEncode(lightInfo.tip) + '"><img alt="light:' + theSSO.Util.htmlEncode(lightInfo.light) + '" src="'+ theSSO.Util.htmlEncode(lightInfo.url) + '"></img></td>';
			// }
			// else {
				// sSubItem = '<td data-prop="light"><img alt="light:' + theSSO.Util.htmlEncode(lightInfo.light) + '" src="'+ theSSO.Util.htmlEncode(lightInfo.url) + '"></img></td>';
			// }
			sSubItem = '<td data-prop="light" title="' + theSSO.Util.htmlEncode(_toolTip.light[lightInfo.light]) + '"><img alt="light:' + theSSO.Util.htmlEncode(lightInfo.light) + '" src="'+ theSSO.Util.htmlEncode(lightInfo.url) + '"></img></td>';
			//sSubItem = '<td data-prop="light"><img alt="燈號" src="' + lightInfo.url + '" /></td>';
			sItem += sSubItem;
			
			if (that.shouldShowResupply()) {
				sSubItem = '<td data-prop="reSupplyALM">';
				if (resupply==='')
					resupply = '0';
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				sSubItem = '<td data-prop="reSupplyALM" title="'+_toolTip.resupply[resupply]+'">';
					
				switch(resupply) {
				case '0': sSubItem += '<img alt="resupply:辦理中" src="./IMAGE/ART/Todo-LightBlank.png" />'; break;
				case '1': sSubItem += '<img alt="resupply:補件中" src="./IMAGE/ART/Todo-LightOrange.png" />'; break;
				case '2': sSubItem += '<img alt="resupply:補件收件" src="./IMAGE/ART/Todo-LightBlue.png" />'; break;
				}
				if (sSubItem.length) {
					sSubItem += '</td>';
					sItem += sSubItem;
				}
			}
			else {
				// 密等: 1: 普通, 2:密, 3:機密, 4:極機密, 5:絕對機密
				sSubItem = '<td data-prop="secret"';
				var secret = doc.secret;
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				sSubItem += ' title="'+_toolTip.secret[secret]+'">';
				switch(secret) {
				case "1": case "":
					{
						// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
						// if (fShowTip) {
							// sSubItem += ' title="普通(Standard)">';
						// }
						// else {
							// sSubItem += '>';
						// }
						sSubItem += '<img alt="sec:白" src="./IMAGE/ART/Todo-Secret1.png" />'; break;
					}
				case "2": case "3": case "4": case "5":
					{
						// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
						// if (fShowTip) {
							// sSubItem += ' title="密件(Confidential)">';
						// }
						// else {
							// sSubItem += '>';
						// }
						sSubItem += '<img alt="sec:黃" src="./IMAGE/ART/Todo-Secret2.png" />'; break;
					}
				}
				
				if (sSubItem.length) {
					sSubItem += '</td>';
					sItem += sSubItem;
				}
			}
			
			// 2018.9.28 - 1070955
			if (that.narrowWindow || that.showSignType) {
				// 簽核類型: 'W' -> 通知
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				// if (fShowTip) {
					// sSubItem = '<td data-prop="signType" title="通知(Notice)"><img alt="signType:W" src="./IMAGE/ART/Todo-SignTypeNotify.png" /></td>';
				// }
				// else {
					// sSubItem = '<td data-prop="signType"><img alt="signType:W" src="./IMAGE/ART/Todo-SignTypeNotify.png" /></td>';
				// }
				sSubItem = '<td data-prop="signType" title="'+_toolTip.signType[doc.signType]+'"><img alt="signType:W" src="./IMAGE/ART/Todo-SignTypeNotify.png" /></td>';
				
				sItem += sSubItem;
			}
				
			// 已閱讀
			sSubItem = '<td class="opened" data-prop="opened"';
			if (doc.signTime.length || doc.isDraft) { // 2016.12.20 - 草稿一律為已閱讀!
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				// if (fShowTip) {
					// sSubItem += ' title="已讀(Have read)">';
				// }
				// else {
					// sSubItem += '>';
				// }
				sSubItem += ' title="'+_toolTip.Readed+'">';
				sSubItem += '<img src="./IMAGE/ART/Todo-Readed.png" alt="opened:1" /></td>';
			}
			else {
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				// if (fShowTip) {
					// sSubItem += ' title="未讀(Unread)">';
				// }
				// else {
					// sSubItem += '>';
				// }
				sSubItem += ' title="'+_toolTip.ReadNon+'">';
				sSubItem += '<img src="./IMAGE/ART/Todo-ReadNon.png" alt="opened:0" /></td>';
			}
			sItem += sSubItem;
		}

		// 2019.1.24 - 1071075, 公文性質
		if (!that.narrowWindow && that.showDocProperty) {
			// 2019.2.21 - 10802115, [公文性質]欄位可指定顯示字數
			let showDocPropertyLen = that.showDocPropertyLen;
			let dispDocPtyName = doc.docPtyName;
			if (typeof showDocPropertyLen!='number' || showDocPropertyLen<1) {
				showDocPropertyLen = 5;
			}
			else if (showDocPropertyLen>15) {
				showDocPropertyLen = 15;
			}
			if (dispDocPtyName.length && (doc.docPtyName.length>showDocPropertyLen)) {
				dispDocPtyName = doc.docPtyName.substr(0, showDocPropertyLen);
			}
			sSubItem = '<td data-prop="docPtyName" class="to_e tbc_centre td_docPty">' + theSSO.Util.htmlEncode(dispDocPtyName) + '</td>';
			sItem += sSubItem;
		}
			
		// 辦理期限
		sSubItem = '<td class="to_e"></td>';
		sItem += sSubItem;
		
		// 2022.5.20	Leslie[1110064]	補上顯示收創文日期時，通知類欄位
		if (!that.narrowWindow && that.showRcvDate) {
			sSubItem = '<td class="to_e"></td>';
			sItem += sSubItem;
		}
		
		if (!that.shouldHideLights() && !that.narrowWindow && that.showSignDueDate) { // 2018.9.28 - 1070955
			// 陳核限辦日
			sSubItem = '<td class="to_e"></td>';
			sItem += sSubItem;
		}
		
		// 文號
		sSubItem = '<td class="docno urlLink" data-prop="docNo" data-msgid="' + theSSO.Util.htmlEncode(doc.msgId) + '">[開啟...]</td>';
		sItem += sSubItem;

		if (!that.shouldHideLights() && !that.narrowWindow && that.showICOU) { // 2018.9.28 - 1070955
			// 承辦單位
			//1110614 David 1110281 通知待辦新增依ODWMSG.IC_OU_NAME、IC_USER_NAME顯示畫面承辦單位、承辦人欄位資料
			//sSubItem = '<td class="to_e"></td>';
			if(that.NotifyShowDeptInfo){
				if (doc.ICOUName.length) {
					sSubItem = '<td data-prop="ICOUName" class="to_e">' + theSSO.Util.htmlEncode(doc.ICOUName) + '</td>';
				}
				else
					sSubItem = '<td data-prop="ICOUName" class="to_e"></td>';
			}
			else
				sSubItem = '<td data-prop="ICOUName" class="to_e"></td>';
			
			sItem += sSubItem;
		}

		// 2020.6.16 - 1090452 Eric, listHeader.ss_normal layout 有[承辦人]欄位 (narrowWindow=true)
		if (!that.shouldHideLights() && (that.showICUser || that.narrowWindow)) { // 2018.9.28 - 1070955
			// 承辦人
			//1110614 David 1110281 通知待辦新增依ODWMSG.IC_OU_NAME、IC_USER_NAME顯示畫面承辦單位、承辦人欄位資料
			//sSubItem = '<td class="to_e"></td>';
			if(that.NotifyShowDeptInfo){
				if (doc.ICUserName.length) {
					sSubItem = '<td data-prop="ICUserName" class="to_e">' + theSSO.Util.htmlEncode(doc.ICUserName) + '</td>';
				}
				else
					sSubItem = '<td data-prop="ICUserName" class="to_e"></td>';
			}
			else
				sSubItem = '<td data-prop="ICUserName" class="to_e"></td>';

			sItem += sSubItem;
		}
		
		if (that.shouldHideLights() || that.narrowWindow || that.showFromOU) { // 2018.09.28 - 1070955
			// 送文單位
			sItem += '<td class="to_e" data-prop="fromOUName"></td>';
		}
		
		// 主旨
		if (doc.fromSubject.length) {
			var sSubj = '';
			var len = 256;
			if (doc.fromSubject.length > len) {
				sSubj = doc.fromSubject.substr(0, len);
				sSubj += '...';
			}
			else {
				sSubj = doc.fromSubject;
			}
			sSubItem = '<td data-prop="subject" class="to_e">' + theSSO.Util.htmlEncode(sSubj) + '</td>';
		}
		else {
			sSubItem = '<td data-prop="subject"></td>';
		}
		if (sSubItem.length) {
			sItem += sSubItem;
		}
			
		if (!that.shouldHideLights() && !that.shouldHideTransInfo()) { // 2017.2.13
			// 異動別
			sItem += '<td class="to_e"></td>';
				
			// 傳送至
			sItem += '<td class="to_e"></td>';
		}
		
		if (!that.shouldHideLights() && !that.narrowWindow && that.showFromOrg) { // 2018.09.28 - 1070955
			// 來文機關
			sItem += '<td class="to_e" data-prop="fromOrg"></td>';
		}

        // 2017.6.22 - 成大 流程
        // 2023.4.20 - Eric: Quick-fix columns mis-match!
        if (!that.narrowWindow) {
            sSubItem = '<td data-prop="docProc" class="docProc"><span class="url_link placeholder"></span></td>';
            sItem += sSubItem;
        }
			
		// 送方傳送時間
		// => <td>06/07 15:20</td> <!-- new time -->
		// 2021.7 - 1100854 Eric
		if (SSO_CONFIG.OrgNickName=="NUK" && doc.fullNewTime.length==13) {
			var sDate = doc.fullNewTime.substring(0, 3) + '/'  + 
						doc.fullNewTime.substring(3, 5) + '/' +
			            doc.fullNewTime.substring(5, 7);
			var sTime = doc.fullNewTime.substring(7, 9) + ':' +
						doc.fullNewTime.substring(9, 11)+ ':' +
						doc.fullNewTime.substring(11, 13);
			//2016.12.9	Leslie	增加隱藏欄位以隔絕辦理期限與文號，避免連續數字被誤判
			sDate = '<span style="display:none">€</span>' + theSSO.Util.htmlEncode(sDate);
			sSubItem = '<td class="newTime" data-prop="newTime" style="font-size:smaller"><p style="nowrap:none;">' + sDate + '</p>' +
						'<p style="nowrap:none;">' + theSSO.Util.htmlEncode(sTime) + '</p></td>';
		}
		else if (doc.newTime.length==11)	{
			if (SSO_CONFIG.OrgNickName=="NUK") {
				var sDate = doc.newTime.substring(0, 3) + '/' +
						   	doc.newTime.substring(3, 5) + '/' +
							doc.newTime.substring(5, 7) + ' ';
				var sTime = doc.newTime.substring(7, 9) + ':' +
							doc.newTime.substring(9, 11)+ ':' +
							'00';
				//2016.12.9	Leslie	增加隱藏欄位以隔絕辦理期限與文號，避免連續數字被誤判
				sDate = '<span style="display:none">€</span>' + theSSO.Util.htmlEncode(sDate);
				sSubItem = '<td class="newTime" data-prop="newTime" style="font-size:smaller"><p style="nowrap:none;">' + sDate + '</p>' +
							'<p style="nowrap:none;">' + theSSO.Util.htmlEncode(sTime) + '</p></td>';
			}
			else {
				var sDate = doc.newTime.substring(3, 5) + '/' +
							doc.newTime.substring(5, 7) + ' ';
				var sTime = doc.newTime.substring(7, 9) + ':' +
							doc.newTime.substring(9, 11);
				//2016.12.9	Leslie	增加隱藏欄位以隔絕辦理期限與文號，避免連續數字被誤判
				sDate = '<span style="display:none">€</span>' + theSSO.Util.htmlEncode(sDate);
				sSubItem = '<td class="newTime" data-prop="newTime"><p style="nowrap:none;">' + sDate + '</p>' +
							'<p style="nowrap:none;">' + theSSO.Util.htmlEncode(sTime) + '</p></td>';
			}
		}
		else {
			sSubItem = '<td class="newTime" data-prop="newTime"></td>';
		}
		if (sSubItem.length) {
			sItem += sSubItem;
		}

		if (!that.shouldHideLights() && !that.narrowWindow && that.showCurrLoc) { // 2018.09.28 - 1070955
			// 目前位置
			sItem += '<td class="to_e" data-prop="currLocate"></td>';
		}

		//sItem += '</tr>';
		sItem += '<td style="display:none">§</td></tr>';	//2016.12.6	Leslie	新增隱藏欄位，用於增進MP畫面搜尋效能
		
		return {light:(!!lightInfo)?lightInfo.light:'', sDOMElem: sItem}; // 2016.11.1 - bug-fix
	};
	
	/* 傳統table清單 - [直接產生DOM Elements字串]
	 * 參數
	 * doc: 待辦項目的JS object.
	 * sn: [測試用]序號! (目前已不使用!)
	 */
	 //1110926	Leslie[1110889]	新增客製化欄位設定功能
	// _self._createNewItem_List_DOMStr = function(doc, sn, rrbGrayColorFolders)  { // doc is an object
	_self._createNewItem_List_DOMStr = function(doc, sn, rrbGrayColorFolders, bEnableCustomTodo)  { // doc is an object
		/*
		<tr data-msgId="72112" data-light="red">
			<td data-prop="speed"><img alt="Spd:普通" src="./IMAGE/ART/Todo-LightWhite.png" /></td>
			<td data-prop="light"><img alt="lgt:紅" src="./IMAGE/ART/Todo-LightRed.png" /></td>
			<td data-prop="secret"><img alt="Sec:密等" src="./IMAGE/ART/Todo-Secret1.png" /></td>
			<td data-prop="signType"><img alt="type:線上簽核" src="./IMAGE/ART/Todo-SignTypeOnline.png" /></td>
			<td class="opened" data-prop="opened"><img alt="開啟:已閱讀" src="./IMAGE/ART/Todo-Readed.png" /></td>
			<td data-prop="dueDate">100/06/13</td> <!-- due-date -->
			<td class="docno" data-prop="docNo" data-docno="1000000003"><span>1000000003</span></td>
			<td data-prop="ICUserName">查爾斯一</td>
			<td data-prop="fromOUName">總收</td>
			<td data-prop="subject">[EPT]ODT300加密測試...</td>
			<td data-prop="txName">送請簽核</td>
			<td data-prop="toUserName">查爾斯四</td>
			<td class="newTime" data-prop="newTime">06/07 15:20</td> <!-- new time -->
		</tr>
		*/
		
        // 2023.4.20 - Eric, 修正iPad width=1024時, 標題與內容不match bug. (quick-fix only, 完全解決須與Leslie討論修正方案)
		//1110926	Leslie[1110889]	新增客製化欄位設定功能
		if(!that.narrowWindow && bEnableCustomTodo){
			let tmpTodoSet = theCustom.CustomSet.CustomTodoSet;
			let _lightInfo = _getLightInfo(doc);
			let sItemDraft = (_isDraftMsg(doc))?' data-draft="true" data-ICUser="' + theSSO.Util.htmlEncode(doc.ICUserId) + '"':'';
			//1120217	Leslie[1110881]	銓敘部-序14，增加可以一併更新MsgID
			// let sItemTr = '<tr data-msgId="' + theSSO.Util.htmlEncode(doc.msgId) + '"'+sItemDraft+' data-light="' + theSSO.Util.htmlEncode(_lightInfo.light) + '">';
			let sItemTr = '<tr data-msgId="' + theSSO.Util.htmlEncode(('newMsgId' in doc && doc.newMsgId.length !== 0)?doc.newMsgId:doc.msgId) + '"'+sItemDraft+' data-light="' + theSSO.Util.htmlEncode(_lightInfo.light) + '">';
			doc.light = _lightInfo;	//配合內部使用，更新燈號
			doc.Readed = !!(doc.signTime.length || doc.isDraft);
			let tmpTodoTd = tmpTodoSet.reduce(function(s,o){return s+_customTodo[o].Column(doc[o],doc)},"");
			sItemTr += tmpTodoTd + '<td style="display:none">§</td></tr>'
			return {'light': _lightInfo.light, sDOMElem: sItemTr};
		}
		
		if (doc.signType=='W') {
			return _createNotifyItem_List_DOMStr(doc, sn);
		}
		
		var isDraft = _isDraftMsg(doc);
		
		var sItem = '<tr';
		
		// 2012.12.7 - 加MsgId資訊
		var sItemAttr = ' data-msgId="' + theSSO.Util.htmlEncode(doc.msgId) + '"';
		if (isDraft) {
			sItemAttr += ' data-draft="true" data-ICUser="' + theSSO.Util.htmlEncode(doc.ICUserId) + '"';
		}
		
		// 2016.8.23 - 隱藏燈號欄位時仍應顯示燈號統計資訊 
		var lightInfo = _getLightInfo(doc);
		var light = '';
		var sAttrLight = '';
		if (!!lightInfo) {
			sAttrLight = ' data-light="' + theSSO.Util.htmlEncode(lightInfo.light) + '"'; // 燈號統計
			light = lightInfo.light;
			sItemAttr += sAttrLight;
		}
		
		sItem += (sItemAttr + '>');
		
		var sSubItem = '', sDate = '', sTime = '';
		var resupply = doc.reSupplyALM;
		var colorDocNo = false;

		if (that.shouldShowResupply() && that.shouldHideLights()) {
			colorDocNo = true;
			sSubItem = '<td data-prop="reSupplyALM">';
			
			if (resupply==='')
				resupply = '0';
			// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
			sSubItem = '<td data-prop="reSupplyALM" title="'+_toolTip.resupply[resupply]+'">';
				
			switch(resupply) {
			case '0': sSubItem += '<img alt="resupply:辦理中" src="./IMAGE/ART/Todo-LightBlank.png" />'; break;
			case '1': sSubItem += '<img alt="resupply:補件中" src="./IMAGE/ART/Todo-LightOrange.png" />'; break;
			case '2': sSubItem += '<img alt="resupply:補件收件" src="./IMAGE/ART/Todo-LightBlue.png" />'; break;
			}
			
			if (sSubItem.length) {
				sSubItem += '</td>';
				sItem += sSubItem;
			}
		}
		
		// 2021.7 - 1100849 Eric, NUK tooltip
		// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
		// let fShowTip = false;
		// if (SSO_CONFIG.OrgNickName=='NUK') {
			// fShowTip = true;
		// }

		sSubItem = '';
		if (!that.shouldHideLights()) {
			// 速別: 1,普通, 2:速件, 3:最速件
			sSubItem = '<td data-prop="speed"';
			var speed = doc.speed;
			// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
			sSubItem += ' title="'+_toolTip.speed[speed]+'">';
			switch(speed) {
			case "1": 
				{
					// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
					// if (fShowTip) {
						// sSubItem += ' title="普通件(Standard)">';
					// }
					// else {
						// sSubItem += '>';
					// }
					sSubItem += '<img alt="Spd:普通" src="./IMAGE/ART/Todo-Speed1.png" />';  
					break;
				}
			case "2": 
				{ 
					// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
					// if (fShowTip) {
						// sSubItem += ' title="速件(Priority)">';
					// }
					// else {
						// sSubItem += '>';
					// }
					sSubItem += '<img alt="Spd:速件" src="./IMAGE/ART/Todo-Speed2.png" />'; 
					break;
				}
			case "3":
				{
					// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
					// if (fShowTip) {
						// sSubItem += ' title="最速件(High Priority)">';
					// }
					// else {
						// sSubItem += '>';
					// }
					sSubItem += '<img alt="Spd:最速件" src="./IMAGE/ART/Todo-Speed3.png" />'; sTip='最速件(High Priority)'; break;
				} 
			//1051219 David 1051122 速別代碼4，MP速別圖示同普通圖示
			case "4":
				{
					// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
					// if (fShowTip) {
						// sSubItem += ' title="普通件(Standard)">';
					// }
					// else {
						// sSubItem += '>';
					// }
					sSubItem += '<img alt="Spd:" src="./IMAGE/ART/Todo-Speed1.png" />'; sTip='普通件(Standard)'; break;
				}
			default: sSubItem += '>';
			}
			
			if (sSubItem.length) {
				sSubItem += '</td>';
				sItem += sSubItem;
			}
			
			// 燈號
			// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
			// if (fShowTip) {
				// sSubItem = '<td data-prop="light" title="' + theSSO.Util.htmlEncode(lightInfo.tip) +　'"><img data-alt="light:' + theSSO.Util.htmlEncode(lightInfo.light) + '" src="'+ theSSO.Util.htmlEncode(lightInfo.url) + '"></img></td>';
			// }
			// else {
				// sSubItem = '<td data-prop="light"><img data-alt="light:' + theSSO.Util.htmlEncode(lightInfo.light) + '" src="'+ theSSO.Util.htmlEncode(lightInfo.url) + '"></img></td>';
			// }
			sSubItem = '<td data-prop="light" title="' + theSSO.Util.htmlEncode(_toolTip.light[lightInfo.light]) + '"><img alt="light:' + theSSO.Util.htmlEncode(lightInfo.light) + '" src="'+ theSSO.Util.htmlEncode(lightInfo.url) + '"></img></td>';
			sItem += sSubItem;
					
			if (that.shouldShowResupply()) {
				colorDocNo = true;
				sSubItem = '';
				sSubItem = '<td data-prop="reSupplyALM">';
				if (resupply==='')
					resupply = '0';
				
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				sSubItem = '<td data-prop="reSupplyALM" title="'+_toolTip.resupply[resupply]+'">';
				
				switch(resupply) {
				case '0': sSubItem += '<img alt="resupply:辦理中" src="./IMAGE/ART/Todo-LightBlank.png" />'; break;
				case '1': sSubItem += '<img alt="resupply:補件中" src="./IMAGE/ART/Todo-LightOrange.png" />'; break;
				case '2': sSubItem += '<img alt="resupply:補件收件" src="./IMAGE/ART/Todo-LightBlue.png" />'; break;
				}
				if (sSubItem.length) {
					sSubItem += '</td>';
					sItem += sSubItem;
				}
			}
			else {
				// 密等: 1: 普通, 2:密, 3:機密, 4:極機密, 5:絕對機密
				sSubItem = '';
				sSubItem = '<td data-prop="secret"';
				var secret = doc.secret;
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				sSubItem += ' title="'+_toolTip.secret[secret]+'">';
				switch(secret) {
				case "1": case "":
					{
						// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
						// if (fShowTip) {
							// sSubItem += ' title="普通(Standard)">';
						// }
						// else {
							// sSubItem += '>';
						// }
						sSubItem += '<img alt="sec:白" src="./IMAGE/ART/Todo-Secret1.png" />'; break;
					}
				case "2": case "3":
				case "4": case "5":
					{
						// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
						// if (fShowTip) {
							// sSubItem += ' title="密件(Confidential)">';
						// }
						// else {
							// sSubItem += '>';
						// }
						sSubItem += '<img alt="sec:黃" src="./IMAGE/ART/Todo-Secret2.png" />'; break;
					}
				}
				
				if (sSubItem) {
					sSubItem += '</td>';
					sItem += sSubItem;
				}
			}
		
			// 2018.09.28 – 1070955
			if (that.narrowWindow || that.showSignType) {
				// 簽核類型: 'E' -> 線上, 'P' -> 紙本
				sSubItem = '';
				sSubItem = '<td data-prop="signType"';
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				sSubItem += ' title="'+_toolTip.signType[doc.signType]+'">';
				switch(doc.signType) {
				case "E": 
					{
						// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
						// if (fShowTip) {
							// sSubItem += ' title="線上簽核(Online Processing)">';
						// }
						// else {
							// sSubItem += '>';
						// }
						sSubItem += '<img alt="signType:E" src="./IMAGE/ART/Todo-SignTypeOnline.png" />'; break;
					}
				case "P": 
					{
						// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
						// if (fShowTip) {
							// sSubItem += ' title="紙本簽核(Paperwork Processing)">';
						// }
						// else {
							// sSubItem += '>';
						// }
						sSubItem += '<img alt="signType:P" src="./IMAGE/ART/Todo-SignTypePepper.png" />'; break;
					}
				}
				if (sSubItem.length) {
					sSubItem += '</td>';
					sItem += sSubItem;
				}
			}
			
			// 已閱讀
			sSubItem = '';
			sSubItem = '<td class="opened" data-prop="opened"';
			if (doc.signTime.length || doc.isDraft) { // 2016.12.20 - 草稿一律為已閱讀!
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				// if (fShowTip) {
					// sSubItem += ' title="已讀(Have read)">';
				// }
				// else {
					// sSubItem += '>';
				// }
				sSubItem += ' title="'+_toolTip.Readed+'">';
				sSubItem += '<img src="./IMAGE/ART/Todo-Readed.png" alt="opened:1" />';
			}
			else {
				// 2022.3.9	Leslie[1101394]	增修共通的MP圖示ToolTip功能
				// if (fShowTip) {
					// sSubItem += ' title="未讀(Unread)">';
				// }
				// else {
					// sSubItem += '>';
				// }
				sSubItem += ' title="'+_toolTip.ReadNon+'">';
				sSubItem += '<img src="./IMAGE/ART/Todo-ReadNon.png" alt="opened:0" />';
			}
			if (sSubItem.length) {
				sSubItem += '</td>';
				sItem += sSubItem;
			}
		}

		// 2019.1.24 - 1071075, 公文性質
		if (!that.narrowWindow && that.showDocProperty) {
			// 2019.2.21 - 10802115, [公文性質]欄位可指定顯示字數
			let showDocPropertyLen = that.showDocPropertyLen;
			let dispDocPtyName = doc.docPtyName;
			if (typeof showDocPropertyLen!='number' || showDocPropertyLen<1) {
				showDocPropertyLen = 5;
			}
			else if (showDocPropertyLen>15) {
				showDocPropertyLen = 15;
			}
			if (dispDocPtyName.length && (doc.docPtyName.length>showDocPropertyLen)) {
				dispDocPtyName = doc.docPtyName.substr(0, showDocPropertyLen);
			}
			sSubItem = '<td data-prop="docPtyName" class="to_e tbc_centre td_docPty">' + theSSO.Util.htmlEncode(dispDocPtyName) + '</td>';
			sItem += sSubItem;
		}
			
		// 辦理期限
		sSubItem = '';
		if (doc.dueDate.length==7) {
			sDate = doc.dueDate.substring(0, 3) + '/' + doc.dueDate.substring(3, 5) + '/' +
			            doc.dueDate.substring(5, 7);
			// 2016.10.24
			if (window.innerWidth<=1024 && !_shouldHideLights()) {
				sDate = doc.dueDate.substring(3, 5) + '/' + doc.dueDate.substring(5, 7);
			}
			//2016.12.9	Leslie	增加隱藏欄位以隔絕辦理期限與文號，避免連續數字被誤判
			sDate = theSSO.Util.htmlEncode(sDate) + '<span style="display:none">€</span>';
			sSubItem = '<td data-prop="dueDate" class="to_e tbc_centre">' + sDate + '</td>'; // 2017.10.24 - 1060967, add tbc_centre
		}
		else {
			sSubItem = '<td data-prop="dueDate" class="to_e tbc_centre"></td>';	// 2017.10.24 - 1060967, add tbc_centre
		}
		if (sSubItem.length) {
			sItem += sSubItem;
		}
		
		// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期
		if (!that.narrowWindow && that.showRcvDate) {
			sSubItem = '';
			if (doc.rcvDate.length==7) {
				sDate = doc.rcvDate.substring(0, 3) + '/' + doc.rcvDate.substring(3, 5) + '/' +
							doc.rcvDate.substring(5, 7);
				// 2016.10.24
				if (window.innerWidth<=1024 && !_shouldHideLights()) {
					sDate = doc.rcvDate.substring(3, 5) + '/' + doc.rcvDate.substring(5, 7);
				}
				sDate = theSSO.Util.htmlEncode(sDate) + '<span style="display:none">€</span>';
				sSubItem = '<td data-prop="rcvDate" class="to_e tbc_centre">' + sDate + '</td>'; // 2017.10.24 - 1060967, add tbc_centre
			}
			else {
				sSubItem = '<td data-prop="rcvDate" class="to_e tbc_centre"></td>';	// 2017.10.24 - 1060967, add tbc_centre
			}
			if (sSubItem.length) {
				sItem += sSubItem;
			}
		}
		
		// 陳核限辦日, 2018.9.28 - 1070955
		sSubItem = '';
		if (!that.shouldHideLights() && !that.narrowWindow && that.showSignDueDate) {
			if (doc.signDueDate.length==7) {
				sDate = doc.signDueDate.substring(0, 3) + '/' + doc.signDueDate.substring(3, 5) + '/' +
							doc.signDueDate.substring(5, 7);
				//2016.12.9	Leslie	增加隱藏欄位以隔絕陳核限辦日與文號，避免連續數字被誤判
				sDate = theSSO.Util.htmlEncode(sDate) + '<span style="display:none">€</span>';
				sSubItem = '<td data-prop="signDueDate" class="to_e tbc_centre">' + sDate + '</td>'; // 2017.10.24 - 1060967, add tbc_centre
			}
			else {
				sSubItem = '<td data-prop="signDueDate" class="to_e tbc_centre"></td>';	// 2017.10.24 - 1060967, add tbc_centre
				
				if (typeof doc.signDueDate=='string' && doc.signDueDate.length)
					theLogger.log('Invalid SIGN_DUEDATE length, DocNo=' + doc.docNo + ', SIDG_DUEDATE=' + doc.signDueDate);
			}
			if (sSubItem.length) {
				sItem += sSubItem;
			}
		}

		// 文號
		if (doc.docNo.length) {
			// 2019.6.11 - Eric Peng - 1080412
			let folder = doc.folder + '-' + doc.subfolder;
			let rrbGrayColor = false;
			if (SSOUtil.typeOf(rrbGrayColorFolders)=='array' && rrbGrayColorFolders.length && rrbGrayColorFolders.indexOf(folder)!=-1) {
				rrbGrayColor = true;
			}

			var docNoClass = 'docno context-menu-todo';
			if (colorDocNo) {
				if (doc.secret=='2' || doc.secret=='3' || doc.secret=='4' || doc.secret=='5') {
					docNoClass = 'docno context-menu-todo redText';
				}
			}
			else if (rrbGrayColor) {
				docNoClass += ' rrbSpecColor';
			}
			//1110323 David 1101416 如TODO_LIST有註記需變更文號顏色時，調整畫面文號顏色
			else if(typeof doc.ODWMSG.CHANGE_DOC_COLOR =='string' && doc.ODWMSG.CHANGE_DOC_COLOR == "Y"){
				docNoClass += ' redText';
			}

			// 2016.12.5 - 1051175, 鐵工局稽核類公文, 文號前面加'*'
			var docNoForDisplay = doc.docNo;
			if (SSO_CONFIG.OrgNickName=='RRB' || _debug) {
				var isAudit = (typeof doc.ODWMSG.IS_AUDIT=='string')?doc.ODWMSG.IS_AUDIT:'N';
				if (isAudit=='Y'||isAudit=='y') {
					docNoForDisplay = '*' + doc.docNo;
				}
			}
			sSubItem = '<td class="' + docNoClass + '" data-prop="docNo" data-docno="' + theSSO.Util.htmlEncode(doc.docNo) + '">' + theSSO.Util.htmlEncode(docNoForDisplay) + '</td>';
		}
		else {
			if (isDraft) {
				sSubItem = '<td class="docno" data-prop="docNo" data-docno="">[尚未取號]</td>';
			}
			else {
				sSubItem = '<td class="docno" data-prop="docNo" data-docno=""></td>';
			}
		}
		if (sSubItem.length) {
			sItem += sSubItem;
		}
			
		// 承辦單位
		sSubItem = '';
		if (!that.shouldHideLights() && !that.narrowWindow && that.showICOU) { // 2018.09.28 – 1070955
			if (doc.ICOUName.length) {
				sSubItem = '<td data-prop="ICOUName" class="to_e">' + theSSO.Util.htmlEncode(doc.ICOUName) + '</td>';
			}
			else {
				sSubItem = '<td data-prop="ICOUName" class="to_e"></td>';
			}
			if (sSubItem.length) {
				sItem += sSubItem;
			}
		}

		// 承辦人
		sSubItem = '';
		// 2020.6.16 - 1090452 Eric, listHeader.ss_normal layout 有[承辦人]欄位 (narrowWindow=true)
		if (!that.shouldHideLights() && (that.showICUser || that.narrowWindow)) { // 2018.09.28 – 1070955
			if (doc.ICUserName.length) {
				sSubItem = '<td data-prop="ICUserName" class="to_e">' + theSSO.Util.htmlEncode(doc.ICUserName) + '</td>';
			}
			else {
				sSubItem = '<td data-prop="ICUserName" class="to_e"></td>';
			}
			if (sSubItem.length) {
				sItem += sSubItem;
			}
		}
		
		if (that.shouldHideLights() || that.narrowWindow || that.showFromOU) { // 2018.09.28 – 1070955
			// 送文單位
			if (doc.fromOUName.length) {
				//$subItem = $('<td data-prop="fromOUName" class="to_e"><input type="text" size="10" readonly="readonly" maxLength="10" value="' + doc.fromOUName + '"></input></td>');
				sSubItem = '<td data-prop="fromOUName" class="to_e">' + theSSO.Util.htmlEncode(doc.fromOUName) + '</td>'; // 2016.9.8 - 調整顯示內容
			}
			else {
				sSubItem = '<td data-prop="fromOUName" class="to_e"></td>';
			}
			if (sSubItem.length) {
				sItem += sSubItem;
			}
		}
		
		// 主旨
		if (doc.fromSubject.length) {
			var sSubj = '';
			var len = 256; // 20; 2016.7 - change length
			if (doc.fromSubject.length > len) {
				sSubj = doc.fromSubject.substr(0, len);
				sSubj += '...';
			}
			else {
				sSubj = doc.fromSubject;
			}
			
			if (!!_debug) {
				var sfolder = doc.folder + '-' + doc.subfolder;
				var sEscSubj = SSOUtil.escapeXml(sSubj);
				sSubItem = '<td class="subject" data-prop="subject" title="'+ theSSO.Util.htmlEncode(sfolder) + ', MsgId=' + theSSO.Util.htmlEncode(doc.msgId) + '">' + theSSO.Util.htmlEncode(sEscSubj) + '</td>';
			}
			else {
				sSubItem = '<td class="subject"  data-prop="subject">' + theSSO.Util.htmlEncode(SSOUtil.escapeXml(sSubj)) + '</td>';
			}
		}
		else {
			sSubItem = '<td class="subject" data-prop="subject"></td>';
		}
		if (sSubItem.length) {
			sItem += sSubItem;
		}
			
		// 異動別
		if (!that.shouldHideLights() && !that.shouldHideTransInfo()) { // 2017.2.13
			if (doc.txName.length) {
				sSubItem = '<td data-prop="txName" class="to_e">' + theSSO.Util.htmlEncode(doc.txName) + '</td>';
			}
			else {
				sSubItem = '<td data-prop="txName" class="to_e"></td>';
			}
			if (sSubItem.length) {
				sItem += sSubItem;
			}
				
			// 傳送至
			if (typeof doc.toUserName=='string' && doc.toUserName.length) {
				sSubItem = '<td data-prop="toUserName" class="to_e">' + theSSO.Util.htmlEncode(doc.toUserName) + '</td>';
			}
			else {
				if (typeof doc.toOUName!=='string' || doc.toOUName.length===0) {
					sSubItem = '<td data-prop="toUserName" class="to_e"></td>';
				}
				else {
					// toOUName, toRoleName
					var _toXXX = theSSO.Util.htmlEncode(doc.toOUName);
					var _sendTo = theSSO.Util.htmlEncode(doc.toOUName); // 2018.10.2 - 1070955
					if (typeof doc.toRoleName=='string' && doc.toRoleName.length) {
						_toXXX += '<br>' + theSSO.Util.htmlEncode(doc.toRoleName);
						_sendTo += '-' + theSSO.Util.htmlEncode(doc.toRoleName);
					}
					sSubItem = '<td data-prop="toUserName" class="to_e" title="'+ _sendTo +'">' + _toXXX + '</td>';
				}
			}
			if (sSubItem.length) {
				sItem += sSubItem;
			}
		}
			
		// 2018.09.28 – 1070955
		if (!that.shouldHideLights() && !that.narrowWindow && that.showFromOrg) {
			// 來文機關
			if (doc.fromOrg.length) {
				sSubItem = '<td data-prop="fromOrg" class="to_e" title="'+ theSSO.Util.htmlEncode(doc.fromOrg) +'">' + theSSO.Util.htmlEncode(doc.fromOrg) + '</td>'; // 2016.9.8 - 調整顯示內容
			}
			else {
				sSubItem = '<td data-prop="fromOrg" class="to_e"></td>';
			}
			if (sSubItem.length) {
				sItem += sSubItem;
			}
		}
		
		// 2017.6.22 - 成大 流程
		sSubItem = '';

        // 2023.4.20 - Eric: Quick-fix columns mis-match!
        if (!that.narrowWindow) {
            if (doc.signType==='P' || doc.signType==='E')  {
                if (isDraft) {
                    sSubItem = '<td data-prop="docProc" class="docProc"></td>';
                }
                else {
                    sSubItem = '<td data-prop="docProc" class="docProc"><span class="url_link">[開啟]</span></td>';
                }
            }
        }
		if (sSubItem.length) {
			sItem += sSubItem;
		}

		// 送方傳送時間
		// => <td>06/07 15:20</td> <!-- new time -->
		// 2021.7 - 1100854 Eric
		if (SSO_CONFIG.OrgNickName=="NUK" && typeof doc.fullNewTime=='string' && doc.fullNewTime.length==13) {
			var sDate = doc.fullNewTime.substring(0, 3) + '/'  + 
						doc.fullNewTime.substring(3, 5) + '/' +
			            doc.fullNewTime.substring(5, 7);
			var sTime = doc.fullNewTime.substring(7, 9) + ':' +
						doc.fullNewTime.substring(9, 11)+ ':' +
						doc.fullNewTime.substring(11, 13);
			//2016.12.9	Leslie	增加隱藏欄位以隔絕辦理期限與文號，避免連續數字被誤判
			sDate = '<span style="display:none">€</span>' + theSSO.Util.htmlEncode(sDate);
			sSubItem = '<td class="newTime" data-prop="newTime" style="font-size:smaller"><p style="nowrap:none;">' + sDate + '</p>' +
						'<p style="nowrap:none;">' + theSSO.Util.htmlEncode(sTime) + '</p></td>';
		}
		else if (doc.newTime.length==11)	{
			if (SSO_CONFIG.OrgNickName=="NUK") {
				var sDate = doc.newTime.substring(0, 3) + '/' +
						   	doc.newTime.substring(3, 5) + '/' +
							doc.newTime.substring(5, 7) + ' ';
				var sTime = doc.newTime.substring(7, 9) + ':' +
							doc.newTime.substring(9, 11)+ ':' +
							'00';
				//2016.12.9	Leslie	增加隱藏欄位以隔絕辦理期限與文號，避免連續數字被誤判
				sDate = '<span style="display:none">€</span>' + theSSO.Util.htmlEncode(sDate);
				sSubItem = '<td class="newTime" data-prop="newTime" style="font-size:smaller"><p style="nowrap:none;">' + sDate + '</p>' +
							'<p style="nowrap:none;">' + theSSO.Util.htmlEncode(sTime) + '</p></td>';
			}
			else {
				sDate = doc.newTime.substring(3, 5) + '/' +
							doc.newTime.substring(5, 7) + ' ';
				sTime = doc.newTime.substring(7, 9) + ':' +
							doc.newTime.substring(9, 11);
				//2016.12.9	Leslie	增加隱藏欄位以隔絕辦理期限與文號，避免連續數字被誤判
				sDate = '<span style="display:none">€</span>' + theSSO.Util.htmlEncode(sDate);
				sSubItem = '<td class="newTime" data-prop="newTime"><p style="nowrap:none;">' + sDate + '</p>' +
						'<p style="nowrap:none;">' + theSSO.Util.htmlEncode(sTime) + '</p></td>';
			}
		}
		else {
			sSubItem = '<td class="newTime" data-prop="newTime"></td>';
		}
		if (sSubItem.length) {
			sItem += sSubItem;
		}

		// 2018.09.28 – 1070955 [目前位置]
		if (!that.shouldHideLights() && !that.narrowWindow && that.showCurrLoc) {
			sSubItem = '';
			sSubItem = '<td class="to_e" data-prop="currLocate">' + theSSO.Util.htmlEncode(doc.currLocate) + '</td>';
			if (sSubItem.length) {
				sItem += sSubItem;
			}
		}

		//sItem += '</tr>';
		sItem += '<td style="display:none">§</td></tr>';	//2016.12.6	Leslie	新增隱藏欄位，用於增進MP畫面搜尋效能
		return {'light': light, sDOMElem: sItem};
	};

	// 2018.9.27 - 1070955 - 可調整ToDoList欄位
	function _getColumnIndex($headTable, fieldName) {
		if (typeof fieldName!=='string' || fieldName.length===0) {
			return -1;
		}

		var $TH = $headTable.find('thead > tr > th');
		var i=0, cnt = $TH.length, $th=null, name='';
		for (i=0; i<cnt; i++) {
			$th = $($TH[i]);
			name = $th.attr('data-prop');
			if (name==fieldName)
				return i;
		}
		return -1;
	}

	// 2018.9.27 - 1070955 - 可調整ToDoList欄位
	function _isColumnVisible($col) {
		var display = window.getComputedStyle($col[0], null).getPropertyValue('display');
		if (display==='none') {
			return false;
		}
		return true;
	}

	// 2018.9.27 - 1070955, 調整table之水平scrollbar顯示!
	function _updateSuperTableHScroll($listPane) {
		var $cols_data = $listPane.find('.sData table > colgroup > col');
		var w_tb_total = 0;
		var $col = null;
		for(i=0; i<$cols_data.length; i++) {
			$col = $($cols_data[i]);
			if (_isColumnVisible($col)) { // 隱藏欄位忽略不計
				w_tb_total += parseInt($col.attr('width'));
			}
		}
		var $sData = $listPane.find('.sData');
		var wCntr = $sData.closest('.todolist_container').width();
		var w_lsCntr = $listPane.find('.sBase').width();
		//1110330	Leslie	取消寬度計算(未顯示時=0)
		//$sData.css({width: wCntr + 'px'});
		if (w_tb_total>w_lsCntr) {
			$sData.addClass('showExtraContent');
		}
		else {
			$sData.removeClass('showExtraContent');
		}
	}

	// 2018.9.27 - 1070955, (1)調整ToDolist顯示欄位 (2)顯示指定文件夾時, 新增[目前位置]欄位; 顯示其餘文件夾(含全部)時隱藏該欄位
	function _adjustFolderField(folder) {
		var $headTable = $('#listPane #todolist_cntr .sHeader table');
		var $dataTable = $('#listPane #todolist_cntr .sData table');
		//var $HTheader = $headTable.find('thead');
		var $headColGrp = $headTable.find('colgroup');
		var $dataColGrp = $dataTable.find('colgroup');
		//var $headTHead = $headTable.find('thead');

		// 處理字型異動
		var $tdFldr = $dataTable.find('tbody > tr > td').first();

		// 若文件夾無待辦時, $tdFldr為空字串!
		var fontSize = '';
		if ($tdFldr.length) {
			fontSize = window.getComputedStyle($tdFldr[0], null).getPropertyValue('font-size');
		}
		else {
			// 計算目前之 fontSize(px), window width<=1024 => 1em, >1024 => 1.2em
			var win_w = window.innerWidth;
			if (win_w<=1024) {
				fontSize = '' + SSOUtil.getEMSize($dataColGrp[0]) + 'px';
			}
			else {
				fontSize = '' + (SSOUtil.getEMSize($dataColGrp[0]) * 1.2) + 'px';
			}
		}

		var idxCurrLoc = -1, idxSubject = -1;
		idxCurrLoc = _getColumnIndex($headTable, 'currLocate');
		idxSubject = _getColumnIndex($headTable, 'subject');
		var currLoc_w='', nCurrLoc_w = -1;
		var currLocColVisible = true;
		if (idxCurrLoc>=0 && idxSubject>=0) { // 有[目前位置]夾及主旨欄位...
			currLoc_w = $($headColGrp.find('col')[idxCurrLoc]).attr('width');
			nCurrLoc_w = parseInt(currLoc_w);
			currLocColVisible = _isColumnVisible($($headColGrp.find('col')[idxCurrLoc]));
		
			// 若folder/subfolder設定不顯示[目前位置], 則應隱藏[目前位置]欄位
			var showCurrLoc = false;
			sShowCurrLocFolder = theSSO.MP.todolist.builder.getShowCurrLocFolder();
			if (folder.length && sShowCurrLocFolder.length) {
				if (folder==sShowCurrLocFolder) {
					showCurrLoc = true;
				}
			}
			//1110927	Leslie[1110889]	使用客製化欄位，且設定要顯示目前位置時，一律顯示白燈
			if(theSSO.MP.todolist.builder.showCurrLocateAlways())
				showCurrLoc = true;

			if (!showCurrLoc) {
				// 記錄目前數值
				var subject_w = $($headColGrp.find('col')[idxSubject]).attr('width');
				
				// 隱藏colgroup文件夾對應項目
				$($headColGrp.find('col')[idxCurrLoc]).hide();
				$($dataColGrp.find('col')[idxCurrLoc]).hide();

				// 文件夾由[全部]切換到指定時
				if (currLocColVisible) {
					$headTable.data('currLocW', currLoc_w);
					$headTable.data('subjW', subject_w);

					// 2018.2.6 - NCKU107202
					if (fontSize.length) {
						$headTable.data('fontsize', fontSize+'');
					}

					var newSubject_w = (parseInt(subject_w) + nCurrLoc_w) - 0.1;
					$($headColGrp.find('col')[idxSubject]).attr('width', '' + newSubject_w);
					$($dataColGrp.find('col')[idxSubject]).attr('width', '' + newSubject_w);
				}

				// 隱藏head/data Table內Header[目前位置]欄位
				$headTable.find('thead > tr > th').filter(function(){
					return $(this).attr('data-prop')==='currLocate';
				}).hide();
				$dataTable.find('thead > tr > th').filter(function(){
					return $(this).attr('data-prop')==='currLocate';
				}).hide();

				// 隱藏[文件夾]欄位
				var $td_currLoc = $dataTable.find('tbody > tr > td').filter(function(){
					return $(this).attr('data-prop')==='currLocate';
				});
				$td_currLoc.hide();
			}
			else { // 切換到顯示[目前位置]之文件夾
				if (!currLocColVisible) {
					var oldFontSize = $headTable.data('fontsize');
					var newSubject_w = $headTable.data('subjW');
					if (oldFontSize!==fontSize) {
						// 字型已異動, 重新計算寬度
						var wTablePane = $('#listPane #todolist_cntr .sData').width(); // table pane 寬度
						var wTable = $('#listPane #todolist_cntr .sData table').width(); // talbe寬度
						var wCurSubject = parseInt($($headColGrp.find('col')[idxSubject]).attr('width')); // 目前subject寬度
						var wTotal = wTable - wCurSubject;
						var wNewCurrLoc = SSOUtil.getEMSize($tdFldr[0]) * 4.2; // 文字夾寬度為4.2em
						var newSubject_w = wTotal - wNewCurrLoc;

						$($headColGrp.find('col')[idxCurrLoc]).attr('width', '' + wNewCurrLoc);
						$($dataColGrp.find('col')[idxCurrLoc]).attr('width', '' + wNewCurrLoc);
						$($headColGrp.find('col')[idxSubject]).attr('width', '' + newSubject_w);
						$($dataColGrp.find('col')[idxSubject]).attr('width', '' + newSubject_w);
					}
					else if (typeof newSubject_w=='string' && newSubject_w.length) {
						// 字型未異動, 直接套用原儲存值!
						$($headColGrp.find('col')[idxSubject]).attr('width', '' + newSubject_w);
						$($dataColGrp.find('col')[idxSubject]).attr('width', '' + newSubject_w);
					}
				}

				// 重新顯示colgroup文件夾對應項目
				$($headColGrp.find('col')[idxCurrLoc]).show();
				$($dataColGrp.find('col')[idxCurrLoc]).show();

				// 顯示head/data Table內Header[目前位置]欄位
				$headTable.find('thead > tr > th').filter(function(){
					return $(this).attr('data-prop')==='currLocate';
				}).show();
				$dataTable.find('thead > tr > th').filter(function(){
					return $(this).attr('data-prop')==='currLocate';
				}).show();

				// 顯示[文件夾]欄位
				var $td_currLoc = $dataTable.find('tbody > tr > td').filter(function(){
					return $(this).attr('data-prop')==='currLocate';
				});
				$td_currLoc.show();
			}
		}
	}
	
	/* cntrId: container's id (<ul>)
	 * listId: 未使用??
	 * folder: 只列出指定公文夾內之公文.
	 * sortBy: 排序方式(尚未實作!)
	*/
	var _makeToDoList_List_DOM = function(cntrId, folder, listId, sortBy, active_role) {
		theLogger.log('-I- _makeToDoList_List_DOM() cntrId=' + cntrId + '.');
		
		// 2016.7 - 登記桌可隱藏燈號欄位

        // 2023.4.17 - 1120067 Eric, 若activeRole為代理, 則只顯示該被代理人的公文
        let _display_doc_list = _doclist;
        if (typeof active_role!='undefined' && active_role!=null && active_role.proxyAccount.length) {
            _display_doc_list = _getProxyRoleDocList(active_role);
        }
				
		if (typeof _display_doc_list === 'undefined' || _display_doc_list===null) {
			theLogger.error('Error! _makeToDoList_List_DOM() _display_doc_list un-initialized!');
			return '';
		}
		
		if (typeof cntrId==='undefined' || cntrId===null) {
			theLogger.error('Error! _makeToDoList_List_DOM() cntrId is invalid!');
			return '';
		}
		
		if (typeof listId==='undefined' || listId===null) {
			theLogger.error('Error! _makeToDoList_List_DOM() listId is invalid!');
			return '';
		}
		
		// 移除現有的
		var oldlist = $('#' + cntrId);
		if (oldlist.children('tr').length>0) {
			oldlist.empty();
		}
		
		// 2014.1 - 記錄container Id
		that.listCntrId = cntrId;
		
		// 2016.12.8 - 若為重取, 則全部加入
		var superTableExist = false;
		if ($('#listPane .sData #' + cntrId).length) {
			superTableExist = true;
		}
		
		// 2011.11.14
		that.lights.total = 0; // 2012.1.30
		that.lights.red = that.lights.yellow = that.lights.white = 0;
		that.lights.green = that.lights.purple = 0;
		var ligth = '';
		
		var list = null; // <ul> element to be created!
		var doclist = null;
		var doc = null;
		var msgId = '';
		var cnt = 0;
				
		var docCnt = _display_doc_list.length;

		var newItem=null;
		var i=0;
		var tmpFolder='';
		var createItem = false;
		var itemIndex = 0;
		
		var sTableItems = '';
		var sTableItemParts = '';
		var partCnt = 50; // 取前50筆
		var cntThreshold = 500; // 超過500筆才啟用以前50筆初始化supertable/tablesorter元件功能!
		
		// 2019.6.11 - 1080412, Eric Peng
		let sRRBGrayColorFolders = theSSO.User.EnvSettings.get('MP_DOC_COLOR_BY_FOLDER');
		let rrbGrayColorFolders = [];
		if (typeof sRRBGrayColorFolders=='string' && sRRBGrayColorFolders.length) {
			rrbGrayColorFolders = sRRBGrayColorFolders.split(';');
		}
		if (SSOUtil.typeOf(rrbGrayColorFolders)!='array' || rrbGrayColorFolders==null || rrbGrayColorFolders.length==0) {
			rrbGrayColorFolders = [];
		}
		
		//1110926	Leslie[1110889]	新增客製化欄位設定功能
		var bEnableCustomTodo = false;
		if('CustomSet' in theCustom && 'CustomTodoSet' in theCustom.CustomSet && Array.isArray(theCustom.CustomSet.CustomTodoSet)){
			bEnableCustomTodo = true;
			_customTodo.colorDocNo = false;
			if (that.shouldShowResupply() && that.shouldHideLights())
				_customTodo.colorDocNo = true;
			_customTodo.rrbGrayColorFolders = rrbGrayColorFolders;
		}

		if (!!sortBy && sortBy.length>0) {
			doclist = [];
			
			// 先排序, 再產生 item
			for(i=0; i<docCnt; i++) {
				newItem = null;
				doc = _display_doc_list[i];
				createItem = false;
				if (doc.signType=="P" || doc.signType=="E" || doc.signType=="W")
				{
					if (typeof folder=='string' && (folder.length>0))
					{
						// 2014.1 - 代理公文處理
						// 只列出指定FOLDER-SUBFOLDER下的公文'
						tmpFolder = _getFolderString(doc);
												
						if (!tmpFolder || tmpFolder.length===0) {
							theLogger.warn('cannot get folderstring, DocNo=' + doc.docNo + ', MsgId=' + doc.msgId);
						}
						
						//1120502	Leslie[1120007]	[屏東]調整公文夾顯示方式為二階層顯示
						// if (tmpFolder===folder) {
						if (tmpFolder===folder || (folder.indexOf('-') < 0 && tmpFolder.startsWith(folder))) {
							createItem = true;
						}
					}
					else if (doc.submitProcessing) {
						createItem = false;
					}
					else { // 未指定FOLDER-SUBFOLDER -> 列出全部
						createItem = true;
					}
				}
				
				if (createItem) {
					doclist.push(doc);	
				}
			}
			
			// sort raw item list here...
			if (doclist.length>0) {
				// 先用文號排序後再以燈號排序...
				if (typeof _sortfunc.sort_light!=='undefined') {
					doclist.sort(_sortfunc.sort_light);
				}
			}
			
			var sToDoElem = '', sItemElem='';
			
			//1120927	Leslie[1111383]	客委會增加客製化功能：燈號統計排除重覆公文
			var bDistinctDoc = theCustom.getCustomSet('DistinctMPLight')||false;
			var arDoc = {
				'red'   :[],
				'yellow':[],
				'green' :[],
				'purple':[]
			}
						
			itemIndex = 0;
			var sTableContent = '';
			for(i=0, j=doclist.length; i<j; i++) {
				newItem = null;
				doc = doclist[i];
				
				if (doc.submitProcessing)
					continue;
				
				// newItem = _self._createNewItem_List3(doc, itemIndex);
				//1110926	Leslie[1110889]	新增客製化欄位設定功能
				//newItem = _self._createNewItem_List_DOMStr(doc, itemIndex, rrbGrayColorFolders);
				newItem = _self._createNewItem_List_DOMStr(doc, itemIndex, rrbGrayColorFolders, bEnableCustomTodo);
				if (!!newItem) {
					//1120927	Leslie[1111383]	客委會增加客製化功能：燈號統計排除重覆公文
					if(bDistinctDoc && newItem.light != 'white'){
						if(arDoc[newItem.light].indexOf(doc.docNo) < 0){
							arDoc[newItem.light].push(doc.docNo);
							_count_lights(newItem.light);
						}
						else if(doc.signType == 'W')
							_count_lights(newItem.light);
					}
					else
					_count_lights(newItem.light);
					sTableContent += newItem.sDOMElem;
					
					if (i<partCnt) {
						sTableItemParts += newItem.sDOMElem;
					}
				}
				itemIndex++;
			}
		}
		else { // 毋須排序 -> 依清單順序
		
			//1120927	Leslie[1111383]	客委會增加客製化功能：燈號統計排除重覆公文
			var bDistinctDoc = theCustom.getCustomSet('DistinctMPLight')||false;
			var arDoc = {
				'red'   :[],
				'yellow':[],
				'green' :[],
				'purple':[]
			}
		
			for(i=0; i<docCnt; i++) {
				newItem = null;
				doc = _display_doc_list[i];
				createItem = false;
				/* 2015.1 - Eric Peng, 加入SignType='W'項目 */
				if (doc.signType==='P' || doc.signType==='E' || doc.signType==='W') {
					if (folder!==undefined && (folder.length>0)) {
						// 2014.1 - 代理公文處理
						// 只列出指定FOLDER-SUBFOLDER下的公文
						tmpFolder = _getFolderString(doc);
												
						if (!tmpFolder || tmpFolder.length===0) {
							theLogger.warn('cannot get folderstring, DocNo=' + doc.docNo + ', MsgId=' + doc.msgId);
						}
						
						//1120502	Leslie[1120007]	[屏東]調整公文夾顯示方式為二階層顯示
						// if (tmpFolder===folder) {
						if (tmpFolder===folder || (folder.indexOf('-') < 0 && tmpFolder.startsWith(folder))) {
							createItem = true;
						}
					}
					else if (doc.submitProcessing) {
						createItem = false;
					}
					else { // 未指定FOLDER-SUBFOLDER -> 列出全部
						createItem = true;
					}
				}
				
				newItem = null;
				if (createItem) {
					//newItem = _self._createNewItem_List3(doc, itemIndex);
					//1110926	Leslie[1110889]	新增客製化欄位設定功能
					// newItem = _self._createNewItem_List_DOMStr(doc, itemIndex, rrbGrayColorFolders);
					newItem = _self._createNewItem_List_DOMStr(doc, itemIndex, rrbGrayColorFolders, bEnableCustomTodo);
					if (!!newItem) {
						//1120927	Leslie[1111383]	客委會增加客製化功能：燈號統計排除重覆公文
						if(bDistinctDoc && newItem.light != 'white'){
							if(arDoc[newItem.light].indexOf(doc.docNo) < 0){
								arDoc[newItem.light].push(doc.docNo);
								_count_lights(newItem.light);
							}
							else if(doc.signType == 'W')
								_count_lights(newItem.light);
						}
						else
						// 2011.11.14 - light counts
						_count_lights(newItem.light);
					}
					itemIndex++;
				}
				
				if (!!newItem) {
					sTableItems += newItem.sDOMElem;
					
					if (itemIndex<partCnt) {
						sTableItemParts += newItem.sDOMElem;
					}
				}
			}
		}
		
		var $tbody = superTableExist ? $('#listPane .sData #todolist_tb tbody') : $('#listPane #todolist_tb tbody'); // 2016.12.8
		if ($tbody.length) {
			if (!superTableExist && (itemIndex>cntThreshold)) {
				if (typeof _disableFastInit==='boolean' && _disableFastInit===true) {
					$tbody[0].innerHTML = sTableItems;
					theLogger.log('-tm- init tdlTable using [FULL] content...');
				}
				else {
					$tbody[0].innerHTML =  sTableItemParts;
					theLogger.log('-tm- init tdlTable using [PART] content...');
				}
			}
			else {
				$tbody[0].innerHTML = sTableItems;
				theLogger.log('-tm- init tdlTable using [FULL] content...');
			}
		}
		
		// 2018.10.09 - 1070955, 顯示特定文件夾時, 新增[目前位置]欄位
		if (superTableExist) {
			_adjustFolderField(folder);
			var $listPane = $('#tdlPane #listPane'); 
			_updateSuperTableHScroll($listPane);
		}

		_setupContextMenu('context-menu-todo');
		
		var id = $('#' + cntrId + ' ul').attr('id');
		theLogger.log('container\'s id=' + id);
		
		return {'full': sTableItems, 'part': ((typeof _disableFastInit!=='boolean' || _disableFastInit!==true) && (itemIndex>cntThreshold))?sTableItemParts:''};
	};
	
	var _getUnreadDocCount = function(docList, excludeFolders) {
		var cnt = docList.length;
		var unread = 0;
		var excludeFolder='', docFolder='';
		for(var i=0; i<cnt; i++)
		{
			var doc = docList[i];
			//1080516 David 1080371 草稿一律視為已閱讀
			if(doc.isDraft)
				continue;
			var signTime = doc.signTime;
			if (signTime==undefined || signTime.length==0)
			{
				if (!!excludeFolders && excludeFolders.length)
				{
					var exclude = false;//1081118 David 1080997 補上宣告
					docFolder = doc.folder + '-' + doc.subfolder;
					for(var j=0; j<excludeFolders.length; j++) {
						excludeFolder = excludeFolders[j];
						if (excludeFolder.length && (docFolder==excludeFolder)) {
							exclude = true;
							break;
						}
					}
					
					if(!exclude) unread++;
				}
				else {
					unread++;
				}
			}
		}
		
		return unread;
	};
	
	function _sortFolderDoc(_docList) {
		function _sortDocBySpeed(_docSubList) {
			var sortedDocs = [];
			var _cnt = _docSubList.length;
			var _doc = null;
			var _vu=[], _u=[], _n=[], _other=[]; // 最速, 速, 普通
			for(var i=0; i<_cnt; i++) {
				_doc = _docSubList[i];
				switch(_doc.speed) {
				case '3': _vu.push(_doc); break;
				case '2': _u.push(_doc); break;
				case '1': _n.push(_doc); break;
				default: _other.push(_doc); break;
				}
			}
			var _section = [];
			if (_vu.length) {
				sortedDocs = sortedDocs.concat(_vu);
			}
			if (_u.length) {
				sortedDocs = sortedDocs.concat(_u);
			}
			if (_n.length) {
				sortedDocs = sortedDocs.concat(_n);
			}
			if (_other.length) {
				sortedDocs = sortedDocs.concat(_other);
			}
			return sortedDocs;	
		}
		
		var sortedDocs = [];
		var _cnt = _docList.length;
		var _doc = null, _light=null;
		var _red=[], _yellow=[], _green=[];
		var _purple=[], _white=[], _other=[];
		
		for(var i=0; i<_cnt; i++) {
			_doc = _docList[i];
			if (!!_doc) {
				_light = _getLightInfo(_doc);
				if (!!_light) {
					switch(_light.light) {
					case 'red': _red.push(_doc); break;
					case 'yellow': _yellow.push(_doc); break;
					case 'green': _green.push(_doc); break;
					case 'purple': _purple.push(_doc); break;
					case 'white': _white.push(_doc); break;
					default: _other.push(_doc);
					}
				}
				else {
					_other.push(_doc);
				}
			}
		}
		
		var _section = [];
		if (_red.length) {
			_section = _sortDocBySpeed(_red);
			sortedDocs = sortedDocs.concat(_section);
		}
		if (_yellow.length) {
			_section = _sortDocBySpeed(_yellow);
			sortedDocs = sortedDocs.concat(_section);
		}
		if (_green.length) {
			_section = _sortDocBySpeed(_green);
			sortedDocs = sortedDocs.concat(_section);
		}
		if (_purple.length) {
			_section = _sortDocBySpeed(_purple);
			sortedDocs = sortedDocs.concat(_section);
		}
		if (_white.length) {
			_section = _sortDocBySpeed(_white);
			sortedDocs = sortedDocs.concat(_section);
		}
		if (_other.length) {
			_section = _sortDocBySpeed(_other);
			sortedDocs = sortedDocs.concat(_section);
		}
		return sortedDocs;
	}
	
	// 2019.6.11 - 1080412, Eric Peng
	function _buildIconFolder(sfoldername, folderObj, $container, idx, rrbGrayColor) {
		/* add header for specific folder
		* <li id="fldr_0" data-folder="folder-subfolder">
		*  <div>
		*    <p style="position:relative;">
		*      主辦-待處理
		*    </p>
		*    <div class="folioList" id="fldr_items_xxx"> // 2017.9.26 - NCKU10609079, 成大代理人創稿失敗問題修正. (圖示模式新增文件夾作業異常造成!)
		*      <div> // for iScroll
		*        <ul>
		*/
	   
		// 2019.6.11 - 1080412, Eric Peng
		rrbGrayColor = (typeof rrbGrayColor=='boolean')?rrbGrayColor:false;

		var $folder = null, $title = null, $folioList=null, $inside=null, $list=null;
		var unreadCnt = 0;
		var sBackBtn = '';
		$folder = $('<li><div></div></li>').attr('id', 'fldr_' + theSSO.Util.htmlEncode(idx.toString())).attr('data-folder', theSSO.Util.htmlEncode(sfoldername));
		if (folderObj.proxyFolder) {
			$folder.addClass('proxyFolder');
		}
	   
		/* title
		* count: <span class="folder_title_btn_l" data-link="0"></span>
		*        <span class="ui-btn-up-c ui-count ui-btn-corner-all">6</span>
		*        $FOLDER$-$SUBFOLDER$
		*        <span class="unreadCount">
		*          <img alt="未閱讀" src="./IMAGE/ART/Todo-ReadNon.png"/>
		*          <span> 3</span>
		*          </span>
		*        <span class="folder_title_btn_r" data-link="2"></span>
		*/
	   
		// Back/Forward button
		sBackBtn = '';
		//if (idx>0) {
		//	sBackBtn = '<span class="folder_title_btn_l" data-link="' + (idx-1) + '"></span>';
		//}
		$title = $('<p>' + sBackBtn + sfoldername + '</p>').appendTo($folder.children('div'));
		if (folderObj.proxyFolder) {
			// 2106.9.6 - 依MPUiSetting.xml設定的顏色值
			var folderSetting = theSSO.MP.todolist.builder.getProxyFolderSetting(sfoldername, true);
			if (folderSetting!==null) {
				if (typeof folderSetting.proxySetting.folderItemStyle.font.color=='object' &&
					typeof folderSetting.proxySetting.folderItemStyle.font.color.code=='string') {
					var clrCode = folderSetting.proxySetting.folderItemStyle.font.color.code;
					if (clrCode.length) {
						$title.css('color', theSSO.Util.htmlEncode(clrCode));
					}
				}
			}
		}
		$('<span>' + theSSO.Util.htmlEncode(folderObj.cnt.toString()) + '</span>').attr('class', 'ui-btn-up-c ui-count ui-btn-corner-all').appendTo($title);
		//if (idx<(groupCnt-1)) {
			//$('<span></span>').attr({'class':'folder_title_btn_r', 'data-link':idx+1}).appendTo($title);
		//}
	   
		// 未閱讀公文數?
		unreadCnt = _getUnreadDocCount(folderObj.docs);
		if (unreadCnt>0) {
			$('<span></span>')
				.addClass('unreadCount')
				.append('<img alt="未閱讀" src="./IMAGE/ART/Todo-ReadNon.png" />')
				.append('<span> ' + theSSO.Util.htmlEncode(unreadCnt.toString()) + '</span>')
				.appendTo($title);
		}
	   
		$container.append($folder); 
	   
		$folioList = $('<div></div>').attr('class', 'folioList');
		$folioList.attr('id', 'fldr_items_' + theSSO.Util.htmlEncode(idx.toString())); // 2017.9.26 - NCKU10609079, 成大代理人創稿失敗問題修正. (圖示模式新增文件夾作業異常造成!)
		$inside = $('<div class="folioListContent"></div>').appendTo($folioList); // 2016.824
		$list = $('<ul></ul>');

		// 2021.3.29 - 1100356, 測iPad超出2K筆待辦!
		//let sValue = localStorage._dev_testlonglist;
		let sValue = '';
		//if (sfoldername=='待處理-主辦' && location.href.indexOf('docvip.fdat.com.tw')!=-1 && (theSSO.User.account=='ERIC' || theSSO.User.account=='TSENG'))
		//	sValue = '2500';

		let makeLongListCount = 0;
		if (typeof sValue=='string' && sValue.length) {
			makeLongListCount = parseInt(sValue, 10);
			if (isNaN(makeLongListCount)) {
				makeLongListCount = 0;
			}
		}

		// add docs
		var sortedDocs = _sortFolderDoc(folderObj.docs);
		_cnt = sortedDocs.length;

		// 2021.3.29 - 1100356 Eric, 測iPad公文數超出2.5K
		let cntRepeat = 1, cntCreated = 0;
		if (makeLongListCount>sortedDocs.length) {
			cntRepeat = Math.trunc(makeLongListCount/sortedDocs.length) + 1;
		}

		for(var j=0; j<_cnt; j++) {
			newItem = _self._createNewItem_Icon(sortedDocs[j], rrbGrayColor); // 2019.6.11 - Eric Peng - 1080412
			$list.append(newItem);
			cntCreated+=1;
		}

		if (cntRepeat>1) {
			let x=1, y=0
			for(x=1; x<cntRepeat; x++) {
				for(y=0; y<_cnt; y++) {
					newItem = _self._createNewItem_Icon(sortedDocs[y], rrbGrayColor); // 2019.6.11 - Eric Peng - 1080412
					$list.append(newItem);
					cntCreated+=1;
				}	
			}
			alert('公文夾:' + sfoldername + ', create repeat items count=' + cntCreated);
		}
	   
		$list.appendTo($inside);
		$folder.children('div').append($folioList);
		return $folder;
	}
	/*
	 * cntrId: container's id (<ul>) [todolist_icon_cntr]
	 * sortBy: 排序方式(尚未實作!)
	 */
	var _makeToDoList_Icon = function(cntrId, sortBy) {
		theLogger.log('-I- _makeToDoList_Icon() cntrId=' + cntrId + '.');
		
		/*
		 * <ul class="folderList">
		 *	<li id="fldr_0" data-folder="folder-subfolder">
		 *	  <div>
		 *		<p style="position:relative;">
		 *		  主辦-待處理
		 *	  	  <span class="ui-btn-up-c ui-count ui-btn-corner-all">6</span>
		 *		  <span class="unreadCount"><img alt="未閱讀" style="width:15px; height:10px;" src="./IMAGE/ART/Todo-ReadNon.png"/> 3</span>
		 *		  <span class="folder_title_btn_r" data-link="1"></span>
		 *		</p>
		 *	    <div class="folioList">
		 *	      <div>
		 *		    <ul>
		 */
								  
		if (SSOUtil.typeOf(_doclist)!=='array' || _doclist===null) {
			theLogger.error('Error! _makeToDoList_Icon() _docList un-initialized!');
			return;
		}
		
		if (typeof cntrId!=='string' || cntrId.length===0) {
			theLogger.error('Error! _makeToDoList_Icon() cntrId is invalid!');
			return;
		}
		
		var $container = $('#' + cntrId);
		if ($container.length===0) {
			theLogger.error('Error! _makeToDoList_Icon() cntrId is invalid! [not found!]');
			return;
		}
		
		// 移除現有的
		var $targetlist = $('#' + cntrId + ' > ul');
		if ($targetlist.children('li').length>0) {
			$targetlist.empty();
		}
		
		// 2014.1 - 記錄container Id
		that.iconCntrId = cntrId;
		
		var list = null; // <ul> element to be created!
		var doclist = null;
		var folderList = {};
		var groupCnt = 0;
		var foldernameList = [];
		var folderStr = '';
		
		var doc = null;
		var msgId = '';
		var cnt = 0;
				
		var docCnt = _doclist.length;

		var newItem=null;
		
		// 依公文夾分類
		var i=0, j=0, _cnt=0;
		var obj = null;

		// 2019.6.11 - 1080412, Eric Peng
		let sRRBGrayColorFolders = theSSO.User.EnvSettings.get('MP_DOC_COLOR_BY_FOLDER');
		let rrbGrayColorFolders = [];
		if (typeof sRRBGrayColorFolders=='string' && sRRBGrayColorFolders.length) {
			rrbGrayColorFolders = sRRBGrayColorFolders.split(';');
		}
		if (SSOUtil.typeOf(rrbGrayColorFolders)!='array' || rrbGrayColorFolders==null || rrbGrayColorFolders.length==0) {
			rrbGrayColorFolders = [];
		}

		for(i=0; i<docCnt; i++)
		{
			doc = _doclist[i];
			
			// 2014.10 - 去除伺服器處理中項目!
			if (doc.submitProcessing) {
				continue;
			}
			
			// 2014.1 - 處理代理公文
			var isProxy = (doc.ODWMSG.IS_PROXY_DOC==='1') ? true : false;
			folderStr = _getFolderString(doc);
				
			if (folderStr.length)
			{
				try {
					obj = folderList[folderStr];
					if (typeof obj!=='undefined' && obj!==null && obj.cnt>=1) {
						obj.cnt += 1;
						obj.docs.push(doc);
					}
					else {
						folderList[folderStr] = { cnt:1, docs:[], proxyFolder:isProxy};
						folderList[folderStr].docs.push(doc);
					}
				}
				catch(err) {
					theLogger.error('Error:' + err.description + '\n');
				}
			}
		}
		
		// 2019.6.11 - 1080413, Eric Peng - 鐵道圖示模式公文夾順序調整為與列表模式一致!
		/*for(var x in folderList) {
			if (!folderList.hasOwnProperty(x)) continue;
			foldernameList.push(x);
		}*/
		var tdlBuilder = theSSO.MP.todolist.builder;
		var folderInfoList = tdlBuilder.getFolderInfoList(false);
		for(i=0; i<folderInfoList.length; i++) {
			foldernameList.push(folderInfoList[i].name);
		}
	
		var folder = null;
		var sfoldername = '';
		var $folder = null, $title = null, $folioList=null, $inside=null, $list=null;
		var unreadCnt = 0;
		var sBackBtn = '';
		groupCnt = foldernameList.length;
		for(i=0; i<groupCnt; i++)
		{
			sfoldername = foldernameList[i];
			theLogger.log('folder:' + sfoldername + ', doc cnt=' + folderList[sfoldername].cnt + '\n');
			try {
				folder = folderList[sfoldername];

				if (sfoldername.indexOf('待處理-展期申請待核示')!==-1) {
					console.log('-I- gonna process the folder...');
				}

				let rrbGrayColor = false;
				if (SSOUtil.typeOf(rrbGrayColorFolders)=='array' && rrbGrayColorFolders.length && rrbGrayColorFolders.indexOf(sfoldername)!=-1) {
					rrbGrayColor = true;
				}
				_buildIconFolder(sfoldername, folder, $targetlist, i, rrbGrayColor);
			}
			catch(err) {
				theLogger.error('Error! procesd IconFolder' + sfoldername + ' failed. ErrMsg=' + err.message + '\n');
			}
		}
		
		that.folderCount = groupCnt;
		
		_setupContextMenu('context-menu-todo');
		
		var id = $('#' + cntrId ).attr('id');
		theLogger.log('container\'s id=' + id);
	};
	
	// 2011.11.10
	var _makeToDoList_SearchList = function(cntrId, folder) {
		theLogger.log('-I- _makeToDoList_SearchList() cntrId=' + cntrId + '.');
		
		// 2014.1 - 記錄container Id
		that.searchListCntrId = cntrId;
		
		var $cntr = $('#'+ cntrId);
		var docCnt = _doclist.length;
		var addAll = (folder===that._nofilterfoldername || folder==='') ? true : false;
		var add = false;
		
		var i=0, cnt=0;
		var $item = null;

		// 2019.6.11 - 1080412, Eric Peng
		let sRRBGrayColorFolders = theSSO.User.EnvSettings.get('MP_DOC_COLOR_BY_FOLDER');
		let rrbGrayColorFolders = [];
		if (typeof sRRBGrayColorFolders=='string' && sRRBGrayColorFolders.length) {
			rrbGrayColorFolders = sRRBGrayColorFolders.split(';');
		}
		if (SSOUtil.typeOf(rrbGrayColorFolders)!='array' || rrbGrayColorFolders==null || rrbGrayColorFolders.length==0) {
			rrbGrayColorFolders = [];
		}
		
		var _theDocList = [];
		for(i=0; i<docCnt; i++)
		{
			doc = _doclist[i];
			
			if (doc.submitProcessing) {
				continue;
			}
			
			// 2012.2.1 - reset add flag
			add = false;

			if (!addAll) {
				fldr = _getFolderString(doc); // 2016.10.14 - doc.folder + '-' + doc.subfolder;
				
				//1120502	Leslie[1120007]	[屏東]調整公文夾顯示方式為二階層顯示
				// if (fldr === folder) {
				if (fldr === folder || (folder.indexOf('-') < 0 && fldr.startsWith(folder))) {
					add = true;
				}
			}
			
			if (add || addAll)
			{
				_theDocList.push(doc);
				/*$item = _createNewItem_Icon(doc);
				if (!!$item)
				{
					if (cnt==0) {
						// 設定上邊框
						$item.addClass('ui-corner-top');
					}
					$cntr.append($item);
					cnt++;
				}*/
			}
		}
		
		var sortedDocList = _sortFolderDoc(_theDocList);

		// 2021.3.29 - 1100356, 測iPad超出2K筆待辦!
		//let sValue = localStorage._dev_testlonglist;
		let sValue = '';
		//if (location.href.indexOf('docvip.fdat.com.tw')!=-1 && (theSSO.User.account=='ERIC' || theSSO.User.account=='TSENG'))
		//	sValue = '2500';

		let makeLongListCount = 0;
		if (typeof sValue=='string' && sValue.length) {
			makeLongListCount = parseInt(sValue, 10);
			if (isNaN(makeLongListCount)) {
				makeLongListCount = 0;
			}
		}

		let cntRepeat = 1;
		if (makeLongListCount>sortedDocList.length) {
			cntRepeat = Math.trunc(makeLongListCount/sortedDocList.length) + 1;
		}

		for (i=0; i<sortedDocList.length; i++) {
			doc = sortedDocList[i];

			// 2019.6.11 - Eric Peng - 1080412
			let folder = doc.folder + '-' + doc.subfolder;
			let rrbGrayColor = false;
			if (SSOUtil.typeOf(rrbGrayColorFolders)=='array' && rrbGrayColorFolders.length && rrbGrayColorFolders.indexOf(folder)!=-1) {
				rrbGrayColor = true;
			}

			$item = _createNewItem_Icon(doc, rrbGrayColor);
			if (!!$item)
			{
				if (cnt===0) {
					// 設定上邊框
					$item.addClass('ui-corner-top');
				}
				$cntr.append($item);
				cnt++;
			}
		}

		// 2021.3.29 - 1100356, 測iPad超出2K筆待辦!
		if (cntRepeat>1) {
			let x = 1;
			for(x=1; x<cntRepeat; x++) {
				for (i=0; i<sortedDocList.length; i++) {
					doc = sortedDocList[i];
		
					// 2019.6.11 - Eric Peng - 1080412
					let folder = doc.folder + '-' + doc.subfolder;
					let rrbGrayColor = false;
					if (SSOUtil.typeOf(rrbGrayColorFolders)=='array' && rrbGrayColorFolders.length && rrbGrayColorFolders.indexOf(folder)!=-1) {
						rrbGrayColor = true;
					}
		
					$item = _createNewItem_Icon(doc, rrbGrayColor);
					if (!!$item)
					{
						if (cnt===0) {
							// 設定上邊框
							$item.addClass('ui-corner-top');
						}
						$cntr.append($item);
						cnt++;
					}
				}	
			}
			alert('render todolist item count=' + cnt);
		}

		_setupContextMenu('context-menu-todo');
		
		if (!!$item) {
			// 設定下邊框
			$item.addClass('ui-corner-bottom');	
		}
	};
	
	/*
	 * 重新列舉有filter的清單項目(預覽窗格左方IconList)
	 *
	 * cntrId: <tbody> container's id ('todolist_tb > tbody')
	 */
	var _resetSearchToDoList = function(cntrId, folder) {
		// 清除現有項目
		$('#' + cntrId).empty(); //.children().detach();
		_makeToDoList_SearchList(cntrId, folder);
		that.searchListFilterFolder = folder;
	};
	/*
	 * 重新列舉清單項目(傳統列表@Table)
	 *
	 * cntrId: <ul id='search-list'> container's id
	 */
	var _resetToDoList = function(cntrId, folder, sortBy, active_role) {
		$('#' + cntrId).children().detach();
		// 2016.10.30
		//_makeToDoList_List2(cntrId, folder, '', sortBy);
		_makeToDoList_List_DOM(cntrId, folder, '', sortBy, active_role);
		that.listFilterFolder = folder;
		that.listSortBy = sortBy;
	};
	
	// 2012.12.10 - 取得指定欄位的設定值
	var _getPropValue = function(msgId, prop) {
		var targetDoc = null;
		var idx=-1;
		var lightInfo = null, url='';
		var sLightHeader='./IMAGE/SSO/';
		for(var i=0; i<_doclist.length; i++) {
			var doc = _doclist[i];
			if (doc.msgId == msgId)
			{
				targetDoc = doc;
				break;
			}
		}
		
		if (!!targetDoc) {
			if (prop=='speed'|| prop=='secret' || prop=='signType' || prop=='dueDate' || prop=='reSupplyALM' || // 2016.8.29 - 新增reSupplyAML
				prop=='docNo' || prop=='ICUserName' || prop=='fromOUName' || prop=='subject' || 
				prop=='txName' || prop=='newTime' ||
				prop=='signDueDate' || prop=='ICOUName' || prop=='currLocate' || prop=='fromOrg' || // 2018.9.28 - 1070955
				prop=='docPtyName' || prop=='rcvDate' 
				//1110927	Leslie[1110889]	增加取值欄位(關鍵字、報送案別、列管類別)
				|| prop == 'keyWord' || prop == 'taType' || prop == 'MOCSdocPty'
				//1111122 Kevin 1111287 新增流程
				|| prop == 'docProc'
				) { // 2019.1.24 - 1071075, [公文性質]	// 2022.4.19 Leslie[1110064],信保新增收創文日期，add prop='rcvDate'
				// 直接取值
				return targetDoc[prop];
			}
			else if (prop=='light') {
				lightInfo = _getLightInfo(targetDoc);
				/* 2017.8.11 - bug-fix, 美工燈號檔名異動後, 排序異常問題!
					 => _getLightInfo函式回傳物件新增sn欄位, 設定排序值.
				   2016.11.3 -
				     1. 原回傳值, 綠燈及白燈的 light.value 都是3, 會造成燈號排序看起來不正確.
					 2. 若回傳字串(url)含[路徑], 排序會有異常, 故須去除子目錄, 僅回傳檔名 [特殊字元影響? ex'/']
				 */
				if (!!lightInfo && (typeof lightInfo.value!=='undefined')) {
					return lightInfo.value;
				}
				return 99; // 2017.8.10 - bug-fix, 回傳一個較大的數值
			}
			else if (prop=='opened') {
				if (targetDoc.signTime.length || targetDoc.isDraft) { // 2016.12.20 - 草稿一律為已閱讀!
					return '1';
				}
				else {
					return '0';
				}
			}
			else if (prop=='toUserName') { // 2018.10.3 - 1070955
				if (typeof doc.toUserName=='string' && doc.toUserName.length)
					return doc.toUserName;
				var _toXXX = doc.toOUName;
				if (typeof doc.toRoleName=='string' && doc.toRoleName.length) {
					_toXXX += '-' + doc.toRoleName;
				}
				return _toXXX;
			}
		}
		return '';
	};
	
	var _init = function(xmlToDoList) {
		if ((typeof xmlToDoList=='undefined') || xmlToDoList==null)
			return -1;
		
		// 2013.10 - 清空內容!
		if (_doclist.length) {
			_doclist.splice(0, _doclist.length);
		}
		
		var doclist = xmlToDoList.find('ODWMSG');
		
		if (_odwmsgFieldList.length==0 && doclist.length) {
			//_initODWMSGFields(doclist[0]);
		}
		
		var docCnt = doclist.length;
		var docNode = null, doc = null;
		var i=0;
		var signType;
		for(i=0; i<docCnt; i++) {
			docNode = doclist[i];
			
			/* 2016.7 - 支援無文號草稿
			 * 2016.4 - 列出紙本簽核公文
			 * 2015.1 - 線上簽核公文才檢核(有文號)
			 * 2015.1 - 加入5類SignType='W'項目(在_getDocFromODWMSG函式中篩選)
			 * 2014.10 - 暫時不列出非線上簽核公文項目
			 */
			signType = SSOUtil.xml_getChildNodeValue(docNode, 'SIGN_TYPE');
			if (signType!=='E' && signType!=='W' && signType!=='P')  {
				continue;
			}
			
			var newDoc = _getDocFromODWMSG(docNode);	
			if (newDoc!=null) {
				_doclist.push(newDoc);
			}
		}
		
		return _doclist.length;
	};
	
	var _initByJSON = function(arrToDo) {
		/* 由XML <ODWMSG> node轉出 javascript doc object
	 * 2015.10.7 - 目前SignType='E'之篩選條件: (a)103年以後公文, (b)草稿排除, (c)會核中-主辦排除
	 */
		var _getDocFromODWMSG2 = function(odwmsg) {
			/* 去除102年以前公文(含102年) */
			function _excludeDoc(docNo) {
				if (docNo.length===0) return false;
				/* if (docNo.length>3) {
					var sFileYear = docNo.substr(0, 3);
					var fileYear = parseInt(sFileYear);
					if (fileYear<=102) {
						return true;
					}
				}*/
				return false;
			}
			/*
			 * 2015.1 - Eric Peng, 篩選應列入的通知訊息(SignType='W')
			 */
			function _excludeDoc_W(_odwmsg) {
				//ODT221_AUDITMSG_FOLDER / EDT405_AUDITMSG_FOLDER / AKT802_AUDITMSG_FOLDER / EDT403_AUDITMSG_FOLDER / EAT310_APPLMSG_FOLDER
				var _folder = _odwmsg.FOLDER;
				var _subfolder = _odwmsg.SUBFOLDER;
				var _fullfolder = '';
				if (!!_folder && _folder.length && !!_subfolder && _subfolder.length) {
					_fullfolder = _folder + '-' + _subfolder;
				}
				else if (!!_folder && _folder.length) {
					_fullfolder = _folder;
				}
				
				var folder = theSSO.User.SystemSets['ODT221_AUDITMSG_FOLDER'];
				if (!!folder && (_fullfolder == folder)) {
					return false;
				}
				folder = theSSO.User.SystemSets['EDT405_AUDITMSG_FOLDER'];
				if (!!folder && (_fullfolder == folder)) {
					return false;
				}
				folder = theSSO.User.SystemSets['AKT802_AUDITMSG_FOLDER'];
				if (!!folder && (_fullfolder == folder)) {
					return false;
				}
				folder = theSSO.User.SystemSets['EDT403_AUDITMSG_FOLDER'];
				if (!!folder && (_fullfolder == folder)) {
					return false;
				}
				folder = theSSO.User.SystemSets['EAT310_APPLMSG_FOLDER'];
				if (!!folder && (_fullfolder == folder)) {
					return false;
				}
				return true;
			}
			
			
			function _getValue(_odwmsg, name) {
				var value = _odwmsg[name];
				if (typeof value!=='string')
					value = '';
				return value;
			}
			
			if ((typeof odwmsg === 'undefined') || odwmsg===null)
				return null;
			
			var doc = null;
		
			// 取紙本/線上簽核公文&SIGN_TYPE="W"項目...
			var msgId = odwmsg.MSG_ID;
			if (typeof msgId=='undefined' || msgId===null || msgId.length===0) {
				return null;
			}
			
			var signType = odwmsg.SIGN_TYPE;
			
			// 2013.6 - 篩選去除102年以前項目!
			var docNo = odwmsg.DOC_NO;
			
			var isDraft = false;
			var excludeDoc = false;
			if (signType=='P' || signType=='E') {
				isDraft = _isDraftMsgId(msgId);
				if (!isDraft) {
					excludeDoc = false; // 2017.8 - Eric Peng, 1060798 - 不排除102年以前項目.
					//excludeDoc = _excludeDoc(docNo);
				}
			}
			// 2015.1 - 取應列入的通知訊息
			else if (signType=='W') {
				// 2016.8 - Eric Peng, 顯示所有signType=='W'項目.
				excludeDoc = false; // _excludeDoc_W(docNode);
			}
				
			// 2014.11 - 暫時先去除[會核中-主辦]公文
			var folder = odwmsg.FOLDER;
			var subfolder = odwmsg.SUBFOLDER;
					
			if ((signType=='P'||signType=='E') && (!excludeDoc)) {
				doc = {};
				doc.isDraft = isDraft;
				msgId = odwmsg.MSG_ID;
				if (msgId.indexOf('_')!==-1) {
					msgId = msgId.substring(0, msgId.indexOf('_'));
				}
				doc.msgId = msgId;
				
				doc.docNo = _getValue(odwmsg, 'DOC_NO');
				doc.signType = signType;
				doc.ICOUName = _getValue(odwmsg, 'IC_OU_NAME');
				doc.ICOUId = _getValue(odwmsg, 'INCHARGE_OU');
				doc.ICUserName = _getValue(odwmsg, 'IC_USER_NAME');
				doc.ICUserId = _getValue(odwmsg, 'IC_USER_ID');
				if (doc.ICUserId.length) {
					doc.ICUserId = doc.ICUserId.toUpperCase();
				}
				doc.sourceOrgNo = _getValue(odwmsg, 'SOURCE_ORGNO');
				doc.subject = _getValue(odwmsg, 'SUBJECT');
				doc.fromSubject = _getValue(odwmsg, 'FROM_SUBJECT');
				
				doc.dueDate = _getValue(odwmsg, 'DUE_DATE');
				doc.outLMT = _getValue(odwmsg, 'MSG_OUT_LMT');
				doc.alarmLMT = _getValue(odwmsg, 'MSG_ALM_LMT');
				doc.alarmTime = _getValue(odwmsg, 'ALARM_TIME');
				doc.docState = _getValue(odwmsg, 'DOC_STATE');
				
				doc.secret = _getValue(odwmsg, 'SECRETE');
				doc.speed = _getValue(odwmsg, 'SPEED');
				doc.folder = _getValue(odwmsg, 'FOLDER');
				doc.subfolder = _getValue(odwmsg, 'SUBFOLDER');
				doc.signTime = _getValue(odwmsg, 'SIGN_TIME'); // 若有表示已閱讀...
				doc.newTime = _getValue(odwmsg, 'NEW_TIME'); // 送方傳送時間
				doc.fromOUName = _getValue(odwmsg, 'FROM_OU'); // 送文單位
				
				// 2013.4
				doc.ownOUId = _getValue(odwmsg, 'OWN_OU_ID');
				doc.ownUserId = _getValue(odwmsg, 'OWN_USER_ID');
				if (doc.ownUserId.length) {
					doc.ownUserId = doc.ownUserId.toUpperCase();
				}
				
				// 2013.9
				doc.ownRoleId = _getValue(odwmsg, 'OWN_ROLE_ID');
					
				// 2013.9 - 傳送
				doc.txName = _getValue(odwmsg, 'TX_NAME');
				doc.toUserName = _getValue(odwmsg, 'TO_USER_NAME'); // 傳送至
				doc.toUserId = _getValue(odwmsg, 'TO_USER_ID');
				if (doc.toUserId.length) {
					doc.toUserId = doc.toUserId.toUpperCase();
				}
				doc.toRoleName = _getValue(odwmsg, 'TO_ROLE_NAME');
				doc.toRoleId = _getValue(odwmsg, 'TO_ROLE_ID');
				doc.toOUName = _getValue(odwmsg, 'TO_OU_NAME');
				doc.toOUId = _getValue(odwmsg, 'TO_OU_ID');
				
				/* 公文電子檔位置(FileIO WS + disk path)
				 *<STORAGE_PATH>D:\FILESRV_DATA\FILE_PATH\upload</STORAGE_PATH>
				 *<SUB_DIR>301060000C\10101\04\1010500001</SUB_DIR>
				 *<WEB_SERVICE>http://deva.nfa.com.tw/WebFileIo/T2100FileIOService.asmx</WEB_SERVICE>
				 */
				doc.fileIOWS = _getValue(odwmsg, 'WEB_SERVICE');
				doc.fileStoragePath = _getValue(odwmsg, 'STORAGE_PATH');
				doc.fileSubDir = _getValue(odwmsg, 'SUB_DIR');
				
				/* 2014.1 - for公文核決. */
				doc.appUserId = _getValue(odwmsg, 'APP_USER_ID');
				doc.appUserName = _getValue(odwmsg, 'APP_USER_NAME');
				doc.appRoleId = _getValue(odwmsg, 'APP_ROLE_ID');
				doc.rejectUserName = _getValue(odwmsg, 'REJECT_USER_NAME');
				
				// RESUPPLY_ALM
				doc.reSupplyALM = _getValue(odwmsg, 'RESUPPLY_ALM');
				
				/* 2014.10 - 伺服器處理中狀態 */
				doc.submitProcessing = false;

				// 2018.9.28 - 1070955
				doc.fromOrg = _getValue(odwmsg, 'FROM_ORG');
				doc.signDueDate = _getValue(odwmsg, 'SIGN_DUEDATE');
				doc.currLocate = _getValue(odwmsg, 'CURR_LOCATION');

				/* 2019.1.24 - 1071075, 新增[公文性質]欄位 */
				doc.docPtyName = _getValue(odwmsg, 'DOC_PTY_NAME');
				if (typeof doc.docPtyName!='string') {
					doc.docPtyName = '';
				}

				// 2021.7 - 1100854 - fullNewTime
				if (SSO_CONFIG.OrgNickName=="NUK") {
					doc.fullNewTime = _getValue(odwmsg, 'FULL_NEW_TIME');
				}
				
				// 2022.4.19	Leslie[1110064]	信保新增收創文日期
				doc.rcvDate = _getValue(odwmsg, 'RCV_DATE');
				
				//1110927	Leslie[1110889]	新增欄位
				doc.keyWord = _getValue(odwmsg, 'KEY_WORD');			
				doc.taType = _getValue(odwmsg, 'TA_TYPE');			
				doc.MOCSdocPty = _getValue(odwmsg, 'MOCS_DOCPTY');	
				//1111122 Kevin 1111287 新增流程
				doc.docProc = '';
			}
			else if (signType=='W' && (!excludeDoc)) {
				folder = _getValue(odwmsg, 'FOLDER');
				var fromSubject = _getValue(odwmsg, 'FROM_SUBJECT');
				if (folder.length && fromSubject.length) // 2013.4 - SIGN_TYPE="W"項目, 須有主旨才列入清單顯示!
				{
					doc = {};
					doc.msgId = _getValue(odwmsg, 'MSG_ID');
					doc.signType = signType;
					doc.folder = folder;
					doc.subfolder = _getValue(odwmsg, 'SUBFOLDER');
					doc.ownUserId = _getValue(odwmsg, 'OWN_USER_ID');
					if (doc.ownUserId.length) {
						doc.ownUserId = doc.ownUserId.toUpperCase();
					}
					doc.subject = _getValue(odwmsg, 'SUBJECT');
					doc.fromSubject = fromSubject;
					
					var url_b64 = _getValue(odwmsg, 'URL');
					var url = '';
					if (url_b64.length>0) {
						url = Base64.decode(url_b64);
					}
					doc.url = url; // 2016.8.22 - 二代毋須轉換. _modifyToDoUrl(url);
					//console.log('[W] MsgId=' + doc.msgId + ', url=' + doc.url);
					
					//1051201 Kevin 比照一代傳入MSG_ID
					if(doc.msgId != "")
					{
						if(doc.url.indexOf('?') != -1)
							doc.url += "&MSG_ID=" + doc.msgId;
						else
							doc.url += "?MSG_ID=" + doc.msgId;
					}
					
					doc.signTime = _getValue(odwmsg, 'SIGN_TIME'); // 若有表示已閱讀...(SIGN_TYPE="W"項目仍有效)
					
					/* 2015.1 - Eric Peng, 新增解析下列欄位 */
					doc.ICOUName = _getValue(odwmsg, 'IC_OU_NAME');
					doc.ICOUId = _getValue(odwmsg, 'INCHARGE_OU');
					doc.ICUserName = _getValue(odwmsg, 'IC_USER_NAME');
					doc.ICUserId = _getValue(odwmsg, 'IC_USER_ID');
					if (doc.ICUserId.length) {
						doc.ICUserId = doc.ICUserId.toUpperCase();
					}
					doc.sourceOrgNo = _getValue(odwmsg, 'SOURCE_ORGNO');
					
					doc.dueDate = _getValue(odwmsg, 'DUE_DATE');
					doc.outLMT = _getValue(odwmsg, 'MSG_OUT_LMT');
					doc.alarmLMT = _getValue(odwmsg, 'MSG_ALM_LMT');
					doc.alarmTime = _getValue(odwmsg, 'ALARM_TIME');
				
					doc.subject = _getValue(odwmsg, 'SUBJECT');
					doc.fromSubject = _getValue(odwmsg, 'FROM_SUBJECT');
					
					doc.secret = _getValue(odwmsg, 'SECRETE');
					doc.speed = _getValue(odwmsg, 'SPEED');
					
					// RESUPPLY_ALM
					doc.reSupplyALM = _getValue(odwmsg, 'RESUPPLY_ALM');
					
					doc.newTime = _getValue(odwmsg, 'NEW_TIME'); // 送方傳送時間

					// 2018.9.28 - 1070955
					doc.fromOrg = _getValue(odwmsg, 'FROM_ORG');
					doc.signDueDate = _getValue(odwmsg, 'SIGN_DUEDATE');
					doc.currLocate = _getValue(odwmsg, 'CURR_LOCATION');

					/* 2019.1.24 - 1071075, 新增[公文性質]欄位 */
					doc.docPtyName = _getValue(odwmsg, 'DOC_PTY_NAME');
					if (typeof doc.docPtyName!='string') {
						doc.docPtyName = '';
					}

					// 2021.7 - 1100854 - fullNewTime
					if (SSO_CONFIG.OrgNickName=="NUK") {
						doc.fullNewTime = _getValue(odwmsg, 'FULL_NEW_TIME');
					}
					
					// 2022.4.19	Leslie[1110064]	信保新增收創文日期
					doc.rcvDate = _getValue(odwmsg, 'RCV_DATE');
					
					//1110927	Leslie[1110889]	新增欄位
					doc.keyWord = _getValue(odwmsg, 'KEY_WORD');			
					doc.taType = _getValue(odwmsg, 'TA_TYPE');			
					doc.MOCSdocPty = _getValue(odwmsg, 'MOCS_DOCPTY');	
					//1111122 Kevin 1111287 新增流程
					doc.docProc = '';
				}
			}
			
			// read all field from ODWMSG
			if (!!doc) {
				if (doc.msgId=='0') {
					theLogger.debug('found target example doc...');
				}
				
				if (typeof odwmsg == 'object') {
					doc.ODWMSG = odwmsg;
					/* 2016.8 - 草稿的ODWMSG.MSG_ID記錄為不含帳號項目 */
					if (doc.isDraft) {
						doc.ODWMSG.MSG_ID = doc.msgId;
					}
				}
			}
			return doc;
		};
		
		if ((typeof arrToDo=='undefined') || arrToDo===null)
			return -1;
		
		// 2013.10 - 清空內容!
		if (_doclist.length) {
			_doclist.splice(0, _doclist.length);
		}
		
		if (_odwmsgFieldList.length===0 && arrToDo.length) {
			//_initODWMSGFields(doclist[0]);
		}
		
		var docCnt = arrToDo.length;
		var i=0;
		var signType;
		for(i=0; i<docCnt; i++) {
			docRaw = arrToDo[i];
			signType = docRaw.SIGN_TYPE;
			if (signType!=='E' && signType!=='W' && signType!=='P')  {
				continue;
			}
			
			var newDoc = _getDocFromODWMSG2(docRaw);	
			if (newDoc!=null) {
				_doclist.push(newDoc);
			}
		}
		
		return _doclist.length;
	};
	
	var _getDocByDocNo = function(docNo) {
		var docCnt = _doclist.length;
		var docObj = null;
		for(var i=0; i<docCnt; i++) {
			docObj = _doclist[i];
			if (docObj.docNo == docNo) {
				return docObj;
			}
		}
		return null;
	};
	
	var _getDocByMsgId = function(msgId, ICUser) {
		if ((typeof msgId === 'undefined') || (msgId==null) || (msgId.length==0))
			return null;
				
		var isDraft = _isDraftMsgId(msgId);
		var msgIdPure='';
		var arrInfo;
		if (msgId.indexOf('_')!==-1) {
			arrInfo = msgId.split('_');
			msgIdPure = arrInfo[0];
			ICUser = arrInfo[1];
		}
	
		var docCnt = _doclist.length;
		var docObj = null;
		for(var i=0; i<docCnt; i++)
		{
			docObj = _doclist[i];
			if (docObj.msgId == msgId) {
				if (isDraft) {
					if (docObj.ICUserId == ICUser) {
						return docObj;
					}
				}
				else {
					return docObj;
				}
			}
		}
		return null;
	};
	
	// 2013.9 - 傳送後移除待辦項目
	// 2020.1.6 - 1080701 Eric, 草稿刪除須加ICUserId判定!
	var _deleteDoc = function(msgId, ICUserId) {
		var isDraft = _isDraftMsgId(msgId);	// 2019.1.6 - 1080701 Eric, 新增判斷msgId是否為草稿
		var docCnt = _doclist.length;
		var docObj = null;
		var i=0;
		for(i=0; i<docCnt; i++)
		{
			docObj = _doclist[i];
			if (docObj.msgId === msgId) {
				// 2019.1.6 - 1080701 Eric, 判斷msgId相同時, 若非草稿那就是這筆待辦, 若為草稿則再判斷ICUserId相同才是應刪除的待辦
				if (!isDraft || (ICUserId!=='' && docObj.ICUserId == ICUserId)) {
					_doclist.splice(i, 1);
					break;
				}
			}
		}
		//return null;
	};
	
	var _xmlToDocObj = function(docNode) {
		var docObj = {};
		var value = '';
		var nodes = '';
		var cnt = node.childNodes.length;
		for(var idx=0; idx<cnt; idx++)
		{
			var child = node.childNodes[idx];
			if (child.nodeName.length)
			{
				if (child.hasChildNodes())
				{
					if (child.childNodes[0].nodeType==3) {
						value = child.childNodes[0].nodeValue;
						docObj[child.nodeName] = value;	
					}
				}
				else {
					docObj[child.nodeName] = '';
				}
			}
						
			if (idx!=cnt-1) {
				nodes += (child.nodeName + ';');
			}
			else {
				nodes += child.nodeName;
			}
		}
		return docObj;
	};
	
	var _deleteMsg = function(docObj, removeDocObj, updateLight) {
		var isDraft = _isDraftMsg(docObj);
		var todoMsgId = docObj.msgId;
		
		// 2016.11.3
		if (typeof removeDocObj!=='boolean')
			removeDocObj = false;
		if (typeof updateLight!=='boolean')
			updateLight = true;
		
		var submitProcessing = docObj.submitProcessing;
		if (typeof submitProcessing=='undefined')
			submitProcessing = false;
		
		theLogger.log('-I- ToDoListBuilder.deleteMsg msgId=' + todoMsgId + ', removeDocObj=' + (removeDocObj?'Y':'N'));
		
		var $folderItem, $items, $item;
		var t_msgId = '';
		var i=0, j=0, length=0;
		
		// Main Icon list item
		var $IconfolderItems = that.iconCntrId.length ? $('#' + that.iconCntrId + ' > ul > li') : null;
		var found = false, matchItem = false;
		var docCount = 0, newCount = 0;
		var ICUserId=''; // 2016.10.25 - 支援草稿公文比對
		var targetFolderStr = _getFolderString(docObj);
		if ($IconfolderItems && $IconfolderItems.length) {
			for (i=0; i<$IconfolderItems.length;i++) {
				$folderItem = $($IconfolderItems[i]);
				found = false;
				if ($folderItem.attr('data-folder')===targetFolderStr) {
					$items = $folderItem.find('div.folioList ul > li');
					docCount = $items.length;
					for (j=0; j<docCount; j++) {
						$item = $($items[j]);
						
						t_msgId = $item.attr('data-msgid');
						if (isDraft) {
							ICUserId = $item.attr('data-ICUser');
							if (t_msgId==todoMsgId && ICUserId==docObj.ICUserId) {
								matchItem = true;
							}
						}
						else {
							if (t_msgId==todoMsgId) {
								matchItem = true;
							}
						}
						
						if (matchItem) {
							theLogger.log('ToDoList IconItem for msgId=' + todoMsgId + ' found, remove it!');
							$item.remove();
							newCount = docCount-1;
							$folderItem.find('span.ui-count').text(newCount.toString());
							
							// update scrollview of FolioList
							for (var idx in theSSO.MP.todolist.folderScrolls) {
								if (theSSO.MP.todolist.folderScrolls.hasOwnProperty(idx)) {
									var theScroller = theSSO.MP.todolist.folderScrolls[idx];
									if (theScroller.folder===targetFolderStr) {
										theScroller.refresh();
										break;
									}
								}
							}
						
							found = true;
							break;
						}
					}	
				}
				
				if (found) {
					break;
				}
			}
		}
		
		// Search list item
		//1060425 Kevin 修正側屜刪除公文未更新問題
		//var $SearchList_Items = $('div#listPane ul#search-list > li')
		var $SearchList_Items = $('div#sidePane ul#search-list > li')
		length = $SearchList_Items.length;
		matchItem = false; ICUserId='';
		for (i=0; i<length; i++) {
			$item = $($SearchList_Items[i]);
			t_msgId = $item.attr('data-msgid');
			if (isDraft) {
				ICUserId = $item.attr('data-ICUser');
				if (t_msgId==todoMsgId && ICUserId==docObj.ICUserId) {
					matchItem = true;
				}
			}
			else {
				if (t_msgId==todoMsgId) {
					matchItem = true;
				}
			}
			
			if (matchItem) {
				theLogger.log('ToDoList IconItem@SearchList for msgId=' + todoMsgId + ' found, remove it!');
				$item.remove();
				break;
			}
		}
				
		// table list item
		//var $table_items = $('div#listPane #todolist_cntr div.sBase table > tbody > tr');
		var $table_items = $('div#listPane #todolist_cntr div.sData table > tbody > tr'); // 2017.1.5 - bug-fix
		length = $table_items.length;
		matchItem = false; ICUserId='';
		theLogger.log('-I- TDL.deleteMsg() div.sData.table [before] delete, item count=' + length);
		if (length>0) {
			for (i=0; i<length; i++) {
				$item = $($table_items[i]);
				
				t_msgId = $item.attr('data-msgid');
				if (isDraft) {
					ICUserId = $item.attr('data-ICUser');
					if (t_msgId==todoMsgId && ICUserId==docObj.ICUserId) {
						matchItem = true;
					}
				}
				else {
					if (t_msgId==todoMsgId) {
						matchItem = true;
					}
				}
				
				if (matchItem) {
					$item.remove();
					theLogger.log('-I- TDL.deleteMsg() div.sData.table [after] delete, item count=' + $table_items.length);
					break;
				}
			}
		}

		//1060425 Kevin 刪除未選擇公文夾訊息以及未刪除訊息時不異動燈號
		var updateList = false;
		
		// 2020.7.17 - Eric, bug-fix(?)
		//if (!matchItem && that.listCntrId.length!=0) {
		if (!!matchItem && that.listCntrId.length!=0) {
			if (that.listFilterFolder.length) {
				if (targetFolderStr===that.listFilterFolder) {
					updateList = true;
				}
			}
			else {
				updateList = true;
			}
		}
		/* 燈號統計一併update...
		 * 2016.11.3 - 草稿為白燈, 納入異動!
		 * 2016.6 - 草稿公文不更新燈號
		 */
		//1060425 Kevin 刪除未選擇公文夾訊息以及未刪除訊息時不異動燈號
		//if (!!updateLight) {
		if (!!updateList) {
			var lightInfo = _getLightInfo(docObj); //isDraft ? null : _getLightInfo(docObj);
			if (!!lightInfo && that.lights.total) {
				var light = lightInfo.light;
					if (light!==undefined && light.length>0) {
					switch(light) {
					case 'red': that.lights.red -= 1; break;
					case 'yellow': that.lights.yellow -= 1; break;
					case 'white': that.lights.white -= 1; break;
					case 'green': that.lights.green -= 1; break;
					case 'purple': that.lights.purple -= 1; break;
					}
					$('#todolistToolbar .' + light + '_cnt').text(that.lights[light]);
				}
			}

			// 2020.7.17 - 1090390 Eric, 刪除項目後應更新sortable table
			let $tableForSort = $('.sData #todolist_tb');
			if ($tableForSort.length) {
				// get sorting info.
				let idx=0, sorting=null, sortDir=0;
				/*{ 
					// Eric Peng [更新清單後立即sort!]
					//  1. 比對目前sort設定, 若同項目, 則反向! 不同項目, 則依欄位預設屬性正/反向
					//  2. 作業完成記錄sort設定於 <table data-sortIndex='xxx' data-sortReverse='x'>, 以供下次排序作業比對.
					let sIndex = $('.sData #todolist_tb').attr('data-sortIndex');
					let currentIndex = parseInt(sIndex);
					
					let defaultSortIdx = theSSO.MP.todolist.builder.getDefaultSortIndex(); // 預排使用文號排序
					idx = defaultSortIdx;
					let sReverseSort;
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
				}*/

				theLogger.log('-I- TDL.deleteMsg() $tableForSort "update" triggered.');
				$tableForSort.trigger('update', { 
					callback: function() {
						SSOUtil.loading('show');
						if (!!sorting) { // 2016.12.8 - Eric Peng, 可能未排序
							var $tableForSort = $("#listPane .sData #todolist_tb");
							// 記錄本次排序設定.
							$tableForSort.attr({'data-sortIndex': idx.toString(), 'data-sortReverse': sortDir.toString()});
							// 觸發排序作業.
							$tableForSort.trigger("sorton",[sorting]);
						}
						SSOUtil.loading('hide');
					},
				});
			}
		}
		
		// msg's docObj
		if (typeof removeDocObj!=='undefined' && removeDocObj===true) {
			// 2020.1.6 - 1080701 Eric, 草稿時多傳入ICUserId, 若承辦人自己跟代理的的草稿待辦有相同msgId可能會造成刪錯待辦的問題, 再創稿的話就會抓到應刪除而未刪除的todolist待辦, 而發生docObj已經有文號且是應已刪除公文的重複文號的問題
			//_deleteDoc(todoMsgId); // 2013.9 - 移除待辦項目
			_deleteDoc(todoMsgId, isDraft?docObj.ICUserId:''); // 2013.9 - 移除待辦項目
		}
		else {
			// 2016.11.17 - 更新doc list內對應項目內容
			var rawDoc = _getDocByMsgId(docObj.msgId, isDraft?docObj.ICUserId:'');
			if (!!rawDoc) {
				rawDoc.submitProcessing = submitProcessing;
			}
		}
		
		if (updateLight || removeDocObj) {
			// 更新文件夾清單內容(由MobiScroll元件選定)
			var id = 'selectedFolder';

			// 2019.8.29 - 1080339 Eric, jQuery 3.x upgrade
			var selfolder = $('#' + id).val(); //attr('value'); 
			$('#listPane #' + id).scroller('clear');
			$('#listPane #' + id).val(selfolder); //attr('value', selfolder);

            // 2023.4.19 - 1120067 Eric, 切換代理角色後, 只顯示特定代理人待辦項目
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

			_initFolderListSpinWheel(id, true, 'bottom', _doclist_proxy);
			
			var id2 = 'selectedFolder_search'; // 2017.12.25 - typo fix, 'selectedFolder_Search'; 
			var selfolder2 = $('#' + id2).val(); //attr('value'); 
			$('#sidePane #' + id2).scroller('clear');
			$('#sidePane #' + id2).val(selfolder2); //attr('value', selfolder2);
			_initFolderListSpinWheel(id2, true, 'bottom', _doclist_proxy);
			
            // 2023.7.6 - Eric, 各機關問題彙整表 序97-啟用背景傳送時, 叫用theStart.UpdateTodoCnt()會丟出exception workaround.
            try {
                //1110913	Leslie[1110652]	新增更新待辦時，主動更新首頁統計件數
                theStart.UpdateTodoCnt();
            }
            catch(e) {
                let strErr = JSON.stringify(e);
                theLogger.error('call theStart.UpdateTodoCnt() throw exception, e=' + strErr);

                // 若有異常, 隔0.5秒再叫用一次!
                setTimeout(function() {
                    let w_flot = $("#StartTodoFlot").width();
                    theLogger.log('[After Timeout] Flot width=' + w_flot);
                    if (w_flot>0) {
                        theStart.UpdateTodoCnt();
                    }
                }, 500);
            }
		}
		
		theLogger.log('-I- ToDoListBuilder.deleteMsg() done.');
	};
	
	/* 清空圖示待辦清單項目 */
	var _emptyToDoList_Icon = function(cntrId) {
		// 移除現有的
		var oldlist = $('#' + cntrId + ' > ul');
		if (oldlist.children('li').length>0) {
			oldlist.empty();
		}
	};
	
	/* 清空列表待辦清單項目 */
	var _emptyToDoList_List = function(cntrId) {
		// 移除現有的
		var oldlist = $('#' + cntrId);
		if (oldlist.children('tr').length>0) {
			oldlist.empty();
		}
	};
	
	/* 清空待辦清單項目(@預覽公文左方清單) */
	var _emptyToDoList_SearchList = function(cntrId) {
		$('#' + cntrId).empty();
	};
	
	/* 異動公文內容後同步更新待辦清單內容 */
	var _updateToDoListHtmlItem = function(docObj, iconCntrId, listCntrId, searchCntrId) {
		function _updateListItem(_docObj, listCntrId) {
			// listCntrId: 'todolist_tb > tbody'
			var sItemQuery = '#mpContainer div.sData #' + listCntrId + ' tr';
			
			var isDraft = docObj.isDraft;
			var $docTR = null;
			if (isDraft) {
				sItemQuery += '[data-msgid="' + docObj.msgId + '"][data-icuser="' + docObj.ICUserId + '"]';
			}
			else {
				sItemQuery += '[data-msgid="'+ docObj.msgId + '"]';
			}
			
			var $docTR = $(sItemQuery);
			if ($docTR.length===0) {
				var $sData = $('#mpContainer div.sData')
				// 可能尚未有superTable
				if ($sData.length===0) {
					sItemQuery = '#mpContainer #' + listCntrId + ' tr';
					if (isDraft) {
						sItemQuery += '[data-msgid="' + docObj.msgId + '"][data-icuser="' + docObj.ICUserId + '"]';
					}
					else {
						sItemQuery += '[data-msgid="'+ docObj.msgId + '"]';
					}
					$docTR = $(sItemQuery);
				}
			}
			
			var $newTR = null;
			if ($docTR.length) {
				// 2019.6.11 - 1080412, Eric Peng
				let sRRBGrayColorFolders = theSSO.User.EnvSettings.get('MP_DOC_COLOR_BY_FOLDER');
				let rrbGrayColorFolders = [];
				if (typeof sRRBGrayColorFolders=='string' && sRRBGrayColorFolders.length) {
					rrbGrayColorFolders = sRRBGrayColorFolders.split(';');
				}
				if (SSOUtil.typeOf(rrbGrayColorFolders)!='array' || rrbGrayColorFolders==null || rrbGrayColorFolders.length==0) {
					rrbGrayColorFolders = [];
				}
				
				//1110927	Leslie[1110889]	改為純HTML函式，以支援客製化欄位設定
				var bEnableCustomTodo = false;
				if('CustomSet' in theCustom && 'CustomTodoSet' in theCustom.CustomSet && Array.isArray(theCustom.CustomSet.CustomTodoSet)){
					bEnableCustomTodo = true;
					_customTodo.colorDocNo = false;
					if (that.shouldShowResupply() && that.shouldHideLights())
						_customTodo.colorDocNo = true;
					_customTodo.rrbGrayColorFolders = rrbGrayColorFolders;
				}
				//$newTR = _self._createNewItem_List3(docObj, -1, rrbGrayColorFolders);
				$newTR = $(_self._createNewItem_List_DOMStr(docObj, -1, rrbGrayColorFolders, bEnableCustomTodo).sDOMElem);
				//1110927	Leslie[1110889]	改為純HTML函式，以支援客製化欄位設定	==END==
				$docTR.replaceWith($newTR);

				// 2020.8.10 - Eric, ToDoList內容異動後執行排序會出現重複項目問題.
				if (SSOUtil.isValueTrue(localStorage['dev_noSortableUpdate'])) {
					theLogger.log('-I- _updateListItem() skip sort_table trigger: update');
				}
				else {
					let $tdlTable = $('#mpContainer div.sData #' + listCntrId).closest('table');
					$tdlTable.trigger('update', {
						callback: function() {
							// 完成update作業後觸發以執行特定作業.
						},
					});
				}
			}
		}
		
		function _updateIconItem(_docObj, iconCntrId) {
			// iconCntrId: 'todolist_icon_cntr'
			var sFolderQuery = '#mpContainer #' + iconCntrId + ' li[data-folder="'+ _docObj.folder + '-' + _docObj.subfolder +'"]';
			
			var $folder = $(sFolderQuery);
			if ($folder.length==0) return;
						
			var sItemQuery = '';
			if (_docObj.isDraft) {
				sItemQuery = 'ul li[data-msgid="' + _docObj.msgId +'"][data-icuser="' + _docObj.ICUserId + '"]';
			}
			else {
				sItemQuery = 'ul li[data-msgid="' + _docObj.msgId +'"]';
			}
			
			var $docLI = $folder.find(sItemQuery);
			var $newLI = null;
			if ($docLI.length) {
				// 2019.6.11 - 1080412, Eric Peng
				let sRRBGrayColorFolders = theSSO.User.EnvSettings.get('MP_DOC_COLOR_BY_FOLDER');
				let rrbGrayColorFolders = [];
				if (typeof sRRBGrayColorFolders=='string' && sRRBGrayColorFolders.length) {
					rrbGrayColorFolders = sRRBGrayColorFolders.split(';');
				}
				if (SSOUtil.typeOf(rrbGrayColorFolders)!='array' || rrbGrayColorFolders==null || rrbGrayColorFolders.length==0) {
					rrbGrayColorFolders = [];
				}
				
				let folder = doc.folder + '-' + doc.subfolder;
				let rrbGrayColor = false;
				if (SSOUtil.typeOf(rrbGrayColorFolders)=='array' && rrbGrayColorFolders.length && rrbGrayColorFolders.indexOf(folder)!=-1) {
					rrbGrayColor = true;
				}

				$newLI = _self._createNewItem_Icon(docObj, rrbGrayColor);
				$docLI.replaceWith($newLI);
			}
		}
		
		function _updateSearchIconItem(_docObj, searchCntrId) {
			// searchCntrId: 'search-list'
			var sItemQuery = '#mpContainer #' + searchCntrId;
			if (_docObj.isDraft) {
				sItemQuery += ' li[data-msgid="'+ _docObj.msgId + '"][data-icuser="' + _docObj.ICUserId + '"]';
			}
			else {
				sItemQuery += ' li[data-msgid="'+ _docObj.msgId + '"]';
			}
			
			var $docLI =$(sItemQuery);
			var $newLI = null;
			if ($docLI.length) {
				// 2019.6.11 - 1080412, Eric Peng
				let sRRBGrayColorFolders = theSSO.User.EnvSettings.get('MP_DOC_COLOR_BY_FOLDER');
				let rrbGrayColorFolders = [];
				if (typeof sRRBGrayColorFolders=='string' && sRRBGrayColorFolders.length) {
					rrbGrayColorFolders = sRRBGrayColorFolders.split(';');
				}
				if (SSOUtil.typeOf(rrbGrayColorFolders)!='array' || rrbGrayColorFolders==null || rrbGrayColorFolders.length==0) {
					rrbGrayColorFolders = [];
				}
				
				let folder = doc.folder + '-' + doc.subfolder;
				let rrbGrayColor = false;
				if (SSOUtil.typeOf(rrbGrayColorFolders)=='array' && rrbGrayColorFolders.length && rrbGrayColorFolders.indexOf(folder)!=-1) {
					rrbGrayColor = true;
				}

				$newLI = _self._createNewItem_Icon(docObj, rrbGrayColor);
				$docLI.replaceWith($newLI);
			}
		}
		
		if (typeof iconCntrid === 'undefined' || iconCntrId.length===0) {
			iconCntrId = that.iconCntrId;
		}
		if (typeof listCntrId === 'undefined' || listCntrId.length===0) {
			listCntrId = that.listCntrId;
		}
		if (typeof searchCntrId === 'undefined' || searchListCntrId.length===0) {
			searchCntrId = that.searchListCntrId;
		}
		
		var msgId = docObj.msgId;
		if (typeof msgId === 'undefined' || msgId===null || msgId.length===0) {
			theLogger.error('-ERR- _updateToDoListHtmlItem() failed. invalid msgId!');
			return;
		}
		
		var folder = _getFolderString(docObj);
		
		// 清單/搜尋子視窗要檢核是否已有內容, 有才執行!
		var updateList = false, updateSearchList = false, updateIcon=false;
		if (listCntrId.length!=0) {
			if (that.listFilterFolder.length) {
				if (folder===that.listFilterFolder) {
					updateList = true;
				}
			}
			else {
				updateList = true;
			}
		}
		
		if (searchCntrId.length!=0) {
			if (that.searchListFilterFolder.length) {
				if (folder===that.searchListFilterFolder) {
					updateSearchList = true;
				}
			}
			else {
				updateSearchList = true;
			}
		}
		
		if (typeof iconCntrId=='string' && iconCntrId.length!==0) {
			if ($('#' + iconCntrId + ' ul.folderList').length) {
				updateIcon = true;
			}
		}
		
		if (updateList) {
			_updateListItem(docObj, listCntrId);
		}
		
		if (updateIcon && typeof iconCntrId =='string' && iconCntrId.length) {
			_updateIconItem(docObj, iconCntrId);
		}
		
		if (updateSearchList) {
			_updateSearchIconItem(docObj, searchCntrId);
		}
	};
	
	/* 開啟公文時, 載入公文的ODWDCM.XML檔內容
	 * (須先叫用ODMSSP.SetMsgStatus在server端) */
	function _initODWDCM(docObj, options) {
		// 取得母/子文內容
		var _makeCOMDocObj = function(comDocNode) {
			var comDoc = {};
			var len = comDocNode.childNodes.length;
			for (var i=0; i<len; i++) {
				var node = comDocNode.childNodes[i];
				// nodeType: 1 -> element, 2 -> attribute, 3 -> text, 8 -> comment
				if (node.nodeType==1) {
					comDoc[node.nodeName] = SSOUtil.xml_getNodeValue(node);
				}
			}
			
			if ((typeof comDoc.COM_DOC_NO !== undefined) && !!comDoc.COM_DOC_NO) {
				return comDoc;
			}
			return null;
		};
		
		// 2021.6 - 1080761 Eric, merge 2018.5.14 - 1070298 內政部參考公文!
		function _makeREFDocObj(refDocNode) {
			var refDoc = {};
			var len = refDocNode.childNodes.length;
			for (var i=0; i<len; i++) {
				var node = refDocNode.childNodes[i];
				// nodeType: 1 -> element, 2 -> attribute, 3 -> text, 8 -> comment
				if (node.nodeType==1) {
					refDoc[node.nodeName] = SSOUtil.xml_getNodeValue(node);
				}
			}
			
			if ((typeof refDoc.DOC_NO == 'string') && refDoc.DOC_NO.length) {
				return refDoc;
			}
			return null;
		}

		var _makeODWDCM = function(docNode) {
			if (!!docNode) {
				var odwdcm = {};
				var len = docNode.childNodes.length;
				for(var i=0; i<len; i++) {
					var node = docNode.childNodes[i];
					if (node.nodeType==1) { // 只取child elements
						// 2014.3 - 彙併辦/併案陳核母/子文處理
						if (node.nodeName==='COM_NO') {
							//odwdcm[node.nodeName] = [];
							var $COMDocNodes = $(node).find('DOC');
							var cnt = $COMDocNodes.length;
							var comDocArray = [];
							for(j=0; j<cnt; j++) {
								var comDocNode = $COMDocNodes[j];
								var comDocObj = _makeCOMDocObj(comDocNode);
								if (comDocObj!==null) {
									comDocArray.push(comDocObj);
								}
							}
							
							if (comDocArray.length) {
								odwdcm[node.nodeName] = comDocArray;
								
								var $combineType = $(node).find('COMBINE_TYPE');
								if ($combineType.length) {
									if ($combineType.value().length) {
										odwdcm.COM_DOC_COMBINE_TYPE = SSOUtil.xml_getNodeValue($combineType[0]);
									}
								}
							}
							else {
								odwdcm[node.nodeName] = [];
							}
						}
						else if (node.nodeName==='REF_DOC') { // 2021.6 - 1080761 Eric, merge 2018.5.14 - 1070298 內政部參考公文!
							//odwdcm[node.nodeName] = [];
							let $REFDocNodes = $(node).find('DOC');
							let j=0, cnt=$REFDocNodes.length;
							let refDocArray = [];
							for(j=0; j<cnt; j++) {
								let refDocNode = $REFDocNodes[j];
								let refDocObj = _makeREFDocObj(refDocNode);
								if (refDocObj!==null) {
									refDocArray.push(refDocObj);
								}
							}
							
							if (refDocArray.length) {
								odwdcm[node.nodeName] = refDocArray;
							}
							else {
								odwdcm[node.nodeName] = [];
							}
						}
						else {
							odwdcm[node.nodeName] = SSOUtil.xml_getNodeValue(node);
						}
					}
				}	
				return odwdcm;
			}
			return null;
		};
	   
		var _dfd = null; $.Deferred();
		var _async = false;

		/* 2017.10.5 - 1060894 右鍵選單不叫用ODMSSP.SetMsgStatus, 改用ODMSSP.GetODWDCMStr取ODWDCM內容 */
		var openDoc = true;
		if (!!options && options.openDoc===false) {
			openDoc = false;
		}
		var isDraft = docObj.isDraft;
				
		// 下載ODWDCM.XML
		// 叫用WebFileIO取得ODWDCM.XML
		var fileIOWSUrl = docObj.fileIOWS;
		var fileStoragePath = docObj.fileStoragePath;
		var fileSubDir = docObj.fileSubDir;
		var odwdcm = docObj.getODWDCM();
	   
		var dirPath = fileStoragePath + '\\' + fileSubDir;
		var fileName = 'ODWDCM.XML';
		theLogger.log('ODWDCM file path=' + dirPath + ', filename=' + fileName);
	   
		var wfio = new WebFileIO(fileIOWSUrl, docObj.ownUserId, localStorage.Artifact);
		var odwdcmXML = null;
		
		// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式用假的ODWDCM.XML
		if(!!theSSO && theSSO.offlineMode == true) {
			odwdcmXML = (new DOMParser()).parseFromString('<?xml version="1.0" encoding="UTF-8"?>\
<root>\
  <item>\
    <RCV_DATE>1100729</RCV_DATE>\
    <NEW_BY_OU>Y</NEW_BY_OU>\
    <RCV_TYPE />\
    <H_SUBMIT>Y</H_SUBMIT>\
    <MAIL_ADDR />\
    <FROMDOC_TYPE>C</FROMDOC_TYPE>\
    <DOC_CATEGORY>5</DOC_CATEGORY>\
    <FROMORG_DATE />\
    <OU_NAME>檔案科</OU_NAME>\
    <EMP_NAME>系○廠商</EMP_NAME>\
    <DOC_PROPERTY>1</DOC_PROPERTY>\
    <CASE_NO />\
    <B_TYPE_NO>11</B_TYPE_NO>\
    <STEP_NAME />\
    <COMBINE_TYPE />\
    <KEY_WORD />\
    <FILE_YEAR />\
    <FILE_CLS />\
    <KEEP_YEAR />\
    <APPLY_LIMT />\
    <EXTRMVSEC_COND />\
    <EXTRMVSEC_DATE />\
    <RMVSEC_ID />\
    <MERGE />\
    <CLOSE_F>Y</CLOSE_F>\
    <CASE_CON>N</CASE_CON>\
    <CLOSE_TYPE />\
    <FILE_CNT>0</FILE_CNT>\
    <FILE_UNIT>頁</FILE_UNIT>\
    <LEAD_TIME>6</LEAD_TIME>\
    <LT_UOM>天</LT_UOM>\
    <SUM_TYPE>1</SUM_TYPE>\
    <START_DATE />\
    <DOC_SOURCE />\
    <DOC_STATE>01</DOC_STATE>\
    <COORG_NO />\
    <COORG_NAME />\
    <COSIGN_TYPE />\
    <OUT_REMARK />\
    <UPISSUE_WORD />\
    <UPISSUE_NO />\
    <UPISSUE_DATE />\
    <IS_NOTIFY />\
    <FILE_CASE />\
    <APP_SUBJECT />\
    <OTHER_SUBJECT />\
    <DUE_DATE />\
    <ODUE_DATE />\
    <FROM_NO_WORD />\
    <FROM_NO_NO />\
    <APPROVED_DATE />\
    <COWORK_M_USER_NAME />\
    <LOCKRCV_MONTH />\
    <LOCKCLOSE_MONTH />\
    <LOCKTODO_MONTH />\
    <CLOSE_DATE />\
    <COM_STATUS />\
    <DELAMINATE_LVL />\
    <PROXY_TYPE />\
    <MEETING_TYPE>0</MEETING_TYPE>\
    <COORG_NO2 />\
    <COORG_NAME2 />\
    <COORG_NO3 />\
    <COORG_NAME3 />\
    <COORG_NO4 />\
    <COORG_NAME4 />\
    <COORG_NO5 />\
    <COORG_NAME5 />\
    <LAST_UPDATE_PROG />\
    <LAST_UPDATE_TIME />\
    <SET_REAPPLY_OUID />\
    <CAM_EXT_DAY />\
    <CAM_DOC_PROPERTY />\
    <CAM_B_TYPE_NO />\
    <DC_CASE_NO />\
    <IS_THREAD />\
    <COMBINE_TYPE_2 />\
    <COM_NO />\
    <M_COM_CASE_NO />\
    <M_CASE_NO />\
    <LOCK_SETTING />\
    <LOCK_MSG />\
    <CANCEL_APP_ENABLE>N</CANCEL_APP_ENABLE>\
    <FROMORGNO />\
    <POSTCODE />\
    <ADDRESS />\
    <SENDTYPE />\
    <ATTACH />\
    <RCV_TASK />\
    <ISSUE_TASK />\
    <SRC_RCV_NO />\
    <PETITION_CASE_TYPE />\
    <PETITION_HANDLE_TYPE />\
    <EXT_ATTFILE_TYPE />\
    <EXT_ATTFILE_DESC />\
    <DELAY_ATTFILE_DATE />\
    <APP_STATUS>0</APP_STATUS>\
    <F_SIGN_APP_ROLE_ID />\
    <F_SIGN_APP_USER_ID />\
    <F_SIGN_APP_USER_NAME />\
    <T_APP_STATUS />\
    <T_SIGN_APP_ROLE_ID />\
    <T_SIGN_APP_USER_ID />\
    <T_SIGN_APP_USER_NAME />\
  </item>\
</root>', "text/xml");
			if (odwdcmXML) {
				var itemlist = $(odwdcmXML).find('item');
				if (itemlist.length>0) {
					docObj.ODWDCM = _makeODWDCM(itemlist[0]);
					odwdcm = docObj.getODWDCM();
				}
			}
			
			if (odwdcm!==null) {
				if (!!_dfd)
					_dfd.resolve({success:true});
			}
			else {
				if (!!_dfd)
					_dfd.reject({success:false, errMsg:'parse ODWDCM content failed.'});
			}
		}
		else
		if (openDoc || isDraft) { // 2017.10.5 - 1060894, 草稿或開啟公文時, 叫用WebFileIO取得server公文路徑內的ODWDCM.XML檔
			wfio.download(dirPath, fileName, {
				async : _async,
				success: function(fil, res) {
					if(fil !== undefined) {
						odwdcmXML = fil;
					}
					else {
						theLogger.warn('-W- WebFileIO呼叫成功但夾檔資料未下載. [filename=' + fileName + ']');
						if (!!_dfd)
							_dfd.reject({success:false, errMsg:'WebFileIO呼叫成功但夾檔資料未下載. [filename=' + fileName + ']'});
						return;
					}
		
					// parse ODWDCM XML into a JS Object
					if (odwdcmXML) {
						var itemlist = $(odwdcmXML).find('item');
						if (itemlist.length>0) {
							docObj.ODWDCM = _makeODWDCM(itemlist[0]);
							odwdcm = docObj.getODWDCM();
						}
					}
			
					if (odwdcm!==null) {
						if (!!_dfd)
							_dfd.resolve({success:true});
					}
					else {
						if (!!_dfd)
							_dfd.reject({success:false, errMsg:'parse ODWDCM content failed.'});
					}
				},
				error: function(errorText) {
					theLogger.error('取得公文ODWDCM.XML失敗, 錯誤說明:' + errorText);
					if (!!_dfd)
						_dfd.reject({success:false, errMsg:'取得公文ODWDCM.XML失敗, 錯誤說明:' + errorText});
				}
			});
		}
		else {
			// 2017.10.5 - 1060894, 非草稿且不是開啟公文時(組右鍵選單)叫用ODMSSP.GetODWDCMStr取得ODWDCM內容!
			var rslt = theWebServices.odmssp.getODWDCMStr(localStorage.Artifact, docObj.sourceOrgNo, docObj.docNo, docObj.msgId, {async:false});
			if (rslt.success===true && typeof rslt.retStr=='string' && rslt.retStr.length) {
				var sODWDCM = rslt.retStr;
				var domODWDCM = (new window.DOMParser()).parseFromString(sODWDCM, 'text/xml');
				//1140731	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]
				// var nodeODWDCM = $(domODWDCM).find('item')[0];
				var nodeODWDCM = domODWDCM.querySelectorAll('item')[0];
				docObj.ODWDCM = _makeODWDCM(nodeODWDCM);
				odwdcm = docObj.getODWDCM();
				if (!!_dfd) {
					_dfd.resolve({success:true});
				}
			}
			else {
				if (!!_dfd) {
					_dfd.reject({success:false, errMsg:'Invoke ODMSSP.GetODWDCMStr() failed.'});
				}
			}
		}
	   
		if (_dfd) {
			return _dfd.promise();
		}
		else {
			return (odwdcm!==null) ? true : false;
		}
	}
	
	/* 將新進事項加入待辦清單(JS Object)
	 * 參數:
	 * 	odwmsgNode: <ODWMSG>,XML節點 */
	function _insertNewMsg(odwmsgNode) {
		'use strict';
		var newDoc = _getDocFromODWMSG(odwmsgNode);
		if (newDoc!==null) {
			/* 1130809 Raymond 1130313 合併1111007, 離線版改成不檢查重複公文
			// 2021.12.14 - 1101424 Eric, 部份角色(繕印,發文 etc...)代理人若本身已有該角色, 會收到重複的新進訊息通知問題修正.
			let msgId = newDoc.msgId;
			let _existDoc = null;
			if (msgId.length) {
				if (_isDraftMsg(newDoc)) {
					_existDoc = _getDocByMsgId(msgId, newDoc.ICUserId);
				}
				else {
					_existDoc = _getDocByMsgId(msgId);
				}
			}
			
			// 若todolist清單內已有相同msgId項目, 則不加入
			if (_existDoc!==null) {
				return null;
			}*/
			
			_doclist.push(newDoc);
			
			/* 1130809 Raymond 1130313 合併1111007, 離線版改成不更新統計件數
			//1110913	Leslie[1110652]	新增更新待辦時，主動更新首頁統計件數
			theStart.UpdateTodoCnt();*/
		}
		return newDoc;
	}
	
	/* 產生待辦清單顯示項目(list/icon/searchList)
	 * 參數:
	 *   docObj: 待辦事項基資(JS Object) */
	function _addHTMLDOMItem(docObj) {
		/* 加入條列顯示清單 */
		function _addListItem(docObj, listCntrId) {
			let _itemInserted = false; // 2020.7.20 - 1090390 Eric, 傳送失敗reply/process error message處理修改!
			var $listCntr = null;
			if (listCntrId.length)
				$listCntr = $('#' + listCntrId);
				
			if ($listCntr && $listCntr.length) {
				// 2019.6.11 - 1080412, Eric Peng
				let sRRBGrayColorFolders = theSSO.User.EnvSettings.get('MP_DOC_COLOR_BY_FOLDER');
				let rrbGrayColorFolders = [];
				if (typeof sRRBGrayColorFolders=='string' && sRRBGrayColorFolders.length) {
					rrbGrayColorFolders = sRRBGrayColorFolders.split(';');
				}
				if (SSOUtil.typeOf(rrbGrayColorFolders)!='array' || rrbGrayColorFolders==null || rrbGrayColorFolders.length==0) {
					rrbGrayColorFolders = [];
				}
				
				//1110927	Leslie[1110889]	改為純HTML函式，以支援客製化欄位設定
				var bEnableCustomTodo = false;
				if('CustomSet' in theCustom && 'CustomTodoSet' in theCustom.CustomSet && Array.isArray(theCustom.CustomSet.CustomTodoSet)){
					bEnableCustomTodo = true;
					_customTodo.colorDocNo = false;
					if (that.shouldShowResupply() && that.shouldHideLights())
						_customTodo.colorDocNo = true;
					_customTodo.rrbGrayColorFolders = rrbGrayColorFolders;
				}
				//var $item = _createNewItem_List3(docObj, -1, rrbGrayColorFolders);
				var $item = $(_createNewItem_List_DOMStr(docObj, -1, rrbGrayColorFolders, bEnableCustomTodo).sDOMElem);
				//1110927	Leslie[1110889]	改為純HTML函式，以支援客製化欄位設定	==END==

				/* 2019.2.19 - 1080113 Eric, 調整新增項目是否顯示 */
				let sFilterKey = $('#tdl_list_filter').jqmData('lastKey'); // 2020.4.15 - Eric, bug-fix (last_key => lastKey)
				if (typeof sFilterKey != 'string') {
					sFilterKey = ''
				}
				if (sFilterKey.length) {
					let itemText = $item.text().toLowerCase();
					$item.css('display', 'none');
					if (itemText.indexOf(sFilterKey) != -1)
						$item.css('display', 'table-row');
				}

				$listCntr.append($item);
				_itemInserted = true;
			}
			
			// 更新文件夾清單內容(由MobiScroll元件選定)
			var id = 'selectedFolder';

			// 2019.8.29 - 1080339 Eric, jQuery 3.x upgrade
			var selfolder = $('#selectedFolder').val(); //attr('value'); 
			$('#listPane #' + id).scroller('clear');
			$('#listPane #' + id).val(selfolder); //attr('value', selfolder);

            // 2023.4.19 - 1120067 Eric, 切換代理角色後, 只顯示特定代理人待辦項目
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

			return _itemInserted;
		}
		/* 加入圖示顯示清單 */
		function _addIconItem(docObj, iconCntrId) {
			var $iconCntr = null;
			if (iconCntrId.length)
				$iconCntr = $('#' + iconCntrId);

			// 2019.6.11 - 1080412, Eric Peng
			let sRRBGrayColorFolders = theSSO.User.EnvSettings.get('MP_DOC_COLOR_BY_FOLDER');
			let rrbGrayColorFolders = [];
			if (typeof sRRBGrayColorFolders=='string' && sRRBGrayColorFolders.length) {
				rrbGrayColorFolders = sRRBGrayColorFolders.split(';');
			}
			if (SSOUtil.typeOf(rrbGrayColorFolders)!='array' || rrbGrayColorFolders==null || rrbGrayColorFolders.length==0) {
				rrbGrayColorFolders = [];
			}
			let rrbGrayColor = false;
				
			/* 2015.12.16 - 中榮問題 1041018 - Quick-fix 若待辦項目沒有指定的FOLDER-SUBFOLDER項目, 會造成系統異常問題修正	*/
			var folderStr = '';
			var $folderList = null, $folder = null, $targetFolioList = null;
			var cnt = 0, i = 0, j=0;
			if (!!$iconCntr && $iconCntr.length) {
				folderStr = _getFolderString(docObj);
				if (SSOUtil.typeOf(rrbGrayColorFolders)=='array' && rrbGrayColorFolders.length && rrbGrayColorFolders.indexOf(folderStr)!=-1) {
					rrbGrayColor = true;
				}
				// 找到對應的文件夾
				$folderList = $iconCntr.find('.folderList > li');
				if ($folderList.length) {
					cnt = $folderList.length;
					for(i=0; i<cnt; i++) {
						$folder = $($folderList[i]);
						if (!!$folder && ($folder.attr('data-folder') === folderStr)) {
							$targetFolioList = $folder.find('.folioList ul');
							break;
						}
					}
					
					if ((typeof $targetFolioList !== 'undefined') && ($targetFolioList!=null) && $targetFolioList.length) {
						var $newItem = _createNewItem_Icon(docObj, rrbGrayColor);
						var newCount = 0;
						$targetFolioList.append($newItem);
						
						// 更新數量
						//1060425 Kevin 修正數量計算錯誤
						//newCount = $targetFolioList.length;
						newCount = $targetFolioList.find('> li').length;
						$folder.find('span.ui-count').text(newCount.toString());
						
						// 未閱讀
						var unread = $folder.find('span.unreadCount > span').text().trim();
						var cnt = parseInt(unread);
						$folder.find('span.unreadCount > span').text('' + (cnt+1));
							
						// update scrollview of FolioList
						for (var idx2 in theSSO.MP.todolist.folderScrolls)
						{
							var theScroller = theSSO.MP.todolist.folderScrolls[idx2];
							if (theScroller.folder===folderStr) {
								theScroller.refresh();
								break;
							}
						}
					}
					else {
						// 2017.9.26 - NCKU10609079, 成大代理人創稿失敗問題修正. (圖示模式新增文件夾作業異常造成!)
						//var sfoldername = docObj.folder + '-' + docObj.subfolder;
						var sfoldername = folderStr;
						
						// 2017.9.15 - 1060802, 若先前有新增文件夾(new message), 列表清單切換到圖示清單後圖示清單內容顯示異常問題!
						var $iconCntr = $('#' + iconCntrId);
						var $targetUL = $iconCntr.find('ul.folderList');
												
						var folderObj = { cnt:1, docs : new Array, proxyFolder: (docObj.ODWMSG.IS_PROXY_DOC === '1') ? true : false, };
						folderObj.docs.push(docObj);
						
						// 尚未有文件夾 => 新增文件夾後再加入物件!
						// update scrollview of FolioList
						var folderIdx = $iconCntr.find('ul.folderList > li').length;
						_buildIconFolder(sfoldername, folderObj, $targetUL, folderIdx);
						
						var $folderList = $iconCntr.find('ul.folderList > li');
						var folderCnt = $folderList.length;
						
						// 設定folderList寬度
						var width = folderCnt * todolist_icon_folder_w;
						$('#iconPane .folderList').css('width', '' + width + 'px');
						
						// 設定各文件夾為scrollable(垂直方向捲動)
						var $folders = $('#iconPane .folioList');
									
						$('#iconPane div#todolist_icon_cntr').width(todolist_icon_folder_w * folderCnt);
						$('#todolist_icon_cntr ul.folderList').width(todolist_icon_folder_w * folderCnt);
						if (!!theSSO.MP.todolist.tdlicon_Scroll) {
							theSSO.MP.todolist.tdlicon_Scroll.refresh();
						}

						// update scrollview of FolderList
						var fid = 'fldr_items_' + folderIdx;
						var newFolderStr = $($folders[folderIdx]).closest('#fldr_' + folderIdx).attr('data-folder');
						var newScroll = new IScroll('#'+fid); // 2017.4.18, iScroll -> IScroll, add '#'
						newScroll.folder = newFolderStr;
						theSSO.MP.todolist.folderScrolls.push(newScroll);

						theSSO.MP.todolist.folderScrolls[folderIdx].refresh();
					}
				}
			}
		}
		/* 加入預覽視窗左方的搜尋清單 */
		function _addSearchIconItem(docObj, searchCntrId) {
			var $searchListCntr = null;
			if (searchCntrId.length)
				$searchListCntr = $('#' + searchCntrId);
				
			var folderStr = '';
			var showItem = false;
			if ($searchListCntr && $searchListCntr.length) {
				folderStr = _getFolderString(docObj);
				if (that.searchListFilterFolder.length) {
					if (that.searchListFilterFolder===folderStr) {
						showItem = true;
					}
				}
				else {
					showItem = true;
				}
				
				// 2019.6.11 - 1080412, Eric Peng
				let sRRBGrayColorFolders = theSSO.User.EnvSettings.get('MP_DOC_COLOR_BY_FOLDER');
				let rrbGrayColorFolders = [];
				if (typeof sRRBGrayColorFolders=='string' && sRRBGrayColorFolders.length) {
					rrbGrayColorFolders = sRRBGrayColorFolders.split(';');
				}
				if (SSOUtil.typeOf(rrbGrayColorFolders)!='array' || rrbGrayColorFolders==null || rrbGrayColorFolders.length==0) {
					rrbGrayColorFolders = [];
				}
				let rrbGrayColor = false;
				if (SSOUtil.typeOf(rrbGrayColorFolders)=='array' && rrbGrayColorFolders.length && rrbGrayColorFolders.indexOf(folderStr)!=-1) {
					rrbGrayColor = true;
				}
				
				var $newItem = _createNewItem_Icon(docObj, rrbGrayColor);
				$searchListCntr.append($newItem);
				
				// 更新文件夾清單內容(由MobiScroll元件選定)
				var id = 'selectedFolder_search';

				// 2019.8.29 - 1080339 Eric, jQuery 3.x upgrade
				var selfolder = $('#selectedFolder_search').val(); //attr('value'); 
				$('#sidePane #' + id).scroller('clear');
				$('#sidePane #' + id).val(selfolder); //attr('value', selfolder);

                // 2023.4.19 - 1120067 Eric, 切換代理角色後, 只顯示特定代理人待辦項目
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

				_initFolderListSpinWheel('selectedFolder_search', true, 'bottom', _doclist_proxy);
			}
		}
		
		var iconCntrId = that.iconCntrId;
		var listCntrId = that.listCntrId;
		var searchCntrId = that.searchListCntrId;
		
		var msgId = docObj.msgId;
		if (typeof msgId === 'undefined' || msgId===null || msgId.length===0) {
			theLogger.error('-ERR- _addHTMLDOMItem() failed. invalid msgId!');
			return;
		}
		
		var folder = _getFolderString(docObj);
		// 清單/搜尋子視窗要檢核是否已有內容, 有才執行!
		var updateList = false, updateSearchList = false;
		var $listCntr=null, $searchCntr=null;
		if (listCntrId.length!=0) {
			if (that.listFilterFolder.length) {
				if (folder===that.listFilterFolder) {
					updateList = true;
				}
			}
			else {
				updateList = true;
			}
			$listCntr = $('#' + listCntrId);
		}
		
		if (searchCntrId.length!=0) {
			if (that.searchListFilterFolder.length) {
				if (folder===that.searchListFilterFolder) {
					updateSearchList = true;
				}
			}
			else {
				updateSearchList = true;
			}
			$searchCntr = $('#' + searchCntrId);
		}

        // 2023.4.19 - 1120067 Eric, ToDo: 待測試確認! 切換代理角色後, 只顯示特定代理人待辦項目
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
		
		if (updateList) {
			// 2020.7.20 - 1090390 Eric, 傳送失敗reply/process error message處理修改!
			let _itemInserted = _addListItem(docObj, listCntrId);
			
			// 2016.9.30 - Eric, -= => +=
			// 更新燈號統計
			var lightInfo = _getLightInfo(docObj);
			var light = lightInfo.light;
			if (light!=undefined && light.length>0) { 
				switch(light) {
				case 'red': that.lights.red += 1; break;
				case 'yellow': that.lights.yellow += 1; break;
				case 'white': that.lights.white += 1; break;
				case 'green': that.lights.green += 1; break;
				case 'purple': that.lights.purple += 1; break;
				}
				$('#todolistToolbar .' + light + '_cnt').text(that.lights[light]);
			}

			// 2020.7.20 - 1090390 Eric, 傳送失敗reply/process error message處理修改!
			if (_itemInserted) {
				// 新增項目後應更新sortable table
				let $tableForSort = $('.sData #todolist_tb');
				if ($tableForSort.length) {
					// get sorting info.
					let idx=0, sorting=null, sortDir=0;
					/*{ 
						// Eric Peng [更新清單後立即sort!]
						//  1. 比對目前sort設定, 若同項目, 則反向! 不同項目, 則依欄位預設屬性正/反向
						//  2. 作業完成記錄sort設定於 <table data-sortIndex='xxx' data-sortReverse='x'>, 以供下次排序作業比對.
						let sIndex = $('.sData #todolist_tb').attr('data-sortIndex');
						let currentIndex = parseInt(sIndex);
						
						let defaultSortIdx = theSSO.MP.todolist.builder.getDefaultSortIndex(); // 預排使用文號排序
						idx = defaultSortIdx;
						let sReverseSort;
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
					}*/

					theLogger.log('-I- TDLBuilder.addHTMLDOMItem() $tableForSort "update" triggered.');
					$tableForSort.trigger('update', { 
						callback: function() {
							SSOUtil.loading('show');
							if (!!sorting) { // 2016.12.8 - Eric Peng, 可能未排序
								var $tableForSort = $("#listPane .sData #todolist_tb");
								// 記錄本次排序設定.
								$tableForSort.attr({'data-sortIndex': idx.toString(), 'data-sortReverse': sortDir.toString()});
								// 觸發排序作業.
								$tableForSort.trigger("sorton",[sorting]);
							}
							SSOUtil.loading('hide');
						},
					});
				}
			}
			
		}
		else if ($listCntr && ($listCntr.length>0)) {
			/* ToDo: 若為新的文件夾 : update folder selector drop-down list */
			
			// 更新文件夾清單內容(由MobiScroll元件選定)
			var id = 'selectedFolder';
			// 2019.8.29 - 1080339 Eric, jQuery 3.x upgrade
			var selfolder = $('#selectedFolder').val(); //attr('value'); 
			$('#listPane #' + id).scroller('clear');
			$('#listPane #' + id).val(selfolder); //attr('value', selfolder);

            // 2023.4.19 - 1120067 Eric, 切換代理角色後, 只顯示特定代理人待辦項目
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
		}
		
		/* ToDo: 若為新的文件夾 - 新增FOLDER */
		_addIconItem(docObj, iconCntrId);
		
		if (updateSearchList) {
			_addSearchIconItem(docObj, searchCntrId);
			
			// ToDo: 若為新的文件夾, update folder selector drop-down list
		}
		else if ($searchCntr && ($searchCntr.length>0)) {
			// 更新文件夾清單內容(由MobiScroll元件選定)
			var id = 'selectedFolder_search';
			// 2019.8.29 - 1080339 Eric, jQuery 3.x upgrade
			var selfolder = $('#selectedFolder_search').val(); //attr('value'); 
			$('#sidePane #' + id).scroller('clear');
			$('#sidePane #' + id).val(selfolder); //attr('value', selfolder);

            // 2023.4.19 - 1120067 Eric, 切換代理角色後, 只顯示特定代理人待辦項目
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
			_initFolderListSpinWheel('selectedFolder_search', true, 'bottom', _doclist_proxy);
		}
	}

	/* 2019.2.19 - 1080113 Eric, 調整新增項目是否顯示 */
	function _insertHTMLDOMItem(docObj) {
		_addHTMLDOMItem(docObj);
	}

	/* 公文傳送失敗時, 復原待辦清單項目 */
	function _restoreMsg(docObj) {
		var _docObj = _getDocByMsgId(docObj.msgId);
		if (!!_docObj) {
			if (typeof _docObj.submitProcessing!=='undefined') {
				delete _docObj.submitProcessing;
			}
			_addHTMLDOMItem(_docObj);
		}
	}
	/* 2015.6 - AOL關閉後更新todolist公文項目 */
	function _updateDocObj(msgId, newDocObj) {
		var docCnt = _doclist.length;
		var docObj = null;
		var updateUnread = false;
		for(var i=0; i<docCnt; i++)
		{
			docObj = _doclist[i];
			
			// 2016.8.27 - 草稿須比對ICUserId
			if (docObj.isDraft) {
				if (docObj.ICUserId!=newDocObj.ICUserId) {
					continue;
				}
			}
			
			if (docObj.msgId==msgId) {
				
				if (docObj.signTime.length==0 && newDocObj.signTime.length) {
					unpdateUnread = true;
				}
				
				var sNewDocObj = JSON.stringify(newDocObj);
				var _objNew = JSON.parse(sNewDocObj);
				
				// 2016.8.27 - 刪除MPDocObj屬性!
				delete _objNew.nextOptions;
				delete _objNew.ODWWKF;
				delete _objNew.ODWDCM;
				delete _objNew.uiParam;
				
				if (!!_objNew) {
					_objNew.submitProcessing = false;
					_doclist[i] = _objNew;
										
					// 更新首頁/燈號/未閱讀等顯示
					theStart.InitFlotImp();
					
					_updateToDoListHtmlItem(_objNew);
					
					//1120217	Leslie[1110881]	銓敘部-序14，增加可以一併更新MsgID
					if('newMsgId' in _objNew && _objNew.newMsgId.length !== 0){
						_doclist[i].msgId = _objNew.newMsgId;
						_doclist[i].isDraft = _isDraftMsgId(_objNew.newMsgId)
					}
					
					// 清單/燈號統計數字!
					
					return true;
				}
			}
		}
		return false;
	}
	
	/* 2017.2.24 - 開啟公文前重取ODWMSG後更新todolist公文項目 */
	function _updateDocObjByODWMSG(msgId, odwmsgNode) {
		var _objNew = _getDocFromODWMSG(odwmsgNode);
		if (typeof _objNew=='undefined' || _objNew===null) {
			theLogger.error('ERROR! todolist.builder._updateDocObjByODWMSG() failed. cannot build docObj from odwmsgNode');
			return false;
		}
		
		var docCnt = _doclist.length;
		var docObj = null;
		var isProxy = 'N';
		for(var i=0; i<docCnt; i++)
		{
			docObj = _doclist[i];
			
			// 草稿公文不支援, 直接跳過
			if (docObj.isDraft) { continue;	}
			
			if (docObj.msgId==msgId) {
				if (typeof _objNew=='object' && !!_objNew) {
					_doclist[i] = _objNew;
					_updateToDoListHtmlItem(_objNew);
					return true;
				}
			}
		}
		return false;
	}
	
	/* 2016.3 - 檢核是否應更新待辦顯示UI項目, Flags: 0x1:圖示, 0x2:清單, 0x4:預覽窗格左方清單 */
	function _getContainerUIUpdateFlag() {
		var flag = 1; /*目前行動平台實作, 登入後預設為圖示模式, 故一律須更新 */
		var listCntrId = that.listCntrId;
		var searchCntrId = that.searchListCntrId;
		var $todoitem_list = null;
		var $todoitem_search = null;
		// 清單/搜尋子視窗要檢核是否已有內容, 有才執行!
		var updateList = false, updateSearchList = false;
		if (listCntrId.length!=0) {
			$todoitem_list = $('#' + listCntrId + ' tr');
			if ($todoitem_list.length) {
                flag += 2;
            }
		}
		
		if (searchCntrId.length!=0) {
			$todoitem_search = $('#' + searchCntrId + ' li');
			if ($todoitem_search.length) {
                flag += 4;
            }
		}
		return flag;
	}
	
	/* 2016.6 - 取得首頁統計數量:已逾期/將逾期/未閱讀 */
	function _getToDoListNumbers() {
		function _getUnreadCount(doclist) {
			var unread = 0;
			var docCnt = doclist.length;
			var docObj = null;
			
			var excludeFolders = [];
			var sExcludeFolders = theSSO.User.EnvSettings.get('UNREAD_EXCLUDE_FOLDERS');
			if (!!sExcludeFolders && sExcludeFolders.length) {
				excludeFolders = sExcludeFolders.split(';');
			}
			
			return _getUnreadDocCount(doclist, excludeFolders);
		}
		
		var _red= that.lights.red;
		var _yellow= that.lights.yellow;
		var _unread=_getUnreadCount(_doclist);

		return {
			red: _red,
			yellow: _yellow,
			unread: _unread
		};
	}
	
	//1110401	Leslie[1110167]	增加可指定條件
	//function _getFolderItemCount(folder, subfolder) {
	function _getFolderItemCount(folder, subfolder, options) {
		var folderOnly = (typeof subfolder==='undefined') ? true : false;
		var targetFolder = folderOnly ? folder : folder + '-' + subfolder;
		var i=0, itemCount=0;
		var docFolder = '';
		var docObj = null;
		
		var docCnt = _doclist.length;
		for(i=0; i<docCnt; i++)
		{
			docFolder = '';
			docObj = _doclist[i];
			if (!!docObj) {
				docFolder = folderOnly ? docObj.folder : docObj.folder + '-' + docObj.subfolder;
				if (docFolder.length && (docFolder==targetFolder)) {
					//1110401	Leslie[1110167]	增加可指定條件
					if(typeof options == 'object' && 'filter' in options && 'value' in options && 'equal' in options){
						if(options.filter in docObj){
							if(options.equal && docObj[options.filter] == options.value)
								itemCount++;
							else if(!options.equal && docObj[options.filter] != options.value)
								itemCount++;
						}
					}
					//1110912	Leslie	修正找不到原因沒有被刪掉的"待處理-覆閱"件數(比照文件夾算法，該件狀態為"傳送中"，不計入件數)
					else if(typeof docObj.submitProcessing=='boolean' && docObj.submitProcessing===true)
						continue;
					else	//1110401	Leslie[1110167]	增加可指定條件	==END==
					itemCount++;
					continue;
				}
			}
		}
		
		return itemCount;
	}
	
	function _checkMsgValidity(artifact, docObj) {
		var _dfd = null;
		var isDraft = _isDraftMsg(docObj);
		if (isDraft) {
			_dfd = $.Deferred();
			_dfd.resolve({success:true, valid:true});
		}
		else {
			_dfd = theWebServices.odmssp.isMsgInVaild(artifact, docObj.msgId);
		}
		return _dfd.promise();
	}
	
	function _isDraftMsgId(msgId) {
		// 草稿MsgId格式: $MsgId$_$ICUserId$
		if (!!msgId && msgId.length) {
			var nMsgId = -1;
			if (msgId.indexOf('_')!==-1) {
				var msgIdInfo = msgId.split('_');
				if (msgIdInfo.length>=2) {
					var nMsgId = parseInt(msgIdInfo[0]);
					if (nMsgId>=window.sso_const.DRAFT_MSG_ID_START && nMsgId<=window.sso_const.DRAFT_MSG_ID_END) {
						return true;
					}
				}
				return false;
			}
			else {
				nMsgId = parseInt(msgId);
				if (nMsgId>=window.sso_const.DRAFT_MSG_ID_START && nMsgId<=window.sso_const.DRAFT_MSG_ID_END) {
					return true;
				}
			}
		}
		return false;
	}
	
	function _isDraftMsg(docObj) {
		var msgId = docObj.msgId;
		if (docObj.signType!=='E' && docObj.signType!=='P')
			return false;
		
		// 草稿MsgId格式: $MsgId$_$ICUserId$
		return _isDraftMsgId(msgId);
	}
	
	/* 創稿作業
	 *
	 * pDocReason:
	 *   code: 代碼
	 *   desc: 文字說明(可自行輸入項目才有) */
	function _createNewDoc(SAMLart, signType, pDocReason, role, docType) {
		var orgNo='', ouId, ouName, roleNo, roleName, account, empName;
		var cRuleNo= '', nesrReason='';
		
		var _dfd = $.Deferred();
		if (role==null) {
			theLogger.error('ERROR! _createNewDoc() 無法取得創稿角色內容!');
			_dfd.reject({success:false, _showError:true, _errMsg:'無法取得創稿角色內容'}); // 2019.8.20 - 1080701 Eric, fix reject return object
			return _dfd.promise();
		}
		
		var isProxyUser = false;
		if (typeof role.proxyAccount !== 'undefined' && role.proxyAccount.length) {
			isProxyUser = true;
		}
		
		orgNo = role.orgNo;
		ouId = role.unitNo;
		roleNo = role.id;
		roleName = role.name;
		//1051006 David 修正代理人創稿取代理人帳號資訊錯字問題
		//account = isProxyUser ? role.proxyAccunt : theSSO.User.account;
		account = isProxyUser ? role.proxyAccount : theSSO.User.account;
		empName = isProxyUser ? role.proxyUserName : theSSO.User.name;
		
		if (signType=='P' && pDocReason!==null && pDocReason.needReason===true) { // 2016.9.8 - pDocReason新增needReason,告知是否提供紙本簽核原因.
			cRuleNo = pDocReason.code;
			nesrReason = pDocReason.desc;
		}
		
		var orgNode = SSOUtil.getOrgNode(orgNo)
		ouName = SSOUtil.getOrgUnitName(orgNode, ouId);

		// 1130809 Raymond 1130313 合併1111007(1100394), 離線版改成非同步
		//theWebServices.odmssp.newDraft(SAMLart, orgNo, signType, ouId, ouName, roleNo, roleName, account, empName, cRuleNo, nesrReason, docType)
		theWebServices.odmssp.newDraft(SAMLart, orgNo, signType, ouId, ouName, roleNo, roleName, account, empName, cRuleNo, nesrReason, docType, {async: true})
		.then(function(rslt){
			var _docObj = null, odwmsgNode = null;
			var sODWMSG = rslt.sODWMSG;
			
			var xmlDOM = (new window.DOMParser()).parseFromString(sODWMSG, 'text/xml');
			var $odwmsgNode = $(xmlDOM).find('ODWMSG');
			if (!!$odwmsgNode && $odwmsgNode.length) {
				// 2019.3.21 - 1080197, 草稿傳送後, 未收到RTC回傳前創稿, todolist會有2筆相同MsgId公文問題修正.
				//  => 創稿時取得MsgId/ICUserId後, 檢核待辦清單是否有相同MsgId+ICUserId項目, 若有, 則先刪除之.
				var newMsgId = SSOUtil.xml_getChildNodeValue($odwmsgNode[0], 'MSG_ID');
				var newICUserId = SSOUtil.xml_getChildNodeValue($odwmsgNode[0], 'IC_USER_ID');
				var _existDocObj = _getDocByMsgId(newMsgId, newICUserId);
				if (_existDocObj!=null && typeof _existDocObj.submitProcessing=='boolean' && _existDocObj.submitProcessing==true) {
					_deleteMsg(_existDocObj, true, false);
					theLogger.log('-I- newDocProc() 刪除重複MsgId項目: MsgId=' + newMsgId + ', ICUserId=' + newICUserId);
				}

				_docObj = _insertNewMsg($odwmsgNode[0]);
				if (_docObj) {
					// 2019.8.20 - 1080701 Eric, 客委會重複文號問題
					// let _docObjInList = _getDocByMsgId(newMsgId, newICUserId);
					// if (typeof _docObjInList.docNo=='string' && _docObjInList.docNo.length) {
					// 	_deleteMsg(_docObjInList, true, false);
					// 	let errMsg = '創稿公文加入ToDoList清單後已有文號, MsgId=' + _docObjInList.msgId + 
					// 				  ', ICUserId=' + _docObjInList.ICUserId + ', docNo=' + _docObjInList.docNo;
					// 	_dfd.reject({success:false, _showError:true, _errMsg:errMsg});
					// }
					// else {
						//1050824 David 後續RD.NewDoc.js內theSSO.MP.newDocProc()會新增待辦，此處不需要
						//_addHTMLDOMItem(_docObj);
						_dfd.resolve({success:true, docObj: _docObj});
					//}
					return;
				}
			}
			_dfd.reject({success:false, _showError:true, _errMsg:'ODWMSG內容異常, 無法取得XMLNode, sODWMSG=' + sODWMSG}); // 2019.8.20 - 1080701 Eric, fix reject return object
		})
		.fail(function(e) {
			// 2019.8.20 - 1080701 Eric, fix reject return object
			let _addShowError = true;
			if ('_showError' in e) {
				_addShowError = false;
			}
			if (_addShowError) {
				_dfd.reject($.extend({success:false, _showError:true}, e));
			}
			else {
				_dfd.reject($.extend({success:false}, e));
			}
		})
		
		return _dfd.promise();
	}
	
	/* 以提供的ODWMSG/ODWDCM內容建立一個 MPDocObject */
	function _docFromODWMSGObj(isDraft, odwmsg, odwdcm) {
		if (typeof odwmsg=='undefined' || odwmsg==null ||
			typeof odwdcm=='undefined' || odwdcm==null) {
			return null;
		}
		
		var doc = {};
		doc.isDraft = isDraft;
		msgId = odwmsg.MSG_ID;
		if (msgId.indexOf('_')!==-1) {
			msgId = msgId.substring(0, msgId.indexOf('_'));
		}
		doc.msgId = msgId;
		
		doc.docNo = odwmsg.DOC_NO;
		doc.signType = odwmsg.SIGN_TYPE;
		doc.ICOUName = odwmsg.IC_OU_NAME;
		doc.ICOUId = odwmsg.INCHARGE_OU;
		doc.ICUserName = odwmsg.IC_USER_NAME;
		doc.ICUserId = odwmsg.IC_USER_ID;
		if (doc.ICUserId.length) {
			doc.ICUserId = doc.ICUserId.toUpperCase();
		}
		doc.sourceOrgNo = odwmsg.SOURCE_ORGNO;
		doc.subject = odwmsg.SUBJECT;
		doc.fromSubject = odwmsg.FROM_SUBJECT;
		
		doc.dueDate = odwmsg.DUE_DATE;
		doc.outLMT = odwmsg.MSG_OUT_LMT;
		doc.alarmLMT = odwmsg.MSG_ALM_LMT;
		doc.alarmTime = odwmsg.ALARM_TIME;
		doc.docState = odwmsg.DOC_STATE;
		
		doc.secret = odwmsg.SECRETE;
		doc.speed = odwmsg.SPEED;
		doc.folder = odwmsg.FOLDER;
		doc.subfolder = odwmsg.SUBFOLDER;
		doc.signTime = odwmsg.SIGN_TIME; // 若有表示已閱讀...
		doc.newTime = odwmsg.NEW_TIME; // 送方傳送時間
		doc.fromOUName = odwmsg.FROM_OU; // 送文單位
		
		// 2013.4
		doc.ownOUId = odwmsg.OWN_OU_ID;
		doc.ownUserId = odwmsg.OWN_USER_ID;
		if (doc.ownUserId.length) {
			doc.ownUserId = doc.ownUserId.toUpperCase();
		}
		
		// 2013.9
		doc.ownRoleId = odwmsg.OWN_ROLE_ID;
			
		// 2013.9 - 傳送
		doc.txName = odwmsg.TX_NAME;
		doc.toUserName = odwmsg.TO_USER_NAME; // 傳送至
		doc.toUserId = odwmsg.TO_USER_ID;
		if (doc.toUserId.length) {
			doc.toUserId = doc.toUserId.toUpperCase();
		}
		doc.toRoleName = odwmsg.TO_ROLE_NAME;
		doc.toRoleId = odwmsg.TO_ROLE_ID;
		doc.toOUName = odwmsg.TO_OU_NAME;
		doc.toOUId = odwmsg.TO_OU_ID;
		
		/* 公文電子檔位置(FileIO WS + disk path)
		 *<STORAGE_PATH>D:\FILESRV_DATA\FILE_PATH\upload</STORAGE_PATH>
		 *<SUB_DIR>301060000C\10101\04\1010500001</SUB_DIR>
		 *<WEB_SERVICE>http://deva.nfa.com.tw/WebFileIo/T2100FileIOService.asmx</WEB_SERVICE>
		 */
		doc.fileIOWS = odwmsg.WEB_SERVICE;
		doc.fileStoragePath = odwmsg.STORAGE_PATH;
		doc.fileSubDir = odwmsg.SUB_DIR;
		
		/* 2014.1 - for公文核決. */
		doc.appUserId = odwmsg.APP_USER_ID;
		doc.appUserName = odwmsg.APP_USER_NAME;
		doc.appRoleId = odwmsg.APP_ROLE_ID;
		doc.rejectUserName = odwmsg.REJECT_USER_NAME;
		
		
		var _odwmsgObj = $.extend(true, {}, odwmsg);
		doc.ODWMSG = _odwmsgObj;
		var _odwdcmObj = $.extend(true, {}, odwdcm);
		doc.ODWDCM = _odwdcmObj;
		
		// 2022.4.19	Leslie[1110064]	信保新增收創文日期
		doc.rcvDate = odwmsg.RCV_DATE;
		
		//1110927	Leslie[1110889]	新增欄位
		doc.keyWord = odwmsg.KEY_WORD;
		doc.taType = odwmsg.TA_TYPE;
		doc.MOCSdocPty = odwmsg.MOCS_DOCPTY;
		//1111122 Kevin 1111287 新增流程
		doc.docProc = '';
		
		var newDoc = new MPDocObj(JSON.stringify(doc));
		return newDoc;
	}
	
	function _getToDoListCount() {
		return _doclist.length;
	}
	
	function _setHideLights(hideLights, showResupply) {
		if (hideLights) {
			that.hideLights = true;
			if (showResupply) {
				that.showReSupplyStatus = true;
				that.listHeader = _listHeader.hideLightReSupplyALM;
			}
			else {
				that.showReSupplyStatus = false;
				that.listHeader = _listHeader.hideLight;
			}
			that.narrowWindow = false; // 2018.10.1 - 1070955
		}
		else if (showResupply) {
			that.hideLights = false;
			that.showReSupplyStatus = true;
			if (window.innerWidth<=1024) {
				that.listHeader = _listHeader.ss_normalReSupplyALM;
			}
			else {
				that.listHeader = _listHeader.normalReSupplyALM;
			}
		}
		else {
			that.hideLights = false;
			that.showReSupplyStatus = false;
			// 2021.2.19 - 1090927 Eric, support iPhone landscape
			if (window.SDLMode) {
				that.listHeader = that.hideTransInfo?_listHeader.sdl_hideTransInfo:_listHeader.sdl_normal;
				that.narrowWindow = true;
			}
			else if (window.innerWidth<=1024) {
				that.listHeader = that.hideTransInfo?_listHeader.ss_hideTransInfo:_listHeader.ss_normal;
				that.narrowWindow = true; // 2018.10.1 - 1070955
			}
			else {
				that.listHeader = _listHeader.fullMPCol; // 2018.9.28 - 1070955
				that.narrowWindow = false; // 2018.10.1 - 1070955
			}
		}
	}
	
	function _shouldHideLights() {
		return that.hideLights;
	}
	
	function _setHideTransInfo(hideTransInfo) {
		that.hideTransInfo = true;
		// 2021.2.19 - 1090927 Eric, support iPhone landscape
		// 2018.9.28 - 1070955
		//that.listHeader = hideTransInfo?_listHeader.hideTransInfo:_listHeader.nornaml;
		if (window.SDLMode) {
			that.listHeader = _listHeader.sdl_hideTransInfo;
			that.narrowWindow = true;
		}
		else {
			that.listHeader = (window.innerWidth<=1024)?_listHeader.ss_hideTransInfo:_listHeader.fullMPCol;
			that.narrowWindow = (window.innerWidth<=1024)?true:false;
		}
	}

	// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期，add showRcvDate
	// 2019.2.21 - 1080211, add showDocPropertyLen
    // 2019.1.24 - 1071075, 新增[公文性質]欄位
	// 2018.09.28 - 1070955
	function _setShowColumns(hideLights, showSignType, showSignDueDate, showICOU, showICUser, hideTransInfo, showFromOU, showFromOrg, 
							 showCurrLoc, showCurrLocFolder, showCurrLocSubFolder, 
							 showDocProperty, showDocPropertyLen, showRcvDate) 
	{
		//1111124	Leslie[1111127]	修改MP清單圖示顯示方式，並支援依客製化設定改為文字圖示
		if(theCustom.getCustomSet('TodoListWordIcon') == 'Y')
			clsWord = 'Word';
		
		if (hideLights) {
			return _setHideLights(hideLights, false);
		}

		var _showCurrLocFolder = '', _showCurrLocSubFolder='';
		if (showCurrLoc) {
			if (typeof showCurrLocFolder=='string') {
				_showCurrLocFolder = showCurrLocFolder;
			}
			if (typeof showCurrLocSubFolder=='string') {
				_showCurrLocSubFolder = showCurrLocSubFolder;
			}
		}
		
		that.narrowWindow = false; // screen_w<=1024
		// 2021.2.19 - 1090927 Eric, support iPhone landscape
		if (window.SDLMode) {
			that.listHeader = hideTransInfo?_listHeader.sdl_hideTransInfo:_listHeader.sdl_normal;
			that.narrowWindow = true;
		}
		else if (window.innerWidth<=1024) {
			that.narrowWindow = true;
			that.listHeader = hideTransInfo?_listHeader.ss_hideTransInfo:_listHeader.ss_normal;
			theLogger.log('-I- tdlBuilder.setShowColumns() narrowWindow=true, used header="' + (hideTransInfo?'ss_hideTransInfo"':'ss_normal"'));
		}
		//1110926	Leslie[1110889]	新增客製化欄位設定功能
		else if('CustomSet' in theCustom && 'CustomTodoSet' in theCustom.CustomSet && Array.isArray(theCustom.CustomSet.CustomTodoSet)){
			let tmpTodoSet = theCustom.CustomSet.CustomTodoSet;
			var sMPCol = '<table id="todolist_tb"> <!-- 傳統條列式待辦事項清單 -->' +
					   '<thead> <!-- todolist 標題列 -->' +
					     '<tr>';
			let tmpHeader = tmpTodoSet.reduce(function(s,o){return s+_customTodo[o].Header},"");
			sMPCol += tmpHeader + '</tr></thead><tbody> <!-- 待辦事項清單內容 --></tbody></table>'
			that.listHeader = sMPCol;
			tmpTodoSet.forEach(function(o){ 
				if('SetName' in _customTodo[o]){
					that[_customTodo[o].SetName] = true;	//設定欄位要顯示(用來配合後面有些欄位調整的邏輯)
				}
			})
			return;
		}
		// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期，add showRcvDate，1120605 Leslie add !showSignDueDate
		else if (!showSignType || !showICOU || !showICUser || hideTransInfo || !showFromOU || showFromOrg || showDocProperty || showRcvDate || !showSignDueDate) {
			that.listHeader = _buildListHeader(hideLights, showSignType, showSignDueDate, showICOU, showICUser, hideTransInfo, showFromOU, showFromOrg, 
											   showCurrLoc, showDocProperty, showDocPropertyLen, showRcvDate); // 2019.2.21 - 1080211, add showDocPropertyLen	// 2022.4.19 - 1110064, add showRcvDate
			theLogger.log('-I- tdlBuilder.setShowColumns() narrowWindow=false, used header=[Customized columns header]');
		}
		else {
			that.listHeader = _listHeader.fullMPCol;
			theLogger.log('-I- tdlBuilder.setShowColumns() narrowWindow=false, used header="fullMPCol"');
		}

		that.hideLights = hideLights; 			// 登記桌隱藏燈號欄位
		that.hideTransInfo = hideTransInfo; 	// 隱藏異動別/傳送至欄位!
		that.showSignType = showSignType; 		// 隱藏簽核類型
		that.showSignDueDate = showSignDueDate; // 陳核限辦日 (OD_SIGNDUEDATE第一個設定值若為Y, ODWMSG的SIGN_DUEDATE才會有值!)
		that.showICOU = showICOU; 				// 顯示承辦單位
		that.showICUser = showICUser; 			// 顯示承辦人
		that.showFromOU = showFromOU;  			// 顯示送文單位
		that.showFromOrg = showFromOrg;			// 顯示來文機關
		that.showCurrLoc = showCurrLoc;			// 顯示[目前位置]
		that.showDocProperty = showDocProperty; // 2019.1.24 - 1071075, 新增[公文性質]欄位
		// 2019.2.21 - 1080211, [公文性質]欄位可指定長度(字數)
		if (showDocProperty) {
			// 2019.2.21 - 10802115, [公文性質]欄位可指定顯示字數
			if (typeof showDocPropertyLen!='number' || showDocPropertyLen<1) {
				showDocPropertyLen = 5;
			}
			else if (showDocPropertyLen>15) {
				showDocPropertyLen = 15;
			}
			that.showDocPropertyLen = showDocPropertyLen;
		}

		if (showCurrLoc && (typeof _showCurrLocFolder=='string' && _showCurrLocFolder.length) && 
			(typeof _showCurrLocSubFolder=='string' && _showCurrLocSubFolder.length)) {
			that.showCurrLocFolder = _showCurrLocFolder;      // 顯示[目前位置]之Folder
			that.showCurrLocSubFolder = _showCurrLocSubFolder;	// 顯示[目前位置]之SubFolder
		}
		else {
			that.showCurrLocFolder = '';
			that.showCurrLocSubFolder = '';
		}
		that.showRcvDate = showRcvDate;		// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期
		//1110614 David 1110281 依照系統參數MP_NOTIFY_SHOW_DEPTINFO設定判斷是否顯示通知類型的單位人員資訊
		that.NotifyShowDeptInfo = (!!theSSO.User.SystemSets['MP_NOTIFY_SHOW_DEPTINFO'] && theSSO.User.SystemSets['MP_NOTIFY_SHOW_DEPTINFO'] == 'Y');
	}
	
	// 2018.10.2 - 1070955, 取得應顯示目前位置欄位的設定值!
	function _showCurrLocate() {
		return that.showCurrLoc;
	}
	// 2018.10.1 - 1070955, 取得應顯示目前位置欄位的folder-subfolder
	function _getShowCurrLocFolder() {
		if (that.showCurrLoc) {
			if (that.showCurrLocFolder.length && that.showCurrLocSubFolder.length) {
				return that.showCurrLocFolder + '-' + that.showCurrLocSubFolder;
			}
		}
		return '';
	}
	
	//1110927	Leslie[1110889]	使用客製化欄位，且設定要顯示目前位置時，一律顯示白燈
	function _showCurrLocateAlways(){
		return !!that.showCurrLocAlways;
	}
	
	function _shouldHideTransInfo() {
		return that.hideTransInfo;
	}
	
	function _shouldShowResupply() {
		return that.showReSupplyStatus;
	}
	
	function _getListHeader() {
		return that.listHeader;
	}
	
	/* 取得預設排序欄位index, 目前為文號欄位, 依是否隱藏燈號及顥示補件狀況回傳該欄位實際序號 */
	function _getDefaultSortIndex() {
		var $listPane = $('#tdlPane #listPane');
		if ($listPane.length==0) return -1;

		var $headTable = $('#listPane #todolist_cntr .sHeader table');
		var $_th = $headTable.find('thead > tr > th');
		var i=0, sortIndex=-1;
		var $theTH = null;
		for (i=0; i<$_th.length; i++) {
			$theTH = $($_th[i]);
			if ($theTH.data('prop')=='docNo') {
				sortIndex = i;
				break;
			}
		}
		return sortIndex;
	}
	
	function _resortList(sorting) {
		var sIndex='', currentIndex=-1;
		var sortDir = 0;
		var defaultSortIdx = theSSO.MP.todolist.builder.getDefaultSortIndex(); // 預排使用文號排序
		var idx = 0;
		if (SSOUtil.typeOf(sorting)!=='array' || (sorting.length!=1&&sorting.length!=2)) {
			sIndex = $('.sData #todolist_tb').attr('data-sortIndex');
			if (typeof sIndex != 'string' || sIndex.length===0) {
				currentIndex = defaultSortIdx;
			}
			else {
				currentIndex = parseInt(sIndex);
				if (currentIndex<0) {
					currentIndex = defaultSortIdx;
				}
			}
			
			var sReverseSort;
			if (currentIndex!==-1) {
				if (currentIndex==defaultSortIdx) {
					sReverseSort = $('.sData #todolist_tb').attr('data-sortReverse');
					if (typeof sReverseSort != 'string') {
						sReverseSort = '0';
					}
					sortDir = (sReverseSort=='0' || sReverseSort==='') ? 0 : 1;//code
					sorting = [[defaultSortIdx, sortDir]];
					idx = defaultSortIdx;
				}
				else {
					sReverseSort = $('.sData #todolist_tb').attr('data-sortReverse');
					if (typeof sReverseSort != 'string') {
						sReverseSort = '0';
					}
					sortDir = (sReverseSort=='0' || sReverseSort==='') ? 0 : 1;//code
					sorting = [[currentIndex, sortDir], [defaultSortIdx, 0]];
					idx = currentIndex;
				}
			}
		}
		
		// 2015.9 - 排序元件update cache內容.
		var $tableForSort = $('.sData #todolist_tb');
		$tableForSort.trigger('update', {
			callback : function() {
				// 排序!
				if (!!sorting) { // 2016.12.8 - Eric Peng, 可能未排序
					$tableForSort.trigger("sorton", [sorting]);
					// 記錄本次排序設定.
					$('.sData #todolist_tb').attr({'data-sortIndex': idx.toString(), 'data-sortReverse': sortDir.toString()});
				}
			}
		});
	}
	
	function _setMsgE2P(theDocObj, E2PCode, E2PReason) {
		var _E2PDfd = $.Deferred();
		
		var isDraft = theDocObj.isDraft;
		var sNewDocObj = JSON.stringify(theDocObj)
		var _objNew = JSON.parse(sNewDocObj);
				
		// 2016.8.27 - 刪除MPDocObj屬性!
		delete _objNew.nextOptions;
		delete _objNew.ODWWKF;
		delete _objNew.ODWDCM;
		delete _objNew.uiParam;
	
		if (!!_objNew) {
			var SAMLart = localStorage.Artifact;
			_objNew.submitProcessing = false;
			
			var dfd = null;
			if (isDraft) {
				//1120322 David 新增傳入公文文號
				//dfd = theWebServices.odmssp.SetMsgE2PForDraft(SAMLart, _objNew.sourceOrgNo, _objNew.ICUserId, _objNew.msgId, E2PCode, E2PReason);
				dfd = theWebServices.odmssp.SetMsgE2PForDraft(SAMLart, _objNew.sourceOrgNo, _objNew.ICUserId, _objNew.msgId, E2PCode, E2PReason, _objNew.docNo);
			}
			else {
				var remotePath = SSOUtil.combineLocalPath(_objNew.fileStoragePath, _objNew.fileSubDir);
				dfd = theWebServices.odmssp.SetMsgE2P(SAMLart, _objNew.sourceOrgNo, _objNew.msgId, _objNew.docNo, remotePath, _objNew.fileIOWS, E2PCode, E2PReason);
			}
			
			dfd.done(function(rslt) {
				if (rslt.success) {
					// 先移除原有顯示項目
					_deleteMsg(_objNew, false, true);

					//1120322 David 草稿轉紙本完成後一律轉為正式公文，不需處理後續待辦更新，SetMsgE2PForDraft會發送新進待辦
					if(isDraft){
						_deleteDoc(_objNew.msgId, _objNew.ICUserId);
						_E2PDfd.resolve({success:true});
						return;
					}

					// 改欄位值
					_objNew.ODWMSG.SIGN_TYPE='P';
					_objNew.signType='P';
					if (isDraft) {
						_objNew.ODWMSG.SUBFOLDER='紙本簽核';
						_objNew.subfolder='紙本簽核';
						
						//XX // 若MP為列表模式, 且目前顯示[草稿-紙本簽核]公文夾, 則應移除本筆待辦(已改為紙本簽核)
					}
	
					// 取代原有項目
					var docCnt = _doclist.length;
					var docObj = null;
					var updateUnread = false;
					for(var i=0; i<docCnt; i++)
					{
						docObj = _doclist[i];
						
						// 草稿須比對ICUserId
						if (docObj.isDraft) {
							if (docObj.ICUserId!=_objNew.ICUserId) {
								continue;
							}
						}
						
						if (docObj.msgId==_objNew.msgId) {
							_doclist[i] = _objNew;
							break;
						}
					}

					// re-insert to display items
					_addHTMLDOMItem(_objNew);
					_E2PDfd.resolve({success:true});
				}
				else {
					_E2PDfd.reject(rslt);
				}
			})
			.fail(function(rslt) {
				_E2PDfd.reject(rslt);
			});
		}
		else {
			_E2PDfd.reject({success:false, errMsg:'處理公文基資內容時發生錯誤!'});
		}
		return _E2PDfd.promise();
	}
	
	// 2019.7 - 1080xxx Eric, 自動開啟次筆公文!
	//  ToDo: 1. 確認代理公文作業是否正常!
	function _getENextId(msgId, enableAdvMode) {
		enableAdvMode = (typeof enableAdvMode=='boolean')?enableAdvMode:false;
		msgId = (typeof msgId=='string')?msgId:'';

		// 2021.3.3 - 1090927 Eric Peng, MS Edge study.
		theLogger.log('-I- _getENextid(msgId=' + msgId + ', enableAdvMode=' + enableAdvMode + ') invoked...');

		// (列表模式)由目前顯示的清單取得次筆待辦公文
		function _getENextId_list($tdlContainer, currentFolder, startIndex, fromHead) {
			startIndex = (typeof startIndex=='number')?startIndex:0;

			$tdlList = $tdlContainer.find('tr');
			let docCount = $tdlList.length
			if (startIndex>=docCount) {
				theLogger.error('Error! todolist.builder._getENextId_list() startIndex超出公文夾內公文數量!\n');
				return null;
			}

			let idx=0;
			for(idx=startIndex; idx<docCount; idx++) {
				let $tr = $($tdlList[idx]);
				let _msgIdThis = $tr.attr('data-msgid');
				if (_msgIdThis!=msgId) {
					let _docObjThis = _getDocByMsgId(_msgIdThis);
					if (typeof _docObjThis=='undefined' || _docObjThis===null || 
					    _docObjThis.isDraft || _docObjThis.signType!=='E') {
						continue;
					}

					let _submitProcess = (typeof _docObjThis.submitProcessing=='boolean')?_docObjThis.submitProcessing:false;
					if (_submitProcess) {
						continue;
					}

					let rslt = {
						success: true,
						currentFolder: currentFolder,
						nextMsgId: _msgIdThis,
						nextDocNo: _docObjThis.docNo,
						fromHead: fromHead,
						folder: _docObjThis.folder,
						subfolder: _docObjThis.subfolder,
					}
					return rslt;
				}
			}
			return null;
		}

		function _getDocIndex_list($tdlContainer, msgId) {
			if ($tdlContainer.length) {
				$trList = $tdlContainer.find('tr');
				let docCount = $trList.length;
				let idx = 0;
				for(idx=0; idx<docCount; idx++) {
					let $tr = $($trList[idx]);
					let _msgId = $tr.attr('data-msgid');
					if (typeof _msgId=='string' && _msgId.length && _msgId==msgId) {
						return idx;
					}
				}
			}
			return -1;
		}

		// (圖示模式)由目前顯示的清單取得次筆待辦公文
		function _getENextId_icon($tdlContainer, currentFolder, startIndex, fromHead) {
			startIndex = (typeof startIndex=='number')?startIndex:0;
			$tdlList = $tdlContainer.find('.folioList ul li');
			let docCount = $tdlList.length;
			if (startIndex>=docCount) {
				theLogger.error('Error! todolist.builder._getENextId_icon() startIndex超出公文夾內公文數量!\n');
			}

			let idx=0;
			for(idx=startIndex; idx<docCount; idx++) {
				let $li = $($tdlList[idx]);
				let _msgIdThis = $li.attr('data-msgid');
				if (_msgIdThis!=msgId) {
					let _docObjThis = _getDocByMsgId(_msgIdThis);

					if (typeof _docObjThis=='undefined' || _docObjThis===null || 
					    _docObjThis.isDraft || _docObjThis.signType!=='E') {
						continue;
					}

					let _submitProcess = (typeof _docObjThis.submitProcessing=='boolean')?_docObjThis.submitProcessing:false;
					if (_submitProcess) {
						continue;
					}

					let rslt = {
						success: true,
						currentFolder: currentFolder,
						nextMsgId: _msgIdThis,
						nextDocNo: _docObjThis.docNo,
						fromHead: fromHead,
						folder: _docObjThis.folder,
						subfolder: _docObjThis.subfolder,
					}
					return rslt;
				}
			}
			return null;
		}

		function _getDocIndex_icon($tdlContainer, msgId) {
			// todo item: [#home #tdlPane #iconPane ul.folderList] div.folioListContent ul < li
			let $li = $tdlContainer.find('.folioListContent ul > li');
			let idx = 0;
			let docCount = $li.length;
			for(idx=0; idx<docCount; idx++) {
				let $item = $($li[idx]);
				let _msgIdThis = $item.attr('data-msgid');
				if (_msgIdThis==msgId) {
					return idx;
				}
			}
			return -1;
		}

		if (msgId=='') {
			return {success:false, errMsg:'傳入之MsgId不可為空'};
		}

		let rtnFromHead = false;
		let _docObj = _getDocByMsgId(msgId, '');
		let _currDocFolderInfo = _getFolderString(_docObj, true); 
		let _listCurrentFolder = '';

		let tdlMode = localStorage.mp_display_mode; // ['list' | 'icon']
		if (typeof tdlMode!=='string' || tdlMode.length===0) {
			tdlMode = 'list';
		}

		let $tdlItemCntr = null;
		if (tdlMode=='icon') {
			$tdlItemCntr = $('#home #tdlPane #iconPane ul.folderList');
		}
		else {
			$tdlItemCntr = $('#home #tdlPane #todolist_cntr .sData tbody');
			// 2019.8.29 - 1080339 Eric, jQuery 3.x upgrade
			_listCurrentFolder = $('#selectedFolder').val(); //attr('value'); ; 
		}

		if ($tdlItemCntr.length==0) {
			return {success:false, errMsg:'無法取得待辦項目container物件!'};
		}

		//先於MP顯示清單內搜尋目標MsgId
		let targetMsgInMP = false;
		let targetMsgIndex = -1;
		let $folderContainer = null;
		let idxFolder_icon = -1;
		if (tdlMode=='icon') {
			let $folderContainers = $tdlItemCntr.find('> li');
			
			let idxFolder = 0;
			// 2019.12.5 - Eric, 版更 bug fix
			let targetFolder = _getFolderString(_docObj); // _docObj.folder + '-' + _docObj.subfolder;
			for(idxFolder; idxFolder<$folderContainers.length; idxFolder++) {
				let _fldr = $($folderContainers[idxFolder]).attr('data-folder');
				if (_fldr==targetFolder) {
					$folderContainer = $($folderContainers[idxFolder]);
					idxFolder_icon = idxFolder;
					break;
				}
			}
			
			if ($folderContainer!==null) {
				targetMsgIndex = _getDocIndex_icon($folderContainer, msgId);
				if (targetMsgIndex>=0)
					targetMsgInMP = true;
			}
		}
		else {
			targetMsgIndex = _getDocIndex_list($tdlItemCntr, msgId);
			if (targetMsgIndex>=0)
				targetMsgInMP = true;
		}

		let startIndex = 0;
		if (targetMsgInMP) { 
			//傳入之MsgId存在目前MP清單中
			let $tdlList = null;
			if (tdlMode=='list') {
				$tdlList = $tdlItemCntr.find('tr');
				let docCount = $tdlList.length;
				if (docCount>1) { //���前MP清單包含傳入的MsgId還有2筆以上待辦
					if (targetMsgIndex==(docCount-1)) { 
						//公文為最後一筆公文，由最前面找起
						rtnFromHead = true;
						startIndex = 0;
					}
					else {
						startIndex = targetMsgIndex+1;
					}

					let rslt = _getENextId_list($tdlItemCntr, true, startIndex, rtnFromHead);
					if (rslt!=null) {
						return rslt;
					}
					// 沒有找到, 後續判定是否啟用進階模式再繼續!
				}
			}
			else if (tdlMode=='icon') {
				// 圖示模式
				// 取得目前公文所在之folder element
				let $fldrItemCntr = $folderContainer;

				// 取得目前作業公文在文件夾內的序號
				$tdlList = $fldrItemCntr.find('.folioListContent ul > li');
				let docCount = $tdlList.length;
				if (docCount>1) {
					if (targetMsgIndex==(docCount-1)) {
						//公文為最後一筆公文，由最前面找起
						rtnFromHead = true;
						startIndex = 0;
					}
					else {
						startIndex = targetMsgIndex;
					}

					// 2.在folder element內找出次筆公文
					let rslt = _getENextId_icon($fldrItemCntr, true, startIndex, rtnFromHead);
					if (rslt!==null) {
						return rslt;
					}
					// 沒有找到, 後續判定是否啟用進階模式再繼續!
				}				
			}
		}

		if (enableAdvMode) {
			let sValidNextFolder = theSSO.User.EnvSettings.get('AOL_NEXT_DOC_FOLDERS');
			
			// 2021.3.3 - 1090927 Eric Peng, MS Edge study.
			theLogger.log('-I- _getENextid() AdvMode: ON, AOL_NEXT_DOC_FOLDERS=' + sValidNextFolder);

			let validFolder = sValidNextFolder.split(';')
			if (tdlMode=='list' && _listCurrentFolder!='全部') {
				// 2021.3.3 - 1090927 Eric Peng, MS Edge study.
				theLogger.log('-I- _getENextid() list mode');

				// 列表模式,除目前指定公文夾外, 其它待辦皆未render, 故須由完整todolist找
				// 1. 取得todolist副本
				// 2. (x)依目前之排序規則先排序待辦項目
				// 3. 找待處理或符合指定文件夾之項目
				let _tdl = _doclist; // _sortBy(_doclist, 'msgId');
				let idxDoc = 0, idxCurrent=-1;
				for(idxDoc=0; idxDoc<_tdl.length; idxDoc++) {
					let _doc = _tdl[idxDoc];
					if (_doc.msgId==msgId) {
						idxCurrent = idxDoc;
						break;
					}
				}
				if (idxCurrent==(_doclist.length-1)) {
					rtnFromHead = true;
					startIndex = 0;
				}
				else {
					startIndex = idxCurrent+1;
				}

				for(idxDoc=startIndex; idxDoc<_tdl.length; idxDoc++) {
					let _doc = _tdl[idxDoc];
					if (!_doc.isDraft && _doc.signType=='E' && _doc.msgId!=msgId) {
						let _fldr = _doc.folder + '-' + _doc.subfolder;

						// 2021.3.3 - 1090927 Eric Peng, MS Edge study.
						theLogger.log('-I- _getENextid() [list, advMode, startIndex= ' + startIndex + ', idxDoc=' + idxDoc + '] _fldr=' + 
									   _fldr + ', docNo=' + _doc.docNo + ', msgId=' + _doc.msgId);
						
						// 須在'待處理'或指定的公文夾內!
						if (_doc.folder=='待處理' || (validFolder.indexOf(_fldr)!=-1)) {
							let rslt = {
								success: true,
								currentFolder: false,
								nextMsgId: _doc.msgId,
								nextDocNo: _doc.docNo,
								fromHead: rtnFromHead,
								folder: _doc.folder,
								subfolder: _doc.subfolder,
							};
							return rslt;
						}
					}
				}
			}
			else {
				// 2021.3.3 - 1090927 Eric Peng, MS Edge study.
				theLogger.log('-I- _getENextid() icon mode');

				// 圖示模式, 所有公文皆會在#iconPane內有對應物件, 可直接找尋!
				// $tdlItemCntr = $('#home #tdlPane $iconPane ul.folderList'); // 公文夾container element
				let $folderContainers = $tdlItemCntr.find('li'); // 公文夾 element list
				let $folderContainer = null;
				let idxFolder = 0;
				// 2019.12.5 - Eric, 版更公文夾列表問題修正, 配合調整!
				let sCurrDocFolder = _currDocFolderInfo.folderStr; // _currDocFolderInfo.proxyFolder?_currDocFolderInfo.displayFolder:_currDocFolderInfo.folderStr;
				for(idxFolder; idxFolder<$folderContainers.length; idxFolder) {
					let _fldr = $($folderContainers[idxFolder]).attr('data-folder'); // 公文夾名稱
					if (_fldr!==sCurrDocFolder) { // 非目前公文夾內找
						$folderContainer = $($folderContainers[idxFolder]);
						let $folderItems = $folderContainer.find('.folioList ul li');
						if ($folderItems.length==0) continue; // 沒有項目, 跳過!

						// 取第一筆待辦項目, 若為通知類,則跳過!
						let $item0 = $($folderItems[0]);
						let _msgId0 = $item0.attr('data-msgid');
						if (typeof _msgId0=='string' && _msgId0.length) {
							let _doc0 = _getDocByMsgId(_msgId0);
							if (_doc0.signType!=='E' && _doc.signType!=='P') { // 紙本/線上簽核公文可能在同一公文夾!
								theLogger.log('-I- tdlBuilder.getENextId() 跳過通知類型文件夾:' + _flder);
								continue; // 通知類公文夾, 跳過!
							}
						}
						
						// 圖示模式
						let rslt = _getENextId_icon($folderContainer, true, 0, true);
						if (rslt!==null) {
							return rslt;
						}
					}
				}
			}
		}

		// 無次筆公文, 回傳success:true, nextMsgId=''
		return { success:true, nextMsgId:'', nextDocNo:'', 
				 // 2019.12.5 - Eric, bug fix.
				 //currentFolder: _currDocFolderInfo, fromHead: false, folder:'', subfolder:''}; 
				 currentFolder: true, fromHead: false, folder:'', subfolder:''};  
	} // EOF _getENextId

    // 2023.4.14 - 1120067 Eric, 依目前代理角色篩選顯示的待辦項目
    function _getProxyRoleDocList(active_role) {
        if (typeof active_role=='undefined'|| active_role==null) {
            return null;
        }
        else if (active_role.proxyAccount.length==0) {
            return null;
        }

        /* {
            id: "OD99", => RoleId
            name: "承辦人",
            orgNo: "A21020000I",
            proxyAccount: "",
            proxyUserName: "",
            unitNo: "322" => UNIT_NO
            }*/ 
        let _filtered_doclist = [];
        let cntRaw = _doclist.length; // 2020.11.9 - merge 2020.8.11 - Eric, bug-fix
        let isJointProxy = false; // 是否為'一併代理'?
        if (active_role.isJointProxy==true) {
            isJointProxy = true;
        }

		for(i=0; i<cntRaw; i++) {
			let _doc = _doclist[i];
            let isProxy = (_doc.ODWMSG.IS_PROXY_DOC === '1') ? true : false; // 2014.1- 處理代理公文
            if (isProxy) {
                if (isJointProxy) {
                    // 一併代理時, 只要account符合的項目都列出!
                    let _own_user_id = _doc.ownUserId;
                    if (_own_user_id==active_role.proxyAccount) {
                        _filtered_doclist.push(_doc);
                    }
                }
                else {
                    // 非一併代理時, 
                    let _own_role_id = _doc.ownRoleId;
                    let _own_ou_id = _doc.ownOUId;
                    if (active_role.id==_own_role_id && active_role.unitNo==_own_ou_id) {
                        _filtered_doclist.push(_doc);
                    }
                }
            }
        }
        return _filtered_doclist;
    }

// Exported public methods (ToDoListBuilder)
	//that.makeToDoList_List = _makeToDoList_List;
	that.makeToDoList_List = _makeToDoList_List2;
	that.makeToDoList_List_DOM = _makeToDoList_List_DOM;
	
	that.makeToDoList_Icon = _makeToDoList_Icon;
	that.makeToDoList_SearchList = _makeToDoList_SearchList; // 2011.11.10
	that.init = _init;
	that.initByJSON = _initByJSON; // 2016.10.28
	that.getFolderInfoList = _getFolderInfoList;
	that.resetContent = _resetToDoList;
	that.resetSearchList = _resetSearchToDoList; // 2011.11.10
	
	//that.sortByValue = _sortByValue;
	that.getPropValue = _getPropValue;
	that.getDocByDocNo = _getDocByDocNo;
	that.getDocByMsgId = _getDocByMsgId;
	that.xmlToDocObj = _xmlToDocObj;
	that.setProxySetting = function(proxySetting) {
		_proxySetting = proxySetting;
	};
	that.getProxySetting = function() { // 2016.9.6 - add
		return _proxySetting;
	}
	that.getProxyFolderSetting = function(folderStr) { // 2016.9.6 - add
		if (typeof _proxySetting=='object' && _proxySetting!==null && typeof folderStr=='string' && folderStr.length) {
			var proxyFolder = _getProxyFolderSetting(_proxySetting, folderStr, true);
			return proxyFolder;
		}
		return null;
	}
	
	// 2014.1 - 公文基資異動後更新ToDoList內容!
	that.updateToDoListHtmlItem = _updateToDoListHtmlItem;
	
	// 2014.1 - 新進訊息.
	that.insertNewMsg = _insertNewMsg;
	that.insertHTMLDOMItem = _insertHTMLDOMItem; // 2019.2.19 - 1080113 Eric, 調整新增項目是否顯示
		
	
	// 2013.9
	that.deleteMsg = _deleteMsg;
	
	//2013.12
	that.initODWDCM = _initODWDCM;
	
	// 2013.10
	that.emptyToDoList_Icon = _emptyToDoList_Icon;
	that.emptyToDoList_List = _emptyToDoList_List;
	that.emptyToDoList_SearchList = _emptyToDoList_SearchList;
	that.restoreMsg = _restoreMsg;
	
	/* 2015.6 - 由AOL.docObj內容更新todolist內的docObj */
	that.updateDocObj = _updateDocObj;
	
	/* 2016.3 - 檢核是否應更新待辦顯示UI項目, 1:圖示, 2:清單, 4:預覽窗格左方清單 */
	that.getContainerUIUpdateFlag = _getContainerUIUpdateFlag;
	
	/* 2016.6 - 取得首頁[將逾期/已逾期/未閱讀]統計數量 */
	that.getToDoListNumbers = _getToDoListNumbers;
	
	/* 2016.6 - 取得文件夾公文數量 */
	that.getFolderItemCount = _getFolderItemCount;
	
	that.isDraftMsg = _isDraftMsg;
	that.checkMsgValidity = _checkMsgValidity;
	
	// 2016.7 - 創稿功能
	that.createNewDoc = _createNewDoc;
	
	that.getToDoListCount = _getToDoListCount;
	
	that.docFromODWMSGObj = _docFromODWMSGObj; // 由ODWMSG/ODWDCM object產生MPDocObj (公文基資異動傳送選單用)
	
	that.setHideLights = _setHideLights; // 2016.7
	that.shouldHideLights = _shouldHideLights;
	that.shouldShowResupply = _shouldShowResupply;
	
	that.setHideTransInfo = _setHideTransInfo; // 2017.2
	that.shouldHideTransInfo = _shouldHideTransInfo;
	
	that.getListHeader = _getListHeader;
	that.getDefaultSortIndex = _getDefaultSortIndex;
	
	that.resortList = _resortList; // 2016.8.30 - 重新排序
	
	that.setMsgE2P = _setMsgE2P; // 2016.10.6 - 轉紙本簽核作業!
	
	// 2016.10.15 - 記憶目前檢閱公文夾
	that.setSelectedFolder = function(selFolder) {
		if (typeof selFolder=='string' && selFolder.length) {
			that.selectedFolder = selFolder;
		}
	};
	that.getSelectedFolder = function() {  return that.selectedFolder; }
		
	// 2016.10.5 - 記憶關鍵字
	that.setFilterWord = function(filterWord) {
		if (typeof filterWord=='string') {
			that.filterWord = filterWord;
		}
	}
	that.getFilterWord = function() { return that.filterWord; }
	
	that.updateDocObjByODWMSG = _updateDocObjByODWMSG; // 2017.2.24
	//that.initODWWKF = _initODWWKF;
	//that.updateODWWKF = _updateODWWKF;

	// 2018.9.28 - 1070955
	that.setShowColumns = _setShowColumns; 
	that.showCurrLocate = _showCurrLocate;
	that.getShowCurrLocFolder = _getShowCurrLocFolder;
	that.adjustFolderField = _adjustFolderField;
	that.updateSuperTableHScroll = _updateSuperTableHScroll;
	
	//1110927	Leslie[1110889]	使用客製化欄位，且設定要顯示目前位置時，一律顯示白燈
	that.showCurrLocateAlways = _showCurrLocateAlways;

    // 2023.4.14 - 1120067 Eric, 切換角色為代理人時只顯示讓角色代理人員待辦
    that.getProxyRoleDocList = _getProxyRoleDocList;

	// 2019.2.21 - 1080211
	that.shouldShowDocProperty = function () {
		return that.showDocProperty;
	};
	that.getShowDocPropertyLen = function () {
		return that.showDocPropertyLen;
	};
	
	// 2022.4.19	Leslie[1110064]	新增信保可顯示收創文日期
	that.shouldShowRcvDate = function(){
		return that.showRcvDate;
	}

	that.getENextId = _getENextId; // 取次筆公文
	
	return that;
}; // EOF ToDoListBuilder function object...

