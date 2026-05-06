/*
DATE	SA		PRG		MGR_NO				DESC
1030709	David	Eric	1030408				新增程式
1051006 David   Zen     1050087             二代公文修改
1051019 Leslie  Kenny   1050087             二代公文修改
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

//1051006 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
	//var xObjectName = document.activeElement.id;
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
        case "btRcvDateS":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txRcvDateS, event.screenX, event.screenY);
            break;
        case "btRcvDateE":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all.txRcvDateE, event.screenX, event.screenY);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051006 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
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

    //1051006 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btPrint":
            if (jf_ConfirmPreview()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1051006 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            if (jf_ConfirmPreview()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1051006 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function jf_ConfirmPreview()
{
    if (document.all["txRcvDateS"].value == "" && document.all["txRcvDateE"].value == "")
    {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["收文日期(起)、(迄)不可皆為空白"])), "");
        //1051006 Zen 1050087 二代公文修改
        //document.all["txRcvDateS"].focus();
        $('#txRcvDateS').focus();
        return false;
    }

    if (!CheckCDATE("txRcvDateS", "收文日期(起)"))
        return false
    if (!CheckCDATE("txRcvDateE", "收文日期(迄)"))
        return false

    return true;
}

//檢核日期格式
function CheckCDATE(argObj, strMsg)
{
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
            if (strMsg)
                jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            //1051006 Zen 1050087 二代公文修改
            //document.all[argObj].focus();
            $('#' + argObj).focus();
            return false;
        }
    }
    return false;
}