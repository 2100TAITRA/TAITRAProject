/* jshint -W100 */
/*-- 2019.7 - Eric, 公文傳送作業分頁功能 */

/*
DATE	MGRNO		SA		PG		Desc
1110421 1110164 	Kevin	Kevin	弱掃移動script至js
1140609	問題序73		Leslie	Leslie	調整簽核元件異常處置，修正檢核的錯誤訊息，及背景傳送斷鍊問題
1141218	1141658		Leslie	Leslie	增加佇列檢核機制，以防止傳送中斷時，後續的公文都只會加入等候
*/

//1110421 Kevin 1110164 弱掃移動script至js
// debug alert enable/disable
window._enableDebug = false;
theSSO._showDebugAlert = false;
theSSO._showSubmitAlert = false;
theSSO._doRealSubmit = true;

//1140828	Leslie	修正背景傳送時，沒有Util.genGUID()的問題
var Util = new function() {
	
	this.getRelativeOffset = function(elem, base) {
		
		//theLogger.log("開始" + elem.type);
		//theLogger.log("scrollTop: " + base.parentNode.scrollTop);
		function recursive(e, b, l, t, plus) {
			var p = e.offsetParent;
			/*if(p.id)
				theLogger.log("offsetParent: " + p.tagName + "#" + p.id);
			else if(p.className)
				theLogger.log("offsetParent: " + p.tagName + "." + p.className);
			else
				theLogger.log("offsetParent: " + p.tagName);
			theLogger.log("  offset: " + e.offsetLeft + ", " + e.offsetTop + "; plus: " + plus + "; scroll: " + e.scrollLeft + "," + e.scrollTop);*/
			if(p === b) {
				//theLogger.log("終點:" + (l + e.offsetLeft) + "," + (t + e.offsetTop));
				return (plus)?{left: l + e.offsetLeft, top: t + e.offsetTop}:{left: l - e.offsetLeft, top: t - e.offsetTop};
			}
			if(p != null)
				return (plus)?arguments.callee(p, b, l + e.offsetLeft, t + e.offsetTop, plus):arguments.callee(p, b, l - e.offsetLeft, t - e.offsetTop, plus);
			return null;
		}
		if(elem.type != undefined) {
			if(elem.type == "client") {
				//theLogger.log("x: " + elem.x + ", y: " + elem.y);
				//theLogger.log("base.offset: " + base.offsetLeft + ", " + base.offsetTop);
				var res = recursive(base, document.body, elem.x, elem.y, false);
				return {left: res.left + base.parentNode.scrollLeft, top: res.top + base.parentNode.scrollTop};
			}
		}
		var res = recursive(elem, base, 0, 0, true);
		return res;
	}
	
	this.translateNumber = function(no, arabic) {
			
		function doFormatChineseDigit(no, arabic) {
			var c = ["０", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
			var a = ["０", "１", "２", "３", "４", "５", "６", "７", "８", "９"];
			if(no >= 0 && no < 10) {
				if(arabic)
					return a[no];
				return c[no];
			}
			return "?";
		}
		
		var res = "";
		// 2015.8.10 FIX, 國字數字10~99是例外
		if(!arabic && no >= 10 && no < 100) {
			var q = Math.floor(no / 10);
			if(q > 1)
				res += doFormatChineseDigit(q, false);
			res += "十";
			no = no % 10;
			if(no > 0)
				res += doFormatChineseDigit(no, false);
		}
		else {
			function mk(n, lv, cz) {
				var q = Math.floor(n / lv), s = "";
				if(q > 0 || cz)
					s = doFormatChineseDigit(q, arabic);
				var r = n % lv;
				if((lv / 10) > 1)
					return s + arguments.callee(r, lv / 10, cz || q > 0);
				return s + doFormatChineseDigit(r, arabic);
			}
			res = mk(no, 1000, false);
		}
		return res;
	}
	this.testNumber = function() {
		function t(n) {
			theLogger.log(n + ": '" + Util.translateNumber(n, true) + "', '" + Util.translateNumber(n, false) + "'");
		}
		t(0);
		t(1);
		t(9);
		t(10);
		t(11);
		t(19);
		t(20);
		t(21);
		t(99);
		t(100);
		t(101);
		t(109);
		t(110);
		t(111);
		t(119);
		t(120);
		t(121);
		t(199);
		t(200);
		t(201);
		t(209);
		t(210);
		t(211);
		t(290);
		t(299);
		t(300);
		t(301);
		t(310);
		t(311);
		t(899);
		t(900);
		t(901);
		t(909);
		t(910);
		t(911);
		t(999);
		t(1000);
		t(1001);
		t(1009);
		t(1010);
		t(1011);
		t(1019);
		t(1020);
		t(1021);
		t(1099);
		t(1100);
		t(1101);
		t(1109);
		t(1110);
		t(1111);
		t(1999);
		t(2000);
		t(2001);
	}
	
	this.translateGlyph = function(no, alternative) {
		
		var g = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
		var a = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酋", "戍", "亥"];
		// 2015.6.9 修正標號問題
		var res = "";
		if(!alternative) {
			/* 1080717 Raymond 1080544 修正壬之後變甲, 不是癸的問題
			var q = Math.floor(no / 810);
			if(q > 0)
				res += g[q-1];
			no = no % 810;
			q = Math.floor(no / 90);
			if(q > 0)
				res += g[q-1];
			no = no % 90;
			q = Math.floor(no / 10);
			if(q > 0)
				res += g[q-1];
			no = no % 10;
			if(no > 0)
				res += g[no-1];*/
			if(no > 10) {
				if((no % 10) > 0) {
					res = arguments.callee(Math.floor(no / 10), alternative);
					res += g[(no % 10) - 1];
				}
				else {
					res = arguments.callee(Math.floor((no - 10) / 10), alternative);
					res += g[9];
				}
			}
			else if(no > 0)
				res = g[no - 1];
		}
		else {
			/* 1080717 Raymond 1080544 修正戍之後變子, 不是亥的問題
			var q = Math.floor(no / 1452);
			if(q > 0)
				res += a[q-1];	// 2016.6.1 修正第7,8階標號還是甲乙丙問題
			no = no % 1452;
			q = Math.floor(no / 132);
			if(q > 0)
				res += a[q-1];
			no = no % 132;
			q = Math.floor(no / 12);
			if(q > 0)
				res += a[q-1];
			no = no % 12;
			if(no > 0)
				res += a[no-1];*/
			if(no > 12) {
				if((no % 12) > 0) {
					res = arguments.callee(Math.floor(no / 12), alternative);
					res += a[(no % 12) - 1];
				}
				else {
					res = arguments.callee(Math.floor((no - 12) / 12), alternative);
					res += a[11];
				}
			}
			else if(no > 0)
				res = a[no - 1];
		}
		return res;
	}
	
	this.translateDate = function(str, toTaiwanYear, dispfmt) {	// 2015.9.10 新增dispfmt參數
		if(toTaiwanYear) {
			var a = str.split("-");
			if(a.length < 3)	// 2015.6.4 修正iPad日期選單按清除時異常問題
				return "";
			if(dispfmt == 1)	// 2015.9.10 dispfmt為1時, 不顯示國號
				return (a[0] - 1911) + "年" + Number(a[1]) + "月" + Number(a[2]) + "日";
			return "中華民國" + (a[0] - 1911) + "年" + Number(a[1]) + "月" + Number(a[2]) + "日";
		}
		str.match(/(\d+)年(\d+)月(\d+)日/);	// 2015.9.10 不match"中華民國", 增加相容性
		var mm = RegExp.$2;
		if(mm < 10)
			mm = "0" + mm;
		var dd = RegExp.$3;
		if(dd < 10)
			dd = "0" + dd;
		return (Number(RegExp.$1) + 1911) + "-" + mm + "-" + dd;
	}
	
	// 轉換時間格式
	this.translateTime = function(str, toTaiwanTime) {
		theLogger.log("translateTime:'" + str + "'");
		if(str.length == 0)	// 2016.8.31 FIX, for emtpy string
			return "00:00";
		return str;
	}
	
	// 字串左邊補0, 輸入數字會輸出字串
	this.padLeft = function(num, len) {
		if(typeof num != "string")
			num = num.toString();
		if(num.length >= len)
			return num;
		else
			return arguments.callee("0" + num, len);
	}
	
	this.num2Hex = function(deci, padzero) {
		var _s = "0123456789ABCDEF";
		function recur(num) {
			if(num < 16)
				return _s[num];
			return arguments.callee(num >> 4) + _s[num % 16];
		}
		return this.padLeft(recur(deci), padzero);
	}
	
	this.toHtmlColor = function(o) {
		if(typeof o == "string") {
			var n = Number(o);
			var r = n % 256;
			var g = (n >> 8) % 256;
			var b = (n >> 16) % 256;
			return "rgb(" + r + "," + g + "," + b + ")";
		}
		else if(typeof o == "number") {
			var r = o % 256;
			var g = (o >> 8) % 256;
			var b = (o >> 16) % 256;
			return "rgb(" + r + "," + g + "," + b + ")";
		}
		else {
			if("r" in o && "g" in o && "b" in o) {
				return "rgb(" + o.r + "," + o.g + "," + o.b + ")";
			}
			else
				throw new Error("toHtmlColor無法識別沒有r、g、b的物件");
		}
	}
	
	this.getRed = function(num) {
		if(typeof num === "string")
			num = Number(num);
		return num % 256;
	}
	
	this.getGreen = function(num) {
		if(typeof num === "string")
			num = Number(num);
		return (num >> 8) % 256;
	}
	
	this.getBlue = function(num) {
		if(typeof num === "string")
			num = Number(num);
		return (num >> 16) % 256;
	}
	
	this.getXml = function(elem, childOnly, encoding) {	// 2016.8.29 新增encoding參數, 宣告用, 回傳字串仍是JavaScript的string(UTF-16)
		function doGetXml(elem, inds, noWrap) {
			//theLogger.log(elem.tagName + "(" + elem.nodeType + ")");
			if(elem.nodeType == 1) {
				var res = "";
				for(var i=0; i<inds; i++)
					res += "\t";
				res += "<" + elem.tagName;
				for(var i=0; i<elem.attributes.length; i++) {
					res += " " + elem.attributes[i].nodeName + "=\'" + escapeXml(elem.attributes[i].nodeValue) + "\'";	// 2015.12.15 屬性內容要escape XML的保留字
				}
				if(elem.childNodes.length > 0) {
					if(elem.childNodes.length == 1 && elem.childNodes[0].nodeType == 3) {
						res += ">" + escapeXml(elem.childNodes[0].nodeValue) + "</" + elem.tagName + ">";	// 2015.12.15 屬性內容要escape XML的保留字
						if(!noWrap)
							res += "\r\n";
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
						res += "</" + elem.tagName + ">\r\n";
					}
				}
				else
					res += "/>\r\n";
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
				else
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
	
	this.getDlg = function(url) {
		var d = $.Deferred();
		// 2016.10.18 FIX for HTML Cache Problem
		var noCacheUrl = url;
		if(url.indexOf("?") >= 0)
			noCacheUrl += "&SAMLart=" + localStorage['Artifact'];
		else
			noCacheUrl += "?SAMLart=" + localStorage['Artifact'];
		$.get(noCacheUrl, function(data, statusText, jqXHR) {
			var $wrapper = $("<div></div>");
			$wrapper.get(0).innerHTML = data;
			d.resolve($wrapper.find(":jqmData(role='dialog'), :jqmData(role='page')"));
		});
		return d.promise();
	}
	
	this.getAnchorOffset = function($pg, pos) {
		var offset = $pg.position().top;
		var $body = $pg.find("> div:nth-child(3)");
		var $flow = $body.find("> div");
		var rng = document.createRange();
		$flow.children().each(function(i, elm) {
			theLogger.log(elm.tagName + "(" + elm.className + "): " + $(elm).position().left + ", " + $(elm).position().top);
			if(elm.className == "para") {
				rng.selectNodeContents(elm);
				var rcs = rng.getClientRects();
				theLogger.log("\trects(" + rcs.length + ") - '" + elm.textContent + "'");
				for(var m=0; m<rcs.length; m++) {
					theLogger.log("\t\t" + m + ":" + rcs[m].left + "," + rcs[m].top + "," + rcs[m].right + "," + rcs[m].bottom);
					theLogger.log("\t\t\t" + Util.distance(pos, {left: pos.left, top: rcs[m].top - offset}));
				}
			}
			else {
				$(elm).children().each(arguments.callee);
			}
		});
	}
	
	this.distance = function(pt1, pt2) {
		return Math.sqrt(Math.pow(pt1.left - pt2.left, 2) + Math.pow(pt1.top - pt2.top, 2));
	}
	
	this.getElemText = function(xmlNode, tagName) {
		var nl = xmlNode.getElementsByTagName(tagName);
		if(nl != undefined && nl.length > 0) {
			if(nl[0].childNodes.length > 0)
				return nl[0].childNodes[0].nodeValue;
			return "";
		}
		return undefined;
	}
	
	this.modifyImgColor = function(img, clr, transparent) {
		//theLogger.log("modifyImgColor(" + img.src + ")");
		var w = img.width;
		var h = img.height;
		if(w == 0 || h == 0)//2014.10.23 - Raymond, 避免exception
			return img.src;
		var $can = $("<canvas width='" + w + "px' height='" + h + "px'></canvas>");
		var ctx = $can.get(0).getContext("2d");
		//theLogger.log(ctx);
		ctx.drawImage(img, 0, 0);
		//theLogger.log("ctx.getImageData(w: " + w + ", h: " + h + ")");
		// w = h = 0時會發生exception, 若發生時檢查呼叫此函式的時間點是否img尚未載入圖形完畢, 例: RD-EditSO.js的1041行是延遲0.1秒會主動呼叫
		var imgData = ctx.getImageData(0, 0, w, h);
		var r, g, b, a, i = 0, j = 0;
		for(var y=0; y<h; y++) {
			for(var x=0; x<w; x++, j+=4) {
				r = imgData.data[i++];
				g = imgData.data[i++];
				b = imgData.data[i++];
				a = imgData.data[i++];
				if(r == 0 && g == 0 && b == 0) {    // 黑色的部分改成指定色
					imgData.data[j] = clr.r;
					imgData.data[j+1] = clr.g;
					imgData.data[j+2] = clr.b;
					if("a" in clr)					// 2015.5.14 若指定透明度, 則變更alpha channel
						imgData.data[j+3] = clr.a;
				}
				else if(transparent != false && r == 255 && g == 255 && b == 255) { // 若指定透明則白色改成透明
					imgData.data[j+3] = 0;
				}
			}
		}
		ctx.putImageData(imgData, 0, 0);
		return $can.get(0).toDataURL();
	}
	
	this.now = function() {
		var res = new Date();
		if(theSSO.User.EnvSettings.get("AOL_USING_SERVER_TIME") == "Y") {
			var sTime = theWebServices.getServerTime();
			res.setUTCFullYear(sTime.substr(0, 4), Number(sTime.substr(4, 2)) - 1, sTime.substr(6, 2));
			res.setUTCHours(sTime.substr(8, 2), sTime.substr(10, 2), sTime.substr(12, 2));
		}
		return res;
	}
	
	this.getXPath = function(node) {
		var res = "";
		if(node.nodeType == 1) {	// Element
			if(node == node.ownerDocument.documentElement) {
				res += "/";
				res += node.nodeName;
			}
			else {
				if("evaluate" in node.ownerDocument) {	// for Non-IE
					try {
						var pre = node.ownerDocument.evaluate("preceding-sibling::*[name()='" + node.nodeName + "']", node, null, 7, null);
					}
					catch(e) {
						theLogger.error(e.message);
					}
					var idx = pre.snapshotLength + 1;
					res += arguments.callee(node.parentNode);
					res += "/";
					res += node.nodeName + "[" + idx + "]";
				}
				else if("selectNodes" in node.ownerDocument) {	// for IE
					function prevLength(nd, nm) {
						var cnt = 0;
						// 1061027 Raymond 1061053 MSXML2.DOMDocument改成preserveWhiteSpace後, previousSibling會出現DOMElement之間折行縮排(\n\t)的DOMText, 須跳過繼續往前抓, 否則每個nm的節點都會變成nm[0]
						//while(nd && "nodeType" in nd && nd.nodeType == 1) {
						//	if(nd.nodeName == nm) {
						while(!!nd) {
							if(nd.nodeType == 1 && nd.nodeName == nm) {
								cnt++;
							}
							nd = nd.previousSibling;
						}
						return cnt;
					}
					if("previousSibling" in node) {	// 2016.8.22 FIX for IE not supporting previous-sibling xpath syntex
						var idx = prevLength(node.previousSibling, node.nodeName);
						res += arguments.callee(node.parentNode);
						res += "/";
						res += node.nodeName + "[" + idx + "]";
					}
					else
						theLogger.error("判斷node.previousSibling時發生錯誤!");
				}
				else
					theLogger.error("XML文件不支援evaluate亦不支援selectNodes方法");
			}
		}
		else if(node.nodeType == 2) {	// Attribute
			res += arguments.callee(node.parentNode);
			res += "/@";
			res += node.nodeName;
		}
		return res;
	}
	
	this.nodeToStr = function(nd) {
		var res = "";
		if(nd.nodeType == 1) {	// Element
			if("className" in nd && nd.className.length > 0)
				res += ("(DOMElem:" + nd.nodeName + "." + nd.className.replace(" ", ".") + ")");	// 1060926 Raymond 新增標籤class細節
			else
				res += ("(DOMElem:" + nd.nodeName + ")");	// 1060629 Raymond 新增標籤名稱細節
		}
		else if(nd.nodeType == 3) {	// Text
			if(!!nd.parentNode) {	// 1060629 Raymond 新增父節點標籤名稱細節
				if("className" in nd.parentNode && nd.parentNode.className.length > 0)	// 1080819 Raymond 1080663 新增父節點標籤class細節
					res += ("(DOMText:" + nd.parentNode.nodeName + "." + nd.parentNode.className.replace(" ", ".") + " > " + nd.nodeName + ")");
				else
					res += ("(DOMText:" + nd.parentNode.nodeName + " > " + nd.nodeName + ")");
			}
			else
				res += "(null#text)";
		}
		else
			res += ("(Unsupport nodeType:" + nd.nodeType + ")");
		return res + "'" + nd.textContent + "'";
	}
	
	this.rangeToStr = function(rng) {
		if(rng.collapsed)	// 1080920 Raymond 1080830 新增若collapsed, 用較短文字顯示
			return this.nodeToStr(rng.startContainer) + ":" + rng.startOffset + ", collapsed:" + rng.collapsed;
		return "'" + rng.toString() + "'" + this.nodeToStr(rng.startContainer) + ":" + rng.startOffset + ", " + this.nodeToStr(rng.endContainer) + ":" + rng.endOffset + ", collapsed:" + rng.collapsed;	// 1080821 Raymond 1080663 fix typo
	}
	
	this.genGUID = function() {
		var pseudo = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
		return "{" + pseudo.toUpperCase() + "}";
	}
	
	//1090929 Kevin 10902729 修正Client Reflected File Download，移除無用函式
	//this.ping = function(url) {
	//	var t0 = new Date();
	//	var responseTime = null;
	//	var xhr = new XMLHttpRequest();
	//	
	//	if(!url)
	//		url = window.location.protocol + "//" + window.location.host + "/ping?s=" + t0.getTime();
	//	else
	//		url += "?s=" + t0.getTime();
	//	xhr.open("GET", url, /*async*/false);
	//	xhr.onreadystatechange = function() {
	//		if(xhr.readyState == 4) {
	//			var t1 = new Date();
	//			responseTime = t1 - t0;
	//			console.log("ping(" + url + ") response(status:" + xhr.status + ") in " + responseTime + "ms");
	//		}
	//	};
	//	try {
	//		xhr.send(null);
	//	} catch(e) {
	//		// this is expected
	//		console.error(e.message + "(" + (new Date() - t0) + "ms)");
	//	}
	//	return responseTime !== null;
	//}

}();

(function($) {
    window.processedDoc = 0;
    window.debugPin = '';
    window.submitDocList = [];
    window.currentSubmitItem = null;
    window.safeClose = true;
    let _listLog = [];
    let _logLimit = 256;
	//1141218	Leslie[1141658]	增加Timeout機制，以防止傳送中斷時，後續的公文都只會加入等候
	let _timeoutID = 0;

    window.dispLog = function(msg) {
        if (typeof msg!=='string' || msg.length===0)
            return;

        let $logPane = $('#log');
        let _cnt = _listLog.length;
        if (_cnt>=_logLimit) {
            _listLog.splice(0, 1+(_cnt-_logLimit));
        }
        _listLog.push(msg);

        if ($logPane.length) {
            let _logTxt = _listLog.join('\r\n');
            $logPane[0].value = _logTxt;
        }
    };

    window.readyCheck = function() {
        return true;
    };

    window.getToDoCount = function() {
        return window.submitDocList.length;
    };

    window.setSafeClose = function(safeClose) {
        window.safeClose = safeClose;
        let $noCloseWarnElem = $('#doNotCloseWarning');
        if ($noCloseWarnElem.length) {
            if (safeClose) {
                $noCloseWarnElem.text('[待傳送公文數: 0]').hide();
            }
            else {
                let cnt = (this.window.getToDoCount()>0)?this.window.getToDoCount():'N';
                $noCloseWarnElem.text('[尚有 '+ cnt + '份公文未完成傳送作業，請勿關閉本視窗！]').show();
            }
        }
    };

    /* 2016.6 - 由_parseUserInfo拉出為獨立function */
	function _setupLogger() {
		// 2016.4.29 支援II_LocalLog_等相關環境變數, 控制寫Log及上傳LocalLog功能
		var dr = theSSO.User.EnvSettings.get("II_LocalLog_DateRange");
		
		// 2016.10.13 - iOS debug用log
		var enableIESaveLog = (_debugTime && navigator.userAgent.indexOf('Trident/7.')!==-1 && navigator.userAgent.indexOf('rv:11')!==-1) ? true : false;
		if ((typeof dr!=='string' || dr.length===0) && (window.iOS_device || enableIESaveLog) &&
			typeof SSO_CONFIG.dev_MobileSaveLog=='boolean' && SSO_CONFIG.dev_MobileSaveLog) {
			dr = SSO_CONFIG.dev_MobileLocalLogDateRange;
		}
		
		if(typeof dr === "string" && dr.length > 0) {
			var m = dr.split("-");	// 2016.9.6 正規表示式RegExp.$1不太可靠, 只好自己parse
			if(m.length == 2) {
				var sd = m[0],
					ed = m[1],
					td = new Date(),
					sd1 = new Date(Number(sd.substr(0, 3)) + 1911, Number(sd.substr(3, 2)) - 1, Number(sd.substr(5, 2)), 0, 0, 0, 0),
					ed1 = new Date(Number(ed.substr(0, 3)) + 1911, Number(ed.substr(3, 2)) - 1, Number(ed.substr(5, 2)), 23, 59, 59, 0);
				if (td >= sd1 && td <= ed1) {
					
					var ll = theSSO.User.EnvSettings.get("II_LocalLog_Level");
					if(typeof ll === "string" && ll.length > 0) {
						AlternativeLogger.set("logLevel", ll);
					}
					else {
						// 2016.10.13 - iOS debug用log
						if ((window.iOS_device || enableIESaveLog) && typeof SSO_CONFIG.dev_MobileSaveLog=='boolean' && SSO_CONFIG.dev_MobileSaveLog) {
							ll = 4;
							AlternativeLogger.set("logLevel", ll);
						}
						theLogger.warn("環境變數II_LocalLog_Level未設定, 預設為" + AlternativeLogger.get("logLevel"));
					}
					
					var up = theSSO.User.EnvSettings.get("II_LocalLog_UploadPath");
					if(typeof up === "string" && up.length > 0) {
                        AlternativeLogger.set("uploadPath", up);
                        
                        // 2020.7.9 - 1090390 Eric, add for performance log
                        SSO_CONFIG.debugTime = true;
                        console.log('-I- SSO_CONFIG.debugTime set to "TRUE"');
					}
					else {
						// 2016.10.13 - iOS debug用log
						if ((window.iOS_device || enableIESaveLog) && typeof SSO_CONFIG.dev_MobileSaveLog=='boolean' && SSO_CONFIG.dev_MobileSaveLog &&
							//1080117	Joe		1080049		弱掃修正Hardcoded Absolute Path
							// typeof SSO_CONFIG.dev_MobileLocalLogUploadPath=='string' && SSO_CONFIG.dev_MobileLocalLogUploadPath.length) {
							// up = SSO_CONFIG.dev_MobileLocalLogUploadPath;
							typeof theSSO.User.SystemSets.get("WORK_PATH") =='string' && theSSO.User.SystemSets.get("WORK_PATH").length) {
							var workPath = theSSO.User.SystemSets.get("WORK_PATH");
							if(workPath.substring(workPath.length-1) == '\\')
								workPath = workPath.substring(0, workPath.length-1) ;
							up = workPath + "\\LocalLog";
							//1080117	Joe		1080049		弱掃修正Hardcoded Absolute Path--E
							AlternativeLogger.set("uploadPath", up);
						}
						theLogger.warn("環境變數II_LocalLog_UploadPath未設定, 預設上傳LOG檔至'" + AlternativeLogger.get("uploadPath") + "'");
					}
					
					var ut = theSSO.User.EnvSettings.get("II_LocalLog_UploadThreshold");
					if(typeof ut === "string" && ut.length > 0)
						AlternativeLogger.set("autoUploadThreshold", ut);
					else
						theLogger.warn("環境變數II_LocalLog_UploadThreshold未設定, 預設自動上傳筆數為" + AlternativeLogger.get("autoUploadThreshold"));
				}
				else {	// 停止收集LOG
					theLogger.warn("超過環境變數II_LocalLog_DateRange設定的日期區間(" + dr + "), 停止收集LOG");
					AlternativeLogger.set("logLevel", 0);
				}
			}
			else
				theLogger.warn("環境變數II_LocalLog_DateRange(" + dr + ")設定格式不符");
		}
		else {	// 停止收集LOG
			theLogger.warn("環境變數II_LocalLog_DateRange未設定, 停止收集LOG");
			AlternativeLogger.set("logLevel", 0);
		}
	}

    /* 開發測試用函式.
    *  參數:
    *   tbs: 待簽內容
    *   encode: NONE->未編碼字串, base64->以base64編碼的binary content, hashBase64->以base64編碼的hashvalue
    *   pincode: Smartcard pincode
    *   hashAlg: 雜湊演算法, 目前支援: SHA1/SHA256/SHA384/SHA512
    */
    window._dev_SignDoc = function(tbs, encode, pincode, hashAlg) {
        window.setSafeClose(false);

        var dfd = $.Deferred();

        if ('dispLog' in window) {
            dispLog('收到加簽要求!');
        }

        var sc = new SmartCard();
        sc.makeSignature(tbs, encode, pincode, hashAlg)
        .then(function(rslt){
            if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
                //SSOUtil.dev_logTimeElapse('sc.makeSignature()', tmBeginMakeSignature);
            }
            // rslt = {success:true, signature: ret.signature, certb64: ret.certb64, ret_code: ret.ret_code };
            if ('dispLog' in window) {
                dispLog('完成簽章作業! cert=' + rslt.certb64.substr(0, 10) + '..., signature=' + rslt.signature);
            }
            dfd.resolve({success:true, signCert:rslt.certb64, signValue:rslt.signature});
            sc.reset();
            window.setSafeClose(true);
        })
        .fail(function(e) {
            // 加簽失敗, 清除之
            if (typeof theSSO.User.igotu=='string' && theSSO.User.igotu.length) {
                theSSO.User.igotu = '';
            }
            if (typeof e._errMsg=='string' && e._errMsg.length) {
                if ('dispLog' in window) {
                    dispLog(e._errMsg);
                }
                dfd.reject({success:false, errMsg:e._errMsg});
            }
            else {
                var errMsg = '叫用 sc.makeSignature() 失敗. 無法取得錯誤說明';
                if ('dispLog' in window) {
                    dispLog(errMsg);
                }
                dfd.reject({success:false, errMsg:errMsg});
                window.setSafeClose(true);
            }

        });
        return dfd.promise();
    };

    // 將
    window.addSubmitDoc = function(submitItem) {
        let _dfd = $.Deferred();
        if (typeof submitItem!='undefined' && submitItem!==null) {
            window.submitDocList.push(submitItem);
            _dfd.resolve({success:true, 'submitItem': submitItem});
        }
        else {
            _dfd.reject({success:false});
        }
        return _dfd.promise();
    };

    window.removeSubmitDoc = function(msgId) {
        msgId = (typeof msgId=='string')?msgId:'';
        if (msgId.length==0) return;

        let count = submitDocList.length;
        let i=0, idx=-1;
        for(i=0; i<submitDocList.length; i++) {
            let _submitItem = submitDocList[i];
            if (typeof _submitItem!='undefined' && _submitItem!==null) {
                if (_submitItem.msgId==msgId) {
                    idx = i;
                    break;
                }
            }
        }

        if (idx>=0) {
            submitDocList.splice(idx, 1);
        }
    };

    function _pincodeVerified(verified, key) {
        if (verified && typeof key=='string' && key.length) {
            if (typeof theSSO.User.igotu!=='string' || theSSO.User.igotu.length==0) {
                let _hash = CryptoJS.SHA256(key).toString(CryptoJS.enc.Base64); //Hex);
                let key_verified = {
                    verified: true,
                    hash: _hash
                };
                localStorage.key_verified = JSON.stringify(key_verified);
            }
        }
        else {
            console.warn('-W- DocSubmitPage.pincodeVerified() verify FAILED!');
        }
    }

    // 2020.7.16 - 1090470 Eric, 傳送子視窗功能修正.
    function _processSubmitFail(errRslt) {
        let errMsg = '';
        let canDoNext = true;

        let _targetDocObj = null;
        if (typeof errRslt.docObj=='string' && errRslt.docObj.length) {
            _targetDocObj = JSON.parse(errRslt.docObj);
        }

        if (typeof errRslt.errMsg=='string' && errRslt.errMsg.length) {
            if (!!_targetDocObj) {
                errMsg = '[公文文號: ' + _targetDocObj.docNo + '] ' + errRslt.errMsg;
            }
            else {
                errMsg = errRslt.errMsg;
            }
        }
        else if (typeof errRslt._errMsg=='string' && errRslt._errMsg.length) {
            if (!!_targetDocObj) {
                errMsg = '[公文文號: ' + _targetDocObj.docNo + '] ' + errRslt.errMsg;
            }
            else {
                errMsg = errRslt._errMsg;
            }
        }

        // send message to MP page to notify error.
        let msgObj = { 
            msgType: 'submitErrorObj',
            errObj: { 
                errMsg: errMsg,
                targetDoc: null,
                todolist: [],
            }
        };

        if (!!_targetDocObj && ('errObj' in msgObj)) {
            msgObj.errObj.targetDoc = {
                docNo: _targetDocObj.docNo,
                msgId: _targetDocObj.msgId
            };
        }
		
		//1140609	Leslie[問題序73]	調整簽核元件異常處置，修正檢核的錯誤訊息，及背景傳送斷鍊問題
		if(errRslt?.canDoNext === false && ('csReject' in errRslt && errRslt.csReject === true))
			canDoNext = false;	//簽章元件異常，中止所有背景傳送
		else if(_targetDocObj == null)
			canDoNext = false;	//出現未知異常，導致傳入的Erro物件未含目前公文時，也無法繼續執行背景傳送

        if (canDoNext) {
            // 移除本件!
            removeSubmitDoc(_targetDocObj.msgId); 
        }
        else {
            // 清除剩餘項目!
            if (window.submitDocList.length>1) {
                let x = 1;
                for(x=1; x<window.submitDocList.length; x++) {
                    let _item = window.submitDocList[x];
                    msgObj.errObj.todolist.push({docNo: _item.docNo, msgId: _item.msgId});
                }
            }
            window.submitDocList = [];
			
			//1140609	Leslie[問題序73]	調整簽核元件異常處置，修正檢核的錯誤訊息，及背景傳送斷鍊問題
			msgObj.clearModule = true;
        }

        if (window.submitDocList.length==0) {
            window.setSafeClose(true);
        }
        window.currentSubmitItem = null;
        window.processedDoc += 1; // 2020.7.20 - 1090390 Eric

        let _eventOrigin = window.location.protocol + '//' + window.location.hostname;
        if (window.opener) {
            window.opener.postMessage(msgObj, _eventOrigin);
        }
        else if (window.iFrameMode && typeof window.top!=='undefined' && window.top!==null) { // 2020.7.9 - 1090390 Eric
            window.top.postMessage(msgObj, '*'); // _eventOrigin);
        }

        if (window.submitDocList.length) {
            setTimeout(function() {
                _submitNextDoc()
                .then(function() {
                    theLogger.log('-I- _submitNextDoc() finished. [success]');
                })
                .fail(function(errRslt) {
                    _processSubmitFail(errRslt);
                });
            }, 200);
        }
    }

    function _submitNextDoc(pin) {
        let _dfdTriggerSubmit = $.Deferred();

        if (window.currentSubmitItem!=null) {
            theLogger.warn('-W- DocSubmitPage.submitNextDoc() 已有公文正在執行傳送作業! [window.currentSubmitItem!=null]');
            _dfdTriggerSubmit.reject({success:false, errMsg:'已有公文正在執行傳送作業!'});
            return _dfdTriggerSubmit.promise();
        }

        if (getToDoCount()==0) {
            theLogger.warn('-W- DocSubmitPage.submitNextDoc() 待傳送公文清單內已無公文項目!');
            window.setSafeClose(true);
			//1140416	Leslie[問題序73]	調整Log上傳機制，補上傳含異常內容的log
			AlternativeLogger.upload("公文傳送作業終止上傳");
			AlternativeLogger.clear();
            _dfdTriggerSubmit.resolve({success:true, errMsg:'已無待傳送公文!'});
            return _dfdTriggerSubmit.promise();
        }

        let _submitItem =  window.submitDocList[0];
        if (typeof _submitItem!='undefined' && _submitItem!==null) {
            //exParaP2 = {submitSign=true, supportHashSign=true, serverSing, clientSignMode}
            window.currentSubmitItem = _submitItem;
            let exParaP2 = {
                submitSign: _submitItem.submitSign,
                supportHashSign: _submitItem.supportHashSign,
                serverSign: _submitItem.serverSign,
                clientSignMode: _submitItem.serverSign?'None':_submitItem.clientSignMode,
                verifyPinCallback: _pincodeVerified,
                genFormalPage: _submitItem.genFormalPage // 2020.7.30 - 1090409 Eric, 新增genFormalPage:是否匯出抄本頁面
            };

            if (exParaP2.submitSign) {
                pin = (typeof pin=='string' && pin.length)?pin:theSSO.User.igotu;
                // 2020.7.20 - 1090390 Eric, for dev. test...
                if (typeof pin!='string' || pin.length===0) {
                    if (SSOUtil.isValueTrue(localStorage['dev_multiDocSubmit'])==true) {
                        pin = window.debugPin;
                    }
                    if (typeof pin!='string' || pin.length===0) {
                        theLogger.error('-I- DocSubmitPage.submitNextDoc() 憑證金鑰不可為空字串!');
                        _dfdTriggerSubmit.reject({success:false, errMsg:'憑證金鑰不可為空字串!'});
                        return _dfdTriggerSubmit.promise();
                    }
                }
            }

            if (_submitItem.serverSign) { // 2021.5.21 - Eric, typo (_submitItem.ServerSign -> _submitItem.serverSign)
                let _dfdIn = $.Deferred();
                _dfdIn.reject({success:false, errMsg: '公文傳送子視窗不支援Server簽章模式!'});
                _prm = _dfdIn.promise();
                //_prm = SubmitUtil._serverSignSubmit_withSignPageP2(window.currentSubmitItem.SAMLart, window.currentSubmitItem.docObjStr,
                //        window.currentSubmitItem.pin, exParaP2);
            }
            else {
				//1141218	Leslie[1141658]	增加Timeout機制，以防止傳送中斷時，後續的公文都只會加入等候
				clearTimeout(_timeoutID);
				_timeoutID = setTimeout((o)=>_processSubmitFail({docObj:o.docObjStr, errMsg:'已超過處理時限予以剔除，請稍後再重新傳送。'}), 10*60*1000, _submitItem);
                pin = (typeof pin=='string' && pin.length)?pin:_submitItem.pincode;
                _prm = DocSubmitUtil.clientSignSubmit_withSignPageP2(_submitItem.SAMLart, _submitItem.docObjStr, pin, exParaP2);
            }

            _prm
            .done(function(rslt) {
                if ('dispLog' in window) {
                    dispLog('傳送公文:[' + _submitItem.docNo + '] 作業完成!');
                }
                theLogger.log('DocSubmitUtil.clientSignSubmit_withSignPageP2() done. [Success]');

                // 2020.7.20 - 1090390 Eric, for dev. test...
                window.processedDoc += 1;

				//1141218	Leslie[1141658]	增加Timeout機制，以防止傳送中斷時，後續的公文都只會加入等候
				clearTimeout(_timeoutID);
                
                let _triggerNext = false;
                if (typeof window.currentSubmitItem!=='undefined' && window.currentSubmitItem!==null) {
                    let _msgId = window.currentSubmitItem.msgId;
                    let _docNo = window.currentSubmitItem.docNo;

                    window.currentSubmitItem = null;
                    if (typeof _msgId=='string' && _msgId.length) {
                        removeSubmitDoc(_msgId);    

                        // 若有次筆, 則執行次筆之傳送作業!
                        if (getToDoCount()>0) {
                            setTimeout(function() {
                                _submitNextDoc()
                                .then(function() {
                                    theLogger.log('-I- _submitNextDoc() finished. [success]');
                                })
                                .fail(function(errRslt) {
                                    _processSubmitFail(errRslt);
                                });
                            }, 200);
                            _triggerNext = true;
                        }
                        else {
                            window.setSafeClose(true);
                        }
                        theLogger.log('-I- 公文[文號=' + _docNo + ', MsgId=' + _msgId + ']已完成傳送作業!');
						//1140416	Leslie[問題序73]	調整Log上傳機制，移到外面以避免漏上傳紀錄
                        // AlternativeLogger.upload("公文傳送作業完成上傳");
                        // AlternativeLogger.clear();
                    }
                }
				//1140416	Leslie[問題序73]	調整Log上傳機制，移到外面以避免漏上傳紀錄
				AlternativeLogger.upload("公文傳送作業完成上傳");
				AlternativeLogger.clear();
                _dfdTriggerSubmit.resolve({success:true, triggerNext: _triggerNext});
            })
            .fail(function(errRslt){
                if (typeof errRslt.errMsg=='undefined' && '_errMsg' in errRslt) {
                    errRslt.errMsg = errRslt._errMsg;
                }
                theLogger.warn('DocSubmitUtil.clientSignSubmit_withSignPageP2() failed. errMsg:' + errRslt.errMsg);
				
				//1140416	Leslie[問題序73]	調整Log上傳機制，補上傳含異常內容的log
				AlternativeLogger.upload("公文傳送作業異常上傳");
				AlternativeLogger.clear();
				
                _dfdTriggerSubmit.reject($.extend({success:false, canDoNext:false, errMsg: errRslt.errMsg}, errRslt));
                window.setSafeClose(true);
            });
        }
        return _dfdTriggerSubmit.promise();
    }

    // 2020.7.30 - 1090409 Eric, 新增genFormalPage:是否匯出抄本頁面
    window.submitDoc = function(SAMLart, sDocObj, pin, fSubmitSign, fSupportHashSign, clientSignMode, genFormalPage) {
        theLogger.log('window.submitDoc invoked...');

        if (typeof SSO_CONFIG.debugTime==='boolean' && SSO_CONFIG.debugTime===true) {
            theLogger.time(SSOUtil.dev_getCurrentTimeStr() +  ' -tm- DocSubmitPage.submitDoc() BEGIN...');
        }

        var _dfdForCaller = $.Deferred();

        if (typeof theSSO.User.igotu=='string' && theSSO.User.igotu.length) {
            if (pin!==theSSO.User.igotu) {
                _dfdForCaller.reject({success:false, errMsg:'金鑰密碼不一致!'});
                return _dfdForCaller.promise();
            }
        }

        var _docObj = JSON.parse(sDocObj);
        let signType = _docObj.signType;
        var _submitItem = {
            SAMLart:SAMLart, 
            msgId: _docObj.msgId, 
            docNo: _docObj.docNo, 
            docObjStr:sDocObj, 
            submitSign:fSubmitSign, 
            supportHashSign:fSupportHashSign, 
            serverSign: false, // 不支援server簽章模式!
            clientSignMode: clientSignMode, // 'SCard', 'None'
            genFormalPage: genFormalPage // 2020.7.30 - 1090409 Eric, 是否匯出抄本頁面
        };

		//1141218	Leslie[1141658]	增加佇列檢核機制，以防止傳送中斷時，後續的公文都只會加入等候
		_submitItem.sendTime = (new Date()).getTime();	//紀錄時間常數(單位：毫秒)

        window.addSubmitDoc(_submitItem)
        .then(function(rslt) {
            _dfdForCaller.resolve($.extend({success:true}, rslt));

            window.setSafeClose(false);

            // 若目前沒有作業中公文, 則立即執行傳送作業!
            let _dfd = $.Deferred();

            // 2020.7.20 - 1090390 Eric, for dev test, 累積3筆後才開始傳送公文測試!
            let _doSubmit = true;
            if (currentSubmitItem==null && SSOUtil.isValueTrue(localStorage['dev_multiDocSubmit'])) {
                if (window.processedDoc==0 && submitDocList.length<3) {
                    _doSubmit = false;
                    window.debugPin = pin;
                    console.log('-I- DocSubmitPage.addSubmitDoc(), [dev_multiDocSubmit] enabled, set _doSubmit to FALSE. [todo count=' + submitDocList.length + ']');
                }
            }

            if (currentSubmitItem==null && _doSubmit) {
                let _triggerSubmit = true;
                // [DEV] Submit test...
                //if (window._enableDebug && getToDoCount()<3) {
                //    _triggerSubmit = false;
                //}
                if (_triggerSubmit) {
                    setTimeout(function() {
                        _submitNextDoc(pin)
                        .then(function() {
                            theLogger.log('-I- _submitNextDoc() finished. [success]');
                        })
                        .fail(function(errRslt) {
                            _processSubmitFail(errRslt);
                        });
                    }, 100);
                    _dfd.resolve({success:true, submitAtOnce:true});
                }
                else {
                    _dfd.resolve({success:true, submitAtOnce:false})
                }
            }
            else {
                // 有公文正在執行傳送作業, 尚未完成!
                _dfd.resolve({success:true, submitAtOnce:false});
            }
            return _dfd.promise();
        })
        .then(function(rslt) {
            if (typeof rslt.submitAtOnce=='boolean' && rslt.submitAtOnce===true) // && 
            //typeof window.currentSubmitItem!=='undefined' && window.currentSubmitItem!==null)
            {
                // 立即trigger公文傳送作業!
                theLogger.log('-I- 已開始公文傳送作業...');
            }
            else {
                theLogger.log('-I- 已有其它公文傳送中，僅加入清單[DocNo='+ _docObj.docNo +', MsgId='+ _docObj.msgId +']...');

				//1141218	Leslie[1141658]	增加佇列檢核機制，以防止傳送中斷時，後續的公文都只會加入等候
				let currSubmitingDocItem = window.submitDocList[0];	//傳送中的公文，位於佇列中的第一筆
				if( (_submitItem.sendTime - currSubmitingDocItem.sendTime) > 180*1000){	//超過180秒
					_processSubmitFail({docObj:currSubmitingDocItem.docObjStr, errMsg:'已超過處理時限予以剔除，請稍後再重新傳送。'})
				}
            }
        })
        .fail(function(errRslt) {
            if (_dfdForCaller.state()=='pending') {
                _dfdForCaller.reject($.extend({_errMsg:'invoke SignPage.SubmitDoc() failed'}, errRslt));
            }
        });
        return _dfdForCaller.promise();
    };

    window.setUser = function(user) {
        theSSO.User = user;
        
        var cntCert = 0;
        if ('Certs' in theSSO.User) {
            cntCert = theSSO.User.Certs.length;
        }
        console.log('Linked Cert count=' + cntCert);

        _setupLogger();
        AlternativeLogger.setPageName('DocSubmit');
    };

    // 2021.5 - 1100333 Eric, separate SSO/eDoc page, UserInfo/EnveSet/SystemSet改用JSON (原為XML)
    window.setUser2 = function(rawUser) {
        theSSO.User = {};
        // user info and EnvSettings
        SSOUtil.parseUserInfo2(window.theSSO.User, rawUser);
        // parse play roles
        if (!window.theSSO.User.PlayRoles) {
            window.theSSO.User.PlayRoles = [];
        }
        SSOUtil.parsePlayRoles2(window.theSSO.User.PlayRoles, rawUser);
        
        // parse linked cert(s) [2015.2]
        if (!window.theSSO.User.Certs) {
            window.theSSO.User.Certs = [];
        }
        SSOUtil.parseUserCerts2(window.theSSO.User.Certs, rawUser);
            
        var cntCert = 0;
        if ('Certs' in theSSO.User) {
            cntCert = theSSO.User.Certs.length;
        }
        console.log('Linked Cert count=' + cntCert);

        theSSO.User.EnvSettings = {
            get : function(envName) {
                var value = this[envName];
                if (typeof value === 'undefined') {
                    value = '';
                }
                return value;
            }
        };
        theSSO.User.SystemSets = {
            get : function(envName) {
                var value = this[envName];
                if (typeof value === 'undefined') {
                    value = '';
                }
                return value;
            }
        };
        
        // 2021.5 - 1100333 Eric, separate SSO/eDoc page
        if (!SSOUtil.initSystemSettings2(theSSO.User.EnvSettings, theSSO.User.SystemSets, rawUser, true)) {
            return false;
        }

        _setupLogger();
        AlternativeLogger.setPageName('DocSubmit');
        return true;
    };

    // window.selfClose = function() {
    //     window.opener = null;
    //     window.open('', '_self');
    //     window.close();
    // };

    // window.isPinVerified = function() {
    //     if (typeof theSSO.User.igotu=='string' && theSSO.User.igotu.length) {
    //         return true;
    //     }
    //     return false;
    // }

    /*
    * jQuery's ready() call back function
    * --- 主頁DOM loaded, ready ---
    */
    // 2019.10.28 - 1080339 Eric, jQuery 3 upgrad
    //$(document).ready(function() {
    $(function() {
        window.iFrameMode = false; // 2020.7.8 - 1090390 Eric
        if (typeof window.opener!='undefined' || window.opener!==null || window.opener.closed!==true) {
            // 獨立開啟之傳送子視窗, 設定scheme顏色與公文系統一致!
            //window.bounce(window.opener);
            let clrScheme = localStorage.color_scheme;
            if (typeof clrScheme=='string' && clrScheme.length) {
                let $body = $('body');
                let sClass = $body.attr('class');
                if (typeof sClass!=='string') {
                    sClass = '';
                }
                
                // 與目前設定值相同, 結束作業!
                if (clrScheme.length && sClass.indexOf(clrScheme)!=-1) {
                    return;
                }
                
                $body.removeClass('cs-ly'); $body.removeClass('cs-lg'); $body.removeClass('cs-lp');
                
                // 預設值 => 清除classname後結束!
                if (clrScheme.length===0) { localStorage.color_scheme = ''; return; }
                
                switch(clrScheme) {
                case 'cs-ly': case 'cs-lg': case 'cs-lp':
                    $body.addClass(clrScheme);
                    break;
                }
            }
        }

        if (window.location.href.indexOf('docvip.fdat.com.tw')!==-1 && window.location.href.indexOf('MSDev')!==-1) {
            window._enableDebug = true;
        }

        let sDebugSubmit = SSOUtil.getURLParameter('NoRealSubmit');
        if (SSOUtil.isValueTrue(sDebugSubmit)) {
            theSSO._doRealSubmit = false;
        }

        // 2020.7.8 - 1090390 Eric, 測iFrame mode
        window.iFrameMode = false;
        let sFrameMode = SSOUtil.getURLParameter('mode');
        if (typeof sFrameMode=='string' && sFrameMode.length) {
            sFrameMode = sFrameMode.toLocaleLowerCase();
        }
        if (sFrameMode=='iframe') {
            window.iFrameMode = true;
        }

        if (window._enableDebug) {
            $('#btn_Clear').show();
            $('#btn_ShowToDo').show();
        }
        

        if ('dispLog' in window) {
            dispLog('ready...');
        }

        $(window).on('beforeunload', function(rslt) {
           // 2020.7.13 - 1090390 Eric, Firefox可關閉時, 不可叫用event.preventDefautl
           // 2019.8.21 - IE子視窗關閉問題修改.
           if (window.navigator.userAgent.indexOf("MSIE")==-1 && window.navigator.userAgent.indexOf("Trident")==-1 &&
               window.navigator.userAgent.indexOf("Firefox")==-1) {
                // Cancel the event as stated by the standard.
                event.preventDefault();
            }

            if (!window.safeClose) {
                // Chrome requires returnValue to be set.
                event.returnValue = 'UNSAFE!!! continue close?';
                return '尚有待傳送公文, 請於傳送作業完成再關閉子視窗.\r\n確定要現在離開網頁?';
            }
        });

        $(document).on('click', '#enableCloseBtn', function() {
            window.setSafeClose(true);
        });

        $(document).on('click', '#btn_Clear', function() {
            window.submitDocList = [];
            window.currentSubmitItem = null;
            AlternativeLogger.upload('Clear button clicked, 強制上傳log');
            AlternativeLogger.clear();
            window.setSafeClose(true);
        });

        $(document).on('click', '#btn_ShowToDo', function() {
            if ('dispLog' in window) {
                if (window.submitDocList.length) {
                    let sMsg = '';
                    let i=0;
                    for(i=0; i<window.submitDocList.length; i++) {
                        let sItem = '';
                        if (i!=(window.submitDocList.length-1)) {
                            sItem = '#' + (i+1) + ': ' + JSON.stringify(window.submitDocList[i]) + '\n';
                        }
                        else {
                            sItem = '#' + (i+1) + ': ' + JSON.stringify(window.submitDocList[i]);
                        }
                        sMsg += sItem;
                    }
                    dispLog(sMsg);
                }
                else {
                    dispLog('已無待辦項目!');
                }
            }
        });


        $(window).on('message', function(e) {
            let msg = null;
            let rawEvent = e.originalEvent;
            if (typeof rawEvent.data == 'string' && rawEvent.data.length) {
                msg = JSON.parse(rawEvent.data);
            }
            else if (typeof rawEvent.data=='object' && rawEvent.data !== null) {
                msg = rawEvent.data;
            }

            if (typeof msg=='object' && msg!==null) {
                var msgType = msg.type;
                var msgId='', docNo='';
                if (msgType=='requestSubmitDoc') {
                    alert('Worker Page - request for SubmitDoc');
                    if (typeof opener!=='undefined' && opener!==null) {
                        var _data = {
                            msgType: 'requestSubmitDocRslt',
                            success: true,
                            message: 'done!'
                        };
                        opener.postMessage(_data);
                    }
                }
                else if (msgType=='setUser') { // 2020.7.8 - 1090390 Eric
                    if (typeof msg.data=='string' && msg.data.length) {
                        let parser=new DOMParser();
                        let RawUser=parser.parseFromString(msg.data,'text/xml');
                        if (RawUser!==null) {
                            setUser2(RawUser);
                        }
                        else if (window.iFrameMode && typeof window.top!=='undefined' && window.top!=null) {
                            window.top.postMessage({type:'responce', success:false, errMsg:'load XML User data failed'});
                        }
                    }
                }
                else if (msgType=='requestDownloadDoc') {
                    alert('Worker Page - request for Download Document');
                }
            }
        });

        // 2020.7.8 - 1080390 Eric
        $(document).on('load', function() {
            if (window.iFrameMode==true) {

            }
        });

        // 2019.7 - 此網頁之alert不可被叫用, 以避免傳送作業被異常中止!
        (function(proxied) {
            window.alert = function() {
              // do something here
              theLogger.error(arguments[0]);
              // 不叫用alert
              //return proxied.apply(this, arguments);
            };
          })(window.alert);

        // 以SSO_CONFIG內的WS_URLs設定WebServices網址
        theWebServices.url(SSO_CONFIG.WS_URLs);
        theLogger = console;
        theLogger.time = console.debug;
    }); // EOF document.ready callback function
})(jQuery);