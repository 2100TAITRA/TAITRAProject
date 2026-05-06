/*
DATE 	SA		PRG		MGR_NO		DESC
1060405 Cloud   Zen     1050087     二代升級
1090226	Cloud	Kevin_C	1081154		修正連動邏輯
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

//1060405 Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060405 Zen 1050087 二代升級    //jf_CallWS("../EALIB/EA_LIB.asmx", "GetEmp", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
    document.all["empUserId"].value = "";
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060405 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060405 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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
            //1060405 Zen 1050087 二代升級            //jf_OpenChildWin(pUrl, "EAT400C1", 750, 500);
            jf_OpenChildWin(pUrl, "EAT400C1", 800, 600);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060405 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1060405 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {

        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            //1060405 Zen 1050087 二代升級            //document.all["txPlanNo"].focus();
            $('$txPlanNo').focus();
            break;
        case "btPrint":
            Page_BlockSubmit = true;
            if (jf_Trim(document.all.txPlanNo.value) == "")
                if (jf_Trim(document.all.dlStoreNo.options[document.all.dlStoreNo.selectedIndex].value) == "")
                    if (jf_Trim(document.all.dlDept.options[document.all.dlDept.selectedIndex].value) == "")
                        if (jf_Trim(document.all.dlUser.options[document.all.dlUser.selectedIndex].value) == "")
                        {
                            alert("至少必須輸入一種查詢條件");
                            //1060405 Zen 1050087 二代升級                            //document.all.txPlanNo.focus();
                            $('$txPlanNo').focus();
                            return;
                        }
            Page_BlockSubmit = false;
            //1060405 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = true;
            if (jf_Trim(document.all.txPlanNo.value) == "")
                if (jf_Trim(document.all.dlStoreNo.options[document.all.dlStoreNo.selectedIndex].value) == "")
                    if (jf_Trim(document.all.dlDept.options[document.all.dlDept.selectedIndex].value) == "")
                        if (jf_Trim(document.all.dlUser.options[document.all.dlUser.selectedIndex].value) == "")
                        {
                            alert("至少必須輸入一種查詢條件");
                            //1060405 Zen 1050087 二代升級                            //document.all.txPlanNo.focus();
                            $('$txPlanNo').focus();
                            return;
                        }
            Page_BlockSubmit = false;
            //1060405 Zen 1050087 二代升級            //jf_ToolBarSubmit();
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
    if (argCallerId == "EAT400C1")
    {
        document.all["txPlanNo"].value = document.all["lbReturnValue"].options[0].value;
        //1060405 Zen 1050087 二代升級        //document.all["txPlanNo"].focus();
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
                }
                else
                    document.all.txDesc.value = callObj.value.RtnStr;
            }
            break;
    }
}

//紀錄Client端所選擇之UserID
function jf_dlUserChange()
{
	//1090226	Kevin_C	1081154		修正連動邏輯
    //var empUserInfo = document.all["dlUser"].options(document.all["dlUser"].selectedIndex).value;
	var empUserInfo = document.all["dlUser"].options[document.all["dlUser"].selectedIndex].value;
    var tempstr = empUserInfo.split(":");
    document.all["empUserId"].value = tempstr[2];
}