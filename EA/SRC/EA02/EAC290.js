/*
DATE	SA		PRG		MGR_NO			DESC
1060614 Cloud   Zen     1050087         二代升級
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

//指定DataGrid欄位
var strTableFields = new Array("_hlScanNo", "_lbNowState", "_lbUpdateDate", "_lbUpdateEmp");

//1060614 Zen 1050087 二代升級//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if (document.all.dg1)
//    document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1060614 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060614 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
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
        /*
		case "":
			break;
		*/
        //1060614 Zen 1050087 二代升級        //case "btCalendarBatchS":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all.txGrpDateS, event.screenX, event.screenY);
        //    break;
        //case "btCalendarBatchE":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all.txGrpDateE, event.screenX, event.screenY);
        //    break;
        //case "btCalendarUpdateS":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all.txUpdateS, event.screenX, event.screenY);
        //    break;
        //case "btCalendarUpdateE":
        //    Page_BlockSubmit = true;
        //    jf_CallCalendar(document.all.txUpdateE, event.screenX, event.screenY);
        //    break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1060614 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1060614 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSearch":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1060614 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPrint":
            Page_BlockSubmit = !jf_ConfirmPrint();
            //1060614 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPreview();
            //1060614 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;

            //以下屬於DataGrid ToolBar
        case "btSelectAll":
            Page_BlockSubmit = true;
            jf_SelectAll("dg1", "_cbSelect");
            break;
        case "btSelectInverse":
            Page_BlockSubmit = true;
            jf_SelectInverse("dg1", "_cbSelect");
            break;
        case "btSelectBack":
            ReturnBack();
            Page_BlockSubmit = false;
            //jf_ToolBarSubmit();
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
    //清空lbReturnValue物件
    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

//組出回傳值
function ReturnValue(arglbScanNo, arglbState, arglbDate, arglbUser)
{
    try
    {
        opener.document.all.lbReturnValue.length = 1;
        opener.document.all.lbReturnValue.options[0].value = arglbScanNo;
        opener.window.CallBack("EAC290");
        close();
    }
    catch (e) { }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function ReturnBack()
{
    var RowCount = 0;
    for (var i = 2; i < document.all.dg1.rows.length + 1 ; i++)
    {
        //1060614 Zen 1050087 二代升級        //if (document.all["dg1__ctl" + i + "_hlScanNo"].innerText == "")
        if (document.all["dg1__ctl" + i + "_hlScanNo"].textContent == "")
        {
            RowCount = i;
            break;
        }
    }

    var intCount = 0;
    for (var i = 2; i < document.all.dg1.rows.length + 1 ; i++)
    {
        if (document.all["dg1__ctl" + i + "_cbSelect"].checked)
        {
            opener.document.all.lbReturnValue.length = intCount + 1;
            //1060614 Zen 1050087 二代升級            //opener.document.all.lbReturnValue.options[intCount].value = document.all["dg1__ctl" + i + "_hlScanNo"].innerText;
            opener.document.all.lbReturnValue.options[intCount].value = document.all["dg1__ctl" + i + "_hlScanNo"].textContent;
            intCount++;
        }
    }
    if (intCount == 0)
    {
        alert("至少勾選一筆明細資料");
        IsServerHandling = false;
        return;
    }
    else
    {
        opener.window.CallBack("EAC290");
        close();
    }

}