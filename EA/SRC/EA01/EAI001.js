/*
DATE    SA		PRG		MGR_NO	        DESC
1051122	Cloud   Zen	    1050993	        新增EAI001 公文所屬批號查詢作業
1120321 Cloud   Cloud   1120211         升級二代
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;
//1120321 Cloud     1120211         升級二代
/*if (document.all.tbTool)
    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;*/

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl()
{
    var xObjectName = document.activeElement.id;

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
        /*
		case "":
			break;
		*/
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1120321 Cloud     1120211         升級二代
//function jf_ToolBarHandle()
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
    //1120321 Cloud     1120211         升級二代
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            //類別代碼左邊補0
            Page_BlockSubmit = !jf_CheckBeforSearch();
            //1120321 Cloud     1120211         升級二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            document.all["txYearS"].focus();
            break;
    }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_txYear_Onblur(argId)
{
    var txObj = jf_Trim(document.all[argId].value);
    if (txObj != '' && txObj.length < 3)
        document.all[argId].value = jf_PADL(txObj, 3, "0");
}

//查詢前之欄位檢查
function jf_CheckBeforSearch()
{
    var bRtnbool = true;
    var strErrMsg = "";

    var strYearS = document.all.txYearS.value;
    var strYearE = document.all.txYearE.value;
    var strDocNo = document.all.txDocNo.value;

    if (strYearS + strYearE + strDocNo == '')
        strErrMsg = '制定年度、公文文號不可皆為空';
    else if (strYearS == '')
        document.all.txYearS.value = strYearE;
    else if (strYearE == '')
        document.all.txYearE.value = strYearS;
    else if (strYearS.localeCompare(strYearE) == 1)
    {
        document.all.txYearS.value = strYearE;
        document.all.txYearE.value = strYearS;
    }

    if (strErrMsg != "")
    {
        bRtnbool = false;
        document.all["txYearS"].focus();
        alert(strErrMsg);
    }

    return bRtnbool;
}