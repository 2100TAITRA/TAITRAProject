// 錯別字校正功能模組
//	
// DATE		SA			PRG			MGR_NO		DESC
// 1131220	Raymond		Raymond		1131303		初版
// 1140428	Raymond		Raymond		1131303		接受/拒絕錯別字校正時新增傳入段落/條列/TextArea的原始文字
// 1140624	Raymond		Raymond		1131303		ErrCorr外掛新增destroy方法

function ErrorCorrection() {
	
	var _fwd;
	var _dm;
	var _draftGUID;
	var $viewPort = $("#leftPart .viewPort");
	var vpOffset = $viewPort.offset();
	var $ecFloat = $viewPort.find("#errorCorrectionFloat");
	var _target;		// 目前選取中的錯別字標記文字
	var _correctText;	// 校正文字, TODO: 改成陣列以支援多組候選
	var _prevEC;		// 目前選取中的標記的上一個錯別字標記文字
	var _nextEC;		// 目前選取中的標記的下一個錯別字標記文字
	
	var that = this;
	
	
	// onfly style {
	//	position: absolute;
	//	left: 222.67px;
	//	top: 390.98px;
	//	font-size: 16pt;
	//	text-decoration: underline;
	//	text-decoration-style: wavy;
	//	text-underline-position: under;
	//	text-decoration-thickness: 1pt;
	//	text-decoration-color: red;
	//	line-height: 1.2;
	//}
	function markupError(sp, idx, correctText, fixWord) {
		var sf = 0;
		var rng = document.createRange();
		for(var i=0; i<sp.childNodes.length; i++) {
			var nd = sp.childNodes[i];
			if(nd.nodeType == 3) {
				if(nd.nodeValue.length > (idx - sf)) {
					var ofs = idx - sf;
					console.log("markupError('" + nd.nodeValue[ofs] + "')");
					rng.setStart(nd, ofs);
					rng.setEnd(nd, ofs + 1);
					rng.surroundContents($("<span class='checkedError' correct='" + correctText + "'></span>").get(0));
					$(rng.startContainer.childNodes[rng.startOffset]).data("fixWord", fixWord);
					break;
				}
				else
					sf += nd.nodeValue.length;
			}
			else if(nd.nodeName == "SPAN" || nd.nodeName == "INS") {
				if(nd.textContent.length > (idx - sf)) {
					if(!$(nd).is("SPAN.checkedError")) {
						//if(!doMarkupTC(nd))
						//	console.error("markupError() FAILED!");
						rng.selectNode(nd);
						rng.surroundContents($("<span class='checkedError' correct='" + correctText + "'></span>").get(0));
						$(rng.startContainer.childNodes[rng.startOffset]).data("fixWord", fixWord);
					}
					break;
				}
				else
					sf += nd.textContent.length;
			}
			else if(nd.nodeName == "DEL") {
			}
			else
				throw new Error("SPAN.a中有無法識別的子節點:", nd);
		}
	}
	
	// 初始化
	this.init = function(fwd, dm, isOwnDraft) {
		_fwd = fwd;
		_dm = dm;
		_draftGUID = _dm.getDraftGUID();
		var xmlDoc = _dm.accquireXml();
		if("evaluate" in xmlDoc) {
			var ss = xmlDoc.evaluate("/*/主旨 | /*/段落", xmlDoc, null, 7, null);
			for(var i=0; i<ss.snapshotLength; i++) {
				var par = ss.snapshotItem(i);
				if(!par.getAttribute("guid")) {
					if(par.nodeName == "段落")
						theLogger.log(par.nodeName + "[" + par.getAttribute("段名") + "]無GUID");
					else
						theLogger.log(par.nodeName + "無GUID");
					par.setAttribute("guid", Util.genGUID());
					theLogger.log("新增GUID=" + par.getAttribute("guid"));
				}
				if(par.nodeName == "段落")
					sq(par);
			}
			function sq(pnd) {
				for(var j=0; j<pnd.childNodes.length; j++) {
					var cnd = pnd.childNodes[j];
					if(cnd.nodeType == 1 && cnd.nodeName == "條列") {
						if(!cnd.getAttribute("guid")) {
							theLogger.log(cnd.nodeName + "[" + cnd.getAttribute("序號") + "]無GUID");
							cnd.setAttribute("guid", Util.genGUID());
							theLogger.log("新增GUID=" + cnd.getAttribute("guid"));
						}
						arguments.callee.call(this, cnd);
					}
				}
			}
			var dfd = $.Deferred();
			_fwd.mapDraft(_draftGUID, _dm, isOwnDraft).done(function(fixWordList) {
				dfd.resolve();
			});
			return dfd.promise();
		}
		else
			throw new Error("瀏覽器不支援evaluate方法, 無法初始化錯誤字校正模組");
	}
	
	this.attach = function($para) {
		if(!theAOL?.enableFixWord)
			return;
		var $edit = $para.find("span.a");
		var txt = "";
		$.each($edit.get(0).childNodes, function(idx, nd) {
			if(nd.nodeType == 3)
				txt += nd.nodeValue;
			else if(nd.nodeType == 1 && nd.nodeName != "DEL")
				txt += nd.textContent;
		});
		console.log(txt);
		var dfd = $.Deferred();
		var ec = $para.data("editCtlr");
		theLogger.log("ErrorCorrection.attach(" + ec?.xPath + ") '" + txt + "'");
		if(!!ec && !!ec.xPath) {
			try {
				var nd = _dm.nodes(ec.xPath);
				if(!!nd) {
					var paraHash = CryptoJS.SHA256(txt).toString();
					if(paraHash != nd[0].getAttribute("hash")) {
						theLogger.log("段落或條列內容已異動, HASH:" + nd[0].getAttribute("hash") + " -> " + paraHash);
						nd[0].setAttribute("hash", paraHash);
					}
					else
						theLogger.log("段落或條列內容未異動, HASH:" + paraHash);
					$edit.find("span.checkedError").each(function(idx, elm) {
						theAOL.removeFixWord($(elm).data("fixWord"));
						$(elm.childNodes).unwrap();
					});
					var paraGUID = nd[0].getAttribute("guid");
					var fixWordObjs = [];
					_fwd.checkPara(txt, _draftGUID, paraGUID, paraHash, txt.length)
					.done(function(fixWordList) {
						theLogger.log("FixWordData.checkPara(" + ec.xPath + ") returns", fixWordList);
						if(!!fixWordList) {
							for(var i=0; i<fixWordList.length; i++) {
								if(fixWordList[i].status == "pending") {	// 未接受或拒絕的錯別字才標示
									var fwo = $.extend({draftGUID: _draftGUID, paraGUID: paraGUID, paraHash: paraHash, $para: $para}, fixWordList[i]);
									markupError($edit.get(0), fixWordList[i].charIdx, fixWordList[i].fixChar, fwo);
									fixWordObjs.push(fwo);
								}
							}
						}
						dfd.resolve(paraGUID, fixWordObjs);
					})
					.fail(function(errText) {
						theLogger.error(errText);
						dfd.reject(errText);
					});
				}
				else {
					theLogger.error("找不到節點'" + ec.xPath + "'");
					dfd.reject("找不到節點'" + ec.xPath + "'");
				}
			}
			catch(e) {
				theLogger.error(e.stack);
				dfd.reject(e.message);
			}
		}
		else {
			theLogger.error("對接的$para無'editCtlr'物件!");
			dfd.reject("對接的$para無'editCtlr'物件!");
		}
		return dfd.promise();
	}
	
	this.click = function(sp) {
		if(!theAOL?.enableFixWord)
			return;
		$(sp).closest("DIV[name='flow']").find(".checkedError").removeClass("focused");
		$(sp).addClass("focused");
		var fw = $(sp).data("fixWord");
		console.log(fw);
		theAOL.highlightFixWord(fw);
	}
	
	this.remove = function(sp) {
		if(!theAOL?.enableFixWord)
			return;
		var fw = $(sp).data("fixWord");
		console.log(fw);
		theAOL.removeFixWord(fw);
	}
	
	this.hide = function() {
		if(!theAOL?.enableFixWord)
			return;
		$("#leftPart .pg DIV[name='flow']").find(".checkedError").removeClass("focused");
		theAOL.highlightFixWord(null);
	}
	
	this.checkPara = function(txt, $para, paraHash, paraLen, $secPara, secParaHash, mergedParaHash) {
		if(!theAOL?.enableFixWord)
			return;
		var ec = $para.data("editCtlr");
		var sec = ($secPara)?$secPara.data("editCtlr"):null;
		if(!!sec)
			theLogger.log("ErrorCorrection.checkPara('" + txt + "' ec:" + ec?.xPath + ", paraLen:" + paraLen + ", sec:" + sec.xPath + ", mergedParaHash:" + mergedParaHash);
		else
			theLogger.log("ErrorCorrection.checkPara('" + txt + "' ec:" + ec?.xPath);
		if(!!ec && !!ec.xPath) {
			try {
				var nd = _dm.nodes(ec.xPath);
				if(!!nd) {
					if(paraHash != nd[0].getAttribute("hash")) {
						theLogger.log("前段落文字有異動, paraHash:" + nd[0].getAttribute("hash") + " -> " + paraHash);
						nd[0].setAttribute("hash", paraHash);
					}
					else
						theLogger.log("前段落文字未異動, paraHash:" + paraHash);
					if(!!sec && !!sec.xPath) {
						var nd2 = _dm.nodes(sec.xPath);
						if(secParaHash != nd2[0].getAttribute("hash")) {
							theLogger.log("後段落文字有異動, secParaHash:" + nd2[0].getAttribute("hash") + " -> " + secParaHash);
							nd2[0].setAttribute("hash", secParaHash);
						}
						else
							theLogger.log("後段落文字未異動, secParaHash:" + secParaHash);
						var dfd = $.Deferred();	// 1140620 Raymond 1131303 合併條列需要重校, 要等回傳fixWordList
						var paraGUID = nd[0].getAttribute("guid");	// 前一條列也是合併後的條列的GUID
						var fixWordObjs = [];
						_fwd.checkPara(txt, _draftGUID, paraGUID, paraHash, paraLen, nd2[0].getAttribute("guid"), secParaHash, mergedParaHash)
						.done(function(fixWordList) {
							theLogger.log("FixWordData.checkPara(" + ec.xPath + ") returns", fixWordList);
							var $edit = $para.find("span.a");
							$edit.find("span.checkedError").each(function(idx, elm) {
								$(elm.childNodes).unwrap();
							});
							if(!!fixWordList) {
								for(var i=0; i<fixWordList.length; i++) {
									if(fixWordList[i].status == "pending") {	// 未接受或拒絕的錯別字才標示
										var fwo = $.extend({draftGUID: _draftGUID, paraGUID: paraGUID, paraHash: paraHash, $para: $para}, fixWordList[i]);
										markupError($edit.get(0), fixWordList[i].charIdx, fixWordList[i].fixChar, fwo);
										fixWordObjs.push(fwo);
									}
								}
							}
							dfd.resolve(paraGUID, fixWordObjs);
						});
						return dfd.promise();	// 1140620 Raymond 1131303 合併條列需要重校, 要等回傳fixWordList
					}
					else {
						_fwd.checkPara(txt, _draftGUID, nd[0].getAttribute("guid"), paraHash, txt.length)
						.done(function(fixWordList) {
							theLogger.log("FixWordData.checkPara(" + ec.xPath + ") returns", fixWordList);
							var $edit = $para.find("span.a");
							$edit.find("span.checkedError").each(function(idx, elm) {
								$(elm.childNodes).unwrap();
							});
							if(!!fixWordList) {
								for(var i=0; i<fixWordList.length; i++) {
									if(fixWordList[i].status == "pending")	// 未接受或拒絕的錯別字才標示
										markupError($edit.get(0), fixWordList[i].charIdx, fixWordList[i].fixChar, $.extend({draftGUID: _draftGUID, paraGUID: nd[0].getAttribute("guid"), paraHash: nd[0].getAttribute("hash")}, fixWordList[i]));
								}
							}
						});
					}
				}
			}
			catch(e) {
				theLogger.error(e.stack);
			}
		}
	}
	
	this.delPara = function(paraGUID) {
		if(!theAOL?.enableFixWord)
			return;
		theLogger.log("ErrorCorrection.delPara(paraGUID:" + paraGUID);
		[res, err] = _fwd.delPara(_draftGUID, paraGUID);
		if(res != true)
			theLogger.error("同步刪除條列(錯別字校正資訊物件)失敗!", err);
		else
			theLogger.log("同步刪除條列(錯別字校正資訊物件)成功");
	}
	
	this.splitPara = function($para, breakIndex, $secPara, origContentChanged) {
		if(!theAOL?.enableFixWord)
			return;
		var ec = $para.data("editCtlr");
		var sec = $secPara.data("editCtlr");
		theLogger.log("ErrorCorrection.splitPara(ec:" + ec.xPath + ", breakIndex:" + breakIndex + " sec:" + sec.xPath);
		if(!!ec && !!ec.xPath) {
			try {
				var nd = _dm.nodes(ec.xPath);
				if(!!nd) {
					var txt = "";
					if(!origContentChanged) {	// 分割前條列內容未改變時, 才重設hash值
						$.each($para.find("SPAN.a").get(0).childNodes, function(idx, nd) {
							if(nd.nodeType == 3)
								txt += nd.nodeValue;
							else if(nd.nodeType == 1 && nd.nodeName != "DEL")
								txt += nd.textContent;
						});
						console.log(txt);
						var paraHash = CryptoJS.SHA256(txt).toString();
						if(paraHash != nd[0].getAttribute("hash")) {
							theLogger.log("分割後的原條列內容已異動, HASH:" + nd[0].getAttribute("hash") + " -> " + paraHash);
							nd[0].setAttribute("hash", paraHash);
						}
						else
							theLogger.log("分割後的原條列內容未異動, HASH:" + paraHash);
					}
					if(!!sec && !!sec.xPath) {
						var nd2 = _dm.nodes(sec.xPath);
						if(!nd2[0].getAttribute("guid")) {
							nd2[0].setAttribute("guid", Util.genGUID());
							theLogger.log("分割後的新條列新增GUID:" + nd2[0].getAttribute("guid"));
						}
						if(!origContentChanged) {	// 分割前條列內容未改變時, 才重設hash值
							if(!nd2[0].getAttribute("hash")) {
								txt = "";
								$.each($secPara.find("SPAN.a").get(0).childNodes, function(idx, nd) {
									if(nd.nodeType == 3)
										txt += nd.nodeValue;
									else if(nd.nodeType == 1 && nd.nodeName != "DEL")
										txt += nd.textContent;
								});
								console.log(txt);
								nd2[0].setAttribute("hash", CryptoJS.SHA256(txt).toString());
								theLogger.log("分割後的新條列新增HASH:" + nd2[0].getAttribute("hash"));
							}
						}
						[res, err] = _fwd.splitPara(_draftGUID, nd[0].getAttribute("guid"), nd[0].getAttribute("hash"), breakIndex, nd2[0].getAttribute("guid"), nd2[0].getAttribute("hash"));
						if(res == true) {
							theLogger.log("同步分割條列(錯別字校正資訊物件)成功");
							if(!origContentChanged) {	// 分割前條列內容未改變時, 要更新新條列已有的錯別字的charIdx
								$secPara.find("span.checkedError").each(function(idx, elm) {
									var fw = $(elm).data("fixWord");
									if(!!fw) {
										theLogger.log("錯別字'" + elm.textContent + "'之charIdx(" + fw.charIdx + ")更新為" + (fw.charIdx - breakIndex) + ", paraGUID(" + fw.paraGUID + ")更新為" + nd2[0].getAttribute("guid") + ", paraHash(" + fw.paraHash + ")更新為" + nd2[0].getAttribute("hash"));
										fw.charIdx -= breakIndex;
										fw.paraGUID = nd2[0].getAttribute("guid");
										fw.paraHash = nd2[0].getAttribute("hash");
									}
									else
										theLogger.error("錯別字'" + elm.textContent + "'無'fixWord'data物件");
								});
							}
						}
						else
							theLogger.error("同步分割條列(錯別字校正資訊物件)失敗!", err);
					}
				}
			}
			catch(e) {
				theLogger.error(e.stack);
			}
		}
	}
	
	this.acceptFixWord = function(fwo) {
		if(!theAOL?.enableFixWord)
			return;
		theLogger.log("接受錯別字校正:", fwo.origChar, fwo.charIdx, fwo.fixChar);
		var $edit = fwo.$para.find("SPAN.a");
		function doFixWord(txt) {
			var curr = 0;
			$.each($edit.get(0).childNodes, function(idx, nd) {
				if(nd.nodeType == 3) {
					if(fwo.charIdx >= curr && fwo.charIdx < curr + nd.nodeValue.length) {	// fwo.charIdx in this node
						if(nd.nodeValue[fwo.charIdx - curr] == fwo.origChar)
							theLogger.log("找到fwo.charIdx(" + fwo.charIdx + ")...'" + nd.nodeValue[fwo.charIdx - curr] + "'");
						else
							theLogger.error("找錯fwo.charIdx(" + fwo.charIdx + ")...'" + nd.nodeValue[fwo.charIdx - curr] + "'");
						var rng = document.createRange();
						rng.setStart(nd, fwo.charIdx - curr);
						rng.setEnd(nd, fwo.charIdx - curr + 1);
						rng.textContent = txt;
						return false;
					}
					curr += nd.nodeValue.length;
					theLogger.log("curr = ", curr);
				}
				else {
					var $elm = $(nd);
					if(!$elm.is("DEL")) {
						if(nd.textContent.length > 1)
							theLogger.warn(nd.nodeName + ".textContent('" + nd.textContent + "')長度超過1, 可能會造成異常");
						if(fwo.charIdx >= curr && fwo.charIdx < curr + nd.textContent.length) {
							if($elm.is("INS") || $elm.is("SPAN.fmt")) {
								if($elm.attr("data-sn") == _dm.getEditSN()) {
									theLogger.log(nd.nodeName + "為目前使用者所新增的元素, 直接置換");
									$elm.replaceWith(txt);
								}
								else {
									theLogger.log(nd.nodeName + "非目前使用者所新增的元素, 需追蹤修訂");
									$elm.replaceWith(txt);
								}
							}
							else if($elm.is("SPAN.checkedError")) {
								if($elm.find("INS, SPAN.fmt").length > 0) {
									var $elm2 = $elm.find("INS, SPAN.fmt");
									if($elm2.attr("data-sn") == _dm.getEditSN()) {
										theLogger.log(nd.nodeName + "為目前使用者所新增的元素, 替換文字節點後移除錯別字標示元素");
										$elm2.prop("textContent", txt).unwrap();
									}
									else {
										theLogger.log(nd.nodeName + "非目前使用者所新增的元素, 刪除錯別字後新增追蹤修訂的校正字");
										var $nn;
										if($elm.children().length && !!$elm.children().attr("data-styles")) {	// 原字有樣式的話, 複製到追蹤修訂新增的字
											$nn = $("<span class='fmt' data-styles='" + $elm.children().attr("data-styles") + "'>" + txt + "</span>");
										}
										else
											$nn = document.createTextNode(txt);
										var ns = $elm.get(0).nextSibling;
										//if(!!ns && ns.nodeType == 3 && ns.nodeValue.length == 0)
										//	ns = ns.nextSibling;
										if(!!ns) {
											if(ns.nodeType == 3 && !$nn.is("SPAN")) {
												ns.nodeValue = txt + ns.nodeValue;
											}
											else {
												$(ns).before($nn);
											}
										}
										else
											$elm.parent().append($nn);
										$elm.remove();
									}
								}
								else {
									theLogger.log("直接置換SPAN.checkedError元素");
									$elm.replaceWith(txt);
								}
							}
							else {
								theLogger.error("unknown element", nd);
							}
							return false;
						}
						curr += nd.textContent.length;
						theLogger.log("curr = ", curr);
					}
				}
			});
		}
		// 1140428 Raymond 1131303 新增修正錯別字前的原始段落/條列文字
		var origTxt = "";
		$.each($edit.get(0).childNodes, function(idx, nd) {
			if(nd.nodeType == 3)
				origTxt += nd.nodeValue;
			else if(nd.nodeType == 1 && nd.nodeName != "DEL")
				origTxt += nd.textContent;
		});
		theLogger.log("修正錯別字前paraText:", origTxt);
		if(Array.isArray(fwo.fixChar))
			doFixWord(fwo.fixChar[fwo.cndtIdx]);
		else
			doFixWord(fwo.fixChar);
		$edit.trigger("blur", {ignoreCheckPara:true});	// 增加ignoreCheckPara參數, 避免接受校正時, 又觸發一次checkPara
		
		var txt = "";
		$.each($edit.get(0).childNodes, function(idx, nd) {
			if(nd.nodeType == 3)
				txt += nd.nodeValue;
			else if(nd.nodeType == 1 && nd.nodeName != "DEL")
				txt += nd.textContent;
		});
		theLogger.log("修正錯別字後paraText:", txt);
		var newParaHash = CryptoJS.SHA256(txt).toString();
		theLogger.log("new hash:" + newParaHash);
		var ec = fwo.$para.data("editCtlr");
		if(!!ec && !!ec.xPath) {
			try {
				var nd = _dm.nodes(ec.xPath);
				if(!!nd) {
					theLogger.log("因接受校正字, 重設(" + ec.xPath + ")異動後Hash值(old hash:" + nd[0].getAttribute("hash") + ")");
					nd[0].setAttribute("hash", newParaHash);
				}
			}
			catch(e) {
				theLogger.error(e.stack);
			}
		}
		
		if(Array.isArray(fwo.fixChar))
			_fwd.acceptFix(fwo.draftGUID, fwo.paraGUID, newParaHash, fwo.charIdx, fwo.charIdx, fwo.fixChar[fwo.cndtIdx], fwo.cndtIdx, origTxt);	// 1140428 Raymond 1131303 多傳入修正錯別字前的原始段落/條列文字
		else
			_fwd.acceptFix(fwo.draftGUID, fwo.paraGUID, newParaHash, fwo.charIdx, fwo.charIdx, fwo.fixChar, 0, origTxt);	// 1140428 Raymond 1131303 多傳入修正錯別字前的原始段落/條列文字
		
		if(!!ec && !!ec.refreshContent) {
			ec.refreshContent();	// 重新整理
			var fixWordObjs = [];
			_fwd.checkPara(txt, _draftGUID, fwo.paraGUID, newParaHash, txt.length)
			.done(function(fixWordList) {
				theLogger.log("FixWordData.checkPara(" + ec.xPath + ") returns", fixWordList);
				if(!!fixWordList) {
					for(var i=0; i<fixWordList.length; i++) {
						if(fixWordList[i].status == "pending") {	// 未接受或拒絕的錯別字才標示
							var fwo2 = $.extend({draftGUID: _draftGUID, paraGUID: fwo.paraGUID, paraHash: newParaHash, $para: fwo.$para}, fixWordList[i]);
							markupError($edit.get(0), fixWordList[i].charIdx, fixWordList[i].fixChar, fwo2);
							fixWordObjs.push(fwo2);
						}
					}
				}
				//dfd.resolve(paraGUID, fixWordObjs);
			})
			.fail(function(errText) {
				theLogger.error(errText);
				//dfd.reject(errText);
			});
		}
	}
	
	this.rejectFixWord = function(fwo) {
		if(!theAOL?.enableFixWord)
			return;
		theLogger.log("取消錯別字校正:", fwo.origChar, fwo.charIdx);
		var $edit = fwo.$para.find("SPAN.a");
		// 1140428 Raymond 1131303 新增取消錯別字前的原始段落/條列文字
		var origTxt = "";
		$.each($edit.get(0).childNodes, function(idx, nd) {
			if(nd.nodeType == 3)
				origTxt += nd.nodeValue;
			else if(nd.nodeType == 1 && nd.nodeName != "DEL")
				origTxt += nd.textContent;
		});
		theLogger.log("取消錯別字前paraText:", origTxt);
		var curr = 0;
		$.each($edit.get(0).childNodes, function(idx, nd) {
			if(nd.nodeType == 3) {
				if(fwo.charIdx >= curr && fwo.charIdx < curr + nd.nodeValue.length) {	// fwo.charIdx in this node
					if(nd.nodeValue[fwo.charIdx - curr] == fwo.origChar)
						theLogger.error("找到fwo.charIdx(" + fwo.charIdx + ")...'" + nd.nodeValue[fwo.charIdx - curr] + "', 但此字未標示錯別字");
					else
						theLogger.error("找錯fwo.charIdx(" + fwo.charIdx + ")...'" + nd.nodeValue[fwo.charIdx - curr] + "'");
					return false;
				}
				curr += nd.nodeValue.length;
				theLogger.log("curr = ", curr);
			}
			else {
				var $elm = $(nd);
				if(!$elm.is("DEL")) {
					if(nd.textContent.length > 1)
						theLogger.warn(nd.nodeName + ".textContent('" + nd.textContent + "')長度超過1, 可能會造成異常");
					if(fwo.charIdx >= curr && fwo.charIdx < curr + nd.textContent.length) {
						if($elm.is("INS") || $elm.is("SPAN.fmt")) {
							if($elm.attr("data-sn") == _dm.getEditSN()) {
								theLogger.log(nd.nodeName + "為目前使用者所新增的元素, 直接移除錯別字標示");
								$elm.removeClass("checkedError");
							}
							else {
								theLogger.log(nd.nodeName + "非目前使用者所新增的元素, 直接移除錯別字標示");
								$elm.removeClass("checkedError");
							}
						}
						else if($elm.is("SPAN.checkedError")) {
							theLogger.log("直接unwrap SPAN.checkedError元素");
							$(nd.childNodes).unwrap();
						}
						else {
							theLogger.error("unknown element", nd);
						}
						return false;
					}
					curr += nd.textContent.length;
					theLogger.log("curr = ", curr);
				}
			}
		});
		
		_fwd.rejectFix(fwo.draftGUID, fwo.paraGUID, fwo.paraHash, fwo.charIdx, fwo.charIdx, origTxt);	// 1140428 Raymond 1131303 多傳入取消錯別字前的原始段落/條列文字
	}
};

