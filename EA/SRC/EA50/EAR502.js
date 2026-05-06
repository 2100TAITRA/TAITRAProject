/*
DATE    SA		PRG		MGR_NO	        DESC
1060406	David   Zen	    1050087	        二代升級修改
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

//1060406 Zen 1050087 二代升級
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060406 Zen 1050087 二代升級
    //jf_CallWS("../EALIB/EA_LIB.asmx", "GetDespFromPlanMain", false, null);
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060406 Zen 1050087 二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060406 Zen 1050087 二代升級
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
        case "btKeyHelp": //銷毀計畫
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "EAT501C1.aspx";
            //1060406 Zen 1050087 二代升級
            //jf_OpenChildWin(pUrl, "EAT501C1", 750, 500);
            jf_OpenChildWin(pUrl, "EAT501C1", 850, 600);
            break;

        case "btKeyHelp1": //計畫批號提示
            Page_BlockSubmit = true;
            var pUrl = "";
            pUrl = "../EA40/EAT400C1.aspx";
            //1060406 Zen 1050087 二代升級
            //jf_OpenChildWin(pUrl, "EAT400C1", 750, 500);
            jf_OpenChildWin(pUrl, "EAT400C1", 800, 600);
            break;

    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060406 Zen 1050087 二代升級
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

    //1060406 Zen 1050087 二代升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {

        case "btPrint":
            Page_BlockSubmit = true;
            if ((document.all.txDPlan.value == "") && (document.all.txPlanNo.value == ""))
            {
                alert("銷毀計畫編號及清理批號不可空白");
                //1060406 Zen 1050087 二代升級
                //document.all.txDPlan.focus();
                $('#txDPlan').focus();
                return;
            }
            if (document.all.txPlanNo.value != "")
            {
                var param = new Array(1);
                param[0] = document.all.txPlanNo.value;
                var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "CheckPlanTypeDestroy", false, param);
                var iCallID_txPlanNo1 = callObj.id;
                if (callObj.value.RtnBool == false)
                {
                    alert("清理計畫批號之清理範圍必須為銷毀，請重新輸入");
                    //1060406 Zen 1050087 二代升級
                    //document.all.txPlanNo.focus();
                    $('#txPlanNo').focus();
                    return;
                }
            }
            Page_BlockSubmit = false;
            //1060406 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = true;
            if ((document.all.txDPlan.value == "") && (document.all.txPlanNo.value == ""))
            {
                alert("銷毀計畫編號及清理批號不可空白");
                //1060406 Zen 1050087 二代升級
                //document.all.txDPlan.focus();
                $('#txDPlan').focus();
                return;
            }
            if (document.all.txPlanNo.value != "")
            {
                var param = new Array(1);
                param[0] = document.all.txPlanNo.value;
                var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "CheckPlanTypeDestroy", false, param);
                var iCallID_txPlanNo1 = callObj.id;
                if (callObj.value.RtnBool == false)
                {
                    alert("清理計畫批號之清理範圍必須為銷毀，請重新輸入");
                    //1060406 Zen 1050087 二代升級
                    //document.all.txPlanNo.focus();
                    $('#txPlanNo').focus();
                    return;
                }
            }
            Page_BlockSubmit = false;
            //1060406 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1060406 Zen 1050087 二代升級
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_ConfirmSave()
{
    var bRtnbool = false;

    if (jf_CheckBeforSave())
    {
        // 新增模式需檢查鍵值是否已存在
        if (jf_GetActionMode() == LayoutModeNew)
        {
            if (jf_CheckDataExist(""))//檢查鍵值是否已存在
            {
                if (window.confirm(jf_GetErrMsg(KeyExist)))//提醒是否覆蓋存檔
                    bRtnbool = true;
            }
            else
                bRtnbool = true;
        }
        else
            bRtnbool = true;
    }

    return bRtnbool;
}

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txKeyFld"].value == "")
    {
        strErrMsg += "鍵值欄位不可空白\n";
        document.all["txKeyFld"].focus();
    }

    if (document.all["txRequireFld"].value == "")
    {
        strErrMsg += "必要欄位不可空白\n";
        document.all["txRequireFld"].focus();
    }

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
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

    if (argCallerId == "EAT400C1")
    {
        document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
        //1060406 Zen 1050087 二代升級
        //document.all["txPlanNo"].focus();
        $('#txPlanNo').focus();
    }

    if (argCallerId == "EAT501C1")
    {
        document.all["txDPlan"].value = document.all["lbReturnValue"].options[0].value;
        //1060406 Zen 1050087 二代升級
        //document.all["txDPlan"].focus();
        $('#txDPlan').focus();
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
function ObjOnBlur(argObjName)
{
    switch (argObjName)
    {
        case "txPlanNo": //清理批號檢查Plan_Main有無存在

            if (document.all.txPlanNo.value != "")
            {
                var param = new Array(1);
                param[0] = document.all.txPlanNo.value;
                var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetDespFromPlanMain", false, param);
                var iCallID_txPlanNo = callObj.id;
                if (callObj.value.RtnStr == "nodata")
                {
                    alert("無此計畫編號，請重新輸入");
                    //1060406 Zen 1050087 二代升級
                    //document.all.txPlanNo.focus();
                    $('#txPlanNo').focus();
                }
                else
                    document.all.txDesc.value = callObj.value.RtnStr;
            }
            break;
        case "txDPlan":
            if (document.all.txDPlan.value != "")
            {
                var param = new Array(1);
                param[0] = document.all.txDPlan.value;
                var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "CheckDPMByDPlanNo", false, param);
                var iCallID_txDPlan = callObj.id;
                if (callObj.value.RtnBool == false)
                {
                    alert("無此銷毀計畫編號，請重新輸入");
                    //1060406 Zen 1050087 二代升級
                    //document.all.txDPlan.focus();
                    $('#txDPlan').focus();
                }
            }
            break;
    }
}
