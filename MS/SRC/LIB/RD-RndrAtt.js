// RndrAtt class
//	2016.7.15 - Raymond, 使用Server匯出附件頁面

// DATE		SA		PRG		MGR_NO	DESC
// 1060503	Leslie	Leslie	1060275	修改子目錄組成邏輯，最後的(A)?B:C判斷式，應以括號獨立括起來，此錯誤會造成置換時新的附件影像無法正確產出，仍顯示前次附件的影像
// 1060901	Leslie	Leslie	1060683	配合附件匯出可設定黑白或彩色，增修傳入相關屬性
// 1110725	Raymond	Raymond	1110416	新增imgConvert2相關方法, 功能為附件轉檔後不要上傳至FileServer, 而是暂存於工作站
// 1141124	Raymond	Raymond	1141255	附件匯出頁面完成後, 將工位站的網址寫回不是字串的draftPath物件, 否則寫回att物件

function RndrAtt() {
	function ServerList() {
		var _list = SSO_CONFIG.getIsoConvertURLs();	// 2016.8.29 改讀SSO_CONFIG.getIsoConvertURLs()
		if(_list.length > 0) {
			theLogger.log("轉附件頁面工作站:");
			for(var i=0; i<_list.length; i++)
				theLogger.log(_list[i]);
		}
		else
			theLogger.warn("未設定任何轉附件頁面工作站網址!");
		this.add = function(url) {
			_list.push(url);
		}
		this.get = function(idx) {
			return _list[idx];
		}
		this.suffle = function() {
			var mem = [];
			mem.length = _list.length;
			return {
				pick: function() {
					while(1) {
						var idx = Math.floor(Math.random() * _list.length);
						if(mem[idx]) {
							var alltry = true;
							for(var i=0; i<mem.length; i++) {
								if(!mem[i]) {
									alltry = false;
									break;
								}
							}
							if(alltry)
								return null;
							continue;
						}
						else {
							mem[idx] = true;
							return _list[idx];
						}
					}
				}
			}
		}
	}
	var _serverList = new ServerList();
	
	var _lockedUrl = "";		// 2016.8.5 已鎖定工作站
	var _lockedPath = "";		// 2016.8.5 已鎖定工作站的上傳目錄
	var _bUplading = false;		// 2016.11.29	Leslie	修正附件匯出未完成，僅需加入待轉集合即可，無需重覆執行轉出邏輯
	var _lastLockedUrl = "";	// 1110721 Raymond 1110416 新增記憶最後一次已鎖定工作站, 給clearProcData清除暫存影像檔使用
	
	function queryState() {
		var dfd = $.Deferred();
		var suffle = _serverList.suffle();
		function doQS() {
			try {
				var params = {};
				var url = suffle.pick();
				if(url) {
					_url = url;
					var t0 = new Date();
					theWebServices.invokeWS(url, "QueryState", "http://2100T.com.tw", params, true, function(r) {
						var t = new Date();
						theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - QueryState returns(" + (t - t0) + "ms): " + r);
						if(typeof r === "string" && r.length > 0) {
							var p = r.indexOf("|");
							if(p > 0) {
								var stat = r.substring(0, p);
								if(stat == "Idle") {
									_lockedUrl = url;						// 2016.8.5 記錄已鎖定工作站
									_lockedPath = r.substring(p+1);			// 2016.8.5 記錄已鎖定工作站的上傳目錄
									_lastLockedUrl = url;					// 1110721 Raymond 1110416 新增記憶最後一次已鎖定工作站, 給clearProcData清除暫存影像檔使用
									dfd.resolve(url, r.substring(p+1));
								}
								else
									doQS();
							}
							else if(r == "Busy")
								doQS();
							else
								dfd.reject("回傳格式不正確:'" + r + "'");
						}
						else {
							if(r.Err != undefined)
								dfd.reject("轉檔工作站["+_url.split('/')[2]+"]目前無法正常工作，請連絡公文系統駐點人員或公文管理員處理。\n異常訊息："+r.Err.ErrMsg);	//2016.11.25	Leslie	修正異常訊息
							else
								dfd.reject("呼叫QueryIdle成功但無返回資料!");
						}
					});
				}
				else
					//dfd.reject("全部伺服器忙線中, 請稍後重試!");	//2016.11.23	Leslie	依科長要求，修改訊息內容
					dfd.reject("所有附件轉檔工作站均忙碌中，請稍候數分鐘再開啟附件管理視窗儲存，以重新轉出。");
			}
			catch(e) {
				alert(e.message + " - " + e.sourceURL + ":" + e.line);
			}
		}
		if(_lockedUrl.length && _lockedPath.length)	// 2016.8.5 重複使用已鎖定工作站
			dfd.resolve(_lockedUrl, _lockedPath);
		else
			doQS();
		return dfd.promise();
	}
	
	// 1110721 Raymond 1110416 新增procId參數, 若有傳入此參數則以此參數取代subdir
	// 解鎖工作站
	//function unlockServer() {
	function unlockServer(procId) {
		if(_lockedUrl.length && _lockedPath.length) {
			var t0 = new Date();
			//1060503	Leslie[1060275]	修改子目錄組成邏輯，最後的(A)?B:C判斷式，應以括號獨立括起來，此錯誤會造成置換時新的附件影像無法正確產出，仍顯示前次附件的影像
			//var subdir = theSSO.User.account + "-" + (theAOL.docObj.docNo.length)?theAOL.docObj.docNo:theAOL.docObj.msgId;
			var subdir = theSSO.User.account + "-" + ((theAOL.docObj.docNo.length)?theAOL.docObj.docNo:theAOL.docObj.msgId);
			// 1110721 Raymond 1110416 新增procId參數, 若有傳入此參數則以此參數取代subdir
			//theWebServices.invokeWS(_lockedUrl, "SetQueryStateIdle", "http://2100T.com.tw", {ProcessID: subdir}, true, function(r) {
			theWebServices.invokeWS(_lockedUrl, "SetQueryStateIdle", "http://2100T.com.tw", {ProcessID: procId || subdir}, true, function(r) {
				var t = new Date();
				theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - SetQueryStateIdle success(" + (t - t0) + "ms): " + r);
				_lockedUrl = _lockedPath = "";
			});
		}
	}
	
	// 2016.9.12 新增fileIOWS, dirPath兩參數, 2016.9.22 新增draftPath參數
	function imgConvert(url, filePath, appendBarcode, barcode, barcodeText, appendOrigFileName, origFileName, appendSealMark, sealMarkFileName, sealMarkDim, colorful, outputImgFileName, outputImgStartPO, fileIOWS, dirPath, draftPath) {
		var dfd = $.Deferred();
		var params = {
			FilePath: filePath,
			AppendBarcode: appendBarcode?"true":"false",
			Barcode: barcode,
			BarcodeText: barcodeText?barcodeText:"",
			AppendOriginalFileName: appendOrigFileName?"true":"false",
			OriginalFileName: origFileName?origFileName:"",
			AppendSealMark: appendSealMark?"true":"false",
			SealMarkFileName: sealMarkFileName?sealMarkFileName:"",
			SealMarkDimension: sealMarkDim?sealMarkDim:"",
			Colorful: colorful?"true":"false",
			OutputImgFileName: outputImgFileName?outputImgFileName:"",
			OutputImgStartPO: outputImgStartPO?outputImgStartPO:"0",
			FileIOWS: fileIOWS,
			DirPath: dirPath,
			SAMLart: localStorage['Artifact'],
			DraftFolder: draftPath
		}
		function getParamsXml() {
			var res = "";
			for(field in params) {
				res += "<" + field + ">" + params[field] + "</" + field + ">";
			}
			return res;
		}
		
		var envelope = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
							'<soap:Body>' +
								'<ImgConvert xmlns="http://2100T.com.tw">' +
									getParamsXml() +
								'</ImgConvert>' +
							'</soap:Body>' +
						'</soap:Envelope>\r\n';
		//theLogger.debug(envelope);
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		
		var t0 = new Date();
		/* 2016.9.13 修改成不接實際影像檔資料, 只接影像檔檔名
		(new SOAPviaDIME()).invoke(url, "ImgConvert", {
			getNameSpace: function() {
				return "http://2100T.com.tw";
			},
			getParams: function() {
				return getParamsXml();
			},
			translateExt: function(fileName) {
				if(fileName.match(/\.\d{4}$/))
					return ".png";
				return null;
			},
			//onSoapMsg: function(res, xml, id) {},
			//onRetrieveFile: function(fil, fn) {},
			success: function(fil, all) {
				var t = new Date();
				theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - ImgConvert returns(" + (t - t0) + "ms): ");
				//theLogger.log(all);
				dfd.resolve(all);
			},
			error: function(errorText) {
				var t = new Date();
				theLogger.error(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - ImgConvert failed(" + (t - t0) + "ms): ");
				theLogger.error(errorText);
				alert(errorText);
			}
		});*/
		theWebServices.invokeWS(url, "ImgConvert", "http://2100T.com.tw", params, true, function(res, resXml) {
			var t = new Date();
			theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - ImgConvert returns(" + (t - t0) + "ms): ");
			theLogger.debug(res);
			theLogger.debug(resXml);
			//1050920	Leslie	增加處理回傳的錯誤訊息
			if(('rtnErr' in res) && (typeof res.rtnErr == 'object')){
				dfd.reject(res.rtnErr.Err.ErrMsg);
			}
			dfd.resolve(res);
		});
		return dfd.promise();
	}
	
	// 1110721 Raymond 1110416 新增imgConvert2方法, 附件轉檔後不上傳至FileServer的版本
	function imgConvert2(url, filePath, appendBarcode, barcode, barcodeText, appendOrigFileName, origFileName, appendSealMark, sealMarkFileName, sealMarkDim, colorful, outputImgFileName, outputImgStartPO) {
		var dfd = $.Deferred();
		var params = {
			FilePath: filePath,
			AppendBarcode: appendBarcode?"true":"false",
			Barcode: barcode,
			BarcodeText: barcodeText?barcodeText:"",
			AppendOriginalFileName: appendOrigFileName?"true":"false",
			OriginalFileName: origFileName?origFileName:"",
			AppendSealMark: appendSealMark?"true":"false",
			SealMarkFileName: sealMarkFileName?sealMarkFileName:"",
			SealMarkDimension: sealMarkDim?sealMarkDim:"",
			Colorful: colorful?"true":"false",
			OutputImgFileName: outputImgFileName?outputImgFileName:"",
			OutputImgStartPO: outputImgStartPO?outputImgStartPO:"0",
			SAMLart: localStorage['Artifact']
		}
		function getParamsXml() {
			var res = "";
			for(field in params) {
				res += "<" + field + ">" + params[field] + "</" + field + ">";
			}
			return res;
		}
		
		var envelope = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
							'<soap:Body>' +
								'<ImgConvert2 xmlns="http://2100T.com.tw">' +
									getParamsXml() +
								'</ImgConvert2>' +
							'</soap:Body>' +
						'</soap:Envelope>\r\n';
		//theLogger.debug(envelope);
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		
		var t0 = new Date();
		theWebServices.invokeWS(url, "ImgConvert2", "http://2100T.com.tw", params, true, function(res, resXml) {
			var t = new Date();
			theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - ImgConvert2 returns(" + (t - t0) + "ms): ");
			theLogger.debug(res);
			theLogger.debug(resXml);
			//1050920	Leslie	增加處理回傳的錯誤訊息
			if(('rtnErr' in res) && (typeof res.rtnErr == 'object')){
				dfd.reject(res.rtnErr.Err.ErrMsg);
			}
			dfd.resolve(res);
		});
		return dfd.promise();
	}
	
	// 1110721 Raymond 1110416 新增第3參數mode, 傳入2代表要執行imgConvert2
	//function doSingle(idx, att) {
	function doSingle(idx, att, mode) {
		var dfd = $.Deferred();
		var t0 = new Date(), tOvr = t0;
		theLogger.log(t0.getHours() + ":" + t0.getMinutes() + ":" + t0.getSeconds() + " - 處理第" + (idx + 1) + "筆附件:'" + att.att.name + "'...");
		// 1.鎖定
		queryState().done(function(url, path) {
			// 2.上傳
			var subdir = theSSO.User.account + "-" + ((theAOL.docObj.docNo.length)?theAOL.docObj.docNo:theAOL.docObj.msgId);	//2017.2.22	Leslie	修改子目錄組成邏輯，最後的(A)?B:C判斷式，應以括號獨立括起來
			// 檔名必須用流水號
			var fn = att.attach.fileName;
			var filePath = path + "\\" + subdir;
			
			var t = new Date();
			theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - lock success(" + (t - t0) + "ms)");
			t0 = t;
			(new WebFileIO(url, "", "")).uploadAtt(filePath, fn, att.attach.origFileName, {
				success: function(fname, fpath) {
					t = new Date();
					theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - upload success(" + (t - t0) + "ms) '" + fname + "', '" + fpath + "'");
					t0 = t;
					var dot = fn.lastIndexOf(".");
					var prefix = (dot > 0)?fn.substring(0, dot):fn;
					// 1110721 Raymond 1110416 新增判斷傳入第3參數mode是否為2, 若是則改呼叫imgConvert2
					if(mode == 2) {
						var isColor = !(att.attach.isBW || att.attach.isBW == undefined);
						imgConvert2(url, filePath + "\\" + fn, false, theAOL.docObj.docNo, null, false, fn, false, null, null, isColor, prefix, 0).done(function(allparts) {
							t = new Date();
							theLogger.log("轉換成功!回傳'" + typeof allparts + "'(" + (t - t0) + "ms)");
							// 1141124 Raymond 1141255 判斷draftPath不是字串才寫入draftPath
							//if(!!att.draftPath)
							if(!!att.draftPath && typeof att.draftPath !== "string")
								att.draftPath.rndrPageUrl = url;
							else	// 1141124 Raymond 1141255 否則寫入att
								att.rndrPageUrl = url;
							dfd.resolve(att, allparts, t - tOvr);
						})
						.fail(function(errText) {
							theLogger.error(att.att.parent.name+"-"+att.attach.name + " ImgConvert失敗 - " + errText);	//1050921	Leslie	增加寫入稿件名-附件名
							//2016.11.23	Leslie	依科長要求，修改訊息內容
							//dfd.reject("["+att.att.parent.name+"-"+att.attach.name+"]"+errText+"\n異常工作站："+url.split('/')[2]);	//1050921	Leslie	增加寫入稿件名-附件名	//1050930	Leslie	加上工作站URL
							dfd.reject("["+att.att.parent.name+"-"+att.attach.name+"]轉出簽核頁面工作未完成，請稍候數分鐘再點選尚未轉完(無頁數)附件頁籤或是開啟附件管理視窗儲存，以重新轉出。若嘗試重轉仍無法正常轉出，請將本訊息畫面拍下通知駐點人員處理。\n[處理轉檔工作站]"+url.split('/')[2]+"\n[異常訊息]"+errText);
						});
					}
					else {	// mode != 2時, 維持原來轉出會上傳FileServer的行為
					// 3.轉換
					var fileServerIOWS = theAOL.docObj.fileIOWS;											// 2016.9.12 新增傳入FileServer的WebFileIO網址
					var fileServerPath = theAOL.docObj.fileStoragePath + "\\" + theAOL.docObj.fileSubDir;	// 2016.9.12 新增傳入FileServer的此筆公文子目錄路徑
					var draftPath = att.draftPath;															// 2016.9.22 新增傳入FileServer的此筆公文的文稿附件檔應上傳的子目錄路徑
					
					// 1060901	Leslie[1060683]	新增傳入匯出設定
					var isColor = !(att.attach.isBW || att.attach.isBW == undefined);
					//imgConvert(url, filePath + "\\" + fn, false, theAOL.docObj.docNo, null, false, fn, false, null, null, false, prefix, 0, fileServerIOWS, fileServerPath, draftPath).done(function(allparts) {
					imgConvert(url, filePath + "\\" + fn, false, theAOL.docObj.docNo, null, false, fn, false, null, null, isColor, prefix, 0, fileServerIOWS, fileServerPath, draftPath).done(function(allparts) {
						t = new Date();
						theLogger.log("轉換成功!回傳'" + typeof allparts + "'(" + (t - t0) + "ms)");
						
						/* 4.重置Idle
						t0 = new Date();
						theWebServices.invokeWS(url, "SetQueryStateIdle", "http://2100T.com.tw", {ProcessID: subdir}, true, function(r) {
							t = new Date();
							theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - SetQueryStateIdle success(" + (t - t0) + "ms): " + r);
						});*/
						
						/* remove att from _attachs
						for(var i=0; i<_attachs.length; i++) {
							if(_attachs[i] == att) {
								_attachs.splice(i, 1);
								break;
							}
						}*/
						dfd.resolve(att, allparts, t - tOvr);
					})
					.fail(function(errText) {
						theLogger.error(att.att.parent.name+"-"+att.attach.name + " ImgConvert失敗 - " + errText);	//1050921	Leslie	增加寫入稿件名-附件名
						//2016.11.23	Leslie	依科長要求，修改訊息內容
						//dfd.reject("["+att.att.parent.name+"-"+att.attach.name+"]"+errText+"\n異常工作站："+url.split('/')[2]);	//1050921	Leslie	增加寫入稿件名-附件名	//1050930	Leslie	加上工作站URL
						dfd.reject("["+att.att.parent.name+"-"+att.attach.name+"]轉出簽核頁面工作未完成，請稍候數分鐘再點選尚未轉完(無頁數)附件頁籤或是開啟附件管理視窗儲存，以重新轉出。若嘗試重轉仍無法正常轉出，請將本訊息畫面拍下通知駐點人員處理。\n[處理轉檔工作站]"+url.split('/')[2]+"\n[異常訊息]"+errText);
					});
					}	// end of if(mode == 2) else
				},
				error: function(errorText) {
					theLogger.error(errorText);
					dfd.reject(errorText);
				}
			});
		})
		.fail(function(errText) {
			theLogger.error("QueryState失敗 - " + errText);
			dfd.reject(errText);
		});
		return dfd.promise();
	}
	
	var _attachs = [];
	
	// 平行處理
	function startPar(callback) {
		var dfd = $.Deferred();
		var sp = [];
		$.each(_attachs, function(idx, att) {
			sp.push(doSingle(idx, att).done(function(att, imgurl, tSpan) {
				callback(att, imgurl, tSpan);
			}));
		});
		
		$.when.apply(this, sp).done(function() {
			theLogger.log("finish!(par)");
			dfd.resolve();
		})
		.fail(function(e) {
			alert(e);
		})
		.always(function() {
		});
		return dfd.promise();
	}
	
	// 循序處理
	function startSeq(callback) {
		if(_bUplading)
			return;	//2016.11.29	Leslie	修正附件匯出未完成，僅需加入待轉集合即可，無需重覆執行轉出邏輯
		var dfd = $.Deferred();
		var i = 0;
		function doStart() {
			_bUplading = true;	//2016.11.29	Leslie	修正附件匯出未完成，僅需加入待轉集合即可，無需重覆執行轉出邏輯
			if(_attachs.length > i) {
				var att = _attachs[i];
				doSingle(i, att)
					.done(function(att, imgurl, tSpan) {
						_attachs.splice(i,1);	//1050930	Leslie	因呼叫CallBack時就會先產生畫面(同時檢核目前這筆附件是否已完成)，故移至呼叫CallBack之前處理
						callback(att, imgurl, tSpan);
						
						//1050921	Leslie	修正錯誤的寫法(雖然程式本身完全不會跑錯，但留著很怪)
						// remove att from _attachs
						/*for(var j=0; i<_attachs.length; i++) {
							if(_attachs[j] == att) {
								_attachs.splice(j, 1);
								break;
							}
						}*/
						//_attachs.splice(i,1);	//1050921	Leslie	循序處理時，只要是正確匯出完成，就都只需處理第0筆，只有發生異常時，才需要跳過該筆(i++)
						doStart();
					})
					.fail(function(e) {
						//1050921	Leslie	增加紀錄最後一次的異常訊息
						att.msg = e;
						alert(e);
						// proccess next
						i++;
						doStart();
					});
			}
			else {
				_bUplading = false;	//2016.11.29	Leslie	修正附件匯出未完成，僅需加入待轉集合即可，無需重覆執行轉出邏輯
				theLogger.log("finish!(seq)");
				unlockServer();
				dfd.resolve();
			}
		}
		doStart();
		return dfd.promise();
	}
	
	// 1110721 Raymond 1110416 新增start2方法, 只轉附件不上傳至FileServer
	function startSeq2(callback) {
		if(_bUplading)
			return;	//2016.11.29	Leslie	修正附件匯出未完成，僅需加入待轉集合即可，無需重覆執行轉出邏輯
		var dfd = $.Deferred();
		var i = 0;
		function doStart() {
			_bUplading = true;	//2016.11.29	Leslie	修正附件匯出未完成，僅需加入待轉集合即可，無需重覆執行轉出邏輯
			if(_attachs.length > i) {
				var att = _attachs[i];
				doSingle(i, att, 2)	// 新增傳入第3參數mode為2, 表示要轉出附件頁面但不要上傳至FileServer
					.done(function(att, imgurl, tSpan) {
						_attachs.splice(i,1);	//1050930	Leslie	因呼叫CallBack時就會先產生畫面(同時檢核目前這筆附件是否已完成)，故移至呼叫CallBack之前處理
						callback(att, imgurl, tSpan);
						doStart();
					})
					.fail(function(e) {
						//1050921	Leslie	增加紀錄最後一次的異常訊息
						att.msg = e;
						alert(e);
						// proccess next
						i++;
						doStart();
					});
			}
			else {
				_bUplading = false;	//2016.11.29	Leslie	修正附件匯出未完成，僅需加入待轉集合即可，無需重覆執行轉出邏輯
				theLogger.log("finish!(seq2)");
				unlockServer("none");	// 傳入"none"表示不要清除暫存影像檔的子目錄
				dfd.resolve();
			}
		}
		doStart();
		return dfd.promise();
	}
	
	// 1110721 Raymond 1110416 新增clearProcData方法, 清除start2轉出之暫存影像檔
	function clearProcData() {
		if(_lastLockedUrl.length > 0) {
			var t0 = new Date();
			//1060503	Leslie[1060275]	修改子目錄組成邏輯，最後的(A)?B:C判斷式，應以括號獨立括起來，此錯誤會造成置換時新的附件影像無法正確產出，仍顯示前次附件的影像
			//var subdir = theSSO.User.account + "-" + (theAOL.docObj.docNo.length)?theAOL.docObj.docNo:theAOL.docObj.msgId;
			var subdir = theSSO.User.account + "-" + ((theAOL.docObj.docNo.length)?theAOL.docObj.docNo:theAOL.docObj.msgId);
			theWebServices.invokeWS(_lastLockedUrl, "ClearProcessData", "http://2100T.com.tw", {ProcessID: subdir}, true, function(r) {
				var t = new Date();
				theLogger.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - ClearProcessData success(" + (t - t0) + "ms): " + r);
				_lastLockedUrl = "";
			});
		}
		else
			theLogger.error("未記錄最近一次已鎖定工作站的網址, 無法清除暫存影像檔");
	}
	
	/* 初始化伺服器清單 2016.8.29 改讀SSO_CONFIG.getIsoConvertURLs()
	$.get("isocvtrsetting.xml")
		.done(function(responseXml) {
			theLogger.log(responseXml);
			$(responseXml.documentElement).children().each(function(idx, elm) {
				_serverList.add(elm.textContent);
			});
		});*/
	
	return {
		addAtt: function(att, attach, draftPath) {	// 第1個參數是封裝檔的, 第2個參數是文稿管理檔的, 2016.9.22 新增第3參數文稿附件檔應上傳路徑
			//1050921	Leslie	增加屬性以紀錄最後一次的異常訊息
			//_attachs.push({att: att, attach: attach});
			_attachs.push({att: att, attach: attach, draftPath: draftPath, msg:""});
		},
		//1050921	Leslie	增加附件刪除行為，以避免匯出失敗的附件於刪除後仍殘留在待匯出工作中
		removeAtt: function(guid){
			for(var i=0,iMax=_attachs.length;i<iMax;i++){
				if(_attachs[i].att.guid == guid){
					_attachs.splice(i, 1);
					break;
				}
			}
		},
		//1050921	Leslie	新增檢核附件是否仍未完成匯出
		checkAttWaitConvert: function(guid){
			for(var i=0,iMax=_attachs.length;i<iMax;i++){
				if(_attachs[i].att.guid == guid)
					return true;
			}
			return false;
		},
		//1050921	Leslie	回傳最後一次的異常訊息(如果還卡住的話)
		getErrMsg: function(guid){
			for(var i=0,iMax=_attachs.length;i<iMax;i++){
				if(_attachs[i].att.guid == guid)
					return _attachs[i].msg;
			}
			return "";
		},
		start: startSeq,
		// 1110721 Raymond 1110416 新增start2方法, 只轉附件不上傳至FileServer
		start2: startSeq2,
		// 1110721 Raymond 1110416 新增clearProcData方法, 清除start2轉出之暫存影像檔
		clearProcData: clearProcData,
	}
}

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-RndrAtt.js").finish();
})();