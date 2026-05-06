/*
DATE		SA		PRG		MGR_NO	DESC
1031112	    Leslie	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
1050815     Kevin   Zen     1050700 XSS修正
1060614     Cloud   Zen     1050087 二代升級1110103     Kevin   Zen     1101292 修正多次點擊重複PostBack之問題
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
var wsGetDocNoID;

//指定DataGrid欄位
var strTableFields = new Array("_lbDocNo", "_txTitle", "_lbScanNo");

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
    //1060614 Zen 1050087 二代升級    //jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, null);
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

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null)
    {
        btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
    }    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題    if (IsServerHandling)    {        Page_BlockSubmit = true;        return;    }

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName)
    {
        case btHelp:
            /*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
            break;
        case "btSearch2":
            Page_BlockSubmit = true;
            btCheckField();
            break;
        case "btConfirm":
            Page_BlockSubmit = true;
            btConfirmProc();
            break;
        case "txDocNo":
            Page_BlockSubmit = true;
            break;
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
    var evBtn;    //1110103 Zen 1101292 修正多次點擊重複PostBack之問題    if (IsServerHandling)    {        Page_BlockSubmit = true;        return;    }

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
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1060614 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btGroup":
            Page_BlockSubmit = jf_CheckBlankAndAlert();
            jf_SaveDgData();
            //1060614 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            Page_BlockSubmit = jf_CheckBlankAndAlert();
            //1060614 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btDelete":
            Page_BlockSubmit = !jf_ConfirmDelete();
            //1060614 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1060614 Zen 1050087 二代升級            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            //1060614 Zen 1050087 二代升級            Page_BlockSubmit = true;
            if (jf_ConfirmClean(true))
                CleanForm();
            break;
        case "btSearch":
            var strUrl = "";
            var strWScanNo = jf_Trim(document.all["txScanNo"].value);
            var strReturnType = "S";
            if (strWScanNo != null)
                strUrl = "EAC290.aspx?rtnObj=lbReturnValue&argWScanNo=" + strWScanNo + "&argReturnType=" + strReturnType;
            else
                strUrl = "EAC290.aspx?rtnObj=lbReturnValue&argReturnType=" + strReturnType;
            //1060614 Zen 1050087 二代升級            //jf_OpenChildWin(strUrl, "EAC290", 700, 500);
            jf_OpenChildWin(strUrl, "EAC290", 800, 600);
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
        case "btSelectClear":
            Page_BlockSubmit = true;
            jf_SelectClear("dg1", "_cbSelect");
            break;
        case "btDeleteSelected":
            Page_BlockSubmit = !CheckBeforeDeleteSelected("dg1", "_cbSelect");
            //1060614 Zen 1050087 二代升級            //jf_SelectBarSubmit();
            jf_SelectBarSubmit(xObjectName);
            break;
        case "btUp":
            Page_BlockSubmit = true;
            jf_RowUp("dg1", "_cbSelect", strTableFields);
            break;
        case "btDown":
            Page_BlockSubmit = true;
            jf_RowDown("dg1", "_cbSelect", strTableFields);
            break;
    }
}

/********** 以下為按下儲存鍵後相關處理 **********/
//檢查DataGrid資料列是否至少有一筆資料
function jf_CheckBlankAndAlert()
{
    var InValidName = "";
    var InValidControlName = "";
    var strErrMsg = "";

    for (var i = 2; i <= 2; i++)
    {
        //1060614 Zen 1050087 二代升級        //if (document.getElementById("dg1__ctl" + i + "_lbDocNO").innerText == "")
        if (document.getElementById("dg1__ctl" + i + "_lbDocNo").textContent == "")
        {
            strErrMsg += "至少要輸入一筆明細資料\n";
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
            return true;
        }
        else
            return false;
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
    //1060614 Zen 1050087 二代升級，避免二代程式中斷    if (argResult.value.RtnField0 != null)        var argScanNo = jf_Trim(argResult.value.RtnField0[0]);
    var RowCount = document.all["dg1"].rows.length + 1;
    var argDocNo = jf_Trim(document.all["txDocNo"].value);
    //webserver回傳後動作
    if (argResult.id != null)
    {
        if (jf_IsWebServiceSuccess1(argResult))
        {
            var strMsg = "文號" + argDocNo + "已成批，是否要繼續?";
            var ret = window.confirm(strMsg);
            if (ret == true)
            {
                document.all["txhidden2"].value = argScanNo;
                //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
                IsServerHandling = true;
                //1060614 Zen 1050087 二代升級，避免無法postback                Page_BlockSubmit = false;                __doPostBack('txhidden2', '');
            }
            else
                document.all["txDocNo"].select();
        }
        else
        {
            document.all["txhidden2"].value = "1";
            //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
            IsServerHandling = true;
            //1060614 Zen 1050087 二代升級，避免無法postback            Page_BlockSubmit = false;
            __doPostBack('txhidden2', '');
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
    if (argCallerId == "EAC290")
    {
        document.all["txScanNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
        if (document.all["txScanNo"].value != "")
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
        //1060614 Zen 1050087 二代升級        //document.all["txScanNo"].focus();
        $('#txScanNo').focus();
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
function CheckBeforeDeleteSelected(argTableName, argCheckBoxName)
{
    if (document.all[argTableName] == null)
        return false;

    //至少要勾選一筆才return true
    for (iRow = 2; iRow < document.all[argTableName].rows.length + 1; iRow++)
    {
        if (document.all[argTableName + "__ctl" + iRow + argCheckBoxName].checked)
            return true;
    }
    return false;
}


function txDocNo_onblur()
{
    //1050815 Zen 1050700 XSS修正--begin
    //var strSource = document.all["txhidden1"].value;
    //var strDocNo = jf_Trim(document.all["txDocNo"].value);
    var strSource = encodeURI(document.all["txhidden1"].value);
    var strDocNo = encodeURI(jf_Trim(document.all["txDocNo"].value));
    //1050815 Zen 1050700 XSS修正--end

    if (strDocNo != "")
    {
        if (document.all["cbAdd"].checked == true)
        {
            var arKeyName = new Array("SOURCE_ORGNO", "DOC_NO");
            var arKeyValue = new Array(strSource, strDocNo);
            var arRtnFldName = new Array("WSCAN_NO");
            var arOrdFldName = new Array("WSCAN_NO DESC");

            var argWSParam = new Array(5);
            argWSParam[0] = "WSCAN_DETAIL";
            argWSParam[1] = arKeyName;
            argWSParam[2] = arKeyValue;
            argWSParam[3] = arRtnFldName;
            argWSParam[4] = arOrdFldName;

            if (CheckDocNoExist(strDocNo) == false)
            {
                var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, argWSParam);
                OnWSResult(callObj);
            }
        }

    }
}

/*檢查文號是否已存在*/
function CheckDocNoExist(strDocNo)
{
    if (document.all.dg1.rows.length == 0)
        return false;
    if (document.all.dg1 == null)
        return false;
    for (var RowCount = 2 ; RowCount < document.all.dg1.rows.length + 1; RowCount++)
    {
        //1060614 Zen 1050087 二代升級        //if (document.all["dg1__ctl" + RowCount + "_lbDocNo"].innerText == strDocNo)
        if (document.all["dg1__ctl" + RowCount + "_lbDocNo"].textContent == strDocNo)
        {
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["文號：" + strDocNo + "已存在於捲動區中，不允許再加入"])), "");
            return true;
        }
    }
    return false;
}
/*確認鍵*/
function btConfirmProc()
{
    //1050815 Zen 1050700 XSS修正--begin
    //var strSource = document.all["txhidden1"].value;
    //var strDocNo = jf_Trim(document.all["txDocNo"].value);
    var strSource = encodeURI(document.all["txhidden1"].value);
    var strDocNo = encodeURI(jf_Trim(document.all["txDocNo"].value));
    //1050815 Zen 1050700 XSS修正--end

    if (strDocNo != "")
    {
        if (document.all["cbAdd"].checked == false)
        {
            var arKeyName = new Array("SOURCE_ORGNO", "DOC_NO");
            var arKeyValue = new Array(strSource, strDocNo);
            var arRtnFldName = new Array("WSCAN_NO");
            var arOrdFldName = new Array("");

            var argWSParam = new Array(5);
            argWSParam[0] = "WSCAN_DETAIL";
            argWSParam[1] = arKeyName;
            argWSParam[2] = arKeyValue;
            argWSParam[3] = arRtnFldName;
            argWSParam[4] = arOrdFldName;

            if (CheckDocNoExist(strDocNo) == false)
            {
                //1060614 Zen 1050087 二代升級                //var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "GetFieldValue", false, argWSParam);
                var callObj = jf_CallWS("../EALIB/EA_LIB.asmx", "ws_GetFieldValue", false, argWSParam);
                OnWSResult(callObj);
            }
        }

    }
}

function jf_IsWebServiceSuccess1(argResult)
{
    if (argResult.error)
    {
        return false;
    }
    else
    {
        obj = argResult.value;
        if (!obj.m_bSuccess)
        {
            return false;
        }
    }
    return true;

}
/*檢查至少輸入一個查詢條件*/
function btCheckField()
{
    if ((jf_Trim(document.all["txAcpNoBegin"].value) == "") && (jf_Trim(document.all["txAcpNoEnd"].value) == "") &&
	(jf_Trim(document.all["txFileDateBegin"].value) == "") && (jf_Trim(document.all["txFileDateEnd"].value) == "") &&
	(jf_Trim(document.all["txInpfileDateBegin"].value) == "") && (jf_Trim(document.all["txInpfileDateEnd"].value) == "") &&
	(jf_Trim(document.all["txYear"].value) == "") && (jf_Trim(document.all["txCls"].value) == "") &&
	(jf_Trim(document.all["txCase"].value) == "") && (jf_Trim(document.all["txVol"].value) == "") &&
	(jf_Trim(document.all["txSeq"].value) == "") && (jf_Trim(document.all["ddlUnit"].value) == ""))
    {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請至少輸入一項查詢條件"])), "");
    }
    else
    {
        Page_BlockSubmit = false;
        //1060614 Zen 1050087 二代升級        IsServerHandling = true;        __doPostBack('btSearch2', '');
    }    
}

function CleanForm()
{
    //1060614 Zen 1050087 二代升級--begin    //document.all["lbLastInsertValue"].innerText = "";
    //document.all["lbStatus2"].innerText = "";
    document.all["lbLastInsertValue"].textContent = "";
    document.all["lbStatus2"].textContent = "";
    //1060614 Zen 1050087 二代升級--end    document.all["cbAdd"].checked = true;
    document.all["cbList"].checked = true;
    document.all["cbClean"].checked = true;

    for (var RowCount = 2 ; RowCount < document.all.dg1.rows.length + 1; RowCount++)
    {
        //1060614 Zen 1050087 二代升級--begin        //document.all["dg1__ctl" + RowCount + "_lbDocNo"].innerText = "";
        //document.all["dg1__ctl" + RowCount + "_txTitle"].Text = "";
        //document.all["dg1__ctl" + RowCount + "_lbScanNo"].innerText = "";
        document.all["dg1__ctl" + RowCount + "_lbDocNo"].textContent = "";
        document.all["dg1__ctl" + RowCount + "_txTitle"].value = "";
        document.all["dg1__ctl" + RowCount + "_lbScanNo"].textContent = "";
        //1060614 Zen 1050087 二代升級--end    }
    document.all["txhidden4"].value = "1";
}

function jf_SaveDgData()
{
    var dgdata = "";
    var split = "";
    for (var i = 2; i < document.all.dg1.rows.length + 1; i++)
    {
        //1060614 Zen 1050087 二代升級        //if (document.all["dg1__ctl" + i + "_lbDocNo"].innerText != "")
        if (document.all["dg1__ctl" + i + "_lbDocNo"].textContent != "")
        {
            //1060614 Zen 1050087 二代升級            //dgdata += split + document.all["dg1__ctl" + i + "_lbDocNo"].innerText;
            dgdata += split + document.all["dg1__ctl" + i + "_lbDocNo"].textContent;
            split = "*";
            document.all["txhidden5"].value = dgdata;
        }
    }
}
