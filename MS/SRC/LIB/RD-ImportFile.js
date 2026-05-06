// 開啟舊檔功能模組
//	掛在nsEditor命名空間下
//	
// DATE		SA			PRG			MGR_NO		DESC
// 1060419	Raymond		Raymond		-------		修正開啟舊檔若是big5編碼的話IE無法正確匯入的問題
// 1060919	Raymond		Raymond		1060801		新增判斷根節點名稱是否含有解碼不正常的識別字元U+FFFD, 因FDA的案例DI是Big5編碼, 但能通過DOMParser.parseFromString且無錯誤, 須進一步判斷是否解碼錯誤
// 1061026	Raymond		Raymond		1061053		修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
// 1080927  Kevin       Eric        1080339     jQuery 3.0 upgrade. ($.type => SSOUtil.typeOf)
// 1090916	Raymond		Raymond		1090546		信保基金特殊模式公文不提供開啟舊檔功能
// 1101025	Raymond		Raymond		航港局序8	修正IE開啟舊檔若是UTF-8編碼, 載入DOM後會變成無encoding屬性的問題
// 1120901	Raymond		Raymond		1120215		新增標檢局客製化支援捷成TXT檔匯入功能
// 1130809	Raymond		Raymond		1130313		合併1111007(1100394), 支援開啟離線模式下儲存的ZIP公文電子檔
// 1130813	Raymond		Raymond		1130313		修改為開啟離線模式儲存的ZIP檔時, 優先載入有追蹤修訂的文稿檔
// 1140910	Raymond		Raymond		退輔會序203	合併屏東序882, 新增判斷是否啟用附件匯出頁面設定, 是則在開啟ZIP檔新增完壓縮檔內所有文稿及附件後呼叫批次匯出附件頁面功能
// 1141022	Raymond		Raymond		1141125		新增當機關暱稱為"TAITRA"(外貿)時, 提供匯入調派令CSV(多人)、晉升令CSV(多人)及獎勵令CSV(多人)的功能

var nsEditor = nsEditor||{};

