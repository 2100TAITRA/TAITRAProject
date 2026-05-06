/*
DATE		SA		PRG		    MGR_NO			DESC
1110316     Cloud   Joe		    1101547         新增EAR219 掃描條碼列印作業
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
function ClientOnLoad() {
}

/*****************************************************************************
*
*   Client Button 處理區
* 
*****************************************************************************/
function ClientButtonControl(e) {
    var xObjectName = e.target.id;

    if (IsServerHandling) {
        Page_BlockSubmit = true;
        return;
    }

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

    if (IsServerHandling) {
        Page_BlockSubmit = true;
        return;
    }

    //檢查是否TimeOut
    if (jf_IsTimeOut()) {
        Page_BlockSubmit = true;
        return;
    }

    xObjectName = event.target.id;

    switch (xObjectName) {
        case "btPreview":
                Page_BlockSubmit = !CheckBeforeSearch();
                jf_ToolBarSubmit(xObjectName);
            break;
    }
}

function CheckBeforeSearch() {

    if (document.all.txDateS.value + document.all.txDateE.value + document.all.txDocNo.value == "") {
        alert('點收日期與公文文號至少需輸入一項條件');
        return false;
    }

    if (document.all.txDateS.value != "" && document.all.txDateE.value == "")
        document.all.txDateE.value = document.all.txDateS.value;
    else if (document.all.txDateS.value == "" && document.all.txDateE.value != "")
        document.all.txDateS.value = document.all.txDateE.value;
    else if (document.all.txDateS.value > document.all.txDateE.value) {
        var temp = document.all.txDateS.value;
        document.all.txDateS.value = document.all.txDateE.value;
        document.all.txDateE.value = temp;
    }

    if (document.all.txTimeS.value != "" && document.all.txTimeE.value == "")
        document.all.txTimeE.value = document.all.txTimeS.value;
    else if (document.all.txTimeS.value == "" && document.all.txTimeE.value != "")
        document.all.txTimeS.value = document.all.txTimeE.value;
    else if (document.all.txTimeS.value > document.all.txTimeE.value) {
        var temp = document.all.txTimeS.value;
        document.all.txTimeS.value = document.all.txTimeE.value;
        document.all.txTimeE.value = temp;
    }

    return true;
}

var bHasCheck = false;
//檢查日期格式
function CheckCDATE(argObj, strMsg) {
    if (bHasCheck) {
        bHasCheck = false;
        return;
    }
    bHasCheck = true;
    var strDate = document.all[argObj].value;
    if (strDate != "") {
        if (strDate.length < 7) {
            strDate = jf_PADL(strDate, 7, '0');
            document.all[argObj].value = strDate;
        }
        if (!jf_CheckCDATE(strDate)) {
            $('#' + argObj).focus();
            if (strMsg)
                jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            bHasCheck = false;
            return false;
        }
    }
    bHasCheck = false;
    return true;
}

//檢查日期格式
function CheckCTime(argObj, strMsg) {
    if (bHasCheck) {
        bHasCheck = false;
        return;
    }
    bHasCheck = true;
    var strTime = document.all[argObj].value;
    if (strTime != "") {
        if (strTime.length < 4) {
            strTime = jf_PADL(strTime, 4, '0');
            document.all[argObj].value = strTime;
        }
        if (strTime.substring(0, 2) > "23" || strTime.substring(2, 4) > "59") {
            $('#' + argObj).focus();
            jf_ShowMeg(FormatStr(jf_GetErrMsg(InFormatErr2), new Array([strMsg])), "");
            bHasCheck = false;
            return false;
        }

    }
    bHasCheck = false;
    return true;
}
