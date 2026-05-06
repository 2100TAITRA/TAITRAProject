// WebServices class
//   1041102 - Raymond, 修改以SSO_CONFIG.logLevel決定寫theLogger.log的明細程度
//  2015.12.15 - Raymond, 改用theLogger記錄LOG資訊
// 1060621 Raymond 1060283 invokeWS支援陣列類型參數
// 1060707 Raymond 1060361 取得、新增、刪除個人自訂範本
// 1060802 Raymond ------- 修正有4-Bytes UTF-8編碼時無法轉為正常的surrogate pair UCS-2字串問題
// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
// 1070808 Cloud   1070685 修改新增受文者叫用WS，增加取得識別碼
// 1080222 Raymond 1080201 下載個人章戳資訊改用同步, 以免個人章戳資訊比共用章戳資訊晚下載到時, 插入的「個人」章戳匣變選用章戳清單中的最後一個的問題
// 1080927 Eric    1080339 jQuery 3.0 upgrade. ($.type => SSOUtil.typeOf)
// 1091117 Raymond 1080943 WebFileIO.del方法的argFile參數補上空的toPath及toName, 以避免invokeJSON發生錯誤
// 1091202 Raymond 1090884 iPad(iPadOS 13)目前發現多次開啟公文後, 偵測下載的封裝檔XML的編碼時, RegExp.$1會變空白, 導致無法開啟公文, 改用別的方法偵測編碼
// 1100917 Raymond 1080763 合併1070348, 修正新增、刪除自訂範本增加類別參數及取得自訂範本的類別功能
// 1110421 Kevin   1110164 弱掃移動script至js
// 1111201 Raymond 1110867 修正IE在output HTML(另存ODT上傳HTM檔至轉檔工作站)時transformNode()出來的是字串, 上傳時須強制轉為UTF-16, 上傳後的檔案才不會成亂碼, 及上傳的是HTML檔時不要加XML宣告, 及檢查HTML的break-inside屬性更名回page-break-inside, 因ODT只認得page-break-inside
// 1120901 Leslie  1120709 弱掃修正Client DOM Stored XSS
// 1121107 Raymond 1120941 合併1120627, 新增取得被裁併機關的資源管理檔的方法
// 1130116 Leslie  1130033 調整個人章戳下載行為，改為下載成功後即不再重覆下載
// 1130809 Raymond 1130313 合併1111007(1100394), 修正因在連線版子機關帳號登入時取到的AD_Account的OrgNickName會是空值, 連帶使離線版check2.asmx的GetUerInfo回傳的OrgNickName也會是空值, 改用SSO_CONFIG.OrgNickName取代, 以避免無法載入Custom_機關暱稱.js的問題
// 1130809 Raymond 1130313 合併1111007(1100394), 修正離線版取得的承辦單位名稱不會依環境變數OD_OPEN_WEBEDIT_BY_SUBUNIT改變, 造成二級單位承辦人創稿時右下角條碼的抬頭顯示為二級單位名稱而非一級單位名稱的問題
// 1130809 Raymond 1130313 合併1111007, 修正ajax的errorThrown只是string
// 1131325 Raymond 1131229 jDataView.buffer更新後變ArrayBuffer, 不能直接用了, 要用Uint8Array轉接
// 1140425 Raymond 北榮版更後問題序79 上傳PNG影像檔後再下載一次與原上傳資料比對是否一致, 不一致時重新上傳一次, 再比對仍不一致時, 則回應上傳失敗錯誤
// 1140425 Leslie  1140706 消防署急單，修改可下載並開啟一代Big5編碼文稿(tc)
// 1140521 Raymond 1140573 修正機關代碼、使用者ID等參數改用theSSO.User的欄位, 以免代理公文時用到被代理人的自訂範本
// 1140613 Raymond 1140166 合併1130291, 新增支援.DI副檔名下載後可以Document形式載入
// 1140304 Raymond 1131303 新增判斷無BOM的JSON檔, 預設以UTF-8編碼處理
// 1140724 Raymond 序162   修正下載Big5編碼的資源檔(ex.內政部版的匯出交換表.xsl、99匯出交換表.xsl)會回傳字串而不是document, 導致另存DI功能異常的問題(1140706衍生問題)
// 1140723 Leslie  1141011 弱掃修正[Client DOM Stored XSS]，XML內容應無script
// 1141211 Raymond 1140957 修正夾帶的附件是PNG檔時, 會檢核到上傳與下載的資料不一致的問題
// 1150212 Raymond 外貿序60 修正夾帶的附件是PNG檔時, data會變成Uint8Array, 如果走下面else的邏輯, 會發生無charCodeAt方法的錯誤問題

