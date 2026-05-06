// 公文指令列功能模組
//	掛在nsEditor命名空間下
//	2016.11.2 新增
// DATE		SA			PRG			MGR_NO		DESC
// 1060821	Raymond		Raymond		1060703		新增簽核物件檢視窗格選單項目及功能
// 1061023	Raymond		Raymond		1060844		新增判斷有沒有RE_SIGN, 沒有的話(用DocView開的)則不顯示"回閱"項目
// 1061023	Raymond		Raymond		1060952		配合參照窗格也要提供檢視簽核物件清單功能, 修正控制各別窗格的#signObjDocked面板
// 1061026	Raymond		Raymond		1061053		修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
// 1061213	Raymond		Raymond		1061211		複製所有稿件轉換為完稿結果的XML
// 1070312	Raymond		Raymond		1061177		修正參照公文的附件沒有GUID屬性時, 改用ID比對, 以免點擊簽核物件檢閱窗格的物件位於附件頁面上時, 比對undefined=undefined而錯誤將attIdx一直抓成第0筆的問題
// 1071108	David		David		1071085		新增航港局MTNET系統整合處理，刪除草稿時呼叫介接WS
// 1080923  Kevin       Eric        1080339     jQuery 3.0 upgrade
// 1081218	Raymond		Raymond		-------		修正文字意見的XSS漏洞, 並轉換文字意見的<br>為折行字元, 以符合未修正漏洞前的顯示行為
// 1090407	Raymond		Raymond		1090178		修正複製文稿時, 比照開啟舊檔保留附件文字
// 1090515	Raymond		Raymond		1090347		複製所有稿件時, 記錄複製文稿中「簽稿會核單」的數量, 貼上稿件(新增)時判斷若是複製文稿中「簽稿會核單」已有1筆以上, 則新增文稿時不要再因會辦單位數量符合條件而自動產生簽稿會核單, 避免產生多餘的簽稿會核單
// 1090714	David		Joe			CDC序70		修正開啟ODI260傳入網址參數錯誤的問題
// 1090916	Raymond		Raymond		1090546		信保基金特殊模式公文不提供自訂稿序功能
// 1091116	David		Leslie		1090801		信保基金提供開啟EDT232匯入功能
// 1100303	Raymond		Raymond		1100092		比照點擊文稿頁籤及翻頁限制, 紙本公文不允許編輯內文時, 亦不可複製所有稿件
// 1100512	Raymond		Raymond		1090821		新增判斷若是具有單層式文稿頁面的封裝檔, 則忽略顯示外機關流程點的簽核物件(因為也沒有簽核物件)
// 1100715	Raymond		Raymond		1100854		新增[高大客製化]簽核物件檢閱窗格的日期時間顯示到秒功能
// 1101101	Raymond		Raymond		1100991		修正弱掃Client Potential XSS
// 1111021	Raymond		Raymond		1110885		新增匯入銓敘系統(TA)文稿、(發文)附件/參考附件功能
// 1111103	Raymond		Raymond		1110885		修正判斷是線上簽核才處理參考附件, 及只有一筆文稿或一筆附件時, 不會匯入的問題
// 1111124	David		Raymond		1110881		新增校正報送案別功能
// 1111221	David		David		1110881		(銓敘部問題彙整表序62)調整校正報送案別功能
// 1120109	Raymond		Raymond		銓敘部序93	修正匯入銓敘文稿後的本文及參考附件, 可於瀏覽器直接開啟的附件類型無MIME type, 導致無法直接開啟的問題
// 1120118	David		David		銓敘部序112	調整匯入TA文稿附件功能使用判斷
// 1120407	David		Raymond		銓敘部序209	1110885衍生需求, FolioModel.newDraft新增第5參數preventFromOrg, 匯入銓敘文稿一律傳入true表示不要預帶來文機關為正本受文者及承辦單位為抄本受文者
// 1130426	Raymond		Raymond		中榮序97	新增類似一代的雙螢幕模式的「另開附件視窗」功能, 以唯讀模式開啟同一筆公文在另一個子視窗
// 1130502	Raymond		Raymond		中榮序97	新增非草稿才可啟用類似一代雙螢幕模式的「另開附件視窗」功能
// 1130514	Leslie		Leslie		中榮序106	公文製作頁面功能選單，位置調整需求
// 1130809	Raymond		Raymond		1130313		合併1111007(1100394), 離線模式下不提供刪除本件公文選單按鈕功能
// 1131216	Raymond		Raymond		1131064		新增環境變數「WE_ALLOW_VIEW_READONLY_PAPER_DOC_FOLDER」, 當目前資料夾符合設定值時, 允許禁止編輯內文的紙本公文, 可以複製所有稿件
// 1140505	Kevin		Leslie		1140556		取消網址參數權杖
// 1140722	David		Leslie		1140808		新增選單「公文續管」可開啟EDT411
// 1140723	Kevin		Leslie		1141011		弱掃修正[Client DOM XSS]

var nsEditor = nsEditor||{};

//1101101 Raymond 1100991 弱掃XSS修正
function HtmlEncode(s) {
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(s));
	return div.innerHTML;
}

// 2016.12.15 補陳(鐵工局客製功能)
nsEditor.onSetReapplyVisible = function(fm) {
	// 1130814 Raymond 1130313 離線模式下不提供"補陳"選單按鈕功能
	if(!!theSSO && theSSO.offlineMode == true)
		return false;
	if(SSO_CONFIG.OrgNickName == "RRB") {
		var ownOuID = Number(fm.getDocObj().get("ODWMSG", "OWN_OU_ID").substr(0, 2));
		if(ownOuID >= 95 && ownOuID <= 98) {
			var val = fm.getDocObj().get("ODWDCM", "SET_REAPPLY_OUID");
			if(val == ownOuID || val == "")
				return true;	// 可異動
			return 2;	// 不可異動
		}
	}
	return false;
}

nsEditor.onSetReapplyState = function(fm) {
	var val = fm.getDocObj().get("ODWDCM", "SET_REAPPLY_OUID");
	return typeof val === "string" && val.length > 0;
}

nsEditor.onSetReapply = function(event, fm, checked) {
	if(checked) {
		theLogger.log("勾選補陳, 設定補陳(ODWDCM.SET_REAPPLY_OUID)為" + fm.getDocObj().get("ODWMSG", "OWN_OU_ID").substr(0, 2));
		fm.getDocObj().set2("aol", "ODWDCM", {"SET_REAPPLY_OUID": fm.getDocObj().get("ODWMSG", "OWN_OU_ID").substr(0, 2)});
	}
	else {
		theLogger.log("取消勾選補陳, 設定補陳(ODWDCM.SET_REAPPLY_OUID)為空字串");
		fm.getDocObj().set2("aol", "ODWDCM", {"SET_REAPPLY_OUID": ""});
	}
}

// 回閱
nsEditor.onReqReviewVisible = function(fm) {
	//return fm.getSignType() == "E";	// 2016.11.23 fix 線上簽核才有回閱
	return fm.getSignType() == "E" && typeof fm.getDocObj().get("ODWMSG", "RE_SIGN") === "string";	// 1061023 Raymond 1060844 新增判斷有沒有RE_SIGN, 沒有的話(用DocView開的)則不顯示
}

nsEditor.onReqReviewState = function(fm) {
	var bReSign = fm.getDocObj().get("ODWMSG", "RE_SIGN");
	return bReSign == "Y";
}

nsEditor.onReqReview = function(event, fm, checked) {
	theLogger.log("設定回閱(ODWMSG.RE_RESIGN)為" + (checked?"Y":"N"));
	fm.getDocObj().set2("aol", "ODWMSG", {"RE_SIGN": checked?"Y":"N"});
}