nsEditor.onImportFileVisible = function(fm) {
	// 1090916 Raymond 1090564 信保特殊模式公文不提供此功能
	if(fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
		return false;
	// 2016.9.2 判斷不允許編輯
	if(fm && fm.enableEdit())
		return true;
	return false;
}

nsEditor.onImportFile = function(event, fm) {
	
	var $viewPort = event.data;
	var $home = $("#aol");
	
	// 1101025 Raymond 航港局序8 修正IE開啟舊檔若是UTF-8編碼, 載入DOM後會變成無encoding屬性的問題
	function correctEncoding(srcStr) {
		var enc = srcStr.indexOf("encoding");
		if(enc > 0) {
			var closure = srcStr.indexOf("?>");
			if(enc < closure) {
				var par = srcStr.substring(enc, closure);
				var m = par.match(/encoding\s*=\s*['"]([a-zA-Z0-9-]+)['"]/);
				if(!!m && m.length > 1) {
					if(m[1].toUpperCase() != "UTF-16") {
						theLogger.warn("開啟舊檔為'" + m[1] + "'編碼, 變更為'UTF-16'");
						return srcStr.replace(m[1], "UTF-16");
					}
				}
				else {
					theLogger.error("不正確的編碼屬性'" + par + "'");
				}
			}
			else {	// 在?>後的encoding不是編碼
				theLogger.warn("開啟舊檔無encoding屬性, 新增encoding='UTF-16'");
				var q = srcStr.indexOf("'"),
					dq = srcStr.indexOf('"'),
					qg = '"';
				if(!!q && !!dq) {
					if(q < dq)
						qg = "'";
				}
				else if(!!q)
					qg = "'";
				return srcStr.substr(0, closure) + " encoding=" + qg + "UTF-16" + qg + srcStr.substr(closure);
			}
		}
		else {	// 無encoding
			theLogger.warn("開啟舊檔無encoding屬性, 新增encoding='UTF-16'");
			var closure = srcStr.indexOf("?>");
			var q = srcStr.indexOf("'"),
				dq = srcStr.indexOf('"'),
				qg = '"';
			if(!!q && !!dq) {
				if(q < dq)
					qg = "'";
			}
			else if(!!q)
				qg = "'";
			return srcStr.substr(0, closure) + " encoding=" + qg + "UTF-16" + qg + srcStr.substr(closure);
		}
		return srcStr;
	}
	function reload(file, _fm) {	// 2016.12.19 新增_fm參數
		var rdr = new FileReader();
		rdr.onload = function() {
			theLogger.log(this.result);
			theLogger.log(SSOUtil.typeOf(this.result));
			if(SSOUtil.typeOf(this.result) == "string") {
				// 1120830 Raymond 1120215 新增標檢局客製化支援捷成TXT檔匯入功能
				if(file.name.match(/.txt$/i) && nsEditor.determineAndImportFromTXT.call(this, function(xmlDoc) {
					_fm.newDraft(Util.getXml(xmlDoc)).done(function(idx) {
						var fv = $viewPort.data("view");
						fv.updateDraftTags(idx);
					});
				})) {}
				else {
				// 1101025 Raymond 航港局序8 修正IE開啟舊檔若是UTF-8編碼, 載入DOM後會變成無encoding屬性的問題
				//_fm.newDraft(this.result).done(function(idx) {
				var str = correctEncoding(this.result);
				_fm.newDraft(str).done(function(idx) {
					var fv = $viewPort.data("view");
					fv.updateDraftTags(idx);
				});
				}
			}
			else
				theLogger.error("檔案讀取後不是字串!!");
		}
		theLogger.log("以Big5編碼重新載入'" + file.name + "'(" + file.type + ", " + file.size + "bytes)");	// 1060919 Raymond 新增'以Big5編碼'
		rdr.readAsText(file, "Big5");
	}
	
	// 1120830 Raymond 1120215 新增標檢局客製化支援捷成TXT檔匯入功能
	// 1130809 Raymond 1130313 合併1111007(1100394), 支援開啟離線模式下儲存的ZIP公文電子檔
	//let accpExt = ".xml,.di";
	let accpExt = ".xml,.di,.zip";
	if(SSO_CONFIG.OrgNickName == "BSMI")
		accpExt += ",.txt";
	var $inp = $home.find("input#importFiles");
	if($inp.length == 0)
		// 1120830 Raymond 1120215 新增標檢局客製化支援捷成TXT檔匯入功能
		//var $inp = $("<input id='importFiles' type='file' accept='.xml,.di' style='display:none;'>").appendTo($home).on('change', function(event) {
		var $inp = $("<input id='importFiles' type='file' accept='" + accpExt + "' style='display:none;'>").appendTo($home).on('change', function(event) {
			var _fm = $(this).data("folioModel");	// 2016.11.1 bugfix, 因為$inp沒有重新產生, 所以handler中的fm變數只會是第1次呼叫時傳入的FolioModel物件
			var msg = "";
			for(var i=0; i<this.files.length; i++) {
				msg += this.files[i].name + "(" + this.files[i].type + ", " + this.files[i].size + "Bytes)\r\n";
				var rdr = new FileReader();
				var that = this.files[i];
				rdr.onload = function() {
					theLogger.log(this.result);
					//theLogger.log(SSOUtil.typeOf(this.result));
					if(SSOUtil.typeOf(this.result) == "string") {
						// 1060419 Raymond 修正載入編碼過檔案若無問題, 則不需判斷encoding再重新載入(反而會載入失敗)的問題
						var checkEncoding = false;
						if("ActiveXObject" in window) {
							var testLoadDoc = new ActiveXObject("MSXML2.DOMDocument");
							testLoadDoc.resolveExternals = false;
							testLoadDoc.validateOnParse = false;
							testLoadDoc.preserveWhiteSpace = true;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
							if(!testLoadDoc.loadXML(this.result)) {
								var pe = testLoadDoc.parseError;
								theLogger.error("載入XML失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
								checkEncoding = true;	// 載入失敗時要檢查encoding
							}
							else {	// 載入成功則直接新增文稿
								// 1101025 Raymond 航港局序8 修正IE開啟舊檔若是UTF-8編碼, 載入DOM後會變成無encoding屬性的問題
								//_fm.newDraft(this.result).done(function(idx) {
								var str = correctEncoding(this.result);
								_fm.newDraft(str).done(function(idx) {
									var fv = $viewPort.data("view");
									fv.updateDraftTags(idx);
								});
							}
						}
						else {
							var testLoadDoc = (new DOMParser()).parseFromString(this.result, "text/xml");
							if(testLoadDoc.documentElement.nodeName == "parsererror") {	// FireFox用這種方式回傳錯誤
								theLogger.error("載入XML失敗! " + testLoadDoc.documentElement.firstChild.textContent);
								checkEncoding = true;	// 載入失敗時要檢查encoding
							}
							else if(testLoadDoc.documentElement.nodeName == "html" &&
									testLoadDoc.documentElement.firstChild.nodeName == "body" &&
									testLoadDoc.documentElement.firstChild.firstChild.nodeName == "parsererror") {	// Big5編碼變亂碼, Chrome會產生<html><body><parsererror>
								theLogger.error("載入XML失敗! " + testLoadDoc.documentElement.firstChild.firstChild.textContent);
								checkEncoding = true;	// 載入失敗時要檢查encoding
							}
							else {	// 載入成功則新增文稿
								// 1060919 Raymond 1060801 新增判斷是否解碼不正常
								if(testLoadDoc.documentElement.nodeName.length > 0 &&
									testLoadDoc.documentElement.nodeName.charCodeAt(0) == 0xFFFD) {
									theLogger.error("載入XML失敗! 根節點名稱<" + testLoadDoc.documentElement.nodeName + ">含有不正確解碼的識別字元");
									checkEncoding = true;	// 載入失敗時要檢查encoding
								}
								else
									_fm.newDraft(this.result).done(function(idx) {
										var fv = $viewPort.data("view");
										fv.updateDraftTags(idx);
									});
							}
						}
						// 1060419 Raymond 檢查encoding
						if(checkEncoding) {
							// 1120830 Raymond 1120215 新增標檢局客製化支援捷成TXT檔匯入功能
							if(that.name.match(/.txt$/i)) {
								theLogger.warn("開啟的舊檔是TXT檔");
								reload(that, _fm);
							}
							else {
							theLogger.warn("偵測是否編碼錯誤...");
							// 偵測是否編碼錯誤
							var enc = this.result.indexOf("encoding");
							if(enc > 0) {
								var closure = this.result.indexOf("?>");
								if(enc < closure) {
									var par = this.result.substring(enc, closure);
									var m = par.match(/encoding\s*=\s*['"]([a-zA-Z0-9-]+)['"]/);
									if(m && m.length > 1) {
										if(m[1].toLowerCase() == "big5") {	// big5編碼須加參數重新讀取
											reload(that, _fm);	// 2016.12.19 fix, 傳入_fm參數
										}
										else {	// 非big5視為正常解讀的字串
											_fm.newDraft(this.result).done(function(idx) {	// 2016.11.1 bugfix, fm改成_fm, 用data()取得目前應該對應的FolioModel物件
												var fv = $viewPort.data("view");
												fv.updateDraftTags(idx);
											});
										}
									}
									else
										theLogger.error("找不到encoding屬性中宣告的內容'" + par + "'");
								}
								else if(closure < 0)
									theLogger.error("有encoding字串但找不到'?>'結尾!");
								else
									theLogger.error("有encoding字串但在'?>'之後!");
							}
							else {	// 沒有宣告encoding的XML或DI視為UTF-8或UTF-16可正常解讀的字串
								_fm.newDraft(this.result).done(function(idx) {	// 2016.11.1 bugfix, fm改成_fm, 用data()取得目前應該對應的FolioModel物件
									var fv = $viewPort.data("view");
									fv.updateDraftTags(idx);
								});
							}
							}	// end of 1120830 Raymond 1120215 新增標檢局客製化支援捷成TXT檔匯入功能
						}
					}
					// 1130809 Raymond 1130313 合併1111007(1100394), 開啟的類型是ArrayBuffer表示是離線模式下儲存打包的ZIP檔
					else if(SSOUtil.typeOf(this.result) == "arraybuffer") {
						nsEditor.importZippedFolio(_fm, $viewPort.data("view"), this.result);
					}
					else
						theLogger.error("檔案讀取後不是字串! typeof result = '" + SSOUtil.typeOf(this.result) + "'");	// 1060919 Raymond 新增typeof訊息
				}
				theLogger.log("載入'" + this.files[i].name + "'(" + this.files[i].type + ", " + this.files[i].size + "bytes)");
				// 1130809 Raymond 1130313 合併1111007(1100394), 判斷開啟的是ZIP檔(WIN7是application/zip, WIN10是application/x-zip-compressed)則改用readAsArrayBuffer, IE的FileReader會讀到type="", 故IE下改以副檔名判斷
				if(this.files[i].type == "application/zip" || this.files[i].type == "application/x-zip-compressed" || (navigator.userAgent.indexOf("Trident") >= 0 && this.name.match(/.zip$/i)))
					rdr.readAsArrayBuffer(this.files[i]);
				else
					rdr.readAsText(this.files[i]);
			}
		}).data("folioModel", fm).trigger('click');	// 2016.11.1 bugfix, fm參數改用data()塞進$inp
	else {
		$inp.val("").data("folioModel", fm).trigger('click');	// 2016.11.1 bugfix, fm參數改用data()塞進$inp
	}
};

// 1120831 Raymond 1120215 新增標檢局客製化支援捷成TXT檔匯入功能
nsEditor.determineAndImportFromTXT = function(callback) {
	theLogger.log("檢核是否為標檢局客製化的TXT檔...");
	let lines = this.result.split("\r\n");
	console.log(lines);
	function findLine(str) {
		for(let i=0; i<lines.length; i++) {
			if(lines[i] == str) {
				return i;
			}
		}
		return -1;
	}
	function getNode(ndPar, nm) {
		let res = ndPar.getElementsByTagName(nm);
		if(res.length)
			return res[0];
		res = ndPar.ownerDocument.createElement(nm);
		return ndPar.appendChild(res);
	}
	function setNodeText(ndPar, nm, ctx) {
		let res = ndPar.getElementsByTagName(nm);
		if(res.length)
			res[0].textContent = ctx;
		res = ndPar.ownerDocument.createElement(nm);
		ndPar.appendChild(res).textContent = ctx;
	}
	function addNode(ndPar, nm) {
		let ne = ndPar.ownerDocument.createElement(nm);
		return ndPar.appendChild(ne);
	}
	let i = findLine("＠本文");
	if(i >= 0) {
		let n = findLine("＠文別");
		if(n >= 0) {
			let docType = lines[n + 1], subDocType = "";
			theLogger.log("TXT檔記錄文別為'" + docType + "'");
			const subDocTypesA = ["函", "書函", "交辦案件通知單", "交議案件通知單", "催辦案件通知單", "移文單", "機密文書機密等級變更或註銷建議單", "機密文書機密等級變更或註銷通知單", "執行命令", "獎懲建議函"];
			const subDocTypesB = ["令", "獎懲令"];
			for(let j=0; j<subDocTypesA.length; j++) {
				if(docType == subDocTypesA[j]) {
					subDocType = docType;
					docType = "函";
					theLogger.log("判斷文別應為'函', 函類別應為'" + subDocType + "'");
					break;
				}
			}
			for(let j=0; j<subDocTypesB.length; j++) {
				if(docType == subDocTypesB[j]) {
					subDocType = docType;
					docType = "令";
					theLogger.log("判斷文別應為'令', 令類別應為'" + subDocType + "'");
					break;
				}
			}
			
			let xmlDoc = (new DOMParser()).parseFromString("<" + docType + ">" + ((!!subDocType)?("<" + docType + "類別 代碼='" + subDocType + "'/>"):"") + "</" + docType + ">", "text/xml"),
				inScope = true,
				lastSeg = new Array(9),
				lvlLastSeg = 1;
			for(++i; i<lines.length; i++) {
				if(lines[i].match(/^＠/)) {
					inScope = false;
					if(lines[i] == "＠受文機關" && lines[i + 1].length > 0 && !lines[i + 1].match(/^＠/)) {
						++i;
						theLogger.log("受文機關：'" + lines[i] + "'(行" + i + ")");
						let ndLst = getNode(xmlDoc.documentElement, "受文者列表");
						setNodeText(ndLst, "文字", lines[i]);
					}
					else if(lines[i] == "＠行文單位正本" && lines[i + 1].length > 0 && !lines[i + 1].match(/^＠/)) {
						++i;
						theLogger.log("行文單位正本：'" + lines[i] + "'(行" + i + ")");
						let rcpts = lines[i].split("、"),
							ndLst = getNode(xmlDoc.documentElement, "受文者列表");
						for(let j=0; j<rcpts.length; j++) {
							let nd = addNode(ndLst, "受文者");
							nd.setAttribute("本別", "正本");
							setNodeText(nd, "全銜", rcpts[j]);
							setNodeText(nd, "正式名稱", rcpts[j]);
							//addNode(nd, "機關地址");	// 二代的受文者沒有這個欄位了
							addNode(nd, "機關代碼");
							addNode(nd, "單位代碼");
							addNode(nd, "姓名");
							addNode(nd, "職稱");
							addNode(nd, "郵遞區號");
							addNode(nd, "地址");
							addNode(nd, "FEP交換代碼");
							setNodeText(nd, "發文方式", "郵寄");
							setNodeText(nd, "含附件", "是");
						}
					}
					else if(lines[i] == "＠行文單位副本" && lines[i + 1].length > 0 && !lines[i + 1].match(/^＠/)) {
						++i;
						theLogger.log("行文單位副本：'" + lines[i] + "'(行" + i + ")");
						let rcpts = lines[i].split("、"),
							ndLst = getNode(xmlDoc.documentElement, "受文者列表");
						for(let j=0; j<rcpts.length; j++) {
							let nd = addNode(ndLst, "受文者");
							nd.setAttribute("本別", "副本");
							setNodeText(nd, "全銜", rcpts[j]);
							setNodeText(nd, "正式名稱", rcpts[j]);
							//addNode(nd, "機關地址");	// 二代的受文者沒有這個欄位了
							addNode(nd, "機關代碼");
							addNode(nd, "單位代碼");
							addNode(nd, "姓名");
							addNode(nd, "職稱");
							addNode(nd, "郵遞區號");
							addNode(nd, "地址");
							addNode(nd, "FEP交換代碼");
							setNodeText(nd, "發文方式", "郵寄");
							setNodeText(nd, "含附件", "是");
						}
					}
					else if(lines[i] == "＠抄件" && lines[i + 1].length > 0 && !lines[i + 1].match(/^＠/)) {
						++i;
						theLogger.log("抄件：'" + lines[i] + "'(行" + i + ")");
						let rcpts = lines[i].split("、"),
							ndLst = getNode(xmlDoc.documentElement, "受文者列表");
						for(let j=0; j<rcpts.length; j++) {
							let nd = addNode(ndLst, "受文者");
							nd.setAttribute("本別", "抄本");
							setNodeText(nd, "全銜", rcpts[j]);
							setNodeText(nd, "正式名稱", rcpts[j]);
							//addNode(nd, "機關地址");	// 二代的受文者沒有這個欄位了
							addNode(nd, "機關代碼");
							addNode(nd, "單位代碼");
							addNode(nd, "姓名");
							addNode(nd, "職稱");
							addNode(nd, "郵遞區號");
							addNode(nd, "地址");
							addNode(nd, "FEP交換代碼");
							setNodeText(nd, "發文方式", "郵寄");
							setNodeText(nd, "含附件", "是");
						}
					}
					else if(lines[i] == "＠附件說明" && lines[i + 1].length > 0 && !lines[i + 1].match(/^＠/)) {
						++i;
						theLogger.log("附件說明：'" + lines[i] + "'(行" + i + ")");
						let ndLst = getNode(xmlDoc.documentElement, "附件列表");
						setNodeText(ndLst, "文字", lines[i]);
					}
				}
				else if(lines[i].match(/^主旨：/, i)) {
					theLogger.log("主旨：'" + lines[i] + "'(行" + i + ")");
					let nd = getNode(xmlDoc.documentElement, "主旨");
					setNodeText(nd, "文字", lines[i].substr(3));
				}
				else if(lines[i].match(/^說明：/, i)) {
					theLogger.log("說明：'" + lines[i] + "'(行" + i + ")");
					lastSeg[0] = addNode(xmlDoc.documentElement, "段落");
					lastSeg[0].setAttribute("段名", "說明：");
					setNodeText(lastSeg[0], "文字", lines[i].substr(3));
				}
				else if(lines[i].length > 0) {
					if(!inScope && lines[i].match(/^附表：/))
						inScope = true;
					if(inScope) {
						theLogger.log("條列：'" + lines[i] + "'(行" + i + ")");
						if(!!lastSeg[0]) {
							let lvl = lvlLastSeg;
							let p = lines[i].search(/、|\)/);
							if(p >= 0) {
								let num = lines[i].substr(0, p);
								console.log(num);
								let chk = num.match(/一|二|三|四|五|六|七|八|九|十|０|１|２|３|４|５|６|７|８|９|甲|乙|丙|丁|戊|己|庚|辛|壬|癸|子|丑|寅|卯|辰|巳|午|未|申|酉|戌|亥|　|\(/g);
								if(chk.length != num.length)
									theLogger.warn("不是合法的序號字串");
								else if(lines[i][p] == "、") {
									chk = num.match(/一|二|三|四|五|六|七|八|九|十|０|　/g);
									if(chk.length == num.length)
										lvl = 1;
									chk = num.match(/０|１|２|３|４|５|６|７|８|９|　/g);
									if(chk.length == num.length)
										lvl = 3;
									chk = num.match(/甲|乙|丙|丁|戊|己|庚|辛|壬|癸|　/g);
									if(chk.length == num.length)
										lvl = 5;
									chk = num.match(/子|丑|寅|卯|辰|巳|午|未|申|酉|戌|亥|　/g);
									if(chk.length == num.length)
										lvl = 7;
									theLogger.log("合法的第" + lvl + "階序號字串");
								}
								else {
									chk = num.match(/一|二|三|四|五|六|七|八|九|十|０|　|\(/g);
									if(chk.length == num.length)
										lvl = 2;
									chk = num.match(/０|１|２|３|４|５|６|７|８|９|　|\(/g);
									if(chk.length == num.length)
										lvl = 4;
									chk = num.match(/甲|乙|丙|丁|戊|己|庚|辛|壬|癸|　|\(/g);
									if(chk.length == num.length)
										lvl = 6;
									chk = num.match(/子|丑|寅|卯|辰|巳|午|未|申|酉|戌|亥|　|\(/g);
									if(chk.length == num.length)
										lvl = 8;
									theLogger.log("合法的第" + lvl + "階序號字串");
								}
							}
							let cnd = xmlDoc.createElement("條列");
							if(p >= 0) {
								let num = lines[i].substr(0, p + 1).trim();
								theLogger.log("序號：'" + num + "', 文字：'" + lines[i].substr(p + 1) + "'");
								cnd.setAttribute("序號", num);
								setNodeText(cnd, "文字", lines[i].substr(p + 1));
							}
							else {
								theLogger.log("無序號, 文字：'" + lines[i] + "'");
								setNodeText(cnd, "文字", lines[i]);
							}
							if(lvl == lvlLastSeg) {
								if(!!lastSeg[lvl]) {
									for(let k=lvl; k<9; k++)
										lastSeg[k] = undefined;
								}
								if(!!lastSeg[lvl - 1])
									lastSeg[lvl] = lastSeg[lvl - 1].appendChild(cnd);
								else
									theLogger.error("Exception! 第" + (lvl - 1) + "層條列不存在!");
							}
							else if(lvl > lvlLastSeg) {
								if(lvl == (lvlLastSeg + 1)) {
									if(!!lastSeg[lvl]) {
										for(let k=lvl; k<9; k++)
											lastSeg[k] = undefined;
									}
									if(!!lastSeg[lvlLastSeg]) {
										lastSeg[lvl] = lastSeg[lvlLastSeg].appendChild(cnd);
										lvlLastSeg = lvl;
									}
									else
										theLogger.error("Exception! 第" + lvlLastSeg + "層條列不存在!");
								}
								else {
									theLogger.error("Exception! 此條列的階層(" + lvl + ")比上一條列(" + lvlLastSeg + ")內縮太多! 以第" + (lvlLastSeg + 1) + "階處理");
									if(!!lastSeg[lvlLastSeg + 1]) {
										for(let k=lvlLastSeg+1; k<9; k++)
											lastSeg[k] = undefined;
									}
									if(!!lastSeg[lvlLastSeg]) {
										lastSeg[lvl] = lastSeg[lvlLastSeg].appendChild(cnd);
										lvlLastSeg = lvl;
									}
									else
										theLogger.error("Exception! 第" + lvlLastSeg + "層條列不存在!");
								}
							}
							else if(lvl < lvlLastSeg) {
								if(!!lastSeg[lvl]) {
									for(let k=lvl; k<9; k++)
										lastSeg[k] = undefined;
								}
								if(!!lastSeg[lvl - 1]) {
									lastSeg[lvl] = lastSeg[lvl - 1].appendChild(cnd);
									lvlLastSeg = lvl;
								}
								else
									theLogger.error("Exception! 第" + (lvl - 1) + "層條列不存在!");
							}
						}
					}
				}
			}
			console.log(xmlDoc);
			if(!!callback)
				callback(xmlDoc);
		}
		else {
			theLogger.error("TXT檔中無「＠文別」註記, 無法匯入");
			alert("TXT檔中無「＠文別」註記，無法匯入!");
		}
		return true;
	}
	else {
		theLogger.warn("TXT檔中無「＠本文」註記, 非標檢局TXT檔");
		alert("TXT檔中無「＠本文」註記，非標檢局TXT檔，無法匯入!");
	}
	return false;
};

// 1130809 Raymond 1130313 合併1111007(1100394), 新增支援匯入離線模式下另存整份公文的ZIP壓縮檔
nsEditor.importZippedFolio = function(fm, fv, abData, dfd) {
	theLogger.log("以ZIP開啟此檔案...");
	
	/* 1130809 Raymond 1130313 合併1111007(1100394) 此為內政部客製功能, 忽略
	// 1110824 Raymond 1110989 新增判斷是否核決公文及是否禁止新增、刪除文稿
	if(fm.isAppFolioAddDelDraftDisabled()) {
		alert("本件公文已核決，不可新增文稿");
		return;
	}*/
	function getMimeType(fn) {
		let attMimeTypes = [
		{ext: ".csv", mimetype: "text/csv"},
		{ext: ".DOC", mimetype: "application/msword"},
		{ext: ".XLS", mimetype: "application/vnd.ms-excel"},
		{ext: ".PPT", mimetype: "application/vnd.ms-powerpoint"},
		{ext: ".TXT", mimetype: "text/plain"},
		{ext: ".JPG", mimetype: "image/jpeg"},
		{ext: ".PNG", mimetype: "image/png"},
		{ext: ".TIF", mimetype: "image/tiff"},
		{ext: ".PDF", mimetype: "application/pdf"},
		{ext: ".JPEG", mimetype: "image/jpeg"},
		{ext: ".DOCX", mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},
		{ext: ".XLSX", mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},
		{ext: ".PPTX", mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation"},
		{ext: ".ODT", mimetype: "application/vnd.oasis.opendocument.text"},
		{ext: ".IGES", mimetype: "application/iges"},
		{ext: ".STEP", mimetype: "application/step"},
		{ext: ".DXF", mimetype: "application/dxf"},
		{ext: ".WAV", mimetype: "audio/wav"},
		{ext: ".MP3", mimetype: "audio/mpeg"},
		{ext: ".MPEG", mimetype: "video/mpeg"},
		{ext: ".MP4", mimetype: "video/mp4"},
		{ext: ".WMV", mimetype: "video/x-ms-wmv"},
		{ext: ".ZIP", mimetype: "application/zip"},
		{ext: ".7Z", mimetype: "application/x-7z-compressed"}
		];
		for(let i=0; i<attMimeTypes.length; i++) {
			let re = new RegExp(attMimeTypes[i].ext + "$", "i");
			if(re.test(fn))
				return attMimeTypes[i].mimetype;
		}
		return "application/octet-stream";
	}
	
	let zip = new JSZip();
	zip.loadAsync(abData)
	.then(function(loadedzip) {
		//var i = 0;
		//loadedzip.forEach(function (relativePath, file){
		//	console.log("ZIP[" + (i++) + "]:", relativePath, file);
		//});
		theLogger.log("載入成功, 讀取文稿管理檔[DraftMgmt.xml]...");
		loadedzip.file("DraftMgmt.xml").async("string")
		.then(function(xmlstr) {
			let draftMgmt = (new DOMParser()).parseFromString(xmlstr, "text/xml");
			theLogger.log("載入成功", draftMgmt);
			let drafts = draftMgmt.documentElement.getElementsByTagName("文稿"),
				attachs = draftMgmt.documentElement.getElementsByTagName("附件"),
				mmerges = draftMgmt.documentElement.getElementsByTagName("對照表"),	// 1130809 Raymond 1130313 合併1111007(1100394), 修正未載入中打包在一起的對照表問題
				j=0;
			function doNewDraft(str, mmstr) {
				// 1130813 Raymond 1130313 共通版的newDraft(), 第5參數為preventFromOrg, keepAttNode為第6參數, mmstr為第7參數
				//fm.newDraft(str, undefined, undefined, undefined, true, mmstr).done(function(idx) {	// 第5參數keepAttNode設為true, 保留附件檔名節點, 第6參數為對照表
				fm.newDraft(str, undefined, undefined, undefined, undefined, true, mmstr).done(function(idx) {	// 第6參數keepAttNode設為true, 保留附件檔名節點, 第7參數為對照表
					if(++j == drafts.length) {	// 無下一筆文稿則更新頁籤
						fm.accquireDraftModel(idx, undefined, true)	// 第3參數設為true, 表示若有需要選擇套用樣版時, 要等到選完才會resolve
						.then(function(dm) {
							dm.updateAttachFiles();
						})
						.always(function() {
							if(!!fv)
								fv.updateDraftTags(idx);
							// 1140910 Raymond 退輔會序203 合併屏東序882, 新增判斷是否啟用附件匯出頁面設定, 是則在開啟ZIP檔新增完壓縮檔內所有文稿及附件後呼叫批次匯出附件頁面功能
							if(SSO_CONFIG.enableConvertAttPage && !!fv)
								fv.proceedRndrAtt();	// proceedRndrAtt()會在附件匯出頁面後更新頁籤
							else if(SSO_CONFIG.enableConvertAttPage)
								fm.paddingProceedRndrAtt = true;	// 若是用「創稿」頁籤的開啟舊檔載入ZIP檔, 則因FolioView尚未產生, 無法直接叫用proceedRndrAtt, 改用paddingProceedRndrAtt旗標標記等待FolioView新增後要直接叫用proceedRndrAtt
							if(!!dfd)
								dfd.resolve();
						});
					}
					else {	// 繼續匯入下一筆文稿
						fm.accquireDraftModel(idx, undefined, true)	// 第3參數設為true, 表示若有需要選擇套用樣版時, 要等到選完才會resolve
						.then(function(dm) {
							dm.updateAttachFiles();
						})
						.always(function() {
							setTimeout(doSingle, 1000);
						});
					}
				});
			}
			function doSingle() {
				// 1130813 Raymond 1130313 修改為開啟離線模式儲存的ZIP檔時, 優先載入有追蹤修訂的文稿檔
				//let fn = drafts[j].getAttribute("路徑");	// 匯入用完稿檔的路徑
				let fn = drafts[j].getAttribute("修訂檔路徑") || drafts[j].getAttribute("路徑");	// 匯入用完稿檔的路徑
				let arefs = drafts[j].getElementsByTagName("附件REF");
				// 1130809 Raymond 1130313 合併1111007(1100394), 修正未載入ZIP中打包在一起的對照表問題
				let mmrefs = drafts[j].getElementsByTagName("對照表REF");
				let mmfn = undefined;
				if(!!mmrefs && mmrefs.length > 0) {
					let mmid = mmrefs[0].getAttribute("ID");
					if(!!mmerges) {
						for(let x=0; x<mmerges.length; x++) {
							if(mmerges[0].getAttribute("ID") == mmid) {
								mmfn = mmerges[0].getAttribute("路徑");
								break;
							}
						}
					}
				}
				let atts = [];
				if(!!arefs && arefs.length > 0) {
					for(let k=0; k<arefs.length; k++) {
						let aid = arefs[k].getAttribute("ID");
						if(!!attachs) {
							for(let x=0; x<attachs.length; x++) {
								if(attachs[x].getAttribute("ID") == aid) {
									atts.push({nm: attachs[x].getAttribute("名稱"),
											fn: attachs[x].getAttribute("路徑"),
											desc: attachs[x].getAttribute("摘要"),
											guid: attachs[x].getAttribute("GUID")});
									break;
								}
							}
						}
					}
				}
				if(!!fn && fn.length > 0) {
					// 1130809 Raymond 1130313 合併1111007(1100394), 修正未載入ZIP中打包在一起的對照表問題
					if(!!mmfn && mmfn.length > 0) {
						theLogger.log("讀取對照檔[" + mmfn + "]...");
						loadedzip.file(mmfn).async("string")
						.then(doContinue);
					}
					else
						doContinue();
					function doContinue(mmstr) {
						if(!!mmstr)
							theLogger.log("讀取文稿檔[" + fn + "], 有對照表...");
						else
							theLogger.log("讀取文稿檔[" + fn + "]...");
						loadedzip.file(fn).async("string")
						.then(function(xmlstr2) {
							if(atts.length > 0) {	// 載入附件
								let draftdom = (new DOMParser()).parseFromString(xmlstr2, "text/xml");
								console.log("載入成功, 有附件", draftdom);
								let k = 0;
								function doNewAttach() {
									theLogger.log("讀取附件檔[" + atts[k].fn + "]...");
									loadedzip.file(atts[k].fn).async("arraybuffer")
									.then(function(ab) {
										theLogger.log("載入成功");
										let domatts = draftdom.documentElement.getElementsByTagName("附件檔名");
										let found = false;
										for(let x=0; x<domatts.length; x++) {
											if(domatts[x].textContent == atts[k].fn) {
												let mimeType = getMimeType(domatts[x].textContent);
												let blb = new Blob([ab], {type: mimeType});
												domatts[x].setAttribute("data-blob-name", URL.createObjectURL(blb));
												found = true;
												break;
											}
										}
										if(!found)
											theLogger.error("文稿XML檔中找不到GUID=" + atts[k].guid + "的附件檔名, 無法設定附件檔資料");
										if(++k == atts.length) {	// 無下一筆附件則繼續匯入下一筆文稿
											let xmlstr3 = Util.getXml(draftdom, false, "UTF-8");
											doNewDraft(xmlstr3, mmstr);
										}
										else	// 繼續匯入下一筆附件
											doNewAttach();
									})
									.catch(function(err) {
										theLogger.error(err.message);
										alert("指定開啟的ZIP檔中找不到附件電子檔[" + atts[k].fn + "], 無法載入此文稿");
									});
								}
								doNewAttach();
							}
							else {
								theLogger.log("載入成功, 無附件, 直接匯入文稿...");
								doNewDraft(xmlstr2, mmstr);
							}
						})
						.catch(function(err) {
							theLogger.error(err.message);
							alert("指定開啟的ZIP檔中找不到文稿檔[" + fn +  "], 無法載入此文稿");
							if(!!dfd)
								dfd.reject("指定開啟的ZIP檔中找不到文稿檔[" + fn +  "], 無法載入此文稿");
						});
					}
				}
			}
			if(drafts.length > 0)
				doSingle();
			else {
				alert("文稿管理檔中無任何文稿");
				if(!!dfd)
					dfd.resolve();
			}
		})
		.catch(function(err) {
			theLogger.error(err.message);
			alert("指定開啟的ZIP檔中找不到文稿管理檔[DraftMgmt.xml], 無法載入此公文");
			if(!!dfd)
				dfd.reject("指定開啟的ZIP檔中找不到文稿管理檔[DraftMgmt.xml], 無法載入此公文");
		});
	})
	.catch(function(err) {
		theLogger.error(err.message);
		alert("指定開啟的檔案非ZIP格式");
		if(!!dfd)
			dfd.reject("指定開啟的檔案非ZIP格式");
	});
};

// 1141022 Raymond 1141125 新增當機關暱稱為"TAITRA"(外貿)時, 提供匯入調派令CSV(多人)、晉升令CSV(多人)及獎勵令CSV(多人)的功能
if(SSO_CONFIG?.OrgNickName == "TAITRA") {
	// 共用函式:判斷是否可用
	function canMenuItemVisible(fm) {
		if(fm && fm.enableEdit())
			return true;
		return false;
	}
	// 共用函式:執行匯入檔案
	function doImportCSV(evt, fm, inpId, funcNm) {
		
		var $viewPort = evt.data;
		var $home = $("#aol");
		
		function reload(file, _fm) {
			var rdr = new FileReader();
			rdr.onload = function() {
				theLogger.log(this.result);
				theLogger.log(SSOUtil.typeOf(this.result));
				if(SSOUtil.typeOf(this.result) == "string") {
					_fm[funcNm](this.result).done(function(idx) {
						var fv = $viewPort.data("view");
						fv.updateDraftTags(idx);
					})
					.fail(function(errorText) {
						alert("開啟'" + file.name + "'失敗!\n\n錯誤訊息:\n" + errorText);
					});
				}
				else
					theLogger.error("檔案讀取後不是字串!!");
			}
			theLogger.log("以Big5編碼重新載入'" + file.name + "'(" + file.type + ", " + file.size + "bytes)");	// 1060919 Raymond 新增'以Big5編碼'
			rdr.readAsText(file, "Big5");
		}
		
		var $inp = $home.find("input#" + inpId);
		if($inp.length == 0)
			var $inp = $("<input id='" + inpId + "' type='file' accept='.csv' style='display:none;'>").appendTo($home).on('change', function(evnt) {
				var _fm = $(this).data("folioModel");	// 從data中讀出的folioModel才是當前對應的公文
				var msg = "";
				for(var i=0; i<this.files.length; i++) {
					msg += this.files[i].name + "(" + this.files[i].type + ", " + this.files[i].size + "Bytes)\r\n";
					var rdr = new FileReader();
					var that = this.files[i];
					rdr.onload = function() {
						theLogger.log(this.result);
						//theLogger.log(SSOUtil.typeOf(this.result));
						if(SSOUtil.typeOf(this.result) == "string") {
							theLogger.warn("偵測是否編碼錯誤...");
							// 偵測是否編碼錯誤
							if(this.result.charCodeAt(0) == 0xFFFD)	// 第一個字是Big5轉壞的字元, 則以Big5編碼重讀
								reload(that, _fm);
							else	// 沒有宣告encoding的XML或DI視為UTF-8或UTF-16可正常解讀的字串
								_fm[funcNm](this.result).done(function(idx) {
									var fv = $viewPort.data("view");
									fv.updateDraftTags(idx);
								})
								.fail(function(errorText) {
									alert("開啟'" + that.name + "'失敗!\n\n錯誤訊息:\n" + errorText);
								});
						}
						else
							theLogger.error("檔案讀取後不是字串! typeof result = '" + SSOUtil.typeOf(this.result) + "'");	// 新增typeof訊息
					}
					theLogger.log("載入'" + this.files[i].name + "'(" + this.files[i].type + ", " + this.files[i].size + "bytes)");
					rdr.readAsText(this.files[i]);
				}
			}).data("folioModel", fm).trigger('click');	// fm參數改用data()塞進$inp
		else {
			$inp.val("").data("folioModel", fm).trigger('click');	// fm參數改用data()塞進$inp
		}
	}
	// 匯入調派令CSV(多人)功能
	nsEditor.onImportTAITRACSVVisible = canMenuItemVisible;
	nsEditor.onImportTAITRACSV = function(evt, fm) {
		doImportCSV(evt, fm, "importTAITRACSV", "newTAITRACSVDraft");
	};
	// 匯入晉升令CSV(多人)功能
	nsEditor.onImportTAITRACSV2Visible = canMenuItemVisible;
	nsEditor.onImportTAITRACSV2 = function(evt, fm) {
		doImportCSV(evt, fm, "importTAITRACSV2", "newTAITRACSV2Draft");
	};
	// 匯入獎勵令CSV(多人)功能
	nsEditor.onImportTAITRACSV3Visible = canMenuItemVisible;
	nsEditor.onImportTAITRACSV3 = function(evt, fm) {
		doImportCSV(evt, fm, "importTAITRACSV3", "newTAITRACSV3Draft");
	};
}	// end of if(SSO_CONFIG?.OrgNickName == "TAITRA")

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-ImportFile.js").finish();
})();