/*
DATE	SA		PRG		MGR_NO		DESC
1091015	Cloud	Joe		1090623		新增程式
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

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
    	case "btSelectAll":
    		Page_BlockSubmit = true;
    		jf_SelectAll("dg1", "_cbEntry");
    		break;
    	case "btSelectInverse":
    		Page_BlockSubmit = true;
    		jf_SelectInverse("dg1", "_cbEntry");
    		break;
    	case "btSelectClear":
    		Page_BlockSubmit = true;
    		jf_SelectClear("dg1", "_cbEntry");
    		break;
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
    	case "btSearch":
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
		case "btSave":
			if (!CheckBeforeSave()) //是否通過儲存前必要檢查
			{
				if (!window.confirm('請確認勾選公文皆已入卷，註記後將移除該公文。點擊[確定]繼續/點擊[取消]停止'))
				{
					Page_BlockSubmit = true;
					return;
				}
				IsServerHandling = true;
				jf_ShowWaitState();
				Page_BlockSubmit = false;
			}
			else
				Page_BlockSubmit = true;
			jf_ToolBarSubmit(xObjectName);
			break;
    	case "btClean":
    		Page_BlockSubmit = true;
    		jf_ConfirmClean(true);
    		document.all.rbFileCaseA.checked = true;
    		$('#txRetDateS').focus();
    		break;
    }
}

//查詢前之欄位檢查
function CheckBeforeSearch()
{
    var bRtnbool = true;
    var strErrMsg = "";
    if (document.all.txRetDateS.value != "" || document.all.txRetDateE.value != "") {
    	if (document.all.txRetDateS.value == "")
    		document.all.txRetDateS.value = document.all.txRetDateE.value;
    	else if (document.all.txRetDateE.value == "")
    		document.all.txRetDateE.value = document.all.txRetDateS.value;
    	else if (document.all.txRetDateS.value > document.all.txRetDateE.value) {
    		var Temp = document.all.txRetDateS.value;
    		document.all.txRetDateS.value = document.all.txRetDateE.value;
    		document.all.txRetDateE.value = Temp;
    	}
    }
    else
    	strErrMsg = "歸還日期不可皆為為空白";

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

function CheckBeforeSave() {
	var bRtn = true;
	for (var iRow = 2; iRow < document.all["dg1"].rows.length+1; iRow++) {
		if (document.all["dg1__ctl" + iRow + "_cbEntry"].checked) {
			bRtn = false;
		}
	}

	if (bRtn) {
		alert('請至少勾選一筆資料')
	}
	return bRtn;
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//檢查日期格式
function CheckDate(argObj, argObjName)
{
	var strDate = document.all[argObj].value;
	if (strDate != "")
    {
		document.all[argObj].value = jf_PADL(strDate, 7, '0');
    	if (!jf_CheckCDATE(strDate))
    	{
    		jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName + "格式不正確"])), "");
			$('#' + argObj).focus();
        }
	}
}
