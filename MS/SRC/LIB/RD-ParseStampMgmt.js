// 1081218	Raymond		Raymond		-------		為修正文字意見的XSS漏洞, 解讀文字式選用章戳時保留折行字元不要轉為<br>
// 1110408	Joe			Joe			1110092		新增文別屬性，用於篩選共用章戳

function parseStampMgmt(stampMgmt, temp) {
	
    // 2013.11.7 - Raymond, 重寫...
	$.each(stampMgmt.documentElement.childNodes, function(i, nd) {
		if(nd.nodeType == 1) {
			if(nd.tagName == "GROUP_INFO") {
				$.each(nd.childNodes, function(j, nd2) {	// group
					if(nd2.nodeType == 1) {
						theAOL.toolStampBox.push({
							groupId: nd2.getAttribute("groupId"),
							groupName: nd2.getAttribute("groupName"),
							orgNo: nd2.getAttribute("orgNo"),
							userOrOrg: temp,
							stamps: new Array()
						});
					}
				});
			}
			else if(nd.tagName == "SIGNET_BOX") {
				$.each(nd.childNodes, function(j, nd2) {	// signet
					if(nd2.nodeType == 1) {
						var signet = {
							id: nd2.getAttribute("id"),
							title: nd2.getAttribute("title"),
							NameL: nd2.getAttribute("NameL"),
							autoPress: nd2.getAttribute("autoPress"),
							dir: nd2.getAttribute("dir"),
							userOrOrg: temp
						};
						$.each(nd2.childNodes, function(k, nd3) {
							if(nd3.nodeType == 1) {
								if(nd3.tagName == "SIZE")
									signet.size = {w: nd3.getAttribute("w"), h: nd3.getAttribute("h")};
								else if(nd3.tagName == "顏色")
									signet.color = {r: nd3.getAttribute("紅"), g: nd3.getAttribute("綠"), b: nd3.getAttribute("藍")};
								else if(nd3.tagName == "檔案資訊") {
									signet.fileInfo = {};
									$.each(nd3.childNodes, function(l, nd4) {
										if(nd4.nodeType == 1) {
											if(nd4.tagName == "檔案格式")
												signet.fileInfo.fileForm = nd4.textContent;
											else if(nd4.tagName == "檔案名稱")
												signet.fileInfo.fileName = nd4.textContent;
										}
									});
								}
							}
						});
						theAOL.signetBox.push(signet);
					}
				});
			}
			else if(nd.tagName == "TOOL_STAMP_BOX") {
				$.each(nd.childNodes, function(j, nd2) {	// stamp
					if(nd2.nodeType == 1) {
						var stamp = {
							stampId: nd2.getAttribute("stampId"),
							stampName: nd2.getAttribute("stampName"),
							groupId: nd2.getAttribute("groupId"),
							dir: nd2.getAttribute("dir"),
							actionName: nd2.getAttribute("actionName"),
							userOrOrg: temp,
							//1110408	Joe[1110092]	新增文別屬性，用於篩選共用章戳
							cateList: (nd2.getAttribute("cateList")?nd2.getAttribute("cateList"):"")
						};
						$.each(nd2.childNodes, function(k, nd3) {
							if(nd3.nodeType == 1) {
								if(nd3.tagName == "SIZE")
									stamp.size = {w: nd3.getAttribute("w"), h: nd3.getAttribute("h")};
								else if(nd3.tagName == "顏色")
									stamp.color = {r: nd3.getAttribute("紅"), g: nd3.getAttribute("綠"), b: nd3.getAttribute("藍")};
								else if(nd3.tagName == "FILE_INFO_LIST" &&
										Number(nd3.getAttribute("count")) > 0) {
									stamp.fileInfo = {};
									$.each(nd3.childNodes[0].childNodes, function(l, nd4) {
										if(nd4.nodeType == 1) {
											if(nd4.tagName == "檔案格式")
												stamp.fileInfo.fileForm = nd4.textContent;
											else if(nd4.tagName == "檔案名稱")
												stamp.fileInfo.fileName = nd4.textContent;
										}
									});
								}
								else if(nd3.tagName == "TextContent")
									// 1081218 Raymond FIX XSS & 保留折行字元
									// 1061006 Raymond 1060864 修正有全半形空白會折行問題
									//1051122 Kevin 修正章戳支援換行
									stamp.textContent = nd3.textContent;
									//stamp.textContent = nd3.textContent.replace(/\s/g, "<br>")
									//stamp.textContent = nd3.textContent.replace(/\n/g, "<br>");
								else if(nd3.tagName == "字型") {
									stamp.font = {};
									$.each(nd3.childNodes, function(l, nd4) {
										if(nd4.nodeType == 1) {
											if(nd4.tagName == "名稱")
												stamp.font.name = nd4.textContent;
											else if(nd4.tagName == "樣式")
												stamp.font.style = nd4.textContent;
											else if(nd4.tagName == "大小")
												stamp.font.size = nd4.textContent;
											else if(nd4.tagName == "顏色")
												stamp.font.color = {r: nd4.getAttribute("紅"), g: nd4.getAttribute("綠"), b: nd4.getAttribute("藍")};
										}
									});
								}
							}
						});
						// 插入相符的Group
						$.each(theAOL.toolStampBox, function(i, box) {
							if(box.groupId == stamp.groupId &&
								box.userOrOrg == stamp.userOrOrg)	// 2015.10.12 判斷個人或共用群組, groupId會重複
								box.stamps.push(stamp);
						});
					}
				});
			}
			else if(nd.tagName == "SYSTEM_STAMP_BOX") {
				$.each(nd.childNodes, function(j, nd2) {	// stamp
					if(nd2.nodeType == 1) {	// 2015.3.17 新增判斷節點類型, 若是文字節點要忽略
						var stamp = {
							stampId: nd2.getAttribute("stampId"),
							stampName: nd2.getAttribute("stampName"),
							dir: nd2.getAttribute("dir"),
							userOrOrg: temp
						};
						$.each(nd2.childNodes, function(k, nd3) {
							if(nd3.nodeType == 1) {
								if(nd3.tagName == "SIZE")
									stamp.size = {w: nd3.getAttribute("w"), h: nd3.getAttribute("h")};
								else if(nd3.tagName == "顏色")
									stamp.color = {r: nd3.getAttribute("紅"), g: nd3.getAttribute("綠"), b: nd3.getAttribute("藍")};
								else if(nd3.tagName == "FILE_INFO_LIST" &&
										Number(nd3.getAttribute("count")) > 0) {
									stamp.fileInfo = {};
									$.each(nd3.childNodes[0].childNodes, function(l, nd4) {
										if(nd4.nodeType == 1) {
											if(nd4.tagName == "檔案格式")
												stamp.fileInfo.fileForm = nd4.textContent;
											else if(nd4.tagName == "檔案名稱")
												stamp.fileInfo.fileName = nd4.textContent;
										}
									});
								}
								else if(nd3.tagName == "TextContent")
									// 1081218 Raymond FIX XSS & 保留折行字元
									// 1061006 Raymond 1060864 修正有全半形空白會折行問題
									//1051122 Kevin 修正章戳支援換行
									stamp.textContent = nd3.textContent;
									//stamp.textContent = nd3.textContent.replace(/\s/g, "<br>");
									//stamp.textContent = nd3.textContent.replace(/\n/g, "<br>");
								else if(nd3.tagName == "字型") {
									stamp.font = {};
									$.each(nd3.childNodes, function(l, nd4) {
										if(nd4.nodeType == 1) {
											if(nd4.tagName == "名稱")
												stamp.font.name = nd4.textContent;
											else if(nd4.tagName == "樣式")
												stamp.font.style = nd4.textContent;
											else if(nd4.tagName == "大小")
												stamp.font.size = nd4.textContent;
											else if(nd4.tagName == "顏色")
												stamp.font.color = {r: nd4.getAttribute("紅"), g: nd4.getAttribute("綠"), b: nd4.getAttribute("藍")};
										}
									});
								}
							}
						});
						theAOL.systemStampBox.push(stamp);
					}
				});
			}
		}
	});
}

(function() {
    if(window.theModMgr != undefined)
        window.theModMgr.install("RD-ParseStampMgmt.js").finish();
})();