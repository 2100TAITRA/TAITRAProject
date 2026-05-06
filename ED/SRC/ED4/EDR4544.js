/*	
DATE	SA		PG		MGR_NO  	DESC
1110320	Kevin	Joe	    1101526		新增EDR4544 線上簽核比率表列印作業
1131129	Joe		Joe		1130842		取消查詢範圍限制
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

    if (document.all.rbMonth.checked == true) {
        if (document.all.txMonthS.value + document.all.txMonthE.value == "") {
            alert('統計日期不可皆為空');
            $('#txMonthS').focus();
            return false;
        }
        else {
            if (document.all.txMonthS.value != "" && document.all.txMonthE.value == "")
                document.all.txMonthE.value = document.all.txMonthS.value;
            else if (document.all.txMonthE.value != "" && document.all.txMonthS.value == "")
                document.all.txMonthS.value = document.all.txMonthE.value;
            else if (document.all.txMonthS.value > document.all.txMonthE.value) {
                var Temp = document.all.txMonthS.value;
                document.all.txMonthS.value = document.all.txMonthE.value;
                document.all.txMonthE.value = Temp;
            }
        }

		//1131129	Joe		1130842		取消查詢範圍限制
		/*
        var strCheckDate = ED4.EDR4544.DateCheck(document.all.txMonthS.value, document.all.txMonthE.value).value;
        if (strCheckDate != "") {
            alert(strCheckDate);
            $('#txMonthS').focus();
            return false;
        }
		*/
    }
    else if (document.all.rbYear.checked == true) {
        if (document.all.txYear.value == "") {
            alert('統計日期不可皆為空');
            $('#txYear').focus();
            return false;
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
