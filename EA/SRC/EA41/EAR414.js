/*
Date	SA		PG		NO.		DESC
0980617			Albert	0980265	新增日期檢查函式、儲存與列印前檢查日期格式
1060331 Cloud   Zen     1050087 二代公文修改
1140429 Cloud   Andy    1140264 新增匯出EXCEL、ODS功能
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

//1060331 Zen 1050087 二代公文修改//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060331 Zen 1050087 二代公文修改    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060331 Zen 1050087 二代公文修改//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060331 Zen 1050087 二代公文修改    //var xObjectName = document.activeElement.id;
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
//1060331 Zen 1050087 二代公文修改//function jf_ToolBarHandle()
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

    //1060331 Zen 1050087 二代公文修改    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            if (document.all["txPlanNo"].value == "")
            {
                alert("請輸入清理批號。");
                Page_BlockSubmit = true;
            }
            else
                Page_BlockSubmit = false;
            //1060331 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_CheckBeforSave())//準許SubMit
                Page_BlockSubmit = false;
            else
                Page_BlockSubmit = true;
            //1060331 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1060331 Zen 1050087 二代公文修改        //case "btDelete":
        //    Page_BlockSubmit = !jf_ConfirmDelete();
        //    jf_ToolBarSubmit();
        //    break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060331 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1060331 Zen 1050087 二代公文修改        //case "btClean":
        //    Page_BlockSubmit = true;
        //    jf_ConfirmClean(true);
        //    document.all["txKeyFld"].focus();
        //    break;
        case "btSearch":
            /*
			var strUrl = "";
			var strKeyCol = jf_Trim(document.all["txKeyFld"].value);
			var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
			var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
			var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
			strUrl = "SII020.aspx?rtnObj=lbReturnValue&argKeyCol="+strKeyCol+"&argMainTableCol1="+strMainTableCol1+"&argMainTableCol2="+strMainTableCol2+"&argMainTableCol3="+strMainTableCol3;
			jf_OpenChildWin(strUrl, "SII020", 700, 500 );
			*/
            break;
        case "btPrint":
            if (jf_CheckBeforPrint())//準許SubMit
                Page_BlockSubmit = false;
            else
                Page_BlockSubmit = true;
            //1060331 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1140429 Cloud   Andy    1140264 新增匯出EXCEL、ODS功能
        case "btODS":
        case "btExcel":
        case "btPreview":
            if (jf_CheckBeforPrint())//準許SubMit
                Page_BlockSubmit = false;
            else
                Page_BlockSubmit = true;
            //1060331 Zen 1050087 二代公文修改            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
function jf_CheckBeforSave()
{
    //0980617 Albert 0980265 儲存前檢查日期起訖
    if (document.all["txPlanDate"].value > document.all["txPlanEntryDate"].value)
    {
        alert("日期欄位起迄值錯誤，請重新輸入。");
        //1060331 Zen 1050087 二代公文修改        //document.all["txPlanEntryDate"].focus();
        $('#txPlanEntryDate').focus();
        return false;
    }

    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txPlanCondition"].value.length > 300)
    {
        strErrMsg += "清查狀況\n";
    }

    if (document.all["txPlanAttach"].value.length > 300)
    {
        strErrMsg += "附件\n";
    }

    if (document.all["txPlanRecommand"].value.length > 300)
    {
        strErrMsg += "建議事項";
    }

    if (strErrMsg != "")
    {
        strErrMsg = "下列欄位長度過長(超過300)，請決定是否仍要儲存，若仍要儲存，超出之字串將被切除。\n" + strErrMsg;
        bRtnbool = window.confirm(strErrMsg);
    }
    else
        bRtnbool = true;//代表準許SubMit

    if (bRtnbool && strErrMsg != "")
    {
        if (document.all["txPlanCondition"].value.length > 300)
            document.all["txPlanCondition"].value = document.all["txPlanCondition"].value.substring(0, 300);
        if (document.all["txPlanAttach"].value.length > 300)
            document.all["txPlanAttach"].value = document.all["txPlanAttach"].value.substring(0, 300);
        if (document.all["txPlanRecommand"].value.length > 300)
            document.all["txPlanRecommand"].value = document.all["txPlanRecommand"].value.substring(0, 300);
    }


    return bRtnbool;
}
function jf_CheckBeforPrint()
{
    //0980617 Albert 0980265 列印前檢查日期起訖
    if (document.all["txPlanDate"].value > document.all["txPlanEntryDate"].value)
    {
        alert("日期欄位起迄值錯誤，請重新輸入。");
        //1060331 Zen 1050087 二代公文修改        //document.all["txPlanEntryDate"].focus();
        $('#txPlanEntryDate').focus();
        return false;
    }

    var bRtnbool = true;
    var strErrMsg = "";

    if (document.all["txPlanCondition"].value.length > 300)
    {
        strErrMsg += "清查狀況\n";
    }

    if (document.all["txPlanAttach"].value.length > 300)
    {
        strErrMsg += "附件\n";
    }

    if (document.all["txPlanRecommand"].value.length > 300)
    {
        strErrMsg += "建議事項";
    }

    if (strErrMsg != "")
    {
        strErrMsg = "下列欄位長度過長(超過300)，請決定是否仍要產出報表，若仍要產出，將使用......取代超出的部份。\n" + strErrMsg;
        bRtnbool = window.confirm(strErrMsg);
    }
    else
        bRtnbool = true;//代表準許SubMit

    if (bRtnbool && strErrMsg != "")
    {
        if (document.all["txPlanCondition"].value.length > 300)
            document.all["txPlanCondition"].value = document.all["txPlanCondition"].value.substring(0, 294) + "......";
        if (document.all["txPlanAttach"].value.length > 300)
            document.all["txPlanAttach"].value = document.all["txPlanAttach"].value.substring(0, 294) + "......";
        if (document.all["txPlanRecommand"].value.length > 300)
            document.all["txPlanRecommand"].value = document.all["txPlanRecommand"].value.substring(0, 294) + "......";
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
        //1060331 Zen 1050087 二代公文修改        //document.all["txPlanNo"].focus();
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
        document.all["txPlanNo"].focus();
    }
}
//0980617 新增日期檢查函式
function Check_DATE(obj, focus_obj)
{
    if (obj.value != "")
    {
        obj.value = jf_PADL(obj.value, 7, "0");
        if (!jf_CheckCDATE(obj.value))
        {
            alert("輸入的日期格式錯誤，請重新輸入。");
            obj.focus();
            Page_BlockSubmit = true;
        }
        else
        {
            if (focus_obj != null)
            {
                focus_obj.focus();
            }
        }
    }
}
