/*
DATE	SA		PRG		MGR_NO		DESC 
1001020	David	Kevin	1000769		新增來文機關、密件收文、一式兩份報表
1020104	David	David	1011167		收件單位、收件人欄為改為ComboBox
1120627	Zen		Zen		1011167		二代升級至共通版
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

//1120627 Zen 1011167 二代升級至共通版
//if (document.all.tbTool)
//    document.all.tbTool.onbuttonclick = jf_ToolBarHandle;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    //1020104 David 1011167 收件單位、收件人欄為改為ComboBox
    document.all["H_Dept"].value = document.all["dlDept_Text"].value;
    document.all["H_Sect"].value = document.all["dlSect_Text"].value;
    document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
    document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
    document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);

    //無值不顯示
    jf_HandleComboxStatus("dlSect");
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
//1120627 Zen 1011167 二代升級至共通版
//function ClientButtonControl()
function ClientButtonControl(e)
{
    //1120627 Zen 1011167 二代升級至共通版
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
//1120627 Zen 1011167 二代升級至共通版
//function jf_ToolBarHandle()
function jf_ToolBarHandle(e)
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

    //1120627 Zen 1011167 二代升級至共通版
    //xObjectName = window.event.srcNode.getAttribute("ID");
    xObjectName = e.target.id;

    //1001020 Kevin [1000769] 新增檢核
    //fnDeptOnChange();
    fncbTwoInOneOnClick();

    switch (xObjectName)
    {
        case "btPrint":
            Page_BlockSubmit = !(jf_ConfirmPrint() && CheckDateStyle());
            //1120627 Zen 1011167 二代升級至共通版
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btPreview":
            Page_BlockSubmit = !(jf_ConfirmPreview() && CheckDateStyle());
            //1120627 Zen 1011167 二代升級至共通版
            //jf_ToolBarSubmit();
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}

/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
//1020104 David 1011167 收件單位、收件人欄為改為ComboBox，下列處理不需要
/*function fnDeptOnChange()
{
    document.all.txRcvDept.value = document.all.dlDept.options[document.all.dlDept.selectedIndex].text ;
}*/

var bHasCheck = false;

function CheckDateStyle()
{
    var strErrMsg = "";
    var bRtnbool = true;
    var strRcvDateTimeS = document.all.txRcvDateTimeS.value;
    var strRcvDateTimeE = document.all.txRcvDateTimeE.value;
    var strRcvDateS = "";
    var strRcvDateE = "";

    if (bHasCheck)
    {
        bHasCheck = false;
        return;
    }

    if (strRcvDateTimeS != "")
    {
        if (strRcvDateTimeS.length != 7 && strRcvDateTimeS.length != 11)
        {
            strErrMsg += "起始時間格式錯誤\n";
            //1120627 Zen 1011167 二代升級至共通版
            //document.all["txRcvDateTimeS"].focus();
            $('#txRcvDateTimeS')[0].focus();
        }
        strRcvDateS = strRcvDateTimeS.substr(0, 7);
        if (!jf_CheckCDATE(strRcvDateS))
        {
            strErrMsg += "起始時間格式錯誤\n";
            //1120627 Zen 1011167 二代升級至共通版
            //document.all["txRcvDateTimeS"].focus();
            $('#txRcvDateTimeS')[0].focus();
        }
    }

    if (strRcvDateTimeE != "")
    {
        if (strRcvDateTimeE.length != 7 && strRcvDateTimeE.length != 11)
        {
            strErrMsg += "結束時間格式錯誤\n";
            //1120627 Zen 1011167 二代升級至共通版
            //document.all["txRcvDateTimeE"].focus();
            $('#txRcvDateTimeE')[0].focus();
        }
        strRcvDateE = strRcvDateTimeE.substr(0, 7);

        if (!jf_CheckCDATE(strRcvDateE))
        {
            strErrMsg += "結束時間格式錯誤\n";
            //1120627 Zen 1011167 二代升級至共通版
            //document.all["txRcvDateTimeE"].focus();
            $('#txRcvDateTimeE')[0].focus();
        }
    }
    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    return bRtnbool;
}

//1001020 Kevin [1000769] 新增一式兩份報表
function fncbTwoInOneOnClick()
{
    if (document.all["cbTwoInOne"].checked)
        document.all["cbNewPage"].checked = true;
}

//1020104 David 1011167 收件單位、收件人欄為改為ComboBox，新增相關函式

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
    if (document.all[argComboxID].options.length <= 1)
        document.all[argComboxID + "_Container"].className = "hide";
    else
        //1120627 Zen 1011167 二代升級至共通版
        //document.all[argComboxID + "_Container"].className = "InputFieldText";
        document.all[argComboxID + "_Container"].className = "custom-combobox";
}

function dlDept_Text_onblur()
{
    var bCheckOK = true;
    if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
    {
        //檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
        if (edjf_ComboBoxCheck("dlDept", "承辦單位"))
        {
            //存ComboBox_Text的value
            document.all["H_Dept"].value = document.all["dlDept_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);

            edjf_SetdlDept("dlDept", "dlSect", "", "", false, false);	//初始dlSect

            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
            //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect
            document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);

            //依選項多寡固定下拉式選單可見長度
            if (document.all["dlSect"].options.length > 10)
                document.all["dlSect"].size = 10;
            else if (document.all["dlSect"].options.length == 1)
                document.all["dlSect"].size = 2;
            else
                document.all["dlSect"].size = document.all["dlSect"].options.length;

            //無值不顯示
            jf_HandleComboxStatus("dlSect");
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

function dlSect_Text_onblur()
{
    var bCheckOK = true;
    //值若變更時作處理
    if (document.all["dlSect_Text"].value != document.all["H_Sect"].value)
    {
        //呼叫ED_LIB.js，檢查dlSect_Text所輸入的值是否存在於下拉式選單
        if (edjf_ComboBoxCheck("dlSect", "承辦科別"))
        {
            //存ComboBox_Text的value
            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"], document.all["H_Sect"].value);
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}