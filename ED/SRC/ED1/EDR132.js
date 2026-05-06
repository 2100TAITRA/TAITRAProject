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
var strTableFields = new Array("_lbRead", "_txInput1", "_txInput2");

//1051114 Zen 1050087 二代公文修改
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
//1051114 Zen 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051114 Zen 1050087 二代公文修改
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
        //1051114 Zen 1050087 二代公文修改
        //case "btDateS":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all.txDateS, event.screenX, event.screenY);
        //    break;
        //case "btDateE":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all.txDateE, event.screenX, event.screenY);
        //    break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1051114 Zen 1050087 二代公文修改
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

        //1051114 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            Page_BlockSubmit = !CheckBeforeSearch();
            //1051114 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
            Page_BlockSubmit = !CheckBeforeSearch();
            //1051114 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !CheckBeforeSearch();
            //1051114 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1051114 Zen 1050087 二代公文修改
        //case "btDate":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all.txIssueDate, event.screenX, event.screenY);
        //    break;
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

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
var CheckedDate = false;
function CheckDATE(argObj, strMsg, argIsCheckDone)
{
    if (CheckedDate)
    {
        CheckedDate = false;
        return true;
    }
    if (argIsCheckDone)
        CheckedDate = true;

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
            //1051114 Zen 1050087 二代公文修改
            //document.all[argObj].focus();
            $('#' + argObj).focus();
            CheckedDate = false;
            return false;
        }
        else
            return true;
    }
    else
        return true;
}
function CheckBeforeSearch()
{
    if (document.all.txDocNo.value == "" && document.all.txDateS.value == "" && document.all.txDateE.value == "")
    {
        alert("請至少輸入一個條件");
        return false;
    }
    var strDateS = document.all.txDateS.value;
    var strDateE = document.all.txDateE.value;
    if (strDateS != "" && strDateE != "" && strDateS > strDateE)
    {
        document.all.txDateS.value = strDateE;
        document.all.txDateE.value = strDateS;
    }
    if (!CheckDATE("txDateS", "儲存時間(起)", true))
        return false;
    if (!CheckDATE("txDateE", "儲存時間(訖)", true))
        return false;
    return true;
}