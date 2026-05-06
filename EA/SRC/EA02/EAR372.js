/*
DATE    SA		PRG		MGR_NO	        DESC
1111207	Zen     Zen     1110894         新增EAR372 檔案移交清冊列印作業
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
        case "btSelectAll":
            jf_SelectAll('dg1', '_cbSelect')
            break;
        case "btSelectInverse":
            jf_SelectInverse('dg1', '_cbSelect')
            break;
        case "btSelectClear":
            jf_SelectClear('dg1', '_cbSelect')
            break;

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
        case "btStatistic":
            Page_BlockSubmit = true;
            Page_BlockSubmit = !CheckBeforeSearch(xObjectName);
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CheckBeforeSearch(argObjectName)
{
    let strErrMsg = '';
    let strConCalcVerNoList = '';
    let bIsSelect = false;

    for (var i = 2; i < document.all['dg1'].rows.length + 1; i++)
    {
        if (document.all['dg1__ctl' + i + '_cbSelect'].checked)
        {
            if (document.all['dg1__ctl' + i + '_lbCalcDate'].textContent == '')
                strConCalcVerNoList += document.all['dg1__ctl' + i + '_lbVerNo'].textContent + '、';

            bIsSelect = true;
        }
    }

    if (!bIsSelect)
        strErrMsg += '至少需選取一個版本號。\n';

    if (strConCalcVerNoList != '' && argObjectName == 'btExcel')
        strErrMsg += strConCalcVerNoList.slice(0, -1) + '版本號尚未經過統計，請統計後再執行。\n';

    if (strErrMsg != '')
    {
        alert(strErrMsg);
        return false;
    }

    return true;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
*
*****************************************************************************/
