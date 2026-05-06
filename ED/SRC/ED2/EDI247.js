/*
DATE    SA      PRG     MGR_NO		DESC
1090507 Cloud   Kevin_C	1080752     MERGE[1070589]新增EDI247至共通版
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

    switch (xObjectName)
    {

    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(e)
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

    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            Page_BlockSubmit = !(jf_CheckKeyObject() && CheckBeforeSearch());
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeSearch()
{
    var strErrMsg = '';
    var strTXDateS = document.all['txTXDateS'].value;
    var strTXDateE = document.all['txTXDateE'].value;

    if (strTXDateS == '' && strTXDateE != '')
        document.all['txTXDateS'].value = strTXDateE;
    else if (strTXDateS != '' && strTXDateE == '')
        document.all['txTXDateE'].value = strTXDateS;
    else if (Number(strTXDateS) > (Number(strTXDateE)))
    {
        document.all['txTXDateS'].value = strTXDateE;
        document.all['txTXDateE'].value = strTXDateS;
    }

    strErrMsg += CheckDate('txTXDateS', '傳送日期(起)', true);
    strErrMsg += CheckDate('txTXDateE', '傳送日期(訖)', true);

    if (strErrMsg != '')
    {
        alert(strErrMsg);
        return false;
    }

    return true;
}

function CheckDate(argObj, argMsg, argFromTbtool)
{
    var strErrMsg = '';
    var strDate = document.all[argObj].value;
    if (strDate != "")
    {
        if (strDate.length < 7)
        {
            strDate = jf_PADL(strDate, 7, '0');//YYYMMDD
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate))
        {
            strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])) + '\n';
            if (argFromTbtool == false)
                jf_ShowMsg(strErrMsg, '');
        }
    }
    return strErrMsg;
}