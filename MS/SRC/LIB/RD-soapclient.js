/*****************************************************************************\

 Javascript "SOAP Client" library

 @version: 1.4 - 2005.12.10
 @author: Matteo Casati, Ihar Voitka - http://www.guru4.net/
 @description: (1) SOAPClientParameters.add() method returns 'this' pointer.
               (2) "_getElementsByTagName" method added for xpath queries.
               (3) "_getXmlHttpPrefix" refactored to "_getXmlHttpProgID" (full 
                   ActiveX ProgID).
               
 @version: 1.3 - 2005.12.06
 @author: Matteo Casati - http://www.guru4.net/
 @description: callback function now receives (as second - optional - parameter) 
               the SOAP response too. Thanks to Ihar Voitka.
               
 @version: 1.2 - 2005.12.02
 @author: Matteo Casati - http://www.guru4.net/
 @description: (1) fixed update in v. 1.1 for no string params.
               (2) the "_loadWsdl" method has been updated to fix a bug when 
               the wsdl is cached and the call is sync. Thanks to Linh Hoang.
               
 @version: 1.1 - 2005.11.11
 @author: Matteo Casati - http://www.guru4.net/
 @description: the SOAPClientParameters.toXML method has been updated to allow
               special characters ("<", ">" and "&"). Thanks to Linh Hoang.

 @version: 1.0 - 2005.09.08
 @author: Matteo Casati - http://www.guru4.net/
 @notes: first release.

\*****************************************************************************/

function SOAPClientParameters()
{
	//var _pl = new Array();
	var _pl = new Object();
	this.add = function(name, value) 
	{
		_pl[name] = value; 
		return this; 
	}
	this.toXml = function()
	{
		var xml = "";
		for(var p in _pl)
		{
            /* 2016. 7 - v2.0, support object parameters */
            xml += "<" + p + ">" + SOAPClientParameters._serialize(_pl[p]) + "</" + p + ">";
			/*if(typeof(_pl[p]) != "function")
			 *	xml += "<" + p + ">" + _pl[p].toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + "</" + p + ">";
			 */
		}
		return xml;	
	}
	
	//1050715	Leslie	增加回傳JSON格式字串
	this.toJSON = function()
	{
		return JSON.stringify(_pl)
	}
	
	// 1091117 從WebMethodInfo補充缺少的參數
	this.importLacks = function(wmi)
	{
		var reFormatPara = new Object();
		for(var iPara = 0;iPara < wmi.Paremeters.length;iPara++){
			reFormatPara[wmi.Paremeters[iPara]] = (_pl[wmi.Paremeters[iPara]] != undefined)?_pl[wmi.Paremeters[iPara]]:null;
		}
		_pl = reFormatPara;
	}
}

/* 2016.7 - Eric Peng, v2.0 support object parameters */
SOAPClientParameters._serialize = function(o)
{
    var s = "";
    switch(typeof(o))
    {
        case "string":
            s += o.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); break;
        case "number":
        case "boolean":
            s += o.toString(); break;
        case "object":
            // Date
            if(o.constructor.toString().indexOf("function Date()") > -1)
            {
        
                var year = o.getFullYear().toString();
                var month = (o.getMonth() + 1).toString(); month = (month.length == 1) ? "0" + month : month;
                var date = o.getDate().toString(); date = (date.length == 1) ? "0" + date : date;
                var hours = o.getHours().toString(); hours = (hours.length == 1) ? "0" + hours : hours;
                var minutes = o.getMinutes().toString(); minutes = (minutes.length == 1) ? "0" + minutes : minutes;
                var seconds = o.getSeconds().toString(); seconds = (seconds.length == 1) ? "0" + seconds : seconds;
                var milliseconds = o.getMilliseconds().toString();
                var tzminutes = Math.abs(o.getTimezoneOffset());
                var tzhours = 0;
                while(tzminutes >= 60)
                {
                    tzhours++;
                    tzminutes -= 60;
                }
                tzminutes = (tzminutes.toString().length == 1) ? "0" + tzminutes.toString() : tzminutes.toString();
                tzhours = (tzhours.toString().length == 1) ? "0" + tzhours.toString() : tzhours.toString();
                var timezone = ((o.getTimezoneOffset() < 0) ? "+" : "-") + tzhours + ":" + tzminutes;
                s += year + "-" + month + "-" + date + "T" + hours + ":" + minutes + ":" + seconds + "." + milliseconds + timezone;
            }
            // Array
            else if(o.constructor.toString().indexOf("function Array()") > -1)
            {
                for(var p in o)
                {
                    if(!isNaN(p))   // linear array
                    {
                        (/function\s+(\w*)\s*\(/ig).exec(o[p].constructor.toString());
                        var type = RegExp.$1;
                        switch(type)
                        {
                            case "":
                                type = typeof(o[p]);
                            case "String":
                                type = "string"; break;
                            case "Number":
                                type = "int"; break;
                            case "Boolean":
                                type = "bool"; break;
                            case "Date":
                                type = "DateTime"; break;
                        }
                        s += "<" + type + ">" + SOAPClientParameters._serialize(o[p]) + "</" + type + ">"
                    }
                    else    // associative array
                        s += "<" + p + ">" + SOAPClientParameters._serialize(o[p]) + "</" + p + ">"
                }
            }
            // Object or custom function
            else
                for(var p in o)
                    s += "<" + p + ">" + SOAPClientParameters._serialize(o[p]) + "</" + p + ">";
            break;
        default:
            throw new Error(500, "SOAPClientParameters: type '" + typeof(o) + "' is not supported");
    }
    return s;
}

