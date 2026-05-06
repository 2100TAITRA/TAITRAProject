/*
DATE    SA		PRG		MGR_NO	        DESC
1060713	Cloud   Zen	    1060387	        新增EAR708 密件檔案分存單列印作業
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
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
            Page_BlockSubmit = !jf_CheckKeyObject();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            $('#txDocNo').focus();
            break;
        case "btPreview":
            Page_BlockSubmit = !CheckTextarea();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/

function CheckTextarea()
{
    if (document.all["txRemarks"].value.length > 300)
    {
        alert("備註最多僅能輸入300字");
        $('txRemarks').focus();
        return false;
    }
    return true;
}