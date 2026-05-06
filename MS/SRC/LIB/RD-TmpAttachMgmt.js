// TmpAttachMgmt class
//   對應TmpAttachMgmt.xml
//   2022.10.11	Leslie[1110865]	新增「簽閱附件」管理檔
// 	 1120417 Leslie  1111005 新增紀錄顯示順序

function TmpAttachMgmt(readWrite){
	// private members
	var _readWrite = readWrite || false;	// 是否唯讀, 未傳入flag則預設唯讀
	var _model;							// 公文夾模型物件(FolioModel), 由Init傳入
	var _fileIOWS;						// WebFileIO網址, 由Init傳入
	var _dirPath;						// 公文夾子目錄路徑, 由Init傳入
	var _tmpAttMgmt = {};				// 簽閱附件管理物件
	var _tmpAttachs = new Array();		// 附件
	var _dirty = false;
	var _attPath;						// 由公文夾小目錄， 改成簽閱附件子目錄
	
	// private methods
	//弱掃XSS修正
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
		_tmpAttMgmt.docNo = xmlAttMgmg.documentElement.getAttribute("docNo");
		_tmpAttMgmt.count = xmlAttMgmg.documentElement.getAttribute("count");
		
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
				_tmpAttachs.push({
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
			_attPath = _dirPath.substring(0,_dirPath.lastIndexOf('\\')+1)+"_TmpAtt";
			
			var dfd = $.Deferred();
			theLogger.log("下載簽閱附件管理檔'" + dirPath + "\\TmpAttachMgmt.xml'...");
			var wfio = new WebFileIO(fileIOWS);
			wfio.download(dirPath, "TmpAttachMgmt.xml", {
				success: function(fil,res){
					theLogger.log(fil);
					_parseXML(fil);
					theLogger.log("_tmpAttMgmt:");
					theLogger.log(_tmpAttMgmt);
					theLogger.log("_tmpAttachs:");
					theLogger.log(_tmpAttachs);
					
					//增加檢核附件是否仍健在
					let strWS = theAOL.docObj.fileIOWS;
					let errFile = [];
					for(var i=0;i<_tmpAttachs.length;i++){
						var nd = _tmpAttachs[i];
						if(!nd._delMsgId){
							let _attPath = _model.subDirPath + "\\_TmpAtt\\"+nd.Filename;
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
						var errMsg = "簽閱附件[" + errFile.join(',') + "]不存在";
						alert(errMsg+"，請退回原附件所有人，以檢查並重新加入該附件。");
						theLogger.error(errMsg);
					}
					
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
				var tmpAttMgmt = new ActiveXObject("MSXML2.DOMDocument");
				if(!tmpAttMgmt.loadXML("<TMP_ATTACH_MGMT></TMP_ATTACH_MGMT>")){
					var pe = doc.parseError;
					throw new Error(pe.reason + " - line:" + pe.line + ", linepos:" + pe.linepos);
				}
			}
			else
				var tmpAttMgmt = (new DOMParser()).parseFromString("<TMP_ATTACH_MGMT></TMP_ATTACH_MGMT>", "text/xml");
			function newElm(name, parent) {
				return $(tmpAttMgmt.createElement(name)).appendTo(parent);
			}
			var $root = $(tmpAttMgmt.documentElement)
							.attr("docNo", HtmlEncode(theAOL.docObj.docNo))	
							.attr("count", HtmlEncode(_tmpAttMgmt.count));
			for(var i=0;i<_tmpAttachs.length;i++){
				var _tmpAttInfo = _tmpAttachs[i];
				
				if("_delMsgId" in _tmpAttInfo && _tmpAttInfo._addMsgId == _tmpAttInfo._delMsgId)
					continue;
				
				var $att = newElm("TMP_ATTACH",$root)
								.attr("sn"		, HtmlEncode(_tmpAttInfo._sn))
								.attr("addMsgId", HtmlEncode(_tmpAttInfo._addMsgId));
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
			}
			if(options != undefined && $.isFunction(options.success))
				options.success(argPath, "TmpAttachMgmt.xml", tmpAttMgmt);	//草稿可能會因為要號關係，而造成目錄不同，儲存前由外部傳入最終路徑
		},
		saveTmpAtts: function(options){
			theLogger.debug("saveTmpAtts()");
			if(!_readWrite){
				theLogger.error("唯讀模式不可執行儲存簽閱附件")
			}
			else if(options != undefined && $.isFunction(options.success)){
				for(var i=0;i<_tmpAttachs.length;i++){
					if(_tmpAttachs[i].blbName && _tmpAttachs[i].blbName.match(/^blob:/))
						options.success(_attPath,_tmpAttachs[i].Filename,_tmpAttachs[i].blbName);	//儲存上傳附件
					//之前已上傳，在本流程被刪除的，要刪除附件檔案
					else if(_tmpAttachs[i].blbName == undefined && "_delMsgId" in _tmpAttachs[i] && _tmpAttachs[i]._delMsgId == theAOL.docObj.msgId)
						options.success(_attPath,_tmpAttachs[i].Filename,'',true);	//刪除已存在的附件
				}
			}
		},
		saveTempTmpAtts: function(argAttachs){
			if(!_readWrite){
			}
			else{
				_tmpAttachs = argAttachs;	//整個代換掉
				_tmpAttMgmt.count = this.getAttachFileCounts();
				_dirty = true;
			}
		},
		getAttachFileCounts: function(){
			var fileCnt = _tmpAttachs.length;
			for(var i=0;i<_tmpAttachs.length;i++)
				if("_delMsgId" in _tmpAttachs[i] && _tmpAttachs[i]._delMsgId)
					fileCnt--;
			return fileCnt;
		},
		accquireTmpAttachsClone: function(){
			return JSON.parse(JSON.stringify(_tmpAttachs));
		},
		isEnableWrite: function(){
			return _readWrite;
		},
		isTmpAttachsDirty: function(){
			return _dirty;
		},
		setTmpAttachsMgmtDirty: function(){
			_dirty = true;
		},
		getTmpAttachNameInfo: function(idx){
			//1120419	Leslie[1111005]	調整順序後，一併調整頁籤可依調整順序顯示
			/*var fileCnt = _tmpAttachs.length;
			var currIdx = 0;
			for(var i=0;i<fileCnt;i++){
				if("_delMsgId" in _tmpAttachs[i] && _tmpAttachs[i]._delMsgId)
					continue;
				if(currIdx == idx)
					return {
						Title:_tmpAttachs[i].Title, 
						FileName: _tmpAttachs[i].Filename, 
						blbName: ((_tmpAttachs[i].blbName && _tmpAttachs[i].blbName.match(/^blob:/))?_tmpAttachs[i].blbName:_tmpAttachs[i].Filename),
						attPath: '\\_TmpAtt\\'+_tmpAttachs[i].Filename,
					};
				currIdx++;
			}*/
			let tmpAtt = _tmpAttachs.filter(function(o){return !o._delMsgId;});
			tmpAtt.sort(function(o,n){return o._dps - n._dps;});	//由小到大排序
			if(tmpAtt.length > idx){
				return {
					Title:tmpAtt[idx].Title, 
					FileName: tmpAtt[idx].Filename, 
					blbName: ((tmpAtt[idx].blbName && tmpAtt[idx].blbName.match(/^blob:/))?tmpAtt[idx].blbName:tmpAtt[idx].Filename),
					attPath: '\\_TmpAtt\\'+tmpAtt[idx].Filename,
			}
			}//1120419	Leslie[1111005]	調整順序後，一併調整頁籤可依調整順序顯示	==END==
			theLogger.error("找不到指定idx["+idx+"]的簽閱附件")
		}
	}
}

(function() {
	if(window.theModMgr != undefined)
		window.theModMgr.install("RD-TmpAttachMgmt.js").finish();
})();