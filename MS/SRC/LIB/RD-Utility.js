/* jshint -W100 */

(function() {
    //if(window.theModMgr != undefined)
    //    window.theModMgr.install("SignWork.js").finish();
		
	if (!window.SSOUtil) {
		window.SSOUtil = {};
	}

	/* - 2013.11 - Eric verfiy - unused!
	function getQueryVariable(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
			var pair = vars[i].split("=");
			if (pair[0] == variable) {
				return pair[1];
			}
		}
		//alert('getQueryVariable(' + variable + ')\n not found');
		return null;
	}*/

	/* - 2013.11 - Eric verfiy - unused!
	function CreateBookmarkLink(title, url) {
		alert('create(' + title + ', ' + url + ')');
		try {
			if (window.sidebar) { // Mozilla Firefox Bookmark
				window.sidebar.addPanel(title, url,"");
			}
			else if( window.external ) { // IE Favorite
				window.external.AddFavorite( url, title);
			}
			else if(window.opera && window.print) { // Opera Hotlist
				return true;
			}
		}
		catch(e) {
			alert(e.message);
		}
		return false;
	}*/

	/* - 2013.11 - Eric verfiy - unused!
	function changeStyle(selectorText)
	{
		var theRules = new Array();
		if (document.styleSheets[0].cssRules) {
			theRules = document.styleSheets[0].cssRules;
		} 
		else if (document.styleSheets[0].rules) {
			theRules = document.styleSheets[0].rules;
		}
		for (n in theRules)
		{
			if (theRules[n].selectorText == selectorText)	{
				theRules[n].style.color = 'blue';
			}
		}
	}*/

	/* - 2013.11 - Eric verfiy - unused!
	function calcUsedStorageSize() {
		if(localStorage != null) {
			var sum = 0;
			//console.info("localStorage used count: " + localStorage.length);
			for(var i=0; i<localStorage.length; i++) {
				var key = localStorage.key(i);
				//console.info(key + " - " + localStorage.getItem(key).length);
				sum += localStorage.getItem(key).length;
			}
			return sum + " WORDs";
		}
		return null;
	}*/

	// 字串左邊補0, 輸入數字會輸出字串
	function padLeft(num, len) {
		if(typeof num != "string")
			num = num.toString();
			
		if(num.length >= len)
			return num;
		
			return arguments.callee("0" + num, len);
	}

	/* - 2013.11 - Eric verfiy - unused!
	function getRealPosition(elem) {
		//if(elem.getAttribute("id"))
		//    console.log(elem.tagName + "[#" + elem.getAttribute("id") + "], offsetLeft=" + elem.offsetLeft + "(" + typeof elem.offsetLeft + "),offsetTop=" + elem.offsetTop + "(" + typeof elem.offsetTop + ")");
		//else
		//    console.log(elem.tagName + "[." + elem.getAttribute("class") + "], offsetLeft=" + elem.offsetLeft + "(" + typeof elem.offsetLeft + "),offsetTop=" + elem.offsetTop + "(" + typeof elem.offsetTop + ")");
		var _x = elem.offsetLeft;
		var _y = elem.offsetTop;
		var _p = elem.offsetParent;
		while(_p != null) {
			//if(_p.getAttribute("id"))
			//    console.log("p=" + _p.tagName + "[#" + _p.getAttribute("id") + "],offsetLeft=" + _p.offsetLeft + "(" + typeof _p.offsetLeft + "),offsetTop=" + _p.offsetTop + "(" + typeof _p.offsetTop + ")");
			//else
			//    console.log("p=" + _p.tagName + "[." + _p.getAttribute("class") + "],offsetLeft=" + _p.offsetLeft + "(" + typeof _p.offsetLeft + "),offsetTop=" + _p.offsetTop + "(" + typeof _p.offsetTop + ")");
			_x += _p.offsetLeft;
			_y += _p.offsetTop;
			_p = _p.offsetParent;
		}
		return {x:_x, y:_y};
	}*/

	/* - 2013.11 - Eric verfiy - unused!
	//
	// 取得網址參數的設定值
	//
	function getParameter(queryString, parameterName) {
		// Add "=" to the parameter name (i.e. parameterName=value)
		parameterName = parameterName + "=";
	
		if ( queryString.length > 0 ) {
			// Find the beginning of the string
			begin = queryString.indexOf ( parameterName );
			// If the parameter name is not found, skip it, otherwise return the value
			if ( begin != -1 ) {
			// Add the length (integer) to the beginning
				begin += parameterName.length;
				// Multiple parameters are separated by the "&" sign
				end = queryString.indexOf ( "&" , begin );
				if ( end == -1 ) {
					end = queryString.length
				}
				// Return the string
				return unescape ( queryString.substring ( begin, end ) );
			}
			// Return "null" if no parameter has been found
			return null;
		}
		return null;
	}*/
	
	//
	// 格式化數字字串
	//
	// argStr: 原始字串
	// argNum: 輸出字串長度(最短字數)
	// argFill: 不足長度以此字元補足,通常給'0'(補在字串最前面) 
	//
	function jf_PADL2(argStr, argNum, argFill)
	{
		if(argStr.length == argNum + 1)
			return argFill + argStr;
		while(argStr.length < argNum)
			argStr = argFill + argStr;
		return argStr;
	}

	function clearLog() {
		if (typeof(dump_dnd_log)=='undefined' || !dump_dnd_log) return;
		
		var $logCtxt = $('#log-panel .log');
		if ($logCtxt.length) {
			$logCtxt.html('');
		}
	}

	function writeLog(sLog) {
		if (typeof(dump_dnd_log)=='undefined' || !dump_dnd_log) return;
		
		var $logCtxt = $('#log-panel .log');
		if ($logCtxt.length) {
			var $log = $('<div>' + sLog + '</div>').appendTo($logCtxt);
		}
		
		var panel = $('#log-panel')[0];
		if (!!panel) {
			panel.scrollTop = panel.scrollHeight - panel.clientHeight;
		}
	}
	
	/* - 2013.11 - Eric verfiy - unused!
	//
	// c_name: cookie欄位名
	// value: cookie欄位值
	// exdays: expire days (cookie幾天後失效)
	//
	function setCookie(c_name, value, exdays)
	{
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value= escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toUTCString());
		document.cookie = c_name + "=" + c_value;
	}*/

	/* - 2013.11 - Eric verfiy - unused!
	function getCookie(c_name)
	{
		var i, x, y,
			ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++)
		{
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==c_name)
			{
				return unescape(y);
			}
		}
		
		return null;
	}*/

	var dayOfWeek = ['日', '一', '二', '三', '四', '五', '六']; //new Array();
	
	// 取得星期'X'資訊(中文)
	function getTCDayOfWeek(idx)
	{
		return dayOfWeek[idx];
	}
	
	//
	// 2013.3 - functions of XML DOM manipulation (jQuery + XML DOM)
	// @ http://www.ibm.com/developerworks/xml/tutorials/x-processxmljquerytut/section4.html#list24
	//
	/**
	 * Check to see if the node is comment
	 */
	function isNodeComment(node){
		return (node.nodeType===8);
	}
	
	/**
	 * Retrieves non-empty text nodes which are children of passed XML node. 
	 * Ignores child nodes and comments. Strings which contain only blank spaces
	 * or only newline characters are ignored as well.
	 * @param  node {Object} XML DOM object
	 * @return jQuery collection of text nodes
	 */
	function xml_getTextNodes(node){
		return $(node).contents().filter(function(){ 
			// 2021.5 - 1100221 Eric, todo: $.trim =>  [string].trim
			return (
				((this.nodeName=="#text" && this.nodeType=="3") || this.nodeType=="4") &&  // text node, or CDATA node
				($.trim(this.nodeValue.replace("\n","")) !== "") // and not empty
			); 
		});
	}
	
	/**
	 * Retrieves (text) node value
	 * @param node {Object}
	 * @return {String}
	 */
	function xml_getNodeValue(node){
		 var textNodes = xml_getTextNodes(node);
		 // 2021.5 - 1100221 Eric, todo: $.trim =>  [string].trim
		 var textValue = (node && isNodeComment(node)) ?  // isNodeComment is defined above
						  node.nodeValue : (textNodes[0]) ? $.trim(textNodes[0].textContent) : "";
		 return textValue;
	}
	
	/**
	 * get child node value - Eric Peng
	 */
	function xml_getChildNodeValue(node, childNodeName)
	{
		var child = $(childNodeName, node);
		if (child.length) {
			return xml_getNodeValue(child[0]);
		}
			return '';
		}
	
	function xml_getAttrValue(node, attrName) {
		var $item = $(node);
		var value = $item.attr(attrName);
		if (typeof value === 'undefined') {
			return null;
		}
		return value;
	}
	
	/*
	 * 將XmlNode轉換為JSObject.
	 * 
	 * 參數:
	 *  xmlNode: [in] xml node to be convert
	 *  fieldnames: [in] 要轉換的屬性清單
	 *  obj: [out] target object
	 *  attrs: [out] target object's attribute list.
	 */
	function convertXMLNodeToObj(xmlNode, fieldnames, obj, attrs)
	{
		if (!fieldnames || !attrs) {
			return false;
		}
		
		if (fieldnames.length != attrs.length)
		{
			return false;
		}
		
		for(var i=0; i<fieldnames.length; i++)
		{
			var fieldname = fieldnames[i];
			var value = xml_getChildNodeValue(xmlNode, fieldname);
			obj[attrs[i]] = value;
		}	
	}
	
	function _isValueTrue(value) {
		var s;
		if (typeof value === 'undefined' || value===null) {
			return false;
		}
		
		if (typeof value==='string') {
			s = value.toLowerCase();
			if (s==='true' || s==='y' || s==='1') {
				return true;
			}
		}
		
		return false;
	}
	
	function _isValueFalse(value) {
		var s;
		if (typeof value === 'undefined' || value===null) {
			return false;
		}
		
		if (typeof value==='string') {
			s = value.toLowerCase();
			if (s==='false' || s==='n' || s==='0') {
				return true;
			}
		}
		return false;
	}
	
    
    function _getEMSize(elem) {
        return Number(getComputedStyle(elem, "").fontSize.match(/(\d*(\.\d*)?)px/)[1]);
    }
    
    function _parseUrlParam(url) {
        var str=""; //參數中等號左邊的值
        var params = {}; //參數中等號右邊的值
        if(url.indexOf("?")!=-1) {
            //如果網址有"?"符號
            var ary=url.split("?")[1].split("&");
            //取得"?"右邊網址後利用"&"分割字串存入ary陣列 ["a=1","b=2","c=3"]
            for(var i in ary){
                //取得陣列長度去跑迴圈，如:網址有三個參數，則會跑三次
                if (ary.hasOwnProperty(i)) {
                    str=ary[i].split("=")[0];
                    //取得參數"="左邊的值存入str變數中
                    if (str.length) {
                        //若str等於想要抓取參數 如:b
                        str_value = decodeURI(ary[i].split("=")[1]);
                        //取得b等號右邊的值並經過中文轉碼後存入str_value
                        if (str_value!==null) {
                            params[str] = str_value;
                            //alert(str+"="+str_value);
                        }
                    }
                }
            }
        }
        return params;
    }
    
    function _escapeXml(unsafe) {
        return unsafe.replace(/[<>&'"]/g, function (c) {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
            }
        });
    }
    
	/*
	 * 2013.11 - exported as SSOUtil functions should declare here
	 */
	SSOUtil.padLeft = padLeft;
	SSOUtil.jf_PADL2 = jf_PADL2;
	SSOUtil.getTCDayOfWeek = getTCDayOfWeek;
	SSOUtil.xml_getChildNodeValue = xml_getChildNodeValue;
	SSOUtil.xml_getAttrValue = xml_getAttrValue;
	SSOUtil.xml_getNodeValue = xml_getNodeValue;
	SSOUtil.convertXMLNodeToObj = convertXMLNodeToObj;
	SSOUtil.isValueTrue = _isValueTrue;
	SSOUtil.isValueFalse = _isValueFalse; // 2015.10
    SSOUtil.getEMSize = _getEMSize; // 2016.4
    SSOUtil.parseUrlParam = _parseUrlParam;
    SSOUtil.escapeXml = _escapeXml; // 2016.11.9
	
	// developer's tools
	SSOUtil.clearLog = clearLog;
	SSOUtil.writeLog = writeLog;
})();