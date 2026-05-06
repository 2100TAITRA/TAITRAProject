/*
DATE 	SA		PRG		MGR_NO		DESC
1060330	David	Justin	1050802		新增EDR245 內部行文查詢作業
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

    document.all["H_Dept"].value = document.all["dlDept_Text"].value;
    document.all["H_Sect"].value = document.all["dlSect_Text"].value;
    document.all["H_User"].value = document.all["dlUser_Text"].value;
    document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
    document.all["H_Sect_Value"].value = edjf_GetSelectValue(document.all["dlSect"],document.all["H_Sect"].value);
    document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"],document.all["H_User"].value);
    document.all["H_dlSect_Value"].value = edjf_SaveCurrDL(document.all["dlSect"]);
    document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);	

    //無值不顯示
    jf_HandleComboxStatus("dlSect");
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

    if (document.all["txFromNoS"].value == "" && document.all["txRcvDateS"].value == "" && document.all["txFromDateS"].value == "" && document.all["dlDept_Text"].value == "" && document.all["dlUser_Text"].value == "" && document.all["dlFromUnit_Text"].value == "")
    {
        strErrMsg += "請至少輸入一項條件";
    }
    else if (document.all["txRcvDateS"].value == "" && document.all["txRcvDateE"].value == "" && document.all["txFromDateS"].value == "" && document.all["txFromDateE"].value == "")
    {
        strErrMsg += "收文日期、來文日期，請至少輸入一項日期條件";
    }

    if (strErrMsg != "")
    {
        bRtnbool = false;
        jf_ShowMsg(FormatStr(jf_GetErrMsg(CustErr), new Array([strErrMsg])), "");
    }
    else
    {
        CheckBeforeSearch(document.all["txFromNoS"], document.all["txFromNoE"]);
        CheckBeforeSearch(document.all["txRcvDateS"], document.all["txRcvDateE"]);
        CheckBeforeSearch(document.all["txFromDateS"], document.all["txFromDateE"]);
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

function jf_DOC_NO_BLUR(argid) 
{
    var obj = document.all[argid];
    if(obj.value=="")
        return;

    var pMatch = /\W{1,-}/;
    if (pMatch.test(obj.value)) {
        alert("來文號欄位不可輸入非英文字母,非數字的字元。");
        obj.focus();
    }
    if (obj.id == "txFromNoS") {
        if (!pMatch.test(obj.value)) {
            document.all.txFromNoE.value = obj.value;
        }
    }
}

function DOC_NO_KEYPRESS() {
    //A~Z keyCode 65~90 小寫為97~122
    //0~9 keyCode 48~57
    //<- keyCode 8 
    //TAB keyCode 9
    //enter keyCode 13
    //Del keyCode 46
    //- keyCode 45
    jf_UPPERCASE();
    var pRtn = true;
    var pKeyCode = event.keyCode;
    if (pKeyCode >= 48 && pKeyCode <= 122) {
        if (pKeyCode > 57 && pKeyCode < 65)
            pRtn = false;
        else if (pKeyCode > 90 && pKeyCode < 97 && pKeyCode != 95)
            pRtn = false;
    }
    else if (pKeyCode == 45) //可允許輸入
    {
        pRtn = true;
    }
    else {
        pRtn = false;
    }


    event.returnValue = pRtn
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
            document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"],document.all["H_Dept"].value);
            //初始dlSect、dlUser的處理
            edjf_SetdlDept("dlDept","dlSect","dlUser","",false,false);
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
            bCheckOK = false;
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
            bCheckOK = false;
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