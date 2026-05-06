/*
DATE		SA		PRG		MGR_NO	DESC
1031112	    Leslie	Kevin_C	1020726	於__doPostBack前加上IsServerHandling=true,避免重複執行
1060615     Kevin_C Zen     1050087 二代升級*/
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
var strTableFields = new Array("_lbWscanNo", "_lbNowState", "_lbUpdateDate", "_lbUpdateUser");

//1060616 Zen 1050087 二代升級//if (document.all.tbTool)
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
//1060616 Zen 1050087 二代升級//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1060616 Zen 1050087 二代升級    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null)
    {
        btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
    }

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
        case btHelp:
            /*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
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
//1060616 Zen 1050087 二代升級//function jf_ToolBarHandle()
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

    //1060616 Zen 1050087 二代升級    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btSave":
            //1060616 Zen 1050087 二代升級            Page_BlockSubmit = true;

            if (jf_CheckBlankAndAlert() == false)
            {
                Page_BlockSubmit = false;
                //1060616 Zen 1050087 二代升級                //jf_ToolBarSubmit();
                jf_ToolBarSubmit(xObjectName);
            }
            break;
        case "btSearch":
            //1060616 Zen 1050087 二代升級            Page_BlockSubmit = true;

            var strUrl = "";
            var strReturnType = "M";
            strUrl = "EAC290.aspx?rtnObj=lbReturnValue&argReturnType=" + strReturnType;
            //1060616 Zen 1050087 二代升級            //jf_OpenChildWin(strUrl, "EAC290", 700, 500);
            jf_OpenChildWin(strUrl, "EAC290", 800, 600);
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
            //1060616 Zen 1050087 二代升級            //jf_SelectBarSubmit();
            jf_SelectBarSubmit(xObjectName);
            break;
    }
}

/********** 以下為按下狀態更新鍵後相關處理 **********/
//狀態更新前檢查DataGrid資料列是否至少有一筆資料
function jf_CheckBlankAndAlert()
{
    var InValidName = "";
    var InValidControlName = "";
    var strErrMsg = "";

    for (var i = 2; i <= 2; i++)
    {
        //1060616 Zen 1050087 二代升級        //if (document.getElementById("dg1__ctl" + i + "_lbWscanNO").innerText == "")
        if (document.getElementById("dg1__ctl" + i + "_lbWscanNo").textContent == "")
        {
            strErrMsg = "至少要輸入一筆明細資料\n";
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
    if (argCallerId == "EAC290")
    {
        var RowCount = 0;
        for (var i = 2; i < document.all.dg1.rows.length + 1 ; i++)
        {
            //1060616 Zen 1050087 二代升級            //if (document.all["dg1__ctl" + i + "_lbWscanNo"].innerText == "")
            if (document.all["dg1__ctl" + i + "_lbWscanNo"].textContent == "")
            {
                RowCount = i;
                break;
            }
        }

        if (document.all.lbReturnValue.length > 0)
        {
            var strCommand = "'";
            for (var iCount = 0; iCount < document.all.lbReturnValue.length; iCount++)
            {
                if (document.all.lbReturnValue.options[iCount].value == document.all.lbReturnValue.options[document.all.lbReturnValue.length - 1].value)
                    strCommand += document.all.lbReturnValue.options[iCount].value + "'";
                else
                    strCommand += document.all.lbReturnValue.options[iCount].value + "', '";
            }
            document.all["txhidden3"].value = strCommand;
            Page_BlockSubmit = false;
            jf_AddWScanSubmit();
        }
        //1060616 Zen 1050087 二代升級        //document.all["txScanNo"].focus();
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

function txScanNo_onblur()
{
    var strScanNo = jf_Trim(document.all["txScanNo"].value);

    if (strScanNo != "")
    {
        if (document.all["cbAutoAdd"].checked == true)
        {
            if (CheckScanNoExist(strScanNo) == false)
            {
                document.all["txhidden"].value = "1";
                //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
                IsServerHandling = true;
                //1060616 Zen 1050087 二代升級                Page_BlockSubmit = false;
                __doPostBack('txhidden', '');
            }
        }
    }
}

//檢查待掃描號是否已存在
function CheckScanNoExist(strScanNo)
{
    if (document.all.dg1.rows.length == 0)
        return false;
    if (document.all.dg1 == null)
        return false;
    for (var RowCount = 2 ; RowCount < document.all.dg1.rows.length + 1; RowCount++)
    {
        //1060616 Zen 1050087 二代升級        //if (document.all["dg1__ctl" + RowCount + "_lbWscanNo"].innerText == strScanNo)
        if (document.all["dg1__ctl" + RowCount + "_lbWscanNo"].textContent == strScanNo)
        {
            jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["文號：" + strScanNo + "已存在於捲動區中，不允許再加入"])), "");
            return true;
        }
    }
    return false;
}

function btConfirmProc()
{
    var strScanNo = jf_Trim(document.all["txScanNo"].value);

    if (strScanNo != "")
    {
        if (document.all["cbAutoAdd"].checked == false)
        {
            if (CheckScanNoExist(strScanNo) == false)
            {
                document.all["txhidden"].value = "1";
                //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
                IsServerHandling = true;
                //1060616 Zen 1050087 二代升級                Page_BlockSubmit = false;
                __doPostBack('txhidden', '');
            }
        }

    }
}

function jf_AddWScanSubmit()
{
    document.all["txhidden2"].value = "1";
    //1031112    Kevin_C[1020726]   於__doPostBack前加上IsServerHandling=true;避免重複執行
    IsServerHandling = true;
    __doPostBack('txhidden2', '');
}