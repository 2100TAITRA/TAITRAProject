/*
1020110		Leslie	1011102		於檢核是否選取免歸核決者時，增加Trim()以正確判斷空值
1020322		Cloud	1020171		因彰師大希望加大EDI260的DATAGRID大小，並配合修改開啟時的子視窗大小
1070917     David   1050087     二代升級
1110103     Zen     1101292     修正多次點擊重複PostBack之問題
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
var strTableFields = new Array("_lbRead", "_txInput1", "_txInput2");

//1070917 Zen 1050087 二代升級
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;
//if(document.all.dg1)
//	document.all.tbSelect.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1070917 Zen 1050087 二代升級
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "ws_GetKeyName", false, null); //使用WebService前必須先呼叫一次
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1070917 Zen 1050087 二代升級
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1070917 Zen 1050087 二代升級
    //var xObjectName = document.activeElement.id;
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btHelp"));
    var btHelp;

    //取得確實按下的是哪個？鍵
    if (document.all["dg1__ctl" + pNo + "_btFLD_TYPE"] != null)
    {
        btHelp = document.all["dg1__ctl" + pNo + "_btHelp"].id;
        CurrOrgIdObj = document.all["dg1__ctl" + pNo + "_txInput1"];
    }

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
        case btHelp:
            /*
			Page_BlockSubmit=true;
			strUrl = "SIC010.aspx?Search=" + CurrOrgIdObj.value;
			jf_OpenChildWin(strUrl, "SIC010", 700, 500 );
			*/
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
//1070917 Zen 1050087 二代升級
//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
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

    //1070917 Zen 1050087 二代升級
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    switch (xObjectName)
    {
        case "btOpen":
            Page_BlockSubmit = !jf_CheckKeyObject();
            //1070917 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSave":
            //			if(jf_ConfirmSave()) //是否通過儲存前必要檢查
            IsServerHandling = true;
            jf_ShowWaitState();
            Page_BlockSubmit = false;
            //1070917 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btSend":
            Page_BlockSubmit = !jf_ConfirmSend();
            //1070917 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btAddColumn":
            Page_BlockSubmit = false;
            //1070917 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btMark":
            Page_BlockSubmit = !jf_ConfirmMark();//是否通過註紀免歸前必要檢查
            //1070917 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1070917 Zen 1050087 二代升級
        //case "btDelete":
        //    Page_BlockSubmit = !jf_ConfirmDelete();
        //    jf_ToolBarSubmit();
        //    break;
        case "btCancel":
            Page_BlockSubmit = !jf_ConfirmCancel();
            //1070917 Zen 1050087 二代升級
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        //1070917 Zen 1050087 二代升級
        //case "btClean":
        //    Page_BlockSubmit = true;
        //    jf_ConfirmClean(true);
        //    document.all["txKeyFld"].focus();
        //    break;
        case "btSearch":
            //1070917 Zen 1050087 二代升級
            Page_BlockSubmit = true;
            var strUrl = "";
            //var strKeyCol = jf_Trim(document.all["txKeyFld"].value);
            //var strMainTableCol1 = jf_Trim(document.all["txRequireFld"].value);
            //var strMainTableCol2 = jf_Trim(document.all["txNormalFld"].value);
            //var strMainTableCol3 = escape(jf_Trim(document.all["txReadOnly"].value));
            strUrl = "EDI260.aspx?rtnObj=lbReturnValue";
            //1020322		Cloud	1020171		因彰師大希望加大EDI260的DATAGRID大小，並配合修改開啟時的子視窗大小
            //jf_OpenChildWin(strUrl, "EDI260", 700, 500 );
            jf_OpenChildWin(strUrl, "EDI260", 1024, 768);
            break;
        //1070917 Zen 1050087 二代升級
        //case "btPrint":
        //    Page_BlockSubmit = !jf_ConfirmPrint();
        //    jf_ToolBarSubmit();
        //    break;
        //case "btPreview":
        //    Page_BlockSubmit = !jf_ConfirmPreview();
        //    jf_ToolBarSubmit();
        //    break;
        //    //以下屬於DataGrid ToolBar
        //case "btSelectAll":
        //    Page_BlockSubmit = true;
        //    jf_SelectAll("dg1", "_cbSelect");
        //    break;
        //case "btSelectInverse":
        //    Page_BlockSubmit = true;
        //    jf_SelectInverse("dg1", "_cbSelect");
        //    break;
        //case "btSelectClear":
        //    Page_BlockSubmit = true;
        //    jf_SelectClear("dg1", "_cbSelect");
        //    break;
        //case "btDeleteSelected":
        //    Page_BlockSubmit = !jf_DeleteSelected("dg1", "_cbSelect", strTableFields);
        //    jf_SelectBarSubmit();
        //    break;
        //case "btUp":
        //    Page_BlockSubmit = true;
        //    jf_RowUp("dg1", "_cbSelect", strTableFields);
        //    break;
        //case "btDown":
        //    Page_BlockSubmit = true;
        //    jf_RowDown("dg1", "_cbSelect", strTableFields);
        //    break;
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
        //1070917 Zen 1050087 二代升級
        //document.all["txKeyFld"].focus();
        $('#txKeyFld').focus();
    }

    if (document.all["txRequireFld"].value == "")
    {
        strErrMsg += "必要欄位不可空白\n";
        //1070917 Zen 1050087 二代升級
        //document.all["txRequireFld"].focus();
        $('#txRequireFld').focus();
    }

    if (!jf_CheckBlankAndAlert())
        bRtnbool = false;

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

