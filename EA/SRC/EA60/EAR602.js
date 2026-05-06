/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1041120		Kenny	1040921	(Merge 1010877)配合新版法規，增加"鑑定"清理項目之相關UI邏輯
 * 1060417      Zen     1050087 二代升級 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//紀錄Call WebService物件的id
var wsDuplicateID;

//1060417 Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060417 Zen 1050087 二代升級    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../EALIB/EA_LIB.asmx", "GetFieldValue", false, null);
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060417 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060417 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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

        case "Imagebutton1": //計畫批號提示
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "../EA40/EAT400C1.aspx";
            //1060417 Zen 1050087 二代升級            //jf_OpenChildWin(pUrl, "EAT400C1", 800, 500);
            jf_OpenChildWin(pUrl, "EAT400C1", 800, 600);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060417 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1060417 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {

        case "btPrint":
            if (CheckBeforPrint())
            {
                Page_BlockSubmit = !jf_ConfirmPrint();
                //1060417 Zen 1050087 二代升級                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            else
                Page_BlockSubmit = true;
            break;
        case "btPreview":
            if (CheckBeforPrint())
            {
                Page_BlockSubmit = !jf_ConfirmPreview();
                //1060417 Zen 1050087 二代升級                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            else
            {
                Page_BlockSubmit = true;
            }
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
            //1060417 Zen 1050087 二代升級            //document.all["txPlanNo"].focus();
            $('$txPlanNo').focus();
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
        }
    }
    //清理計畫是否有將'清查'納入
    if (argResult.id == wsGetTypeID)
    {
        if (jf_IsWebServiceSuccess(argResult))
        {

            //document.all["txDesc"].value = argResult.value.RtnField1;		
            //1041120	Kenny	[1040921]	(Merge 1010877)配合新增之清理別，修改判斷字串(因JS無法使用共用類別，僅以HotCode處理)	
            //if(argResult.value.RtnField0 == "00010")
            if (argResult.value.RtnField0 == "000100")
                document.all["txType"].value = "移轉";
                //1041120	Kenny	[1040921]	(Merge 1010877)配合新增之清理別，修改判斷字串(因JS無法使用共用類別，僅以HotCode處理)	
                //else if(argResult.value.RtnField0 == "00001")
            else if (argResult.value.RtnField0 == "000010")
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
    if (argCallerId == "EAT400C1")
    {
        document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
        //1060417 Zen 1050087 二代升級        //document.all["txPlanNo"].focus();
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
//檢核該清理批號是否存在
function CheckPlanNo()
{
    if (!jf_CheckDataExist("") && document.all["txPlanNo"].value != "")
    {
        Page_BlockSubmit = false;
        alert("此移轉(交)計畫編號不存在");
        //1060417 Zen 1050087 二代升級        //document.all["txPlanNo"].focus();
        $('#txPlanNo').focus();
    }
}

function CheckBeforPrint()
{
    var ErrMsg = "";
    if (document.all["txPlanNo"].value == "")
        ErrMsg = "清理批號不可空白\n";
    if (document.all["txDate"].value == "")
        ErrMsg += "列印日期不可空白\n";
    if (document.all["txType"].value != "移轉")
        if (document.all["txType"].value != "移交")
            ErrMsg += "非屬移轉(交)類計畫批號，請檢查\n";

    if (ErrMsg != "")
    {
        alert(ErrMsg);
        return false;
    }
    else
        return true;

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