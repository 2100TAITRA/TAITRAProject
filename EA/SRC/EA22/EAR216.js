/*
DATE	SA		PRG		MGR_NO			DESC
1091015	Cloud	Joe		1090560			新增程式
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
    {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id

    switch (xObjectName)
    {
    	case "btPreview":
    		if (CheckBeforeSearch()) //是否通過儲存前必要檢查
    		{
    			IsServerHandling = true;
    			jf_ShowWaitState();
    			Page_BlockSubmit = false;
    		}
    		else
    			Page_BlockSubmit = true;
    		jf_ToolBarSubmit(xObjectName);
    		break;
    }
}

//查詢前之欄位檢查
function CheckBeforeSearch()
{
    var bRtnbool = true;
    var strErrMsg = "";
    if (document.all.txDateS.value != "" || document.all.txDateE.value != "") {
    	if (document.all.txDateS.value == "")
    		document.all.txDateS.value = document.all.txDateE.value;
    	else if (document.all.txDateE.value == "")
    		document.all.txDateE.value = document.all.txDateS.value;
    	else if (document.all.txDateS.value > document.all.txDateE.value) {
    		var Temp = document.all.txDateS.value;
    		document.all.txDateS.value = document.all.txDateE.value;
    		document.all.txDateE.value = Temp;
    	}

    	strErrMsg = EA22.EAR216.CheckDateRange(document.all.txDateS.value, document.all.txDateE.value, document.all.H_OrgNo.value).value;
    }
    else
    	strErrMsg = "統計日期不可皆為為空白";



    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//檢查日期格式,回傳錯誤訊息
function CheckDate(argObj, argObjName) {
	var strDate = document.all[argObj].value;
	if (strDate != "") {
		document.all[argObj].value = jf_PADL(strDate, 7, '0');
		if (!jf_CheckCDATE(strDate)) {
			jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName + "格式不正確"])), "");
			$('#' + argObj).focus();
		}
	}
}