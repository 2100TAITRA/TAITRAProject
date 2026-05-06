/*
DATE	SA		PRG		MGR_NO			DESC
1120719	Kevin	Zen     1120069         新增EDR156 已刪除電子來文清單列印作業
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
        case "btSearch":
        case "btPreview":
        case "btExcel":
            Page_BlockSubmit = !CheckBeforeSearch();
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
    var strFromDateS = $('#txFromDateS').val();
    var strFromDateE = $('#txFromDateE').val();

    if (strFromDateS == '' && strFromDateE != '')
        $('#txFromDateS').val(strFromDateE);
    else if (strFromDateS != '' && strFromDateE == '')
        $('#txFromDateE').val(strFromDateS);
    else if (Number(strFromDateS) > (Number(strFromDateE)))
    {
        $('#txFromDateS').val(strFromDateE);
        $('#txFromDateE').val(strFromDateS);
    }

    var strDelDateS = $('#txDelDateS').val();
    var strDelDateE = $('#txDelDateE').val();

    if (strDelDateS == '' && strDelDateE != '')
        $('#txDelDateS').val(strDelDateE);
    else if (strDelDateS != '' && strDelDateE == '')
        $('#txDelDateE').val(strDelDateS);
    else if (Number(strDelDateS) > (Number(strDelDateE)))
    {
        $('#txDelDateS').val(strDelDateE);
        $('#txDelDateE').val(strDelDateS);
    }

    if (strFromDateS + strFromDateE + strDelDateS + strDelDateE == '')
        strErrMsg += '來文、刪除日期不可皆為空';

    strErrMsg += CheckDate('txFromDateS', '來文日期區間(起)', true);
    strErrMsg += CheckDate('txFromDateE', '來文日期區間(訖)', true);
    strErrMsg += CheckDate('txDelDateS', '刪除日期區間(起)', true);
    strErrMsg += CheckDate('txDelDateE', '刪除日期區間(訖)', true);

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