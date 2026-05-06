// Module Manager
// 管理動態載入JS、CSS檔的模組
// 支援動態載入JS、CSS的子系統
// 使用include方法指名相對或絕對路徑URL的JS、CSS檔
// fileType有"js"、"css"兩種, 若不指定則URL字尾必須是".js"或".css"才會判定支援
// 1090117	Raymond	1090001	新增識別版號(?ver=5.X.X.X), 在動態載入Custom_XXX.js時自動加上, 以支援更新
// 1141003	Leslie	1141264 修正載入異常後的錯誤訊息處理

window.theModMgr = (function() {
	
	var State = {NOTSET: 0, LOADING: 1, PADDING: 2, LOADED: 3};
	var modules = [];
	var base;
	var version = "";	// 1090117 Raymond 1090001 新增版號
	
	function isLoaded(fileName) {
		for(var i=0; i<modules.length; i++) {
			if(modules[i].fileName == fileName)
				return modules[i].state == State.LOADED;
		}
		return false;
	}
	
	function loadModuleFile(m) {
		var t = new Date();
		console.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - 要求載入'" + m.fileName + "'...");
		var d = $.Deferred();
		var key = m.fileName.split("/");
		m.key = key[key.length - 1];
		// 搜尋已建檔之模組
		for(var i=0; i<modules.length; i++) {
			if(modules[i].key == m.key) {
				if(modules[i].state == State.LOADED) {
					console.log("\t已載入");
					// 1141003	Leslie[1141264]	 修正載入異常後的錯誤訊息處理
					// d.resolve("已載入");
					d.resolve(`[${m.key}]已載入`);
				}
				else if(modules[i].state == State.LOADING) {
					console.log("\tWarning: 載入中");
					// 1141003	Leslie[1141264]	 修正載入異常後的錯誤訊息處理
					// d.reject("載入中");
					d.reject(`[${m.key}]載入中`);
				}
				else if(modules[i].state == State.PADDING) {
					console.log("\tWarning: 初始化中");
					// 1141003	Leslie[1141264]	 修正載入異常後的錯誤訊息處理
					// d.reject("初始化中");
					d.reject(`[${m.key}]初始化中`);
				}
				else {
					console.log("\tError: 未知狀態");
					// 1141003	Leslie[1141264]	 修正載入異常後的錯誤訊息處理
					// d.reject("未知狀態");
					d.reject(`[${m.key}]未知狀態[${modules[i].state}]`);
				}
				return d;
			}
		}
		// 登錄模組
		modules.push($.extend({state: State.LOADING, dfd: d, t0: t}, m));
		if(m.fileType == "js") {
			var fileRef = document.createElement("script");
			fileRef.setAttribute("type", "text/javascript");
			// 1090117 Raymond 1090001 新增版號
			//fileRef.setAttribute("src", (base != undefined)?base+m.fileName:m.fileName);
			fileRef.setAttribute("src", (base != undefined)?base+m.fileName:m.fileName + ((version.length > 0)?"?ver=" + version:""));
		}
		else if(m.fileType == "css") {
			var fileRef = document.createElement("link");
			fileRef.setAttribute("rel", "stylesheet");
			fileRef.setAttribute("type", "text/css");
			// 1090117 Raymond 1090001 新增版號
			//fileRef.setAttribute("href", (base != undefined)?base+m.fileName:m.fileName);
			fileRef.setAttribute("href", (base != undefined)?base+m.fileName:m.fileName + ((version.length > 0)?"?ver=" + version:""));
		}
		else if(m.fileType == undefined) {	// 若沒指定模組類型, 則以副檔名判斷
			if(m.fileName.match(/.js$/i)) {
				var fileRef = document.createElement("script");
				fileRef.setAttribute("type", "text/javascript");
				// 1090117 Raymond 1090001 新增版號
				//fileRef.setAttribute("src", (base != undefined)?base+m.fileName:m.fileName);
				fileRef.setAttribute("src", (base != undefined)?base+m.fileName:m.fileName + ((version.length > 0)?"?ver=" + version:""));
			}
			else if(m.fileName.match(/.css$/i)) {
				var fileRef = document.createElement("link");
				fileRef.setAttribute("rel", "stylesheet");
				fileRef.setAttribute("type", "text/css");
				// 1090117 Raymond 1090001 新增版號
				//fileRef.setAttribute("href", (base != undefined)?base+m.fileName:m.fileName);
				fileRef.setAttribute("href", (base != undefined)?base+m.fileName:m.fileName + ((version.length > 0)?"?ver=" + version:""));
			}
			else {
				console.log("\tError: 未指定fileType, 亦無法從副檔名判斷");
				d.reject("未指定fileType, 亦無法從副檔名判斷");
			}
		}
		if (typeof fileRef != "undefined")
			document.getElementsByTagName("head")[0].appendChild(fileRef);
		return d.promise();
	}
	
	var detected = false;
	function detectLoadedModules() {
		var h = document.getElementsByTagName("head")[0];
		for(var i=0; i<h.childNodes.length; i++) {
			if(h.childNodes[i].nodeType == 1) {	// Element
				var nd = h.childNodes[i];
				console.log(nd.tagName);
				if(nd.tagName.match(/script/i)) {
					console.log("  src:" + nd.src);
					// TODO: 記錄已載入JS, 以免重複
					
					// 1090117 Raymond 1090001 載入時記下版號, 供RD-Custom.js動態載入其它JS時指定
					//if(nd.src.match(/ModuleMgr.js$/i)) {
					if(nd.src.match(/RD-ModuleMgr.js/i)) {
						//base = nd.getAttribute("data-base");
						//console.log("  base:" + base);
						var p = nd.src.indexOf("?ver=");
						if(p > 0) {
							version = nd.src.substr(p + 5);
							console.log("版號為'" + version + "'");
						}
					}
				}
				else if(nd.tagName.match(/link/i)) {
					console.log("  href:" + nd.href);
					// TODO: 記錄已載入CSS, 以免重複
				}
			}
		}
		detected = true;
	};
	$(function() {
		if(!detected)
			detectLoadedModules();
	});
	
	return {
		
		include: function(fileName, fileType) {
			var d = $.Deferred();
			if(!detected)
				detectLoadedModules();
			if(typeof fileName === "string") {
				if(isLoaded(fileName))
					d.resolve("已載入");
				else
					return loadModuleFile({fileName: fileName, fileType: fileType});
			}
			else if(Object.prototype.toString.call( fileName ) === '[object Array]') {
				var a = [];
				for(var i=0; i<fileName.length; i++) {
					if(typeof fileName[i] === "string")
						a.push(loadModuleFile({fileName: fileName[i]}));
					else
						a.push(loadModuleFile(fileName[i]));
				}
				// 2016.2.25 補檢核模組載入情況, 以免apply未等到所有模組回報載入完畢的情況
				var t = setTimeout(function() {
					console.log("補檢核模組載入情況...");
					var b = true;
					for(var i=0; i<modules.length; i++) {
						if(modules[i].state != State.LOADED) {
							console.log(modules[i].key + " 未載入完成(補檢)");
							b = false;
						}
					}
					if(b)
						d.resolve("皆載入成功(補檢)");
					else
						t = setTimeout(arguments.callee, 5000);	// retry
				}, 5000);
				$.when.apply(this, a).done(function() {
					if(t) {
						console.log("模組正常載入完畢, 中止延時補檢");
						clearTimeout(t);
					}
					d.resolve("皆載入成功");
				}).fail(function(errorText) {
					d.reject(errorText);
				});
			}
			return d.promise();
		},
		install: function(fileName) {
			var key = fileName.split("/");
			key = key[key.length - 1];
			for(var i=0; i<modules.length; i++) {
				if(modules[i].key == key) {
					var m = modules[i];
					if(m.state == State.LOADING)
						m.state = State.PADDING;
					break;
				}
			}
			if(m == undefined) {	// 模組不是經由include方法被子系統要求載入
				modules.push({fileName: fileName, state: State.PADDING, key: key});
				var m = modules[modules.length - 1];
			}
			return $.extend({
				finish: function() {
					if(m != undefined) {
						m.state = State.LOADED;
						var t = new Date();
						if(m.t0 != undefined)
							console.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - '" + m.fileName + "'初始化完成(" + (t - m.t0) + "ms)");
						else
							console.log(t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds() + " - '" + m.fileName + "'初始化完成");
						if(m.dfd != undefined)
							m.dfd.resolve("載入成功");
					}
				}
			}, m);
		},
		// 1090117 Raymond 1090001 新增版號
		version: version
	}
})();
