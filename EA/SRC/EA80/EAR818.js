/*
DATE		SA		PRG		    MGR_NO			DESC
1090930     Cloud   Zen		    1090562         新增EAR818 調案運用類型統計作業
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

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
            Page_BlockSubmit = true;
            if (CheckBeforeSearch())
            {
                Page_BlockSubmit = false;
                jf_ToolBarSubmit(xObjectName);
            }

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
    var strDateS = $('#txBorDateS').val();
    var strDateE = $('#txBorDateE').val();

    if (strDateS + strDateE == '')
        strErrMsg += '統計日期不可為空';

    if (strDateS == '' && strDateE != '')
        $('#txBorDateS').val(strDateE);
    else if (strDateS != '' && strDateE == '')
        $('#txBorDateE').val(strDateS);
    else if (Number(strDateS) > (Number(strDateE)))
    {
        $('#txBorDateS').val(strDateE);
        $('#txBorDateE').val(strDateS);
    }

    strErrMsg += CheckDate('txBorDateS', '統計日期(起)', true, 7);
    strErrMsg += CheckDate('txBorDateE', '統計日期(訖)', true, 7);

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
            strDate = jf_PADL(strDate, argLength, '0');
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