(function WebServices() {
	
	// 安裝模組
	if(window.theModMgr != undefined)
		var inst = window.theModMgr.install("RD-WebServices.js");
	
	// 由子系統提供host參數, 若無則使用location.host(同網域)
	// 目前POST xml形式的soap message仍不能跨網域叫用
	var host = location.host;
	if("theSSO" in window && "WSServerHost" in theSSO)
		host = theSSO.WSServerHost;
	theLogger.log("theWebServices.host=\"" + host + "\"");
	
	// private members
	var _ws_urls = {};
		/* 2014.9 - 改在CONFIG\SSO_CONFIG.JS設定
		 *checkWS: host + "/WEDEP/check2.asmx",
		webEditWS: host + "/WEDEP/webeditws02.asmx",
		envelopeWS: host + "/EnvelopeWS/xmldsig.asmx",
		authWS: host + "/IIWS/AuthWS.asmx"};*/
	var _userInfo;
	var _profile;
	
	// 1120901 Leslie  1120709 弱掃修正Client DOM Stored XSS
	function HtmlEncode(s) {
		var div = document.createElement('div');
		div.appendChild(document.createTextNode(s));
		return div.innerHTML;
	}
	
	// 載入公文製作會用到的Profile.xml
	function loadProfile(xmlDoc) {
		var docElem = xmlDoc.documentElement;
		if(docElem) {
			for(var i=0; i<docElem.childNodes.length; i++) {
				var elem = docElem.childNodes[i];
				if(elem.nodeType == 1 && elem.nodeName.match(/wsdl/i)) {
					if(_profile == undefined)
						_profile = {};
					_profile[elem.getAttribute("id")] = {url: $(elem).text().replace(/^http[s]*:\/\/[a-zA-Z0-9\.]*\//, host + "/")};  // [暫時]無線網路目前無法解析區網的域名, 只能全轉IP, 正式版域名解析應要能在iPad上運作
					//alert(elem.getAttribute("id") + ": " + _profile[elem.getAttribute("id")].url);
					if(elem.hasAttribute("NS")) {
						_profile[elem.getAttribute("id")].NS = elem.getAttribute("NS");
						theLogger.log("has \"NS\" attribute, keep: " + _profile[elem.getAttribute("id")].NS);
					}
				}
			}
		}
		var str = "";
		for(var fn in _profile) {
			if(typeof fn !== "function") {
				if(str.length)
					str += "\r\n";
				str += fn + ((_profile[fn].NS != undefined)?("(NS:" + _profile[fn].NS) + ")":"") + " = " + _profile[fn].url;
			}
		}
		theLogger.log(str);
	}
	
	// 一般WebService回傳的XML
	function procResult(resXml, method, callback) {
		
		function xmlNodeToObj(nd) {
			if(nd.childNodes.length > 0) {
				// 2016.9.6 新增解讀屬性, 因為getCopy回傳的節點會有屬性
				var res = {}, hasAttr = false;
				if(nd.attributes.length > 0) {
					for(var i=0; i<nd.attributes.length; i++) {
						var a = nd.attributes[i].nodeName;
						var av = nd.attributes[i].nodeValue;
						if(typeof av === "string") {
							res["@" + a] = av;	// 用@屬性名當JSON名稱
							hasAttr = true;
						}
					}
				}
				if(nd.childNodes.length == 1 && nd.childNodes[0].nodeType == 3) {	// text node
					if(hasAttr) {	// 有屬性的話, 必須用物件回傳
						if(nd.childNodes[0].nodeValue.length > 0)
							res["text"] = nd.childNodes[0].nodeValue;
						return res;
					}
					return nd.childNodes[0].nodeValue;
				}
				else {
					for(var i=0; i<nd.childNodes.length; i++) {
						if(nd.childNodes[i].tagName && typeof nd.childNodes[i].tagName === "string") {
							var tagName = nd.childNodes[i].tagName;
							if(nd.childNodes[i].tagName in res) {    // array?
								if(Object.prototype.toString.call(res[nd.childNodes[i].tagName]) !== '[object Array]') {    // 2014.3.6 - Raymond, 判斷是不是Array的標準方法
									//theLogger.log("typeof res['" + nd.childNodes[i].tagName + "'] = " + typeof res[nd.childNodes[i].tagName]);
									var v = res[nd.childNodes[i].tagName];
									res[nd.childNodes[i].tagName] = new Array();
									res[nd.childNodes[i].tagName].push(v);
								}
								res[nd.childNodes[i].tagName].push(arguments.callee(nd.childNodes[i]));
							}
							else
								res[nd.childNodes[i].tagName] = arguments.callee(nd.childNodes[i]);
						}
						else
							throw new Error("子節點無tagName");
					}
					return res;
				}
			}
			else {
				// 2016.9.6 新增解讀屬性
				if(nd.attributes.length > 0) {
					var res = {};
					for(var i=0; i<nd.attributes.length; i++) {
						var a = nd.attributes[i].nodeName;
						var av = nd.attributes[i].nodeValue;
						if(typeof av === "string") {
							res["@" + a] = av;	// 用@屬性名當JSON名稱
						}
					}
					if(nd.textContent.length > 0)
						res["text"] = nd.textContent;
					return res;
				}
				else
					return nd.textContent;
			}
		}
		
		var nd = resXml.getElementsByTagName(method + "Result");
		if(nd.length == 0) {
			theLogger.log(resXml);
			if(resXml.getElementsByTagName("faultcode").length > 0)
				throw new Error(resXml.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
		}
		else {
			var res = xmlNodeToObj(nd[0]);
			if(callback != undefined)
				callback(res, resXml);
			else
				return res;
		}
	}
	
	// 公開的WebService物件(Singleton pattern)
	window.theWebServices = {
		
		host: host,
		
		url: function() {
			if(arguments.length == 0)
				return _ws_urls;
			else {
				var p1 = arguments[0];
				if(typeof p1 == "string") {
					if(arguments.length == 1) {
						theLogger.log("讀取URL[" + p1 + "]:" + _ws_urls[p1]);
						return _ws_urls[p1];
					}
					if(typeof arguments[1] == "string") {
						theLogger.log("設定URL[" + p1 + "]='" + arguments[1] + "'");
						_ws_urls[p1] = arguments[1];
					}
					else
						throw new Error("theWebServices.url()不支援第2個參數是'" + typeof(arguments[1]) + "'型態!");
				}
				else if(typeof p1 == "object") {
					theLogger.log("設定URLs...");
					for(var k in p1) {
						theLogger.log("\t" + k + "='" + p1[k] + "'");
						_ws_urls[k] = p1[k];
					}
				}
				else
					throw new Error("theWebServices.url()不支援'" + typeof(p1) + "'型態的參數!");
			}
		},
		
		invokeWS: function(url, method, ns, params, async, callback) {
			theLogger.log("invokeWS(" + url + ", " + method + ", ns:" + ns + ", params:");
			theLogger.log(params);
			theLogger.log(", async:" + async + ", callback:" + typeof(callback) + ")");
			var xmlParams = '<?xml version="1.0" encoding="utf-8"?>' +
							'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
								'<soap:Body>' +
									'<' + method + ' xmlns="' + ((!!ns)?ns:'http://tempuri.org/')+ '">';
			for(p in params) {
				if(SSOUtil.typeOf(params[p]) == "array") {	// 1060621 Raymond 1060283 支援陣列類型參數
					theLogger.log("參數[" + p + "]是陣列類型");
					xmlParams += '<' + p + '>';
					for(var i=0; i<params[p].length; i++) {
						var o = params[p][i];
						for(nm in o)
							xmlParams += '<' + nm + '>' + o[nm] + '</' + nm + '>';
					}
					xmlParams += '</' + p + '>';
				}
				else
					xmlParams +=            '<' + p + '>' + params[p] + '</' + p + '>';
			}
			xmlParams +=            '</' + method + '>' +
								'</soap:Body>' +
							'</soap:Envelope>';
			//theLogger.log(xmlParams);
			var t0 = new Date(), res = null;
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.open("POST", url, async);
			//1120331	Leslie[1111455]	叫用WebFileIO增加帶上Cookie
			xmlHttp.withCredentials = true;
			// 1080128 Raymond 修正ns行末有'/'時, method多加了一個的問題
			//var soapaction = ((!!ns)?(ns + "/"):'http://tempuri.org/') + method;
			var soapaction = ((!!ns)?(ns + ((ns.match(/\/$/))?"":"/")):'http://tempuri.org/') + method;
			xmlHttp.setRequestHeader("SOAPAction", soapaction);
			xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
			if(navigator.userAgent.search(/Chrome/) < 0) {  // not chrome!
				//xmlHttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");  // 必須加上這個Header, 以免在iOS平台預設會Cache HTTP Request的環境下發生錯誤
			//    xmlHttp.setRequestHeader("Cache-Control", "no-cache");
			}
			// 跨網域應設參數[未測試,無環境]
			//xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*");	// 2016.6.27 IIS若只設定跨網域而未設定此Header, 可能還是會不過
			//xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			//theLogger.log(xmlHttp);
			if(async) 
			{
				xmlHttp.onreadystatechange = function() 
				{
					if(xmlHttp.readyState == 4) {
						if(xmlHttp.status == 200)
							procResult(xmlHttp.responseXML, method, callback);
						else {	// 2016.7.14 若WS呼叫失敗, 有可能回應網頁內容, 此時另開新視窗顯示
							var newWin = window.open();
							// 1120901 Leslie  1120709 弱掃修正Client DOM Stored XSS
							// newWin.document.write(xmlHttp.responseText);
							newWin.document.write(HtmlEncode(xmlHttp.responseText));
							newWin.document.close();
							newWin.focus();
						}
					}
				}
				
				//2016.10.14	Leslie	增加連線或站台異常時的錯誤處理
				xmlHttp.onerror = function(){
					theLogger.log(xmlHttp);
					var _rtnErr = {}
					if(xmlHttp.readyState == 4 && xmlHttp.status == 0){
						_rtnErr.Err = {
							ErrNo:xmlHttp.status,
							ErrMsg:"呼叫WS["+url+"/"+method+"]時發生未知的異常，請連絡系統管理員。"
						};
					}
					else {
						_rtnErr.Err = {
							ErrNo:xmlHttp.status,
							ErrMsg:"呼叫WS["+url+"/"+method+"]時發生異常，異常訊息："+xmlHttp.responseText+"。請連絡系統管理員"
						};
					}
					theLogger.log(_rtnErr.Err.ErrMsg);
					if(callback != undefined)
						callback(_rtnErr);
				}
			}
			xmlHttp.send(xmlParams);
			if (!async) {
				if(callback != undefined)
					procResult(xmlHttp.responseXML, method, callback);
				else
					return procResult(xmlHttp.responseXML, method);
			}
		},
		
		// public methods
		getUserInfo: function(userId, artifact, departId) {
			var dfd = $.Deferred();
			if(artifact == "debug mode") {
				window.theUserInfo = {};
				dfd.resolve();
				return dfd;
			}
			var params = {
				"UserID": userId,
				"Artifact": artifact,
				"DepartID": departId};
			try {
				this.invokeWS(SSO_CONFIG.getWSUrl("checkws"), "GetUserInfo", null, params, true, function(r) {
					theLogger.log(SSOUtil.dev_getCurrentTimeStr() + "-tm- GetUserInfo returns: ");
					theLogger.log(r);
					//alert(r.WSDL4Profile + "\n" + r.Path4Profile + "\n" + r.Filename4Profile);
					window.theUserInfo = r;
					// 1130809 Raymond 1130313 合併1111007(1100394), 離線版子機關取到的AD_Account的OrgNickName會是空值, 連帶使check2.asmx的GetUerInfo.OrgNickName也會是空值, 改用SSO_CONFIG.OrgNickName取代
					if(!window.theUserInfo.OrgNickName || window.theUserInfo.OrgNickName.length == 0) {
						theLogger.log("由於theUserInfo.OrgNickName為空, 改用SSO_CONFIG.OrgNickName(" + SSO_CONFIG.OrgNickName + ")取代");
						window.theUserInfo.OrgNickName = SSO_CONFIG.OrgNickName;
					}
					// 1130809 Raymond 1130313 合併1111007(1100394), 離線版取得的承辦單位名稱不會依環境變數OD_OPEN_WEBEDIT_BY_SUBUNIT改變, 故在此改變
					if(!!theSSO && theSSO.offlineMode == true) {
						var flag = theSSO.User.EnvSettings.get("OD_OPEN_WEBEDIT_BY_SUBUNIT");
						if(flag == "1" && theUserInfo.DepartID.length > 2) {
							var lv1ouName = SSOUtil.getOrgUnitName(SSOUtil.getOrgNode(theUserInfo.OrgID), theUserInfo.DepartID.substr(0, 2));
							theLogger.log("離線模式下, 單位名稱依環境變數[OD_OPEN_WEBEDIT_BY_SUBUNIT]設定(" + flag + ")由'" + theUserInfo.DepartName + "'改為'" + lv1ouName + "'");
							theUserInfo.DepartName = lv1ouName;
						}
						else if(flag == "3" && theUserInfo.DepartID.length > 2) {
							var lv1ouName = SSOUtil.getOrgUnitName(SSOUtil.getOrgNode(theUserInfo.OrgID), theUserInfo.DepartID.substr(0, 2));
							theLogger.log("離線模式下, 單位名稱依環境變數[OD_OPEN_WEBEDIT_BY_SUBUNIT]設定(" + flag + ")由'" + theUserInfo.DepartName + "'改為'" + lv1ouName + "(" + theUserInfo.DepartName + ")" + "'");
							theUserInfo.DepartName = lv1ouName + "(" + theUserInfo.DepartName + ")";
						}
					}
					if(r.WSDL4Profile != undefined && r.WSDL4Profile.length > 0) {
						var wfio = new WebFileIO(r.WSDL4Profile);
						wfio.download(r.Path4Profile, r.Filename4Profile, {
							success: function(fil, res) {
								if(SSO_CONFIG.logLevel >= 3)
									theLogger.log(fil);
								if(fil != undefined) {
									loadProfile(fil);
									//alert("載入Profile.xml成功!");
									dfd.resolve();
								}
							},
							error: function(status) {
								dfd.reject(status);
							}
						});
					}
					else {
						if(r.UserID == undefined || r.UserID.length == 0)
							dfd.reject(r.UserName);
						else
							dfd.reject("呼叫GetUserInfo成功但返回資料無Profile資訊!");
					}
				});
			}
			catch(e) {
				alert(e.message + " - " + e.sourceURL + ":" + e.line);
			}
			return dfd;
		},
		getPublicRsrc: function(options) {
			if(window.theUserInfo == undefined) {
				if(options && options.error)
					options.error("尚未取得使用者資訊");
				else
					throw new Error("尚未取得使用者資訊");
			}
			else if(_profile == undefined) {
				if(options && options.error)
					options.error("尚未載入Profile.xml");
				else
					throw new Error("尚未載入Profile.xml");
			}
			else if(_profile["getPublicRsrc"] == undefined) {
				if(options && options.error)
					options.error("Profile.xml未記錄getPublicRsrc函式的WebService網址");
				else
					throw new Error("Profile.xml未記錄getPublicRsrc函式的WebService網址");
			}
			else {
				var params = new SOAPClientParameters();
				params.add("Artifact", window.theUserInfo.Artifact);
				params.add("UserID", window.theUserInfo.UserID);
				params.add("OrgID", window.theUserInfo.OrgID);
				params.add("DeptID", window.theUserInfo.DepartID);
				params.add("Path4Profile", window.theUserInfo.Path4Profile);
				params.add("WSDL4Profile", window.theUserInfo.WSDL4Profile);
				SOAPClient.invoke(_profile["getPublicRsrc"].url, "getPublicRsrc", params, true, function(r) {
					theLogger.log("getPublicRsrc returns:");
					theLogger.log(r);
					if(r.tagName == "錯誤資訊") {
						if(options && options.error)
							options.error($(r).find("錯誤訊息").text());
						else
							throw new Error($(r).find("錯誤訊息").text());
					}
					else if(options && options.success)
						options.success(r);
				});
			}
		},
		getPrivateRsrc: function(options) {
			if(window.theUserInfo == undefined) {
				if(options && options.error)
					options.error("尚未取得使用者資訊");
				else
					throw new Error("尚未取得使用者資訊");
			}
			else if(_profile == undefined) {
				if(options && options.error)
					options.error("尚未載入Profile.xml");
				else
					throw new Error("尚未載入Profile.xml");
			}
			else if(_profile["getPrivateRsrc"] == undefined) {
				if(options && options.error)
					options.error("Profile.xml未記錄getPrivateRsrc函式的WebService網址");
				else
					throw new Error("Profile.xml未記錄getPrivateRsrc函式的WebService網址");
			}
			else {
				var params = {
					"Artifact": window.theUserInfo.Artifact,
					"UserID": window.theUserInfo.UserID,
					"DeptID": window.theUserInfo.DepartID,
					"OrgID": window.theUserInfo.OrgID,
					"IP": "127.0.0.1"};
				this.invokeWS(_profile["getPrivateRsrc"].url, "getPrivateRsrc", null, params, true, function(r) {
					theLogger.log("getPrivateRsrc returns:");
					theLogger.log(r);
					if(r.tagName == "錯誤資訊") {
						if(options && options.error)
							options.error($(r).find("錯誤訊息").text());
						else
							throw new Error($(r).find("錯誤訊息").text());
					}
					else if(options && options.success)
						options.success(r);
				});
			}
		},
		getPublicFolio: function(docNo, seqNo, startDate, endDate, issueNo, callback) {
			if(window.theUserInfo == undefined) {
				throw new Error("尚未取得使用者資訊");
			}
			else if(_profile == undefined) {
				throw new Error("尚未載入Profile.xml");
			}
			else if(_profile["getPublicFolio"] == undefined) {
				throw new Error("無getPublicFolio函式的WebService網址");
			}
			else {
				var params = {
					"Artifact": window.theUserInfo.Artifact,
					"UserID": window.theUserInfo.UserID,
					"OrgID": window.theUserInfo.OrgID,
					"DeptID": window.theUserInfo.DepartID,
					"Path4Profile": window.theUserInfo.Path4Profile,
					"WSDL4Profile": window.theUserInfo.WSDL4Profile,
					"FuncName4Profile": "WebFileIO",
					"QryFile": "",
					"Summary": "",
					"DocNo": docNo,
					"SeqNo": seqNo,
					"StartDate": startDate,
					"EndDate": endDate,
					"IssueNo": issueNo,
					"IP": "127.0.0.1"};
				this.invokeWS(_profile["getPublicFolio"].url, "getPublicFolio", null, params, true, function(r) {
					theLogger.log("getPublicFolio returns:");
					theLogger.log(r);
					if(callback)
						callback(r);
				});
			}
		},
		getPrvateFolio: function(callback) {
			if(window.theUserInfo == undefined) {
				throw new Error("尚未取得使用者資訊");
			}
			else if(_profile == undefined) {
				throw new Error("尚未載入Profile.xml");
			}
			else if(_profile["getPrivateFolio"] == undefined) {
				throw new Error("無getPrivateFolio函式的WebService網址");
			}
			else {
				var params = {
					"Artifact": window.theUserInfo.Artifact,
					"UserID": window.theUserInfo.UserID,
					"DeptID": window.theUserInfo.DepartID,
					"OrgID": window.theUserInfo.OrgID,
					"IP": "127.0.0.1"};
				this.invokeWS(_profile["getPrivateFolio"].url, "getPrivateFolio", null, params, true, function(r) {
					theLogger.log("getPrivateFolio returns:");
					theLogger.log(r);
					if(callback)
						callback(r);
				});
			}
		},
		getCopy: function(docNo, callback) {
			if(window.theUserInfo == undefined) {
				throw new Error("尚未取得使用者資訊");
			}
			else if(_profile == undefined) {
				throw new Error("尚未載入Profile.xml");
			}
			else if(_profile["GETCOPY"] == undefined) {
				throw new Error("無GETCOPY函式的WebService網址");
			}
			else {
				var params = {
					"Artifact": window.theUserInfo.Artifact,
					"OrgNo": window.theUserInfo.OrgID,
					"DocNo": docNo,
					"Path4Profile": window.theUserInfo.Path4Profile,
					"WSDL4Profile": window.theUserInfo.WSDL4Profile};
				this.invokeWS(_profile["GETCOPY"].url, "GETCOPY", (_profile["GETCOPY"].NS)?_profile["GETCOPY"].NS:"T2100", params, false, function(r) {	// 2016.9.6 增加NS預設值'T2100', 但其它方法(getUserInfo)沒設也可過?
					theLogger.log("getCopy returns:");
					theLogger.log(r);
					if(callback)
						callback(r);
				});
			}
		},
		/*getNo: function(callback) {
			if(window.theUserInfo == undefined) {
				throw new Error("尚未取得使用者資訊");
			}
			else if(_profile == undefined) {
				throw new Error("尚未載入Profile.xml");
			}
			else if(_profile["getNo"] == undefined) {
				throw new Error("無getNo函式的WebService網址");
			}
			else {
				var params = {
					"OrgNo": window.theUserInfo.OrgID,
					"Deptment": window.theUserInfo.DepartID};
				this.invokeWS(_profile["getNo"].url, "getNo", null, params, true, function(r) {
					theLogger.log("getNo returns:");
					theLogger.log(r);
					if(callback)
						callback(r);
				});
			}
		},*/
		getServerTime: function() {
			// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不呼叫WS取得Server時間
			if(!!theSSO && theSSO.offlineMode == true) {
				var now = new Date();
				var res = now.toISOString();
				res = res.replace(/[-T:]/g, '');
				if(res.indexOf('.') > 0)
					res = res.substr(0, res.indexOf('.')) + 'Z';
				return res;
			}
			var params = {}, res;
			this.invokeWS(SSO_CONFIG.getWSUrl("envelopews"), "GetServerTime", null, params, false, function(r) {
				theLogger.log("GetServerTime returns:");
				theLogger.log(r);
				if(r.ErrorClass.IsErr == "true")
					throw new Error(r.ErrorClass.ErrMessage);
				res = r.RtnStr;
			});
			return res;
		},
		// 2013/5/20 - Raymond, 整合Erin的code, 初始化下載使用者職名章及選用章戳
		initStampBox: function() {
			if(window.theUserInfo == undefined) {
				throw new Error("尚未取得使用者資訊");
			}
			
			// 1130116 Leslie[1130033] 調整個人章戳下載行為，改為下載成功後即不再重覆下載
			if(typeof theAOL != 'undefined' && (theAOL?.stampBoxInited??false))
				return
			
			// 初始化各章戳匣陣列
			theAOL.signetBox = new Array();
			theAOL.toolStampBox = new Array();
			theAOL.systemStampBox = new Array();
			// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式不下載章戳
			if(!!theSSO && theSSO.offlineMode == true)
				return;
			// 使用者職名章及個人章戳
			var userStampBoxHandler = {
				fileNames: new Array(),
				
				getNameSpace: function() {
					return "http://www.2100t.com.tw/webservices/";
				},
				getParams: function() {
					return '<argArtifact>' + window.theUserInfo.Artifact + '</argArtifact>';
				},
				onSoapMsg: function(res, xml, id) {
					for(var i=0, n=res.childNodes.length; i<n; i++) {
						if(res.childNodes[i].nodeType == 1) { // Element
							if(res.childNodes[i].nodeName == "string") {
								this.fileNames.push(res.childNodes[i].textContent);
								theLogger.log(this.fileNames.length + ": '" + this.fileNames[this.fileNames.length - 1] + "'");
							}
						}
					}
				},
				getFileName: function(idx) {
					if(idx >= 0 && idx < this.fileNames.length)
						return this.fileNames[idx];
					return false;
				},
				//onRetrieveFile: function(fil, fn) {},
				success: function(fil, all) {
					
					// 1130116 Leslie[1130033] 調整個人章戳下載行為，改為下載成功後即不再重覆下載
					theAOL.stampBoxInited = true;
					
					/* 最後回傳檔案是'章戳管理檔'
					var stampMgmt = fil.childNodes;*/
					// 2013.9.10 - Raymond, 章戳管理檔不見得是最後一個, 改用檔名指定
					if("StampMgmt.xml" in all)
						var stampMgmt = all["StampMgmt.xml"];
					if(stampMgmt) {
						theLogger.log(stampMgmt);	// 2015.10.12 查看用
						parseStampMgmt(stampMgmt, "user");
						for (var i=0; i<theAOL.signetBox.length; i++) {
							for (var j=0; j<this.fileNames.length; j++) {
								if (theAOL.signetBox[i].fileInfo.fileName == this.fileNames[j]) {
									theAOL.signetBox[i].data = all[this.fileNames[j]];
									break;
								}
							}
						}
						theLogger.log("職名章戳匣:");
						theLogger.log(theAOL.signetBox);
						// 2015.11.13 修正個人章戳匣未assign圖形檔案data問題
						for (var i=0; i<theAOL.toolStampBox.length; i++) {
							for (var j=0; j<theAOL.toolStampBox[i].stamps.length; j++) {
								if ("fileInfo" in theAOL.toolStampBox[i].stamps[j] && theAOL.toolStampBox[i].userOrOrg == "user") {	// 區別user才assign data, 個人與共用有可能圖檔檔名重複
									for (var k=0; k<this.fileNames.length; k++) {
										if (theAOL.toolStampBox[i].stamps[j].fileInfo.fileName == this.fileNames[k]) {
											theAOL.toolStampBox[i].stamps[j].data = all[this.fileNames[k]];
											break;
										}
									}
								}
							}
						}
						theLogger.log("個人章戳匣:");
						theLogger.log(theAOL.toolStampBox);
					}
				},
				// 1130116 Leslie[1130033] 
				// error: function(errorText) {
				error: function(errorText, errorThrown) {
					theLogger.error(errorText);
					//alert("下載個人章戳失敗!\r\n\r\n" + errorText);	// 2016.3.28 增加錯誤說明文字 2016.8.15 未建職名章不需警告
					
					// 1130116 Leslie[1130033] 調整個人章戳下載行為，改為下載成功後即不再重覆下載
					if(typeof errorThrown != 'undefined')
						alert(`下載個人章戳時發生未知的例外[${errorThrown}]，請重新開啟公文。`);
					else if(typeof errorText == 'string')
						theAOL.stampBoxInited = true;	//WebService有正常回應(status=200)，但沒有章戳設定時，仍視為正常行為
				},
				async: false	// 1080222 Raymond 1080201 下載個人章戳資訊改用同步, 以免個人章戳資訊比共用章戳資訊晚下載到時, 插入的「個人」章戳匣變選用章戳清單中的最後一個的問題
			};
			(new SOAPviaDIME()).invoke(SSO_CONFIG.getWSUrl("authws"), "DownloadUserStampBox", userStampBoxHandler);
			
			// 機關共用章戳
			var orgStampBoxHandler = {
				fileNames: new Array(),
				
				getNameSpace: function() {
					return "http://www.2100t.com.tw/webservices/";
				},
				getParams: function() {
					return '<argArtifact>' + window.theUserInfo.Artifact + '</argArtifact>' +
							'<argOrgCode>' + window.theUserInfo.OrgID + '</argOrgCode>';
				},
				onSoapMsg: function(res, xml, id) {
					for(var i=0, n=res.childNodes.length; i<n; i++) {
						if(res.childNodes[i].nodeType == 1) { // Element
							if(res.childNodes[i].nodeName == "string") {
								this.fileNames.push(res.childNodes[i].textContent);
								theLogger.log(this.fileNames.length + ": '" + this.fileNames[this.fileNames.length - 1] + "'");
							}
						}
					}
				},
				getFileName: function(idx) {
					if(idx >= 0 && idx < this.fileNames.length)
						return this.fileNames[idx];
					return false;
				},
				//onRetrieveFile: function(fil, fn) {},
				success: function(fil, all) {
					/* 最後回傳檔案是'章戳管理檔'
					var stampMgmt = fil.childNodes;*/
					// 2013.9.10 - Raymond, 章戳管理檔不見得是最後一個, 改用檔名指定
					if("StampMgmt.xml" in all)
						var stampMgmt = all["StampMgmt.xml"];
					if(stampMgmt) {
						theLogger.log(stampMgmt);
						parseStampMgmt(stampMgmt, "org");
						for (var i=0; i<theAOL.toolStampBox.length; i++) {
							for (var j=0; j<theAOL.toolStampBox[i].stamps.length; j++) {
								if ("fileInfo" in theAOL.toolStampBox[i].stamps[j] && theAOL.toolStampBox[i].userOrOrg == "org") { // 2013.10.17 - Raymond, 改了ParseStampMgmt.js, 2015.11.13 區別org才assign data, 個人與共用有可能圖檔檔名重複
									for (var k=0; k<this.fileNames.length; k++) {
										if (theAOL.toolStampBox[i].stamps[j].fileInfo.fileName == this.fileNames[k]) {
											theAOL.toolStampBox[i].stamps[j].data = all[this.fileNames[k]];
											break;
										}
									}
								}
							}
						}
						theLogger.log("共用章戳匣:");
						theLogger.log(theAOL.toolStampBox);
						for (var i=0; i<theAOL.systemStampBox.length; i++) {
							if ("fileInfo" in theAOL.systemStampBox[i] && theAOL.systemStampBox[i].userOrOrg == "org") { // 2013.10.17 - Raymond, 改了ParseStampMgmt.js, 2015.11.13 區別org才assign data, 個人與共用有可能圖檔檔名重複
								for (var j=0; j<this.fileNames.length; j++) {
									if(theAOL.systemStampBox[i].fileInfo.fileName == this.fileNames[j]) {
										theAOL.systemStampBox[i].data = all[this.fileNames[j]];
										break;
									}
								}
							}
						}
						theLogger.log("系統章戳匣:");
						theLogger.log(theAOL.systemStampBox);
					}
				},
				error: function(errorText) {
					theLogger.error(errorText);
					//1110602	Leslie[1110371]	純檔管無需跳警告
					if(typeof window.theStart !== 'undefined')
					alert("下載機關共用及系統章戳失敗!\r\n\r\n" + errorText);	// 2016.3.28 增加錯誤說明文字
				}
			};
			(new SOAPviaDIME()).invoke(SSO_CONFIG.getWSUrl("authws"), "DownloadOrgStampBox", orgStampBoxHandler);
		},
		// 2014/12/22 - Raymond, 查詢受文者明細
		// 1070808 Cloud   1070685 修改新增受文者叫用WS，增加取得識別碼
		//getOrgInfo4AD: function(orgNameOrID) {
		getOrgInfo4AD: function(orgNameOrID,argSeqNo,argDoc) {
			var dfd = $.Deferred();
			var params = {
				"argFullName": orgNameOrID,
				"OrgNo": window.theUserInfo.OrgID,
				"DeptNo": window.theUserInfo.DepartID,
				"UserID": window.theUserInfo.UserID,
				"Artifact": localStorage["artifact"],
				//1070808 Cloud   1070685 修改新增受文者叫用WS，增加取得識別碼
				"argSeq": argSeqNo,
				"argDocNo": argDoc
				};
			try {
			//	this.invokeWS(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgInfo4AD", null, params, true, function(r) {
				this.invokeWS(SSO_CONFIG.getWSUrl("weorginfows"), "GetOrgInfo4ADWithDLKey", null, params, true, function(r) {	
					theLogger.log("GetOrgInfo4ADWithDLKey returns: ");
					theLogger.log(r);
					//alert(r.WSDL4Profile + "\n" + r.Path4Profile + "\n" + r.Filename4Profile);
					if("ErrorClass" in r && r.ErrorClass.IsErr == "true") {
						dfd.reject(r.ErrorClass.ErrMessage, r);
					}
					else {
						dfd.resolve(r);
					}
				});
			}
			catch(e) {
				alert(e.message + " - " + e.sourceURL + ":" + e.line);
			}
			return dfd;
		},
		// 2016.9.8 新增取得附件下載區識別碼功能
		getDocHash: function(orgNo, docNo) {
			var dfd = $.Deferred();
			if(window.theUserInfo == undefined) {
				throw new Error("尚未取得使用者資訊");
			}
			else if(_profile == undefined) {
				throw new Error("尚未載入Profile.xml");
			}
			else {
				var params = {
					"strOrgNo": orgNo,
					"strDocNo": docNo};
				this.invokeWS(theUserInfo.WSDL4GetDocNo, "GetDocHash", "T2100", params, false, function(r) {	// 2016.9.22 改成同步, 否則取得的附件下載區資訊可能不會即時顯示在附件子視窗內導致沒存到
					theLogger.log("getDocHash returns:");
					theLogger.log(r);
					if("ErrorClass" in r && r.ErrorClass.IsErr == "true") {
						dfd.reject(r.ErrorClass.ErrMessage, r);
					}
					else if("IsErr" in r && r.IsErr == "true") {
						dfd.reject(r.ErrMsg, r);
					}
					else {
						dfd.resolve(r.RtnValue);
					}
				});
			}
			return dfd.promise();
		},
		// 2016.9.19 新增取得密件控管代碼功能
		getPDraftCRuleNo: function(msgId) {
			var dfd = $.Deferred();
			if(window.theUserInfo == undefined) {
				throw new Error("尚未取得使用者資訊");
			}
			else if(_profile == undefined) {
				throw new Error("尚未載入Profile.xml");
			}
			else {
				var params = {
					"argSessionID": localStorage['Artifact'],
					"argSourceOrgno": theUserInfo.OrgID,
					"argUserName": theUserInfo.UserID,
					"argMsgId": msgId};
				this.invokeWS(_profile['getPublicRsrc'].url, "GetPDraftCRuleNo", "T2100", params, true, function(r) {
					theLogger.log("getPDraftCRuleNo returns:");
					theLogger.log(r);
					if("ErrorClass" in r && r.ErrorClass.IsErr == "true") {
						dfd.reject(r.ErrorClass.ErrMessage, r);
					}
					else if("IsErr" in r && r.IsErr == "true") {
						dfd.reject(r.ErrMsg, r);
					}
					else {
						dfd.resolve(r.RtnValue);
					}
				});
			}
			return dfd.promise();
		},
		// 1060707 Raymond 1060361 新增取得個人自訂範本清單
		getPrivateExamples: function(options) {
			if(window.theUserInfo == undefined) {
				if(options && options.error)
					options.error("尚未取得使用者資訊");
				else
					throw new Error("尚未取得使用者資訊");
			}
			else if(_profile == undefined) {
				if(options && options.error)
					options.error("尚未載入Profile.xml");
				else
					throw new Error("尚未載入Profile.xml");
			}
			else if(_profile["getPublicRsrc"] == undefined) {
				if(options && options.error)
					options.error("Profile.xml未記錄getPublicRsrc函式的WebService網址");
				else
					throw new Error("Profile.xml未記錄getPublicRsrc函式的WebService網址");
			}
			else {
				var params = new SOAPClientParameters();
				// 1140521 Raymond 1140573 修正機關代碼、使用者ID等參數改用theSSO.User的欄位, 以免代理公文時用到被代理人的自訂範本
				//params.add("argOrgno", window.theUserInfo.OrgID);
				//params.add("argUserName", window.theUserInfo.UserID);
				params.add("argOrgno", window.theSSO.User.orgid);
				params.add("argUserName", window.theSSO.User.account);
				SOAPClient.invoke(_profile["getPublicRsrc"].url, "GetPrivateExamples", params, true, function(r) {
					theLogger.log("GetPrivateExamples returns:");
					theLogger.log(r);
					if($(r).attr("bSuccess") == "false") {
						if(options && options.error)
							options.error($(r).find("錯誤").text());
						else
							throw new Error($(r).find("錯誤").text());
					}
					else if(options && options.success)
						options.success(r);
				});
			}
		},
		// 1100917 Raymond 1080763 合併1070348, 新增類別參數
		// 1060707 Raymond 1060361 新增個人自訂範本夾帶附件
		//addPrivateExample: function(wfioUrl, filePath, sampleName, data, options) {
		addPrivateExample: function(wfioUrl, filePath, sampleName, sampleClass, data, options) {
			theLogger.log("addPrivateExample(" + wfioUrl + ", " + filePath + ")");
			var opts = $.extend({async: true}, options);
			var dfd = $.Deferred();
			var fileName = "UNSPECIFIED.XML";	// 預設檔名變數, 這個WebMethod實際上不會用這個名稱當做檔名
			var _url = _profile["getPublicRsrc"].url;	// 預設網址跟共用範本一樣
			var envelope = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
								'<soap:Body>' +
									'<ModifyPrivateExample xmlns="T2100">' +
										'<argArtifact>' + window.theUserInfo.Artifact + '</argArtifact>' +
										// 1140521 Raymond 1140573 修正機關代碼、使用者ID等參數改用theSSO.User的欄位, 以免代理公文時用到被代理人的自訂範本
										//'<argOrgno>' + window.theUserInfo.OrgID + '</argOrgno>' +
										//'<argUserName>' + window.theUserInfo.UserID + '</argUserName>' +
										'<argOrgno>' + window.theSSO.User.orgid + '</argOrgno>' +
										'<argUserName>' + window.theSSO.User.account + '</argUserName>' +
										'<argMode>1</argMode>' +
										'<argXmliNFO>' + Base64.encode(sampleName) + '</argXmliNFO>' +
										'<argXmlid></argXmlid>' +
										'<argFilePath>' + filePath + '</argFilePath>' +
										'<argFileWebFileio>' + wfioUrl + '</argFileWebFileio>' +
										'<argClass>' + Base64.encode(sampleClass) + '</argClass>' +	// 1100917 Raymond 1080763 合併1070348, 新增argClass參數
									'</ModifyPrivateExample>' +
								'</soap:Body>' +
							'</soap:Envelope>\r\n';
			/*xmlParams += '--MIME_boundary\r\n' +
						'Content-Type: text/plain\r\n' +
						'Content-Transfer-Encoding: 7bit\r\n' +
						'Content-Id: ' + fileName + '\r\n\r\n' +
						'ABC\r\n' +
						'--MIME_boundary--';*/
			theLogger.debug(envelope);
			var xhr = new XMLHttpRequest();

			xhr.open("POST", _url, opts.async);
			
			// 若payload為XML文件, 則先轉為文字
			var payload = "", transcode = 0;
			if(data instanceof Document) {
				theLogger.warn("欲新增的範本資料是XML Document物件");
				payload = Util.getXml(data);	// 1060707 改叫Util.getXml()不要用WebFileIO的內部getXml函式, 因為新增範本功能必須跟著公文系統
				//payload = getXml(data);	// 2016.11.7 改叫內建getXml()不要用RD-Edit.js的Util.getXml()
				theLogger.debug(payload);
				transcode = 1;  // 轉成UTF-16的Binary格式
			}
			else if(typeof data === "object" && "xml" in data) {	// for IE-compatible, 2016.8.22 add typeof object
				payload = data.xml;
				theLogger.debug(payload);
				transcode = 1;  // 轉成UTF-16的Binary格式
			}
			else if(data instanceof ArrayBuffer) {
				payload = new Uint8Array(data);
				theLogger.debug(payload);
			}
			else
				payload = data;

			//Build the DIME message.
			var t_envelope = "http://schemas.xmlsoap.org/soap/envelope/";
			var t_payload = "Binary";
			var p1 = ((t_envelope.length % 4) == 0)?0:(4 - (t_envelope.length % 4));
			var p2 = ((envelope.length % 4) == 0)?0:(4 - (envelope.length % 4));
			var p3 = ((fileName.length % 4) == 0)?0:(4 - (fileName.length % 4));
			var p4 = ((t_payload.length % 4) == 0)?0:(4 - (t_payload.length % 4));
			var l_payload = (transcode == 0)?payload.length:(payload.length * 2 + 2);
			var p5 = ((l_payload % 4) == 0)?0:(4 - (l_payload % 4));
			var n = 12 + (t_envelope.length + p1) + (envelope.length + p2) + 12 + (fileName.length + p3) + (t_payload.length + p4) + (l_payload + p5);
			var a = new Uint8Array(n);
			a[0] = 12;                  // DIMEVersion + MB
			a[1] = 32;                  // URL
			a[2] = a[3] = 0;            // opt_len
			a[4] = a[5] = 0;            // id_len
			a[6] = 0;                   // type_len(hibyte)
			a[7] = t_envelope.length;   // type_len(lobyte)
			if((envelope.length >> 24) > 0)
				a[8] = (envelope.length >> 24);
			else
				a[8] = 0;
			if(((envelope.length >> 16) & 0xff) > 0)
				a[9] = ((envelope.length >> 16) & 0xff);
			else
				a[9] = 0;
			if(((envelope.length >> 8) & 0xff) > 0)
				a[10] = ((envelope.length >> 8) & 0xff);
			else
				a[10] = 0;
			a[11] = (envelope.length & 0xff);   // data_len
			var s = 12;
			for(var i=0; i<(t_envelope.length + p1); i++) {
				if(i < t_envelope.length)
					a[i + s] = t_envelope.charCodeAt(i);
				else
					a[i + s] = 0;
			}
			s += i;
			for(var i=0; i<(envelope.length + p2); i++) {
				if(i < envelope.length)
					a[i + s] = envelope.charCodeAt(i);  // envelope中的中文檔名及路徑已轉為utf-7, 所以直接填入array
				else
					a[i + s] = 0;
			}
			s += i;
			a[s] = 10;                  // DIMEVersion + ME
			a[s + 1] = 16;              // MIMEtype
			a[s + 2] = a[s + 3] = 0;    // opt_len
			a[s + 4] = 0;               // id_len(hibyte)
			a[s + 5] = fileName.length; // id_len(lobyte)
			a[s + 6] = 0;               // type_len(hibyte)
			a[s + 7] = t_payload.length;// type_len(lobyte)
			if((l_payload >> 24) > 0)
				a[s + 8] = (l_payload >> 24);
			else
				a[s + 8] = 0;
			if(((l_payload >> 16) & 0xff) > 0)
				a[s + 9] = ((l_payload >> 16) & 0xff);
			else
				a[s + 9] = 0;
			if(((l_payload >> 8) & 0xff) > 0)
				a[s + 10] = ((l_payload >> 8) & 0xff);
			else
				a[s + 10] = 0;
			a[s + 11] = (l_payload & 0xff);   // data_len
			s += 12;
			for(var i=0; i<(fileName.length + p3); i++) {
				if(i < fileName.length)
					a[i + s] = fileName.charCodeAt(i);
				else
					a[i + s] = 0;
			}
			s += i;
			for(var i=0; i<(t_payload.length + p4); i++) {
				if(i < t_payload.length)
					a[i + s] = t_payload.charCodeAt(i);
				else
					a[i + s] = 0;
			}
			s += i;
			// 編成UTF-16的Binary格式
			if(transcode == 1) {
				a[s] = 0xff;
				a[s + 1] = 0xfe;
				s += 2;
				for(var i=0; i<payload.length; i++) {
					a[s + (i * 2)] = (payload.charCodeAt(i) & 0xff);
					a[s + (i * 2) + 1] = ((payload.charCodeAt(i) >> 8) & 0xff);
				}
				s += (i * 2);
				for(var i=0; i<p5; i++)
					a[s + i] = 0;
			}
			else {
				if(payload instanceof Uint8Array) {	// 支援ArrayBuffer類型的data複製
					a.set(payload, s);
				}
				else {
					for(var i=0; i<(payload.length + p5); i++) {
						if(i < payload.length)
							a[i + s] = payload.charCodeAt(i);
						else
							a[i + s] = 0;
					}
				}
			}
			xhr.setRequestHeader("Content-Type", "application/dime");
			xhr.setRequestHeader("SOAPAction", "\"T2100/ModifyPrivateExample\"");
			//theLogger.debug(xhr);
			//theLogger.debug(a);
			xhr.onreadystatechange = function() {
				theLogger.debug("xhr.onreadystatechange: " + this.readyState);
				if(this.readyState == 4) {
					theLogger.debug(this.status + " " + this.statusText + ", " + (new Date() - t0) + "ms elapsed, " + this.responseText);
					t0 = new Date();
					//theLogger.debug(this.getAllResponseHeaders());
					
					function parseError(xml) {
						var $rst = $(xml.documentElement).find("ModifyPrivateExampleResult");
						if($rst.length) {
							var $isErr = $rst.find("IsErr");
							var $errMsg = $rst.find("ErrMsg");
							var $retValue = $rst.find("RetValue");
							if($isErr.text() == "true")
								return {
									isErr: $isErr.text() == "true",
									errMsg: $errMsg.text()
								};
							return {
								isErr: $isErr.text() == "true",
								retValue: $retValue.text()
							};
						}
						return {	// 回傳值無ModifyPrivateExampleResult節點?
							isErr: true,
							errMsg: "回傳值無ModifyPrivateExampleResult節點"
						};
					}
					
					if(this.status == 200){		//2017.3.6	Leslie	加上status==200判斷，以避免當回報為IIS錯誤時(http狀態碼非200)，程式無法正確處理其異常狀態
						var cntnType = this.getResponseHeader("Content-Type");
						if(cntnType != null && cntnType.match(/^text\/xml/)) {	//2017.2.16	Leslie	增加異常狀況的判斷，加上null判斷
							var ret = (new DOMParser()).parseFromString(this.responseText, "text/xml");
							theLogger.debug(ret);
							var err = parseError(ret);
							if(err.isErr) {
								theLogger.error(err);
								if(options && options.error)
									options.error(err.errMsg);
								dfd.reject(err.errMsg);
							}
							else {
								if(options && options.success)
									options.success(err.retValue);
								dfd.resolve(err.retValue);
							}
						}
						else {
							theLogger.error("不支援無法識別的Content-Type: '" + cntnType + "', responseText:");
							theLogger.log(this.responseText);
							if(options && options.error)
								options.error("不支援無法識別的Content-Type: '" + cntnType + "'");
							dfd.reject("新增上傳範本資料發生異常，錯誤訊息：不支援無法識別的Content-Type: '" + cntnType + "'");
						}
					}
					else{	//2017.3.6	Leslie	回報為IIS錯誤時(http狀態碼非200)，處理異常狀態
						theLogger.error("呼叫服務["+_url+"]時發生異常: HTTP STATUS=" + this.status + ", responseText:");
						theLogger.log(this.responseText);
						var errXml = (new DOMParser()).parseFromString(this.responseText, "text/xml");
						var err = $(errXml.documentElement).find("title");
						var errText = "";
						if(err.length)	//回報基本異常資訊
							errText = "新增上傳範本資料發生異常，錯誤訊息：" + err.text();
						else
							errText = "新增上傳範本資料發生異常，HTTP 狀態碼：" + this.status + "\r\n" + this.responseText;
						if(options && options.error)
							options.error(errText);
						dfd.reject(errText);
					}
				}
			}
			var t0 = new Date();
			xhr.send(a.buffer);
			
			return dfd.promise();
		},
		// 1100917 Raymond 1080763 合併1070348, 新增sampleClass參數
		// 1060707 Raymond 1060361 刪除個人自訂範本
		delPrivateExample: function(wfioUrl, dirPath, filePath, sampleId, sampleClass) {
			var dfd = $.Deferred();
			var params = new SOAPClientParameters();
			params.add("argArtifact", window.theUserInfo.Artifact);
			// 1140521 Raymond 1140573 修正機關代碼、使用者ID等參數改用theSSO.User的欄位, 以免代理公文時用到被代理人的自訂範本
			//params.add("argOrgno", window.theUserInfo.OrgID);
			//params.add("argUserName", window.theUserInfo.UserID);
			params.add("argOrgno", window.theSSO.User.orgid);
			params.add("argUserName", window.theSSO.User.account);
			params.add("argMode", "0");
			params.add("argXmliNFO", "");
			params.add("argXmlid", sampleId);
			params.add("argFilePath", dirPath);
			params.add("argFileWebFileio", wfioUrl);
			params.add("argClass", Base64.encode(sampleClass));	// 1100917 Raymond 1080763 合併1070348, 新增argClass參數
			SOAPClient.invoke(_profile["getPublicRsrc"].url, "ModifyPrivateExample", params, true, function(r) {
				theLogger.log("ModifyPrivateExample returns:");
				theLogger.log(r);
				if("IsErr" in r && r.IsErr == true)
					dfd.reject(r.ErrMsg);
				else
					dfd.resolve(sampleId, filePath);
			});
			return dfd.promise();
		},
		// 1100917 Raymond 1080763 合併1070348, 新增取得自訂範本類別清單
		getPrivateClass: function(options) {
			if(window.theUserInfo == undefined) {
				if(options && options.error)
					options.error("尚未取得使用者資訊");
				else
					throw new Error("尚未取得使用者資訊");
			}
			else if(_profile == undefined) {
				if(options && options.error)
					options.error("尚未載入Profile.xml");
				else
					throw new Error("尚未載入Profile.xml");
			}
			else if(_profile["getPublicRsrc"] == undefined) {
				if(options && options.error)
					options.error("Profile.xml未記錄getPublicRsrc函式的WebService網址");
				else
					throw new Error("Profile.xml未記錄getPublicRsrc函式的WebService網址");
			}
			else {
				var params = new SOAPClientParameters();
				// 1080110 Raymond 修正機關代碼、使用者ID等參數改用theSSO.User的欄位, 以免代理公文時用到被代理人的自訂範本
				//params.add("argSourceNo", window.theUserInfo.OrgID);
				//params.add("argUserName", window.theUserInfo.UserID);
				params.add("argSourceNo", window.theSSO.User.orgid);
				params.add("argUserName", window.theSSO.User.account);
				SOAPClient.invoke(_profile["getPublicRsrc"].url, "GetPrivateClass", params, true, function(r) {
					theLogger.log("GetPrivateClass returns:");
					theLogger.log(r);
					if($(r).attr("bSuccess") == "false") {
						if(options && options.error)
							options.error($(r).find("異常訊息").text());
						else
							throw new Error($(r).find("異常訊息").text());
					}
					else if(options && options.success) {
						var res = [];
						$(r).find("類別").each(function(i, nd) {
							res.push($(nd).text());
						});
						options.success(res);
					}
				});
			}
		},
		// 1121107 Raymond 1120941 合併1120627, 新增取得被裁併機關的資源管理檔
		getDissolveRsrc: function(dissolveOrgNo, options) {
			if(window.theUserInfo == undefined) {
				if(options && options.error)
					options.error("尚未取得使用者資訊");
				else
					throw new Error("尚未取得使用者資訊");
			}
			else if(_profile == undefined) {
				if(options && options.error)
					options.error("尚未載入Profile.xml");
				else
					throw new Error("尚未載入Profile.xml");
			}
			else if(_profile["getPublicRsrc"] == undefined) {
				if(options && options.error)
					options.error("Profile.xml未記錄getPublicRsrc函式的WebService網址");
				else
					throw new Error("Profile.xml未記錄getPublicRsrc函式的WebService網址");
			}
			else {
				var params = new SOAPClientParameters();
				params.add("Artifact", window.theUserInfo.Artifact);
				params.add("OrgID", dissolveOrgNo);
				params.add("Path4Profile", window.theUserInfo.Path4Profile);
				params.add("WSDL4Profile", window.theUserInfo.WSDL4Profile);
				SOAPClient.invoke(_profile["getPublicRsrc"].url, "getDissolveRsrc", params, true, function(r) {
					theLogger.log("getDissolveRsrc returns:");
					theLogger.log(r);
					if(r.tagName == "錯誤資訊") {
						if(options && options.error)
							options.error($(r).find("錯誤訊息").text());
						else
							throw new Error($(r).find("錯誤訊息").text());
					}
					else if(options && options.success)
						options.success(r);
				});
			}
		},
	};
	
	if(inst != undefined)
		inst.finish();
	
})();

function SOAPviaDIME() {
	//1110412	Leslie	改成可接受非同步回傳，以支援用FileAPI讀入Big5編碼的DI或TXT
	// function parseRetrieveFile(fileName, view, len, allowMSXML, translateExt) { // 2016.5.17 新增allowMSXML, 2016.6.27 新增translateExt
	function parseRetrieveFile(fileName, view, len, allowMSXML, translateExt, options) { // 2016.5.17 新增allowMSXML, 2016.6.27 新增translateExt
		var dot = fileName.lastIndexOf(".");
		var ext = (dot >= 0)?fileName.substr(dot):fileName.substr(fileName.length - 4);
		if($.isFunction(translateExt)) {
			var ext1 = translateExt(fileName);
			if(ext1 != null)
				ext = ext1;
		}
		theLogger.log("parseRetrieveFile('" + fileName + "', " + len + ")...dot:" + dot + ",ext:'" + ext + "'");
		var curr = view.tell(), i;
		// 1131325 Raymond jDataView.buffer更新後變ArrayBuffer, 不能直接用了, 要用Uint8Array轉接
		var u8a = new Uint8Array(view.buffer);
		if(ext.match(/.tif/i)) {
			var a = (typeof Uint8Array !== "undefined")?new Uint8Array(len):new Array(len);
			for(i=0; i<len; i++)
				// 1131325 Raymond jDataView.buffer更新後變ArrayBuffer, 不能直接用了, 要用Uint8Array轉接
				//a[i] = view.buffer.charCodeAt(curr + i);
				a[i] = u8a[curr + i];
			theLogger.log("副檔名為'tif', 以DataURL回傳");
			return "data:image/tif;base64," + Base64.encode(a);
		}
		else if(ext.match(/.png/i)) {
			var a = (typeof Uint8Array !== "undefined")?new Uint8Array(len):new Array(len);
			for(i=0; i<len; i++)
				// 1131325 Raymond jDataView.buffer更新後變ArrayBuffer, 不能直接用了, 要用Uint8Array轉接
				//a[i] = view.buffer.charCodeAt(curr + i);
				a[i] = u8a[curr + i];
			theLogger.log("副檔名為'png', 以DataURL回傳");
			return "data:image/png;base64," + Base64.encode(a);
		}
		else if(ext.match(/.jpg/i)) {
			var a = (typeof Uint8Array !== "undefined")?new Uint8Array(len):new Array(len);
			for(i=0; i<len; i++)
				// 1131325 Raymond jDataView.buffer更新後變ArrayBuffer, 不能直接用了, 要用Uint8Array轉接
				//a[i] = view.buffer.charCodeAt(curr + i);
				a[i] = u8a[curr + i];
			theLogger.log("副檔名為'jpg', 以DataURL回傳");
			return "data:image/jpg;base64," + Base64.encode(a);
		}
		else if(ext.match(/.bmp/i)) {
			var a = (typeof Uint8Array !== "undefined")?new Uint8Array(len):new Array(len);
			for(i=0; i<len; i++)
				// 1131325 Raymond jDataView.buffer更新後變ArrayBuffer, 不能直接用了, 要用Uint8Array轉接
				//a[i] = view.buffer.charCodeAt(curr + i);
				a[i] = u8a[curr + i];
			theLogger.log("副檔名為'bmp', 以DataURL回傳");
			return "data:image/bmp;base64," + Base64.encode(a);
		}
		else if(ext.match(/\.(x[ms]l|txt|json|di)/i)) { // 2018.1.18 - Eric, merge 1060406, add JSON as a string file (強制式浮水印設定檔), 1110328 Leslie[1100287]	Merge[1070359]新增支援DI副檔名(比照TXT回傳字串)
			var data_s = "", deBOM = false, bom = 0;
			var big5XML = false; // 2017.6.5 - Eric - 1060443
			var encoded = null;
			for(i=0; i<len; i++) {
				var c = view.getUint8();
				if(!deBOM) {
					if(c == 0xff || c == 0xfe) {
						bom = (c << 8) + view.getUint8();
						++i;
						deBOM = true;
						continue;
					}
					else if(c == 0xef) {
						var c2 = view.getUint8(),	// 1091202 Raymond bug-fix漏了「,」
							c3 = view.getUint8(),
							bom = (c << 16) + (c2 << 8) + c3;
						if(bom == 0xefbbbf) {
							i += 2;
							deBOM = true;
							continue;
						}
						else {
							view.seek(1);
							deBOM = true;
						}
					}
					else {
						// 偵測是不是無BOM的UTF-8
						if(String.fromCharCode(c) == "<") {
							var str = "";
							for(var j=0;;j++) {
								// 1131325 Raymond jDataView.buffer更新後變ArrayBuffer, 不能直接用了, 要用Uint8Array轉接
								//var c2 = view.buffer.charCodeAt(curr + j);
								var c2 = u8a[curr + j];
								str += String.fromCharCode(c2);
								if(String.fromCharCode(c2) == ">")
									break;
							}
							//theLogger.log(str);
							if(str.search(/encoding=/) > 0) {
								/* 1091202 Raymond 1090884 iPad(iOS 13)目前發現多次開啟公文後, RegExp.$1會變空白, 改用別的方法偵測編碼
								/encoding=["']([a-zA-Z0-9\-]*)["']/.exec(str);
								//theLogger.log("encoding='" + RegExp.$1 + "'");
								if(typeof RegExp.$1 === "string" && RegExp.$1.match(/utf-8/i)) {
									theLogger.log("此檔案為UTF-8 w/o BOM");
									bom = 0xefbbbf;
								}
								else if (typeof RegExp.$1 === 'string' && RegExp.$1.match(/Big5/i)) { // 2017.6.5 - 偵測Big5編碼之XML
									theLogger.log("此檔案為Big5編碼");
									big5XML = true;
									encoded = new Uint8Array(len);
								}*/
								var p0 = str.indexOf("encoding=");
								var q = str[p0 + 9];
								var str1 = str.substring(p0 + 10);
								var p1 = str1.indexOf(q);
								var enc = str1.substring(0, p1);
								if(enc.match(/utf-8/i)) {
									theLogger.log("此檔案為UTF-8 w/o BOM");
									bom = 0xefbbbf;
								}
								else if (enc.match(/Big5/i)) { // 2017.6.5 - 偵測Big5編碼之XML
									theLogger.log("此檔案為Big5編碼");
									big5XML = true;
									encoded = new Uint8Array(len);
								}
								else
									theLogger.error("無法識別的編碼(" + enc + ")!");
							}
							else {  // 2013.12 - Raymond, 未宣告encoding屬性之XML一律以UTF-8視之
								theLogger.log("此檔案未宣告encoding屬性,以UTF-8編碼處理");
								bom = 0xefbbbf;
							}
						}
						else if(ext.match(/\.json/i)) {	// 1140304 Raymond 1131303 新增判斷無BOM的JSON檔, 預設以UTF-8編碼處理
							theLogger.log("此JSON檔未含BOM, 預設以UTF-8編碼處理");
							bom = 0xefbbbf;
						}
						else	// 1091202 Raymond 1090884 例外情況增加說明
							theLogger.error("無BOM的XML第1個字元'" + String.fromCharCode(c) + "'(" + c + ")不是'<'?");
						deBOM = true;
					}
				}
				if(deBOM) {
					if(bom == 0xfffe) { // UTF-16 LE
						data_s += String.fromCharCode((view.getUint8() << 8) + c);
						++i;
					}
					else if(bom == 0xfeff) {    // UTF-16 BE
						data_s += String.fromCharCode((c << 8) + view.getUint8());
						++i;
					}
					else if(bom == 0xefbbbf) {  // UTF-8
						/* 1060802 Raymond 修正有4-Bytes UTF-8編碼時無法轉為正常的surrogate pair UCS-2字串問題
						if (c < 128) {
							data_s += String.fromCharCode(c);
						}
						else if((c > 191) && (c < 224)) {
							var c2 = view.getUint8();
							data_s += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
							++i;
						}
						else {
							var c2 = view.getUint8();
							var c3 = view.getUint8();
							data_s += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
							i += 2;
						}*/
						if (c <= 0x7f) {                     
							data_s += String.fromCharCode(c);
						}
						else if (c >= 0xc0) {									// Mutlibytes
							var code;
							if (c < 0xe0) {										// 2 bytes
								var c2 = view.getUint8();
								code = ((c & 0x1f) << 6) | (c2 & 0x3f);
								++i;
							}
							else if (c < 0xf0) {							// 3 bytes
								var c2 = view.getUint8();
								var c3 = view.getUint8();
								code = ((c & 0x0f) << 12) | ((c2 & 0x3f) << 6) | (c3 & 0x3f);
								i += 2;
							}
							else {												// 4 bytes
								var c2 = view.getUint8();
								var c3 = view.getUint8();
								var c4 = view.getUint8();
								// turned into two characters in JS as surrogate pair
								code = (((c & 0x07) << 18) |
										((c2 & 0x3f) << 12) |
										((c3 & 0x3f) << 6) |                                  
										 (c4 & 0x3f)) - 0x10000;
								// High surrogate
								data_s += String.fromCharCode(((code & 0xffc00) >>> 10) + 0xd800);
								// Low surrogate
								code = (code & 0x3ff) + 0xdc00;
								i += 3;
							}
							data_s += String.fromCharCode(code);
						} // Otherwise it's an invalid UTF-8, skipped.
						else {
							theLogger.error("不合法的UTF-8編碼'" + c + "'(LeadByte)");
						}
					}
					else { // 2017.6.5 - 1060443, 封裝檔使用Big5編碼問題.
						if (big5XML) {
							 encoded[i] = c;
						}
						else {
							data_s += String.fromCharCode(c);
						}
					}
				}
			}
			view.seek(curr);    // 回復原位
			// 1140613 Raymond 1140166 合併1130291, 新增支援.DI副檔名
			//if(ext.match(/\.x[ms]l/i)) {
			if(ext.match(/\.x[ms]l|.di/i)) {
				// 2016.5.17 for IE10+

				// 2017.6.5 - support Big5 encoded XML
				if (big5XML && encoded.length) {
					// 2017.6.5 - 1060443
					var file = new Blob([encoded]);
					file.lastModifiedDate = new Date();
					file.name = fileName;
					// 1140724 Raymond 內政部序162 修正下載Big5編碼的資源檔(ex.內政部版的匯出交換表.xsl、99匯出交換表.xsl)會回傳字串而不是document, 導致另存DI功能異常的問題
					if(!allowMSXML)
						return { 'big5XML': true, 'file': file};
					//1140425	Leslie[1140706]	消防署急單，修改可下載並開啟一代Big5編碼文稿(tc)
					//return { 'big5XML': true, 'file': file};
					var file = new Blob([encoded]);
					file.name = fileName;
					var rdr = new FileReader();
					rdr.onload = function() {
						theLogger.log(this.result);
						theLogger.log(SSOUtil.typeOf(this.result));
						if(SSOUtil.typeOf(this.result) == "string") {
							if(options && options.done){
								if(allowMSXML){
									var res = (new DOMParser()).parseFromString(this.result, "text/xml");
									if(res.documentElement.nodeName == "parsererror") {	// FireFox用這種方式回傳錯誤
										theLogger.error(res.documentElement.firstChild.textContent);
										throw new Error("載入'" + fileName + "'失敗!" + res.documentElement.firstChild.textContent);	// 2017.3.10 丟出Exception
									}
									else if(res.documentElement.nodeName == "html" &&
											res.documentElement.firstChild.nodeName == "body" &&
											res.documentElement.firstChild.firstChild.nodeName == "parsererror") {	// Big5編碼變亂碼, Chrome會產生<html><body><parsererror>
										theLogger.error(res.documentElement.firstChild.firstChild.textContent);
										throw new Error("載入'" + fileName + "'失敗!" + res.documentElement.firstChild.firstChild.textContent);	// 2017.3.10 丟出Exception
									}
									options.done(res);
								}
								else
									options.done(this.result);
							}
						}
						else
							theLogger.error("檔案讀取後不是字串!!");
					}
					theLogger.log("以Big5編碼重新載入'" + fileName + "'");
					rdr.readAsText(file, "Big5");
					return rdr.onload;
				}
				else if(navigator.userAgent.match(/Trident/) && allowMSXML) {
					theLogger.log("(IE)副檔名為xml/xsl, 以MSXML物件回傳");
					var dom = new ActiveXObject("MSXML2.DOMDocument");
					dom.resolveExternals = false;	// 2016.12.30 fix
					dom.validateOnParse = false;	// 2016.12.30 fix
					dom.preserveWhiteSpace = true;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題

					var	b = dom.loadXML(data_s);
					if(!b) {
						var pe = dom.parseError;
						theLogger.error("(IE)載入XML失敗!" + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);	// 2016.12.30 fix
						throw new Error("載入'" + fileName + "'失敗!" + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);	// 2017.3.10 丟出Exception
					}
					return dom;
				}
				else {
					theLogger.log("副檔名為xml/xsl, 以DOM物件回傳");
					var res = (new DOMParser()).parseFromString(data_s, "text/xml");
					if(res.documentElement.nodeName == "parsererror") {	// FireFox用這種方式回傳錯誤
						theLogger.error(res.documentElement.firstChild.textContent);
						throw new Error("載入'" + fileName + "'失敗!" + res.documentElement.firstChild.textContent);	// 2017.3.10 丟出Exception
					}
					else if(res.documentElement.nodeName == "html" &&
							res.documentElement.firstChild.nodeName == "body" &&
							res.documentElement.firstChild.firstChild.nodeName == "parsererror") {	// Big5編碼變亂碼, Chrome會產生<html><body><parsererror>
						theLogger.error(res.documentElement.firstChild.firstChild.textContent);
						throw new Error("載入'" + fileName + "'失敗!" + res.documentElement.firstChild.firstChild.textContent);	// 2017.3.10 丟出Exception
					}
					return res;
				}
			}
			else {	// .txt
				theLogger.log("副檔名不是xml/xsl, 以字串回傳");
				//1110412	Leslie	改成可接受非同步回傳，以支援用FileAPI讀入Big5編碼的DI或TXT
				if(big5XML && data_s == "" && encoded.length){
					var file = new Blob([encoded]);
					file.name = fileName;
					var rdr = new FileReader();
					rdr.onload = function() {
						theLogger.log(this.result);
						theLogger.log(SSOUtil.typeOf(this.result));
						if(SSOUtil.typeOf(this.result) == "string") {
							if(options && options.done)
								options.done(this.result);
						}
						else
							theLogger.error("檔案讀取後不是字串!!");
					}
					theLogger.log("以Big5編碼重新載入'" + fileName + "'");
					rdr.readAsText(file, "Big5");
					return rdr.onload;
				}
				//theLogger.log(data_s);
				return data_s;
			}
		}
		else {  // 未知的副檔名
			var a = (typeof Uint8Array !== "undefined")?new Uint8Array(len):new Array(len);
			for(i=0; i<len; i++)
				// 1131325 Raymond jDataView.buffer更新後變ArrayBuffer, 不能直接用了, 要用Uint8Array轉接
				//a[i] = view.buffer.charCodeAt(curr + i);
				a[i] = u8a[curr + i];
			if(typeof Blob !== "undefined") {
				theLogger.warn("未知的副檔名, 以Blob物件回傳");
				return new Blob(a);
			}
			else {
				theLogger.warn("未知的副檔名, 以Typed Array/Array回傳");
				return a;
			}
		}
	}
	
	function parseDIME(data, method, options) {
		//Leslie Test
		//var view = new jDataView(data, 0, undefined, false);
		var view = getPrefilledJDataView(data);
		//theLogger.log("parseDIME... (byteLength:" + view.byteLength + ")");
		var res = new Array(), idx = 0, len = view.byteLength, fil,
			h0, h1, s1, s2, s3, s0p, s1p, s2p, s3p, opt_s, id_s, type_s;
		//view.seek(0);
		var errorRaised = false;	// 2017.3.15 新增解析過程中是否發生過錯誤旗標
		while(view.tell() < len) {
			++idx;
			//theLogger.debug("DIME" + idx + ": (" + view.tell() + "/" + len + ")");
			h0 = view.getUint8();
			h1 = view.getUint8() / 16;
			s0 = view.getUint16();
			s1 = view.getUint16();
			s2 = view.getUint16();
			s3 = view.getUint32();
			s0p = s0 + ((s0 % 4)?(4 - (s0 % 4)):0);
			s1p = s1 + ((s1 % 4)?(4 - (s1 % 4)):0);
			s2p = s2 + ((s2 % 4)?(4 - (s2 % 4)):0);
			s3p = s3 + ((s3 % 4)?(4 - (s3 % 4)):0);
			/*theLogger.debug("\th0:" + h0 + ", h1:" + h1 + "(" + ((h1 == 2)?"URL":((h1 == 1)?"MIME Type":"Unknown")) + ")\r\n\
\topt_len:" + s0 + "(" + s0p + ")\r\n\
\tid_len:" + s1 + "(" + s1p + ")\r\n\
\ttype_len:" + s2 + "(" + s2p + ")\r\n\
\tdata_len:" + s3 + "(" + s3p + ")");*/
			opt_s = view.getString(s0);
			//theLogger.debug("\topt: " + opt_s);
			if(s0 != s0p)
				view.seek(view.tell() + 4 - (s0 % 4));  // padding
			id_s = view.getString(s1);
			//theLogger.debug("\tid: " + id_s + " (" + Utf7.decode(id_s) + ")");
			if(s1 != s1p)
				view.seek(view.tell() + 4 - (s1 % 4));  // padding
			type_s = view.getString(s2);
			//theLogger.debug("\ttype: " + type_s);
			if(s2 != s2p)
				view.seek(view.tell() + 4 - (s2 % 4));  // padding
			if(h1 == 2) {   // SOAP Response (XML格式)
				var data_s = view.getString(s3);
			  
				var soapMsg = (new DOMParser()).parseFromString(data_s, "text/xml");
				//theLogger.debug(soapMsg);
				var r = soapMsg.getElementsByTagName(method + "Result");
				if(r.length != 1) {
					theLogger.warn("找不到<" + method + "Result>, 可能不是合法的SOAP Message!");
					if(options && options.error)
						options.error("找不到<" + method + "Result>, 可能不是合法的SOAP Message");
					else
						break;
				}
				if(options && options.onSoapMsg) {
					var f = options.onSoapMsg(r[0], soapMsg, id_s);
					if(f === false) {
						theLogger.warn("onSoapMsg() returns false, break while-loop!");
						break;
					}
				}
				else if(id_s.length)
					res[id_s] = soapMsg;
				else
					res.push(soapMsg);
			  
				if(s3 != s3p)
					view.seek(view.tell() + 4 - (s3 % 4));
			}
			else if(h1 == 1) {  // 下載的檔案 (Binary格式)
				if(options && options.getFileName) {        // 由client提供檔名
					var fn = options.getFileName(idx - 2);  // 解析SoapMsg時, idx是1, 第1個File時, idx是2
					if(fn === false) {
						theLogger.warn("getFileName(" + (idx - 2) + ") returns false, break while-loop!");
						break;
					}
					
					if(options.keepRawData) {	// 2016.7.13 保持原資料格式以Typed Array/Array回傳
						fil = (typeof Uint8Array !== "undefined")?new Uint8Array(s3):new Array(s3);
						var curr = view.tell();
						// 1131325 Raymond jDataView.buffer更新後變ArrayBuffer, 不能直接用了, 要用Uint8Array轉接
						var u8a = new Uint8Array(view.buffer);
						for(var i=0; i<s3; i++)
							// 1131325 Raymond jDataView.buffer更新後變ArrayBuffer, 不能直接用了, 要用Uint8Array轉接
							//fil[i] = view.buffer.charCodeAt(curr + i);
							fil[i] = u8a[curr + i];
					}
					else {
						try {	// 2017.3.10 改成try-catch
							fil = parseRetrieveFile(fn, view, s3, options.allowMSXML, options.translateExt);	// 2016.5.17 新增allowMSXML, 2016.6.27 新增translateExt
						}
						catch(e) {
							if(options.error) {	// 載入XML失敗會丟出Error, 在這裡接並回呼錯誤處理callback
								options.error(e.message);
								errorRaised = true;	// 2017.3.15 發生過錯誤
							}
							break;
						}
					}
					
					if(options && options.onRetrieveFile)
						options.onRetrieveFile(fil, fn);
					else
						res[fn] = fil;
				}
				else if(id_s.length) {      // 由DIME ID決定檔名
					if(options.keepRawData) {	// 2016.7.13 保持原資料格式以Typed Array/Array回傳
						fil = (typeof Uint8Array !== "undefined")?new Uint8Array(s3):new Array(s3);
						var curr = view.tell();
						// 1131325 Raymond jDataView.buffer更新後變ArrayBuffer, 不能直接用了, 要用Uint8Array轉接
						var u8a = new Uint8Array(view.buffer);
						for(var i=0; i<s3; i++)
							// 1131325 Raymond jDataView.buffer更新後變ArrayBuffer, 不能直接用了, 要用Uint8Array轉接
							//fil[i] = view.buffer.charCodeAt(curr + i);
							fil[i] = u8a[curr + i];
					}
					else {
						try {	// 2017.3.10 改成try-catch
							//1110412	Leslie	改成可接受非同步回傳，以支援用FileAPI讀入Big5編碼的DI或TXT
							//fil = parseRetrieveFile(Utf7.decode(id_s), view, s3, options.allowMSXML, options.translateExt);	// 2016.5.17 新增allowMSXML, 2016.6.27 新增translateExt
							fil = parseRetrieveFile(Utf7.decode(id_s), view, s3, options.allowMSXML, options.translateExt, {done:function(rdFil){
								res[id_s] = rdFil;
								if(!errorRaised && options && options.success)	// 2017.3.15 未發生過錯誤才呼叫success
									options.success(rdFil, res);
							}});	
						}
						catch(e) {
							if(options.error) {	// 載入XML失敗會丟出Error, 在這裡接並回呼錯誤處理callback
								options.error(e.message);
								errorRaised = true;	// 2017.3.15 發生過錯誤
							}
							break;
						}
					}
					
					if(options && options.onRetrieveFile)
						options.onRetrieveFile(fil, id_s);
					else
						res[id_s] = fil;
				}
				else {  // 未命名檔案(無DIME ID)
					var a = (typeof Uint8Array !== "undefined")?new Uint8Array(s3):new Array(s3);
					var curr = view.tell();
					// 1131325 Raymond jDataView.buffer更新後變ArrayBuffer, 不能直接用了, 要用Uint8Array轉接
					var u8a = new Uint8Array(view.buffer);
					for(var i=0; i<s3; i++)
						// 1131325 Raymond jDataView.buffer更新後變ArrayBuffer, 不能直接用了, 要用Uint8Array轉接
						//a[i] = view.buffer.charCodeAt(curr + i);
						a[i] = u8a[curr + i];
					if(options.keepRawData)	// 2016.7.13 保持原資料格式以Typed Array/Array回傳
						fil = a;
					else
						fil = (typeof Blob !== "undefined")?new Blob(a):a;
					if(options && options.onRetrieveFile)
						options.onRetrieveFile(fil);
					else
						res.push(fil);
				}
				view.seek(view.tell() + s3p);
			}
			else {
				theLogger.warn("\t無法解析未知的DIME格式!");
				if(options && options.error)
					options.error("無法解析未知的DIME格式(" + h1 + ")");
				if(view.tell() + s3p >= len)
					options.error("位移量(" + s3p + ")超出資料長度");
				else
					view.seek(view.tell() + s3p);
			}
		}   // end of while-loop

		//1110412	Leslie	改成可接受非同步回傳，以支援用FileAPI讀入Big5編碼的DI或TXT
		if(typeof fil != "function")
		if(!errorRaised && options && options.success)	// 2017.3.15 未發生過錯誤才呼叫success
			options.success(fil, res);
	}
	
	this.invoke = function(url, method, options) {
		theLogger.log("SOAPviaDIME.invoke(url:'" + url + "', method:'" + method + ", options:" + [options] + ")");

		// 2019.8.30 - 1080654 Eric, performance log
		let _tmBeginDownload = 0;
		if ('_act' in options && options._act=='download' && '_FilePath' in options && '_FileName' in options) {
			_tmBeginDownload = Date.now();
			theLogger.time(SSOUtil.dev_getCurrentTimeStr() + '-tm- WebFileIO.download() BEGIN... [FilePath='+ options._FilePath +', FileName=' + options._FileName +']');
		}

		//var xmlParams = (new DOMParser()).parseFromString('<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><' + method + ' xmlns="http://tempuri.org"></' + method + '></soap:Body></soap:Envelope>', 'text/xml');
		var ns = (options && options.getNameSpace)?options.getNameSpace():'http://tempuri.org/';
		var xmlParams = '<?xml version="1.0" encoding="utf-8"?>' +
						'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
							'<soap:Body>' +
								'<' + method + ' xmlns="' + ns + '">';
		if(options && options.getParams)
			xmlParams += options.getParams();
		xmlParams +=            '</' + method + '>' +
							'</soap:Body>' +
						'</soap:Envelope>';
		//theLogger.log("params:");
		//theLogger.log(xmlParams);
		
		var t0 = new Date(), that = this;
		$.ajax(url, {
			type: "POST",
			data: xmlParams,
			dataType: "text",
			async: (options.async === false)? false : true,
			cache: false,
			headers: {
				"Cache-Control": "no-cache",
				"Content-Type": "text/xml; charset=utf-8",
				"SOAPAction": '"' + ns + ((ns[ns.length-1]!='/')?'/':'') + method + '"'
			},
			//1120331	Leslie[1111455]	叫用WebFileIO增加帶上Cookie
			xhrFields: {withCredentials: true},
			beforeSend: function(jqXHR, settings) {
				//settings.crossDomain = true;
				//theLogger.debug(settings);
				//jqXHR.overrideMimeType('text/plain; charset=x-user-defined');
				jqXHR.overrideMimeType('application/dime; charset=x-user-defined');
			},
			success: function(data, statusText, jqXHR) {
				theLogger.log("success! " + (new Date() - t0) + "ms elapsed");
				t0 = new Date();
				//theLogger.debug(jqXHR.getAllResponseHeaders());
				
				// 2019.8.30 - 1080654 Eric, performance log
				// options有_FilePath, _FileName, _act:'download'
				if (!!_tmBeginDownload) {
					//'_act' in options && options._act=='download' && _FilePath in options && _FileName in options) {
					let _log = SSOUtil.dev_getTimeElapseStr('WebFileIO.download() [FilenPath='+options._FilePath+' ,FileName='+options._FileName+']', _tmBeginDownload);
                    theLogger.time(_log);
				}

				function parseError(data, utf8encoded) {
					var errXml = (new DOMParser()).parseFromString((utf8encoded)?that.utf8.decode(data):data, "text/xml"), err;
					//theLogger.debug(errXml);
					try {	// 2016.3.28 解析ERR可能遇到一般Result, 用try-catch處理
						/* 2016.10.27 FIX for Err物件的階層可能有變動, 改用jQuery.find()找Err物件
						err = errXml.documentElement.childNodes[1].childNodes[0].childNodes[0].childNodes[0];
						err = {
							errIdx: err.childNodes[0].textContent,
							errNo: err.childNodes[1].textContent,
							errMsg: err.childNodes[2].textContent
						}*/
						//1140723	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]，改用原生指令取得內容
						// err = $(errXml.documentElement).find("Err");
						err = errXml.querySelectorAll('Err');
						if(err.length) {
							err = {
								// errIdx: err.find("ErrIdx").text(),
								// errNo: err.find("ErrNo").text(),
								// errMsg: err.find("ErrMsg").text()
								errIdx: err[0].querySelector('ErrIdx').textContent,
								errNo: err[0].querySelector('ErrNo').textContent,
								errMsg: err[0].querySelector('ErrMsg').textContent
							}
						}
					}
					catch(e) {
						theLogger.error("解析ERR失敗! dump:");
						theLogger.error(errXml);
						err = {errIdx: 0, errNo:-999, errMsg: "解析ERR失敗!(" + e.message + ")"};
					}
					return err;
				}
				
				var cntnType = jqXHR.getResponseHeader("Content-Type");
				if(cntnType != null && cntnType.match(/^text\/xml/)) {		//2017.2.16	Leslie	增加異常狀況的判斷，加上null判斷
					if(cntnType.search(/charset=/) > 0) {
						/charset=([a-zA-Z0-9\-]*)/.exec(cntnType);
						//theLogger.debug(RegExp.$1);
						var err = parseError(data, RegExp.$1 == "utf-8");
						theLogger.error(err);
						if(options && options.error)
							options.error(err.errNo + ": " + err.errMsg);
					}
					else {	// 文字?
						theLogger.log(data);
						if(options && options.error)
							options.error(data);
					}
				}
				else if(cntnType != null && cntnType.match(/application\/dime/)) {		//2017.2.16	Leslie	增加異常狀況的判斷，加上null判斷
					if(data.match(/^<\?xml /)) {    // 2013/5/17 - Raymond, WebFileIO回應錯誤時, Chrome接到的Content-Type仍是"application\dime", 故需要先判斷是不是XML, 是的話, 表示是錯誤資訊, 而不是DIME格式
						if(data.search(/encoding=/) > 0) {
							/encoding=['"]([a-zA-Z0-9\-]*)['"]/.exec(data);
							theLogger.debug(RegExp.$1);
							var err = parseError(data, RegExp.$1 == "utf-8");
							theLogger.error(err);
							if(options && options.error)
								options.error(err.errNo + ": " + err.errMsg);
						}
						else {	// 文字?
							theLogger.log(data);
							if(options && options.error)
								options.error(data);
						}
					}
					else {
						parseDIME(data, method, options);
						theLogger.debug("finish parsing dime! " + (new Date() - t0) + "ms elapsed");
					}
				}
				else {
					theLogger.error("不支援無法識別的Content-Type: '" + cntnType + "', data:");
					theLogger.log(data);
					if(options && options.error)
						options.error("不支援無法識別的Content-Type: '" + cntnType + "'");
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				// 1130809 Raymond 1130313 合併1111007, 修正ajax的errorThrown只是string
				//theLogger.error("SOAPviaDIME.invoke('" + url + "/" + method + ") Error! " + textStatus + ", " + errorThrown.message);
				//theLogger.error(errorThrown);
				theLogger.error("SOAPviaDIME.invoke('" + url + "/" + method + ") Error! " + textStatus + ", " + errorThrown);
				if(!!options)
					theLogger.error(textStatus + " - " + options._act + " " + options._FilePath + " " + options._FileName + " " + errorThrown);	// 改成記錄options物件
				if(options && options.error)
					// 1130116 Leslie[1130033] 將errorThrown往外丟，顯示予使用者
					// options.error(errorThrown.message);	// 2016.10.26 FIX for errorStatus
					options.error(errorThrown.message, errorThrown);	// 2016.10.26 FIX for errorStatus
			}
		});
	}
	
	this.utf8 = {  
		encode : function (string) {  
			string = string.replace(/\r\n/g,"\n");  
			var utftext = "";  
			
			for (var n=0, k=string.length; n < k; n++) {  
				var c = string.charCodeAt(n);  
			
				if (c < 128) {  
					utftext += String.fromCharCode(c);  
				}  
				else if((c > 127) && (c < 2048)) {  
					utftext += String.fromCharCode((c >> 6) | 192);  
					utftext += String.fromCharCode((c & 63) | 128);  
				}  
				else {  
					utftext += String.fromCharCode((c >> 12) | 224);  
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);  
					utftext += String.fromCharCode((c & 63) | 128);  
				}  
			}  
			return utftext;  
		},  
		decode : function (utftext) {  
			var string = "";  
			var i = 0;  
			var c = c1 = c2 = 0;  
			
			while ( i < utftext.length ) {  
				c = utftext.charCodeAt(i);  
				if (c < 128) {  
					string += String.fromCharCode(c);  
					i++;  
				}  
				else if((c > 191) && (c < 224)) {  
					c2 = utftext.charCodeAt(i+1);  
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));  
					i += 2;  
				}  
				else {  
					c2 = utftext.charCodeAt(i+1);  
					c3 = utftext.charCodeAt(i+2);  
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));  
					i += 3;  
				}  
			}  
			return string;  
		}  
	}
}

