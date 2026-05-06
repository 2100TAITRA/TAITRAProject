/*
DATE	SA		PRG		MGR_NO			DESC
1110224	Kevin	Zen     1101488         新增EDR149 電子收文統計列印作業
*/

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

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null)
    {
        btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
    }

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

    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btPreview":
        case "btExcel":
            Page_BlockSubmit = !CheckBeforeSearch();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            $('#txRcvDateS').focus();
    }
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeSearch()
{
    //strRcvDateS : 暫存起值
    //strRcvDateE : 暫存迄值
    // txRcvDateS : 物件起值
    // txRcvDateE : 物件迄值

    var strErrMsg = '';
    var strRcvDateS = $('#txRcvDateS').val();
    var strRcvDateE = $('#txRcvDateE').val();
    var strFromDateS = $('#txFromDateS').val();
    var strFromDateE = $('#txFromDateE').val();
    var strDocNoS = $('#txDocNoS').val();
    var strDocNoE = $('#txDocNoE').val();

    if (strRcvDateS == '' && strRcvDateE != '')
        $('#txRcvDateS').val(strRcvDateE);
    else if (strRcvDateS != '' && strRcvDateE == '')
        $('#txRcvDateE').val(strRcvDateS);
    else if (Number(strRcvDateS) > (Number(strRcvDateE)))
    {
        $('#txRcvDateS').val(strRcvDateE);
        $('#txRcvDateE').val(strRcvDateS);
    }

    if (strFromDateS == '' && strFromDateE != '')
        $('#txFromDateS').val(strFromDateE);
    else if (strFromDateS != '' && strFromDateE == '')
        $('#txFromDateE').val(strFromDateS);
    else if (Number(strFromDateS) > (Number(strFromDateE)))
    {
        $('#txFromDateS').val(strFromDateE);
        $('#txFromDateE').val(strFromDateS);
    }

    if (strDocNoS == '' && strDocNoE != '')
        $('#txDocNoS').val(strDocNoE);
    else if (strDocNoS != '' && strDocNoE == '')
        $('#txDocNoE').val(strDocNoS);
    else if (Number(strDocNoS) > (Number(strDocNoE)))
    {
        $('#txDocNoS').val(strDocNoE);
        $('#txDocNoE').val(strDocNoS);
    }

    if (strRcvDateS + strRcvDateE + strFromDateS + strFromDateE + strDocNoS + strDocNoE == '')
        strErrMsg += '公文文號、日期不可皆為空';

    strErrMsg += CheckDate('txRcvDateS', '收文模組接收日期(起)', true);
    strErrMsg += CheckDate('txRcvDateE', '收文模組接收日期(訖)', true);
    strErrMsg += CheckDate('txFromDateS', '來文日期(起)', true);
    strErrMsg += CheckDate('txFromDateE', '來文日期(訖)', true);

    if (strErrMsg != '')
    {
        alert(strErrMsg);
        return false;
    }

    return true;
}

function CheckDate(argObj, argMsg, argFromTbtool, argLength)
{
    var strErrMsg = '';
    var strDate = $('#' + argObj).val();
    if (strDate != '')
    {
        if (strDate.length < argLength)
        {
            strDate = jf_PADL(strDate, argLength, '0');//YYYMMDD
            $('#' + argObj).val(strDate);
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