/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 程式修改歷程 
 * -------------------------------------------------------------------------------------------------
 * 日期			修改人	單號	概要
 * -------------------------------------------------------------------------------------------------
 * 1060726		Kevin_C	1050087	升二代
 * 1090922      Zen     1090666 將報選選項由CheckBox改為RedioButton以產出指定報表 * 1100204      Zen     1090927 取消使用document.activeElement
 * 1100726      Zen     1100429 (高雄大學)新增匯出Excel功能
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

//1060726	Kevin_C	1050087	升二代
//if(document.all.tbTool)
//document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

InitObj();

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1060726	Kevin_C	1050087	升二代
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1100204 Zen 1090927 取消使用document.activeElement//function ClientButtonControl()
function ClientButtonControl(event)
{
    //1100204 Zen 1090927 取消使用document.activeElement    //var xObjectName = document.activeElement.id;
    var xObjectName = event.target.id;

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
//1060726	Kevin_C	1050087	升二代
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

    //1060726	Kevin_C	1050087	升二代
    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btClean":
            Page_BlockSubmit = true;
            jf_ConfirmClean(true);
            //1060726	Kevin_C	1050087	升二代
            //document.all["txPlanNo"].focus();
            $('txPlanNo').focus();
            InitObj();
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_CheckBeforSave();
            //1060726	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
        //1100726 Zen 1100429 (高雄大學)新增匯出Excel功能        case "btExcel":
            Page_BlockSubmit = !jf_CheckBeforSave();
            //1060726	Kevin_C	1050087	升二代
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//儲存前檢查
/*function jf_ConfirmSave()
{
    var bRtnbool = false;
	
    if (jf_CheckBeforSave())
    {
        // 新增模式需檢查鍵值是否已存在
        if (jf_GetActionMode()==LayoutModeNew)
        {
            if(jf_CheckDataExist(""))//檢查鍵值是否已存在
            {
                if ( window.confirm(jf_GetErrMsg(KeyExist)) )//提醒是否覆蓋存檔
                    bRtnbool = true;
            }
            else
                bRtnbool = true;
        }
        else
            bRtnbool = true;
    }
    	
    return bRtnbool;
}*/

//儲存前之欄位檢查
function jf_CheckBeforSave()
{
    var bRtnbool = true;
    var strErrMsg = "";

    /*if (document.all["txKeyFld"].value == "")
    {
        strErrMsg += "鍵值欄位不可空白\n";
        document.all["txKeyFld"].focus();
    }*/

    if (document.all["txPlanNo"].value == "")
    {
        strErrMsg += "清理批號不可空白\n";
        //1060726	Kevin_C	1050087	升二代
        //document.all["txPlanNo"].focus();
        $('txPlanNo').focus();
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
        //1060726	Kevin_C	1050087	升二代
        //document.all["txPlanNo"].focus();
        $('txPlanNo').focus();
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
function InitObj()
{
    document.all["cbUpdateStatus"].checked = true;
    //1090922 Zen 1090666 將報選選項由CheckBox改為RedioButton以產出指定報表
    //document.all["cb1"].checked = true;
    //document.all["cb2"].checked = true;
    document.all["rb1"].checked = true;

}
//檢核該清理批號是否存在
function CheckPlanNo()
{
    if (!jf_CheckDataExist("") && jf_Trim(document.all["txPlanNo"].value) != "")
    {
        Page_BlockSubmit = false;
        alert("此清理批號不存在");
        document.all["txPlanNo"].value = "";
        //1060726	Kevin_C	1050087	升二代
        //document.all["txPlanNo"].focus();
        $('txPlanNo').focus();
    }
}
