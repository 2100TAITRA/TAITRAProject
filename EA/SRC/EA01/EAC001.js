/*
DATE	SA		PRG		MGR_NO		DESC
1060315 Zen     Cloud   1050087     二代公文修改
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
//var strTableFields = new Array("_hlLink","_lbRead1","_lbRead2");
var strTableFields = new Array("_hlLink", "_lbType_Name");

//1060315 Zen 1050087 二代公文修改//if (document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
/*	
if(document.all.dg1)
	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;
*/

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
//1060315 Zen 1050087 二代公文修改//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060315 Zen 1050087 二代公文修改    //var xObjectName = document.activeElement.id;
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
        /*
		case "":
			break;
		*/
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060315 Zen 1050087 二代公文修改//function jf_ToolBarHandle()
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

    //1060315 Zen 1050087 二代公文修改    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            //類別代碼左邊補0
            jf_txType_No_Onblur();
            Page_BlockSubmit = !jf_CheckKeyObject();
            Page_BlockSubmit = !jf_CheckBeforSearch();
            //1060315 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
            //類別代碼左邊補0
            jf_txType_No_Onblur();
            Page_BlockSubmit = !jf_ConfirmPrint();
            //1060315 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            //類別代碼左邊補0
            jf_txType_No_Onblur();
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1060315 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
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
	if(argCallerId == "EAC001")
	{
		document.all["txType_No"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
		//document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
		//document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
		//document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
		if(document.all["txType_No"].value != "")
		{
			Page_BlockSubmit=false;
			jf_OpenButtonSubmit();
		}
		document.all["txType_No"].focus();
	}
	
	
	//清空lbReturnValue物件
	if(document.all["lbReturnValue"].options != null)
		document.all["lbReturnValue"].options.length = 0;
	*/
}

//組出回傳值
function ReturnValue(argLink)
{

    try
    {
        opener.document.all.lbReturnValue.length = 1;
        opener.document.all.lbReturnValue.options[0].value = argLink;
        //opener.document.all.lbReturnValue.options[1].value = argRead1;
        //opener.document.all.lbReturnValue.options[2].value = argRead2;
        opener.window.CallBack("EAC001");
        close();
    }
    catch (e) { }

}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function jf_txType_No_Onblur()
{
    var txObj = jf_Trim(document.all["txType_No"].value);
    if (txObj.length > 0 && txObj.length < 2)
    {
        document.all["txType_No"].value = jf_PADL(txObj, 2, "0");
    }
}

//查詢前之欄位檢查
function jf_CheckBeforSearch()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (jf_Trim(document.all["txType_No"].value) != "")
    {
        if (document.all["txType_No"].value.length > 2)
        {
            strErrMsg += "類別代碼字元個數不可超過2\n";
        }
    }

    if (jf_Trim(document.all["txType_Name"].value) != "")
    {
        if (document.all["txType_Name"].value.length > 10)
        {
            strErrMsg += "類別代碼字元個數不可超過10\n";
        }
    }

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}