/*
DATE 	    SA		PRG		MGR_NO		DESC
1060908     Cloud   Zen     1050087     二代公文修改
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

//1060908 Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060908 Zen 1050087 二代升級    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../EALIB/EA_LIB.asmx", "GetFieldValue", false, null);
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060908 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060908 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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
        case "btKeyHelp": //計畫批號提示
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "../EA40/EAT400C1.aspx";
            jf_OpenChildWin(pUrl, "EAT400C1", 800, 500);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060908 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1060908 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    var xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = false//!jf_CheckKeyObject();			
            //pUrl = "../EA71/EAI301.aspx";
            //jf_OpenChildWin(pUrl, "EAI301", 750, 600);
            //1060908 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//1060908 Zen 1050087 二代升級////儲存前檢查
//function jf_ConfirmSave()
//{
//    var bRtnbool = false;

//    if (jf_CheckBeforSave())
//    {
//        // 新增模式需檢查鍵值是否已存在
//        if (jf_GetActionMode() == LayoutModeNew)
//        {
//            if (jf_CheckDataExist(""))//檢查鍵值是否已存在
//            {
//                if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
//                    bRtnbool = true;
//            }
//            else
//                bRtnbool = true;
//        }
//        else
//            bRtnbool = true;
//    }

//    return bRtnbool;
//}

////儲存前之欄位檢查
//function jf_CheckBeforSave()
//{
//    var bRtnbool = true;
//    var strErrMsg = "";

//    if (document.all["txKeyFld"].value == "")
//    {
//        strErrMsg += "鍵值欄位不可空白\n";
//        document.all["txKeyFld"].focus();
//    }

//    if (document.all["txRequireFld"].value == "")
//    {
//        strErrMsg += "必要欄位不可空白\n";
//        document.all["txRequireFld"].focus();
//    }

//    if (strErrMsg != "")
//    {
//        bRtnbool = false;
//        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
//    }

//    return bRtnbool;
//}

/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
//處理呼叫WebService回傳值
function OnWSResult(argResult)
{
    var strErrMsg;
    //清理計畫存不存在檢查
    if (argResult.id == wsCheckPlanID)
    {
        if (argResult.value.UtyRtn.m_bSuccess)
            CheckIsTransfer();
        else
        {
            Page_BlockSubmit = true;
            strErrMsg = "無此計畫編號";
            //1060908 Zen 1050087 二代升級            //document.all["txPlanNo"].focus();
            $('#txPlanNo').focus();
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
        }
    }

    //清理計畫是否有將'清查'納入
    if (argResult.id == wsGetTypeID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            document.all["txPlanDesc"].value = argResult.value.RtnField1;
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

    if (argCallerId == "EAT400C1")
    {
        document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
        //1060908 Zen 1050087 二代升級        //document.all["txPlanNo"].focus();
        $('#txPlanNo').focus();
    }

    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

//檢核該清理批號是否存在
function CheckPlanNo()
{
    if (!jf_CheckDataExist("") && jf_Trim(document.all["txPlanNo"].value) != "")
    {
        Page_BlockSubmit = false;
        alert("此清理批號不存在");
        document.all["txPlanNo"].value = "";
        //1060908 Zen 1050087 二代升級        //document.all["txPlanNo"].focus();
        $('#txPlanNo').focus();
    }
}

var wsCheckPlanID;
function txPlanNo_onblur()
{
    if (!IsServerHandling)
    {
        if (document.all["txPlanNo"].value != "")
        {
            Page_BlockSubmit = true;

            var arWSParam = new Array(1);
            arWSParam[0] = document.all["txPlanNo"].value;
            callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ChkPlan", false, arWSParam);
            wsCheckPlanID = callObj.id;
            OnWSResult(callObj);
        }
    }
}

//檢查清理計畫是否有將'移轉'納入
var wsGetTypeID;
function CheckIsTransfer()
{
    var arKeyName = new Array(1);
    var arKeyValue = new Array(1);
    var arRtnFldName = new Array(2);
    var arOrdFldName = new Array(1);

    if (!IsServerHandling)
    {
        if (document.all["txPlanNo"].value != "")
        {
            Page_BlockSubmit = true;

            arKeyName[0] = "PLAN_NO";
            arKeyValue[0] = document.all["txPlanNo"].value;
            arRtnFldName[0] = "PLAN_TYPE";
            arRtnFldName[1] = "PLAN_DESC";
            arOrdFldName[0] = "PLAN_NO";

            var arWSParam = new Array(5);
            arWSParam[0] = "PLAN_MAIN";
            arWSParam[1] = arKeyName;
            arWSParam[2] = arKeyValue;
            arWSParam[3] = arRtnFldName;
            arWSParam[4] = arOrdFldName;
            callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, arWSParam);

            wsGetTypeID = callObj.id;
            OnWSResult(callObj);
        }
    }
}