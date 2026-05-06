// 另存整份公文功能模組
//	掛在nsEditor命名空間下
//	
// 1061212	Raymond	Raymond	1061211	文稿XML轉換為完稿結果的XML
// 1080711	Raymond	Raymond	1080518	改用循序式下載文稿及附件, 並針對Chrome連續另存10筆以上檔案會發生漏存(可能是自動下載功能)的問題特別處理
// 1090227	Raymond	Raymond	1080751	合併內政部1070381調閱公文時, 另存整份公文時新增回報另存記錄
// 1090916	Raymond	Raymond	1090546	信保基金特殊模式公文不提供另存整份公文功能
// 1100303	Raymond	Raymond	1100092	比照點擊文稿頁籤及翻頁限制, 紙本公文不允許編輯內文時, 亦不可另存整份公文
// 1101101	Raymond	Raymond	1100991	修正弱掃Client Potential XSS
// 1110120	Raymond	Raymond	1101417	另存整份公文改成打包成一個ZIP壓縮檔下載
// 1121222	Raymond	Raymond	領務局序345	修正另存新檔為保留格式化資訊的完稿XML
// 1131216	Raymond	Raymond	1131064	新增環境變數「WE_ALLOW_VIEW_READONLY_PAPER_DOC_FOLDER」, 當目前資料夾符合設定值時, 允許禁止編輯內文的紙本公文, 可以另存整份公文
// 1140704	Raymond	Raymond	1140920	另存整份公文功能新增判斷若有來文電子檔, 則呼叫GetDocAttach取得來文電子檔所有路徑並下載後, 與原本文稿及附件電子檔一併打包成ZIP檔下載
// 1140910	Raymond	Raymond	退輔會序203	合併屏東序882, 新增儲存DraftMgmt.xml到產生的ZIP壓縮檔中, 以支援開啟舊檔可匯入整份公文的文稿及附件功能

var nsEditor = nsEditor||{};

nsEditor.onExportFileVisible = function(fm) {
	// 1131216 Raymond 1131064 新增環境變數「WE_ALLOW_VIEW_READONLY_PAPER_DOC_FOLDER」, 當目前資料夾符合設定值時, 允許禁止編輯內文的紙本公文, 可以另存整份公文
	// 1100303 Raymond 1100092 比照點擊文稿頁籤及翻頁限制, 紙本公文不允許編輯內文時, 亦不可另存整份公文
	//if(fm.getDocObj().signType == "P" && !fm.enableEdit()) {	// 卡紙本不允許編輯內文的流程點不可以看文稿
	var allowViewReadOnlyPaperDocFolder = theSSO.User.EnvSettings.get("WE_ALLOW_VIEW_READONLY_PAPER_DOC_FOLDER").split(";");
	var thisFolder = fm.getDocObj().folder + "-" + fm.getDocObj().subfolder;
	var allowViewReadOnlyPaperDoc = allowViewReadOnlyPaperDocFolder.indexOf(thisFolder) >= 0;
	if(fm.getDocObj().signType == "P" && !fm.enableEdit() && !allowViewReadOnlyPaperDoc) {	// 卡紙本不允許編輯內文的流程點不可以看文稿
		theLogger.warn("此流程點不允許編輯紙本公文內文, 禁用另存整份公文");
		return false;
	}
	// 1090916 Raymond 1090564 信保特殊模式公文不提供此功能
	if(fm.getDocObj().get("ODWDCM", "DRAFT_SOURCE_TYPE") == "2")
		return false;
	return true;
}