function WebFileIO(url, userId, artifact) {
	// 2015.3.16 - 因應檔案伺服器可能與AP不同一台, 恢復直接以傳入的URL當作連線網址
	var _url = url;//.replace(/^http[s]*:\/\/[a-zA-Z0-9\.]*\//, theWebServices.host + "/");  // [暫時]強制轉為deva的IP, 以避免iPad找不到, 正式版應移除
	//alert(_url);
	var _userId = (userId != undefined)?userId:theSSO.User.account;	// 2015.12.16 FIX
	var _artifact = (artifact != undefined)?artifact:localStorage['Artifact'];	// 2015.12.16 FIX
	
	var _base = this;
	
	// 2016.11.7 從RD-Edit.js複製過來, 因為有單獨要incluce RD-WebServices.js但不要RD-Edit.js的需求
	// 單獨include此js還需要額外include: escapeXml.js、Utf7.js、Base64.js、RD-jdataview.js、RD-soapclient.js
	function getXml(elem, childOnly, encoding) {	// 2016.8.29 新增encoding參數, 宣告用, 回傳字串仍是JavaScript的string(UTF-16)
		function doGetXml(elem, inds, noWrap) {
			//theLogger.log(elem.tagName + "(" + elem.nodeType + ")");
			if(elem.nodeType == 1) {
				var res = "";
				for(var i=0; i<inds; i++)
					res += "\t";
				res += "<" + elem.tagName;
				for(var i=0; i<elem.attributes.length; i++) {
					// 1111201 Raymond 1110867 合併1110905, 修正若上傳HTML檔要轉ODT時, 因目前瀏覽器會把CSS樣式page-break-inside轉為break-inside, 但ODT又只認得將被廢止的page-break-inside, 所以在轉字串時找style屬性中的break-inside置換成舊的page-break-inside
					if(elem.attributes[i].nodeName == "style") {
						if(elem.attributes[i].nodeValue.match(/ break-inside:/))
							elem.attributes[i].nodeValue = elem.attributes[i].nodeValue.replace(/ break-inside:/, " page-break-inside:");
					}
					res += " " + elem.attributes[i].nodeName + "=\'" + escapeXml(elem.attributes[i].nodeValue) + "\'";	// 2015.12.15 屬性內容要escape XML的保留字
				}
				if(elem.childNodes.length > 0) {
					if(elem.childNodes.length == 1 && elem.childNodes[0].nodeType == 3) {
						res += ">" + escapeXml(elem.childNodes[0].nodeValue) + "</" + elem.tagName + ">";	// 2015.12.15 屬性內容要escape XML的保留字
						//if(!noWrap)	// 2017.2.9 搬到最後面才判斷加斷行字元
						//	res += "\r\n";
					}
					else {
						res += ">";
						
						// 判斷childNodes是否有不是空白的text node, 若有的話, 不要格式化
						var formatting = true;
						for(var i=0; i<elem.childNodes.length; i++) {
							if(elem.childNodes[i].nodeType == 3) {
								var t = elem.childNodes[i].nodeValue;
								if(t.trim().length > 0) {
									formatting = false;
									break;
								}
							}	// 2017.2.9 新增判斷childNodes若有追蹤修訂或樣式標籤則不要格式化, 以免轉成完稿XML時, 會變成一整排直排的單字
							else if(elem.childNodes[i].nodeType == 1 && (elem.childNodes[i].nodeName == "mi" || elem.childNodes[i].nodeName == "fmt")) {
								formatting = false;
								break;
							}
						}
						if(formatting)
							res += "\r\n";
						for(var i=0; i<elem.childNodes.length; i++) {
							res += arguments.callee(elem.childNodes[i], (formatting)?inds + 1:0, !formatting);
						}
						if(formatting) {
							for(var i=0; i<inds; i++)
								res += "\t";
						}
						//res += "</" + elem.tagName + ">\r\n";	// 2017.2.9 搬到最後面才判斷加斷行字元
						res += "</" + elem.tagName + ">";
					}
				}
				else {
					//res += "/>\r\n";	// 2017.2.9 搬到最後面才判斷加斷行字元
					res += "/>";
				}
				if(!noWrap)	// 2017.2.9 最後才判斷加斷行字元
					res += "\r\n";
				return res;
			}
			else if(elem.nodeType == 3) {   // Text
				var t = elem.nodeValue;
				if(t.trim().length > 0)
					return escapeXml(elem.nodeValue);	// 2015.12.15 屬性內容要escape XML的保留字
			}
			else if(elem.nodeType == 9) {   // Document
				// TODO: dtd?
				var res = "";
				//for(var i=0; i<inds; i++)
				//    res += "\t";
				if(typeof encoding === "string")	// 2016.8.29 用傳入的參數取代encoding宣告
					res += '<?xml version="1.0" encoding="' + encoding + '"?>\r\n';
				else if(elem.documentElement.nodeName.toUpperCase() != "HTML")	// 1111201 Raymond 1110867 合併1110905, 上傳HTML檔時不要加XML宣告
					res += '<?xml version="1.0" encoding="UTF-16"?>\r\n';
				res += arguments.callee(elem.documentElement, 0);
				return res;
			}
			return "";
		}
		if(childOnly == true) {
			var res = "";
			for(var i=0; i<elem.childNodes.length; i++) {
				res += doGetXml(elem.childNodes[i], 0);
			}
			return res;
		}
		return doGetXml(elem, 0);
	}
	
	return {
		download: function(filePath, fileName, options) {
			theLogger.log("download(" + filePath + ", " + fileName + ")");
			_base.invoke(_url, "WebFileIO", $.extend({
				getNameSpace: function() {
					return "http://2100T.com.tw";
				},
				getParams: function() {
					return '<argArtifact>' + _artifact + '</argArtifact>' +
							'<argType>2</argType>' +
							'<argFileCollection><argFile>' +
								'<FilePath>' + Utf7.encode(filePath) + '</FilePath>' +
								'<FileName>' + Utf7.encode(fileName) + '</FileName>' +
							'</argFile></argFileCollection>' +
							'<argDeleteSource>0</argDeleteSource>';
				},
				//onSoapMsg: function(res, xml, id) {},
				//onRetrieveFile: function(fil, fn) {},
				success: function(fil, all) {
					if(options.success)
						options.success(fil, all);
				},
				error: function(errorText) {
					theLogger.error("download(" + filePath + ", " + fileName + ") Error! " + errorText);
					if(options.error)	// 2015.6.10 修正下載失敗不會呼叫callback
						options.error(errorText);
					else
						alert(errorText);
				},
				// 2019.8.30 - 1080654 Eric, performance log
				_FilePath: filePath,
				_FileName: fileName,
				_act: 'download'
			}, options));
		},
		upload: function(filePath, fileName, data, options) {
			theLogger.log("upload(" + filePath + ", " + fileName + ")");

			// 2019.8.30 - 1080654 Eric, add log for performance tracing
			let _tmBeginUpload = 0;
			if (SSO_CONFIG.debugTime) {
				_tmBeginUpload = Date.now();
				theLogger.time(SSOUtil.dev_getCurrentTimeStr() + '-tm- WebFileIO.upload() BEGIN... [FilePath='+ filePath +', FileName=' + fileName +']');
			}

			var opts = $.extend({async: true}, options);
			// 1140425 Raymond 北榮版更後問題序79 上傳PNG影像檔後再下載一次與原上傳資料比對是否一致, 不一致時重新上傳一次, 重新上傳時, dfd要用原來的
			//var dfd = $.Deferred();
			var dfd = options?.dfd || $.Deferred();
			var envelope = '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
								'<soap:Body>' +
									'<WebFileIO xmlns="http://2100T.com.tw">' +
										'<argArtifact>' + _artifact + '</argArtifact>' +
										'<argType>1</argType>' +
										'<argFileCollection><argFile>' +
											'<FilePath>' + Utf7.encode(filePath) + '</FilePath>' +
											'<FileName>' + Utf7.encode(fileName) + '</FileName>' +
										'</argFile></argFileCollection>' +
										'<argOverWrite>true</argOverWrite>' +		//2016.10.18	Leslie	修改為正確的參數值"true"
//                                        '<AttachementSent href="cid:' + fileName + '"/>' +
									'</WebFileIO>' +
								'</soap:Body>' +
							'</soap:Envelope>\r\n';
			/*xmlParams += '--MIME_boundary\r\n' +
						'Content-Type: text/plain\r\n' +
						'Content-Transfer-Encoding: 7bit\r\n' +
						'Content-Id: ' + fileName + '\r\n\r\n' +
						'ABC\r\n' +
						'--MIME_boundary--';*/
			//theLogger.debug(envelope);
			var xhr = new XMLHttpRequest();

			xhr.open("POST", _url, opts.async);
			
			// 若payload為XML文件, 則先轉為文字
			var payload = "", transcode = 0;
			if(data instanceof Document) {
				payload = getXml(data);	// 2016.11.7 改叫內建getXml()不要用RD-Edit.js的Util.getXml()
				theLogger.debug(payload);
				transcode = 1;  // 轉成UTF-16的Binary格式
			}
			else if(typeof data === "object" && "xml" in data) {	// for IE-compatible, 2016.8.22 add typeof object
				payload = data.xml;
				theLogger.debug(payload);
				transcode = 1;  // 轉成UTF-16的Binary格式
			}
			else if(data instanceof ArrayBuffer) {
				payload = new Uint8Array(data);
				theLogger.debug(payload);
			}
			else if("transcode" in opts && opts.transcode == 1) {	// 1111201 Raymond 1110867 修正IE在output HTML(另存ODT上傳HTM檔至轉檔工作站)時transformNode()出來的是字串, 上傳時須強制轉為UTF-16, 上傳後的檔案才不會成亂碼
				payload = data;
				transcode = 1;
			}
			else
				payload = data;

			//Build the DIME message.
			var t_envelope = "http://schemas.xmlsoap.org/soap/envelope/";
			var t_payload = "Binary";
			var p1 = ((t_envelope.length % 4) == 0)?0:(4 - (t_envelope.length % 4));
			var p2 = ((envelope.length % 4) == 0)?0:(4 - (envelope.length % 4));
			var p3 = ((fileName.length % 4) == 0)?0:(4 - (fileName.length % 4));
			var p4 = ((t_payload.length % 4) == 0)?0:(4 - (t_payload.length % 4));
			var l_payload = (transcode == 0)?payload.length:(payload.length * 2 + 2);
			var p5 = ((l_payload % 4) == 0)?0:(4 - (l_payload % 4));
			var n = 12 + (t_envelope.length + p1) + (envelope.length + p2) + 12 + (fileName.length + p3) + (t_payload.length + p4) + (l_payload + p5);
			var a = new Uint8Array(n);
			a[0] = 12;                  // DIMEVersion + MB
			a[1] = 32;                  // URL
			a[2] = a[3] = 0;            // opt_len
			a[4] = a[5] = 0;            // id_len
			a[6] = 0;                   // type_len(hibyte)
			a[7] = t_envelope.length;   // type_len(lobyte)
			if((envelope.length >> 24) > 0)
				a[8] = (envelope.length >> 24);
			else
				a[8] = 0;
			if(((envelope.length >> 16) & 0xff) > 0)
				a[9] = ((envelope.length >> 16) & 0xff);
			else
				a[9] = 0;
			if(((envelope.length >> 8) & 0xff) > 0)
				a[10] = ((envelope.length >> 8) & 0xff);
			else
				a[10] = 0;
			a[11] = (envelope.length & 0xff);   // data_len
			var s = 12;
			for(var i=0; i<(t_envelope.length + p1); i++) {
				if(i < t_envelope.length)
					a[i + s] = t_envelope.charCodeAt(i);
				else
					a[i + s] = 0;
			}
			s += i;
			for(var i=0; i<(envelope.length + p2); i++) {
				if(i < envelope.length)
					a[i + s] = envelope.charCodeAt(i);  // envelope中的中文檔名及路徑已轉為utf-7, 所以直接填入array
				else
					a[i + s] = 0;
			}
			s += i;
			a[s] = 10;                  // DIMEVersion + ME
			a[s + 1] = 16;              // MIMEtype
			a[s + 2] = a[s + 3] = 0;    // opt_len
			a[s + 4] = 0;               // id_len(hibyte)
			a[s + 5] = fileName.length; // id_len(lobyte)
			a[s + 6] = 0;               // type_len(hibyte)
			a[s + 7] = t_payload.length;// type_len(lobyte)
			if((l_payload >> 24) > 0)
				a[s + 8] = (l_payload >> 24);
			else
				a[s + 8] = 0;
			if(((l_payload >> 16) & 0xff) > 0)
				a[s + 9] = ((l_payload >> 16) & 0xff);
			else
				a[s + 9] = 0;
			if(((l_payload >> 8) & 0xff) > 0)
				a[s + 10] = ((l_payload >> 8) & 0xff);
			else
				a[s + 10] = 0;
			a[s + 11] = (l_payload & 0xff);   // data_len
			s += 12;
			for(var i=0; i<(fileName.length + p3); i++) {
				if(i < fileName.length)
					a[i + s] = fileName.charCodeAt(i);
				else
					a[i + s] = 0;
			}
			s += i;
			for(var i=0; i<(t_payload.length + p4); i++) {
				if(i < t_payload.length)
					a[i + s] = t_payload.charCodeAt(i);
				else
					a[i + s] = 0;
			}
			s += i;
			// 編成UTF-16的Binary格式
			if(transcode == 1) {
				a[s] = 0xff;
				a[s + 1] = 0xfe;
				s += 2;
				for(var i=0; i<payload.length; i++) {
					a[s + (i * 2)] = (payload.charCodeAt(i) & 0xff);
					a[s + (i * 2) + 1] = ((payload.charCodeAt(i) >> 8) & 0xff);
				}
				s += (i * 2);
				for(var i=0; i<p5; i++)
					a[s + i] = 0;
			}
			else {
				if(payload instanceof Uint8Array) {	// 支援ArrayBuffer類型的data複製
					a.set(payload, s);
				}
				else {
					for(var i=0; i<(payload.length + p5); i++) {
						if(i < payload.length)
							a[i + s] = payload.charCodeAt(i);
						else
							a[i + s] = 0;
					}
				}
			}
			xhr.setRequestHeader("Content-Type", "application/dime");
			xhr.setRequestHeader("SOAPAction", "\"http://2100T.com.tw/WebFileIO\"");
			//theLogger.debug(xhr);
			//theLogger.debug(a);
			var that = this;	// 1140425 Raymond 北榮版更後問題序79 新增that
			xhr.onreadystatechange = function() {
				theLogger.debug("xhr.onreadystatechange: " + this.readyState);
				if(this.readyState == 4) {
					theLogger.debug(this.status + " " + this.statusText + ", " + (new Date() - t0) + "ms elapsed, " + this.responseText);
					t0 = new Date();
					//theLogger.debug(this.getAllResponseHeaders());
					
					function parseError(data, utf8encoded) {
						var errXml = (new DOMParser()).parseFromString((utf8encoded)?that.utf8.decode(data):data, "text/xml");
						//theLogger.debug(err);
						/* 2016.10.27 FIX for Err物件的階層可能有變動, 改用jQuery.find()找Err物件
						if(err.documentElement.childNodes[1].childNodes[0].childNodes[0].childNodes.length) {
							err = err.documentElement.childNodes[1].childNodes[0].childNodes[0].childNodes[0];
							err = {
								errIdx: err.childNodes[0].textContent,
								errNo: err.childNodes[1].textContent,
								errMsg: err.childNodes[2].textContent
							}
							return err;
						}*/
						var err = $(errXml.documentElement).find("Err");
						if(err.length) {
							return {
								errIdx: err.find("ErrIdx").text(),
								errNo: err.find("ErrNo").text(),
								errMsg: err.find("ErrMsg").text()
							};
						}
						return false;	// WebFileIOResult節點無child, 表示無錯誤
					}
					
					if(this.status == 200){		//2017.3.6	Leslie	加上status==200判斷，以避免當回報為IIS錯誤時(http狀態碼非200)，程式無法正確處理其異常狀態
						var cntnType = this.getResponseHeader("Content-Type");
						if(cntnType != null && cntnType.match(/^text\/xml/)) {	//2017.2.16	Leslie	增加異常狀況的判斷，加上null判斷
							var err = parseError(this.responseText);
							if(err) {
								theLogger.error(err);
								if(options && options.error)
									options.error(err.errNo + ": " + err.errMsg);
								dfd.reject(err.errNo + ":" + err.errMsg);
							}
							else {
								// 2019.8.30 - 1080654 Eric, add log for performance tracing
								if (!!_tmBeginUpload) {
									let _log = SSOUtil.dev_getTimeElapseStr('WebFileIO.upload() [FilePath=' + filePath + ', FileName=' + fileName +']', _tmBeginUpload);
									_tmBeginUpload = 0;
									theLogger.time(_log);
								}
								
								// 1140425 Raymond 北榮版更後問題序79 上傳PNG影像檔後再下載一次與原上傳資料比對是否一致, 不一致時重新上傳一次
								if(fileName.match(/.png$/i)) {
									theLogger.log("上傳PNG後, 下載一次檢查與上傳資料是否一致...");
									that.download(filePath, fileName, {
										success: function(fil, all) {
											console.log("下載圖檔", fil);
											console.log("上傳圖檔", data);
											// 1141211 Raymond 1140957 修正夾帶的附件是PNG檔時, 會檢核到上傳與下載的資料不一致的問題
											if(data instanceof ArrayBuffer) {
												var a = new Uint8Array(data);
											}
											// 1150212 Raymond 外貿序60 修正夾帶的附件是PNG檔時, data會變成Uint8Array, 如果走下面else的邏輯, 會發生無charCodeAt方法的錯誤問題
											else if(data instanceof Uint8Array) {
												var a = data;
											}
											else {
											var a = new Uint8Array(data.length);
											for(var x=0; x<data.length; x++)
												a[x] = data.charCodeAt(x);
											}
											var b64 = Base64.encode(a);
											console.log(b64);
											if(fil.substr(fil.indexOf("base64,") + 7) != b64) {
												if("retry" in options && options.retry >= 1) {
													theLogger.log("檢查到下載的圖檔與上傳圖檔不一致, 已重新上傳過" + options.retry + "次, 回應上傳失敗");
													var errText = "上傳PNG影像檔後，下載影像檔檢查比對內容不一致，經重試上傳" + options.retry + "次後，仍是不一致，請洽系統管理員。";
													if(options && options.error)
														options.error(errText);
													dfd.reject(errText);
												}
												else {
													if("retry" in options)
														options.retry++;
													else {
														options.retry = 1;
														options.dfd = dfd;	// 重試上傳時要用原來的dfd物件
													}
													theLogger.log("檢查到下載的圖檔與上傳圖檔不一致, 第" + options.retry + "次重新上傳");
													that.upload(filePath, fileName, data, options);
												}
											}
											else {
												if(options && options.success)
													options.success(fileName, filePath);
												dfd.resolve();
											}
										},
										error: function(errText) {
											theLogger.error(errText);
											if(options && options.error)
												options.error(errText);
											dfd.reject(errText);
										}
									});
								}
								else {
								if(options && options.success)
									options.success(fileName, filePath);
								dfd.resolve();
								}
							}
						}
						else {
							theLogger.error("不支援無法識別的Content-Type: '" + cntnType + "', responseText:");
							theLogger.log(this.responseText);
							if(options && options.error)
								options.error("不支援無法識別的Content-Type: '" + cntnType + "'");
							dfd.reject("上傳檔案["+fileName+"]發生異常，錯誤訊息：不支援無法識別的Content-Type: '" + cntnType + "'");
						}
					}
					else{	//2017.3.6	Leslie	回報為IIS錯誤時(http狀態碼非200)，處理異常狀態
						theLogger.error("呼叫服務["+_url+"]時發生異常: HTTP STATUS=" + this.status + ", responseText:");
						theLogger.log(this.responseText);
						var errXml = (new DOMParser()).parseFromString(this.responseText, "text/xml");
						var err = $(errXml.documentElement).find("title");
						var errText = "";
						if(err.length)	//回報基本異常資訊
							errText = "上傳檔案["+fileName+"]發生異常，錯誤訊息："+err.text();
						else
							errText = "上傳檔案["+fileName+"]發生異常，HTTP 狀態碼：" + this.status;
						if(options && options.error)
							options.error(errText);
						dfd.reject(errText);
					}
				}
			}
			var t0 = new Date();
			xhr.send(a.buffer);
			/*var t0 = new Date();
			$.ajax(_url, {
				type: "POST",
				data: a.buffer,
				headers: {
					"Content-Type": "application/dime",
					"SOAPAction": "\"http://2100T.com.tw/WebFileIO\""
				},
				beforeSend: function(jqXHR, settings) {
					theLogger.log(settings);
					//jqXHR.overrideMimeType('text/plain; charset=x-user-defined');
					theLogger.log(jqXHR);
				},
				success: function(data, statusText, jqXHR) {
					theLogger.log("success! elapsed: " + (new Date() - t0) + "ms");
					t0 = new Date();
					theLogger.log(jqXHR.getAllResponseHeaders());
					theLogger.log(data);
					parseDIME(data, fileName, options);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					theLogger.log("WebFileIO error! " + textStatus + ", " + errorThrown);
					theLogger.log(jqXHR.responseText);
					if(options && options.error)
						options.error(textStatus);
				}
			});*/
			return dfd.promise();
		},
		// 2016.7.12 新增上傳附件電子檔
		uploadAtt: function(filePath, fileName, origFileName, options) {
			theLogger.log("uploadAtt(" + filePath + ", " + fileName + ", " + origFileName + ")");
			var opts = $.extend({async: true}, options);
			var dfd = $.Deferred();
			var that = this;
			if(origFileName.match(/^blob:/)) {
				var xhr = new XMLHttpRequest();
				xhr.open("GET", origFileName, true);
				xhr.responseType = "arraybuffer";
				xhr.onload = function(e) {
					if(this.status == 200) {
						var data = this.response;
						that.upload(filePath, fileName, data, options)
							.done(dfd.resolve)
							.fail(dfd.reject);
					}
				};
				xhr.send();
			}
			else {
				theLogger.error("uploadAtt()僅接受'blob:'類型的資料上傳!");
				dfd.reject("僅接受'blob:'類型的資料上傳");
			}
			
			return dfd.promise();
		},
		// 2016.7.22 新增複製更名
		copy: function(fromPath, fromFileName, toPath, toFileName, options) {
			if(options)
				theLogger.log("copy(" + fromPath + ", " + fromFileName + ", " + toPath + ", " + toFileName + ", {delSource:" + options.delSource + ", overWrite:" + options.overWrite + ", toWebFileIOUrl:" + options.toWebFileIOUrl + "})");
			else
				theLogger.log("copy(" + fromPath + ", " + fromFileName + ", " + toPath + ", " + toFileName + ")");
			var opts = $.extend({
				delSource: false,		// 預設不刪除原檔
				overWrite: true,		// 預設要覆蓋目的檔
				toWebFileIOUrl: _url	// 預設複製目的為同一WebFileIO主機
			}, options);
			function argFile(fromPath, fromName, toPath, toName) {
				this.FilePath = fromPath;
				this.FileName = fromName;
				this.ToPath = toPath;
				this.ToName = toName;
			}
			var dfd = $.Deferred();
			
			var params = new SOAPClientParameters();
			params.add('argArtifact', _artifact);
			if(options && "restore" in options && options.restore)			// 2016.9.26 新增連同子目錄的搬移功能type為40
				params.add('argType', '40');
			else
				params.add('argType', '4');									// WebFileIO 搬移檔案, Type固定給"4"
			params.add('argFileCollection', [new argFile(fromPath, fromFileName, toPath, toFileName)]);
			params.add('argDeleteSource', (opts.delSource?'true':'false'));	// 作業完成後是否刪除原位置檔案
			params.add('argOverWrite', (opts.overWrite?'true':'false'));	// 是否覆寫目的位置檔案
			params.add('argRemoteService', opts.toWebFileIOUrl);			// 複製目的Server的WebFileIO網址!
			SOAPClient.invoke(_url, "WebFileIO", params, true,
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
						res = {success:false, errMsg:'叫用FileIOWS時發生錯誤!'};
					}
					
					if (res.success) {
						dfd.resolve(res);
					}
					else {
						dfd.reject(res);
					}
				});
			return dfd.promise();
		},
		// 2016.9.21 新增刪除
		del: function(files) {
			function argFile(filePath, fileName) {
				this.FilePath = filePath;
				this.FileName = fileName;
				//this.toPath = "";	// 1091117 Raymond 1080943 補toPath及toName, 以避免invokeJSON發生錯誤
				//this.toName = "";
			}
			var dfd = $.Deferred();
			
			var a = [];
			if(SSOUtil.typeOf(files) == "array") {
				theLogger.log("del([");
				for(var i=0; i<files.length; i++) {
					theLogger.log("\t'" + files[i].filePath + "', '" + files[i].fileName + "'");
					a.push(new argFile(files[i].filePath, files[i].fileName));
				}
				theLogger.log("])...");
			}
			else
				throw new Error("WebFileIO.del()僅接受陣列類型的參數");
			
			var params = new SOAPClientParameters();
			params.add('argArtifact', _artifact);
			params.add('argType', '3');										// WebFileIO 刪除檔案, Type固定給"3"
			params.add('argFileCollection', a);
			// 1091117 Leslie 1080943 補argDeleteSource及argOverWrite, 以避免invokeJSON發生錯誤
			params.add('argDeleteSource', 'false');	// 作業完成後是否刪除原位置檔案
			params.add('argOverWrite', 'false');	// 是否覆寫目的位置檔案
			SOAPClient.invoke(_url, "WebFileIO", params, true,
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
						res = {success:false, errMsg:'叫用FileIOWS時發生錯誤!'};
					}
					
					if (res.success) {
						dfd.resolve(res);
					}
					else {
						dfd.reject(res);
					}
				});
			return dfd.promise();
		}
	}
}
WebFileIO.prototype = new SOAPviaDIME();
//1110421 Kevin 1110164 弱掃移動script至js
// 以SSO_CONFIG內的WS_URLs設定WebServices網址
theWebServices.url(SSO_CONFIG.WS_URLs);