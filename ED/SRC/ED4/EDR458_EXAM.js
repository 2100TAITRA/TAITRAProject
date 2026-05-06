/*	
DATE	SA		PG		MGR_NO  DESC
1110328	Kevin	Joe	    1101573	新增EDR458_EXAM 單位辦理公文統計列印作業
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
        case "btExcel":
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
            $('#txMonthE').focus();
            return false;
        }
        else if (document.all.txMonthE.value != "" && document.all.txMonthE.value > document.all.hMaxMonth.value) {
            alert('統計日期不可超過最大統計年月');
            $('#txMonthE').focus();
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
    }
    else if (document.all.rbYear.checked == true) {
        if (document.all.txYearS.value + document.all.txYearE.value == "") {
            alert('統計日期不可皆為空');
            $('#txYearS').focus();
            return false;
        }
        else if ((document.all.txYearS.value != "" && document.all.txYearS.value > document.all.hMaxMonth.value.substring(0, 3)) || (document.all.txYearE.value != "" && document.all.txYearE.value > document.all.hMaxMonth.value.substring(0, 3)))
        {
            alert('統計日期不可超過最大統計年月');
            $('#txYearS').focus();
            return false;
        }
        else {
            if (document.all.txYearS.value != "" && document.all.txYearE.value == "")
                document.all.txYearE.value = document.all.txYearS.value;
            else if (document.all.txYearE.value != "" && document.all.txYearS.value == "")
                document.all.txYearS.value = document.all.txYearE.value;
            else if (document.all.txYearS.value > document.all.txYearE.value) {
                var Temp = document.all.txYearS.value;
                document.all.txYearS.value = document.all.txYearE.value;
                document.all.txYearE.value = Temp;
            }
        }
    }

    return true;
}

function CheckDATE(argObj, argMsg)
{
    var strErrMsg = '';
    document.all["txMonthS"].value = "";
    var strDate = document.all[argObj].value;
    if (strDate != "") {
        if (strDate.length < 5) {
            strDate = jf_PADL(strDate, 5, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate + "01")) {
            strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])) + '\n';
            jf_ShowMsg(strErrMsg, '');
            $('#' + argObj).focus();
        }
        else {
            document.all["txMonthS"].value = strDate.substr(0, 3) + '01';
        }
    }
    return strErrMsg;
}
