/*
DATE 	SA		PRG		MGR_NO		DESC
1061109	Kevin	Justin	1060881		新增EDR145 衛生福利部移文清單查詢作業
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
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            break;
    }
}

function jf_CheckBefor()
{
    var bRtnbool = true;
    var strErrMsg = "";

    CheckBeforeSearch(document.all["txDocNoS"], document.all["txDocNoE"]);
    CheckBeforeSearch(document.all["txRcvNoS"], document.all["txRcvNoE"]);
    CheckBeforeSearch(document.all["txDateS"], document.all["txDateE"]);

    if (document.all["txDocNoS"].value == "" && document.all["txRcvNoS"].value == "" && document.all["txDateS"].value == "" && document.all["txRcvDateS"].value == "")
    {
    	strErrMsg += "公文文號、部收文號、部收日期、署收日期需至少輸入一條件。";
    }

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
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