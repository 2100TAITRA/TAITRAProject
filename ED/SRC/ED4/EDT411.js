/*
DATE 	SA		PRG		MGR_NO		DESC
1050823 David	Zen     1050087     二代公文修改
1051019 Leslie  Kenny   1050087     二代公文修改
1070830 Kevin   Justin  1070678     弱掃AJAX修改
1110103	Kevin   Zen     1101292     修正多次點擊重複PostBack之問題
1140725 Zen     Zen     1140808     支援由MP開啟列管後自動關閉
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

//1050823 Zen 1050087 二代公文修改
//if(document.all.tbTool)
//	document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

//1070830 Justin [1070678]弱掃AJAX修改
AjaxPro.Request.prototype.timeout = function ()
{
    try
    {
        this.duration = new Date().getTime() - this.__start;
        var r = this.onTimeout(this.duration, this);
        if (typeof r == "undefined" || r != false)
        {
            this.abort();
        } else
        {
            this.timeoutTimer = setTimeout(this.timeout.bind(this), AjaxPro.timeoutPeriod);
        }
    }
    catch (error)
    {

    }
    finally
    {

    }
}
/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次

    //1140725 Zen 1140808 支援由MP開啟列管後自動關閉
    if (document.all['H_WinClose'] && document.all['H_WinClose'].value == 'Y')
        parent.$('#simplemodal-container a.simplemodal-close').trigger('click');
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051019   Kenny   [1050087]   二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051019   Kenny   [1050087]   二代公文修改
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case "btAuditDate":
            Page_BlockSubmit = true;
            jf_CallCalendar(document.all["txAuditDate"], event.screenX, event.screenY);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1050823 Zen 1050087 二代公文修改
//function jf_ToolBarHandle()
function jf_ToolBarHandle(event)
{
    var xObjectName;
    var evBtn;

    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題
    if (IsServerHandling)
    {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    //1050823 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1050823 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            if (jf_ConfirmSave()) //是否通過儲存前必要檢查
            {
                IsServerHandling = true;
                jf_ShowWaitState();
                Page_BlockSubmit = false;
            }
            else
                Page_BlockSubmit = true;
            //1050823 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1050823 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1050823 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
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
    if (!CheckDATE("txAuditDate", "列管日期"))
    {
        bRtnbool = false;
        //1050823 Zen 1050087 二代公文修改
        //document.all["txAuditDate"].focus();
        $('#txAuditDate').focus();
        return bRtnbool;
    }
    if (!CheckDocNO())
    {
        bRtnbool = false;
        return bRtnbool;
    }
    if (document.all["txDocNo"].value == "")
    {
        strErrMsg += "公文文號不可空白\n";
        //1050823 Zen 1050087 二代公文修改
        //document.all["txDocNo"].focus();
        $('#txDocNo').focus();
    }
    if (document.all["txAuditDate"].value == "")
    {
        strErrMsg += "列管日期不可空白\n";
        //1050823 Zen 1050087 二代公文修改
        //document.all["txAuditDate"].focus();
        $('#txAuditDate').focus();
    }
    if (document.all["dlAuditReason"].selectedIndex == 0)
    {
        strErrMsg += "需選擇列管原因\n";
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

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
var bHasCheck = false;
function CheckDATE(argObj, strMsg)
{
    if (bHasCheck)
    {
        bHasCheck = false;
        return;
    }
    bHasCheck = true;
    var strDate = document.all[argObj].value;
    if (strDate != "")
    {
        if (strDate.length < 7)
        {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate))
        {
            //1050823 Zen 1050087 二代公文修改
            //document.all[argObj].focus();
            $('#' + argObj).focus();
            if (strMsg)
                jf_ShowMsg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            bHasCheck = false;
            return false;
        }
    }
    bHasCheck = false;
    return true;
}
var bHasCheckDoc = false;
function CheckDocNO()
{
    if (document.all["txDocNo"].value != "")
    {
        if (bHasCheckDoc)
        {
            bHasCheckDoc = false;
            return true;
        }
        bHasCheckDoc = true;
        //1070830 Justin [1070678]弱掃AJAX修改
        //var IsDocExist=EDT411.CheckDoc(document.all["txDocNo"].value,document.all["txSourceOrgno"].value)
        var IsDocExist = ED4.EDT411.CheckDoc(document.all["txDocNo"].value, document.all["txSourceOrgno"].value);
        if (IsDocExist.value == "false")
        {
            alert('輸入公文不存在');
            document.all["txDocNo"].value = "";
            //1050823 Zen 1050087 二代公文修改
            //document.all["txDocNo"].focus();
            $('#txDocNo').focus();
            bHasCheckDoc = false;
            return false;
        }
    }
    bHasCheckDoc = false;
    return true;
}

