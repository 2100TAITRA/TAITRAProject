/*
DATE	SA		PRG		MGR_NO		DESC
1140630 Cloud   Daniel  1140073     新增程式
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


    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btPreview":
        case "btODS":
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
    if (document.all["txRmvSecDateS"].value + document.all["txRmvSecDateE"].value == "") {
        $('#txRmvSecDateS').focus();
        alert(document.all.dlDateType.options[document.all.dlDateType.selectedIndex].text+"不可為空白,請重新輸入");
        return false;
    }
    if (document.all.txRmvSecDateS.value == "")
        document.all.txRmvSecDateS.value = document.all.txRmvSecDateE.value;
    else if (document.all.txRmvSecDateE.value == "")
        document.all.txRmvSecDateE.value = document.all.txRmvSecDateS.value;
    else if (document.all.txRmvSecDateS.value > document.all.txRmvSecDateE.value) {
        var strTemp = document.all.txRmvSecDateE.value;
        document.all.txRmvSecDateE.value = document.all.txRmvSecDateS.value;
        document.all.txRmvSecDateS.value = strTemp;
    }
    if (CheckOverThreeYear(document.all.txRmvSecDateS.value, document.all.txRmvSecDateE.value)) {
        $('#txRmvSecDateS').focus();
        alert(document.all.dlDateType.options[document.all.dlDateType.selectedIndex].text+"起迄不可大於三年,請重新輸入");
        return false;
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
            alert(document.all.dlDateType.options[document.all.dlDateType.selectedIndex].text+strMsg);
            $('#' + argObj).focus();
            return false;
        }
    }
    return true;
}
function CheckOverThreeYear(argDateS, argDateE) {
    const DateS = parseRocDate(argDateS);
    const DateE = parseRocDate(argDateE);
    const diffDays = Math.abs((DateE - DateS) / (1000 * 60 * 60 * 24));
    if (diffDays > 1096) {
        return true;
    }
}
function parseRocDate(rocStr) {
    var rocYear = parseInt(rocStr.substring(0, 3), 10) + 1911;
    var month = parseInt(rocStr.substring(3, 5), 10);
    var day = parseInt(rocStr.substring(5, 7), 10);
    return new Date(rocYear, month - 1, day);
}


