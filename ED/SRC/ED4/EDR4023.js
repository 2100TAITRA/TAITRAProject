/*
DATE	SA		PRG		MGR_NO	DESC
1111206
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
    document.all["H_Dept"].value = document.all["dlDept_Text"].value;
    document.all["H_Sect"].value = document.all["dlSect_Text"].value;
    document.all["H_User"].value = document.all["dlUser_Text"].value;
    document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
    document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
    document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
    document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
    document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
    jf_HandleComboxStatus("dlSect");
    //jf_HandleComboxStatus("dlUser");
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e)
{
    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut())
    {
        Page_BlockSubmit = true;
        return;
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
    var evBtn;

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
            Page_BlockSubmit = !CheckBeforePreview();
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


//組出回傳值
function ReturnValue(argLink)
{
    try
    {
        opener.document.all.lbReturnValue.length = 1;
        opener.document.all.lbReturnValue.options[0].value = argLink;
        opener.window.CallBack("EDR4023");
        close();
    }
    catch (e) { }

}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function ComboBoxCheck(argComboBoxID, argKeyMsg)
{
    var bRtnBool = false;
    var ComboBoxObj = document.all[argComboBoxID];
    var ComboBoxTextObj = document.all[argComboBoxID + "_Text"];

    var i, j;
    if (ComboBoxObj == null || ComboBoxTextObj == null)
    {
        jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["[" + argComboBoxID + "]下拉選單不存在"])), "");
        return bRtnBool;
    }

    for (i = 0; i < ComboBoxObj.options.length; i++)
    {
        if (ComboBoxTextObj.value == ComboBoxObj.options[i].text)
        {
            bRtnBool = true;
            break;
        }
    }

    if (!bRtnBool)
    {
        $('#' + argComboBoxID + "_Text").focus();
        ComboBoxTextObj.select();
    }
    return bRtnBool;
}

//ComboBox 處理
var uDeptChecked = false;
function dlDept_Text_onblur(Mode, argIsCheckDone)
{
    if (uDeptChecked)
    {
        uDeptChecked = false;
        return;
    }
    if (argIsCheckDone == "true")
        uDeptChecked = true;
    var bCheckOK = true;
    if (jf_Trim(document.all["dlDept_Text"].value) != "" && document.all["dlDept_Text"].value != document.all["H_Dept"].value || (document.all["dlDept_Text"].value == document.all["H_Dept"].value && Mode == "NotInit"))
    {
        if (ComboBoxCheck("dlDept", "承辦單位"))
        {
            document.all["H_Dept"].value = document.all["dlDept_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
            document.all["dlSect_Container"].className = "custom-combobox";

            edjf_SetdlDept("dlDept", "dlSect", "dlUser", "", false, false);	//初始dlSect、dlUser的處理

            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            document.all["H_User"].value = document.all["dlUser_Text"].value;
            document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
            document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
            document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);

            document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
            //依選項多寡固定下拉式選單可見長度
            if (document.all["dlSect"].options.length > 10)
                document.all["dlSect"].size = 10;
            else if (document.all["dlSect"].options.length == 1)
                document.all["dlSect"].size = 2;
            else
                document.all["dlSect"].size = document.all["dlSect"].options.length;

            if (document.all["dlUser"].options.length > 10)
                document.all["dlUser"].size = 10;
            else if (document.all["dlUser"].options.length == 1)
                document.all["dlUser"].size = 2;
            else
                document.all["dlUser"].size = document.all["dlUser"].options.length;

            //無值不顯示
            jf_HandleComboxStatus("dlSect");
            //jf_HandleComboxStatus("dlUser");

        }
        else
        {
            uDeptChecked = true;
            document.all["dlDept_Text"].value = "";
            document.all["H_Dept"].value = "";
            alert("承辦單位不存在");
            return false;
        }
    }
    uDeptChecked = false;
    return bCheckOK;
}
var uSectChecked = false;
function dlSect_Text_onblur(argIsCheckDone)
{
    if (uSectChecked)
    {
        uSectChecked = false;
        return;
    }
    if (argIsCheckDone)
        uSectChecked = true;
    var bCheckOK = true;
    //值若變更時作處理
    if (jf_Trim(document.all["dlSect_Text"].value) != "" && document.all["dlSect_Text"].value != document.all["H_Sect"].value)
    {

        //呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
        if (ComboBoxCheck("dlSect", "承辦科別"))
        {
            //存ComboBox_Text的value
            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);

            edjf_SetdlSect("dlDept", "dlSect", "dlUser", "", false, true);	//初始化承辦人選單

            document.all["H_User"].value = document.all["dlUser_Text"].value;
            document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
            document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);

            if (document.all["dlUser"].options.length > 10)
                document.all["dlUser"].size = 10;
            else if (document.all["dlUser"].options.length == 1)
                document.all["dlUser"].size = 2;
            else
                document.all["dlUser"].size = document.all["dlUser"].options.length;
        }
        else
        {
            uSectChecked = true;
            document.all["dlSect_Text"].value = "";
            document.all["H_Sect"].value = "";
            alert("承辦單位不存在");
            return false;
        }
    }
    uSectChecked = false;
    return bCheckOK;
}
var uUserChecked = false;
function dlUser_Text_onblur(argIsCheckDone)
{
    if (uUserChecked)
    {
        uUserChecked = false;
        return;
    }
    if (argIsCheckDone)
        uUserChecked = true;
    var bCheckOK = true;
    //值若變更時作處理
    if (jf_Trim(document.all["dlUser_Text"].value) != "" && document.all["dlUser_Text"].value != document.all["H_User"].value)
    {
        document.all["H_User"].value = document.all["dlUser_Text"].value;
        document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
    }
    uUserChecked = false;
    return bCheckOK;

}
//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
    if (document.all[argComboxID].options.length <= 1)
        document.all[argComboxID + "_Container"].className = "hide";
    else
        document.all[argComboxID + "_Container"].className = "custom-combobox";
}

function CheckBeforePreview()
{
    var strSDate = jf_Trim(document.all.txSignDateS.value);
    var strEDate = jf_Trim(document.all.txSignDateE.value);
    var strSDocNo = jf_Trim(document.all.txDocNoS.value);
    var strEDocNo = jf_Trim(document.all.txDocNoE.value);
    var strdlDept_text = jf_Trim(document.all["dlDept_Text"].value);
    var strdlSept_text = jf_Trim(document.all["dlSect_Text"].value);
    var strdlUser_Text = jf_Trim(document.all["dlUser_Text"].value);
    var bRtnbool = true;
    var strErrMsg = "";
    if (strSDocNo == "" && strEDocNo == "" && strdlDept_text == "" && strdlSept_text == "" && strdlUser_Text == "" && strSDate == "" && strEDate == "")
    {
        bRtnbool = false;
        alert("請至少輸入一個條件");
        return bRtnbool;
    }
    if (!CheckDATE("txSignDateS", "核准展期日期(起)"))
    {
        bRtnbool = false;
        return bRtnbool;
    }

    if (!CheckDATE("txSignDateE", "核准展期日期(迄)"))
    {
        bRtnbool = false;
        return bRtnbool;
    }
    if (strSDocNo == "" && strEDocNo != "")
    {
        document.all.txDocNoS.value = strEDocNo;
    }
    if (strEDocNo == "" && strSDocNo != "")
    {
        document.all.txDocNoE.value = strSDocNo;
    }
    if (strSDate != "" && strEDate != "" && strSDate > strEDate)
    {
        document.all.txSignDateE.value = strSDate;
        document.all.txSignDateS.value = strEDate;
    }
    if (strSDate == "" && strEDate != "")
    {
        document.all.txSignDateS.value = strEDate;

    }
    if (strSDate != "" && strEDate == "")
    {
        document.all.txSignDateE.value = strSDate;

    }
    if (!checkDeptUserDDL("ture"))
    {
        bRtnbool = false;
        return bRtnbool;
    }
    return bRtnbool;
}

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

function checkDeptUserDDL(argIsCheckDone)
{
    if (document.activeElement.id == "dlDept_Text" && jf_Trim(document.all["dlDept_Text"].value) != "")
    {
        if (!dlDept_Text_onblur(argIsCheckDone))
            return false;
    }
    if (document.activeElement.id == "dlSect_Text" && jf_Trim(document.all["dlSect_Text"].value) != "")
    {
        if (!dlSect_Text_onblur(argIsCheckDone))
            return false;
    }
    if (document.activeElement.id == "dlUser_Text" && jf_Trim(document.all["dlUser_Text"].value) != "")
    {
        if (!dlUser_Text_onblur(argIsCheckDone))
            return false;
    }
    return true;
}