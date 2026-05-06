/*
DATE 	SA		PRG		MGR_NO		DESC
1070504	Kevin	Justin	1070227		新增程式
*/
/*****************************************************************************
*
*   Declaration 區
* 
*****************************************************************************/
var IsServerHandling = new Boolean();
IsServerHandling = false;

/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad()
{
    dlDept_Text_onblur();
    //無值不顯示
    jf_HandleComboxStatus("dlSect");
    dlSectLock();

    document.all["H_Dept"].value = document.all["dlDept_Text"].value;
    document.all["H_Sect"].value = document.all["dlSect_Text"].value;
    document.all["H_User"].value = document.all["dlUser_Text"].value;
    document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
    document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
    document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
    document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
    document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
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
        case "btSearch":
        case "btPreview":
        case "btExcel":
            Page_BlockSubmit = !jf_CheckBefor();
            jf_ToolBarSubmit(xObjectName);
            break;
        case "btClean":
            Page_BlockSubmit = false;
            if (jf_ConfirmClean(true))
            {
                jf_ToolBarSubmit(xObjectName);
            }
            break;
    }
}

function jf_CheckBefor()
{
    var bRtnbool = true;
    var strErrMsg = "";

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    else
    {
        CheckBeforeSearch(document.all["txASSIGN_NOS"], document.all["txASSIGN_NOE"]);
        CheckBeforeSearch(document.all["txASSIGN_DATES"], document.all["txASSIGN_DATEE"]);
        CheckBeforeSearch(document.all["txFROM_NOS"], document.all["txFROM_NOE"]);
        CheckBeforeSearch(document.all["txMEET_DATES"], document.all["txMEET_DATEE"]);
        CheckBeforeSearch(document.all["txCLOSE_DATES"], document.all["txCLOSE_DATEE"]);
    }
    
    return bRtnbool;
}

function CheckBeforeSearch(argObjS, argObjE)
{
    var strS = argObjS.value;
    var strE = argObjE.value;

    if (strS == "" && strE != "")
        argObjS.value = strE;
    if (strE == "" && strS != "")
        argObjE.value = strS;

    if (strS != "" && strE != "" && strS > strE) {
        argObjS.value = strE;
        argObjE.value = strS;
    }
}

function CheckDate(argObj, argObjName) {
    if (argObj.value != "") {
        jf_PADCHAR(argObj, 7, '0');
        if (!jf_CheckCDATE(argObj.value)) {
            jf_ShowMeg(FormatStr(jf_GetErrMsg(CustErr), new Array([argObjName + "格式不正確"])), "");
            $('#' + argObj.id).focus();
            return false;
        }
    }
}

function NOSE_BLUR(argid) 
{
    var obj = document.all[argid];
    if (obj.value == "")
        return;

    if (obj.id == "txASSIGN_NOS") {
        if (document.all.txASSIGN_NOE.value == "") {
            document.all.txASSIGN_NOE.value = obj.value;
        }
    }
    else if (obj.id == "txFROM_NOS") {
        if (document.all.txFROM_NOE.value == "") {
            document.all.txFROM_NOE.value = obj.value;
        }
    }
}

function dlSectLock()
{
    if (document.all["H_SEC_NO"].value != "" && document.all["dlSect_Container"].className != "hide")
    {
        for (var i = 1; i < document.all["dlSect"].length; i++)
        {
            if (document.all["dlSect"][i].value.split(':')[0] == document.all["H_SEC_NO"].value)
            {
                document.all["dlSect"].selectedIndex = i;
                document.all["dlSect_Text"].value = document.all["dlSect"][i].text;
            }
        }
    }
}

function dlDept_Text_onblur()
{
    var bCheckOK = true;
    if (document.all["dlDept_Text"].value != document.all["H_Dept"].value)
    {
        //呼叫ED_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
        if(edjf_ComboBoxCheck("dlDept", "承辦單位"))
        {
            //存ComboBox_Text的value
            document.all["H_Dept"].value = document.all["dlDept_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
            //1070710 Kevin 1070227 新增機關查詢條件
            //初始dlSect、dlUser的處理
            /*
            if (document.all["H_Dept_Value"].value == "OTHERS")
            {
                if (document.all["dlSect"] != null && document.all["dlSect_Text"] != null) {
                    while (document.all["dlSect"].length > 0)
                        document.all["dlSect"].remove(0);
                    document.all["dlSect"].size = 2;
                    document.all["dlSect"].options.add(new Option("", ""));
                    document.all["dlSect_Text"].value = "";
                }

                if (document.all["dlUser"] != null && document.all["dlUser_Text"] != null) {
                    while (document.all["dlUser"].length > 0)
                        document.all["dlUser"].remove(0);
                    document.all["dlUser"].size = 2;
                    document.all["dlUser"].options.add(new Option("", ""));
                    document.all["dlUser_Text"].value = "";
                }
            }
            else
            {
                edjf_SetdlDept("dlDept", "dlSect", "dlUser", "", false, false);
            }
            */
            //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
            document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
            document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
            //依選項多寡固定下拉式選單可見長度
            SetdlLenth(document.all["dlSect"]);
            SetdlLenth(document.all["dlUser"]);
            //無值不顯示
            jf_HandleComboxStatus("dlSect");
        }
        else
        {
            document.all["dlDept_Text"].value = "";
            bCheckOK = false;
        }
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
        if(edjf_ComboBoxCheck("dlSect", "承辦科別"))
        {
            //存ComboBox_Text的value
            document.all["H_Sect"].value = document.all["dlSect_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
            //初始化承辦人選單
            edjf_SetdlSect("dlDept","dlSect","dlUser","",false);
            //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlSect與dlUser的處理
            document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
            //依選項多寡固定下拉式選單可見長度
            SetdlLenth(document.all["dlUser"]);
        }
        else
        {
            document.all["dlSect_Text"].value = "";
            bCheckOK = false;
        }
    }
    return bCheckOK;
}

function SetdlLenth(argDLObj)
{
    if(argDLObj.options.length > 10)
        argDLObj.size = 10;
    else if(argDLObj.options.length ==1)
        argDLObj.size = 2;
    else
        argDLObj.size = argDLObj.options.length;
}

function dlUser_Text_onblur()
{
    var bCheckOK = true;
    //值若變更時作處理
    if (document.all["dlUser_Text"].value != document.all["H_User"].value)
    {
        //呼叫ED_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
        if(edjf_ComboBoxCheck("dlUser", "承辦人"))
        {
            document.all["H_User"].value = document.all["dlUser_Text"].value;
            document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
        }
        else
        {
            document.all["dlUser_Text"].value = "";
            bCheckOK = false;
        }
    }
    return bCheckOK;
}

//無值不顯示
function jf_HandleComboxStatus(argComboxID)
{
    if(document.all[argComboxID].options.length <=1)
        document.all[argComboxID+"_Container"].className = "hide";
    else
    {
        document.all[argComboxID+"_Container"].className = "custom-combobox";
    }
}
/*****************************************************************************
*
*  Call Child Window 處理區
* 
*****************************************************************************/
//1070710 Kevin 1070227 提供查詢
function ReturnValue(argLink) {

    try {
        opener.document.all.lbReturnValue.length = 1;
        opener.document.all.lbReturnValue.options[0].value = argLink;
        opener.window.CallBack("EDR450");
        close();
    }
    catch (e) { }
}
