// AlternativeLogger
// 1051020		Raymond		刪除disp方法, for 弱掃
// 1060817		Leslie		新增ExceptionLog功能，用於截取特定異常訊息，並上傳至Server端保留紀錄
//1080430		Joe			弱掃錯誤修正，上傳路徑已於RD-SSO設定
//1140723		Leslie		[1141011]弱掃修正[Client DOM Stored XSS]

var AlternativeLogger = new function() {

	var _logLevel = (SSO_CONFIG)?SSO_CONFIG.logLevel:0;	// 1: error, 2: warn, 3: info, 4: detail, 0: 取消寫出LOG	//1080515	Leslie	修改預設值為0
	var _addTimeStamp = true;				// 記錄時間
	var _symbols = ['', 'E', 'W', 'I', 'D'];
	//2020.03.06 - Leslie[1081088]	修改Log機制，開放到4000
	//var _autoUploadThreshold = 2000;		// Log寫滿此容量前自動上傳一次
	var _autoUploadThreshold = 4000;		
	var _uploadPath = "";					// 上傳子目錄路徑, 1080117 Raymond 改為空值 for 弱掃
	var _useJSON = false;					// Object類型參數, 用JSON.stringify字串化
	var _useGetXml = true;					// XML類型參數, 用Util.getXml字串化
	var _duringUpload = false;				// 上傳時鎖定writeLog的自動上傳
	var _repo = new InMemoryRepo();			// 採用In memory array作為暫存LOG資訊的媒介
	var _pageName = ''; 					// 2019.7 - 1080654 Eric, 非MP頁面之log記錄!
	var _logAutoUpload = (SSO_CONFIG && SSO_CONFIG.logAutoUpload)?SSO_CONFIG.logAutoUpload:false;	//2020.03.06 - Leslie[1081088]	修改Log機制
	var _logType = {Debug: 4,Info: 3,Warn: 2,Time: 2,Error: 1}		//2020.03.06 - Leslie[1081088]	修改Log機制
		
	// In Memory Array為儲存媒介
	function InMemoryRepo() {
		var _msgs = new Array();
		//2020.03.06 - Leslie[1081088]	修改Log機制，為了可同時支援Memory紀錄，以及上傳時不直接清空Buffer，增加Index指標
		var _MemBufferLength = 0,_MaxLength = 4000;
		return {
			write: function(type, msg, source) {
				var log_time = new Date(), str;
				if(_addTimeStamp)
					str = padLeft(log_time.getHours(), 2) + ":" + padLeft(log_time.getMinutes(), 2) + ":" + padLeft(log_time.getSeconds(), 2) + "." + padLeft(log_time.getMilliseconds(), 3) + " -" + type + "- " + msg + "\t\t@" + source;
				else
					str = "-" + type + "- " + msg + "\t\t@" + source;
				//console.log(str);
				_msgs.push(str);
				//2020.03.06 - Leslie[1081088]	修改Log機制，為了可同時支援Memory紀錄，以及上傳時不直接清空Buffer，增加Index指標
				_MemBufferLength++;
				if(_msgs.length > _MaxLength)
					_msgs.shift();
			},
			length: function() {
				//2020.03.06 - Leslie[1081088]	修改Log機制，為了可同時支援Memory紀錄，以及上傳時不直接清空Buffer，增加Index指標
				//return _msgs.length;
				return _MemBufferLength;
			},
			snapshot: function() {
				var str = _msgs.join("\r\n");
				//2020.03.06 - Leslie[1081088]	修改Log機制，為了可同時支援Memory紀錄，以及上傳時不直接清空Buffer，增加Index指標
				//_msgs.length = 0;
				_MemBufferLength = 0;	//重設回0，下次達標時則可再上傳
				return str;
			},
            clear: function() { // 2019.7 - Eric, for 開啟/傳送效能log!
				//2020.03.06 - Leslie[1081088]	修改Log機制，改用各瀏覽器平均值中，相對較有效率的方式
                //_msgs.length = 0;
				while (_msgs.length > 0) {
					_msgs.shift();
				}
				_MemBufferLength = 0;	//重設回0，下次達標時則可再上傳
            },
			//2020.03.06 - Leslie[1081088]	修改Log機制，增加可直接輸出至主控台的功能
			dump: function(){
				function _dump(idx)
				{
					console.log(_msgs[idx++]);
					if(_msgs[idx])
						setTimeout(_dump,10,idx);
				}
				_dump(0);
			},
			//2020.03.06 - Leslie[1081088]	修改Log機制，為了可同時支援Memory紀錄，以及上傳時不直接清空Buffer，增加上限屬性
			setMaxLength: function(mlen){
				_MaxLength = mlen;
			}
		};
	};
	
	// 1080116 Raymond WebStorage、WebSQL、IndexedDB等儲存方式全部刪除, for  Client Use Of Deprecated SQL Database
    
	// 字串左邊補0, 輸入數字會輸出字串
    function padLeft(num, len) {
        if(typeof num != "string")
            num = num.toString();
        if(num.length >= len)
            return num;
        else
            return arguments.callee("0" + num, len);
    }
	
	// time to string
	function t2s(t) {
		return padLeft(t.getMonth()+1, 2) + padLeft(t.getDate(), 2) + padLeft(t.getHours(), 2) + ":" + padLeft(t.getMinutes(), 2) + ":" + padLeft(t.getSeconds(), 2) + "." + padLeft(t.getMilliseconds(), 3);
	}
	// string to time
	function s2t(s) {
		// not yet
	}
	
	function writeLog(lvl, args, source) {
		function msg(str) {
			if(typeof str === "string")
				return str;
			else if(Object.prototype.toString.apply(str) == "[object Array]") {
				var res = "[";
				for(var i=0; i<str.length; i++) {
					if(typeof str[i] === "string")
						res += "'" + str[i] + "', ";
					else
						res += msg(str[i]) + ", ";
				}
				res += "]";
				return res;
			}
			else if(Object.prototype.toString.apply(str) == "[object Object]" && _useJSON) {
				try {
					return JSON.stringify(str);
				}
				catch(e) {
					console.error(e.message);
					return Object.prototype.toString.apply(str) + " - 無法使用JSON序列化:'" + e.message + "'";
				}
			}
			else if(str instanceof Document && _useGetXml && window.Util && "getXml" in window.Util) {	// 2016.2.25 修正支援XML序列化
				try {
					return Util.getXml(str, false);
				}
				catch(e) {
					console.error(e.message);
					return Object.prototype.toString.apply(str) + " - 無法使用XML序列化:'" + e.message + "'";
				}
			}
			return Object.prototype.toString.apply(str);
		}
		if(lvl <= _logLevel) {
			/*var str = "";
			if(_addTimeStamp) {
				var t = new Date();
				str = padLeft(t.getHours(), 2) + ":" + padLeft(t.getMinutes(), 2) + ":" + padLeft(t.getSeconds(), 2) + "." + padLeft(t.getMilliseconds(), 3) + " -" + _symbols[lvl] + "- " + msg(args) + "\r\n";
			}
			else
				str = "-" + _symbols[lvl] + "- " + msg(args) + "\r\n";
			if(!('localLog' in window.localStorage))
				window.localStorage['localLog'] = str;
			else {
				var t0 = new Date();
				var s0 = Math.floor(window.localStorage['localLog'].length / 1024);
				window.localStorage['localLog'] += str;
				console.log(((new Date()) - t0) + "ms spent on writing log ~" + s0 + "Kwords");
			}*/
			_repo.write(_symbols[lvl], msg(args), source);
			// 寫入容量已滿則自動上傳
			//2020.03.06 - Leslie[1081088]	修改Log機制，增加檢核是否啟用上傳機制
			//if(_repo.length() >= _autoUploadThreshold && !_duringUpload) {
			if(_logAutoUpload && _repo.length() >= _autoUploadThreshold && !_duringUpload) {
				var t = new Date();
				console.log(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " 暫存區寫入容量已達上限, 自動上傳目前為止的LOG訊息...");
				AlternativeLogger.upload("暫存區容量已達上限自動上傳");
			}
		}
	}
	
	function formatLog(kind) {
		if(kind == 1) {	// HTML
			var res = "<hr>";
			/*for(var nm in window.localStorage) {
				res += (nm + "<br>");
				res += (window.localStorage[nm] + "<hr>");
			}
			return res;*/
			if('logHistory' in window.localStorage)
				res = window.localStorage['logHistory']
						.replace(/&/g, '&amp;')
						.replace(/</g, '&lt;')
						.replace(/>/g, '&gt;')
						.replace(/"/g, '&quot;')
						.replace(/'/g, '&apos;')
						.replace(/\t/g, '&emsp;')
						.replace(/\r\n/g, "<br>") + "<hr>";
			if('localLog' in window.localStorage)
				res += window.localStorage['localLog']
						.replace(/&/g, '&amp;')
						.replace(/</g, '&lt;')
						.replace(/>/g, '&gt;')
						.replace(/"/g, '&quot;')
						.replace(/'/g, '&apos;')
						.replace(/\t/g, '&emsp;')
						.replace(/\r\n/g, "<br>");
			return res;
		}
		else {	// plain text
			return window.localStorage['localLog'];
		}
	}

	//var _isMobile = navigator.userAgent.match(/Mobile/);
	//var _isChrome = navigator.userAgent.match(/Chrome/);
    // exposed interface
    this.exposed = {
		
		debug: function() {
			//2020.03.06 - Leslie[1081088]	修改Log機制
			let callerName = arguments.callee.caller.name?arguments.callee.caller.name:'anonymous';
			console.debug(callerName,arguments[0]);	//一律輸出至Console
			
			if(_logLevel < _logType.Debug)		//再依Level決定是否紀錄
				return;
			
			var e = new Error();
			if("stack" in e) {
				var k = e.stack.split("\n");
				if(k.length > 1) {	// 2016.1.28 Chrome與iPad的stack不同
					if(k[0] == "Error") {	// Chrome
						var c = k[2].lastIndexOf('/');
						if(c >= 0)
							writeLog(4, arguments[0], k[2].substring(c+1).replace(')',''));
						else
							writeLog(4, arguments[0], k[2]);
					}
					else {	// iPad
						var c = k[1].lastIndexOf('/');
						if(c >= 0)
							writeLog(4, arguments[0], k[1].substring(c+1));
						else
							writeLog(4, arguments[0], k[1]);
					}
				}
				else
					writeLog(4, arguments[0], e.stack);
			}
			else	// 瀏覽器Error物件不支援call stack
				//2020.03.06 - Leslie[1081088]	修改Log機制，不支援時，改用CallerName
				//writeLog(4, arguments[0], null);
				writeLog(_logType.Debug, arguments[0], callerName);
		},
        
        log: function() {
			//2020.03.06 - Leslie[1081088]	修改Log機制，一般Log一律改用Caller.Name
			let callerName = arguments.callee.caller.name?arguments.callee.caller.name:'anonymous';
			console.log(callerName,arguments[0]);	//一律輸出至Console
			
			if(_logLevel < _logType.Info)		//再依Level決定是否紀錄
				return;
			writeLog(_logType.Info,arguments[0],callerName);
			
			//2020.03.06 - Leslie[1081088]	修改Log機制，一般Log一律改用Caller.Name
			/*var e = new Error();
			if("stack" in e) {
				var k = e.stack.split("\n");
				if(k.length > 1) {	// 2016.1.28 Chrome與iPad的stack不同
					if(k[0] == "Error") {	// Chrome
						var c = k[2].lastIndexOf('/');
						if(c >= 0)
							writeLog(3, arguments[0], k[2].substring(c+1).replace(')',''));
						else
							writeLog(3, arguments[0], k[2]);
					}
					else {	// iPad
						var c = k[1].lastIndexOf('/');
						if(c >= 0)
							writeLog(3, arguments[0], k[1].substring(c+1));
						else
							writeLog(3, arguments[0], k[1]);
					}
				}
				else
					writeLog(3, arguments[0], e.stack);
			}
			else	// 瀏覽器Error物件不支援call stack
				writeLog(3, arguments[0], null);*/
        },
        
        warn: function() {
			//2020.03.06 - Leslie[1081088]	修改Log機制
			let callerName = arguments.callee.caller.name?arguments.callee.caller.name:'anonymous';
			console.warn(callerName,arguments[0]);	//一律輸出至Console
			
			if(_logLevel < _logType.Warn)		//再依Level決定是否紀錄
				return;
			
			if(_logLevel == _logType.Debug){		//警告式的，在開Debug時，用Stack紀錄真實行數
				var e = new Error();
				if("stack" in e) {
					var k = e.stack.split("\n");
					if(k.length > 1) {	// 2016.1.28 Chrome與iPad的stack不同
						if(k[0] == "Error") {	// Chrome
							var c = k[2].lastIndexOf('/');
							if(c >= 0)
								writeLog(2, arguments[0], k[2].substring(c+1).replace(')',''));
							else
								writeLog(2, arguments[0], k[2]);
						}
						else {	// iPad
							var c = k[1].lastIndexOf('/');
							if(c >= 0)
								writeLog(2, arguments[0], k[1].substring(c+1));
							else
								writeLog(2, arguments[0], k[1]);
						}
					}
					else
						writeLog(2, arguments[0], e.stack);
				}
				else	// 瀏覽器Error物件不支援call stack
					//2020.03.06 - Leslie[1081088]	修改Log機制，不支援時，改用CallerName
					//writeLog(2, arguments[0], null);
					writeLog(2, arguments[0], callerName);
			}
			else
				writeLog(_logType.Warn,arguments[0],callerName);	//logLevel 1~3 只寫Caller.Name
        },
		// 2019.7 - Eric, 開啟/傳送公文效能log
        time: function() {
			//2020.03.06 - Leslie[1081088]	修改Log機制，一般Log、Time一律改用Caller.Name
			let callerName = arguments.callee.caller.name?arguments.callee.caller.name:'anonymous';
			console.warn(callerName,arguments[0]);	//一律輸出至Console
			
			if(_logLevel < _logType.Time)		//再依Level決定是否紀錄
				return;
			writeLog(_logType.Time,arguments[0],callerName);
			
			//2020.03.06 - Leslie[1081088]	修改Log機制，一般Log、Time一律改用Caller.Name
            /*var e = new Error();
			if("stack" in e) {
				var k = e.stack.split("\n");
				if(k.length > 1) {	// 2016.1.28 Chrome與iPad的stack不同
					if(k[0] == "Error") {	// Chrome
						var c = k[2].lastIndexOf('/');
						if(c >= 0)
							writeLog(2, arguments[0], k[2].substring(c+1).replace(')',''));
						else
							writeLog(2, arguments[0], k[2]);
					}
					else {	// iPad
						var c = k[1].lastIndexOf('/');
						if(c >= 0)
							writeLog(2, arguments[0], k[1].substring(c+1));
						else
							writeLog(2, arguments[0], k[1]);
					}
				}
				else {
					writeLog(2, arguments[0], e.stack);
				}
			}
			else {	// 瀏覽器Error物件不支援call stack
				writeLog(2, arguments[0], null);
			}*/
        },
		error: function() {
			//2020.03.06 - Leslie[1081088]	修改Log機制
			let callerName = arguments.callee.caller.name?arguments.callee.caller.name:'anonymous';
			console.error(callerName,arguments[0]);	//一律輸出至Console
			if('ActiveXObject' in window && 'trace' in console)
				console.trace();	//IE 多輸出trace() (只有IE不會在console.error()預設輸出叫用堆疊)
			
			var e = new Error();
			if("stack" in e) {
				var k = e.stack.split("\n");
				if(k.length > 1) {	// 2016.1.28 Chrome與iPad的stack不同
					if(k[0] == "Error") {	// Chrome
						var c = k[2].lastIndexOf('/');
						if(c >= 0) {
							var src = k[2].substring(c+1).replace(')','');
							k = k.slice(2);
							k.unshift(arguments[0] + '\t' + src);
							writeLog(1, k.join("\r\n"), src);
						}
						else {
							var src = k[2];
							k = k.slice(2);
							k.unshift(arguments[0] + '\t' + src);
							writeLog(1, k.join("\r\n"), src);
						}
					}
					else {	// iPad
						var c = k[1].lastIndexOf('/');
						if(c >= 0) {
							var src = k[1].substring(c+1);
							k = k.slice(1);
							k.unshift(arguments[0] + '\t' + src);
							writeLog(1, k.join("\r\n"), src);
						}
						else {
							var src = k[1];
							k = k.slice(1);
							k.unshift(arguments[0] + '\t' + src);
							writeLog(1, k.join("\r\n"), src);
						}
					}
				}
				else
					writeLog(1, arguments[0], e.stack);
			}
			else	// 瀏覽器Error物件不支援call stack
				//2020.03.06 - Leslie[1081088]	修改Log機制，不支援時，改用CallerName
				//writeLog(1, arguments[0], null);
				writeLog(_logType.Error, arguments[0], callerName);
		}
    }
	
	// static methods
	this.get = function(prop) {
		if(prop == "addTimeStamp")
			return _addTimeStamp;
		else if(prop == "logLevel")
			return _logLevel;
		else if(prop == "autoUploadThreshold")
			return _autoUploadThreshold;
		else if(prop == "uploadPath")
			return _uploadPath;
		//2020.03.06 - Leslie[1081088]	修改Log機制
		else if(prop == "logAutoUpload")
			return _logAutoUpload;
		return "Unknown property name:'" + prop + "'";
	};
	
	this.set = function(prop, val) {
		window.theLogger.log("AlternativeLogger.set('" + prop + "', " + val + ")");	// 用目前記錄器寫變更設定訊息
		var t = new Date();
		if(prop == "addTimeStamp")
			_addTimeStamp = !!val;
		else if(prop == "logLevel") {
			if(typeof val === "number") {
				if(val >= 0 && val <= 4) {
					_logLevel = val;
					if(_logLevel == 0) {
						window.theLogger = console;
						window.theLogger.time = console.debug; // 2019.7 - 1080654 Eric, added for performance test
					}
					else
						window.theLogger = this.exposed;
				}
				else
					console.error(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " AlternativeLogger.set('" + prop + "', " + val + "): invalid range! must be 1~4");
			}
			else if(typeof val === "string") {
				if(val.match(/\d/)) {
					val = Number(val);
					if(val >= 0 && val <= 4) {
						_logLevel = val;
						if(_logLevel == 0) {
							window.theLogger = console;
							window.theLogger.time = console.debug; // 2019.7 - 1080654 Eric, added for performance test
						}
						else
							window.theLogger = this.exposed;
					}
					else
						console.error(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " AlternativeLogger.set('" + prop + "', " + val + "): invalid range! must be 1~4");
				}
				else
					console.error(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " AlternativeLogger.set('" + prop + "', " + val + "): invalid value! must be number 1~4");
			}
			else
				console.error(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " AlternativeLogger.set('" + prop + "', " + val + "): can't recognize value! must be number 1~4");
		}
		else if(prop == "autoUploadThreshold") {
			if(typeof val === "string" && val.match(/\d+/))
				val = Number(val);
			if(typeof val === "number") {
				if(val >= 100 && val <= 10000){
					_autoUploadThreshold = val;
					//2020.03.06 - Leslie[1081088]	修改Log機制，由內部控制Buffer存滿後的行為
					_repo.setMaxLength(val);
				}
				else
					console.error(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " AlternativeLogger.set('" + prop + "', " + val + "): invalid value! must be 100~10000");
			}
			else
				console.error(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " AlternativeLogger.set('" + prop + "', " + val + "): can't recognize value! must be number 1~4");
		}
		else if(prop == "uploadPath")
			_uploadPath = val;
		//2020.03.06 - Leslie[1081088]	修改Log機制
		else if(prop == "logAutoUpload"){
			if(typeof val === "boolean")
				_logAutoUpload = val;
			else if(typeof val === "string" && val.length == 1 && 'Y/N'.indexOf(val.toUpperCase()) != -1)
				_logAutoUpload = val.toUpperCase()=='Y';
			else
				console.error(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " AlternativeLogger.set('" + prop + "', " + val + "): invalid value! must be boolean(true/false) or string(Y/N)");
		}
		else
			console.error(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " AlternativeLogger.set('" + prop + "', " + val + "): invalid property name!");
	};
	
	/*this.upload = function() {
		var t = new Date();
		// 增加上傳歷程記錄
		var td = padLeft(t.getYear()-11, 3) + padLeft(t.getMonth()+1, 2) + padLeft(t.getDate(), 2);
		if('logHistory' in window.localStorage) {
			// 抓第1行判斷是不是今天, 若不是則先清除, logHistory只要保留今天記錄即可
			var str = window.localStorage['logHistory'];
			if(str.length && str.indexOf('\r\n') > 0) {
//				alert(str.indexOf('\r\n') + ">" + str.substring(0, str.indexOf('\r\n')));
				var lastLogDate = str.substring(0, str.indexOf('\r\n'));
				if(lastLogDate != td) {
					console.warn(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " AlternativeLogger.upload(): 清除前一天的上傳記錄...");
//					alert("clear log history:" + lastLogDate + " != " + td);
					window.localStorage['logHistory'] = td + "\r\n";
				}
			}
			else
				window.localStorage['logHistory'] = td + "\r\n";
		}
		else
			window.localStorage['logHistory'] = td + "\r\n";
		var reason = ((arguments.length > 0)?arguments[0]:"上傳");
		//alert(reason);
		if('localLog' in window.localStorage) {
			if(!!WebFileIO && !!SSO_CONFIG) {
				if('Artifact' in window.localStorage && window.localStorage['Artifact'].length > 0) {	// 有效登入中
					var fileName = theSSO.User.account + "_" + padLeft(t.getHours(), 2) + padLeft(t.getMinutes(), 2) + padLeft(t.getSeconds(), 2) + "_" + window.localStorage['Artifact'].substring(0, 8) + ".log";
					try {
						_duringUpload = true;
						var wfio = new WebFileIO(SSO_CONFIG.getWSUrl("fileiows"), theSSO.User.account);
						//console.log(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " AlternativeLogger.upload(): preparing to upload " + window.localStorage['localLog'].length + "(Words)...");
						var data = window.localStorage['localLog'];	// data是native string
						//window.localStorage['localLog'] = "";
						wfio.upload("C:\\TEMP\\LocalLog", fileName, WebFileIO.prototype.utf8.encode(data), {	// 但丟給WebFileIO上傳的資料必須是Binary,所以要先用utf8 encode過
							async: false,	// ipad要用同步, 因為有可能success不會被叫用
							success: function(fileName, filePath) {
								//alert("上傳LOG檔成功!");
								var t1 = new Date();
								console.log(padLeft(t1.getHours(),2) + ":" + padLeft(t1.getMinutes(),2) + ":" + padLeft(t1.getSeconds(),2) + " AlternativeLogger.upload(): success!");
								var st = padLeft(t1.getHours(),2) + ":" + padLeft(t1.getMinutes(),2) + ":" + padLeft(t1.getSeconds(),2) + " " + reason + "LOG至 '" + filePath + "\\" + fileName + "' 成功!\r\n";
								window.localStorage['logHistory'] = window.localStorage['logHistory'] + st;
								// 清除localStorage佔用容量
								window.localStorage['localLog'] = "";
								_duringUpload = false;
							},
							error: function(errorText) {
								var t1 = new Date();
								console.error(padLeft(t1.getHours(),2) + ":" + padLeft(t1.getMinutes(),2) + ":" + padLeft(t1.getSeconds(),2) + " AlternativeLogger.upload(): 失敗! " + errorText);
								writeLog(1, "AlternativeLogger.upload():" + reason + "LOG至 'C:\\TEMP\\LocalLog\\" + fileName + "' 失敗! " + errorText);
								alert("上傳LOG檔失敗!" + errorText);
								var st = padLeft(t1.getHours(),2) + ":" + padLeft(t1.getMinutes(),2) + ":" + padLeft(t1.getSeconds(),2) + " " + reason + "LOG至 'C:\\TEMP\\LocalLog\\" + fileName + "' 失敗! " + errorText + "\r\n";
								window.localStorage['logHistory'] = window.localStorage['logHistory'] + st;
								// 上傳失敗先dump到console
								console.log(data);
								_duringUpload = false;
							}
						});
					}
					catch(e) {
						alert(e.message);
						_duringUpload = false;
					}
				}
				else {
					console.error(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " AlternativeLogger.upload(): no valid Artifact exists!");
					_duringUpload = true;	// 2015.12.17 下面這行寫出LOG又會觸發自動upload, 所以要把flag設起來
					writeLog(1, "AlternativeLogger.upload():" + reason + "LOG功能在使用者未登入系統前無法工作!");
					_duringUpload = false;
				}
			}
			else {
				console.error(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " AlternativeLogger.upload(): nor WebFileIO neither SSO_CONFIG exists!");
				_duringUpload = true;	// 2015.12.17 下面這行寫出LOG又會觸發自動upload, 所以要把flag設起來
				writeLog(1, "AlternativeLogger.upload():" + reason + "LOG功能無環境可工作!");
				//alert("無法上傳LOG檔!");
				var st = padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " " + reason + "LOG功能無環境可工作!\r\n";
				window.localStorage['logHistory'] = window.localStorage['logHistory'] + st;
				// 無上傳環境先dump到console
				console.log(window.localStorage['localLog']);
				_duringUpload = false;
			}
		}
		else {
			console.error(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " AlternativeLogger.upload(): localStorage['localLog'] no exists!");
			_duringUpload = true;	// 2015.12.17 下面這行寫出LOG又會觸發自動upload, 所以要把flag設起來
			writeLog(1, "AlternativeLogger.upload():" + reason + "LOG功能找不到localLog記錄可上傳!");
			//alert("C");
			var st = padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " " + reason + "LOG功能找不到localLog記錄可上傳!\r\n";
			window.localStorage['logHistory'] = window.localStorage['logHistory'] + st;
			_duringUpload = false;
		}
	};*/
	
	this.upload = function() {
		var t = new Date();
		var td = padLeft(t.getYear()-11, 3) + padLeft(t.getMonth()+1, 2) + padLeft(t.getDate(), 2);
		var reason = ((arguments.length > 0)?arguments[0]:"上傳");
		//1091026	Leslie	修正因Chrome升級至80版後關閉視窗於unload事件無法以同步呼叫WS之問題，增加判斷是否為「關閉分頁前上傳」，視窗關閉時，僅可用非同步叫用
		var bASync = (reason == "關閉分頁前上傳");
		if(_logLevel == 0) {
			console.warn(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " 設定不收集LOG, 故停止" + reason);
			return;
		}
		// 1130808 Raymond 1130313 合併1111007(1100394), 離線模式下不上傳LOG
		else if(!!theSSO && theSSO.offlineMode == true) {
			console.warn(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " 離線模式下不收集LOG, 故停止" + reason);
			_repo.snapshot();	// 清空暫存
			return;
		}
		if(!!WebFileIO && !!SSO_CONFIG) {
			if('Artifact' in window.localStorage && window.localStorage['Artifact'].length > 0 &&	// 有效登入中
			   typeof _uploadPath=='string' && _uploadPath.length) { // 2019.7 - 1080654 Eric, 確認設定無誤!
				var fileName = '';
				if (typeof _pageName=='string' && _pageName.length) {
					fileName = _pageName + '-' + theSSO.User.account + "_" + td + padLeft(t.getHours(), 2) + padLeft(t.getMinutes(), 2) + padLeft(t.getSeconds(), 2) + padLeft(t.getMilliseconds(), 3) + "_" + window.localStorage['Artifact'].substring(0, 8) + ".log";
				}
				else {
					fileName = theSSO.User.account + "_" + td + padLeft(t.getHours(), 2) + padLeft(t.getMinutes(), 2) + padLeft(t.getSeconds(), 2) + padLeft(t.getMilliseconds(), 3) + "_" + window.localStorage['Artifact'].substring(0, 8) + ".log";
				}
				//1080117	Joe		1080049		弱掃修正Hardcoded Absolute Path
				//1080430	Joe		1080049		已於RD-SSO設定，移除此行
				// var _uploadPath = theSSO.User.SystemSets.get("WORK_PATH");
				try {
					if(!_duringUpload) {
						_duringUpload = true;
						var wfio = new WebFileIO(SSO_CONFIG.getWSUrl("fileiows"), theSSO.User.account);
						//console.log(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " AlternativeLogger.upload(): preparing to upload " + window.localStorage['localLog'].length + "(Words)...");
						var data = _repo.snapshot();	// data是native string
						console.log(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " 準備" + reason + "LOG至 '" + _uploadPath + "\\" + fileName + "' (data.length=" + data.length + ")");
						wfio.upload(_uploadPath, fileName, WebFileIO.prototype.utf8.encode(data), {	// 但丟給WebFileIO上傳的資料必須是Binary,所以要先用utf8 encode過
							//1091026	Leslie	修正因Chrome升級至80版後關閉視窗於unload事件無法以同步呼叫WS之問題，增加判斷是否為「關閉分頁前上傳」，視窗關閉時，僅可用非同步叫用
							//async: false,	// ipad要用同步, 因為有可能success不會被叫用, 2016.9.6 登出前上傳有可能因權杖失效而上傳失敗, 須用同步
							async: bASync,
							success: function(fileName, filePath) {
								//alert("上傳LOG檔成功!");
								var t1 = new Date();
								console.log(padLeft(t1.getHours(),2) + ":" + padLeft(t1.getMinutes(),2) + ":" + padLeft(t1.getSeconds(),2) + " " + reason + "LOG至 '" + filePath + "\\" + fileName + "' 成功!");
								//var st = padLeft(t1.getHours(),2) + ":" + padLeft(t1.getMinutes(),2) + ":" + padLeft(t1.getSeconds(),2) + " " + reason + "LOG至 '" + filePath + "\\" + fileName + "' 成功!\r\n";
								//window.localStorage['logHistory'] = window.localStorage['logHistory'] + st;
								// 清除localStorage佔用容量
								//window.localStorage['localLog'] = "";
								_duringUpload = false;
							},
							error: function(errorText) {
								var t1 = new Date();
								console.error(padLeft(t1.getHours(),2) + ":" + padLeft(t1.getMinutes(),2) + ":" + padLeft(t1.getSeconds(),2) + " AlternativeLogger.upload(): 失敗! " + errorText);
								//writeLog(1, "AlternativeLogger.upload():" + reason + "LOG至 'C:\\TEMP\\LocalLog\\" + fileName + "' 失敗! " + errorText);
								alert("上傳LOG檔失敗!" + errorText);
								//var st = padLeft(t1.getHours(),2) + ":" + padLeft(t1.getMinutes(),2) + ":" + padLeft(t1.getSeconds(),2) + " " + reason + "LOG至 'C:\\TEMP\\LocalLog\\" + fileName + "' 失敗! " + errorText + "\r\n";
								//window.localStorage['logHistory'] = window.localStorage['logHistory'] + st;
								// 上傳失敗先dump到console
								//console.log(data);
								_duringUpload = false;
							}
						});
					}
					else {	// 2016.2.24 上傳中延後上傳
						var that = this;
						(function(rea) {
							setTimeout(function() {
								that.upload(rea);
							}, 5000);
						})(reason);
					}
				}
				catch(e) {
					alert(e.message);
					_duringUpload = false;
				}
			}
			else {
				console.warn(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " " + reason + "LOG功能在使用者未登入系統前無法工作! 忽略上傳");
				//_duringUpload = true;	// 2015.12.17 下面這行寫出LOG又會觸發自動upload, 所以要把flag設起來
				//writeLog(1, "AlternativeLogger.upload():" + reason + "LOG功能在使用者未登入系統前無法工作!");
				//_duringUpload = false;
			}
		}
		else {
			console.error(padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " " + reason + "LOG功能無環境可工作!");
			//_duringUpload = true;	// 2015.12.17 下面這行寫出LOG又會觸發自動upload, 所以要把flag設起來
			//writeLog(1, "AlternativeLogger.upload():" + reason + "LOG功能無環境可工作!");
			//alert("無法上傳LOG檔!");
			//var st = padLeft(t.getHours(),2) + ":" + padLeft(t.getMinutes(),2) + ":" + padLeft(t.getSeconds(),2) + " " + reason + "LOG功能無環境可工作!\r\n";
			//window.localStorage['logHistory'] = window.localStorage['logHistory'] + st;
			// 無上傳環境先dump到console
			//console.log(window.localStorage['localLog']);
			//_duringUpload = false;
		}
	};
	
	// 2019.7 - Eric, for 開啟/傳送效能log!
    this.clear = function() {
        _repo.clear();
	}
	
	//2020.03.06 - Leslie[1081088]	修改Log機制，開F12在console輸入AlternativeLogger.dump()即可列出目前已記錄的Log訊息
	this.dump = function() {
		let dumpMode = "console";
		if(arguments.length > 0 && typeof arguments[0] == "string")
			dumpMode = arguments[0];
		
		if(dumpMode == "console")
			_repo.dump();
		else if(dumpMode == "download"){
			let t = new Date();
			let td = padLeft(t.getYear()-11, 3) + padLeft(t.getMonth()+1, 2) + padLeft(t.getDate(), 2);
			//1140723	Leslie[1141011]	弱掃修正[Client DOM Stored XSS]
			// let fileName = theSSO.User.account + "_" + td + padLeft(t.getHours(), 2) + padLeft(t.getMinutes(), 2) + padLeft(t.getSeconds(), 2) + padLeft(t.getMilliseconds(), 3) + "_" + window.localStorage['Artifact'].substring(0, 8) + ".log";
			let fileName = theSSO.User.account + "_" + td + padLeft(t.getHours(), 2) + padLeft(t.getMinutes(), 2) + padLeft(t.getSeconds(), 2) + padLeft(t.getMilliseconds(), 3) + "_" + Util.genGUID().substr(1, 8) + ".log";
			let data = _repo.snapshot();
			let blob = new Blob([data], {type: "application/octet-stream"});
			if("msSaveBlob" in navigator)	// IE10/11專屬下載function
				navigator.msSaveBlob(blob, fileName);
			else {	// Chrome用A的click事件
				let url = URL.createObjectURL(blob);
				let link = document.createElement("a");
				link.href = url;
				link.download = fileName;
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		}
		return _repo.length() + "筆";
	}
	
	//1060817	Leslie	新增ExceptionLog功能，用於截取特定異常訊息，並上傳至Server端保留紀錄	--START--
	function writeExceptionLog(args, source){
		function msg(str) {
			if(typeof str === "string")
				return str;
			else if(typeof(str) == 'object') {
				try {
					return JSON.stringify(str);
				}
				catch(e) {
					console.error(e.message);
					return Object.prototype.toString.apply(str) + " - 無法使用JSON序列化:'" + e.message + "'";
				}
			}
			return Object.prototype.toString.apply(str);
		}
		
		if('Artifact' in window.localStorage && window.localStorage['Artifact'].length > 0) {	// 有效登入中
			var docInfo = "";
			if('theAOL' in window){
				var currFolio = theAOL.getCurrFolio();
				if( currFolio != false){
					docInfo = "，開啟中公文["+currFolio.getDocNo()+"]";
				}
			}
			var params = new SOAPClientParameters();
			params.add('argArtifact', localStorage.Artifact);
			params.add('argMsg', "使用者：[" +theSSO.User.account+ "]"+docInfo+"，異常訊息："+ msg(args) + "\t\t@" + source);
			console.error("使用者：[" +theSSO.User.account+ "]"+docInfo+"，異常訊息："+ msg(args) + "\t\t@" + source);
			
			SOAPClient.invokeJSON(SSO_CONFIG.getWSUrl("imgws"), 'WriteExceptionLog', params, false,null);	//一律寫至FileServer
		}
	}

	// 2019.7 
	this.setPageName = function(thePageName) {
		if (typeof thePageName=='string' && thePageName.length) {
			_pageName = thePageName;
		}
	}
	
	this.ExceptionLog = function(){
		var e = arguments[1];
		if(arguments.length < 2)
			e = new Error();
		if("stack" in e) {
			var k = e.stack.split("\n");
			if(k.length > 1) {	// 2016.1.28 Chrome與iPad的stack不同
				if(k[0] == "Error") {	// Chrome
					var c = k[2].lastIndexOf('/');
					if(c >= 0) {
						var src = k[2].substring(c+1).replace(')','');
						k = k.slice(2);
						k.unshift(arguments[0] + '\t' + src);
						writeExceptionLog(k.join("\r\n"), src);
					}
					else {
						var src = k[2];
						k = k.slice(2);
						k.unshift(arguments[0] + '\t' + src);
						writeExceptionLog(k.join("\r\n"), src);
					}
				}
				else {	// iPad
					var c = k[1].lastIndexOf('/');
					if(c >= 0) {
						var src = k[1].substring(c+1);
						k = k.slice(1);
						k.unshift(arguments[0] + '\t' + src);
						writeExceptionLog(k.join("\r\n"), src);
					}
					else {
						var src = k[1];
						k = k.slice(1);
						k.unshift(arguments[0] + '\t' + src);
						writeExceptionLog(k.join("\r\n"), src);
					}
				}
			}
			else
				writeExceptionLog(arguments[0], e.stack);
		}
		else	// 瀏覽器Error物件不支援call stack
			writeExceptionLog(arguments[0], null);
	};
	window.ExceptionLog = this.ExceptionLog;
	//1060817	Leslie	新增ExceptionLog功能，用於截取特定異常訊息，並上傳至Server端保留紀錄	--END--
	
	if(_logLevel == 0) {
		window.theLogger = console;	// 不記錄LOG檔則恢復console寫出訊息功能
		//window.theLogger.time = console.debug; // 2019.7  - Eric, added for performance test
	}
	else
		window.theLogger = this.exposed;
    
}();
