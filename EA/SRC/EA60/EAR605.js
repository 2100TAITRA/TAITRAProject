/*
DATE 	    SA		PRG		MGR_NO      DESC
1060420     Cloud   Zen     1050087     二代升級*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1060420 Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060420 Zen 1050087 二代升級    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../EALIB/EA_LIB.asmx", "GetFieldValue", false, null);
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060420 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060420 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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
        case "btHelp": //計畫批號提示
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "../EA60/EAT602C1.aspx";
            //1060420 Zen 1050087 二代升級            //jf_OpenChildWin(pUrl, "EAT602C1", 750, 500);
            jf_OpenChildWin(pUrl, "EAT602C1", 800, 600);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060420 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1060420 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btPrint":
            if (CheckBeforePrint())
            {
                Page_BlockSubmit = !jf_ConfirmPrint();
                //1060420 Zen 1050087 二代升級                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            else
                Page_BlockSubmit = true;
            break;
        case "btPreview":
            if (CheckBeforePrint())
            {
                Page_BlockSubmit = !jf_ConfirmPreview();
                //1060420 Zen 1050087 二代升級                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            else
                Page_BlockSubmit = true;
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
//1060420 Zen 1050087 二代升級//function jf_ConfirmSave()
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
    //webserver回傳後動作
    var strErrMsg;
    //清理計畫存不存在檢查
    if (argResult.id == wsCheckPlanID)
    {
        //95.12.07 David		
        //if (argResult.value.UtyRtn.m_bSuccess)
        if (argResult.value.m_bSuccess)
            CheckIsTransfer();
        else
        {
            Page_BlockSubmit = true;
            strErrMsg = "無此計畫編號";
            document.all["txDate"].value = "";
            //1060420 Zen 1050087 二代升級            //document.all["txTPlan"].focus();
            $('#txTPlan').focus();
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
        }
    }
    //清理計畫是否有將'清查'納入
    if (argResult.id == wsGetTypeID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {
            //document.all["txDesc"].value = argResult.value.RtnField1;			
            if (argResult.value.RtnField0 != "")
                document.all["txDate"].value = argResult.value.RtnField0;
            else
            {
                alert("未設定移轉日期");
                document.all["txDate"].value = "";
                //alert("非移轉(交)批號，請確認\n");
                //Page_BlockSubmit = true;		
                //document.all["txPlanNo"].focus();
            }
        }
    }

    if (argResult.id == CheckPrintID)
    {
        alert(argResult.value.RtnBool);
        if (!argResult.value.RtnBool)
            return false;
        else
            return true;
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

    if (argCallerId == "EAT602C1")
    {
        document.all["txTPlan"].value = document.all["lbReturnValue"].options[0].value;
        //1060420 Zen 1050087 二代升級        //document.all["txTPlan"].focus();
        $('#txTPlan').focus();
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

var wsCheckPlanID;
function txPlanNo_onblur()
{/*
	if (!IsServerHandling)
	{
		if (document.all["txTPlan"].value != "")
		{
			Page_BlockSubmit = true;			
			var arWSParam = new Array(1);
			arWSParam[0] = document.all["txTPlan"].value;
			callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ChkPlan", false, arWSParam);
			wsCheckPlanID = callObj.id;
			OnWSResult(callObj);
		}
	}
*/
    //95.12.07 David 	
    var arKeyName = new Array(1);
    var arKeyValue = new Array(1);
    var arRtnFldName = new Array(1);
    var arOrdFldName = new Array(1);

    if (!IsServerHandling)
    {
        if (jf_Trim(document.all["txTPlan"].value) != "")
        {
            Page_BlockSubmit = true;

            arKeyName[0] = "TPLAN_NO";
            arKeyValue[0] = jf_Trim(document.all["txTPlan"].value);
            arRtnFldName[0] = "TRAN_DATE";
            arOrdFldName[0] = "TPLAN_NO";

            var arWSParam = new Array(5);
            arWSParam[0] = "TRANPLAN_MAIN";
            arWSParam[1] = arKeyName;
            arWSParam[2] = arKeyValue;
            arWSParam[3] = arRtnFldName;
            arWSParam[4] = arOrdFldName;
            callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, arWSParam);

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
    var arRtnFldName = new Array(1);
    var arOrdFldName = new Array(1);
    if (!IsServerHandling)
    {
        if (document.all["txTPlan"].value != "")
        {
            Page_BlockSubmit = true;

            arKeyName[0] = "TPLAN_NO";
            arKeyValue[0] = document.all["txTPlan"].value;
            arRtnFldName[0] = "TRAN_DATE";
            arOrdFldName[0] = "TPLAN_NO";

            var arWSParam = new Array(5);
            arWSParam[0] = "TRANPLAN_MAIN";
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

//補0
function CallPadFunc(strObjName, argCount)
{
    switch (strObjName)
    {
        case "txDate":
            {
                if (document.all[strObjName].value != "")
                    document.all[strObjName].value = jf_PADL(document.all[strObjName].value, argCount, "0");
                if (!jf_CheckCDATE(document.all[strObjName].value) && jf_Trim(document.all[strObjName].value) != "")
                {
                    alert("輸入日期格式不正確，請檢查");
                    document.all[strObjName].value = "";
                }
                break;
            }
    }
}

function CheckBeforePrint()
{
    var ErrMsg = "";

    if (document.all["txTPlan"].value == "")
        ErrMsg += "移轉(交)計畫編號不可空白\n";
    if (document.all["txDate"].value == "")
        ErrMsg += "移轉日期不可空白\n";
    if (document.all["rbNum"].checked)
    {
        if (document.all["txNum"].value == "")
            ErrMsg += "列印範圍不可空白\n";
        else
        {
            if (!CheckPrintRange())
                ErrMsg += "範圍語法不正確\n";
        }
    }

    if (ErrMsg != "")
    {
        alert(ErrMsg);
        return false;
    }
    else
        return true;
}

var CheckPrintID = "";
function CheckPrintRange()
{
    var param = new Array(1);
    param[0] = document.all["txNum"].value;
    var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "CheckPrintRange", false, param);
    CheckPrintID = callObj.id;
    if (!OnWSResult(callObj))
        return false;
    else
        return true;
}