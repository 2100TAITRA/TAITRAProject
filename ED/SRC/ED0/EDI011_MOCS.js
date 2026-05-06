/*
DATE    SA		PRG		MGR_NO	        DESC
1120116	David   Joe	    1110883	        新增EDI011_MOCS 銓審整合發文檔案檢視作業
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

AjaxPro.Request.prototype.timeout = function () {
    try {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false) {
            this.abort();
        } else {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error) {

    }
    finally {

    }
}
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{

}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName)
    {

    }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

var _serverList = new ServerList();
var _lockedUrl = "";
var _lockedPath = "";

function ServerList() {
	var _list = document.all.H_ConvertURL.value.split('|');
	this.add = function (url) {
		_list.push(url);
	}
	this.get = function (idx) {
		return _list[idx];
	}
	this.suffle = function () {
		var mem = [];
		mem.length = _list.length;
		return {
			pick: function () {
				while (1) {
					var idx = Math.floor(Math.random() * _list.length);
					if (mem[idx]) {
						var alltry = true;
						for (var i = 0; i < mem.length; i++) {
							if (!mem[i]) {
								alltry = false;
								break;
							}
						}
						if (alltry)
							return null;
						continue;
					}
					else {
						mem[idx] = true;
						return _list[idx];
					}
				}
			}
		}
	}
}

function queryState(argDiFilePath, argSeqNo, argOrgName, argDocFileIO, argDiFilename) {
	Page_BlockSubmit = true;
	document.body.style.cursor = "wait";
	if (doQS()) {
		var rtn = ED0.EDI011_MOCS.OpenPdfProc(document.all.H_WorkPath.value, document.all.H_GUID.value, argDiFilePath, document.all.H_WORKSTURL.value
			, document.all.H_WORKSTPATH.value, argSeqNo, argOrgName, argDocFileIO, jf_GetArtifact(), document.all.USE_SSL.value, document.all.H_OrgNo.value
			, document.all.PrintXSLPath.value + "\\" + document.all.H_OrgNo.value + "\\", document.all.XSLMAP.value, argDiFilename).value;
		if (rtn[0] == "true") {
			window.open(rtn[1]);
		}
		else {
			alert(rtn[1]);
		}
	}
	document.body.style.cursor = "";
}

function doQS() {
	var suffle = _serverList.suffle();
	try {
		var params = {};
		var url = suffle.pick();
		if (url) {
			_url = url;
			var t0 = new Date();
			var params = new SOAPClientParameters();
			params.add('Url', url);
			var r = SOAPClient.invokeJSON(jf_Trim(document.all.H_EDWS.value), "QueryState", params, false, null)

			if (typeof r.value === "string" && r.value.length > 0) {
				var p = r.value.indexOf("|");
				if (p > 0) {
					var stat = r.value.substring(0, p);
					if (stat == "Idle") {
						_lockedUrl = url;
						_lockedPath = r.value.substring(p + 1);
						document.all.H_WORKSTURL.value = url;
						document.all.H_WORKSTPATH.value = r.value.substring(p + 1);
						return true;
					}
					else
						doQS();
				}
				else if (r.value == "Busy")
					doQS();
				else
					alert("回傳格式不正確:'" + r + "'");
			}
			else {
				if (r.Err != undefined) {
					alert("轉檔工作站[" + _url.split('/')[2] + "]目前無法正常工作，請連絡公文系統駐點人員或公文管理員處理。\n異常訊息：" + r.Err.ErrMsg);
				}
				else
					alert("所有轉檔工作站均忙碌中，請稍候數分鐘再重新開啟。");
				return false;
			}
		}
		else {
			alert("所有轉檔工作站均忙碌中，請稍候數分鐘再重新開啟。");
			return false;
		}
	}
	catch (e) {
		alert(e.message + " - " + e.sourceURL + ":" + e.line);
		return false;
	}
}

function DownloadZip(argDiFilePath, argDIFileName, argSWFileName, argDocFileIO, argOrgname) {
	var FileList = new Array();
	FileList.push(argDIFileName);
	FileList.push(argSWFileName);
	var strZipPath = ED0.EDI011_MOCS.DownLoadZipProc(document.all.H_WorkPath.value, argDiFilePath, FileList, argDocFileIO, argOrgname);
	if (strZipPath.value.substring(0, 4) == "ERR-")
		alert(strZipPath.value);
	else
		window.open(strZipPath.value + "&OpenType=download");
}