// 複製所有稿件
nsEditor.onCopyAllVisible = function(fm) {
	// 1131216 Raymond 1131064 新增環境變數「WE_ALLOW_VIEW_READONLY_PAPER_DOC_FOLDER」, 當目前資料夾符合設定值時, 允許禁止編輯內文的紙本公文, 可以複製所有稿件
	// 1100303 Raymond 1100092 比照點擊文稿頁籤及翻頁限制, 紙本公文不允許編輯內文時, 亦不可複製所有稿件
	//if(fm.getDocObj().signType == "P" && !fm.enableEdit()) {	// 卡紙本不允許編輯內文的流程點不可以看文稿
	var allowViewReadOnlyPaperDocFolder = theSSO.User.EnvSettings.get("WE_ALLOW_VIEW_READONLY_PAPER_DOC_FOLDER").split(";");
	var thisFolder = fm.getDocObj().folder + "-" + fm.getDocObj().subfolder;
	var allowViewReadOnlyPaperDoc = allowViewReadOnlyPaperDocFolder.indexOf(thisFolder) >= 0;
	if(fm.getDocObj().signType == "P" && !fm.enableEdit() && !allowViewReadOnlyPaperDoc) {	// 卡紙本不允許編輯內文的流程點不可以看文稿
		theLogger.warn("此流程點不允許編輯紙本公文內文, 禁用複製所有稿件");
		return false;
	}
	// 1090916 Raymond 1090564 信保特殊模式公文不提供此功能
	if(fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
		return false;
	return true;
}

nsEditor.onCopyAll = function(event, fm) {
	// 1090515 Raymond 1090347 新增con表示全複製文稿中「簽稿會核單」的數量, 供貼上稿件(新增)時判斷若是已有簽稿會核單則避免再自動產生簽稿會核單
	// 清除原來複製的文稿
	//var info = ("copy_info" in localStorage)?JSON.parse(localStorage["copy_info"]):{count: 0};
	var info = ("copy_info" in localStorage)?JSON.parse(localStorage["copy_info"]):{count: 0, con: 0};
	for(var i=0; i<info.count; i++) {
		var nm = info["draft" + i];
		if(nm.length > 0 && nm in localStorage) {
			theLogger.log("清除前次複製的'" + nm + "'");
			localStorage.removeItem(nm);
		}
		delete info["draft" + i];
	}
	info.count = 0;
	
	var deferreds = [];
	var n = fm.getDraftCounts();
	for(var i=0; i<n; i++) {
		if(fm.isFromDoc(i) > 0) {
			theLogger.log("第" + i + "筆文稿是來文, 不複製");
		}
		else {
			deferreds.push(fm.accquireDraftModel(i, i)
			.done(function(dm, idx) {
				var doc = dm.accquireXml();
				theLogger.log(doc.xml || doc);
				// 1061213 Raymond 1061211 新增轉換為完稿結果的XML
				if("transCmplXml" in nsEditor) {
					doc = nsEditor.transCmplXml(doc);
				}
				var str = Util.getXml(doc);
				if("ActiveXObject" in window) {
					doc = new ActiveXObject("MSXML2.DOMDocument");
					doc.resolveExternals = false;
					doc.validateOnParse = false;
					doc.preserveWhiteSpace = true;	// 1061026 Raymond 1061053 修正IE開啟追蹤修訂有半形空白的文稿時, 空白字元不見的問題
					if(!doc.loadXML(str)) {
						var pe = doc.parseError;
						theLogger.error("載入XML失敗! " + pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
					}
				}
				else {
					doc = (new DOMParser()).parseFromString(str, "text/xml");
				}
				// 複製文稿額外處理
				$(doc.documentElement).find("附件檔名").remove();
				/* 1090407 Raymond 1090178 複製貼上文稿不要清除附件文字
				if($(doc.documentElement).find("附件列表").find("文字").length) {
					var nd = $(doc.documentElement).find("附件列表").find("文字").get(0);
					if("text" in nd)
						nd.text = "";
					else
						nd.textContent = "";
				}*/
				// 2016.11.21 清除發文日期、字號
				if($(doc.documentElement).find("發文日期").find("年月日").length) {
					var nd = $(doc.documentElement).find("發文日期").find("年月日").get(0);
					if("text" in nd)
						nd.text = "";
					else
						nd.textContent = "";
				}
				if($(doc.documentElement).find("發文字號").length) {
					if($(doc.documentElement).find("發文字號").find("字").length) {
						var nd = $(doc.documentElement).find("發文字號").find("字").get(0);
						if("text" in nd)
							nd.text = "";
						else
							nd.textContent = "";
					}
					if($(doc.documentElement).find("發文字號").find("文號").find("年度").length) {
						var nd = $(doc.documentElement).find("發文字號").find("文號").find("年度").get(0);
						if("text" in nd)
							nd.text = "";
						else
							nd.textContent = "";
					}
					if($(doc.documentElement).find("發文字號").find("文號").find("流水號").length) {
						var nd = $(doc.documentElement).find("發文字號").find("文號").find("流水號").get(0);
						if("text" in nd)
							nd.text = "";
						else
							nd.textContent = "";
					}
					if($(doc.documentElement).find("發文字號").find("文號").find("支號").length) {
						var nd = $(doc.documentElement).find("發文字號").find("文號").find("支號").get(0);
						if("text" in nd)
							nd.text = "";
						else
							nd.textContent = "";
					}
				}
				// 2016.11.28 FDA要求清除決行層次、分層負責代碼
				if($(doc.documentElement).find("決行層次").length) {
					var nd = $(doc.documentElement).find("決行層次").get(0);
					if("text" in nd)
						nd.text = "";
					else
						nd.textContent = "";
					if(("hasAttribute" in nd && nd.hasAttribute("決行層級")) ||		// Chrome
						nd.getAttribute("決行層級") != null)						// IE
						nd.setAttribute("決行層級", "　");
				}
				if($(doc.documentElement).find("分層負責代碼").length) {
					var nd = $(doc.documentElement).find("分層負責代碼").get(0);
					if("text" in nd)
						nd.text = "";
					else
						nd.textContent = "";
				}
				str = Util.getXml(doc);
				theLogger.log(str);
				if(idx == 0) {	// 第1個文稿重複使用單筆複製的ID
					theLogger.log("複製第" + idx + "個文稿到'copy_draft'");
					localStorage["copy_draft"] = str;
					info["draft" + idx] = "copy_draft";
				}
				else {
					theLogger.log("複製第" + idx + "個文稿到'copy_draft_" + idx + "'");
					localStorage["copy_draft_" + idx] = str;	// 2016.12.28 bugfix
					info["draft" + idx] = "copy_draft_" + idx;
				}
				info.count++;
				// 1090515 Raymond 1090347 檢查複製文稿若是「簽稿會核單」, 則遞增con數量, 供貼上稿件(新增)時判斷若是已有簽稿會核單則避免再自動產生簽稿會核單
				if(doc.documentElement.nodeName == "簽稿會核單")
					info.con++;
			}));
		}
	}
	$.when.apply(this, deferreds)
	.done(function() {
		localStorage["copy_info"] = JSON.stringify(info);
	});
}

// 貼上文稿(新增)
nsEditor.onPasteNewVisible = function(fm) {
	// 1090916 Raymond 1090564 信保特殊模式公文不提供此功能
	if(fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
		return false;
	return "copy_draft" in localStorage && localStorage['copy_draft'].length > 0 && fm.enableEdit();	// 單筆複製跟全部複製的第1筆文稿都是'copy_draft', 所以只要判斷'copy_draft'存在並有內容即可
}

nsEditor.onPasteNew = function(event, fm) {
	var $viewPort = event.data;
	var n = fm.getDraftCounts();	// 先記下目前文稿數
	if(n > 0 && fm.isFromDoc(n - 1))
		n--;
	// 1090515 Raymond 1090347 新增con表示全複製文稿中「簽稿會核單」的數量, 供貼上稿件(新增)時判斷若是已有簽稿會核單則避免再自動產生簽稿會核單
	//var info = ("copy_info" in localStorage)?JSON.parse(localStorage["copy_info"]):{count: 0};
	var info = ("copy_info" in localStorage)?JSON.parse(localStorage["copy_info"]):{count: 0, con: 0};
	if(info.count > 0) {	// 全部複製
		// 2016.12.28 改成循序貼上
		function doSingle(i) {
			var nm = info["draft" + i];
			if(nm.length > 0 && nm in localStorage) {
				theLogger.log("從複製文稿'" + nm + "'貼上(新增)");
				// 1090515 Raymond 1090347 判斷若是已有簽稿會核單則避免再自動產生簽稿會核單, 第3參數傳入true
				//fm.newDraft(localStorage[nm])
				fm.newDraft(localStorage[nm], undefined, (info.con > 0))
					.done(function(idx) {
						if(++i < info.count)
							doSingle(i);
						else {
							var fv = $viewPort.data("view");
							fv.updateDraftTags(n);
						}
					});
			}
		}
		doSingle(0);
	}
	else {	// 單筆複製
		theLogger.log("從複製文稿'copy_draft'貼上(新增)");
		fm.newDraft(localStorage["copy_draft"])
		.done(function(idx) {
			var fv = $viewPort.data("view");
			fv.updateDraftTags(idx);
		});
	}
}

// 導覽
nsEditor.onViewGuideVisible = function(fm) {
	return false;
}

nsEditor.onViewGuide = function(event, fm) {
}

// 刪除本件公文
nsEditor.onDelFolioVisible = function(fm) {
	// 1130809 Raymond 1130313 合併1111007(1100394), 離線模式下不提供"刪除本件公文"選單按鈕功能
	if(!!theSSO && theSSO.offlineMode == true)
		return false;
	return fm.enableDelDoc();	// 2016.11.16 新增允許刪除本件公文
}

nsEditor.onDelFolio = function(event, fm) {
	
	if(confirm("確定要刪除這個文件夾嗎？")) {
		var wsUrl = theWebServices.url('odmsspws');
		if (!wsUrl || wsUrl.length === 0) {
			theLogger.error('odmssp網址未設定!');
			return;
		}
		var wsFuncName = 'DelMsg';
		var artifact = localStorage['Artifact'];
		var params = new SOAPClientParameters();
		// 1.判斷是否是草稿
		if(fm.getDocObj().isDraft) {
			wsFuncName = "DelDraftMsg";
			params.add("argArtifact", artifact);
			params.add("argOrgNo", fm.getDocObj().sourceOrgNo);
			var isProxyDoc = fm.getDocObj().get("ODWMSG", "IS_PROXY_DOC");	// 判斷是否為代理公文
			var userName = theSSO.User.account;
			if(isProxyDoc == "1") {
				userName = fm.getDocObj().get("ODWMSG", "OWN_USER_ID");
				theLogger.log("本件為代理公文, 以被代理人帳號(" + userName + ")為argUserName參數值");
			}
			params.add("argUserName", userName);
			params.add("argMsgId", fm.getMsgId());
			params.add("argDocNo", fm.getDocNo());

			//1071108 David 1071085 新增航港局MTNET系統整合處理，刪除草稿時呼叫介接WS
			if(fm.getDocNo() != "" && SSO_CONFIG.OrgNickName == "MPB") {
				var MtNetNo = fm.getDocObj().get("ODWDCM", "MTNET_NO");
				var UseMtNet = theSSO.User.EnvSettings.get("USE_MTNET");
				var MtNetLinkWS = theSSO.User.SystemSets.get("MTNET_LINK_WS");
				if(UseMtNet == "Y" && MtNetLinkWS != "" && MtNetNo != "") {
					var MtNetParams = new SOAPClientParameters();
					MtNetParams.add("argArtifact", artifact);
					MtNetParams.add("argOrgNo", fm.getDocObj().sourceOrgNo);
					MtNetParams.add("argDocNo", fm.getDocNo());
					MtNetParams.add("argMtnetNo", MtNetNo);
					MtNetParams.add("argType", "0");

					SOAPClient.invoke(MtNetLinkWS, "DocStatusUpdate", MtNetParams, true, function (rslt) {
						theLogger.log('-I- 航港局MTNET整合，傳送已刪除：MTNET_NO=' + MtNetNo + '');
						if (typeof rslt === 'object') {
							res = {};
							if (rslt.bSuccess === true) {
								theLogger.log('航港局MTNET整合WS成功!');
							}
							else {
								theLogger.log('Error! 航港局MTNET整合WS失敗!錯誤訊息：' + rslt.ErrMsg);
							}
						}
						else {
							theLogger.error('Error! MTNETWS[' + DocStatusUpdate + '] 回傳不為object');
						}
					});
				}
			}
		}
		else {
			wsFuncName = "DelMsg";
			params.add("argArtifact", artifact);
			params.add("argMsgId", fm.getMsgId());
		}
		// 2.呼叫WS
		SOAPClient.invoke(wsUrl, wsFuncName, params, true, function (rslt) {
			theLogger.log('-I- ODMSSP.' + wsFuncName + ' returns:');
			theLogger.log(rslt);
			if (typeof rslt === 'object') {
				res = {};
				// ToDo:解析回傳結構 <m_bSuccess>: 是否成功, <m_strErrMsg>: 錯誤說明
				if (rslt.m_bSuccess === true) {
					// 3.更新todolist
					theSSO.MP.PreviewCtrl.removePreviewItem(fm.getDocObj().msgId);
					theSSO.MP.todolist.deleteMsg(fm.getDocObj(), true, true);
					
					// 4.關閉公文
					// 關閉公文, 額外參數是"E2P"給FolioModel.close()呼叫_onCloseFolio()時傳入
					$("#aol #btnClose").trigger("click", ["E2P"]);
				}
				else {
					alert("刪除本件公文失敗!\r\n" + rslt.m_strErrMsg);
				}
			}
			else {
				theLogger.error('Error! ODMSSP[' + wsFuncName + '] 回傳不為object');
				alert("刪除本件公文發生錯誤!");
			}
		});
	}
}

// 對照檢視窗格
nsEditor.onViewRefVisible = function(fm) {
	return false;
}

nsEditor.onViewRef = function(event, fm) {
}

// 2016.11.2 流程資訊功能改放這個JS
nsEditor.onOpenODI260Visible = function(fm) {
	if(fm && (fm.getDocObj().docNo.length > 0 && !fm.getDocObj().isDraft))	// 有文號且不是草稿才提供ODI260功能
		return true;
	return false;
}

nsEditor.onOpenODI260 = function(event, fm) {
	
	var $viewPort = event.data;
	
	var url = theSSO.User.EnvSettings.get("OD_FLOW_PAGE");
	if(url) {
		var SAMLart = localStorage["Artifact"];
		var pDocNo = fm.getDocObj().docNo;
		var SOURCEORGNO = fm.getDocObj().sourceOrgNo;
		//1090714	Joe		CDC序70		修正開啟ODI260傳入網址參數錯誤的問題
		// url = url + "?SAMLart=" + SAMLart + "&pDocNo=" + pDocNo + "&SOURCEORGNO=" + SOURCEORGNO;
		//1140505	Leslie[1140556]	取消網址參數權杖
		// url = url + "?SAMLart=" + SAMLart + "&pDocNo=" + pDocNo + "&SOURCE_ORGNO=" + SOURCEORGNO;
		url = url + "?pDocNo=" + pDocNo + "&SOURCE_ORGNO=" + SOURCEORGNO;
		theLogger.log("以新分頁開啟流程資訊網頁'" + url + "'");
		$(this).attr({
			"data-role": "none",
			"data-ajax": "false",
			"rel": "external",
			"target": "new",
			"href": url
		});
	}
	else {
		theLogger.error("環境變數'OD_FLOW_PAGE'未設定");
		alert("環境變數'OD_FLOW_PAGE'未設定");
	}
};

// 2016.11.2 電子來文檔案明細功能改放這個JS
nsEditor.onOpenEDI011Visible = function(fm) {
	if(fm && (fm.getDocObj().get("ODWMSG", "SYSID").length > 0))	// SYSID有值表示電子來文
		return true;
	return false;
}

nsEditor.onOpenEDI011 = function(event, fm) {
	
	var $viewPort = event.data;
	
	var url = theSSO.User.EnvSettings.get("WS_ED_SITE");
	if(url) {
		var SAMLart = localStorage["Artifact"];
		var kv1 = fm.getDocObj().get("ODWMSG", "SYSID");
		var kv2 = "od";
		//1140505	Leslie[1140556]	取消網址參數權杖
		// url = url + "ED0/EDI011.aspx?SAMLart=" + SAMLart + "&kv1=" + kv1 + "&kv2=" + kv2;
		url = url + "ED0/EDI011.aspx?kv1=" + kv1 + "&kv2=" + kv2;
		theLogger.log("以新分頁開啟電子來文檔案明細網頁'" + url + "'");
		$(this).attr({
			"data-role": "none",
			"data-ajax": "false",
			"rel": "external",
			"target": "new",
			"href": url
		});
	}
	else {
		theLogger.error("環境變數'WS_ED_SITE'未設定");
		alert("環境變數'WS_ED_SITE'未設定");
	}
};

// 2017.2.7 批示錄案追蹤功能(鐵工局客製功能), 單號1051234
nsEditor.onOpenEDT440Visible = function(fm) {
	// 1130814 Raymond 1130313 離線模式下不提供"批示錄案追蹤"選單按鈕功能
	if(!!theSSO && theSSO.offlineMode == true)
		return false;
	if(SSO_CONFIG.OrgNickName == "RRB") {
		var ownOuID = Number(fm.getDocObj().get("ODWMSG", "OWN_OU_ID").substr(0, 2));
		if(ownOuID >= 95 && ownOuID <= 99) {	// 機關為鐵工局且OWN_OU_ID前2碼為95~99時顯示"批示錄案追蹤"選單
			return true;
		}
	}
	return false;
}

nsEditor.onOpenEDT440 = function(event, fm) {
	
	var $viewPort = event.data;
	
	var url = theSSO.User.EnvSettings.get("WS_ED_SITE");
	if(url) {
		var SAMLart = localStorage["Artifact"];
		//1140505	Leslie[1140556]	取消網址參數權杖
		// url = url + "ED4/EDT440.aspx?SAMLart=" + SAMLart + "&argDocNo=" + fm.getDocNo();
		url = url + "ED4/EDT440.aspx?argDocNo=" + fm.getDocNo();
		theLogger.log("以新分頁開啟批示錄案追蹤網頁'" + url + "'");
		$(this).attr({
			"data-role": "none",
			"data-ajax": "false",
			"rel": "external",
			"target": "new",
			"href": url
		});
	}
	else {
		theLogger.error("環境變數'WS_ED_SITE'未設定");
		alert("環境變數'WS_ED_SITE'未設定");
	}
}

// 1091116	Leslie[1090801]	信保基金提供開啟EDT232匯入功能
nsEditor.onOpenEDT232Visible = function(fm) {
	// 1130814 Raymond 1130313 離線模式下不提供"PDF/定型稿匯入"選單按鈕功能
	if(!!theSSO && theSSO.offlineMode == true)
		return false;
	if(SSO_CONFIG.OrgNickName == "SMEG") {
		let sDraftSourceType = fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE");
		let sFolder = fm.getDocObj().get("ODWMSG", "FOLDER");
		let sSubFolder = fm.getDocObj().get("ODWMSG", "SUBFOLDER");
		//1091129	Leslie[1090801]	修改為只有空白公文稿不給開
		// if((sDraftSourceType == "1" || sDraftSourceType == "2") && (sFolder == "草稿" || ( sFolder == "待處理" && sSubFolder == "主辦" ))){
		if((sDraftSourceType != "3") && (sFolder == "草稿" || ( sFolder == "待處理" && sSubFolder == "主辦" ))){
			return true;
		}
	}
	return false;
}

nsEditor.onOpenEDT232 = function(event, fm) {
	if(confirm("執行稿件匯入作業需關閉目前公文，若需保留異動結果(例：定型稿)，請確定儲存後再執行本功能，請問是否繼續？")){
		$("#aol #btnClose").trigger("click", ["E2P"]);	//給入參數「E2P」以達到直接關閉，不詢問是否儲存
		var $viewPort = event.data;
		
		var url = theSSO.User.EnvSettings.get("WS_ED_SITE");
		if(url) {
			var SAMLart = localStorage["Artifact"];
			//1140505	Leslie[1140556]	取消網址參數權杖
			// url = url + "ED2/EDT232.aspx?SAMLart=" + SAMLart + "&DocNo=" + fm.getDocNo();
			url = url + "ED2/EDT232.aspx?DocNo=" + fm.getDocNo();
			theLogger.log("以新分頁開啟信保稿件匯入作業'" + url + "'");
			$(this).attr({
				"data-role": "none",
				"data-ajax": "false",
				"rel": "external",
				"target": "new",
				"href": url
			});
		}
		else {
			theLogger.error("環境變數'WS_ED_SITE'未設定");
			alert("環境變數'WS_ED_SITE'未設定");
		}
	}
}
// 1091116	Leslie[1090801]	信保基金提供開啟EDT232匯入功能	==END==


// 1140722	Leslie[1140808]	新增選單「公文續管」可開啟EDT411
nsEditor.onOpenEDT411Visible = function(fm) {
	// 1130814 Raymond 1130313 離線模式下不提供"批示錄案追蹤"選單按鈕功能
	if(!!theSSO && theSSO.offlineMode == true)
		return false;
	
	let sSignType = fm.getDocObj().get("ODWMSG", "SIGN_TYPE");	//需為線上簽核(E)
	let sDocState = fm.getDocObj().get("ODWMSG", "DOC_STATE");	//需為辦理中(01)
	let sOwnOuID = fm.getDocObj().get("ODWMSG", "OWN_OU_ID");	//需為一級單位
	let sFolder = fm.getDocObj().get("ODWMSG", "FOLDER");		//流程不在：草稿、已送出、會核中
	if(sFolder != theSSO.User.EnvSettings.FOLDER_DISCUSS && sFolder != theSSO.User.EnvSettings.FOLDER_SUBMIT && sFolder != '草稿' 
		&& sSignType == 'E' && sDocState == '01' && sOwnOuID < sso_const.VIRTUALUNIT_NUM && sOwnOuID.length == sso_const.FIRSTCLASS_UNITNO_LEN)
		return true;
	
	return false;
}

nsEditor.onOpenEDT411 = function(event, fm) {
	
	var $viewPort = event.data;
	
	var url = theSSO.User.EnvSettings.get("WS_ED_SITE");
	if(url) {
		var SAMLart = localStorage["Artifact"];
		url = url + "ED4/EDT411.aspx?argDocNo=" + fm.getDocNo();
		theLogger.log("以新分頁開啟批示錄案追蹤網頁'" + url + "'");
		theSSO.Util.openASPXDlg(url, localStorage.Artifact);
	}
	else {
		theLogger.error("環境變數'WS_ED_SITE'未設定");
		alert("環境變數'WS_ED_SITE'未設定");
	}
}
// 1140722	Leslie[1140808]	新增選單「公文續管」可開啟EDT411	==END==

// 1060821 Raymond 1060703 簽核物件檢視窗格
nsEditor.onViewSignObjVisible = function(fm) {
	return fm.getSignType() == "E";	// 線上簽核才有簽核物件
}

// 1061023 Raymond 1060952 參照窗格也要檢視簽核物件清單, 故#signObjDocked改成$viewPort.closest("#iso").find("#signObjDocked"), 並新增參數event, event.data由RD-AOL.js傳入參照窗格的$viewPort
nsEditor.onViewSignObjState = function(fm, event) {
	var $viewPort = event.data;
	var shown = $viewPort.closest("#iso").find("#signObjDocked").is(":visible");
	return shown;
}

nsEditor.onViewSignObj = function(event, fm) {
	// 1061023 Raymond 1060952 參照窗格也要檢視簽核物件清單, 故#signObjDocked改成$viewPort.closest("#iso").find("#signObjDocked")
	//1140723	Leslie[1141011]	弱掃修正[Client DOM XSS]
	//var $viewPort = event.data;
	var strPartId = (event.data.closest('.ui-tabs-content')[0].id == 'rightPart')?'rightPart':'leftPart';
	var $viewPort = $(`#${strPartId}`).find('.viewPort');
	if($viewPort.closest("#iso").find("#signObjDocked").is(":visible"))
		$viewPort.closest("#iso").find("#signObjDocked").hide();
	else {
		$viewPort.closest("#iso").find("#signObjDocked > div").eq(1).css("max-height", ($(window).height() * 0.4) + "px").parent().show();
		
		$viewPort.closest("#iso").find("#signObjDocked ul").empty();
		function _makeSOInfo(so) {
			var userInfo = fm.getSignFolder().getFlowUserInfo(so.flowId, 2);
			// 1100715 Raymond 1100854 新增[高大客製化]簽核物件的日期時間顯示到秒功能
			if(theUserInfo.OrgNickName == "NUK")
				return userInfo.role + "<br>" + HtmlEncode(userInfo.name) + "<br>" + HtmlEncode(so.time.substr(0, 3)) + "年" + HtmlEncode(so.time.substr(3, 2)) + "月" + HtmlEncode(so.time.substr(5, 2)) + "日 " + HtmlEncode(so.time.substr(7, 2)) + ":" + HtmlEncode(so.time.substr(9, 2)) + ":" + ((so.time.length == 13)?HtmlEncode(so.time.substr(11, 2)):"00");	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
			return userInfo.role + "<br>" + HtmlEncode(userInfo.name) + "<br>" + HtmlEncode(so.time.substr(0, 3)) + "年" + HtmlEncode(so.time.substr(3, 2)) + "月" + HtmlEncode(so.time.substr(5, 2)) + "日 " + HtmlEncode(so.time.substr(7, 2)) + ":" + HtmlEncode(so.time.substr(9, 2));	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
		}
		function addItem(sod, draft, po) {
			var so = sod.ref || sod, gi;
			if("attType" in draft)
				gi = {d: draft.parent, a: draft, po: po, so: sod};
			else
				gi = {d: draft, a: null, po: po, so: sod};
			var $li = undefined;
			for(var i=0; i<$viewPort.closest("#iso").find("#signObjDocked ul > li").length; i++) {	// 排序
				var tgi = $viewPort.closest("#iso").find("#signObjDocked ul > li").eq(i).data("gi");
				if(tgi.so.time < so.time) {	// 依時間由大至小(新到舊)
					$li = $viewPort.closest("#iso").find("#signObjDocked ul > li").eq(i);
					break;
				}
			}
			var newLi = $("<li><div style='display:inline-block;width:20%'>" + HtmlEncode(so.type) + "</div>" +	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
					"<div style='display:inline-block;width:30%'>" + _makeSOInfo(so) + "</div>" +
					// 1081217 Raymond FIX XSS
					//"<div style='display:inline-block;width:50%'>" + ((so.type=="文字意見")?so.content.text:"") + "</div>" +
					"<div style='display:inline-block;width:50%'></div>" +
				"</li>").data("gi", gi).on("click", onClickItem); 
			// 1081217 Raymond FIX XSS
			if(so.type=="文字意見")
				newLi.find("div").eq(2).text(so.content.text.replace(/<br>/g, "\n"));	// 1081218 Raymond 為了顯示已用&lt;br&gt;記錄在封裝檔中的文字意見, 替換成折行字元
			if(!!$li)
				$li.before(newLi);
			else
				newLi.appendTo($viewPort.closest("#iso").find("#signObjDocked ul"));
		}
		function onClickItem(evt) {
			$viewPort.closest("#iso").find("#signObjDocked li").removeClass("ui-li-active");
			$(this).addClass("ui-li-active");
			var gi = $(this).data("gi");
			var guid = gi.d.guid;
			var draftIdx = -1, attIdx = -1, po = 0;
			for(var i=0; i<fm.getDraftCounts(); i++) {
				var d = fm.getEDraft(i);
				if(d.guid == guid) {
					draftIdx = i;
					if(!!gi.a) {
						for(var j=0; j<d.attachs.length; j++) {
							// 1070312 Raymond 1061177 修正參照公文的附件沒有GUID屬性時, 改用ID比對, 以免點擊簽核物件檢閱窗格的物件位於附件頁面上時, 比對undefined=undefined而錯誤將attIdx一直抓成第0筆的問題
							if(!!gi.a.guid) {
								if(d.attachs[j].guid == gi.a.guid) {
									attIdx = j;
									break;
								}
							}
							else {
								if(d.attachs[j].id == gi.a.id) {
									attIdx = j;
									break;
								}
							}
						}
					}
					break;
				}
			}
			if(draftIdx >= 0) {
				if(!!gi.a) {	// 附件的簽核物件
					if("obj" in gi.so) {	// 附件頁面的簽核物件
						for(var i=0; i<fm.getAttPageCounts(draftIdx, attIdx); i++) {
							var pg = fm.getAttPage(draftIdx, attIdx, i);
							if(pg.id == gi.so.obj) {
								po = i;
								break;
							}
						}
						if(i == fm.getAttPageCounts(draftIdx, attIdx))
							theLogger.error("找不到附件頁面ID(" + gi.so.obj + ")的頁次資訊");
					}
					else
						theLogger.error("找不到附件頁面的簽核物件ID(" + gi.so.id + ")的頁次資訊");
				}
				else if("pgIdx" in gi.so)	// Type B 簽核框外物件會記錄頁次
					po = parseInt(gi.so.pgIdx);
				else if("saID" in gi.so) {	// Type A 簽核框內物件會記錄簽核區域ID
					if(gi.po !== null)
						po = gi.po;
					else if("obj" in gi.so.ref) {
						for(var i=0; i<fm.getDraftCounts(); i++) {
							var pg = fm.getDraftPage(draftIdx, i);
							if(pg.id == gi.so.ref.obj) {
								po = i;
								break;
							}
						}
						if(i == fm.getDraftCounts())
							theLogger.error("找不到頁面ID(" + gi.so.ref.obj + ")的頁次資訊");
					}
					else
						theLogger.error("找不到簽核物件ID(" + gi.so.ref.id + ")的頁次資訊");
				}
				else
					theLogger.error("找不到ID(" + gi.so.id + ")的頁次資訊");
				fm.goToAnyPage(draftIdx, attIdx, po);
			}
			else
				theLogger.error("找不到GUID(" + guid + ")的文稿索引值");
		}
		var revs = fm.getSignFolder().getRevisions();
		var cr = fm.getSignFolder().getCurrRevision();
		theLogger.warn("目前檢視流程點為'" + cr + "'");
		var coll = [];
		// 1100512 Raymond 1090821 判斷若是具有單層式文稿頁面的封裝檔, 則忽略顯示外機關流程點的簽核物件(因為也沒有簽核物件)
		var sf = fm.getSignFolder();
		var hasSingleLayerDraft = sf.hasSingleLayerDraft();	// 未傳入指定流程點id參數, 判斷整筆封裝檔是否含有單層式文稿頁面
		for(rev in revs) {	// revs不是陣列, 假設for-loop是照加入順序回傳的名稱
			// 1100512 Raymond 1090821 整筆封裝檔其中有含有單層式文稿頁面的流程點及此流程點為外機關流程點, 忽略之
			if(hasSingleLayerDraft) {
				if(sf.isExorgFlow(rev))
					theLogger.log("忽略顯示外機關流程點'" + rev + "'的簽核物件(應該也不會有)");
				else {
					theLogger.warn("允許本機關流程點'" + rev + "'的簽核物件顯示");
					coll.push(rev.substr(rev.lastIndexOf("_")+1));	// 外呈會公文的本機關流程點Id是sign_機關代碼_msgId而不是sign_msgId, 只切第1個"_"字後會切錯問題
					if(rev == cr)
						break;
				}
			}
			else {
			theLogger.warn("允許'" + rev + "'流程點的簽核物件顯示");
			//coll.push(rev.substr(5));
			coll.push(rev.substr(rev.indexOf("_")+1));	// 2017.3.24 修正草稿時rev是帳號_msgId而不是sign_msgId, 只切第5字後會切錯問題, FDA-序3295
			if(rev == cr)
				break;
			}
		}
		var n = fm.getDraftCounts();
		for(var x=0; x<n; x++) {
			var pg = fm.getDraftPage(x, 0);
			// 2017.1.16 從外部記錄檔取以文稿為基礎的簽核物件
			if("guid" in pg.container && !!pg.container.guid) {	// 本文有GUID
				var d0 = fm.getSignFolder().xSignFolder().getDraft(pg.container.guid);	// 本文的簽核物件要從外部簽核記錄檔取得
				if(!!d0) {	// 外部簽核記錄檔的本文
					var d = d0.getVer(pg.container.id);	// 外部簽核記錄檔的本文的目前版本
					if(!!d) {
						function doBuildSO(v, cv, showTypeB) {	// 參數1為指定版本, 參數2為目前版本, 參數3為是否顯示框外物件
							for(var i=0; i<v.xSignObjs.length; i++) {
								var so = v.xSignObjs[i];
								if(coll.indexOf(so.msgId) >= 0) {
									if(so.id.match(/X_\d+/))
										theLogger.warn("簽核物件(ID:" + so.id + ")為暫存物件, 不顯示於簽核物件檢閱窗格");
									else if(so.type == "A") {	// 簽核框內物件, 找此頁有無相同TYPE及ID的簽核區域加蓋
										if(so.saID == "") {	// 簽稿會核單的簽核區域ID為空, 應為無效區域(記錄外部簽核物件資訊時應記錄成TypeB), 多頁情況下只能改用記錄在封裝檔的簽核物件的物件識別碼來區域是不是同一頁(航港-序461)
											if("ref" in so && so.ref.obj == pg.id) {
												theLogger.warn(dm.getDocType() + "例外處理 - 簽核物件(ID:" + so.id + ")位於此頁(#" + pg.po + ")的簽核區域內");
												addItem(so, pg.container, 0);
											}
										}
										else if("xSignAreas" in cv) {	// 找目前版本中同saID的簽核區域所在頁次
											for(var j=0; j<cv.xSignAreas.length; j++) {
												if(cv.xSignAreas[j].saID == so.saID) {
													theLogger.warn("簽核物件(ID:" + so.id + ")位於此頁(#" + cv.xSignAreas[j].pgIdx + ")的簽核區域(saID:" + so.saID + ")內");
													addItem(so, pg.container, cv.xSignAreas[j].pgIdx);
													break;
												}
											}
											if(j == cv.xSignAreas.length)
												theLogger.error("目前版本的XDraftVer(ID:" + cv.id + ")找不到符合的簽核區域(saID = " + so.saID + ")");
										}
										else
											theLogger.error("目前版本的XDraftVer(ID:" + cv.id + ")無簽核區域資訊, 無法判斷簽核區域內物件(ID:" + so.id + ")應否顯示");
									}
									else if(so.type == "B" && showTypeB) {	// 簽核框外物件, 且為當前版本時, 找此簽核物件所在頁次相符即顯示
										if(pg.container.dirty())
											theLogger.warn("簽核區域外簽核物件(ID:" + so.id + "), 由於文稿內容已異動故不顯示");
										else {
											theLogger.warn("簽核物件(ID:" + so.id + ")位於此頁(po:" + pg.po + ")");
											addItem(so, pg.container, null);
										}
									}
								}
								else
									theLogger.warn("目前流程點不需顯示'" + so.msgId + "'產生的簽核物件(ID:" + so.id + ")");
							}
							if(v.keepSO == "true") {
								theLogger.warn("保留顯示前一版本的簽核物件");
								var pv = fm.getSignFolder().xSignFolder().getDraft(pg.container.guid).getPrevVer(v.id);
								if(!!pv)
									doBuildSO(pv, cv, false);	// 之前版本不要顯示框外物件
							}
						};
						doBuildSO(d, d, true);	// 目前版本要顯示框外物件
					}
					else {
						theLogger.error("外部簽核物件記錄檔找不到GUID:" + pg.container.guid + "的文稿記錄");
					}
				}
				else {
					if("attType" in pg.container) {	// 2017.1.24 附件頁面不會有簽核區域, 一律以框外物件視之
						$.each(pg.signObjs, function(i, so) {
							addItem(so, pg.container, null);
						});
					}
					else
						theLogger.error("找不到GUID:" + pg.container.guid + "的文稿, 無法顯示簽核物件");
				}
			}
			else {	// 沒有GUID的文稿應是來文
				if("fromType" in pg.container ||		// 2017.1.24 來文及來文附件頁面不會有簽核區域, 一律以框外物件視之
					"attType" in pg.container ||
					pg.container.name == "來文簽辦") {	// 2017.1.25 來文簽辦沒有GUID, 且一律以框外物件視之
					$.each(pg.signObjs, function(i, so) {
						addItem(so, pg.container, null);
					});
				}
				else
					theLogger.error("文稿無GUID, 無法顯示簽核物件");
			}
			// 附件
			if("attachs" in pg.container) {
				for(var j=0; j<pg.container.attachs.length; j++) {
					var a = pg.container.attachs[j];
					// 1081022 Raymond fix for 電子檔格式附件無頁面的問題
					if(!!a.draftPages && !!a.draftPages.signObjs) {
					$.each(a.draftPages.signObjs, function(i, so) {
						addItem(so, a, null);
					});
					}
				}
			}
		}
		$viewPort.closest("#iso").find("#signObjDocked ul").listview("refresh");
	}
}

// 1111011 Raymond 1110885 新增匯入TA文稿附件功能
nsEditor.onImportTAVisible = function(fm) {
	// 1130814 Raymond 1130313 離線模式下不提供"匯入銓敘系統文稿"選單按鈕功能
	if(!!theSSO && theSSO.offlineMode == true)
		return false;
	if(SSO_CONFIG.OrgNickName == "MOCS") {	// 條件1.機關暱稱為MOCS
		let docObj = fm.getDocObj();
		let sDocProp = docObj.get("ODWDCM", "DOC_PROPERTY");
		let sTA = theSSO.User.SystemSets.get("MOCS_TA_DOC_PROPERTY");
		//1120118 David 調整匯入TA文稿附件功能使用判斷
		/*if(docObj.ownUserId == docObj.ICUserId && sDocProp == sTA) {	// 條件2.承辦人流程點, 條件3.ODWDCM.DOC_PROPERTY=系統參數MOCS_TA_DOC_PROPERTY設定值
			return true;
		}*/
		let sTaType = docObj.get("ODWMSG", "TA_TYPE");
		// 條件1.承辦人流程點、條件2.有文號、條件3.公文性質=MOCS_TA_DOC_PROPERTY或有報送案別
		if(docObj.ownUserId == docObj.ICUserId &&	"docNo" in docObj && docObj.docNo.length > 0
			&& (sDocProp == sTA || sTaType != "")){
			return true;
		}
	}
	return false;
}

nsEditor.onImportTA = function(evt, fm) {
	//取得標準日期時間(11碼)，用於儲存
	function getDateStrToSave(objDate){
		var mm = (objDate.getMonth() + 1);
		var dd =  objDate.getDate()+"";
		var hh =  objDate.getHours()+"";
		var m = objDate.getMinutes()+"";
		return [(objDate.getYear() - 11),mm>=10?"":"0", mm, dd>=10?"":'0', dd,hh>=10?"":'0', hh, m>=10?"":"0", m].join('');	//2017.2.20	Leslie	bug fixed 應為">="
	}
	// 1120109 Raymond 銓敘部序93 copy form line619@RD-AttachMgmt.js
	let getMimeType = function (fileName) {
		let sType = fileName.substring(fileName.lastIndexOf('.') + 1).toUpperCase();
		let MimeType = {
			'PDF': 'application/pdf',
			'JPG': 'image/jpeg',
			'GIF': 'image/gif',
			'PNG': 'image/png',
		};
		return (MimeType[sType]) ? MimeType[sType] : 'application/octet-binary';
	}
	var n = fm.getDraftCounts();		// 總文稿數
	if(n > 0 && fm.isFromDoc(n - 1))	// 扣掉來文
		n--;
	if(n == 0 || confirm("執行匯入銓敘文稿功能會替換所有既有文稿資料，請問是否執行？")) {	// 若已有文稿資料, 顯示確認訊息
		var $viewPort = evt.data;
		var fv = $viewPort.data("view");
		
		var wsUrl = theSSO.User.SystemSets.get("MOCS_TA_INTGR_WS");
		if(!!wsUrl) {
			var params = {argDocNo: fm.getDocNo(), argTaType: fm.getDocObj().get("ODWMSG", "TA_TYPE")};
			theWebServices.invokeWS(wsUrl, "GetDocDraftInfo", null, params, true, function(rtn, xml) {
				console.log(rtn);
				console.log(xml);
				// 1111026 修正bSuccess為字串時的判斷條件
				//if(!rtn.bSuccess)
				if(!rtn.bSuccess || (typeof rtn.bSuccess === "string" && rtn.bSuccess != "true"))
					alert(rtn.ErrMsg);
				else {
					for(var i=n-1; i>=0; i--) {
						fm.deleteDraft(i, true);	// 第2參數傳入true, 表示忽略再提示詢問是否刪除的警告訊息
						fv.delPPD(i);
					}
					
					var fileIOWS = rtn.WebFileIO;
					var attInfo = (!!rtn.AttachInfo)?rtn.AttachInfo.AttInfo:undefined;
					var draftInfo = (!!rtn.DraftInfo)?rtn.DraftInfo.XmlDocument:undefined;
					if(!!draftInfo) {
						var _dfds = [];
						//if(SSOUtil.typeOf(draftInfo) == "array") {	// 1111103 Raymond 1110885 修正只有一筆文稿時, 不會匯入的問題
							$(xml.documentElement).find("XmlDocument").each(function(i, elm) {
								console.log(i, elm.children);
								var xmlCtx = (new XMLSerializer()).serializeToString(elm.children[0]);
								console.log(xmlCtx);
								// 1120407 Raymond 銓敘部序209(1110885衍生需求) 新增第5參數preventFromOrg, 匯入銓敘文稿一律傳入true表示不要預帶來文機關為正本受文者
								//_dfds.push(fm.newDraft(xmlCtx));
								_dfds.push(fm.newDraft(xmlCtx, undefined, undefined, undefined, true));
							});
						//}
						var signType = fm.getSignType();	// 1111103 Raymond 1110885 新增簽核類型
						$.when.apply(this, _dfds).done(function() {
							fv.updateDraftTags(0);
						
							if(!!attInfo) {
								// 1111103 Raymond 1110885 修正只有一筆附件時, 不會匯入的問題
								//if(SSOUtil.typeOf(attInfo) == "array") {
								if(SSOUtil.typeOf(attInfo) != "array")
									attInfo = [attInfo];
								var wfio = new WebFileIO(fileIOWS);
								fm.accquireDraftModel(0).done(function(dm) {
									if(signType == "E") {	// 1111103 Raymond 1110885 修正判斷是線上簽核才處理參考附件
										var _refAtt = [];				// 一開始是空的參考附件清單
										fm.commitRefAttachs(_refAtt);	// 清空舊的參考附件
									}
									var i=0, j=0, k=0;
									function doDL() {
										if(i<attInfo.length) {
											theLogger.log("下載附件電子檔:" + attInfo[i].AttFilePath + "\\" + attInfo[i].AttFileName);
											wfio.download(attInfo[i].AttFilePath, attInfo[i].AttFileName, {
												keepRawData: true,	// 保持原始資料格式(Typed Array)
												async: false,	// 1061117 Raymond 1061118 調換附件順序時, 須先下載"完"所有附件原始檔, 才進行轉檔, 因此下載其它附件檔途中萬一第1個附件檔已經完成轉檔, 可能會覆蓋掉其它還沒開始轉的附件檔, 若副檔名一樣會變成有2個相同內容的附件檔, 改成sync應該可以避免此情況發生, 但附件檔案太大可能會有衍生問題
												success: function (fil, all) {
													//1080122	Leslie[1080043]	新增SHA256演算法
													//var hash = hex_md5(new Uint8Array(fil));
													var wordArray = CryptoJS.lib.WordArray.create(fil)
													var hash = CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex);
													// 1120109 Raymond 銓敘部序93 修正匯入銓敘文稿後的本文及參考附件, 可於瀏覽器直接開啟的附件類型無MIME type, 導致無法直接開啟的問題
													//1071024	Leslie[1070999]	針對可於瀏覽器直接開啟的附件[JPG、PNG、GIF、PDF]，設定對應的MIME-Type以觸發正確的行為
													//var blb = new Blob([fil],{type: "application/octet-binary"});
													//var blb = new Blob([fil], { type: getMimeType(rcvAttFileName) });
													var blb = new Blob([fil], { type: getMimeType(attInfo[i].AttFileName) });
													var blbNm = URL.createObjectURL(blb);
													//1090903 Zen 1090524 (信保基金)附件明細新增上傳人員、時間欄位
													//addItem(total + 1, rcvAttFileName, rcvAttFileName, blb.size, undefined, hash, rcvAttFileName, blbNm, true, true, undefined, "", "");
													// 1110304	Leslie[1101459]	新增依設定，提供承辦人可修改「附件標籤」名稱
													// addItem(total + 1, rcvAttFileName, rcvAttFileName, blb.size, undefined, hash, rcvAttFileName, blbNm, true, true, undefined, undefined);
													//addItem(total + 1, rcvAttFileName, rcvAttFileName, blb.size, undefined, hash, rcvAttFileName, blbNm, true, true, undefined, undefined, '');
													if(attInfo[i].AttType == "1") {	// 發文附件
														var uploadUser = theSSO.User.PlayRoles[theSSO.User.activeRoleIndex].name + '-' +theSSO.User.name;
														var _fileObj = {
															blbName: blbNm,
															idx: undefined,
															desc: attInfo[i].AttFileName,
															size: blb.size,
															name: undefined,
															fileName: attInfo[i].AttFileName,
															guid: undefined,
															hash: hash,
															hasDocNo: true,
															isNew: true,
															isBW: true,
															currIdx: undefined,
															Dept: "",//DeptList,
															uploadUser: uploadUser,
															uploadTime: "",//getDateStrToSave(uploadTime),
															cusName: ""};//cusName};
														_fileObj.idx = _fileObj.currIdx = j++;
														dm.addAttachFile(_fileObj);// 再新增
														dm.commitAttachFiles();	// 2016.9.12 結束附件清單增刪作業
													}
													else if(attInfo[i].AttType == "0" && signType == "E") {	// 參考附件 1111103 Raymond 1110885 修正判斷是線上簽核才處理參考附件, 否則跳過
														
														//fname = checkFileName(fname);//檢查重覆檔名
														//desc = nm = fname;
														
														var now = new Date();
														addDate = getDateStrToSave(now);
														
														addBy={
															Id:theSSO.User.account,
															Name:theSSO.User.name,
															//1080125	Leslie[1070200]	一併修正，草稿階段無OwnRoleID時，改設定當前使用者RoleID
															//RoleId:theAOL.docObj.ownRoleId,
															RoleId:(theAOL.docObj.ownRoleId == '')?theSSO.User.PlayRoles[theSSO.User.activeRoleIndex].id:theAOL.docObj.ownRoleId,
															RoleName:SSOUtil.getOrgRoleName(SSOUtil.getOrgNode(theAOL.docObj.sourceOrgNo),theAOL.docObj.ownOUId,theAOL.docObj.ownRoleId),
															UnitId:theAOL.docObj.ownOUId,
															UnitName:SSOUtil.getUnitName(theAOL.docObj.sourceOrgNo, theAOL.docObj.ownOUId)
														}
														refAtt={
															bDirty:true,	//註記該附件為本流程異動，儲存時需回寫
															_sn:k++,
															_addMsgId:theAOL.docObj.msgId,
															_isConAtt:false,	//會辦流程的參考附件
															Filename:attInfo[i].AttFileName,
															Hash:hash,
															Title:attInfo[i].AttFileName,
															NewTime:addDate,
															blbName:blbNm,
															ADD_BY:addBy
														}
														_refAtt.push(refAtt);
														fm.commitRefAttachs(_refAtt);
													}
													//$ul.listview("refresh");
													//1110428	Leslie	修正加入來文附件時應觸發儲存
													//dirty = true;
													i++;
													doDL();
												},
												error: function (errorText) {
													alert(errorText);
												}
											});
										}
										else {
											// 1111026 加完附件後若啟用匯出附件頁面的機關, 要呼叫匯出附件頁面的方法
											//fv.updateAttTags();		// 重新整理附件頁籤
											if(SSO_CONFIG.enableConvertAttPage) {	// 判斷是否啟用附件匯出頁面設定
												fv.proceedRndrAtt();	// proceedRndrAtt()會在附件匯出頁面後更新頁籤
											}
											else {
												fv.updateAttTags();	// 更新附件頁籤
											}
											if(signType == "E")	// 1111103 Raymond 1110885 修正判斷是線上簽核才處理參考附件
												fv.updateRefAttTags();	// 重新整理參考附件頁籤
										}
									}
									doDL();
								});
								//}
							}
						});
					}
				}
			});
		}
		else {
			theLogger.error("系統參數'MOCS_TA_INTGR_WS'未設定");
			alert("系統參數'MOCS_TA_INTGR_WS'未設定");
		}
	}
};

// 1111124 Raymond 1110881 新增校正報送案別功能
nsEditor.onUpdateTATypeVisible = function(fm) {
	// 1130814 Raymond 1130313 離線模式下不提供"校正報送案別"選單按鈕功能
	if(!!theSSO && theSSO.offlineMode == true)
		return false;
	if(SSO_CONFIG.OrgNickName == "MOCS") {	// 條件1.機關暱稱為MOCS
		let docObj = fm.getDocObj();
		//1111221 David 移除判斷任審案條件
		//let sDocProp = docObj.get("ODWDCM", "DOC_PROPERTY");
		//let sTA = theSSO.User.SystemSets.get("MOCS_TA_DOC_PROPERTY");
		//if(sDocProp == sTA &&											// 條件2.ODWDCM.DOC_PROPERTY=系統參數MOCS_TA_DOC_PROPERTY設定值
		if(docObj.ownOUId.substr(0, 2) == docObj.ICOUId.substr(0, 2) &&	// 條件3.公文在承辦單位流程點時
			"docNo" in docObj && docObj.docNo.length > 0) {				// 條件4.草稿須有文號才能校正
			return true;
		}
	}
	return false;
}

nsEditor.onUpdateTAType = function(evt, fm) {
	var wsUrl = theSSO.User.SystemSets.get("MOCS_TA_INTGR_WS");
	if(!!wsUrl) {
		SSOUtil.loading("show", { text:"作業中...", textVisible:true});
		var params = {argOrgNo: fm.getDocObj().sourceOrgNo, argDocNo: fm.getDocNo()};
		theWebServices.invokeWS(wsUrl, "UpdateTAType", null, params, true, function(rtn, xml) {
			SSOUtil.loading("hide");
			console.log(rtn);
			console.log(xml);
			if("ErrMsg" in rtn && rtn.ErrMsg.length > 0)
				alert("校正失敗，" + rtn.ErrMsg);
			else if("TAType" in rtn) {
				fm.getDocObj().set2("aol", "ODWMSG", {"TA_TYPE": rtn.TAType});
				//1111221 David 完成需顯示更新的報送案別資料
				//alert("校正成功");
				alert(`校正成功，報送案別為${rtn.TAType}`);
			}
			else {
				theLogger.error("UpdateTAType回傳值無'TAType'，亦無'ErrMsg'或'ErrMsg'為空");
				alert("UpdateTAType回傳值異常!");
			}
		});
	}
	else {
		theLogger.error("系統參數'MOCS_TA_INTGR_WS'未設定");
		alert("系統參數'MOCS_TA_INTGR_WS'未設定");
	}
};

// 1130426 Raymond 中榮序97 新增類似一代的雙螢幕模式以唯讀模式開啟同一筆公文在另一個子視窗功能
nsEditor.onOpenMirrorVisible = function(fm) {
	return (SSO_CONFIG.OrgNickName == "TVGH" && $("#viewDoc").length == 0 &&	// 機關暱稱為TVGH(中榮)時及非DocView子視窗模式時才啟用
			!fm.readOnly() && fm.getSignType() == "E" &&						// 非唯讀及線上簽核才啟用
			!fm.getDocObj().isDraft);											// 非草稿才啟用
}

nsEditor.onOpenMirror = function(evt, fm) {
	theLogger.log("開啟雙視窗模式[" + fm.getDocNo() + "], " + fm.getSignType());
	let SAMLart = localStorage.Artifact,
		docNo = fm.getDocNo(),
		signType = fm.getSignType(),
		docObj = fm.getDocObj();
	let UnvObj = {
		UnvRoot: {
			Artifact: SAMLart,
			ForceDisplayWaterMark: "FALSE",
			ForceWaterMark: "FALSE",
			USER_ID: docObj.ownUserId,
			OU_ID: docObj.ownOUId,
			USER_ORGNO: docObj.sourceOrgNo,
			Doc: {
				DocNo: docNo,
				SourceOrgNo: docObj.sourceOrgNo,
				Att: {
					Alias: "正版電子檔",
					Type: "7",
					PrintEnable: "TRUE",
					File: {
						Pages: "0"
					}
				}
			}
		},
		viewType: "ShowFirstAttPage"	// 指定開啟後預設顯示第一筆附件的第一頁
	};
	let objViewDoc = {
		UNVObj: UnvObj,
		docInfoPage: "none",
		openDocModule: 'AOL',
		signType: signType,
		readOnlyMode: true
	};
	let docId = docNo+'_'+Util.genGUID();
	localStorage['viewDoc_out_'+docId] = JSON.stringify(objViewDoc);

	let url = 'RD-ViewDoc.html?Artifact=' + SAMLart + '&DocId=' + encodeURI(docId);
	if(!!window.wndMirror && window.wndMirror.closed == false)
		window.wndMirror.location.replace(url);
	else {
		let halfWidth = screen.availWidth / 2;
		let fullTall = screen.availHeight;
		window.wndMirror = window.open(url, "_blank", "toolbar=0, resizable=1, menubar=0, status=1, width=" + halfWidth + ", height=" + fullTall + ", top=0, left=" + halfWidth);
		if(!window.closeMirrorOnUnload) {
			$(window).on("beforeunload", function(evt) {
				theLogger.log("[雙視窗模式]主視窗關閉前一併關閉副視窗");
				if(!!window.wndMirror && window.wndMirror.closed == false)
					window.wndMirror.close();
			});
			window.closeMirrorOnUnload = true;
		}
	}
};

//1130514	Leslie[中榮序106]	公文製作頁面功能選單，位置調整需求(回閱設定)
nsEditor.onReViewSetVisible = function(fm){
	// 1130814 Raymond 1130313 離線模式下不提供"指定回閱"選單按鈕功能
	if(!!theSSO && theSSO.offlineMode == true)
		return false;
	var SAMLart = localStorage["Artifact"];
	var _docObj = fm.getDocObj();
	var menuRule = SSOUtil.getMenuRule_Obj(SAMLart, _docObj.sourceOrgNo, _docObj.signType);
	var curFolder = _docObj.folder;
	var curSubFolder = _docObj.subfolder;
	var rule = menuRule.getRule(curFolder, curSubFolder);
	var enableBtn = false;
	if((typeof rule !== 'undefined') && (typeof rule.buttonF !== 'undefined')) {
		var btnFlag = rule.buttonF;
		if (typeof btnFlag!='undefined' && btnFlag.length) {
			btnFlag = btnFlag.toLowerCase();
			var idx = btnFlag.indexOf('c');
			if (idx!=-1) {
				enableBtn = true;
			}
		}
	}
	return enableBtn;
};

nsEditor.onOpenEDT010 = function(event, fm){
	var _docObj = fm.getDocObj();
	var url = SSO_CONFIG.iOSSYSProg_URLs.ED_RESIGN;
	if ((typeof url !== 'undefined') && url.length) {
		var userId = _docObj.ownUserId;
		if (userId.length==0) {
			userId = theSSO.User.account;
		}
		var isProxy = _docObj.get('ODWMSG', 'IS_PROXY_DOC'); // 代理公文
		var sProxy = '0';
		if (typeof isProxy!=='undefined' && isProxy.length && isProxy=='1') {
			sProxy = '1';
		}
		//1140505	Leslie[1140556]	取消網址參數權杖
		// var param = '?SAMLart=' + localStorage.Artifact + '&SourceOrgNo=' + _docObj.sourceOrgNo + '&DocNo=' + _docObj.docNo +
		var param = '?SourceOrgNo=' + _docObj.sourceOrgNo + '&DocNo=' + _docObj.docNo +
				'&OuId=' + _docObj.ownOUId + '&RoleId=' + _docObj.ownRoleId + '&UserId=' + userId +'&MsgId=' + _docObj.msgId + '&IsProxy=' + sProxy;
		url += param;
		
		var $dlg = $("#dlgASPXPage").clone(true);
		$dlg.find('a.closeBtn').click(function () {
			$.modal.close();
		});
		
		var ow = $("#leftPart #iso").width(),
			oh = $("#leftPart #iso").height();
		var w = Math.min(1024,window.innerWidth * 0.8),
			h = Math.min(768,window.innerHeight * 0.8);
			
		$.modal($dlg, {
			appendTo: $("#leftPart #iso"),
			overlayCss: {height: oh, width: ow},
			containerCss: {height: h, width: w},
			autoResize: true,
			focus: false,
			onShow: function() {
				var $frame = $dlg.find('IFRAME');
				var w = $frame.parent().width(),
					h = $frame.parent().height();
				$frame.css("width", w).css("height", h);
				theLogger.log("開啟子視窗內嵌網址(動態產生)'" + url + "'");
				$frame[0].src = url;
			}
		});
	}
};
//1130514	Leslie[中榮序106]	公文製作頁面功能選單，位置調整需求(回閱設定)	--END--

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-FolioCmds.js").finish();	// 2016.11.10 fix file name
})();