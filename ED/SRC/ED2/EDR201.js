/*
DATE 	    SA		PRG		MGR_NO      DESC
1051123     Daivd   Zen     1050087     二代公文修改
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

//指定DataGrid欄位
var strTableFields = new Array("_hlLink", "_lbRead1", "_lbRead2");

//1051123 Zen 1050087 二代公文修改//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

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
//1051123 Zen 1050087 二代公文修改//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051123 Zen 1050087 二代公文修改    //var xObjectName = document.activeElement.id;
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
//1051123 Zen 1050087 二代公文修改//function jf_ToolBarHandle()
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

    //1051123 Zen 1050087 二代公文修改    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1051123 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();
            //1051123 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1051123 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}


/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{

}
