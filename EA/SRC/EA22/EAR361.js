/*
DATE	SA		PRG		MGR_NO	DESC
1060615 Cloud   Zen     1050087 二代升級
1130604 Cloud   Jason   1130235 新增交通部需求產出EXCEL、報表
1140606 Cloud   Daniel  1140110 新增匯出ODS
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

//1060615 Zen 1050087 二代升級
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060615 Zen 1050087 二代升級
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次

    //1130604    Jason   1130235  取消OD0005權限相關邏輯
    //jf_rbOnclick();
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060615 Zen 1050087 二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060615 Zen 1050087 二代升級
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

    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060615 Zen 1050087 二代升級
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

    //1060615 Zen 1050087 二代升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
    	//1130604   Jason   1130235 新增統計開啟AKP210
        case "btStatic":
            Page_BlockSubmit = true;
            var strUrl = "/AK/AKP210.aspx?SAMLart=" + jf_GetArtifact();
            jf_OpenChildWin(strUrl, "AKP210", 800, 600);
            break;
        case "btPrint":
        case "btPreview":
        //1130604   Jason   1130235 新增交通部需求產出EXCEL
        case "btExcel":
        //1140606   Daniel  1140110 新增匯出ODS
        case "btODS":
            //1130604    Jason   1130235  取消OD0005權限相關邏輯--取消需選擇編目人員
            //Page_BlockSubmit = !UnSelect();
            Page_BlockSubmit = jf_checktxYear();
            //1060615 Zen 1050087 二代升級
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

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//編目年度
function jf_checktxYear()
{
    var strErrMsg = "";
    var bRtnbool = "";
    if (document.all["txYear"].value == "")
    {
        strErrMsg += "編目年度不可空白\n";
        //1060615 Zen 1050087 二代升級
        //document.all["txYear"].focus();
        $('#txYear').focus();
        bRtnbool = true;
    }
    if (strErrMsg != "")
    {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    return bRtnbool;
}
//檢查查詢範圍依編目人員時需選定編目人員 
//1130604    Jason   1130235  取消OD0005權限相關邏輯--取消需選擇編目人員--S
/*
function UnSelect()
{
    var index = document.all["dlUser"].selectedIndex;
    var obj = document.all["dlUser"].options[index];

    if (jf_checktxYear())
        return false;


    if (document.all["rbFileuser"].checked == true)
    {
        if (obj.text == "")
        {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["未選定編目人員"])), "");
            return false;
        }
        return true;
    }
    return true;
}
*/
//1130604    Jason   1130235  取消OD0005權限相關邏輯--取消需選擇編目人員--E
//補滿三碼
function jf_FullYear()
{
    var txObj = document.all["txYear"];
    jf_PADCHAR(txObj, 3, 0);
}

//查詢範圍未選定依編目人員，編目人員disable
//1130604    Jason   1130235  取消OD0005權限相關邏輯--S
/*function jf_rbOnclick()
{
    if (document.all["rbFileuser"].checked == true)
    {
        document.all["dlUser"].disabled = false;
        document.all["dlUser_Text"].disabled = false;
    }
    else
    {
        document.all["dlUser"].disabled = true;
        document.all["dlUser_Text"].disabled = true;
    }
}
*/
//1130604    Jason   1130235  取消OD0005權限相關邏輯--E