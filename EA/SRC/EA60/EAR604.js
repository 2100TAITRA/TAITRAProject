/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人  單號		概要
 * -------------------------------------------------------------------------------------------------
 * 1000603		Davy    1000437		修正輸入計畫編號後，會出現"無此計畫編號"問題。
 * 1060418      Zen     1050087     二代升級
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1060418 Zen 1050087 二代升級
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060418 Zen 1050087 二代升級
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../EALIB/EA_LIB.asmx", "GetFieldValue", false, null);
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060418 Zen 1050087 二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060418 Zen 1050087 二代升級
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
        case "btHelp": //計畫批號提示
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "../EA60/EAT602C1.aspx";
            //1060418 Zen 1050087 二代升級
            //jf_OpenChildWin(pUrl, "EAT602C1", 750, 500);
            jf_OpenChildWin(pUrl, "EAT602C1", 800, 600);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060418 Zen 1050087 二代升級
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

    //1060418 Zen 1050087 二代升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btPrint":
            if (CheckBeforePrint())
            {
                Page_BlockSubmit = !jf_ConfirmPrint();
                //1060418 Zen 1050087 二代升級
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            else
                Page_BlockSubmit = true;
            break;
        case "btPreview":
            if (CheckBeforePrint())
            {
                Page_BlockSubmit = !jf_ConfirmPreview();
                //1060418 Zen 1050087 二代升級
                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            else
                Page_BlockSubmit = true;
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
            //1060418 Zen 1050087 二代升級
            //document.all["txTPlan"].focus();
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
            if (argResult.value.RtnField0 == "1")
                document.all["txType"].value = "移轉";
            else if (argResult.value.RtnField0 == "2")
                document.all["txType"].value = "移交";
            else
            {
                document.all["txType"].value = "";
                //alert("非移轉(交)批號，請確認\n");
                //Page_BlockSubmit = true;		
                //document.all["txPlanNo"].focus();
            }
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

    if (argCallerId == "EAT602C1")
    {
        document.all["txTPlan"].value = document.all["lbReturnValue"].options[0].value;
        //1060418 Zen 1050087 二代升級
        //document.all["txTPlan"].focus();
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
{
    /*if (!IsServerHandling)
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
	}*/
    //95.12.07 David 	
    var arKeyName = new Array(1);
    var arKeyValue = new Array(1);
    //1000603 Davy [1000437] 只取一個欄位資料，陣列長度應為1
    //var arRtnFldName = new Array(2);
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
    //1000603 Davy [1000437] 只取一個欄位資料，陣列長度應為1
    //var arRtnFldName = new Array(2);
    var arRtnFldName = new Array(1);
    var arOrdFldName = new Array(1);

    if (!IsServerHandling)
    {
        if (document.all["txTPlan"].value != "")
        {
            Page_BlockSubmit = true;

            arKeyName[0] = "TPLAN_NO";
            arKeyValue[0] = document.all["txTPlan"].value;
            arRtnFldName[0] = "TPLAN_TYPE";
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
        ErrMsg = "移轉(交)計畫編號不可空白\n";

    if (document.all["txDate"].value == "")
        ErrMsg += "列印日期不可空白\n";

    if (ErrMsg != "")
    {
        alert(ErrMsg);
        return false;
    }
    else
        return true;
}