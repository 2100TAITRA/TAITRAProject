/*	--------------------------------------------------------------------
 * DATE			SA		PRG		MGR_NO	       DESC
 * 1130516		Cloud	Jason	1130200        新增本作業 
 * --------------------------------------------------------------------*/

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
function jf_ToolBarHandle(e)
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

    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            $('#txYearS').focus();
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_CheckBeforePreview(true);
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btExcel":
            Page_BlockSubmit = !jf_CheckBeforePreview(true);
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
    //webserver回傳後動作
    if (argResult.id == wsDuplicateID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
        }
        else
        {
        }
    }
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_CheckBeforePreview(outwardExcel)
{
    var strYearS = jf_Trim(document.all.txYearS.value);
    var strYearE = jf_Trim(document.all.txYearE.value);

    if (strYearS != "" || strYearE != "")
    {
        // 其中一方為空白則補上相同值
        if (strYearS == "") strYearS = strYearE;
        else if (strYearE == "") strYearE = strYearS;

        // 起始年>迄末年，起迄互調
        if (parseInt(strYearS, 10) > parseInt(strYearE, 10)) {
            var temp = strYearS;
            strYearS = strYearE;
            strYearE = temp;
        }

        document.all.txYearS.value = strYearS;
        document.all.txYearE.value = strYearE;
        //紀錄是否起迄超過五年
        var checkYearRange = true;
        if (parseInt(strYearE, 10) - parseInt(strYearS, 10) > 20)
            checkYearRange = false;

        if (outwardExcel && !checkYearRange)
        {
            alert("年份區間不可超過20年");
            return false;
        }
        return true;
    }
    else
    {
        alert("統計年份不可空白");
        $('#txYearS').focus();
        return false;
    }
}

function jf_CheckYear()
{
    var strYearS = jf_Trim(document.all.txYearS.value);
    var strYearE = jf_Trim(document.all.txYearE.value);
    // 補足為三碼
    if (strYearS != "" && strYearS.length < 3) strYearS = jf_PADL(strYearS, 3, "0");
    if (strYearE != "" && strYearE.length < 3) strYearE = jf_PADL(strYearE, 3, "0");
    document.all.txYearS.value = strYearS;
    document.all.txYearE.value = strYearE;
}