nsEditor.onExportFile = function(event, fm){
	
	var $viewPort = event.data;
	var that = this;
	
	//1101101 Raymond 1100991 弱掃XSS修正
	function HtmlEncode(s) {
		var div = document.createElement('div');
		div.appendChild(document.createTextNode(s));
		return div.innerHTML;
	}
	
	// 1080709 Raymond 1080518 改用循序式下載文稿
	/*function dlAttach(dm, i, nm, desc, size, guid, hash, fname, blbNm) {
		if(blbNm.match(/^blob:/)) {	// 客戶端剛新增的附件
			theLogger.log("下載BLOB附件(" + blbNm + ")");
			if("msSaveBlob" in navigator) {	// 2016.11.7 for IE-compatible
				var xhr = new XMLHttpRequest();
				xhr.open('GET', blbNm, true);
				xhr.responseType = 'blob';
				xhr.onload = function(e) {
					if (this.status == 200) {
						//var myBlob = this.response;
						navigator.msSaveBlob(this.response, fname);
					}
				};
				xhr.send();
			}
			else {
				var $a = $("<a data-role='none' href='" + blbNm + "' rel='external' data-ajax='false' target='new' download='" + fname + "'></a>").appendTo("body");
				setTimeout(function() {
					$a[0].click();	// 2016.12.22	Leslie	改回DOM的標準Click，加上"[0]"
					$a.remove();
				}, 66);
			}
		}
		else {	// 從Server上下載附件電子檔
			theLogger.log("下載非BLOB附件(" + blbNm + ")");
			if("msSaveBlob" in navigator) {	// 2016.11.24 for IE直接下載另存
				var wfio = new WebFileIO(fm.fileIOWS);
				wfio.download(dm.getDraftDirPath(), blbNm, {
					keepRawData: true,	// 保持原始資料格式(Typed Array)
					success: function(fil, all) {
						var blb = new Blob([fil], {type: "application/octet-stream"});
						theLogger.log("下載'" + blbNm + "'成功, 指定另存為'" + fname + "'");
						navigator.msSaveBlob(blb, fname);
					},
					error: function(errorText) {
						theLogger.error("下載'" + blbNm + "'失敗! " + errorText);
					}
				});
			}
			else {
				var fn = dm.getDraftDirPath() + "\\" + blbNm;
				theLogger.log("附件路徑:'" + fn + "'");
				var url = "/odtools/docatt.ashx?DocNo=" + fm.getDocNo() + "&FileName=" + encodeURIComponent(Base64.encode(fn)) + "&SAMLart=" + localStorage['Artifact'];
				console.log(url);	// add log for trace error
				var $a = $("<a data-role='none' href='" + url + "' rel='external' data-ajax='false' target='new' download='" + fname + "'></a>").appendTo("body");
				setTimeout(function() {
					$a[0].click();		// 2016.12.22	Leslie	改回DOM的標準Click，加上"[0]"
					//$a.remove();
				}, 66);
				var wfio = new WebFileIO(fm.fileIOWS);
				wfio.download(dm.getDraftDirPath(), blbNm, {
					keepRawData: true,	// 保持原始資料格式(Typed Array)
					success: function(fil, all) {
						var blb = new Blob([fil], {type: "application/octet-stream"});
						theLogger.log("下載'" + blbNm + "'成功, 指定另存為'" + fname + "'");
						var url = URL.createObjectURL(blb);
						var $a = $("<a data-role='none' rel='external' data-ajax='false' download='" + fname + "' href='" + url + "'></a>").appendTo("body");		// 2016.12.22	Leslie	改回DOM的標準Click，移到後面去Click
						$a[0].click()	// 2016.12.22	Leslie	改回DOM的標準Click，加上"[0]"
						$a.remove();
					},
					error: function(errorText) {
						theLogger.error("下載'" + blbNm + "'失敗! " + errorText);
					}
				});
			}
		}
	}*/
	var nDrafts = fm.getDraftCounts();
	if(nDrafts > 0 && fm.isFromDoc(nDrafts - 1))
		nDrafts--;	// 扣掉來文才是可下載的文稿數
	// 1140702 Raymond 1140920 新增判斷是否有來文電子檔
	//if(nDrafts <= 0) {
	var hasFromFiles = fm.getDocObj().get("ODWMSG", "SYSID").length > 0;
	if(!hasFromFiles && nDrafts <= 0) {
		theLogger.warn("本件公文無任何文稿可下載");
		alert("本件公文無任何文稿可下載");
		return;
	}
	if(!!fm.durringDownloadAll) {	// 防呆
		theLogger.warn("前次作業仍在下載中, 請稍後再試!");
		alert("前次作業仍在下載中, 請稍後再試!");
		return;
	}
	// 1110120 Raymond 1101417 另存整份公文改成打包成一個ZIP壓縮檔下載
	//var links = [];
	var q = [];
	function now() {
		function padLeft(num, len) {
			if(typeof num != "string")
				num = num.toString();
			if(num.length >= len)
				return num;
			else
				return arguments.callee("0" + num, len);
		}
		var t = new Date();
		if(navigator.userAgent.indexOf("Trident") >= 0)
			return padLeft(t.getHours(), 2) + ":" + padLeft(t.getMinutes(), 2) + ":" + padLeft(t.getSeconds(), 2) + "." + padLeft(t.getMilliseconds(), 3) + " ";
		return "%c" + padLeft(t.getHours(), 2) + ":" + padLeft(t.getMinutes(), 2) + ":" + padLeft(t.getSeconds(), 2) + "." + padLeft(t.getMilliseconds(), 3) + " %c";
	}
	// 1140910 Raymond 退輔會序203 合併屏東序882. 新增儲存DraftMgmt.xml到產生的ZIP壓縮檔中, 以支援開啟舊檔可匯入整份公文的文稿及附件功能
	var mgmt = (new DOMParser()).parseFromString("<公文夾/>", "text/xml");
	function newElm(name, parent) {
		return $(mgmt.createElement(name)).appendTo(parent);
	}
	function newElmTxt(name, parent, txt) {
		var $newElm = $(mgmt.createElement(name)).appendTo(parent);
		if("text" in $newElm.get(0))	// 2016.11.3 for IE-compatible
			$newElm.get(0).text = txt;
		else
			$newElm.text(txt);
	}
	var aRef = 0;	// 附件REF計數器
	// 1140910 Raymond 退輔會序203 合併屏東序882. 新增第4參數DraftMgmt.xml中的文稿節點
	//function dlAttach(dm, idx, draftIdx) {
	function dlAttach(dm, idx, draftIdx, $draft) {
		var nd = dm.getAttachFile(idx);
		if(nd) {
			var $nd = $(nd);
			var nm = $nd.attr("附件名"),
				desc = $nd.attr("摘要"),
				size = parseInt($nd.attr("大小")),
				guid = dm.getAttachGUID(idx),
				hash = dm.getAttachHash(idx),
				fname = HtmlEncode($nd.text()),	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
				blbNm = HtmlEncode($nd.attr("data-blob-name"));	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
			if(!!blbNm && blbNm.match(/^blob:/)) {	// 客戶端剛新增的附件
				theLogger.log("另存BLOB附件(" + blbNm + ") - '" + nm + "', '" + desc + "', '"  + fname + "', " + size + "Bytes, " + guid + ", " + hash);
				// 1110120 Raymond 1101417 另存整份公文改成打包成一個ZIP壓縮檔下載
				/*if("msSaveBlob" in navigator) {	// 2016.11.7 for IE-compatible
					var xhr = new XMLHttpRequest();
					xhr.open('GET', blbNm, true);
					xhr.responseType = 'blob';
					xhr.onload = function(e) {
						if (this.status == 200) {
							console.log("\t'" + blbNm + "'(" + this.response.size + " bytes)");
							//var myBlob = this.response;
							navigator.msSaveBlob(this.response, fname);
							
							if((idx + 1) < dm.getAttachFileCounts())// 若還有次筆附件
								dlAttach(dm, idx + 1, draftIdx);	// 循序下載次筆附件
							else
								dlSingle(draftIdx + 1);	// 循序下載次筆文稿
						}
					};
					xhr.onerror = function(e) {
						theLogger.error("失敗!", e);
						alert("另存'" + fname + "'失敗!\r\n" + e.message);
						if("durringDownloadAll" in fm) {	// 防呆
							delete fm.durringDownloadAll;
							if("durringDownloadAllTimer" in nsEditor && typeof nsEditor.durringDownloadAllTimer === "number") {	// 中止補救防呆鎖定計時器
								clearTimeout(nsEditor.durringDownloadAllTimer);
								delete nsEditor.durringDownloadAllTimer;
							}
						}
					};
					xhr.send();
				}
				else {
					// 1080711 Raymond 1080518 改用createElement
					//var $a = $("<a data-role='none' rel='external' data-ajax='false' download='" + fname + "' href='" + blbNm + "'></a>").appendTo("body");
					//$a[0].click();	// 2016.12.22	Leslie	改回DOM的標準Click，加上"[0]"
					//$a.remove();
					console.log("\t%c'" + blbNm + "%c'", "color:blue;", "color:blue;");
					var link2 = document.createElement("a");
					link2.href = blbNm;
					link2.download = fname;
					document.body.appendChild(link2);
					if(navigator.userAgent.indexOf("Chrome") >= 0)	// Chrome自動下載有每連續另存(用Click指令觸發, 手動點超鏈結的不太可能短時間連續)10個檔案就會開始missing click or download, 導致漏存檔案的問題
						links.push(link2);							// 改成暫時push到陣列中, 等最後一筆檔案下載完再一次另存, 用async + await指令(IE不支援這些keyword, 連JS都無法載入成功)的方式處理這個問題
					else {	// 其它(Firefox etc...)沒有這個問題, 可能是自動下載功能的問題
						link2.click();
						document.body.removeChild(link2);
					}
					
					if((idx + 1) < dm.getAttachFileCounts())// 若還有次筆附件
						dlAttach(dm, idx + 1, draftIdx);	// 循序下載次筆附件
					else
						dlSingle(draftIdx + 1);	// 循序下載次筆文稿
				}*/
				q.push({fn: fname, dat: blbNm, isBlobUrl: true});
				// 1140910 Raymond 退輔會序203 合併屏東序882. 新增DraftMgmt.xml中的附件及所屬文稿下的附件REF節點
				var $att = newElm("附件", mgmt.documentElement).attr("路徑", fname).attr("ID", ++aRef);
				newElm("附件REF", $draft).attr("ID", aRef);
				if((idx + 1) < dm.getAttachFileCounts())// 若還有次筆附件
					// 1140910 Raymond 退輔會序203 合併屏東序882. 新增第4參數DraftMgmt.xml中的文稿節點
					//dlAttach(dm, idx + 1, draftIdx);	// 循序下載次筆附件
					dlAttach(dm, idx + 1, draftIdx, $draft);	// 循序下載次筆附件
				else
					dlSingle(draftIdx + 1);	// 循序下載次筆文稿
			}
			else {	// 從Server上下載附件電子檔
				theLogger.log(now() + "下載非BLOB附件 - '" + nm + "', '" + desc + "', '"  + fname + "', " + size + "Bytes, " + guid + ", " + hash, "color:blue;", "color:black");
				var wfio = new WebFileIO(fm.fileIOWS);
				wfio.download(dm.getDraftDirPath(), fname, {
					keepRawData: true,	// 保持原始資料格式(Typed Array)
					success: function(fil, all) {
						// 1110120 Raymond 1101417 另存整份公文改成打包成一個ZIP壓縮檔下載
						/*var blb = new Blob([fil], {type: "application/octet-stream"});
						theLogger.log(now() + "下載'" + fname + "'成功!", "color:blue;", "color:black");
						if("msSaveBlob" in navigator)
							navigator.msSaveBlob(blb, fname);
						else {
							var url = URL.createObjectURL(blb);
							// 1080711 Raymond 1080518 改用createElement
							//var $a = $("<a data-role='none' rel='external' data-ajax='false' download='" + fname + "' href='" + url + "'></a>").appendTo("body");		// 2016.12.22	Leslie	改回DOM的標準Click，移到後面去Click
							//$a[0].click()	// 2016.12.22	Leslie	改回DOM的標準Click，加上"[0]"
							//$a.remove();
							console.log("\t%c'" + url + "%c'(" + blb.size + " bytes)", "color:blue;", "color:blue;");
							var link2 = document.createElement("a");
							link2.href = url;
							link2.download = fname;
							document.body.appendChild(link2);
							if(navigator.userAgent.indexOf("Chrome") >= 0)	// Chrome自動下載有每連續另存(用Click指令觸發, 手動點超鏈結的不太可能短時間連續)10個檔案就會開始missing click or download, 導致漏存檔案的問題
								links.push(link2);							// 改成暫時push到陣列中, 等最後一筆檔案下載完再一次另存, 用async + await指令(IE不支援這些keyword, 連JS都無法載入成功)的方式處理這個問題
							else {	// 其它(Firefox etc...)似乎沒有這個問題
								link2.click();
								document.body.removeChild(link2);
							}
							//URL.revokeObjectURL(url);	// 不確定click後立即釋放url會不會有問題
						}*/
						q.push({fn: fname, dat: fil});
						// 1140910 Raymond 退輔會序203 合併屏東序882. 新增DraftMgmt.xml中的附件及所屬文稿下的附件REF節點
						var $att = newElm("附件", mgmt.documentElement).attr("路徑", fname).attr("ID", ++aRef);
						newElm("附件REF", $draft).attr("ID", aRef);
						if((idx + 1) < dm.getAttachFileCounts())// 若還有次筆附件
							// 1140910 Raymond 退輔會序203 合併屏東序882. 新增第4參數DraftMgmt.xml中的文稿節點
							//dlAttach(dm, idx + 1, draftIdx);	// 循序下載次筆附件
							dlAttach(dm, idx + 1, draftIdx, $draft);	// 循序下載次筆附件
						else
							dlSingle(draftIdx + 1);	// 循序下載次筆文稿
					},
					error: function(errorText) {
						theLogger.error("下載'" + fname + "'失敗! " + errorText);
						alert("另存'" + fname + "'失敗!\r\n" + errorText);
						if("durringDownloadAll" in fm) {	// 防呆
							delete fm.durringDownloadAll;
							if("durringDownloadAllTimer" in nsEditor && typeof nsEditor.durringDownloadAllTimer === "number") {	// 中止補救防呆鎖定計時器
								clearTimeout(nsEditor.durringDownloadAllTimer);
								delete nsEditor.durringDownloadAllTimer;
							}
						}
					}
				});
			}
		}
		else {
			theLogger.error("無法取得第" + idx + "個附件資訊");
			if("durringDownloadAll" in fm) {	// 防呆
				delete fm.durringDownloadAll;
				if("durringDownloadAllTimer" in nsEditor && typeof nsEditor.durringDownloadAllTimer === "number") {	// 中止補救防呆鎖定計時器
					clearTimeout(nsEditor.durringDownloadAllTimer);
					delete nsEditor.durringDownloadAllTimer;
				}
			}
		}
	}
	// 1140702 Raymond 1140920 新增若有來文電子檔, 則呼叫GetDocAttach取得來文電子檔所有路徑並下載後, 再次呼叫dlSingle並傳入第2參數skipDLFromFiles為true
	//function dlSingle(idx) {
	function dlSingle(idx, skipDLFromFiles) {
		// 1080709 Raymond 1080518 改用循序式下載文稿
		if(idx >= nDrafts) {	// 最後1筆文稿已下載完成
			// 1140702 Raymond 1140920 新增若有來文電子檔, 則呼叫GetDocAttach取得來文電子檔所有路徑並下載後, 再次呼叫dlSingle並傳入第2參數skipDLFromFiles為true, 以跳到原本打包成ZIP檔的部分
			if(hasFromFiles && !skipDLFromFiles) {
				dlFromFiles(idx);
			}
			else
			// Chrome連續另存10個檔案以上好像就會開始missing幾個檔案, 第1次另存整份公文時因為非同步下載檔案資料, 另存每筆檔案中間有個時間差, 所以
			// 比較不會漏檔案, 但第2次另存整份公文時, 因為大部分用Cache的檔案資料, 所以變成另存每筆檔案中間幾乎沒有時間間隔, 等於連續另存, 在這種
			// 情境下就會開始漏檔案, 故改成async + await指令(IE不支援這些keyword, 連JS都無法載入成功, 改用setTimeout)來做出每10筆檔案另存後同步延遲個1秒鐘來解決Chrome的這個問題
			// 1110120 Raymond 1101417 另存整份公文改成打包成一個ZIP壓縮檔下載
			//if(links.length > 0) {
			if(q.length > 0) {
				/*function pause(msec) {
					return new Promise(function(resolve, reject) {
							setTimeout(resolve, msec || 1000);
						}
					);
				}
				async function downloadAll(elements) {
					var count = 0;
					for(var i=0; i<elements.length; i++) {

						elements[i].click();
						var url = elements[i].getAttribute("href");
						document.body.removeChild(elements[i]);
						//URL.revokeObjectURL(url);	// 不確定click後立即釋放url會不會有問題

						if (++count >= 10) {	// 每另存10個檔案就等待1秒鐘
							await pause(1000);
							count = 0;
						}
					}
				}
				downloadAll(links);*/
				// 1110120 Raymond 1101417 另存整份公文改成打包成一個ZIP壓縮檔下載
				/*var cur = 0;
				function dlBatch() {
					for(var i=cur; i<links.length; i++) {
						links[i].click();
						var url = links[i].getAttribute("href");
						document.body.removeChild(links[i]);
						//URL.revokeObjectURL(url);	// 不確定click後立即釋放url會不會有問題

						if((++cur % 10) == 0 && (cur < links.length)) {	// 每另存10個檔案就等待1秒鐘
							theLogger.log("因應Chrome自動下載每連續另存10個檔案就有可能會漏掉幾個的問題, 每另存10個檔案就等待1秒鐘再繼續另存作業");
							setTimeout(arguments.callee, 1000);
							return;
						}
					}
					if("durringDownloadAll" in fm) {	// 防呆
						delete fm.durringDownloadAll;
						if("durringDownloadAllTimer" in nsEditor && typeof nsEditor.durringDownloadAllTimer === "number") {	// 中止補救防呆鎖定計時器
							clearTimeout(nsEditor.durringDownloadAllTimer);
							delete nsEditor.durringDownloadAllTimer;
						}
					}
				}
				dlBatch();*/
				var zip = new JSZip();
				var it = 0;
				function doPack() {
					var job = q[it++];
					if(!job) {
						// 1140910 Raymond 退輔會序203 合併屏東序882. 新增DraftMgmt.xml
						var xml = Util.getXml(mgmt, false, "UTF-8");	// 指定encoding屬性為UTF-8, 因為下載後的檔案會變成UTF-8
						theLogger.log("打包文稿管理檔-DraftMgmt.xml");
						zip.file("DraftMgmt.xml", xml);
						
						var fname = ((fm.getDocObj().docNo.length > 0)?fm.getDocObj().docNo:(theUserInfo.UserID + "_" + fm.getMsgId())) + ".zip";
						theLogger.log("打包完成產生下載BLOB...下載檔名預設為'" + fname + "'");
						zip.generateAsync({type:"blob"})
						.then(function(content) {
							if("msSaveBlob" in navigator) {
								console.log("\t'" + content.type + "'(" + content.size + " bytes)");
								navigator.msSaveBlob(content, fname);
							}
							else {
								var url = URL.createObjectURL(content);
								console.log("\t%c'" + url + "%c'(" + content.size + " bytes)", "color:lightblue;", "color:lightblue;");
								var link = document.createElement("a");
								link.href = url;
								link.download = fname;
								document.body.appendChild(link);
								link.click();
								document.body.removeChild(link);
							}
							
							if("durringDownloadAll" in fm) {	// 防呆
								delete fm.durringDownloadAll;
								if("durringDownloadAllTimer" in nsEditor && typeof nsEditor.durringDownloadAllTimer === "number") {	// 中止補救防呆鎖定計時器
									clearTimeout(nsEditor.durringDownloadAllTimer);
									delete nsEditor.durringDownloadAllTimer;
								}
							}
						});
					}
					else if(job.isBlobUrl) {	// 剛新增的附件電子檔
						theLogger.log("打包剛新增的附件電子檔-" + job.fn, job.dat);
						var xhr = new XMLHttpRequest();
						xhr.open('GET', job.dat, true);
						xhr.responseType = 'blob';
						xhr.onload = function(e) {
							if (this.status == 200) {
								console.log("\t'" + job.dat + "'(" + this.response.size + " bytes)");
								zip.file(job.fn, this.response);
								doPack();
							}
							else
								console.warn(this.status);
						};
						xhr.onerror = function(e) {
							theLogger.error("失敗!", e);
						};
						xhr.send();
					}
					else {	// 文稿檔或已上傳的附件電子檔
						theLogger.log("打包文稿或下載的附件電子檔-" + job.fn);
						zip.file(job.fn, job.dat);
						doPack();
					}
				}
				doPack();
			}
			else if("durringDownloadAll" in fm) {	// 防呆
				delete fm.durringDownloadAll;
				if("durringDownloadAllTimer" in nsEditor && typeof nsEditor.durringDownloadAllTimer === "number") {	// 中止補救防呆鎖定計時器
					clearTimeout(nsEditor.durringDownloadAllTimer);
					delete nsEditor.durringDownloadAllTimer;
				}
			}
			return;
		}
		
		var dname = fm.getDraftName(idx);
		var fname = fm.getDraftFileName(idx);
		theLogger.log(now() + "下載'" + dname + "' - '" + fname + "'", "color:blue;", "color:black");
		// 預設檔名用文號-序, 或UserID + MsgID + 序
		if(fm.getDocNo().length > 0)
			//fname = fm.getDocNo() + "-" + Util.padLeft(idx + 1, 3) + ".xml";
			fname = fm.getDocNo() + "-" + fname.replace("-tc", "");	// 1080709 Raymond 1080518 改用原始檔名不用調整稿序的序
		else
			//fname = theUserInfo.UserID + "_" + fm.getMsgId() + "-" + Util.padLeft(idx + 1, 3) + ".xml";
			fname = theUserInfo.UserID + "_" + fm.getMsgId() + "-" + fname.replace("-tc", "");	// 1080709 Raymond 1080518 改用原始檔名不用調整稿序的序
		theLogger.log("\t預設下載檔名'" + fname + "'");
		
		fm.accquireDraftModel(idx)
			.done(function(dm) {
				var data = dm.accquireXml();
				// 1121222 Raymond 領務局序345 修正另存新檔為保留格式化資訊的完稿XML
				// 1061212 Raymond 1061211 新增轉換為完稿結果的XML
				//if("transCmplXml" in nsEditor) {
				//	data = nsEditor.transCmplXml(data);
				if("transCmplXmlWithFmt" in nsEditor) {
					data = nsEditor.transCmplXmlWithFmt(data);
				}
				// 1080709 Raymond 1080518 移至另存文稿後
				/*var total = dm.getAttachFileCounts();
				for(var j=0; j<total; j++) {
					var nd = dm.getAttachFile(j);
					if(nd) {
						var $nd = $(nd);
						var nm = $nd.attr("附件名"),
							desc = $nd.attr("摘要"),
							size = parseInt($nd.attr("大小")),
							guid = dm.getAttachGUID(j),
							hash = dm.getAttachHash(j),
							attFileNm = $nd.text(),
							blbNm = $nd.attr("data-blob-name");
						if(blbNm)
							dlAttach(dm, j, nm, desc, size, guid, hash, attFileNm, blbNm);
						else	// 存檔後data-blob-name會清除, 就要改下載Server上的附件檔
							dlAttach(dm, j, nm, desc, size, guid, hash, attFileNm, attFileNm);
					}
					else {
						theLogger.error("無法取得第" + j + "個附件資訊");
					}
				}*/
				
				var xml = Util.getXml(data, false, "UTF-8");	// 指定encoding屬性為UTF-8, 因為下載後的檔案會變成UTF-8
				/*var ab = new ArrayBuffer(xml.length * 2);
				var vw = new DataView(ab);
				for(var i=0; i<xml.length; i++) {
					var c = xml.charCodeAt(i);
					if(c > 255)
						vw.setUint8(i * 2, c >> 8);
					else
						vw.setUint8(i * 2, 0);
					vw.setInt8(i * 2 + 1, c & 0xff);
				}*/
				theLogger.log(now() + "下載第" + idx + "個文稿檔(" + fname + ")", "color:blue;", "color:black");
				// 1110120 Raymond 1101417 另存整份公文改成打包成一個ZIP壓縮檔下載
				/*var blob = new Blob([xml], {type: "application/octet-stream"});
				//var str = "data:application/octet-stream;base64," + Base64.encode(xml);
				if("msSaveBlob" in navigator)	// IE10/11專屬下載function
					navigator.msSaveBlob(blob, fname);
				else {	// Chrome用A的click事件
					var url = URL.createObjectURL(blob);
					// 1080711 Raymond 1080518 改用createElement
					//var $a = $("<a data-role='none' rel='external' data-ajax='false' download='" + fname + "' href='" + url + "'></a>").appendTo("body");		// 2016.12.22	Leslie	改回DOM的標準Click，移到後面去Click
					//$a[0].click()	// 2016.12.22	Leslie	改回DOM的標準Click，加上"[0]"
					//$a.remove();
					console.log("\t%c'" + url + "%c'(" + blob.size + " bytes)", "color:blue;", "color:blue;");
					var link = document.createElement("a");
					link.href = url;
					link.download = fname;
					document.body.appendChild(link);
					if(navigator.userAgent.indexOf("Chrome") >= 0)	// Chrome的自動下載有每連續另存(用Click指令觸發, 手動點超鏈結的不太可能短時間連續)10個檔案就會開始missing click or download, 導致漏存檔案的問題
						links.push(link);							// 改成暫時push到陣列中, 等最後一筆檔案下載完再一次另存, 用async + await指令(IE不支援這些keyword, 連JS都無法載入成功, 改用setTimeout)的方式處理這個問題
					else {	// 其它(Firefox etc...)似乎沒有這個問題
						link.click();
						document.body.removeChild(link);
					}
					//URL.revokeObjectURL(url);	// 不確定click後立即釋放url會不會有問題
				}*/
				q.push({fn: fname, dat: xml});
				// 1140910 Raymond 退輔會序203 合併屏東序882. 新增DraftMgmt.xml中的文稿節點
				var $draft = newElm("文稿", mgmt.documentElement).attr("路徑", fname);
				// 1080709 Raymond 1080518 改用循序式下載附件
				var nAttachments = dm.getAttachFileCounts();
				if(nAttachments > 0) {
					theLogger.log("另存" + dname + "之附件(共" + nAttachments + "筆)開始...");
					// 1140910 Raymond 退輔會序203 合併屏東序882. 新增第4參數DraftMgmt.xml中的文稿節點
					//dlAttach(dm, 0, idx);	// 下載此文稿的第1筆附件
					dlAttach(dm, 0, idx, $draft);	// 下載此文稿的第1筆附件
				}
				else
					dlSingle(idx + 1);	// 無附件則直接下載次筆文稿
			})
			.fail(function(errorText) {
				if("durringDownloadAll" in fm) {	// 防呆
					delete fm.durringDownloadAll;
					if("durringDownloadAllTimer" in nsEditor && typeof nsEditor.durringDownloadAllTimer === "number") {	// 中止補救防呆鎖定計時器
						clearTimeout(nsEditor.durringDownloadAllTimer);
						delete nsEditor.durringDownloadAllTimer;
					}
				}
				alert(errorText);
			});
	}
	// 1140702 Raymond 1140920 新增若有來文電子檔, 則呼叫GetDocAttach取得來文電子檔所有路徑, 下載
	function dlFromFiles(idx) {
		var params = {
			"argArtifact": localStorage.Artifact,
			"argDocNo": fm.getDocObj().docNo
		};
		console.log("查詢來文電子檔 - ");
		window.theWebServices.invokeWS(SSO_CONFIG.getWSUrl('odlibws'), "GetDocAttach", null, params, true, function (rtn, xml) {
			console.log(rtn, xml);
			if (rtn.ErrorClass.IsErr == "false") {
				if(rtn.RtnField0.string && rtn.RtnField0.string.length > 0) {
					var arListName = rtn.RtnField0.string,
						arStgPath = rtn.RtnField4.string,
						arSubDir = rtn.RtnField5.string,
						arFileName = rtn.RtnField1.string,
						fileCnt = arFileName.length,
						wfio = new WebFileIO(fm.fileIOWS);
					function dlSingleFromFile(ind) {
						if(ind >= fileCnt) {	// 最後1筆來文電子檔已下載完成
							dlSingle(idx + fileCnt, true);	// 最後再呼叫dlSingle並傳入第2參數true, 表示要跳過dlFromFiles, 執行打包ZIP的部分
							return;
						}
						var dirPath = arStgPath[ind] + ((arStgPath[ind].match(/\\$/))?'':'\\') + arSubDir[ind],
							fname = arFileName[ind];
						theLogger.log("下載來文電子檔[#" + (ind + 1) + "/" + fileCnt + "]'" + arListName[ind] + "' - " + dirPath + " " + fname);
						wfio.download(dirPath, fname, {
							keepRawData: true,	// 保持原始資料格式(Typed Array)
							success: function(fil, all) {
								// 1140704 Raymond 比照EDI011將R.PDF更名為"來文.PDF"
								if(fname.toUpperCase() == "R.PDF")
									q.push({fn: "來文.PDF", dat: fil});
								else
									q.push({fn: fname, dat: fil});
								
								dlSingleFromFile(ind + 1);	// 循序下載次筆來文電子檔
							},
							error: function(errorText) {
								theLogger.error("下載來文電子檔'" + dirPath + " " + fname + "'失敗! " + errorText);
								alert("下載來文電子檔'" + dirPath + " " + fname + "'失敗!\r\n" + errorText);
								if("durringDownloadAll" in fm) {	// 防呆
									delete fm.durringDownloadAll;
									if("durringDownloadAllTimer" in nsEditor && typeof nsEditor.durringDownloadAllTimer === "number") {	// 中止補救防呆鎖定計時器
										clearTimeout(nsEditor.durringDownloadAllTimer);
										delete nsEditor.durringDownloadAllTimer;
									}
								}
							}
						});
					}
					dlSingleFromFile(0);
				}
				else {
					theLogger.warn("本件公文ODWMSG.SYSID(" + fm.getDocObj().get("ODWMSG", "SYSID") + ")不為空, 但呼叫GetDocAttach回傳無電子檔 - ");
					theLogger.warn(rtn);
					dlSingle(idx, true);	// 最後再呼叫dlSingle並傳入第2參數true, 表示要跳過dlFromFiles, 執行打包ZIP的部分
				}
			}
			else {
				theLogger.error("本件公文ODWMSG.SYSID(" + fm.getDocObj().get("ODWMSG", "SYSID") + ")不為空, 但呼叫GetDocAttach回傳錯誤 - " + rtn.ErrorClass.ErrMessage);
				alert(rtn.ErrorClass.ErrMessage);
				if("durringDownloadAll" in fm) {	// 防呆
					delete fm.durringDownloadAll;
					if("durringDownloadAllTimer" in nsEditor && typeof nsEditor.durringDownloadAllTimer === "number") {	// 中止補救防呆鎖定計時器
						clearTimeout(nsEditor.durringDownloadAllTimer);
						delete nsEditor.durringDownloadAllTimer;
					}
				}
			}
		});
	}
	
	// 1080709 Raymond 1080518 改用循序式下載文稿
	/*var n = fm.getDraftCounts();
	for(var i=0; i<n; i++) {
		dlSingle(i);
	}*/
	theLogger.log("另存整份公文(共" + nDrafts + "筆文稿)開始...");
	fm.durringDownloadAll = true;	// 防呆
	nsEditor.durringDownloadAllTimer = setTimeout(function() {	// 5分鐘後解除防呆鎖定, 若發生任何exception導致持續鎖定功能, 還能在5分鐘後恢復
		if("durringDownloadAll" in fm)							// 另存整份公文的功能, 若檔案多到5分鐘都下載不完, 導致鎖定被解除, 那就只好認了
			delete fm.durringDownloadAll;
	}, 300000);
	dlSingle(0);	// 下載筆1筆文稿
	
	// 1090227 Raymond 1080751 合併內政部1070381回報另存記錄
	if("ReportSaveAsLog" in nsEditor)
		nsEditor.ReportSaveAsLog(fm);
	
	/*theAOL.demoExportFile(false);
	thePublicRsrc.enumDirs("匯出設定", function(dir) {
		for(var i=0; i<dir.children.length; i++) {
			var nm = dir.children[i].name;
			if(nm == "DI") {
				var ph = dir.children[i].remote.path;
				theLogger.log("下載'" + ph + "'...");
				theCacheMgr.get({type: "rsrc", rsrc: dir.children[i]})
					.done(function(xslDoc) {
						theAOL.getCurrFolio().accquireDraftModel(0)
							.done(function(dm) {
								theLogger.log("轉換為DI...");
								//var xmlDoc = dm.accquireXml();
								try {
									var xmlDoc = dm.accquireXml();
									if("XSLTProcessor" in window) {
										var exch = $(xslDoc).find("variable[name='exch']");
										if(exch.length)
											exch.text("TEST.SW");
										var sd = $(xslDoc).find("supported-doctypes");
										if(sd.length) {
											var m = sd.text().split("|");
											theLogger.log(m);
										}
										var xslt = new XSLTProcessor();
										xslt.importStylesheet(xslDoc);
										var res = xslt.transformToDocument(xmlDoc, document);
										theLogger.log("xsl, xml, xslt:");
										theLogger.log(Util.getXml(xslDoc));
										theLogger.log(Util.getXml(xmlDoc));
										theLogger.log((new XMLSerializer()).serializeToString(res));
									}
									else {
										var msxsl = new ActiveXObject("MSXML2.DOMDocument");
										var res = msxsl.loadXML(Util.getXml(xslDoc));
										var exch = msxsl.selectSingleNode("//xsl:variable[@name='exch']");
										exch.text = "TEST.SW";
										res = xmlDoc.transformNode(msxsl);
										theLogger.log("xsl, xml, xslt:");
										theLogger.log(Util.getXml(xslDoc));
										theLogger.log(Util.getXml(xmlDoc));
										theLogger.log(res);
									}
								}
								catch(e) {
									theLogger.error(e.message + " - " + e.sourceURL + ":" + e.line);
									dfd.reject(e.message);
								}
							});
					});
				break;
			}
		}
	});*/
};

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-ExportFile.js").finish();
})();