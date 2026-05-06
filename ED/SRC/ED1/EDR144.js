/*
DATE    SA		PRG		MGR_NO	        DESC
1050825	David   Zen	    1050736	        新增EDR144 指本來文掃描線上簽核公文查詢作業
1050831 David	Zen     1050087         二代公文修改
1051019 Leslie  Kenny   1050087         二代公文修改
*/

var IsServerHandling = new Boolean();
IsServerHandling = false;

//105083 Zen 1050087 二代公文修改
//if (document.all.tbTool)
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
        //1051019   Kenny   [1050087]   二代公文修改--Start--
        //case "btRcvDateS":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all.txRcvDateS, event.screenX, event.screenY);
        //    break;
        //case "btRcvDateE":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all.txRcvDateE, event.screenX, event.screenY);
        //    break;
        //1051019   Kenny   [1050087]   二代公文修改--End--
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//105083 Zen 1050087 二代公文修改
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

    //105083 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            Page_BlockSubmit = !jf_CheckKeyObject();
            if (CheckBeforeSearch())
                //105083 Zen 1050087 二代公文修改
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            break;
        case "btExcel":
            //105083 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
    }
}

function CheckBeforeSearch()
{
    if (document.all["txRcvDateS"].value == "" && document.all["txRcvDateE"].value == "")
    {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["收文日期(起)、(迄)不可皆為空白"])), "");
        //105083 Zen 1050087 二代公文修改
        //document.all["txRcvDateS"].focus();
        $('#txRcvDateS').focus();
        return false;
    }

    return true;
}
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
var CheckedDate = false;
function CheckDATE(argObj, strMsg, argIsCheckDone)
{
    var strDate = document.all[argObj].value;

    if (strDate != "")
    {
        if (CheckedDate) {
            CheckedDate = false;
            return true;
        }
        if (argIsCheckDone)
            CheckedDate = true;

        if (strDate.length < 7) {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }

        if (!jf_CheckCDATE(strDate)) {
            if (strMsg)
                jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            //105083 Zen 1050087 二代公文修改
            //document.all[argObj].focus();
            $('#' + argObj).focus();
            document.all[argObj].value = "";
            CheckedDate = false;
            return false;
        }
        else
            return true;
    }
    else
        return true;
}