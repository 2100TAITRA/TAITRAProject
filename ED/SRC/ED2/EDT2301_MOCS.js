/*
DATE    SA		PRG		MGR_NO	        DESC
1111202	Kevin   Kevin   1110835	        新增EDT2301_MOCS人民陳情案件維護作業
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
        case "btOpen":
            Page_BlockSubmit = !CheckBeforeOpen();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            Page_BlockSubmit = !CheckBeforeSave();
            jf_ToolBarSubmit(xObjectName);
    }
}

function CheckBeforeOpen() {
    var strErrMsg = '';
    var strDocNo = document.all['txDocNo'].value;

    if (strDocNo == "")
        strErrMsg = '公文文號不為空白';

    if (strErrMsg != '') {
        alert(strErrMsg);
        return false;
    }

    return true;
}

function CheckBeforeSave()
{
    return true;
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/