/*
DATE	SA		PRG		MGR_NO		DESC
1140528 Joe     Daniel  1140139     新增程式
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


/*****************************************************************************
*
*   OnLoad 區
* 
*****************************************************************************/
function ClientOnLoad() {
    document.all["H_Dept"].value = document.all["dlDept_Text"].value;
    document.all["H_User"].value = document.all["dlUser_Text"].value;
    document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);
    document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
    document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/

function ClientButtonControl(e) {

    var xObjectName = e.target.id;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    switch (xObjectName) {
        /*
        case "":
            break;
        */
    }
}

/*****************************************************************************
*
*   ToolBar Button 處理區
* 
*****************************************************************************/

function jf_ToolBarHandle(event) {
    var xObjectName;
    var evBtn;

    if (IsServerHandling)
        return;

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }


    //xObjectName= window.event.srcNode.getAttribute("ID");
    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btPreview":
        case "btOds":
        case "btExcel":
            if (CheckBeforePreview())
                Page_BlockSubmit = !jf_ConfirmPreview();
            else
                Page_BlockSubmit = true;
            jf_ToolBarSubmit(xObjectName);
            break;
    }
}



/*****************************************************************************
*
*  Call Web Service 處理區
* 
*****************************************************************************/
/*****************************************************************************
*
*  Custom 區(各程式專用function請寫在此)
* 
*****************************************************************************/
function CheckBeforePreview() {
    if (document.all["txRCVDateS"].value + document.all["txRCVDateE"].value == "") {
        $('#txRCVDateS').focus();
        alert("簽收日期不可為空白,請重新輸入");
        return false;
    }
    if (document.all.txRCVDateS.value == "")
        document.all.txRCVDateS.value = document.all.txRCVDateE.value;
    else if (document.all.txRCVDateE.value == "")
        document.all.txRCVDateE.value = document.all.txRCVDateS.value;
    else if (document.all.txRCVDateS.value > document.all.txRCVDateE.value) {
        var strTemp = document.all.txRCVDateE.value;
        document.all.txRCVDateE.value = document.all.txRCVDateS.value;
        document.all.txRCVDateS.value = strTemp;
    }
    return true;
}
function CheckCDATE(argObj, strMsg) {
    var strDate = document.all[argObj].value;
    if (strDate != "") {
        if (strDate.length < 7) {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate)) {
            alert(strMsg);
            $('#' + argObj).focus();
            return false;
        }
    }
    return true;
}
function dlDept_Text_onblur() {
    var bCheckOK = true;
    if (document.all["dlDept_Text"].value != document.all["H_Dept"].value) {
        //呼叫OD_LIB.js，檢查txRcvDept_Text所輸入的值是否存在於下拉式選單
        if (edjf_ComboBoxCheck("dlDept", "會辦單位")) {
            //存ComboBox_Text的value
            document.all["H_Dept"].value = document.all["dlDept_Text"].value;
            //存所選擇的ComboBox項目的value
            document.all["H_Dept_Value"].value = edjf_GetSelectValue(document.all["dlDept"], document.all["H_Dept"].value);

            //先顯示二級單位選項 避免隱藏不調整
            edjf_SetdlDept("dlDept", "", "dlUser", "", true, true);	//初始dlUser的處理

            document.all["H_User"].value = document.all["dlUser_Text"].value;
            document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
            //將下拉式選單的text與value轉成字串相加，於postback時，初始化dlUser的處理
            document.all["H_dlUser_Value"].value = edjf_SaveCurrDL(document.all["dlUser"]);

            if (document.all["dlUser"].options.length > 10)
                document.all["dlUser"].size = 10;
            else if (document.all["dlUser"].options.length == 1)
                document.all["dlUser"].size = 2;
            else
                document.all["dlUser"].size = document.all["dlUser"].options.length;
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}

function dlUser_Text_onblur() {
    var bCheckOK = true;
    //值若變更時作處理
    if (document.all["dlUser_Text"].value != document.all["H_User"].value) {
        //呼叫ED_LIB.js，檢查dlUser_Text所輸入的值是否存在於下拉式選單
        if (edjf_ComboBoxCheck("dlUser", "會辦人")) {
            document.all["H_User"].value = document.all["dlUser_Text"].value;

            document.all["H_User_Value"].value = edjf_GetSelectValue(document.all["dlUser"], document.all["H_User"].value);
        }
        else
            bCheckOK = false;
    }
    return bCheckOK;
}
function initDlUser() {
    edjf_SetdlDept("dlDept", "", "dlUser", "", true, true);	//初始dlUser的處理
    if (document.all["dlUser"].options.length > 10)
        document.all["dlUser"].size = 10;
    else if (document.all["dlUser"].options.length == 1)
        document.all["dlUser"].size = 2;
    else
        document.all["dlUser"].size = document.all["dlUser"].options.length;
}
