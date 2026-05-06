/*
DATE 	    SA		PRG		MGR_NO      DESC
1051123     Daivd   Zen     1050087     二代公文修改
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

//1051123 Zen 1050087 二代公文修改
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1051123 Zen 1050087 二代公文修改
    //jf_CallWS("../../../STD/LIB/SYS.asmx", "CheckDataKeyDuplicate", false, null); //使用WebService前必須先呼叫一次

    //1051230 Zen 1050087 二代公文修改，改由client端改動單位
    dlDept_Text_onblur('onblur', 'true');
    dlSect_Text_onblur('onblur');
    dlUser_Text_onblur('onblur');
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1051123 Zen 1050087 二代公文修改
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1051123 Zen 1050087 二代公文修改
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
//1051123 Zen 1050087 二代公文修改
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

    //1051123 Zen 1050087 二代公文修改
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName)
    {
        case "btPrint":
            Page_BlockSubmit = !(jf_ConfirmPrint() && CheckData());
            //1051123 Zen 1050087 二代公文修改
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !(jf_ConfirmPreview() && CheckData());
            //1051123 Zen 1050087 二代公文修改
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

    if (document.all["lbReturnValue"].options != null)
        document.all["lbReturnValue"].options.length = 0;
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckData()
{
    if (document.all["dlDoc"].value == "" && document.all["dlDept_Text"].value == "" && document.all["dlUser_Text"].value == "")
    {
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array(["請縮小查詢範圍。"])), "");
        return false;
    }
    else
    {
        return true;
    }
}

//1051230 Zen 1050087 二代公文修改，改由client帶入--begin
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

    for (i = 0 ; i < ComboBoxObj.options.length ; i++)
    {
        if (ComboBoxTextObj.value == ComboBoxObj.options[i].text)
        {
            bRtnBool = true;
            break;
        }
    }

    if (!bRtnBool)
    {
        //jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array(["所輸入的"+argKeyMsg+"不在選單當中"])),"");
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

        jf_HandleComboxStatus("dlSect");
    }
    else
    {
        uDeptChecked = true;
        document.all["dlDept_Text"].value = "";
        document.all["H_Dept"].value = "";
        alert("承辦單位不存在");
        return false;
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
    if (document.all["dlUser_Text"].value != document.all["H_User"].value)
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
//1051230 Zen 1050087 二代公文修改，改由client帶入--end