// 支援TEXTAREA的錯別字校正外掛
$.fn.errCorr = function(options, command) {
	
	if(!!command) {
		if(command == "delPara") {
			theLogger.log("錯別字校正模組指令'" + command + "'-", options);
			options.fwd.delPara(options.draftGUID, options.paraGUID);
		}
		else if(command == "delDraft") {
			theLogger.log("錯別字校正模組指令'" + command + "'-", options);
			options.fwd.delDraft(options.draftGUID);
		}
		return;
	}
	// 1140623 Raymond 1131303 新增destroy
	if(typeof options === "string") {
		if(options == "destroy") {
			return this.each(function() {
				if(!!this.previousElementSibling && $(this.previousElementSibling).is("DIV.err-corr-cover")) {
					theLogger.log("移除此TextArea的errCorr外掛");
					$(this.previousElementSibling).remove();
					$(this).removeClass("err-corr-target").off("select, selectionchange, input, change, blur, scroll");
				}
				else
					theLogger.warn("此TextArea未綁定errCorr外掛");
			});
		}
		else
			theLogger.error("errCorr外掛第一個參數除了'destroy'外, 必須是物件");
		return;
	}
	
	var opts = $.extend({
	}, options);
	var $isoCntr = $("#leftPart #isoContainer");
	var cntrOffset = $isoCntr.offset();
	var $ecFloat = $isoCntr.find("#errorCorrectionFloat");
	
	function markupError(div, idx, corrText, fixWord) {
		var sf = 0, rng = document.createRange();
		for(var i=0; i<div.childNodes.length; i++) {
			var nd = div.childNodes[i];
			if(nd.nodeType == 3) {
				if(nd.nodeValue.length > (idx - sf)) {
					var ofs = idx - sf;
					console.log("markupError('" + nd.nodeValue[ofs] + "')");
					rng.setStart(nd, ofs);
					rng.setEnd(nd, ofs + 1);
					rng.surroundContents($("<span class='checkedError' char-idx='" + idx + "' correct='" + corrText + "'></span>").get(0));
					$(rng.startContainer.childNodes[rng.startOffset]).data("fixWord", fixWord);
					break;
				}
				else
					sf += nd.nodeValue.length;
			}
			else if(nd.nodeName == "SPAN") {
				if(nd.textContent.length > (idx - sf)) {
					if($(nd).is("SPAN.checkedError")) {
						console.warn("dup!?");
					}
					else {
						console.warn("markup a SPAN!?", nd);
						rng.selectNode(nd);
						rng.surroundContents($("<span class='checkedError' char-idx='" + idx + "' correct='" + corrText + "'></span>").get(0));
						$(rng.startContainer.childNodes[rng.startOffset]).data("fixWord", fixWord);
					}
					break;
				}
				else
					sf += nd.textContent.length;
			}
			else if(nd.nodeName == "BR") {
				sf += 1;
			}
			else
				throw new Error("DIV中有無法識別的子節點:", nd);
		}
	}
	function _showECFloat(x, y, ta) {
		/*var oldTA = $ecFloat.data("targetTA");
		if(!oldTA || oldTA != ta) {
			var oldTOId = $ecFloat.data("visDectId");
			if(!!oldTOId) {
				console.log("clear old interval id:", oldTOId);
				clearInterval(oldTOId);
			}
			// 監控TEXTAREA不可視時, 自動隱藏校正子視窗
			const period = 500;
			var visDectId = setInterval(function(targetTA) {
				if(!$(targetTA).is(":visible")) {
					console.log("target TA is INVISIBLE, hide ecFloat");
					$(targetTA).parent().find(".err-corr-cover").find(".focused").removeClass("focused");
					_hideECFloat();
				}
			}, period, ta);
			$ecFloat.css("left", x + "px").css("top", y + "px").data("targetTA", ta).data("visDectId", visDectId);
		}
		else*/
			$ecFloat.css("left", x + "px").css("top", y + "px");
	}
	function _hideECFloat() {
		/*var oldTOId = $ecFloat.data("visDectId");
		if(!!oldTOId) {
			console.log("clear old interval id:", oldTOId);
			clearInterval(oldTOId);
		}*/
		console.log("_hideECFloat()");
		$ecFloat.css("left", "").css("top", "")/*.data("targetTA", null).data("visDectId", null)*/;
	}
	function selChar(div, idx, ta, onAccept, onReject) {
		var sf = 0;
		for(var i=0; i<div.childNodes.length; i++) {
			var nd = div.childNodes[i];
			if(nd.nodeType == 3) {
				if(nd.nodeValue.length > (idx - sf)) {
					var ofs = idx - sf;
					console.log("selChar('" + nd.nodeValue[ofs] + "')");
					break;
				}
				else
					sf += nd.nodeValue.length;
			}
			else if(nd.nodeName == "SPAN") {
				if(nd.textContent.length > (idx - sf)) {
					if($(nd).is("SPAN.checkedError")) {
						var ofs = idx - sf;
						console.log("selChar(<SPAN.checkedError>" + nd.textContent[ofs] + "<SPAN>)");
						
						$(div).find(".focused").removeClass("focused");
						$(nd).addClass("focused");
						
						var rng = document.createRange();
						rng.selectNode(div);
						var brc = rng.getBoundingClientRect();
						_showECFloat(Math.floor(brc.left - cntrOffset.left - 210), Math.floor(brc.top - cntrOffset.top), ta);
						
						function initECFloat(ndE, fwo) {
							$ecFloat.find("ul > li").remove();
							var candiBaseTI = 4;
							$("<li><span class='origChar'>" + fwo.origChar + "</span>→<span class='fixChar' tabindex='" + candiBaseTI + "'>" + fwo.fixChar + "</span></li>").appendTo($ecFloat.find("ul"))
								.find(".fixChar").on("click", fwo, function(evt) {
									var oldSel = ta.selectionStart;
									$(ndE).text(evt.data.fixChar);
									$(ndE.childNodes[0]).unwrap();
									onAccept.call(ndE, evt.data);
									console.log("selectionStart = " + ta.selectionStart + ", selectionEnd = " + ta.selectionEnd);
									ta.selectionStart = ta.selectionEnd = oldSel + 1;
									_hideECFloat();
								});
							$ecFloat.find("#rejectCorrection").off("click").one("click", fwo, function(evt) {
								var oldSel = ta.selectionStart;
								$(ndE.childNodes[0]).unwrap();
								onReject.call(ndE, evt.data);
								console.log("selectionStart = " + ta.selectionStart + ", selectionEnd = " + ta.selectionEnd);
								ta.selectionStart = ta.selectionEnd = oldSel + 1;
								_hideECFloat();
							});
							var pn = ndE.previousSibling;
							while(!!pn) {
								if(pn.nodeType == 1 && pn.tagName == "SPAN" && pn.className == "checkedError")
									break;
								pn = pn.previousSibling;
							}
							if(!!pn) {
								$ecFloat.find("#prevError").off("click").one("click", pn, function(evt) {
									console.log("prevError", evt.data);
									$(div).find(".focused").removeClass("focused");
									$(evt.data).addClass("focused");
									initECFloat(evt.data, $(evt.data).data("fixWord"));
								}).removeClass("ui-disabled");
							}
							else {
								$ecFloat.find("#prevError").addClass("ui-disabled");
							}
							var nn = ndE.nextSibling;
							while(!!nn) {
								if(nn.nodeType == 1 && nn.tagName == "SPAN" && nn.className == "checkedError")
									break;
								nn = nn.nextSibling;
							}
							if(!!nn) {
								$ecFloat.find("#nextError").off("click").one("click", nn, function(evt) {
									console.log("nextError", evt.data);
									$(div).find(".focused").removeClass("focused");
									$(evt.data).addClass("focused");
									initECFloat(evt.data, $(evt.data).data("fixWord"));
								}).removeClass("ui-disabled");
							}
							else {
								$ecFloat.find("#nextError").addClass("ui-disabled");
							}
						}
						initECFloat(nd, $(nd).data("fixWord"));
						return true;
					}
					else {
						console.warn("a SPAN without checkedError!?", nd);
					}
					break;
				}
				else
					sf += nd.textContent.length;
			}
			else if(nd.nodeName == "BR") {
				if(1 > (idx - sf)) {
					console.log("selChar(<BR>)");
					break;
				}
				else
					sf += 1;
			}
			else
				throw new Error("DIV中有無法識別的子節點:", nd);
		}
		$(div).find(".focused").removeClass("focused");
		_hideECFloat();
	}
	
	return this.each(function() {
		var $that = $(this),
			_fwd = opts.fwd,
			_draftGUID = opts.draftGUID,
			_paraGUID = opts.paraGUID,
			_origHash = CryptoJS.SHA256(this.value).toString(),
			_srcNm = opts.srcNm,
			_checkedStr = this.value,
			_blurSelStart,
			_blurSelEnd;
		// 1140527 Raymond 1131303 修正開啟已存有FixWordData.json的公文, 會重複叫用theAOL.bindSC綁定簽辦意見兩次的問題, 後面TextArea的事件綁定前都要先off
		if(!!this.previousElementSibling && $(this.previousElementSibling).is("DIV.err-corr-cover")) {
			console.log("此TextArea重複綁定errCorr外掛, 移除前一個");
			$(this.previousElementSibling).remove();
		}
		var $cvr = $("<div class='err-corr-cover' spellcheck='false'></div>").insertBefore(this).css({
			width: this.style?.width || $that.css("width"),
			height: $that.css("height"),
			boxSizing: $that.css("box-sizing"),
			margin: $that.css("margin"),
			padding: $that.css("padding"),
			fontFamily: $that.css("font-family"),
			fontSize: $that.css("font-size"),
			fontWeight: $that.css("font-weight"),
			lineHeight: $that.css("line-height"),
			whiteSpace: $that.css("white-space"),
			overflow: $that.css("overflow"),
			color: $that.css("color"),
			borderWidth: $that.css("border-width"),
			borderStyle: $that.css("border-style"),
			borderColor: "transparent"})
			.text(this.value);
		if($that.prop("spellcheck") == true)
			$that.prop("spellcheck", false);
		$that.addClass("err-corr-target").off("select").on("select", evt => {
			theLogger.log("textarea.on" + evt.type, this.selectionStart, this.selectionEnd);
			if(this.selectionStart == this.selectionEnd) {
				$cvr.css("opacity", "1");
			}
			else
				$cvr.css("opacity", "0");
		})
		.off("selectionchange").on("selectionchange", evt => {
			theLogger.log("textarea.on" + evt.type, this.selectionStart, this.selectionEnd);
			if(this.selectionStart == this.selectionEnd) {
				if(this.selectionStart == _blurSelStart && this.selectionEnd == _blurSelEnd)
					theLogger.log("selection not changed");
				else {
					$cvr.css("opacity", "1");
					var that = this;
					selChar($cvr[0], this.selectionStart, this, function(fwo) {	// onAccept
						theLogger.log("接受錯別字校正:", fwo.origChar, fwo.charIdx, fwo.fixChar);
						if(that.value.length > fwo.charIdx && that.value[fwo.charIdx] == fwo.origChar) {
							var origTxt = that.value;	// 1140428 Raymond 1131303 校正前原始文字
							that.value = that.value.substr(0, fwo.charIdx) + fwo.fixChar + that.value.substr(fwo.charIdx + 1);
							var newHash = CryptoJS.SHA256(that.value).toString();
							_fwd.acceptFix(fwo.draftGUID, fwo.paraGUID, newHash, fwo.charIdx, fwo.charIdx, fwo.fixChar, 0, origTxt);	// 1140428 Raymond 1131303 多傳入修正錯別字前的原始文字
							$(that).trigger("input");
						}
					}, function(fwo) {	// onReject
						theLogger.log("取消錯別字校正:", fwo.origChar, fwo.charIdx);
						_fwd.rejectFix(fwo.draftGUID, fwo.paraGUID, fwo.paraHash, fwo.charIdx, fwo.charIdx, that.value);	// 1140428 Raymond 1131303 多傳入取消錯別字前的原始文字
					});
				}
			}
			else {
				$cvr.css("opacity", "0");
				_hideECFloat();
			}
		})
		.off("input").on("input", evt => {
			theLogger.log("textarea.on" + evt.type, evt.originalEvent?.data, this.value);
			$cvr[0].innerText = this.value;
			if(!evt.originalEvent || (!!evt.originalEvent?.data && evt.originalEvent.data.match(/，|。/))) {
				var newHash = CryptoJS.SHA256(this.value).toString();
				_checkedStr = this.value;	// 記下本次檢核錯別字時的文字, 若onchange時this.value與本次檢核時的文字相同, 則不需要重複檢核
				_fwd.checkPara(this.value, _draftGUID, _paraGUID, newHash, this.value.length).done(fixWordList => {
					if(!!fixWordList) {
						for(var i=0; i<fixWordList.length; i++) {
							if(fixWordList[i].status == "pending") {	// 未接受或拒絕的錯別字才標示
								var fwo = $.extend({draftGUID: _draftGUID, paraGUID: _paraGUID, paraHash: newHash, $ta: $that}, fixWordList[i]);
								markupError($cvr[0], fixWordList[i].charIdx, fixWordList[i].fixChar, fwo);
							}
						}
					}
				});
			}
		})
		.off("change").on("change", evt => {
			theLogger.log("textarea.on" + evt.type, evt.originalEvent.data, this.value);
			if(_checkedStr != this.value) {	// 刪除字或新增非全形逗句號後onchange, 也要檢查錯別字
				var newHash = CryptoJS.SHA256(this.value).toString();
				_checkedStr = this.value;	// 記下本次檢核錯別字時的文字, 若onchange時this.value與本次檢核時的文字相同, 則不需要重複檢核
				_fwd.checkPara(this.value, _draftGUID, _paraGUID, newHash, this.value.length).done(fixWordList => {
					if(!!fixWordList) {
						for(var i=0; i<fixWordList.length; i++) {
							if(fixWordList[i].status == "pending") {	// 未接受或拒絕的錯別字才標示
								var fwo = $.extend({draftGUID: _draftGUID, paraGUID: _paraGUID, paraHash: newHash, $ta: $that}, fixWordList[i]);
								markupError($cvr[0], fixWordList[i].charIdx, fixWordList[i].fixChar, fwo);
							}
						}
					}
				});
			}
		})
		.off("blur").on("blur", evt => {
			theLogger.log("textarea.on" + evt.type, evt.originalEvent);
			if(!!evt.relatedTarget && evt.relatedTarget.nodeType == 1 && (evt.relatedTarget?.id == "rejectCorrection" || evt.relatedTarget?.id == "fixChar" || evt.relatedTarget?.id == "prevError" || evt.relatedTarget?.id == "nextError")) {
				theLogger.log("focus to ecFloat elements, NO hide", evt.relatedTarget);
			}
			else
			setTimeout(function() {
				if(document.getSelection().rangeCount > 0) {
					theLogger.log(document.getSelection());
					var rng = document.getSelection().getRangeAt(0);
					if($(rng.startContainer).closest("#errorCorrectionFloat").length > 0) {
						theLogger.log(rng.startContainer);
						if(rng.startContainer.nodeType != 1 || (rng.startContainer.tagName != "BUTTON" && rng.startContainer.className != "fixChar")) {
							setTimeout(function() {
								_blurSelStart = $that[0].selectionStart;
								_blurSelEnd = $that[0].selectionEnd;
								theLogger.log("focus back to TA", _blurSelStart, _blurSelEnd);
								$that.trigger("focus");
							}, 50);
						}
					}
					else {
						$cvr.find(".focused").removeClass("focused");
						_hideECFloat();
					}
				}
				else {
					$cvr.find(".focused").removeClass("focused");
					_hideECFloat();
				}
			}, 50);
		})
		.off("scroll").on("scroll", evt => {
			theLogger.log("textarea.on" + evt.type, evt.originalEvent, this.scrollTop);
			$cvr[0].scrollTop = this.scrollTop;
		});
		
		// 監控到TEXTAREA的大小改變後, 隨之改變Cover的大小
		(new ResizeObserver(entries => {
			theLogger.log("onresize:", entries, this.offsetHeight, this.offsetWidth);
			$cvr.css("height", $(this).height() + "px").css("width", this.style?.width || (this.offsetWidth + "px"));
		})).observe(this);
		
		_fwd.initTA(_draftGUID, _paraGUID, _origHash, this.value).done(fixWordList => {
			theLogger.log("initTA(" + _srcNm + ") returns", fixWordList);
			if(!!fixWordList) {
				for(var i=0; i<fixWordList.length; i++) {
					if(fixWordList[i].status == "pending") {	// 未接受或拒絕的錯別字才標示
						var fwo = $.extend({draftGUID: _draftGUID, paraGUID: _paraGUID, paraHash: _origHash, $ta: $that}, fixWordList[i]);
						markupError($cvr[0], fixWordList[i].charIdx, fixWordList[i].fixChar, fwo);
					}
				}
			}
		})
		.fail(function(errText) {
			theLogger.error(errText);
		});
	});
};

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-ErrorCorrection.js").finish();
})();