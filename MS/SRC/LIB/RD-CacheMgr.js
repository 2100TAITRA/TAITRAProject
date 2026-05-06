// CacheMgmr class
//   
// DATE		MGRNO	SA		PG		Desc
// 1060623	1060147	Raymond	Raymond	新增由傳入參數決定是否非同步下載(for第1次下載機關代碼_Data.xml)
// 1090225	1090139	Kevin	Joe		配合Zap弱掃移除指令註解
// 1111207	1111396	Raymond	Raymond	新增取得資源檔(主要是騎縫章)時可更新Cache的資源檔功能
// 1111213	1111396	Raymond	Raymond	修正修改後的資源檔(目前只有騎縫章)在Cache滿了以後會丟掉,重新下載後會變回未修改(旋轉90度)的問題
// 1130216	1120232	Raymond	Raymond	新增noCache參數, 若傳入true則表示不要cache, 主要用於邊改OutXSL邊測的情況

(function CacheMgmr() {

	if(window.theModMgr != undefined)
		var inst = window.theModMgr.install("RD-CacheMgr.js");

	// private members
	var _userId;                // 使用者帳號
	var _artifact;              // 登入權杖
	var _cacheFile = new Array();//2017.01.17	Leslie	新增Cache暫存最後五筆下載的資源檔
	var _cacheFileName = new Array();//2017.01.17	Leslie	新增Cache暫存資源檔檔名(Key值)
	var _cacheType = new Array();//2017.01.17	Leslie	紀錄XML物件的型式
	var _cacheFile2 = new Array();		// 1111213 Raymond 1111396 新增Cache修改後的資源檔(目前只有騎縫章)
	var _cacheFileName2 = new Array();	// 1111213 Raymond 1111396 新增Cache修改後的資源檔(目前只有騎縫章)
	
	// private methods
	function getFolioCachedName(docNo) {  // 文稿管理檔暫存的名稱
		return "folio_" + docNo;
	}
	function getDraftMgmtFilePath(msgId, docNo) {
		return "usr/" + msgId + "/" + docNo + "-00-99/DraftMgmt.xml";
	}
	function getDraftCachedName(docNo, fileName) {
		return "draft_" + docNo + "_00-99_" + fileName;
	}
	function getDraftFilePath(msgId, docNo, fileName) {
		return "usr/" + msgId + "/" + docNo + "-00-99/" + fileName;
	}
	
	//2017.01.17	Leslie	新增Cache相關邏輯
	var CacheFile = {
		push: function(key,fli){
			if(_cacheFileName.indexOf(Utf7.encode(key)) == -1){
				if(typeof fli == "object" && "documentElement" in fli){
					var _cacheStr = Util.getXml(fli);
					_cacheFile.push(_cacheStr);
					_cacheType.push(("selectSingleNode" in fli));
				}
				else{
					_cacheFile.push(fli);
					_cacheType.push(false);
				}
				var max = _cacheFileName.push(Utf7.encode(key));
				if(max > 8){		//上限
					_cacheFile.shift();
					_cacheFileName.shift();
					_cacheType.shift();
				}
			}
		},
		get: function(key,IE){
			// 1111213 Raymond 1111396 新增先檢查在不在_cacheFileName2, 在的話優先使用
			if(_cacheFileName2.indexOf(Utf7.encode(key)) != -1) {
				theLogger.log("取得key=["+key+"]的CacheFile2");
				var idxCache2 = _cacheFileName2.indexOf(Utf7.encode(key));
				return _cacheFile2[idxCache2];
			}
			if(_cacheFileName.indexOf(Utf7.encode(key)) == -1){
				theLogger.error("找不到指定key=["+key+"]的CacheFile");
				return null;
			}
			else{
				theLogger.log("取得key=["+key+"]的CacheFile");
				var idxCache = _cacheFileName.indexOf(Utf7.encode(key))
				var rtn = _cacheFile[idxCache];
				if(rtn.indexOf('<') == 0){
					if(_cacheType[idxCache] || IE) {	//2017.01.19	Leslie	增加特別取得MSXML2型別邏輯
						var xml = new ActiveXObject("MSXML2.DOMDocument");
						if(!xml.loadXML(rtn)) {
							var pe = xml.parseError;
							throw new Error(pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
						}
					}
					else
						var xml = (new DOMParser()).parseFromString(rtn, "text/xml");
					return xml;
				}
				return rtn;
			}
		},
		indexOf: function(key){
			// 1111213 Raymond 1111396 新增先檢查在不在_cacheFileName2, 在的話優先使用
			if(_cacheFileName2.indexOf(Utf7.encode(key)) != -1)
				return _cacheFileName2.indexOf(Utf7.encode(key));
			return _cacheFileName.indexOf(Utf7.encode(key));
		},
		clear: function(){		//2017.3.15	Leslie	新增清除Cache函式，供每次登入時均清除Cache內容
			_cacheFile = new Array();
			_cacheFileName = new Array();
			_cacheType = new Array();
			_cacheFile2 = new Array();		// 1111213 Raymond 1111396 清除新增的修改後CacheFile
			_cacheFileName2 = new Array();	// 1111213 Raymond 1111396 清除新增的修改後CacheFile
		},
		// 1111213 Raymond 1111396 新增push2給修改後的資源檔(目前只有騎縫章)Cache
		push2: function(key,fli){
			if(_cacheFileName2.indexOf(Utf7.encode(key)) == -1){
				_cacheFile2.push(fli);
				var max = _cacheFileName2.push(Utf7.encode(key));
				if(max > 8){		//上限
					_cacheFile2.shift();
					_cacheFileName2.shift();
				}
			}
			else {
				theLogger.log("更新key=["+key+"]的CacheFile2");
				var idxCache2 = _cacheFileName2.indexOf(Utf7.encode(key))
				_cacheFile2[idxCache2] = fli;
			}
		}
	}
	
	// Singleton object
	window.theCacheMgr = {
		
		// public methods
		get: function(persistInfo) {
			var cachedName = "";
			if(persistInfo.type == "folio") {
				
				cachedName = getFolioCachedName(persistInfo.docNo);
				//if(typeof localStorage[cachedName] === "string")
				//    return (new DOMParser()).parseFromString(localStorage[cachedName], "text/xml");
				
				var dfd = $.Deferred();
				if("msgId" in persistInfo) {
					$.ajax(getDraftMgmtFilePath(persistInfo.msgId, persistInfo.docNo), {
							type: "GET",
							success: function(data, statusText, jqXHR) {
								localStorage[cachedName] = (new XMLSerializer()).serializeToString(data);
								dfd.resolve(data);
							},
							error: function(jqXHR, textStatus, errorThrown) {
								console.error(textStatus + ": " + errorThrown);
							}
						}
					)
				}
				else {
					var wfio = new WebFileIO(persistInfo.fileIOWS);
					var dirPath = persistInfo.subDirPath + "\\" + persistInfo.docNo + "-00-99";
					wfio.download(dirPath, "DraftMgmt.xml", {
						success: function(fil, res) {
							dfd.resolve(fil);
						},
						error: function(errorText) {
							dfd.reject(errorText);
						}
					});
				}
				return dfd;
			}
			else if(persistInfo.type == "draft") {
				
				//cachedName = getDraftCachedName(persistInfo.docNo, persistInfo.fileName);
				//if(typeof localStorage[cachedName] === "string")
				//    return (new DOMParser()).parseFromString(localStorage[cachedName], "text/xml");
				
				/*var res;
				$.ajax(getDraftFilePath(persistInfo.msgId, persistInfo.docNo, persistInfo.fileName), {
						type: "GET",
						async: false,
						success: function(data, statusText, jqXHR) {
							console.log("下載文稿\"" + persistInfo.docNo + "\"(" + persistInfo.fileName + ")成功!");
							console.log(data);
							res = data;
							localStorage[cachedName] = (new XMLSerializer()).serializeToString(data);
						},
						error: function(jqXHR, textStatus, errorThrown) {
							console.error(textStatus + ": " + errorThrown);
						}
					}
				)
				return res;*/
				
				var dfd = $.Deferred();
				var wfio = new WebFileIO(persistInfo.fileIOWS);
				var dirPath = persistInfo.subDirPath + "\\" + persistInfo.docNo + "-00-99";
				wfio.download(dirPath, persistInfo.fileName, {
					success: function(fil, res) {
						dfd.resolve(fil);
					},
					error: function(errorText) {
						dfd.reject(errorText);
					}
				});
				return dfd;
			}
			else if(persistInfo.type == "rsrc") {
				
				/* Rsrc files not cached yet
				cachedName = getRsrcFileCachedName(persistenceInfo.rsrc);
				if(typeof localStorage[cachedName] === "string")
					return (new DOMParser()).parseFromString(localStorage[cachedName], "text/xml");*/
				var dfd = $.Deferred();
				// 2016.7.1 新增支援new_draft_from_mpl功能傳入的物件格式
				if("wfioUrl" in persistInfo.rsrc && "filePath" in persistInfo.rsrc) {
					
					//2017.01.17	Leslie	新增Cache相關邏輯
					var key = persistInfo.rsrc.filePath;
					if(CacheFile.indexOf(key) != -1){
						//var check = CacheFile.get(key);
						dfd.resolve(CacheFile.get(key,("IE" in persistInfo.rsrc)));		//2017.01.19	Leslie	傳入是否指定回傳MSXML2型別
						return dfd.promise();
					}
					
					var s = persistInfo.rsrc.filePath.lastIndexOf("\\");
					if(s > 0) {
						var dirPath = persistInfo.rsrc.filePath.substring(0, s);
						var fileName = persistInfo.rsrc.filePath.substring(s + 1);
						var wfio = new WebFileIO(persistInfo.rsrc.wfioUrl);
						// for IE
						var allowMSXML = true;
						if(persistInfo.rsrc.parent && persistInfo.rsrc.parent.getCategory() != "樣版") {
							theLogger.error("例外!!! 指定資源檔不是樣版");
							allowMSXML = false;
						}
						wfio.download(dirPath, fileName, {
							allowMSXML: allowMSXML,
							async: persistInfo.async,	// 1060623 Raymond 1060147 新增由傳入參數決定是否非同步下載(for第1次下載機關代碼_Data.xml)
							success: function(fil, res) {
								if(fil != undefined) {
									CacheFile.push(key,fil);//2017.01.17	Leslie	push至Cache裡
									dfd.resolve(fil);
								}
								else
									dfd.reject("WebFileIO呼叫成功但夾檔資料未下載");
							},
							error: function(errorText) {
								dfd.reject(errorText)
							}
						});
					}
					else {
						theLogger("傳入filePath參數無'\\', 格式錯誤!");
					}
				}
				else if(persistInfo.rsrc.path == "" || persistInfo.rsrc.outdated()) {
					if(persistInfo.rsrc.remote != undefined) {
						var dirPath = persistInfo.rsrc.remote.getDirPath();
						var fileName = persistInfo.rsrc.remote.path;
						
						//2017.01.17	Leslie	新增Cache相關邏輯
						var key = dirPath+fileName;
						if(CacheFile.indexOf(key) != -1){
							//var check = CacheFile.get(key);
							dfd.resolve(CacheFile.get(key,("IE" in persistInfo.rsrc)));	//2017.01.19	Leslie	傳入是否指定回傳MSXML2型別
							return dfd.promise();
						}
						
						// for IE
						var allowMSXML = false;
						if(persistInfo.rsrc.parent.getCategory() == "樣版") {
							allowMSXML = true;
						}
						var wfio = new WebFileIO(persistInfo.rsrc.remote.getWFIOURL());
						wfio.download(dirPath, fileName, {
							allowMSXML: allowMSXML,
							async: persistInfo.async,	// 1060623 Raymond 1060147 新增由傳入參數決定是否非同步下載(for第1次下載機關代碼_Data.xml)
							success: function(fil, res) {
								if(fil != undefined) {
									
									/* cacahe file
									if(openDatabase != undefined) {
										var db = openDatabase("ResourceFiles", 1, "Resource files cached locally", 2 * 1048576);
										db.transaction(function(tx) {
											//1090306	Joe		1090139		配合Zap弱掃移除指令註解
											//tx.executeSql("CREATE IF NOT EXISTS TABLE PublicRsrcFile (name, path, desc, doctype, subdoctype, drafttype, size, lastmod, removed, cached BLOB)");
										});
										db.readTransaction(function(tx) {
											//1090306	Joe		1090139		配合Zap弱掃移除指令註解
												console.log("RublicRsrcFile: " + results.rows.length);
											});
										});
									}*/
									if(!persistInfo.noCache)	// 1130216 Raymond 1120232 新增noCache參數, 若傳入true則表示不要cache, 主要用於邊改OutXSL邊測的情況
									CacheFile.push(key,fil);//2017.01.17	Leslie	push至Cache裡
									// 1111207 Raymond 1111396 新增更新Cache的資源檔的callback function
									//dfd.resolve(fil);
									dfd.resolve(fil, function(updData) {
										CacheFile.push2(key, updData);	// 1111213 Raymond 1111396 修改後的資源檔(目前只有騎縫章)改用push2暫存
									});
								}
								else
									dfd.reject("WebFileIO呼叫成功但夾檔資料未下載");
							},
							error: function(errorText) {
								dfd.reject(errorText)
							}
						});
					}
				}
				return dfd.promise();
			}
			else if(persistInfo.type == "genericXml") {
				
				cachedName = persistInfo.fileName;
				if(typeof localStorage[cachedName] === "string")
					return (new DOMParser()).parseFromString(localStorage[cachedName], "text/xml");
				
				var res;
				$.ajax(persistInfo.fileName, {
						type: "GET",
						async: false,
						success: function(data, statusText, jqXHR) {
							res = data;
							localStorage[cachedName] = (new XMLSerializer()).serializeToString(data);
						},
						error: function(jqXHR, textStatus, errorThrown) {
							console.error(textStatus + ": " + errorThrown);
						}
					}
				)
				return res;
			}
			return undefined;
		},
		rsrcCacheClear: function(){	//2017.3.15	Leslie	新增清除Cache函式，供每次登入時均清除Cache內容
			theLogger.log("執行：CacheFile.clear()");
			CacheFile.clear();
		}
	};
	
	if(inst != undefined)
		inst.finish();
	
})();
