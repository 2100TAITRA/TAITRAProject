/*
DATE	SA		PRG		MGR_NO			DESC
1051109 Kevin   Zen     1050087         二代公文修改
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

//1051109 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

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
//1051109 Zen 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051109 Zen 1050087 二代公文修改
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
        //1051109 Zen 1050087 二代公文修改
        //case "btRcvDateS":
        //	Page_BlockSubmit=true;
        //	jf_CallCalendar(document.all["txRcvDateS"], event.screenX, event.screenY);
        //	break;
        //case "btRcvDateE":
        //	Page_BlockSubmit=true;
        //	jf_CallCalendar(document.all["txRcvDateE"], event.screenX, event.screenY);
        //	break;
        //case "btCloseDateS":
        //	Page_BlockSubmit=true;
        //	jf_CallCalendar(document.all["txCloseDateS"], event.screenX, event.screenY);
        //	break;
        //case "btCloseDateE":
        //	Page_BlockSubmit=true;
        //	jf_CallCalendar(document.all["txCloseDateE"], event.screenX, event.screenY);
        //	break;
        //case "btDueDateS":
        //	Page_BlockSubmit=true;
        //	jf_CallCalendar(document.all["txDueDateS"], event.screenX, event.screenY);
        //	break;
        //case "btDueDateE":
        //	Page_BlockSubmit=true;
        //	jf_CallCalendar(document.all["txDueDateE"], event.screenX, event.screenY);
        //	break;
        //case "btSrcRcvDateS":
        //	Page_BlockSubmit=true;
        //	jf_CallCalendar(document.all["txSrcRcvDateS"], event.screenX, event.screenY);
        //	break;
        //case "btSrcRcvDateE":
        //	Page_BlockSubmit=true;
        //	jf_CallCalendar(document.all["txSrcRcvDateE"], event.screenX, event.screenY);
        //	break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051109 Zen 1050087 二代公文修改
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

    //1051109 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            //0980625	David	0980320	排除辦理天數開頭的0
            jf_ExcludeStart();
            Page_BlockSubmit = !fnCheckBack();
            //1051109 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
            //0980625	David	0980320	排除辦理天數開頭的0
            jf_ExcludeStart();
            Page_BlockSubmit = !fnCheckBack();
            //1051109 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            //0980625	David	0980320	排除辦理天數開頭的0
            jf_ExcludeStart();
            Page_BlockSubmit = !fnCheckBack();
            //1051109 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
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
            //document.all["txKeyFld"].value = jf_Trim(argResult.value.RtnStr);
        }
        else
        {
            //document.all["txReadOnly"].value = "";
        }
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//處理呼叫子視窗回傳值
function CallBack(argCallerId)
{
    /*
	if(argCallerId == "SII020")
	{
		document.all["txKeyFld"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txKeyFld"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txKeyFld"].focus();
	}
	*/

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(argLink, argRead1, argRead2)
{
    /*
	try
	{
	    opener.document.all.lbReturnValue.length = 3;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.document.all.lbReturnValue.options[1].value = argRead1;
	    opener.document.all.lbReturnValue.options[2].value = argRead2;
	    opener.window.CallBack("SII020");
	    close();
	}
	catch (e) {}
    */
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function fnCheckBack()
{
    var cvalue = document.all.txRcvDateS.value + document.all.txRcvDateE.value + document.all.txCloseDateS.value + document.all.txCloseDateE.value
	                   + document.all.txDueDateS.value + document.all.txDueDateE.value + document.all.txDocNoS.value + document.all.txDocNoE.value
	                   + document.all.txSrcRcvDateS.value + document.all.txSrcRcvDateE.value + document.all.txSrcRcvNoS.value + document.all.txSrcRcvNoE.value;
    if (cvalue == "")
    {
        alert("處收文日、處收文號、結案日期、限辦日期、部收文日、部收文號請至少輸入一條件");
        return false;
    }
    return true;
}
//0980626	David	0980320	排除開頭的0
function jf_ExcludeStart()
{
    var strUdIssueday = document.all.txUdIssueDay.value;

    if (strUdIssueday.length > 1)
    {
        if (strUdIssueday.length == 2 && strUdIssueday.substr(0, 1) == "0")
            document.all.txUdIssueDay.value = strUdIssueday.substr(1, 1);
        if (strUdIssueday.length == 3 && strUdIssueday.substr(0, 1) == "0" && strUdIssueday.substr(1, 1) != "0")
            document.all.txUdIssueDay.value = strUdIssueday.substr(1, 2);
        if (strUdIssueday.length == 3 && strUdIssueday.substr(0, 1) == "0" && strUdIssueday.substr(1, 1) == "0")
            document.all.txUdIssueDay.value = strUdIssueday.substr(2, 1);

    }
}