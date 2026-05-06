// DIModelView class
//   
// 1130604	Eric		Raymond		1130291		
// 1140723	Kevin		Leslie		1141011		弱掃修正[Client DOM Stored XSS]，XML內容應無script
// 1140805	Eric		Raymond		退輔會序171	修正DI的<發文機關>是包<單位名>時, 套PrintXSL後不會顯示發文機關全銜的問題
// 1140925	Raymond		Raymond		中榮序239	修正當前右側公文若翻至第2以後頁次, 載入下一筆公文沒有那個頁次時會發生錯誤的問題

var theAOL = theAOL || {};
var tokenSelector = tokenSelector || {clearByChangeGuid: function() {}};

function DIModelView() {

	// private members
	var _rawXml;			// 讀入的文稿的XML DOM
	var _docType = "";		// 文別
	var _subDocType = "";	// 函(令)類別
	var _internalFO;		// 轉譯後的排版物件
	var _viewPort = undefined;
	var _currPo = {
		draftIdx: 0,	// 文稿序, 0-based, -1表示公文基資
		attIdx: -1,		// 附件序, 0-based, -1表示本文
		po: 0			// 第0頁
	};
	var _docObj = {};
	var _uploadInitialLog = true;	// 2016.2.24
	var _memPPD = {};
	var _keywords = undefined;
	
	// private methods
	// 2016.12.7 套用追蹤修訂結果轉成完稿XML, 1071023 Raymond 修正輸出文字/text()時過濾掉\t\r\n等因縮排產生的XML內容
	function transCmplXml(xml) {
		var res;
		var xslStr = '<?xml version="1.0" encoding="UTF-16"?>\
	<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">\
	<xsl:output method="xml" omit-xml-declaration="no" encoding="UTF-16" />\
	<xsl:template match="/ | @* | node()">\
		<xsl:choose>\
			<xsl:when test="name()=\'mi\'">\
				<xsl:choose>\
					<xsl:when test="name(..)=\'mi\'">\
						<xsl:apply-templates select=".."/>\
					</xsl:when>\
					<xsl:otherwise>\
						<xsl:if test="@act != \'del\'">\
							<xsl:value-of select="."/>\
						</xsl:if>\
					</xsl:otherwise>\
				</xsl:choose>\
			</xsl:when>\
			<xsl:when test="name()=\'fmt\'">\
				<xsl:choose>\
					<xsl:when test="name(..)=\'mi\'">\
						<xsl:apply-templates select=".."/>\
					</xsl:when>\
					<xsl:otherwise>\
						<xsl:value-of select="."/>\
					</xsl:otherwise>\
				</xsl:choose>\
			</xsl:when>\
			<xsl:when test="name()=\'函類別\'">\
				<xsl:element name="函類別">\
					<xsl:attribute name="代碼"><xsl:value-of select="@代碼"/></xsl:attribute>\
				</xsl:element>\
			</xsl:when>\
			<xsl:when test="name()=\'速別\'">\
				<xsl:element name="速別">\
					<xsl:attribute name="代碼"><xsl:value-of select="@代碼"/></xsl:attribute>\
				</xsl:element>\
			</xsl:when>\
			<xsl:when test="name()=\'space-before\'"/>\
			<xsl:when test="name()=\'space-after\'"/>\
			<xsl:when test="name()=\'space-start\'"/>\
			<xsl:when test="name()=\'space-end\'"/>\
			<xsl:when test="name()=\'line-height\'"/>\
			<xsl:when test="name()=\'padding-start\'"/>\
			<xsl:when test="name()=\'padding-end\'"/>\
			<xsl:when test="name()=\'font-family\'"/>\
			<xsl:when test="name()=\'font-size\'"/>\
			<xsl:when test="name()=\'alt-fontname\'"/>' +
			/* 1071224 Raymond 另存新檔及開啟舊檔都會執行到transCmplXml, 保留對齊父段落屬性, 以供開啟舊檔時保持對齊父段落狀態
			<xsl:when test="name()=\'AlignParentContext\'"/>\*/
			'<xsl:when test="name()=\'alignment\'"/>\
			<xsl:otherwise>\
				<xsl:choose>\
					<xsl:when test="name()=\'文字\'">\
						<文字><xsl:call-template name="conv文字"/></文字>\
					</xsl:when>\
					<xsl:otherwise>\
						<xsl:copy>\
							<xsl:apply-templates select="@* | node()"/>\
						</xsl:copy>\
					</xsl:otherwise>\
				</xsl:choose>\
			</xsl:otherwise>\
		</xsl:choose>\
	</xsl:template>\
	<xsl:template name="conv文字">\
		<xsl:for-each select=".//text()">\
			<xsl:choose>\
				<xsl:when test="name(..)=\'mi\'">\
					<xsl:apply-templates select=".."/>\
				</xsl:when>\
				<xsl:when test="name(..)=\'fmt\'">\
					<xsl:apply-templates select=".."/>\
				</xsl:when>\
				<xsl:otherwise><xsl:value-of select="translate(., \'&#x9;&#xD;&#xA;\', \'\')"/></xsl:otherwise>\
			</xsl:choose>\
		</xsl:for-each>\
	</xsl:template>\
</xsl:stylesheet>';
		var xsl = (new DOMParser()).parseFromString(xslStr, "text/xml");
		var xslt = new XSLTProcessor();
		xslt.importStylesheet(xsl);
		var ownerDocument = document.implementation.createDocument("", "", null);	// 2016.8.4 照MDN範例
		res = xslt.transformToDocument(xml, ownerDocument);
		if(!!res)	// 判斷轉換結果, 回傳null可能是PrintXSL有問題
			return res;
		else
			theLogger.error("套用完稿XSL(transfromToFragment)失敗!");
	}
	// 2016.12.26 匯入DI時的前置處理
	function preprocessDI(xmlDoc) {
		function wrapNode(nd, nm) {
			var newNode = xmlDoc.createElement(nm);
			nd.parentNode.insertBefore(newNode, nd);
			newNode.appendChild(nd);
			return newNode;
		}
		function addRcvr(xmlDoc, nd, issueType) {
			if(("text" in nd && nd.text.length == 0) || ("textContent" in nd && nd.textContent.length == 0)) {
				theLogger.warn("忽略匯入" + issueType + "受文者, 因為'" + nd.tagName + "'無內容");
			}
			else if(nd.tagName == "全銜") {
				var rcvr = xmlDoc.createElement("受文者");
				rcvr.setAttribute("本別", issueType);
				//rcvr.setAttribute("CreateSN", );
				//1070723 Raymond 1070532 新增附件說明
				rcvr.setAttribute("附件說明", "");
				
				var nd3 = xmlDoc.createElement("全銜");
				if("text" in nd3)
					nd3.text = nd.text;
				else
					nd3.textContent = nd.textContent;
				rcvr.appendChild(nd3);
				
				nd3 = xmlDoc.createElement("正式名稱");	// 2016.12.29 補上正式名稱
				if("text" in nd3)
					nd3.text = nd.text;
				else
					nd3.textContent = nd.textContent;
				rcvr.appendChild(nd3);
				
				rcvr.appendChild(xmlDoc.createElement("機關代碼"));
				rcvr.appendChild(xmlDoc.createElement("單位代碼"));
				rcvr.appendChild(xmlDoc.createElement("姓名"));
				rcvr.appendChild(xmlDoc.createElement("地址"));
				rcvr.appendChild(xmlDoc.createElement("郵遞區號"));
				rcvr.appendChild(xmlDoc.createElement("FEP交換代碼"));
				
				nd3 = xmlDoc.createElement("發文方式");
				if("text" in nd3)
					nd3.text = "郵寄";			// 2016.12.29 FDA複測時說一代匯入DI後是郵寄, 那就郵寄吧
				else
					nd3.textContent = "郵寄";	// 2016.12.29 FDA複測時說一代匯入DI後是郵寄, 那就郵寄吧
				rcvr.appendChild(nd3);
				
				nd3 = xmlDoc.createElement("含附件");
				if(issueType == "正本" || issueType == "主持人") {
					if("text" in nd3)
						nd3.text = "否";			// 2016.12.29 FDA複測時說一代匯入DI後是否, 那就否吧
					else
						nd3.textContent = "否";		// 2016.12.29 FDA複測時說一代匯入DI後是否, 那就否吧
				}
				else {
					if("text" in nd3)
						nd3.text = "否";
					else
						nd3.textContent = "否";
				}
				rcvr.appendChild(nd3);
				
				rcvr.appendChild(xmlDoc.createElement("櫃號"));
				rcvr.appendChild(xmlDoc.createElement("匣道"));
				rcvr.appendChild(xmlDoc.createElement("SYSID"));
				rcvr.appendChild(xmlDoc.createElement("Email"));
				rcvr.appendChild(xmlDoc.createElement("內部"));
				rcvr.appendChild(xmlDoc.createElement("海外單位"));
				rcvr.appendChild(xmlDoc.createElement("國別"));
				rcvr.appendChild(xmlDoc.createElement("郵寄地區"));
				
				ndList.appendChild(rcvr);
			}
			else if(nd.tagName == "單位名") {
				
			}
			else if(nd.tagName == "總稱") {
				
			}
		}
		// 1070628 Raymond 1070275 新增聯絡方式轉為承辦人資訊
		function addSndrDetail(str, $sndr) {
			function doAdd(k, fn, v, sndr) {
				theLogger.log("將" + k + "轉為" + fn);
				var nd = xmlDoc.createElement(fn);
				if("text" in nd)
					nd.text = v;
				else
					nd.textContent = v;
				sndr.append(nd);
			}
			var s = str.indexOf("：");
			if(s < 0)
				s = str.indexOf(":");
			if(s > 0) {
				var k = str.substr(0, s);
				var v = str.substr(s + 1);
				if(k == "聯絡人")
					doAdd(k, "承辦人", v, $sndr);
				else if(k == "聯絡電話")
					doAdd(k, k, v, $sndr);
				else if(k == "分機")
					doAdd(k, k, v, $sndr);
				else if(k == "傳真")
					doAdd(k, k, v, $sndr);
				else if(k == "電子信箱" || k.match(/Email/i))
					doAdd(k, "Email", v, $sndr);
				else
					theLogger.warn("無法識別'" + k + "'欄位名稱, 無法轉為發文機關明細資訊");
			}
		}
		
		// 1071025 Raymond 新增預處理開啟舊檔前, 先轉為無追蹤修訂標籤及\t\r\n字元的XML
		theLogger.log("預處理開啟舊檔轉成完稿XML...");
		var cleanXml = transCmplXml(xmlDoc);
		if(!!cleanXml) {
			theLogger.log("取代原檔的根節點");
			xmlDoc.replaceChild(cleanXml.documentElement, xmlDoc.documentElement);
		}
		else
			theLogger.error("失敗?");
		
		// 附件->附件列表
		var snapshot = xmlDoc.evaluate("/*/附件", xmlDoc, null, 7, null);
		if(snapshot.snapshotLength > 0) {
			theLogger.log("將附件轉為附件列表");
			var ndList = snapshot.snapshotItem(0).parentNode.insertBefore(xmlDoc.createElement("附件列表"), snapshot.snapshotItem(0));
			var snapshot2 = xmlDoc.evaluate("/*/附件/文字", xmlDoc, null, 7, null);
			if(snapshot2.snapshotLength > 0) {
				ndList.appendChild(snapshot2.snapshotItem(0));
			}
			ndList.parentNode.removeChild(snapshot.snapshotItem(0));
		}
		
		// 受文者->受文者列表
		snapshot = xmlDoc.evaluate("/*/受文者", xmlDoc, null, 7, null);
		if(snapshot.snapshotLength > 0) {
			theLogger.log("將正、副、抄本、主持人、出席、列席者轉為受文者列表");
			var ndList = snapshot.snapshotItem(0).parentNode.insertBefore(xmlDoc.createElement("受文者列表"), snapshot.snapshotItem(0));
			// 1130702 Raymond 1130291 保留DI中的<受文者>
			//var tx = xmlDoc.createElement("文字");
			//ndList.appendChild(tx);
			
			//var snapshot2 = xmlDoc.evaluate("/*/受文者/交換表", xmlDoc, null, 7, null);
			//if(snapshot2.snapshotLength > 0)
			//	tx.textContent = snapshot2.snapshotItem(0).textContent;
			//else {
			//	snapshot2 = xmlDoc.evaluate("/*/受文者/全銜", xmlDoc, null, 7, null);	// 2017.1.3 新增
			//	if(snapshot2.snapshotLength > 0)
			//		tx.textContent = snapshot2.snapshotItem(0).textContent;
			//}
			//ndList.parentNode.removeChild(snapshot.snapshotItem(0));
			
			function addIssueTypeRcvrs(issueType) {
				var snapshot3 = xmlDoc.evaluate("/*/" + issueType, xmlDoc, null, 7, null);
				if(snapshot3.snapshotLength > 0) {
					var nd3 = snapshot3.snapshotItem(0);
					for(var i=0; i<nd3.children.length; i++)
						addRcvr(xmlDoc, nd3.children[i], issueType);
					xmlDoc.documentElement.removeChild(nd3);
				}
			}
			// 正本
			addIssueTypeRcvrs("正本");
			// 副本
			addIssueTypeRcvrs("副本");
			// 抄本
			addIssueTypeRcvrs("抄本");
			// 主持人
			addIssueTypeRcvrs("主持人");
			// 出席者
			addIssueTypeRcvrs("出席者");
			// 列席者
			addIssueTypeRcvrs("列席者");
		}
		
		// 發文機關->發文機關列表
		snapshot = xmlDoc.evaluate("/*/發文機關", xmlDoc, null, 7, null);
		if(snapshot.snapshotLength > 0) {
			theLogger.log("將發文機關轉為發文機關列表");
			var ndList = wrapNode(snapshot.snapshotItem(0), "發文機關列表");
			
			// 1070628 Raymond 1070275 補匯入DI的地址、聯絡資訊
			var $sndr = $(ndList).find("發文機關");
			snapshot = xmlDoc.evaluate("/*/地址", xmlDoc, null, 7, null);
			if(snapshot.snapshotLength > 0) {
				theLogger.log("將地址轉為發文機關地址");
				var nd2 = xmlDoc.createElement("機關地址");
				nd2.textContent = snapshot.snapshotItem(0).textContent;
				$sndr.append(nd2);
			}
			snapshot = xmlDoc.evaluate("/*/聯絡方式", xmlDoc, null, 7, null);
			for(var i=0; i<snapshot.snapshotLength; i++) {
				addSndrDetail(snapshot.snapshotItem(i).textContent, $sndr);
			}
			
			// 1140805 Raymond 退輔會序171 修正DI的<發文機關>是包<單位名>時, 套PrintXSL後不會顯示發文機關全銜的問題
			snapshot = xmlDoc.evaluate("全銜", $sndr[0], null, 7, null);
			if(snapshot.snapshotLength == 0) {
				snapshot = xmlDoc.evaluate("單位名", $sndr[0], null, 7, null);
				if(snapshot.snapshotLength > 0) {
					theLogger.log("DI的<發文機關>無<全銜>有<單位名>, 將<單位名>轉成<全銜>");
					var nd2 = xmlDoc.createElement("全銜");
					nd2.textContent = snapshot.snapshotItem(0).textContent;
					$(snapshot.snapshotItem(0)).before(nd2).remove();
				}
				else
					theLogger.error("DI的<發文機關>無<全銜>亦無<單位名>, 無法取得發文機關名稱");
			}
		}
		
		// 開會時間->開會時間列表
		snapshot = xmlDoc.evaluate("/*/開會時間", xmlDoc, null, 7, null);
		if(snapshot.snapshotLength > 0) {
			theLogger.log("將開會時間轉為開會時間列表");
			var ndList = wrapNode(snapshot.snapshotItem(0), "開會時間列表");
		}
		
		// 簽, 新增敬陳
		if(xmlDoc.documentElement.tagName == "簽") {
			snapshot = xmlDoc.evaluate("/*/敬陳", xmlDoc, null, 7, null);
			if(snapshot.snapshotLength == 0) {
				theLogger.log("文別是簽, 新增敬陳");
				xmlDoc.documentElement.appendChild(xmlDoc.createElement("敬陳"));
			}
		}
		
		snapshot = xmlDoc.evaluate("/*/附件下載區設定/是否上傳至下載區", xmlDoc, null, 7, null);
		if(snapshot.snapshotLength > 0) {	// 清除附件文字及此欄位, 以觸發附件子視窗更新下載識別碼機制
			var nd = snapshot.snapshotItem(0);
			if(nd.textContent == "Y") {
				nd.textContent = "";
				snapshot = xmlDoc.evaluate("/*/附件列表/文字", xmlDoc, null, 7, null);
				if(snapshot.snapshotLength > 0)
					snapshot.snapshotItem(0).textContent = "";
			}
		}
		
		// dump
		theLogger.log(xmlDoc);
	}
	function doInit(dfd, that, shouldResetDraftName, waitUntilSelXSL) {
	
		_docType = _rawXml.documentElement.tagName;
		var sub = _rawXml.documentElement.getElementsByTagName("函類別")[0];	// 函類別 or 令類別, 2016.11.1 改成抓固定的函類別或令類別,
		if(sub == undefined)													// 因為舊的令, 可能沿用函類別的標籤而不是令類別
			sub = _rawXml.documentElement.getElementsByTagName("令類別")[0];
		if(sub != undefined)
			_subDocType = sub.getAttribute("代碼");
		theLogger.log("文別: " + _docType + ", 函(令)類別: " + _subDocType);
		
		// 2016.10.19 FIX for 未帶稿序問題
		var params = {
				/*"檢視模式": opts.applyTCMode || "3",
				"編輯階段序號": dm.getEditSN(),
				"稿": rsrcFile.category == "稿",
				"條碼": opts.printBarcode == true,
				"頁碼": opts.printPageNo == true,
				"預設字型": opts.printFont || "標楷體",
				"預設行高": opts.printLineHeight || "1.5",
				"自訂": opts.applyCustom == true,
				"稿序": _mgmt.getDraftName(_index),
				"檔名": opts.printDraftFileName?fm.getDraftFileName(draftIdx):""*/
				"正副抄本章": true
			};
		
		// 2022.5.26	Leslie[1101623]	Merge[1080654]配套功能, performance log
		if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- applyPrintXSLT() BEGIN...');
            window.tmBeginApplyPrintXSL = Date.now();
		}
		// 2014.10.22 - Raymond, 增加傳入原始匯出頁面所使用的PrintXSL全徑名(記錄在AOLProcessData.xml)
		// 套用完成後, 回傳值增加實際套用的遠端printXSL路徑及檔名
		applyPrintXSLT(_rawXml, _docType, _subDocType, getLayoutPrintXSL(_docType), params)
			.done(function(intermediateXml, printXSLdir, printXSLfileName, printXSLType) {	// 2016.8.1 新增多回傳樣版類型
				theLogger.log([printXSLdir, printXSLfileName, printXSLType]);
				theLogger.log(intermediateXml);
		
				// 2022.5.26	Leslie[1101623]	Merge[1080654]配套功能, performance log
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                    SSOUtil.dev_logTimeElapse('applyPrintXSLT()',  window.tmBeginApplyPrintXSL);
                    window.tmBeginApplyPrintXSL = null;
				}
				
				if(!!intermediateXml) {
					if(intermediateXml.childNodes.length == 1 && intermediateXml.childNodes[0].childNodes.length == 0) {	// 2017.3.21 新增套錯樣版檔時提示錯誤
						dfd.reject("套用樣版檔'" + printXSLfileName + "'產生無效內容");
					}
					else {
						_internalFO = theLayoutEng.transXmlFragToInternalFO(intermediateXml, that);
						theLogger.log(_internalFO);
						// 2022.5.26	Leslie[1101623]	Merge[1080654]配套功能, performance log
						if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                            theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- transXmlFragToInternalFO() END...');
                        }
						// 1140925 Raymond 中榮序239 修正當前右側公文若翻至第2以後頁次, 載入下一筆公文沒有那個頁次時會發生錯誤的問題
						if(_currPo.po > 0)
							_currPo.po = 0;
						if(!!_viewPort)	// 已init過則載入DI後直接refresh顯示
							_viewPort.find(".pages").flip("refresh");
						dfd.resolve(that);
					}
				}
				else {
					dfd.reject("套用樣版檔'" + printXSLfileName + "'產生無效內容(" + intermediateXml + ")");
				}
			})
			.fail(function(errorText) {
				dfd.reject(errorText);
			});
	}
	function getInternalFO() {
		var dfd = $.Deferred();
		if(!_internalFO) {
			var that = this;
			// 2016.10.19 FIX for 未帶稿序問題
			var params = {
					/*"檢視模式": opts.applyTCMode || "3",
					"編輯階段序號": dm.getEditSN(),
					"稿": rsrcFile.category == "稿",
					"條碼": opts.printBarcode == true,
					"頁碼": opts.printPageNo == true,
					"預設字型": opts.printFont || "標楷體",
					"預設行高": opts.printLineHeight || "1.5",
					"自訂": opts.applyCustom == true,
					"稿序": _mgmt.getDraftName(_index),
					"檔名": opts.printDraftFileName?fm.getDraftFileName(draftIdx):""*/
					"正副抄本章": true
				};
			applyPrintXSLT(_rawXml, _docType, _subDocType, getLayoutPrintXSL(_docType), params)
				.done(function(intermediateXml, printXSLdir, printXSLfileName, printXSLType) {	// 1080111 Raymond 補參數, 用於回寫套用樣版檔名
					theLogger.log(intermediateXml);
			
					if(intermediateXml != undefined) {
						// 1080111 Raymond, 新增檢查套錯樣版檔時處理
						if(intermediateXml.childNodes.length == 1 && intermediateXml.childNodes[0].childNodes.length == 0) {
							dfd.reject("套用樣版檔'" + printXSLfileName + "'產生無效內容");
						}
						else {
							_internalFO = theLayoutEng.transXmlFragToInternalFO(intermediateXml, that);
							theLogger.log(_internalFO);
							dfd.resolve(_internalFO);
						}
					}
					else {
						dfd.reject("套用'" + printXSLfileName + "'產生無效內容(" + intermediateXml + ")");
					}
				})
				.fail(function(errorText) {
					dfd.reject(errorText);
				});
		}
		else
			dfd.resolve(_internalFO);
		return dfd.promise();
	}
	
	function getLayoutPrintXSL(docType) {
		const map = {
			"令": "令(加電子公文字樣).xsl",
			"函": "函(加電子公文字樣).xsl",
			"公告": "公告(加電子公文字樣).xsl",
			"開會通知單": "開會通知單(加電子公文字樣).xsl",
			"會勘通知單": "會勘通知單(加電子公文字樣).xsl"};
		return map[docType];
	}
	
	function applyPrintXSLT(xmlDoc, docType, subDocType, origPrintXSL, options) {
		theLogger.log("applyPrintXSLT('" + docType + "', '" + subDocType + "', '" + origPrintXSL + "')");
		//theLogger.error(xmlDoc);	// 1080709 fix
		var dfd = $.Deferred(),
			url = "RcvLayout\\" + origPrintXSL,
			t0 = new Date();
		
		function dlLayoutRsrcFile(url) {
			var dfd2 = $.Deferred();
			$.ajax(url, {
				type: "GET",
				async: (options.async === false)? false : true,
				cache: true,
				/*headers: {
					"Cache-Control": "no-cache",
					"Content-Type": "text/xml; charset=utf-8",
				},*/
				//1120331	Leslie[1111455]	叫用WebFileIO增加帶上Cookie
				/*xhrFields: {withCredentials: true},
				beforeSend: function(jqXHR, settings) {
					//settings.crossDomain = true;
					//theLogger.debug(settings);
					//jqXHR.overrideMimeType('text/plain; charset=x-user-defined');
					jqXHR.overrideMimeType('application/dime; charset=x-user-defined');
				},*/
				success: function(data, statusText, jqXHR) {
					theLogger.log("$.ajax.GET('" + url + "') success! " + (new Date() - t0) + "ms elapsed");
					t0 = new Date();
					//theLogger.debug(jqXHR.getAllResponseHeaders());
					
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
							dfd2.reject(err.errNo + ": " + err.errMsg);
						}
						else {
							theLogger.log(data);
							dfd2.resolve(data);
						}
					}
					else {
						theLogger.error("不支援無法識別的Content-Type: '" + cntnType + "', data:");
						theLogger.log(data);
						dfd2.reject("不支援無法識別的Content-Type: '" + cntnType + "'");
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					theLogger.error("ajax.GET('" + url + "') Error! " + textStatus + ", " + errorThrown.message);
					theLogger.error(errorThrown);
					dfd2.reject(errorThrown.message, errorThrown);	// 2016.10.26 FIX for errorStatus
				}
			});
			return dfd2.promise();
		}
		dlLayoutRsrcFile(url)
			.done(function(xslDoc) {
				if(xslDoc != undefined) {
					theLogger.log("xsl, xml:");
					theLogger.log(xslDoc);
					theLogger.log(xmlDoc);
					function nsResolver(prefix) {
						switch (prefix) {
							case 'xsl':
								return 'http://www.w3.org/1999/XSL/Transform';
							case 'exsl':
								return 'http://exslt.org/common';
							default:
								return 'http://www.w3.org/1999/XSL/Transform';
						}
					}
					var v;
					if(options) {
						for(opt in options) {
							v = xslDoc.evaluate("xsl:variable[@name='" + opt + "']", xslDoc.documentElement, nsResolver, 7, null);
							if(v != null && v.snapshotLength > 0) {
								var paramNode = v.snapshotItem(0);
								paramNode.textContent = options[opt];
								theLogger.log("套用指定的排版參數[" + opt + "]: '" + paramNode.textContent + "'");
							}
						}
					}
					try {
						var xslt = new XSLTProcessor();
						xslt.importStylesheet(xslDoc);
						var res = xslt.transformToFragment(xmlDoc, document);
						if(res) {	// 2016.8.4 新增判斷轉換結果, 回傳null可能是PrintXSL有問題
							dfd.resolve(res);
						}
						else {
							dfd.reject("套用PrintXSL(transfromToFragment)失敗!");
						}
					}
					catch(e) {
						theLogger.error(e.stack || e.message);
						dfd.reject(e.message);
					}
				}
				else {
					theLogger.error("無法套用PrintXSL! xslDoc不存在");
					dfd.reject("無法套用PrintXSL! xslDoc不存在");
				}
			})
			.fail(function(errorText) {
				dfd.reject(errorText);
			});
		return dfd.promise();
	}
	
	// 結flip外掛叫用的介面
	var _flipping = false;	// 2015.5.12 新增表示正在翻頁的旗標
	var flipCtx = {
		flipping: function() {
			if(arguments.length)
				_flipping = arguments[0];
			else
				return _flipping;
		},
		hasPrevPage: function() {
			return (_currPo.draftIdx >= 0);
		},
		reqPage: function($pg, fallback) {	// 2015.12.29 新增翻頁失敗的回呼函式參數
			// 2022.5.26	Leslie[1101623]	Merge[1080654]配套功能, performance log
			if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- FolioView.reqPage()) BEGIN...');
            }

			// 翻頁時隱藏指令列
			var c = _viewPort.data("editCursor");
			if(c)
				c.cmdFloat.hide();
			var dfd = $.Deferred();
			if(!_rawXml) {
				dfd.reject("尚未載入DI檔");
				return dfd.promise();
			}
			//1110527 Kevin 1110075 新增顯示載入中
			SSOUtil.loading('show', {text:'載入中...', textVisible:true});
			if(_currPo.attIdx == -1) {  // 本文
				// 2016.1.27 因附件頁面會調整pages大小及tags位置, 切回文稿頁面時要調回A4
				$pg.closest(".pages").css("width", "").css("height", "");
				
				// 動態產生頁面
				var t0 = new Date();	// 1100909 Raymond 1101135 偵測initFO耗費時間
				getInternalFO()
					.done(function initFO(fo) {
						
						//theLayoutEng.instanciateFOPages(fO, opts, $pages, useCNSFont)
						//	.done(function(nfo, $pages) {
						//		theLogger.warn("所有文稿頁面已動態排版完成, 共" + nfo.pages + "頁, base = " + base + ", $pages.find('.pg').length = " + $pages.find(".pg").length);
						theLayoutEng.instanciateSOPages(fo, $pg, _memPPD, _currPo.po, _docObj, undefined, true, true)	// 新增傳入printMode參數
							.done(function(newFo, newPo) {  // 2013.10.17 - Raymond, 改用Deferred方式, 因分頁非同步
								
								// 1060614 Raymond 1060471 下載圖檔影像
								var $imgs = $pg.find("div.img");
								if($imgs.length > 0) {
									$imgs.each(function(idx, div) {
										var imgFullPath = $(div).attr("data-src");
										if(imgFullPath) {
											var p = imgFullPath.lastIndexOf("\\");
											var dirPath = imgFullPath.substr(0, p);
											var fileName = imgFullPath.substr(p + 1);
											$(div).find("img").attr("src", "RcvLayout\\" + fileName.replace("tif", "png"));
											$(div).removeAttr("data-src");
											if(fileName.match(/^Ediinchop/i))
												$(div).css("display", "inline");
										}
										else
											theLogger.error("圖檔物件路徑未設定");
									});
								}
								
								// 1100909 Raymond 1101135 若文稿內容有異動(機關客製化邏輯改變欄位(發文機關全銜)預設內容), 則立即重新整理
								theLogger.log("initFO花了 " + (new Date() - t0) + " ms");
								dfd.resolve();
							})
							.fail(function(errorText) {
								dfd.reject(errorText, fallback);	// 2015.12.29 新增傳入翻頁失敗時回呼函式參數
							});
					})
					.fail(function(errorText) {
						dfd.reject(errorText, fallback);	// 2015.12.29 新增傳入翻頁失敗時回呼函式參數
					});
			}
			return dfd.promise();
		},
		reqNextPage: function($pg) {
			if(_currPo.draftIdx >= 0 && _currPo.attIdx < 0 && (_currPo.po + 1) < _memPPD.pages) {
				++_currPo.po;   // 本文 or 附件的次頁
				return this.reqPage($pg, function() {	// 2015.12.29 新增翻頁失敗時恢復頁碼的函式
					theLogger.warn("翻次頁失敗, 頁碼-1");
					--_currPo.po;
				});
			}
			return $.Deferred().reject("已無次頁");	// 1061102 Raymond 1061078 typo
		},
		reqPrevPage: function($pg) {
			if(_currPo.po > 0) {
				--_currPo.po;
				return this.reqPage($pg, function() {	// 2015.12.29 新增翻頁失敗時恢復頁碼的函式
					theLogger.warn("翻前頁失敗, 頁碼+1");
					++_currPo.po;
				});
			}
			return $.Deferred().reject("已無前頁");	// 1061102 Raymond 1061078 typo
		},
		pageFlipped: function($pg, $pages) {   // flip外掛會呼叫這個callback function通知頁面已翻, 2016.1.27 新增$pages參數, 因公文基資會找不到.pg類型元素
			
			// 2016.2.24
			if(_uploadInitialLog) {
				// 2022.5.26	Leslie[1101623]	Merge[1080654]配套功能, 收集公文傳送效能時, 不在此時上傳log檔
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					theLogger.log(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 文稿初始化完畢 (FolioView.pageFlipped)...');
				}
				else {
					theLogger.log('Before Logger upload[文稿初始化完畢上傳]');
					AlternativeLogger.upload("文稿初始化完畢上傳");
				}
				_uploadInitialLog = false;
				
				var ih = $pages.closest(".doc_content").innerHeight();
				$pages.closest(".contentPane").height(ih + "px");
				$pages.find(".bkTag").remove();
			}
			if(!!_keywords)
				doHighlight(_keywords);
		},
		// 1120711 Raymond 1120443 新增是否顯示「上一筆公文」、「下一筆公文」按鈕
		nextEDocVisible: function() {
			return false;
		}
	}
	// 翻上一頁
	function onClickFlipLeft() {
		_viewPort.find(".pages").flip("swiperight");
	}
	// 翻下一頁
	function onClickFlipRight() {
		_viewPort.find(".pages").flip("swipeleft");
	}
	
	// 縮放控制
	var _zoomSelect = undefined,
		_zoomMode = 100,
		_currScale = 100,
		_origWidth = 0,
		_origHeight = 0;
	var maxScale = 400, minScale = 50;
	function onChangeFitMode() {
		var to = $(this).val(); // 2013.9.13 - Raymond, 暫存變數
		theLogger.log("onChangeFitMode(" + this.id + "): " + to);
		switch(to) {
			case "0":	// 符合視窗
				if(_viewPort != undefined) {
					var scaleTo = 50;
					// 2016.2.26 以目前的Dimension計算符合視窗的放大比例
					var cw = _viewPort[0].parentNode.clientWidth,
						ch = _viewPort[0].parentNode.clientHeight;
					var sx = cw / _origWidth,
						sy = ch / _origHeight;
					//alert([cw, ch, sx, sy]);
					scaleTo = Math.floor(Math.min(sx, sy) * 100);
					
					_viewPort.css({"-webkit-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
									  "-moz-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
									   "-ms-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
										   "transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)"});
					_currScale = scaleTo;
					// 2015.6.5 縮小時scrollLeft、Top要歸0, 否則可能縮小到可視範圍外
					_viewPort[0].parentNode.scrollLeft = 0;
					_viewPort[0].parentNode.scrollTop = 0;
					// 2015.11.24 - fix, 先2指放大再選單切回符合視窗時scroll range還是放大時的狀態, 重設一次寬度來更新scroll range
					// 2016.2.26 - 配合scaleTo重新計算, 寬高調整也要重新計算
					_viewPort.width(Math.floor(_origWidth*scaleTo/100) + "px")
							 .height(Math.floor(_origHeight*scaleTo/100) + "px");
				}
				break;
			case "-1":	// 符合寬度
				if(_viewPort != undefined) {
					var scaleTo = 90;
					// 2016.2.26 以目前的Dimension計算符合視窗的放大比例
					var cw = _viewPort[0].parentNode.clientWidth;
					scaleTo = Math.floor((cw / _origWidth) * 100);
					//alert([cw, that.origWidth, scaleTo]);
					
					_viewPort.css({"-webkit-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
									  "-moz-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
									   "-ms-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
										   "transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)"});
					_currScale = scaleTo;
					// 2015.6.5 縮小時scrollLeft、Top要歸0, 否則可能縮小到可視範圍外
					_viewPort[0].parentNode.scrollLeft = 0;
					_viewPort[0].parentNode.scrollTop = 0;
					// 2015.11.24 - fix, 先2指放大再選單切回符合寬度時scroll range還是放大時的狀態, 重設一次寬度來更新scroll range
					// 2016.2.26 - 配合scaleTo重新計算, 寬高調整也要重新計算
					if(_viewPort.width() == _origWidth)
						_viewPort.width((_origWidth+1) + "px")
								.height((_origHeight+1) + "px");
					else
						_viewPort.width(_origWidth + "px")
								.height(_origHeight + "px");
				}
				break;
			case "-2":	// 原尺寸
				if(_viewPort != undefined) {
					var scaleTo = 100;
					_viewPort.css({"-webkit-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
									  "-moz-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
									   "-ms-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
										   "transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)"});
					_currScale = scaleTo;
					// 2015.6.5 縮小時scrollLeft、Top要歸0, 否則可能縮小到可視範圍外
					_viewPort[0].parentNode.scrollLeft = 0;
					_viewPort[0].parentNode.scrollTop = 0;
					// 2015.11.24 - fix, 先2指放大再選單切回原尺寸時scroll range還是放大時的狀態, 重設一次寬度來更新scroll range
					if(_viewPort.width() == _origWidth)
						_viewPort.width((_origWidth+1) + "px")
								.height((_origHeight+1) + "px");
					else
						_viewPort.width(_origWidth + "px")
								.height(_origHeight + "px");
				}
				break;
			default:    // 2013.9.13 - Raymond, 修正選取第1筆時應套用val()所回傳的百分比
				if(_viewPort != undefined) {
					var scaleTo = Number(to);
					_viewPort.css({"-webkit-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
									  "-moz-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
									   "-ms-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
										   "transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)"});
					_currScale = scaleTo;
					// 2015.6.5 - fix, width/height不異動的話, scroll range貎似不會更新
					if(_viewPort.width() == _origWidth)
						_viewPort.width(Math.floor(_origWidth+1) + "px")
								.height(Math.floor(_origHeight+1) + "px");
					else
						_viewPort.width(Math.floor(_origWidth) + "px")
								.height(Math.floor(_origHeight) + "px");
				}
				break;
		}
	}
	// 縮小
	function onZoomOut() {
		if(_currScale <= minScale)
			return;
		var scaleTo = _currScale - 10;
		if(_zoomMode <= 0)
			theLogger.log("onZoomOut: " + _currScale + "->" + scaleTo + " mode:" + _zoomMode);
		else
			theLogger.log("onZoomOut: " + _currScale + "->" + scaleTo);
		_viewPort.css({"-webkit-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
						  "-moz-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
						   "-ms-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
							   "transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)"});
		_currScale = scaleTo;
		_zoomSelect.find("option:first").val(_currScale).text(_currScale + "%");
		_zoomSelect[0].selectedIndex = 0;
		if(_currScale < 100) {
			_viewPort.width(Math.floor(_origWidth*_currScale/100) + "px")
					.height(Math.floor(_origHeight*_currScale/100) + "px");
		}
		else if(_viewPort.width() == _origWidth)
			_viewPort.width(Math.floor(_origWidth+1) + "px")
					.height(Math.floor(_origHeight+1) + "px");
		else
			_viewPort.width(Math.floor(_origWidth) + "px")
					.height(Math.floor(_origHeight) + "px");
	}
	// 放大
	function onZoomIn() {
		if(_currScale >= maxScale)
			return;
		var scaleTo = _currScale + 10;
		if(_zoomMode <= 0)
			theLogger.log("onZoomIn: " + _currScale + "->" + scaleTo + " mode:" + _zoomMode);
		else
			theLogger.log("onZoomIn: " + _currScale + "->" + scaleTo);
		
		_viewPort.css({"-webkit-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
						  "-moz-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
						   "-ms-transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)",
							   "transform": "scale(" + (scaleTo / 100) + ") translate(0px, 0px)"});
		
		_currScale = scaleTo;
		_zoomSelect.find("option:first").val(_currScale).text(_currScale + "%");
		_zoomSelect[0].selectedIndex = 0;
		if(_currScale < 100) {
			_viewPort.width(Math.floor(_origWidth*_currScale/100) + "px")
					.height(Math.floor(_origHeight*_currScale/100) + "px");
		}
		else if(_viewPort.width() == _origWidth)
			_viewPort.width(Math.floor(_origWidth+1) + "px")
					.height(Math.floor(_origHeight+1) + "px");
		else
			_viewPort.width(Math.floor(_origWidth) + "px")
					.height(Math.floor(_origHeight) + "px");
	}
	// 標記關鍵字
	function doHighlight(keywords) {
		if(!_viewPort)
			return;
		function sortFunc(a, b) {
			return b.ofs - a.ofs;	// 倒序
		}
		//var re = (Array.isArray(keywords))?new RegExp(keywords.join("|"), "g"):new RegExp(keywords, "g");
		var re;
		if(Array.isArray(keywords)) {
			re = [];
			for(var i=0; i<keywords.length; i++) {
				if(keywords[i].length > 0)
					re.push(new RegExp(keywords[i], "g"));
			}
		}
		else
			re = new RegExp(keywords, "g");
		var mm = [];
		function overlapped(ar, key, ofs) {
			for(var k=0; k<ar.length; k++) {
				if((ofs == ar[k].ofs) ||
					(ofs < ar[k].ofs && (ofs + key.length) > ar[k].ofs) ||
					(ofs > ar[k].ofs && ofs < (ar[k].ofs + ar[k].len))) {
					console.log("'" + key + "'(" + ofs + "ℓ" + key.length + ")與之前的關鍵字'" + ar[k].words + "'(" + ar[k].ofs + "ℓ" + ar[k].len + ")重疊, 忽略之");
					return true;
				}
			}
			return false;
		}
		function doFilter(nd) {
			if(nd.nodeType == 1 && nd.childNodes.length > 0) {
				for(var i=0; i<nd.childNodes.length; i++) {
					arguments.callee.call(this, nd.childNodes[i]);
				}
			}
			else if(nd.nodeType == 3 && nd.textContent.length > 0 && (nd.parentNode.tagName != "SPAN" || nd.parentNode.className != "highlight_keyword")) {
				console.log(nd.textContent);
				if(Array.isArray(re)) {
					var ar = [];
					for(var i=0; i<re.length; i++) {
						var ma = [...nd.textContent.matchAll(re[i])];
						if(ma.length > 0) {
							console.warn(ma);
							for(var j=0; j<ma.length; j++) {
								var key = ma[j][0];
								var ofs = ma[j].index;
								if(!overlapped(ar, key, ofs))
									ar.push({nd: nd, ofs: ofs, len: key.length, words: key});
							}
						}
					}
					ar.sort(sortFunc);
					mm = mm.concat(ar);
				}
				else {
					var ma = [...nd.textContent.matchAll(re)];
					if(ma.length > 0) {
						console.warn(ma);
						var ar = [];
						for(var j=0; j<ma.length; j++) {
							var key = ma[j][0];
							var ofs = ma[j].index;
							ar.push({nd: nd, ofs: ofs, len: key.length});
						}
						ar.sort(sortFunc);
						mm = mm.concat(ar);
					}
				}
			}
		}
		var $flow = _viewPort.find(".pg div[name='flow']");
		$flow.find("div.para").each(function(idx, pa) {
			doFilter(pa);
		});
		var rng = document.createRange();
		for(var i=0; i<mm.length; i++) {
			rng.setStart(mm[i].nd, mm[i].ofs);
			rng.setEnd(mm[i].nd, mm[i].ofs + mm[i].len);
			var hl = document.createElement("span");
			hl.className = "highlight_keyword";
			rng.surroundContents(hl);
		}
	}
	
	// public interface
	return {
		// public methods
		getDocType: function() {
			return _docType;
		},
		getSubDocType: function() {
			return _subDocType;
		},
		init: function($viewPort, $zoomSelect, $zoomOut, $zoomIn) {
			_viewPort = $viewPort;
			_viewPort.find(".pages").flip({ctx: flipCtx});
			_viewPort.closest("#iso").find("a.btnFlipLeft").on('click', onClickFlipLeft).show();
			_viewPort.closest("#iso").find("a.btnFlipRight").on('click', onClickFlipRight).show();
			
			_origWidth = _viewPort.children().eq(0).width();
			_origHeight = _viewPort.children().eq(0).height();
			theLogger.log("DIModelView.init(viewPort:" + _origWidth + " X " + _origHeight + ")");
			_zoomSelect = $zoomSelect;
			_zoomSelect.on("change", onChangeFitMode);
			$zoomOut.on("click", onZoomOut);
			$zoomIn.on("click", onZoomIn);
		},
		load: function(fileIOWS, dirPath, diFileName) {
			theLogger.log("DIModalView.load(fileIOWS:" + fileIOWS + ", dirPath:" + dirPath + ",diFileName:" + diFileName + ")");
			var that = this;
			var dfd = $.Deferred();
			// 2016.2.2 改用dirPath切出子目錄名稱加.文稿檔名作為暫存檔名
			var l = dirPath.lastIndexOf('\\');
			if(l < 0)
				dfd.reject("傳入的應下載子目錄路徑未包含'\\', 應是不合法的路徑名");
			else {
				theLogger.log("下載文稿檔:'" + dirPath + "\\" + diFileName + "'");
				
				// 2022.5.26	Leslie[1101623]	Merge[1080654]配套功能, performance log
				if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
					theLogger.time(SSOUtil.dev_getCurrentTimeStr() + ' -tm- 下載文稿檔 BEGIN...');
					window.tmBeginDownloadDraft = Date.now();
				}
				
				var wfio = new WebFileIO(fileIOWS, localStorage['latest_login_userid']);
				wfio.download(dirPath, diFileName, {	// 下載DI檔
					allowMSXML: true,				// 2016.5.17 新增允許回傳MSXML物件
					success: function(fil, res) {
						if(fil.big5XML) {
							var rdr = new FileReader();
							rdr.onload = function() {
								theLogger.log(this.result);
								theLogger.log(SSOUtil.typeOf(this.result));
								if(SSOUtil.typeOf(this.result) == "string") {
									var res = (new DOMParser()).parseFromString(this.result, "text/xml");
									theLogger.log(res);
									_rawXml = res;
									preprocessDI(_rawXml);
									afterLoadDraft();
								}
								else
									theLogger.error("檔案讀取後不是字串!!");
							}
							theLogger.log("以Big5編碼重新載入'" + fil.file.name + "'(" + fil.file.type + ", " + fil.file.size + "bytes)");	// 1060919 Raymond 新增'以Big5編碼'
							rdr.readAsText(fil.file, "Big5");
						}
						else {
							_rawXml = fil;
							preprocessDI(_rawXml);
							afterLoadDraft();	// 一般XML在download後即為XML Document, 直接同步執行後續作業
						}
						// 1070612 Raymond 載入XML或DI後續部分切為一個function, 供同步或非同步前置處理完成後再執行
						function afterLoadDraft() {
							try {	// for IE-compatible, IE在沒開F12的情況下log MSXML2.XMLDOMNode會丟出「物件不支援此屬性或方法」的Exception
								theLogger.log(_rawXml);
							}
							catch(e) {
								theLogger.error("dump rawXml fail! - " + e.message);
							}
							
							// 2022.5.26	Leslie[1101623]	Merge[1080654]配套功能, performance log
							if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                                SSOUtil.dev_logTimeElapse('下載文稿檔作業',  window.tmBeginDownloadDraft);
                                window.tmBeginDownloadDraft = null;
                            }
							
							doInit(dfd, that);
						}
					},
					error: function(errorText) {
						dfd.reject(errorText);
					}
				});
			}
			return dfd.promise();
		},
		
		accquireXml: function() {
			return _rawXml;
		},
		
		highlight: function(keywords) {
			if(keywords.match(/;/g))
				_keywords = keywords.split(";");
			else
				_keywords = keywords;
			_viewPort.find(".pages").flip("refresh");
		}
	};
};	// end of DIModelView

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-DIModelView.js").finish();
})();