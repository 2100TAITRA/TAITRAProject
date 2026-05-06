/*
DATE 	SA		PRG		MGR_NO		DESC
1060428	David	Justin	1060232		新增EDR374 繕印人員工作量查詢作業
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
        case "btSearch":
        case "btPreview":
            Page_BlockSubmit = !jf_CheckBefor();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btExcel":
            Page_BlockSubmit = !jf_CheckBefor();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function jf_CheckBefor()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txIssueDateS"].value == "" && document.all["txIssueDateE"].value == "")
        strErrMsg += "發文日期(起、訖)不可皆為空白";
    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    else
    {
        CheckBeforeSearch(document.all["txIssueDateS"], document.all["txIssueDateE"]);
    }
    
    return bRtnbool;
}

function CheckBeforeSearch(argObjS, argObjE)
{
    var strS = argObjS.value;
    var strE = argObjE.value;

    if (strS == "" && strE != "")
        argObjS.value = strE;
    if (strE == "" && strS != "")
        argObjE.value = strS;

    if (strS != "" && strE != "" && strS > strE) {
        argObjS.value = strE;
        argObjE.value = strS;
    }
}

function CheckDate(argObj, argObjName) {
    if (argObj.value != "") {
        jf_PADCHAR(argObj, 7, '0');
        if (!jf_CheckCDATE(argObj.value)) {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName + "格式不正確"])), "");
            $('#' + argObj.id).focus();
            return false;
        }
    }
}
/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/