function SOAPClient() {}

// 1090728 Raymond 1080943 SOAPClient.invoke替換為WebMethodInfo版本
//SOAPClient.invoke = function(url, method, parameters, async, callback)
SOAPClient.invokeWSDL = function(url, method, parameters, async, callback)
{
	if(async)
		SOAPClient._loadWsdl(url, method, parameters, async, callback);
	else
		return SOAPClient._loadWsdl(url, method, parameters, async, callback);
}

// private: wsdl cache
SOAPClient_cacheWsdl = new Array();

// private: invoke async
SOAPClient._loadWsdl = function(url, method, parameters, async, callback)
{
	// load from cache?
	var wsdl = SOAPClient_cacheWsdl[url];
	if(wsdl + "" != "" && wsdl + "" != "undefined")
		return SOAPClient._sendSoapRequest(url, method, parameters, async, callback, wsdl);
	// get wsdl
	var xmlHttp = SOAPClient._getXmlHttp();
	xmlHttp.open("GET", url + "?wsdl", async);
	if(async) 
	{
		xmlHttp.onreadystatechange = function() 
		{
			if(xmlHttp.readyState == 4)
				SOAPClient._onLoadWsdl(url, method, parameters, async, callback, xmlHttp);
		}
	}
	xmlHttp.send(null);
	if (!async)
		return SOAPClient._onLoadWsdl(url, method, parameters, async, callback, xmlHttp);
}

//1051129 Kevin 新增自動重試
function fnSleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

//1051129 Kevin 新增自動重試
SOAPClient_RetryWsdl = new Array();

SOAPClient._onLoadWsdl = function(url, method, parameters, async, callback, req)
{
	//	console.log(req);
	//	console.log(req.getAllResponseHeaders());
	//1051111 Kevin 新增WS無法叫用時錯誤處理
	if(req.status != 200)
	{
		//1051129 Kevin 新增自動重試
		if(SOAPClient_RetryWsdl[url] == true)
		{
			SOAPClient_RetryWsdl[url] = false;
			alert('網頁目前無法使用，請稍後再試，\r\n網址:' + url);
			if(callback)
				callback('');
			return null;
		}
		else
		{
			SOAPClient_RetryWsdl[url] = true;
			//alert('網頁目前無法使用，5秒後將重試請稍候，\r\n網址:' + url);
			fnSleep(5000);
			if(async)
				SOAPClient._loadWsdl(url, method, parameters, async, callback);
			else
				return SOAPClient._loadWsdl(url, method, parameters, async, callback);
		}
	}
	
	var wsdl = req.responseXML;
	SOAPClient_cacheWsdl[url] = wsdl;	// save a copy in cache
	return SOAPClient._sendSoapRequest(url, method, parameters, async, callback, wsdl);
}

