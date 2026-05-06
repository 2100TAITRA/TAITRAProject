// RefAttachMgmt class
//   對應RefAttachMgmt.xml
//   2016.10.24	Leslie
// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
// 1111012 Leslie  1110865 補齊刪除附件實體檔功能
// 1120417 Leslie  1111005 新增紀錄顯示順序
// 1131227 Leslie  1130824 增修於公文儲存時，一律檢核參考附件檔案的可用性
// 1140422 Leslie  1140623 window.structuredClone() 產生物件副本
// 1141217 Leslie  1141162 配合附件格式檢核，一併修正儲存時對已刪除附件的行為

function RefAttachMgmt(readWrite){
	// private members
	var _readWrite = readWrite || false;	// 是否唯讀, 未傳入flag則預設唯讀
	var _model;							// 公文夾模型物件(FolioModel), 由Init傳入
	var _fileIOWS;						// WebFileIO網址, 由Init傳入
	var _dirPath;						// 公文夾子目錄路徑, 由Init傳入
	var _refAttMgmt = {};				// 參考附件管理物件
	var _refAttachs = new Array();		// 附件
	var _dirty = false;
	var _attPath;						// 由公文夾小目錄， 改成參考附件子目錄
	
	// private methods
	//1101101 Raymond 1100991 弱掃XSS修正
	function HtmlEncode(s) {
		var div = document.createElement('div');
		div.appendChild(document.createTextNode(s));
		return div.innerHTML;
	}
	function getElemText(xmlNode, tagName) {
		var nl = xmlNode.getElementsByTagName(tagName);
		if(nl != undefined && nl.length > 0) {
			if(nl[0].childNodes.length > 0)
				return nl[0].childNodes[0].nodeValue;
			return "";
		}
		return undefined;
	}
	
	function fnSetTextOfElement(objElement,textValue)
	{
		for(var i=0,maxIdx = objElement.length;i<maxIdx;i++){
			var u = objElement.get(i);
			if("text" in u)
				u.text = textValue;
			else
				u.textContent = textValue;
		}
		return objElement;	//把傳進來的物件再回傳出去，方便再接著呼叫其他JQuery功能
	}
	
	function _parseXML(xmlAttMgmg){
		_refAttMgmt.docNo = xmlAttMgmg.documentElement.getAttribute("docNo");
		_refAttMgmt.count = xmlAttMgmg.documentElement.getAttribute("count");
		
		for(var i=0; i<xmlAttMgmg.documentElement.childNodes.length; i++) {
			var n = xmlAttMgmg.documentElement.childNodes[i];
			if(n.nodeType == 1) {
				var addBy = {
					Id: getElemText(n,"Id"),
					Name: getElemText(n,"Name"),
					RoleId: getElemText(n,"RoleId"),
					RoleName: getElemText(n,"RoleName"),
					UnitId: getElemText(n,"UnitId"),
					UnitName: getElemText(n,"UnitName")
				};
				_refAttachs.push({
					_dps: n.getAttribute("dps"),// 1120417 Leslie[1111005] 新增紀錄顯示順序
					_sn: n.getAttribute("sn"),
					_addMsgId: n.getAttribute("addMsgId"),
					_delMsgId: n.getAttribute("delMsgId"),
					_delBy: n.getAttribute("delBy"),
					_isConAtt: (n.getAttribute("會辦附件")==="Y")?true:false,
					Filename: getElemText(n,"Filename"),
					Hash: getElemText(n,"Hash"),
					Title: getElemText(n,"Title"),
					NewTime: getElemText(n,"NewTime"),
					ADD_BY:addBy
				})
			}
		}
	}

	// public interface
	return {
		// public methods
		init: function(model, fileIOWS, dirPath) {	//初始化
			
			_model = model;
			_fileIOWS = fileIOWS;
			_dirPath = dirPath;
			_attPath = _dirPath.substring(0,_dirPath.lastIndexOf('\\')+1)+"_RefAtt";
			
			var dfd = $.Deferred();
			theLogger.log("下載參考附件管理檔'" + dirPath + "\\RefAttachMgmt.xml'...");
			var wfio = new WebFileIO(fileIOWS);
			wfio.download(dirPath, "RefAttachMgmt.xml", {
				success: function(fil,res){
					theLogger.log(fil);
					_parseXML(fil);
					theLogger.log("_refAttMgmt:");
					theLogger.log(_refAttMgmt);
					theLogger.log("_refAttachs:");
					theLogger.log(_refAttachs);
					
					//1071030	Leslie[1070856]	增加檢核附件是否仍健在
					let strWS = theAOL.docObj.fileIOWS;
					let errFile = [];
					for(var i=0;i<_refAttachs.length;i++){
						var nd = _refAttachs[i];
						if(!nd._delMsgId){
							let _attPath = _model.subDirPath + "\\_RefAtt\\"+nd.Filename;
							let params = new SOAPClientParameters();
							params.add('argFilePath', _attPath);
							
							SOAPClient.invokeJSON(strWS, 'CheckFileExist', params, false,function(rslt){
								if (typeof rslt === 'object') {
									if(!rslt.value){
										errFile.push(nd.Title);	//查無檔案，或路徑異常
									}
								}
								else {
									theLogger.log("CheckFileExist fail!")
								}
							});
						}
					}
					if(errFile.length > 0){
						var errMsg = "參考附件[" + errFile.join(',') + "]不存在";
						alert(errMsg+"，請退回原附件所有人，以檢查並重新加入該附件。");
						theLogger.error(errMsg);
					}
					//1071030	Leslie[1070856]	增加檢核附件是否仍健在	==END==
					
					dfd.resolve();
				},
				error: function(errorText){
					theLogger.log(errorText);
					if(errorText.match(/^02:/)) {
						dfd.resolve();
					}
					else
						dfd.reject(errorText);
				}
			})
			return dfd.promise();
		},
		save: function(argPath,options){
			if("ActiveXObject" in window) {
				var refAttMgmt = new ActiveXObject("MSXML2.DOMDocument");
				if(!refAttMgmt.loadXML("<REF_ATTACH_MGMT></REF_ATTACH_MGMT>")){
					var pe = doc.parseError;
					throw new Error(pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
				}
			}
			else
				var refAttMgmt = (new DOMParser()).parseFromString("<REF_ATTACH_MGMT></REF_ATTACH_MGMT>", "text/xml");
			function newElm(name, parent) {
				return $(refAttMgmt.createElement(name)).appendTo(parent);
			}
			var $root = $(refAttMgmt.documentElement)
							.attr("docNo", HtmlEncode(theAOL.docObj.docNo))	// 2016.12.2	Leslie	改由theAOL直接抓取文號	1101101 Raymond 1100991 修正弱掃Client Potential XSS
							.attr("count", HtmlEncode(_refAttMgmt.count));	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
			for(var i=0;i<_refAttachs.length;i++){
				var _tmpAttInfo = _refAttachs[i];
				
				//2016.12.21	Leslie	新增與刪除在同一流程裡時，該筆紀錄不應寫入管理檔(因為附件檔案可能不存在)
				if("_delMsgId" in _tmpAttInfo && _tmpAttInfo._addMsgId == _tmpAttInfo._delMsgId)	//2017.01.10	Leslie	Bug Fix
					continue;
				
				var $att = newElm("REF_ATTACH",$root)
								.attr("sn"		, HtmlEncode(_tmpAttInfo._sn))	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
								.attr("addMsgId", HtmlEncode(_tmpAttInfo._addMsgId));	// 1101101 Raymond 1100991 修正弱掃Client Potential XSS
				if("_delMsgId" in _tmpAttInfo)
					$att.attr("delMsgId",_tmpAttInfo._delMsgId).attr("delBy",_tmpAttInfo._delBy);
				// 1120417 Leslie[1111005] 新增紀錄顯示順序
				if(!_tmpAttInfo._delMsgId)
					$att.attr("dps"		, HtmlEncode(_tmpAttInfo._dps));
				if("_isConAtt" in _tmpAttInfo && _tmpAttInfo._isConAtt)
					$att.attr("會辦附件","Y");
				fnSetTextOfElement(newElm("Filename",$att),_tmpAttInfo.Filename);
				fnSetTextOfElement(newElm("Hash",$att),_tmpAttInfo.Hash);
				fnSetTextOfElement(newElm("Title",$att),_tmpAttInfo.Title);
				fnSetTextOfElement(newElm("NewTime",$att),_tmpAttInfo.NewTime);
				var $addBy = newElm("ADD_BY",$att);
				fnSetTextOfElement(newElm("Id",$addBy),_tmpAttInfo.ADD_BY.Id);
				fnSetTextOfElement(newElm("Name",$addBy),_tmpAttInfo.ADD_BY.Name);
				fnSetTextOfElement(newElm("RoleId",$addBy),_tmpAttInfo.ADD_BY.RoleId);
				fnSetTextOfElement(newElm("RoleName",$addBy),_tmpAttInfo.ADD_BY.RoleName);
				fnSetTextOfElement(newElm("UnitId",$addBy),_tmpAttInfo.ADD_BY.UnitId);
				fnSetTextOfElement(newElm("UnitName",$addBy),_tmpAttInfo.ADD_BY.UnitName);
				/*
				newElm("Filename",$att).text(_tmpAttInfo.Filename);
				newElm("Hash",$att).text(_tmpAttInfo.Hash);
				newElm("Title",$att).text(_tmpAttInfo.Title);
				newElm("NewTime",$att).text(_tmpAttInfo.NewTime);
				var $addBy = newElm("ADD_BY",$att);
				newElm("Id",$addBy).text(_tmpAttInfo.ADD_BY.Id);
				newElm("Name",$addBy).text(_tmpAttInfo.ADD_BY.Name);
				newElm("RoleId",$addBy).text(_tmpAttInfo.ADD_BY.RoleId);
				newElm("RoleName",$addBy).text(_tmpAttInfo.ADD_BY.RoleName);
				newElm("UnitId",$addBy).text(_tmpAttInfo.ADD_BY.UnitId);
				newElm("UnitName",$addBy).text(_tmpAttInfo.ADD_BY.UnitName);*/
			}
			if(options != undefined && $.isFunction(options.success))
				options.success(argPath, "RefAttachMgmt.xml", refAttMgmt);	//草稿可能會因為要號關係，而造成目錄不同，儲存前由外部傳入最終路徑
		},
		saveRefAtts: function(options){
			theLogger.debug("saveRefAtts()");
			if(!_readWrite){
				theLogger.error("唯讀模式不可執行儲存參考附件")
			}
			else if(options != undefined && $.isFunction(options.success)){
				for(var i=0;i<_refAttachs.length;i++){
					// 1141217 Leslie[1141162] 配合附件格式檢核，一併修正儲存時對已刪除附件的行為
					// if(_refAttachs[i].blbName && _refAttachs[i].blbName.match(/^blob:/))
					if(_refAttachs[i].blbName && _refAttachs[i].blbName.match(/^blob:/) && !("_delMsgId" in _refAttachs[i]))
						options.success(_attPath,_refAttachs[i].Filename,_refAttachs[i].blbName);	//儲存上傳附件
					//1111012	Leslie[1110865]	補齊刪除附件實體檔功能
					else if(_refAttachs[i].blbName == undefined && "_delMsgId" in _refAttachs[i] && _refAttachs[i]._delMsgId == theAOL.docObj.msgId)
						// 1131227 Leslie[1130824] 增修於公文儲存時，一律檢核參考附件檔案的可用性
						// options.success(_attPath,_refAttachs[i].Filename,'',true);	//刪除已存在的附件
						options.success(_attPath,_refAttachs[i].Filename,'',{remove:true});	//刪除已存在的附件
					// 1131227 Leslie[1130824] 增修於公文儲存時，一律檢核參考附件檔案的可用性
					// 1140407	Leslie[序60]	修正未檢核附件是否已刪除問題
					//else
					else if(!("_delMsgId" in _refAttachs[i]))
						options.success(_attPath,_refAttachs[i].Filename,'',{check:true});	//檢查附件是否存在
				}
			}
		},
		saveTmpAtts: function(argAttachs){
			if(!_readWrite){
			}
			else{
				_refAttachs = argAttachs;	//整個代換掉
				_refAttMgmt.count = this.getAttachFileCounts();
				_dirty = true;
			}
		},
		getAttachFileCounts: function(){
			var fileCnt = _refAttachs.length;
			for(var i=0;i<_refAttachs.length;i++)
				if("_delMsgId" in _refAttachs[i] && _refAttachs[i]._delMsgId)
					fileCnt--;
			return fileCnt;
		},
		accquireRefAttachsClone: function(){
			// 1140422 Leslie[1140623] window.structuredClone() 產生物件副本
			// return JSON.parse(JSON.stringify(_refAttachs));
			let _tmpRefAtt = window.structuredClone(_refAttachs);
			theLogger.log(JSON.stringify(_tmpRefAtt));
			return _tmpRefAtt;
		},
		isEnableWrite: function(){
			return _readWrite;
		},
		isRefAttachsDirty: function(){
			return _dirty;
		},
		setRefAttachsMgmtDirty: function(){	//2017.01.10	Leslie	提供公文要號後，強制重新儲存參考附件管理檔
			_dirty = true;
		},
		// 1111012	Leslie[1110865]	新增簽閱附件配套功能，以及擴充展開參考附件的配套函式
		getRefAttachNameInfo: function(idx){
			//1120419	Leslie[1111005]	調整順序後，一併調整頁籤可依調整順序顯示
			/*var fileCnt = _refAttachs.length;
			var currIdx = 0;
			for(var i=0;i<fileCnt;i++){
				if("_delMsgId" in _refAttachs[i] && _refAttachs[i]._delMsgId)
					continue;
				if(currIdx == idx)
					return {
						Title:_refAttachs[i].Title, 
						FileName: _refAttachs[i].Filename, 
						blbName: ((_refAttachs[i].blbName && _refAttachs[i].blbName.match(/^blob:/))?_refAttachs[i].blbName:_refAttachs[i].Filename),
						attPath: '\\_RefAtt\\'+_refAttachs[i].Filename,
					};
				currIdx++;
			}*/
			let tmpAtt = _refAttachs.filter(function(o){return !o._delMsgId;});
			tmpAtt.sort(function(o,n){return o._dps - n._dps;});	//由小到大排序
			if(tmpAtt.length > idx){
				return {
					Title:tmpAtt[idx].Title, 
					FileName: tmpAtt[idx].Filename, 
					blbName: ((tmpAtt[idx].blbName && tmpAtt[idx].blbName.match(/^blob:/))?tmpAtt[idx].blbName:tmpAtt[idx].Filename),
					attPath: '\\_RefAtt\\'+tmpAtt[idx].Filename,
			}
			}//1120419	Leslie[1111005]	調整順序後，一併調整頁籤可依調整順序顯示	==END==
			theLogger.error("找不到指定idx["+idx+"]的參考附件")
		},
		// 1131227 Leslie[1130824] 增修於公文儲存時，一律檢核參考附件檔案的可用性
		checkAllAttachExist: function(options){
			if(options != undefined && $.isFunction(options.success)){
				for(var i=0;i<_refAttachs.length;i++){
					// 1140407	Leslie[序60]	修正未檢核附件是否已刪除問題
					if(!("_delMsgId" in _refAttachs[i] && typeof _refAttachs[i]?._delMsgId === 'string'))
					options.success(_attPath,_refAttachs[i].Filename,'',{check:true});	//檢查附件是否存在
				}
			}
		}
	}
}

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-RefAttachMgmt.js").finish();
})();