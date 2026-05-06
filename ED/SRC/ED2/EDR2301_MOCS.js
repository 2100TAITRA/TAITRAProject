/*
DATE	SA		PRG		MGR_NO	DESC
1111202 kevin	kevin	1110835	新增EDR2301
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
var strTableFields = new Array("_hlLink", "_lbRead1", "_lbRead2");


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
    var xObjectName = e.target.id;

    var pNo = xObjectName.substring(8, xObjectName.indexOf("_btView"));

    var btView;
    if (xObjectName.indexOf("_btView") != "-1")
    {
        pNo = xObjectName.substring(8, xObjectName.indexOf("_btView"));

        if (document.all["dg1__ctl" + pNo + "_btView"] != null)
        {
            btView = document.all["dg1__ctl" + pNo + "_btView"].id;
        }
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
        case btView:
            Page_BlockSubmit = true;
            var strUrl = "../EDLIB/View.htm?MainName=" + "dg1__ctl" + pNo + "_txReplyContent";
            jf_OpenChildWin(strUrl, "View", 800, 600);
            break;
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/
function jf_ToolBarHandle(event)
{
    var xObjectName;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btPreview":
            Page_BlockSubmit = !jf_ConfirmPrint();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/

//組出回傳值
function ReturnValue(argLink)
{
    /*
	try
	{
	    opener.document.all.lbReturnValue.length = 1;
	    opener.document.all.lbReturnValue.options[0].value = argLink;
	    opener.window.CallBack("EDR2301");
	    close();
	}
	catch (e) {}
	*/
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/

function jf_ConfirmPrint()
{
    var bRtnbool = true;
    var strErrMsg = "";

    bRtnbool = dlDept_Text_onblur();

    if (document.all.txRcvDateS.value == "" && document.all.txRcvDateE.value == "")
    {
        if (document.all.txCloseDateS.value == "" && document.all.txCloseDateE.value == "")
        {
            if (document.all.txDocNoS.value == "" && document.all.txDocNoE.value == "") {
                jf_ShowMeg("欄位不可皆為空白。", "");
                $('#txRcvDateS').focus();
                return false;
            }
        }
    }

    if (!jf_CheckMonth("txRcvDateS"))
        return false;
    if (!jf_CheckMonth("txRcvDateE"))
        return false;

    if (!jf_CheckMonth("txCloseDateS"))
        return false;
    if (!jf_CheckMonth("txCloseDateE"))
        return false;

    return bRtnbool;
}

//列印月份欄位Onblur時，自動補0以及檢查列印月份欄位是否符合格式
function jf_CheckMonth(argDate)
{
    var bCheckD = true;
    var strDate = jf_Trim(document.all[argDate].value);
    if (strDate != "")
    {
        if (strDate.length < 7)
        {
            strDate = jf_PADL(strDate, 7, "0");
            document.all[argDate].value = strDate;
        }
        if (!jf_CheckCDATE(strDate))
        {
            document.all[argDate].value = "";
            $('#' + argDate).focus();
            bCheckD = false;
            alert("輸入的日期格式錯誤，請重新輸入");
        }
    }
    return bCheckD;
}

function ComboBoxCheck(argComboBoxID, argKeyMsg) {
    var bRtnBool = false;
    var ComboBoxObj = document.all[argComboBoxID];
    var ComboBoxTextObj = document.all[argComboBoxID + "_Text"];

    var i, j;
    if (ComboBoxObj == null || ComboBoxTextObj == null) {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["[" + argComboBoxID + "]下拉選單不存在"])), "");
        return bRtnBool;
    }

    for (i = 0; i < ComboBoxObj.options.length; i++) {
        if (ComboBoxTextObj.value == ComboBoxObj.options[i].text) {
            bRtnBool = true;
            break;
        }
    }

    if (!bRtnBool) {
        $('#' + argComboBoxID + "_Text").focus();
        ComboBoxTextObj.select();
    }
    return bRtnBool;
}

//ComboBox 處理
function dlDept_Text_onblur() {
    var bCheckOK = true;
    if (dlDept.value == "") {
        document.all["dlDept_Text"].value = "";
        document.all["H_Dept"].value = "";
        document.all["H_Dept_Value"].value = "";
        return true;
    }
    if (jf_Trim(document.all["dlDept_Text"].value) != "" && document.all["dlDept_Text"].value != document.all["H_Dept"].value || (document.all["dlDept_Text"].value == document.all["H_Dept"].value)) {
        if (ComboBoxCheck("dlDept", "承辦單位")) {
            document.all["H_Dept"].value = document.all["dlDept_Text"].value;
            document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
        }
        else {
            document.all["dlDept_Text"].value = "";
            document.all["H_Dept"].value = "";
            alert("承辦單位不存在");
            return false;
        }
    }
    return bCheckOK;
}