SOAPClient._sendSoapRequest = function(url, method, parameters, async, callback, wsdl)
{
	// get namespace
	var ns = (wsdl.documentElement.attributes["targetNamespace"] + "" == "undefined") ? wsdl.documentElement.attributes.getNamedItem("targetNamespace").nodeValue : wsdl.documentElement.attributes["targetNamespace"].value;
	// build SOAP request
	var sr = 
				"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
				"<soap:Envelope " +
				"xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
				"xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
				"xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
				"<soap:Body>" +
				"<" + method + " xmlns=\"" + ns + "\">" +
				parameters.toXml() +
				"</" + method + "></soap:Body></soap:Envelope>";
	// send request
	var xmlHttp = SOAPClient._getXmlHttp();
	xmlHttp.open("POST", url, async);
	//1120331	Leslie[1111455]	叫用WebFileIO增加帶上Cookie
	xmlHttp.withCredentials = true;
	var soapaction = ((ns.lastIndexOf("/") != ns.length - 1) ? ns + "/" : ns) + method;
	xmlHttp.setRequestHeader("SOAPAction", soapaction);
	xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	// 2013/5/6 Raymond added, for Mobile Safari always cache soap issue.
	if(navigator.userAgent.search(/Chrome/) < 0) {  // not chrome!
		/* 2013.12 - iOS Safari以XMLHttpRequest下載設定檔時,常server已新,但browser仍使用client cache,
		 * 以下設定可強制瀏覽器取用server檔案!
		 */
		//xmlHttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");  // 必須加上這個Header, 以免在iOS平台預設會Cache HTTP Request的環境下發生錯誤
		xmlHttp.setRequestHeader("Cache-Control", "no-cache");
	}
	
	// 2013.12 - Eric Peng, synchronous不能設定timeout! (Chrome Error!)
	if (async) {
		// 2018.11 - 1071165 Eric, 延長逾時為5分鐘(300秒)
		// 2013/12/24 - Raymond, 延長逾時
		xmlHttp.timeout = 300000;
	}
	
	//console.log(xmlHttp);
	if(async) 
	{
		xmlHttp.onreadystatechange = function() 
		{
			if(xmlHttp.readyState == 4)
				SOAPClient._onSendSoapRequest(method, async, callback, wsdl, xmlHttp);
		}

		// 2018.11 - 1071165 Eric, 處理timeout
		xmlHttp.ontimeout = function(e) {
			if (callback) {
				callback({m_bSuccess:false, m_ErrCode: -1, m_strErrMsg: 'WS作業逾時'});
			}
		}
	}
	xmlHttp.send(sr);
	if (!async)
		return SOAPClient._onSendSoapRequest(method, async, callback, wsdl, xmlHttp);
}
SOAPClient._onSendSoapRequest = function(method, async, callback, wsdl, req)
{
//	console.log(req.getAllResponseHeaders());

    // 2018.11.22 - 1071165, 處理timeout時req.responseXML為null的情況
	if (typeof req.responseXML=='object' && req.responseXML!==null) {
		var o = null;
		var nd = SOAPClient._getElementsByTagName(req.responseXML, method + "Result");
		if(nd.length == 0)
		{
			if(req.responseXML.getElementsByTagName("faultcode").length > 0)
				throw new Error(500, req.responseXML.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
		}
		else
			o = SOAPClient._soapresult2object(nd[0], wsdl);
		if(callback)
			callback(o, req.responseXML);
		if(!async)
			return o;		
	}
	else {
		let resText = req.responseText;
		if (typeof resText=='string' && resText.length && callback) {
			callback({m_bSuccess:false, m_ErrCode:req.status, m_strErrMsg: resText});
		}
	}
}

// private: utils
SOAPClient._getElementsByTagName = function(document, tagName)
{
	try
	{
		// trying to get node omitting any namespaces (latest versions of MSXML.XMLDocument)
		return document.selectNodes(".//*[local-name()=\""+ tagName +"\"]");
	}
	catch (ex) {}
	// old XML parser support
	return document.getElementsByTagName(tagName);
}

SOAPClient._soapresult2object = function(node, wsdl)
{
	return SOAPClient._node2object(node, wsdl);
}
SOAPClient._node2object = function(node, wsdl)
{
	// null node
	if(node == null)
		return null;
	// text node
	if(node.nodeType == 3 || node.nodeType == 4)
		return SOAPClient._extractValue(node, wsdl);
	// leaf node
	if (node.childNodes.length == 1 && (node.childNodes[0].nodeType == 3 || node.childNodes[0].nodeType == 4))
		return SOAPClient._node2object(node.childNodes[0], wsdl);
	// 2012/12/14 Raymond modified
	var elemType = SOAPClient._getTypeFromWsdl(node.nodeName, wsdl);
	if(elemType == "") {	// s:element若無type屬性則表示為XML型態
		if(node.childNodes.length == 1)
			return node.childNodes[0];
		return node;
	}
	var isarray = elemType.toLowerCase().indexOf("arrayof") != -1;
	// object node
	if(!isarray)
	{
		var obj = null;
		//if(node.hasChildNodes())	// 2015.3.16 - Raymond, 無任何子節點的回傳值, 應視為空物件, 而非null
			obj = new Object();
		for(var i = 0; i < node.childNodes.length; i++)
		{
			var p = SOAPClient._node2object(node.childNodes[i], wsdl);
			obj[node.childNodes[i].nodeName] = p;
		}
		return obj;
	}
	// list node
	else
	{
		// create node ref
		var l = new Array();
		for(var i = 0; i < node.childNodes.length; i++)
			l[l.length] = SOAPClient._node2object(node.childNodes[i], wsdl);
		return l;
	}
	return null;
}
SOAPClient._extractValue = function(node, wsdl)
{
	var value = node.nodeValue;
	switch(SOAPClient._getTypeFromWsdl(node.parentNode.nodeName, wsdl).toLowerCase())
	{
		default:
		case "s:string":			
			return (value != null) ? value + "" : "";
		case "s:boolean":
			return value+"" == "true";
		case "s:int":
		case "s:long":
			return (value != null) ? parseInt(value + "", 10) : 0;
		case "s:double":
			return (value != null) ? parseFloat(value + "") : 0;
		case "s:datetime":
			if(value == null)
				return null;
			else
			{
				value = value + "";
				value = value.substring(0, value.lastIndexOf("."));
				value = value.replace(/T/gi," ");
				value = value.replace(/-/gi,"/");
				var d = new Date();
				d.setTime(Date.parse(value));										
				return d;				
			}
	}
}
SOAPClient._getTypeFromWsdl = function(elementname, wsdl)
{
	var ell = wsdl.getElementsByTagName("s:element");	// IE
	if(ell.length == 0)
		ell = wsdl.getElementsByTagName("element");	// MOZ
	for(var i = 0; i < ell.length; i++)
	{
		if(ell[i].attributes["name"] + "" == "undefined")	// IE
		{
			if(ell[i].attributes.getNamedItem("name") != null && ell[i].attributes.getNamedItem("name").nodeValue == elementname && ell[i].attributes.getNamedItem("type") != null) 
				return ell[i].attributes.getNamedItem("type").nodeValue;
		}	
		else // MOZ
		{
			if(ell[i].attributes["name"] != null && ell[i].attributes["name"].value == elementname && ell[i].attributes["type"] != null)
				return ell[i].attributes["type"].value;
		}
	}
	return "";
}
// private: xmlhttp factory
SOAPClient._getXmlHttp = function() 
{
	try
	{
		if(window.XMLHttpRequest) 
		{
			var req = new XMLHttpRequest();
			// some versions of Moz do not support the readyState property and the onreadystate event so we patch it!
			if(req.readyState == null) 
			{
				req.readyState = 1;
				req.addEventListener("load", 
									function() 
									{
										req.readyState = 4;
										if(typeof req.onreadystatechange == "function")
											req.onreadystatechange();
									},
									false);
			}
			return req;
		}
		if(window.ActiveXObject) 
			return new ActiveXObject(SOAPClient._getXmlHttpProgID());
	}
	catch (ex) {}
	throw new Error("Your browser does not support XmlHttp objects");
}
SOAPClient._getXmlHttpProgID = function()
{
	if(SOAPClient._getXmlHttpProgID.progid)
		return SOAPClient._getXmlHttpProgID.progid;
	var progids = ["Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
	var o;
	for(var i = 0; i < progids.length; i++)
	{
		try
		{
			o = new ActiveXObject(progids[i]);
			return SOAPClient._getXmlHttpProgID.progid = progids[i];
		}
		catch (ex) {};
	}
	throw new Error("Could not find an installed XML parser");
}

//1050715	Leslie	增加以JSON呼叫WebService之功能
//1110308	Leslie[1101521]	配合圖型驗證功能，新增options參數以控制是否增加寫出Header值
/*SOAPClient.invokeJSON = function (url, method, parameters, async, callback){
	if(async)
		SOAPClient._callServiceWithOutWSDL(url, method, parameters, async, callback);
	else
		return SOAPClient._callServiceWithOutWSDL(url, method, parameters, async, callback);
}*/
SOAPClient.invokeJSON = function (url, method, parameters, async, callback, options){
	if(async)
		SOAPClient._callServiceWithOutWSDL(url, method, parameters, async, callback, options);
	else
		return SOAPClient._callServiceWithOutWSDL(url, method, parameters, async, callback, options);
}
//1110308	Leslie[1101521]	配合圖型驗證功能，新增options參數以控制是否增加寫出Header值	==END==

//SOAPClient.callServiceWithOutWSDL = function(argUrl,funcName,ParaName,Para,async){
//1110308	Leslie[1101521]	配合圖型驗證功能，新增options參數以控制是否增加寫出Header值
//SOAPClient._callServiceWithOutWSDL = function(argUrl,funcName,parameters,async,callback){
SOAPClient._callServiceWithOutWSDL = function(argUrl,funcName,parameters,async,callback,options){
	var result = new Object();
			
	$.ajax({
			type: "POST",
			//1110308	Leslie[1101521]	配合圖型驗證功能，新增options參數以控制是否增加寫出Header值
			beforeSend: function(request){
				if(options && options.headers && (typeof options.sendOut !== 'undefined') && (options.sendOut===true)){
					for(var h in options.headers){
						request.setRequestHeader(h,options.headers[h]);
					}
				}
			},
			url: argUrl+"/"+funcName,
			contentType: "application/json; charset=utf-8",
			async: async,
			cache: false,
			dataType: 'json',
			data: parameters.toJSON(),
			//1110308	Leslie[1101521]	配合圖型驗證功能，新增options參數以控制是否增加寫出Header值
			//success: function (data) {
			success: function (data,textStatus,request) {
				if (data.hasOwnProperty("d")) {
					//$("#txValue").val($("#txValue").val() + data.d);
					result.value = data.d;
					result.id = 0;
				}
				else {
					//$("#txValue").val($("#txValue").val() + data);
					result.value = data;
					result.id = 0;
				}
				//1110308	Leslie[1101521]	配合圖型驗證功能，新增options參數以控制是否增加寫出Header值
				if(options && options.headers && (typeof options.receive !== 'undefined') && (options.receive===true)){
					for(var h in options.headers){
						options.headers[h] = request.getResponseHeader(h);
					}
					result.headers = options.headers;
				}
				
				if(callback)
					callback(result);
			},
			error: function(err)
			{
				err.error = true;
				err.errorDetail = new Object();
				err.errorDetail.string = err.statusText;
				err.errorDetail.raw = err;
				result = err;
				
				if(callback)
					callback(result);
			}
		});
	if(!async)
		return result;
}

// 1090722 Raymond 1080943 新增取得WebMethodInfo並Cache
SOAPClient.invoke = function(url, method, parameters, async, callback)
{
	if(async)
		// 1090722 Raymond 1080943 改用WebMethodInfo取代WSDL
		SOAPClient._loadWebMethodInfo(url, method, parameters, async, callback);
	else
		// 1090722 Raymond 1080943 改用WebMethodInfo取代WSDL
		return SOAPClient._loadWebMethodInfo(url, method, parameters, async, callback);
}

SOAPClient_cacheWebMethodInfo = new Array();

SOAPClient._loadWebMethodInfo = function(url, method, parameters, async, callback)
{
	var key = url + ((url[url.length - 1] == '/')?"":"/") + method;
	var wmi = SOAPClient_cacheWebMethodInfo[key];
	if(wmi + "" != "" && wmi + "" != "undefined") {
		// 判斷若WebMethodInfo的回傳值無XML格式, 則直接改叫invokeByJSON
		if(wmi.ReturnHasXml != true) {
			parameters.importLacks(wmi);	// 1091117 Raymond 補充缺少的參數
			return SOAPClient.invokeJSON(url, method, parameters, async, function(res) {
					if(res.error == true) {	// invokeJSON回傳錯誤的物件結構需轉成呼叫invoke時的格式
						var err = {m_bSuccess:false};
						if(!!res.errorDetail) {
							err.m_ErrCode = res.errorDetail;
							err.m_strErrMsg = res.errorDetail.string;
							if(!!res.errorDetail.raw && !!res.errorDetail.raw.responseJSON && !!res.errorDetail.raw.responseJSON.Message) {
								err.m_ErrCode = res.errorDetail.raw.responseJSON.ExceptionType;
								err.m_strErrMsg = res.errorDetail.raw.responseJSON.Message + '\r\n' + res.errorDetail.raw.responseJSON.StackTrace;
							}
						}
						else {	// 無errorDetail?
							err.m_ErrCode = res;
							err.m_strErrMsg = "invokeJSON失敗, 但未回傳errorDetail";
						}
						if(!!callback)
							callback(err);
					}
					else if(!!callback) {
						// 1091117 Raymond invokeJSON的回傳值不用轉成物件
						/*if(typeof res.value === "string" && res.value.match(/^\{/))
							callback(JSON.parse(res.value));
						else*/
							callback(res.value);
					}
				});
		}
		return SOAPClient._sendSoapRequestWithWMI(url, method, parameters, async, callback, wmi);
	}
	// get WebMethodInfo
	var params = new SOAPClientParameters(), res;
	params.add('MethodName', method);
	SOAPClient.invokeJSON(url, "GetWebMethodInfo", params, async, function(r) {
		console.log("GetWebMethodInfo(" + key + ")=" + r.value);
		if(r.error == true) {	// invokeJSON回傳錯誤的物件結構需轉成呼叫invoke時的格式
			var err = {m_bSuccess:false};
			if(!!r.errorDetail) {
				err.m_ErrCode = r.errorDetail;
				err.m_strErrMsg = r.errorDetail.string;
				if(!!r.errorDetail.raw && !!r.errorDetail.raw.responseJSON && !!r.errorDetail.raw.responseJSON.Message) {
					err.m_ErrCode = r.errorDetail.raw.responseJSON.ExceptionType;
					err.m_strErrMsg = r.errorDetail.raw.responseJSON.Message + '\r\n' + r.errorDetail.raw.responseJSON.StackTrace;
				}
			}
			else {	// 無errorDetail?
				err.m_ErrCode = r;
				err.m_strErrMsg = "invokeJSON失敗, 但未回傳errorDetail";
			}
			if(!!callback)
				callback(err);
			if(!async)
				return err;
		}
		else if(typeof r.value !== "string") {
			theLogger.error("Error! GetWebMethodInfo(" + key + ")回傳值非字串");
			var err = {m_bSuccess:false, m_ErrCode:-999, m_strErrMsg: "Error! GetWebMethodInfo(" + key + ")回傳值非字串"};
			if(!!callback)
				callback(err);
			if(!async)
				return err;
		}
		else if(r.value.length == 0) {
			theLogger.error("Error! GetWebMethodInfo(" + key + ")回傳空字串");
			var err = {m_bSuccess:false, m_ErrCode:-998, m_strErrMsg: "Error! GetWebMethodInfo(" + key + ")回傳空字串"};
			if(!!callback)
				callback(err);
			if(!async)
				return err;
		}
		else
			res = SOAPClient._onLoadWebMethodInfo(url, method, parameters, async, callback, JSON.parse(r.value));
	});
	if(!async)
		return res;
}

SOAPClient._onLoadWebMethodInfo = function(url, method, parameters, async, callback, wmi)
{
	var key = url + ((url[url.length - 1] == '/')?"":"/") + method;
	SOAPClient_cacheWebMethodInfo[key] = wmi;	// save a copy in cache
	// 判斷若WebMethodInfo的回傳值無XML格式, 則直接改叫invokeByJSON
	if(SOAPClient_cacheWebMethodInfo[key].ReturnHasXml != true) {
		parameters.importLacks(wmi);	// 1091117 Raymond 補充缺少的參數
		return SOAPClient.invokeJSON(url, method, parameters, async, function(res) {
				if(res.error == true) {	// invokeJSON回傳錯誤的物件結構需轉成呼叫invoke時的格式
					var err = {m_bSuccess:false};
					if(!!res.errorDetail) {
						err.m_ErrCode = res.errorDetail;
						err.m_strErrMsg = res.errorDetail.string;
						if(!!res.errorDetail.raw && !!res.errorDetail.raw.responseJSON && !!res.errorDetail.raw.responseJSON.Message) {
							err.m_ErrCode = res.errorDetail.raw.responseJSON.ExceptionType;
							err.m_strErrMsg = res.errorDetail.raw.responseJSON.Message + '\r\n' + res.errorDetail.raw.responseJSON.StackTrace;
						}
					}
					else {	// 無errorDetail?
						err.m_ErrCode = res;
						err.m_strErrMsg = "invokeJSON失敗, 但未回傳errorDetail";
					}
					if(!!callback)
						callback(err);
				}
				else if(!!callback) {
					// 1091117 Raymond invokeJSON的回傳值不用轉成物件
					/*if(typeof res.value === "string" && res.value.match(/^\{/))
						callback(JSON.parse(res.value));
					else*/
						callback(res.value);
				}
			});
	}
	return SOAPClient._sendSoapRequestWithWMI(url, method, parameters, async, callback, SOAPClient_cacheWebMethodInfo[key]);
}

SOAPClient._sendSoapRequestWithWMI = function(url, method, parameters, async, callback, wmi)
{
	// get namespace
	var ns = (!!wmi.Namespace && wmi.Namespace.length > 0) ? wmi.Namespace : "";
	// build SOAP request
	var sr = 
				"<?xml version=\"1.0\" encoding=\"utf-8\"?>" +
				"<soap:Envelope " +
				"xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" " +
				"xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
				"xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">" +
				"<soap:Body>" +
				"<" + method + " xmlns=\"" + ns + "\">" +
				parameters.toXml() +
				"</" + method + "></soap:Body></soap:Envelope>";
	// send request
	var xmlHttp = SOAPClient._getXmlHttp();
	xmlHttp.open("POST", url, async);
	//1120331	Leslie[1111455]	叫用WebFileIO增加帶上Cookie
	xmlHttp.withCredentials = true;
	var soapaction = ((ns.lastIndexOf("/") != ns.length - 1) ? ns + "/" : ns) + method;
	xmlHttp.setRequestHeader("SOAPAction", soapaction);
	xmlHttp.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
	// 2013/5/6 Raymond added, for Mobile Safari always cache soap issue.
	if(navigator.userAgent.search(/Chrome/) < 0) {  // not chrome!
		/* 2013.12 - iOS Safari以XMLHttpRequest下載設定檔時,常server已新,但browser仍使用client cache,
		 * 以下設定可強制瀏覽器取用server檔案!
		 */
		//xmlHttp.setRequestHeader("If-Modified-Since", "Sat, 1 Jan 2005 00:00:00 GMT");  // 必須加上這個Header, 以免在iOS平台預設會Cache HTTP Request的環境下發生錯誤
		xmlHttp.setRequestHeader("Cache-Control", "no-cache");
	}
	
	// 2013.12 - Eric Peng, synchronous不能設定timeout! (Chrome Error!)
	if (async) {
		// 2018.11 - 1071165 Eric, 延長逾時為5分鐘(300秒)
		// 2013/12/24 - Raymond, 延長逾時
		xmlHttp.timeout = 300000;
	}
	
	//console.log(xmlHttp);
	if(async) 
	{
		xmlHttp.onreadystatechange = function() 
		{
			if(xmlHttp.readyState == 4)
				SOAPClient._onSendSoapRequestWithWMI(url, method, async, callback, wmi, xmlHttp);
		}

		// 2018.11 - 1071165 Eric, 處理timeout
		xmlHttp.ontimeout = function(e) {
			if (callback) {
				callback({m_bSuccess:false, m_ErrCode: -1, m_strErrMsg: 'WS作業逾時'});
			}
		}
	}
	xmlHttp.send(sr);
	if (!async)
		return SOAPClient._onSendSoapRequestWithWMI(url, method, async, callback, wmi, xmlHttp);
}

SOAPClient._onSendSoapRequestWithWMI = function(url, method, async, callback, wmi, req)
{
	// 2018.11.22 - 1071165, 處理timeout時req.responseXML為null的情況
	if (typeof req.responseXML=='object' && req.responseXML!==null) {
		console.debug(req.responseXML);
		var o = null;
		var nd = SOAPClient._getElementsByTagName(req.responseXML, method + "Result");
		if(nd.length == 0) {
			if(req.responseXML.getElementsByTagName("faultcode").length > 0)
				throw new Error(500, req.responseXML.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
		}
		else
			o = SOAPClient._soapresult2objectWithWMI(nd[0], wmi);	// 只取回傳值對
		if(callback)
			callback(o, req.responseXML);
		if(!async)
			return o;
	}
	else {
		let resText = req.responseText;
		console.error("Error! 呼叫" + url + "/" + method + "未回傳responseXML, responseText='" + resText + "'");
		if (typeof resText=='string' && resText.length && callback) {
			callback({m_bSuccess:false, m_ErrCode:req.status, m_strErrMsg: resText});
		}
	}
}
SOAPClient._soapresult2objectWithWMI = function(node, wmi)
{
	if (node.childNodes.length == 1 && (node.childNodes[0].nodeType == 3 || node.childNodes[0].nodeType == 4))
		return SOAPClient._node2objectWithWMI(node.childNodes[0], wmi);
	return SOAPClient._node2objectWithWMI(node, wmi);
}
SOAPClient._node2objectWithWMI = function(node, wmi)
{
	// null node
	if(node == null) {
		console.log(null);
		return null;
	}
	// text node
	if(node.nodeType == 3 || node.nodeType == 4) {
		var v = SOAPClient._extractValueWithWMI(node, wmi);
		console.log(node.parentNode.nodeName + " = " + v);
		return v;
	}
	// leaf node
	if (node.childNodes.length == 1 && (node.childNodes[0].nodeType == 3 || node.childNodes[0].nodeType == 4))
		return SOAPClient._node2objectWithWMI(node.childNodes[0], wmi);
	var elemType = SOAPClient._getTypeFromWMI(node.nodeName, wmi);
	if(!elemType) {	// node名稱找不到對應type, 可能是Rtn陣列的物件標籤名稱
		console.log("<" + node.nodeName + ">無對應type, 可能是Rtn陣列的物件標籤名稱, childNodes(" + node.childNodes.length + ")");
		var obj = new Object();
		for(var i = 0; i < node.childNodes.length; i++) {
			var p = SOAPClient._node2objectWithWMI(node.childNodes[i], wmi);
			obj[node.childNodes[i].nodeName] = p;
		}
		return obj;
	}
	console.log("elemType of <" + node.nodeName + "> = '" + elemType + "'");
	var isarray = elemType.match(/\[\]$/);
	console.log(elemType + " is" + (isarray?"":" NOT") + " Array");
	if(elemType == "System.Xml.XmlDocument" ||	// System.Xml.XMLDocument為XML型態
		elemType == "System.Xml.XmlElement") {	// 1091117 Raymond System.Xml.XmlElement也是XML型態
		if(node.childNodes.length == 1) {
			console.log(node.childNodes[0]);
			return node.childNodes[0];
		}
		console.log(node);
		return node;
	}
	else if(elemType.match(/^System./)) {	// System.開頭的類型為基礎型別, 若node無子節點(ex: <NodeName/>)便會執行到這裡
		if(!isarray) {	// 基礎型別非陣列才直接轉換
			var v = SOAPClient._translateValueWithType(node.nodeValue, elemType);
			console.log(node.nodeName + " = " + v);
			return v;
		}
		else if(node.childNodes.length > 0) {
			var elemProp = [{name: node.childNodes[0].nodeName, type: elemType.substr(0, isarray.index)}];	// 是陣列的話, 會走到for node.childNodes迴圈, 但基礎型別不會有property宣告, 所以直接給一個空陣列
		}
	}
	else {	// 非System.開頭的類型即為自訂型別
		var elemProp = SOAPClient._getPropertyFromWMI(node.nodeName, wmi);
		console.log("elemProp = ", elemProp);
		if(!elemProp)
			throw new Error("<" + node.nodeName + ">為自訂型別'" + elemType + "'卻未定義property, 無法處理其子欄位項目");
	}
	// object node
	if(!isarray)
	{
		var obj = new Object();
		for(var i = 0; i < node.childNodes.length; i++) {
			var p = SOAPClient._node2objectWithWMI(node.childNodes[i], elemProp);
			obj[node.childNodes[i].nodeName] = p;
		}
		return obj;
	}
	// list node
	else
	{
		// create node ref
		var l = new Array();
		for(var i = 0; i < node.childNodes.length; i++) {
			l[l.length] = SOAPClient._node2objectWithWMI(node.childNodes[i], elemProp);
		}
		return l;
	}
	return null;
}
SOAPClient._extractValueWithWMI = function(node, wmi)
{
	var elemType = SOAPClient._getTypeFromWMI(node.parentNode.nodeName, wmi);
	return SOAPClient._translateValueWithType(node.nodeValue, elemType);
}
SOAPClient._getTypeFromWMI = function(elementname, wmi)
{
	if(Array.isArray(wmi)) {	// wmi是property array
		for(var i=0, n=wmi.length; i<n; i++) {
			if(wmi[i].name == elementname)
				return wmi[i].type;
		}
		return null;
	}
	else if(!!wmi.type)
		return wmi.type;
	return wmi.ReturnType.Type;
}
SOAPClient._getPropertyFromWMI = function(elementname, wmi)
{
	if(Array.isArray(wmi)) {	// wmi是property array
		for(var i=0, n=wmi.length; i<n; i++) {
			if(wmi[i].name == elementname)
				return wmi[i].property;
		}
		return null;
	}
	return wmi.property;
}
SOAPClient._translateValueWithType = function(value, elemType) {
	switch(elemType) {
		case "System.String":
			return (value != null) ? value + "" : "";
		case "System.Boolean":
			return value+"" == "true";
		case "System.Int16":
		case "System.Int32":
		case "System.Int64":
			return (value != null) ? parseInt(value + "", 10) : 0;
		case "System.Double":
			return (value != null) ? parseFloat(value + "") : 0;
		case "System.DateTime":
			if(value == null)
				return null;
			else {
				value = value + "";
				value = value.substring(0, value.lastIndexOf("."));
				value = value.replace(/T/gi," ");
				value = value.replace(/-/gi,"/");
				var d = new Date();
				d.setTime(Date.parse(value));
				return d;
			}
		default:
			console.error("無法識別的基礎型別'" + elemType + "', 改以字串型態方式處理...");
			return (value != null) ? value + "" : "";
	}
}