/*	
DATE	SA		PG		MGR_NO  DESC
1110320	Kevin	Joe	    1101526		新增EDR479_EXAM 核判公文統計表查詢作業
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
        case "btPreview":
            Page_BlockSubmit = !CheckBeforeSearch();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}


/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
}


/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforeSearch()
{

    if (document.all.txDateS.value + document.all.txDateE.value == "") {
        alert('結案日期不可皆為空');
        $('#txDateS').focus();
        return false;
    }
    else {
        if (document.all.txDateS.value != "" && document.all.txDateE.value == "")
            document.all.txDateE.value = document.all.txDateS.value;
        else if (document.all.txDateE.value != "" && document.all.txDateS.value == "")
            document.all.txDateS.value = document.all.txDateE.value;
        else if (document.all.txDateS.value > document.all.txDateE.value) {
            var Temp = document.all.txDateS.value;
            document.all.txDateS.value = document.all.txDateE.value;
            document.all.txDateE.value = Temp;
        }
    }

    return true;
}

function CheckDATE(argObj, argMsg)
{
    var strErrMsg = '';
    var strDate = document.all[argObj].value;
    if (strDate != "")
    {
        if (strDate.length < 7)
        {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate))
        {
            strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])) + '\n';
            jf_ShowMsg(strErrMsg, '');
            $('#' + argObj).focus();
        }
    }
    return strErrMsg;
}
