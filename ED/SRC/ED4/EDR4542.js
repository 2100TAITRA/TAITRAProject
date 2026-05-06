/*	
DATE	SA		PG		MGR_NO  DESC
1020902	--		Cloud	        修正下拉選單有選擇東西後按下查詢會異常的錯誤
1110412 Kevin	Kevin	--		修正考試院開啟程式
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
        case "btStatic":  //執行統計
			//1110412 Kevin 修正考試院開啟程式
            //var xUrl = "../../../ODDEP/ODP420.aspx?nMode=EXEC&SAMLart=" + document.all.H_Artifact.value;
			var xUrl = "../../../ODDEP/ODP420_EXAM.aspx?nMode=EXEC&SAMLart=" + document.all.H_Artifact.value;
            jf_OpenChildWin(xUrl, "ODP420", 760, 500);
            Page_BlockSubmit = true;
            break;
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
    var strErrMsg = '';
    var bRtn = true;

    if (document.all.txYearmonth.value == '') {
        strErrMsg += '日期欄位不可皆為空';
        $('#txYearmonth').focus();
    }
    else if (document.all.txYearmonth.value > document.all.hMaxMonth.value) {
        strErrMsg += '列印月份不可大於目前統計最大月份';
        $('#txYearmonth').focus();
    }

    if (strErrMsg != '')
    {
        alert(strErrMsg);
        bRtn = false;
    }

    return bRtn;
}

function CheckDATE(argObj, argMsg)
{    var strErrMsg = '';
    var strDate = document.all[argObj].value;
    if (strDate != "")
    {
        if (strDate.length < 5)
        {
            strDate = jf_PADL(strDate, 5, '0');
            document.all[argObj].value = strDate;
        }
        strDate = strDate + '01';
        if (!jf_CheckCDATE(strDate))
        {
            strErrMsg += FormatStr(jf_GetErrMsg(InFormatErr2), new Array([argMsg])) + '\n';
            jf_ShowMsg(strErrMsg, '');
            $('#' + argObj).focus();
        }
    }
    return strErrMsg;
}