function jf_ConfirmMark()
{
    var bRtnbool = false;
    var strErrMsg = "";

    if (document.all["dlAppUser"].value == "")
    {
        strErrMsg += "免歸檔核決者不可空白\n";
        //1070917 Zen 1050087 二代升級
        //document.all["dlAppUser"].focus();
        $('#dlAppUser').focus();
    }
    else
        bRtnbool = true;

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}

function jf_ConfirmSend()
{
    var bRtnbool = false;
    var strErrMsg = "";

    //1020110	Leslie[1011102]	於檢核是否選取免歸核決者時，增加Trim()以正確判斷空值
    //if (document.all["dlAppUser"].value != "")
    if (jf_Trim(document.all["dlAppUser"].value).replace(/　/g, "") != "")
    {
        strErrMsg += "歸檔時，不可選取免歸核決者\n";
        try
        {
            //1070917 Zen 1050087 二代升級
            //document.all["dlAppUser"].focus();
            $('#dlAppUser').focus();
        }
        catch (e) { }
    }
    else
        bRtnbool = true;

    if (!jf_CheckBlankAndAlert())
        bRtnbool = false;

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }

    return bRtnbool;
}
//檢查DataGrid資料列是否填完整
function jf_CheckBlankAndAlert()
{
    var InValidName = "";
    var InValidControlName = "";
    var IsNoAttach = true;

    for (var i = 2; i <= document.all.dg1.rows.length; i++)
    {
        //附件名稱不為空白時
        if (document.all["dg1__ctl" + i + "_tbDESC"].value != "")
        {
            //dlAttSource不可空白
            if (document.all["dg1__ctl" + i + "_dlAttSource"].value == "")
            {
                InValidName += ",附件來源不可空白";
                if (InValidControlName == "")
                    InValidControlName = "dg1__ctl" + i + "_dlAttSource";
            }
            //dlREM不可空白
            if (document.all["dg1__ctl" + i + "_dlREM"].value == "")
            {
                InValidName += ",媒體型式不可空白";
                if (InValidControlName == "")
                    InValidControlName = "dg1__ctl" + i + "_dlREM";
            }
            //tbCNT不可空白
            if (document.all["dg1__ctl" + i + "_tbCNT"].value == "")
            {
                InValidName += ",數量不可空白";
                if (InValidControlName == "")
                    InValidControlName = "dg1__ctl" + i + "_tbCNT";
            }
            //dlUNIT不可空白
            if (document.all["dg1__ctl" + i + "_dlUNIT"].value == "")
            {
                InValidName += ",計量單位不可空白";
                if (InValidControlName == "")
                    InValidControlName = "dg1__ctl" + i + "_dlUNIT";
            }

            if (InValidName != "")
            {
                InValidName = InValidName.substr(1, InValidName.length);
                //1070917 Zen 1050087 二代升級
                //jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].innerText + "之列中," + InValidName])), "");
                jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["序" + document.all["dg1__ctl" + i + "_lbSEQ_NO"].textContent + "之列中," + InValidName])), "");
                //1070917 Zen 1050087 二代升級
                //document.all[InValidControlName].focus();
                $('#' + InValidControlName).focus();
                return false;
            }
            IsNoAttach = false;
        }
    }
    //alert(IsNoAttach);
    //alert(document.all["cbNoAttAch"].checked);
    if (IsNoAttach && !document.all["cbNoAttAch"].checked)
    {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["未輸入附件，不可歸檔。\n若無紙本附件，請勾選[無紙本附件]。"])), "");
        return false;
    }
    return true;
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
    if (argCallerId == "EDI260")
    {
        document.all["txDocNo"].value = jf_Trim(document.all.lbReturnValue.options[0].value);
        //document.all["txRequireFld"].value = jf_Trim(document.all.lbReturnValue.options[1].value);
        //document.all["txNormalFld"].value = jf_Trim(document.all.lbReturnValue.options[2].value);
        //document.all["txReadOnly"].value = jf_Trim(document.all.lbReturnValue.options[3].value);
        if (document.all["txDocNo"].value != "")
        {
            Page_BlockSubmit = false;
            jf_OpenButtonSubmit();
        }
        //1070917 Zen 1050087 二代升級
        //document.all["txDocNo"].focus();
        $('#txDocNo').focus();
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
function cbNoAttAch_onclick()
{
    var IsNoAttach = true;
    if (document.all["cbNoAttAch"].checked)
    {
        for (var i = 2; i <= document.all.dg1.rows.length; i++)
        {
            //附件名稱不為空白時
            if (document.all["dg1__ctl" + i + "_tbDESC"].value != "")
            {
                IsNoAttach = false;
                break;
            }
        }
        if (!IsNoAttach)
            alert("目前已有輸入附件，若勾選[無紙本附件]，儲存時，將會清除所有附件資訊!!");
    }
}