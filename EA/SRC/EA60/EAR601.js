/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 *104.04.16		Cloud	(Merge)		調整檔案產生機關顯示來源、調整附件顯示(for 驗證)
 *104.11.20		Kenny	1040921	(Merge 1010877)配合新版法規，增加"鑑定"清理項目之相關UI邏輯
 *1060412       Zen     1050087 二代升級
 * 1110414		Zen		1101457	(考試院)新增匯出Excel功能及客製化報表
 * 1140428      Andy    1140264 新增匯出EXCEL、ODS功能
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

//1060412 Zen 1050087 二代升級
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060412 Zen 1050087 二代升級
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../EALIB/EA_LIB.asmx", "GetFieldValue", false, null);

    SearchType("");//2008.11.24 Add by cola ClientonLoad重新判斷是案件or案卷, 之後進行相關設定
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060412 Zen 1050087 二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060412 Zen 1050087 二代升級
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
//1060412 Zen 1050087 二代升級
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

    //1060412 Zen 1050087 二代升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();
            //1060412 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
        //1110414 Zen 1101457 (考試院)新增匯出Excel功能及客製化報表
        //1140428      Andy    1140264 新增匯出EXCEL、ODS功能
        case "btODS":
        case "btExcel":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1060412 Zen 1050087 二代升級
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
var Rtnbool;
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
            //1060412 Zen 1050087 二代升級
            //document.all["txPlanNo"].focus();
            $('#txPlanNo').focus();
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
                document.all["PlanType"].value = "移轉";
                //1041120	Kenny	[1040921]	(Merge 1010877)配合新增之清理別，修改判斷字串(因JS無法使用共用類別，僅以HotCode處理)	
                //else if(argResult.value.RtnField0 == "00001")
            else if (argResult.value.RtnField0 == "000010")
                document.all["PlanType"].value = "移交";
            else
            {
                document.all["PlanType"].value = "";
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
        //1060412 Zen 1050087 二代升級
        //document.all["txPlanNo"].focus();
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

var wsGetTypeID2;
function CheckPlanStatus()
{
    var arKeyName = new Array(1);
    var arKeyValue = new Array(1);
    var arRtnFldName = new Array(1);
    var arOrdFldName = new Array(1);

    if (!IsServerHandling)
    {
        if (document.all["txPlanNo"].value != "")
        {
            Page_BlockSubmit = true;

            arKeyName[0] = "PLAN_NO";
            arKeyValue[0] = document.all["txPlanNo"].value;
            arRtnFldName[0] = "PLAN_STATUS";
            arOrdFldName[0] = "PLAN_NO";

            var arWSParam = new Array(5);
            arWSParam[0] = "PLAN_MAIN";
            arWSParam[1] = arKeyName;
            arWSParam[2] = arKeyValue;
            arWSParam[3] = arRtnFldName;
            arWSParam[4] = arOrdFldName;
            callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, arWSParam);
            wsGetTypeID2 = callObj.id;
            OnWSResult(callObj);
        }
    }
}

function SearchType(argType)
{
    if (document.all["rb1"].checked)
    //if(argType == "rb1")
    {
        document.all["rbStock"].Enabled = true;
        document.all["rbStock"].disabled = false;
        if (document.all["txStock"].value == "Y")
            document.all["rbStock"].checked = true;
        //1110414 Zen 1101457 (考試院)新增匯出Excel功能及客製化報表
        else if (document.all['H_txOrgNickname'].value != 'EXAM')
            document.all["rbFile"].checked = true;

        //1110414 Zen 1101457 (考試院)新增匯出Excel功能及客製化報表
        document.all["btExcel"].disabled = false;
    }
    //1110414 Zen 1101457 (考試院)新增匯出Excel功能及客製化報表
    else if (document.all["rb2"].checked)
    {
        //1110414 Zen 1101457 (考試院)新增匯出Excel功能及客製化報表
        if (document.all['H_txOrgNickname'].value != 'EXAM')
            document.all["rbFile"].checked = true;
        document.all["rbStock"].disabled = true;

        //1110414 Zen 1101457 (考試院)新增匯出Excel功能及客製化報表
        document.all["btExcel"].disabled = false;
    }
    //1110414 Zen 1101457 (考試院)新增匯出Excel功能及客製化報表
    else if (document.all["rbStat"].checked)
    {
        document.all["btExcel"].disabled = true;
    }
    rbOnClick();
}

//1040416 Cloud (Merge) 新增列印單位選單
function rbOnClick()
{
    //1110414 Zen 1101457 (考試院)新增匯出Excel功能及客製化報表
    //if (document.all["rb1"].checked && document.all["rbDept"].checked)
    if ((document.all["rb1"].checked && document.all["rbDept"].checked) || document.all['H_txOrgNickname'].value == 'EXAM')
        document.all["ddldept"].disabled = false;
    else
        document.all["ddldept"].disabled = true;
}